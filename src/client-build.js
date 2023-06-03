import path from 'node:path';
import { access, cp, readdir, readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import esbuild from 'esbuild';
import { getExtension } from './helpers.js';


const {
  WEBFORMULA_DEV,
  WEBFORMULA_SOURCEMAPS,
  WEBFORMULA_MINIFY,
  NODE_ENV,
  WEBFORMULA_LIVERELOAD
} = process.env;
const isNodeEnvProduction = NODE_ENV === 'production';
const webformulaDev = WEBFORMULA_DEV === 'true' ? true : WEBFORMULA_DEV === 'false' ? false : undefined;
const isDev = webformulaDev !== undefined ? webformulaDev : !isNodeEnvProduction;
const isSourceMaps = WEBFORMULA_SOURCEMAPS === 'false' ? false : isDev;
const isMinify = WEBFORMULA_MINIFY === 'false' ? false : true;
const isLiveReload = WEBFORMULA_LIVERELOAD === 'false' ? false : isDev;
const cssFilterRegex = /\.css$/;
const clients = [];
const config = {};

export default async function build(params = {
  basedir: 'app/',
  outdir: 'dist/',
  minify: true,
  sourcemaps: false,
  format: 'esm',
  target: 'esnext',
  devServer: {
    enabled: true,
    port: 3000,
    liveReload: true
  },
  copyFiles: [{
    from: '',
    to: ''
  }],
  onStart: () => {}
}) {
  config.basedir = params.basedir || 'app/';
  config.outdir = params.outdir || 'dist/';
  config.minify = params.minify === false ? false : params.minify === true ? true : isMinify;
  config.sourcemaps = params.sourcemaps === false ? false : params.sourcemaps === true ? true : isSourceMaps;
  config.devServer = params.devServer || { enabled: false };
  config.devServer.enabled = params?.devServer?.enabled === false ? false : true;
  config.devServer.port = params?.devServer?.port || 3000;
  config.devServer.liveReload = params?.devServer?.liveReload === false ? false : params?.devServer?.liveReload === true ? true : isLiveReload;
  config.copyFiles = (params.copyFiles || []).filter(({ from }) => !!from);
  config.onStart = params.onStart;
  await init();
}


const pluginCss = {
  name: 'plugin css',
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

const pluginCopyFiles = {
  name: 'plugin copy files',
  setup(build) {
    build.onEnd(async () => {
      await Promise.all(config.copyFiles.map(async ({ from, to }) => {
        if (!isGlob(from)) {
          const hasExtension = !!getExtension(to);
          if (!hasExtension) to = path.join(to, from.split('/').pop());
          return cp(from, to);
        }

        const globBase = getGlobBase(from);
        const regex = globToRegex(from);
        try {
          const files = await listFiles(globBase);
          const filtered = files.filter(file => file.match(regex) !== null);
          await Promise.all(filtered.map(filePath => cp(filePath, path.join(to, filePath.split(globBase).pop()))))
        } catch (e) {
          console.error(e);
        }
        
      }))
    });
  }
};

const pluginFiles = {
  name: 'plugin files',
  setup(build) {
    // send reload request
    build.onEnd(() => {
      clients.forEach((res) => res.write('data: update\n\n'))
      clients.length = 0
    });

    if (config.onStart) {
      build.onStart(() => {
        config.onStart();
      });
    }
  }
};

async function init() {
  if ((await access(path.join(config.basedir, '/app.js')).then(() => false).catch(() => true))) throw Error(`app.js required. Expected path: ${path.join(config.basedir, '/app.js')}`);

  const context = await esbuild.context({
    entryPoints: [path.join(config.basedir, '/app.js')],
    bundle: true,
    outfile: path.join(config.outdir, '/app.js'),
    format: 'esm',
    target: 'esnext',
    loader: { '.html': 'text' },
    plugins: [pluginCss, pluginFiles, pluginCopyFiles],
    minify: config.minify,
    sourcemap: config.sourcemap,
    banner: (!isDev || !config.devServer.liveReload) ? undefined : { js: ' (() => new EventSource("/esbuild").onmessage = () => location.reload())();' }
  });

  const hasAppCSS = await access(path.join(config.basedir, '/app.css')).then(e => true).catch(e => false);
  if (hasAppCSS) {
    const contextCss = await esbuild.context({
      entryPoints: [path.join(config.basedir, '/app.css')],
      bundle: true,
      outfile: path.join(config.outdir, '/app.css'),
      minify: isMinify,
      plugins: [pluginFiles],
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
    }).listen(3000);
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

    switch(char) {
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
