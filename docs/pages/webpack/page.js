import { Page } from '@webformula/core';
import html from './page.html';

export default class extends Page {
  static pageTitle = 'Webpack bundle';
  static html = html;

  constructor() {
    super();
  }
}
