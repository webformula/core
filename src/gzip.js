import { gzip } from 'node:zlib'; 
import { promisify } from 'node:util';
import { readFile, writeFile } from 'node:fs/promises';

const asyncGzip = promisify(gzip);

export default async function gzipFile(file) {
  const result = await asyncGzip(await readFile(file));
  await writeFile(`${file}.gz`, result);
}

if (process.argv[2]) {
  await gzipFile(process.argv[2]);
  process.exit();
}
