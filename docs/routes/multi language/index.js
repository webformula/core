import { Component, Signal } from '@webformula/core';
import htmlTemplate from './page.html';
import { i18n } from '@webformula/core';
import en from '../../locales/en.json' assert { type: "json" };
import es from '../../locales/es.json' assert { type: "json" };

export default class extends Component {
  static pageTitle = 'Multiple languages';
  static htmlTemplate = htmlTemplate;

  languagesChecked = false;
  time = 30
  date = new Date();
  currency = '123.45';
  days = new Signal(3);
  count = new Signal(1);

  constructor() {
    super();
    
    i18n.addTranslation('en', en);
    i18n.addTranslation('es', es);
  }

  changeLanguage(checked) {
    this.languagesChecked = checked;
    i18n.setLocale(checked ? 'es' : 'en');
  }

  disconnectedCallback() {
    i18n.setLocale(navigator.language);
  }
}
