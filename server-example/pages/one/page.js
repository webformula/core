import { Page } from '@webformula/core';
import html from './page.html';

export default class extends Page {
  static pageTitle = 'One';
  static html = html;

  constructor() {
    super();
  }
}
