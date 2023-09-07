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
  setItem() { }
};
function getComputedStyle() {
  return {};
}
function matchMedia() {
  return { matches: false };
}
function requestAnimationFrame(cb = () => {}) {
  cb();
}
const styleSheets = [];
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

dom.document.adoptedStyleSheets = styleSheets;
dom.document.styleSheets = styleSheets;
dom.document.fonts = { ready: Promise.resolve([]) };

dom.window.scrollTo = () => {};
dom.setTimeout = () => {};

export default function add() {
  global.window = dom.window
  global.HTMLElement = dom.HTMLElement;
  global.document = dom.document;
  global.CSSStyleSheet = CSSStyleSheet;
  global.MutationObserver = dom.MutationObserver;
  global.getComputedStyle = getComputedStyle;
  global.localStorage = localStorage;
  global.matchMedia = matchMedia;
  global.navigator = dom.navigator;
  global.customElements = dom.customElements;
  global.location = location;
  global.EventSource = EventSource;
  global.screen = screen;
  global.visualViewport = visualViewport;
  global.history = history;
  global.requestAnimationFrame = requestAnimationFrame;
}
