import { Component } from '@webformula/core';
import html from './page.html';

export default class extends Component {
  static title = 'Web component';
  static html = html;

  constructor() {
    super();
  }
}
