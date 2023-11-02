export default new class I18nLanguage {
  #language = navigator.language.split('-')[0];
  #messages = {};
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
  }

  get activeSortedMessageKeys() {
    return Object.keys(this.messages[this.language]).sort((a, b) => b[0].length - a[0].length);
  }

  get autoTranslate() {
    return window._webformulaCoreAutoTranslate === true;
  }

  translate(key) {
    const messages = this.#messages[this.language] || {};
    return messages[key] || key;
  }

  #languageChange() {
    this.language = navigator.language;
  }
}
