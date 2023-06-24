import { createServer } from 'node:http';
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
      res.writeHead(200, file.headers);
      file.stream.on('error', err => console.error(err));
      file.stream.pipe(res);
      return;
    }
  }).listen(app.devServer.port);
}
