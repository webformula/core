import build from '@webformula/core/build/client';

build({
  baseDir: 'docs/',
  output: 'dist/bundle.js',
  entryPoints: ['app.js'],
  devServer: { enabled: true }
});
