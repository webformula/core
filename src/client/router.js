const app = {
  paths: [],
  pageCounter: 0,
  componentModuleQueue: [],
  preventNavigation: false
};

// prevent html code from throwing an error before route hookup
//  onchange="page.var = 'value'"
window.page = { __initial__: true };


/**
* @typedef {Object} config
* @property {Component} component Component class
* @property {string} path Route path
* @property {boolean} [notFound] Mark as not found page
*/
/**
 * Register routes. This is called automatically
 * @param {config[]} config route configuration
 */
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

  window.wfcRoutes = app.paths;
  if (!window.__isBuilding && isCurrent) route(location, false, true);
}


/**
 * Prevents all navigation. Good for auth flow
 * @param {boolean} enabled Enable for SPA
 */
export function preventNavigation(enabled = true) {
  app.preventNavigation = !!enabled;
}


/**
 * TODO replace current spa intercepting with navigation api when broadly available
 * https://developer.mozilla.org/en-US/docs/Web/API/Navigation#specifications
 */
// let isSpa = false;
// export function enableSPA() {
//   if (isSpa) return;
//   isSpa = true;

//   navigation.addEventListener('navigate', event => {
//     const url = new URL(event.destination.url);
//     if (
//       event.navigationType === 'reload' ||
//       location.origin !== url.origin ||
//       !event.canIntercept ||
//       event.hashChange ||
//       event.downloadRequest ||
//       event.formData
//     ) return;


//     event.intercept({
//       handler() {
//         route(url);
//       }
//     });
//   });
// }


/** Makes navigation localized for SPA */
export function enableSPA() {
  window.wfcSPA = true;
  document.addEventListener('click', event => {
    if (!event.target.matches('[href]')) return;
    // allow external links
    if (event.target.getAttribute('href').includes('://')) return;
    event.preventDefault();

    route(new URL(event.target.href));

    // the prevent default keeps the link from loosing focus
    // event.target.blur();
  }, false);

  let popPrevented = false;
  window.addEventListener('popstate', event => {
    if (popPrevented) return popPrevented = false; // used in preventing back navigation

    if (window.wfcSPA !== false) {
      const beforeUnloadEvent = new Event('beforeunload', { cancelable: true });
      window.dispatchEvent(beforeUnloadEvent);
      if (beforeUnloadEvent.defaultPrevented && !confirm('Changes you made may not be saved.')) {
        popPrevented = true;
        history.go(1);
      } else route(new URL(event.currentTarget.location), true);
    } else {
      route(new URL(event.currentTarget.location), true);
    }
  });
}

/**
 * Change route. This is automatically called by href links
 * @param {Object} locationObject route configuration
 * @param {Boolean} [back] Declare back navigation
 * @param {Boolean} [initial] Declare initial navigation
 */
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
    // TODO remove when using navigation api
    if (!back) window.history.pushState({}, currentPage.constructor.pageTitle, `${locationObject.pathname}${locationObject.search}${locationObject.hash}`);
    if (!hashMatches) window.dispatchEvent(new Event('hashchange'));
    return;
  }

  if (!currentPage.__initial__) {
    currentPage._internalDisconnectedCallback();
    currentPage.disconnectedCallback();
  }
  const nextPage = new match.component();
  // TODO remove when using navigation api
  if (!back && !initial) window.history.pushState({}, nextPage.constructor.pageTitle, `${locationObject.pathname}${locationObject.search}${locationObject.hash}`);
  window.page = nextPage;

  if (!initial) {
    document.body.scrollTop = 0;
    nextPage.render();
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
  } else {
    nextPage.render();
    // nextPage.onLoadRender();
  }
  nextPage.connectedCallback();
  queueMicrotask(() => {
    if (!initial) window.dispatchEvent(new Event('locationchange'));
    else window.dispatchEvent(new Event('locationchangeinitial'));
  });
  // requestAnimationFrame(() => {
  //   if (!initial) window.dispatchEvent(new Event('locationchange'));
  //   else window.dispatchEvent(new Event('locationchangeinitial'));
  // });
}
