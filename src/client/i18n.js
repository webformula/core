/** Ia8n language class */
export default new class I18nLanguage {
  #language;
  #cache = false;
  #messages = {};
  #messagesRegex = {};
  #autoTranslate = false;
  #languageChange_bound = this.#languageChange.bind(this);

  constructor() {
    this.#language = this.browserLanguage;
    window.addEventListener('languagechange', this.#languageChange_bound);
  }


  /**
   * Get the language locale
   * @returns {String} Language locale
   */
  get language() { return this.#language; }
  get #languageShort() { return this.#language.split('-')[0]; }
  /**
   * Set the language locale. Example: en-US
   * @param {String} value locale
   */
  set language(value) {
    if (value === this.#language) return;

    this.#language = value;
    if (this.cache) localStorage.setItem('wfc-user-language', this.#language);
    else localStorage.removeItem('wfc-user-language');

    window.wfcLanguage = this.#language;
    window.dispatchEvent(new Event('wfclanguagechange'));
  }

  /**
   * Get browser language locale
   * @returns {String} Language locale
   */
  get browserLanguage() { return navigator.language; }

  /**
   * Get translation messages
   * @returns {Object[]} Translation messages
   */
  get messages() { return this.#messages; }
  /**
   * Set translation messages
   * @param {Object[]} value Translation messages
   */
  set messages(value) {
    if (!value || typeof value !== 'object') throw Error('messages must be an object');
    this.#messages = value;
    
    // build template string replaces
    // Example: 'keep this $var in place and this $var': 'keep this $var in place and this $var'
    Object.entries(value).forEach(([language, keys]) => {
      this.#messagesRegex[language] = [];
      Object.entries(keys).forEach(([key, value]) => {
        const hasVar = value.includes('$var');
        const varRegexString = hasVar ? (key.replace(/\$var/g, '([^]+)')) : undefined;
        this.#messagesRegex[language].push({
          key,
          value,
          nodeMatcher: new RegExp(`(?<!page\\.translate\\(['|"|\`])${varRegexString || key}`),
          varMatcher: hasVar ? new RegExp(varRegexString) : undefined
        });
      });
    });
  }

  /**
   * Get sorted translation messages. Sorting will prevent partial replacements
   * @returns {Object[]} Sorted translation messages
   */
  get activeSortedMessageKeys() {
    return Object.keys(this.#messages[this.language] || this.#messages[this.#languageShort] || []).sort((a, b) => b[0].length - a[0].length);
  }

  /**
   * Get is auto translated
   * @returns {Boolean} Is auto translated
   */
  get autoTranslate() { return this.#autoTranslate; }
  set autoTranslate(value) {
    this.#autoTranslate = !!value;
  }

  /**
   * Get is cache enabled
   * @returns {Boolean} Is cache enabled
   */
  get cache() { return this.#cache; }
  set cache(value) {
    this.#cache = !!value;
    if (this.#cache && localStorage.getItem('wfc-user-language')) this.#language = localStorage.getItem('wfc-user-language');
    else localStorage.removeItem('wfc-user-language');
  }

  /**
   * Boolean stating if translations are needed based on messages existing
   * @returns {Boolean} Is translation needed
   */
  shouldTranslate() {
    if (!this.#messages) return false;
    if (this.#language === this.browserLanguage) return false;
    return true;
  }
  
  /**
   * TRanslate string
   * @param {String} key Translation key
   */
  matchKeyFromNode(key) {
    const messages = this.#messagesRegex[this.language] || this.#messagesRegex[this.#languageShort] || {};
    return !!messages.find(item => key.match(item.nodeMatcher) !== null);
  }

  /**
   * TRanslate string
   * @param {String} key Translation key
   */
  translate(key) {
    const messages = this.#messagesRegex[this.language] || this.#messagesRegex[this.#languageShort] || {};
    const found = messages.find(item => {
      if (key === item.key) return true;
      if (item.varMatcher && key.match(item.varMatcher)) return true;
      return false;
    });

    let message = found.value;
    if (found.varMatcher) {
      const replacements = key.match(found.varMatcher);
      let index = 1;
      message = found.value.replace(/\$var/g, () => replacements[index++]);
    }

    return message || key;
  }

  #languageChange() {
    const language = navigator.language;
    if (language === this.#language) return;
    this.#language = language;
    window.dispatchEvent(new Event('wfclanguagechange'));
  }
}
