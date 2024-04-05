const varRegex = /(?!{|\()\w+(?=\)|})/g;
const typeRegex = /(?!{)\w+(?=\()/g;

/** Ia8n language class */
export default new class i18n {
  #cache = false;
  #locale = navigator.language;
  #localeSet;
  #cardinalRules;
  #ordinalRules;
  #localeMessages = {};
  #sortedMessages = [];
  #types = {};
  #localeTypes = {};
  #localizedRef = [];
  #mutationObserver;
  #observerConnected;
  #languageChange_bound = this.#languageChange.bind(this);
  #observeHandler_bound = this.#observeHandler.bind(this);

  constructor() {
    this.locale = navigator.language;
    window.addEventListener('languagechange', this.#languageChange_bound);
  }

  /**
   * Get locale
   * @returns {String} locale
   */
  get locale() { return this.#locale; }

  /**
   * Set locale. Example: en-US
   * @param {String} value locale
   */
  set locale(value) {
    const change = value !== this.#locale;
    this.#locale = this.#cleanLocale(value);
    this.#cardinalRules = new Intl.PluralRules(this.#locale);
    this.#ordinalRules = new Intl.PluralRules(this.#locale, { type: 'ordinal' });
    if (!change) return;

    this.#localeSet = true;
    this.#sortedMessages = this.#getSortedMessages();
    this.#localeTypes = this.#types[this.#locale] || this.#types[this.#locale.split('-')[0]];
    this.localizeDocument();
    window.dispatchEvent(new Event('wfclanguagechange'));
    if (this.cache) localStorage.setItem('wfc-locale', this.#locale);
  }

  /**
   * Get is cache enabled
   * @returns {Boolean} Is cache enabled
   */
  get cache() { return this.#cache; }
  set cache(value) {
    if (!!value) {
      if (this.#localeSet) {
        localStorage.setItem('wfc-locale', this.locale);
        if (Object.keys(this.#localeMessages).length > 0) localStorage.setItem('wfc-locale-messages', JSON.stringify(this.#localeMessages));
      } else {
        const locale = localStorage.getItem('wfc-locale');
        if (locale) this.local = locale;
      }

      // pull local messages from cache if they do not exist already
      if (Object.keys(this.#localeMessages).length === 0) {
        try {
          const messages = JSON.parse(localStorage.getItem('wfc-locale-messages') || '{}');
          Object.entries(messages).forEach(item => this.loadMessages(...item));
        } catch { }
      }
    } else {
      localStorage.removeItem('wfc-locale');
      localStorage.removeItem('wfc-locale-messages');
    }

    // set after so we do not duplicate interactions with localStorage from this.local or this.loadMessages
    this.#cache = !!value;
  }



  /**
   * Set locale messages
   * @param {String} locale Locale
   * @param {Object} messages Locale messages
   */
  loadMessages(locale, messages) {
    locale = this.#cleanLocale(locale);
    if (typeof messages !== 'object' || messages === null) throw Error('messages must be an object');
    this.#localeMessages[locale] = Object.entries(messages).map(([key, value]) => {
      if (key === 'types') {
        this.#types[locale] = this.#parseTypes(value);
        return;
      }

      const variables = value.match(varRegex) || [];
      const types = value.match(typeRegex) || [];

      return {
        key,
        value,
        variables,
        types,
        template: new Function(...[...variables, ...types], `return \`${value}\`;`)
      };
    }).filter(v => !!v);

    if (this.cache) localStorage.setItem('wfc-locale-messages', JSON.stringify(this.#localeMessages));
    if (locale === this.locale || this.#sortedMessages.length === 0) {
      this.#sortedMessages = this.#getSortedMessages();
      this.#localeTypes = this.#types[this.#locale] || this.#types[this.#locale.split('-')[0]];
    }
  }

  /**
   * Localize key
   * @param {String} key Locale key
   */
  localize(key, element) {
    if (this.#sortedMessages.length === 0) return key;

    // try matching exact key then use loose regex
    const match = (
      this.#sortedMessages.find(({ key: itemKey }) => itemKey === key)
      || this.#sortedMessages.forEach(({ matcher }) => key.match(matcher))
    );
    if (!match) {
      console.warn(`Cannot localize. Missing key: ${key}`);
      return key;
    }

    if (element && !this.#localizedRef.find(v => v[0] === element)) {
      this.#localizedRef.push([element, match]);
    }

    const variables = match.variables.map(key => {
      if (element && element.hasAttribute(key)) return element.getAttribute(key);
      let val = window.page[key];
      if (val !== undefined && val !== null && val.constructor.name === 'Signal') val = val.i18nValue;
      return val;
    });
    const methods = match.types.map(key => this.#localeTypes[key].method);

    return match.template.call(null, ...[...variables, ...methods]);
  }


  /**
   * Localize entire document. This is called by component render
   * @param {String} key Locale key
   */
  localizeDocument() {
    const elements = [...document.querySelectorAll('[i18n]')];

    if (!this.#observerConnected && elements.length > 0) {
      if (!this.#mutationObserver) this.#mutationObserver = new MutationObserver(this.#observeHandler_bound);
      if (!this.#observerConnected) {
        this.#mutationObserver.observe(document.body, { subtree: true, childList: true });
        this.#observerConnected = true;
      }
    }

    for (const element of elements) {
      this.#localizeElement(element);
    }

    const elementAttrs = [...document.querySelectorAll('[i18n-attr]')];
    for (const element of elementAttrs) {
      const attrs = element.getAttribute('i18n-attr').split(',');
      attrs.forEach(name => {
        const elementMatch = this.#localizedRef.find(v => v[0] === element);
        const key = elementMatch ? elementMatch[1].key : element.getAttribute(name);
        const message = this.localize(key, element);
        element.setAttribute(name, message);
      });
    }
  }

  #observeHandler(mutationList) {
    for (let mutationRecord of mutationList) {
      if (mutationRecord.removedNodes) {
        for (let removedNode of mutationRecord.removedNodes) {
          this.#localizedRef = this.#localizedRef.filter(v => !(v[0] === removedNode || removedNode.contains(v[0])));
        }
      }
    }
    if (this.#localizedRef.length === 0 && this.#observerConnected) {
      this.#mutationObserver.disconnect();
      this.#observerConnected = false;
    }
  }

  #localizeElement(element) {
    const elementMatch = this.#localizedRef.find(v => v[0] === element);
    const key = elementMatch ? elementMatch[1].key : element.textContent;
    const message = this.localize(key, element);
    element.innerText = message;
  }

  #parseTypes(types) {
    Object.entries(types).forEach(([key, value]) => {
      switch (value.type) {
        case 'cardinal':
          value.method = data => {
            const cardinal = this.#cardinalRules.select(parseInt(data));
            return value[cardinal] || value.other;
          };
          break;
        case 'ordinal':
          value.method = data => {
            const ordinal = this.#ordinalRules.select(parseInt(data));
            return value[ordinal] || value.other;
          };
          break;
        case 'date':
          value.method = data => {
            return this.#getDateFormatter(this.locale, value.options).format(data);
          };
          break;
        case 'number':
          value.method = data => {
            return this.#getNumberFormatter(this.locale, value.options).format(data);
          };
          break;
        case 'relativeTime':
          value.method = data => {
            return this.#getRelativeTimeFormatter(this.locale, value.options).format(data, value.unit);
          };
          break;

        default:
          value.method = data => data;
      }
    });
    return types;
  }

  #getSortedMessages() {
    return (
      this.#localeMessages[this.locale]
      || this.#localeMessages[this.locale.split('-')[0]]
    ).sort((a, b) => b.key.length - a.key.length);
  }

  #cleanLocale(locale) {
    if (!locale) throw Error('locale required');
    locale = Intl.getCanonicalLocales(locale)[0];
    return locale;
  }

  #languageChange() {
    const locale = navigator.language;
    if (locale === this.locale) return;
    this.locale = locale;
    window.dispatchEvent(new Event('wfclanguagechange'));
  }

  #dateFormatters = [];
  #getDateFormatter(locale, options) {
    const key = `${locale}${JSON.stringify(options || '')}`;
    if (!this.#dateFormatters[key])  this.#dateFormatters[key] = new Intl.DateTimeFormat(locale, options);
    return this.#dateFormatters[key];
  }

  #numberFormatters = [];
  #getNumberFormatter(locale, options) {
    const key = `${locale}${JSON.stringify(options || '')}`;
    if (!this.#numberFormatters[key]) this.#numberFormatters[key] = new Intl.NumberFormat(locale, options);
    return this.#numberFormatters[key];
  }

  #relativeTimeFormatters = [];
  #getRelativeTimeFormatter(locale, options) {
    const key = `${locale}${JSON.stringify(options || '')}`;
    if (!this.#relativeTimeFormatters[key]) this.#relativeTimeFormatters[key] = new Intl.RelativeTimeFormat(locale, options);
    return this.#relativeTimeFormatters[key];
  }
}
