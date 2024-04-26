import { html, watchSignals, destroySignalCache } from './html.js';


/**
 * Component class used for pages and web components
 * @extends HTMLElement
 */
export default class Component extends HTMLElement {
  static _html = html;
  /**
    * Page title
    * @type {String}
    */
  static pageTitle;

  /**
    * Pass in HTML string. Use for imported .HTML
    *   Supports template literals: <div>${this.var}</div>
    * @type {String}
    */
  static htmlTemplate = '';

  /**
    * Pass in styles for shadow root.
    *   Can use imported stylesheets: import styles from '../styles.css' assert { type: 'css' };
    * @type {CSSStyleSheet}
    */
  static shadowRootStyleSheets;

  /**
    * Hook up shadow root
    * @type {Boolean}
    */
  static useShadowRoot = false;

  /**
    * @type {Boolean}
    */
  static shadowRootDelegateFocus = false;

  /**
  * @typedef {String} AttributeType
  * @value '' default handling
  * @value 'string' Convert to a string. null = ''
  * @value 'number' Convert to a number. isNaN = ''
  * @value 'int' Convert to a int. isNaN = ''
  * @value 'boolean' Convert to a boolean. null = false
  * @value 'event' Allows code to be executed. Similar to onchange="console.log('test')"
  */
  /**
  * Enhances observedAttributes, allowing you to specify types
  * @type {Array.<[name:String, AttributeType]>}
  */
  static get observedAttributesExtended() { return []; };
  static get observedAttributes() { return this.observedAttributesExtended.map(a => a[0]); }

  /**
    * Use with observedAttributesExtended
    *   This automatically handles type conversions and duplicate calls from setting attributes
    * @name observedAttributesExtended
    * @function
    */
  // static get observedAttributesExtended() { }

  
  #root = this;
  #attributeEvents = {};
  #attributesLookup;
  #prepared;

  constructor() {
    super();

    this.#attributesLookup = Object.fromEntries(this.constructor.observedAttributesExtended);

    if (this.constructor._isPage) {
      const pageContent = document.querySelector('page-content') || document.querySelector('#page-content');
      if (!pageContent) throw Error('Could not find page-content');
      this.#root = pageContent;
    }

    if (this.constructor.useShadowRoot) {
      this.attachShadow({ mode: 'open', delegatesFocus: this.constructor.shadowRootDelegateFocus });
      this.#root = this.shadowRoot;

      if (this.constructor.shadowRootStyleSheets instanceof CSSStyleSheet || this.constructor.shadowRootStyleSheets[0] instanceof CSSStyleSheet) {
        this.shadowRoot.adoptedStyleSheets.push(...[].concat(this.constructor.shadowRootStyleSheets));
      }
    }
  }

  get rootElement() { return this.#root; }


  /**
   * Method that returns a html template string. This is an alternative to use static htmlTemplate
   *    template() {
   *       return `<div>${this.var}</div>`;
   *    }
   * @name template
   * @function
   * @return {String}
   */
  template() {
    return this.constructor.htmlTemplate;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    const type = this.#attributesLookup[name];
    name = name.replace(dashCaseRegex, (_, s) => s.toUpperCase());
    if (type === 'event') {
      if (this.#attributeEvents[name]) {
        this.removeEventListener(name.replace(/^on/, ''), this.#attributeEvents[name]);
        this.#attributeEvents[name] = undefined;
      }
      if (newValue) {
        this.#attributeEvents[name] = this.#attributeDescriptorTypeConverter(newValue, type);
        this.addEventListener(name.replace(/^on/, ''), this.#attributeEvents[name]);
      }
    } else {
      this.attributeChangedCallbackExtended(
        name,
        this.#attributeDescriptorTypeConverter(oldValue, type),
        this.#attributeDescriptorTypeConverter(newValue, type)
      );
    }
  }

  /**
   * Use with observedAttributesExtended
   * @function
   * @param {String} name - Attribute name
   * @param {String} oldValue - Old attribute value
   * @param {String} newValue - New attribute value
   */
  attributeChangedCallbackExtended(name, oldValue, newValue) { }


  connectedCallback() {}
  disconnectedCallback() {}

  /** Called before render */
  beforeRender() {}

  /** Called after render */
  afterRender() {}

  /** Render Component. This is automatically called for pages */
  render() {
    if (!this.#prepared) this.#prepareRender();

    if (!this.constructor._isBuild) {
      this.beforeRender();
      destroySignalCache();
    }

    const parsed = this.template();
    this.#root.replaceChildren(parsed);

    if (!this.constructor._isBuild) {
      watchSignals();
      this.afterRender();
    }
    if (this.constructor._isPage) window.dispatchEvent(new CustomEvent('webformulacorepagerender'));
  }

  /** Escape html. <div>${page.escape('some string')}</div> */
  escape(str) {
    return str.replace(/[^\w. ]/gi, c => '&#' + c.charCodeAt(0) + ';');
  };

  /** @private */
  _internalDisconnectedCallback() {
    destroySignalCache();
  }


  #prepareRender() {
    this.#prepared = true;

    const templateString = this.constructor.htmlTemplate || this.template.toString().replace(/^[^`]*/, '').replace(/[^`]*$/, '').slice(1, -1);
    this.template = () => new Function('page', `return page.constructor._html\`${templateString}\`;`).call(this, this);

    if (this.constructor._isPage) {
      const title = document.documentElement.querySelector('title');
      title.textContent = this.constructor.pageTitle;
      return;
    }
  }

  #attributeDescriptorTypeConverter(value, type) {
    switch (type) {
      case 'boolean':
        return value !== null && `${value}` !== 'false';
      case 'int':
        const int = parseInt(value);
        return isNaN(int) ? '' : int;
      case 'number':
        const num = parseFloat(value);
        return isNaN(num) ? '' : num;
      case 'string':
        return value || '';
      case 'event':
        return !value ? null : () => new Function('page', value).call(this, window.page);
        break;
      default:
        return value;
    }
  }
}
