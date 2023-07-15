## @webfurmula/core
Simple no thrills micro framework. Super performant and light-weight!
[Webformula core docs](http://webformula.io/)


```javascript
app/
└── routes/
    ├── index/
    │   └── index.js      # /
    ├── one/
    │   └── index.js      # one/
    ├── two[id?]/
    │   └── index.js      # two/:id?
    ├── three/
    │   └── [id]/
    │       └── index.js  # three/:id
    └── four/
        └── [...rest]/
            └── index.js  # four/* (four/a/b/)
```

### Highlights
- ⚡ Lightweight - 1.8KB compressed (GZIP)
- ⚡ Fast - leverages native browser features
- ⚡ Simple - No complex concepts
- ⚡ Single page app with index HTML for each route
- ⚡ Includes bundling. No need for Webpack
- ⚡ Bundles with route level chunk optimization or single file
- ⚡ Server middleware

### About
Browsers, javascript, css, and html provide a robust set of features these days. With the addition of a couple of features like routing, we can build small performant applications without a steep learning curve. Webformula core provides the tools to achieve this in a tiny package (2KB). You can create your web application and decide weather to build it as a single page app or server it.


## Table of Contents  
- [Getting started](#gettingstarted)
  - [Installation](#installation)
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
<a name="gettingstarted"/>


## **Installation**
<a name="installation"/>

```bash
npm install @webformula/core
```


## **Example code**
<a name="examplecode"/>

### **index.html**
<a name="index.html"/>

```html
<!doctype html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="Cache-Control" content="no-store" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
    <title></title>
    <!--
      load js and css
      app.js is required and app.css is optional
    -->
    <link href="app.css" rel="stylesheet">
    <script src="app.js" type="module"></script>
  </head>
  
  <body>
    <!-- page template render into this element -->
    <page-content></page-content>
  </body>
</html>
```

<br/>

### **Main app `app.js`**
<a name="app.js"/>

```javascript
  import { routes } from '@webformula/core';
  import home from './pages/home/page.js';
  import one from './pages/one/page.js';
  import notFound from './pages/notfound/page.js';
  
  routes([
    { path: '/', component: home },
    { path: '/one', component: one },
    { path: '/notfound', component: notFound, notFound: true }
  ]);
```

Prevent navigation allows you to lock down the app for uses like authentication
```javascript
  import { routes, preventNavigation } from '@webformula/core';
  import home from './pages/home/page.js';
  import login from './pages/login/page.js';
  
  routes([
    { path: '/', component: home },
    { path: '/login', component: login }
  ]);

  // if not authenticated redirect to login and prevent navigation
  if (!document.cookie.includes('authenticated=true')) {
    if (location.pathname !== '/login') location.href = '/login';
    preventNavigation(true);
    // preventNavigation(false);
  }
```

<br/>

### **Main app css `app.css`**
<a name="app.css"/>

```css
@import url('./other.css');

body {
  background-color: white;
}
```

<br/>

### **Basic page `pages/home/page.js`**
<a name="page.js"/>

```javascript
  import { Component } from '@webformula/core';
  import html from './page.html'; // automatically bundles

  // imported component
  import './component.js';
  
  export default class extends Component {
    static title = 'Home'; // html page title
    static html = html; // hook up imported html. Supports template literals (undefined)

    someVar = 'Some var';
    clickIt_bound = this.clickIt.bind(this);
    userInput;
    
    
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
    
    // look below to how it is invoked on a button
    clickIt() {
      console.log('clicked it!');
    }
    
    // look below to how it is invoked on a button
    changeValueAndRender() {
      this.someVar = 'Re-rendered';
      this.render(); // initial render is automatic
    }
    
    /**
     * If not importing html you can use this template method.
     * Imported html also supports template literals (undefined)
     */
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

        <!-- web component -->
        <custom-button>Click</custom-button>
      `;
    }
  }
```

<br/>

### **HTML page template `pages/home/page.html`** Can use javascript template literal syntax
<a name="page.html"/>

```html
<div>Page Content</div>
<div>${this.someVar}</div>

<!-- escape html input -->
<div>${this.escape(this.userInput)}</div>

<!-- "page" will reference the current page class -->
<button onclick="page.clickIt()">Click Method</button>
<button id="event-listener-button">Event listener</button>
<button onclick="page.changeValueAndRender()">Change value and render</button>
```

<br/>

### **Web component `component.js`**
<a name="component.js"/>

```javascript
  import { Component } from '@webformula/core';
  
  export default class extends Component {
    /**
      * Defaults to false.
      * If this is false then the component will render directly in root element
      */
    static useShadowRoot = true;

    /**
    * Defaults to true.
    * Use global template element
    * This should be set to false if the template is dynamic (<div>\${this.var}</div>)
    */
    static useTemplate = true;

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
      return /*html*/`
        <button><slot></slot></button>
      `;
    }
  }

  // define web component
  customElements.define('custom-button', CustomButton);
```

<br/>

### **Build single page app `build.js`**
<a name="buildapp"/>
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

  devServer: {
    /**
     * Run dev server
     * Set to 'false' when 'NODE_ENV=production'
     *   otherwise it defaults to 'true'
     */
    enabled: true,

    /**
     * Livereload
     * Simply use watch to enable 'node --watch build.js'
     * Set to 'false' when 'NODE_ENV=production'
     *   otherwise it defaults to 'true'
     */
    liveReload: true

    port: 3000,
  },

  // supports regex's with wildcards (*, **)
  copyFiles: [
    {
      from: 'app/image.jpg',
      to: 'dist/',
      gzip: true
    },
    {
      from: 'app/pages/**/(?!page)*.html',
      to: 'dist/pages'
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

# Production run. minifies, gzips, and writes files
NODE_ENV=production node build.js
```


<br/>

### **Build single page app `build.js`**
<a name="middleware"/>
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
