import './theme.css';
import './font.css';
import './dracula.css';
import './app.css';
import '@webformula/material';

import { registerPage, enableSPA } from '@webformula/core';
enableSPA();


import home from './pages/home/page.js';
import gettingStarted from './pages/getting started/page.js';
import webpack from './pages/webpack/page.js';


registerPage(home, '/');
registerPage(gettingStarted, '/getting-started');
registerPage(webpack, '/webpack');


window.addEventListener('load', () => {
  hljs.highlightAll();
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
