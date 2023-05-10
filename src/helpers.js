const leadingSlashRegex = /^\//;
const trailingSlashRegex = /\/$/;
const containsVariableOrWildcardRegex = /\/:|\*/g;
const parameterRegex = /([:*])(\w+)/g;
const wildcardRegex = /\*/g;
const replaceWidCardString = '(?:.*)';
const followedBySlashRegexString = '(?:\/$|$)';
const ignoreHashRegexString = '(#(.*))?';


export function cleanRoutes(routes = []) {
  return routes.map(route => `/${route.replace(trailingSlashRegex, '').replace(leadingSlashRegex, '')}`);
}

// used to match and parse urls
export function buildRouteRegex(route) {
  let regex;
  if (route.match(containsVariableOrWildcardRegex) === null) {
    // Do not allow hashes on root or and hash links
    if (route.trim() === '/' || route.includes('#')) regex = new RegExp(`^${route}$`);
    else regex = new RegExp(`^${route}${ignoreHashRegexString}$`);
  }
  else regex = new RegExp(
    `^${route
      .replace(parameterRegex, (_full, _dots, name) => `(?<${name}>[^\/]+)`)
      .replace(wildcardRegex, replaceWidCardString)
    }${followedBySlashRegexString}$`,
    ''
  );
  return regex;
}

export function matchRouteConfig(path, routeConfigs) {
  const found = routeConfigs.find(({ routeRegex }) => matchPath(path, routeRegex));
  if (!found) return;

  if (typeof location !== 'undefined') {
    const match = path.match(found.routeRegex);
    const searchParameters = Object.fromEntries(new URLSearchParams(location.search.split(/\?(.*)?$/).slice(1).join('')).entries());

    return {
      ...found,
      urlParameters: match?.groups,
      searchParameters
    };
  }

  return { ...found };
}

export function matchPath(path, routeRegex) {
  const pathNoSearch = path.split('?')[0];
  return pathNoSearch.match(routeRegex) !== null;
}
