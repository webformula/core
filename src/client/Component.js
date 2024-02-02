import BindPage from './page-binding.js';
import i18Language from './i18n.js';


const templateElements = [];

/**
 * Component class used for pages and web components
 * @extends HTMLElement
 */
export default class Component extends HTMLElement {
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
  static html = '';

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
    * Store template string in template element
    *   Using this will break dynamic rendering from values that change: <div>${this.var}</div>
    * @type {Boolean}
    */
  static useTemplate = true;

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

  
  #classId;
  #pageBinding;
  #root = this;
  #attributeEvents = {};
  #attributesLookup;
  #prepared;
  #templateElement;
  #translationMatches;
  #templateString;
  #languageChange_bound = this.#languageChange.bind(this);

  constructor() {
    super();

    this.#attributesLookup = Object.fromEntries(this.constructor.observedAttributesExtended);

    if (this.constructor._isPage) {
      const pageContent = document.querySelector('page-content') || document.querySelector('#page-content');
      if (!pageContent) throw Error('Could not find page-content');
      this.#root = pageContent;

      this.#pageBinding = new BindPage(this);
      if (this.#pageBinding) {
        return this.#pageBinding.proxy;
      }
    }
  }

  get rootElement() { return this.#root; }


  /**
   * Method that returns a html template string. This is an alternative to use static html
   *    template() {
   *       return `<div>${this.var}</div>`;
   *    }
   * @name template
   * @function
   * @return {String}
   */
  template() {
    return this.constructor.html;
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

  internalDisconnect() {
    window.removeEventListener('wfclanguagechange', this.#languageChange_bound);
  }

  /** Render Component. This is automatically called for pages */
  render() {
    if (!this.#prepared) this.#prepareRender();
    !this.#pageBinding ? this.beforeRender() : this.beforeRender.call(this.#pageBinding.proxy);
    if (!this.constructor.useTemplate) this.#templateElement.innerHTML = this.template(); // always re-render
    this.#root.replaceChildren(this.#templateElement.content.cloneNode(true));
    if (this.#pageBinding) this.#pageBinding.postRender();
    !this.#pageBinding ? this.afterRender() : this.afterRender.call(this.#pageBinding.proxy);
    if (this.constructor._isPage) window.dispatchEvent(new Event('webformulacorepagerender'));
  }

  /** Translate string. <div>${page.translate('some key string')}</div> */
  translate(key) {
    return i18Language.translate(key);
  }

  /** Escape html. <div>${page.escape('some string')}</div> */
  escape(str) {
    return str.replace(/[^\w. ]/gi, c => '&#' + c.charCodeAt(0) + ';');
  };

  /** @private */
  bindAttrVal(str, id) {
    if (this.#pageBinding) {
      if (!this.#pageBinding.refValues[id]) this.#pageBinding.refValues[id] = {};
      this.#pageBinding.refValues[id].lastValue = this.#pageBinding.refValues[id].value;
      this.#pageBinding.refValues[id].value = str;
      return str;
    }
  }

  #prepareRender() {
    // set on constructor?
    this.#prepared = true;
    
    if (this.#pageBinding?.enabled && !this.#pageBinding?.parsed) {
      this.template = this.#pageBinding.parseTemplate();
      this.#templateString = this.#pageBinding.templateString;
    } else {
      this.#templateString = this.constructor.html || this.template.toString().replace(/^[^`]*/, '').replace(/[^`]*$/, '').slice(1, -1);
      this.template = () => new Function('page', `return \`${this.#templateString}\`;`).call(this, this);
    }

    this.#translationMatches = i18Language.activeSortedMessageKeys.filter(key => {
      const included = this.#templateString.includes(key);
      if (included) this.#templateString.replace(key, '');
      return included;
    });
    if (this.#translationMatches.length > 0) window.addEventListener('wfclanguagechange', this.#languageChange_bound);

    if (this.constructor._isPage) {
      const title = document.querySelector('title');
      title.innerText = this.constructor.pageTitle;
      this.#templateElement = document.createElement('template');
      return;
    }

    if (this.constructor.useTemplate) {
      if (!this.#classId) this.#classId = btoa(this.constructor.toString().replace(/\s/g, ''));
      if (!templateElements[this.#classId]) {
        templateElements[this.#classId] = document.createElement('template');
        templateElements[this.#classId].innerHTML = this.template();
      }
      this.#templateElement = templateElements[this.#classId];
    } else {
      this.#templateElement = document.createElement('template');
    }

    if (this.constructor.useShadowRoot) {
      this.attachShadow({ mode: 'open', delegatesFocus: this.constructor.shadowRootDelegateFocus });
      this.#root = this.shadowRoot;

      if ((Array.isArray(this.constructor.shadowRootStyleSheets) && this.constructor.shadowRootStyleSheets.length > 0) || this.constructor.shadowRootStyleSheets instanceof CSSStyleSheet) {
        this.#root.adoptedStyleSheets = [].concat(this.constructor.shadowRootStyleSheets);
      }
    }
  }

  #languageChange() {
    let translatedTemplate = this.#templateString;
    this.#translationMatches.forEach(key => {
      translatedTemplate = translatedTemplate.replace(key, i18Language.translate(key));
    });
    this.template = () => new Function('$page', `return \`${translatedTemplate}\`;`).call(this, this);
    this.render();
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
