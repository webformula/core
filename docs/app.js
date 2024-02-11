import '@webformula/material/components/navigation-drawer';
import '@webformula/material/components/navigation-bar';
import '@webformula/material/components/anchor';
import '@webformula/material/components/card';
import '@webformula/material/components/button';
import '@webformula/material/components/switch';
import '@webformula/material/components/textfield';


if (typeof hljs !== 'undefined') hljs.highlightAll();
window.addEventListener('load', () => {
  hljs.highlightAll();
  if (location.hash) handleHashAnchor(location.hash, false);
});

window.addEventListener('locationchange', () => {
  setTimeout(() => {
    hljs.highlightAll();
    if (!location.hash) return;
    handleHashAnchor(location.hash, false);
  });
});

window.addEventListener('wfclanguagechange', () => {
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
      if (animate) document.documentElement.scroll({ top: element.offsetTop, behavior: 'smooth' });
      else document.documentElement.scroll({ top: element.offsetTop });
    }
  } catch { console.log('error'); }
}
