import { Page } from '@webformula/core';
import html from './page.html';

export default class extends Page {
  static title = 'Not found';
  static html = html;

  constructor() {
    super();
  }
}
