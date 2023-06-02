import express from 'express';
import compression from 'compression';
import { coreMiddleware } from '@webformula/core/server';

const app = express()
const port = 3000

app.use(compression());
app.use(coreMiddleware('./docs'));
app.use(express.static('./docs'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
