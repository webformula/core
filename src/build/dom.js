import { parseHTML } from 'linkedom';

// TODO do i need to inject the app index.html
const dom = parseHTML(`<!doctype html>
<html lang="en">
  <head>
    <title></title>
  </head>
  <body>
    <page-content></page-content>
  </body>
</html>`);


class CSSStyleSheet {
  href = '';
  replaceSync() { }
};
class EventSource { }
const localStorage = {
  getItem() { },
  setItem() { },
  removeItem() { }
};
const sessionStorage = {
  getItem() { },
  setItem() { },
  removeItem() { }
};
function getComputedStyle() {
  return {
    getPropertyValue() {},
    setPropertyValue() {}
  };
}
function matchMedia() {
  return { matches: false };
}
function requestAnimationFrame(cb = () => {}) {
  cb();
}
const location = {
  href: '',
  pathname: '/'
};
const history = {
  pushState() { },
  popState() { }
}
const screen = {
  orientation: {
    type: 'landscape-primary',
    addEventListener() {}
  }
}
const visualViewport = {
  width: 400,
  height: 900
};

dom.document.adoptedStyleSheets = [];
dom.document.styleSheets = [];
dom.document.fonts = { ready: Promise.resolve([]) };
dom.window.scrollTo = () => {};

export default function add() {
  global.window = dom.window
  global.HTMLElement = dom.HTMLElement;
  global.document = dom.document;
  global.CSSStyleSheet = CSSStyleSheet;
  global.MutationObserver = dom.MutationObserver;
  global.getComputedStyle = getComputedStyle;
  global.localStorage = localStorage;
  global.sessionStorage = sessionStorage;
  global.matchMedia = matchMedia;
  global.navigator = {
    ...dom.navigator,
    language: 'en-US',
    languages: ['en', 'en-US']
  };
  global.customElements = dom.customElements;
  global.location = location;
  global.EventSource = EventSource;
  global.screen = screen;
  global.visualViewport = visualViewport;
  global.history = history;
  global.requestAnimationFrame = requestAnimationFrame;
}
