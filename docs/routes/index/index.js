import { Component } from '@webformula/core';
import html from './page.html';

export default class extends Component {
  static title = 'Home';
  static html = html;

  test = 'test';
  two = 'two';
  three = {
    value: 'three',
    sub: {
      value: 'sub'
    }
  };
  
  constructor() {
    super();
  }
}
