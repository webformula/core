import { Component } from '@webformula/core';
import html from './page.html';
import { i18nLanguage } from '@webformula/core';

export default class extends Component {
  static title = 'Multiple languages';
  static html = html;

  languagesChecked = false;

  constructor() {
    super();

    i18nLanguage.messages = {
      en: {
        'About': 'About',
        'Some other text': 'Some other text'
      },
      es: {
        'About': 'Acerca de',
        'Some other text': 'algún otro texto'
      }
    };
  }

  changeLanguage(checked) {
    this.languagesChecked = checked;
    i18nLanguage.language = checked ? 'es' : 'en';
    this.render();
  }
}
