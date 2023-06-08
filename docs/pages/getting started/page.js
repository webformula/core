import { Page } from '@webformula/core';
import html from './page.html';

export default class extends Page {
  static title = 'Getting started';
  static html = html;

  constructor() {
    super();
  }
}
