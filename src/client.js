const leadingSlashRegex = /^\//;
const trailingSlashRegex = /\/$/;
const containsVariableOrWildcardRegex = /\/:|\*/g;
const parameterRegex = /([:*])(\w+)/g;
const wildcardRegex = /\*/g;
const replaceWidCardString = '(?:.*)';
const followedBySlashRegexString = '(?:\/$|$)';
const ignoreHashRegexString = '(#(.*))?';
const isBrowser = typeof window !== 'undefined';
const routeConfigs = [];
let notFoundPage;
let prefetchAppComplete = false;


if (isBrowser) {
  window.addEventListener('popstate', event => {
    hookupAndRender(new URL(event.currentTarget.location), true);
  });

  addEventListener('DOMContentLoaded', () => {
    if (window._webformulaServerSide === true) prefetchApp();
  });
}


export function registerPage(pageClass, routes, {
  notFound,
  templateId
} = { notFound: false, templateId: '' }) {
  // combine routes from page and register. Fix starting and trailing slashes
  routes = cleanRoutes([...new Set([...[].concat(routes || []), ...(pageClass.routes || [])])]);

  if (!routes) return console.warn('No routes provided for page');

  let containsCurrent = false;
  routes.forEach(route => {
    const routeRegex = buildRouteRegex(route);
    routeConfigs.push({
      pageClass,
      route,
      routeRegex,
      templateId
    });
    if (notFound && !notFoundPage) notFoundPage = {
      pageClass,
      route,
      routeRegex,
      templateId
    };

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
  let routeMatch = matchRouteConfig(url, routeConfigs);

  // fetch data
  if (!routeMatch && !prefetchAppComplete && window._webformulaServerSide === true) {
    try {
      const config = await fetchPage(url);
      if (config.notFound === true) routeMatch = notFoundPage;
      else routeMatch = matchRouteConfig(url, routeConfigs);
    } catch (e) {
      console.warn(`No page found for url: ${url}`, e);
    }
  }

  if (!routeMatch && notFoundPage) routeMatch = notFoundPage;
  if (!routeMatch) return console.warn(`No page found for url: ${url}`);

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

async function fetchPage(url) {
  const response = await fetch(`/fetch-page${url}`);
  const json = await response.json();
  // if (json.notFoundInvalid === true) {
  //   return;
  // }
  if (json.notFound && json.templateId && document.body.querySelector(`template#${json.templateId}`)) {
    return json;
  }
  const Page = await import(`${json.pageClassPath}`);
  const template = document.createElement('template');
  template.id = json.templateId;
  template.innerHTML = json.html;
  document.body.appendChild(template);
  registerPage(Page.default, json.route, { templateId: json.templateId, notFound: json.notFound });
  return json;
}

// TODO move to service worker
// preload pages in batches
async function prefetchApp() {
  const batchCount = 3;
  const response = await fetch(`/prefetch-pages`);
  const json = await response.json();
  const requests = json.map(v => () => fetchPage(v.route));
  let batches = [];
  while (requests.length) {
    batches.push(requests.splice(0, batchCount));
  }

  for (const batch of batches) {
    try {
      await Promise.all(batch.map(f => f()))
    } catch (err) {
      console.error(err)
    }
  }

  prefetchAppComplete = true;
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
