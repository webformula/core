class HTMLElement {
  get classList() {
    return {
      add() { },
      contains() { },
      toggle() { },
      remove() { }
    }
  }
  get parentElement() {
    return new HTMLElement();
  }
  querySelector() {
    return new HTMLElement();
  }
  querySelectorAll() {
    return [new HTMLElement()];
  }
  insertAdjacentElement() { }
  addEventListener() { }
  removeEventListener() { }
  dispatchEvent() { }
}
class Text {
  data = '';
}
class CSSStyleSheet {
  href = '';
  replaceSync() { }
};
class MutationObserver {
  observe() { }
}
class EventSource { }
const localStorage = {
  getItem() { },
  setItem() { }
};
const navigator = {};
function getComputedStyle() {
  return {};
}
function matchMedia() {
  return { matches: false };
}
const styleSheets = [];
const location = {
  href: '',
  pathname: '/'
};
const customElements = {
  define() { },
  get() { }
};
const history = {
  pushState() { },
  popState() { }
}
const document = {
  location,
  body: new HTMLElement(),
  documentElement: new HTMLElement(),
  createTextNode() {
    return new Text();
  },
  createElement() {
    return new HTMLElement();
  },
  addEventListener() { },
  removeEventListener() { },
  querySelector() {
    return new HTMLElement();
  },
  querySelectorAll() {
    return [new HTMLElement()];
  },
  adoptedStyleSheets: styleSheets,
  styleSheets,
  fonts: {
    ready: Promise.resolve([])
  }
};
const window = {
  document,
  location,
  CSSStyleSheet,
  MutationObserver,
  getComputedStyle,
  localStorage,
  matchMedia,
  navigator,
  customElements,
  history,
  EventSource,
  dispatchEvent() { },
  addEventListener() { },
  removeEventListener() { },
  querySelector() {
    return new HTMLElement();
  },
  querySelectorAll() {
    return [new HTMLElement()];
  }
}

export default function add() {
  global.window = window
  global.HTMLElement = HTMLElement;
  global.document = document;
  global.CSSStyleSheet = CSSStyleSheet;
  global.MutationObserver = MutationObserver;
  global.getComputedStyle = getComputedStyle;
  global.localStorage = localStorage;
  global.matchMedia = matchMedia;
  global.navigator = navigator;
  global.customElements = customElements;
  global.location = location;
  global.EventSource = EventSource;
}
