import Component from './client/Component.js';
import { routes, enableSPA } from './client/router.js';
import i18n from './client/i18n.js';
import { fetcher, createFetcher } from './client/fetcher.js';
import { Signal, Compute, effect } from './client/signals.js'
import { html, setSecurityLevel } from './client/html.js'

export {
  Component,
  routes,
  enableSPA,
  i18n,
  fetcher,
  createFetcher,
  Signal,
  Compute,
  effect,
  html,
  setSecurityLevel
}


window.html = html;
