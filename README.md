## @webfurmula/core
Simple no thrills micro framework. Super performant and light-weight!
[Webformula core docs](http://webformula.io/)

### Highlights
- ⚡ Lightweight - 1.5KB compressed (GZIP)
- ⚡ Fast - leverages native browser features
- ⚡ Simple - No complex concepts
- ⚡ 0 dependencies in build
- ⚡ Server side & Single page app
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
    { path: '/', page: home },
    { path: '/one', page: one },
    { path: '/notfound', page: notFound, notFound: true }
  ]);
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
  import { Page } from '@webformula/core';
  import html from './page.html'; // automatically bundles
  
  export default class extends Page {
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
The serve process will handle:
- Minification
- Sourcemaps
- live relaoding (requires nodemon)
- Adding hashes to filenames
- Rewriting imports for app.js and app.js to have hashes

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
