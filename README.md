## @webfurmula/core
Simple no thrills micro framework. Super performant and light-weight!
[Webformula core docs](http://webformula.io/)

### Highlights
- ⚡ Lightweight - 6.7KB compressed
- ⚡ Fast - optimized FCP and low overhead
- ⚡ Simple - No complex concepts
- ⚡ Full features - Signals, internationalization, routing, bundling

### About
Browsers, javascript, css, and html provide a robust set of features these days. With the addition of a couple of features like routing, we can build small performant applications without a steep learning curve. Webformula core provides the tools to achieve this in a tiny package (5KB).


## Table of Contents  
- [Getting started](#gettingstarted)
  - [Installation](#installation)
  - [Routing](#routing)
  - [Example code](#examplecode)
    - [index.html](#index.html)
    - [app.js](#app.js)
    - [app.css](#app.css)
    - [page.js](#page.js)
    - [page.html](#page.html)
    - [component.js](#component.js)
    - [Build app](#buildapp)
    - [Server midddleware](#middleware)


# Getting started
<a name="gettingstarted"></a>


## **Installation**
<a name="installation"></a>

```bash
npm install @webformula/core
```

## **Routing**
<a name="routing"></a>
@Webformula/core uses directory based routing. All routes go in a 'routes' folder.

```yaml
app/
└── routes/
    ├── index/
    │   └── index.js      # /
    ├── 404/
    │   └── index.js      # /404 (or any url that is not found)
    ├── one/
    │   └── index.js      # one/
    ├── two[id?]/
    │   └── index.js      # two/:id?
    ├── three/
    │   └── [id]/
    │       └── index.js  # three/:id
    └── four/
        └── [...rest]/
            └── index.js  # four/*rest (four/a/b/)
```
- app/routes/index/index.js → **`/`**
- app/routes/one/index.js → **`one`**
- app/routes/two[id?]/index.js → **`two/:id?`**
- app/routes/three/[id]/index.js → **`three/:id`**
- app/routes/four/[...rest]/index.js → **`four/*rest`**

#### Routing details
- `routes/index/index.js` Root page (/)
- `routes/404/index.js` Not found page. Auto redirect on non matching routes
- `index.js` Route component file
- `[id]` Directory that represents a url parameter
- `[id?]` Directory that represents an options url parameter
- `name[id?]` Inline url parameter to avoid sub folder
- `[...rest]` Directory that represents catch-all route
- `[...rest?]` Directory that represents optional catch-all route

Check out the [page.js section](#page.js) for details on how to get url parameters in route component


## **Example code**
<a name="examplecode"></a>

### **index.html**
<a name="index.html"></a>

```html
<!doctype html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="Cache-Control" content="no-store" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
    <title></title>

    <!-- app.js and app.css will automatically be updated to match bundle outputs -->
    <link href="app.css" rel="stylesheet">
    <script src="app.js" type="module"></script>
  </head>
  
  <body>
    <!-- page template render into this element -->
    <page-content></page-content>

    <!-- Alternative using id attribute -->
    <div id="page-content"></div>
  </body>
</html>
```

<br/>

### **Main app `app.js`**
<a name="app.js"></a>

```javascript
  /* Main app file
   *   you can import any code in here
   */

  import someModule from './someModule.js';

  // routes are automatically loaded based on directory routing
```

Prevent navigation allows you to lock down the app for uses like authentication
```javascript
  import { preventNavigation } from '@webformula/core';

  // if not authenticated redirect to login and prevent navigation
  if (!document.cookie.includes('authenticated=true')) {
    if (location.pathname !== '/login') location.href = '/login';
    preventNavigation(true);
    // preventNavigation(false);
  }
```

<br/>

### **Main app css `app.css`**
<a name="app.css"></a>

```css
@import url('./other.css');

body {
  background-color: white;
}
```

<br/>

### **Basic page `routes/home/index.js`**
<a name="page.js"></a>

```javascript
  import { Component, Signal, html } from '@webformula/core';
  import htmlTemplate from './page.html'; // automatically bundles

  // imported component
  import './component.js';
  
  export default class extends Component {
    // html page title
    static pageTitle = 'Home';

    /**
     * Pass in HTML string. Use for imported .HTML
     * Supports template literals: <div>\${this.var}</div>
     * @type {String}
     */
    static htmlTemplate = htmlTemplate;

    someVar = new Signal('Some var');
    clickIt_bound = this.clickIt.bind(this);
    
    
    constructor() {
      super();
    }
    
    connectedCallback() {
      console.log(this.urlParameters); // { id: 'value' }
      console.log(this.searchParameters); // { id: 'value' }
    }
    
    disconnectedCallback() { }
    
    // not called on initial render
    beforeRender() { }
    
    afterEnder() {
      this.querySelector('#event-listener-button').addEventListener('click', this.clickIt_bound);
    }
    
    // look below to how it is invoked on a button
    clickIt() {
      console.log('clicked it!');
    }
    
    // look below to how it is invoked on a button
    changeValue() {
      this.someVar.value = 'Value updated';
    }
    
    /**
     * Alternative method for html templates, instead of importing html file
     */
    template() {
      return /*html*/`
        <div>Page Content</div>
        <div>${this.someVar}</div>
        
        ${
          // nested html
          this.show ? html`<div>Showing</div>` : ''
        }

        <!--
          You can comment out expressions
          ${`text`}
        -->
        
        <!-- "page" will reference the current page class -->
        <button onclick="page.clickIt()">Click Method</button>
        <button id="event-listener-button">Event listener</button>
        <button onclick="page.changeValue()">Change value</button>
      `;
    }
  }
```

<br/>

### **HTML page template `routes/home/page.html`** Can use javascript template literal syntax
<a name="page.html"></a>

```html
<div>Page Content</div>
<div>${this.someVar}</div>

${
  // nested html
  this.show ? html`<div>Showing</div>` : ''
}

<!--
  You can comment out expressions
  ${`text`}
-->

<!-- "page" will reference the current page class -->
<button onclick="page.clickIt()">Click Method</button>
<button id="event-listener-button">Event listener</button>
<button onclick="page.changeValue()">Change value</button>
```

<br/>

### **Web component `component.js`**
<a name="component.js"></a>

```javascript
  import { Component } from '@webformula/core';
  import html from './component.html';
  
  export default class extends Component {
    /**
      * Pass in HTML string. Use for imported .HTML
      * Supports template literals: <div>${this.var}</div>
      * @type {String}
      */
    static htmlTemplate = html;


    /**
      * Hook up shadow root
      * @type {Boolean}
      */
    static useShadowRoot = false;

    
    /**
      * @type {Boolean}
      */
    static shadowRootDelegateFocus = false;


    /**
      * Pass in styles for shadow root.
      * Can use imported stylesheets: import styles from '../styles.css' assert { type: 'css' };
      * @type {CSSStyleSheet}
      */
    static shadowRootStyleSheets;


    /**
      * @typedef {String} AttributeType
      * @value '' default handling
      * @value 'string' Convert to a string. null = ''
      * @value 'number' Convert to a number. isNaN = ''
      * @value 'int' Convert to a int. isNaN = ''
      * @value 'boolean' Convert to a boolean. null = false
      * @value 'event' Allows code to be executed. Similar to onchange="console.log('test')"
      */
      /**
      * Enhances observedAttributes, allowing you to specify types
      * You can still use \`observedAttributes\` in stead of this.
      * @type {Array.<[name:String, AttributeType]>}
      */
    static get observedAttributesExtended() { return []; }; // static observedAttributesExtended = [['required', 'boolean']];

    /**
      * Use with observedAttributesExtended
      * You can still use \`attributeChangedCallback\` in stead of this.
      * @function
      * @param {String} name - Attribute name
      * @param {String} oldValue - Old attribute value
      * @param {String} newValue - New attribute value
      */
    attributeChangedCallbackExtended(name, oldValue, newValue) { }


    // need to bind events to access \`this\`
    #onClick_bound = this.#onClick.bind(this);

    
    constructor() {
      super();
    }

    afterRender() {
      this.#root.querySelector('button').addEventListener('click', this.#onClick_bound);
    }
    
    disconnectedCallback() {
      this.#root.querySelector('button').removeEventListener('click', this.#onClick_bound);
    }

    #onClick() {
      console.log('Custom button component clicked!');
    }
    
    /**
     * If not importing html you can use this template method.
     * Imported html also supports template literals (undefined)
     */
    template() {
      return html`
        <button><slot></slot></button>
      `;
    }
  }

  // define web component
  customElements.define('custom-button', CustomButton);
```

<br/>

### **Build single page app `build.js`**
<a name="buildapp"></a>
The build process will handle:
- Minification
- Sourcemaps
- Dev server
- live relaoding
- Adding hashes to filenames
- Rewriting imports for app.js and app.js to have hashes
- Gziping content
- File copying

```javascript
import build from '@webformula/core/build';

/**
 * Basic
 * If using 'app/' as root folder then no config needed
 */
build();


/**
 * Full config options
 */
build({
  // Enable spa routing : Default true
  spa: true,
  
  // folder that contains 'app.js' : Default 'app.js'
  basedir: 'app/',

  // folder that contains 'app.js' : Default 'dist/'
  outdir: 'dist/',

  /**
   * Default true
   * Split code using routes for optimal loading 
   */
  chunks: true,

  /**
   * Minify code
   * Set to 'true' when 'NODE_ENV=production'
   *   otherwise it defaults to 'false'
   */
  minify: true,

  /**
   * Create source maps
   * Set to 'false' when 'NODE_ENV=production'
   *   otherwise it defaults to 'true'
   */
  sourcemaps: false,

  /**
   * Compress code
   * Set to 'true' when 'NODE_ENV=production'
   *   otherwise it defaults to 'false'
   */
  gzip: true,

  /**
  * Run dev server
  * Set to 'false' when 'NODE_ENV=production'
  * otherwise it defaults to 'true'
  */
  devServer: true,

  /**
  * Livereload
  * Simply use watch to enable 'node --watch build.js'
  * Set to 'false' when 'NODE_ENV=production'
  * otherwise it defaults to 'true'
  */
  devServerLiveReload: true,
  
  devServerPort: 3000,

  /**
   * devWarnings
   * Enable console warning
   * only html sanitization currently
   * otherwise it defaults to 'false'
   */
  devWarnings: false,

  // supports regex's with wildcards (*, **)
  copyFiles: [
    {
      from: 'app/image.jpg',
      to: 'dist/',
      gzip: true
    },
    {
      from: 'app/routes/**/(?!page)*.html',
      to: 'dist/routes'
    },
    {
      from: 'app/code.js',
      to: 'dist/code.js',
      transform({ content, outputFileNames }) {
        // doo work
        return content;
      }
    }
  ],

  // callback before bundle
  onStart: () => {},

  // callback after bundle
  onEnd: () => {}
});
```

### **Build commands**
```bash
# Development run
node build.js

# Development run with watch to enable livereload
node --watch-path=./app build.js

# Production run. minifies and gzips
NODE_ENV=production node build.js
```


<br/>

### **Build single page app `build.js`**
<a name="middleware"></a>
Use middleware to handle routing and file serving. GZIP compression is automatically handled.
- Native server
- Express server
- Enable livereload with `node --watch`

### **Native server**
```javascript
import { createServer } from 'node:http';
import { middlewareNode } from '@webformula/core/middleware';

const middleware = middlewareNode({
  basedir: 'docs/',
  outdir: 'dist/',
  copyFiles: [
    { from: 'docs/favicon.ico', to: 'dist/' }
  ]
});

createServer(async (req, res) => {
  const handled = await middleware(req, res);
  if (handled === true) return;

  // Do other stuff
}).listen(3000);
```

### **Express server**
```javascript
import express from 'express';
import { middlewareExpress } from '@webformula/core/middleware';

const app = express();
app.use(middlewareExpress({
  basedir: 'docs/',
  outdir: 'dist/',
  copyFiles: [
    { from: 'docs/favicon.ico', to: 'dist/' }
  ]
}));
app.use(express.static('./docs'));

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`)
});
```

### **Livereload**
Simply use node --watch to enable livereload
```bash
node --watch-path=./src --watch-path=./docs server.js
```
