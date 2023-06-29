import { readdir, readFile } from 'node:fs/promises';
import AWS from 'aws-sdk';
import { getMimeType } from './src/shared.js';

const s3 = new AWS.S3();
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


await Promise.all(files.map(async Key => {
  const Body = await readFile(`dist/${Key}`);
  const ContentEncoding = !Key.includes('favicon.ico') ? 'gzip' : undefined;
  const CacheControl = (!Key.includes('favicon.ico') || Key.includes('.html')) ? 'max-age=31536000' : undefined;
  const ContentType = getMimeType(Key);
  if (Key.includes('.html') && !Key.includes('index.html')) Key = Key.replace('.html', '');

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
