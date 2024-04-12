import { Component, Signal, Compute } from '@webformula/core';
import html from './page.html';


export default class extends Component {
  static pageTitle = 'Signals and binding';
  static html = html;

  basicBind = new Signal('');
  number = new Signal(1);
  numberTimesTwo = new Compute(() => {
    return this.number.value * 2;
  });


  constructor() {
    super();
  }

  updateValue() {
    this.basicBind.value = 'Updated';
  }
}
