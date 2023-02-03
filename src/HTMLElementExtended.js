const templateElements = {};


/** HTMLElementExtended
 *  Used to make customElements (web components)
 *  This extended class adds a few features to make it easier to build web components
 *    - Template
 *    - Render
 *    - before and after render methods
 *    - Easy to render with or without shadowDom
 *    - Uses template elements to increase performance
 */
export default class HTMLElementExtended extends HTMLElement {
  /** if not using shadowRoot templates and rendering still work */
  useShadowRoot = false;

  /** Use template element to clone from
   *   If your template uses dynamic templates you want to set this to false */
  useTemplate = true;

  #rendered = false;
  #templateString;
  #templateElement;
  // browser may or may not include the word "function" so we need to run an includes check. This string comes from default method
  #hasTemplate = !this.template.toString().includes('template(){return""}');
  #root = this;
  #classId = hashCodeForId(this.constructor.toString());


  constructor() {
    super();

    // fastest way to call render while making sure all class variables exist
    //   Other options would be setTimeout or calling from connectedCallback. Both are slower
    if (this.#hasTemplate) {
      nextTick(() => {
        this.#prepareRender();
        this.render();
      });
    }
  }

  get rendered() {
    return this.#rendered;
  }

  // connectedCallback exists in customElement->HTMLElement. Called by browser when added to DOM
  connectedCallback() { }
  // disconnectedCallback exists in customElement->HTMLElement. Called by browser when removed from DOM
  disconnectedCallback() { }

  /** Return HTML template string.
   *  ./page.js
   *  new class one extends Page {
   *    template() {
   *       return `<div>${this.var}</div>`;
   *    }
   *  }
   */
  template(){return""}

  /** For html file is loaded as raw text and uses template liters
   *  ./page.html
   *  <div>${page.var}</div>
   * 
   *  ./page.js
   *  import html from 'page.html`;
   *  new class one extends Page {
   *    template() {
   *       return this.renderTemplateString(html);
   *    }
   *  }
   */
  renderTemplateString(template = '') {
    return new Function(`return \`${template}\`;`).call(this);
  }

  /** beforeRender not called on initial render */
  beforeRender() { }
  afterRender() { }


  // If template is set then initial rendering will happen automatically
  render() {
    if (this.#rendered) this.beforeRender();
    if (!this.useTemplate) this.#templateElement.innerHTML = this.template();
    this.#root.replaceChildren(this.#templateElement.content.cloneNode(true));
    this.#rendered = true;
    this.afterRender();
  }

  #prepareRender() {
    this.#templateString = this.template();

    if (this.useTemplate) {
      if (!templateElements[this.#classId]) {
        templateElements[this.#classId] = document.createElement('template');
        templateElements[this.#classId].innerHTML = this.#templateString;
      }

      this.#templateElement = templateElements[this.#classId];
    } else {
      this.#templateElement = document.createElement('template');
    }

    if (this.useShadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.#root = this.shadowRoot;
    } else this.#root = this;
  }
}


const nextTickNode = document.createTextNode('');
let nextTickQueue = [];
let nextTickObserving = false;
let nextTickNodeData = 0;

const observeCallback = () => {
  while (nextTickQueue.length) {
    nextTickQueue.pop()();
  }
  observe.disconnect();
  nextTickObserving = false;
};
const observe = new MutationObserver(observeCallback);

function nextTick(callback) {
  nextTickQueue.push(callback);
  if (nextTickObserving === false) {
    observe.observe(nextTickNode, { characterData: true });
    nextTickObserving = true;
    nextTickNode.data = nextTickNodeData++;
  }
}

function hashCodeForId(str) {
  return Array.from(str).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0)
}
