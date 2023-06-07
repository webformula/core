import {
  matchPath,
  buildPathRegex,
  cleanPath
} from '../shared.js';

const app = {
  pages: new Map(),
  paths: []
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
  page,
  path,
  notFound
}]) {
  const invalid = config.find(r => !r.page || !r.path);
  if (invalid) throw Error('Routes missing properties: { page, path }');

  for (const c of config) {
    c.path = cleanPath(c.path);
    const regex = buildPathRegex(c.path);
    const pageModule = typeof c.page === 'string' ? undefined : c.page;
    if (!app.pages.has(c.page)) app.pages.set(c.page, {
      page: c.page,
      pageModule,
      notFoundPage: c.notFoundPage
    });
    app.paths.push({
      ...c,
      regex
    });
    if (c.notFoundPage) app.notFoundPage = {
      ...c,
      pageModule,
      regex
    }
  }

  loadPageModules();
  route(location);
}

// load other page modules when server side initiated
function loadPageModules() {
  for (const v of app.pages.values()) {
    if (!v.pageModule) {
      v.pageModulePromise = import(v.page)
        .then(m => {
          v.pageModule = m.default;
          if (app.notFoundPage && app.notFoundPage.page === v.page) app.notFoundPage.pageModule = m.default;
        })
        .catch(e => console.error(`Cannot load page module: ${v.page}`, e));
    }
  }
}


async function route(locationObject, back = false) {
  const match = matchPath(locationObject.pathname, app.paths);
  if (!match) return console.warn(`No page found for path: ${locationObject.pathname}`);

  const page = app.pages.get(match.page);
  if (!page.pageModule) {
    // wait for server loading
    if (page.pageModulePromise) await page.pageModulePromise;
    else throw Error('Could not find page module for', match.path);
  }
  
  const currentPage = window.page;
  const samePage = currentPage?.constructor === page.pageModule;
  if (samePage) {
    if (locationObject.hash === location.hash) return;
    if (!back) window.history.pushState({}, currentPage.title, locationObject.pathname);
    window.dispatchEvent(new Event('hashchange'));
    return;
  }

  const nextPage = new page.pageModule();
  if (!back) window.history.pushState({}, nextPage.title, locationObject.pathname);

  if (currentPage) currentPage.disconnectedCallback();
  window.page = nextPage;
  nextPage._setUrlData({
    urlParameters: locationObject.pathname.match(match.regex)?.groups,
    searchParameters: Object.fromEntries([...new URLSearchParams(locationObject.search).entries()])
  });
  nextPage.render();
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  nextPage.connectedCallback();

  window.dispatchEvent(new Event('locationchange'));
}
