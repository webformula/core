import build from '@webformula/core/build';
import generate from '@webformula/material/themeGenerator';


if (process.env.NODE_ENV === 'production') generate({
  coreColors: {
    primary: '#6750A4'
  }
}, './docs/colorTokens.css');

// TODO bug without spa when routing. Can get stuck or be slow
build({
  spa: true,
  chunks: false,
  basedir: 'docs/',
  outdir: 'dist/',
  copyFiles: [
    { from: 'docs/favicon.ico', to: 'dist/' },
    { from: 'docs/highlight-11.8.0.js', to: 'dist/', gzip: true }
  ]
});
