import { Page } from '@webformula/core';

export default class extends Page {
  static templatePath = 'pages/notfound/page.html';
  static pageTitle = 'Not found';

  constructor() {
    super();
  }
}
