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

  #id;
  #root = this;
  #rendered = false;


  constructor() {
    super();

    // unique id build from class string
    this.#id = Array.from(this.constructor.toString()).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
    // convert html string to template literal function
    if (this.constructor.html) this.template = () => new Function('page', `return \`${this.constructor.html}\`;`).call(this, this);
    const hasTemplate = !!this.constructor.html || !this.template.toString().replace(/\n|\s|\;/g, '').includes('template(){return""}');
    // check if html uses template literal expressions. If it does we do not want to globally store a template element
    if (hasTemplate && this.constructor.useTemplate === true) {
      const isDynamic = this.constructor.html || this.template.toString().includes('${');
      if (isDynamic) console.warn('Component template contains dynamic variables. You should set \`static useTemplate = false;\` or the templates may not have correct values');
    }


    /** Render as soon as possible while making sure all class variables exist */
    // render non page component
    if (!this.constructor._isPage && hasTemplate) {
      requestAnimationFrame(() => {
        this.render();
      });

    // hook up page-content for render
    } else {
      const pageContent = document.querySelector('page-content');
      if (!pageContent) throw Error('Could not find <page-content>');
      this.#root = pageContent;
    }
  }

  get searchParameters() {
    return Object.fromEntries([...new URLSearchParams(location.search).entries()]);
  }

  get urlParameters() {
    return location.pathname.match(this.constructor._pagePathRegex)?.groups;
  }

  get rendered() {
    return this.#rendered;
  }

  // override
  connectedCallback() { }
  disconnectedCallback() { }

  /** beforeRender not called on initial render */
  async beforeRender() { }
  async afterRender() { }

  /** Return HTML template string.
   *  ./index.js
   *  new class one extends Page {
   *    template() {
   *       return `<div>${this.var}</div>`;
   *    }
   *  }
   */
  template(){return""}

  /** Escape html to make safe for injection */
  escape(str) {
    return str.replace(/[^\w. ]/gi, function (c) {
      return '&#' + c.charCodeAt(0) + ';';
    });
  };

  async render() {
    if (!this.#rendered) this.#prepareRender();
    this.#rendered = true;

    await this.beforeRender();
    // render every time so template literal expression update
    if (!this.constructor.useTemplate) this.#root.innerHTML = this.template();
    // render from template element
    else this.#root.replaceChildren(templateElements[this.#id].content.cloneNode(true));
    await this.afterRender();
  }

  #prepareRender() {
    if (this.constructor._isPage) {
      const title = document.querySelector('title');
      title.innerText = this.constructor.title;
      return;
    }

    if (this.constructor.useTemplate && !templateElements[this.#id]) {
      templateElements[this.#id] = document.createElement('template');
      templateElements[this.#id].innerHTML = this.template();
    }

    if (this.constructor.useShadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.#root = this.shadowRoot;
    }
  }
}
