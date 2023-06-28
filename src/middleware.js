import { createReadStream } from 'node:fs';
import { access } from 'node:fs/promises';
import path from 'node:path';
import build from './build/index.js';
import { getExtension, getMimeType, buildPathRegex } from './shared.js';

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
  const fileName = url.split('/').pop();
  const match = app.files.find(v => v.fileName === fileName);
  const headers = {
    'Content-Type': getMimeType(url),
    'Cache-Control': 'public, max-age=10000'
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
  params.isMiddleware = true;
  params.devServer = { enabled: false };
  const { routes, files, gzip } = await build(params);
  app.gzip = gzip;
  app.routes = routes;
  app.files = files;
}
