export default class Page {
  static title;
  /**
   * Used for imported html
   *   Can use template literals: <div>${this.var}</div>
   */
  static html = '';

  #urlParameters;
  #searchParameters;

  constructor() {
    if (this.constructor.html) this.template = () => new Function('page', `return \`${this.constructor.html}\`;`).call(this, this);
  }

  get searchParameters() {
    return this.#searchParameters;
  }

  get urlParameters() {
    return this.#urlParameters;
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
    const pageContent = document.querySelector('page-content');
    if (!pageContent) throw Error('Could not find <page-content>');

    await this.beforeRender();

    // TODO replace with setHTML when supported. https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTML
    pageContent.innerHTML = this.template.call(this, this);

    const title = document.querySelector('title');
    title.innerText = this.constructor.title;

    await this.afterRender();
  }

  // called by router
  _setUrlData(params = {
    urlParameters: {},
    searchParameters: {}
  }) {
    this.#urlParameters = params?.urlParameters || {};
    this.#searchParameters = params?.searchParameters || {};
  }
}
