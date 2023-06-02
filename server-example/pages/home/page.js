import { Page } from '@webformula/core';
import '@webformula/material/components/button';
import html from './page.html';

export default class extends Page /* @__PURE__ */  {
  static pageTitle = 'Home';
  static html = html;
  
  constructor() {
    super();
  }
}
