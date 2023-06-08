const templateElements = [];

export default class Component extends HTMLElement {
  static title;
  /**
   * Used for imported html
   *   Can use template literals: <div>${this.var}</div>
   */
  static html = '';

  /** if not using shadowRoot templates and rendering still work */
  static useShadowRoot = false;

  /** Use template element to clone from
   *   If your template uses dynamic variables you do not want to use this */
  static useTemplate = true;

  #id = Array.from(this.constructor.toString()).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
  #root = this;
  #rendered = false;
  #templateElement;

  constructor() {
    super();
    if (this.constructor.html) this.template = () => new Function('page', `return \`${this.constructor.html}\`;`).call(this, this);

    if (this.constructor.useTemplate === true) {
      const isDynamic = this.constructor.html || this.template.toString().contains('${');
      if (isDynamic) console.warn('Component template contains dynamic variables. You should set \`static useTemplate = false;\` or the templates may not have correct values');
    }
  }

  get searchParameters() {
    return Object.fromEntries([...new URLSearchParams(locationObject.search).entries()]);
  }

  get urlParameters() {
    return locationObject.pathname.match(this.constructor._pathRegex)?.groups;
  }

  get rendered() {
    return this.#rendered;
  }

  get classId() {
    return this.#id;
  }

  // override
  connectedCallback() { }
  disconnectedCallback() { }

  /** beforeRender not called on initial render */
  async beforeRender() { }
  async afterRender() { }

  /** Return HTML template string.
   *  ./page.js
   *  new class one extends Page {
   *    template() {
   *       return `<div>${this.var}</div>`;
   *    }
   *  }
   */
  template() {
    return /*html*/``;
  }

  /** Escape html to make safe for injection */
  escape(str) {
    return str.replace(/[^\w. ]/gi, function (c) {
      return '&#' + c.charCodeAt(0) + ';';
    });
  };

  async render() {
    if (!this.#rendered) this.#prepareRender();

    await this.beforeRender();
    if (!this.constructor.useTemplate) this.#root.innerHTML = this.template();
    else this.#root.replaceChildren(this.#templateElement.content.cloneNode(true));
    this.#rendered = true;
    await this.afterRender();
  }

  #prepareRender() {
    if (this.constructor._isPage) {
      const pageContent = document.querySelector('page-content');
      if (!pageContent) throw Error('Could not find <page-content>');
      this.#root = pageContent;
      const title = document.querySelector('title');
      title.innerText = this.constructor.title;
      return;
    }

    if (this.constructor.useTemplate) {
      if (!templateElements[this.#id]) {
        templateElements[this.#id] = document.createElement('template');
        templateElements[this.#id].innerHTML = this.template();
      }
      this.#templateElement = templateElements[this.#id];
    }

    if (this.constructor.useShadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.#root = this.shadowRoot;
    }
  }
}
