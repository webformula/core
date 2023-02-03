const containsVariableOrWildcardRegex = /\/:|\*/g;
const parameterRegex = /([:*])(\w+)/g;
const wildcardRegex = /\*/g;
const replaceWidCardString = '(?:.*)';
const followedBySlashRegexString = '(?:\/$|$)';
const routeConfigs = [];
let notFoundPage;

// TODO make routes work with no SPA enabled (#hashes only)

/** Intercept links to create single page app with normal urls
 *  The backend will need to support URL routing for first page load
 */
export function enableSPA() {
  window.paxCoreSPA = true;

  document.addEventListener('click', async event => {
    if (!event.target.matches('[href]')) return;

    // allow external links
    if (event.target.getAttribute('href').includes('://')) return;

    event.preventDefault();
    hookupAndRender(new URL(event.target.href));
    // the prevent default keeps the link from loosing focus
    event.target.blur();
  });

  window.addEventListener('popstate', event => {
    hookupAndRender(new URL(event.currentTarget.location), true);
  });
}

/** Register Page classes
 *   Routes can be passed in here or configured in the Page
 * 
 *   routes = ['/one', '/one/:id'];
 *   notFound: designate a page as the not found page
*/
export function registerPage(pageClass, routes, notFound = false) {
  routes = routes || pageClass.routes;

  if (!routes) {
    console.warn('No routes provided for page');
    return;
  }

  [].concat(routes).forEach(value => {
    // TODO check for dup route
    const routeRegex = buildRouteRegex(value);
    [].concat(routes).forEach(value => routeConfigs.push({
      route: value,
      routeRegex,
      pageClass: pageClass.constructor
    }));

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
  if (route.match(containsVariableOrWildcardRegex) === null) regex = new RegExp(`^${route}$`);
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
  return {
    ...found,
    urlParameters: match.groups
  };
}

function doesUrlMatchWindowLocation(url) {
  if (url === location.href) return true;
  if (url === location.pathname) return true;
  return false;
}

function handleHashChange(locationObject) {
  const hash = locationObject.hash;
  if (hash === location.hash) return;
  window.history.pushState({}, '', hash);
  if (hash) window.dispatchEvent(new Event('hashchange'));
}


function hookupAndRender(locationObject, back = false) {
  const url = locationObject.pathname;
  const currentPage = window.page;
  if (back === false && currentPage && url === location.pathname) return handleHashChange(locationObject);

  const path = url || location.pathname; // TODO check why defaulting is needed
  let routeMatch = matchRoute(path);
  if (currentPage === path) return;

  // TODO not found
  if (!routeMatch) {
    if (notFoundPage) routeMatch = notFoundPage;
    else {
      console.warn(`No page found for url: ${url}`);
      return;
    }
  }

  const nextPage = routeMatch.pageClass ? new routeMatch.pageClass() : {};

  // handle state change.
  const urlMatches = doesUrlMatchWindowLocation(url);
  if (!urlMatches) {
    window.history.pushState({}, '', `${url}${locationObject.hash}`);
    window.dispatchEvent(new Event('locationchange'));

    // the urls can match when hitting the back button to the same page or only the hash changes
  } else if (back === true) {
    // there is a delay in the render when hitting the back. this will account for that
    setTimeout(() => {
      window.history.pushState({}, '', `${url}${locationObject.hash}`);
      window.dispatchEvent(new Event('locationchange'));
    }, 0);
  }

  const hashMatches = locationObject.hash === location.hash;
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
    searchParameters: {} // TODO 
  });

  nextPage.render();
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  nextPage.connectedCallback();
}
