import { Page } from '@webformula/core';
import html from './page.html';

export default new class extends Page {
  pageTitle = 'Webpack bundle';

  constructor() {
    super();
  }

  template() {
    return this.renderTemplateString(html);
  }
}
