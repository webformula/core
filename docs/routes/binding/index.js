import { Component } from '@webformula/core';
import html from './page.html';

export default class extends Component {
  static title = 'Binding variables';
  static html = html;

  basicBind = '';

  constructor() {
    super();
  }

  updateValue() {
    this.basicBind = 'Updated';
  }
}
