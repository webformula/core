const templateElements = {};

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


  constructor() {
    super();
    // convert html string to template literal function
    if (this.constructor.html) this.#templateString = this.constructor.html;
    else this.#templateString = this.template.toString().replace(/^[^`]*/, '').replace(/[^`]*$/, '').slice(1, -1);
    const templateString = this.#expressionParse(this.#templateString);
    this.template = () => new Function('page', `return \`${templateString}\`;`).call(this, this);
    const hasTemplate = !!this.constructor.html || !this.template.toString().replace(/\n|\s|\;/g, '').includes('template(){return""}');
    // check if html uses template literal expressions. If it does we do not want to globally store a template element
    if (hasTemplate && this.constructor.useTemplate === true) {
      const isDynamic = this.constructor.html || this.template.toString().includes('${');
      if (isDynamic) console.warn('Component template contains dynamic variables. You should set \`static useTemplate = false;\` or the templates may not have correct values');
    }


    /** Render as soon as possible while making sure all class variables exist */
    // render non page component
    if (!this.constructor._isPage && hasTemplate && !this.shadowRoot) {
      requestAnimationFrame(() => this.render());

    // hook up page-content for render
    } else {
      const pageContent = document.querySelector('page-content') || document.querySelector('#page-content');
      if (!pageContent) throw Error('Could not find page-content');
      this.#root = pageContent;
    }

    // proxy entire class so we can handle variable binding
    if (Object.keys(this.#variableReferences).length > 0) {
      const proxies = new WeakMap();
      const that = this;
      const proxyHandler = {
        get(target, key, receiver) {
          if (key == 'isProxy') return true;

          // create sub proxy for nested paths: this.one.two
          if (that.#variableReferences[key]) {
            const varValue = target[key];
            if (typeof varValue == 'undefined') return;
            if (!varValue.isProxy && typeof varValue === 'object') {
              const prox = new Proxy(varValue, proxyHandler);
              const routes = [].concat(proxies.get(receiver) || [], key);
              proxies.set(prox, routes);
              target[key] = prox;
            }
          }

          const value = target[key];
          // bind render to original class object so it has access to private variables;
          if (['render','onLoadRender'].includes(key) && typeof value === 'function') return value.bind(target);
          return value;
        },

        set(target, key, value, receiver) {
          const path = [].concat(proxies.get(receiver) || [], key).join('.');
          const variableReference = that.#variableReferences[path];
          if (!variableReference) return Reflect.set(target, key, value, receiver);
          target[key] = value;

          for (const variable of variableReference) {
            const element = that.#root.querySelector(`[wfc-bind="${variable.id}"]`);
            let templateValue;
            try { templateValue = variable.template(); } catch (e) { }
            if (variable.type === 'content') element.innerText = templateValue;
            else if (variable.type === 'attribute') {
              if (element.nodeName === 'INPUT' && variable.attribute === 'value') element.value = templateValue;
              element.setAttribute(variable.attribute, templateValue);
            }
          }
          return true;
        }
      };
      this.#proxy = new Proxy(this, proxyHandler);
      return this.#proxy
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
    return str.replace(/[^\w. ]/gi, c => '&#' + c.charCodeAt(0) + ';');
  };

  async onLoadRender() {
    if (!this.#rendered) this.#prepareRender();
    this.#rendered = true;

    !this.#proxy ? await this.beforeRender() : await this.beforeRender.call(this.#proxy);
    !this.#proxy ? await this.afterRender() : await this.afterRender.call(this.#proxy);
  }

  async render() {
    if (!this.#rendered) this.#prepareRender();
    this.#rendered = true;

    !this.#proxy ? await this.beforeRender() : await this.beforeRender.call(this.#proxy);
    // render every time so template literal expression update
    if (!this.constructor.useTemplate) this.#root.innerHTML = this.template();
    // render from template element
    else this.#root.replaceChildren(templateElements[this.#id].content.cloneNode(true));
    !this.#proxy ? await this.afterRender() : await this.afterRender.call(this.#proxy);
  }

  #prepareRender() {
    if (this.constructor._isPage) {
      const title = document.querySelector('title');
      if (!window._webformulaBuild) title.innerText = this.constructor.title;
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


  // replace first '[^}{]*' with '({([^}{]*})|[^}{])*' to add another depth
  #expressionsDepth6 = /(?<!\\)\${(({({(({(({(({([^}{]*})|[^}{])*})|[^}{])*})|[^}{])*})|[^}{])*})|[^}{])*}/g;
  // look for escaped expressions \${} so we do not handle them
  #invalidExpressionsDepth6 = /\\\${(({({(({(({(({([^}{]*})|[^}{])*})|[^}{])*})|[^}{])*})|[^}{])*})|[^}{])*}/g;
  // page.someFunc() - we do not want to handle function calls
  #variableFunctionDepth6 = /(?:page|this)((?:\.[a-zA-Z0-9_)]+)+)\(((\((\(((\(((\(([^\)\()]*\))|[^\)\()])*\))|[^\)\()])*\))|[^\)\()])*\))|[^\)\()])*\)/g;
  // variables starting with (page or this)
  // if contains (\(|'|"|\s*=) then we do not want to handle these
  #variablesRegex = /(?:page|this)((?:\.[a-zA-Z0-9_]+)+)(\(|'|"|\s*=)?/g;
  #attributeMatch = /\s([^\s]+)=\s*?\"\s*?$/;
  #contentMatch = /<\s*?([^\s>]+)[^>]*>([^<>]*)?$/;
  #expressionParse(templateString) {
    if (window.webformulaCoreBinding === false) return templateString;

    const variableExpressions = [...templateString.matchAll(this.#expressionsDepth6)].map(expression => {
      const subInvalidExpressions = Object.values(expression[0].match(this.#invalidExpressionsDepth6) || {});
      // strip out invalid expressions and functions so we can capture all valid variables
      const topLevelString = subInvalidExpressions.reduce((acc, sub) => acc.replace(sub, ''), expression[0]).replace(this.#variableFunctionDepth6, '');
      const variables = [...topLevelString.matchAll(this.#variablesRegex)].filter(v => !v[2]).map(v => v[1].replace(/^\./, ''));
      return {
        expression,
        variables
      };
    }).filter(v => v.variables.length > 0);
    
    // build hash lookup by property for each expression
    // reverse array so the indexes are correct when modifying the templateString
    this.#variableReferences = variableExpressions.reverse().reduce((acc, { expression, variables }, id) => {
      const previousString = templateString.slice(0, expression.index);

      // expression is in the content of an element: <div>${this.var}</div>
      const contentMatch = previousString.match(this.#contentMatch);
      if (contentMatch) {
        if (contentMatch[0].includes('wfc-no-binding')) return acc;

        // add wfc-bind attribute for reference
        const newElement = contentMatch[0].replace(contentMatch[1], `${contentMatch[1]} wfc-bind="${id}" `);
        const postContentString = templateString.slice(contentMatch.index + contentMatch[0].length - (contentMatch[2] ? contentMatch[2].length : 0));
        const postContentMatch = postContentString.match(/([^<]*)/);
        templateString = templateString.substring(0, contentMatch.index) + newElement + templateString.substring(expression.index);

        const variableConfig = {
          id,
          type: 'content',
          // sub template method for specific expression
          template: () => new Function('page', `return \`${postContentMatch[0]}\`;`).call(this, this)
        };

        // build object for each level of path: this.one.two -> [one.two, two]
        // This is needed because proxies only provide the property being changed
        variables.forEach(variable => {
          const properties = variable.split('.').slice(1).map(prop => variable.slice(0, variable.indexOf(prop) - 1)).concat(variable);
          properties.forEach(parentProperty => {
            if (!acc[parentProperty]) acc[parentProperty] = [];
            acc[parentProperty].push(variableConfig);
          });
        });
      } else {
        // expression is in the attribute of an element: <input value="${this.var}">
        const attrMatch = previousString.match(this.#attributeMatch);
        if (attrMatch) {
          // add wfc-bind attribute for reference
          const newElement = attrMatch[0].replace(attrMatch[1], ` wfc-bind="${id}" ${attrMatch[1]}`);
          const postAttrString = templateString.slice(attrMatch.index + attrMatch[0].length - (attrMatch[2] ? attrMatch[2].length : 0));
          const postAttrMatch = postAttrString.match(/([^"]*)/);
          templateString = templateString.substring(0, attrMatch.index) + newElement + templateString.substring(expression.index);

          const variableConfig = {
            id,
            type: 'attribute',
            attribute: attrMatch[1],
            // sub template method for specific expression
            template: () => new Function('page', `return \`${postAttrMatch[0]}\`;`).call(this, this)
          };

          // build object for each level of path: this.one.two -> [one.two, two]
          // This is needed because proxies only provide the property being changed
          variables.forEach(variable => {
            const properties = variable.split('.').slice(1).map(prop => variable.slice(0, variable.indexOf(prop) - 1)).concat(variable);
            properties.forEach(parentProperty => {
              if (!acc[parentProperty]) acc[parentProperty] = [];
              acc[parentProperty].push(variableConfig);
            });
          });
        }
      }

      return acc;
    }, {});

    return templateString;
  }
}
