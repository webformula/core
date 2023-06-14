import { buildPathRegex } from '../shared.js';
import Component from './Component.js';

export {
  Component
}

const leadingSlashRegex = /^\//;
const trailingSlashRegex = /\/$/;
const app = {
  pages: new Map(),
  paths: [],
  pageCounter: 0
};


window.addEventListener('DOMContentLoaded', () => {
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
});



export function routes(config = [{
  component,
  path,
  notFound
}]) {
  const invalid = config.find(r => !r.component || !r.path);
  if (invalid) throw Error('Routes missing properties: { path, component }');

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
  }
  route(location);
}

async function route(locationObject, back = false) {
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
  // TODO initial render
  // nextPage.render();
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  nextPage.connectedCallback();
  window.dispatchEvent(new Event('locationchange'));
}
