const {
  WEBFORMULA_DEV,
  WEBFORMULA_SOURCEMAPS,
  WEBFORMULA_MINIFY,
  WEBFORMULA_LIVERELOAD,
  WEBFORMULA_GZIP
} = process.env;

export const webformulaDev = WEBFORMULA_DEV === 'true' ? true : WEBFORMULA_DEV === 'false' ? false : undefined;
export const isDev = webformulaDev !== undefined ? webformulaDev : process.env.NODE_ENV !== 'production';
export const isSourceMaps = WEBFORMULA_SOURCEMAPS === 'false' ? false : isDev;
export const isMinify = WEBFORMULA_MINIFY === 'false' ? false : true;
export const isGzip = WEBFORMULA_GZIP === 'false' ? false : true;
export const isLiveReload = WEBFORMULA_LIVERELOAD === 'false' ? false : isDev;
export const cssFilterRegex = /\.css$/;
