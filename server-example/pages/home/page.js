import { Page } from '@webformula/core';

export default class extends Page {
  static templatePath = 'pages/home/page.html';
  static pageTitle = 'Home';

  constructor() {
    super();
  }
}
