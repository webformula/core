import { buildPathRegex } from './shared.js';

const leadingSlashRegex = /^\//;
const trailingSlashRegex = /\/$/;
const app = {
  pages: new Map(),
  paths: [],
  pageCounter: 0,
  componentModuleQueue: [],
  preventNavigation: false
};



export function routes(config = [{
  component,
  path,
  notFound
}]) {
  const invalid = config.find(r => !r.component || !r.path);
  if (invalid) throw Error('Routes missing properties: { path, component }');

  let isCurrent = false;
  for (const c of config) {
    c.path = `/${c.path.replace(trailingSlashRegex, '').replace(leadingSlashRegex, '')}`;
    if (app.paths.find(v => v.path === c.path)) return;

    const regex = buildPathRegex(c.path);
    const componentModule = typeof c.component === 'string' ? undefined : c.component;
    // can have multiple paths with same page
    if (!app.pages.has(c.component)) app.pages.set(c.component, {
      component: c.component,
      componentModule,
      notFoundPage: c.notFoundPage
    });
    app.paths.push({
      ...c,
      regex
    });
    if (location.pathname.match(regex)) isCurrent = true;
    if (!componentModule && !app.componentModuleQueue.includes(c.component)) app.componentModuleQueue.push(c.component);
  }
  if (isCurrent) route(location, false, true);
  setTimeout(() => runComponentModuleQueue());
}
window.wfRoutes = routes;

export function preventNavigation(value = true) {
  app.preventNavigation = !!value;
}


async function route(locationObject, back = false, initial = false) {
  if (!initial && app.preventNavigation) return;

  let match = app.paths.find(v => locationObject.pathname.match(v.regex) !== null);
  if (!match) match = app.paths.find(v => v.notFound);
  if (!match) return console.warn(`No page found for path: ${locationObject.pathname}`);

  const page = app.pages.get(match.component);

  // using web components for pages so we need to define it
  if (!page.componentModule._defined) {
    page.componentModule.useTemplate = false;
    page.componentModule._isPage = true;
    page.componentModule._pagePathRegex = match.regex;
    customElements.define(`page-${app.pageCounter++}`, page.componentModule);
    page.componentModule._defined = true;
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
  if (!initial) nextPage.render();
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  nextPage.connectedCallback();
  if (!initial) window.dispatchEvent(new Event('locationchange'));
}

async function runComponentModuleQueue() {
  app.componentModuleQueue.forEach(key => {
    const page = app.pages.get(key);
    page.componentModulePromise = import(key);
    page.componentModulePromise
      .then(module => {
        page.componentModule = module.default;
        page.componentModulePromise = undefined;
      })
      .catch(e => console.error(e));
  });
}

console.log(window._webformulaSinglePage)
if (window._webformulaSinglePage) {
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
