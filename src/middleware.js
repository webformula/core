import { createReadStream } from 'node:fs';
import { access } from 'node:fs/promises';
import path from 'node:path';
import build from './build/index.js';

const app = { };
const exampleParams = {
  basedir: 'app/',
  outdir: 'dist/',
  chunks: true,
  minify: true,
  sourcemaps: false,
  gzip: true,
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
}

/**
 * Middleware to auto build and server application
 * @param {Object} config
 * @param {String} config.basedir App root directory. Default: 'app/'
 * @param {String} config.outdir App bundle directory. Default: 'dist/'
 * @param {Boolean} config.chunks Chunk app per page. Default: true
 * @param {Boolean} config.minify Minify bundle. Default: true
 * @param {Boolean} config.sourcemaps Include sourcemaps. Default: false
 * @param {Boolean} config.gzip Compress bundle. Default: true
 * @param {Object[]} config.copyFiles Copy file config
 * @param {String} config.copyFiles[].from Location of file
 * @param {String} config.copyFiles[].to Destination for file
 * @param {Function} config.copyFiles[].transform Transform function
 * @returns {Object} Build data
 */
export function middlewareExpress(params = exampleParams) {
  init(params);

  return async (req, res, next) => {
    if (req.url === '/livereload') {
      if (app.client) app.client.end();
      app.client = res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
      });
      return;
    }

    try {
      let file = await handleRoute(req.url);
      if (!file) file = await handleFiles(req.url);
      if (file) {
        const stream = createReadStream(file.filePath);
        stream.on('error', err => next(err));
        res.writeHead(200, file.headers);
        stream.pipe(res);
        return;
      }
      next();
    } catch (e) {
      next(e);
    }
  };
}

export function middlewareNode(params = exampleParams) {
  init(params);

  return async (req, res) => {
    if (req.url === '/livereload') {
      if (app.client) app.client.end();
      app.client = res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no'
      });
      return true;
    }

    let file = await handleRoute(req.url, app);
    if (!file) file = await handleFiles(req.url, app);
    if (file) {
      const stream = createReadStream(file.filePath);
      stream.on('error', err => {
        console.log(err);
        res.end();
      });
      res.writeHead(200, file.headers);

      return new Promise((resolve, reject) => {
        stream.on('error', err => reject(err));
        stream.on('end', () => resolve(true));
        stream.pipe(res);
      });
    }
    return false;
  };
}

export async function handleRoute(url, app) {
  if (getExtension(url)) return;

  let match = app.routes.find(v => url.match(v.regex) !== null);
  if (!match) {
    // assume 404 and load not found
    match = app.routes.find(v => v.notFound);
    if (!match) return false;
  }

  const headers = { 'Content-Type': 'text/html' };
  if (app.gzip) headers['Content-encoding'] = 'gzip';

  return {
    filePath: path.resolve('.', match.filePath),
    headers
  };
}

export async function handleFiles(url, app) {
  if (!getExtension(url)) return;
  const match = app.files.find(v => v.filePath.endsWith(url.replace(/\%20/g, ' ')));
  const headers = {
    'Content-Type': getMimeType(url),
    'Cache-Control': 'max-age=604800'
  };
  let filePath;
  if (match) {
    filePath = path.resolve('.', match.filePath);
    const gzip = match.copiedFile ? match.gzip : app.gzip;
    if (gzip) headers['Content-encoding'] = 'gzip';
  } else {
    filePath = path.join(app.outdir, url);
    if (!(await access(filePath).then(() => true).catch(() => false))) return false;
  }

  return {
    filePath,
    headers
  };
}

async function init(params) {
  params.spa = false;
  params.isMiddleware = true;
  params.devServer = false
  const { routes, files, gzip } = await build(params);
  app.gzip = gzip;
  app.routes = routes;
  app.files = files;
}

function getExtension(url) {
  if (!url.includes('.')) return '';
  const split = url.split(/[#?]/)[0].split('.');
  let ext = split.pop().trim().toLowerCase();
  if (ext === 'gz') ext = split.pop();
  return ext;
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
    case 'woff2':
      return 'font/woff2';
    case 'woff':
      return 'font/woff';
    case 'otf':
      return 'font/otf';
    case 'map':
      return 'application/json';
  }
}
