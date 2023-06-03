import build from '@webformula/core/build';

build({
  basedir: 'docs/',
  outdir: 'dist/',
  copyFiles: [
    { from: 'docs/favicon.ico', to: 'dist/' }
  ]
});
