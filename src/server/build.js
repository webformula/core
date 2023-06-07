import path from 'node:path';
import { readFile } from 'node:fs/promises';
import esbuild from 'esbuild';
import {
  isSourceMaps,
  isMinify,
  cssFilterRegex
} from '../vars.js';

const importRegex = /import(?<name>.+?)from(?<path>.+?)(;|\n)/g;
const routesRegex = /routes\s?\(\s?\[([\s\S]*.*)\]\s?\)/;
const routeConfigObjectRegex = /\{.*\}/g;
const routePathRegex = /path:\s?(.+?)\s?(,|\})/;
const routePageRegex = /page:\s?(.+?)\s?(,|\})/;
const routeNotFoundRegex = /notFound:\s?true\s?(,|\})/;
const singleQuoteReges = /'/g;
const quotedContentRegex = /"(.+)"/;

export default async function build(config) {
  const appFileContent = await readFile(config.appFilePath, 'utf-8');
  const appFileData = await parseAppFile(appFileContent);
  const bundle = await esbuild.build({
    entryPoints: [config.appFilePath, ...appFileData.pageModuleConfig.map(r => path.join(config.baseDir, r.pagePath))],
    bundle: true,
    write: false,
    splitting: true,
    outdir: 'temp',
    format: 'esm',
    target: 'esnext',
    plugins: [plugin({
      appFilePath: config.appFilePath,
      appFileContent: appFileData.content
    })],
    minify: isMinify,
    sourcemap: isSourceMaps,
    loader: { '.html': 'text' }
  });

  const outputFiles = bundle.outputFiles;
  if (config.hasAppCSS) {
    const bundleCSS = await esbuild.build({
      entryPoints: [path.join(config.baseDir, '/app.css')],
      bundle: true,
      write: false,
      outdir: 'temp',
      minify: isMinify,
      loader: { '.css': 'css' }
    });
    outputFiles.push(bundleCSS.outputFiles[0]);
  }

  return {
    outputFiles,
    pageModuleConfig: appFileData.pageModuleConfig,
    indexFileContent: await readFile(config.indexHTMLPath, 'utf-8')
  };
}


async function parseAppFile(appFile) {
  const pageModuleConfig = [];
  const importMatches = [...appFile.matchAll(importRegex)];
  // replace page property with import path
  appFile = appFile.replace(routesRegex, (_, content) => {
    const contentReplacement = content.replace(routeConfigObjectRegex, (objMatch) => {
      let pagePath;
      let pageModuleName;
      const replacement = objMatch.replace(routePageRegex, (_, name, end) => {
        const importMatch = importMatches.find(({ groups }) => groups.name.trim() === name);
        pagePath = removeQuotes(importMatch.groups.path);
        pageModuleName = name;
        return `page: '${pagePath}'${end}`
      });
      pageModuleConfig.push({
        path: removeQuotes(objMatch.match(routePathRegex)[1]),
        pagePath,
        notFound: objMatch.match(routeNotFoundRegex) !== null,
        pageModuleName
      });
      return replacement;
    });
    return `routes([${contentReplacement}]);`;
  });

  return {
    pageModuleConfig,
    content: appFile.replace(importRegex, (full, name) => {
      if (pageModuleConfig.find(v => v.pageModuleName === name.trim())) return '';
      return full;
    })
  };
}

function plugin({ appFilePath, appFileContent }) {
  return {
    name: 'plugins',
    setup(build) {
      build.onLoad({ filter: new RegExp(appFilePath) }, async () => ({ contents: appFileContent }));
      build.onLoad({ filter: cssFilterRegex }, async args => {
        const css = await readFile(args.path, 'utf8');
        const transformed = await esbuild.transform(css, { minify: true, loader: 'css' });
        const contents = `
        const styles = new CSSStyleSheet();
        styles.replaceSync(\`${transformed.code}\`);
        export default styles;`;
        return { contents };
      });
    }
  };
}

function removeQuotes(str) {
  return str.replace(singleQuoteReges, '"').match(quotedContentRegex)[1];
}
