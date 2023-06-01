import { Page } from '@webformula/core';
import '@webformula/material/components/button';
import html from './page.html';

export default class extends Page {
  static pageTitle = 'Home';
  
  constructor() {
    super();
  }

  connectedCallback() {
    throw Error('theeee');
  }

  template() {
    return this.renderTemplateString(html);
  }
}
