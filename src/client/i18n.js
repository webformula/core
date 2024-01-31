export default new class I18nLanguage {
  #language;
  #messages = {};
  #templateMessages = {};
  #cacheType = 'localStorage';
  #languageChange_bound = this.#languageChange.bind(this);

  constructor() {
    this.#language = this.browserLanguage;
    window.addEventListener('languagechange', this.#languageChange_bound);
  }

  get language() {
    return this.#language;
  }
  set language(value) {
    // if (!navigator.languages.includes(value)) throw Error(`Invalid language. Valid languages (${navigator.languages.join(', ')})`);
    if (value === this.#language) return;

    this.#language = value;
    if (this.#cacheType === 'localStorage') localStorage.setItem('wfc-user-language', this.#language);
    else if (this.#cacheType === 'sessionStorage') sessionStorage.setItem('wfc-user-language', this.#language);
    else if (this.#cacheType === 'none') {
      sessionStorage.removeItem('wfc-user-language');
      localStorage.removeItem('wfc-user-language');
    }
    window.wfcLanguage = this.#language;
    window.dispatchEvent(new Event('wfclanguagechange'));
  }

  get browserLanguage() {
    return navigator.language;
  }

  get messages() {
    return this.#messages;
  }
  set messages(value) {
    if (!value || typeof value !== 'object') throw Error('messages must be an object');
    this.#messages = value;

    // build template string replaces
    // Example: 'keep this $var in place and this $var': 'keep this $var in place and this $var'
    Object.entries(value).forEach(([language, keys]) => {
      this.#templateMessages[language] = [];
      Object.entries(keys).forEach(([key, value]) => {
        if (value.includes('$var')) {
          this.#templateMessages[language].push([
            new RegExp(key.replace(/\$var/g, '([^]+)')),
            value
          ]);
        }
      });
    });
  }

  get activeSortedMessageKeys() {
    return Object.keys(this.messages[this.language]).sort((a, b) => b[0].length - a[0].length);
  }

  get autoTranslate() {
    return window._webformulaCoreAutoTranslate === true;
  }

  get cacheType() {
    return this.#cacheType;
  }

  set cacheType(value) {
    if (value && !['localStorage', 'sessionStorage', 'none'].includes(value)) throw Error('cacheType must be one of these values: localStorage, sessionStorage, none');
    this.#cacheType = value;

    if (value === 'sessionStorage' && sessionStorage.getItem('wfc-user-language')) this.#language = sessionStorage.getItem('wfc-user-language');
    else if (value === 'localStorage' && localStorage.getItem('wfc-user-language')) this.#language = localStorage.getItem('wfc-user-language');
    else if (value === 'none') {
      sessionStorage.removeItem('wfc-user-language');
      localStorage.removeItem('wfc-user-language');
    }
  }

  shouldTranslate() {
    if (!this.#messages) return false;
    if (this.#language === this.browserLanguage) return false;
    return true;
  }

  translate(key) {
    const messages = this.#messages[this.language] || this.#messages[this.language.split('-')[0]] || {};
    let message = messages[key];

    // check for template string replaces.
    // Example: 'keep this $var in place and this $var': 'keep this $var in place and this $var'
    if (!message) {
      const found = (this.#templateMessages[this.language] || this.#templateMessages[this.language.split('-')[0]] || []).find(([matcher]) => key.match(matcher));
      if (found) {
        const replacements = key.match(found[0]);
        let index = 1;
        message = found[1].replace(/\$var/g, () => replacements[index++]);
      }
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
