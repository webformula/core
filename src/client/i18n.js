const varRegex = /\$\w+/g;
const varReplaceRegex = /\$(\w+)/g;

/** Ia8n language class */
export default new class i18n {
  #cache = false;
  #locale = navigator.language;
  #localeSet;
  #cardinalRules;
  #ordinalRules;
  #localeMessages = {};
  #sortedMessages = [];
  #localizationReferences;
  #localizationVariableReference;
  #languageChange_bound = this.#languageChange.bind(this);

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
    this.localizeDocument(true);
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
    this.#localeMessages[locale] = Object.entries(messages).map(([key, value]) => ({
      key,
      value,
      matcher: new RegExp(`^${key.replace(varRegex, '\\$\\w+')}$`),
      variables: ((typeof value === 'string' ? value : value.message).match(varRegex) || []).map(v => v.replace(/^\$/g, ''))
    }));

    if (this.cache) localStorage.setItem('wfc-locale-messages', JSON.stringify(this.#localeMessages));
    if (locale === this.locale || this.#sortedMessages.length === 0) this.#sortedMessages = this.#getSortedMessages();
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
    if (!match) return key;

    if (element && match.variables.length > 0 && !this.#localizationVariableReference.find(v => v[0] === element)) {
      this.#localizationVariableReference.push([element, match.variables]);
    }

    const isObject = typeof match.value === 'object';
    const parsed = isObject ? this.#parseVariables(match.value.variables, element) : undefined;
    const message = (isObject ? match.value.message : match.value).replace(varReplaceRegex, (_, varname) => {
      if (parsed && varname in parsed) return parsed[varname];
      else if (element && element.hasAttribute(varname)) return element.getAttribute(varname);
      return window.page[varname];
    });

    return message;
  }


  /**
   * Localize entire document. This is called by component render
   * @param {String} key Locale key
   */
  localizeDocument(localeChange = false) {
    if (!localeChange) {
      this.#localizationReferences = [];
      this.#localizationVariableReference = [];
    }

    const elements = [...document.querySelectorAll('[i18n]')];
    for (const element of elements) {
      this.#localizeElement(element);
    }

    const elementAttrs = [...document.querySelectorAll('[i18n-attr]')];
    for (const element of elementAttrs) {
      const attrs = element.getAttribute('i18n-attr').split(',');
      attrs.forEach(name => {
        const text = element.getAttribute(name);
        const key = localeChange ? (this.#localizationReferences.find(v => v[0] === text) || ['', text])[1] : text;
        const message = this.localize(key);
        this.#localizationReferences.push([message, key]);
        element.setAttribute(name, message);
      });
    }
  }

  /** called by page binder to update translations with corresponding variables
   * @private
   */
  bindingVariableChange(varname) {
    this.#localizationVariableReference
      .filter(v => v[1].includes(varname))
      .forEach(v => this.#localizeElement(v[0]));
  }

  #localizeElement(element) {
    const text = element.textContent;
    const key = (this.#localizationReferences.find(v => v[0] === text) || ['', text])[1];
    const message = this.localize(key, element);
    this.#localizationReferences.push([message, key]);
    element.innerText = message;
  }

  #parseVariables(config, element) {
    if (!config) return {};
    
    const sortOrder = Object.entries(config).sort((a, b) => {
      if (typeof a === 'string') return -1;
      else if (typeof a.variable === 'string') return 1;
      return 0;
    });

    const results = {};
    sortOrder.map(item => {
      const varname = item[0];

      const value = config[varname];
      if (typeof value === 'string') {
        results[varname] = value;
        return;
      }

      let referenceVar;
      if (value.variable in results) referenceVar = results[value.variable];
      else if (element && element.hasAttribute(value.variable)) referenceVar = element.getAttribute(value.variable);
      else referenceVar = window.page[value.variable];

      let varValue
      switch (value.type) {
        case 'cardinal':
          const cardinal = this.#cardinalRules.select(parseInt(referenceVar));
          results[varname] = value[cardinal] || value.other;
          break;
        case 'ordinal':
          const ordinal = this.#ordinalRules.select(parseInt(referenceVar));
          results[varname] = value[ordinal] || value.other;
          break;
        case 'date':
          if (!value.formatter) value.formatter = new Intl.DateTimeFormat(this.locale, value.options);
          varValue = element && element.getAttribute(varname);
          if (!varValue) varValue = window.page[varname];
          results[varname] = value.formatter.format(varValue);
          break;
        case 'number':
          if (!value.formatter) value.formatter = new Intl.NumberFormat(this.locale, value.options);
          varValue = element && element.getAttribute(varname);
          if (!varValue) varValue = window.page[varname];
          results[varname] = value.formatter.format(varValue);
          break;

        default:
          if (element) {
            const attr = element.getAttribute(varname);
            if (attr) {
              results[varname] = attr;
              return;
            }
          }

          if (window.page[varname]) {
            results[varname] = window.page[varname];
            return;
          }
      }
    });

    return results;
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
}
