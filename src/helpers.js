const leadingSlashRegex = /^\//;
const trailingSlashRegex = /\/$/;
const containsVariableOrWildcardRegex = /\/:|\*/g;
const ignoreHashRegexString = '(#(.*))?';
const parameterRegex = /([:*])(\w+)/g;
const wildcardRegex = /\*/g;
const replaceWidCardString = '(?:.*)';
const followedBySlashRegexString = '(?:\/$|$)';
const isBrowser = typeof window !== 'undefined';


export function getExtension(url) {
  if (!url.includes('.')) return '';
  return url.split(/[#?]/)[0].split('.').pop().trim().toLowerCase();
}

// export function getRoute(url, routeConfigs) {
//   const routeMatch = matchRouteConfig(url, routeConfigs);
//   // if (!routeMatch && config.importMapPaths.includes(url)) return { importMap: true };
//   // if (!routeMatch && config.notFoundRoute && !getExtension(url)) return config.notFoundRoute;
//   return routeMatch;
// }

export function buildRouteRegex(route) {
  if (route.match(containsVariableOrWildcardRegex) === null) {
    // Do not allow hashes on root or and hash links
    if (route.trim() === '/' || route.includes('#')) return new RegExp(`^${route}$`);
    return new RegExp(`^${route}${ignoreHashRegexString}$`);
  }

  return new RegExp(
    `^${route
      .replace(parameterRegex, (_full, _dots, name) => `(?<${name}>[^\/]+)`)
      .replace(wildcardRegex, replaceWidCardString)
    }${followedBySlashRegexString}$`,
    ''
  );
}

export function cleanRoutes(routes = []) {
  return routes.map(route => `/${route.replace(trailingSlashRegex, '').replace(leadingSlashRegex, '')}`);
}

export function buildTemplateId(templatePath) {
  if (!templatePath) return;
  return templatePath.replace(/\//g, '').replace(/\./g, '');
}

export function matchRouteConfig(path, routeConfigs) {
  const found = routeConfigs.find(({ regex }) => matchPath(path, regex));

  if (!found) return;
  if (!isBrowser) return { pageConfig: found.pageConfig, route: found.route };

  const match = path.match(found.regex);
  const searchParameters = Object.fromEntries(new URLSearchParams(location.search.split(/\?(.*)?$/).slice(1).join('')).entries());
  return {
    pageConfig: found.pageConfig,
    route: found.route,
    urlParameters: match?.groups,
    searchParameters
  };
}

export function matchPath(path, routeRegex) {
  const pathNoSearch = path.split('?')[0];
  return pathNoSearch.match(routeRegex) !== null;
}
