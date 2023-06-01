import build from '@webformula/core/build';

build({
  baseDir: 'docs/',
  output: 'dist/bundle.js',
  entryPoints: ['app.js'],
  devServer: { enabled: true },
  minify: false
});
