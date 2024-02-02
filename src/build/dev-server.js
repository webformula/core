import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { handleRoute, handleFiles } from '../middleware.js';

const clients = new Map();

export default function runServer(app, port = 3000) {
  createServer(async (req, res) => {
    if (req.url === '/devserver-ping') {
      res.end();
      return true;
    }

    let requestId;
    if (!req.headers.cookie?.includes('devserver=')) {
      requestId = performance.now();
      res.setHeader('Set-Cookie', `devserver=${requestId}`);
    } else {
      requestId = req.headers.cookie.split(' ').find(v => v.includes('devserver=')).split('=').pop();
    }
    if (!clients.get(requestId)) clients.set(requestId, {});
    const client = clients.get(requestId);

    if (client && req.url === '/livereload') {
      if (client.eventSource) client.eventSource.end();

      client.eventSource = res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
        'Set-Cookie': 'test=test'
      });
      client.eventSource.on('close', () => {
        client.eventSource = undefined;
        clients.delete(requestId)
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
  }).listen(port);
}
