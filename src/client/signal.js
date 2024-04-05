import i18n from './i18n.js';


const context = [];
let idCounter = 0;

/**
 * Signals are used for binding variables to html
 */
export class Signal {
  #id = idCounter++;
  #isTemplate;
  #isI18n;
  #attrNames = [];
  #subscriptions = new Set();
  #value;
  #destroyed;


  /**
   * Create a signal
   * @function
   * @param {any} value - initial value
   */
  constructor(value) {
    this.#value = value;
  }

  /**
   * Get raw value
   * @type {any}
   */
  get value() {
    if (!this.#destroyed) {
      const observer = context[context.length - 1]
      if (observer) this.#subscriptions.add(observer);
    }
    return this.#value;
  }

  /**
   * Set value
   * @param {any} _value
   */
  set value(_value) {
    this.#value = _value;
    if (this.#destroyed) return;

    for (const observer of this.#subscriptions) {
      observer.execute()
    }

    if (this.#isTemplate) this.#updateTemplate();
    if (this.#isI18n) i18n.localizeDocument();
  }

  /** @private */
  get i18nValue() {
    this.#isI18n = true;
    return this.#value;
  }

  /** @private */
  get templateValueContent() {
    this.#isTemplate = true;
    return `<wfc-bind wfc-bind-id="${this.#id}">${this.#value}</wfc-bind>`;
  }

  /** @private */
  templateValueAttribute(attrName) {
    this.#isTemplate = true;
    this.#attrNames.push(attrName);
    return `${this.#value}" wfc-bind-attr-id="${this.#id}`;
  }

  /** disconnect signal so it can be garbage collected */
  destroy() {
    this.#destroyed = true;
    this.#subscriptions.clear();
    this.#subscriptions = undefined;
  }


  #updateTemplate() {
    const content = [...document.body.querySelectorAll(`[wfc-bind-id="${this.#id}"]`)];
    for (const element of content) {
      element.innerHTML = this.#value;
    }

    const attrElements = [...document.body.querySelectorAll(`[wfc-bind-attr-id="${this.#id}"]`)];
    for (const attrElement of attrElements) {
      for (const attr of this.#attrNames) {
        if (attrElement.hasAttribute(attr)) attrElement.setAttribute(attr, this.#value);
      }
    }
  }
}

/**
 * Listen to changes from signals
 * @function
 * @param {function} callback - callback function
 */
export function effect(callback) {
  const effect = {
    execute() {
      context.push(effect);
      callback();
      context.pop();
    }
  };

  effect.execute();
}
