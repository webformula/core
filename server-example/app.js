import { registerPage, enableLinkIntercepts } from '@webformula/core/client';
enableLinkIntercepts();

import '@webformula/material';
import home from './pages/home/page.js';
import gettingStarted from './pages/getting started/page.js';
import notFound from './pages/notfound/page.js';

registerPage(home, '/');
registerPage(gettingStarted, '/getting-started');
registerPage(notFound, '/notfound', {notFound: true});


document.querySelector('#hljs').addEventListener('load', () => {
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
    hljs.highlightAll();
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
