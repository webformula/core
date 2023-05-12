import express from 'express';
import compression from 'compression';
import path from 'node:path';
import { coreMiddleware, registerPage } from '@webformula/core/server'

const app = express()
const port = 3000

app.use(compression());
app.get('*', coreMiddleware('./server-example', {
  importMap: {
    // '@webformula/material': '/@webformula/material/src/index.js',
    '@webformula/material': '/@webformula/material',
    '@webformula/material/theme': '/@webformula/material/theme'
  }
}));
app.use('/@webformula/material/theme', (req, res) => {
  res.sendFile(path.resolve(`node_modules/@webformula/material/dist/theme.css`));
});
app.use('/@webformula/material', (req, res) => {
  res.sendFile(path.resolve(`node_modules/@webformula/material/dist/components.js`));
  // res.sendFile(path.resolve(`node_modules/@webformula/material${req.url === '/' ? '/src/index.js' : req.url}`));
});
app.use(express.static('./server-example'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


registerPage('pages/home/page.js', '/');
registerPage('pages/one/page.js', '/one');
registerPage('pages/notfound/page.js', '/notfound', { notFound: true });
