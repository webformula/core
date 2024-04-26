import { Component } from '@webformula/core';
import htmlTemplate from './page.html';

export default class extends Component {
  static pageTitle = 'Build / serve';
  static htmlTemplate = htmlTemplate;

  constructor() {
    super();
  }
}
