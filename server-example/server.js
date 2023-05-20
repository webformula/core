import express from 'express';
import compression from 'compression';
import path from 'node:path';
import { coreMiddleware } from '@webformula/core/server'

const app = express()
const port = 3000

app.use(compression());
app.use('/@webformula/material/theme', (req, res) => {
  res.sendFile(path.resolve(`node_modules/@webformula/material/dist/theme.css`));
});
app.get('*', coreMiddleware('./server-example'));
app.use(express.static('./server-example'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
