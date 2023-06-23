import { buildPathRegex } from '../shared.js';

const leadingSlashRegex = /^\//;
const trailingSlashRegex = /\/$/;
const app = {
  // pages: new Map(),
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
    // can have multiple paths with same page
    // if (!app.pages.has(c.component)) app.pages.set(c.component, {
    //   component: c.component,
    //   notFoundPage: c.notFoundPage
    // });
    app.paths.push({
      ...c,
      regex
    });
    if (location.pathname.match(regex)) isCurrent = true;  }
  if (isCurrent) route(location, false, true);
}
// window.getRoutes = () => app;

export function preventNavigation(value = true) {
  app.preventNavigation = !!value;
}


async function route(locationObject, back = false, initial = false) {
  if (!initial && app.preventNavigation) return;

  let match = app.paths.find(v => locationObject.pathname.match(v.regex) !== null);
  if (!match) match = app.paths.find(v => v.notFound);
  if (!match) console.warn(`No page found for path: ${locationObject.pathname}`);

  // using web components for pages so we need to define it
  if (!match.component._defined) {
    match.component = await Promise.resolve(match.component);
    if (typeof match.component !== 'function') match.component = match.component.default;
    match.component.useTemplate = false;
    match.component._isPage = true;
    match.component._pagePathRegex = match.regex;
    customElements.define(`page-${app.pageCounter++}`, match.component);
    match.component._defined = true;
  }

  const currentPage = window.page;
  const samePage = currentPage?.constructor === match.component;
  if (samePage) {
    if (locationObject.hash === location.hash) return;
    if (!back) window.history.pushState({}, currentPage.title, locationObject.pathname);
    window.dispatchEvent(new Event('hashchange'));
    return;
  }
  const nextPage = new match.component();
  if (!back) window.history.pushState({}, nextPage.title, locationObject.pathname);
  if (currentPage) currentPage.disconnectedCallback();
  window.page = nextPage;
  if (!initial) {
    nextPage.render();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  nextPage.connectedCallback();
  if (!initial) window.dispatchEvent(new Event('locationchange'));
}

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
}, false);
window.addEventListener('popstate', event => {
  route(new URL(event.currentTarget.location), true);
});
