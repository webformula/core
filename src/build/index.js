import esbuild from 'esbuild';
import path from 'node:path';
import { access, readFile, readdir, stat, rm, writeFile } from 'node:fs/promises';
import { gzip } from 'node:zlib';
import { promisify } from 'node:util';
import devServer from './dev-server.js';
import routeParser from './route-parser.js';
import parseHTMLString from './dom.js';
import copyFiles from './copy-files.js';

const asyncGzip = promisify(gzip);
const isDev = process.env.NODE_ENV !== 'production';

/**
 * Build application
 * @param {Object} config
 * @param {Boolean} config.spa Enable spa routing. Default: true
 * @param {String} config.basedir App root directory. Default: 'app/'
 * @param {String} config.outdir App bundle directory. Default: 'dist/'
 * @param {Boolean} config.chunks Chunk app per page. Default: true
 * @param {Boolean} config.minify Minify bundle. Default: true
 * @param {Boolean} config.sourcemaps Include sourcemaps. Default: false
 * @param {Boolean} config.gzip Compress bundle. Default: true
 * @param {Boolean} config.devServer Enable dev server. Default: true
 * @param {Number} config.devServerPort Dev server port. Default: 3000
 * @param {Boolean} config.devServerLivereload Enable live reload. Default: true
 * @param {Boolean} config.devWarnings Enable console warning (only html sanitization currently). Default: false
 * @param {Object[]} config.copyFiles Copy file config
 * @param {String} config.copyFiles[].from Location of file
 * @param {String} config.copyFiles[].to Destination for file
 * @param {Function} config.copyFiles[].transform Transform function
 * @returns {Object} Build data
 */
export default async function build(config = {
  spa: true,
  basedir: 'app/',
  outdir: 'dist/',
  chunks: true,
  minify: true,
  sourcemaps: false,
  gzip: true,
  devServer: true,
  devServerPort: 3000,
  devServerLivereload: true,
  devWarnings: false,
  copyFiles: [{
    from: '',
    to: '',
    transform: ({
      content,
      outputFileNames
    }) => { },
    gzip: false
  }],
  onStart: () => { },
  onEnd: () => { }
}) {
  if (isDev) {
    if (config.sourcemaps === undefined) config.sourcemaps = true;
    if (config.devServer !== false && config.devServerLivereload !== false) config.liveReloadScript = liveReloadScript;
    config.debugScript = debugScript(config.devWarnings);
  } else {
    if (config.gzip === undefined) config.gzip = true;
    if (config.minify === undefined) config.minify = true;
    if (config.gzip === undefined) config.gzip = true;
  }

  if (config.onStart) await config.onStart();
  await cleanOutdir(config.outdir);
  config.isDev = isDev;
  config.appJsPath = path.join(config.basedir, '/app.js');
  config.indexHTMLPath = path.join(config.basedir, '/index.html');
  const appCSSPath = path.join(config.basedir, '/app.css');
  const hasAppCSS = await access(appCSSPath).then(e => true).catch(e => false);
  config.routes = await routeParser(config);

  const entryPoints = [config.appJsPath];
  // add entry points for each page
  if (config.chunks) entryPoints.concat(config.routes.routesConfig.map(v => v.filePath));
  const { metafile } = await esbuild.build({
    entryPoints,
    bundle: true,
    outdir: config.outdir,
    metafile: true,
    entryNames: '[name]-[hash]',
    format: 'esm',
    loader: { '.html': 'text' },
    plugins: [pluginCss, injectCode(config)],
    minify: config.minify,
    splitting: config.chunks,
    sourcemap: config.sourcemap
  });
  
  const appCSSContext = !hasAppCSS ? undefined : await esbuild.build({
    entryPoints: [appCSSPath],
    bundle: true,
    outdir: config.outdir,
    metafile: true,
    entryNames: '[name]-[hash]',
    minify: config.minify,
    loader: { '.css': 'css' }
  });
  
  const {
    routeConfigs,
    outputs,
    appJSOutput,
    appCSSOutput
  } = buildOutputs(metafile.outputs, appCSSContext?.metafile.outputs, config);
  const indexHTMLFiles = await buildIndexHTML(appJSOutput, appCSSOutput, routeConfigs, config);
  const copiedFiles = await copyFiles(config.copyFiles, outputs);
  if (config.gzip) await gzipFiles(outputs.concat(indexHTMLFiles));
  if (config.onEnd) await config.onEnd();

  const returnData = {
    outdir: config.outdir,
    routes: routeConfigs.map(v => ({
      route: v.routePath,
      regex: v.regex,
      filePath: v.indexHTMLFileName,
      fileName: v.indexHTMLFileName.split('/').pop(),
      notFound: v.notFound
    })),
    files: outputs
      .map(v => ({
        filePath: v.output,
        fileName: v.output.split('/').pop()
      })).concat(...copiedFiles),
    gzip: config.gzip
  };

  if (isDev && config.devServer !== false) devServer(returnData, config.devServerPort);
  return returnData;
}


async function buildIndexHTML(appJSOutput, appCSSOutput, routeConfigs, config) {
  const appScriptPath = `/${appJSOutput.output.split('/').pop()}`;
  const appCssPath = appCSSOutput && `/${appCSSOutput.output.split('/').pop()}`;
  let indexFile = await readFile(config.indexHTMLPath, 'utf-8');

  const appScriptPreload = `\n  <link rel="modulepreload" href="${appScriptPath}"/>\n`;
  const appImportChunks = appJSOutput.imports.map(v => v.path.split('/').pop()).filter(v => v.startsWith('chunk-'));
  const appScriptTag = `<script src="${appScriptPath}" type="module" defer></script>`;
  const appCssTag = !appCssPath ? '' : `<link rel="preload" href="${appCssPath}" as="style" onload="this.onload=null;this.rel='stylesheet'">`;
  
  // add mock dome so we can load the app script and render templates
  parseHTMLString(indexFile);
  const head = document.querySelector('head');
  head.insertAdjacentHTML('afterbegin', appScriptPreload);

  const appScriptElement = document.querySelector('script[src="app.js"]') || document.querySelector('script[src="/app.js"]') || document.querySelector('script[src="./app.js"]');
  if (appScriptElement) {
    appScriptElement.src = appScriptPath;
    appScriptElement.type = 'module';
    appScriptElement.defer = true;
  } else {
    head.insertAdjacentHTML('beforeend', appScriptTag);
  }
  head.insertAdjacentHTML('beforeend', `${config.liveReloadScript || ''}${isDev ? `\n${config.debugScript}` : ''}`);

  if (appCssPath) {
    const appStyleElement = document.querySelector('link[href="app.css"]') || document.querySelector('link[href="/app.css"]') || document.querySelector('link[href="./app.css"]');
    if (appStyleElement) {
      appStyleElement.href = appCssPath;
    } else {
      head.insertAdjacentHTML('beforeend', appCssTag);
    }
  }

  // used to prevent router code from running
  window.__isBuilding = true;
  // load script so we can grab templates
  await import(path.resolve('.', appJSOutput.output));

  // render template and build index html file for each page
  const data = await Promise.all(routeConfigs.map(async (route, i) => {
    // load page to build template
    const routeModule = await window.wfcRoutes.find(v => v.path === route.routePath).component;
    customElements.define(`page-${i}`, routeModule.default);
    routeModule.default._isPage = true;
    routeModule.default._isBuild = true;
    const instance = new routeModule.default();
    instance.render();

    // prepare module preload links
    const pageScriptPreload = route.routeScriptPath && route.routeScriptPath !== appScriptPath ? `\n  <link page rel="modulepreload" href="${route.routeScriptPath}" />` : '';
    const pageImportChunks = [...new Set(appImportChunks.concat(
      route.imports.map(v => v.path.split('/').pop()).filter(v => v.startsWith('chunk-'))
    ))].map(v => `\n  <link rel="modulepreload" href="/${v}" />`).join('');

    const title = document.querySelector('title');
    if (title) title.textContent = routeModule.default.pageTitle;
    const previousPageReloads = document.querySelectorAll('link[page]');
    for (const p of previousPageReloads) {
      p.remove();
    }

    const head = document.querySelector('head');
    head.insertAdjacentHTML('afterbegin', `${pageScriptPreload}${pageImportChunks}`);

    return {
      fileName: route.indexHTMLFileName,
      content: `<!doctype html>\n${document.documentElement.outerHTML}`
    };
  }));

  await Promise.all(data.map(async v => writeFile(v.fileName, v.content)));
  return data.map(v => ({ output: v.fileName }));
}


// build information for writing outputs and building page index html files
function buildOutputs(appOutputs, appCSSOutputs, config) {
  const outputs = Object.keys(appOutputs).map(key => ({
    output: key,
    ...appOutputs[key]
  }));

  let appCSSOutput;
  if (appCSSOutputs) {
    appCSSOutput = Object.keys(appCSSOutputs).map(key => ({
      output: key,
      ...appCSSOutputs[key]
    }))[0];
    outputs.push(appCSSOutput)
  }

  const routeConfigs = config.routes.routesConfig.map(route => {
    const moduleOutput = !config.chunks ? outputs.find(v => v.entryPoint === config.appJsPath) : outputs.find(b => b.entryPoint === route.filePath);
    return {
      ...route,
      output: moduleOutput.output,
      imports: moduleOutput.imports,
      htmlImports: Object.keys(moduleOutput.inputs).filter(v => v.endsWith('html')),
      routeScriptPath: `/${moduleOutput.output.split('/').pop()}`
    };
  });

  return {
    routeConfigs,
    outputs,
    appJSOutput: outputs.find(v => v.entryPoint === config.appJsPath),
    appCSSOutput
  };
}



async function cleanOutdir(dir) {
  const files = await readdir(dir);
  await Promise.all(files.map(async file => {
    const filePath = path.join(dir, file);
    if ((await stat(filePath)).isDirectory()) return cleanOutdir(filePath);
    await rm(filePath);
  }));
}

async function gzipFiles(outputFiles) {
  await Promise.all(outputFiles.map(async item => {
    // some files are only temporarily used to build then deleted
    const exists = await access(item.output).then(() => true).catch(() => false);
    if (!exists) return;

    try {
      let content = await readFile(item.output);
      const result = await asyncGzip(content);
      await writeFile(item.output, result);
    } catch (e) {
      console.log('error', item, e)
    }
  }));
}

const routesImportRegex = /routes[^@]+@webformula\/core(?:'|");/;
function injectCode(config) {
  return {
    name: 'injectCode',
    setup(build) {
      // inject route config to app.js
      build.onLoad({ filter: /app\.js/ }, async args => {
        let contents = await readFile(args.path, 'utf-8');
        if (contents.match(routesImportRegex) === null) {
          contents = `import { routes, enableSPA } from \'@webformula/core\';${config.spa ? '\nenableSPA()' : ''}\n${config.routes.routesCode}\n${contents}`;
        }
        return { contents };
      });
    }
  }
};

const pluginCss = {
  name: 'css',
  setup(build) {
    // bundle css file and inline
    build.onLoad({ filter: /\.css$/ }, async args => {
      const contextCss = await esbuild.build({
        entryPoints: [args.path],
        bundle: true,
        write: false,
        minify: true,
        loader: { '.css': 'css' }
      });
      const contents = `
        const styles = new CSSStyleSheet();
        styles.replaceSync(\`${contextCss.outputFiles[0].text}\`);
        export default styles;`;
      return { contents };
    });
  }
};


const debugScript = (devWarnings) => `
<script>
  window.wfcDev = ${devWarnings === true ? 'true;' : 'false;'}
  console.warn('Webformula Core: Debug mode');

  window.getPageTemplate = () => {
    console.log(window.page.getTemplate());
  }

  window.getRoutes = () => {
    console.log(window.wfcRoutes);
  }
</script>`;
const liveReloadScript = `
  <script>
    let isReloading = false;
    new EventSource("/livereload").onerror = async () => {
      if (isReloading) return;
      isReloading = true;
      await pingServer();
      location.reload();
    };

    async function pingServer(wait = 20) {
      return new Promise(resolve => {
        setTimeout(async () => {
          try {
            await fetch('/devserver-ping');
            resolve();
          } catch (e) {
            await pingServer(Math.min(15000, wait + (wait * 0.5)));
            resolve();
          }
        }, wait);
      });
    }
  </script>`;
