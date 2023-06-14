import path from 'node:path';
import { access } from 'node:fs/promises';
import build from './build.js';
import { isLiveReload } from '../vars.js';
import {
  matchPath,
  buildPathRegex,
  getExtension
} from '../shared.js';

const encodedSpaceRegex = /%20/g;
const app = {
  paths: [],
  client: undefined
};



if (isLiveReload) {
  process.once('SIGUSR2', function () {
    if (app.client) {
      app.client.write('data: update\n\n');
      app.client.flush();
      setTimeout(() => {
        process.kill(process.pid, 'SIGUSR2');
      }, 20);
    } else process.kill(process.pid, 'SIGUSR2');
  });
}


export function coreMiddleware(baseDir = 'app/') {
  app.baseDir = baseDir;

  init();

  return async (req, res, next) => {
    if (isLiveReload && req.url === '/livereload') {
      app.client = res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
      });
      return;
    }
    if (['js', 'map', 'css'].includes(getExtension(req.url)) && (await handleChunks(req, res))) return;
    if ((await handleRoute(req, res))) return;
    next();
  };
}

async function init() {
  app.indexHTMLPath = path.resolve(app.baseDir, 'index.html');
  app.appFilePath = path.resolve(app.baseDir, 'app.js');
  app.appCSSFilePath = path.resolve(app.baseDir, 'app.css');

  const [hasIndexFile, hasAppFile, hasAppCSS] = await Promise.all([
    access(app.indexHTMLPath).then(e => true).catch(e => false),
    access(app.appFilePath).then(e => true).catch(e => false),
    access(app.appCSSFilePath).then(e => true).catch(e => false)
  ]);

  if (!hasIndexFile) throw Error(`index.html required. Expected path: ${app.indexHTMLPath}`);
  if (!hasAppFile) throw Error(`app.js required. Expected path: ${app.appFilePath}`);

  app.hasAppCSS = hasAppCSS;
  const buildData = await build(app);
  app.outputFiles = buildData.outputFiles;
  app.indexFileContent = buildData.indexFileContent;
  app.pageModuleConfig = buildData.pageModuleConfig;
  app.paths = app.pageModuleConfig.map(v => ({
    ...v,
    regex: buildPathRegex(v.path)
  }));
}


async function handleChunks(req, res) {
  const match = app.outputFiles.find(v => v.path.endsWith(req.url.replace(encodedSpaceRegex, ' ')));
  if (!match) return false;
  const contentType = getExtension(req.url) === 'css' ? 'text/css' : 'text/javascript';
  res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'public, max-age=100' });
  res.end(match.text);
  return true;
}

async function handleRoute(req, res) {
  if (req.method !== 'GET') return false;

  let match = matchPath(req.url, app.paths);
  if (!match) {
    // assume 404 and load not found
    if (!getExtension(req.url) && req.headers['sec-fetch-dest'] === 'document') match = app.paths.find(v => v.notFound);
    else return false;
  }

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    ${isLiveReload ? `<script>const livereload = new EventSource("/livereload"); livereload.onmessage = () => setTimeout(() => location.reload(), 480); addEventListener("beforeunload", (event) => livereload.close());</script>` : ''}
    ${app.indexFileContent}
    <link rel="modulepreload" href="${match.pagePath}">
  `);

  return true;
}
