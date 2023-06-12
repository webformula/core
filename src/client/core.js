import {
  matchPath,
  buildPathRegex,
  cleanPath
} from '../shared.js';

const app = {
  pages: new Map(),
  paths: [],
  pageCounter: 0,
  preventNavigation: false
};


function init() {
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
    route(new URL(event.target.href));

    // the prevent default keeps the link from loosing focus
    event.target.blur();
  });
  window.addEventListener('popstate', event => {
    route(new URL(event.currentTarget.location), true);
  });
}
init();


export function routes(config = [{
  component,
  path,
  notFound
}]) {
  const invalid = config.find(r => !r.component || !r.path);
  if (invalid) throw Error('Routes missing properties: { path, component }');

  for (const c of config) {
    c.path = cleanPath(c.path);
    const regex = buildPathRegex(c.path);
    const componentModule = typeof c.component === 'string' ? undefined : c.component;
    if (!app.pages.has(c.component)) app.pages.set(c.component, {
      component: c.component,
      componentModule,
      notFoundPage: c.notFoundPage
    });
    app.paths.push({
      ...c,
      regex
    });
    if (c.notFoundPage) app.notFoundPage = {
      ...c,
      componentModule,
      regex
    }
    loadComponentModule(app.pages.get(c.component));
  }

  route(location);
}

export function preventNavigation(value = true) {
  app.preventNavigation = !!value;
}

function loadComponentModule(config) {
  if (config.componentModule) return;

  return config.componentModulePromise = import(config.component)
    .then(m => {
      config.componentModule = m.default;
      if (app.notFoundPage && app.notFoundPage.component === config.component) app.notFoundPage.componentModule = m.default;
    })
    .catch(e => console.error(`Cannot load page module: ${config.component}`, e));
}

async function route(locationObject, back = false) {
  if (app.preventNavigation) return;

  const match = matchPath(locationObject.pathname, app.paths);
  if (!match) return console.warn(`No page found for path: ${locationObject.pathname}`);

  const page = app.pages.get(match.component);
  if (!page.componentModule) {
    // wait for server loading
    if (page.componentModulePromise) await page.componentModulePromise;
    else throw Error('Could not find page module for', match.path);
  }

  // using web components for pages so we need to define it
  if (!page.defined) {
    page.componentModule.useTemplate = false;
    page.componentModule._isPage = true;
    page.componentModule._pathRegex = match.regex;
    customElements.define(`page-${app.pageCounter++}`, page.componentModule);
    page.defined = true;
  }
  
  const currentPage = window.page;
  const samePage = currentPage?.constructor === page.componentModule;
  if (samePage) {
    if (locationObject.hash === location.hash) return;
    if (!back) window.history.pushState({}, currentPage.title, locationObject.pathname);
    window.dispatchEvent(new Event('hashchange'));
    return;
  }

  const nextPage = new page.componentModule();
  if (!back) window.history.pushState({}, nextPage.title, locationObject.pathname);

  if (currentPage) currentPage.disconnectedCallback();
  window.page = nextPage;
  // nextPage._setUrlData({
  //   urlParameters: locationObject.pathname.match(match.regex)?.groups,
  //   searchParameters: Object.fromEntries([...new URLSearchParams(locationObject.search).entries()])
  // });
  nextPage.render();
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  nextPage.connectedCallback();

  window.dispatchEvent(new Event('locationchange'));
}
