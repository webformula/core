import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { matchRouteConfig, buildRouteRegex, cleanRoutes } from "./helpers.js";


const webformulaDev = process.env.WEBFORMULA_DEV === 'true' ? true : process.env.WEBFORMULA_DEV === 'false' ? false : undefined;
const isDev = webformulaDev !== undefined ? webformulaDev : process.env.NODE_ENV !== 'production';
const prefetchPageRegex = /^\/prefetch-page/;
const routeConfigs = [];
const config = {
  baseDir: '',
  indexTemplate: '',
  appCode: ''
};

export function coreMiddleware(baseDir = '') {
  config.baseDir = baseDir;

  Promise.all([
    readFile(path.resolve(baseDir, 'index.html'), { encoding: 'utf8' }),
    readFile(!isDev ? 'dist/server/core.js' : 'src/core.js', { encoding: 'utf8' }),
    readFile(!isDev ? 'dist/server/Page.js' : 'src/Page.js', { encoding: 'utf8' })
  ]).then(([index, core, page]) => {
    config.indexTemplate = index;
    config.appCode = `${core}\n${page}`;
  }).catch(e => console.log(e));

  return async (req, res, next) => {
    if (req.url === '/webformula.js') return handleAppCode(req, res);
    // if (req.url === '/prefetch-app') return prefetchPages(req, res);
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
    const page = await import(modulePath);

    // combine routes from page and register
    routes = cleanRoutes([...new Set([...[].concat(routes || []), ...(page.default?.routes || [])])]);

    if (routes.length === 0) throw Error('No routes found for page');
    templatePath = page.default.templatePath;
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
  });
}


async function handleRoute(req, res) {
  const routeMatch = matchRouteConfig(req.url.replace(prefetchPageRegex, ''), routeConfigs);
  if (!routeMatch) return false;

  const html = await readFile(path.resolve(config.baseDir, routeMatch.templatePath), { encoding: 'utf8' });

  if (req.url.startsWith('/prefetch-page')) {
    // res.set('Cache-Control', 'public, max-age=31557600');
    res.send({
      pageClassPath: routeMatch.pageClassPath,
      html,
      route: routeMatch.route,
      templateId: routeMatch.templateId
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <script type="importmap">
        { "imports": {
            "@webformula/core": "./webformula.js"
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
        registerPage(Page, '${routeMatch.route}', { templateId: '${routeMatch.templateId}' });
        enableLinkIntercepts();
      </script>
    `);
  }

  return true;
}


function handleAppCode(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/javascript', 'Cache-Control': 'public, max-age=100' });
  res.end(config.appCode);
}
