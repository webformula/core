import { Page } from '@webformula/core';
import '@webformula/material/components/button';

export default class extends Page {
  static templatePath = 'pages/home/page.html';
  static pageTitle = 'Home';

  constructor() {
    super();
  }
}
