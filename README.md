## @webfurmula/core
Simple no thrills micro framework. Super performant and light-weight!
[Webformula core docs](http://webformula.io/)

### Highlights
- ⚡ Lightweight - 2KB compressed
- ⚡ Fast - leverages native browser features
- ⚡ Simple - No complex concepts
- ⚡ 0 dependencies in build
- ⚡ Server side optimized build & Single page app. With the same app code
- ⚡ Supports both url and hash routing
- ⚡ Includes bundling. No need for Webpack

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
    - [Serve app](#iserveapp)
    - [Build single page app](#buildspa)


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
    <link href="/app.css" rel="stylesheet">
    <script src="/app.js" type="module"></script>
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
import { registerPage, enableLinkIntercepts } from '@webformula/core/client';

  /**
   * enableLinkIntercepts
   *
   * Using this will stream the full app after the first page load
   * and treat it as a single page app. This is the best of both worlds.
   * Small initial load and background loading of the rest.
   *
   * If not used then each page will load individually.
   * This is also required for normal url routing and single page apps
   */
  enableLinkIntercepts();
  
  import home from './pages/home/page.js';
  import one from './pages/one/page.js';
  import notFound from './pages/notfound/page.js';
  
  registerPage(home, '/');
  registerPage(one, '/one');
  // page used for 404 urls
  registerPage(notFound, '/notfound', {notFound: true});
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
  import { Page } from '@webformula/core/client';
  import html from './page.html'; // automatically bundles
  
  export default class extends Page {
    static pageTitle = 'Home'; // html page title
    static html = html; // hook up imported html. Supports template literals (undefined)

    // can be configures with `registerPage(PageClass, '/one')`
    static routes = ['/one', 'one/:id'];

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

### **Serve app with Expressjs `server.js`**
<a name="serveapp"/>

```javascript
import express from 'express';
import compression from 'compression';
import { coreMiddleware } from '@webformula/core/server';

const app = express();
const port = 3000;

app.use(compression());
app.use(coreMiddleware('./app'));
app.use(express.static('./app'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

### **Serve commands**
```bash
# Development run. Includes sourcemaps
node build.js
# using nodemon will enable livereload
nodemon -e js,css,html build.js

# Production run. minifies, turns off livereload and sourcemaps
NODE_ENV=production node build.js
```

<br/>

### **Build single page app `build.js`**
<a name="buildspa"/>

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
   * true when 'NODE_ENV=production' otherwise defaults to false
   * use 'WEBFORMULA_MINIFY' env var to override
   */
  minify: true,

  /**
  * false when 'NODE_ENV=production' otherwise defaults to true
  * use 'WEBFORMULA_SOURCEMAPS' env var to override
  */
  sourcemaps: false,

  /**
  * true when 'NODE_ENV=production' otherwise defaults to false
  * use 'WEBFORMULA_GZIP' env var to override
  */
  gzip: true,

  devServer: {
    /**
    * false when 'NODE_ENV=production' otherwise defaults to true
    */
    enabled: true,

    /**
    * false when 'NODE_ENV=production' otherwise defaults to true
    * use 'WEBFORMULA_LIVERELOAD' env var to override
    */
    liveReload: true

    port: 3000,
  },

  // supports regex's with wildcards (*, **)
  copyFiles: [
    {
      from: 'app/image.jpg',
      to: 'dist/'
    },
    {
      from: 'app/pages/**/(?!page)*.html',
      to: 'dist/pages'
    }
  ],

  // callback before bundle
  onStart: () => {},

  // callback after bundle
  onEnd: () => {}
});


// You can access gzipFile directly
import build, { gzipFile } from '@webformula/core/build';

// this will write 'dist/something.js.gz'
await gzipFile('dist/something.js');
```

### **Build single page app commands**
```bash
# Development run. Includes sourcemaps and livereload
node build.js

# Production run. minifies, gzips, and writes files
NODE_ENV=production node build.js
```
