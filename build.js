import build from '@webformula/core/build';

build({
  chunks: false,
  basedir: 'docs/',
  outdir: 'dist/',
  copyFiles: [
    { from: 'docs/favicon.ico', to: 'dist/' },
    { from: 'docs/highlight-11.8.0.js', to: 'dist/', gzip: true }
  ]
});
