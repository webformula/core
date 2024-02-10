import { Component } from '@webformula/core';
import html from './page.html';

export default class extends Component {
  static pageTitle = 'Fetcher';
  static html = html;

  constructor() {
    super();
  }
}
