import path from 'node:path';
import { access, readFile, readdir, stat, rm, writeFile } from 'node:fs/promises';
import { gzip } from 'node:zlib';
import { promisify } from 'node:util';
import esbuild from 'esbuild';
import addMockDom from './dom.js';
import copyFiles from './copyFiles.js';
import devServer from './devServer.js';
import { buildPathRegex } from '../shared.js';

const asyncGzip = promisify(gzip);
const isDev = process.env.NODE_ENV !== 'production';
const cssFilterRegex = /\.css$/;
const importRegex = /[\/\/\s]?import[\s'"]?(\{?\s?(?<name>[\w\s,\$]+?)\s?\}?\s?from)?\s?['|"](?<path>.+?)['|"]\s?(;|\n)/g;
const routesRegex = /routes\s?\(\s?(\[[\s\S]*.*\])\s?\);?/;
const pageContentTagRegex = /<\s?page-content\s?>[^>]*<\s?\/\s?page-content\s?>/;
const scriptTagRegex = /<\s*script[^>]*src="\.?\/?app.js"[^>]*>[^>]*<\s*\/\s*script>/g;
const titleTagRegex = /<head>(?:.|\n)+(<title>.?<\/title>)(?:.|\n)+<\/head>/g;
const cssTagRegex = /<\s*link[^>]*href="\.?\/?app.css"[^>]*>/;
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
  config.appFilePath = path.join(config.basedir, '/app.js');
  config.indexHTMLPath = path.join(config.basedir, '/index.html');
  config.appCSSFilePath = path.join(config.basedir, '/app.css');
  config.hasAppCSS = await access(config.appCSSFilePath).then(e => true).catch(e => false);
  config.isMiddleware = params.isMiddleware;
  if (config.hasAppCSS) config.appCSSOutputFilePath = path.join(config.outdir, 'app.css');
  if ((await access(config.appFilePath).then(() => false).catch(() => true))) throw Error(`app.js required. Expected path: ${config.appFilePath}`);

  const data = await run();
  if (!isDev) process.exit();
  return data;
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
    });

    build.onLoad({ filter: /app\.js/ }, async args => {
      let contents = await readFile(args.path, 'utf-8');
      config.importMatches.forEach(v => (
        contents = contents.replace(v[0], () => `const ${v.groups.name} = import('${v.groups.path}');`)
      ));
      return { contents };
    });
  }
};

async function run() {
  if (config.onStart) await config.onStart();
  await emptyOutdir();

  const parsed = await parseAppFile();
  const entryPoints = [
    config.appFilePath,
    ...parsed.pages.map(v => v.modulePath)
  ];

  const { metafile } = await esbuild.build({
    entryPoints,
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

  let outputs = Object.keys(metafile.outputs).map(key => ({
    output: key,
    ...metafile.outputs[key]
  }));
  const appJSFile = outputs.find(v => v.entryPoint === config.appFilePath);
  const appCSSFile = Object.keys(appCSSContext?.metafile.outputs).map(key => ({
    output: key,
    ...appCSSContext.metafile.outputs[key]
  }))[0];
  if (config.hasAppCSS) outputs = outputs.concat(appCSSFile);

  const copiedFiles = await copyFiles(config, outputs);

  // build index html pages for each page
  parsed.pages.forEach(v => {
    v.moduleOutput = outputs.find(b => b.entryPoint === v.modulePath)?.output;
    v.appScriptPath = `./${appJSFile.output.split('/').pop()}`;
    if (config.chunks) v.pageScriptPath = `./${v.moduleOutput.split('/').pop()}`;
  });
  const indexHTMLFiles = await buildIndexHTMLs(parsed.pages, appCSSFile);

  if (!config.chunks) {
    await Promise.all(outputs
      .filter(v => v.entryPoint !== config.appFilePath && v.entryPoint !== config.appCSSFilePath)
      .map(v => rm(v.output)));
    outputs = outputs.filter(v => v.entryPoint === config.appFilePath || v.entryPoint === config.appCSSFilePath)
  }

  if (config.gzip) await gzipFiles(outputs.concat(indexHTMLFiles));
  if (config.onEnd) await config.onEnd();
  
  const returnData = {
    outdir: config.outdir,
    routes: parsed.pages.map(v => ({
      route: v.path,
      regex: buildPathRegex(v.path),
      filePath: v.indexHTMLFileName,
      fileName: v.indexHTMLFileName.split('/').pop()
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

async function buildIndexHTMLs(pageFiles, appCSSFile) {
  const indexFile = await readFile(config.indexHTMLPath, 'utf-8');
  addMockDom();
  const data = await Promise.all(pageFiles.map(async page => {
    const pageModule = await import(path.resolve('.', page.moduleOutput));
    customElements.define(`page-${config.pageCounter++}`, pageModule.default);
    pageModule.default._isPage = true;
    pageModule.default.useTemplate = false;
    const template = new pageModule.default().template();

    // pull out imported chucks so we can preload them
    const scriptChunkImports = [...(await readFile(path.join(config.outdir, page.appScriptPath), 'utf-8')).matchAll(importRegex)]
      .filter(v => v.groups.path.startsWith('./chunk-'))
      .map(v => v.groups.path);
    if (page.pageScriptPath) {
      [...(await readFile(path.join(config.outdir, page.pageScriptPath), 'utf-8')).matchAll(importRegex)]
        .filter(v => v.groups.path.startsWith('./chunk-'))
        .forEach(v => {
          if (!scriptChunkImports.includes(v.groups.path)) scriptChunkImports.push(v.groups.path);
        });
    }

    let content = indexFile
      .replace(scriptTagRegex, () => `
        ${config.isMiddleware ? `<script>window._webformulaServer = true;</script>` : ''}
        <script src="${page.appScriptPath}" type="module" async></script>
        ${page.pageScriptPath ? `<script src="${page.pageScriptPath}" type="module" async></script>` : ''}
        ${(!isDev || !config.devServer.liveReload) ? '' : `<script>new EventSource("/livereload").onerror = () => setTimeout(() => location.reload(), 500);</script>`}
        ${scriptChunkImports.map(v => `<script src="${v}" type="module" async></script>`).join('\n')}
      `).replace(/    /g, ' ')
      .replace(pageContentTagRegex, () => `<page-content>\n${template.split('\n').join('\n')}\n</page-content>`);
    if (appCSSFile) content = content.replace(cssTagRegex, `<link href="./${appCSSFile.output.split('/').pop()}" rel="stylesheet">`);

    if (content.match(titleTagRegex)) content = content.replace(titleTagRegex, (a, b) => a.replace(b, `<title>${pageModule.default.title}</title>`));
    else content = content.replace('<head>', `<head>\n  <title>${pageModule.default.title}</title>`);
    
    const fileName = page.path === '/' ? path.join(config.outdir, 'index.html') : path.join(config.outdir, `${page.path.replace(/\/|\.|\s/g, '')}.html`);
    page.indexHTMLFileName = fileName;
    return {
      fileName,
      content
    }
  }));
  await Promise.all(data.map(async v => writeFile(v.fileName, v.content)));
  return data.map(v => ({ output: v.fileName }));
}

async function parseAppFile() {
  let appFileContent = await readFile(config.appFilePath, 'utf-8');
  config.importMatches = [...appFileContent.matchAll(importRegex)]
    .filter(v => !v[0].trim().startsWith('//') && v.groups.name)
    .filter(v => {
      let isMatch = false;
      const regex = new RegExp(`component:\\s?${v.groups.name}\\s?(,|})`);
      appFileContent = appFileContent.replace(regex, (_match, end) => {
        isMatch = true;
        return `component: '${v.groups.path}' ${end}`;
      });
      return isMatch;
    });

  const routes = new Function(`return ${appFileContent.match(routesRegex)[1]};`)();
  return {
    pages: routes.map(v => ({
      path: v.path,
      notFound: v.notFound,
      modulePath: path.join(config.basedir, v.component)
    })),
    content: appFileContent
  };
}

async function emptyOutdir(dir = config.outdir) {
  const files = await readdir(dir);
  await Promise.all(files.map(async file => {
    const filePath = path.join(dir, file);
    if ((await stat(filePath)).isDirectory()) return emptyOutdir(filePath);
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
