import Component from './client/Component.js';
import { routes, enableSPA } from './client/router.js';
import i18n from './client/i18n.js';
import { fetcher, createFetcher } from './client/fetcher.js';
import { Signal, effect } from './client/signal.js'

export {
  Component,
  routes,
  enableSPA,
  i18n,
  fetcher,
  createFetcher,
  Signal,
  effect
}
