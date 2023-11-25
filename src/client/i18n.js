export default new class I18nLanguage {
  #language = navigator.language.split('-')[0];
  #messages = {};
  #templateMessages = {};
  #languageChange_bound = this.#languageChange.bind(this);

  constructor() {
    window.addEventListener('languagechange', this.#languageChange_bound);
  }

  get language() {
    return this.#language;
  }
  set language(value) {
    if (!navigator.languages.includes(value)) throw Error(`Invalid language. Valid languages (${navigator.languages.join(', ')})`);
    this.#language = value.split('-')[0];
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

  translate(key) {
    const messages = this.#messages[this.language] || {};
    let message = messages[key];

    // check for template string replaces.
    // Example: 'keep this $var in place and this $var': 'keep this $var in place and this $var'
    if (!message) {
      const found = this.#templateMessages[this.language].find(([matcher]) => key.match(matcher));
      if (found) {
        const replacements = key.match(found[0]);
        let index = 1;
        message = found[1].replace(/\$var/g, () => replacements[index++]);
      }
    }

    return message || key;
  }

  #languageChange() {
    this.language = navigator.language;
  }
}
