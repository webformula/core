import { routes, preventNavigation } from '@webformula/core';
import '@webformula/material/components/navigation';
import '@webformula/material/components/card';
import home from './pages/home/page.js';
import gettingStarted from './pages/getting started/page.js';
import build from './pages/build/page.js';
import webComponent from './pages/web component/page.js';
import notFound from './pages/notfound/page.js';


routes([
  { path: '/', component: home },
  { path: '/getting-started', component: gettingStarted },
  { path: '/build', component: build },
  { path: '/web-component', component: webComponent },
  { path: '/notfound', component: notFound, notFound: true }
]);

document.querySelector('#hljsscript').addEventListener('load', () => {
  hljs.highlightAll();
});

window.addEventListener('DOMContentLoaded', () => {
  if (location.hash) {
    setTimeout(() => {
      handleHashAnchor(location.hash, false);
    });
  }
});

window.addEventListener('locationchange', () => {
  setTimeout(() => {
    if (typeof hljs !== 'undefined') hljs.highlightAll();
    if (!location.hash) return;
    handleHashAnchor(location.hash, false);
  });
});

window.addEventListener('hashchange', () => {
  if (!location.hash) return;
  handleHashAnchor(location.hash);
});


function handleHashAnchor(hash, animate = true) {
  try {
    const element = document.querySelector(hash);
    if (element) {
      if (animate) window.scroll({ top: element.offsetTop, behavior: 'smooth' });
      else window.scroll({ top: element.offsetTop });
    }
  } catch { console.log('error'); }
}
