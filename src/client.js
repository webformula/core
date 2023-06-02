import { cleanRoutes, buildRouteRegex, matchPath, matchRouteConfig  } from './helpers.js';

const isBrowser = typeof window !== 'undefined';
const pageClassFetchQueue = [];
const appConfig = {
  pageConfigs: [],
  routeConfigs: []
};
let interceptLinksEnabled = false;


if (isBrowser) {
  window.addEventListener('popstate', event => {
    hookupAndRender(new URL(event.currentTarget.location), true);
  });
}

export function registerAppConfig(configs) {
  configs.forEach(config => {
    const pageConfig = {
      pageClassPath: config.pageClassPath,
      notFound: config.notFound,
      routes: config.routes.map(({ route }) => ({
        route,
        regex: buildRouteRegex(route)
      }))
    };

    if (config.notFound) appConfig.notFoundRoute = pageConfig;
    appConfig.pageConfigs.push(pageConfig);
    pageConfig.routes.forEach(({ route, regex }) => {
      appConfig.routeConfigs.push({
        route,
        regex,
        pageConfig
      });
    });
 
    handlePageFiles(pageConfig);
  });

  hookupAndRender(location);
  if (interceptLinksEnabled) runPageClassFetchQueue();
}
if (isBrowser) window.registerAppConfig = registerAppConfig;

export function registerPage(pageClass, routes, {
  notFound
} = { notFound: false }) {
  // combine routes from page and register. Fix starting and trailing slashes
  routes = cleanRoutes([...new Set([...[].concat(routes || []), ...(pageClass.routes || [])])]);
  if (!routes) return console.warn('No routes provided for page');

  let containsCurrent = false;
  const pageConfig = {
    pageClass,
    notFound,
    routes: routes.map(route => {
      const regex = buildRouteRegex(route);
      if (matchPath(location.pathname, regex)) containsCurrent = true;
      return {
        route,
        regex
      };
    })
  };
  if (notFound) appConfig.notFoundRoute = pageConfig;
  appConfig.pageConfigs.push(pageConfig);
  pageConfig.routes.forEach(({ route, regex }) => {
    appConfig.routeConfigs.push({
      route,
      regex,
      pageConfig
    });
  });

  handlePageFiles(pageConfig);

  if (containsCurrent) hookupAndRender(location);
  finalCheck();
}

/** Intercept links to create single page app with normal urls
 *  The backend will need to support URL routing for first page load
 */
export function enableLinkIntercepts() {
  interceptLinksEnabled = true;
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

export class Page {
  static pageTitle;
  /** ['/a', '/a/:id']; */
  static routes = [];
  /** used for imported html */
  static html = '';

  #urlParameters;
  #searchParameters;
  #route;

  constructor() {
    if (this.constructor.html) this.template = () => new Function('page', `return \`${this.constructor.html}\`;`).call(this, this);
  }

  get searchParameters() {
    return this.#searchParameters;
  }

  get urlParameters() {
    return this.#urlParameters;
  }

  get route() {
    return this.#route;
  }

  // override
  connectedCallback() { }
  disconnectedCallback() { }

  /** beforeRender not called on initial render */
  async beforeRender() { }
  async afterRender() { }

  /** Return HTML template string.
   *  ./page.js
   *  new class one extends Page {
   *    template() {
   *       return `<div>${this.var}</div>`;
   *    }
   *  }
   */
  template() {
    return /*html*/``;
  }

  /** Escape html to make safe for injection */
  escape(str) {
    return str.replace(/[^\w. ]/gi, function (c) {
      return '&#' + c.charCodeAt(0) + ';';
    });
  };

  async render() {
    const pageContent = document.querySelector('page-content');
    if (!pageContent) throw Error('Could not find <page-content>');

    await this.beforeRender();

    // TODO replace with setHTML when supported. https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTML
    pageContent.innerHTML = this.template.call(this, this);

    const title = document.querySelector('title');
    title.innerText = this.pageTitle;

    await this.afterRender();
  }

  // called by router
  _setUrlData(params = {
    urlParameters: {},
    searchParameters: {},
    route: ''
  }) {
    this.#urlParameters = params?.urlParameters || {};
    this.#searchParameters = params?.searchParameters || {};
    this.#route = params?.route;
  }
}




async function hookupAndRender(locationObject, back = false) {
  const url = locationObject.href.replace(locationObject.origin, '');
  let routeMatch = matchRouteConfig(url, appConfig.routeConfigs);

  if (!routeMatch && appConfig.notFoundRoute) routeMatch = { pageConfig: appConfig.notFoundRoute };
  if (!routeMatch) return console.warn(`No page found for url: ${url}`);

  if (!routeMatch.pageConfig.pageClass) routeMatch.pageConfig.pageClass = (await import(routeMatch.pageConfig.pageClassPath)).default;

  const currentPage = window.page;
  const samePage = currentPage?.constructor === routeMatch.pageConfig.pageClass;
  if (samePage) {
    if (locationObject.hash === location.hash) return;
    if (!back) window.history.pushState({}, currentPage.title, url);
    window.dispatchEvent(new Event('hashchange'));
    return;
  }


  const nextPage = routeMatch.pageConfig.pageClass ? new routeMatch.pageConfig.pageClass() : {};
  if (!back) window.history.pushState({}, nextPage.pageTitle, url);
  
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
    if (!window.page && appConfig.notFoundRoute) hookupAndRender(location);
  }, 0);
}

function handlePageFiles(pageConfig) {
  if (pageConfig.pageClass || !pageConfig.pageClassPath) return;

  const current = !!pageConfig.routes.find(({ regex }) => matchPath(location.pathname, regex));
  if (!current && !pageConfig.pageClass) pageClassFetchQueue.push(pageConfig);
}

async function runPageClassFetchQueue() {
  const runners = pageClassFetchQueue.splice(-3);
  if (runners.length === 0) return;

  await Promise.allSettled(runners.map(c => fetchPageClass(c)));
  runPageClassFetchQueue();
}

async function fetchPageClass(pageConfig) {
  try {
    pageConfig.pageClass = (await import(pageConfig.pageClassPath)).default;
  } catch (e) {
    console.error(`Cannot load page class: ${pageConfig.pageClassPath}`)
    console.error(e);
  }
}
