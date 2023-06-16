import path from 'node:path';
import { access, readFile, readdir, stat, rm, rmdir, writeFile, mkdir, cp } from 'node:fs/promises';
import esbuild from 'esbuild';
import { gzip } from 'node:zlib';
import { promisify } from 'node:util';
import { createServer } from 'node:http';
import { getExtension } from './shared.js';
import copyFiles from './copyFiles.js';
import './dom.js';
const {
  WEBFORMULA_DEV,
  WEBFORMULA_SOURCEMAPS,
  WEBFORMULA_MINIFY,
  WEBFORMULA_LIVERELOAD,
  WEBFORMULA_GZIP
} = process.env;


const webformulaDev = WEBFORMULA_DEV === 'true' ? true : WEBFORMULA_DEV === 'false' ? false : undefined;
const isDev = webformulaDev !== undefined ? webformulaDev : process.env.NODE_ENV !== 'production';
const isSourceMaps = WEBFORMULA_SOURCEMAPS === 'false' ? false : isDev;
const isMinify = WEBFORMULA_MINIFY === 'false' ? false : true;
const isGzip = WEBFORMULA_GZIP === 'false' ? false : true;
const isLiveReload = WEBFORMULA_LIVERELOAD === 'false' ? false : isDev;
const cssFilterRegex = /\.css$/;
const asyncGzip = promisify(gzip);
const importRegex = /import\s?(\{?\s?(?<name>[\w\s,]+?)\s?\}?\s?from)?\s?['|"](?<path>.+?)['|"]\s?(;|\n)/g;
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
  /** spa, separate, spaSingleFile */
  mode: 'spa',
  minify: true,
  sourcemaps: false,
  gzip: true,
  chunks: true,
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
  config.mode = params.mode || 'spa';
  config.minify = params.minify === false ? false : params.minify === true ? true : isMinify;
  config.gzip = params.gzip === false ? false : params.gzip === true ? true : isGzip;
  config.sourcemaps = params.sourcemaps === false ? false : params.sourcemaps === true ? true : isSourceMaps;
  config.chunks = params.chunks !== false ? true : false;
  config.devServer = params.devServer || { enabled: false };
  config.devServer.enabled = params?.devServer?.enabled === false ? false : true;
  config.devServer.port = params?.devServer?.port || 3000;
  config.devServer.liveReload = params?.devServer?.liveReload === false ? false : params?.devServer?.liveReload === true ? true : isLiveReload;
  config.copyFiles = (params.copyFiles || []).filter(({ from }) => !!from);
  config.onStart = params.onStart;
  config.onEnd = params.onEnd;
  config.cachedir = path.join(config.outdir, '.cache');
  config.appFilePath = path.join(config.basedir, '/app.js');
  config.indexHTMLPath = path.join(config.basedir, '/index.html');
  config.appCSSFilePath = path.join(config.basedir, '/app.css');
  config.hasAppCSS = await access(config.appCSSFilePath).then(e => true).catch(e => false);
  if (config.hasAppCSS) config.appCSSOutputFilePath = path.join(config.outdir, 'app.css');
  if ((await access(config.appFilePath).then(() => false).catch(() => true))) throw Error(`app.js required. Expected path: ${config.appFilePath}`);

  await run();
}

const pluginCss = {
  name: 'css',
  setup(build) {
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


async function run() {
  config.entryFiles = await parseAppFile();
  await emptyOutdir();
  await mkdir(config.cachedir, { recursive: true });
  await cp(config.basedir, config.cachedir, { recursive: true });
  await Promise.all([
    ...config.entryFiles.appFiles.map(v => writeFile(path.join(config.cachedir, v.outFileName), v.content)),
    ...config.entryFiles.pageFiles.map(v => writeFile(path.join(config.cachedir, v.outFileName), v.content))
  ]);
  const { metafile } = await esbuild.build({
    entryPoints: [
      ...config.entryFiles.appFiles.map(v => ({
        in: path.join(config.cachedir, v.outFileName),
        out: path.join(config.outdir, v.outFileName)
      })),
      ...config.entryFiles.pageFiles.map(v => ({
        in: path.join(config.cachedir, v.outFileName),
        out: path.join(config.outdir, v.outFileName)
      })),
      ...config.entryFiles.pageFiles.map(v => ({
        in: path.join(config.cachedir, v.importPath),
        out: path.join(config.outdir, v.outPageFileName)
      }))
    ],
    bundle: true,
    outdir: config.outdir,
    metafile: true,
    entryNames: '[name]-[hash]',
    format: 'esm',
    target: 'esnext',
    loader: { '.html': 'text' },
    plugins: [pluginCss],
    minify: config.minify,
    splitting: config.chunks,
    sourcemap: config.sourcemap,
    // banner: (!isDev || !config.devServer.liveReload) ? undefined : { js: ' (() => new EventSource("/esbuild").onmessage = () => location.reload())();' }
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

  const outputs = Object.keys(metafile.outputs).map(key => ({
    output: key,
    ...metafile.outputs[key]
  }));
  const appJSFile = outputs.find(v => v.entryPoint === path.join(config.cachedir, 'app.js'));
  const appCSSFile = Object.keys(appCSSContext?.metafile.outputs).map(key => ({
    output: key,
    ...metafile.outputs[key]
  }))[0];
  config.entryFiles.pageFiles.forEach(page => {
    const pageOutput = path.join(config.cachedir, page.outFileName);
    const pageModuleOutput = path.join(config.cachedir, page.importPath);
    page.finalOutput = outputs.find(output => output.entryPoint === pageOutput)?.output;
    page.moduleOutput = outputs.find(output => output.entryPoint === pageModuleOutput)?.output;
  });
  await copyFiles(config)
  await buildIndexHTML(appJSFile, config.entryFiles.pageFiles, appCSSFile);
  await cleanupDist();
  if (config.gzip) await gzipFiles();
  if (config.devServer.enabled) runServer();
  if (!isDev) process.exit();
}

function runServer() {
  createServer(async (req, res) => {
    // setup reload request
    if (req.url === '/esbuild') return res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no'
    });

    // serve pages
    if (!getExtension(req.url)) {
      const filePath = req.url.split('/').pop();
      const fileName = filePath === '' ? 'index.html' : await access(path.join(config.outdir, `${filePath}.html`)).then(() => true).catch(() => false) ? `${filePath}.html` : 'notfound.html';
      const file = await readFile(`${path.join(config.outdir, fileName)}${config.gzip ? '.gz' : ''}`, config.gzip ? undefined : 'utf-8');

      const headers = { 'Content-Type': 'text/html' };
      if (config.gzip) headers['Content-Encoding'] = 'gzip';
      res.writeHead(200, headers);
      res.write(file);
      res.end();
      return;
    }

    let contentType = getMimeType(req.url);
    let filePath = path.resolve(path.join(config.outdir, req.url.replace(/%20/g, ' ')));
    if (config.gzip && !filePath.includes('.gz')) filePath += '.gz';

    try {
      const found = await access(filePath).then(() => true).catch(() => false);
      if (!found) filePath = filePath.replace('.js', '.js.js');
      const file = await readFile(filePath, config.gzip ? undefined : 'utf-8');
      const headers = { 'Content-Type': contentType, 'Cache-Control': 'max-age=86400' };
      if (config.gzip) headers['Content-Encoding'] = 'gzip';
      res.writeHead(200, headers);
      res.write(file);
      res.end();
    } catch (e) {
      console.log(e);
      res.writeHead(404);
      res.end();
    }
  }).listen(config.devServer.port);
}

async function buildIndexHTML(appJSFile, pageFiles, appCSSFile) {
  switch (config.mode) {
    case 'spa':
      return buildIndexHTMLSinglePage(pageFiles, appCSSFile);
    case 'spaSingleFile':
      return buildIndexHTMLSinglePageSingleFile(appJSFile, pageFiles, appCSSFile);
    case 'separate':
    default:
      return buildIndexHTMLSeparatePage(pageFiles, appCSSFile);
  }
}

async function buildIndexHTMLSinglePage(pageFiles, appCSSFile) {
  const indexFile = await readFile(config.indexHTMLPath, 'utf-8');

  const data = await Promise.all(pageFiles.map(async item => {
    const pageModule = await import(path.resolve('.', item.moduleOutput));
    pageModule.default._isPage = true;
    pageModule.default.useTemplate = false;
    const template = new pageModule.default().template();
    let fileContent = await readFile(item.finalOutput, 'utf-8');
    let content = indexFile
      .replace(pageContentTagRegex, () => `<page-content>\n${template}\n</page-content>`)
      .replace(scriptTagRegex, () => `
      <script>window._webformulaSinglePage = true;</script>
      <script type="module" async>
        ${fileContent.split('\n').map(str => `    ${str}`).join('\n')}
        window.wfRoutes([
          ${pageFiles.filter(b => item !== b).map(b => {
        return b.routeStr.replace(routePageRegex, (match, component) => (
          match.replace(component, `'./${b.moduleOutput.split('/').pop()}'`)
        ))
      }).join(',\n  ')}
        ]);
      </script>
      ${(!isDev || !config.devServer.liveReload) ? '' : `<script>new EventSource("/esbuild").onerror = () => setTimeout(() => location.reload(), 500);</script>`}`);
    if (appCSSFile) content = content.replace(cssTagRegex, `<style>${(await readFile(appCSSFile.output, 'utf-8')).split('\n').map(str => `    ${str}`).join('\n')}</style>`);

    return {
      fileName: item.path === '/' ? path.join(config.outdir, 'index.html') : path.join(config.outdir, `${item.path.replace(/\/|\.|\s/g, '')}.html`),
      content
    }
  }));
  await Promise.all(data.map(async v => writeFile(v.fileName, v.content)));
}

async function buildIndexHTMLSinglePageSingleFile(appJSFile, pageFiles, appCSSFile) {
  const indexFile = await readFile(config.indexHTMLPath, 'utf-8');

  const data = await Promise.all(pageFiles.map(async item => {
    const pageModule = await import(path.resolve('.', item.moduleOutput));
    pageModule.default._isPage = true;
    pageModule.default.useTemplate = false;
    const template = new pageModule.default().template();
    let content = indexFile
      .replace(pageContentTagRegex, () => `<page-content>\n${template}\n</page-content>`)
      .replace(scriptTagRegex, () => `
      <script>window._webformulaSinglePage = true;</script>
      <script src="./${appJSFile.output.split('/').pop()}${config.gzip ? '.gz' : ''}" type="module" async></script>
      ${(!isDev || !config.devServer.liveReload) ? '' : `<script>new EventSource("/esbuild").onerror = () => setTimeout(() => location.reload(), 500);</script>`}`);
    if (appCSSFile) content = content.replace(cssTagRegex, `<link href="./${appCSSFile.output.split('/').pop()}${config.gzip ? '.gz' : ''}" rel="stylesheet">`);

    return {
      fileName: item.path === '/' ? path.join(config.outdir, 'index.html') : path.join(config.outdir, `${item.path.replace(/\/|\.|\s/g, '')}.html`),
      content
    }
  }));
  await Promise.all(data.map(async v => writeFile(v.fileName, v.content)));
}

async function buildIndexHTMLSeparatePage(pageFiles, appCSSFile) {
  const indexFile = await readFile(config.indexHTMLPath, 'utf-8');

  const data = await Promise.all(pageFiles.map(async item => {
    const pageModule = await import(path.resolve('.', item.moduleOutput));
    pageModule.default._isPage = true;
    pageModule.default.useTemplate = false;
    const template = new pageModule.default().template();
    let fileContent = await readFile(item.finalOutput, 'utf-8');
    let content = indexFile
      .replace(pageContentTagRegex, () => `<page-content>\n${template}\n</page-content>`)
      .replace(scriptTagRegex, () => `
      <script type="module" async>${fileContent.split('\n').map(str => `    ${str}`).join('\n')}</script>
      ${(!isDev || !config.devServer.liveReload) ? '' : `<script>new EventSource("/esbuild").onerror = () => setTimeout(() => location.reload(), 500);</script>`}`);
    if (appCSSFile) content = content.replace(cssTagRegex, `<link href="./${appCSSFile.output.split('/').pop()}${config.gzip ? '.gz' : ''}" rel="stylesheet">`);

    return {
      fileName: item.path === '/' ? path.join(config.outdir, 'index.html') : path.join(config.outdir, `${item.path.replace(/\/|\.|\s/g, '')}.html`),
      content
    }
  }));
  await Promise.all(data.map(async v => writeFile(v.fileName, v.content)));
}

async function parseAppFile() {
  const appFileContent = await readFile(config.appFilePath, 'utf-8');
  const importMatches = [...appFileContent.matchAll(importRegex)];
  const routesMatch = appFileContent.match(routesRegex);
  const routes = [...routesMatch[1].matchAll(routeConfigObjectRegex)].map(v => v[0]);
  const pages = routes.map(routeStr => {
    const nameMatch = routeStr.match(routePageRegex);
    const pathMatch = routeStr.match(routePathRegex);
    const importMatch = importMatches.find(({ groups }) => groups.name === nameMatch[1]);
    return {
      routeStr,
      path: pathMatch[1],
      importStr: importMatch[0],
      importName: importMatch.groups.name,
      importPath: importMatch.groups.path,
      outFileName: `entry_${pathMatch[1].replace(/\/|\./g, '') || 'rootpage'}.js`,
      outPageFileName: `page_${pathMatch[1].replace(/\/|\./g, '') || 'rootpage'}.js`
    };
  });

  const nonPageImports = importMatches
    .filter(a => !pages.find(b => b.importStr === a[0]))
    .map(v => v[0])
    .join('\n');

  return {
    appFiles: [
      {
        fileName: 'app.js',
        outFileName: 'app.js',
        content: appFileContent
      },
      {
        fileName: 'wf_main_global.js',
        outFileName: 'wf_main_global.js',
        content: appFileContent
          .replace(importRegex, '')
          .replace(routesRegex, '')
          .replace(/\n\n/g, '')
          .trim()
      }
    ],
    pageFiles: pages.map(v => ({
      ...v,
      content: `
        ${nonPageImports}
        ${v.importStr}
        ${`import './wf_main_global.js';`}

        routes([
          ${v.routeStr}
        ]);
      `.replace(/        /g, '') // remove the leading 8 spaces to fix indent
    }))
  }
}

async function emptyOutdir(dir = config.outdir) {
  const files = await readdir(dir);

  await Promise.all(files.map(async file => {
    const filePath = path.join(dir, file);
    if ((await stat(filePath)).isDirectory()) return emptyOutdir(filePath);
    await rm(filePath);
  }));
}

async function gzipFiles(dir = config.outdir) {
  const files = (await readdir(dir)).filter(v => v !== '.cache');

  await Promise.all(files.map(async file => {
    const filePath = path.join(dir, file);
    if ((await stat(filePath)).isDirectory()) return gzipFiles(filePath);
    let content = await readFile(filePath, 'utf-8');
    content = content.replace(importRegex, (a) => {
      return a
        .replace('.gz', '')
        .replace('.js', '.js.gz')
        .replace('.css', '.css.gz')
        .replace('.html', '.html.gz');
    });
    const result = await asyncGzip(content);
    await writeFile(`${filePath}.gz`, result);
  }));
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

async function cleanupDist() {
  const files = await readdir(config.outdir);
  await Promise.all([
    ...files.map(async file => {
      if (!file.startsWith('entry_') && !file.startsWith('wf_main_')) return;
      const filePath = path.join(config.outdir, file);
      await rm(filePath);
    }),
    emptyCachedir()
  ]);

  switch (config.mode) {
    case 'spa':
      // remove app.js, app.css
      await Promise.all(files.map(async file => {
        if (
          !file.startsWith('app.js')
          && !file.startsWith('app.css')
          && (
            !file.startsWith('app-')
            && (
              !file.endsWith('.js')
              || !file.endsWith('.js.gz')
              || !file.endsWith('.css')
              || !file.endsWith('.css.gz')
            )
          )
        ) return;
        const filePath = path.join(config.outdir, file);
        await rm(filePath);
      }));
      break;
    case 'spaSingleFile':
    case 'separate':
      // remove page files
      await Promise.all(files.map(async file => {
        if (!file.startsWith('page_')) return;
        const filePath = path.join(config.outdir, file);
        await rm(filePath);
      }));
  }
}


async function emptyCachedir(dir = config.cachedir) {
  const files = await readdir(dir);

  await Promise.all(files.map(async file => {
    const filePath = path.join(dir, file);
    if ((await stat(filePath)).isDirectory()) return emptyCachedir(filePath);
    await rm(filePath);
  }));

  await rmdir(dir);
}
