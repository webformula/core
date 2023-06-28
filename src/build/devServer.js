import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { handleRoute, handleFiles } from '../middleware.js';

export default function runServer(app) {
  createServer(async (req, res) => {
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
  }).listen(app.devServer.port);
}
