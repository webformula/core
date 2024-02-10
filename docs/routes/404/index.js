import { Component } from '@webformula/core';
import html from './page.html';

export default class extends Component {
  static pageTitle = 'Not found';
  static html = html;

  constructor() {
    super();
  }
}
