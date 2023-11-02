const app = {
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
    if (!app.paths.find(v => v.path === c.path)) {
      app.paths.push(c);
      if (!isCurrent) isCurrent = location.pathname.match(c.regex) !== null;
    }
  }
  window.webformulaRoutes = app.paths;
  if (!window.__isBuilding && isCurrent) route(location, false, true);
}

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
    const hashMatches = locationObject.hash === location.hash;
    const searchMatches = locationObject.search === location.search;
    if (hashMatches && searchMatches) return;
    if (!back) window.history.pushState({}, currentPage.constructor.title, `${locationObject.pathname}${locationObject.search}${locationObject.hash}`);
    if (!hashMatches) window.dispatchEvent(new Event('hashchange'));
    return;
  }
  const nextPage = new match.component();
  if (!back) window.history.pushState({}, nextPage.constructor.title, `${locationObject.pathname}${locationObject.search}${locationObject.hash}`);
  if (currentPage) {
    currentPage.internalDisconnect();
    currentPage.disconnectedCallback();
  }
  window.page = nextPage;

  if (!initial) {
    nextPage.render();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // document.querySelector('page-content').scrollTop = 0;
  } else nextPage.onLoadRender();
  nextPage.connectedCallback();
  requestAnimationFrame(() => {
    if (!initial) window.dispatchEvent(new Event('locationchange'));
  });
}

if (window.webformulaCoreSpa !== false) {
  window.webformulaCoreLinkIntercepts = true;
  document.addEventListener('click', event => {
    if (!event.target.matches('[href]')) return;

    // allow external links
    if (event.target.getAttribute('href').includes('://')) return;

    event.preventDefault();
    route(new URL(event.target.href));

    // the prevent default keeps the link from loosing focus
    event.target.blur();
  }, false);

  window.addEventListener('popstate', event => {
    route(new URL(event.currentTarget.location), true);
  });
}
