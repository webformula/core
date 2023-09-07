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
  #proxies;


  constructor() {
    super();

    // convert html string to template literal function
    if (this.constructor.html) this.template = () => new Function('page', `return \`${this.tagParse(this.constructor.html)}\`;`).call(this, this);
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
      const pageContent = document.querySelector('page-content') || document.querySelector('#page-content');
      if (!pageContent) throw Error('Could not find page-content');
      this.#root = pageContent;
    }

    const that = this;
    const proxyHandler = {
      get(target, key, receiver) {
        if (key == 'isProxy') return true;

        if (that.#variableReferences[key]) {
          const varValue = target[key];
          if (typeof varValue == 'undefined') return;
          if (!varValue.isProxy && typeof varValue === 'object') {
            const prox = new Proxy(varValue, proxyHandler);
            const routes = [].concat(that.#proxies.get(receiver) || []);
            routes.push(key);
            that.#proxies.set(prox, routes);
            target[key] = prox;
          }
        }

        const value = target[key];
        return (typeof value === 'function') ? value.bind(target) : value;
      },

      set(target, key, value, receiver) {
        target[key] = value;

        const path = [].concat(that.#proxies.get(receiver) || [], key).join('.');
        const variableReference = that.#variableReferences[path];
        if (!variableReference) return;

        for (const variable of variableReference) {
          const element = that.#root.querySelector(`[bind="${variable.index}"]`);
          let templateValue;
          try {
            templateValue = variable.template();
          } catch (e) { }

          if (variable.type === 'content') element.innerText = templateValue;
          else if (variable.type === 'attribute') element.setAttribute(variable.attribute, templateValue);
        }
      }
    };
    this.#proxies = new WeakMap();
    return new Proxy(this, proxyHandler);
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

  tagParse(templateString) {
    const variables = [...templateString.matchAll(/\$\{\s?(?:page|this)\.([^\}\(]*)\}/g)];
    this.#variableReferences = variables.reverse().reduce((acc, item, i) => {
      const property = item[1];
      if (!acc[property]) acc[property] = [];
      const previousString = templateString.slice(0, item.index);
      const contentMatch = previousString.match(/<\s*?([^\s>]+)[^>]*>([^<>]*)?$/);
      if (contentMatch) {
        const newElement = contentMatch[0].replace(contentMatch[1], `${contentMatch[1]} bind="${i}" `);
        const postContentString = templateString.slice(contentMatch.index + contentMatch[0].length - (contentMatch[2] ? contentMatch[2].length : 0));
        const postContentMatch = postContentString.match(/([^<]*)/);
        templateString = templateString.substring(0, contentMatch.index) + newElement + templateString.substring(item.index);
        
        const variable = {
          index: i,
          type: 'content',
          template: () => new Function('page', `return \`${postContentMatch[0]}\`;`).call(this, this)
        };

        const properties = property.split('.').slice(1).map(prop => property.slice(0, property.indexOf(prop) - 1)).concat(property);
        properties.forEach(parentProperty => {
          if (!acc[parentProperty]) acc[parentProperty] = [];
          acc[parentProperty].push(variable);
        });
      }

      const attrMatch = previousString.match(/<\s?[^>]+\s([^=]+)=\s*?\"\s*?$/);
      if (attrMatch) {
        const newElement = attrMatch[0].replace(attrMatch[1], ` bind="${i}" ${attrMatch[1]}`);
        const postAttrString = templateString.slice(attrMatch.index + attrMatch[0].length - (attrMatch[2] ? attrMatch[2].length : 0));
        const postAttrMatch = postAttrString.match(/([^"]*)/);
        templateString = templateString.substring(0, attrMatch.index) + newElement + templateString.substring(item.index);

        const variable = {
          index: i,
          type: 'attribute',
          attribute: attrMatch[1],
          template: () => new Function('page', `return \`${postAttrMatch[0]}\`;`).call(this, this)
        };

        const properties = property.split('.').slice(1).map(prop => property.slice(0, property.indexOf(prop) - 1)).concat(property);
        properties.forEach(parentProperty => {
          if (!acc[parentProperty]) acc[parentProperty] = [];
          acc[parentProperty].push(variable);
        });
      }

      return acc;
    }, {});

    return templateString;
  }
}
