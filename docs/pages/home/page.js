import { Page } from '@webformula/core/client';
import html from './page.html';

export default class extends Page {
  static title = 'Home';
  static html = html;
  
  constructor() {
    super();
  }
}
