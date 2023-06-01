import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import esbuild from 'esbuild';
import { getExtension } from './helpers.js';


const clients = [];
const config = {};
const contentMap = new Map();

export default async function build(params = {
  baseDir: 'app/',
  entryPoints: ['src/app.js'],
  output: 'dist/bundle.js',
  minify: true,
  sourcemaps: false,
  devServer: {
    enabled: true,
    port: 3000,
    liveReload: true
  }
}) {
  config.baseDir = params.baseDir || 'app/';
  config.entryPoints = [].concat(params.entryPoints.map(v => path.join(params.baseDir, v)));
  config.output = params.output || 'dist/bundle.js';
  config.write = !!params.output;
  config.minify = params.minify === false ? false : true;
  config.sourcemaps = !!params.sourcemaps;
  config.devServer = params.devServer || { enabled: false };
  config.devServer.enabled = params?.devServer?.enabled === false ? false : true;
  config.devServer.port = params?.devServer?.port || 3000;
  config.devServer.liveReload = params?.devServer?.liveReload === false ? false : true;
  await init();
}


const plugin = {
  name: 'plugins',
  setup(build) {
    config.bundleBrowserPath = build.initialOptions.outfile.replace(config.baseDir, '');

    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const css = await readFile(args.path, 'utf8');
      const contents = `
        const styles = new CSSStyleSheet();
        styles.replaceSync(\`${css.replaceAll(/[`$]/gm, '\\$&')}\`);
        // TODO work this out
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, styles];
        export default styles;`;
      return { contents };
    });

    // send reload request
    build.onEnd(({ outputFiles }) => {
      if (outputFiles) {
        contentMap.clear();
        outputFiles.forEach(({ path, text }) => {
          contentMap.set(path, text);
        });
      }
      clients.forEach((res) => res.write('data: update\n\n'))
      clients.length = 0
    });
  }
};


async function init() {
  const context = await esbuild.context({
    entryPoints: config.entryPoints,
    bundle: true,
    outfile: config.output,
    write: config.write,
    loader: { '.html': 'text' },
    plugins: [plugin],
    minify: config.minify,
    sourcemap: config.sourcemap,
    banner: !config.devServer.liveReload ? undefined : { js: ' (() => new EventSource("/esbuild").onmessage = () => location.reload())();' }
  });


  if (!config.devServer.enabled) return;

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
        const file = await readFile(path.join(config.baseDir, 'index.html'), 'utf-8');
        // inject bundle
        res.write(file.replace('</head>', `  <script src="${config.bundleBrowserPath}" type="module"></script>\n</head>`));
        res.end();
        return;
      }


      const contentType = getMimeType(req.url);
      const filePath = path.resolve(path.join(config.baseDir, req.url));
      const filePathRoot = path.resolve(path.join('.', req.url));
      
      // TODO check this.  check both baseDir and root. The bundle might be built to root
      if (config.write !== true && contentMap.has(filePath) || contentMap.has(filePathRoot)) {
        const data = contentMap.get(filePath) || contentMap.get(filePathRoot);
        res.writeHead(200, { 'Content-Type': contentType });
        res.write(data);
        res.end();
        return;
      }

      try {
        const file = await readFile(filePath, 'utf-8')
          .catch(() => readFile(filePathRoot, 'utf-8')); // try root for bundle
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
  }
}
