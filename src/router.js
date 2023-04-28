const containsVariableOrWildcardRegex = /\/:|\*/g;
const parameterRegex = /([:*])(\w+)/g;
const wildcardRegex = /\*/g;
const replaceWidCardString = '(?:.*)';
const followedBySlashRegexString = '(?:\/$|$)';
const ignoreHashRegexString = '(#(.*))?';
const routeConfigs = [];
let notFoundPage;


/** Intercept links to create single page app with normal urls
 *  The backend will need to support URL routing for first page load
 */
export function enableLinkIntercepts() {
  window.webformulaCoreLinkIntercepts = true;
  document.addEventListener('click', event => {
    if (!event.target.matches('[href]')) return;

    // allow external links
    if (event.target.getAttribute('href').includes('://')) {
      const target = event.target.getAttribute('target');
      if (['_blank', '_self', '_parent', '_top'].includes(target)) {
        window.open(event.target.getAttribute('href'), target).focus();
      }
      return;
    }

    event.preventDefault();
    hookupAndRender(new URL(event.target.href));
    // the prevent default keeps the link from loosing focus
    event.target.blur();
  });
}

window.addEventListener('popstate', event => {
  hookupAndRender(new URL(event.currentTarget.location), true);
});


/** Register Page classes
 *   Routes can be passed in here or configured in the Page
 * 
 *   routes = ['/one', '/one/:id'];
 *   notFound: designate a page as the not found page
*/
export function registerPage(pageClass, routes, notFound = false) {
  // combine routes from page and register. Fix starting and trailing slashes
  routes = [...new Set([routes, ...(pageClass.routes || [])])]
    .map(route => `/${route.replace(/\/$/, '').replace(/^\//, '')}`);

  if (!routes) {
    console.warn('No routes provided for page');
    return;
  }

  routes.forEach(value => {
    const routeRegex = buildRouteRegex(value);
    routeConfigs.push({
      route: value,
      routeRegex,
      pageClass: pageClass.constructor
    });
    const match = location.pathname.match(routeRegex);
    if (match !== null) hookupAndRender(location);
  });

  if (notFound) notFoundPage = { pageClass: pageClass.constructor };
  finalCheck();
}


// check to see if no page was hooked up
let finalCallTimer;
function finalCheck() {
  clearTimeout(finalCallTimer);
  finalCallTimer = setTimeout(() => {
    finalCallTimer = undefined;
    if (!window.page && notFoundPage) hookupAndRender(location);
  }, 0);
}




// used to match and parse urls
function buildRouteRegex(route) {
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

function matchRoute(path) {
  const found = routeConfigs.find(({ routeRegex }) => path.match(routeRegex) !== null);
  if (!found) return;

  const match = path.match(found.routeRegex);
  const searchParameters = Object.fromEntries(new URLSearchParams(location.search.split(/\?(.*)?$/).slice(1).join('')).entries());

  return {
    ...found,
    urlParameters: match.groups,
    searchParameters
  };
}

function doesURLMatchWindowLocation(url) {
  if (url === location.href.replace(location.origin, '')) return true;
  if (url === location.href) return true;
  if (url === location.pathname) return true;
  return false;
}


function hookupAndRender(locationObject, back = false) {
  const url = locationObject.href.replace(locationObject.origin, '');
  const currentPage = window.page;
  let routeMatch = matchRoute(url);
  const samePage = currentPage?.constructor === routeMatch?.pageClass;
  const hashMatches = samePage && locationObject.hash === location.hash;

  if (!routeMatch) {
    if (notFoundPage) routeMatch = notFoundPage;
    else {
      console.warn(`No page found for url: ${url}`);
      return;
    }
  }

  // handle hash changes on same url
  if (back == false && samePage) {
    if (!hashMatches) {
      window.history.pushState({}, '', url);
      if (locationObject.hash && !hashMatches) window.dispatchEvent(new Event('hashchange'));
    }
    return;
  }

  const nextPage = routeMatch.pageClass ? new routeMatch.pageClass() : {};

  // handle state change.
  const urlMatches = doesURLMatchWindowLocation(url);
  if (!urlMatches) {
    window.history.pushState({}, '', url);
    window.dispatchEvent(new Event('locationchange'));


    // TODO look into removing this location change
    // the urls can match when hitting the back button to the same page or only the hash changes
  } else if (back === true) {
    // there is a delay in the render when hitting the back. this will account for that
    setTimeout(() => {
      window.dispatchEvent(new Event('locationchange'));
    }, 0);
  }

  if (locationObject.hash && !hashMatches) window.dispatchEvent(new Event('hashchange'));

  // handle hash change when previous url has hash
  if (back === true && location.hash) {
    // there is a delay in the render when hitting the back. this will account for that
    setTimeout(() => {
      window.dispatchEvent(new Event('hashchange'));
    }, 0);
  }

  if (currentPage) currentPage.disconnectedCallback();
  window.page = nextPage;

  nextPage._setUrlData({
    urlParameters: routeMatch.urlParameters,
    searchParameters: routeMatch.searchParameters || {}
  });

  nextPage.render();
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  nextPage.connectedCallback();
}
