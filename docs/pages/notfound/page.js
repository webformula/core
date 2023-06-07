import { Page } from '@webformula/core/client';
import html from './page.html';

export default class extends Page {
  static title = 'Not found';
  static html = html;

  constructor() {
    super();
  }
}
