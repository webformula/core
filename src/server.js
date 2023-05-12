import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { matchRouteConfig, buildRouteRegex, cleanRoutes } from "./client.js";

const leadingPeriodRegex = /^\./;
const webformulaDev = process.env.WEBFORMULA_DEV === 'true' ? true : process.env.WEBFORMULA_DEV === 'false' ? false : undefined;
const isDev = webformulaDev !== undefined ? webformulaDev : process.env.NODE_ENV !== 'production';
const prefetchPageRegex = /^\/fetch-page/;
const routeConfigs = [];
const config = {
  baseDir: '',
  indexTemplate: '',
  appCode: ''
};

export function coreMiddleware(baseDir = '', { importMap }) {
  config.baseDir = baseDir;
  config.importMap = importMap || {};
  config.importMap['@webformula/core'] = './webformula.js';
  config.importMapPaths = Object.values(config.importMap).map(v => v.replace(leadingPeriodRegex, ''));

  Promise.all([
    readFile(path.resolve(baseDir, 'index.html'), { encoding: 'utf8' }),
    readFile(isDev ? 'src/client.js' : 'dist/server/client.js', { encoding: 'utf8' })
  ]).then(([index, client]) => {
    config.indexTemplate = index;
    config.appCode = client;
  }).catch(e => console.log(e));

  return async (req, res, next) => {
    if (req.url === '/webformula.js') return handleAppCode(req, res);
    if (req.url === '/prefetch-pages') return prefetchRouteConfig(req, res);
    if (req.url.startsWith('/fetch-page') && (await fetchPage(req, res))) return;
    if ((await handleRoute(req, res))) return;
    next();
  };
}


export async function registerPage(pageClassPath, routes, {
  notFound
} = { notFound: false }) {
  if (!pageClassPath) throw Error('requires pageClassPath');

  let templatePath;
  try {
    const modulePath = path.resolve(config.baseDir, pageClassPath);
    await access(modulePath);
    const file = await readFile(modulePath, { encoding: 'utf-8' });

    // parse routes variable
    let pageClassRoutes = [];
    const routesIndex = file.indexOf('static routes');
    if (routesIndex > 0) {
      const routesArray = file.slice(routesIndex + file.slice(routesIndex).indexOf('['), routesIndex + file.slice(routesIndex).indexOf(']') + 1);
      pageClassRoutes = eval(routesArray);
    }

    // parse templatePath variable
    const templatePathIndex = file.indexOf('static templatePath');
    if (templatePathIndex > 0) {
      const firstQuoteIndex = templatePathIndex + file.slice(templatePathIndex).search(/\'|\"/);
      const templatePathString = file.slice(firstQuoteIndex, firstQuoteIndex + 1 + file.slice(firstQuoteIndex + 1).search(/\'|\"/) + 1);
      templatePath = eval(templatePathString);
    }

    // combine routes from page and register
    routes = cleanRoutes([...new Set([...[].concat(routes || []), ...(pageClassRoutes)])]);

    if (routes.length === 0) throw Error('No routes found for page');
  } catch (e) {
    console.log(e)
    throw Error('page class module cannot be found', pageClassPath);
  }

  if (templatePath) {
    try {
      await access(path.resolve(config.baseDir, templatePath));
    } catch (e) {
      throw Error('templatePath cannot be found', templatePath);
    }
  }

  routes.forEach(value => {
    const routeRegex = buildRouteRegex(value);
    routeConfigs.push({
      route: value,
      routeRegex,
      pageClassPath,
      templatePath,
      templateId: templatePath && templatePath.replace(/\//g, '').replace(/\./g, ''),
      notFound
    });

    if (notFound && !config.notFoundRoute) config.notFoundRoute = routeConfigs[routeConfigs.length - 1];
  });
}

async function fetchPage(req, res) {
  const routeMatch = getRoute(req.url.replace(prefetchPageRegex, ''));
  if (!routeMatch) return false;
  
  const html = await readFile(path.resolve(config.baseDir, routeMatch.templatePath), { encoding: 'utf8' });
  // res.set('Cache-Control', 'public, max-age=31557600');
  res.send({
    pageClassPath: path.join('/', routeMatch.pageClassPath),
    html,
    route: routeMatch.route,
    templateId: routeMatch.templateId,
    notFound: routeMatch.notFound
  });

  return true;
}

async function handleRoute(req, res) {
  const routeMatch = getRoute(req.url);
  if (routeMatch?.importMap) return false;
  if (!routeMatch) return false;

  const html = await readFile(path.resolve(config.baseDir, routeMatch.templatePath), { encoding: 'utf8' });
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <script type="importmap">
      { "imports": {
          ${Object.entries(config.importMap).map(([a, b]) => `"${a}": "${b}"`).join(',\n')}
      } }
    </script>
    <link rel="modulepreload" href="webformula.js">
    <link rel="modulepreload" href="${routeMatch.pageClassPath}">
    ${config.indexTemplate}
    <template id="${routeMatch.templateId}">${html}</template>
    <script type="module">
      window._webformulaServerSide = true;
      import { registerPage, enableLinkIntercepts } from '@webformula/core';
      import Page from '${path.join('/', routeMatch.pageClassPath)}';
      registerPage(Page, '${routeMatch.route}', { templateId: '${routeMatch.templateId}', notFound: ${!!routeMatch.notFound} });
      enableLinkIntercepts();
    </script>
  `);

  return true;
}

function getRoute(url) {
  const routeMatch = matchRouteConfig(url, routeConfigs);
  if (!routeMatch && config.importMapPaths.includes(url)) return { importMap: true };

  if (!routeMatch && config.notFoundRoute && !urlExtension(url)) return config.notFoundRoute;
  return routeMatch;
}

function handleAppCode(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/javascript', 'Cache-Control': 'public, max-age=100' });
  res.end(config.appCode);
}

function prefetchRouteConfig(req, res) {
  // res.set('Cache-Control', 'public, max-age=31557600');
  res.send(routeConfigs.map(v => ({
    templatePath: v.templatePath,
    pageClassPath: v.pageClassPath,
    route: v.route,
    // routeRegex: v.routeRegex.toString(),
    templateId: v.templateId,
    notFound: v.notFound
  })));
}

function urlExtension(url) {
  if (!url.includes('.')) return '';
  return url.split(/[#?]/)[0].split('.').pop().trim();
}
