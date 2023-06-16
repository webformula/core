const containsVariableOrWildcardRegex = /\/:|\*/g;
const ignoreHashRegexString = '(#(.*))?';
const parameterRegex = /([:*])(\w+)/g;
const wildcardRegex = /\*/g;
const replaceWidCardString = '(?:.*)';
const followedBySlashRegexString = '(?:\/$|$)';


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

export function getExtension(url) {
  if (!url.includes('.')) return '';
  const split = url.split(/[#?]/)[0].split('.');
  let ext = split.pop().trim().toLowerCase();
  if (ext === 'gz') ext = split.pop();
  return ext;
}
