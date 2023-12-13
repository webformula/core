import i18Language from './i18n.js';
import expressionParse from './template-parser.js';
import bindProxy from './component-bind-proxy.js';

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
  #variableReferences = {};
  #templateString;
  #proxy;
  #hasTranslation = false;
  #translationMatches = [];
  #expressionBlocks = [];
  #languageChange_bound = this.#languageChange.bind(this);

  constructor() {
    super();

    this.#buildTemplate();
    this.#buildTemplateFunction();


    /** Render as soon as possible while making sure all class variables exist */
    // render non page component
    if (!this.constructor._isPage && hasTemplate) {
      requestAnimationFrame(() => this.render());

      // hook up page-content for render
    } else {
      const pageContent = document.querySelector('page-content') || document.querySelector('#page-content');
      if (!pageContent) throw Error('Could not find page-content');
      this.#root = pageContent;
    }

    this.#proxy = bindProxy(this, this.#variableReferences);
    if (this.#proxy) return this.#proxy;
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

  get rootElement() {
    return this.#root;
  }

  get expressionBlocks() {
    return this.#expressionBlocks;
  }

  internalDisconnect() {
    if (this.#hasTranslation) {
      window.removeEventListener('wfclanguagechange', this.#languageChange_bound);
    }
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
  template() { return "" }

  /** Escape html to make safe for injection */
  escape(str) {
    return str.replace(/[^\w. ]/gi, c => '&#' + c.charCodeAt(0) + ';');
  };

  translate(key) {
    return i18Language.translate(key);
  }

  async onLoadRender() {
    // the pre rendered page uses en for its language. We need to re render if the browser language is not end
    if (this.#hasTranslation && i18Language.language !== i18Language.browserLanguage) return this.render();
    else this.#captureVariableReferenceAttributes();

    if (!this.#rendered) this.#prepareRender();

    !this.#proxy ? await this.beforeRender() : await this.beforeRender.call(this.#proxy);
    !this.#proxy ? await this.afterRender() : await this.afterRender.call(this.#proxy);

    if (!this.rendered) this.#postRender();
    this.#rendered = true;
  }

  async render() {
    if (!this.#rendered) this.#prepareRender();

    !this.#proxy ? await this.beforeRender() : await this.beforeRender.call(this.#proxy);
    // render every time so template literal expression update
    if (!this.constructor.useTemplate) this.#root.innerHTML = this.template();
    // render from template element
    else this.#root.replaceChildren(templateElements[this.#id].content.cloneNode(true));
    !this.#proxy ? await this.afterRender() : await this.afterRender.call(this.#proxy);

    if (!this.rendered) this.#postRender();
    this.#rendered = true;
    
    window.dispatchEvent(new Event('webformulacorepagerender'));
  }

  #postRender() {
    const nodeIterator = document.createNodeIterator(
      document.body,
      NodeFilter.SHOW_COMMENT,
      (node) => node.data.includes('wfc-exp')
    );

    let currentNode;
    this.#expressionBlocks = [];
    while ((currentNode = nodeIterator.nextNode())) {
      this.#expressionBlocks.push(currentNode);
    }
  }

  #prepareRender() {
    if (this.constructor._isPage) {
      const title = document.querySelector('title');
      title.innerText = this.constructor.title;
      return;
    }

    if (this.constructor.useTemplate) {
      if (!this.#id) this.#id = Array.from(this.constructor.toString()).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
      if (!templateElements[this.#id]) {
        templateElements[this.#id] = document.createElement('template');
        templateElements[this.#id].innerHTML = this.template();
      }
    }

    if (this.constructor.useShadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.#root = this.shadowRoot;
    }
  }

  // convert html string to template literal function
  #buildTemplate() {
    this.#templateString = this.constructor.html || this.template.toString().replace(/^[^`]*/, '').replace(/[^`]*$/, '').slice(1, -1);
    const hasTemplate = !!this.#templateString;
    if (hasTemplate) {
      const parsed = expressionParse(this, this.#templateString);
      this.#templateString = parsed.templateString;
      this.#variableReferences = parsed.variableReferences;
      this.#variableReferences._idRefValue = {};
      this.template = () => new Function('page', `return \`${this.#templateString}\`;`).call(this, this);
      if (this.constructor.useTemplate === true) {
        const isDynamic = (this.constructor.html || this.template.toString()).includes('${');
        if (isDynamic) console.warn('Component template contains dynamic variables. You should set \`static useTemplate = false;\` or the templates may not have correct values');
      }
    }

    if (!this.rendered) {
      // detect if there are any translation matches
      if (i18Language.autoTranslate) {
        let tempTemplate = this.#templateString;
        this.#translationMatches = i18Language.activeSortedMessageKeys.filter(key => {
          const included = tempTemplate.includes(key);
          if (included) tempTemplate.replace(key, '');
          return included;
        });
      }
      if (this.#translationMatches.length > 0 || this.#templateString.includes('.translate(')) {
        this.#hasTranslation = true;
        window.addEventListener('wfclanguagechange', this.#languageChange_bound);
      }
    }
  }

  // replace all the translation matches and re create the template method
  // This will only run if window._webformulaCoreAutoTranslate = true;
  #buildTemplateFunction() {
    if (!i18Language.autoTranslate) return;

    if (this.#hasTranslation) {
      let translatedTemplate = this.#templateString;
      this.#translationMatches.forEach(key => {
        translatedTemplate = translatedTemplate.replace(key, i18Language.translate(key));
      });
      this.template = () => new Function('page', `return \`${translatedTemplate}\`;`).call(this, this);
    }
  }

  #languageChange() {
    this.#buildTemplateFunction();
    this.render();
  }

  #captureVariableReferenceAttributes() {
    Object.values(this.#variableReferences).forEach(items => {
      Array.isArray(items) && items
        .filter(v => v.type === 'attr')
        .forEach(item => item.template());
    });
  }

  bindAttrVal(str, id) {
    if (!this.#variableReferences._idRefValue[id]) this.#variableReferences._idRefValue[id] = {};
    this.#variableReferences._idRefValue[id].lastValue = this.#variableReferences._idRefValue[id].value;
    this.#variableReferences._idRefValue[id].value = str;
    return str;
  }
}
