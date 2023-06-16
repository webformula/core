import path from 'node:path';
import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';

export default async function copyFiles(config) {
  await Promise.all(config.copyFiles.map(async ({ from, to, transform, gzip }) => {
    const isGlob = from.includes('*');
    if (!isGlob) {
      const hasExtension = !!getExtension(to);
      if (!hasExtension) to = path.join(to, from.split('/').pop());

      // just copy
      if (typeof transform !== 'function') {
        await mkdir(to.split('/').slice(0, -1).join('/'), { recursive: true });
        await cp(from, to);
        if (gzip) await gzipFile(to);
        return
      }

      // transform and copy
      const content = await readFile(from, 'utf-8');
      const transformed = await transform({
        content,
        outputFileNames: getFilesNamesForTransform(config)
      });
      await mkdir(to.split('/').slice(0, -1).join('/'), { recursive: true });
      await writeFile(to, transformed);
      if (gzip) await gzipFile(to);
      return
    }

    // Glob copy
    const globBase = getGlobBase(from);
    const regex = globToRegex(from);
    try {
      const files = await listFiles(globBase);
      const filtered = files.filter(file => file.match(regex) !== null);

      // just copy
      if (typeof transform !== 'function') {
        await Promise.all(filtered.map(async filePath => {
          const witePath = path.join(to, filePath.split(globBase).pop());
          await mkdir(witePath.split('/').slice(0, -1).join('/'), { recursive: true });
          await cp(filePath, writePath);
          if (gzip) await gzipFile(writePath);
        }));
      }

      // transform and copy
      await Promise.all(filtered.map(async filePath => {
        const content = await readFile(filePath, 'utf-8');
        const transformed = await transform({
          content,
          outputFileNames: getFilesNamesForTransform(config)
        });
        const writePath = path.join(path.resolve('.'), to, filePath.split(globBase).pop());
        await mkdir(writePath.split('/').slice(0, -1).join('/'), { recursive: true });
        await writeFile(writePath, transformed);
        if (gzip) await gzipFile(to);
      }));
    } catch (e) {
      console.error(e);
    }
  }));
}

function getFilesNamesForTransform(config) {
  const js = getOutputAppJSFileName(config);
  const css = getOutputAppCSSFileName(config);
  const arr = [js];
  if (css) arr.push(css);
  return arr;
}

function getOutputAppJSFileName(config) {
  let name = config.appJSOutputFilePath.split('/').pop();
  if (!isDev && config.gzip) name += '.gz';
  return name;
}

function getOutputAppCSSFileName(config) {
  if (!config.hasAppCSS) return;
  let name = config.appCSSOutputFilePath.split('/').pop();
  if (!isDev && config.gzip) name += '.gz';
  return name;
}

function getExtension(url) {
  if (!url.includes('.')) return '';
  const split = url.split(/[#?]/)[0].split('.');
  let ext = split.pop().trim().toLowerCase();
  if (ext === 'gz') ext = split.pop();
  return ext;
}
