import path from 'node:path';
import { access, readFile, readdir, stat, rm, writeFile } from 'node:fs/promises';
import { gzip } from 'node:zlib';
import { promisify } from 'node:util';
import esbuild from 'esbuild';
import addMockDom from './dom.js';
import copyFiles from './copyFiles.js';
import devServer from './devServer.js';

const asyncGzip = promisify(gzip);
const isDev = process.env.NODE_ENV !== 'production';
const routeToNameRegex = /\/|\.|\s|\[|\]|\?/g;
const config = {
  pageCounter: 0
};

export default async function build(params = {
  basedir: 'app/',
  outdir: 'dist/',
  chunks: true,
  minify: true,
  sourcemaps: false,
  gzip: true,
  devServer: {
    enabled: true,
    port: 3000,
    liveReload: true
  },
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
  config.basedir = params.basedir || 'app/';
  config.outdir = params.outdir || 'dist/';
  config.chunks = params.chunks === false ? false : true;
  config.minify = params.minify === false ? false : params.minify === true ? true : !isDev;
  config.gzip = params.gzip === false ? false : params.gzip === true ? true : !isDev;
  config.sourcemaps = params.sourcemaps === false ? false : params.sourcemaps === true ? true : isDev;
  config.devServer = params.devServer || { enabled: false };
  config.devServer.enabled = params?.devServer?.enabled === false ? false : true;
  config.devServer.port = params?.devServer?.port || 3000;
  config.devServer.liveReload = params?.devServer?.liveReload === false ? false : params?.devServer?.liveReload === true ? true : isDev;
  config.copyFiles = (params.copyFiles || []).filter(({ from }) => !!from);
  config.onStart = params.onStart;
  config.onEnd = params.onEnd;
  config.isMiddleware = params.isMiddleware;
  config.appFilePath = path.join(config.basedir, '/app.js');
  config.indexHTMLPath = path.join(config.basedir, '/index.html');
  config.appCSSFilePath = path.join(config.basedir, '/app.css');
  config.hasAppCSS = await access(config.appCSSFilePath).then(e => true).catch(e => false);
  if (config.hasAppCSS) config.appCSSOutputFilePath = path.join(config.outdir, 'app.css');
  if ((await access(config.appFilePath).then(() => false).catch(() => true))) throw Error(`app.js required. Expected path: ${config.appFilePath}`);
  if (isDev) config.debugScript = `console.warn('Webformula Core: Debug mode');

window.getBoundVariables = () => {
  console.log(window.page.getVariableReferences());
}

window.getPageTemplate = () => {
  console.log(window.page.getTemplate());
}

window.getRoutes = () => {
  console.log(window.webformulaRoutes);
}`;

  const data = await run();
  if (!isDev) process.exit();
  return data;
}


const cssFilterRegex = /\.css$/;
const routesImport = /import(.|\n)+routes(.|\n)+from.+@webformula\/core/;
const pluginCss = {
  name: 'css',
  setup(build) {

    // bundle css file and inline
    build.onLoad({ filter: cssFilterRegex }, async args => {
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

    // inject route config to app.js
    build.onLoad({ filter: /app\.js/ }, async args => {
      let contents = await readFile(args.path, 'utf-8');
      contents = `${contents.match(routesImport) === null ? 'import { routes } from \'@webformula/core\';' : ''}${contents}\n${config.routesCode}${config.debugScript || ''}`;
      return { contents };
    });

    if (isDev) {
      build.onLoad({ filter: /Component\.js/ }, async args => {
        let contents = await readFile(args.path, 'utf-8');
        contents = contents.replace('#prepareRender() {', `
    getVariableReferences() {
      return this.#variableReferences;
    }

    getTemplate() {
      return this.#templateString;
    }

    #prepareRender() {`);
        contents = contents.replace(`['render','onLoadRender'].includes(key)`, `['render', 'onLoadRender', 'getVariableReferences', 'getTemplate'].includes(key)`)
        // contents = `${contents.match(routesImport) === null ? 'import { routes } from \'@webformula/core\';' : ''}${contents}\n${config.routesCode}${config.debugScript || ''}`;
        return { contents };
      });
    }
  }
};

async function run() {
  if (config.onStart) await config.onStart();
  await cleanOutdir();
  const routes = await getRoutes();
  config.routesCode = `${routes.map(v => `const ${v.routeModuleName} = import('${v.importPath}');`).join('\n')}

routes([
  ${routes.map(v => `{
    path: '${v.routePath}',
    regex: ${v.regex},
    component: ${v.routeModuleName}${!v.notFound ? '' : `,
    notFound: true`}
  }`)}
]);${!isDev ? '' : `\n\nwindow.webformulaRoutes = [${routes.map(v => `{
  path: '${v.routePath}',
  regex: ${v.regex},
  component: ${v.routeModuleName}${!v.notFound ? '' : `,
  notFound: true`}
}`)}];`}`;

  const { metafile } = await esbuild.build({
    entryPoints: [
      config.appFilePath,
      ...routes.map(v => v.filePath)
    ],
    bundle: true,
    outdir: config.outdir,
    metafile: true,
    entryNames: '[name]-[hash]',
    format: 'esm',
    loader: { '.html': 'text' },
    plugins: [pluginCss],
    minify: config.minify,
    splitting: config.chunks,
    sourcemap: config.sourcemap
  });

  const appCSSContext = !config.hasAppCSS ? undefined : await esbuild.build({
    entryPoints: [config.appCSSFilePath],
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
    appJSFile,
    appCSSFile
  } = buildOutputs(metafile.outputs, appCSSContext?.metafile.outputs, routes);

  const indexHTMLFiles = await buildIndexHTMLFile(appJSFile, appCSSFile, routeConfigs);
  const copiedFiles = await copyFiles(config, outputs);
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

  if (config.devServer.enabled) devServer({
    ...returnData,
    devServer: config.devServer
  });
  return returnData;
}


const htmlCommentsRegex = /<!--[\s\S]*?-->/g;
const headRegex = /<head>((?:.|\n)+)<\/head>/;
const tagsRegex = /<[^>]*>[^<]*(?:<\/[^>]*>)?/g;
const linkStartRegex = /^<link/;
const scriptStartRegex = /^<script/;
const titleStartRegex = /^<title/;
const pageContentTagRegex = /(<\s?page-content\s?>)[^>]*(<\s?\/\s?page-content\s?>)|(<[^>]*id="page-content"[^>]*>)[^>]*(<\/[^>]*>)/;

async function buildIndexHTMLFile(appJSFile, appCSSFile, routeConfigs) {
  const appScriptPath = `/${appJSFile.output.split('/').pop()}`;
  const indexFile = await readFile(config.indexHTMLPath, 'utf-8');

  // find correct positions for modulepreload, links, scripts
  const headTags = indexFile
    .replace(htmlCommentsRegex, '')
    .match(headRegex)[1]
    .match(tagsRegex);
  const firstLinkIndex = headTags.findIndex(v => v.match(linkStartRegex));
  const lastLinkIndex = headTags.findLastIndex(v => v.match(linkStartRegex));
  const firstScriptIndex = headTags.findIndex(v => v.match(scriptStartRegex));
  const titleIndex = headTags.findIndex(v => v.match(titleStartRegex));
  if (titleIndex) headTags[titleIndex] = 'replace:title';
  else headTags.unshift('replace:title');
  headTags.splice(0, 0, 'replace:modulepreload');
  if (firstScriptIndex === -1 && firstScriptIndex === -1) {
    headTags.push('replace:css');
    headTags.push('replace:js');
  } else {
    if (firstScriptIndex === -1) {
      headTags.splice(lastLinkIndex + 1, 0, 'replace:css');
      headTags.push('replace:js');
    } else if (firstLinkIndex === -1 || firstScriptIndex < lastLinkIndex) {
      headTags.splice(firstScriptIndex, 0, 'replace:css', 'replace:js');
    } else {
      headTags.splice(firstScriptIndex, 0, 'replace:js');
      headTags.splice(lastLinkIndex + 1, 0, 'replace:css');
    }
  }
  addMockDom();

  const data = await Promise.all(routeConfigs.map(async route => {
    // load page to build template
    const routeModule = await import(path.resolve('.', route.output));
    customElements.define(`page-${config.pageCounter++}`, routeModule.default);
    routeModule.default._isPage = true;
    routeModule.default.useTemplate = false;
    const template = new routeModule.default().template();
    
    // get imported chunks to preload
    const importChunks = appJSFile.imports.map(v => v.path.split('/').pop()).filter(v => v.startsWith('chunk-'));
    route.imports.forEach(v => {
      if (v.path.includes('chunk-') && !importChunks.includes(v.path)) importChunks.push(v.path.split('/').pop());
    });

    // setup style and script tags
    // wite route template
    const content = indexFile
      .replace(headRegex, `<head>
  ${headTags
      .join('\n  ')
      .replace('replace:title', `<title>${routeModule.default.title}</title>`)
      .replace(
        'replace:modulepreload',
        `<link rel="modulepreload" href="${appScriptPath}" />
  ${route.routeScriptPath ? `<link rel="modulepreload" href="${route.routeScriptPath}" />` : ''}
  ${importChunks.map(v => `<link rel="modulepreload" href="/${v}" />`).join('\n  ')}`
      )
      .replace(
        'replace:js',
        `${route.routeScriptPath ? `<script src="${route.routeScriptPath}" type="module" defer></script>` : ''}
  <script src="${appScriptPath}" type="module" defer></script>
  ${(!isDev || !config.devServer.liveReload) ? '' : `<script>
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
  </script>`}`
      )
      .replace('replace:css', !appCSSFile ? '' : `<link href="/${appCSSFile.output.split('/').pop()}" rel="stylesheet">`)}
</head>`)
      .replace(pageContentTagRegex, (_, startA, endA, startB, endB) => `${startA || startB}\n<template shadowrootmode="open"><slot></slot></template>\n${template.split('\n').join('\n')}\n${endA || endB}`);

    return {
      fileName: route.indexHTMLFileName,
      content
    };
  }));
  
  await Promise.all(data.map(async v => writeFile(v.fileName, v.content)));
  if (config.chunks === false) await Promise.all(routeConfigs.map(async v => rm(v.output)));
  return data.map(v => ({ output: v.fileName }));
}

async function cleanOutdir(dir = config.outdir) {
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


const leadingTrailingSlashRegex = /^\/|\/$/g;
const indexPathRegex = /^index$/;
const slashBeforeBracketRegex = /\/?\[/g;
const restUrlRegex = /\[\.{3}(.+)\]/;
const parameterUrlRegex = /\[(.+)\]/;

async function getRoutes() {
  const routePaths = await getRoutePaths();
  const routeStripper = new RegExp(`${config.basedir}routes|\/index\.js$`, 'g');
  let hasIndex = false;

  const routes = routePaths.map(v => {
    const rawRoutePath = v.replace(routeStripper, '');
    const routePath = `/${rawRoutePath
      .replace(leadingTrailingSlashRegex, '')
      .replace(indexPathRegex, '')
      .replace(slashBeforeBracketRegex, '/[')
      .replace(restUrlRegex, '*$1')
      .replace(parameterUrlRegex, ':$1')}`;
    if (routePath === '/') hasIndex = true;
    const indexHTMLFileName = routePath === '/' ? path.join(config.outdir, 'index.html') : path.join(config.outdir, `${routePath.replace(spaceRegex, '-').replace(routeToNameRegex, '')}.html`);
    return {
      filePath: v,
      importPath: `./routes${rawRoutePath}/index.js`,
      routePath,
      indexHTMLFileName,
      regex: buildPathRegex(routePath),
      routeModuleName: `r_${rawRoutePath.replace(routeToNameRegex, '')}`,
      notFound: rawRoutePath === '/404'
    };
  });
  if (!hasIndex) console.warn('Missing index route. `routes/index/index.js`');
  return routes;
}

async function getRoutePaths(dir = path.join(config.basedir, 'routes'), arr = []) {
  const files = await readdir(dir);
  await Promise.all(files.map(async file => {
    const filePath = path.join(dir, file);
    if ((await stat(filePath)).isDirectory()) return getRoutePaths(filePath, arr);
    if (filePath.endsWith('index.js')) arr.push(filePath);
  }));
  return arr;
}


const spaceRegex = /\s/g;
const containsVariableOrWildcardRegex = /\/:|\*/g;
const searchRegexString = '(\\?([^#]*))?';
const hashRegexString = '(#(.*))?';
const wildcardRegex = /\*/g;
const replaceWidCardString = '(?:.*)';
const followedBySlashRegexString = '(?:\/$|$)';
const parameterRegex = /(\/)?([:*])(\w+)(\?)?/g;

function buildPathRegex(route) {
  // replace space with regex character set for space or hyphen or encoded space
  route = route.trim().replace(spaceRegex, '(?:[\\s-]|%20)');
  if (route.match(containsVariableOrWildcardRegex) === null) {
    // Do not allow hashes on root or and hash links
    if (route.trim() === '/' || route.includes('#')) return new RegExp(`^${route}$`);
    return new RegExp(`^${route}${searchRegexString}${hashRegexString}$`);
  }

  return new RegExp(
    `^${route
      .replace(parameterRegex, (_full, slash, prefix, name, optional) => {
        if (prefix === '*') return `${slash}${slash && optional ? '?' : ''}(?<${name}>.+)${optional}`;
        return `${slash}${slash && optional ? '?' : ''}(?<${name}>[^\/]+)${optional}`;
      })
      .replace(wildcardRegex, replaceWidCardString)
    }${followedBySlashRegexString}$`,
    ''
  );
}

function buildOutputs(appOutputs, appCSSOutputs, routes) {
  const outputs = Object.keys(appOutputs).map(key => ({
    output: key,
    ...appOutputs[key]
  }));

  let appCSSFile;
  if (appCSSOutputs) {
    appCSSFile = Object.keys(appCSSOutputs).map(key => ({
      output: key,
      ...appCSSOutputs[key]
    }))[0];
    outputs.push(appCSSFile)
  }

  const routeConfigs = routes.map(v => {
    const moduleOutput = outputs.find(b => b.entryPoint === v.filePath);

    return {
      ...v,
      output: moduleOutput.output,
      imports: moduleOutput.imports,
      htmlImports: Object.keys(moduleOutput.inputs).filter(v => v.endsWith('html')),
      routeScriptPath: !config.chunks ? undefined : `/${moduleOutput.output.split('/').pop()}`
    };
  });

  return {
    routeConfigs,
    outputs,
    appJSFile: outputs.find(v => v.entryPoint === config.appFilePath),
    appCSSFile
  };
}
