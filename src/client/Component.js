import { i18nLanguage } from '../index.js';
import i18Language from './i18n.js';

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
          if (['render', 'onLoadRender', 'internalDisconnect'].includes(key) && typeof value === 'function') return value.bind(target);
          return value;
        },

        set(target, key, value, receiver) {
          const path = [].concat(proxies.get(receiver) || [], key).join('.');
          const variableReference = that.#variableReferences[path];
          if (!variableReference) return Reflect.set(target, key, value, receiver);
          target[key] = value;

          for (const variable of variableReference) {
            const rootElement = that.#root.querySelector(`[wfc-bind*="'${variable.id}'"]`);
            let templateValue;
            try { templateValue = variable.template(); } catch (e) { }
            if (variable.type === 'content') {
              // remove all nodes between the start and and comments and replace with new render
              const replaceNodes = [];
              let currentNode = rootElement.childNodes[0];
              let startNode;
              let endNode;
              while ((!startNode || !endNode) && currentNode) {
                if (!startNode && currentNode.nodeType === 8 && currentNode.data.includes('expression-block-start')) {
                  startNode = currentNode;
                } else if (currentNode.nodeType === 8 && currentNode.data.includes('expression-block-end')) {
                  endNode = currentNode;
                } else if (startNode) {
                  replaceNodes.push(currentNode);
                }

                currentNode = currentNode.nextSibling;
              }
              replaceNodes.forEach(n => n.remove());
              const template = document.createElement('template');
              template.innerHTML = templateValue;
              rootElement.insertBefore(template.content, endNode);
            } else if (variable.type === 'attribute') {
              if (rootElement.nodeName === 'INPUT' && variable.attribute === 'value') rootElement.value = templateValue;
              rootElement.setAttribute(variable.attribute, templateValue);
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

  internalDisconnect() {
    if (this.#hasTranslation) window.removeEventListener('languagechange', this.#languageChange_bound);
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
    // // the pre rendered page uses en for its language. We need to re render if the browser language is not end
    // if (this.#hasTranslation && i18Language.language !== 'en') return this.render();

    // if (!this.#rendered) this.#prepareRender();
    // this.#rendered = true;

    // !this.#proxy ? await this.beforeRender() : await this.beforeRender.call(this.#proxy);
    // !this.#proxy ? await this.afterRender() : await this.afterRender.call(this.#proxy);

    if (!this.#rendered) this.#prepareRender();
    this.#rendered = true;

    !this.#proxy ? await this.beforeRender() : await this.beforeRender.call(this.#proxy);
    // render every time so template literal expression update
    if (!this.constructor.useTemplate) this.#root.innerHTML = this.template();
    // render from template element
    else this.#root.replaceChildren(templateElements[this.#id].content.cloneNode(true));
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

    window.dispatchEvent(new Event('webformulacorepagerender'));
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


  // // replace first '[^}{]*' with '({([^}{]*})|[^}{])*' to add another depth
  // #expressionsDepth6 = /(?<!\\)\${(({({(({(({(({([^}{]*})|[^}{])*})|[^}{])*})|[^}{])*})|[^}{])*})|[^}{])*}/g;
  // // look for escaped expressions \${} so we do not handle them
  // #invalidExpressionsDepth6 = /\\\${(({({(({(({(({([^}{]*})|[^}{])*})|[^}{])*})|[^}{])*})|[^}{])*})|[^}{])*}/g;
  // // page.someFunc() - we do not want to handle function calls
  // #variableFunctionDepth6 = /(?:page|this)((?:\.[a-zA-Z0-9_)]+)+)\(((\((\(((\(((\(([^\)\()]*\))|[^\)\()])*\))|[^\)\()])*\))|[^\)\()])*\))|[^\)\()])*\)/g;
  // // variables starting with (page or this)
  // // if contains (\(|'|"|\s*=) then we do not want to handle these
  // #variablesRegex = /(?:page|this)((?:\.[a-zA-Z0-9_]+)+)(\(|'|"|\s*={1,3})?/g;
  // #attributeMatch = /\s([^\s]+)=\s*?\"\s*?$/;
  // #contentMatch = /<\s*?([^\s>]+)[^>]*>([^<>]*)?$/;
  #expressionParse(templateString) {
    if (window.webformulaCoreBinding === false) return templateString;

    const variables = [...new Set([...templateString.matchAll(/(?<!\\\${|\/)(?:page\.|this\.)((?:[a-zA-Z0-9_]+)+)(\(|'|"|\s*={1,3})?/g)]
      .filter(v => !v[2] || v[2].trim() === '==' || v[2].trim() === '===')
      .map(v => v[0]))];

    if (variables.length === 0) return templateString;

    if (typeof DOMParser !== 'undefined') {
      const escaped = templateString.replace(/(?<!=\s*"|=\s*"\s*)(\$\{(?:(\{(?:(\{(?:(\{(?:(\{(?:(\{(?:(\{(?:(\{(?:(\{[^}{]*\})|[^}{])*\})|[^}{])*\})|[^}{])*\})|[^}{])*\})|[^}{])*\})|[^}{])*\})|[^}{])*\})|[^}{])*\})/g, function (a) {
        return `<!-- expression-block-start -->${a}<!-- expression-block-end -->`;
      });

      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(escaped, 'text/html');
      let counter = 0;

      // build hash lookup by property for each expression
      // reverse array so the indexes are correct when modifying the templateString
      this.#variableReferences = variables.reverse().reduce((acc, variable) => {
        variable = variable.replace(/=/g, '').trim();
        const variableConfigs = [];

        // const expStr = expression[0].replace(/[.*+?^${}()|[\]\\\`]/g, '\\$&').replace(/<([^>]+)>/g, '@$1@');
        const iterator = htmlDoc.evaluate(`//*[@*[contains(., '${variable}')]]`, htmlDoc, null, XPathResult.ANY_TYPE, null);
        let node;
        let nodes = [];
        const validRegex = new RegExp(`(\\\\)?(\\\${[^\\\${]*[^}]*${variable}[^}]*)+`);
        while (node = iterator.iterateNext()) {
          [...node.attributes].filter(attr => {
            const match = attr.nodeValue.match(validRegex);
            if (match && !match[1]) nodes.push({
              node,
              attr
            });
          });
        }
        nodes.forEach(item => {
          if (!item.node.hasAttribute('wfc-bind')) item.node.setAttribute('wfc-bind', `'${counter}'`);
          else item.node.setAttribute('wfc-bind', `${item.node.getAttribute('wfc-bind')} '${counter}'`);

          variableConfigs.push({
            id: counter,
            type: 'attribute',
            attribute: item.attr.name,
            template: () => new Function('page', `return \`${item.attr.textContent}\`;`).call(this, this)
          });

          counter += 1;
        });

        const iterator2 = htmlDoc.evaluate(`//text()[contains(., "${variable}")]`, htmlDoc, null, XPathResult.ANY_TYPE, null);
        nodes = [];
        while (node = iterator2.iterateNext()) {
          const match = node.wholeText.match(validRegex);
          if (match && !match[1]) nodes.push(node);
        }

        nodes.forEach(n => {
          const parentElement = n.parentElement;
          if (!parentElement.hasAttribute('wfc-bind')) parentElement.setAttribute('wfc-bind', `'${counter}'`);
          else parentElement.setAttribute('wfc-bind', `${parentElement.getAttribute('wfc-bind')} '${counter}'`);

          // TODO get start and end comment blocks then get full replace text
          let startBlock = n.previousSibling;
          while (startBlock && startBlock.nodeType !== 8 && startBlock.data !== 'expression-block-start') {
            startBlock = startBlock.previousSibling;
          }

          let endBlock = n.nextSibling;
          while (endBlock && endBlock.nodeType !== 8 && endBlock.data !== 'expression-block-end') {
            endBlock = endBlock.nextSibling;
          }

          let txt = '';
          let txtBlock = startBlock.nextSibling;
          while (txtBlock !== endBlock) {
            txt += txtBlock.wholeText || txtBlock.outerHTML;
            txtBlock = txtBlock.nextSibling;
          }

          parentElement.replaceChild(document.createComment(`${startBlock.data} wfc-bind-${counter}`), startBlock);
          parentElement.replaceChild(document.createComment(`${endBlock.data} wfc-bind-${counter}`), endBlock);
          variableConfigs.push({
            id: counter,
            type: 'content',
            template: () => new Function('page', `return \`${txt}\`;`).call(this, this)
          });

          counter += 1;
        });

        const modifiedVariable = variable.split('.').slice(1).join('.');
        const properties = modifiedVariable
          .split('.')
          .slice(1)
          .map(prop => modifiedVariable.slice(0, modifiedVariable.indexOf(prop) - 1)).concat(modifiedVariable);
        properties.forEach(parentProperty => {
          if (!acc[parentProperty]) acc[parentProperty] = [];
          acc[parentProperty].push(...variableConfigs);
        });

        return acc;
      }, {});

      templateString = htmlDoc.body.innerHTML;
    }

    return templateString;
  }

  // convert html string to template literal function
  #buildTemplate() {
    this.#templateString = this.constructor.html || this.template.toString().replace(/^[^`]*/, '').replace(/[^`]*$/, '').slice(1, -1);
    const hasTemplate = !!this.#templateString;
    if (hasTemplate) {
      this.#templateString = this.#expressionParse(this.#templateString);
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
        window.addEventListener('languagechange', this.#languageChange_bound);
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
}
