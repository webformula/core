import { registerPage, enableLinkIntercepts } from '@webformula/core/client';
enableLinkIntercepts();

import '@webformula/material/components/navigation';
import home from './pages/home/page.js';
import one from './pages/one/page.js';
import notFound from './pages/notfound/page.js';

registerPage(home, '/');
registerPage(one, '/one');
registerPage(notFound, '/notfound', {notFound: true});
