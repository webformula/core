## @webfurmula/core
Simple no thrills micro framework. Super performant and light-weight!

### Highlights
- Lightweight - **2KB** compressed
- Fast - Most of the heavy lifting is native browser code
- Simple - No complex concepts
- 0 dependencies
- compatible with all build pipelines
- Single page app compatible. With url or hash routing
- HTMLElementExtended adds templates and rendering to webcomponents


The goal of this project is to fill the gaps of the modern web browser for creating web applications. The modern DOM is full a great features and has many more coming. This reduces the need to have full fledged frameworks. With less custom code websites are faster, smaller and easier to debug.


# Links
- [MDZ Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)



# Examples

### **Main app file**
```javascript
import { registerPage, enableLinkIntercepts } from '@webformula/core';
enableLinkIntercepts();

import one from './pages/one/page.js';
import two from './pages/two/page.js';
import notFound from './pages/not-found/page.js';

// routes can be configured in page
registerPage(one, '/one');
registerPage(one, '/two');
registerPage(notFound, '/not-found', { notFound: true });

window.addEventListener('locationchange', () => {
  // custom event dispatched by router
});

window.addEventListener('hashchange', () => {
  // native event
});
```

<br/>

### **Basic page**
```javascript
import { Page } from '@webformula/core';

export default class extends Page {
  static pageTitle = 'Page';
  static templatePath = 'pages/one.html'; // use this or the template method

  someVar = 'Some var';
  clickIt_bound = this.clickIt.bind(this);
  userInput;
  
  // can be configures with `registerPage(PageClass, '/one')`
  routes = ['/one', 'one/:id'];

  constructor() {
    super();
  }

  connectedCallback() {
    // called on element hookup to dome. May not be rendered yet

    this.userInput = 'some user input';
    console.log(this.urlParameters); // { id: 'value' }
    console.log(this.searchParameters); // { id: 'value' }
  }

  disconnectedCallback() {
    // called on element removal
  }

  // not called on initial render
  beforeRender() {
    // Do work before render
  }

  afterEnder() {
    // Do work after render
    this.querySelector('#event-listener-button').addEventListener('click', this.clickIt_bound);
  }

  clickIt() {
    console.log('clicked it!');
  }

  changeValueAndRender() {
    this.someVar = 'Re-rendered';
    this.render(); // initial render is automatic
  }

  template() {
    return /*html*/`
      <div>Page Content</div>
      <div>${this.someVar}</div>

      <!-- escape html input -->
      <div>${this.escape(this.userInput)}</div>

      <!-- "page" will reference the current page class -->
      <button onclick="page.clickIt()">Click Method</button>
      <button id="event-listener-button">Event listener</button>
      <button onclick="page.changeValueAndRender()">Change value and render</button>
    `;
  }
}
```

<br/>

### **Basic page With Webpack html-loader**

*page.html*
```html
<div>Page Content</div>
<div>${this.someVar}</div>
<button onclick="page.clickIt()">Click Method</button>
```
*page.js*
```javascript
import { Page } from '@webformula/core';
import html from './page.html';

export default class extends Page {
  static pageTitle = 'Page'; // html page title
  someVar = 'Some var';

  constructor() {
    super();
  }

  clickIt() {
    console.log('clicked it!');
  }

  template() {
    return this.renderTemplateString(html);
  }
}
```

<br/>

### **HTMLElementExtended** Adds template and render functionality to HTMLElement

```html
<my-check-button>Check</my-check-button>
```
