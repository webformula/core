const leadingSlashRegex = /^\//;
const trailingSlashRegex = /\/$/;
const containsVariableOrWildcardRegex = /\/:|\*/g;
const parameterRegex = /([:*])(\w+)/g;
const wildcardRegex = /\*/g;
const replaceWidCardString = '(?:.*)';
const followedBySlashRegexString = '(?:\/$|$)';
const ignoreHashRegexString = '(#(.*))?';
const routeConfigs = [];
let notFoundPage;

window.addEventListener('popstate', event => {
  hookupAndRender(new URL(event.currentTarget.location), true);
});

export function registerPage(pageClass, routes, {
  notFound,
  templateId
} = { notFound: false, templateId: '' }) {
  // combine routes from page and register. Fix starting and trailing slashes
  routes = cleanRoutes([...new Set([...[].concat(routes || []), ...(pageClass.routes || [])])]);

  if (!routes) {
    console.warn('No routes provided for page');
    return;
  }


  let containsCurrent = false;
  routes.forEach(route => {
    const routeRegex = buildRouteRegex(route);
    routeConfigs.push({
      pageClass,
      route,
      routeRegex,
      templateId
    });

    if (matchPath(location.pathname, routeRegex)) containsCurrent = true;
  });


  if (templateId) {
    const template = document.body.querySelector(`template#${templateId}`);
    // store template in string incase template element is removed by user
    if (template) routeConfigs.templateFileData = template.innerHTML;
  }

  if (pageClass.templatePath && !routeConfigs.templateFileData) {
    routeConfigs.initialLoadPage = containsCurrent;
    routeConfigs.templateFileAbort = new AbortController();
    routeConfigs.templateFetchPromise = fetch(pageClass.templatePath, { priority: containsCurrent === true ? 'high' : 'low', signal: routeConfigs.templateFileAbort.signal })
      .then(r => r.text())
      .then(r => {
        routeConfigs.templateFileData = r;
      });
  }

  if (containsCurrent) hookupAndRender(location);
  if (notFound) notFoundPage = { pageClass };
  finalCheck();
}


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




async function hookupAndRender(locationObject, back = false) {
  const url = locationObject.href.replace(locationObject.origin, '');
  let routeMatch = matchRouteConfig(url);

  // fetch data
  // if (!routeMatch && window._webformulaServerSide === true) {
  //   try {
  //     await fetchPage(url);
  //     routeMatch = matchRouteConfig(url, routeConfigs);
  //   } catch (e) {
  //     console.warn(`No page found for url: ${url}`);
  //   }
  // }

  if (!routeMatch) {
    if (notFoundPage) routeMatch = notFoundPage;
    else {
      console.warn(`No page found for url: ${url}`);
      return;
    }
  }

  const currentPage = window.page;
  const samePage = currentPage?.constructor === routeMatch.pageClass;
  if (samePage) {
    if (locationObject.hash === location.hash) return;
    if (!back) window.history.pushState({}, currentPage.title, url);
    window.dispatchEvent(new Event('hashchange'));
    return;
  }


  const nextPage = routeMatch.pageClass ? new routeMatch.pageClass() : {};
  if (!back) window.history.pushState({}, nextPage.pageTitle, url);

  const template = routeMatch.templateId && document.querySelector(`template#${routeMatch.templateId}`);
  if (template) nextPage.template = () => nextPage.renderTemplateString(template.innerHTML);
  else if (routeMatch.pageClass.templatePath) {
    if (!routeMatch.pageClass.templateFileData && routeConfigs.initialLoadPage) await routeConfigs.templateFetchPromise;
    else if (!routeConfigs.templateFileData) {
      routeConfigs.templateFileAbort.abort();
      const response = await fetch(routeMatch.pageClass.templatePath);
      routeConfigs.templateFileData = await response.text();
    }

    if (routeConfigs.templateFetchPromise) {
      routeConfigs.templateFetchPromise = undefined;
      routeConfigs.templateFileAbort = undefined;
    }

    nextPage.template = () => routeConfigs.templateFileData;
  }
  
  if (currentPage) currentPage.disconnectedCallback();
  window.page = nextPage;
  nextPage._setUrlData({
    urlParameters: routeMatch.urlParameters,
    searchParameters: routeMatch.searchParameters,
    route: routeMatch.route
  });
  nextPage.render();
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  nextPage.connectedCallback();

  window.dispatchEvent(new Event('locationchange'));
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


function matchRouteConfig(path) {
  const found = routeConfigs.find(({ routeRegex }) => matchPath(path, routeRegex));
  if (!found) return;

  const match = path.match(found.routeRegex);
  const searchParameters = Object.fromEntries(new URLSearchParams(location.search.split(/\?(.*)?$/).slice(1).join('')).entries());

  return {
    ...found,
    urlParameters: match?.groups,
    searchParameters
  };
}

function matchPath(path, routeRegex) {
  const pathNoSearch = path.split('?')[0];
  return pathNoSearch.match(routeRegex) !== null;
}

function cleanRoutes(routes = []) {
  return routes.map(route => `/${route.replace(trailingSlashRegex, '').replace(leadingSlashRegex, '')}`);
}
