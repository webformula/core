const leadingSlashRegex = /^\//;
const trailingSlashRegex = /\/$/;
const containsVariableOrWildcardRegex = /\/:|\*/g;
const ignoreHashRegexString = '(#(.*))?';
const parameterRegex = /([:*])(\w+)/g;
const wildcardRegex = /\*/g;
const replaceWidCardString = '(?:.*)';
const followedBySlashRegexString = '(?:\/$|$)';


export function matchPath(path, paths) {
  let found = paths.find(v => path.match(v.regex) !== null);
  if (!found) found = paths.find(v => v.notFound);
  return found;
}

export function buildPathRegex(route) {
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

export function cleanPath(path) {
  return `/${path.replace(trailingSlashRegex, '').replace(leadingSlashRegex, '')}`
}

export function getExtension(url) {
  if (!url.includes('.')) return '';
  return url.split(/[#?]/)[0].split('.').pop().trim().toLowerCase();
}
