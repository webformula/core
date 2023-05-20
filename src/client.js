import page from '../server-example/pages/notfound/page.js';
import { cleanRoutes, buildRouteRegex, matchPath, buildTemplateId, matchRouteConfig  } from './helpers.js';

const isBrowser = typeof window !== 'undefined';
const pageTemplateFetchQueue = [];
const pageClassFetchQueue = [];
const appConfig = {
  pageConfigs: [],
  routeConfigs: []
};


if (isBrowser) {
  window.addEventListener('popstate', event => {
    hookupAndRender(new URL(event.currentTarget.location), true);
  });
}

export function registerAppConfig(configs) {
  configs.forEach(config => {
    const pageConfig = {
      pageClassPath: config.pageClassPath,
      templatePath: config.templatePath,
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
  runPageClassFetchQueue();
  runPageTemplateFetchQueue();
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
    templatePath: pageClass.templatePath,
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
  config.routes.forEach(({ route, regex }) => {
    appConfig.routeConfigs.push({
      route,
      regex,
      pageConfig
    });
  });

  if (containsCurrent) hookupAndRender(location);
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

export class Page {
  static pageTitle;
  /** ['/a', '/a/:id']; */
  static routes = [];
  static templatePath = '';

  #urlParameters;
  #searchParameters;
  #route;

  constructor() { }

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

  /** For html file is loaded as raw text and uses template liters
   *  ./page.html
   *  <div>${page.var}</div>
   * 
   *  ./page.js
   *  import html from 'page.html`;
   *  new class one extends Page {
   *    template() {
   *       return this.renderTemplateString(html);
   *    }
   *  }
   */
  renderTemplateString(template = '') {
    return new Function('page', `return \`${template}\`;`).call(this, this);
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
  if (!routeMatch && appConfig.notFoundRoute) routeMatch = appConfig.notFoundRoute;
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

  if (!routeMatch.pageConfig.templateFileData) {
    if (routeMatch.pageConfig.templateFetchPromise) await routeMatch.pageConfig.templateFetchPromise;
    else if (pageTemplateFetchQueue.includes(routeMatch.pageConfig)) {
      pageTemplateFetchQueue.splice(pageTemplateFetchQueue.indexOf(routeMatch.pageConfig), 1);
      fetchPage(routeMatch.pageConfig, true);
    }
  }

  nextPage.template = () => nextPage.renderTemplateString(routeMatch.pageConfig.templateFileData);

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
  if (!pageConfig.templatePath && !pageConfig.pageClassPath) return;
  if (pageConfig.templateFileData && pageConfig.pageClass) return;

  const current = !!pageConfig.routes.find(({ regex }) => matchPath(location.pathname, regex));
  if (!pageConfig.pageClass) queuePageClassFetch(pageConfig, current);
  if (!pageConfig.templateFileData) {
    const templateId = buildTemplateId(pageConfig.templatePath);
    if (templateId) {
      const template = document.body.querySelector(`template#${templateId}`);
      if (template) {
        pageConfig.templateFileData = template.innerHTML;
        return;
      }
    }
    if (!pageConfig.templateFetchPromise) queuePageTemplateFetch(pageConfig, current);
  }
}

function queuePageClassFetch(pageConfig, current) {
  if (current) pageConfig.templateFetchPromise = fetchPageClass(pageConfig);
  pageClassFetchQueue.push(pageConfig);
}

function queuePageTemplateFetch(pageConfig, current) {
  if (current) pageConfig.templateFetchPromise = fetchPageTemplate(pageConfig, true);
  pageTemplateFetchQueue.push(pageConfig);
}

async function runPageTemplateFetchQueue() {
  const runners = pageTemplateFetchQueue.splice(-3);
  if (runners.length === 0) return;

  await Promise.allSettled(runners.map(c => fetchPageTemplate(c)));
  runPageTemplateFetchQueue();
}

async function fetchPageTemplate(pageConfig, current) {
  pageConfig.templateFetchPromise = fetch(pageConfig.templatePath, { priority: current === true ? 'high' : 'low' });
  const response = await pageConfig.templateFetchPromise;
  pageConfig.templateFileData = await response.text();
  pageConfig.templateFetchPromise = undefined;
}

async function runPageClassFetchQueue() {
  const runners = pageClassFetchQueue.splice(-3);
  if (runners.length === 0) return;

  await Promise.allSettled(runners.map(c => fetchPageClass(c)));
  runPageClassFetchQueue();
}

async function fetchPageClass(pageConfig) {
  pageConfig.pageClassImportPromise = import(pageConfig.pageClassPath);
  pageConfig.pageClass = (await pageConfig.pageClassImportPromise).default;
  pageConfig.pageClassImportPromise = undefined;
}
