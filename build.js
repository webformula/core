import build, { gzipFile } from '@webformula/core/build';
import esbuild from 'esbuild';

build({
  basedir: 'docs/',
  outdir: 'dist/',
  devServer: { enabled: true }
});

await esbuild.build({
  entryPoints: ['src/client.js'],
  bundle: true,
  outfile: 'dist/core.js',
  format: 'esm',
  target: 'esnext',
  minify: true
});
await gzipFile('dist/core.js');
