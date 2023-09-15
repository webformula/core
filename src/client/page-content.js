// const template = document.createElement("template");
// template.innerHTML = `<slot></slot>`;

if (!customElements.get('page-content')) {
  class PageContent extends HTMLElement {
    constructor() {
      super();

      // const shadow = this.attachShadow({ mode: "open" });
      // shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
      //event listeners
    }
  }
  customElements.define('page-content', PageContent);
}
