import '@webformula/material/components/navigation';
import '@webformula/material/components/card';

window.addEventListener('load', () => {
  hljs.highlightAll();
  if (location.hash) handleHashAnchor(location.hash, false);
});

window.addEventListener('locationchange', () => {
  hljs.highlightAll();
  if (!location.hash) return;
  handleHashAnchor(location.hash, false);
});

window.addEventListener('hashchange', () => {
  if (!location.hash) return;
  handleHashAnchor(location.hash);
});


function handleHashAnchor(hash, animate = true) {
  try {
    const element = document.querySelector(hash);
    if (element) {
      if (animate) document.querySelector('page-content').scroll({ top: element.offsetTop, behavior: 'smooth' });
      else document.querySelector('page-content').scroll({ top: element.offsetTop });
    }
  } catch { console.log('error'); }
}
