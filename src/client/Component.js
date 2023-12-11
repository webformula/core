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
            let templateValue;
            try { templateValue = variable.template(); } catch (e) { }

            if (variable.type === 'content') {
              const startBlock = that.#expressionBlocks.find(n => n.data.includes('expression-block-start') && n.data.includes(`wfc-bind-${variable.id}`));
              if (startBlock.parentElement.hasAttribute('wfc-no-binding')) return true;

              const endBlock = that.#expressionBlocks.find(n => n.data.includes('expression-block-end') && n.data.includes(`wfc-bind-${variable.id}`));

              const replaceNodes = [];
              let currentNode = startBlock.nextSibling;
              while (currentNode !== endBlock) {
                replaceNodes.push(currentNode);
                currentNode = currentNode.nextSibling;
              }
              replaceNodes.forEach(n => n.remove());
              const template = document.createElement('template');
              template.innerHTML = templateValue;
              startBlock.parentElement.insertBefore(template.content, endBlock);
            } else if (variable.type === 'attribute') {
              const rootElement = that.#root.querySelector(`[wfc-bind-${variable.id}]`);
              if (rootElement.hasAttribute('wfc-no-binding')) return true;
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

    !this.#proxy ? await this.beforeRender() : await this.beforeRender.call(this.#proxy);
    // render every time so template literal expression update
    if (!this.constructor.useTemplate) this.#root.innerHTML = this.template();
    // render from template element
    else this.#root.replaceChildren(templateElements[this.#id].content.cloneNode(true));
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
      (node) => node.data.includes('expression-block')
    );

    let currentNode;
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
      const parsed = this.#expressionParse(this.#templateString);
      this.#templateString = parsed.templateString;
      this.#variableReferences = parsed.variableReferences;
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

  #expressionParse(templateString) {
    if (window.webformulaCoreBinding === false) return templateString;

    const expressionOpens = [...templateString.matchAll(/(?<!\\)\${/g)].map(v => ['open', v.index]);
    const expressionClose = [...templateString.matchAll(/(?<!\\)}/g)].map(v => ['close', v.index]);
    const expressionTick = [...templateString.matchAll(/(?<!\\)`/g)].map(v => ['tick', v.index]);
    const combined = [...expressionOpens, ...expressionClose, ...expressionTick].sort((a, b) => a[1] - b[1]);
    let opened = false;
    let opens = 0;
    let closes = 0;
    let inTick = false;
    let ticks = 0;

    const expressionIndexes = combined.map(([type, index]) => {
      switch (type) {
        case 'open':
          opens += 1;
          inTick = false;
          if (!opened) {
            opened = true;
            return [type, index];
          }
          return ['open-sub', index];

        case 'close':
          if (!inTick) {
            closes += 1;
            if (closes >= opens) {
              opened = false;
              opens = 0;
              closes = 0;
              ticks = 0;
              return ['close', index];
            } else if (ticks > 0) {
              inTick = true;
              return ['close-sub', index];
            }
            return ['close-tick', index];
          }
          return ['close-tick', index];

        case 'tick':
          if (!inTick) {
            inTick = true;
            ticks += 1;
            return ['tick-open', index];
          } else {
            ticks -= 1;
            inTick = false;
            return ['tick-close', index];
          }
      }
    });

    const grouped = [];
    let last;
    for (let i = 0; i < expressionIndexes.length; i += 1) {
      const type = expressionIndexes[i][0];
      if (type === 'open') {
        grouped.push({
          open: expressionIndexes[i][1],
          variables: []
        });
        last = undefined;
      } else if (type === 'close') {
        grouped[grouped.length - 1].close = expressionIndexes[i][1];
      }

      if (last && ['open', 'open-sub', 'close-sub'].includes(last[0])) {
        [...templateString.substring(last[1], expressionIndexes[i][1]).matchAll(/(?:page\.|this\.)((?:[a-zA-Z0-9_.]+)+)(\(|'|"|\s*={1,3})?/g)]
          .filter(v => !v[2] || v[2].trim() === '==' || v[2].trim() === '===')
          .forEach(v => {
            if (!grouped[grouped.length - 1].variables.includes(v[1])) grouped[grouped.length - 1].variables.push(v[1]);
          });
      }

      last = expressionIndexes[i];
    }

    const variableReferences = {};
    grouped.reverse()
      .filter(({ variables }) => variables.length > 0)
      .forEach(({ open, close, variables }, i) => {
        const templateStr = templateString.slice(open, close + 1);
        const attrMatch = templateString.slice(0, open).match(/\s+(\S+)=\s*\"\s*$/);
        if (!!attrMatch) {
          templateString = `${templateString.slice(0, attrMatch.index)} wfc-bind-${i}${attrMatch[0]}${templateString.slice(open)}`;
        } else {
          templateString = `${templateString.slice(0, close + 1)}<!-- expression-block-end wfc-bind-${i} -->${templateString.slice(close + 1)}`;
          templateString = `${templateString.slice(0, open)}<!-- expression-block-start wfc-bind-${i} -->${templateString.slice(open)}`;
        }

        const variableConfig = {
          id: i,
          type: attrMatch !== null ? 'attribute' : 'content',
          attribute: attrMatch !== null ? attrMatch[1] : undefined,
          template: () => new Function('page', `return \`${templateStr}\`;`).call(this, this)
        };

        // split variable into sub paths for easy lookup
        // one.two = ['one', 'one.two']
        variables.forEach(variable => {
          const modifiedVariable = variable.split('.').join('.');
          const properties = modifiedVariable
            .split('.').slice(1)
            .map(prop => modifiedVariable.slice(0, modifiedVariable.indexOf(prop) - 1)).concat(modifiedVariable);
          properties.forEach(parentProperty => {
            if (!variableReferences[parentProperty]) variableReferences[parentProperty] = [];
            variableReferences[parentProperty].push(variableConfig);
          });
        });
      });

    return {
      variableReferences,
      templateString
    };
  }
}
