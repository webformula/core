import path from 'node:path';
import { readFile } from 'node:fs/promises';
import esbuild from 'esbuild';
import { getExtension, buildRouteRegex, matchRouteConfig, cleanRoutes  } from './helpers.js';


const cssFilterRegex = /\.css$/;
const importMatcher = /import(?<name>.+?)from(?<path>.+?)(;|\n)/g;
const registerPageMatcher = /registerPage\((?<pageClass>.+?)\,(?<routes>.+?)(,|\))(.+\{(?<options>.+?)\}\s?\))?;?/g;
const staticRoutesMatcher = /^(?!\/\/)(\s+)?static routes\s=\s(?<content>.+?)(;|\n)/m;
const appConfig = {
  pageConfigs: [],
  routeConfigs: []
};


export function coreMiddleware(baseDir = 'app/') {
  appConfig.baseDir = baseDir;
  // appConfig.minify = params.minify === false ? false : true;
  // appConfig.sourcemaps = !!params.sourcemaps;

  init();

  return async (req, res, next) => {
    if (['js', 'map'].includes(getExtension(req.url)) && (await handleChunks(req, res))) return;
    if ((await handleRoute(req, res))) return;
    next();
  };
}

const plugin = {
  name: 'plugins',
  setup(build) {
    build.onLoad({ filter: appConfig.appFileRegex }, async () => ({ contents: appConfig.appFile }));
    build.onLoad({ filter: cssFilterRegex }, async args => {
      const css = await readFile(args.path, 'utf8');
      const contents = `
        const styles = new CSSStyleSheet();
        styles.replaceSync(\`${css.replaceAll(/[`$]/gm, '\\$&')}\`);
        export default styles;`;
      return { contents };
    });
  }
};

async function init() {
  const [ indexFile, appFile ] = await Promise.all([
    readFile(path.resolve(appConfig.baseDir, 'index.html'), 'utf8'),
    readFile(path.resolve(appConfig.baseDir, 'app.js'), 'utf8')
  ]);
  let appFileContent = appFile;
  const appFileData = await parseAppFileData(appFile);

  appFileData.forEach(({ importLine, registerLine, config }, i, arr) => {
    appConfig.pageConfigs.push(config);
    config.routes.forEach(({ route, regex }) => {
      appConfig.routeConfigs.push({
        route,
        regex,
        pageConfig: config
      });
    });
    appFileContent = appFileContent
      .replace(importLine, '')
      .replace(registerLine, i !== arr.length - 1 ? '' : `registerAppConfig(${JSON.stringify(arr.map(({ config }) => ({
        ...config,
        routes: config.routes.map(v => ({
          route: v.route,
          regex: v.regex.toString
        }))
      })))});`);
  });

  const appFilePath = path.join(appConfig.baseDir, 'app.js');
  appConfig.appFile = appFileContent;
  appConfig.indexFile = indexFile;
  appConfig.appFileRegex = new RegExp(appFilePath);

  const bundle = await esbuild.build({
    entryPoints: [appFilePath, ...appFileData.map(r => path.join(appConfig.baseDir, r.config.pageClassPath))],
    bundle: true,
    write: false,
    splitting: true,
    outdir: 'temp',
    format: 'esm',
    plugins: [plugin],
    minify: true,
    loader: { '.html': 'text' },
    // sourcemap: true
  });

  appConfig.outputFiles = bundle.outputFiles;
}

async function parseAppFileData(appFile) {
  const importMatches = [...appFile.matchAll(importMatcher)];
  return await Promise.all([...appFile.matchAll(registerPageMatcher)].map(async match => {
    const pageClass = match.groups.pageClass.trim();
    const options = match.groups.options ? eval(`({${match.groups.options}})`) : {};
    const importMatch = importMatches.find(({ groups }) => groups.name.trim() === pageClass);
    return {
      importLine: importMatch[0],
      registerLine: match[0],
      config: await buildPageConfig(
        importMatch.groups.path.replace(/'/g, '"').match(/"(.+)"/)[1],
        JSON.parse(match.groups.routes.trim().replace(/'|"/g, '"')),
        options
      )
    };
  }));
}

async function buildPageConfig(pageClassPath, routes, { notFound }) {
  const modulePath = path.resolve(appConfig.baseDir, pageClassPath);
  const file = await readFile(modulePath, 'utf-8');

  const routesMatch = file.match(staticRoutesMatcher);
  const pageClassRoutes = routesMatch === null ? [] : eval(routesMatch.groups.content);
  routes = cleanRoutes([...new Set([...[].concat(routes || []), ...(pageClassRoutes)])]);
  if (routes.length === 0) throw Error('No routes found for page');

  const routeConfig = {
    pageClassPath,
    notFound,
    routes: routes.map(route => ({
      route,
      regex: buildRouteRegex(route)
    }))
  };
  if (notFound) appConfig.notFoundRoute = routeConfig;
  return routeConfig;
}

async function handleChunks(req, res) {
  const match = appConfig.outputFiles.find(v => v.path.endsWith(req.url));
  if (!match) return false;

  res.writeHead(200, { 'Content-Type': 'text/javascript', 'Cache-Control': 'public, max-age=100' });
  res.end(match.text);
  return true;
}

async function handleRoute(req, res) {
  let routeMatch = matchRouteConfig(req.url, appConfig.routeConfigs);
  if (!routeMatch) {
    if (!getExtension(req.url) && req.headers['sec-fetch-dest'] === 'document') routeMatch = { pageConfig: appConfig.notFoundRoute };
    else return false;
  }

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <link rel="modulepreload" href="${routeMatch.pageConfig.pageClassPath}">
    ${appConfig.indexFile}
  `);

  return true;
}
