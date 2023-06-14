import path from 'node:path';
import { access, readFile, readdir, stat, rm, writeFile, mkdir, cp } from 'node:fs/promises';
import esbuild from 'esbuild';
import { gzip } from 'node:zlib';
import { promisify } from 'node:util';
import { createServer } from 'node:http';
import './dom.js';
import {
  isDev,
  isSourceMaps,
  isMinify,
  isGzip,
  isLiveReload,
  cssFilterRegex
} from '../vars.js';

const asyncGzip = promisify(gzip);
const importRegex = /import(\{?\s?(?<name>.+?)\s?\}?\s?from)?\s?['|"](?<path>.+?)['|"]\s?(;|\n)/g
const routesRegex = /routes\s?\(\s?\[([\s\S]*.*)\]\s?\);?/;
const routePageRegex = /component:\s?(.+?)\s?(,|})/;
const routePathRegex = /path:\s?'?"?\s?(.+?)('|")/;
const routeConfigObjectRegex = /\{.*\}/g;
const scriptTagRegex = /<\s*script[^>]*src="\.?\/?app.js"[^>]*>[^>]*<\s*\/\s*script>/g;
const pageContentTagRegex = /<\s?page-content\s?>[^>]*<\s?\/\s?page-content\s?>/;
const cssTagRegex = /<\s*link[^>]*href="\.?\/?app.css"[^>]*>/;
const config = {};

export default async function build(params = {
  basedir: 'app/',
  outdir: 'dist/',
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
  config.minify = params.minify === false ? false : params.minify === true ? true : isMinify;
  config.gzip = params.gzip === false ? false : params.gzip === true ? true : isGzip;
  config.sourcemaps = params.sourcemaps === false ? false : params.sourcemaps === true ? true : isSourceMaps;
  config.devServer = params.devServer || { enabled: false };
  config.devServer.enabled = params?.devServer?.enabled === false ? false : true;
  config.devServer.port = params?.devServer?.port || 3000;
  config.devServer.liveReload = params?.devServer?.liveReload === false ? false : params?.devServer?.liveReload === true ? true : isLiveReload;
  config.copyFiles = (params.copyFiles || []).filter(({ from }) => !!from);
  config.onStart = params.onStart;
  config.onEnd = params.onEnd;
  config.indexHTMLPath = path.join(config.basedir, '/index.html');
  config.indexHTMLOutPath = path.join(config.outdir, '/index.html');
  config.appFilePath = path.join(config.basedir, '/app.js');
  config.appOutFilePath = path.join(config.outdir, '/app.js');
  config.appCSSFilePath = path.join(config.basedir, '/app.css');
  config.appCSSOutFilePath = path.join(config.outdir, '/app.css');
  // config.appJSOutputFilePath = path.join(config.basedir, 'app.js');
  config.hasAppCSS = await access(config.appCSSFilePath).then(e => true).catch(e => false);
  if (config.hasAppCSS) config.appCSSOutputFilePath = path.join(config.outdir, 'app.css');
  if ((await access(config.appFilePath).then(() => false).catch(() => true))) throw Error(`app.js required. Expected path: ${config.appFilePath}`);
  await run();
}




const pluginStart = {
  name: 'Start',
  setup(build) {
    if (config.onStart) build.onStart(async () => config.onStart());
  }
};

const pluginRebuild = {
  name: 'rebuild',
  setup(build) {
    // send reload request
    build.onEnd(() => {
      // clients.forEach((res) => res.write('data: update\n\n'))
      // clients.length = 0;
    });
  }
};

const pluginEnd = {
  name: 'End',
  setup(build) {
    build.onEnd(async ({ metafile }) => {
      // config.appJSOutputFilePath = Object.keys(metafile.outputs)[0];
      const outputFiles = Object.keys(metafile.outputs);
      const outputFilesMapped = outputFiles.map(output => ({
        output,
        input: metafile.outputs[output].entryPoint
      }));
      const indexFiles = outputFilesMapped
        .filter(a => (
          a.input !== '_wf/_wf_main_global.js'
          && !config.pageEntryFiles.find(b => a.input === path.join(config.basedir, b.originalPagePath || ''))
        ));
      const pageFiles = outputFilesMapped.filter(a => config.pageEntryFiles.find(b => a.input === path.join(config.basedir, b.originalPagePath || '')));
      await Promise.all([
      //   await copyFiles(metafile),
        ...outputFiles.map(v => gzipFile(v)),
        // gzipAppFiles(Object.keys(metafile.outputs)),
        buildIndexHTML(indexFiles, pageFiles)
      ]);
      if (config.onEnd) await config.onEnd();
    });
  }
};

const pluginCss = {
  name: 'css',
  setup(build) {
    // config.bundleBrowserPath = build.initialOptions.outfile.replace(config.outdir, '');

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
    })
  }
};

const pluginEndCSS = {
  name: 'CSS end',
  setup(build) {
    if (config.hasAppCSS) {
      build.onEnd(async ({ metafile }) => {
        config.appCSSOutputFilePath = Object.keys(metafile.outputs)[0];
        if (config.gzip) await gzipFile(Object.keys(metafile.outputs)[0]);
        await buildIndexHTMLCSS();
      });
    }
  }
};




async function run() {
  config.pageEntryFiles =  await parseAppFile();
  await mkdir('_wf', { recursive: true });
  await cp(config.basedir, '_wf', { recursive: true });
  await Promise.all(config.pageEntryFiles.map(v => writeFile(path.join('_wf', v.fileName), v.content)));

  await emptyOutdir();

  const context = await esbuild.context({
    entryPoints: [
      '_wf/app.js',
      ...config.pageEntryFiles.map(v => `_wf/${v.fileName}`),
      ...config.pageEntryFiles
        .filter(v => v.originalPagePath && v.fileName !== 'app.js')
        .map(v => ({
          in: path.resolve(config.basedir, v.originalPagePath),
          out: v.originalPagePath.replace(/\/|\.|\s/g, '')
        }))
      ],
    bundle: true,
    outdir: config.outdir,
    metafile: true,
    entryNames: isDev ? '[name]' : '[name]-[hash]',
    format: 'esm',
    target: 'esnext',
    loader: { '.html': 'text' },
    plugins: [pluginStart, pluginRebuild, pluginCss, pluginEnd],
    minify: config.minify,
    sourcemap: config.sourcemap,
    // banner: (!isDev || !config.devServer.liveReload) ? undefined : { js: ' (() => new EventSource("/esbuild").onmessage = () => location.reload())();' }
  });

  if (config.hasAppCSS) {
    const contextCss = await esbuild.context({
      entryPoints: ['_wf/app.css'],
      bundle: true,
      outfile: config.appCSSOutFilePath,
      metafile: true,
      entryNames: isDev ? '[name]' : '[name]-[hash]',
      minify: isMinify,
      plugins: [pluginRebuild, pluginEndCSS],
      loader: { '.css': 'css' }
    });
    if (isDev) contextCss.watch();
    else await contextCss.rebuild();
  }

  if (!isDev || !config.devServer.enabled) {
    await context.rebuild();
    process.exit();
    return;
  }


  context.watch().then(() => {
    createServer(async (req, res) => {
      // setup reload request
      // if (req.url === '/esbuild') return clients.push(
      //   res.writeHead(200, {
      //     'Content-Type': 'text/event-stream',
      //     'Cache-Control': 'no-cache',
      //     Connection: 'keep-alive'
      //   })
      // );

      // search index.html
      if (!getExtension(req.url)) {
        const filePath = req.url.split('/').pop();
        const fileName = filePath === '' ? 'index.html.gz' : await access(path.join(config.outdir, `page_${filePath}.html.gz`)).then(() => true).catch(() => false) ? `page_${filePath}.html.gz` : 'page_notfound.html.gz'; 
        const file = await readFile(path.join(config.outdir, fileName));
        // inject bundle
        // res.write(file.replace('</head>', `  <script src="${config.bundleBrowserPath}" type="module"></script>\n</head>`));
        res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Encoding': 'gzip' });
        res.write(file);
        res.end();

        // const raw = fs.createReadStream('index.html');
        // response.writeHead(200, { 'content-encoding': 'gzip' });
        // raw.pipe(zlib.createGzip()).pipe(response);
        return;
      }


      const contentType = getMimeType(req.url);
      const filePath = path.resolve(path.join(config.outdir, req.url.replace(/%20/g, ' ')));

      try {
        const file = await readFile(filePath)
        res.writeHead(200, { 'Content-Type': contentType });
        res.write(file);
        res.end();
      } catch (e) {
        console.log(e);
        res.writeHead(404);
        res.end();
      }
    }).listen(config.devServer.port);
  });
}

async function parseAppFile() {
  const appFileContent = await readFile(config.appFilePath, 'utf-8');

  const importMatches = [...appFileContent.matchAll(importRegex)];
  const routesMatch = appFileContent.match(routesRegex);
  const routes = [...routesMatch[1].matchAll(routeConfigObjectRegex)].map(v => v[0]);
  const pages = routes.map(routeObj => {
    const nameMatch = routeObj.match(routePageRegex);
    const pathMatch = routeObj.match(routePathRegex);
    const importMatch = importMatches.find(({ groups }) => groups.name === nameMatch[1]);
    return {
      routeObj,
      path: pathMatch[1],
      importMatch
    };
  });

  let content = appFileContent
    .replace(importRegex, '')
    .replace(routesRegex, '')
    .replace(/\n\n/g, '')
    .trim();

  const nonPageImports = importMatches
    .filter(a => !pages.find(b => b.importMatch === a))
    .map(v => v[0])
    .join('\n');

  const builtPages = [
    {
      fileName: 'app.js',
      path: '/',
      pageFileName: '_wf_page_index.js',
      content: appFileContent,
      originalPagePath: pages.find(v => v.path === '/').importMatch.groups.path
    },
    {
      fileName: '_wf_main_global.js',
      content: content
    },
    ...pages.map(v => ({
      fileName: `_wf_page_${v.path.replace(/\/|\./g, '') || 'root'}.js`,
      path: v.path,
      pageFileName: `_wf_page_${v.path.replace(/\/|\./g, '') || 'root'}.js`,
      originalPagePath: v.importMatch.groups.path,
      content: `${nonPageImports}
${v.importMatch[0]}
${`import './_wf_main_global.js';`}

routes([${v.routeObj}]);`
    }))
  ];

  return builtPages;
}

async function emptyOutdir(dir = config.outdir) {
  const files = await readdir(dir);

  await Promise.all(files.map(async file => {
    const filePath = path.join(dir, file);
    if ((await stat(filePath)).isDirectory()) return emptyOutdir(filePath);
    await rm(filePath);
  }));
}

function getExtension(url) {
  if (!url.includes('.')) return '';
  return url.split(/[#?]/)[0].split('.').pop().trim().toLowerCase();
}

function getMimeType(url) {
  switch (getExtension(url)) {
    case 'js':
      return 'application/javascript';
    case 'html':
      return 'text/html';
    case 'css':
      return 'text/css';
    case 'json':
      return 'text/json';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    case 'ico':
      return 'image/x-icon';
  }
}

async function gzipFile(file) {
  const result = await asyncGzip(await readFile(file));
  await writeFile(`${file}.gz`, result);
}


async function buildIndexHTML(indexFiles, pageFiles) {
  const indexFile = await readFile(config.indexHTMLPath, 'utf-8');

  config.indexHTMLOutputData = await Promise.all(indexFiles.map(async filePaths => {
    const page = config.pageEntryFiles.find(v => v.fileName === filePaths.input.replace('_wf/', ''));
    const pageModulePath = pageFiles.find(v => v.input === path.join(config.basedir, page.originalPagePath));
    const pageModule = await import(path.resolve('.', pageModulePath.output));
    pageModule.default._isPage = true;
    pageModule.default.useTemplate = false;
    const template = new pageModule.default().template();
    const fileContent = await readFile(filePaths.output, 'utf-8');
    const fileName = filePaths.input.replace('_wf/', config.outdir).replace('_wf_', '').replace('.js', '.html');
    const obj = {
      fileName: fileName === path.join(config.outdir, 'app.html') ? path.join(config.outdir, 'index.html') : fileName,
      content: indexFile
        .replace(pageContentTagRegex, () => `<page-content>\n${template}\n</page-content>`)
        .replace(scriptTagRegex, () => `<script type="module" async>
${fileContent.split('\n').map(str => `    ${str}`).join('\n')}
  </script>`)
      // content: indexFile.replace('app.js', filePaths.output.split('/').pop())
    };
    return obj;
  }));
  config.buildIndexHTMLJS = true;
  if (!config.buildIndexHTMLCSS) await buildIndexHTMLCSS();
  else await writeIndexHTML();
}

async function buildIndexHTMLCSS() {
  if (!config.hasAppCSS) return;
  if (config.buildIndexHTMLJS) {
    config.buildIndexHTMLCSS = true;
    await Promise.all(config.indexHTMLOutputData.map(async v => {
      v.content = v.content.replace(cssTagRegex, `<style>${(await readFile(config.appCSSOutputFilePath, 'utf-8')).split('\n').map(str => `    ${str}`).join('\n')}</style>`)
      // v.content = v.content.replace('app.css', `${config.appCSSOutputFilePath.split('/').pop()}${config.gzip ? '.gz' : ''}`);
    }));
    await writeIndexHTML();
  }
}

async function writeIndexHTML() {
  await Promise.all(config.indexHTMLOutputData.map(async v => {
    await writeFile(v.fileName, v.content);
    if (config.gzip) await gzipFile(v.fileName);
  }));
}
