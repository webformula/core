export class Page {
  static pageTitle;
  /** ['/a', '/a/:id']; */
  static routes = [];
  static templatePath = '';

  #urlParameters;
  #searchParameters;
  #route;

  constructor() { }

  get searchParameters() {
    return this.#searchParameters;
  }

  get urlParameters() {
    return this.#urlParameters;
  }

  get route() {
    return this.#route;
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

  /** For html file is loaded as raw text and uses template liters
   *  ./page.html
   *  <div>${page.var}</div>
   * 
   *  ./page.js
   *  import html from 'page.html`;
   *  new class one extends Page {
   *    template() {
   *       return this.renderTemplateString(html);
   *    }
   *  }
   */
  renderTemplateString(template = '') {
    return new Function('page', `return \`${template}\`;`).call(this, this);
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
    title.innerText = this.pageTitle;

    await this.afterRender();
  }

  // called by router
  _setUrlData(params = {
    urlParameters: {},
    searchParameters: {},
    route: ''
  }) {
    this.#urlParameters = params?.urlParameters || {};
    this.#searchParameters = params?.searchParameters || {};
    this.#route = params?.route;
  }
}
