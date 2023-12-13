import { Component } from '@webformula/core';
import html from './page.html';
import { i18nLanguage } from '@webformula/core';
i18nLanguage.cacheType = 'none';

export default class extends Component {
  static title = 'Multiple languages';
  static html = html;

  languagesChecked = false;

  constructor() {
    super();

    i18nLanguage.messages = {
      en: {
        'About': 'About',
        'Some other text': 'Some other text',
        'keep this $var in place and this $var': 'keep this $var in place and this $var'
      },
      es: {
        'About': 'Acerca de',
        'Some other text': 'algún otro texto',
        'keep this $var in place and this $var': 'mantenga este $var en su lugar y este $var'
      }
    };
  }

  changeLanguage(checked) {
    this.languagesChecked = checked;
    i18nLanguage.language = checked ? 'es' : 'en';
  }

  disconnectedCallback() {
    i18nLanguage.language = navigator.language;
  }
}
