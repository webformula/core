import { Component } from '@webformula/core';
import html from './page.html';

export default class extends Component {
  static pageTitle = 'Build / serve';
  static html = html;

  constructor() {
    super();
  }
}
