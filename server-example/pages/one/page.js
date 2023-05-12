import { Page } from '@webformula/core';

export default class extends Page {
  static templatePath = 'pages/one/page.html';
  static pageTitle = 'One';

  constructor() {
    super();
  }
}
