import Component from './client/Component.js';
import { routes, enableSPA } from './client/router.js';
import i18n from './client/i18n.js';
import { fetcher, createFetcher } from './client/fetcher.js';
import { disableBindings } from './client/page-binding.js'

export {
  Component,
  routes,
  enableSPA,
  i18n,
  fetcher,
  createFetcher,
  disableBindings
}
