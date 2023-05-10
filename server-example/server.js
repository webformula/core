import express from 'express';
import compression from 'compression';
import { coreMiddleware, registerPage } from '@webformula/core/server'

const app = express()
const port = 3000

app.use(compression());
app.get('*', coreMiddleware('./server-example'));
app.use(express.static('./server-example'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


registerPage('pages/home/page.js', '/');
