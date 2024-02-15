import { readdir, readFile } from 'node:fs/promises';
import AWS from 'aws-sdk';

const s3 = new AWS.S3();
const cloudfront = new AWS.CloudFront();
const files = await readdir('dist');


const { Contents } = await s3.listObjects({ Bucket: 'webformula.io' }).promise();
if (Contents.length) {
  await s3.deleteObjects({
    Bucket: 'webformula.io',
    Delete: {
      Objects: Contents.map(({ Key }) => ({ Key }))
    }
  }).promise();
}

const invalidations = ['/index.html'];
await Promise.all(files.map(async Key => {
  const Body = await readFile(`dist/${Key}`);
  const ContentEncoding = !Key.includes('favicon.ico') ? 'gzip' : undefined;
  const CacheControl = (!Key.includes('favicon.ico') || Key.includes('.html')) ? 'max-age=31536000' : undefined;
  const ContentType = getMimeType(Key);
  if (Key.includes('.html') && !Key.includes('index.html')) {
    Key = Key.replace('.html', '');
    invalidations.push(`/${Key}`);
  }

  await s3.upload({
    Bucket: 'webformula.io',
    Key,
    Body,
    ContentEncoding,
    CacheControl,
    ContentType,
    ACL: 'public-read'
  }).promise();
}));

await cloudfront.createInvalidation({
  DistributionId: 'E1QR714Z4UFKPL',
  InvalidationBatch: {
    CallerReference: Date.now().toString(),
    Paths: {
      Quantity: invalidations.length,
      Items: invalidations
    }
  }
}).promise();

function getMimeType(url) {
  switch (getExtension(url)) {
    case 'js':
      return 'application/javascript';
    case 'html':
      return 'text/html';
    case 'css':
      return 'text/css';
    case 'json':
      return 'text/json';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    case 'ico':
      return 'image/x-icon';
    case 'woff2':
      return 'font/woff2';
    case 'woff':
      return 'font/woff';
    case 'otf':
      return 'font/otf';
  }
}

function getExtension(url) {
  if (!url.includes('.')) return '';
  const split = url.split(/[#?]/)[0].split('.');
  let ext = split.pop().trim().toLowerCase();
  if (ext === 'gz') ext = split.pop();
  return ext;
}
