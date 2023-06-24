import path from 'node:path';
import { access, readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { getExtension } from '../shared.js';

export default function runServer(config) {
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
      const file = await readFile(`${path.join(config.outdir, fileName)}`, config.gzip ? undefined : 'utf-8');

      const headers = { 'Content-Type': 'text/html' };
      if (config.gzip) headers['Content-Encoding'] = 'gzip';
      res.writeHead(200, headers);
      res.write(file);
      res.end();
      return;
    }

    let filePath = path.resolve(path.join(config.outdir, req.url.replace(/%20/g, ' ')));
    const headers = { 'Content-Type': getMimeType(req.url), 'Cache-Control': 'max-age=31536000' };

    try {
      const found = await access(filePath).then(() => true).catch(() => false);
      if (!found) filePath = filePath.replace('.js', '.js.js');

      if (filePath.endsWith('woff2')) {
        res.writeHead(200, headers);
        res.end((await readFile(filePath, 'binary')), 'binary');
        return;
      }

      let file = await readFile(filePath);
      if (isGzip(file)) headers['Content-Encoding'] = 'gzip';
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

function isGzip(buf) {
  if (!buf || buf.length < 3) return false;
  return buf[0] === 0x1F && buf[1] === 0x8B && buf[2] === 0x08;
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
  }
}
