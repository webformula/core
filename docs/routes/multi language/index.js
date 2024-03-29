import { Component } from '@webformula/core';
import html from './page.html';
import { i18n } from '@webformula/core';
import en from '../../locales/en.json' assert { type: "json" };
import es from '../../locales/es.json' assert { type: "json" };

export default class extends Component {
  static pageTitle = 'Multiple languages';
  static html = html;

  languagesChecked = false;
  time = 30
  date = new Date();
  currency = '123.45';
  days = 3;

  constructor() {
    super();

    i18n.loadMessages('en', en);
    i18n.loadMessages('es', es);
  }

  changeLanguage(checked) {
    this.languagesChecked = checked;
    i18n.locale = checked ? 'es' : 'en';
  }

  disconnectedCallback() {
    i18n.locale = navigator.language;
  }
}
