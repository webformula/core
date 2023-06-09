import path from 'node:path';
import { access, cp, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { gzip } from 'node:zlib';
import { promisify } from 'node:util';
import { createServer } from 'node:http';
import esbuild from 'esbuild';
import { getExtension } from '../shared.js';
import {
  isDev,
  isSourceMaps,
  isMinify,
  isGzip,
  isLiveReload,
  cssFilterRegex
} from '../vars.js';


const asyncGzip = promisify(gzip);
const clients = [];
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
    }) => {},
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
  config.appJSOutputFilePath = path.join(config.basedir, 'app.js');
  config.hasAppCSS = await access(config.appCSSFilePath).then(e => true).catch(e => false);
  if (config.hasAppCSS) config.appCSSOutputFilePath = path.join(config.basedir, 'app.css');
  await init();
}

const pluginStart = {
  name: 'plugin shared',
  setup(build) {
    if (config.onStart) {
      build.onStart(async () => {
        await config.onStart();
      });
    }
  }
};

const pluginCss = {
  name: 'css',
  setup(build) {
    config.bundleBrowserPath = build.initialOptions.outfile.replace(config.outdir, '');

    build.onLoad({ filter: cssFilterRegex }, async args => {
      const css = await readFile(args.path, 'utf8');
      const transformed = await esbuild.transform(css, { minify: true, loader: 'css' });
      const contents = `
        const styles = new CSSStyleSheet();
        styles.replaceSync(\`${transformed.code}\`);
        export default styles;`;
      return { contents };
    });
  }
};

const pluginRebuild = {
  name: 'rebuild',
  setup(build) {
    // send reload request
    build.onEnd(() => {
      clients.forEach((res) => res.write('data: update\n\n'))
      clients.length = 0;
    });
  }
};


const pluginJSEnd = {
  name: 'js end',
  setup(build) {
    build.onEnd(async ({ metafile }) => {
      if (metafile) {
        config.appJSOutputFilePath = Object.keys(metafile.outputs)[0];
        await Promise.all([
          await copyFiles(metafile),
          await gzipAppFiles(),
          await copyIndexHTML()
        ]);
      }
      if (config.onEnd) await config.onEnd();
    });
  }
};

const pluginCSSEnd = {
  name: 'css end',
  setup(build) {
    if (config.hasAppCSS) {
      build.onEnd(async ({ metafile }) => {
        if (metafile) config.appCSSOutputFilePath = Object.keys(metafile.outputs)[0];
      });
    }
  }
};  

async function init() {
  if ((await access(config.appFilePath).then(() => false).catch(() => true))) throw Error(`app.js required. Expected path: ${config.appFilePath}`);

  await emptyOutdir();

  const context = await esbuild.context({
    entryPoints: [config.appFilePath],
    bundle: true,
    outfile: config.appOutFilePath,
    metafile: true,
    entryNames: isDev ? '[name]' : '[name]-[hash]',
    format: 'esm',
    target: 'esnext',
    loader: { '.html': 'text' },
    plugins: [pluginStart, pluginRebuild, pluginCss, pluginJSEnd],
    minify: config.minify,
    sourcemap: config.sourcemap,
    banner: (!isDev || !config.devServer.liveReload) ? undefined : { js: ' (() => new EventSource("/esbuild").onmessage = () => location.reload())();' }
  });

  if (config.hasAppCSS) {
    const contextCss = await esbuild.context({
      entryPoints: [config.appCSSFilePath],
      bundle: true,
      outfile: config.appCSSOutFilePath,
      metafile: true,
      entryNames: isDev ? '[name]' : '[name]-[hash]',
      minify: isMinify,
      plugins: [pluginRebuild, pluginCSSEnd],
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
      if (req.url === '/esbuild') return clients.push(
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive'
        })
      );

      // search index.html
      if (!getExtension(req.url)) {
        const file = await readFile(path.join(config.basedir, 'index.html'), 'utf-8');
        // inject bundle
        res.write(file.replace('</head>', `  <script src="${config.bundleBrowserPath}" type="module"></script>\n</head>`));
        res.end();
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
  }
}

function isGlob(str) {
  return str.includes('*');
}

function globToRegex(globStr = '') {
  const length = globStr.length;
  let regexString = '';
  let char;
  for (let i = 0; i < length; i += 1) {
    char = globStr[i];

    switch (char) {
      case '/':
      case '.':
        regexString += '\\' + char;
        break;

      case '*':
        const prevChar = globStr[i - 1];
        let starCount = 1;
        while (globStr[i + 1] === '*') {
          starCount += 1;
          i += 1;
        }
        const nextChar = globStr[i + 1];
        const isGlobstar = starCount > 1                    // multiple '*''s
          && (prevChar === '/' || prevChar === undefined)   // from the start of the segment
          && (nextChar === '/' || nextChar === undefined)   // to the end of the segment

        if (isGlobstar) {
          regexString += '((?:[^/]*(?:\/|$))*)';
          i += 1;
        } else {
          regexString += '([^/]*)';
        }
        break;

      default:
        regexString += char;
    }
  }
  return new RegExp(regexString);
}

function getGlobBase(globStr) {
  if (globStr.startsWith('*')) return path.resolve('.');
  return path.resolve('.', globStr.split('*')[0]);
}

async function listFiles(dir, arr = []) {
  const files = await readdir(dir);

  await Promise.all(files.map(async file => {
    const filePath = path.join(dir, file);
    if ((await stat(filePath)).isDirectory()) return listFiles(filePath, arr);
    arr.push(filePath);
  }));

  return arr
}

async function emptyOutdir(dir = config.outdir) {
  const files = await readdir(dir);

  await Promise.all(files.map(async file => {
    const filePath = path.join(dir, file);
    if ((await stat(filePath)).isDirectory()) return emptyOutdir(filePath);
    await rm(filePath);
  }));
}

async function copyFiles(metafile) {
  await Promise.all(config.copyFiles.map(async ({ from, to, transform, gzip }) => {
    if (!isGlob(from)) {
      const hasExtension = !!getExtension(to);
      if (!hasExtension) to = path.join(to, from.split('/').pop());

      // just copy
      if (typeof transform !== 'function') {
        await mkdir(to.split('/').slice(0, -1).join('/'), { recursive: true });
        await cp(from, to);
        if (gzip) await gzipFile(to);
        return
      }

      // transform and copy
      const content = await readFile(from, 'utf-8');
      const transformed = await transform({
        content,
        outputFileNames: getFilesNamesForTransform()
      });
      await mkdir(to.split('/').slice(0, -1).join('/'), { recursive: true });
      await writeFile(to, transformed);
      if (gzip) await gzipFile(to);
      return
    }

    // Glob copy
    const globBase = getGlobBase(from);
    const regex = globToRegex(from);
    try {
      const files = await listFiles(globBase);
      const filtered = files.filter(file => file.match(regex) !== null);

      // just copy
      if (typeof transform !== 'function') {
        await Promise.all(filtered.map(async filePath => {
          const witePath = path.join(to, filePath.split(globBase).pop());
          await mkdir(witePath.split('/').slice(0, -1).join('/'), { recursive: true });
          await cp(filePath, writePath);
          if (gzip) await gzipFile(writePath);
        }));
      }

      // transform and copy
      await Promise.all(filtered.map(async filePath => {
        const content = await readFile(filePath, 'utf-8');
        const transformed = await transform({
          content,
          outputFileNames: getFilesNamesForTransform()
        });
        const writePath = path.join(path.resolve('.'), to, filePath.split(globBase).pop());
        await mkdir(writePath.split('/').slice(0, -1).join('/'), { recursive: true });
        await writeFile(writePath, transformed);
        if (gzip) await gzipFile(to);
      }));
    } catch (e) {
      console.error(e);
    }
  }));
}

function getOutputAppJSFileName() {
  let name = config.appJSOutputFilePath.split('/').pop();
  if (!isDev && config.gzip) name += '.gz';
  return name;
}

function getOutputAppCSSFileName() {
  if (!config.hasAppCSS) return;
  let name = config.appCSSOutputFilePath.split('/').pop();
  if (!isDev && config.gzip) name += '.gz';
  return name;
}

function getFilesNamesForTransform() {
  const js = getOutputAppJSFileName();
  const css = getOutputAppCSSFileName();
  const arr = [js];
  if (css) arr.push(css);
  return arr;
}

async function copyIndexHTML() {
  const indexFile = await readFile(config.indexHTMLPath, 'utf-8');
  await writeFile(config.indexHTMLOutPath, indexFile
    .replace('app.js', getOutputAppJSFileName())
    .replace('app.css', getOutputAppCSSFileName()));
}

async function gzipAppFiles() {
  if (!config.gzip) return;
  await gzipFile(config.appJSOutputFilePath);
  if (config.hasAppCSS) await gzipFile(config.appCSSOutputFilePath);
}

async function gzipFile(file) {
  const result = await asyncGzip(await readFile(file));
  await writeFile(`${file}.gz`, result);
}
