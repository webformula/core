 (() => new EventSource("/esbuild").onmessage = () => location.reload())();
(()=>{var hh=Object.defineProperty;var wh=(d,t,e)=>t in d?hh(d,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):d[t]=e;var g=(d,t,e)=>(wh(d,typeof t!="symbol"?t+"":t,e),e),sa=(d,t,e)=>{if(!t.has(d))throw TypeError("Cannot "+e)};var i=(d,t,e)=>(sa(d,t,"read from private field"),e?e.call(d):t.get(d)),n=(d,t,e)=>{if(t.has(d))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(d):t.set(d,e)},m=(d,t,e,o)=>(sa(d,t,"write to private field"),o?o.call(d,e):t.set(d,e),e);var l=(d,t,e)=>(sa(d,t,"access private method"),e);var Fd=new CSSStyleSheet;Fd.replaceSync(`/* hide while loading */
html:not(.mdw-initiated) body {
  opacity: 0;
  pointer-events: none;
}

/* Change theme by adding 'color-scheme: dark | light;' to the html element style */
/* By default it will use the system preference */


:root {
  --mdw-primary-baseline: #6750A4;
  --mdw-secondary-baseline: #625B71;
  --mdw-tertiary-baseline: #7D5260;
  --mdw-error-baseline: #B3261E;
  --mdw-neutral-baseline: #615d67;
  --mdw-neutral-variant-baseline: #59515e;

  /* You can add custom colors that will be parsed into tones
   *  Just create a new variable in this file beginning with --mdw-custom-color-
   *
   * --mdw-custom-color-name: #5b7166;
   *
   * Produces tone vars
   * --mdw-custom-color-name-0
   * --mdw-custom-color-name-10
   * --mdw-custom-color-name-20
   * --mdw-custom-color-name-30
   * --mdw-custom-color-name-40
   * --mdw-custom-color-name-50
   * --mdw-custom-color-name-60
   * --mdw-custom-color-name-70
   * --mdw-custom-color-name-80
   * --mdw-custom-color-name-90
   * --mdw-custom-color-name-95
   * --mdw-custom-color-name-99
   * --mdw-custom-color-name-100
   */


  /* --- Overrides ---
   *  By default these colors are filled out tones of the colors above
   *  You can override them here
   */

  --mdw-primary: var(--mdw-primary-40);
  --mdw-secondary: var(--mdw-secondary-40);
  --mdw-tertiary: var(--mdw-tertiary-40);
  --mdw-error: var(--mdw-error-40);
  --mdw-neutral: var(--mdw-neutral-40);
  --mdw-neutral-variant: var(--mdw-neutral-variant-40);
  --mdw-primary-container: var(--mdw-primary-90);
  --mdw-on-primary: var(--mdw-primary-100);
  --mdw-on-primary-container: var(--mdw-primary-10);
  --mdw-primary-inverse: var(--mdw-primary-80);
  --mdw-secondary-container: var(--mdw-secondary-90);
  --mdw-on-secondary: var(--mdw-secondary-100);
  --mdw-on-secondary-container: var(--mdw-secondary-10);
  --mdw-tertiary-container: var(--mdw-tertiary-90);
  --mdw-on-tertiary: var(--mdw-tertiary-100);
  --mdw-on-tertiary-container: var(--mdw-tertiary-10);
  --mdw-error-container: var(--mdw-error-90);
  --mdw-on-error: var(--mdw-error-100);
  --mdw-on-error-container: var(--mdw-error-10);
  --mdw-surface: var(--mdw-neutral-99);
  --mdw-surface-variant: var(--mdw-neutral-variant-90);
  --mdw-on-surface: var(--mdw-neutral-10);
  --mdw-on-surface-variant: var(--mdw-neutral-variant-30);
  --mdw-surface-tint: var(--mdw-primary-40);
  --mdw-surface-inverse: var(--mdw-neutral-20);
  --mdw-on-surface-inverse: var(--mdw-neutral-95);
  --mdw-background: var(--mdw-neutral-99);
  --mdw-on-background: var(--mdw-neutral-10);
  --mdw-outline: var(--mdw-neutral-variant-50);
  --mdw-outline-variant: var(--mdw-neutral-variant-80);
  --mdw-shadow: var(--mdw-neutral-0);
  --mdw-scrim: var(--mdw-neutral-0);


  --mdw-state-layer-opacity-hover: 0.08;
  --mdw-state-layer-opacity-focus: 0.12;
  --mdw-state-layer-opacity-pressed: 0.12;
  --mdw-state-layer-opacity-dragged: 0.16;
  --mdw-shape-no-rounding: 0;
  --mdw-shape-extra-small: 4px;
  --mdw-shape-extra-small-top: 4px 4px 0 0;
  --mdw-shape-small: 8px;
  --mdw-shape-medium: 12px;
  --mdw-shape-large: 16px;
  --mdw-shape-large-end: 0 16px 16px 0;
  --mdw-shape-large-top: 16px 16px 0 0;
  --mdw-shape-extra-large: 28px;
  --mdw-shape-extra-large-top: 28px 28px 0 0;
  --mdw-shape-full: 50%;
  --mdw-navigation-rail-width: 88px;
  --mdw-button-radius: 20px;
  --mdw-navigation-drawer-width: 360px;
  --mdw-card-group-columns: 4;
  --mdw-side-sheet-width: 296px;
  --mdw-transition-expand-in: cubic-bezier(.13, 1.02, .25, .95);
  --mdw-transition-expand-out: cubic-bezier(0.550, 0.085, 0.680, 0.530);
  --mdw-transition-bounce: cubic-bezier(.47, 1.64, .41, .8);
  --mdw-bottom-sheet-initial-position: 40%;
  --mdw-bottom-sheet-minimized-position: 64px;


  /* --- font sizes scale with html.style.fontSize. base is 16px = 1rem */

  --mdw-font-icon-size-small: 1.25rem;
  --mdw-font-icon-size-medium: 1.5rem;
  --mdw-font-icon-size-large: 2.25rem;
  --mdw-font-icon-size-extra-large: 3rem;

  --mdw-font-display-size-large: 3.562rem;
  --mdw-font-display-line-height-large: 4rem;
  --mdw-font-display-weight-large: 400;
  --mdw-font-display-letter-spacing-large: -0.016rem;
  --mdw-font-display-size-medium: 2.812rem;
  --mdw-font-display-line-height-medium: 3.25rem;
  --mdw-font-display-weight-medium: 400;
  --mdw-font-display-letter-spacing-medium: 0rem;
  --mdw-font-display-size-small: 2.25rem;
  --mdw-font-display-line-height-small: 2.75rem;
  --mdw-font-display-weight-small: 475;
  --mdw-font-display-letter-spacing-small: 0rem;

  --mdw-font-headline-size-large: 2rem;
  --mdw-font-headline-line-height-large: 2.5rem;
  --mdw-font-headline-weight-large: 400;
  --mdw-font-headline-letter-spacing-large: 0rem;
  --mdw-font-headline-size-medium: 1.75rem;
  --mdw-font-headline-line-height-medium: 2.25rem;
  --mdw-font-headline-weight-medium: 400;
  --mdw-font-headline-letter-spacing-medium: 0rem;
  --mdw-font-headline-size-small: 1.5rem;
  --mdw-font-headline-line-height-small: 2rem;
  --mdw-font-headline-weight-small: 400;
  --mdw-font-headline-letter-spacing-small: 0rem;

  --mdw-font-title-size-large: 1.375rem;
  --mdw-font-title-line-height-large: 1.75rem;
  --mdw-font-title-weight-large: 400;
  --mdw-font-title-letter-spacing-large: 0rem;
  --mdw-font-title-size-medium: 1rem;
  --mdw-font-title-line-height-medium: 1.5rem;
  --mdw-font-title-weight-medium: 500;
  --mdw-font-title-letter-spacing-medium: 0.009rem;
  --mdw-font-title-size-small: 0.875rem;
  --mdw-font-title-line-height-small: 1.25rem;
  --mdw-font-title-weight-small: 500;
  --mdw-font-title-letter-spacing-small: 0.006rem;

  --mdw-font-label-size-large: 0.875rem;
  --mdw-font-label-line-height-large: 1.25rem;
  --mdw-font-label-weight-large: 500;
  --mdw-font-label-letter-spacing-large: 0.006rem;
  --mdw-font-label-size-medium: 0.75rem;
  --mdw-font-label-line-height-medium: 1rem;
  --mdw-font-label-weight-medium: 500;
  --mdw-font-label-letter-spacing-medium: 0.031rem;
  --mdw-font-label-size-small: 0.688rem;
  --mdw-font-label-line-height-small: 0.75rem;
  --mdw-font-label-weight-small: 500;
  --mdw-font-label-letter-spacing-small: 0.031rem;

  --mdw-font-body-size-large: 1rem;
  --mdw-font-body-line-height-large: 1.5rem;
  --mdw-font-body-weight-large: 400;
  --mdw-font-body-letter-spacing-large: 0.031rem;
  --mdw-font-body-size-medium: 0.875rem;
  --mdw-font-body-line-height-medium: 1.25rem;
  --mdw-font-body-weight-medium: 400;
  --mdw-font-body-letter-spacing-medium: 0.016rem;
  --mdw-font-body-size-small: 0.75rem;
  --mdw-font-body-line-height-small: 1rem;
  --mdw-font-body-weight-small: 400;
  --mdw-font-body-letter-spacing-small: 0.025rem;
}



/* you can use system preference for dark, but this is not fully implemented yet. https: //developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme */
/*   Currently this feature is polyfilled and should work as expected */
/*   All you need to do is add 'color-scheme: dark | light;' to the html element style */
/* @media (prefers-color-scheme: dark) {
  :root {
  }
} */

:root.mdw-theme-dark {
  /* --- Overrides ---
   *  By default these colors are filled out tones of the colors above
   *  You can override them here
   */

  --mdw-primary: var(--mdw-primary-80);
  --mdw-secondary: var(--mdw-secondary-80);
  --mdw-tertiary: var(--mdw-tertiary-80);
  --mdw-error: var(--mdw-error-80);
  --mdw-neutral: var(--mdw-neutral-80);
  --mdw-neutral-variant: var(--mdw-neutral-variant-80);
  --mdw-primary-container: var(--mdw-primary-30);
  --mdw-on-primary: var(--mdw-primary-20);
  --mdw-on-primary-container: var(--mdw-primary-90);
  --mdw-primary-inverse: var(--mdw-primary-40);
  --mdw-secondary-container: var(--mdw-secondary-30);
  --mdw-on-secondary: var(--mdw-secondary-20);
  --mdw-on-secondary-container: var(--mdw-secondary-90);
  --mdw-tertiary-container: var(--mdw-tertiary-30);
  --mdw-on-tertiary: var(--mdw-tertiary-20);
  --mdw-on-tertiary-container: var(--mdw-tertiary-90);
  --mdw-error-container: var(--mdw-error-30);
  --mdw-on-error: var(--mdw-error-20);
  --mdw-on-error-container: var(--mdw-error-90);
  --mdw-surface: var(--mdw-neutral-10);
  --mdw-surface-variant: var(--mdw-neutral-variant-30);
  --mdw-on-surface: var(--mdw-neutral-90);
  --mdw-on-surface-variant: var(--mdw-neutral-variant-80);
  --mdw-surface-tint: var(--mdw-primary-80);
  --mdw-surface-inverse: var(--mdw-neutral-90);
  --mdw-on-surface-inverse: var(--mdw-neutral-20);
  --mdw-background: var(--mdw-neutral-10);
  --mdw-on-background: var(--mdw-neutral-90);
  --mdw-outline: var(--mdw-neutral-variant-60);
  --mdw-outline-variant: var(--mdw-neutral-variant-30);
  --mdw-shadow: var(--mdw-neutral-0);
  --mdw-scrim: var(--mdw-neutral-0);
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Fd];var Od=new CSSStyleSheet;Od.replaceSync(`/* Dracula Theme v1.2.5
 *
 * https://github.com/dracula/highlightjs
 *
 * Copyright 2016-present, All rights reserved
 *
 * Code licensed under the MIT license
 *
 * @author Denis Ciccale <dciccale@gmail.com>
 * @author Zeno Rocha <hi@zenorocha.com>
 */

 code {
  font-weight: bold;
  padding: 0.5em;
 }

.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #422d4a;
}

.hljs-built_in,
.hljs-selector-tag,
.hljs-section,
.hljs-link {
  color: #8be9fd;
}

.hljs-keyword {
  color: #ff79c6;
}

.hljs,
.hljs-subst {
  color: #f8f8f2;
}

.hljs-title,
.hljs-attr,
.hljs-meta-keyword {
  font-style: italic;
  color: #50fa7b;
}

.hljs-tag,
.hljs-string,
.hljs-meta,
.hljs-name,
.hljs-type,
.hljs-symbol,
.hljs-bullet,
.hljs-addition,
.hljs-variable,
.hljs-template-tag,
.hljs-template-variable {
  color: #f1fa8c;
}

.hljs-comment,
.hljs-quote,
.hljs-deletion {
  color: #6272a4;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-title,
.hljs-section,
.hljs-doctag,
.hljs-type,
.hljs-name,
.hljs-strong {
  font-weight: bold;
}

.hljs-literal,
.hljs-number {
  color: #bd93f9;
}

.hljs-emphasis {
  font-style: italic;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Od];var Nd=new CSSStyleSheet;Nd.replaceSync(`html {
  color-scheme: light;
  overflow-x: hidden;
  overflow-y: auto;
}

body page-content {
  padding: 24px !important;
}

ul {
  list-style: none;
}

ul li::before {
  content: "";
  color: rgb(41, 41, 41);
  font-weight: bold;
  width: 24px;
  margin-left: -24px;
}

section {
  display: inline-flex;
  flex-direction: column;
}

pre {
  display: contents;
  margin: 0;
}

mdw-card > pre:first-of-type > code {
  margin-top: 8px;
}

pre > code {
  width: calc(100% - 16px);
}

mdw-card > pre:last-of-type > code {
  border-radius: 0 0 var(--mdw-shape-medium) var(--mdw-shape-medium);
}

mdw-card .example {
  margin-top: 18px;
}

.links {
  display: flex;
  flex-direction: column;
}

ul.links {
  margin-top: 12px;
  padding-left: 32px;
}

.links a {
  width: 0;
  white-space: nowrap;
}

mdw-card .mdw-card-content {
  padding: 24px !important;
}

mdw-card.header-card {
  margin-top: 16px;
  margin-bottom: 48px;
  padding-bottom: 8px;
  box-shadow: none;
}

mdw-card.header-card > .mdw-headline {
  font-size: 32px;
}

mdw-card > .mdw-card-content > .mdw-headline + .mdw-subheader {
  margin-top: 2px;
}

page-content > section > mdw-card {
  margin-bottom: 36px;
}


.code-collapse-top code {
  margin-top: 0;
  padding-top: 0;
}

.code-collapse-top code::before {
  content: '';
  display: block;
  height: 0;
  width: 0;
  margin-top: -20px;
}

.code-collapse-bottom code {
  margin-bottom: 0;
  padding-bottom: 0;
}

.code-collapse-bottom code::before {
  content: '';
  display: block;
  height: 0;
  width: 0;
  margin-bottom: -20px;
}

.code-collapse code {
  margin-top: 0;
  padding-top: 0;

  margin-bottom: 0;
  padding-bottom: 0;
}

.code-collapse code::before {
  content: '';
  display: block;
  height: 0;
  width: 0;
  margin-top: -20px;
  margin-bottom: -20px;
}


.mdw-supporting-text + .example {
  margin-top: 32px;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Nd];var na=new CSSStyleSheet;na.replaceSync(`html {
  font-family: 'Roboto Flex', Roboto, sans-serif;
  font-size: 16px;
  height: 100%;
  background-color: var(--mdw-background);
}

input {
  font-family: 'Roboto Flex', Roboto, sans-serif;
}

body {
  display: block;
  height: 100%;
  width: 100%;
  margin: 0;

  background-color: var(--mdw-background);
  color: var(--mdw-on-background);
}

body page-content {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 100%;
  padding: 0 12px;
}

.mdw-text-length {
  position: fixed;
  opacity: 0;
  user-select: none;
  pointer-events: none;
}

.mdw-icon-svg {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.mdw-icon-svg > svg {
  fill: var(--mdw-on-surface);
}

mdw-snackbar .mdw-icon-svg > svg {
  fill: var(--mdw-primary-container);
}

mdw-divider {
  border-bottom: 1px solid var(--mdw-outline-variant);
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,na];var Hd=na;var ra=new CSSStyleSheet;ra.replaceSync(`h1,
.mdw-font-display-large {
  font-size: var(--mdw-font-display-size-large);
  line-height: var(--mdw-font-display-line-height-large);
  font-weight: var(--mdw-font-display-weight-large);
  letter-spacing: var(--mdw-font-display-letter-spacing-large);
}

h2,
.mdw-font-display-medium {
  font-size: var(--mdw-font-display-size-medium);
  line-height: var(--mdw-font-display-line-height-medium);
  font-weight: var(--mdw-font-display-weight-medium);
  letter-spacing: var(--mdw-font-display-letter-spacing-medium);
}

h3,
.mdw-font-display-small {
  font-size: var(--mdw-font-display-size-small);
  line-height: var(--mdw-font-display-line-height-small);
  font-weight: var(--mdw-font-display-weight-small);
  letter-spacing: var(--mdw-font-display-letter-spacing-small);
}

h4,
.mdw-font-headline-large {
  font-size: var(--mdw-font-headline-size-large);
  line-height: var(--mdw-font-headline-line-height-large);
  font-weight: var(--mdw-font-headline-weight-large);
  letter-spacing: var(--mdw-font-headline-letter-spacing-large);
}

h5,
.mdw-font-headline-medium {
  font-size: var(--mdw-font-headline-size-medium);
  line-height: var(--mdw-font-headline-line-height-medium);
  font-weight: var(--mdw-font-headline-weight-medium);
  letter-spacing: var(--mdw-font-headline-letter-spacing-medium);
}

h6,
.mdw-font-headline-small {
  font-size: var(--mdw-font-headline-size-small);
  line-height: var(--mdw-font-headline-line-height-small);
  font-weight: var(--mdw-font-headline-weight-small);
  letter-spacing: var(--mdw-font-headline-letter-spacing-small);
}

.mdw-font-title-large {
  font-size: var(--mdw-font-title-size-large);
  line-height: var(--mdw-font-title-line-height-large);
  font-weight: var(--mdw-font-title-weight-large);
  letter-spacing: var(--mdw-font-title-letter-spacing-large);
}

.mdw-font-title-medium {
  font-size: var(--mdw-font-title-size-medium);
  line-height: var(--mdw-font-title-line-height-medium);
  font-weight: var(--mdw-font-title-weight-medium);
  letter-spacing: var(--mdw-font-title-letter-spacing-medium);
}

.mdw-font-title-small {
  font-size: var(--mdw-font-title-size-small);
  line-height: var(--mdw-font-title-line-height-small);
  font-weight: var(--mdw-font-title-weight-small);
  letter-spacing: var(--mdw-font-title-letter-spacing-small);
}

.mdw-font-label-large {
  font-size: var(--mdw-font-label-size-large);
  line-height: var(--mdw-font-label-line-height-large);
  font-weight: var(--mdw-font-label-weight-large);
  letter-spacing: var(--mdw-font-label-letter-spacing-large);
}

.mdw-font-label-medium {
  font-size: var(--mdw-font-label-size-medium);
  line-height: var(--mdw-font-label-line-height-medium);
  font-weight: var(--mdw-font-label-weight-medium);
  letter-spacing: var(--mdw-font-label-letter-spacing-medium);
}

.mdw-font-label-small {
  font-size: var(--mdw-font-label-size-small);
  line-height: var(--mdw-font-label-line-height-small);
  font-weight: var(--mdw-font-label-weight-small);
  letter-spacing: var(--mdw-font-label-letter-spacing-small);
}

.mdw-font-body-large {
  font-size: var(--mdw-font-body-size-large);
  line-height: var(--mdw-font-body-line-height-large);
  font-weight: var(--mdw-font-body-weight-large);
  letter-spacing: var(--mdw-font-body-letter-spacing-large);
}

p,
.mdw-font-body-medium {
  font-size: var(--mdw-font-body-size-medium);
  line-height: var(--mdw-font-body-line-height-medium);
  font-weight: var(--mdw-font-body-weight-medium);
  letter-spacing: var(--mdw-font-body-letter-spacing-medium);
}

.mdw-font-body-small {
  font-size: var(--mdw-font-body-size-small);
  line-height: var(--mdw-font-body-line-height-small);
  font-weight: var(--mdw-font-body-weight-small);
  letter-spacing: var(--mdw-font-body-letter-spacing-small);
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,ra];var Vd=ra;var aa=new CSSStyleSheet;aa.replaceSync(`/* https://www.joshwcomeau.com/shadow-palette/ */
:root {
  --mdw-elevation-1: 0px 0.3px 3px rgba(0, 0, 0, 0.1),
    0px 1px 1.2px -0.7px rgba(0, 0, 0, 0.1),
    0px 2.4px 2.9px -1.3px rgba(0, 0, 0, 0.1),
    0.1px 5.6px 6.7px -2px rgba(0, 0, 0, 0.1);
  --mdw-elevation-tint-1: var(--mdw-surface-tint-alpha-5);

  --mdw-elevation-2: 0px 0.6px 6px rgba(0, 0, 0, 0.1),
    0px 2.1px 2.5px -0.7px rgba(0, 0, 0, 0.1),
    0px 5px 6px -1.3px rgba(0, 0, 0, 0.1),
    0.1px 11.7px 14px -2px rgba(0, 0, 0, 0.1);
  --mdw-elevation-tint-2: var(--mdw-surface-tint-alpha-8);

  --mdw-elevation-3: 0px 0.9px 9px rgba(0, 0, 0, 0.1),
    0px 3.1px 3.5px -0.7px rgba(0, 0, 0, 0.1),
    0px 7.5px 9px -1.3px rgba(0, 0, 0, 0.1),
    0.1px 15px 20px -2px rgba(0, 0, 0, 0.1);
  --mdw-elevation-tint-3: var(--mdw-surface-tint-alpha-11);

  --mdw-elevation-4: 0px 0.9px 9px rgba(0, 0, 0, 0.15),
    0px 3.1px 3.5px -0.7px rgba(0, 0, 0, 0.15),
    0px 7.5px 9px -1.3px rgba(0, 0, 0, 0.15),
    0.1px 15px 20px -2px rgba(0, 0, 0, 0.15);
  --mdw-elevation-tint-4: var(--mdw-surface-tint-alpha-12);
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,aa];var Yd=aa;var da=new CSSStyleSheet;da.replaceSync(`body.mdw-navigation-state-open page-content {
  margin-left: var(--mdw-navigation-drawer-width);
  transition: margin-left 180ms;
  transition-timing-function: var(--mdw-transition-expand-in);
}

body.mdw-navigation-state-hide page-content {
  margin-left: 0;
  transition: margin-left 180ms;
  transition-timing-function: var(--mdw-transition-expand-out);
}

body.mdw-navigation-state-rail page-content {
  margin-left: var(--mdw-navigation-rail-width);
  transition: margin-left 180ms;
  transition-timing-function: var(--mdw-transition-expand-in);
}


/* TODO confirm we do not want to allow a global main side sheet */

/* body.mdw-side-sheet-state-open.mdw-side-sheet-connect-page-content page-content {
  margin-right: var(--mdw-side-sheet-width);
  transition: margin-right 180ms;
  transition-timing-function: var(--mdw-transition-expand-in);
}

body.mdw-side-sheet-state-hide.mdw-side-sheet-connect-page-content page-content {
  margin-right: 0;
  transition: margin-right 180ms;
  transition-timing-function: var(--mdw-transition-expand-out);
}

body.mdw-navigation-state-open.mdw-side-sheet-state-open.mdw-side-sheet-connect-page-content page-content {
  margin-left: var(--mdw-navigation-drawer-width);
  margin-right: var(--mdw-side-sheet-width);
  transition: margin-left 180ms, margin-right 180ms;
  transition-timing-function: var(--mdw-transition-expand-in);
}

body.mdw-navigation-state-hide.mdw-side-sheet-state-hide.mdw-side-sheet-connect-page-content page-content {
  margin-left: 0;
  margin-right: 0;
  transition: margin-left 180ms, margin-right 180ms;
  transition-timing-function: var(--mdw-transition-expand-out);
}

body.mdw-navigation-state-open.mdw-side-sheet-state-hide.mdw-side-sheet-connect-page-content page-content {
  margin-left: var(--mdw-navigation-drawer-width);
  margin-right: 0;
  transition: margin-left 180ms, margin-right 180ms;
  transition-timing-function: var(--mdw-transition-expand-in), var(--mdw-transition-expand-out);
}

body.mdw-navigation-state-rail.mdw-side-sheet-state-open.mdw-side-sheet-connect-page-content page-content {
  margin-left: var(--mdw-navigation-rail-width);
  margin-right: var(--mdw-side-sheet-width);
  transition: margin-left 180ms, margin-right 180ms;
  transition-timing-function: var(--mdw-transition-expand-in);
}

body.mdw-navigation-state-rail.mdw-side-sheet-state-hide.mdw-side-sheet-connect-page-content page-content {
  margin-left: var(--mdw-navigation-rail-width);
  margin-right: 0;
  transition: margin-left 180ms, margin-right 180ms;
  transition-timing-function: var(--mdw-transition-expand-in), var(--mdw-transition-expand-out);
}

body.mdw-navigation-state-hide.mdw-side-sheet-state-open.mdw-side-sheet-connect-page-content page-content {
  margin-left: 0;
  margin-right: var(--mdw-side-sheet-width);
  transition: margin-left 180ms, margin-right 180ms;
  transition-timing-function: var(--mdw-transition-expand-out), var(--mdw-transition-expand-in);
} */



body.mdw-navigation-no-animation mdw-top-app-bar,
body.mdw-navigation-no-animation page-content,
body.mdw-side-sheet-no-animation page-content {
  transition: none !important;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,da];var jd=da;var la=new CSSStyleSheet;la.replaceSync(`a {
  position: relative;
  border: none;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;

  font-size: var(--mdw-font-label-size-large);
  font-weight: var(--mdw-font-label-weight-large);
  letter-spacing: var(--mdw-font-label-letter-spacing-large);
  line-height: var(--mdw-font-label-line-height-large);
  color: var(--mdw-primary);
}

a:-webkit-any-link:active {
  color: inherit;
}

a:focus {
  opacity: var(--mdw-state-layer-opacity-focus);
  background-color: var(--mdw-on-surface);
}


a::after {
  position: absolute;
  content: "";
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  border-radius: inherit;
}

@media (hover: hover) {
  a:hover::after {
    /* opacity: var(--mdw-state-layer-opacity-hover); */
    background-color: var(--mdw-primary);
    mix-blend-mode: color;
  }
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,la];var Wd=la;var Bd=["--mdw-primary-baseline","--mdw-secondary-baseline","--mdw-tertiary-baseline","--mdw-error-baseline","--mdw-neutral-baseline","--mdw-neutral-variant-baseline"],Gd=/^\s?#/;function es(){let d=getComputedStyle(document.body),t=localStorage.getItem("mdw-color-scheme"),e=!1;if(["light","dark"].includes(t))e=t==="dark",document.documentElement.classList.toggle("mdw-theme-dark",e);else if(!document.documentElement.classList.contains("mdw-theme-dark")){let s=d.colorScheme;e=window.matchMedia("(prefers-color-scheme: dark)").matches===!0&&s!=="light",document.documentElement.classList.toggle("mdw-theme-dark",e)}ph(d,e),[...document.styleSheets,...document.adoptedStyleSheets].filter(s=>s.href===null||s.href.startsWith(window.location.origin)).flatMap(s=>[...s.cssRules].filter(r=>r.selectorText===":root"||e&&r.selectorText===":root.mdw-theme-dark").flatMap(r=>[...r.styleMap].map(a=>({name:a[0],value:d.getPropertyValue(a[0])})).filter(a=>a.name.startsWith("--")&&!Bd.includes(a.name)&&a.value.match(Gd)))).forEach(({name:s,value:r})=>{document.documentElement.style.setProperty(`${s}-alpha-0`,`${r}00`),document.documentElement.style.setProperty(`${s}-alpha-4`,`${r}0a`),document.documentElement.style.setProperty(`${s}-alpha-5`,`${r}0d`),document.documentElement.style.setProperty(`${s}-alpha-6`,`${r}0f`),document.documentElement.style.setProperty(`${s}-alpha-8`,`${r}14`),document.documentElement.style.setProperty(`${s}-alpha-10`,`${r}1a`),document.documentElement.style.setProperty(`${s}-alpha-11`,`${r}1c`),document.documentElement.style.setProperty(`${s}-alpha-12`,`${r}1f`),document.documentElement.style.setProperty(`${s}-alpha-16`,`${r}29`),document.documentElement.style.setProperty(`${s}-alpha-20`,`${r}33`),document.documentElement.style.setProperty(`${s}-alpha-26`,`${r}42`),document.documentElement.style.setProperty(`${s}-alpha-38`,`${r}61`),document.documentElement.style.setProperty(`${s}-alpha-60`,`${r}99`),document.documentElement.style.setProperty(`${s}-alpha-76`,`${r}c2`)})}function ph(d,t){[...document.styleSheets,...document.adoptedStyleSheets].filter(o=>o.href===null||o.href.startsWith(window.location.origin)).flatMap(o=>[...o.cssRules].filter(s=>s.selectorText===":root"||t&&s.selectorText===":root.mdw-theme-dark").flatMap(s=>[...s.styleMap].map(r=>({name:r[0],value:d.getPropertyValue(r[0])})).filter(r=>(Bd.includes(r.name)||r.name.startsWith("--mdw-custom-color-"))&&r.value.match(Gd)))).forEach(({name:o,value:s})=>{let r=uh(s);o=o.replace("-baseline",""),document.documentElement.style.setProperty(`${o}-0`,r[0]),document.documentElement.style.setProperty(`${o}-10`,r[1]),document.documentElement.style.setProperty(`${o}-20`,r[2]),document.documentElement.style.setProperty(`${o}-30`,r[3]),document.documentElement.style.setProperty(`${o}-40`,r[4]),document.documentElement.style.setProperty(`${o}-50`,r[5]),document.documentElement.style.setProperty(`${o}-60`,r[6]),document.documentElement.style.setProperty(`${o}-70`,r[7]),document.documentElement.style.setProperty(`${o}-80`,r[8]),document.documentElement.style.setProperty(`${o}-90`,r[9]),document.documentElement.style.setProperty(`${o}-95`,r[10]),document.documentElement.style.setProperty(`${o}-99`,r[11]),document.documentElement.style.setProperty(`${o}-100`,r[12])})}function uh(d){let[t,e,o]=gh(d);return["#000000",wt([t+4,D(e-30),D(o+30)]),wt([t+2,D(e-18),D(o+20)]),wt([t+1,D(e-10),D(o+10)]),d,wt([t,D(e+9),D(o-10)]),wt([t+1,D(e+22),D(o-20)]),wt([t+2,D(e+34),D(o-30)]),wt([t+3,D(e+42),D(o-40)]),wt([t+4,D(e+52),D(o-54)]),wt([t+8,D(e+59),D(o-60)]),wt([t+10,D(e+62),D(o-70)]),"#ffffff"]}function D(d){return d<0&&(d=0),d}function wt(d){let t=d[0]/360,e=d[1]/100,o=d[2]/100,s=e+o,r,a,h,u;s>1&&(e/=s,o/=s),r=Math.floor(6*t),a=1-o,h=6*t-r,r&1&&(h=1-h),u=e+h*(a-e);let b,f,k;switch(r){default:case 6:case 0:b=a,f=u,k=e;break;case 1:b=u,f=a,k=e;break;case 2:b=e,f=a,k=u;break;case 3:b=e,f=u,k=a;break;case 4:b=u,f=e,k=a;break;case 5:b=a,f=e,k=u;break}return"#"+[Math.round(b*255),Math.round(f*255),Math.round(k*255)].map(_=>{let it=parseInt(_).toString(16);return it.length===1?"0"+it:it}).join("")}function gh(d){d=d.trim(),d[0]==="#"&&(d=d.slice(1));let t=parseInt(d,16),e=t>>16&255,o=t>>8&255,s=t&255,r=Math.max(e,o,s),a=Math.min(e,o,s);if(r===a)return[0,100*a/255,100-100*r/255];let h=0;switch(r){case e:h=(o-s)/(r-a)+0;break;case o:h=(s-e)/(r-a)+2;break;case s:h=(e-o)/(r-a)+4;break}return[360*((h+6)%6/6),100*a/255,100-100*r/255]}var Zd=document.createTextNode(""),xi=[],ma=!1,fh=()=>{for(;xi.length;)xi.pop()();Ud.disconnect(),ma=!1},Ud=new MutationObserver(fh),Xd=new class{#t=0;#i=0;#e=document.createElement("div");#o;#s;#l=[];#c;#n;#a=!1;#d;#m=[];#r=!1;#w;#u=this.rafThrottle(this.#b).bind(this);constructor(){this.#e.classList.add("mdw-text-length"),document.body.insertAdjacentElement("beforeend",this.#e)}uid(){return this.#t+=1,this.#t}async nextAnimationFrameAsync(){return new Promise(t=>{requestAnimationFrame(()=>{setTimeout(t,0)})})}async animationendAsync(t){return new Promise(e=>{t.addEventListener("animationend",function o(){t.removeEventListener("animationend",o),e()})})}async transitionendAsync(t){return new Promise(e=>{t.addEventListener("transitionend",function o(){t.removeEventListener("transitionend",o),e()})})}getTextFromNode(t){let e,o=!1;return[...t.childNodes].filter(r=>{let a=r.nodeType===3;return o&&!e?e=r:a&&r.textContent.trim()&&(o=!0),a}).map(r=>r.textContent.trim()).join("").trim()}getTextWidth(t){let e=window.getComputedStyle(t);return this.#e.style.fontSize=e.getPropertyValue("font-size"),this.#e.style.fontWeight=e.getPropertyValue("font-weight"),this.#e.style.linHeight=e.getPropertyValue("line-height"),this.#e.style.letterSpacing=e.getPropertyValue("letter-spacing"),this.#e.innerText=this.getTextFromNode(t),this.#e.offsetWidth}getTextWidthFromInput(t){if(!t||t.nodeName!=="INPUT")throw Error("requires input element");let e=window.getComputedStyle(t);return this.#e.style.fontSize=e.getPropertyValue("font-size"),this.#e.style.fontWeight=e.getPropertyValue("font-weight"),this.#e.style.linHeight=e.getPropertyValue("line-height"),this.#e.style.letterSpacing=e.getPropertyValue("letter-spacing"),this.#e.innerText=t.value,this.#e.offsetWidth}nextTick(t){return xi.push(t),ma===!1&&(Ud.observe(Zd,{characterData:!0}),ma=!0,Zd.data=this.#i++),t}clearNextTick(t){xi.splice(xi.indexOf(t),1)}async wait(t=100){return new Promise(e=>{setTimeout(e,t)})}throttle(t,e=200){let o;return function(){let r=arguments,a=this;o||(o=!0,t.apply(a,r),setTimeout(()=>{o=!1},e))}}debounce(t,e){let o;return function(){let r=arguments,a=this;clearTimeout(o),o=setTimeout(()=>{o=void 0,t.apply(a,r)},e||10)}}rafThrottle(t){let e;return function(){let s=arguments,r=this;e||(e=!0,t.apply(r,s),requestAnimationFrame(()=>{e=!1}))}}trackPageScroll(t=()=>{}){this.#o||(this.#o=document.documentElement),this.#l.length===0&&(this.#s=this.#o.scrollTop,window.addEventListener("scroll",this.#u)),this.#l.push(t)}untrackPageScroll(t=()=>{}){this.#l=this.#l.filter(e=>e!==t),this.#l.length===0&&window.removeEventListener("scroll",this.#u)}fuzzySearch(t,e=[],o=2){if(e=e.filter(a=>!!a),e.length===0)return[];let s=typeof e[0];if(!["string","object"].includes(s))throw Error("Incorrect items array");if(s==="object"&&typeof e[0].label!="string")throw Error("Items array with objects must contain a label property that is a string");return t=t.toLowerCase().trim(),e.map(a=>{let h;return s=="object"?h=a.label:h=a,{label:h,distance:this.#g(t,h.toLowerCase().trim()),item:a}}).filter(({distance:a})=>a<=o).sort((a,h)=>a.distance-h.distance).map(({item:a})=>a)}lockPageScroll(){if(this.#a===!0)return;this.#a=!0;let t=document.documentElement;return this.#d=t.scrollTop,t.style.overflow="hidden",t.style.position="relative",t.style.touchAction="none",this.#d}unlockPageScroll(){if(this.#a===!1)return;this.#a=!1;let t=document.documentElement;t.style.overflow="",t.style.position="",t.style.touchAction="",t.scrollTop=this.#d}#p=[];addClickTimeout(t,e,o=200){let s,r;function a(u){r=u.target,s=setTimeout(()=>{t.removeEventListener("mouseup",h)},o),t.addEventListener("mouseup",h)}function h(u){t.removeEventListener("mouseup",h),clearTimeout(s),r===u.target&&e(u)}t.addEventListener("mousedown",a),this.#p.push({element:t,removeClickTimeout(){t.removeEventListener("mousedown",a),t.removeEventListener("mouseup",h)}})}removeClickTimeout(t){this.#p=this.#p.filter(e=>e.element===t?(e.removeClickTimeout(),!1):!0)}toggleColorScheme(t){let e=["dark","light"].includes(t)?t==="dark":!document.documentElement.classList.contains("mdw-theme-dark");return document.documentElement.classList.toggle("mdw-theme-dark",e),es(),e?"dark":"light"}registerStyleSheet(t){if(t=[].concat(t).filter(e=>!this.#m.includes(e)),t.length!==0){if(this.#m=this.#m.concat(t),this.#r!==!0)return this.#h();Array.isArray(t)?document.adoptedStyleSheets=[...document.adoptedStyleSheets,...t]:document.adoptedStyleSheets=[...document.adoptedStyleSheets,t]}}#h(){this.clearNextTick(this.#w),this.#w=this.nextTick(()=>{this.#w=void 0,this.#r=!0,document.adoptedStyleSheets=[...document.adoptedStyleSheets,...this.#m],document.querySelector("html").classList.add("mdw-initiated")})}#g(t,e){let o=new RegExp(`^${t}`,"i"),s=e.match(o)!==null,r=this.#f(t,e);return s?r-2:r}#f(t,e){if(!t.length)return e.length;if(!e.length)return t.length;let o=[];for(let s=0;s<=e.length;s++){o[s]=[s];for(let r=1;r<=t.length;r++)o[s][r]=s===0?r:Math.min(o[s-1][r]+1,o[s][r-1]+1,o[s-1][r-1]+(t[r-1]===e[s-1]?0:1))}return o[e.length][t.length]}#b(t){let e=this.#o.scrollTop-this.#s;if(e===0)return;let o=this.#o.scrollTop>=this.#s?-1:1;o!==this.#c&&(this.#n=0),this.#c=o,this.#n+=e,this.#s=this.#o.scrollTop,this.#l.forEach(s=>s({event:t,isScrolled:this.#o.scrollTop>0,scrollTop:this.#o.scrollTop,direction:o,distance:e,distanceFromDirectionChange:this.#n||0}))}};window.mdwUtil=Xd;var w=Xd;w.registerStyleSheet([Hd,Vd,Yd,jd,Wd]);es();var is={},xe,ki,Wt,os,Bt,Gt,ss,Kd,p=class extends HTMLElement{constructor(){super();n(this,ss);g(this,"useShadowRoot",!1);g(this,"useTemplate",!0);n(this,xe,!1);n(this,ki,void 0);n(this,Wt,void 0);n(this,os,!this.template.toString().replace(/\n|\s|\;/g,"").includes('template(){return""}'));n(this,Bt,this);n(this,Gt,bh(this.constructor.toString()));i(this,os)&&w.nextTick(()=>{l(this,ss,Kd).call(this),this.render()})}static registerGlobalStyleSheet(e){w.registerStyleSheet(e)}get rendered(){return i(this,xe)}connectedCallback(){}disconnectedCallback(){}beforeRender(){}afterRender(){}template(){return""}render(){i(this,xe)&&this.beforeRender(),this.useTemplate||(i(this,Wt).innerHTML=this.template()),i(this,Bt).replaceChildren(i(this,Wt).content.cloneNode(!0)),m(this,xe,!0),this.afterRender()}escape(e){return e.replace(/[^\w. ]/gi,function(o){return"&#"+o.charCodeAt(0)+";"})}};xe=new WeakMap,ki=new WeakMap,Wt=new WeakMap,os=new WeakMap,Bt=new WeakMap,Gt=new WeakMap,ss=new WeakSet,Kd=function(){m(this,ki,this.template()),this.useTemplate?(is[i(this,Gt)]||(is[i(this,Gt)]=document.createElement("template"),is[i(this,Gt)].innerHTML=i(this,ki)),m(this,Wt,is[i(this,Gt)])):m(this,Wt,document.createElement("template")),this.useShadowRoot?(this.attachShadow({mode:"open"}),m(this,Bt,this.shadowRoot),(Array.isArray(this.constructor.styleSheets)&&this.constructor.styleSheets.length>0||this.constructor.styleSheets instanceof CSSStyleSheet)&&(i(this,Bt).adoptedStyleSheets=[].concat(this.constructor.styleSheets))):m(this,Bt,this)},g(p,"styleSheets",[]);function bh(d){return Array.from(d).reduce((t,e)=>Math.imul(31,t)+e.charCodeAt(0)|0,0)}var ca=new CSSStyleSheet;ca.replaceSync(`:host {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-right: 16px;
  overflow: hidden;

  background-color: var(--mdw-primary-container);
  font-size: var(--mdw-font-body-size-small);
  font-weight: var(--mdw-font-body-weight-small);
  letter-spacing: var(--mdw-font-body-letter-spacing-small);
  color: var(--mdw-on-primary-container);
}

:host([onclick]) {
  cursor: pointer;
}

:host(.mdw-tertiary) {
  background-color: var(--mdw-tertiary-container);
  color: var(--mdw-on-tertiary-container);
}

:host::after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background-color: var(--mdw-primary-inverse);
  opacity: 0;
  transition: opacity 180ms;
}

:host(.mdw-checkbox)::after {
  cursor: pointer;
}

:host(.mdw-checked)::after {
  opacity: 1;
}

:host > svg {
  position: absolute;
  width: 24px;
  height: 24px;
  opacity: 0;
}

:host > svg > path {
  stroke-dashoffset: 22.910259;
  stroke-dasharray: 22.910259;
  animation: mdw-avatar-uncheck 90ms;
}

:host(.mdw-checked) > svg {
  z-index: 1;
  opacity: 1;
}

:host(.mdw-checked) > svg > path {
  stroke-dashoffset: 0;
  animation: mdw-avatar-check 180ms;
}


@keyframes mdw-avatar-check {
  0%,
  50% {
    stroke-dashoffset: 22.910259;
  }

  50% {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1);
  }

  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes mdw-avatar-uncheck {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
    stroke-dashoffset: 0
  }

  to {
    stroke-dashoffset: -22.910259
  }
}

/* TODO work out how to fill with any aspect ratio */
:host ::slotted(img) {
  width: 100%;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,ca];var Qd=ca;var ke,ha;customElements.define("mdw-avatar",(ha=class extends p{constructor(){super();g(this,"useShadowRoot",!0);n(this,ke,!1)}get checked(){return i(this,ke)}set checked(e){m(this,ke,!!e),this.classList.toggle("mdw-checked",i(this,ke))}template(){return`
      <slot></slot>
      <svg version="1.1" focusable="false" viewBox="0 0 24 24">
        <path fill="none" stroke="white" stroke-width="2" d="M4.1,12.7 9,17.6 20.3,6.3" ></path>
      </svg>
    `}},ke=new WeakMap,g(ha,"styleSheets",Qd),ha));var wa=new CSSStyleSheet;wa.replaceSync(`mdw-scrim {
  position: fixed;
  z-index: 11;
  opacity: 0;
  transition: opacity 240ms;
}

mdw-scrim.mdw-show {
  opacity: 1;
}

mdw-scrim::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--mdw-scrim-alpha-16);
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,wa];var Jd=wa;p.registerGlobalStyleSheet(Jd);customElements.define("mdw-scrim",class extends p{constructor(){super()}async connectedCallback(){await w.nextAnimationFrameAsync(),this.classList.add("mdw-show")}async remove(){this.classList.remove("mdw-show"),await w.transitionendAsync(this),super.remove()}});var pa=new CSSStyleSheet;pa.replaceSync(`mdw-badge {
  position: absolute;
  min-width: 6px;
  min-height: 6px;
  border-radius: 6px;
  font-size: var(--mdw-font-label-size-small);
  font-size: var(--mdw-font-label-weight-small);
  letter-spacing: var(--mdw-font-label-letter-spacing-small);
  color: var(--mdw-on-error);
  background-color: var(--mdw-error);
  opacity: 0;
}

mdw-badge.mdw-has-value {
  opacity: 1;
}

mdw-badge.mdw-has-value:not(.mdw-non-counting) {
  border-radius: 8px;
  line-height: 8px;
  padding: 4px;
  text-align: center;
}

.mdw-icon-button mdw-badge,
mdw-icon mdw-badge {
  left: calc(50% + 5px);
  top: 9px;
}
.mdw-icon-button mdw-badge.mdw-has-value:not(.mdw-non-counting),
mdw-icon mdw-badge.mdw-has-value:not(.mdw-non-counting) {
  left: calc(50% - 2px);
  top: 3px;
}

mdw-anchor mdw-badge {
  position: absolute;
  right: 20px;
}

mdw-button:not(.mdw-icon-button):not(.mdw-icon-toggle-button) mdw-badge {
  position: unset;
  display: inline-block;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,pa];var tl=pa;p.registerGlobalStyleSheet(tl);var ns=class extends p{#t="";#i=!1;#e;constructor(){super(),this.classList.contains("mdw-non-counting")&&(this.#i=!0)}connectedCallback(){requestAnimationFrame(()=>{this.#e=this.parentElement.getAttribute("aria-label")||"",this.value=this.innerText})}get value(){return this.#t||"0"}set value(t){t=parseInt(t),(isNaN(t)||t<=0)&&(t=""),t>999&&(t="999+"),this.#t=t,this.classList.toggle("mdw-has-value",!!t),this.#i?super.innerText="":super.innerText=t,t==0?this.parentElement.setAttribute("aria-label",this.#e):this.#i?this.parentElement.setAttribute("aria-label",`[${this.#e}] New notification`):this.parentElement.setAttribute("aria-label",`[${this.#e}] ${this.value} New ${this.value===1?"notification":"notifications"}`)}get innerHTML(){return super.innerHTML}set innerHTML(t){this.value=t}get innerText(){return super.innerText}set innerText(t){this.value=t}};customElements.define("mdw-badge",ns);var P=class{#t=280;#i=150;#e={FADING_IN:"FADING_IN",VISIBLE:"VISIBLE",FADING_OUT:"FADING_OUT",HIDDEN:"HIDDEN"};#o;#s;#l=[];#c=!1;#n;#a=!1;#d;#m=1;#r=new Set;#w=!1;#u=this.#g.bind(this);#p=this.#b.bind(this);#h=this.#f.bind(this);constructor(t={element,triggerElement,ignoreElements:[],centered:!1,color:null,persistent:!1,radius,speedFactor:1}){if(!t.element)throw Error("requires params.element");if(!t.triggerElement)throw Error("requires params.triggerElement");this.#o=t.element,this.#s=[].concat(t.triggerElement),this.#l=[].concat(t.ignoreElements).filter(e=>!!e),this.#c=t.centered!==void 0?t.centered:this.#c,this.#n=t.color,this.#a=t.persistent!==void 0?t.persistent:this.#a,this.#d=t.radius,this.#m=t.speedFactor!==void 0?t.speedFactor:this.#m,this.#s.forEach(e=>{e.addEventListener("mousedown",this.#u)})}destroy(){this.#s.forEach(t=>{t.removeEventListener("mousedown",this.#u),t.removeEventListener("mouseup",this.#p),t.removeEventListener("mouseleave",this.#h)})}addIgnoreElement(t){this.#l.push(t)}trigger(){let t=this.#c;this.#c=!0,this.#v(),this.#c=t}#g(t){this.#l.find(e=>e.contains(t.target))||(this.#w=!0,this.#s.forEach(e=>{e.addEventListener("mouseup",this.#p),e.addEventListener("mouseleave",this.#h)}),this.#v(t.pageX,t.pageY))}#f(){this.#w&&this.#b()}#b(){this.#w=!1,this.#r.forEach(t=>{!t.persistent&&t.state===this.#e.VISIBLE&&t.fadeOut()}),this.#s.forEach(t=>{t.removeEventListener("mouseup",this.#p),t.removeEventListener("mouseleave",this.#h)})}#v(t,e){let o=this.#o.getBoundingClientRect();if(this.#c)t=o.left+o.width/2,e=o.top+o.height/2;else{let f=this.#x();t-=f.left,e-=f.top}let s=this.#t*(1/this.#m),r=t-o.left,a=e-o.top,h=this.#d||this.#k(t,e,o),u=this.#L(r,a,h,s);this.#o.appendChild(u);let b={element:u,persistent:this.#a,state:this.#e.FADING_IN,fadeOut:()=>this.#y(b)};this.#r.add(b),requestAnimationFrame(()=>{u.style.transform="scale(1)",setTimeout(()=>{b.state=this.#e.VISIBLE,!this.#a&&!this.#w&&b.fadeOut()},s)})}#y(t){if(!this.#r.delete(t))return;let e=t.element;e.style.transitionDuration=`${this.#i}ms`,e.style.opacity="0",t.state=this.#e.FADING_OUT,setTimeout(()=>{t.state=this.#e.HIDDEN,e.remove()},this.#i)}#x(){let t=document.documentElement.getBoundingClientRect(),e=-t.top||document.body.scrollTop||window.scrollY||document.documentElement.scrollTop||0,o=-t.left||document.body.scrollLeft||window.scrollX||document.documentElement.scrollLeft||0;return{top:e,left:o}}#k(t,e,o){let s=Math.max(Math.abs(t-o.left),Math.abs(t-o.right)),r=Math.max(Math.abs(e-o.top),Math.abs(e-o.bottom));return Math.sqrt(s*s+r*r)}#L(t,e,o,s){let r=document.createElement("div");return r.classList.add("mdw-ripple-element"),r.style.left=`${t-o}px`,r.style.top=`${e-o}px`,r.style.height=`${o*2}px`,r.style.width=`${o*2}px`,r.style.position="absolute",r.style.pointerEvents="none",r.style.borderRadius="50%",r.style.transition="opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1)",r.style.transform="scale(0)",r.style.backgroundColor=this.#n,r.style.transitionDuration=`${s}ms`,r}};var ua=new CSSStyleSheet;ua.replaceSync(`mdw-bottom-app-bar {
  --mdw-bottom-app-bar-scroll-position: 0px;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: row;
  padding: 12px 16px 12px 4px;
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  align-items: center;
  z-index: 1;

  background-color: var(--mdw-surface);
  box-shadow: var(--mdw-elevation-2);
}

mdw-bottom-app-bar:before {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background-color: var(--mdw-elevation-tint-2);
  transition: background-color 80ms linear;
}

mdw-bottom-app-bar > mdw-bottom-app-bar-primary {
  position: absolute;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  align-items: center;
  opacity: 1;
  transition: none;
}

mdw-bottom-app-bar > mdw-bottom-app-bar-primary.mdw-hide {
  pointer-events: none;
  opacity: 0;
  transition: opacity 120ms;
}

mdw-bottom-app-bar > mdw-bottom-app-bar-secondary {
  position: absolute;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  align-items: center;

  pointer-events: none;
  opacity: 0;
  transition: opacity 120ms;
}

mdw-bottom-app-bar > mdw-bottom-app-bar-secondary.mdw-show {
  opacity: 1;
  pointer-events: all;
  transition: none;
}

mdw-bottom-app-bar.mdw-auto-hide {
  bottom: var(--mdw-bottom-app-bar-scroll-position);
}

body:not(.mdw-mobile) > mdw-navigation.mdw-state-rail ~ mdw-bottom-app-bar:not(.mdw-mobile-only) {
  left: 80px;
}

body:not(.mdw-mobile) > mdw-navigation ~ mdw-bottom-app-bar:not(.mdw-mobile-only) {
  left: var(--mdw-navigation-drawer-width);
}

body:not(.mdw-mobile) > mdw-navigation.mdw-enable-animation:not(.mdw-state-rail) ~ mdw-bottom-app-bar:not(.mdw-mobile-only) {
  transition: left 420ms;
  transition-timing-function: var(--mdw-transition-expand-in);
}

body:not(.mdw-mobile) > mdw-navigation.mdw-enable-animation.mdw-state-rail ~ mdw-bottom-app-bar:not(.mdw-mobile-only) {
  transition: left 180ms;
  transition-timing-function: var(--mdw-transition-expand-out);
}

body.mdw-has-bottom-app-bar > page-content::after {
  content: '';
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
}

body:not(.mdw-mobile).mdw-has-bottom-app-bar.mdw-bottom-app-bar-mobile-only > page-content::after {
  content: '';
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
}

body:not(.mdw-mobile) mdw-bottom-app-bar.mdw-mobile-only {
  display: none;
}

mdw-bottom-app-bar.mdw-auto-hide > mdw-button.mdw-icon-button,
mdw-bottom-app-bar > mdw-bottom-app-bar-primary.mdw-show mdw-button.mdw-icon-button,
mdw-bottom-app-bar > mdw-bottom-app-bar-secondary.mdw-show mdw-button.mdw-icon-button {
  transform: translateY(0);
  transition: transform 180ms 50ms;
}

mdw-bottom-app-bar.mdw-auto-hide > mdw-button.mdw-icon-button:nth-child(2),
mdw-bottom-app-bar > mdw-bottom-app-bar-primary.mdw-show mdw-button.mdw-icon-button:nth-child(2),
mdw-bottom-app-bar > mdw-bottom-app-bar-secondary.mdw-show mdw-button.mdw-icon-button:nth-child(2) {
  transition-delay: 100ms;
}

mdw-bottom-app-bar.mdw-auto-hide > mdw-button.mdw-icon-button:nth-child(3),
mdw-bottom-app-bar > mdw-bottom-app-bar-primary.mdw-show mdw-button.mdw-icon-button:nth-child(3),
mdw-bottom-app-bar > mdw-bottom-app-bar-secondary.mdw-show mdw-button.mdw-icon-button:nth-child(3) {
  transition-delay: 150ms;
}

mdw-bottom-app-bar.mdw-auto-hide > mdw-button.mdw-icon-button:nth-child(4),
mdw-bottom-app-bar > mdw-bottom-app-bar-primary.mdw-show mdw-button.mdw-icon-button:nth-child(4),
mdw-bottom-app-bar > mdw-bottom-app-bar-secondary.mdw-show mdw-button.mdw-icon-button:nth-child(4) {
  transition-delay: 200ms;
}

mdw-bottom-app-bar.mdw-auto-hide > mdw-button.mdw-icon-button:nth-child(5),
mdw-bottom-app-bar > mdw-bottom-app-bar-primary.mdw-show mdw-button.mdw-icon-button:nth-child(5),
mdw-bottom-app-bar > mdw-bottom-app-bar-secondary.mdw-show mdw-button.mdw-icon-button:nth-child(5) {
  transition-delay: 250ms;
}

mdw-bottom-app-bar.mdw-auto-hide > mdw-button.mdw-icon-button:nth-child(6),
mdw-bottom-app-bar > mdw-bottom-app-bar-primary.mdw-show mdw-button.mdw-icon-button:nth-child(6),
mdw-bottom-app-bar > mdw-bottom-app-bar-secondary.mdw-show mdw-button.mdw-icon-button:nth-child(6) {
  transition-delay: 300ms;
}

mdw-bottom-app-bar.mdw-auto-hide.mdw-show-animation-start > mdw-button.mdw-icon-button,
mdw-bottom-app-bar > mdw-bottom-app-bar-primary.mdw-show-animation-start mdw-button.mdw-icon-button,
mdw-bottom-app-bar > mdw-bottom-app-bar-secondary.mdw-show-animation-start mdw-button.mdw-icon-button {
  transform: translateY(60px);
  transition: transform;
  transition-duration: 0ms;
  transition-delay: 0ms;
  transition-timing-function: var(--mdw-transition-expand-in);
}

mdw-bottom-app-bar mdw-fab {
  position: fixed;
  bottom: 12px;
  right: 16px;
  transition: bottom 180ms;
}

mdw-bottom-app-bar.mdw-auto-hide mdw-fab {
  bottom: max(calc(var(--mdw-bottom-app-bar-scroll-position) + 12px), 6px);
}


/* --- Ripple --- */

mdw-bottom-app-bar a > .mdw-ripple {
  overflow: hidden;
  border-radius: inherit;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
  border-radius: 50%;
}

mdw-bottom-app-bar a > .mdw-ripple > .mdw-ripple-element {
  opacity: var(--mdw-state-layer-opacity-pressed);
  background-color: var(--mdw-on-surface);
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,ua];var el=ua;p.registerGlobalStyleSheet(el);var rs=class extends p{#t;#i=this.classList.contains("mdw-auto-hide");#e=this.offsetHeight;#o=this.#c.bind(this);#s=this.#n.bind(this);constructor(){super(),document.body.classList.add("mdw-has-bottom-app-bar"),this.classList.contains("mdw-mobile-only")&&document.body.classList.add("mdw-bottom-app-bar-mobile-only")}async connectedCallback(){this.#t=[...this.querySelectorAll("nav > a > .mdw-ripple")].map(t=>new P({element:t,triggerElement:t.parentNode})),this.#i&&w.trackPageScroll(this.#o),this.querySelector("mdw-bottom-app-bar-secondary[mdw-hash]")&&([...this.querySelectorAll("mdw-bottom-app-bar-secondary")].forEach(t=>{let e=t.getAttribute("id");t.setAttribute("id",e||`bottom-app-bar-secondary-${w.uid()}`)}),window.addEventListener("hashchange",this.#s),this.#n())}disconnectedCallback(){this.#t.forEach(t=>t.destroy()),this.#i&&w.untrackPageScroll(this.#o)}async#l(){this.classList.add("mdw-show-animation-start"),this.classList.remove("mdw-hide"),await w.nextAnimationFrameAsync(),this.classList.remove("mdw-show-animation-start")}async showPrimary(){let t=this.querySelector("mdw-bottom-app-bar-primary");if(!t)throw Error('Must contain primary element "mdw-bottom-app-bar-primary" to use secondary');if(!t.classList.contains("mdw-hide"))return;let e=this.querySelector("mdw-bottom-app-bar-secondary.mdw-show");e&&e.classList.remove("mdw-show"),t.classList.remove("mdw-hide"),t.classList.add("mdw-show-animation-start"),await w.nextAnimationFrameAsync(),t.classList.add("mdw-show"),t.classList.remove("mdw-show-animation-start")}async showSecondary(t){if(!t)return this.showPrimary();let e=this.querySelector("mdw-bottom-app-bar-primary");if(!e)throw Error('Must contain primary element "mdw-bottom-app-bar-primary" to use secondary');let o=this.querySelector(`mdw-bottom-app-bar-secondary#${t}`);if(!o)throw Error('Could not find secondary: "mdw-bottom-app-bar-secondary#${id}"');if(o.classList.contains("mdw-show"))return;let s=this.querySelector("mdw-bottom-app-bar-secondary.mdw-show");s&&s.classList.remove("mdw-show"),e.classList.add("mdw-hide"),e.classList.remove("mdw-show"),o.classList.add("mdw-show-animation-start"),await w.nextAnimationFrameAsync(),o.classList.add("mdw-show"),o.classList.remove("mdw-show-animation-start")}#c({direction:t,distance:e,distanceFromDirectionChange:o,scrollTop:s}){let r=-parseInt(this.style.getPropertyValue("--mdw-bottom-app-bar-scroll-position").replace("px","")||0);if(t===1&&(r===0||o>-120&&s>this.#e)||t===-1&&r===this.#e)return;let a=r+e;a>this.#e&&(a=this.#e),a<0&&(a=0),this.style.setProperty("--mdw-bottom-app-bar-scroll-position",`${-a}px`),t===1&&r>=this.#e-20&&a<this.#e-20&&this.#l()}#n(){let t=this.querySelector(`mdw-bottom-app-bar-secondary[mdw-hash="${location.hash}"]`);t?this.showSecondary(t.getAttribute("id")):this.showPrimary()}};customElements.define("mdw-bottom-app-bar",rs);var il=new class{#t=(navigator?.userAgentData?.platform||navigator?.platform||navigator.userAgent||"").toLowerCase();#i=/ipad|iphone|ipod/;#e=/android/;#o=600;#s=1239;constructor(){window.addEventListener("resize",()=>{this.#l()}),this.#l(!0)}get isMobile(){return this.isIOS||this.isAndroid}get isIOS(){return this.#i.test(this.#t)}get isAndroid(){return this.#e.test(this.#t)}get isSmallViewport(){return window.innerWidth>this.#o&&window.innerWidth<this.#s}get hasTouch(){return"ontouchstart"in window||navigator.maxTouchPoints>0}#l(t=!1){document.body.classList.remove("mdw-mobile"),document.body.classList.remove("mdw-viewport-small"),this.isMobile?(document.body.classList.add("mdw-mobile"),t||window.dispatchEvent(new CustomEvent("mdw-viewport",{detail:{state:"mobile"}}))):this.isSmallViewport?(document.body.classList.add("mdw-viewport-small"),t||window.dispatchEvent(new CustomEvent("mdw-viewport",{detail:{state:"smallScreen"}}))):t||window.dispatchEvent(new CustomEvent("mdw-viewport",{detail:{state:"none"}}))}};window.mdwDevice=il;var v=il;var A=class{#t;#i=!1;#e=!1;#o=this.#k.bind(this);#s=this.#L.bind(this);#l=w.rafThrottle(this.#A.bind(this));#c=[];#n=[];#a=[];#d=[];#m;#r;#w;#u;#p;#h={x:0,y:0};#g=!1;#f=12;#b=!1;#v;#y;#x;constructor(t){t&&(this.#t=t)}get element(){return this.#t}set element(t){if(this.#t)throw Error("element had already been set, cannot change.");if(!(t instanceof HTMLElement))throw Error("element must be an instance HTMLElement");this.#t=t}get includeMouseEvents(){return this.#i}set includeMouseEvents(t){this.#i=!!t}get isDragging(){return this.#e}get lockScrollY(){return this.#g}set lockScrollY(t){this.#g=!!t}get lockScrollThreshold(){return this.#f}set lockScrollThreshold(t){if(isNaN(t))throw Error("lockScrollThreshold must be a number");this.#f=parseInt(t)}get desktopOnly(){return this.#b}set desktopOnly(t){this.#b=!!t}enable(){this.#v||(this.#v=!0,this.#y=new AbortController,this.#b&&!v.isMobile?this.#t.addEventListener("mousedown",this.#o,{signal:this.#y.signal}):(this.#t.addEventListener("touchstart",this.#o,{signal:this.#y.signal}),this.#i===!0&&this.#t.addEventListener("mousedown",this.#o,{signal:this.#y.signal})))}disable(){this.#y&&this.#y.abort(),this.#x&&this.#x.abort()}destroy(){this.disable(),this.#t=void 0,w.unlockPageScroll()}onDrag(t=()=>{}){this.#c.push(t)}onStart(t=()=>{}){this.#n.push(t)}onEnd(t=()=>{}){this.#a.push(t)}resetDistance(){this.#r=this.#w}addIgnoreElement(t){this.#d.push(t)}emptyIgnoreElements(){this.#d=[]}#k(t){t.button===0&&(this.#d.find(e=>e===t.target||e.contains(t.target))||(this.#p=Date.now(),this.#r=this.#z(t),this.#m=this.#D(t),this.#u=this.#D(t),this.#n.forEach(e=>e({event:t,element:this.#t})),this.#x=new AbortController,this.#b||(this.#t.addEventListener("touchend",this.#s,{signal:this.#x.signal}),this.#t.addEventListener("touchmove",this.#l,{signal:this.#x.signal})),(this.#i||this.#b)&&(window.addEventListener("mouseup",this.#s,{signal:this.#x.signal}),window.addEventListener("mousemove",this.#l,{signal:this.#x.signal})),this.#e=!0))}#L(t){this.#x.abort();let e=this.#D(t);this.#g&&w.unlockPageScroll(),this.#a.forEach(o=>o({distance:e,direction:this.#C({x:0,y:0},e),velocity:this.#T(e,Date.now()-this.#p),event:t,element:this.#t}))}#A(t){this.#w=this.#z(t);let e=this.#D(t);this.#u.x+=e.x,this.#u.y+=e.y,this.#u.moveX+=e.moveX,this.#u.moveY+=e.moveY,this.#g&&Math.abs(this.#u.moveX)>this.#f&&w.lockPageScroll(),this.#c.forEach(o=>o({distance:e,direction:this.#C(this.#m,e),event:t,element:this.#t})),this.#m=e,this.#e=!1}#D(t){let e=this.#z(t),o=this.#h;return this.#h=e,{x:e.x-this.#r.x,y:e.y-this.#r.y,moveX:e.x-o.x,moveY:e.y-o.y}}#C(t,e){let o=e.x>t.x?1:e.x===t.x?0:-1,s=e.y>t.y?1:e.y===t.y?0:-1;return{x:o,y:s,xDescription:o===0?"none":o===1?"right":"left",yDescription:s===0?"none":s===1?"down":"up"}}#T(t,e){return{x:t.x/e,y:t.y/e}}#z(t){return{x:t.changedTouches?t.changedTouches[0].clientX:t.clientX,y:t.changedTouches?t.changedTouches[0].clientY:t.clientY}}};var ga=new CSSStyleSheet;ga.replaceSync(`mdw-bottom-sheet {
  --mdw-bottom-sheet-bottom: 0;

  position: fixed;
  display: flex;
  flex-direction: column;
  max-width: 640px;
  min-height: 100%;
  height: 100%;
  right: 0;
  left: 0;
  margin-right: auto;
  margin-left: auto;
  overflow-y: visible;
  overscroll-behavior: contain;

  bottom: var(--mdw-bottom-sheet-bottom);

  z-index: 9;

  background-color: var(--mdw-surface);
  border-radius: var(--mdw-shape-extra-large-top);
  box-shadow: var(--mdw-elevation-1);
}

mdw-bottom-sheet.mdw-animate-position {
  transition: bottom 300ms cubic-bezier(0, 0.55, 0.45, 1);
}

/* mdw-bottom-sheet.mdw-drag-animation {
  transition: bottom 300ms cubic-bezier(0, 0.55, 0.45, 1);
} */


mdw-bottom-sheet > .mdw-drag-handle {
  flex-shrink: 0;
  align-self: center;
  width: 36px;
  height: 4px;
  border-radius: 4px;
  margin: 12px 0;

  background-color: var(--mdw-on-surface-variant);
}


mdw-bottom-sheet > .mdw-content {
  margin: 0 12px;
}


/* -- blank out background when over scrolling --- */
/* mdw-bottom-sheet.mdw-over-scroll::after {
  content: '';
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: var(--mdw-surface);
  z-index: -1;
} */
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,ga];var ol=ga;p.registerGlobalStyleSheet(ol);customElements.define("mdw-bottom-sheet",class extends p{#t;#i;#e;#o=!1;#s=this.#p.bind(this);#l=this.#w.bind(this);#c=this.#u.bind(this);#n=this.#b.bind(this);constructor(){super(),this.insertAdjacentHTML("afterbegin",'<div class="mdw-drag-handle"></div>'),this.#r=this.#a,this.style.overflowY="visible",this.#t=new A(this),this.#t.onDrag(this.#s),this.#t.onStart(this.#l),this.#t.onEnd(this.#c)}connectedCallback(){this.#t.enable()}get#a(){let t=parseInt(this.style.getPropertyValue("--mdw-bottom-sheet-initial-position")||40)/100;return-(this.offsetHeight-window.innerHeight*t)}get#d(){return-(this.offsetHeight-window.innerHeight)}get#m(){return-(this.offsetHeight-80)}get#r(){return parseInt(this.style.getPropertyValue("--mdw-bottom-sheet-bottom").replace("px",""))}set#r(t){this.style.setProperty("--mdw-bottom-sheet-bottom",`${t}px`)}#w({event:t}){this.#o||(this.#i=this.#r,this.#i!==this.#d&&t.preventDefault(),w.lockPageScroll())}async#u({direction:t}){this.#o||(this.classList.add("mdw-animate-position"),t.y===-1?this.#r>this.#a?this.#h():this.#r=this.#a:this.#r>=this.#a?this.#r=this.#a:this.#r=this.#m,await w.transitionendAsync(this),this.classList.remove("mdw-animate-position"))}#p({distance:t,direction:e}){if(this.scrollTop<=0&&e.y===1&&this.style.overflowY!=="visible"){this.#f();return}if(!this.#o){if(this.#r>=this.#d&&e.y===-1){this.#g(t);return}this.#r=this.#i-t.y}}#h(){this.#r=this.#d,this.#g()}#g(t){this.style.overflowY="scroll",this.#r=0,this.#o=!0,t&&(this.scrollTop=-t.moveY),this.addEventListener("scroll",this.#n)}#f(){this.style.overflowY="visible",this.style.height="",this.#i=this.#r,this.#r=this.#d,this.#t.resetDistance(),this.#o=!1,this.removeEventListener("scroll",this.#n)}#b(){this.scrollTop<=0&&this.scrollTop===this.#e&&this.#f(),this.#e=this.scrollTop}});var sl=new class{#t;#i;#e=this.#o.bind(this);simple(t={headline:"",message:"",scrim:!0,clickScrimClose:!1,actionConfirm:!0,actionConfirmLabel:"OK",actionCancel:!1,actionCancelLabel:"Cancel"}){if(this.#t)throw Error("Cannot create dialog while one exists");let e=t.actionConfirm===void 0?!0:t.actionConfirm,o=t.actionCancel||!1,s=document.createElement("mdw-dialog");return s.clickScrimClose=t.clickScrimClose,s.insertAdjacentHTML("afterbegin",`
      ${t.headline?`<div class="mdw-header">${t.headline}</div>`:""}
      <div class="mdw-content">${t.message||""}</div>
      ${e||o?`<div class="mdw-actions">
        ${e===!0?`<mdw-button onclick="mdwDialog.close('confirm')">${t.actionConfirmLabel||"OK"}</mdw-button>`:""}
        ${o===!0?`<mdw-button onclick="mdwDialog.close('cancel')">${t.actionCancelLabel||"Cancel"}</mdw-button>`:""}
      </div>`:""}
    `),document.body.appendChild(s),s.addEventListener("close",this.#e),s.show(t.scrim===void 0?!0:t.scrim),this.#t=s,new Promise(r=>{this.#i=r})}#o(){this.#t.removeEventListener("close",this.#e),this.#t=void 0}async close(t){if(!this.#t)throw Error("No dialog to close");this.#t.removeEventListener("close",this.#e),this.#i&&this.#i(t),this.#t.close(t),await w.animationendAsync(this.#t),this.#t.remove(),this.#t=void 0,this.#i=void 0}template(t={template,scrim:!0,clickScrimClose:!1}){if(this.#t)throw Error("Cannot create dialog while one exists");let e=document.createElement("mdw-dialog");return e.clickScrimClose=t.clickScrimClose,e.insertAdjacentHTML("afterbegin",t.template),document.body.appendChild(e),setTimeout(()=>{e.show(t.scrim===void 0?!0:t.scrim)},0),this.#t=e,new Promise(o=>{this.#i=o})}};window.mdwDialog=sl;var Si=sl;var fa=new CSSStyleSheet;fa.replaceSync(`:host {
  position: relative;
  display: inline-flex;
  user-select: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  outline: none;
  -webkit-tap-highlight-color: transparent;

  font-size: var(--mdw-font-label-size-large);
  font-weight: var(--mdw-font-label-weight-large);
  letter-spacing: var(--mdw-font-label-letter-spacing-large);

  padding: 0 16px;
  height: 40px;
  line-height: 40px;
  border-radius: var(--mdw-button-radius);

  color: var(--mdw-primary);
}

:host ::slotted(mdw-icon) {
  margin-right: 2px;
  margin-left: -2px;
  vertical-align: sub;
  width: var(--mdw-font-icon-size-small) !important;
  height: var(--mdw-font-icon-size-small) !important;
  font-size: var(--mdw-font-icon-size-small) !important;
  line-height: var(--mdw-font-icon-size-small) !important;
}

:host ::slotted(.mdw-icon-svg) {
  margin-top: 7px;
  margin-left: -2px;
  width: 20px !important;
  height: 20px !important;
}

:host ::slotted(mdw-icon.mdw-trailing) {
  margin-right: -2px;
  margin-left: 2px;
}

:host([disabled]) {
  pointer-events: none;
  cursor: unset;
  color: var(--mdw-on-surface);
  opacity: 0.38;


}

:host([disabled][tooltip]) {
  pointer-events: all;
}

:host([disabled][tooltip]:active) {
  pointer-events: none;
}

/* state layer */
:host::after {
  position: absolute;
  content: "";
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
  border-radius: var(--mdw-button-radius);
}
:host(:focus)::after {
  opacity: var(--mdw-state-layer-opacity-focus);
  background-color: var(--mdw-on-surface);
}


:host(.mdw-async-pending) {
  pointer-events: none;
}
:host(.mdw-async-pending) .text {
  opacity: 0;
}
:host(.mdw-async) > .spinner {
  position: absolute;
  left: calc(50% - 18px);
  top: 1px;
}


/* --- icon buttons / icon toggle --- */

:host(.mdw-icon-toggle-button),
:host(.mdw-icon-button) {
  width: 40px;
  height: 40px;
  line-height: 40px;
  padding: 0;
  margin: 8px;
  border-radius: 50%;
  justify-content: center;
  color: var(--mdw-on-surface-variant);
}

:host(.mdw-icon-toggle-button)::after,
:host(.mdw-icon-button)::after {
  border-radius: 50%;
}

:host(.mdw-icon-button) ::slotted(mdw-icon),
:host(.mdw-icon-toggle-button) ::slotted(mdw-icon) {
  width: var(--mdw-font-icon-size-medium) !important;
  height: var(--mdw-font-icon-size-medium) !important;
  font-size: var(--mdw-font-icon-size-medium) !important;
  line-height: var(--mdw-font-icon-size-medium) !important;
  vertical-align: middle;
  margin: 0 auto;
  transition: font-variation-settings 60ms;
}

:host(:not(.mdw-icon-toggle-button):not(.mdw-icon-button)) ::slotted([value]) {
  margin-right: 4px;
  font-size: 20px !important;
}

:host(.mdw-icon-toggle-button) ::slotted([value="on"]),
:host(.mdw-icon-toggle-button) ::slotted([value="off"]) {
  opacity: 1;
  transition: opacity 180ms !important;
}

:host(.mdw-icon-toggle-button) ::slotted([value="on"]) {
  position: absolute;
  top: 50%;
  margin-top: calc(-25% - 3px);
}

:host(.mdw-icon-toggle-button:not(.mdw-toggled)) ::slotted([value="on"]) {
  opacity: 0;
}

:host(.mdw-icon-toggle-button.mdw-toggled) ::slotted([value="off"]) {
  opacity: 0;
}

:host(.mdw-icon-toggle-button:not(.mdw-toggled)) ::slotted(mdw-icon:not([value])) {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48 !important
}

/* --- state layer --- */
:host(.mdw-icon-toggle-button) {
  color: var(--mdw-on-surface-variant);
}
:host(.mdw-icon-toggle-button.mdw-toggled) {
  color: var(--mdw-primary);
}
:host(.mdw-icon-toggle-button)::after,
:host(.mdw-icon-button)::after {
  margin-left: 0;
}

:host(.mdw-icon-toggle-button.mdw-filled) {
  color: var(--mdw-primary);
  background-color: var(--mdw-surface-variant);
}

:host(.mdw-icon-toggle-button.mdw-filled.mdw-toggled) {
  color: var(--mdw-on-primary);
  background-color: var(--mdw-primary);
}

:host(.mdw-icon-toggle-button.mdw-filled-tonal) {
  color: var(--mdw-on-surface-variant);
  background-color: var(--mdw-surface-variant);
}

:host(.mdw-icon-toggle-button.mdw-filled-tonal.mdw-toggled) {
  color: var(--mdw-on-secondary-container);
  background-color: var(--mdw-secondary-container);
}

:host(.mdw-icon-toggle-button.mdw-outlined) {
  color: var(--mdw-on-surface-variant);
}

:host(.mdw-icon-toggle-button.mdw-outlined.mdw-toggled) {
  color: var(--mdw-on-surface-inverse);
  background-color: var(--mdw-surface-inverse);
}


/* --- Types --- */

:host(.mdw-filled) {
  color: var(--mdw-on-primary);
  background-color: var(--mdw-primary);
}
:host([disabled].mdw-filled) {
  background-color: var(--mdw-on-surface-alpha-12);
  color: var(--mdw-on-surface-alpha-38);
  box-shadow: none;
}
/* state layer */
:host(:focus.mdw-filled)::after {
  opacity: var(--mdw-state-layer-opacity-focus);
  background-color: var(--mdw-primary);
}
:host(:focus.mdw-filled) {
  box-shadow: var(--mdw-elevation-1);
}

:host(.mdw-elevated) {
  background-color: var(--mdw-surface);
  box-shadow: var(--mdw-elevation-1);
}
:host([disabled].mdw-elevated) {
  background-color: var(--mdw-on-surface-alpha-12);
  color: var(--mdw-on-surface-alpha-38);
  box-shadow: none;
}
/* state layer */
:host(:focus.mdw-elevated)::after {
  opacity: var(--mdw-state-layer-opacity-focus);
  background-color: var(--mdw-primary);
}

:host(.mdw-filled-tonal) {
  color: var(--mdw-on-secondary-container);
  background-color: var(--mdw-secondary-container);
}
:host([disabled].mdw-filled-tonal) {
  background-color: var(--mdw-on-surface-alpha-12);
  color: var(--mdw-on-surface-alpha-38);
  box-shadow: none;
}
/* state layer */
:host(:focus.mdw-filled-tonal)::after {
  opacity: var(--mdw-state-layer-opacity-focus);
  background-color: var(--mdw-primary);
}

:host(.mdw-outlined) {
  color: var(--mdw-primary);
  background-color: var(--mdw-surface);
  border: 1px solid var(--mdw-outline);
}
:host([disabled].mdw-outlined) {
  color: var(--mdw-on-surface-alpha-38);
  border: 1px solid var(--mdw-on-surface-alpha-12);
}
/* state layer */
:host(:focus.mdw-outlined)::after {
  opacity: var(--mdw-state-layer-opacity-focus);
  background-color: var(--mdw-primary);
}



/* hover state layers. Media needed to prevent hover on mobile */
@media (hover: hover) {
  :host(:hover)::after {
    opacity: var(--mdw-state-layer-opacity-hover);
    background-color: var(--mdw-on-surface);
  }

  :host(:hover.mdw-elevated)::after {
    opacity: var(--mdw-state-layer-opacity-hover);
    background-color: var(--mdw-primary);
  }

  :host(:hover.mdw-filled) {
    box-shadow: var(--mdw-elevation-1);
  }

  :host(:hover.mdw-filled-tonal) {
    box-shadow: var(--mdw-elevation-1);
  }

  :host(:hover.mdw-outlined)::after {
    opacity: var(--mdw-state-layer-opacity-hover);
    background-color: var(--mdw-primary);
  }
}


/* --- mdw-menu --- */

:host(.mdw-menu) {
  border-radius: 0;
  height: 48px;
  line-height: 48px;
  padding: 0 12px;
  color: var(--mdw-on-surface);
}

:host(.mdw-menu)::after {
  border-radius: 0;
  height: 48px;
}

:host(.mdw-menu) ::slotted(mdw-icon) {
  margin-right: 8px;
  width: var(--mdw-font-icon-size-medium) !important;
  height: var(--mdw-font-icon-size-medium) !important;
  font-size: var(--mdw-font-icon-size-medium) !important;
  line-height: var(--mdw-font-icon-size-medium) !important;
  vertical-align: middle;
}

:host(.mdw-menu) ::slotted(mdw-icon.mdw-trailing) {
  margin-right: -2px;
  margin-left: 8px;
}


/* --- Ripple --- */

.ripple {
  overflow: hidden;
  border-radius: inherit;
  /* transform: translateZ(0); */
  /* fixes bug on ios safari */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
}

.ripple > .mdw-ripple-element {
  background-color: var(--mdw-primary);
  opacity: var(--mdw-state-layer-opacity-pressed);
  border-radius: 50%;
}

:host(.mdw-filled) .ripple > .mdw-ripple-element {
  background-color: var(--mdw-on-primary);
}

:host(.mdw-filled-tonal) .ripple > .mdw-ripple-element {
  background-color: var(--mdw-on-secondary-container);
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,fa];var nl=fa;var S,Ei,xt,Li,Se,Ai,ds,Ee,ls,ms,cs,hs,ws,ps,us,gs,Ci,Mi,pt,ut,F,fs,rl,bs,al,vs,dl,ys,ll,xs,ml,ks,cl,Ss,hl,Es,wl,Le,as,Ls,pl,As,ul,Cs,gl,Ms,fl,Ds,bl,Zt=class extends p{constructor(){super();n(this,fs);n(this,bs);n(this,vs);n(this,ys);n(this,xs);n(this,ks);n(this,Ss);n(this,Es);n(this,Le);n(this,Ls);n(this,As);n(this,Cs);n(this,Ms);n(this,Ds);g(this,"useShadowRoot",!0);n(this,S,null);n(this,Ei,"");n(this,xt,"submit");n(this,Li,"");n(this,Se,!1);g(this,"useRipple",!this.classList.contains("mdw-no-ripple"));n(this,Ai,this.classList.contains("mdw-icon-toggle-button"));n(this,ds,this.classList.contains("mdw-async"));n(this,Ee,void 0);n(this,ls,l(this,fs,rl).bind(this));n(this,ms,l(this,vs,dl).bind(this));n(this,cs,l(this,ys,ll).bind(this));n(this,hs,l(this,xs,ml).bind(this));n(this,ws,l(this,Ss,hl).bind(this));n(this,ps,l(this,ks,cl).bind(this));n(this,us,l(this,Es,wl).bind(this));n(this,gs,l(this,Cs,gl).bind(this));n(this,Ci,l(this,Ms,fl).bind(this));n(this,Mi,l(this,Ds,bl).bind(this));n(this,pt,void 0);n(this,ut,void 0);n(this,F,new AbortController);l(this,bs,al).call(this),this.parentElement.nodeName==="MDW-MENU"&&this.classList.add("mdw-menu")}connectedCallback(){if(this.tabIndex=0,this.parentElement.nodeName==="MDW-MENU"?this.setAttribute("role","menuitem"):this.setAttribute("role","button"),!this.hasAttribute("aria-label"))if(this.classList.contains("mdw-icon-button")||this.classList.contains("mdw-icon-toggle-button")){let e=this.querySelector("mdw-icon").innerText;e&&this.setAttribute("aria-label",e)}else{let e=w.getTextFromNode(this);e&&this.setAttribute("aria-label",e)}i(this,S)&&i(this,xt)==="cancel"&&this.addEventListener("click",i(this,ps),{signal:i(this,F).signal}),this.addEventListener("focus",i(this,gs),{signal:i(this,F).signal})}afterRender(){this.addEventListener("mouseup",i(this,ls),{signal:i(this,F).signal}),this.classList.contains("mdw-icon-toggle-button")&&this.addEventListener("click",i(this,ms),{signal:i(this,F).signal}),i(this,S)&&i(this,xt)==="submit"&&this.addEventListener("click",i(this,cs),{signal:i(this,F).signal}),i(this,S)&&i(this,xt)==="reset"&&this.addEventListener("click",i(this,us),{signal:i(this,F).signal}),i(this,S)&&i(this,xt)==="cancel"&&(i(this,S).addEventListener("focusin",i(this,hs),{signal:i(this,F).signal}),i(this,S).addEventListener("submit",i(this,ws),{signal:i(this,F).signal})),this.useRipple&&m(this,Ee,new P({element:this.shadowRoot.querySelector(".ripple"),triggerElement:this,ignoreElements:[this.querySelector("mdw-menu")]}))}disconnectedCallback(){i(this,Ee)&&i(this,Ee).destroy(),i(this,F).abort()}template(){return`
      <span class="text">
        <slot></slot>
      </span>
      <span class="spinner"></span>
      <div class="ripple"></div>
    `}static get observedAttributes(){return["form","type","toggled"]}attributeChangedCallback(e,o,s){e==="toggled"?this.toggled=s!==null:this[e]=s}get form(){return i(this,S)}set form(e){m(this,S,document.querySelector(`form#${e}`)||document.querySelector(`mdw-form#${e}`))}get name(){return i(this,Ei)}set name(e){m(this,Ei,e)}get type(){return i(this,xt)}set type(e){m(this,xt,e)}get value(){return i(this,Li)}set value(e){m(this,Li,e)}get disabled(){return this.hasAttribute("disabled")}set disabled(e){this.toggleAttribute("disabled",!!e)}get toggled(){if(!i(this,Ai))throw Error('Cannot toggle. To enable add class "mdw-icon-toggle-button"');return i(this,Se)}set toggled(e){if(!i(this,Ai))throw Error('Cannot toggle. To enable add class "mdw-icon-toggle-button"');m(this,Se,!!e),this.classList.toggle("mdw-toggled",i(this,Se))}pending(){this.classList.add("mdw-async-pending"),this.shadowRoot.querySelector(".spinner").innerHTML=`
      <mdw-progress-circular diameter="28" class="mdw-indeterminate${this.classList.contains("mdw-filled")?" mdw-on-filled":""}${this.classList.contains("mdw-filled-tonal")?" mdw-on-filled-tonal":""}"></mdw-progress-circular>
    `}resolve(){this.classList.remove("mdw-async-pending"),this.shadowRoot.querySelector(".spinner").innerHTML=""}};S=new WeakMap,Ei=new WeakMap,xt=new WeakMap,Li=new WeakMap,Se=new WeakMap,Ai=new WeakMap,ds=new WeakMap,Ee=new WeakMap,ls=new WeakMap,ms=new WeakMap,cs=new WeakMap,hs=new WeakMap,ws=new WeakMap,ps=new WeakMap,us=new WeakMap,gs=new WeakMap,Ci=new WeakMap,Mi=new WeakMap,pt=new WeakMap,ut=new WeakMap,F=new WeakMap,fs=new WeakSet,rl=function(){i(this,ds)&&this.pending(),this.blur()},bs=new WeakSet,al=function(){let e=this.querySelector("mdw-icon");if(!e)return;let o=e.previousSibling;for(;o&&!(o.nodeType===3&&o.textContent.trim()!=="");)o=o.previousSibling;o&&e.classList.add("mdw-trailing")},vs=new WeakSet,dl=function(){this.toggled=!this.toggled},ys=new WeakSet,ll=function(e){if(!i(this,S).hasAttribute("novalidate")&&l(this,Ls,pl).call(this).filter(s=>!s.reportValidity()).length>0)return e.preventDefault();i(this,S).submit(),i(this,S).dispatchEvent(new SubmitEvent("submit",{submitter:e.target}))},xs=new WeakSet,ml=function(){i(this,pt)===void 0&&m(this,pt,l(this,Le,as).call(this)),setTimeout(()=>{l(this,Le,as).call(this)!==i(this,pt)?this.hasAttribute("onclick")&&(m(this,ut,this.getAttribute("onclick")),this.removeAttribute("onclick")):i(this,ut)&&(this.setAttribute("onclick",i(this,ut)),m(this,ut,void 0))},100)},ks=new WeakSet,cl=async function(e){i(this,pt)!==void 0&&l(this,Le,as).call(this)!==i(this,pt)&&(e.stopImmediatePropagation(),await Si.simple({message:"Discard changes?",actionConfirm:!0,actionConfirmLabel:"Cancel",actionCancel:!0,actionCancelLabel:"Discard"})==="cancel"&&(m(this,pt,void 0),i(this,ut)&&(this.setAttribute("onclick",i(this,ut)),m(this,ut,void 0)),this.click()))},Ss=new WeakSet,hl=function(){m(this,pt,void 0),this.disabled=!1},Es=new WeakSet,wl=function(){i(this,S).reset()},Le=new WeakSet,as=function(){return l(this,As,ul).call(this).map(e=>["MDW-CHECKBOX","MDW-SWITCH"].includes(e.nodeName)?e.checked:e.value).toString()},Ls=new WeakSet,pl=function(){return[...i(this,S).querySelectorAll("input"),...i(this,S).querySelectorAll("mdw-checkbox"),...i(this,S).querySelectorAll("mdw-select")]},As=new WeakSet,ul=function(){return[...i(this,S).querySelectorAll("input"),...i(this,S).querySelectorAll("mdw-checkbox"),...i(this,S).querySelectorAll("mdw-switch"),...i(this,S).querySelectorAll("mdw-slider"),...i(this,S).querySelectorAll("mdw-slider-range"),...i(this,S).querySelectorAll("mdw-select"),...i(this,S).querySelectorAll("mdw-radio-group")]},Cs=new WeakSet,gl=function(){this.addEventListener("blur",i(this,Ci),{signal:i(this,F).signal}),this.addEventListener("keydown",i(this,Mi),{signal:i(this,F).signal})},Ms=new WeakSet,fl=function(){this.removeEventListener("blur",i(this,Ci),{signal:i(this,F).signal}),this.removeEventListener("keydown",i(this,Mi),{signal:i(this,F).signal})},Ds=new WeakSet,bl=function(e){e.key==="Enter"&&this.click()},g(Zt,"styleSheets",nl);customElements.define("mdw-button",Zt);var Ts='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z"/></svg>',zs='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10 21.65.35 12 10 2.35l1.425 1.425L3.175 12l8.25 8.225Z"/></svg>',vl='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z"/></svg>',yl='<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M6.062 15 5 13.938 8.938 10 5 6.062 6.062 5 10 8.938 13.938 5 15 6.062 11.062 10 15 13.938 13.938 15 10 11.062Z"/></svg>',Ut='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m14 18-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6Z"/></svg>',Xt='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M9.4 18 8 16.6l4.6-4.6L8 7.4 9.4 6l6 6Z"/></svg>',ba='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 15-5-5h10Z"/></svg>',Di='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 15-5-5h10Z"/></svg>',$s='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z"/></svg>',_s='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m19.3 8.925-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Z"/></svg>',xl='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z"/></svg>',kl='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M3 18v-2h13v2Zm16.6-1-5-5 5-5L21 8.4 17.4 12l3.6 3.6ZM3 13v-2h10v2Zm0-5V6h13v2Z"/></svg>',Sl='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m19.6 21-6.3-6.3q-.75.6-1.725.95Q10.6 16 9.5 16q-2.725 0-4.612-1.887Q3 12.225 3 9.5q0-2.725 1.888-4.613Q6.775 3 9.5 3t4.613 1.887Q16 6.775 16 9.5q0 1.1-.35 2.075-.35.975-.95 1.725l6.3 6.3ZM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5q0-1.875-1.312-3.188Q11.375 5 9.5 5 7.625 5 6.312 6.312 5 7.625 5 9.5q0 1.875 1.312 3.188Q7.625 14 9.5 14Z"/></svg>',El='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z"/></svg>',Ll='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 21q-3.45 0-6.012-2.288Q3.425 16.425 3.05 13H5.1q.35 2.6 2.312 4.3Q9.375 19 12 19q2.925 0 4.962-2.038Q19 14.925 19 12t-2.038-4.963Q14.925 5 12 5q-1.725 0-3.225.8T6.25 8H9v2H3V4h2v2.35q1.275-1.6 3.113-2.475Q9.95 3 12 3q1.875 0 3.513.712 1.637.713 2.85 1.925 1.212 1.213 1.925 2.85Q21 10.125 21 12t-.712 3.512q-.713 1.638-1.925 2.85-1.213 1.213-2.85 1.926Q13.875 21 12 21Zm2.8-4.8L11 12.4V7h2v4.6l3.2 3.2Z"/></svg>',Al='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 14q-1.25 0-2.125-.875T9 11V5q0-1.25.875-2.125T12 2q1.25 0 2.125.875T15 5v6q0 1.25-.875 2.125T12 14Zm-1 7v-3.075q-2.6-.35-4.3-2.325Q5 13.625 5 11h2q0 2.075 1.463 3.537Q9.925 16 12 16t3.538-1.463Q17 13.075 17 11h2q0 2.625-1.7 4.6-1.7 1.975-4.3 2.325V21Z"/></svg>',Cl='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 17q.425 0 .713-.288Q13 16.425 13 16t-.287-.713Q12.425 15 12 15t-.712.287Q11 15.575 11 16t.288.712Q11.575 17 12 17Zm-1-4h2V7h-2Zm1 9q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg>',Ml='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M4 19q-.825 0-1.412-.587Q2 17.825 2 17V7q0-.825.588-1.412Q3.175 5 4 5h16q.825 0 1.413.588Q22 6.175 22 7v10q0 .825-.587 1.413Q20.825 19 20 19Zm0-2h16V7H4v10Zm4-1h8v-2H8Zm-3-3h2v-2H5Zm3 0h2v-2H8Zm3 0h2v-2h-2Zm3 0h2v-2h-2Zm3 0h2v-2h-2ZM5 10h2V8H5Zm3 0h2V8H8Zm3 0h2V8h-2Zm3 0h2V8h-2Zm3 0h2V8h-2ZM4 17V7v10Z"/></svg>',Dl='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m15.3 16.7 1.4-1.4-3.7-3.7V7h-2v5.4ZM12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"/></svg>';var va=new CSSStyleSheet;va.replaceSync(`mdw-card {
  --mdw-card-swipe-action-position: 0;
  --mdw-card-drag-expand-position: 0;

  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--mdw-shape-medium);
  box-shadow: var(--mdw-elevation-1);
  box-sizing: border-box;
  background-color: var(--mdw-surface);
  color: var(--mdw-on-surface);
  outline: none;
  -webkit-tap-highlight-color: transparent;

  margin-bottom: 8px;

  left: var(--mdw-card-swipe-action-position);
  transition: left 120ms;
}

mdw-card::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  background-color: var(--mdw-elevation-tint-1);
  z-index: 1;
  border-radius: inherit;
}

mdw-card.mdw-remove {
  margin-top: var(--mdw-card-margin-top-remove);
  opacity: 0;
  transition: margin-top 120ms, opacity 80ms 40ms;
}

/* fixes outline overlap */
mdw-card.mdw-outlined {
  --mdw-card-swipe-action-position: 0;
}

mdw-card.mdw-dragging {
  transition: none;
}

mdw-card.mdw-has-swipe-action {
  --mdw-card-swipe-action-position: 0px;
  left: var(--mdw-card-swipe-action-position);
  transition: left 120ms;
}


mdw-card > .mdw-card-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  border-radius: var(--mdw-shape-medium) var(--mdw-shape-medium) 0 0;
}

mdw-card > .mdw-card-image > img {
  /* Display issue when using 100% */
  width: 101%;
}

mdw-card > .mdw-card-image.mdw-rounded {
  border-radius: var(--mdw-shape-medium);
}

mdw-card .mdw-headline{
  font-size: var(--mdw-font-headline-size-small);
  font-weight: var(--mdw-font-headline-weight-small);
  line-height: var(--mdw-font-headline-line-height-small);
  letter-spacing: var(--mdw-font-headline-letter-spacing-small);
  color: var(--mdw-on-surface);
}

mdw-card .mdw-subhead {
  font-size: var(--mdw-font-title-size-small);
  font-weight: var(--mdw-font-title-weight-small);
  line-height: var(--mdw-font-title-line-height-small);
  letter-spacing: var(--mdw-font-title-letter-spacing-small);
  color: var(--mdw-on-surface-variant);
}

mdw-card > .mdw-supporting-text,
mdw-card .mdw-card-content > .mdw-supporting-text {
  margin-top: 12px;
  font-size: var(--mdw-font-body-size-small);
  font-weight: var(--mdw-font-body-weight-small);
  line-height: var(--mdw-font-body-line-height-small);
  letter-spacing: var(--mdw-font-body-letter-spacing-small);
  color: var(--mdw-on-surface-variant);
}

mdw-card .mdw-card-actions {
  display: flex;
  margin-top: 24px;
}

mdw-card .mdw-card-actions mdw-button + mdw-button {
  margin-left: 6px;
}

mdw-card > .mdw-card-image.mdw-size-small {
  height: 60px;
  transition: height 240ms;
}

mdw-card > .mdw-card-image.mdw-size-medium {
  height: 120px;
  transition: height 240ms;
}

mdw-card > .mdw-card-image.mdw-size-large {
  height: 180px;
  transition: height 240ms;
}


/* --- types --- */

mdw-card.mdw-filled {
  color: var(--mdw-on-surface-variant);
  background-color: var(--mdw-surface-variant);
  box-shadow: none;
}

mdw-card.mdw-filled.mdw-states:focus,
mdw-card.mdw-filled.mdw-states:active,
mdw-card:not(.mdw-no-hover).mdw-filled.mdw-states:hover {
  box-shadow: var(--mdw-elevation-1);
}

mdw-card.mdw-outlined {
  background-color: var(--mdw-surface);
  /* border: 1px solid var(--mdw-outline); */
  /* TODO why does the outline color look too dark. It seems to match the correct value */
  border: 1px solid var(--mdw-neutral-variant-70);
  box-shadow: none;
}

mdw-card.mdw-outlined::before {
  background-color: transparent;
}


/* --- state layer --- */

mdw-card::after {
  position: absolute;
  content: "";
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  border-radius: var(--mdw-shape-medium);
}

mdw-card[onclick]:focus::after,
mdw-card.mdw-fullscreen:not(.mdw-show):focus::after,
mdw-card.mdw-states:focus::after {
  opacity: var(--mdw-state-layer-opacity-focus);
  background-color: var(--mdw-on-surface);
}

/* hover state layers. Media needed to prevent hover on mobile */
@media (hover: hover) {
  mdw-card[onclick]:hover::after,
  mdw-card.mdw-fullscreen:not(.mdw-show):hover::after,
  mdw-card.mdw-states:hover::after {
    opacity: var(--mdw-state-layer-opacity-hover);
    background-color: var(--mdw-on-surface);
  }

  mdw-card.mdw-filled.mdw-fullscreen:not(.mdw-show):hover,
  mdw-card.mdw-filled[onclick]:hover {
    box-shadow: var(--mdw-elevation-1);
  }

  mdw-card:not(.mdw-filled).mdw-fullscreen:not(.mdw-show):hover,
  mdw-card:not(.mdw-filled)[onclick]:hover {
    box-shadow: var(--mdw-elevation-2);
  }
}



/* --- expanding --- */

mdw-card > .mdw-card-content .mdw-expand-arrow {
  position: absolute;
  right: 16px;
  transition: transform 120ms;
  cursor: pointer;
}

mdw-card.mdw-show > .mdw-card-content .mdw-expand-arrow {
  transform: rotate(180deg);
}

mdw-card > .mdw-card-content {
  position: relative;
  padding: 16px;
}

mdw-card > .mdw-card-content > .mdw-contracted {
  opacity: 1;
  transition: opacity 120ms;
}

mdw-card > .mdw-card-content > .mdw-expanded {
  height: 0;
  /* display: none; */
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  background-color: inherit;

  transition: height 120ms;
}

/* mdw-card.mdw-show > .mdw-card-content > .mdw-expanded {
 display: block; 
} */

mdw-card:not(.mdw-fullscreen).mdw-show > .mdw-card-content > .mdw-expanded {
  height: auto;
  opacity: 1;
}


mdw-card.mdw-fullscreen {
  --mdw-card-fullscreen-top: 0;
  --mdw-card-fullscreen-left: 0;
  --mdw-card-fullscreen-width: 0;
  --mdw-card-fullscreen-height: 0;

  animation: mdw-card-fullscreen-card-hide 140ms;
  animation-timing-function: var(--mdw-transition-expand-out);
}

mdw-card.mdw-no-animation {
  animation-duration: 0ms !important;
}

mdw-card[onclick],
mdw-card.mdw-fullscreen:not(.mdw-show) {
  cursor: pointer;
}

mdw-card.mdw-fullscreen.mdw-show {
  position: fixed;
  z-index: 11;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0;
  overflow: auto;

  animation: mdw-card-fullscreen-card-show 360ms;
  animation-timing-function: var(--mdw-transition-expand-in);
}

mdw-card.mdw-fullscreen > .mdw-card-content > .mdw-expanded {
  opacity: 0;
  transition: opacity 120ms;
}

mdw-card.mdw-fullscreen.mdw-show > .mdw-card-content > .mdw-expanded {
  opacity: 1;
  height: auto;
  position: absolute;
  top: 0;
  background-color: var(--mdw-surface);
}

mdw-card.mdw-fullscreen > .mdw-card-image {
  transition: height 140ms, border-radius 80ms 60ms;
  transition-timing-function: var(--mdw-transition-expand-out);
}

mdw-card.mdw-fullscreen > .mdw-card-image.mdw-rounded {
  border-radius: var(--mdw-shape-medium);
}

mdw-card.mdw-fullscreen.mdw-show > .mdw-card-image {
  height: var(--mdw-card-fullscreen-img-height, 300px);
  transition: height 360ms, border-radius 120ms 120ms;
  transition-timing-function: var(--mdw-transition-expand-in);
}
mdw-card.mdw-fullscreen.mdw-show > .mdw-card-image.mdw-rounded {
  border-radius: 0 0 var(--mdw-shape-medium) var(--mdw-shape-medium);
}

@keyframes mdw-card-fullscreen-card-show {
  0% {
    top: var(--mdw-card-fullscreen-top);
    left: var(--mdw-card-fullscreen-left);
    width: var(--mdw-card-fullscreen-width);
    height: var(--mdw-card-fullscreen-height);
    border-radius: var(--mdw-shape-medium);
    overflow: hidden;
  }

  99% {
    overflow: hidden;
  }

  100% {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    border-radius: 0;
  }
}

@keyframes mdw-card-fullscreen-card-hide {
  0% {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    border-radius: 0;
    overflow: hidden;
    z-index: 11;
  }

  1% {
    overflow: hidden;
  }

  100% {
    position: fixed;
    z-index: 11;
    overflow: hidden;
    top: var(--mdw-card-fullscreen-top);
    left: var(--mdw-card-fullscreen-left);
    width: var(--mdw-card-fullscreen-width);
    height: var(--mdw-card-fullscreen-height);
    border-radius: var(--mdw-shape-medium);
  }
}



mdw-card > .mdw-card-fullscreen-back {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 16px;
  left: 16px;
  padding-left: 5px;
  padding-right: 8px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: none;
  opacity: 0;
  transition: opacity 120ms;

  /* color: var(--mdw-surface);
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75); */
}

mdw-card > .mdw-card-fullscreen-back .text {
  font-size: var(--mdw-font-title-size-medium);
  font-weight: var(--mdw-font-title-weight-medium);
  line-height: var(--mdw-font-title-line-height-medium);
  letter-spacing: var(--mdw-font-title-letter-spacing-medium);
  color: var(--mdw-surface);
  margin-left: -6px;

  filter:
    drop-shadow(-1px -1px 1px rgba(0, 0, 0, .3))
    drop-shadow(1px -1px 1px rgba(0, 0, 0, .3))
    drop-shadow(1px 1px 1px rgba(0, 0, 0, .3))
    drop-shadow(-1px 1px 1px rgba(0, 0, 0, .3));
  /* filter: drop-shadow(0 0 3px rgba(0, 0, 0, .5)); */
}

mdw-card > .mdw-card-fullscreen-back > svg {
  transform: scale(1.1);
  fill: var(--mdw-surface);
  /* filter: drop-shadow(0 0 3px rgba(0, 0, 0, .5)); */
  filter:
    drop-shadow(-1px -1px 1px rgba(0, 0, 0, .3))
    drop-shadow(1px -1px 1px rgba(0, 0, 0, .3))
    drop-shadow(1px 1px 1px rgba(0, 0, 0, .3))
    drop-shadow(-1px 1px 1px rgba(0, 0, 0, .3));
}

mdw-card > .mdw-card-fullscreen-back > svg path {
  stroke-width: 0.5px;
  stroke: var(--mdw-surface);
}

mdw-card.mdw-fullscreen.mdw-show > .mdw-card-fullscreen-back {
  opacity: 1;
  pointer-events: auto;
}



/* --- group ---- */

mdw-card-group:not(.mdw-grid) > mdw-card {
  flex-direction: row;
  height: 80px;
  overflow: hidden;
}

mdw-card-group:not(.mdw-grid) > mdw-card > .mdw-card-image {
  width: 80px;
  height: 80px;
}

mdw-card-group:not(.mdw-grid) > mdw-card > .mdw-card-image > img {
  width: unset;
  height: 100%;
}

mdw-card-group:not(.mdw-grid) > mdw-card > .mdw-supporting-text,
mdw-card-group:not(.mdw-grid) > mdw-card .mdw-card-content > .mdw-supporting-text,
mdw-card-group:not(.mdw-grid) > mdw-card.mdw-card-list-item .mdw-card-actions {
  display: none;
}


/* --- swipe action --- */

mdw-card > mdw-card-swipe-action {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 1px;
  left: calc(var(--mdw-card-swipe-action-position) * -1);
  bottom: 0;
  width: 100px;
  padding-top: 18px;
  padding-left: 18px;
  z-index: 0;
  border-radius: var(--mdw-shape-medium) 0 0 var(--mdw-shape-medium);
  box-sizing: border-box;

  background-color: var(--mdw-surface-tint-alpha-16);
  color: var(--mdw-on-surface-variant);

  transition:
    left 120ms,
    background-color 120ms;
}

mdw-card.mdw-outlined > mdw-card-swipe-action {
  top: -1px;
  bottom: -1px;
  border-left: 1px solid var(--mdw-outline);
  border-top: 1px solid var(--mdw-outline);
  border-bottom: 1px solid var(--mdw-outline);
}

mdw-card > mdw-card-swipe-action mdw-icon {
  pointer-events: none;
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
}

mdw-card.mdw-dragging > mdw-card-swipe-action {
  transition: none;
}

mdw-card > mdw-card-swipe-action::after {
  position: absolute;
  content: '';
  top: 0;
  left: var(--mdw-card-swipe-action-position);
  width: 101px;
  padding-top: 18px;
  padding-left: 18px;
  bottom: 0;
  border-radius: var(--mdw-shape-medium) 0 0 var(--mdw-shape-medium);
  background-color: var(--mdw-surface);
  z-index: 1;
  box-sizing: border-box;

  transition: left 120ms;
}

mdw-card.mdw-filled > mdw-card-swipe-action::after {
  background-color: var(--mdw-surface-variant);
}

mdw-card.mdw-dragging > mdw-card-swipe-action::after {
  transition: none;
}

mdw-card > mdw-card-swipe-action[checked] {
  background-color: var(--mdw-surface-tint-alpha-38);
}

mdw-card > mdw-card-swipe-action[checked] mdw-icon {
  font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
}


/* --- orientation landscape --- */


/* mdw-card.mdw-card-orientation-landscape {
  flex-direction: row;
  overflow: hidden;
}

mdw-card.mdw-card-orientation-landscape > .mdw-card-content {
  flex: 1;
  margin-left: 16px;
}

mdw-card.mdw-card-orientation-landscape > .mdw-card-image {
  aspect-ratio: 1 / 1;
  height: 100%;
  width: auto;
}

mdw-card.mdw-card-orientation-landscape > .mdw-card-image > img {
  height: inherit;
  width: auto;
}

mdw-card.mdw-card-orientation-landscape > .mdw-card-image.mdw-size-small {
  height: 80px;
  transition: none;
}

mdw-card.mdw-card-orientation-landscape > .mdw-card-image.mdw-size-medium {
  height: 140px;
  transition: none;
}

mdw-card.mdw-card-orientation-landscape > .mdw-card-image.mdw-size-large {
  height: 200px;
  transition: none;
}

mdw-card.mdw-card-orientation-landscape .mdw-card-actions {
  justify-content: end;
  width: 100%;
} */
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,va];var Tl=va;p.registerGlobalStyleSheet(Tl);var qs=class extends p{#t=this.classList.contains("mdw-fullscreen");#i=!!this.querySelector(":Scope > .mdw-card-content > .mdw-expanded");#e=this.#x.bind(this);#o=this.#k.bind(this);#s=this.#L.bind(this);#l=this.#D.bind(this);#c=this.#T.bind(this);#n=this.#C.bind(this);#a=this.#z.bind(this);#d=this.#R.bind(this);#m;#r;#w=this.querySelector(":scope > mdw-card-swipe-action");#u;#p;#h="";#g=new AbortController;#f=this.#_.bind(this);#b=this.#S.bind(this);#v=this.#E.bind(this);constructor(){super(),this.classList.add("mdw-no-animation")}connectedCallback(){let t=this.querySelector(".mdw-expand-arrow");t&&(t.innerHTML=Ts),this.#t?(this.#r=document.createElement("div"),this.#r.classList.add("mdw-card-fullscreen-back"),this.#r.innerHTML=zs,this.insertAdjacentElement("afterbegin",this.#r),this.#r.addEventListener("click",this.#s,{signal:this.#g.signal}),this.addEventListener("click",this.#o,{signal:this.#g.signal})):this.#i&&this.addEventListener("click",this.#e,{signal:this.#g.signal}),(this.#t||this.hasAttribute("onclick"))&&(this.tabIndex=0,this.addEventListener("focus",this.#f,{signal:this.#g.signal})),this.#A(),this.#w&&(this.#p=new A(this),this.#p.lockScrollY=!0,this.#p.onDrag(this.#c),this.#p.onStart(this.#n),this.#p.onEnd(this.#a),this.#p.enable(),this.#w.addEventListener("click",this.#d,{signal:this.#g.signal})),setTimeout(()=>{this.classList.remove("mdw-no-animation")},200)}disconnectedCallback(){this.classList.add("mdw-no-animation"),this.#g.abort(),this.#w&&this.#p.destroy()}static get observedAttributes(){return["value"]}attributeChangedCallback(t,e,o){this[t]=o}get action(){return this.#h}set value(t){this.#h=t}async remove(){this.style.setProperty("--mdw-card-margin-top-remove",`-${this.offsetHeight}px`),this.classList.add("mdw-remove"),await w.transitionendAsync(this),super.remove()}async#y(){this.#m||(this.#m=document.createElement("div"));let t=this.getBoundingClientRect();this.#m.style.height=`${t.height}px`,this.#m.style.width=`${t.width}px`,this.#m.style.margin=getComputedStyle(this).margin,this.insertAdjacentElement("beforebegin",this.#m),this.style.setProperty("--mdw-card-fullscreen-top",`${t.top}px`),this.style.setProperty("--mdw-card-fullscreen-left",`${t.left}px`),this.style.setProperty("--mdw-card-fullscreen-width",`${t.width}px`),this.style.setProperty("--mdw-card-fullscreen-height",`${t.height}px`),this.classList.add("mdw-show")}#x(){let t=this.querySelector(".mdw-card-content > .mdw-expanded");this.classList.contains("mdw-show")?(t.style.height="",this.classList.remove("mdw-show")):(t.style.height=`${t.offsetHeight+t.scrollHeight}px`,this.classList.add("mdw-show"))}#k(){this.removeEventListener("click",this.#o,{signal:this.#g.signal}),this.#y()}async#L(){this.classList.remove("mdw-show"),await w.animationendAsync(this),this.#m.remove(),this.addEventListener("click",this.#o,{signal:this.#g.signal})}#A(){let t=this.querySelector(":scope > .mdw-card-image img");if(t)if(!t.height)t.addEventListener("load",this.#l,{signal:this.#g.signal});else{let e=t.height/t.width*window.innerWidth;this.style.setProperty("--mdw-card-fullscreen-img-height",`${e}px`)}}#D(){this.querySelector(":scope > .mdw-card-image img").removeEventListener("load",this.#l),this.#A()}#C(){this.classList.add("mdw-dragging"),this.#u=parseInt(getComputedStyle(this).getPropertyValue("--mdw-card-swipe-action-position").replace("px",""))}#T({distance:t}){let e=this.#u+t.x;e>60&&(e=60),e<0&&(e=0),this.style.setProperty("--mdw-card-swipe-action-position",`${e}px`)}async#z(){this.classList.remove("mdw-dragging"),parseInt(getComputedStyle(this).getPropertyValue("--mdw-card-swipe-action-position").replace("px",""))<30?this.style.setProperty("--mdw-card-swipe-action-position","0px"):this.style.setProperty("--mdw-card-swipe-action-position","60px")}#R(){this.#w.classList.contains("mdw-toggle")&&(this.#w.hasAttribute("checked")?this.#w.removeAttribute("checked"):this.#w.setAttribute("checked",""));let t=this.#w.getAttribute("action"),e=this.#w.hasAttribute("action-remove");console.log(e),t&&this.dispatchEvent(new CustomEvent("change",{detail:{action:t,value:this.#h,card:this,...e&&{remove:!0}}})),e&&this.remove(),setTimeout(()=>{this.style.setProperty("--mdw-card-swipe-action-position","0px")},240)}#_(){this.addEventListener("blur",this.#b,{signal:this.#g.signal}),this.addEventListener("keydown",this.#v,{signal:this.#g.signal})}#S(){this.removeEventListener("blur",this.#b,{signal:this.#g.signal}),this.removeEventListener("keydown",this.#v,{signal:this.#g.signal})}#E(t){(t.code==="Enter"||t.code==="Space")&&(this.click(),t.preventDefault())}};customElements.define("mdw-card",qs);var ya=new CSSStyleSheet;ya.replaceSync(`mdw-card-group,
mdw-card-group.mdw-grid {
  display: grid;
  grid-template-columns: repeat(var(--mdw-card-group-columns), 1fr);
  grid-column-gap: 8px;
  /* grid-auto-rows: minmax(80px, auto); */
}

body.mdw-mobile mdw-card-group:not(.mdw-grid),
mdw-card-group.mdw-list {
  display: flex;
  flex-direction: column;
}


mdw-card-group > mdw-card.mdw-card-grid-cell {
  height: fit-content;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,ya];var zl=ya;p.registerGlobalStyleSheet(zl);customElements.define("mdw-card-group",class extends p{#t=[];#i=this.classList.contains("mdw-auto-span-row");#e=new MutationObserver(this.#n.bind(this));constructor(){super(),this.#s(),this.#e.observe(this,{childList:!0})}disconnectedCallback(){this.#e.disconnect()}get#o(){return this.classList.contains("mdw-grid")||!this.classList.contains("mdw-grid")&&!v.isMobile}get autoSpanRow(){return this.#i()}set autoSpanRow(t){this.#i=!!t,this.#s()}connectedCallback(){setTimeout(()=>{this.#s()})}#s(){this.#t.forEach(({element:t,styleHeight:e})=>{t.classList.contains("mdw-show")?t.style.height="":t.style.height=e||""}),this.#t=[...this.querySelectorAll("mdw-card")].map(t=>({height:t.offsetHeight,styleHeight:t.style.height,element:t})),this.#t.length!==0&&(this.#o?this.#l():this.#c())}#l(){this.classList.add("mdw-grid"),this.classList.remove("mdw-list"),this.#t.sort((o,s)=>o.height-s.height);let t=this.#t[0].height;if(this.#t.forEach(({element:o,height:s})=>{if(o.classList.contains("mdw-show"))return;let r=Math.ceil(s/t);t>1&&(o.style.gridRowEnd=`span ${r}`,this.#i?o.style.height=`${t*r}px`:o.style.height=`${s}px`)}),this.scrollWidth-this.offsetWidth>0){let o=0;[...this.querySelectorAll("mdw-card")].forEach(s=>{s.offsetWidth>o&&(o=s.offsetWidth)}),this.style.setProperty("--mdw-card-group-columns",Math.max(1,Math.floor(this.offsetWidth/o)))}}#c(){this.classList.remove("mdw-grid"),this.#t.forEach(({element:t})=>{t.style.height="unset"})}#n(){this.#e.disconnect(),this.#s(),this.#e.observe(this,{childList:!0})}});var xa=new CSSStyleSheet;xa.replaceSync(`:host {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  outline: none;
  margin: 9px 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

:host > input {
  display: none;
  pointer-events: none;
  user-select: none;
}

:host(.mdw-invalid) {
  color: var(--mdw-error);
}

:host(.mdw-invalid) .background {
  border-color: var(--mdw-error);
}

:host([disabled]) {
  pointer-events: none;
  cursor: unset;
  color: var(--mdw-on-surface);
  opacity: 0.38;
}

:host > slot {
  display: inline-flex;
  align-items: center;
  user-select: none;
  cursor: inherit;
  white-space: nowrap;
  margin-left: 16px;

  font-size: var(--mdw-font-label-size-large);
  font-weight: var(--mdw-font-label-weight-large);
  line-height: var(--mdw-font-label-line-height-large);
  letter-spacing: var(--mdw-font-label-letter-spacing-large);
}

:host(.mdw-label-right) slot {
  order: 0;
}

:host > .background {
  position: relative;
  display: inline-block;
  height: 16px;
  width: 16px;
  box-sizing: border-box;
  vertical-align: middle;

  border: 2px solid;
  border-color: var(--mdw-on-surface);
  border-radius: 2px;

  transition:
    border-color 90ms cubic-bezier(0, 0, 0.2, 0.1),
    background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}

:host > .background::before {
  content: '';
  position: absolute;
  top: -12px;
  left: -12px;
  right: -12px;
  bottom: -12px;
  border-radius: 50%;
  background-color: var(--mdw-primary);
  opacity: 0;
  transition: opacity 100ms;
}

:host(:focus) > .background::before {
  opacity: var(--mdw-state-layer-opacity-focus);
  transition: opacity 180ms;
}

/* hover state layers. Media needed to prevent hover on mobile */
@media (hover: hover) {
  :host(:hover) > .background::before {
    opacity: var(--mdw-state-layer-opacity-focus);
    transition: opacity 180ms;
  }
}

:host(.mdw-error) > .background {
  border-color: var(--mdw-error);
}

:host(.mdw-checked) > .background,
:host(.mdw-indeterminate) > .background {
  background-color: var(--mdw-primary);
  border-color: var(--mdw-primary);
}

:host(.mdw-checked.mdw-error) > .background,
:host(.mdw-indeterminate.mdw-error) > .background {
  background-color: var(--mdw-error);
  border-color: var(--mdw-error);
}

:host > .background > svg {
  position: absolute;
  top: -2px;
  left: -2px;
  width: 16px;

  fill: var(--mdw-on-primary);
}

:host(.mdw-error) > .background > svg {
  fill: var(--mdw-on-error);
}

:host > .background > svg > path {
  stroke-dashoffset: 22.910259;
  stroke-dasharray: 22.910259;
  stroke-width: 3px;

  stroke: var(--mdw-on-primary);
  animation: uncheck 90ms;
}

:host(.mdw-error) > .background > svg > path {
  stroke: var(--mdw-on-error);
}

:host(.mdw-checked:not(.mdw-indeterminate)) > .background > svg > path {
  stroke-dashoffset: 0;
  animation: check 180ms;
}

:host(.mdw-no-animation) > .background > svg > path {
  animation-duration: 0s !important;
}

:host > .background > .indeterminate-check {
  position: absolute;
  top: 5px;
  left: 4px;
  margin-left: -2px;
  width: 0;
  height: 2px;
  border-radius: 1px;

  background-color: var(--mdw-on-primary);
  pointer-events: none;

  transition: width 90ms;
}

:host(.mdw-indeterminate) > .background > .indeterminate-check {
  width: 8px;
  transition: width 180ms;
}

:host(.mdw-indeterminate.mdw-error) > .background > .indeterminate-check {
  background-color: var(--mdw-on-error);
}


@keyframes check {

  0%,
  50% {
    stroke-dashoffset: 22.910259;
  }

  50% {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1);
  }

  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes uncheck {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
    stroke-dashoffset: 0
  }

  to {
    stroke-dashoffset: -22.910259
  }
}


/* --- Ripple --- */

.ripple {
  border-radius: inherit;
  position: absolute;
  top: -6px;
  left: -6px;
  width: 24px;
  height: 24px;
  pointer-events: none;
}

.ripple > .mdw-ripple-element {
  background-color: var(--mdw-primary);
  opacity: var(--mdw-state-layer-opacity-pressed);
}

:host(.mdw-error) .ripple > .mdw-ripple-element {
  background-color: var(--mdw-error);
  opacity: var(--mdw-state-layer-opacity-pressed);
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,xa];var $l=xa;var ka=new CSSStyleSheet;ka.replaceSync(`mdw-textfield + mdw-checkbox,
mdw-select + mdw-checkbox {
  margin-top: 0;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,ka];var _l=ka;p.registerGlobalStyleSheet(_l);var nt,Tt,Ae,Ce,$i,_i,qi,M,Ri,Me,De,Rs,ql,Kt,Ti,Ps,Rl,Is,Pl,Fs,Il,zi=class extends p{constructor(){super();n(this,Rs);n(this,Kt);n(this,Ps);n(this,Is);n(this,Fs);g(this,"useShadowRoot",!0);n(this,nt,!1);n(this,Tt,!1);n(this,Ae,"on");n(this,Ce,!1);n(this,$i,l(this,Rs,ql).bind(this));n(this,_i,l(this,Kt,Ti).bind(this));n(this,qi,void 0);n(this,M,void 0);n(this,Ri,l(this,Ps,Rl).bind(this));n(this,Me,l(this,Is,Pl).bind(this));n(this,De,l(this,Fs,Il).bind(this));this.classList.add("mdw-no-animation")}connectedCallback(){if(this.setAttribute("role","checkbox"),this.parentElement?.nodeName!=="MDW-LIST-ITEM"&&(this.tabIndex=0),this.hasAttribute("aria-label")||this.setAttribute("aria-label",w.getTextFromNode(this)||"checkbox"),this.addEventListener("focus",i(this,Ri)),!this.hasAttribute("aria-label")){let e=w.getTextFromNode(this);e&&this.setAttribute("aria-label",e)}}disconnectedCallback(){this.removeEventListener("click",i(this,$i)),this.removeEventListener("focus",i(this,Ri)),this.removeEventListener("blur",i(this,Me)),this.removeEventListener("keydown",i(this,De)),i(this,M).removeEventListener("invalid",i(this,_i)),i(this,qi).destroy()}afterRender(){m(this,M,this.shadowRoot.querySelector("input")),i(this,M).checked=i(this,nt),i(this,M).indeterminate=i(this,Tt),i(this,M).value=i(this,Ae),this.hasAttribute("required")&&(i(this,M).required=!0,i(this,M).addEventListener("invalid",i(this,_i))),this.addEventListener("click",i(this,$i)),m(this,qi,new P({element:this.shadowRoot.querySelector(".ripple"),triggerElement:this,centered:!0})),setTimeout(()=>{this.classList.remove("mdw-no-animation")},200)}template(){return`
      <input type="checkbox">
      <div class="background">
        <svg version="1.1" focusable="false" viewBox="0 0 24 24">
          <path fill="none" stroke="white" d="M4.1,12.7 9,17.6 20.3,6.3" ></path>
        </svg>
        <div class="indeterminate-check"></div>
        <div class="ripple"></div>
      </div>

      <slot></slot>
    `}static get observedAttributes(){return["checked","indeterminate","disabled","value"]}attributeChangedCallback(e,o,s){e==="checked"?this.checked=s!==null:e==="indeterminate"?this.indeterminate=s!==null:e==="disabled"?this.disabled=s!==null:this[e]=s}get checked(){return i(this,nt)}set checked(e){m(this,nt,!!e),i(this,M)&&(i(this,M).checked=i(this,nt)),this.classList.toggle("mdw-checked",i(this,nt)),this.setAttribute("aria-checked",i(this,nt).toString()||"false"),l(this,Kt,Ti).call(this)}get indeterminate(){return i(this,Tt)}set indeterminate(e){m(this,Tt,!!e),i(this,M)&&(i(this,M).indeterminate=i(this,Tt)),this.classList.toggle("mdw-indeterminate",i(this,Tt)),e===!0?this.setAttribute("aria-checked","mixed"):this.setAttribute("aria-checked",i(this,nt).toString()||"false")}get disabled(){return i(this,Ce)}set disabled(e){m(this,Ce,!!e),this.toggleAttribute("disabled",i(this,Ce))}get value(){return i(this,Ae)}set value(e){m(this,Ae,e),i(this,M)&&(i(this,M).value=e)}get validity(){return i(this,M).validity}reportValidity(){return i(this,M).reportValidity()}checkValidity(){return i(this,M).checkValidity()}};nt=new WeakMap,Tt=new WeakMap,Ae=new WeakMap,Ce=new WeakMap,$i=new WeakMap,_i=new WeakMap,qi=new WeakMap,M=new WeakMap,Ri=new WeakMap,Me=new WeakMap,De=new WeakMap,Rs=new WeakSet,ql=function(){this.checked=!i(this,nt),l(this,Kt,Ti).call(this),this.blur(),this.dispatchEvent(new Event("change"))},Kt=new WeakSet,Ti=function(){i(this,M)&&this.classList.toggle("mdw-invalid",!i(this,M).validity.valid)},Ps=new WeakSet,Rl=function(){this.addEventListener("blur",i(this,Me)),this.addEventListener("keydown",i(this,De))},Is=new WeakSet,Pl=function(){this.removeEventListener("blur",i(this,Me)),this.removeEventListener("keydown",i(this,De))},Fs=new WeakSet,Il=function(e){e.code==="Space"&&(this.checked=!this.checked,l(this,Kt,Ti).call(this),this.dispatchEvent(new Event("change")),e.preventDefault())},g(zi,"styleSheets",$l);customElements.define("mdw-checkbox",zi);var Sa=new CSSStyleSheet;Sa.replaceSync(`mdw-chip-group {
  display: flex;
  overflow-x: auto;
}

mdw-chip-group:not(.mdw-wrap) mdw-chip {
  margin-right: 8px;
}

mdw-chip-group:not(.mdw-wrap) mdw-chip:last-of-type {
  margin-right: 0;
}

mdw-chip-group.mdw-wrap {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 8px;
  row-gap: 8px;
}


mdw-chip-group.mdw-filter > mdw-chip[checked],
mdw-chip-group.mdw-filter-menu > mdw-chip[checked] {
  border-color: transparent;
  background-color: var(--mdw-secondary-container);
  color: var(--mdw-on-secondary-container);
}

mdw-chip-group > mdw-chip > mdw-menu.mdw-panel mdw-button[checked] {
  background-color: var(--mdw-secondary-container);
  color: var(--mdw-on-secondary-container);
}

mdw-chip-group.mdw-elevated > mdw-chip {
  background-color: var(--mdw-surface);
}


mdw-chip-group > mdw-chip > mdw-menu.mdw-panel {
  border-radius: var(--mdw-shape-small);
}

mdw-chip-group > mdw-chip > mdw-menu.mdw-panel mdw-button {
  height: 32px;
  line-height: 32px;
}

mdw-chip-group > mdw-chip > mdw-menu.mdw-panel mdw-button::after {
  height: 32px;
}


mdw-chip-group > mdw-chip .mdw-select-arrow {
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid var(--mdw-on-surface-alpha-60);
  margin-left: 8px;
  margin-right: -4px;
  transform-origin: center;
  transform: rotate(-180deg);
  transition: transform 180ms;
  pointer-events: none;
}

mdw-chip-group > mdw-chip.mdw-open .mdw-select-arrow {
  transform: rotate(0);
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Sa];var Fl=Sa;p.registerGlobalStyleSheet(Fl);customElements.define("mdw-chip-group",class extends p{#t=this.#s();#i="";#e;#o=this.#l.bind(this);constructor(){super()}connectedCallback(){this.#e||(this.#e=new A(this),this.#e.desktopOnly=!0,this.#e.onDrag(this.#o),this.#e.enable())}disconnectedCallback(){this.#e.destroy()}get value(){if(this.#t==="filter"){let t=[...this.querySelectorAll("mdw-chip[checked]")];t.length===0?this.#i="":this.#i=t.map(e=>e.value).filter(e=>!!e).join(",")}return this.#t==="input"&&(this.#i=[...this.querySelectorAll("mdw-chip")].map(t=>t.value).join(" ")),this.#i}set value(t){this.#i=t}addSuggestion(t,e){let o=document.createElement("mdw-chip");o.setAttribute("value",t),o.innerHTML=e,this.insertAdjacentElement("beforeend",o)}removeSuggestion(t){let e=this.querySelector(`mdw-chip[value="${t}"]`);e&&e.remove()}#s(){return this.classList.contains("mdw-input")?"input":this.classList.contains("mdw-filter")?"filter":this.classList.contains("mdw-suggestion")?"suggestion":"assist"}#l({distance:t}){this.scrollLeft-=t.x}});var Ea=new CSSStyleSheet;Ea.replaceSync(`:host {
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 12px;
  /* TODO check outline color */
  /* border: 1px solid var(--mdw-outline); */
  border: 1px solid var(--mdw-neutral-variant-60);
  border-radius: var(--mdw-shape-small);
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  user-select: none;

  font-size: var(--mdw-font-label-size-large);
  font-weight: var(--mdw-font-label-weight-large);
  letter-spacing: var(--mdw-font-label-letter-spacing-large);

  color: var(--mdw-on-surface);
}

:host(.mdw-elevated) {
  box-shadow: var(--mdw-elevation-1);
}
:host(.mdw-elevated)::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: var(--mdw-elevation-tint-1);
  border-radius: inherit;
}

:host .check,
:host .clear {
  display: none;
  position: relative;
  color: var(--mdw-primary);
  width: 18px;
  height: 18px;
  align-self: center;
}

:host .check {
  margin-top: -6px;
  margin-right: 8px;
  margin-left: -6px;
  pointer-events: none;
}

:host([checked]) .check {
  display: block;
}

:host .clear {
  margin-left: 4px;
  margin-right: -4px;
  cursor: pointer;
}

:host .clear:after {
  position: absolute;
  content: '';
  top: -1px;
  left: -1px;
  right: -3px;
  bottom: -3px;
  border-radius: 50%;
}

:host(.mdw-input) .clear {
  display: block;
}

:host ::slotted(mdw-icon) {
  margin-top: -2px;
  margin-right: 5px;
  margin-left: -5px;
  width: var(--mdw-font-icon-size-small) !important;
  height: var(--mdw-font-icon-size-small) !important;
  font-size: var(--mdw-font-icon-size-small) !important;
  line-height: var(--mdw-font-icon-size-small) !important;
  user-select: none;
}

:host(.mdw-filter[checked]) ::slotted(mdw-icon),
:host(.mdw-filter-menu[checked]) ::slotted(mdw-icon) {
  display: none !important;
}


/* state layer */
:host::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: var(--mdw-shape-small);
  background-color: var(--mdw-on-surface);
  opacity: 0;
  pointer-events: none;
}


@media (hover: hover) {
  :host(:hover)::after {
    opacity: var(--mdw-state-layer-opacity-hover);
  }

  :host .clear:hover::after {
    background-color: var(--mdw-on-surface-alpha-12);
  }
}

:host(:focus)::after {
  opacity: var(--mdw-state-layer-opacity-hover);
}


/* --- Ripple --- */

.ripple {
  overflow: hidden;
  border-radius: inherit;
  transform: translateZ(0);
  /* fixes bug on ios safari */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
}

.ripple > .mdw-ripple-element {
  background-color: var(--mdw-primary);
  opacity: var(--mdw-state-layer-opacity-pressed);
}


/* --- input chip --- */
:host input {
  display: none;
  /* this is needed for type time on ios */
  box-sizing: border-box;
  border: none;
  background: none;
  outline: none;
  padding: 0;
  margin: 0;

  text-decoration: inherit;
  text-transform: inherit;
  font-size: var(--mdw-font-label-size-large);
  font-weight: var(--mdw-font-label-weight-large);
  letter-spacing: var(--mdw-font-label-letter-spacing-large);
  color: var(--mdw-on-surface);
  caret-color: var(--mdw-primary);

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

:host(.mdw-edit) input {
 display: block;
}

:host(.mdw-edit)::after,
:host(.mdw-edit) .ripple,
:host(.mdw-edit) .clear,
:host(.mdw-edit) .value-display,
:host(.mdw-edit) slot {
  display: none;
}


:host(.mdw-edit) {
  border: none;
}

`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Ea];var Ol=Ea;var La,I,rt,Te,Pi,T,Ii,Qt,Jt,W,zt,ze,Fi,Ns,$e,_e,qe,Hs,Vs,q,Ys,Oi,Ni,Hi,js,Nl,Ws,Hl,Bs,Vl,Gs,Yl,Zs,jl,Us,Wl,Re,Os,Xs,Bl,Ks,Gl,Qs,Zl,Js,Ul,tn,Xl;customElements.define("mdw-chip",(La=class extends p{constructor(){super();n(this,js);n(this,Ws);n(this,Bs);n(this,Gs);n(this,Zs);n(this,Us);n(this,Re);n(this,Xs);n(this,Ks);n(this,Qs);n(this,Js);n(this,tn);g(this,"useShadowRoot",!0);g(this,"useTemplate",!1);n(this,I,void 0);n(this,rt,"");n(this,Te,!1);n(this,Pi,void 0);n(this,T,void 0);n(this,Ii,void 0);n(this,Qt,void 0);n(this,Jt,void 0);n(this,W,void 0);n(this,zt,"");n(this,ze,void 0);n(this,Fi,l(this,Gs,Yl).bind(this));n(this,Ns,l(this,Zs,jl).bind(this));n(this,$e,l(this,Re,Os).bind(this));n(this,_e,l(this,Xs,Bl).bind(this));n(this,qe,l(this,Ks,Gl).bind(this));n(this,Hs,l(this,js,Nl).bind(this));n(this,Vs,l(this,Ws,Hl).bind(this));n(this,q,new AbortController);n(this,Ys,l(this,Qs,Zl).bind(this));n(this,Oi,l(this,Js,Ul).bind(this));n(this,Ni,l(this,tn,Xl).bind(this));n(this,Hi,l(this,Bs,Vl).bind(this))}connectedCallback(){this.tabIndex=0,m(this,W,this.parentElement),m(this,ze,this.querySelector("mdw-menu")),m(this,zt,this.getAttribute("menu")),m(this,I,l(this,Us,Wl).call(this)),this.addEventListener("focus",i(this,Ys),{signal:i(this,q).signal}),this.querySelector("mdw-menu")&&(m(this,Qt,w.getTextFromNode(this)),m(this,Jt,i(this,Qt)))}afterRender(){i(this,ze)&&(this.insertAdjacentHTML("beforeend",'<div class="mdw-select-arrow"></div>'),this.querySelector("mdw-menu").addEventListener("open",i(this,Hs),{signal:i(this,q).signal}),this.querySelector("mdw-menu").addEventListener("close",i(this,Vs),{signal:i(this,q).signal})),w.addClickTimeout(this,i(this,Fi)),i(this,I)==="input"&&(m(this,Ii,this.shadowRoot.querySelector(".value-display")),this.shadowRoot.querySelector(".clear").addEventListener("click",i(this,Ns),{signal:i(this,q).signal}),m(this,T,this.shadowRoot.querySelector("input"))),m(this,Pi,new P({element:this.shadowRoot.querySelector(".ripple"),triggerElement:this,ignoreElements:[this.querySelector("mdw-menu")]}))}disconnectedCallback(){i(this,q).abort(),w.removeClickTimeout(this,i(this,Fi)),i(this,Pi).destroy()}static get observedAttributes(){return["value","checked"]}attributeChangedCallback(e,o,s){e==="checked"?this.checked=s!==null:this[e]=s}get value(){return i(this,zt)?`${i(this,zt)}:${i(this,rt)}`:i(this,rt)}set value(e){if(i(this,zt)){m(this,rt,e.replace(`${i(this,zt)}:`,""));let o=this.querySelector("mdw-button[checked]");o&&o.removeAttribute("checked");let s=this.querySelector(`mdw-button[value="${i(this,rt)}"]`);s&&s.setAttribute("checked","")}else m(this,rt,e);i(this,I)==="input"&&i(this,rt)===""&&this.remove()}get checked(){return i(this,Te)}set checked(e){m(this,Te,!!e),this.toggleAttribute("checked",i(this,Te))}template(){return`
      ${i(this,I)==="filter"||i(this,I)==="filter-menu"?`<div class="check">${vl}</div>`:""}
      <slot></slot>
      ${i(this,I)==="input"?`
        <input value="${this.value}">
        <span class="value-display">${this.value}</span>
        <div class="clear">${yl}</div>
      `:""}
      <span class="spinner"></span>
      <div class="ripple"></div>
    `}},I=new WeakMap,rt=new WeakMap,Te=new WeakMap,Pi=new WeakMap,T=new WeakMap,Ii=new WeakMap,Qt=new WeakMap,Jt=new WeakMap,W=new WeakMap,zt=new WeakMap,ze=new WeakMap,Fi=new WeakMap,Ns=new WeakMap,$e=new WeakMap,_e=new WeakMap,qe=new WeakMap,Hs=new WeakMap,Vs=new WeakMap,q=new WeakMap,Ys=new WeakMap,Oi=new WeakMap,Ni=new WeakMap,Hi=new WeakMap,js=new WeakSet,Nl=function(){this.classList.add("mdw-open"),this.querySelector("mdw-menu").addEventListener("selected",i(this,Hi))},Ws=new WeakSet,Hl=function(){this.classList.remove("mdw-open"),this.querySelector("mdw-menu").removeEventListener("selected",i(this,Hi));let e=this.querySelector("mdw-menu mdw-button[checked]"),o=[...this.childNodes].find(s=>s.nodeType===3&&s.nodeValue.trim()===i(this,Jt));if(e){let s=w.getTextFromNode(e);o.nodeValue=s,m(this,Jt,s)}else o.nodeValue=i(this,Qt),m(this,Jt,i(this,Qt))},Bs=new WeakSet,Vl=function(e){let o=e.target.getAttribute("value");i(this,rt)!==o?(this.checked=!0,this.value=o):(this.value="",this.checked=!1),i(this,W).dispatchEvent(new Event("change"))},Gs=new WeakSet,Yl=function(){i(this,I)==="filter"&&(this.checked=!this.checked,i(this,W).dispatchEvent(new Event("change"))),i(this,I)==="suggestion"&&(i(this,W).value=this.value,i(this,W).dispatchEvent(new Event("change"))),i(this,I)==="input"&&(this.classList.add("mdw-edit"),l(this,Re,Os).call(this),i(this,T).focus(),i(this,T).select(),i(this,T).addEventListener("input",i(this,$e),{signal:i(this,q).signal}),i(this,T).addEventListener("blur",i(this,_e),{signal:i(this,q).signal}),document.body.addEventListener("keydown",i(this,qe),{signal:i(this,q).signal}))},Zs=new WeakSet,jl=function(e){this.remove(),e.stopPropagation(),i(this,W).dispatchEvent(new Event("change"))},Us=new WeakSet,Wl=function(){let e=i(this,W);return e.classList.contains("mdw-input")?(this.classList.add("mdw-input"),"input"):e.classList.contains("mdw-filter")&&i(this,ze)?(this.classList.add("mdw-filter-menu"),this.setAttribute("role","button"),"filter-menu"):e.classList.contains("mdw-filter")?(this.classList.add("mdw-filter"),this.setAttribute("role","checkbox"),"filter"):e.classList.contains("mdw-suggestion")?(this.classList.add("mdw-suggestion"),this.setAttribute("role","button"),"suggestion"):(this.classList.add("mdw-assist"),"assist")},Re=new WeakSet,Os=function(){let e=w.getTextWidthFromInput(i(this,T));i(this,T).style.width=`${e+20}px`},Xs=new WeakSet,Bl=function(){m(this,rt,i(this,T).value),i(this,Ii).innerText=i(this,T).value,this.classList.remove("mdw-edit"),i(this,T).removeEventListener("input",i(this,$e)),i(this,T).removeEventListener("blur",i(this,_e)),document.body.removeEventListener("keydown",i(this,qe)),i(this,W).dispatchEvent(new Event("change"))},Ks=new WeakSet,Gl=function(e){e.key==="Enter"&&i(this,T).blur()},Qs=new WeakSet,Zl=function(){this.addEventListener("blur",i(this,Oi),{signal:i(this,q).signal}),this.addEventListener("keydown",i(this,Ni),{signal:i(this,q).signal})},Js=new WeakSet,Ul=function(){this.removeEventListener("blur",i(this,Oi),{signal:i(this,q).signal}),this.removeEventListener("keydown",i(this,Ni),{signal:i(this,q).signal})},tn=new WeakSet,Xl=function(e){if(e.code==="Enter"||e.code==="Space"){if(i(this,I)==="input"){if(this.classList.contains("mdw-edit"))return;this.classList.add("mdw-edit"),l(this,Re,Os).call(this),i(this,T).focus(),i(this,T).select(),setTimeout(()=>{i(this,T).addEventListener("input",i(this,$e),{signal:i(this,q).signal}),i(this,T).addEventListener("blur",i(this,_e),{signal:i(this,q).signal}),document.body.addEventListener("keydown",i(this,qe),{signal:i(this,q).signal})})}i(this,I)==="filter"&&this.checked===!1&&(this.checked=!0,i(this,W).dispatchEvent(new Event("change"))),i(this,I)==="filter-menu"&&this.click(),e.preventDefault()}if(e.code==="Backspace"||e.code==="Delete"){if(i(this,I)==="input")return;i(this,I)==="filter"&&this.checked===!0&&(this.checked=!1,i(this,W).dispatchEvent(new Event("change"))),e.preventDefault()}},g(La,"styleSheets",Ol),La));var Kl=new class{#t;#i;#e;#o;#s=/([12]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])(?!\S)/;#l=/([12]\d{3})-(0[1-9]|1[0-2])(?!\S)/;#c=new RegExp("[YMDdAaHhms]+","g");constructor(){let t=Intl.DateTimeFormat().resolvedOptions();this.#e=t.locale,this.#o=t.timeZone,this.#n()}get locale(){return this.#e}set locale(t){try{Intl.DateTimeFormat(t)}catch{throw Error("invalid locale value")}this.#e=t,this.#n()}get timeZone(){return this.#o}set timeZone(t){try{Intl.DateTimeFormat(void 0,{timeZone:t})}catch{throw Error("invalid timeZone value")}this.#o=t,this.#n()}parse(t){if(t!==void 0){if(["null","undefined","Invalid Date"].includes(t))return new Date("");if(typeof t=="number")return new Date(t);if(typeof t=="string"){let e=t.match(this.#s);if(e){let[s,r,a,h]=e;return this.buildFromParts({year:r,month:a,day:h})}let o=t.match(this.#l);if(o){let[s,r,a]=o;return this.buildFromParts({year:r,month:a,day:"01"})}}return new Date(Date.parse(t))}}format(t,e){if(!this.isValid(t))return;let o=this.#t.formatToParts(t).filter(h=>h.type!=="literal"),s=this.#i.formatToParts(t).filter(h=>h.type!=="literal").map(h=>({type:`l${h.type}`,value:h.value})),r=[...o,...s].reduce((h,u)=>(h[u.type]=u.value,h),{}),a={YYYY:h=>h.year,YY:h=>h.year.slice(-2),MMMM:h=>h.lmonth,MMM:h=>h.lmonth.slice(0,3),MM:h=>h.month,DD:h=>h.day,dd:h=>h.day,dddd:h=>h.weekday,ddd:h=>h.weekday.slice(0,3),A:h=>h.dayPeriod,a:h=>h.dayPeriod.toLowerCase(),HH:h=>h.lhour,hh:h=>h.hour,mm:h=>h.minute,ss:h=>h.second};return e.replace(this.#c,h=>(a[h]||this.#a)(r,t))}buildFromParts({year:t,month:e,day:o}){return new Date(t,e-1,o)}isValid(t){return t===void 0||t.constructor.name!=="Date"?!1:!isNaN(t.getTime())}today(){return new Date}getYear(t){return t.getFullYear()}getMonth(t){return t.getMonth()+1}getWeekDay(t){return t.getDay()}getMonthDay(t){return t.getDate()}getFirstDateOfMonth(t){return new Date(this.getYear(t),this.getMonth(t)-1,1)}getMonthNames(){let t=new Intl.DateTimeFormat(this.#e,{month:"long",timeZone:this.#o});return[...Array(12).keys()].map(e=>t.format(new Date(Date.UTC(2021,(e+1)%12))))}getMonthNamesShort(){let t=new Intl.DateTimeFormat(this.#e,{month:"short",timeZone:this.#o});return[...Array(12).keys()].map(e=>t.format(new Date(Date.UTC(2021,(e+1)%12))))}getParts(t){return{year:this.getYear(t),month:this.getMonth(t),day:this.getMonthDay(t)}}addToDateByParts(t,{year:e,month:o,day:s}){let r=this.getParts(t);return e&&(r.year+=e),o&&(r.month+=o),s&&(r.day+=s),this.buildFromParts(r)}setDateByParts(t,{year:e,month:o,day:s}){let r=this.getParts(t);return e&&(r.year=e),o&&(r.month=o),s&&(r.day=s),this.buildFromParts(r)}getDayNames(t){let e=new Intl.DateTimeFormat(this.#e,{weekday:t}).format;return[...Array(7).keys()].map(o=>e(new Date(Date.UTC(2021,5,o))))}defaultYearRange(t=this.getYear(new Date)-50,e=100){return[...new Array(e)].map((o,s)=>t+s)}getMonthDays(t,{fillNextMonth:e=!1,fillPreviousMonth:o=!0,minDate:s,maxDate:r,extraRow:a=!0}){s&&!this.isValid(s)&&(s=void 0),r&&!this.isValid(r)&&(r=void 0);let h=this.getWeekDay(this.getFirstDateOfMonth(t)),u=this.getYear(t),b=this.getMonth(t),f=this.getParts(this.today()),k=this.setDateByParts(t,{day:1});k=this.addToDateByParts(k,{day:-h});let _=a===!1?5*7:6*7,it=[...Array(_)].map((ot,vi)=>{let Dt=k,C=this.getParts(Dt),st=0;C.year<u&&(st=-1),C.year>u&&(st=1),C.year===u&&C.month<b&&(st=-1),C.year===u&&C.month>b&&(st=1);let Jo=o&&st<0||e&&st>0||st===0?C.day:"",oa=C.month===b,yi=s?Dt.getTime()<s.getTime():!1,ts=r?Dt.getTime()>r.getTime():!1,lh=!yi&&!ts&&Jo!=="",mh=f.year===C.year&&f.month===C.month&&f.day===C.day,ch=Dt.getDay();return k=this.addToDateByParts(Dt,{day:1}),{date:Dt,display:Jo,interactive:lh,currentMonth:oa,beforeMinDate:yi,afterMaxDate:ts,isToday:mh,dayOfWeek:ch}}),jt=[];for(;it.length;)jt.push(it.splice(0,7));return jt}getMonthRange(t,e){t=this.setDateByParts(t,{day:1}),e=this.setDateByParts(e,{day:1});let o=[];for(;t.getTime()!==e.getTime();)o.push(t),t=this.addToDateByParts(t,{month:1});return o.push(e),o}#n(){this.#t=Intl.DateTimeFormat(this.#e,{weekday:"long",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZone:this.#o}),this.#i=Intl.DateTimeFormat(this.#e,{month:"long",hour:"2-digit",hour12:!1,timeZone:this.#o})}#a(t){return t}};window.mdwDate=Kl;var c=Kl;var Aa=new CSSStyleSheet;Aa.replaceSync(`/*
  To make calculating position easier we do not set display: none;
  instead we set translateY(10000px) to push the panel off screen

  The alternative would be to calculate the height using computed css (only works when css height set)
  or to programmatically set display be fore calculating position
*/

mdw-panel,
.mdw-panel {
  display: flex;
  position: fixed;
  flex-direction: column;
  max-width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  z-index: 11;
  left: 50%;
  top: 50%;
  pointer-events: none;
  

  opacity: 0;
  /* transform: translate(-50%, calc(-50% - 120px)); */
  /* kick off screen so pointer events to hit */
  transform: translateY(10000px);

  animation: mdw-panel-hide 280ms;
  animation-timing-function: var(--mdw-transition-expand-out);
}

/* mdw-panel:not([open]),
.mdw-panel:not([open]) {
  max-height: 56px;
} */

mdw-panel.mdw-animating::-webkit-scrollbar,
.mdw-panel.mdw-animating::-webkit-scrollbar {
  display: none;
}

mdw-panel.mdw-target,
.mdw-panel.mdw-target {
  /* transform: translateY(-120px); */
  animation: mdw-panel-hide-target 280ms;
}


mdw-panel[open],
.mdw-panel[open] {
  display: flex;
  opacity: 1;
  transform: translate(-50%, -50%);
  pointer-events: all;

  animation: mdw-panel-show 280ms;
  animation-timing-function: var(--mdw-transition-expand-in);
}

mdw-panel[open].mdw-target,
.mdw-panel[open].mdw-target {
  transform: translateY(0);
  animation: mdw-panel-show-target 280ms;
}

mdw-panel.mdw-animation-scale,
mdw-panel.mdw-animation-scale.mdw-target,
.mdw-panel.mdw-animation-scale,
.mdw-panel.mdw-animation-scale.mdw-target {
  animation: mdw-panel-hide-scale 180ms;
}

mdw-panel[open].mdw-animation-scale,
mdw-panel[open].mdw-animation-scale.mdw-target,
.mdw-panel[open].mdw-animation-scale,
.mdw-panel[open].mdw-animation-scale.mdw-target {
  animation: mdw-panel-show-scale 180ms;
}

/** have to use transition for max-height because it can be set from more than one place
 *  To use max-height in animation we would need to exact number
 */
mdw-panel:not([open]).mdw-animation-expand,
mdw-panel:not([open]).mdw-animation-expand.mdw-target,
.mdw-panel:not([open]).mdw-animation-expand,
.mdw-panel:not([open]).mdw-animation-expand.mdw-target {
  max-height: 12px;
  transition: max-height 100ms;
  transition-timing-function: var(--mdw-transition-expand-out);
  animation: mdw-panel-hide-expand 180ms;
}

mdw-panel[open].mdw-animation-expand,
mdw-panel[open].mdw-animation-expand.mdw-target,
.mdw-panel[open].mdw-animation-expand,
.mdw-panel[open].mdw-animation-expand.mdw-target {
  animation: mdw-panel-show-expand 180ms;
}

mdw-panel:not([open]).mdw-animation-transitionYReverse,
mdw-panel:not([open]).mdw-animation-transitionYReverse.mdw-target,
.mdw-panel:not([open]).mdw-animation-transitionYReverse,
.mdw-panel:not([open]).mdw-animation-transitionYReverse.mdw-target {
  animation: mdw-panel-hide-transitionYReverse 180ms;
}

mdw-panel[open].mdw-animation-transitionYReverse,
mdw-panel[open].mdw-animation-transitionYReverse.mdw-target,
.mdw-panel[open].mdw-animation-transitionYReverse,
.mdw-panel[open].mdw-animation-transitionYReverse.mdw-target {
  animation: mdw-panel-show-transitionYReverse 180ms;
}


mdw-panel:not([open]).mdw-animation-opacity,
mdw-panel:not([open]).mdw-animation-opacity.mdw-target,
.mdw-panel:not([open]).mdw-animation-opacity,
.mdw-panel:not([open]).mdw-animation-opacity.mdw-target {
  transition-timing-function: linear;
  animation: mdw-panel-hide-opacity 80ms;
}

mdw-panel[open].mdw-animation-opacity,
mdw-panel[open].mdw-animation-opacity.mdw-target,
.mdw-panel[open].mdw-animation-opacity,
.mdw-panel[open].mdw-animation-opacity.mdw-target {
  transition-timing-function: linear;
  animation: mdw-panel-show-opacity 80ms;
}

mdw-panel.mdw-no-animation,
mdw-panel.mdw-no-animation.mdw-target,
.mdw-panel.mdw-no-animation,
.mdw-panel.mdw-no-animation.mdw-target {
  animation: none;
  transition: none;
}



@keyframes mdw-panel-show {
  0% {
    opacity: 0;
    transform: translate(-50%, calc(-50% - 120px));
  }
  60% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%);
  }
}

@keyframes mdw-panel-hide {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  70% {
    opacity: 0;
  }
  100% {
    transform: translate(-50%, calc(-50% - 120px));
  }
}

@keyframes mdw-panel-show-target {
  0% {
    opacity: 0;
    transform: translateY(-120px);
  }
  60% {
    opacity: 1;
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes mdw-panel-hide-target {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  70% {
    opacity: 0;
  }
  100% {
    transform: translateY(-120px);
  }
}

@keyframes mdw-panel-show-scale {
  0% {
    opacity: 0;
    transform: scale(0.9)
  }
  60% {
    opacity: 1;
  }
  100% {
    transform: scale(1)
  }
}

@keyframes mdw-panel-hide-scale {
  0% {
    opacity: 1;
    transform: scale(1)
  }
  70% {
    opacity: 0;
  }
  100% {
    transform: scale(0.9)
  }
}

@keyframes mdw-panel-show-expand {
  0% {
    opacity: 0;
    max-height: 12px;
  }
  60% {
    opacity: 1;
  }
}

@keyframes mdw-panel-hide-expand {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(0);
  }
}

@keyframes mdw-panel-show-transitionYReverse {
  0% {
    opacity: 0;
    transform: translate(-50%, calc(-50% + 120px));
  }

  60% {
    opacity: 1;
  }

  100% {
    transform: translate(-50%, -50%);
  }
}

@keyframes mdw-panel-hide-transitionYReverse {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }

  70% {
    opacity: 0;
  }

  100% {
    transform: translate(-50%, calc(-50% + 120px));
  }
}

@keyframes mdw-panel-show-opacity {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes mdw-panel-hide-opacity {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Aa];var en=Aa;p.registerGlobalStyleSheet(en);var y=class extends p{#t=/(auto|scroll)/;#i=["translateY","scale","expand","transitionYReverse","opacity"];#e=this.getAttribute("animation")||"translateY";#o=!1;#s=!0;#l=this.#g.bind(this);#c=[];#n=null;#a;#d;#m;#r=!1;#w=w.rafThrottle(this.#v.bind(this));#u;#p;#h=this.#A.bind(this);constructor(){super()}connectedCallback(){this.classList.add("mdw-panel"),this.classList.add("mdw-no-animation"),this.classList.contains("mdw-position-overlap")&&(this.#r=!0)}disconnectedCallback(){this.#k(),document.body.removeEventListener("click",this.#l),window.addEventListener("keydown",this.#h),this.#m&&this.#m.removeEventListener("scroll",this.#w)}static get observedAttributes(){return["target"]}attributeChangedCallback(t,e,o){this[t]=o}get open(){return this.hasAttribute("open")}get animation(){return this.#e}set animation(t){if(!this.#i.includes(t))throw Error(`not valid values. Must be one of these: ${this.#i.join(",")}`);this.#e=t}get scrim(){return this.#o}set scrim(t){this.#o=t}get clickOutsideClose(){return this.#s}set clickOutsideClose(t){this.#s=t}get target(){return this.#n}set target(t){t&&t.nodeName?this.#n=t:this.#n=document.querySelector(t),this.classList.toggle("mdw-target",!!this.#n)}get positionOverlap(){return this.#r}set positionOverlap(t){this.#r=!!t}addClickOutsideCloseIgnore(t){this.#c.push(t)}show(t=this.#o){this.classList.remove("mdw-no-animation"),this.open!==!0&&(this.#e==="scale"&&this.classList.add("mdw-animation-scale"),this.#e==="expand"&&this.classList.add("mdw-animation-expand"),this.#e==="transitionYReverse"&&this.classList.add("mdw-animation-transitionYReverse"),this.#e==="opacity"&&this.classList.add("mdw-animation-opacity"),t&&this.#x(),this.#n&&this.#f(),this.setAttribute("open",""),this.dispatchEvent(new Event("open")),this.#s===!0&&setTimeout(()=>{document.body.addEventListener("click",this.#l),window.addEventListener("keydown",this.#h)},100),this.#m&&this.#m.addEventListener("scroll",this.#w),this.classList.add("mdw-animating"),w.animationendAsync(this).finally(()=>{this.classList.remove("mdw-animating"),this.#a=this.offsetHeight,this.#d=this.offsetWidth}))}close(){this.open===!0&&(this.#s===!0&&(document.body.removeEventListener("click",this.#l),window.removeEventListener("keydown",this.#h)),this.#m&&this.#m.removeEventListener("scroll",this.#w),this.removeAttribute("open"),this.#k(),this.dispatchEvent(new Event("close")),this.classList.add("mdw-animating"),w.animationendAsync(this).finally(()=>{this.classList.remove("mdw-animating")}))}#g(t){t.target===this||this.contains(t.target)||this.#c.find(o=>o.contains(t.target))||this.close()}#f(){this.#p===void 0&&(this.#p=this.#L()),this.#b(),this.#m=this.#y()}#b(){let t=this.#n.getBoundingClientRect(),{clientWidth:e,clientHeight:o}=document.documentElement;if(this.#p){let a=this.#p.getBoundingClientRect();t={x:t.x-a.x,left:t.left-a.left,right:t.right-a.right,y:t.y-a.y,top:t.top-a.top,bottom:t.bottom-a.bottom,width:t.width,height:t.height}}this.#a||(this.#a=this.offsetHeight),this.#d||(this.#d=this.offsetWidth);let s=t.bottom+this.#a,r=t.left+this.#d;s<=o?(this.style.bottom="unset",this.#r?this.style.top=`${t.top}px`:this.style.top=`${t.bottom}px`):(this.style.top="unset",this.#r?this.style.bottom=`${o-t.bottom}px`:this.style.bottom=`${o-t.top}px`),r<=e?(this.style.right="unset",this.style.left=`${t.left}px`):(this.style.left="unset",this.style.right=`${client.width-t.right}px`)}#v(){this.#b()}#y(){let t=this.#n.parentElement;for(;t!==null;){if(t===document.documentElement)return window;let e=getComputedStyle(t);if(this.#t.test(e.overflow+e.overflowY))return t;t=t.parentElement}}#x(){this.#u||(this.#u=document.createElement("mdw-scrim"),this.insertAdjacentElement("beforebegin",this.#u))}#k(){this.#u&&(this.#u.remove(),this.#u=void 0)}#L(){let t=this.#n.parentElement;for(;t!==null;){if(t===document.body)return null;if(["fixed","absolute"].includes(getComputedStyle(t).position))return t;t=t.parentElement}return null}#A(t){t.code==="Escape"&&this.#s&&(this.close(),t.preventDefault())}};customElements.define("mdw-panel",y);function te(d,t,e){let o=d?d.getFullYear()>=e.getFullYear():!1,s=t?t.getFullYear()<=e.getFullYear():!1,r=c.setDateByParts(e,{day:-1}),a=d?d.getTime()>r.getTime():!1,h=t?c.setDateByParts(c.addToDateByParts(e,{month:1}),{day:1}):"",u=t?t.getTime()<h.getTime():!1;return{previousYearOutOfRange:o,nextYearOutOfRange:s,previousMonthOutOfRange:a,nextMonthOutOfRange:u}}function on(d,t,e,o,s,r,a){return c.getMonthDays(d,{fillPreviousMonth:s,fillNextMonth:r,minDate:e,maxDate:o,extraRow:a}).map(h=>h.map(({display:u,date:b,currentMonth:f,interactive:k,beforeMinDate:_,afterMaxDate:it,isToday:jt})=>{let ot="mdw-day";_&&(ot+=" mdw-before-min-date"),it&&(ot+=" mdw-after-max-date"),k&&(ot+=" mdw-interactive"),(_||it)&&(ot+=" mdw-out-of-range"),jt&&u!==""&&(ot+=" mdw-today"),f||(ot+=" mdw-not-current-month");let vi=c.format(b,"YYYY-MM-dd");return`<div class="${ot}" mdw-date="${vi}" ${t===vi?"selected":""}>${u}</div>`}).join(`
`)).join(`
`)}function sn(d,t,e,o,s,r){let a=c.parse(t).getTime(),h=c.parse(e).getTime(),u=c.setDateByParts(c.addToDateByParts(d,{month:1}),{day:-1}).getDate()+1;return c.getMonthDays(d,{fillPreviousMonth:!1,fillNextMonth:!1,minDate:o,maxDate:s,extraRow:r}).map(b=>b.map(({display:f,date:k,currentMonth:_,interactive:it,beforeMinDate:jt,afterMaxDate:ot,isToday:vi,dayOfWeek:Dt})=>{let C=`mdw-day mdw-week-day-${Dt}`;jt&&(C+=" mdw-before-min-date"),ot&&(C+=" mdw-after-max-date"),it&&(C+=" mdw-interactive"),(jt||ot)&&(C+=" mdw-out-of-range"),vi&&f!==""&&(C+=" mdw-today"),_||(C+=" mdw-not-current-month"),_&&k.getDate()===1&&(C+=" mdw-first-day"),_&&k.getDate()===u&&(C+=" mdw-last-day");let st=c.format(k,"YYYY-MM-dd"),Jo=_&&t===st,oa=_&&e===st,yi=k.getTime(),ts=yi>a&&yi<h;return`<div class="${C}" mdw-date="${st}" ${Jo?"selected start":""} ${oa?"selected end":""} ${ts?"in-selection-range":""}>${f}</div>`}).join(`
`)).join(`
`)}var Ca=new CSSStyleSheet;Ca.replaceSync(`mdw-date-picker-desktop {
  position: relative;
  width: 328px;
  height: 428px;
  max-height: 428px;
  padding: 12px;
  padding-top: 20px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: var(--mdw-shape-large);
  background-color: var(--mdw-surface);
  box-shadow: var(--mdw-elevation-3);
}

mdw-date-picker-desktop::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  background-color: var(--mdw-elevation-tint-3);
  z-index: 1;
  border-radius: inherit;
}

mdw-date-picker-desktop .mdw-control-container {
  display: flex;
  height: 24px;
  align-items: center;
  padding-bottom: 30px;
}

mdw-date-picker-desktop .mdw-control-container > .mdw-icon-svg {
  display: flex;
  width: 32px;
  margin: 0;
  justify-content: center;
  cursor: pointer;
}

mdw-date-picker-desktop .mdw-years-container .mdw-year-item[disabled],
mdw-date-picker-desktop .mdw-months-container .mdw-month-item[disabled],
mdw-date-picker-desktop .mdw-control-container .mdw-year-drop-down[disabled],
mdw-date-picker-desktop .mdw-control-container .mdw-month-drop-down[disabled],
mdw-date-picker-desktop .mdw-control-container .mdw-year-previous[disabled],
mdw-date-picker-desktop .mdw-control-container .mdw-year-next[disabled],
mdw-date-picker-desktop .mdw-control-container .mdw-month-previous[disabled],
mdw-date-picker-desktop .mdw-control-container .mdw-month-next[disabled] {
  pointer-events: none;
  cursor: none;
  opacity: 0.38;
}

mdw-date-picker-desktop.mdw-years-view .mdw-control-container .mdw-month-previous,
mdw-date-picker-desktop.mdw-years-view .mdw-control-container .mdw-month-next,
mdw-date-picker-desktop.mdw-years-view .mdw-control-container .mdw-year-previous,
mdw-date-picker-desktop.mdw-years-view .mdw-control-container .mdw-year-next,
mdw-date-picker-desktop.mdw-months-view .mdw-control-container .mdw-month-previous,
mdw-date-picker-desktop.mdw-months-view .mdw-control-container .mdw-month-next,
mdw-date-picker-desktop.mdw-months-view .mdw-control-container .mdw-year-previous,
mdw-date-picker-desktop.mdw-months-view .mdw-control-container .mdw-year-next {
  pointer-events: none;
  cursor: none;
  opacity: 0;
}

mdw-date-picker-desktop.mdw-years-view .mdw-control-container .mdw-month-drop-down,
mdw-date-picker-desktop.mdw-months-view .mdw-control-container .mdw-year-drop-down {
  opacity: .38;
  pointer-events: none;
}

mdw-date-picker-desktop.mdw-years-view .mdw-control-container .mdw-month-drop-down .mdw-icon-svg,
mdw-date-picker-desktop.mdw-months-view .mdw-control-container .mdw-year-drop-down .mdw-icon-svg {
  opacity: 0;
}

mdw-date-picker-desktop .mdw-control-container > .mdw-month-drop-down {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 102px;
  margin-left: 6px;
  cursor: pointer;
}

mdw-date-picker-desktop .mdw-control-container > .mdw-year-drop-down {
  display: flex;
  align-items: center;
  width: 60px;
  margin-left: 6px;
  cursor: pointer;
}

mdw-date-picker-desktop .mdw-control-container .mdw-month-label,
mdw-date-picker-desktop .mdw-control-container .mdw-year-label {
  font-size: var(--mdw-font-label-size-large);
  font-weight: var(--mdw-font-label-weight-large);
  line-height: var(--mdw-font-label-line-height-large);
  letter-spacing: var(--mdw-font-label-letter-spacing-large);
  color: var(--mdw-on-surface);
  margin-right: 4px
}



mdw-date-picker-desktop .mdw-month-days-container {
  position: relative;
  width: 100%;
  height: 294px;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  pointer-events: none;
  opacity: 1;
  transition: opacity 120ms;
}

mdw-date-picker-desktop.mdw-years-view .mdw-month-days-container,
mdw-date-picker-desktop.mdw-months-view .mdw-month-days-container {
  pointer-events: none;
  opacity: 0;
}

mdw-date-picker-desktop .mdw-month-days-container .mdw-days-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  flex: 1;
  padding: 0 14px;
  margin-bottom: 16px;

  font-size: var(--mdw-font-body-size-small);
  font-weight: var(--mdw-font-body-weight-small);
  line-height: var(--mdw-font-body-line-height-small);
  letter-spacing: var(--mdw-font-body-letter-spacing-small);
  color: var(--mdw-on-surface);
}

mdw-date-picker-desktop .mdw-month-days-container .mdw-days-container {
  position: absolute;
  display: grid;
  top: 40px;
  height: 254px;
  left: 100%;
  grid-template-columns: repeat(7, 40px);
  grid-template-rows: repeat(6, 40px);
  grid-column-gap: 4px;
  grid-row-gap: 0;
  align-items: center;
  justify-items: center;
  pointer-events: none;
  opacity: 0;
}

mdw-date-picker-desktop .mdw-month-days-container .mdw-days-container.mdw-active {
  display: grid;
  left: 0;
  pointer-events: all;
  opacity: 1;
}

mdw-date-picker-desktop.mdw-years-view .mdw-month-days-container .mdw-days-container.mdw-active {
  pointer-events: none;
}

mdw-date-picker-desktop .mdw-month-days-container .mdw-days-container .mdw-day {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  user-select: none;
  box-sizing: border-box;
  cursor: pointer;
  pointer-events: none;
  border-radius: 50%;
  z-index: 1;

  font-size: var(--mdw-font-label-size-small);
  font-weight: var(--mdw-font-label-weight-small);
  line-height: var(--mdw-font-label-line-height-small);
  letter-spacing: var(--mdw-font-label-letter-spacing-small);
  color: var(--mdw-on-surface);
}

mdw-date-picker-desktop .mdw-month-days-container .mdw-days-container .mdw-day::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  border-radius: 50%;
  z-index: -1;
}

mdw-date-picker-desktop .mdw-month-days-container .mdw-days-container .mdw-day.mdw-interactive {
  cursor: pointer;
  pointer-events: auto;
}

mdw-date-picker-desktop .mdw-month-days-container .mdw-days-container .mdw-day.mdw-not-current-month {
  color: var(--mdw-on-surface-alpha-60);
}

mdw-date-picker-desktop .mdw-month-days-container .mdw-days-container .mdw-day.mdw-out-of-range {
  pointer-events: none;
  cursor: auto;
  color: var(--mdw-on-surface-alpha-60);
}

mdw-date-picker-desktop .mdw-month-days-container .mdw-days-container .mdw-day[selected] {
  color: var(--mdw-on-primary);
}

mdw-date-picker-desktop .mdw-month-days-container .mdw-days-container .mdw-day[selected]::before {
  background-color: var(--mdw-primary);
}

mdw-date-picker-desktop .mdw-month-days-container .mdw-days-container .mdw-day.mdw-today {
  border: 1px solid var(--mdw-outline-alpha-60);
}

mdw-date-picker-desktop .mdw-month-days-container .mdw-days-container .mdw-day.mdw-not-current-month[selected] {
  color: var(--mdw-on-primary);
}

mdw-date-picker-desktop .mdw-actions {
  display: flex;
  opacity: 1;
  transition: opacity 120ms;
}

mdw-date-picker-desktop.mdw-years-view .mdw-actions,
mdw-date-picker-desktop.mdw-months-view .mdw-actions {
  opacity: 0;
  pointer-events: none;
}

mdw-date-picker-desktop .mdw-actions > mdw-button:first-of-type {
  margin-right: auto;
}


mdw-date-picker-desktop .mdw-month-days-container .mdw-days-container.mdw-animation-next-to-active {
  animation: mdw-month-next-to-active 180ms;
}

mdw-date-picker-desktop .mdw-month-days-container .mdw-days-container.mdw-animation-next-from-active {
  animation: mdw-month-next-from-active 180ms;
}

mdw-date-picker-desktop .mdw-month-days-container .mdw-days-container.mdw-animation-previous-to-active {
  animation: mdw-month-previous-to-active 180ms;
}

mdw-date-picker-desktop .mdw-month-days-container .mdw-days-container.mdw-animation-previous-from-active {
  animation: mdw-month-previous-from-active 180ms;
}


@keyframes mdw-month-next-to-active {
  0% {
    left: 25%;
    opacity: 0;
  }

  80% {
    opacity: 1;
  }

  100% {
    left: 0;
    opacity: 1;
  }
}

@keyframes mdw-month-next-from-active {
  0% {
    left: 0;
    opacity: 1;
  }

  60% {
    opacity: 0;
  }

  100% {
    left: -25%;
    opacity: 0;
  }
}

@keyframes mdw-month-previous-to-active {
  0% {
    left: -25%;
    opacity: 0;
  }

  80% {
    opacity: 1;
  }

  100% {
    left: 0;
    opacity: 1;
  }
}

@keyframes mdw-month-previous-from-active {
  0% {
    left: 0;
    opacity: 1;
  }

  60% {
    opacity: 0;
  }

  100% {
    left: 25%;
    opacity: 0;
  }
}


/* --- months view --- */

mdw-date-picker-desktop .mdw-months-container {
  position: absolute;
  top: 54px;
  left: 0;
  width: 100%;
  height: 364px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  opacity: 0;
  transition: opacity 120ms;
  background-color: var(--mdw-surface);
  border-radius: var(--mdw-shape-large);
}

mdw-date-picker-desktop.mdw-months-view .mdw-months-container {
  opacity: 1;
  pointer-events: all;
}

mdw-date-picker-desktop .mdw-months-container .mdw-month-item {
  display: flex;
  height: 48px;
  line-height: 48px;
  align-items: center;
  cursor: pointer;
}

mdw-date-picker-desktop .mdw-months-container .mdw-month-item[selected] {
  background-color: var(--mdw-surface-tint-alpha-6);
}

mdw-date-picker-desktop .mdw-months-container .mdw-month-item:hover {
  background-color: var(--mdw-surface-tint-alpha-12);
}

mdw-date-picker-desktop .mdw-months-container .mdw-icon-svg {
  opacity: 0;
  margin: 0 14px;
  pointer-events: none;
}

mdw-date-picker-desktop .mdw-months-container .mdw-month-item[selected] .mdw-icon-svg {
  opacity: 1;
}


/* --- years view --- */

mdw-date-picker-desktop .mdw-years-container {
  position: absolute;
  top: 54px;
  left: 0;
  width: 100%;
  height: 364px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  opacity: 0;
  transition: opacity 120ms;
  background-color: var(--mdw-surface);
  border-radius: var(--mdw-shape-large);
}

mdw-date-picker-desktop.mdw-years-view .mdw-years-container {
  opacity: 1;
  pointer-events: all;
}

mdw-date-picker-desktop .mdw-years-container .mdw-year-item {
  display: flex;
  height: 48px;
  line-height: 48px;
  align-items: center;
  cursor: pointer;
}

mdw-date-picker-desktop .mdw-years-container .mdw-year-item[selected] {
  background-color: var(--mdw-surface-tint-alpha-6);
}

mdw-date-picker-desktop .mdw-years-container .mdw-year-item:hover {
  background-color: var(--mdw-surface-tint-alpha-12);
}

mdw-date-picker-desktop .mdw-years-container .mdw-icon-svg {
  opacity: 0;
  margin: 0 14px;
  pointer-events: none;
}

mdw-date-picker-desktop .mdw-years-container .mdw-year-item[selected] .mdw-icon-svg {
  opacity: 1;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Ca];var Ql=Ca;y.registerGlobalStyleSheet(Ql);customElements.define("mdw-date-picker-desktop",class extends y{useTemplate=!1;#t=this.#L.bind(this);#i=this.#A.bind(this);#e=this.#D.bind(this);#o=this.#T.bind(this);#s=this.#z.bind(this);#l=this.#R.bind(this);#c=this.#_.bind(this);#n=this.#S.bind(this);#a=this.#E.bind(this);#d=this.#$.bind(this);#m=this.#P.bind(this);#r=this.#I.bind(this);#w=this.#q.bind(this);#u=new AbortController;constructor(){super(),this.animation="scale",this.scrim=!1,this.clickOutsideClose=!0,this.target=this.parentElement.control,this.addClickOutsideCloseIgnore(this.parentElement.control)}afterRender(){this.querySelector(".mdw-month-days-container").addEventListener("click",this.#t,{signal:this.#u.signal}),this.querySelector(".mdw-month-next").addEventListener("click",this.#i,{signal:this.#u.signal}),this.querySelector(".mdw-month-previous").addEventListener("click",this.#e,{signal:this.#u.signal}),this.querySelector(".mdw-month-drop-down").addEventListener("click",this.#o,{signal:this.#u.signal}),this.querySelector(".mdw-months-container").addEventListener("click",this.#s,{signal:this.#u.signal}),this.querySelector(".mdw-year-next").addEventListener("click",this.#l,{signal:this.#u.signal}),this.querySelector(".mdw-year-previous").addEventListener("click",this.#c,{signal:this.#u.signal}),this.querySelector(".mdw-year-drop-down").addEventListener("click",this.#n,{signal:this.#u.signal}),this.querySelector(".mdw-years-container").addEventListener("click",this.#a,{signal:this.#u.signal}),this.querySelector(".mdw-cancel").addEventListener("click",this.#r,{signal:this.#u.signal}),this.querySelector(".mdw-clear").addEventListener("click",this.#m,{signal:this.#u.signal}),this.querySelector(".mdw-ok").addEventListener("click",this.#d,{signal:this.#u.signal}),this.addEventListener("open",this.#w,{signal:this.#u.signal})}disconnectedCallback(){super.disconnectedCallback(),this.#u.abort()}get#p(){return this.parentElement.value}set#p(t){this.parentElement.value=t}get#h(){return this.parentElement.displayDate}set#h(t){this.parentElement.displayDate=t}get#g(){return this.parentElement.initialValue}set#f(t){this.parentElement.valueDate=t}get#b(){return this.parentElement.minDate}get#v(){return this.parentElement.maxDate}template(){let{previousYearOutOfRange:t,nextYearOutOfRange:e,previousMonthOutOfRange:o,nextMonthOutOfRange:s}=te(this.#b,this.#v,this.#h);return`
      <div class="mdw-control-container">
        <div class="mdw-month-previous mdw-icon-svg" ${o?"disabled":""}>${Ut}</div>
        <div class="mdw-month-drop-down" ${o&&s?"disabled":""}>
          <div class="mdw-month-label">${c.format(this.#h,"MMMM")}</div>
          <div class="mdw-icon-svg">${Di}</div>
        </div>
        <div class="mdw-month-next mdw-icon-svg" ${s?"disabled":""}>${Xt}</div>
        <div class="mdw-year-previous mdw-icon-svg" ${t?"disabled":""}>${Ut}</div>
        <div class="mdw-year-drop-down" ${t&&e?"disabled":""}>
          <div class="mdw-year-label">${c.getYear(this.#h)}</div>
          <div class="mdw-icon-svg">${Di}</div>
        </div>
        <div class="mdw-year-next mdw-icon-svg" ${e?"disabled":""}>${Xt}</div>
      </div>

      <div class="mdw-month-days-container">
        <div class="mdw-days-header">
          ${c.getDayNames("narrow").map(r=>`<span>${r}</span>`).join(`
`)}
        </div>

        <div class="mdw-days-container mdw-active">${this.#y()}</div>
        <div class="mdw-days-container">${this.#y()}</div>
      </div>

      <div class="mdw-months-container">${this.#k()}</div>
      <div class="mdw-years-container">${this.#x()}</div>

      <div class="mdw-actions">
        <mdw-button class="mdw-clear">Clear</mdw-button>
        <mdw-button class="mdw-cancel">Cancel</mdw-button>
        <mdw-button class="mdw-ok">OK</mdw-button>
      </div>
    `}#y(t=this.#h){return on(t,this.#p,this.#b,this.#v,!0,!0)}#x(){return c.defaultYearRange().map(t=>{let e=this.#b&&this.#b.getFullYear()>t,o=this.#v&&this.#v.getFullYear()<t;return`
        <div class="mdw-year-item" ${e||o?"disabled":""} year="${t}">
          <div class="mdw-icon-svg">${ba}</div>
          ${t}
        </div>
      `}).join(`
`)}#k(){return c.getMonthNames().map((e,o)=>{let s=this.#b&&this.#b.getMonth()>o,r=this.#v&&this.#v.getMonth()<o;return`
        <div class="mdw-month-item" ${s||r?"disabled":""} month="${o+1}">
          <div class="mdw-icon-svg">${ba}</div>
          ${e}
        </div>
      `}).join(`
`)}#L(t){if(!t.target.classList.contains("mdw-day"))return;this.#h=c.parse(t.target.getAttribute("mdw-date")),this.#f=this.#h;let e=this.querySelector(".mdw-day.mdw-interactive[selected]");e&&e.removeAttribute("selected"),t.target.setAttribute("selected",""),t.stopPropagation()}#A(){this.#C(1)}#D(){this.#C(-1)}async#C(t=1){let e=this.querySelector(".mdw-days-container.mdw-active"),o=this.querySelector(".mdw-days-container:not(.mdw-active)"),s=c.addToDateByParts(c.parse(e.querySelector("[mdw-date]:nth-child(10)").getAttribute("mdw-date")),{month:t});o.innerHTML=this.#y(s),this.#M(s),t===1?(o.classList.add("mdw-animation-next-to-active"),e.classList.add("mdw-animation-next-from-active")):(o.classList.add("mdw-animation-previous-to-active"),e.classList.add("mdw-animation-previous-from-active")),await w.animationendAsync(e),o.classList.remove("mdw-animation-next-to-active"),e.classList.remove("mdw-animation-next-from-active"),o.classList.remove("mdw-animation-previous-to-active"),e.classList.remove("mdw-animation-previous-from-active")}#T(){if(this.classList.contains("mdw-months-view"))this.classList.remove("mdw-months-view");else{this.classList.add("mdw-months-view");let t=this.querySelector(".mdw-month-item[selected]");t&&t.removeAttribute("selected");let e=this.querySelector(`.mdw-month-item[month="${c.getMonth(this.#h)}"]`);e&&(e.setAttribute("selected",""),e.scrollIntoView({block:"center"}))}}#z(t){t.target.classList.contains("mdw-month-item")&&(this.#M(c.setDateByParts(this.#h,{month:parseInt(t.target.getAttribute("month"))})),this.classList.remove("mdw-months-view"),t.stopPropagation())}#R(){this.#M(c.addToDateByParts(this.#h,{year:1}))}#_(){this.#M(c.addToDateByParts(this.#h,{year:-1}))}#S(){if(this.classList.contains("mdw-years-view"))this.classList.remove("mdw-years-view");else{this.classList.add("mdw-years-view");let t=this.querySelector(".mdw-year-item[selected]");t&&t.removeAttribute("selected");let e=this.querySelector(`.mdw-year-item[year="${c.getYear(this.#h)}"]`);e&&(e.setAttribute("selected",""),e.scrollIntoView({block:"center"}))}}#E(t){t.target.classList.contains("mdw-year-item")&&(this.#M(c.setDateByParts(this.#h,{year:parseInt(t.target.getAttribute("year"))})),this.classList.remove("mdw-years-view"),t.stopPropagation())}#M(t,e=!0){this.#h=t;let o=c.getParts(t);this.querySelector(".mdw-year-label").innerHTML=o.year,this.querySelector(".mdw-control-container .mdw-month-label").innerHTML=c.format(t,"MMMM");let s=this.querySelector(".mdw-year-item[selected]");s&&s.removeAttribute("selected");let r=this.querySelector(`.mdw-year-item[month="${o.year}"]`);r&&r.setAttribute("selected","");let a=this.querySelector(".mdw-month-item[selected]");a&&a.removeAttribute("selected");let h=this.querySelector(`.mdw-month-item[month="${o.year}"]`);h&&h.setAttribute("selected","");let{previousYearOutOfRange:u,nextYearOutOfRange:b,previousMonthOutOfRange:f,nextMonthOutOfRange:k}=te(this.#b,this.#v,this.#h);u?this.querySelector(".mdw-year-previous").setAttribute("disabled",""):this.querySelector(".mdw-year-previous").removeAttribute("disabled"),b?this.querySelector(".mdw-year-next").setAttribute("disabled",""):this.querySelector(".mdw-year-next").removeAttribute("disabled"),u&&b?this.querySelector(".mdw-year-drop-down").setAttribute("disabled",""):this.querySelector(".mdw-year-drop-down").removeAttribute("disabled"),f?this.querySelector(".mdw-month-previous").setAttribute("disabled",""):this.querySelector(".mdw-month-previous").removeAttribute("disabled"),k?this.querySelector(".mdw-month-next").setAttribute("disabled",""):this.querySelector(".mdw-month-next").removeAttribute("disabled"),f&&k?this.querySelector(".mdw-month-drop-down").setAttribute("disabled",""):this.querySelector(".mdw-month-drop-down").removeAttribute("disabled"),e&&(this.querySelector(".mdw-days-container.mdw-active").innerHTML=this.#y(),this.querySelector(".mdw-years-container").innerHTML=this.#x(),this.querySelector(".mdw-months-container").innerHTML=this.#k())}#$(){this.close()}#I(){this.#p=this.#g,this.close()}#P(){this.#p="",this.#M(c.today())}#q(){this.#M(this.#h,!0)}});var Ma=new CSSStyleSheet;Ma.replaceSync(`mdw-date-picker-mobile {
  --mdw-months-container-drag-left: 0;

  display: flex;
  flex-direction: column;
  width: 328px;
  padding: 0;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: var(--mdw-shape-large);
  box-shadow: var(--mdw-elevation-3);
  background-color: var(--mdw-surface);
}

mdw-date-picker-mobile .mdw-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 24px;
  padding-top: 16px;
  box-sizing: border-box;
}

mdw-date-picker-mobile .mdw-icon-svg > svg {
  fill: var(--mdw-on-surface-variant);
}

mdw-date-picker-mobile .mdw-header .mdw-select-date-text {
  font-size: var(--mdw-font-label-size-medium);
  font-weight: var(--mdw-font-label-weight-medium);
  letter-spacing: var(--mdw-font-label-letter-spacing-medium);
  color: var(--mdw-on-surface-variant);
  line-height: 16px;
  height: 16px;
  margin-bottom: 36px;
}

mdw-date-picker-mobile .mdw-header .mdw-display-date-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--mdw-on-surface-variant);
}

mdw-date-picker-mobile .mdw-header .mdw-display-date-container .mdw-display-date-text {
  font-size: var(--mdw-font-headline-size-large);
  font-weight: var(--mdw-font-headline-weight-large);
  letter-spacing: var(--mdw-font-headline-letter-spacing-large);
  line-height: 40px;
  height: 40px;
}

mdw-date-picker-mobile .mdw-controls-container {
  display: flex;
  height: 24px;
  padding: 16px 12px;

  color: var(--mdw-on-surface-variant);
}


mdw-date-picker-mobile .mdw-controls-container .mdw-year-drop-down {
  flex: 1;
  display: flex;
  -webkit-tap-highlight-color: transparent;
}

mdw-date-picker-mobile .mdw-controls-container .mdw-month-previous {
  margin-right: 28px;
}

mdw-date-picker-mobile .mdw-controls-container .mdw-month-next {
  margin-right: 6px;
}

mdw-date-picker-mobile .mdw-controls-container .mdw-month-previous,
mdw-date-picker-mobile .mdw-controls-container .mdw-month-next {
  opacity: 1;
  transition: opacity 120ms;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

mdw-date-picker-mobile.mdw-year-view .mdw-controls-container .mdw-month-previous,
mdw-date-picker-mobile.mdw-year-view .mdw-controls-container .mdw-month-next {
  pointer-events: none;
  opacity: 0;
}

mdw-date-picker-mobile.mdw-year-view .mdw-controls-container .mdw-month-previous[disabled],
mdw-date-picker-mobile.mdw-year-view .mdw-controls-container .mdw-month-next[disabled] {
  pointer-events: none;
  opacity: 0.38;
}

mdw-date-picker-mobile .mdw-controls-container > .mdw-year-drop-down {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 12px;
  -webkit-tap-highlight-color: transparent;
}

mdw-date-picker-mobile .mdw-controls-container > .mdw-year-drop-down {
  font-size: var(--mdw-font-label-size-large);
  font-weight: var(--mdw-font-label-weight-large);
  line-height: var(--mdw-font-label-line-height-large);
  letter-spacing: var(--mdw-font-label-letter-spacing-large);
  -webkit-tap-highlight-color: transparent;
}

mdw-date-picker-mobile .mdw-controls-container > .mdw-year-drop-down .mdw-year-label {
  margin-right: 4px;
  -webkit-tap-highlight-color: transparent;
}

mdw-date-picker-mobile .mdw-controls-container > .mdw-year-drop-down > .mdw-icon-svg {
  width: 24px;
  height: 24px;
  transform-origin: center;
  transform: rotate(0);
  transition: transform 280ms;
  -webkit-tap-highlight-color: transparent;
}

mdw-date-picker-mobile .mdw-controls-container > .mdw-year-drop-down > .mdw-icon-svg > svg {
  fill: var(--mdw-on-surface-variant);
}

mdw-date-picker-mobile.mdw-year-view .mdw-controls-container > .mdw-year-drop-down > .mdw-icon-svg {
  transform: rotate(180deg);
}

mdw-date-picker-mobile .mdw-actions-container {
  position: relative;
  display: flex;
  justify-content: end;
  height: 36px;
  padding: 12px;
  padding-top: 8px;
  background-color: var(--mdw-surface);
  z-index: 1;
  border-radius: 0 0 var(--mdw-shape-large) var(--mdw-shape-large);;
}

mdw-date-picker-mobile > .mdw-divider {
  width: 100%;
  border-top: 1px solid var(--mdw-outline-alpha-26);
}




mdw-date-picker-mobile .mdw-views-container {
  position: relative;
  height: 280px;
  transition: height 120ms;
}

mdw-date-picker-mobile.mdw-input-view .mdw-views-container {
  height: 90px;
}



/* --- month days ---*/

mdw-date-picker-mobile .mdw-views-container .mdw-months-container {
  position: relative;
  left: var(--mdw-months-container-drag-left);
  width: 100%;
  height: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  opacity: 1;
  transition: opacity 120ms;
}

mdw-date-picker-mobile.mdw-drag-animation .mdw-views-container .mdw-months-container {
  transition: left 180ms;
}

mdw-date-picker-mobile.mdw-input-view .mdw-views-container .mdw-months-container {
  opacity: 0;
  pointer-events: none;
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-days-header {
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding: 11px 12px;

  font-size: var(--mdw-font-body-size-small);
  font-weight: var(--mdw-font-body-weight-small);
  line-height: var(--mdw-font-body-line-height-small);
  letter-spacing: var(--mdw-font-body-letter-spacing-small);
  color: var(--mdw-on-surface);
}

mdw-date-picker-mobile.mdw-year-view .mdw-views-container .mdw-months-container .mdw-days-header {
  opacity: 0;
  pointer-events: none;
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month {
  position: absolute;
  top: 0;
  left: 100%;
  width: 100%;
  padding: 0 16px;
  pointer-events: none;
  box-sizing: border-box;
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month .mdw-days-container {
  display: grid;
  grid-template-columns: repeat(7, 40px);
  grid-template-rows: repeat(6, 40px);
  grid-column-gap: 3px;
  grid-row-gap: 0;
  align-items: center;
  justify-items: center;
  pointer-events: none;
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month.mdw-active {
  left: 0;
  pointer-events: all;
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month.mdw-previous {
  left: -100%;
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month.mdw-next {
  left: 100%;
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month.mdw-animation-active-next {
  left: 0;
  transition: left 180ms;
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month.mdw-animation-active-next.mdw-next {
  left: 100%;
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month.mdw-animation-previous-active {
  left: -100%;
  transition: left 180ms;
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month.mdw-animation-previous-active.mdw-active {
  left: 0;
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month.mdw-animation-active-previous {
  left: 0;
  transition: left 180ms;
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month.mdw-animation-active-previous.mdw-previous {
  left: -100%;
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month.mdw-animation-next-active {
  left: 100%;
  transition: left 180ms;
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month.mdw-animation-next-active.mdw-active {
  left: 0;
}


mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month .mdw-days-container {
  opacity: 1;
  transition: opacity 120ms;
}

mdw-date-picker-mobile.mdw-year-view .mdw-views-container .mdw-months-container .mdw-month .mdw-days-container {
  opacity: 0;
}

mdw-date-picker-mobile:not(.mdw-year-view) .mdw-views-container .mdw-months-container .mdw-month .mdw-days-container {
  pointer-events: auto;
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month .mdw-days-container .mdw-day {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  user-select: none;
  box-sizing: border-box;
  cursor: pointer;
  pointer-events: none;
  border-radius: 50%;
  z-index: 1;
  -webkit-tap-highlight-color: transparent;

  font-size: var(--mdw-font-body-size-small);
  font-weight: var(--mdw-font-body-weight-small);
  line-height: var(--mdw-font-body-line-height-small);
  letter-spacing: var(--mdw-font-body-letter-spacing-small);
  color: var(--mdw-on-surface);
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month .mdw-days-container .mdw-day::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  border-radius: 50%;
  z-index: -1;
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month .mdw-days-container .mdw-day.mdw-interactive {
  cursor: pointer;
  pointer-events: auto;
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month .mdw-days-container .mdw-day.mdw-not-current-month {
  color: var(--mdw-on-surface-alpha-60);
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month .mdw-days-container .mdw-day.mdw-out-of-range {
  pointer-events: none;
  cursor: auto;
  color: var(--mdw-on-surface-alpha-60);
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month .mdw-days-container .mdw-day[selected] {
  color: var(--mdw-on-primary);
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month .mdw-days-container .mdw-day[selected]::before {
  background-color: var(--mdw-primary);
}

mdw-date-picker-mobile .mdw-views-container .mdw-months-container .mdw-month .mdw-days-container .mdw-day.mdw-today::before {
  border: 1px solid var(--mdw-outline-alpha-60);
}




/* --- year --- */


mdw-date-picker-mobile .mdw-views-container .mdw-years-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
  height: 280px;

  display: grid;
  grid-template-columns: repeat(3, 88px);
  grid-column-gap: 8px;
  grid-row-gap: 0px;
  align-items: center;
  justify-items: center;
  padding: 8px 16px;
  padding-right: 20px;

  opacity: 0;
  pointer-events: none;
  transition: opacity 120ms;
}

mdw-date-picker-mobile.mdw-year-view .mdw-views-container .mdw-years-container {
  opacity: 1;
  pointer-events: all;
  background-color: var(--mdw-surface);
}

mdw-date-picker-mobile .mdw-views-container .mdw-years-container .mdw-year {
  width: 100%;
  border-radius: 18px;
  text-align: center;
  cursor: pointer;
  margin: 7px;
  -webkit-tap-highlight-color: transparent;

  font-size: var(--mdw-font-label-size-medium);
  font-weight: var(--mdw-font-label-weight-medium);
  line-height: 36px;
  letter-spacing: var(--mdw-font-label-letter-spacing-medium);
  color: var(--mdw-on-surface);
}

mdw-date-picker-mobile .mdw-views-container .mdw-years-container .mdw-year[selected] {
  background-color: var(--mdw-primary);
  color: var(--mdw-on-primary);
}

mdw-date-picker-mobile .mdw-views-container .mdw-years-container .mdw-year.mdw-out-of-range {
  pointer-events: none;
  cursor: auto;
  color: var(--mdw-on-surface-alpha-60);
}



/* --- input --- */


mdw-date-picker-mobile .mdw-views-container .mdw-input-container {
  position: absolute;
  top: 16px;
  left: 24px;
  right: 24px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 120ms;
}

mdw-date-picker-mobile.mdw-input-view .mdw-views-container .mdw-input-container {
  opacity: 1;
  pointer-events: all;
}

mdw-date-picker-mobile .mdw-views-container .mdw-input-container mdw-textfield {
  width: 100%;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Ma];var Jl=Ma;y.registerGlobalStyleSheet(Jl);customElements.define("mdw-date-picker-mobile",class extends y{useTemplate=!1;#t=this.#A.bind(this);#i=w.debounce(this.#D,100).bind(this);#e=this.#T.bind(this);#o=this.#z.bind(this);#s=this.#R.bind(this);#l=this.#_.bind(this);#c=this.#E.bind(this);#n=this.#M.bind(this);#a=this.#I.bind(this);#d=this.#P.bind(this);#m=new A(this);#r=this.#Y.bind(this);#w=this.#q.bind(this);#u=this.#j.bind(this);#p=this.#S.bind(this);#h=new AbortController;constructor(){super(),this.scrim=!0,this.clickOutsideClose=!1,this.addClickOutsideCloseIgnore(this.parentElement.control),this.#m.onDrag(this.#r),this.#m.onStart(this.#w),this.#m.onEnd(this.#u)}afterRender(){this.querySelector(".mdw-edit").addEventListener("click",this.#t,{signal:this.#h.signal}),this.querySelector(".mdw-cancel").addEventListener("click",this.#e,{signal:this.#h.signal}),this.querySelector(".mdw-ok").addEventListener("click",this.#o,{signal:this.#h.signal}),this.querySelector(".mdw-months-container").addEventListener("click",this.#s,{signal:this.#h.signal}),this.querySelector(".mdw-month-previous").addEventListener("click",this.#c,{signal:this.#h.signal}),this.querySelector(".mdw-month-next").addEventListener("click",this.#n,{signal:this.#h.signal}),this.querySelector(".mdw-year-drop-down").addEventListener("click",this.#a,{signal:this.#h.signal}),this.querySelector(".mdw-years-container").addEventListener("click",this.#d,{signal:this.#h.signal}),this.addEventListener("open",this.#l,{signal:this.#h.signal})}disconnectedCallback(){super.disconnectedCallback(),this.#m.destroy(),this.#m=void 0,this.#h.abort()}get#g(){return this.parentElement.value}set#g(t){this.parentElement.value=t}get#f(){return this.parentElement.displayDate}set#f(t){this.parentElement.displayDate=t}get#b(){return this.parentElement.initialValue}get#v(){return this.parentElement.valueDate}set#v(t){this.parentElement.valueDate=t}get#y(){return this.parentElement.minDate}get#x(){return this.parentElement.maxDate}template(){let{previousYearOutOfRange:t,nextYearOutOfRange:e,previousMonthOutOfRange:o,nextMonthOutOfRange:s}=te(this.#y,this.#x,this.#f);return`
      <div class="mdw-header">
        <div class="mdw-select-date-text">Select date</div>
        <div class="mdw-display-date-container">
          <div class="mdw-display-date-text">${c.format(this.#f,"ddd, MMM DD")}</div>
          <div class="mdw-edit mdw-icon-svg">${_s}</div>
        </div>
      </div>

      <div class="mdw-divider"></div>

      <div class="mdw-controls-container">
        <div class="mdw-year-drop-down" ${t&&e?"disabled":""}>
          <div class="mdw-year-label">${c.format(this.#f,"MMMM YYYY")}</div>
          <div class="mdw-icon-svg">${Di}</div>
        </div>
        <div class="mdw-month-previous mdw-icon-svg" ${o?"disabled":""}>${Ut}</div>
        <div class="mdw-month-next mdw-icon-svg" ${s?"disabled":""}>${Xt}</div>
      </div>

      <div class="mdw-views-container">
        <div class="mdw-months-container">
          <div class="mdw-month mdw-previous">${this.#k(c.addToDateByParts(this.#f,{month:-1}))}</div>
          <div class="mdw-month mdw-active">${this.#k()}</div>
          <div class="mdw-month mdw-next">${this.#k(c.addToDateByParts(this.#f,{month:1}))}</div>
        </div>

        <div class="mdw-years-container">
          ${this.#L()}
        </div>
        
        <div class="mdw-input-container">
          <mdw-textfield>
            <input type="date">
            <label>Enter date</label>
          </mdw-textfield>
        </div>
      </div>

      <div class="mdw-actions-container">
        <mdw-button class="mdw-cancel">Cancel</mdw-button>
        <mdw-button class="mdw-ok">Ok</mdw-button>
      </div>
    `}#k(t=this.#f){return`
      <div class="mdw-days-header">
        ${c.getDayNames("narrow").map(e=>`<span>${e}</span>`).join(`
`)}
      </div>

      <div class="mdw-days-container">
        ${on(t,this.#g,this.#y,this.#x,!1,!1)}
      </div>
    `}#L(){return c.defaultYearRange().map(t=>{let e=this.#y&&this.#y.getFullYear()>t,o=this.#x&&this.#x.getFullYear()<t;return`<div class="mdw-year${e||o?" mdw-out-of-range":""}" mdw-year="${t}">${t}</div>`}).join(`
`)}#A(){this.classList.remove("mdw-year-view"),this.classList.contains("mdw-input-view")?(this.querySelector("input").removeEventListener("input",this.#i),this.classList.remove("mdw-input-view")):(this.classList.add("mdw-input-view"),this.classList.remove("mdw-years-view"),this.querySelector("input").addEventListener("click",t=>t.preventDefault(),{signal:this.#h.signal}),this.querySelector("input").value=c.format(this.#f,"YYYY-MM-DD"),this.querySelector("input").addEventListener("input",this.#i,{signal:this.#h.signal}))}#D(t){this.#g=t.target.value,this.#C(c.parse(t.target.value),!0)}#C(t,e=!0,o=!1){this.#f=t,this.querySelector(".mdw-year-label").innerHTML=c.format(t,"MMMM YYYY");let s=c.getParts(t),r=this.querySelector(`.mdw-year[year="${s.year}"]`);if(r&&r.setAttribute("selected",""),e){let a=this.querySelector(".mdw-month.mdw-active");a.innerHTML=this.#k();let h=this.querySelector(".mdw-month.mdw-previous");h.innerHTML=this.#k(c.addToDateByParts(t,{month:-1}));let u=this.querySelector(".mdw-month.mdw-next");u.innerHTML=this.#k(c.addToDateByParts(t,{month:1})),this.querySelector(".mdw-years-container").innerHTML=this.#L()}if(o){this.#v=t,this.querySelector(".mdw-display-date-text").innerHTML=c.format(t,"ddd, MMM DD");let a=this.querySelector(".mdw-day.mdw-interactive[selected]");a&&a.removeAttribute("selected");let h=this.querySelector(`.mdw-day:not(.mdw-not-current-month)[mdw-date="${this.#g}"]`);h&&h.setAttribute("selected","")}}#T(){this.#g=this.#b,this.close()}#z(){this.close()}#R(t){if(!t.target.classList.contains("mdw-day"))return;this.#C(c.parse(t.target.getAttribute("mdw-date")),!1,!0);let e=this.querySelector(".mdw-day.mdw-interactive[selected]");e&&e.removeAttribute("selected"),t.target.setAttribute("selected","")}#_(){this.#C(this.#f,!0),this.addEventListener("close",this.#p,{signal:this.#h.signal}),this.#m.enable()}#S(){this.removeEventListener("close",this.#p),this.#m.disable()}#E(){this.#$(-1)}#M(){this.#$(1)}async#$(t=1){let e=this.querySelector(".mdw-month.mdw-active"),o=this.querySelector(".mdw-month.mdw-previous"),s=this.querySelector(".mdw-month.mdw-next");e.classList.remove("mdw-active"),t===-1?(e.classList.add("mdw-animation-active-next"),o.classList.add("mdw-animation-previous-active"),o.classList.remove("mdw-previous")):(e.classList.add("mdw-animation-active-previous"),s.classList.add("mdw-animation-next-active"),s.classList.remove("mdw-next"));let r=c.addToDateByParts(c.parse(e.querySelector("[mdw-date]:nth-child(10)").getAttribute("mdw-date")),{month:t});this.#C(r,!1),await w.nextAnimationFrameAsync(),t===-1?(e.classList.add("mdw-next"),o.classList.add("mdw-active"),s.classList.add("mdw-previous"),s.classList.remove("mdw-next")):(e.classList.add("mdw-previous"),s.classList.add("mdw-active"),o.classList.add("mdw-next"),o.classList.remove("mdw-previous")),await w.transitionendAsync(e),e.classList.remove("mdw-animation-active-next"),e.classList.remove("mdw-animation-active-previous"),o.classList.remove("mdw-animation-previous-active"),s.classList.remove("mdw-animation-next-active"),this.#C(r,!0)}#I(){if(this.classList.contains("mdw-year-view"))this.classList.remove("mdw-year-view");else{this.classList.add("mdw-year-view");let t=this.querySelector(".mdw-year[selected]");t&&t.removeAttribute("selected");let e=this.querySelector(`.mdw-year[mdw-year="${c.getYear(this.#f)}"]`);e&&(e.setAttribute("selected",""),e.scrollIntoView({block:"center"}))}}#P(t){t.target.classList.contains("mdw-year")&&(this.#C(c.setDateByParts(this.#f,{year:parseInt(t.target.getAttribute("mdw-year"))})),this.classList.remove("mdw-year-view"))}#q(){this.classList.add("mdw-dragging")}#Y({distance:t}){this.style.setProperty("--mdw-months-container-drag-left",`${t.x}px`)}async#j({distance:t}){t.x>100?(this.classList.add("mdw-drag-animation"),this.style.setProperty("--mdw-months-container-drag-left","320px")):t.x<-100&&(this.classList.add("mdw-drag-animation"),this.style.setProperty("--mdw-months-container-drag-left","-320px")),await w.transitionendAsync(this),this.classList.remove("mdw-drag-animation"),t.x>100?(this.#C(c.addToDateByParts(this.#f,{month:-1}),!0),this.style.setProperty("--mdw-months-container-drag-left","0")):t.x<-100&&(this.#C(c.addToDateByParts(this.#f,{month:1}),!0),this.style.setProperty("--mdw-months-container-drag-left","0")),this.classList.remove("mdw-dragging")}});customElements.define("mdw-date-picker",class extends p{useTemplate=!1;#t;#i;#e="";#o="";#s=this.#d.bind(this);#l=this.#m.bind(this);#c=this.#r.bind(this);#n=this.#w.bind(this);#a=new AbortController;constructor(){if(super(),this.#t=this.parentNode,this.#t.nodeName!=="MDW-TEXTFIELD")throw Error("mdw-date-picker must be a child of mdw-textfield");this.#i=this.#t.querySelector("input"),this.#t.classList.add("mdw-has-date-picker"),this.#e=c.parse(this.value?this.value:c.today()),this.#o=this.value}afterRender(){this.#t.querySelector("input").addEventListener("focus",this.#s,{signal:this.#a.signal}),v.isMobile&&this.#t.addEventListener("click",this.#l,{signal:this.#a.signal}),this.firstChild.addEventListener("open",this.#c,{signal:this.#a.signal}),this.firstChild.addEventListener("close",this.#n,{signal:this.#a.signal})}disconnectedCallback(){this.#a.abort()}get value(){return this.#i.value}set value(t){this.#i.value=t}get min(){return this.#i.min}get max(){return this.#i.max}get valueDate(){return c.parse(this.#i.value)}set valueDate(t){this.#i.value=c.format(t,"YYYY-MM-dd")||""}get displayValue(){return c.format(this.#e,"YYYY-MM-dd")}set displayValue(t){this.#e=c.parse(t)}get displayDate(){return this.#e}set displayDate(t){this.#e=c.parse(t)}get initialValue(){return this.#o}get minDate(){return c.parse(this.#i.min)}get maxDate(){return c.parse(this.#i.max)}get control(){return this.#t}show(){this.firstChild.show()}close(){this.firstChild.close()}#d(){this.firstChild.show()}#m(){this.firstChild.show()}#r(){v.isMobile?this.#t.removeEventListener("click",this.#l):this.#i.removeEventListener("focus",this.#s),this.#e=c.parse(this.value?this.value:c.today()),this.#o=this.value}#w(){setTimeout(()=>{v.isMobile?this.#t.addEventListener("click",this.#l,{signal:this.#a.signal}):this.#i.addEventListener("focus",this.#s,{signal:this.#a.signal})}),this.#i.reportValidity()}template(){return v.isMobile?"<mdw-date-picker-mobile></mdw-date-picker-mobile>":"<mdw-date-picker-desktop></mdw-date-picker-desktop>"}});var Da=new CSSStyleSheet;Da.replaceSync(`mdw-date-picker-range-desktop {
  width: 656px;
  height: 428px;
  max-height: 428px;
  padding: 12px;
  padding-top: 20px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: var(--mdw-shape-large);
  background-color: var(--mdw-surface);
  box-shadow: var(--mdw-elevation-3);
}

mdw-date-picker-range-desktop .mdw-control-container {
  display: flex;
  height: 24px;
  align-items: center;
  padding-bottom: 30px;
}

mdw-date-picker-range-desktop .mdw-control-container > .mdw-icon-svg {
  display: flex;
  width: 32px;
  margin: 0;
  justify-content: center;
  cursor: pointer;
}

mdw-date-picker-range-desktop .mdw-control-container .mdw-month-previous[disabled],
mdw-date-picker-range-desktop .mdw-control-container .mdw-month-next[disabled] {
  pointer-events: none;
  cursor: none;
  opacity: 0.38;
}

mdw-date-picker-range-desktop .mdw-control-container .mdw-month-label,
mdw-date-picker-range-desktop .mdw-control-container .mdw-year-label {
  font-size: var(--mdw-font-label-size-large);
  font-weight: var(--mdw-font-label-weight-large);
  line-height: var(--mdw-font-label-line-height-large);
  letter-spacing: var(--mdw-font-label-letter-spacing-large);
  color: var(--mdw-on-surface);
  margin-right: 6px;
  margin-left: 6px;
}

mdw-date-picker-range-desktop .mdw-month-container-start .mdw-control-container {
  /* justify-content: end;
  margin-right: 64px; */
}

mdw-date-picker-range-desktop .mdw-month-container-end .mdw-control-container {
  /* margin-left: 36px; */
  justify-content: end;
  margin-right: 27px;
}


mdw-date-picker-range-desktop .mdw-month-range-container {
  display: flex;
}

mdw-date-picker-range-desktop .mdw-month {
  position: relative;
  width: 328px;
  height: 294px;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  pointer-events: none;
  opacity: 1;
  transition: opacity 120ms;
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  flex: 1;
  padding: 0 14px;
  margin-bottom: 16px;
  margin-right: 26px;

  font-size: var(--mdw-font-body-size-small);
  font-weight: var(--mdw-font-body-weight-small);
  line-height: var(--mdw-font-body-line-height-small);
  letter-spacing: var(--mdw-font-body-letter-spacing-small);
  color: var(--mdw-on-surface);
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container {
  position: absolute;
  display: grid;
  top: 40px;
  height: 254px;
  left: 100%;
  grid-template-columns: repeat(7, 40px);
  grid-template-rows: repeat(6, 40px);
  grid-column-gap: 4px;
  grid-row-gap: 0;
  align-items: center;
  justify-items: center;
  pointer-events: none;
  opacity: 0;
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container.mdw-active {
  display: grid;
  left: 0;
  pointer-events: all;
  opacity: 1;
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container .mdw-day {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  user-select: none;
  box-sizing: border-box;
  cursor: pointer;
  pointer-events: none;
  border-radius: 50%;
  z-index: 1;

  font-size: var(--mdw-font-label-size-small);
  font-weight: var(--mdw-font-label-weight-small);
  line-height: var(--mdw-font-label-line-height-small);
  letter-spacing: var(--mdw-font-label-letter-spacing-small);
  color: var(--mdw-on-surface);
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container .mdw-day::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  border-radius: 50%;
  z-index: -1;
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container .mdw-day.mdw-interactive {
  cursor: pointer;
  pointer-events: auto;
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container .mdw-day.mdw-not-current-month {
  color: var(--mdw-on-surface-alpha-60);
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container .mdw-day.mdw-out-of-range {
  pointer-events: none;
  cursor: auto;
  color: var(--mdw-on-surface-alpha-60);
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container .mdw-day[selected] {
  color: var(--mdw-on-primary);
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container .mdw-day[selected]::before {
  background-color: var(--mdw-surface-variant);
  margin-top: 1px;
  margin-bottom: 1px;
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container .mdw-day[selected]::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  border-radius: 50%;
  z-index: -1;
  background-color: var(--mdw-primary);
  margin: 1px;
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container .mdw-day[selected][start]::before {
  border-radius: 50% 0 0 50%;
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container .mdw-day[selected][start].mdw-week-day-6::before {
  border-radius: 50%;
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container .mdw-day[selected][end]::before {
  border-radius: 0 50% 50% 0;
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container .mdw-day[selected][end].mdw-week-day-0::before {
  border-radius: 50%;
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container .mdw-day:not(.mdw-not-current-month)[in-selection-range]::before {
  background-color: var(--mdw-surface-variant);
  border-radius: 0;
  margin-left: -4px;
  margin-right: -4px;
  margin-top: 1px;
  margin-bottom: 1px;
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container .mdw-day[in-selection-range].mdw-first-day::before {
  border-radius: 20px 0 0 20px; /* use pixels because margin is stretched */
  margin-left: 0;
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container .mdw-day[in-selection-range].mdw-week-day-0::before {
  border-radius: 20px 0 0 20px; /* use pixels because margin is stretched */
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container .mdw-day[in-selection-range].mdw-week-day-6::before {
  border-radius: 0 20px 20px 0; /* use pixels because margin is stretched */
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container .mdw-day[in-selection-range].mdw-last-day::before {
  border-radius: 0 20px 20px 0; /* use pixels because margin is stretched */
  margin-right: 0;
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container .mdw-day.mdw-today::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  border-radius: 50%;
  border: 1px solid var(--mdw-outline-alpha-60);
  margin: 2px;
  z-index: 11;
}

mdw-date-picker-range-desktop .mdw-actions {
  display: flex;
  justify-content: end;
  opacity: 1;
  transition: opacity 120ms;
}


mdw-date-picker-range-desktop .mdw-month .mdw-days-container.mdw-animation-next-to-active {
  animation: mdw-month-range-next-to-active 180ms;
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container.mdw-animation-next-from-active {
  animation: mdw-month-range-next-from-active 180ms;
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container.mdw-animation-previous-to-active {
  animation: mdw-month-range-previous-to-active 180ms;
}

mdw-date-picker-range-desktop .mdw-month .mdw-days-container.mdw-animation-previous-from-active {
  animation: mdw-month-range-previous-from-active 180ms;
}


@keyframes mdw-month-range-next-to-active {
  0% {
    left: 25%;
    opacity: 0;
  }

  80% {
    opacity: 1;
  }

  100% {
    left: 0;
    opacity: 1;
  }
}

@keyframes mdw-month-range-next-from-active {
  0% {
    left: 0;
    opacity: 1;
  }

  60% {
    opacity: 0;
  }

  100% {
    left: -25%;
    opacity: 0;
  }
}

@keyframes mdw-month-range-previous-to-active {
  0% {
    left: -25%;
    opacity: 0;
  }

  80% {
    opacity: 1;
  }

  100% {
    left: 0;
    opacity: 1;
  }
}

@keyframes mdw-month-range-previous-from-active {
  0% {
    left: 0;
    opacity: 1;
  }

  60% {
    opacity: 0;
  }

  100% {
    left: 25%;
    opacity: 0;
  }
}


/* --- months view --- */

mdw-date-picker-range-desktop .mdw-months-container {
  position: absolute;
  top: 54px;
  left: 0;
  width: 100%;
  height: 364px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  opacity: 0;
  transition: opacity 120ms;
  background-color: var(--mdw-surface);
  border-radius: var(--mdw-shape-large);
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Da];var tm=Da;y.registerGlobalStyleSheet(tm);customElements.define("mdw-date-picker-range-desktop",class extends y{useTemplate=!1;#t=w.debounce(this.#_,100).bind(this);#i=w.debounce(this.#S,100).bind(this);#e=this.#z.bind(this);#o=this.#T.bind(this);#s=this.#R.bind(this);#l=this.#D.bind(this);#c=this.#C.bind(this);#n=this.#M.bind(this);#a=this.#E.bind(this);#d;#m;#r=new AbortController;constructor(){super(),this.clickOutsideClose=!1,this.scrim=!1,this.animation="opacity",this.target=this.parentElement.parentElement,this.clickOutsideClose=!0,this.addClickOutsideCloseIgnore(this.#w),this.addClickOutsideCloseIgnore(this.#u)}afterRender(){this.querySelector(".mdw-ok").addEventListener("click",this.#o,{signal:this.#r.signal}),this.querySelector(".mdw-cancel").addEventListener("click",this.#e,{signal:this.#r.signal}),this.addEventListener("open",this.#l,{signal:this.#r.signal}),this.querySelector(".mdw-month-range-container").addEventListener("click",this.#s,{signal:this.#r.signal}),this.#w.addEventListener("input",this.#t,{signal:this.#r.signal}),this.#u.addEventListener("input",this.#i,{signal:this.#r.signal}),this.querySelector(".mdw-month-previous").addEventListener("click",this.#n,{signal:this.#r.signal}),this.querySelector(".mdw-month-next").addEventListener("click",this.#a,{signal:this.#r.signal})}disconnectedCallback(){super.disconnectedCallback(),this.#r.abort()}get#w(){return this.parentElement.inputStart}get#u(){return this.parentElement.inputEnd}get#p(){return this.parentElement.valueStart}set#p(t){this.parentElement.valueStart=t}get#h(){return this.parentElement.valueEnd}set#h(t){this.parentElement.valueEnd=t}get#g(){return this.parentElement.displayDateStart}set#g(t){this.parentElement.displayDateStart=t}get#f(){return this.parentElement.displayDateEnd}set#f(t){this.parentElement.displayDateEnd=t}get#b(){return this.parentElement.initialValueStart}get#v(){return this.parentElement.initialValueEnd}get#y(){return this.parentElement.valueDateStart}set#y(t){this.parentElement.valueDateStart=t}get#x(){return this.parentElement.valueDateEnd}set#x(t){this.parentElement.valueDateEnd=t}get#k(){return this.parentElement.minDate}get#L(){return this.parentElement.maxDate}template(){let{previousYearOutOfRange:t,nextYearOutOfRange:e,previousMonthOutOfRange:o,nextMonthOutOfRange:s}=te(this.#k,this.#L,this.#g);return`
      <div class="mdw-month-range-container">
        <div class="mdw-month-container-start">
          <div class="mdw-control-container">
            <div class="mdw-month-previous mdw-icon-svg" ${o?"disabled":""}>${Ut}</div>
            <div class="mdw-month-drop-down" ${o&&s?"disabled":""}>
              <div class="mdw-month-label">${c.format(this.#g,"MMMM")}</div>
            </div>
            <div class="mdw-year-drop-down" ${t&&e?"disabled":""}>
              <div class="mdw-year-label">${c.getYear(this.#g)}</div>
            </div>
          </div>

          <div class="mdw-month">
            <div class="mdw-days-header">
              ${c.getDayNames("narrow").map(r=>`<span>${r}</span>`).join(`
`)}
            </div>

            <div class="mdw-days-container mdw-active">${this.#A(this.#g)}</div>
            <div class="mdw-days-container">${this.#A(this.#g)}</div>
          </div>
        </div>

        <div class="mdw-month-container-end">
          <div class="mdw-control-container">
            <div class="mdw-month-drop-down" ${o&&s?"disabled":""}>
              <div class="mdw-month-label">${c.format(this.#f,"MMMM")}</div>
            </div>
            <div class="mdw-year-drop-down" ${t&&e?"disabled":""}>
              <div class="mdw-year-label">${c.getYear(this.#f)}</div>
            </div>
            <div class="mdw-month-next mdw-icon-svg" ${s?"disabled":""}>${Xt}</div>
          </div>
          <div class="mdw-month">
            <div class="mdw-days-header">
              ${c.getDayNames("narrow").map(r=>`<span>${r}</span>`).join(`
`)}
            </div>

            <div class="mdw-days-container mdw-active">${this.#A(this.#f)}</div>
            <div class="mdw-days-container">${this.#A(this.#f)}</div>
          </div>
        </div>
      </div>

      <div class="mdw-actions">
        <mdw-button class="mdw-cancel">Cancel</mdw-button>
        <mdw-button class="mdw-ok">OK</mdw-button>
      </div>
    `}#A(t){return sn(t,this.#p,this.#h,this.#k,this.#L,!1)}#D(){this.addEventListener("close",this.#c,{signal:this.#r.signal});let t=this.querySelector(".mdw-day.mdw-interactive[selected][start]");t&&(this.#d=c.parse(t.getAttribute("mdw-date")));let e=this.querySelector(".mdw-day.mdw-interactive[selected][start]");e&&(this.#m=c.parse(e.getAttribute("mdw-date")))}#C(){this.removeEventListener("close",this.#c)}#T(){this.close()}#z(){this.#p=this.#b,this.#h=this.#v,this.#P(),this.close()}#R(t){t.target.classList.contains("mdw-day")&&this.#I(c.parse(t.target.getAttribute("mdw-date")))}#_(t){this.#p=t.target.value,this.#P()}#S(t){this.#h=t.target.value,this.#P()}#E(){this.#$(1)}#M(){this.#$(-1)}async#$(t=1){let e=this.querySelector(".mdw-month-container-start .mdw-days-container.mdw-active"),o=this.querySelector(".mdw-month-container-end .mdw-days-container.mdw-active"),s=this.querySelector(".mdw-month-container-start .mdw-days-container:not(.mdw-active)"),r=this.querySelector(".mdw-month-container-end .mdw-days-container:not(.mdw-active)"),a=c.parse(e.querySelector("[mdw-date]:nth-child(10)").getAttribute("mdw-date")),h=c.parse(o.querySelector("[mdw-date]:nth-child(10)").getAttribute("mdw-date")),u=c.addToDateByParts(a,{month:t}),b=c.addToDateByParts(h,{month:t});this.#g=u,this.#f=b,s.innerHTML=this.#A(u),r.innerHTML=this.#A(b),this.querySelector(".mdw-month-container-start .mdw-month-label").innerText=c.format(u,"MMMM"),this.querySelector(".mdw-month-container-start .mdw-year-label").innerText=c.getYear(u),this.querySelector(".mdw-month-container-end .mdw-month-label").innerText=c.format(b,"MMMM"),this.querySelector(".mdw-month-container-end .mdw-year-label").innerText=c.getYear(b),t===1?(s.classList.add("mdw-animation-next-to-active"),e.classList.add("mdw-animation-next-from-active"),r.classList.add("mdw-animation-next-to-active"),o.classList.add("mdw-animation-next-from-active")):(s.classList.add("mdw-animation-previous-to-active"),e.classList.add("mdw-animation-previous-from-active"),r.classList.add("mdw-animation-previous-to-active"),o.classList.add("mdw-animation-previous-from-active")),await w.animationendAsync(e),e.innerHTML=this.#A(u),o.innerHTML=this.#A(b),s.classList.remove("mdw-animation-next-to-active"),e.classList.remove("mdw-animation-next-from-active"),s.classList.remove("mdw-animation-previous-to-active"),e.classList.remove("mdw-animation-previous-from-active"),r.classList.remove("mdw-animation-next-to-active"),o.classList.remove("mdw-animation-next-from-active"),r.classList.remove("mdw-animation-previous-to-active"),o.classList.remove("mdw-animation-previous-from-active")}async#I(t){if(this.#m){this.#d=t,this.#m=void 0,this.#y="",this.#x="";let e=this.querySelector(`.mdw-day[mdw-date="${c.format(t,"YYYY-MM-DD")}"]`);e&&e.setAttribute("selected","")}else{this.#m=t;let e=this.querySelector(".mdw-day.mdw-interactive[selected]"),o=c.parse(e.getAttribute("mdw-date")),s=this.querySelector(`.mdw-day[mdw-date="${c.format(t,"YYYY-MM-DD")}"]`);s.setAttribute("selected",""),o.getTime()>t.getTime()?(e.setAttribute("start",""),s.setAttribute("end",""),this.#y=t,this.#g=t,this.#x=o,this.#f=o):(s.setAttribute("start",""),e.setAttribute("end",""),this.#y=o,this.#g=o,this.#x=t,this.#f=t)}await w.nextAnimationFrameAsync(),this.#P()}#P(t=!0){if(t){let s=this.querySelector("[selected][start]");s&&(s.removeAttribute("selected"),s.removeAttribute("start"));let r=this.querySelector("[selected][end]");r&&(r.removeAttribute("selected"),r.removeAttribute("end")),this.querySelector(".mdw-month-container-start .mdw-month-label").innerText="",this.querySelector(".mdw-month-container-start .mdw-year-label").innerText="",this.querySelector(".mdw-month-container-end .mdw-month-label").innerText="",this.querySelector(".mdw-month-container-end .mdw-year-label").innerText=""}if([...this.querySelectorAll("[in-selection-range]")].forEach(s=>s.removeAttribute("in-selection-range")),c.isValid(this.#g)&&(this.querySelector(".mdw-month-container-start .mdw-month-label").innerText=c.format(this.#g,"MMMM"),this.querySelector(".mdw-month-container-start .mdw-year-label").innerText=c.getYear(this.#g)),c.isValid(this.#f)&&(this.querySelector(".mdw-month-container-end .mdw-month-label").innerText=c.format(this.#f,"MMMM"),this.querySelector(".mdw-month-container-end .mdw-year-label").innerText=c.getYear(this.#f)),!c.isValid(this.#y)||!c.isValid(this.#x))return;let e=this.#y,o=this.#y.getMonth()===this.#x.getMonth()?c.addToDateByParts(this.#y,{month:1}):this.#x;this.querySelector(".mdw-month-container-start .mdw-days-container.mdw-active").innerHTML=this.#A(e),this.querySelector(".mdw-month-container-end .mdw-days-container.mdw-active").innerHTML=this.#A(o)}});var Ta=new CSSStyleSheet;Ta.replaceSync(`mdw-date-picker-range-mobile {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 0;
  box-shadow: var(--mdw-elevation-3);
  background-color: var(--mdw-surface);
}

mdw-date-picker-range-mobile .mdw-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 24px;
  padding-top: 16px;
  box-sizing: border-box;
}

mdw-date-picker-range-mobile .mdw-header-controls {
  padding: 0 24px;
  display: flex;
  padding-top: 24px;
}

mdw-date-picker-range-mobile .mdw-header-controls .mdw-close > svg > path {
  stroke: var(--mdw-on-surface-variant);
  stroke-width: 0.5px;
}

mdw-date-picker-range-mobile .mdw-icon-svg > svg {
  fill: var(--mdw-on-surface-variant);
}

mdw-date-picker-range-mobile .mdw-header .mdw-supporting-text {
  margin-left: 30px;
  margin-bottom: 8px;
}

mdw-date-picker-range-mobile .mdw-header .mdw-select-date-text {
  font-size: var(--mdw-font-headline-size-large);
  font-weight: var(--mdw-font-headline-weight-large);
  letter-spacing: var(--mdw-font-headline-letter-spacing-large);
  color: var(--mdw-on-surface-variant);
  line-height: 16px;
  height: 16px;
  margin-bottom: 36px;
}

mdw-date-picker-range-mobile .mdw-header .mdw-display-date-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 30px;
  color: var(--mdw-on-surface-variant);
}

mdw-date-picker-range-mobile .mdw-header .mdw-display-date-container .mdw-display-date-text {
  font-size: var(--mdw-font-headline-size-large);
  font-weight: var(--mdw-font-headline-weight-large);
  letter-spacing: var(--mdw-font-headline-letter-spacing-large);
  line-height: 40px;
  height: 40px;
  color: var(--mdw-on-surface-variant);
}

mdw-date-picker-range-mobile .mdw-header .mdw-display-date-container .mdw-date-range-dash {
  border-top: 2px solid var(--mdw-on-surface-variant);
  width: 16px;
  margin: 0 -42px;
}

mdw-date-picker-range-mobile .mdw-header .mdw-days-header {
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding: 26px 16px;
  padding-bottom: 4px;

  font-size: var(--mdw-font-body-size-small);
  font-weight: var(--mdw-font-body-weight-small);
  line-height: var(--mdw-font-body-line-height-small);
  letter-spacing: var(--mdw-font-body-letter-spacing-small);
  color: var(--mdw-on-surface);
}

mdw-date-picker-range-mobile .mdw-controls-container {
  display: flex;
  height: 24px;
  padding: 16px 12px;

  color: var(--mdw-on-surface-variant);
}


mdw-date-picker-range-mobile .mdw-controls-container .mdw-year-drop-down {
  flex: 1;
  display: flex;
  -webkit-tap-highlight-color: transparent;
}

mdw-date-picker-range-mobile .mdw-controls-container .mdw-month-previous {
  margin-right: 28px;
}

mdw-date-picker-range-mobile .mdw-controls-container .mdw-month-next {
  margin-right: 6px;
}

mdw-date-picker-range-mobile .mdw-controls-container .mdw-month-previous,
mdw-date-picker-range-mobile .mdw-controls-container .mdw-month-next {
  opacity: 1;
  transition: opacity 120ms;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

mdw-date-picker-range-mobile.mdw-year-view .mdw-controls-container .mdw-month-previous,
mdw-date-picker-range-mobile.mdw-year-view .mdw-controls-container .mdw-month-next {
  pointer-events: none;
  opacity: 0;
}

mdw-date-picker-range-mobile.mdw-year-view .mdw-controls-container .mdw-month-previous[disabled],
mdw-date-picker-range-mobile.mdw-year-view .mdw-controls-container .mdw-month-next[disabled] {
  pointer-events: none;
  opacity: 0.38;
}

mdw-date-picker-range-mobile .mdw-controls-container > .mdw-year-drop-down {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 12px;
  -webkit-tap-highlight-color: transparent;
}

mdw-date-picker-range-mobile .mdw-controls-container > .mdw-year-drop-down {
  font-size: var(--mdw-font-label-size-large);
  font-weight: var(--mdw-font-label-weight-large);
  line-height: var(--mdw-font-label-line-height-large);
  letter-spacing: var(--mdw-font-label-letter-spacing-large);
  -webkit-tap-highlight-color: transparent;
}

mdw-date-picker-range-mobile .mdw-controls-container > .mdw-year-drop-down .mdw-year-label {
  margin-right: 4px;
  -webkit-tap-highlight-color: transparent;
}

mdw-date-picker-range-mobile .mdw-controls-container > .mdw-year-drop-down > .mdw-icon-svg {
  width: 24px;
  height: 24px;
  transform-origin: center;
  transform: rotate(0);
  transition: transform 280ms;
  -webkit-tap-highlight-color: transparent;
}

mdw-date-picker-range-mobile .mdw-controls-container > .mdw-year-drop-down > .mdw-icon-svg > svg {
  fill: var(--mdw-on-surface-variant);
}

mdw-date-picker-range-mobile.mdw-year-view .mdw-controls-container > .mdw-year-drop-down > .mdw-icon-svg {
  transform: rotate(180deg);
}

mdw-date-picker-range-mobile .mdw-actions-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: end;
  height: 36px;
  padding: 12px;
  padding-top: 8px;
  background-color: var(--mdw-surface);
  z-index: 1;
  border-radius: 0 0 var(--mdw-shape-large) var(--mdw-shape-large);
  border-top: 1px solid var(--mdw-outline-alpha-60);
}

mdw-date-picker-range-mobile > .mdw-divider {
  width: 100%;
  border-top: 1px solid var(--mdw-outline-alpha-26);
}




mdw-date-picker-range-mobile .mdw-views-container {
  position: relative;
  height: 280px;
  transition: height 120ms;
}

mdw-date-picker-range-mobile.mdw-input-view .mdw-views-container {
  height: 90px;
}



/* --- month days ---*/

mdw-date-picker-range-mobile .mdw-months-container {
  padding: 12px 0;
  overflow-y: auto;
}


mdw-date-picker-range-mobile .mdw-months-container .mdw-month {
  position: unset;
  width: auto;
  opacity: 1;
  padding: 0 16px;
  padding-bottom: 20px;
  pointer-events: none;
  box-sizing: border-box;
}

mdw-date-picker-range-mobile .mdw-months-container .mdw-month-placeholder {
  height: 268px;
  width: 100%;
}


mdw-date-picker-range-mobile .mdw-months-container .mdw-month .mdw-month-header {
  padding-top: 16px;
  padding-bottom: 12px;
  padding-left: 36px;
  font-size: var(--mdw-font-title-size-small);
  font-weight: var(--mdw-font-title-weight-small);
  line-height: var(--mdw-font-title-line-height-small);
  letter-spacing: var(--mdw-font-title-letter-spacing-small);
  color: var(--mdw-on-surface);
}

mdw-date-picker-range-mobile .mdw-months-container .mdw-month .mdw-days-container {
  grid-template-rows: repeat(5, 40px);
}

mdw-date-picker-range-mobile .mdw-month {
  position: absolute;
  top: 0;
  left: 100%;
  width: 100%;
  padding: 0 16px;
  pointer-events: none;
  box-sizing: border-box;
}

mdw-date-picker-range-mobile .mdw-month .mdw-days-container {
  display: grid;
  grid-template-columns: repeat(7, auto);
  grid-template-rows: repeat(6, 40px);
  grid-column-gap: 3px;
  grid-row-gap: 0;
  align-items: center;
  justify-items: center;
  pointer-events: none;
}

mdw-date-picker-range-mobile .mdw-month.mdw-active {
  left: 0;
  pointer-events: all;
}

mdw-date-picker-range-mobile .mdw-month.mdw-previous {
  left: -100%;
}

mdw-date-picker-range-mobile .mdw-month.mdw-next {
  left: 100%;
}

mdw-date-picker-range-mobile .mdw-month.mdw-animation-active-next {
  left: 0;
  transition: left 180ms;
}

mdw-date-picker-range-mobile .mdw-month.mdw-animation-active-next.mdw-next {
  left: 100%;
}

mdw-date-picker-range-mobile .mdw-month.mdw-animation-previous-active {
  left: -100%;
  transition: left 180ms;
}

mdw-date-picker-range-mobile .mdw-month.mdw-animation-previous-active.mdw-active {
  left: 0;
}

mdw-date-picker-range-mobile .mdw-month.mdw-animation-active-previous {
  left: 0;
  transition: left 180ms;
}

mdw-date-picker-range-mobile .mdw-month.mdw-animation-active-previous.mdw-previous {
  left: -100%;
}

mdw-date-picker-range-mobile .mdw-month.mdw-animation-next-active {
  left: 100%;
  transition: left 180ms;
}

mdw-date-picker-range-mobile .mdw-month.mdw-animation-next-active.mdw-active {
  left: 0;
}


mdw-date-picker-range-mobile .mdw-month .mdw-days-container {
  opacity: 1;
  transition: opacity 120ms;
}

mdw-date-picker-range-mobile.mdw-year-view .mdw-month .mdw-days-container {
  opacity: 0;
}

mdw-date-picker-range-mobile:not(.mdw-year-view) .mdw-month .mdw-days-container {
  pointer-events: auto;
}


mdw-date-picker-range-mobile .mdw-month .mdw-days-container .mdw-day {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  user-select: none;
  box-sizing: border-box;
  cursor: pointer;
  pointer-events: none;
  border-radius: 50%;
  z-index: 1;
  -webkit-tap-highlight-color: transparent;

  font-size: var(--mdw-font-body-size-small);
  font-weight: var(--mdw-font-body-weight-small);
  line-height: var(--mdw-font-body-line-height-small);
  letter-spacing: var(--mdw-font-body-letter-spacing-small);
  color: var(--mdw-on-surface);
}

mdw-date-picker-range-mobile .mdw-month .mdw-days-container .mdw-day::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  border-radius: 50%;
  z-index: -1;
}

mdw-date-picker-range-mobile .mdw-month .mdw-days-container .mdw-day.mdw-interactive {
  cursor: pointer;
  pointer-events: auto;
}

mdw-date-picker-range-mobile .mdw-month .mdw-days-container .mdw-day.mdw-not-current-month {
  color: var(--mdw-on-surface-alpha-60);
}

mdw-date-picker-range-mobile .mdw-month .mdw-days-container .mdw-day.mdw-out-of-range {
  pointer-events: none;
  cursor: auto;
  color: var(--mdw-on-surface-alpha-60);
}

mdw-date-picker-range-mobile .mdw-month .mdw-days-container .mdw-day[selected] {
  color: var(--mdw-on-primary);
}

mdw-date-picker-range-mobile .mdw-month .mdw-days-container .mdw-day[selected]::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  box-sizing: border-box;
  border-radius: 50%;
  background-color: var(--mdw-primary);
  margin: 1px;
}

mdw-date-picker-range-mobile .mdw-month .mdw-days-container .mdw-day[selected][start]::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  box-sizing: border-box;
  background-color: var(--mdw-surface-variant);
  border-radius: 50% 0 0 50%;
  margin-top: 1px;
  margin-bottom: 1px;
  margin-right: -6px;
}

mdw-date-picker-range-mobile .mdw-month .mdw-days-container .mdw-day[selected][end]::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  box-sizing: border-box;
  background-color: var(--mdw-surface-variant);
  border-radius: 0 50% 50% 0;
  margin-top: 1px;
  margin-bottom: 1px;
  margin-left: -6px;
}

mdw-date-picker-range-mobile .mdw-month .mdw-days-container .mdw-day:not(.mdw-not-current-month)[in-selection-range]::before {
  background-color: var(--mdw-surface-variant);
  border-radius: 0;
  margin-left: -6px;
  margin-right: -6px;
  margin-top: 1px;
  margin-bottom: 1px;
}

mdw-date-picker-range-mobile .mdw-month .mdw-days-container .mdw-day[in-selection-range].mdw-first-day::before {
  border-radius: 20px 0 0 20px; /* use pixels because margin is stretched */
  margin-left: 0;
}

mdw-date-picker-range-mobile .mdw-month .mdw-days-container .mdw-day[in-selection-range].mdw-last-day::before {
  border-radius: 0 20px 20px 0; /* use pixels because margin is stretched */
  margin-right: 0;
}


/* --- year --- */


mdw-date-picker-range-mobile .mdw-views-container .mdw-years-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
  height: 280px;

  display: grid;
  grid-template-columns: repeat(3, 88px);
  grid-column-gap: 8px;
  grid-row-gap: 0px;
  align-items: center;
  justify-items: center;
  padding: 8px 16px;
  padding-right: 20px;

  opacity: 0;
  pointer-events: none;
  transition: opacity 120ms;
}

mdw-date-picker-range-mobile.mdw-year-view .mdw-views-container .mdw-years-container {
  opacity: 1;
  pointer-events: all;
  background-color: var(--mdw-surface);
}

mdw-date-picker-range-mobile .mdw-views-container .mdw-years-container .mdw-year {
  width: 100%;
  border-radius: 18px;
  text-align: center;
  cursor: pointer;
  margin: 7px;
  -webkit-tap-highlight-color: transparent;

  font-size: var(--mdw-font-label-size-medium);
  font-weight: var(--mdw-font-label-weight-medium);
  line-height: 36px;
  letter-spacing: var(--mdw-font-label-letter-spacing-medium);
  color: var(--mdw-on-surface);
}

mdw-date-picker-range-mobile .mdw-views-container .mdw-years-container .mdw-year[selected] {
  background-color: var(--mdw-primary);
  color: var(--mdw-on-primary);
}

mdw-date-picker-range-mobile .mdw-views-container .mdw-years-container .mdw-year.mdw-out-of-range {
  pointer-events: none;
  cursor: auto;
  color: var(--mdw-on-surface-alpha-60);
}



/* --- input --- */


mdw-date-picker-range-mobile .mdw-input-container {
  position: absolute;
  top: 72px;
  left: 24px;
  right: 24px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 120ms;
  display: flex;
  justify-content: space-between;
}

mdw-date-picker-range-mobile.mdw-input-view .mdw-input-container {
  opacity: 1;
  pointer-events: all;
}

mdw-date-picker-range-mobile .mdw-input-container mdw-textfield {
  width: 162px
}

mdw-date-picker-range-mobile.mdw-input-view .mdw-header,
mdw-date-picker-range-mobile.mdw-input-view .mdw-divider,
mdw-date-picker-range-mobile.mdw-input-view .mdw-months-container {
  opacity: 0;
  pointer-events: none;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Ta];var em=Ta;y.registerGlobalStyleSheet(em);customElements.define("mdw-date-picker-range-mobile",class extends y{useTemplate=!1;#t=this.#A.bind(this);#i=w.debounce(this.#D,100).bind(this);#e=w.debounce(this.#C,100).bind(this);#o=this.#R.bind(this);#s=this.#_.bind(this);#l=this.#S.bind(this);#c=this.#E.bind(this);#n=this.#M.bind(this);#a=w.rafThrottle(this.#$.bind(this));#d;#m;#r=new AbortController;constructor(){super(),this.clickOutsideClose=!1,this.scrim=!1,this.animation="opacity",this.addClickOutsideCloseIgnore(this.parentElement.control)}afterRender(){this.querySelector(".mdw-edit").addEventListener("click",this.#t,{signal:this.#r.signal}),this.querySelector(".mdw-cancel").addEventListener("click",this.#o,{signal:this.#r.signal}),this.querySelector(".mdw-close").addEventListener("click",this.#o,{signal:this.#r.signal}),this.querySelector(".mdw-ok").addEventListener("click",this.#s,{signal:this.#r.signal}),this.querySelector(".mdw-months-container").addEventListener("click",this.#l,{signal:this.#r.signal}),this.addEventListener("open",this.#c,{signal:this.#r.signal})}disconnectedCallback(){super.disconnectedCallback(),this.#r.abort()}get#w(){return this.parentElement.valueStart}set#w(t){this.parentElement.valueStart=t}get#u(){return this.parentElement.valueEnd}set#u(t){this.parentElement.valueEnd=t}get#p(){return this.parentElement.displayDateStart}set#p(t){this.parentElement.displayDateStart=t}get#h(){return this.parentElement.displayDateEnd}set#h(t){this.parentElement.displayDateEnd=t}get#g(){return this.parentElement.initialValueStart}get#f(){return this.parentElement.initialValueEnd}get#b(){return this.parentElement.valueDateStart}set#b(t){this.parentElement.valueDateStart=t}get#v(){return this.parentElement.valueDateEnd}set#v(t){this.parentElement.valueDateEnd=t}get#y(){return this.parentElement.minDate}get#x(){return this.parentElement.maxDate}template(){return`
      <div class="mdw-header-controls">
        <div class="mdw-close mdw-icon-svg">${$s}</div>
      </div>
      
      <div class="mdw-header">
        <div class="mdw-supporting-text">${this.parentElement.label}</div>
        <div class="mdw-display-date-container">
          <div class="mdw-display-date-text start">${c.format(this.#p,"MMM DD")}</div>
          <span class="mdw-date-range-dash"></span>
          <div class="mdw-display-date-text end">${c.format(this.#h,"MMM DD")}</div>
          <div class="mdw-edit mdw-icon-svg">${_s}</div>
        </div>

        <div class="mdw-days-header">
          ${c.getDayNames("narrow").map(t=>`<span>${t}</span>`).join(`
`)}
        </div>
      </div>

      <div class="mdw-divider"></div>

      <div class="mdw-months-container">
        ${[...new Array(34)].map((t,e)=>`<div class="mdw-month-placeholder"  mdw-date="${this.#k(this.#p,-3-e)}"></div>`).reverse().join(`
`)}
        <div class="mdw-month" mdw-date="${this.#k(this.#p,-2)}">${this.#L(c.addToDateByParts(this.#p,{month:-2}))}</div>
        <div class="mdw-month" mdw-date="${this.#k(this.#p,-1)}">${this.#L(c.addToDateByParts(this.#p,{month:-1}))}</div>
        <div class="mdw-month current" mdw-date="${this.#k(this.#p)}">${this.#L(this.#p)}</div>
        <div class="mdw-month" mdw-date="${this.#k(this.#p,1)}">${this.#L(c.addToDateByParts(this.#p,{month:1}))}</div>
        <div class="mdw-month" mdw-date="${this.#k(this.#p,2)}">${this.#L(c.addToDateByParts(this.#p,{month:2}))}</div>
        ${[...new Array(34)].map((t,e)=>`<div class="mdw-month-placeholder"  mdw-date="${c.format(c.addToDateByParts(this.#p,{month:e+3}),"YYYY-MM-DD")}"></div>`).join(`
`)}
      </div>

      <div class="mdw-input-container">
        <mdw-textfield>
          <input class="start" type="date">
          <label>Start date</label>
        </mdw-textfield>
        <mdw-textfield>
          <input class="end" type="date">
          <label>End date</label>
        </mdw-textfield>
      </div>

      <div class="mdw-actions-container">
        <mdw-button class="mdw-cancel">Cancel</mdw-button>
        <mdw-button class="mdw-ok">Ok</mdw-button>
      </div>
    `}#k(t,e=0){return c.format(c.setDateByParts(c.addToDateByParts(t,{month:e}),{day:1}),"YYYY-MM-DD")}#L(t=this.#p){return`
      <div class="mdw-month-header">${c.format(t,"MMMM YYYY")}</div>
      <div class="mdw-days-container">
        ${sn(t,this.#w,this.#u,this.#y,this.#x,!1)}
      </div>
    `}#A(){this.classList.contains("mdw-input-view")?(this.querySelector("input.start").removeEventListener("input",this.#i),this.querySelector("input.end").removeEventListener("input",this.#e),this.classList.remove("mdw-input-view")):(this.classList.add("mdw-input-view"),this.querySelector("input.start").addEventListener("click",t=>t.preventDefault(),{signal:this.#r.signal}),this.querySelector("input.start").value=c.format(this.#p,"YYYY-MM-DD"),this.querySelector("input.start").addEventListener("input",this.#i,{signal:this.#r.signal}),this.querySelector("input.end").addEventListener("click",t=>t.preventDefault(),{signal:this.#r.signal}),this.querySelector("input.end").value=c.format(this.#h,"YYYY-MM-DD"),this.querySelector("input.end").addEventListener("input",this.#e,{signal:this.#r.signal}))}#D(t){this.#w=t.target.value}#C(t){this.#u=t.target.value}#T(t){if(this.#m){this.#d=t,this.#m=void 0,this.#b="",this.#v="";let e=this.querySelector(`.mdw-day[mdw-date="${c.format(t,"YYYY-MM-DD")}"]`);e&&e.setAttribute("selected","")}else{this.#m=t;let e=this.querySelector(".mdw-day.mdw-interactive[selected]"),o=c.parse(e.getAttribute("mdw-date")),s=this.querySelector(`.mdw-day[mdw-date="${c.format(t,"YYYY-MM-DD")}"]`);s.setAttribute("selected",""),o.getTime()>t.getTime()?(e.setAttribute("start",""),s.setAttribute("end",""),this.#b=t,this.#v=o):(s.setAttribute("start",""),e.setAttribute("end",""),this.#b=o,this.#v=t)}this.#z()}#z(t=!0){if(t){let r=this.querySelector("[selected][start]");r&&(r.removeAttribute("selected"),r.removeAttribute("start"));let a=this.querySelector("[selected][end]");a&&(a.removeAttribute("selected"),a.removeAttribute("end")),this.querySelector(".mdw-display-date-text.start").innerText="",this.querySelector(".mdw-display-date-text.end").innerText=""}if([...this.querySelectorAll("[in-selection-range]")].forEach(r=>r.removeAttribute("in-selection-range")),!c.isValid(this.#b)||!c.isValid(this.#v))return;let e=this.querySelector(".mdw-months-container"),o=document.createElement("template");c.getMonthRange(this.#b,this.#v).forEach(r=>{let a=this.querySelector(`.mdw-month[mdw-date="${c.format(r,"YYYY-MM-DD")}"]`);o.innerHTML=`
          <div class="mdw-month" mdw-date="${this.#k(r)}">${this.#L(r)}</div>
        `,e.replaceChild(o.content.cloneNode(!0),a)}),this.querySelector(".mdw-display-date-text.start").innerText=c.format(this.#b,"MMM DD"),this.querySelector(".mdw-display-date-text.end").innerText=c.format(this.#v,"MMM DD")}#R(){this.#w=this.#g,this.#u=this.#f,this.#z(),this.close()}#_(){this.close()}#S(t){t.target.classList.contains("mdw-day")&&this.#T(c.parse(t.target.getAttribute("mdw-date")))}#E(){this.classList.remove("mdw-input-view");let t=this.querySelector(".mdw-month.current");t&&(t.scrollIntoView({block:"center"}),this.addEventListener("close",this.#n,{signal:this.#r.signal}),this.querySelector(".mdw-months-container").addEventListener("scroll",this.#a,{signal:this.#r.signal}));let e=this.querySelector(".mdw-day.mdw-interactive[selected][start]");e&&(this.#d=c.parse(e.getAttribute("mdw-date")));let o=this.querySelector(".mdw-day.mdw-interactive[selected][start]");o&&(this.#m=c.parse(o.getAttribute("mdw-date")))}#M(){this.removeEventListener("close",this.#n),this.querySelector(".mdw-months-container").removeEventListener("scroll",this.#a)}#$(){let t=this.querySelector(".mdw-months-container"),e=[...t.querySelectorAll(".mdw-month-placeholder")];if(e.length===0)return;let o=t.scrollTop-100,s=t.offsetHeight+t.scrollTop+100,r=document.createElement("template");e.forEach(a=>{if(a.offsetBottom>o||a.offsetTop<s){let h=a.getAttribute("mdw-date");r.innerHTML=`<div class="mdw-month" mdw-date="${h}">${this.#L(c.parse(h))}</div>`,t.replaceChild(r.content.cloneNode(!0),a)}})}});customElements.define("mdw-date-picker-range",class extends p{useTemplate=!1;#t;#i;#e;#o;#s="";#l="";#c="";#n="";#a=this.#u.bind(this);#d=this.#p.bind(this);#m=this.#h.bind(this);#r=this.#g.bind(this);#w=new AbortController;constructor(){if(super(),this.#t=this.parentNode,this.#t.nodeName!=="MDW-TEXTFIELD")throw Error("mdw-date-picker-range must be a child of mdw-textfield");if(this.#e=document.querySelector(this.getAttribute("end-input")),this.#e?.nodeName!=="MDW-TEXTFIELD")throw Error("mdw-date-picker-range[end-input] must be a valid css selector for second mdw-textfield");this.#i=this.#t.querySelector("input"),this.#o=this.#e.querySelector("input"),this.#t.classList.add("mdw-has-date-picker"),this.#e.classList.add("mdw-has-date-picker"),this.#s=c.parse(this.valueStart?this.valueStart:c.today()),this.#l=c.parse(this.valueEnd?this.valueEnd:c.today()),this.#c=this.valueStart,this.#n=this.valueEnd}afterRender(){this.#i.addEventListener("focus",this.#a,{signal:this.#w.signal}),this.#o.addEventListener("focus",this.#a,{signal:this.#w.signal}),v.isMobile&&(this.#t.addEventListener("click",this.#d,{signal:this.#w.signal}),this.#e.addEventListener("click",this.#d,{signal:this.#w.signal})),this.firstChild.addEventListener("open",this.#m,{signal:this.#w.signal}),this.firstChild.addEventListener("close",this.#r,{signal:this.#w.signal})}disconnectedCallback(){this.#w.abort()}get value(){return`${this.valueStart}:${this.valueEnd}`}get inputStart(){return this.#i}get inputEnd(){return this.#o}get valueStart(){return this.#i.value}set valueStart(t){this.#i.value=t}get valueEnd(){return this.#o.value}set valueEnd(t){this.#o.value=t}get valueDate(){return[this.valueDateStart,this.valueDateEnd]}get valueDateStart(){return c.parse(this.#i.value)}set valueDateStart(t){this.#i.value=c.format(t,"YYYY-MM-dd")||""}get valueDateEnd(){return c.parse(this.#o.value)}set valueDateEnd(t){this.#o.value=c.format(t,"YYYY-MM-dd")||""}get displayValueStart(){return c.format(this.#s,"YYYY-MM-dd")}set displayValueStart(t){this.#s=c.parse(t)}get displayValueEnd(){return c.format(this.#s,"YYYY-MM-dd")}set displayValueEnd(t){this.#s=c.parse(t)}get displayDate(){return[this.displayDateStart,this.displayDateEnd]}get displayDateStart(){return this.#s}set displayDateStart(t){this.#s=c.parse(t)}get displayDateEnd(){return this.#l}set displayDateEnd(t){this.#l=c.parse(t)}get initialValueStart(){return this.#c}get initialValueEnd(){return this.#n}get min(){return this.#i.min}get max(){return this.#i.max}get minDate(){return c.parse(this.#i.min)}get maxDate(){return c.parse(this.#i.max)}get controlStart(){return this.#t}get controlEnd(){return this.#e}get label(){return this.getAttribute("label")||"Select date range"}show(){this.firstChild.show()}close(){this.firstChild.close()}#u(){this.firstChild.show()}#p(){this.firstChild.show()}#h(){v.isMobile?(this.#t.removeEventListener("click",this.#d),this.#e.removeEventListener("click",this.#d)):(this.#i.removeEventListener("focus",this.#a),this.#o.removeEventListener("focus",this.#a)),this.#s=c.parse(this.valueStart?this.valueStart:c.today()),this.#l=c.parse(this.valueEnd?this.valueEnd:c.today()),this.#c=this.valueStart,this.#n=this.valueEnd}#g(){setTimeout(()=>{v.isMobile?(this.#t.addEventListener("click",this.#d,{signal:this.#w.signal}),this.#e.addEventListener("click",this.#d,{signal:this.#w.signal})):(this.#i.addEventListener("focus",this.#a,{signal:this.#w.signal}),this.#o.addEventListener("focus",this.#a,{signal:this.#w.signal}))}),this.#t.querySelector("input").reportValidity(),this.#e.querySelector("input").reportValidity()}template(){return v.isMobile?"<mdw-date-picker-range-mobile></mdw-date-picker-range-mobile>":"<mdw-date-picker-range-desktop></mdw-date-picker-range-desktop>"}});var za=new CSSStyleSheet;za.replaceSync(`mdw-dialog {
  position: fixed;
  display: flex;
  flex-direction: column;
  min-width: 280px;
  max-width: 560px;
  max-height: calc(100% - 84px);
  padding: 24px;
  box-sizing: border-box;
  z-index: 11;
  left: 50%;
  top: 50%;
  pointer-events: none;

  border-radius: var(--mdw-shape-extra-large);
  background-color: var(--mdw-surface);
  box-shadow: var(--mdw-elevation-3);

  opacity: 0;
  transform: translate(-50%, calc(-50% - 120px));

  transition: opacity 120ms, transform 280ms;
  transition-timing-function: var(--mdw-transition-expand-out);

  overflow: auto;
}

mdw-dialog::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  background-color: var(--mdw-elevation-tint-3);
  border-radius: inherit;
}

mdw-dialog[open] {
  opacity: 1;
  transform: translate(-50%, -50%);
  pointer-events: all;

  transition: opacity 120ms, transform 280ms;
  transition-timing-function: var(--mdw-transition-expand-in);
}

mdw-dialog > .mdw-content {
  flex: 1;
  font-size: var(--mdw-font-body-size-medium);
  font-weight: var(--mdw-font-body-weight-medium);
  line-height: var(--mdw-font-body-line-height-medium);
  letter-spacing: var(--mdw-font-body-letter-spacing-medium);
  color: var(--mdw-on-surface-variant);
}

mdw-dialog > .mdw-actions {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 24px;
}

mdw-dialog > .mdw-header {
  margin-bottom: 16px;
  font-size: var(--mdw-font-headline-size-small);
  font-weight: var(--mdw-font-headline-weight-small);
  line-height: var(--mdw-font-headline-line-height-small);
  letter-spacing: var(--mdw-font-headline-letter-spacing-small);
  color: var(--mdw-on-surface);
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,za];var im=za;y.registerGlobalStyleSheet(im);var nn=class extends y{#t;#i;#e;#o=this.#s.bind(this);constructor(){super()}connectedCallback(){super.connectedCallback(),this.setAttribute("role","dialog")}get returnValue(){return this.#t}show(){super.show();let t=[...this.querySelectorAll("*")].find(e=>e.tabindex>-1||parseInt(e.getAttribute("tabindex")||-1)>-1);t&&(this.#i=t,this.#e=document.activeElement,window.addEventListener("keydown",this.#o))}close(t){this.open===!0&&(this.#t=t,super.close(),this.#e&&this.#e.focus())}#s(t){t.code==="Tab"&&(this.#i.focus(),this.#i=void 0,t.preventDefault(),window.removeEventListener("keydown",this.#o))}};customElements.define("mdw-dialog",nn);var $a=new CSSStyleSheet;$a.replaceSync(`:host {
  position: relative;
  display: inline-flex;
  align-items: center;
  user-select: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  z-index: 11;

  font-size: var(--mdw-font-label-size-large);
  font-weight: var(--mdw-font-label-weight-large);
  letter-spacing: var(--mdw-font-label-letter-spacing-large);

  padding: 16px;
  box-sizing: border-box;
  min-width: 56px;
  max-width: 100%;
  height: 56px;
  border-radius: var(--mdw-shape-large);

  color: var(--mdw-on-primary-container);
  background-color: var(--mdw-primary-container);
  box-shadow: var(--mdw-elevation-3);

  overflow: hidden;
}

:host(.mdw-fixed) {
  position: fixed !important;
}

:host ::slotted(mdw-icon) {
  color: var(--mdw-on-primary-container);
  vertical-align: middle;
}

:host(.mdw-has-label) ::slotted(mdw-icon) {
  margin-right: 8px;
}

:host(.mdw-has-label) ::slotted(mdw-icon.mdw-trailing) {
  margin-right: 0;
  margin-left: 8px;
}

:host(:not(.mdw-no-animation).mdw-has-label) {
  transition: max-width 1600ms, color 120ms;
  transition-timing-function: var(--mdw-transition-expand-in);
}

:host(:not(.mdw-no-animation).mdw-hide-label.mdw-has-label) {
  transition:
    max-width 600ms,
    color 120ms 380ms;
  transition-timing-function: var(--mdw-transition-expand-in);
}

:host(.mdw-hide-label.mdw-has-label) {
  color: var(--mdw-on-primary-container-alpha-0);
  max-width: 56px;
  overflow: hidden;
}


:host(.mdw-small) {
  padding: 8px;
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  border-radius: var(--mdw-shape-medium);
}

:host(.mdw-large)::after {
  border-radius: var(--mdw-shape-medium);
}

:host(.mdw-large) {
  min-width: 96px;
  height: 96px;
  max-width: 96px;
  justify-content: center;
  border-radius: var(--mdw-shape-extra-large);
}

:host(.mdw-large)::after {
  border-radius: var(--mdw-shape-extra-large);
}

:host(.mdw-large) ::slotted(mdw-icon) {
  width: var(--mdw-font-icon-size-large) !important;
  height: var(--mdw-font-icon-size-large) !important;
  font-size: var(--mdw-font-icon-size-large) !important;
  line-height: var(--mdw-font-icon-size-large) !important;
}


:host([disabled]) {
  pointer-events: none;
  cursor: unset;
  color: var(--mdw-on-surface);
  opacity: 0.38;
}

:host::after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  border-radius: var(--mdw-shape-large);
}

:host(:hover)::after {
  box-shadow: var(--mdw-elevation-4);
  opacity: var(--mdw-state-layer-opacity-hover);
  background-color: var(--mdw-on-primary-container);
}

:host(:active)::after {
  opacity: var(--mdw-state-layer-opacity-pressed);
  background-color: var(--mdw-on-primary-container);
}

:host(:focus)::after {
  opacity: var(--mdw-state-layer-opacity-focus);
  background-color: var(--mdw-on-primary-container);
}

:host(.mdw-icon-toggle-button)::after,
:host(.mdw-icon-button)::after {
  margin-left: 0;
}


:host(.mdw-surface) {
  color: var(--mdw-primary);
  background-color: var(--mdw-surface);
}

:host(.mdw-surface:hover)::after {
  background-color: var(--mdw-on-surface);
}

:host(.mdw-surface:active)::after {
  background-color: var(--mdw-on-surface);
}

:host(.mdw-surface:focus)::after {
  background-color: var(--mdw-on-surface);
}


:host(.mdw-secondary) {
  color: var(--mdw-on-secondary-container);
  background-color: var(--mdw-secondary-container);
}

:host(.mdw-secondary:hover)::after {
  background-color: var(--mdw-on-secondary-container);
}

:host(.mdw-secondary:active)::after {
  background-color: var(--mdw-on-secondary-container);
}

:host(.mdw-secondary:focus)::after {
  background-color: var(--mdw-on-secondary-container);
}

:host(.mdw-tertiary) {
  color: var(--mdw-on-tertiary-container);
  background-color: var(--mdw-tertiary-container);
}

:host(.mdw-tertiary:hover)::after {
  background-color: var(--mdw-on-tertiary-container);
}

:host(.mdw-tertiary:active)::after {
  background-color: var(--mdw-on-tertiary-container);
}

:host(.mdw-tertiary:focus)::after {
  background-color: var(--mdw-on-tertiary-container);
}

/* --- positioning --- */
:host(.mdw-position-bottom-right),
:host(.mdw-position-right-bottom) {
  position: absolute;
  bottom: 16px;
  right: 16px;
}

:host(.mdw-position-bottom-left),
:host(.mdw-position-left-bottom) {
  position: absolute;
  bottom: 16px;
  left: 16px;
}

:host(.mdw-position-top-right),
:host(.mdw-position-right-top) {
  position: absolute;
  top: 16px;
  right: 16px;
}

:host(.mdw-position-top-left),
:host(.mdw-position-left-top) {
  position: absolute;
  top: 16px;
  left: 16px;
}



/* --- Ripple --- */

.ripple {
  overflow: hidden;
  border-radius: inherit;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
}

.ripple > .mdw-ripple-element {
  background-color: var(--mdw-primary-alpha-16);
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,$a];var om=$a;var _a,Vi,Yi,ji,rn,sm,an,nm;customElements.define("mdw-fab",(_a=class extends p{constructor(){super();n(this,rn);n(this,an);g(this,"useShadowRoot",!0);n(this,Vi,void 0);n(this,Yi,this.classList.contains("mdw-auto-hide-label"));n(this,ji,w.rafThrottle(l(this,an,nm)).bind(this));w.getTextFromNode(this)&&this.classList.add("mdw-has-label"),l(this,rn,sm).call(this)}connectedCallback(){this.tabIndex=0,this.setAttribute("role","button")}afterRender(){i(this,Yi)&&w.trackPageScroll(i(this,ji)),m(this,Vi,new P({element:this.shadowRoot.querySelector(".ripple"),triggerElement:this,ignoreElements:[this.querySelector("mdw-menu")]}))}disconnectedCallback(){i(this,Yi)&&w.untrackPageScroll(i(this,ji)),i(this,Vi).destroy()}template(){return`
      <slot></slot>
      <div class="ripple"></div>
    `}},Vi=new WeakMap,Yi=new WeakMap,ji=new WeakMap,rn=new WeakSet,sm=function(){let e=this.querySelector("mdw-icon");if(!e)return;let o=e.previousSibling;for(;o&&!(o.nodeType===3&&o.textContent.trim()!=="");)o=o.previousSibling;o&&e.classList.add("mdw-trailing")},an=new WeakSet,nm=function({distanceFromDirectionChange:e}){let o=this.classList.contains("mdw-hide-label");e<-100&&o?(this.classList.remove("mdw-hide-label"),this.style.maxWidth=`${this.offsetWidth+this.scrollWidth}px`):e>100&&!o&&(this.classList.add("mdw-hide-label"),this.style.maxWidth="")},g(_a,"styleSheets",om),_a));document.addEventListener("DOMContentLoaded",vh);function vh(){window.addEventListener("formdata",xh),window.addEventListener("reset",yh)}function yh(d){kh(d.target).forEach(t=>{["MDW-CHECKBOX","MDW-SWITCH"].includes(t.nodeName)?t.checked=t.hasAttribute("checked"):t.value=t.getAttribute("value")||""})}function xh({target:d,formData:t}){Sh(d).forEach(e=>{let o=e.getAttribute("name"),s=e.value;["MDW-CHECKBOX","MDW-SWITCH"].includes(e.nodeName)?t.has(o)?e.checked===!0?t.set(o,s):t.delete(o):e.checked===!0&&t.append(o,s):t.has(o)?t.set(o,s):t.append(o,s)})}function kh(d){return[...d.querySelectorAll("input"),...d.querySelectorAll("mdw-checkbox"),...d.querySelectorAll("mdw-switch"),...d.querySelectorAll("mdw-slider"),...d.querySelectorAll("mdw-slider-range"),...d.querySelectorAll("mdw-select"),...d.querySelectorAll("mdw-radio-group")]}function Sh(d){return[...d.querySelectorAll("mdw-checkbox[name]"),...d.querySelectorAll("mdw-select[name]")]}var qa=new CSSStyleSheet;qa.replaceSync(`mdw-icon {
  width: var(--mdw-font-icon-size-medium);
  height: var(--mdw-font-icon-size-medium);
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: var(--mdw-font-icon-size-medium);
  line-height: var(--mdw-font-icon-size-medium);
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;

  font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
}

mdw-icon[onclick] {
  cursor: pointer;
}

/* handles in src/components/icon/component.js */
html:not(.mdw-material-icon-font-loaded) mdw-icon {
  opacity: 0;
}

mdw-icon.mdw-small {
  width: var(--mdw-font-icon-size-small);
  height: var(--mdw-font-icon-size-small);
  font-size: var(--mdw-font-icon-size-small);
  line-height: var(--mdw-font-icon-size-small);
}

mdw-icon.mdw-large {
  width: var(--mdw-font-icon-size-large);
  height: var(--mdw-font-icon-size-large);
  font-size: var(--mdw-font-icon-size-large);
  line-height: var(--mdw-font-icon-size-large);
}

mdw-icon.mdw-extra-large {
  width: var(--mdw-font-icon-size-extra-large);
  height: var(--mdw-font-icon-size-extra-large);
  font-size: var(--mdw-font-icon-size-extra-large);
  line-height: var(--mdw-font-icon-size-extra-large);
}

mdw-icon.mdw-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48;
}


mdw-icon.mdw-light {
  font-variation-settings:
    'FILL' 1,
    'wght' 100,
    'GRAD' 0,
    'opsz' 48;
}

mdw-icon.mdw-light.mdw-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 100,
    'GRAD' 0,
    'opsz' 48;
}

mdw-icon.mdw-bold {
  font-variation-settings:
    'FILL' 1,
    'wght' 700,
    'GRAD' 0,
    'opsz' 48;
}

mdw-icon.mdw-bold.mdw-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 700,
    'GRAD' 0,
    'opsz' 48;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,qa];var rm=qa;p.registerGlobalStyleSheet(rm);var am=[...document.fonts].find(d=>d.family==="Material Symbols Outlined");am&&am.loaded.then(()=>{document.querySelector("html").classList.add("mdw-material-icon-font-loaded")});customElements.define("mdw-icon",class extends p{constructor(){super()}});customElements.define("mdw-list-item",class extends p{#t;#i=!1;#e=this.getAttribute("value")||"";#o;#s;#l=this.#b.bind(this);#c=this.#y.bind(this);#n=this.querySelector("[action]");#a=this.querySelector("mdw-list-item-action-right")||this.querySelector("mdw-list-item-action-left");#d=this.#k.bind(this);#m=this.#x.bind(this);#r=this.#L.bind(this);#w;#u=64;#p=this.#A.bind(this);#h=this.#D.bind(this);#g=this.#C.bind(this);constructor(){super()}connectedCallback(){if(this.tabIndex=0,this.setAttribute("role","listitem"),this.#f&&(this.#s=this.querySelector("mdw-avatar"),this.#s&&(this.#s.classList.add("mdw-checkbox"),this.#s.setAttribute("role","checkbox")),this.#o=this.querySelector("mdw-checkbox"),this.addEventListener("click",this.#l)),this.#n&&this.addEventListener("click",this.#c),this.#a&&(this.#t=new A(this),this.#t.onDrag(this.#d),this.#t.onStart(this.#m),this.#t.onEnd(this.#r),this.#t.enable()),this.addEventListener("focus",this.#p),!this.hasAttribute("aria-label")){let t=this.querySelector(".mdw-headline")?.innerText||w.getTextFromNode(this);t&&this.setAttribute("aria-label",t)}}disconnectedCallback(){this.removeEventListener("click",this.#l),this.removeEventListener("click",this.#c),this.removeEventListener("focus",this.#p),this.removeEventListener("blur",this.#h),this.removeEventListener("keydown",this.#g),this.#t&&(this.#t.destroy(),this.#t=void 0)}static get observedAttributes(){return["value","checked"]}attributeChangedCallback(t,e,o){t==="checked"?this.checked=o!==null:this[t]=o}get value(){return this.#e}set value(t){this.#e=t}get checked(){return this.#i}set checked(t){this.#i=!!t,this.classList.toggle("mdw-checked",this.#i),this.#o&&(this.#o.checked=this.checked),this.#s&&(this.#s.checked=this.checked),this.parentElement.updateSelection(this.value,this.checked)}setCheckedWithoutUpdate(t){this.#i=!!t,this.classList.toggle("mdw-checked",this.#i),this.#o&&(this.#o.checked=this.checked),this.#s&&(this.#s.checked=this.checked)}get#f(){return this.parentElement.selectable}async remove(){this.style.overflowY="hidden",this.style.transition="height 320ms",this.style.height="0",await w.nextAnimationFrameAsync(),await w.transitionendAsync(this),super.remove()}#b(t){this.#v(t.target)&&(this.checked=!this.checked)}#v(t){return!!(t.nodeName==="MDW-AVATAR"||t.nodeName==="MDW-CHECKBOX"||t.classList.contains("mdw-select-control"))}async#y(t){let e=t.target.getAttribute("action"),o=t.target.hasAttribute("action-remove");if(o){let s=this.querySelector("mdw-list-item-action-left");s&&(s.style.opacity=0);let r=this.querySelector("mdw-list-item-action-right");r&&(r.style.opacity=0),this.style.setProperty("--mdw-list-item-swipe-position","100%"),await w.transitionendAsync(this),this.remove(this)}this.parentElement.dispatchEvent(new CustomEvent("change",{detail:{action:e,value:this.value,listItem:this,...o&&{remove:!0}}}))}#x(){this.classList.add("mdw-dragging"),this.#w=parseInt(getComputedStyle(this).getPropertyValue("--mdw-list-item-swipe-position").replace("px",""))}#k({distance:t}){let e=this.#w+t.x;this.style.setProperty("--mdw-list-item-swipe-position",`${e}px`),this.classList.toggle("mdw-action-active",e<-this.#u||e>this.#u)}async#L(){this.classList.remove("mdw-dragging");let t=parseInt(getComputedStyle(this).getPropertyValue("--mdw-list-item-swipe-position").replace("px",""));if(t>-this.#u&&t<this.#u)this.style.setProperty("--mdw-list-item-swipe-position","0px");else{let e=t<-this.#u?this.querySelector("mdw-list-item-action-left"):this.querySelector("mdw-list-item-action-right"),o=e.hasAttribute("action-remove");o?(e.style.opacity=0,this.style.setProperty("--mdw-list-item-swipe-position",t>0?"100%":"-100%"),await w.transitionendAsync(this),this.remove()):this.style.setProperty("--mdw-list-item-swipe-position","0px"),this.parentElement.dispatchEvent(new CustomEvent("change",{detail:{action:e.getAttribute("action"),value:this.value,listItem:this,...o&&{remove:!0}}}))}}#A(){this.addEventListener("blur",this.#h),this.addEventListener("keydown",this.#g)}#D(){this.removeEventListener("blur",this.#h),this.removeEventListener("keydown",this.#g)}#C(t){if(t.code==="Enter"||t.code==="Space"){if(!this.parentElement.classList.contains("mdw-select"))return;this.checked=!this.checked,t.preventDefault()}else t.code==="ArrowDown"?(this.#T(),t.preventDefault()):t.code==="ArrowUp"&&(this.#z(),t.preventDefault())}#T(){let t=document.activeElement?.nextElementSibling;t&&(t.nodeName!=="MDW-LIST-ITEM"&&(t=t.nextElementSibling),t?.nodeName==="MDW-LIST-ITEM"&&t.focus())}#z(){let t=document.activeElement?.previousElementSibling;t&&(t.nodeName!=="MDW-LIST-ITEM"&&(t=t.previousElementSibling),t?.nodeName==="MDW-LIST-ITEM"&&t.focus())}});var Ra=new CSSStyleSheet;Ra.replaceSync(`mdw-list {
  display: block;
  background-color: var(--mdw-surface);
  overflow-x: hidden;
}

mdw-list-item {
  --mdw-list-item-swipe-position: 0px;

  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  height: 32px;
  /* 56 - (12 * 2) padding */
  padding: 12px 16px;
  margin-bottom: 3px;
  white-space: nowrap;
  outline: none;
  z-index: 0;

  font-size: var(--mdw-font-body-size-large);
  font-weight: var(--mdw-font-body-weight-large);
  line-height: var(--mdw-font-body-line-height-large);
  letter-spacing: var(--mdw-font-body-letter-spacing-large);
  background-color: var(--mdw-surface);

  color: var(--mdw-on-surface-alpha-76);

  left: var(--mdw-list-item-swipe-position);
  transition: left 220ms;
}

mdw-list-item.mdw-dragging {
  transition: none;
}

mdw-list.mdw-line-compact > mdw-list-item,
mdw-list > mdw-list-item.mdw-line-compact {
  height: 24px;
  /* 72 - (12 * 2) padding */
}

mdw-list.mdw-line-two > mdw-list-item,
mdw-list > mdw-list-item.mdw-line-two {
  height: 48px;
  /* 72 - (12 * 2) padding */
}

mdw-list.mdw-line-three > mdw-list-item,
mdw-list > mdw-list-item.mdw-line-three {
  height: 64px;
  /* 72 - (12 * 2) padding */
  align-items: start;
}

mdw-list-item > .mdw-text {
  flex: 1;
}

body.mdw-mobile mdw-list-item > .mdw-mobile-hide {
  display: none;
}

mdw-list-item .mdw-action {
  cursor: pointer;
}

mdw-list-item .mdw-action.mdw-auto-hide-action {
  cursor: none;
  opacity: 0;
  transition: opacity 120ms;
}

mdw-list-item > .mdw-headline,
mdw-list-item > .mdw-text > .mdw-headline {
  font-size: var(--mdw-font-body-size-large);
  font-weight: var(--mdw-font-body-weight-large);
  line-height: var(--mdw-font-body-line-height-large);
  letter-spacing: var(--mdw-font-body-letter-spacing-large);
  color: var(--mdw-on-surface);
}

mdw-list-item > .mdw-supporting-text,
mdw-list-item > .mdw-text > .mdw-supporting-text {
  margin-top: 0;
  font-size: var(--mdw-font-body-size-medium);
  font-weight: var(--mdw-font-body-weight-medium);
  line-height: var(--mdw-font-body-line-height-medium);
  letter-spacing: var(--mdw-font-body-letter-spacing-medium);
}

mdw-list-item > .mdw-svg-icon {
  width: 24px;
  height: 24px;
}

mdw-list-item > .mdw-svg-icon > svg {
  fill: var(--mdw-on-surface-variant);
}

mdw-list-item > mdw-icon,
mdw-list-item > .mdw-svg-icon {
  margin-right: 32px;
}

mdw-list-item > .mdw-text ~ mdw-icon {
  margin-right: 18px;
}

mdw-list-item > .mdw-text ~ mdw-icon:last-of-type {
  margin-right: 8px;
}


mdw-list:not(.mdw-no-states) > mdw-list-item::after {
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  opacity: 0;
  outline: none;
  pointer-events: none;
}

mdw-list:not(.mdw-no-states) > mdw-list-item:focus::after {
  opacity: var(--mdw-state-layer-opacity-focus);
  background-color: var(--mdw-on-surface);
}

@media (hover: hover) {
  mdw-list-item:hover .mdw-action.mdw-auto-hide-action {
    cursor: pointer;
    opacity: 1;
  }
  
  mdw-list:not(.mdw-no-states) > mdw-list-item:hover::after {
    opacity: var(--mdw-state-layer-opacity-hover);
    background-color: var(--mdw-on-surface);
  }
}

/* mdw-list:not(.mdw-no-states) > mdw-list-item:focus::after {
  opacity: var(--mdw-state-layer-opacity-focus);
  background-color: var(--mdw-on-surface);
} */

mdw-list:not(.mdw-no-states) > mdw-list-item.mdw-checked::after {
  opacity: var(--mdw-state-layer-opacity-focus);
  background-color: var(--mdw-surface-tint);
}


mdw-list > .mdw-sub-header {
  position: sticky;
  top: 0;
  padding: 0 16px;
  z-index: 1;
  font-size: var(--mdw-font-body-size-small);
  font-weight: var(--mdw-font-body-weight-small);
  letter-spacing: var(--mdw-font-body-letter-spacing-small);
  line-height: 54px;
  background-color: inherit;
  color: var(--mdw-on-surface-variant-alpha-76);
}

mdw-list > .mdw-sub-header.mdw-inset {
  padding-left: 70px;
}


mdw-list > .mdw-sub-header::before {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background-color: none;
  background-color: var(--mdw-surface-tint-alpha-6);
  transition: background-color 80ms linear;
}

mdw-list.mdw-scrolled > .mdw-sub-header.mdw-stuck::before {
  background-color: var(--mdw-surface-tint-alpha-8);
}


/* Alt for box shadow */
/* mdw-list.mdw-scrolled > .mdw-sub-header.mdw-stuck::before {
  box-shadow: var(--mdw-elevation-1);
}

mdw-list.mdw-scrolled > .mdw-sub-header.mdw-stuck {
  z-index: 2;
} */



mdw-list > .mdw-divider {
  max-height: 16px;
  margin: 28px 20px;
  font-size: var(--mdw-font-body-size-small);
  font-weight: var(--mdw-font-body-weight-small);
  letter-spacing: var(--mdw-font-body-letter-spacing-small);
  line-height: 28px;
  color: var(--mdw-on-surface-variant-alpha-60);
  border-top: 1px solid var(--mdw-surface-variant);
}

mdw-list > .mdw-divider.mdw-inset {
  margin-left: 70px;
}


mdw-list-item > mdw-list-item-action-right {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: calc(var(--mdw-list-item-swipe-position) * -1);
  bottom: 0;
  right: 0;
  padding-left: 12px;
  z-index: -1;

  background-color: var(--mdw-primary);
  color: var(--mdw-on-primary);

  transition: left 220ms;
}

mdw-list-item.mdw-dragging > mdw-list-item-action-right {
  transition: none;
}

mdw-list-item > mdw-list-item-action-right::after {
  position: absolute;
  content: '';
  top: 0;
  left: var(--mdw-list-item-swipe-position);
  right: 0;
  bottom: 0;
  background-color: var(--mdw-surface);
  z-index: 1;

  transition: left 220ms;
  transition-timing-function: var(--mdw-transition-expand-out);
}

mdw-list-item.mdw-dragging > mdw-list-item-action-right::after {
  transition: none;
}


mdw-list-item > mdw-list-item-action-left {
  display: flex;
  align-items: center;
  justify-content: end;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: var(--mdw-list-item-swipe-position);
  padding-right: 12px;
  z-index: -1;

  background-color: var(--mdw-primary);
  color: var(--mdw-on-primary);

  transition: right 220ms;
  transition-timing-function: var(--mdw-transition-expand-out);
}

mdw-list-item.mdw-dragging > mdw-list-item-action-left {
  transition: none;
}

mdw-list-item > mdw-list-item-action-left::after {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  right: calc(var(--mdw-list-item-swipe-position) * -1);
  bottom: 0;
  background-color: var(--mdw-surface);
  z-index: 1;

  transition: right 220ms;
  transition-timing-function: var(--mdw-transition-expand-out);
}

mdw-list-item.mdw-dragging > mdw-list-item-action-left::after {
  transition: none;
}


mdw-list-item > mdw-list-item-action-right.mdw-error,
mdw-list-item > mdw-list-item-action-left.mdw-error {
  background-color: var(--mdw-error);
  color: var(--mdw-on-error);
}

mdw-list-item > mdw-list-item-action-right.mdw-secondary,
mdw-list-item > mdw-list-item-action-left.mdw-secondary {
  background-color: var(--mdw-secondary);
  color: var(--mdw-on-secondary);
}

mdw-list-item > mdw-list-item-action-right.mdw-tertiary,
mdw-list-item > mdw-list-item-action-left.mdw-tertiary {
  background-color: var(--mdw-tertiary);
  color: var(--mdw-on-tertiary);
}


mdw-list-item > mdw-list-item-action-right > mdw-icon,
mdw-list-item > mdw-list-item-action-left > mdw-icon,
mdw-list-item > mdw-list-item-action-right > .mdw-text,
mdw-list-item > mdw-list-item-action-left > .mdw-text {
  transform-origin: center;
  transform: scale(0.7);
  animation: action-bounce-out 400ms;
  animation-timing-function: var(--mdw-transition-bounce);
}

mdw-list-item.mdw-action-active > mdw-list-item-action-right > mdw-icon,
mdw-list-item.mdw-action-active > mdw-list-item-action-left > mdw-icon,
mdw-list-item.mdw-action-active > mdw-list-item-action-right > .mdw-text,
mdw-list-item.mdw-action-active > mdw-list-item-action-left > .mdw-text {
  transform: scale(1);
  animation: action-bounce-in 400ms;
}


@keyframes action-bounce-in {
  0% {
    transform: scale(.7);
  }

  50% {
    transform: scale(1.05);
  }

  70% {
    transform: scale(.9);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes action-bounce-out {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.65);
  }

  70% {
    transform: scale(.8);
  }

  100% {
    transform: scale(0.7);
  }
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Ra];var dm=Ra;p.registerGlobalStyleSheet(dm);customElements.define("mdw-list",class extends p{#t="";#i=this.classList.contains("mdw-select")||this.classList.contains("mdw-select-multiple");#e=this.classList.contains("mdw-select-multiple");#o=[...this.querySelectorAll(".mdw-sub-header")];#s=this.#c(this);#l=this.#n.bind(this);constructor(){super()}connectedCallback(){this.setAttribute("role","list"),this.hasAttribute("aria-label")||this.setAttribute("aria-label","list"),this.#o.length>0&&this.#s.addEventListener("scroll",this.#l)}disconnectedCallback(){this.#o.length>0&&this.#s.removeEventListener("scroll",this.#l)}static get observedAttributes(){return["value"]}attributeChangedCallback(t,e,o){this[t]=o}get value(){return this.#t}set value(t){t==null&&(t=""),t=`${t}`,this.#t=t;let e=t.split(",");w.nextAnimationFrameAsync().then(()=>{[...this.querySelectorAll("mdw-list-item")].forEach(o=>{o.setCheckedWithoutUpdate(e.includes(o.value))})})}get selectable(){return this.#i}updateSelection(t,e){if(this.#e){let o=this.value.split(",");if(e===!0)o.push(t);else{let s=o.indexOf(t);o.splice(s,1)}this.#t=o.filter(s=>!!s.trim()).join(",")}else e===!0?([...this.querySelectorAll("mdw-list-item.mdw-checked")].filter(s=>s.value!==t).forEach(s=>s.setCheckedWithoutUpdate(!1)),this.#t=t):this.#t=""}#c(t){if(t)return t.nodeName==="BODY"||t.scrollHeight>t.offsetHeight?t:this.#c(t.parentNode)}#n(){this.classList.toggle("mdw-scrolled",this.#s.scrollTop!==0);let t=this.#s.getBoundingClientRect().y;this.#o.forEach(e=>{t>=e.getBoundingClientRect().y-42?e.classList.add("mdw-stuck"):e.classList.remove("mdw-stuck")})}});var Pa=new CSSStyleSheet;Pa.replaceSync(`mdw-menu.mdw-panel {
  --mdw-menu-background-height: 100%;

  min-width: 112px;
  max-width: 280px;
  max-height: 320px;
  padding: 8px 0;
  overflow-y: auto;
  border-radius: var(--mdw-shape-extra-small);
  background-color: var(--mdw-surface);
  box-shadow: var(--mdw-elevation-1);
  box-sizing: border-box;
  /* transform-origin: top; */
}

mdw-menu::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: var(--mdw-menu-background-height);
  pointer-events: none;
  background-color: var(--mdw-elevation-tint-2);
  border-radius: inherit;
}

mdw-search mdw-chip-group > mdw-chip > mdw-menu.mdw-panel {
  z-index: 12;
}

/* button styles are in src/components/button/component.css */
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Pa];var lm=Pa;y.registerGlobalStyleSheet(lm);customElements.define("mdw-menu",class extends y{#t;#i=this.getAttribute("control");#e=this.#r.bind(this);#o=this.#w.bind(this);#s=this.#u.bind(this);#l=this.#p.bind(this);#c=this.#h.bind(this);#n=new AbortController;#a=w.debounce(this.#v,240);#d="";#m;constructor(){super()}connectedCallback(){if(super.connectedCallback(),this.setAttribute("role","menu"),this.#i?this.#t=document.querySelector(this.#i):this.#t=this.parentElement,!this.#t)throw Error('No control found. Must provide the attributer "control" with a valid css selector');this.target=this.#t,this.animation="expand",this.#t.addEventListener("click",this.#e,{signal:this.#n.signal}),this.addEventListener("open",this.#o,{signal:this.#n.signal}),this.addEventListener("close",this.#s,{signal:this.#n.signal})}disconnectedCallback(){super.disconnectedCallback(),this.#n.abort()}#r(){this.show()}#w(){this.addEventListener("click",this.#l,{signal:this.#n.signal}),this.addEventListener("keydown",this.#c,{signal:this.#n.signal}),this.style.setProperty("--mdw-menu-background-height",`${this.scrollHeight}px`),this.querySelector("mdw-button")?.focus()}#u(){this.removeEventListener("click",this.#l),this.removeEventListener("keydown",this.#c)}#p(t){t.target.nodeName==="MDW-BUTTON"&&(t.target.dispatchEvent(new CustomEvent("selected",{bubbles:!0})),setTimeout(()=>{this.close()},40))}#h(t){if(t.code==="ArrowDown")this.#g(),t.preventDefault();else if(t.code==="ArrowUp")this.#f(),t.preventDefault();else if(t.code==="Escape")this.close(),this.#t.focus();else if(![38,40,13].includes(t.keyCode))return this.#b(t.key)}#g(){let t=document.activeElement?.nextElementSibling;t&&(t.nodeName!=="MDW-BUTTON"&&(t=t.nextElementSibling),t?.nodeName==="MDW-BUTTON"&&t.focus())}#f(){let t=document.activeElement?.previousElementSibling;t&&(t.nodeName!=="MDW-BUTTON"&&(t=t.previousElementSibling),t?.nodeName==="MDW-BUTTON"&&t.focus())}#b(t){this.#d+=t.toLowerCase(),this.#m||(this.#m=[...this.querySelectorAll("mdw-button")].map(o=>({element:o,text:w.getTextFromNode(o).toLowerCase()})));let e=this.#m.find(({text:o})=>o.startsWith(this.#d));e&&e.element.focus(),this.#a()}#v(){this.#d="",this.#m=void 0}});var Ia=new CSSStyleSheet;Ia.replaceSync(`/* page-content css in src/core/page-content.css */

mdw-navigation {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  z-index: 11;
  box-sizing: border-box;
  background-color: var(--mdw-surface);
  padding: 18px 0;

  width: var(--mdw-navigation-drawer-width);

  transition: width 180ms, left 180ms;
  transition-timing-function: var(--mdw-transition-expand-in);
}

mdw-navigation.mdw-hide {
  width: 0;
  left: -56px;
  pointer-events: none;
  transition: width 180ms, left 180ms;
  transition-timing-function: var(--mdw-transition-expand-out);
}

mdw-navigation .mdw-headline {
  line-height: 56px;
  height: 56px;
  margin: 0 36px;
  font-size: var(--mdw-font-title-size-small);
  font-weight: var(--mdw-font-title-weight-small);
  letter-spacing: var(--mdw-font-title-letter-spacing-small);
  color: var(--mdw-on-surface-variant);
  opacity: 1;
  transition: opacity 180ms;
}
mdw-navigation.mdw-rail.mdw-state-rail .mdw-headline  {
  opacity: 0;
}



/* --- rail --- */

mdw-navigation.mdw-rail.mdw-state-rail {
  width: var(--mdw-navigation-rail-width);
  left: 0;
}

mdw-navigation .mdw-header {
  display: flex;
  justify-content: space-between;
  margin-left: 12px;
  margin-right: 12px;
  opacity: 1;
}

mdw-navigation .mdw-header > .mdw-headline {
  margin-left: 24px;
}

mdw-navigation.mdw-rail.mdw-state-rail .mdw-header > * {
  opacity: 0;
  pointer-events: none;
}

mdw-navigation.mdw-rail.mdw-state-rail .mdw-header > mdw-navigation-button {
  opacity: 1;
  pointer-events: all;
}


/* --- mobile --- */

body.mdw-mobile mdw-navigation:not(.mdw-no-tint)::before {
  content: '';
  position: fixed;
  left: 0;
  top: 0;
  width: var(--mdw-navigation-drawer-width);
  height: 100%;
  pointer-events: none;
  background-color: var(--mdw-elevation-tint-1);
  border-radius: inherit;
}

body.mdw-mobile mdw-navigation {
  border-radius: 0 var(--mdw-shape-large) 0 0;
  box-shadow: var(--mdw-elevation-2);
}

body.mdw-mobile mdw-navigation.mdw-hide {
  width: 0;
  left: -56px;
  box-shadow: none;
}

body.mdw-mobile mdw-navigation:not(.mdw-no-tint).mdw-hide::before {
  width: 0;
  left: -56px;
}


/* --- secondary draw for rail --- */
mdw-navigation.mdw-rail.mdw-state-rail + .mdw-navigation-secondary-draw {
  position: fixed;
  top: 0;
  bottom: 0;
  left: calc(-230px + var(--mdw-navigation-rail-width));
  width: 230px;
  background-color: var(--mdw-surface);
  border-radius: 0 var(--mdw-shape-large) var(--mdw-shape-large) 0;
  z-index: 9;
}

mdw-navigation.mdw-rail.mdw-state-rail.mdw-secondary-drawer-open + .mdw-navigation-secondary-draw {
  left: var(--mdw-navigation-rail-width);
}


mdw-navigation.mdw-no-animation,
mdw-navigation.mdw-no-animation .mdw-headline {
  transition: none !important;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Ia];var mm=Ia;p.registerGlobalStyleSheet(mm);customElements.define("mdw-navigation",class extends p{#t=!0;#i=this.classList.contains("mdw-rail");#e;#o=this.#c.bind(this);#s=this.#l.bind(this);constructor(){super(),this.classList.add("mdw-no-animation"),document.body.classList.add("mdw-navigation-no-animation"),v.isMobile&&this.classList.add("mdw-hide"),this.#t=!this.classList.contains("mdw-hide")&&!this.classList.contains("mdw-state-rail"),this.#n(),this.classList.contains("mdw-rail")&&[...this.querySelectorAll("mdw-anchor")].forEach(t=>{t.classList.add("mdw-rail"),v.isMobile||t.classList.toggle("mdw-state-rail",!this.#t)})}connectedCallback(){this.setAttribute("role","navigation"),w.nextAnimationFrameAsync().then(()=>{this.#c()}),window.addEventListener("locationchange",this.#o),w.nextAnimationFrameAsync().then(()=>{this.classList.remove("mdw-no-animation"),document.body.classList.remove("mdw-navigation-no-animation");let t=this.querySelector("mdw-anchor.mdw-active");if(t){let e=t.getBoundingClientRect();(e.bottom<this.scrollTop||e.top>this.offsetHeight-this.scrollTop)&&t.scrollIntoView()}})}get open(){return this.#t}set open(t){if(this.#t=!!t,!this.#i||v.isMobile?(this.classList.toggle("mdw-hide",!this.#t),[...this.querySelectorAll("mdw-anchor")].forEach(e=>e.classList.remove("mdw-state-rail"))):(this.classList.toggle("mdw-state-rail",!this.#t),[...this.querySelectorAll("mdw-anchor")].forEach(e=>e.classList.toggle("mdw-state-rail",!this.#t))),v.isMobile&&(this.#t?(this.#e||(this.#e=document.createElement("mdw-scrim")),this.insertAdjacentElement("beforebegin",this.#e),this.#e.addEventListener("click",this.#s)):this.#e&&(this.#e.removeEventListener("click",this.#s),this.#e.remove())),!this.open&&!this.classList.contains("mdw-state-rail")){let e=this.querySelector("mdw-anchor.mdw-active");e&&e.scrollIntoView({block:"center"})}this.#n(),this.dispatchEvent(new Event("change"))}toggle(){this.open=!this.open}#l(){this.open=!1}#c(){let t=location.href,e=location.href.replace(location.origin,"").replace(/^\//g,""),o=location.pathname,[s,r]=location.href.split("?"),a=[...this.querySelectorAll(`mdw-anchor[href="${t}"]`)];a.length===0&&(a=[...this.querySelectorAll(`mdw-anchor[href="${e}"]`)]),a.length===0&&(a=[...this.querySelectorAll(`mdw-anchor[href="${s}"]`)]),a.length===0&&(a=[...this.querySelectorAll(`mdw-anchor[href="${o}"]`)]),a.length===0&&(a=[...this.querySelectorAll(`mdw-anchor[href="${o}?${r}"]`)]),[...this.querySelectorAll("mdw-anchor[href]")].forEach(h=>{a.includes(h)?h.active=!0:h.active=!1}),v.isMobile&&(this.open=!1)}#n(){document.body.classList.remove("mdw-navigation-state-hide"),document.body.classList.remove("mdw-navigation-state-rail"),document.body.classList.remove("mdw-navigation-state-modal"),document.body.classList.remove("mdw-navigation-state-open"),this.classList.contains("mdw-hide")?document.body.classList.add("mdw-navigation-state-hide"):this.classList.contains("mdw-state-rail")?document.body.classList.add("mdw-navigation-state-rail"):v.isMobile?document.body.classList.add("mdw-navigation-state-modal"):document.body.classList.add("mdw-navigation-state-open")}});var Fa=new CSSStyleSheet;Fa.replaceSync(`:host {
  position: relative;
  display: inline-flex;
  align-items: center;
  user-select: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  height: 56px;
  line-height: 56px;
  margin: 1px 12px;
  padding: 0 24px;
  margin-bottom: 2px;

  font-size: var(--mdw-font-label-size-large);
  font-weight: var(--mdw-font-label-weight-large);
  letter-spacing: var(--mdw-font-label-letter-spacing-large);
  border-radius: var(--mdw-shape-extra-large);
}

:host > * {
  pointer-events: none;
}

:host ::slotted(mdw-icon) {
  vertical-align: middle;
  margin-top: -2px;
  margin-right: 12px;
  margin-left: -6px;
}



/* state layer */

:host .background {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
  height: 56px;
  border-radius: var(--mdw-shape-extra-large);
}

:host(.mdw-has-rail) .background {
  transition: height 180ms;
}

:host(.mdw-active) .background {
  background-color: var(--mdw-secondary-container);
}

:host(:focus) .background {
  opacity: var(--mdw-state-layer-opacity-focus);
  background-color: var(--mdw-on-surface);
}

:host([group].mdw-active) .background {
  opacity: var(--mdw-state-layer-opacity-hover);
  background-color: var(--mdw-on-surface);
}

/* hover state layers. Media needed to prevent hover on mobile */
@media (hover: hover) {
  :host(:hover) .background {
    opacity: var(--mdw-state-layer-opacity-hover);
    background-color: var(--mdw-on-surface);
  }
}


/* --- Ripple --- */

.ripple {
  overflow: hidden;
  border-radius: inherit;
  transform: translateZ(0);
  /* fixes bug on ios safari */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
}

.ripple > .mdw-ripple-element {
  background-color: var(--mdw-on-surface-alpha-16);
  border-radius: 50%;
}



/* --- rail --- */

/* look in rail global for more styles */


:host(.mdw-has-rail.mdw-has-rail) .main {
  display: block;
  animation: mdw-anchor-main-show 180ms;
}

:host(.mdw-rail.mdw-state-rail.mdw-has-rail) .main {
  opacity: 0;
  animation: mdw-anchor-main-hide 180ms;
}

:host(.mdw-has-rail:not(.mdw-has-icon)) .main {
  display: block;
  animation: mdw-anchor-main-show-no-icon 180ms;
}

:host(.mdw-rail.mdw-state-rail.mdw-has-rail:not(.mdw-has-icon)) .main {
  opacity: 0;
  animation: mdw-anchor-main-hide-no-icon 180ms;
}

/* hide text show icon using colors when no rail content and has icon */
:host(.mdw-rail.mdw-state-rail:not(.mdw-has-rail).mdw-has-icon) .main {
  color: transparent;
}
:host(.mdw-rail.mdw-state-rail:not(.mdw-has-rail)) .main::slotted(mdw-icon) {
  color: var(--mdw-on-surface);
}


:host(.mdw-rail.mdw-state-rail:not(.mdw-has-rail)) .main {
  font-size: var(--mdw-font-label-size-medium);
  font-weight: var(--mdw-font-label-weight-medium);
  letter-spacing: var(--mdw-font-label-letter-spacing-medium);
  border-radius: var(--mdw-shape-extra-medium);
}

:host(.mdw-rail.mdw-state-rail:not(.mdw-has-rail):not(.mdw-has-icon)) {
  align-self: center;
}

:host(.mdw-rail.mdw-state-rail:not(.mdw-has-rail).mdw-has-icon) .main {
  margin: 0;
  margin-left: -2px;
  align-self: center;
}

:host(.mdw-rail.mdw-state-rail.mdw-has-rail-text.mdw-has-rail-icon) .background {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
}

:host(.mdw-rail.mdw-state-rail.mdw-has-rail-icon.mdw-has-rail-text) .background {
  height: 32px;
  border-radius: var(--mdw-shape-extra-large);
}
:host(.mdw-rail.mdw-state-rail.mdw-has-rail-icon.mdw-has-rail-text) .ripple {
  height: 32px;
  bottom: unset;
  border-radius: var(--mdw-shape-extra-large);
}

:host(.mdw-rail.mdw-state-rail:not(.mdw-has-rail):not(.mdw-has-rail-icon)) .background {
  height: 56px;
  width: 56px;
}
:host(.mdw-rail.mdw-state-rail:not(.mdw-has-rail):not(.mdw-has-rail-icon)) .ripple {
  right: unset;
  bottom: unset;
  height: 56px;
  width: 56px;
  border-radius: 50%;
}

:host(.mdw-rail.mdw-state-rail:not(.mdw-has-rail):not(.mdw-has-rail-icon):not(.mdw-has-icon)) .background {
  margin: 0 auto;
}
:host(.mdw-rail.mdw-state-rail:not(.mdw-has-rail):not(.mdw-has-rail-icon):not(.mdw-has-icon)) .ripple {
  /* left: 12px; */
  left: 50%;
  margin-left: -25%;
}


@keyframes mdw-anchor-main-show {
  0% {
    opacity: 0;
  }

  30% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
}

@keyframes mdw-anchor-main-hide {
  0% {
    opacity: 1;
  }

  70% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@keyframes mdw-anchor-main-show-no-icon {
  0% {
    opacity: 0;
  }

  60% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
}

@keyframes mdw-anchor-main-hide-no-icon {
  0% {
    opacity: 1;
  }

  20% {
    opacity: 0;
  }
}



:host([group]) .main::slotted(.mdw-group-arrow) {
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  bottom: 0;
  right: 16px;
  transition: transform 120ms;
}

:host([group].mdw-open) .main::slotted(.mdw-group-arrow) {
  transform: rotate(180deg);
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Fa];var cm=Fa;var Oa=new CSSStyleSheet;Oa.replaceSync(`mdw-anchor [slot="rail"] {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 56px;
  line-height: 20px;
  left: 0;
  right: 0;

  font-size: var(--mdw-font-label-size-medium);
  font-weight: var(--mdw-font-label-weight-medium);
  letter-spacing: var(--mdw-font-label-letter-spacing-medium);
  border-radius: var(--mdw-shape-extra-medium);
}

mdw-anchor [slot="rail"].mdw-small-font {
  font-size: var(--mdw-font-label-size-small);
  font-weight: var(--mdw-font-label-weight-small);
  letter-spacing: var(--mdw-font-label-letter-spacing-small);
}


mdw-anchor.mdw-has-rail [slot="rail"] {
  animation: mdw-anchor-rail-hide 180ms;
}

mdw-anchor.mdw-has-rail:not(.mdw-has-icon) [slot="rail"] {
  animation: mdw-anchor-rail-hide-no-icon 180ms;
}

mdw-navigation:not(.mdw-rail.mdw-state-rail) mdw-anchor.mdw-has-rail [slot="rail"] {
  display: none;
  animation: mdw-anchor-rail-show 180ms;
}

/* outline when not active */
mdw-anchor:not(.mdw-active) mdw-icon {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48;
}

mdw-anchor [slot="rail"] mdw-icon {
  position: relative;
  display: flex;
  justify-content: center;
  height: 32px;
  line-height: 32px;
  font-size: var(--mdw-font-icon-size-small);
}


mdw-anchor.mdw-has-rail > mdw-icon {
  transition: margin-top 180ms;
}

mdw-navigation.mdw-rail.mdw-state-rail mdw-anchor.mdw-has-rail:not(.mdw-rail-has-text) > mdw-icon {
  margin-top: -24px !important;
}

mdw-navigation.mdw-rail.mdw-state-rail mdw-anchor.mdw-has-rail.mdw-has-rail-icon:not(.mdw-has-rail-text) [slot="rail"] > mdw-icon {
  margin: auto 0;
}


@keyframes mdw-anchor-rail-show {
  0% {
    display: inherit;
    opacity: 1;
  }

  50% {
    display: none;
    opacity: 0;
  }
  100% {
    display: none;
    opacity: 0;
  }
}

@keyframes mdw-anchor-rail-hide {
  0% {
    display: none;
    opacity: 0;
  }

  70% {
    display: none;
    opacity: 0;
  }

  100% {
    display: inherit;
    opacity: 1;
  }
}

@keyframes mdw-anchor-rail-hide-no-icon {
  0% {
    display: none;
    opacity: 0;
  }

  30% {
    display: none;
    opacity: 0;
  }

  100% {
    display: inherit;
    opacity: 1;
  }
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Oa];var hm=Oa;p.registerGlobalStyleSheet(hm);var Na,ee,Pe,Wi,Bi,ie,Ie,Fe,Gi,Zi,dn,wm,ln,pm,mn,um,cn,gm,hn,fm,wn,bm,pn,vm,un,ym,gn,xm;customElements.define("mdw-anchor",(Na=class extends p{constructor(){super();n(this,dn);n(this,ln);n(this,mn);n(this,cn);n(this,hn);n(this,wn);n(this,pn);n(this,un);n(this,gn);g(this,"useShadowRoot",!0);g(this,"useTemplate",!1);n(this,ee,void 0);n(this,Pe,!1);n(this,Wi,this.getAttribute("target"));n(this,Bi,l(this,ln,pm).bind(this));n(this,ie,l(this,hn,fm).bind(this));n(this,Ie,l(this,wn,bm).bind(this));n(this,Fe,l(this,pn,vm).bind(this));n(this,Gi,l(this,mn,um).bind(this));n(this,Zi,l(this,cn,gm).bind(this));if(this.tabIndex=0,l(this,dn,wm).call(this),!this.hasAttribute("aria-label")){let e=w.getTextFromNode(this);this.setAttribute("aria-label",e)}this.hasAttribute("group")&&this.insertAdjacentHTML("beforeend",`<div class="mdw-group-arrow">${Ts}</div>`)}connectedCallback(){this.setAttribute("role","link"),this.addEventListener("focusin",i(this,ie))}afterRender(){m(this,ee,new P({element:this.shadowRoot.querySelector(".ripple"),triggerElement:this})),this.addEventListener("click",i(this,Bi)),this.addEventListener("mousedown",i(this,Gi))}disconnectedCallback(){i(this,ee)&&i(this,ee).destroy(),this.removeEventListener("click",i(this,Bi)),this.removeEventListener("focusin",i(this,ie)),this.removeEventListener("blur",i(this,Ie)),this.removeEventListener("keydown",i(this,Fe)),this.removeEventListener("mousedown",i(this,Gi))}template(){return`
      <div class="background"></div>
      <slot class="main"></slot>
      <slot class="rail" name="rail"></slot>
      <div class="ripple"></div>
    `}get href(){return`${location.origin}${this.getAttribute("href")}`}get active(){return i(this,Pe)}set active(e){m(this,Pe,!!e),this.classList.toggle("mdw-active",i(this,Pe)),this.parentElement.nodeName==="MDW-NAVIGATION-GROUP"&&w.nextAnimationFrameAsync().then(()=>{this.parentElement.updateActive()})}walk(e){let o=[...e.children];for(;o.length>0;){let s=o.shift();if(s.tabIndex>-1||parseInt(s.getAttribute("tabindex")||-1)>-1)return s;let r=this.walk(s);if(r)return r}}},ee=new WeakMap,Pe=new WeakMap,Wi=new WeakMap,Bi=new WeakMap,ie=new WeakMap,Ie=new WeakMap,Fe=new WeakMap,Gi=new WeakMap,Zi=new WeakMap,dn=new WeakSet,wm=function(){let e=this.querySelector(":scope > mdw-icon"),o=this.querySelector("[slot=rail]"),s=o!==null,r=s?this.querySelector("[slot=rail] mdw-icon"):!1,a=s&&w.getTextFromNode(o)!=="";e&&this.classList.add("mdw-has-icon"),s&&this.classList.add("mdw-has-rail"),r&&this.classList.add("mdw-has-rail-icon"),a&&this.classList.add("mdw-has-rail-text")},ln=new WeakSet,pm=function(){["_blank","_self","_parent","_top"].includes(i(this,Wi))?window.open(this.href,i(this,Wi)).focus():window.webformulaCoreLinkIntercepts||(location.href=this.href)},mn=new WeakSet,um=function(){this.removeEventListener("focusin",i(this,ie)),this.addEventListener("mouseup",i(this,Zi))},cn=new WeakSet,gm=function(){this.addEventListener("focusin",i(this,ie)),this.removeEventListener("mouseup",i(this,Zi))},hn=new WeakSet,fm=function(e){if(e.relatedTarget?.nodeName!=="MDW-ANCHOR"){let o=document.body.querySelector("mdw-navigation mdw-anchor.mdw-active:not([group])");if(o&&this!==o)return o.focus()}this.addEventListener("blur",i(this,Ie)),this.addEventListener("keydown",i(this,Fe))},wn=new WeakSet,bm=function(){this.removeEventListener("blur",i(this,Ie)),this.removeEventListener("keydown",i(this,Fe))},pn=new WeakSet,vm=function(e){if(e.code==="Tab"){let o=[...document.body.querySelectorAll("page-content *")].find(s=>s.tabindex>-1||parseInt(s.getAttribute("tabindex")||-1)>-1);o&&o.focus(),e.preventDefault()}e.code==="Enter"||e.code==="Space"?(this.click(),i(this,ee).trigger(),this.blur(),e.preventDefault()):e.code==="ArrowDown"?(l(this,un,ym).call(this,e.target),e.preventDefault()):e.code==="ArrowUp"&&(l(this,gn,xm).call(this,e.target),e.preventDefault())},un=new WeakSet,ym=function(e){if(!e||e.nodeName!=="MDW-ANCHOR")return;let o=e.nextElementSibling;for(!o&&e.parentElement.nodeName==="MDW-NAVIGATION-GROUP"&&(o=e.parentElement.nextElementSibling);o&&!(o.nodeName==="MDW-ANCHOR"||o.nodeName==="MDW-NAVIGATION-GROUP");)o=o.nextElementSibling;o&&(o.nodeName==="MDW-NAVIGATION-GROUP"&&(o.open=!0,o=o.querySelector("mdw-anchor:not([group])")),o&&o.focus())},gn=new WeakSet,xm=function(e){if(!e||e.nodeName!=="MDW-ANCHOR")return;let o=e.previousElementSibling;for(!o&&e.parentElement.nodeName==="MDW-NAVIGATION-GROUP"&&(o=e.parentElement.previousElementSibling);o&&!(o.nodeName==="MDW-ANCHOR"||o.nodeName==="MDW-NAVIGATION-GROUP");)o=o.previousElementSibling;o&&(o.nodeName==="MDW-NAVIGATION-GROUP"&&(o.open=!0,o=o.querySelector("mdw-anchor:not([group]):last-of-type")),o&&o.focus())},g(Na,"styleSheets",cm),Na));var Ha=new CSSStyleSheet;Ha.replaceSync("");document.adoptedStyleSheets=[...document.adoptedStyleSheets,Ha];var km=Ha;p.registerGlobalStyleSheet(km);customElements.define("mdw-navigation-button",class extends p{#t=this.#e.bind(this);#i=this.#o.bind(this);constructor(){super()}connectedCallback(){this.tabIndex=0}get navigation(){return document.body.querySelector("mdw-navigation")}get open(){return document.body.querySelector("mdw-navigation").open}set open(t){document.body.querySelector("mdw-navigation").open=!!t}toggle(){document.body.querySelector("mdw-navigation").toggle()}afterRender(){this.#o(),this.navigation?.addEventListener("change",this.#i),this.addEventListener("click",this.#t)}disconnectedCallback(){this.removeEventListener("click",this.#t),this.navigation?.removeEventListener("change",this.#i)}#e(){this.toggle()}#o(){let t=this.querySelector("mdw-button");t&&(t.toggled=!this.navigation?.open)}template(){return`
      <mdw-button class="mdw-icon-toggle-button" aria-label="toggle navigation" ${this.navigation?.open?"":"toggled"}>
        <div class="mdw-icon-svg" value="on">${xl}</div>
        <div class="mdw-icon-svg" value="off">${kl}</div>
      </mdw-button>
    `}});var Va=new CSSStyleSheet;Va.replaceSync(`mdw-navigation-group {
  --mdw-navigation-group-height: 56px;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow-y: hidden;
  height: var(--mdw-navigation-group-height);
  width: 100%;
  transition: height 320ms;
  transition-timing-function: var(--mdw-transition-expand-in);
}

mdw-navigation:not(.mdw-state-rail) mdw-navigation-group > mdw-anchor {
  margin-left: 24px;
}

mdw-navigation:not(.mdw-state-rail) mdw-navigation-group > mdw-anchor[group] {
  margin-left: 12px;
}

/* mdw-navigation.mdw-rail.mdw-state-rail > mdw-navigation-group {
  margin-left: -28px;
  margin-right: -28px;
  padding-left: 0;
  padding-right: 0;
}


mdw-navigation:not(.mdw-state-rail) mdw-navigation-group > mdw-anchor {
  padding-left: 32px;
}

mdw-navigation:not(.mdw-state-rail) mdw-navigation-group > mdw-anchor[group] {
  padding-left: 16px;
}

mdw-navigation.mdw-rail.mdw-state-rail > mdw-navigation-group mdw-anchor[group] {
  margin: 0 12px;
} */
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Va];var Sm=Va;p.registerGlobalStyleSheet(Sm);customElements.define("mdw-navigation-group",class extends p{#t=this.querySelector("mdw-anchor[group]");#i=!1;#e=this.#s.bind(this);constructor(){if(super(),!this.#t)throw Error("requires a control anchor: mdw-anchor[group] (no href)")}connectedCallback(){this.#t.addEventListener("click",this.#e)}disconnectedCallback(){this.#t.removeEventListener("click",this.#e)}get open(){return this.#i}set open(t){this.#i=!!t,this.#i?(this.#t.classList.add("mdw-open"),this.parentElement.classList.contains("mdw-state-rail")?this.#l():this.style.setProperty("--mdw-navigation-group-height",`${this.#o}px`)):(this.style.setProperty("--mdw-navigation-group-height","56px"),this.#t.classList.remove("mdw-open"))}get#o(){return this.offsetHeight,this.scrollHeight}updateActive(){this.querySelector("mdw-anchor.mdw-active")?(this.#t.classList.add("mdw-active"),this.open=!0):this.#t.classList.remove("mdw-active")}#s(){this.open=!this.open}#l(){console.log([...this.children].filter(t=>!t.hasAttribute("group")))}});var Eh=class{#t=null;#i;#e=null;#o="translateY";#s=!1;#l=!0;#c=[];#n=!1;constructor(t={template:"",target:null,scrim:!1,clickOutsideClose:!0,clickOutsideCloseIgnoreElements:[],animation:"translateY"}){t.template&&(this.#i=t.template),t.target&&(this.#e=t.target),t.scrim===!0&&(this.#s=!0),t.clickOutsideClose===!1&&(this.#l=!1),Array.isArray(t.clickOutsideCloseIgnoreElements.length)&&(this.#c=t.clickOutsideCloseIgnoreElements),t.animation&&(this.#o=t.animation),this.#t=document.createElement("mdw-panel")}get element(){return this.#t}get open(){return this.#t&&this.#t.open}get template(){return this.#i}set template(t){this.#i=t,this.#n&&this.#d()}get target(){return this.#e}set target(t){t&&t.nodeName?this.#e=t:this.#e=document.querySelector(t),this.#n&&(this.#t.target=this.#e)}get animation(){return this.#o}set animation(t){this.#o=t,this.#n&&(this.#t.animation=t)}get scrim(){return this.#s}set scrim(t){this.#s=t,this.#n&&(this.#t.scrim=t)}get clickOutsideClose(){return this.#l}set clickOutsideClose(t){this.#l=t,this.#n&&(this.#t.clickOutsideClose=t)}addClickOutsideCloseIgnore(t){this.#c.push(t),this.#n&&this.#t.addClickOutsideCloseIgnore(t)}show(){if(!this.#i)throw Error("template required");this.#n||this.#a(),this.#t.show()}close(){this.#t.close()}remove(){this.#t.remove()}#a(){this.#t.target=this.#e,this.#t.animation=this.#o,this.#t.scrim=this.#s,this.#t.clickOutsideClose=this.#l,this.#t.innerHTML=this.#i,this.#c.forEach(t=>this.#t.addClickOutsideCloseIgnore(t)),document.body.insertAdjacentElement("beforeend",this.#t),this.#n=!0}#d(){this.#t.innerHTML=this.#i}};window.MDWPanel=Eh;var Ya=new CSSStyleSheet;Ya.replaceSync(`
:host {
  display: block;
  position: relative;
  margin: 4px;
  width: 40px;
  height: 40px;
}

:host > svg {
  position: absolute;
  transform: rotate(-90deg);
  top: 0;
  left: 0;
  transform-origin: center;
  overflow: visible;
}

:host > svg > circle {
  fill: transparent;
  transform-origin: center;
  transition: stroke-dashoffset 225ms linear;
  stroke: var(--mdw-primary);
}

:host(.mdw-on-filled) > svg > circle {
  stroke: var(--mdw-on-primary);
}

:host(.mdw-on-filled-tonal) > svg > circle {
  stroke: var(--mdw-on-secondary-container);
}

:host(.mdw-indeterminate) > svg {
  animation: mdw-progress-circular-rotate 2000ms linear infinite;
}

:host(.mdw-indeterminate) > svg > circle {
  transition-property: stroke;
  animation-duration: 4000ms;
  animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
  animation-iteration-count: infinite;
}


@keyframes mdw-progress-circular-rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Ya];var Lm=Ya;var ja,G,B,Z,Oe,Ne,fn,Xi,Wa,oe,Ui;customElements.define("mdw-progress-circular",(ja=class extends p{constructor(){super();n(this,Ne);n(this,Xi);n(this,oe);g(this,"useShadowRoot",!0);g(this,"useTemplate",!1);n(this,G,40);n(this,B,1);n(this,Z,1);n(this,Oe,4)}connectedCallback(){this.setAttribute("role","progressbar"),this.hasAttribute("aria-label")||this.setAttribute("aria-label","progressbar")}static get observedAttributes(){return["max","value","diameter","thickness"]}attributeChangedCallback(e,o,s){this[e]=s}get max(){return i(this,B)}set max(e){if(isNaN(e))throw Error("Failed to set the 'max' property on 'mdw-progress-circular': Must provide a number");m(this,B,parseFloat(e)),i(this,B)<1&&m(this,B,1),i(this,Z)>i(this,B)&&m(this,Z,i(this,B)),this.rendered&&(this.shadowRoot.querySelector("circle").style.strokeDashoffset=`${i(this,Ne,fn)}px`)}get value(){return i(this,Z)}set value(e){if(isNaN(e))throw Error("Failed to set the 'value' property on 'mdw-progress-circular': Must provide a number");m(this,Z,parseFloat(e)),i(this,Z)<0&&m(this,Z,0),i(this,Z)>i(this,B)&&m(this,Z,i(this,B)),this.rendered&&(this.shadowRoot.querySelector("circle").style.strokeDashoffset=`${i(this,Ne,fn)}px`)}get diameter(){return i(this,G)}set diameter(e){if(isNaN(e))throw Error("Failed to set the 'diameter' property on 'mdw-progress-circular': Must provide a number");m(this,G,parseFloat(e))}get thickness(){return i(this,Oe)}set thickness(e){if(isNaN(e))throw Error("Failed to set the 'thickness' property on 'mdw-progress-circular': Must provide a number");m(this,Oe,parseFloat(e))}template(){let e=.95*i(this,oe,Ui),o=.2*i(this,oe,Ui);return`
      <style>
        @keyframes mdw-progress-circular-rotate-${i(this,G)} {
          0%      { stroke-dashoffset: ${e};  transform: rotate(0); }
          12.5%   { stroke-dashoffset: ${o};    transform: rotate(0); }
          12.5001%  { stroke-dashoffset: ${o};    transform: rotateX(180deg) rotate(72.5deg); }
          25%     { stroke-dashoffset: ${e};  transform: rotateX(180deg) rotate(72.5deg); }
          25.0001%   { stroke-dashoffset: ${e};  transform: rotate(270deg); }
          37.5%   { stroke-dashoffset: ${o};    transform: rotate(270deg); }
          37.5001%  { stroke-dashoffset: ${o};    transform: rotateX(180deg) rotate(161.5deg); }
          50%     { stroke-dashoffset: ${e};  transform: rotateX(180deg) rotate(161.5deg); }
          50.0001%  { stroke-dashoffset: ${e};  transform: rotate(180deg); }
          62.5%   { stroke-dashoffset: ${o};    transform: rotate(180deg); }
          62.5001%  { stroke-dashoffset: ${o};    transform: rotateX(180deg) rotate(251.5deg); }
          75%     { stroke-dashoffset: ${e};  transform: rotateX(180deg) rotate(251.5deg); }
          75.0001%  { stroke-dashoffset: ${e};  transform: rotate(90deg); }
          87.5%   { stroke-dashoffset: ${o};    transform: rotate(90deg); }
          87.5001%  { stroke-dashoffset: ${o};    transform: rotateX(180deg) rotate(341.5deg); }
          100%    { stroke-dashoffset: ${e};  transform: rotateX(180deg) rotate(341.5deg); }
        }

        :host {
          width: ${i(this,G)}px;
          height: ${i(this,G)}px;
        }
      </style>
      <svg style="width: ${i(this,G)}px; height: ${i(this,G)}px;">
        <circle
          cx="50%"
          cy="50%"
          r="${i(this,Xi,Wa)}"
          style="
            animation-name: mdw-progress-circular-rotate-${i(this,G)};
            stroke-dasharray: ${i(this,oe,Ui)}px;
            stroke-width: ${i(this,Oe)}px;
            stroke-dashoffset: ${i(this,Ne,fn)}px;
          "
          ></circle>
      </svg>
    `}},G=new WeakMap,B=new WeakMap,Z=new WeakMap,Oe=new WeakMap,Ne=new WeakSet,fn=function(){return i(this,oe,Ui)*(i(this,B)-i(this,Z))/i(this,B)},Xi=new WeakSet,Wa=function(){return(i(this,G)-10)/2},oe=new WeakSet,Ui=function(){return 2*Math.PI*i(this,Xi,Wa)},g(ja,"styleSheets",Lm),ja));var Ba=new CSSStyleSheet;Ba.replaceSync(`:host {
  display: block;
  position: relative;
  width: 100%;
  height: 4px;
  padding-top: 0;
  margin-bottom: 0;

  background-color: var(--mdw-surface-variant);
}

:host .indicator {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  height: 4px;
  background-color: var(--mdw-primary);
}


:host(.mdw-indeterminate) .indicator {
  width: 100%;
  transition: all 0.2s linear;
  animation: mdw-progress-linear-indeterminate .8s infinite cubic-bezier(0.390, 0.575, 0.565, 1.000);
}


@keyframes mdw-progress-linear-indeterminate {
  0% {
    opacity: 1;
    transform: translateX(35%) scale(.3, 1);
  }

  100% {
    opacity: 0;
    transform: translateX(-50%) scale(0, 1);
  }
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Ba];var Am=Ba;var Ga,V,Y;customElements.define("mdw-progress-linear",(Ga=class extends p{constructor(){super();g(this,"useShadowRoot",!0);g(this,"useTemplate",!1);n(this,V,1);n(this,Y,1)}connectedCallback(){this.setAttribute("role","progressbar"),this.hasAttribute("aria-label")||this.setAttribute("aria-label","progressbar")}static get observedAttributes(){return["max","value"]}attributeChangedCallback(e,o,s){this[e]=s}get max(){return i(this,V)}set max(e){if(isNaN(e))throw Error("Failed to set the 'max' property on 'mdw-progress-linear': Must provide a number");m(this,V,parseFloat(e)),i(this,V)<1&&m(this,V,1),i(this,Y)>i(this,V)&&m(this,Y,i(this,V)),this.rendered&&(this.shadowRoot.querySelector(".indicator").style.width=`${i(this,Y)/i(this,V)*100}%`)}get value(){return i(this,Y)}set value(e){if(isNaN(e))throw Error("Failed to set the 'value' property on 'mdw-progress-linear': Must provide a number");m(this,Y,parseFloat(e)),i(this,Y)<0&&m(this,Y,0),i(this,Y)>i(this,V)&&m(this,Y,i(this,V)),this.rendered&&(this.shadowRoot.querySelector(".indicator").style.width=`${i(this,Y)/i(this,V)*100}%`)}template(){return`
      <div class="indicator" style="width: ${i(this,Y)/i(this,V)*100}%;"></div>
    `}},V=new WeakMap,Y=new WeakMap,g(Ga,"styleSheets",Am),Ga));var Za=new CSSStyleSheet;Za.replaceSync(`mdw-radio-group {
  display: block;
  margin-bottom: 12px;
}

mdw-radio-group mdw-radio + mdw-radio {
  margin-top: 18px;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Za];var Cm=Za;p.registerGlobalStyleSheet(Cm);customElements.define("mdw-radio-group",class extends p{#t=this.#i.bind(this);constructor(){super()}connectedCallback(){this.setAttribute("role","radiogroup"),this.addEventListener("click",this.#t)}get value(){let t=this.querySelector("mdw-radio.mdw-checked");return t?t.value:void 0}set value(t){let e=this.querySelector(`mdw-radio[value="${t}"]`);e&&(e.checked=!0)}#i(t){if(t.target===this)return;let e=this.querySelector("mdw-radio.mdw-checked");e&&e===t.target||(e&&(e.checked=!1),t.target.checked=!0,t.target.dispatchEvent(new Event("change")),this.dispatchEvent(new Event("change")))}});var Ua=new CSSStyleSheet;Ua.replaceSync(`:host {
  position: relative;
  display: flex;
  align-items: center;
  outline: none;
}

:host > .background {
  display: inline-block;
  cursor: pointer;
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 2px solid var(--mdw-primary);
  margin: 0 16px;
}

:host > .background::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--mdw-primary);
  opacity: 0;
  transition: opacity 100ms;
}

:host(.mdw-checked) > .background::after {
  opacity: 1;
  transition: opacity 100ms;
}

:host > .background::before {
  content: '';
  position: absolute;
  top: -12px;
  left: -12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--mdw-primary);
  opacity: 0;
  transition: opacity 100ms;
}

:host(:hover) > .background::before {
  opacity: var(--mdw-state-layer-opacity-hover);
  transition: opacity 180ms;
}

:host(:focus) > .background::before {
  opacity: var(--mdw-state-layer-opacity-pressed);
  transition: opacity 180ms;
}

:host(:active) > .background::before {
  opacity: var(--mdw-state-layer-opacity-focus);
  transition: opacity 180ms;
}

:host > slot {
  display: block;
  cursor: pointer;
  font-size: var(--mdw-font-label-size-large);
  font-weight: var(--mdw-font-label-weight-large);
  letter-spacing: var(--mdw-font-label-letter-spacing-large);
  line-height: 20px;
  height: 20px;
}

:host(.mdw-label-left) > .background {
  order: 1;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Ua];var Mm=Ua;var Xa,Ki,se,He,Qi,Ve,Ye,bn,Dm,vn,Tm,yn,zm;customElements.define("mdw-radio",(Xa=class extends p{constructor(){super();n(this,bn);n(this,vn);n(this,yn);g(this,"useShadowRoot",!0);n(this,Ki,"on");n(this,se,!1);n(this,He,!1);n(this,Qi,l(this,bn,Dm).bind(this));n(this,Ve,l(this,vn,Tm).bind(this));n(this,Ye,l(this,yn,zm).bind(this));this.parentElement.classList.contains("mdw-label-left")&&this.classList.add("mdw-label-left")}template(){return`
      <div class="background">
        <div class="ripple"></div>
      </div>

      <slot></slot>
    `}static get observedAttributes(){return["checked","value","disabled"]}attributeChangedCallback(e,o,s){e==="checked"?this.checked=s!==null:e==="disabled"?this.disabled=s!==null:this[e]=s}connectedCallback(){this.tabIndex=0,this.setAttribute("role","radio"),this.hasAttribute("aria-label")||this.setAttribute("aria-label",w.getTextFromNode(this)),this.addEventListener("focus",i(this,Qi))}disconnectedCallback(){this.removeEventListener("focus",i(this,Qi)),this.removeEventListener("blur",i(this,Ve)),this.removeEventListener("keydown",i(this,Ye))}get value(){return i(this,Ki)}set value(e){m(this,Ki,e)}get checked(){return i(this,se)}set checked(e){m(this,se,!!e),this.classList.toggle("mdw-checked",i(this,se)),this.setAttribute("aria-checked",i(this,se).toString()||"false")}get disabled(){return i(this,He)}set disabled(e){m(this,He,!!e),this.toggleAttribute("disabled",i(this,He))}},Ki=new WeakMap,se=new WeakMap,He=new WeakMap,Qi=new WeakMap,Ve=new WeakMap,Ye=new WeakMap,bn=new WeakSet,Dm=function(){this.addEventListener("blur",i(this,Ve)),this.addEventListener("keydown",i(this,Ye))},vn=new WeakSet,Tm=function(){this.removeEventListener("blur",i(this,Ve)),this.removeEventListener("keydown",i(this,Ye))},yn=new WeakSet,zm=function(e){e.shiftKey&&e.code==="Tab"&&this.previousElementSibling?.nodeName==="MDW-RADIO"&&this.previousElementSibling.focus(),e.code==="Space"&&(this.click(),e.preventDefault()),e.code==="ArrowUp"&&this.previousElementSibling?.nodeName==="MDW-RADIO"&&(this.previousElementSibling.focus(),this.previousElementSibling.click(),e.preventDefault()),e.code==="ArrowDown"&&this.nextElementSibling?.nodeName==="MDW-RADIO"&&(this.nextElementSibling.focus(),this.nextElementSibling.click(),e.preventDefault())},g(Xa,"styleSheets",Mm),Xa));var Ka=new CSSStyleSheet;Ka.replaceSync(`:host {
  --mdw-search-fullscreen-top: 0;
  --mdw-search-fullscreen-left: 0;
  --mdw-search-fullscreen-width: 0;
  --mdw-search-fullscreen-height: 0;

  position: relative;
  display: inline-block;
  min-height: 56px;
  background-color: var(--mdw-surface);
  border-radius: 28px;
  box-shadow: var(--mdw-elevation-3);
}

:host(.mdw-open.mdw-has-search-value),
:host(.mdw-open.mdw-has-filters) {
  border-radius: 28px 28px 0 0;
}

:host .textfield {
  position: relative;
  display: inline-flex;
  width: 100%;
  vertical-align: top;
  position: relative;
  box-sizing: border-box;
  height: 56px;
  border-radius: 28px;

  background-color: var(--mdw-elevation-tint-3);
}

:host(.mdw-open.mdw-has-search-value) .textfield,
:host(.mdw-open.mdw-has-filters) .textfield {
  border-radius: 28px 28px 0 0;
}

:host .textfield > input {
  flex: 1;
  align-self: flex-end;
  width: 100%;
  height: 56px;
  line-height: 56px;
  outline: none;
  border: 0;
  margin: 0;
  padding: 0;
  background: none;

  text-decoration: inherit;
  text-transform: inherit;
  font-size: var(--mdw-font-body-size-large);
  font-weight: var(--mdw-font-body-weight-large);
  line-height: var(--mdw-font-body-line-height-large);
  letter-spacing: var(--mdw-font-body-letter-spacing-large);
  color: var(--mdw-on-surface);
  caret-color: var(--mdw-primary);

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

:host .textfield > input::placeholder {
  color: var(--mdw-on-surface-variant);
}



/* --- leading / trailing ---- */


:host .textfield > .mdw-svg-icon {
  width: 24px;
  height: 24px;
  align-self: center;
  margin: 0 16px;
  opacity: 0;
  pointer-events: none;
}
:host .textfield > .mdw-svg-icon > svg {
  fill: var(--mdw-on-surface);
}
:host .textfield > .mdw-svg-icon + .mdw-svg-icon {
  margin-left: 0;
}


:host(.mdw-has-leading) .textfield > .search {
  display: none;
}

:host(:not(.mdw-has-leading)) .textfield > .search {
  opacity: 1;
  margin-left: 16px;
}


:host(.mdw-has-trailing) .textfield > .clear {
  position: absolute;
}

:host(.mdw-open.mdw-fullscreen) .textfield > .clear,
:host(.mdw-open.mdw-has-search-value) .textfield > .clear {
  opacity: 1;
  cursor: pointer;
  pointer-events: all;
  right: 0;
}

:host(.mdw-open:not(.mdw-has-search-value)) .textfield > .mic {
  pointer-events: all;
  cursor: pointer;
  opacity: 1;
}

/* offset to overlay spinner */
:host .textfield >  .mic {
  margin-right: -16px;
}


:host slot[name=leading],
:host slot[name=trailing] {
  display: flex;
  align-items: center;
}

:host slot[name=leading]::slotted(mdw-icon),
:host slot[name=trailing]::slotted(mdw-icon) {
  width: 24px;
  height: 24px;
  align-self: center;
  margin: 0 16px;
  pointer-events: none;
}

:host(.mdw-open.mdw-fullscreen) slot[name=trailing],
:host(.mdw-open.mdw-has-search-value) slot[name=trailing] {
  pointer-events: none;
  opacity: 0;
}

:host(.mdw-open.mdw-fullscreen) slot[name=leading] {
  pointer-events: none;
  opacity: 0;
}
:host .textfield > .fullscreen-back {
  position: absolute;
  left: 0;
  opacity: 0;
  pointer-events: none;
  cursor: pointer;
}
:host(.mdw-open.mdw-fullscreen) .textfield > .fullscreen-back {
  opacity: 1;
  pointer-events: all;
}



:host .spinner {
  display: flex;
  align-items: center;
  align-self: center;
  width: 28px;
  height: 28px;
  opacity: 0;
  pointer-events: none;
}

:host(.mdw-open.mdw-pending) .spinner {
  opacity: 1;
}


:host slot[name=filters] {
  display: block;
  position: absolute;
  top: 56px;
  left: 0;
  right: 0;
  background-color: var(--mdw-surface);
  z-index: 12;

  pointer-events: none;
  opacity: 0;
  transition: opacity 20ms;
}

:host(.mdw-open) slot[name=filters] {
  opacity: 1;
  pointer-events: all;
  transition: opacity 80ms;
}

:host slot[name=filters]::slotted(mdw-chip-group) {
  background-color: var(--mdw-elevation-tint-3);
  padding: 8px 16px;
}





/* --- fullscreen / mobile --- */

:host(.mdw-fullscreen) {
  --mdw-search-fullscreen-top: 0;
  --mdw-search-fullscreen-left: 0;
  --mdw-search-fullscreen-width: 0;
  --mdw-search-fullscreen-height: 0;

  animation: mdw-search-fullscreen-close 120ms;
  animation-timing-function: var(--mdw-transition-expand-out);
}

:host(.mdw-fullscreen.mdw-open) {
  position: fixed;
  z-index: 11;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0;
  overflow: auto;

  animation: mdw-search-fullscreen-open 200ms;
  animation-timing-function: var(--mdw-transition-expand-in);
}

:host(.mdw-fullscreen.mdw-open) .textfield {
  border-radius: 0;
}

:host(.mdw-no-animation) {
  animation-duration: 0ms !important;
}


@keyframes mdw-search-fullscreen-open {
  0% {
    top: var(--mdw-search-fullscreen-top);
    left: var(--mdw-search-fullscreen-left);
    width: var(--mdw-search-fullscreen-width);
    height: var(--mdw-search-fullscreen-height);
    border-radius: var(--mdw-shape-medium);
    overflow: hidden;
  }

  99% {
    overflow: hidden;
  }

  100% {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    border-radius: 0;
  }
}

@keyframes mdw-search-fullscreen-close {
  0% {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    border-radius: 0;
    overflow: hidden;
    z-index: 11;
  }

  1% {
    overflow: hidden;
  }

  100% {
    position: fixed;
    z-index: 11;
    overflow: hidden;
    top: var(--mdw-search-fullscreen-top);
    left: var(--mdw-search-fullscreen-left);
    width: var(--mdw-search-fullscreen-width);
    height: var(--mdw-search-fullscreen-height);
    border-radius: var(--mdw-shape-medium);
  }
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Ka];var $m=Ka;var Qa=new CSSStyleSheet;Qa.replaceSync(`mdw-search mdw-avatar + mdw-icon {
  margin-left: 4px;
}

mdw-search mdw-icon + mdw-icon {
  margin-left: 0;
}

mdw-search mdw-avatar {
  background-color: var(--mdw-secondary);
  color: var(--mdw-on-secondary);
  margin-right: 12px;
}


mdw-search.mdw-fullscreen.mdw-open .mdw-suggestions {
  width: 100%;
  height: calc(100% - 48px);
  margin-top: 48px;
  background-color: var(--mdw-elevation-tint-3);
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Qa];var _m=Qa;p.registerGlobalStyleSheet(_m);var Lh="SpeechRecognition"in window||"webkitSpeechRecognition"in window,Ja,We,Be,ne,kt,$t,_t,at,qt,Ge,re,io,Rt,U,Sn,En,Ln,An,Cn,Mn,Dn,Tn,oo,so,ft,ae,de,zn,no,Ze,N,le,Ji,X,gt,Ue,xn,dt,kn,to,$n,qm,_n,Rm,qn,Pm,me,eo,ro,td,ao,ed,Rn,Im,Pn,Fm,In,Om,Fn,Nm,On,Hm,Pt,je,Nn,Vm,lo,id,Hn,Ym,Vn,jm,Yn,Wm,jn,Bm,Wn,Gm,Bn,Zm,Gn,Um;customElements.define("mdw-search",(Ja=class extends p{constructor(){super();n(this,le);n(this,X);n(this,Ue);n(this,dt);n(this,$n);n(this,_n);n(this,qn);n(this,me);n(this,ro);n(this,ao);n(this,Rn);n(this,Pn);n(this,In);n(this,Fn);n(this,On);n(this,Pt);n(this,Nn);n(this,lo);n(this,Hn);n(this,Vn);n(this,Yn);n(this,jn);n(this,Wn);n(this,Bn);n(this,Gn);g(this,"useShadowRoot",!0);g(this,"useTemplate",!1);n(this,We,"");n(this,Be,"Search");n(this,ne,void 0);n(this,kt,!1);n(this,$t,[]);n(this,_t,[]);n(this,at,void 0);n(this,qt,document.createElement("template"));n(this,Ge,[{id:"default"}]);n(this,re,{default:e=>`<mdw-list-item value="${e.value}">${e.primary||e.value}</mdw-list-item>`,quick:e=>`<mdw-list-item value="${e.value}">${e.primary||e.value}</mdw-list-item>`});n(this,io,100);n(this,Rt,void 0);n(this,U,[]);n(this,Sn,this.open.bind(this));n(this,En,l(this,Rn,Im).bind(this));n(this,Ln,l(this,Hn,Ym).bind(this));n(this,An,l(this,In,Om).bind(this));n(this,Cn,this.close.bind(this));n(this,Mn,l(this,Fn,Nm).bind(this));n(this,Dn,l(this,On,Hm).bind(this));n(this,Tn,l(this,jn,Bm).bind(this));n(this,oo,l(this,Wn,Gm).bind(this));n(this,so,void 0);n(this,ft,void 0);n(this,ae,void 0);n(this,de,this.hasAttribute("speech"));n(this,zn,l(this,Gn,Um).bind(this));n(this,no,this.classList.contains("mdw-no-spinner"));n(this,Ze,new AbortController);n(this,N,void 0);this.classList.add("mdw-no-animation"),i(this,de)&&(Lh?l(this,Bn,Zm).call(this):(console.warn("Browser does not support speech recognition"),m(this,de,!1))),this.hasAttribute("debounce")&&(m(this,ne,parseInt(this.getAttribute("debounce")||300)),m(this,so,w.debounce(l(this,Pn,Fm).bind(this),i(this,ne))))}connectedCallback(){this.querySelector("[slot=filters]")&&this.classList.add("mdw-has-filters"),v.isMobile?(this.classList.add("mdw-fullscreen"),this.insertAdjacentHTML("beforeend",`
        <div class="mdw-suggestions" slot="suggestions">
          <mdw-list class="mdw-line-compact">
          </mdw-list>
        </div>
      `)):this.insertAdjacentHTML("beforeend",`
        <mdw-suggestions slot="suggestions">
          <mdw-list class="mdw-line-compact">
          </mdw-list>
        </mdw-suggestions>
      `),this.querySelector("[slot=leading]")&&this.classList.add("mdw-has-leading"),this.querySelector("[slot=trailing]")&&this.classList.add("mdw-has-trailing"),m(this,Rt,this.getAttribute("history")),i(this,Rt)&&m(this,U,JSON.parse(localStorage.getItem(`${i(this,Rt)}_history`)||"[]")),this.hasAttribute("aria-label")||this.setAttribute("aria-label",this.getAttribute("placeholder"))}afterRender(){m(this,at,this.shadowRoot.querySelector("input")),i(this,at).addEventListener("focus",i(this,Sn),{signal:i(this,Ze).signal}),this.shadowRoot.querySelector(".clear").addEventListener("click",i(this,An),{signal:i(this,Ze).signal}),setTimeout(()=>{this.classList.remove("mdw-no-animation")},200)}disconnectedCallback(){i(this,Ze).abort(),i(this,N)&&i(this,N).abort()}template(){return`
      <div class="textfield">
        <slot name="leading"></slot>
        <div class="mdw-svg-icon fullscreen-back">${zs}</div>
        <div class="mdw-svg-icon search">${Sl}</div>
        <input placeholder="${i(this,Be)}">
        ${i(this,de)?`<div class="mdw-svg-icon mic">${Al}</div>`:""}
        <span class="spinner"></span>
        <div class="mdw-svg-icon clear">${El}</div>
        <slot name="trailing"></slot>
      </div>
      <slot name="filters"></slot>
      <slot name="suggestions"></slot> <!-- filled in programmatically, used for global css access -->
    `}get placeholder(){return i(this,Be)}set placeholder(e){m(this,Be,e),this.setAttribute("aria-label",e),this.rendered&&(this.shadowRoot.querySelector("input").placeholder=e)}get value(){return i(this,We)}get searchValue(){return this.shadowRoot.querySelector("input").value}set searchValue(e){this.rendered&&(this.shadowRoot.querySelector("input").value=e)}get filterValue(){return i(this,Ue,xn).value}get sections(){return i(this,Ge)}get suggestions(){return i(this,$t)}get quickResults(){return i(this,_t)}open(){i(this,kt)||(m(this,N,new AbortController),i(this,at).selectionStart=1e4,i(this,at).addEventListener("input",i(this,En),{signal:i(this,N).signal}),window.addEventListener("keydown",i(this,Ln),{signal:i(this,N).signal}),v.isMobile?l(this,_n,Rm).call(this):(i(this,le,Ji).show(),i(this,le,Ji).addEventListener("close",i(this,Cn),{signal:i(this,N).signal})),i(this,X,gt).addEventListener("click",i(this,Mn),{signal:i(this,N).signal}),i(this,Ue,xn)&&i(this,Ue,xn).addEventListener("change",i(this,Dn),{signal:i(this,N).signal}),this.addEventListener("click",i(this,Tn),{signal:i(this,N).signal}),i(this,de)&&this.shadowRoot.querySelector(".mic").addEventListener("click",i(this,zn),{signal:i(this,N).signal}),this.classList.add("mdw-open"),m(this,kt,!0),l(this,me,eo).call(this))}close(){i(this,kt)&&(i(this,N).abort(),v.isMobile?l(this,qn,Pm).call(this):(i(this,le,Ji).close(),l(this,Pt,je).call(this),this.classList.remove("mdw-open"),m(this,kt,!1)))}pending(){i(this,no)||(this.shadowRoot.querySelector(".spinner").innerHTML=`
      <mdw-progress-circular thickness="2" diameter="28" class="mdw-indeterminate"></mdw-progress-circular>
    `,this.classList.add("mdw-pending"))}resolve(){i(this,no)||(this.shadowRoot.querySelector(".spinner").innerHTML="",this.classList.remove("mdw-pending"))}registerSection(e,o=""){i(this,Ge).push({id:e,title:o})}registerTemplate(e,o="default"){i(this,re)[o]=e}updateSuggestions(e){if(!Array.isArray(e)||e.find(o=>o.value===void 0))throw Error('suggestions must be an Array of Objects with at least a value property: [{ value: ""}]');m(this,$t,e||[]),this.resolve(),this.rendered&&l(this,me,eo).call(this)}updateQuickResults(e){if(!Array.isArray(e)||e.find(o=>o.value===void 0))throw Error('quickResults must be an Array of Objects with at least a value property: [{ value: ""}]');m(this,_t,e||[]),this.rendered&&l(this,me,eo).call(this)}},We=new WeakMap,Be=new WeakMap,ne=new WeakMap,kt=new WeakMap,$t=new WeakMap,_t=new WeakMap,at=new WeakMap,qt=new WeakMap,Ge=new WeakMap,re=new WeakMap,io=new WeakMap,Rt=new WeakMap,U=new WeakMap,Sn=new WeakMap,En=new WeakMap,Ln=new WeakMap,An=new WeakMap,Cn=new WeakMap,Mn=new WeakMap,Dn=new WeakMap,Tn=new WeakMap,oo=new WeakMap,so=new WeakMap,ft=new WeakMap,ae=new WeakMap,de=new WeakMap,zn=new WeakMap,no=new WeakMap,Ze=new WeakMap,N=new WeakMap,le=new WeakSet,Ji=function(){return this.querySelector("mdw-suggestions")||this.querySelector(".mdw-suggestions")},X=new WeakSet,gt=function(){return i(this,le,Ji).querySelector(":scope > mdw-list")},Ue=new WeakSet,xn=function(){return this.querySelector(":scope > mdw-chip-group")},dt=new WeakSet,kn=function(){return this.classList.contains("mdw-has-search-value")},to=function(e){this.classList.toggle("mdw-has-search-value",!!e)},$n=new WeakSet,qm=function(){return i(this,$t).length>0},_n=new WeakSet,Rm=function(){i(this,ft)||m(this,ft,document.createElement("div"));let e=this.getBoundingClientRect();i(this,ft).style.height=`${e.height}px`,i(this,ft).style.width=`${e.width}px`,i(this,ft).style.margin=getComputedStyle(this).margin,this.insertAdjacentElement("beforebegin",i(this,ft)),this.style.setProperty("--mdw-search-fullscreen-top",`${e.top}px`),this.style.setProperty("--mdw-search-fullscreen-left",`${e.left}px`),this.style.setProperty("--mdw-search-fullscreen-width",`${e.width}px`),this.style.setProperty("--mdw-search-fullscreen-height",`${e.height}px`),this.shadowRoot.querySelector(".fullscreen-back").addEventListener("click",i(this,oo),{signal:i(this,N).signal})},qn=new WeakSet,Pm=async function(){this.shadowRoot.querySelector(".fullscreen-back").removeEventListener("click",i(this,oo)),this.classList.remove("mdw-open"),m(this,kt,!1),await w.animationendAsync(this),i(this,ft).remove(),l(this,Pt,je).call(this)},me=new WeakSet,eo=function(){if(this.rendered){if(i(this,$n,qm)){let e=i(this,Ge).map(({id:o,title:s})=>({id:o,title:s,suggestions:i(this,$t).filter(r=>(r.section||"default")===o)})).filter(o=>o.suggestions.length>0);i(this,qt).innerHTML=e.map(o=>`
        ${o.title?`<div class="mdw-sub-header">${o.title}</div>`:""}
        ${o.suggestions.map(s=>`
          ${(i(this,re)[o.id]||i(this,re).default)(s)}
        `).join(`
`)}
      `).join(`
`),l(this,ro,td).call(this),i(this,X,gt).replaceChildren(i(this,qt).content.cloneNode(!0))}else i(this,kt)&&i(this,dt,kn)&&(i(this,U).length>0||i(this,_t).length>0)?(i(this,qt).innerHTML=`
        ${w.fuzzySearch(this.searchValue,i(this,U)).slice(0,10).map(l(this,Nn,Vm)).join(`
`)}
        ${this.quickResults.length>0?`
          <div class="mdw-sub-header">Quick results</div>
          ${i(this,_t).map(e=>`
            ${i(this,re).quick(e)}
          `).join(`
`)}
        `:""}
      `,l(this,ro,td).call(this),i(this,X,gt).replaceChildren(i(this,qt).content.cloneNode(!0))):i(this,X,gt).innerHTML="";[...i(this,X,gt).querySelectorAll("mdw-list-item")].forEach(e=>{let o=e.getAttribute("aria-label");o?.includes("[search result]")||e.setAttribute("aria-label",`[search result] ${o}`)})}},ro=new WeakSet,td=function(){let e=this.searchValue,o=new RegExp(e,"gi");l(this,ao,ed).call(this,i(this,qt).content).forEach(s=>{if(!s.textContent.trim())return;let r=document.createElement("span");r.innerHTML=s.textContent.replaceAll(o,`<mark>${e}</mark>`),s.parentNode.insertBefore(r,s),s.remove()})},ao=new WeakSet,ed=function(e){let o=[];if(!e)return o;for(e=e.firstChild;e;)e.nodeType==3?o.push(e):e.nodeName!=="MDW-ICON"&&e.nodeName!=="MDW-AVATAR"&&!e.hasAttribute("history")&&!e.classList.contains("mdw-sub-header")&&(o=o.concat(l(this,ao,ed).call(this,e))),e=e.nextSibling;return o},Rn=new WeakSet,Im=function(){l(this,Pt,je).call(this),this.searchValue!==""?i(this,dt,kn)===!1&&m(this,dt,!0,to):i(this,dt,kn)===!0&&(m(this,dt,!1,to),l(this,Pt,je).call(this)),i(this,ne)&&i(this,so).call(this),this.dispatchEvent(new Event("input"))},Pn=new WeakSet,Fm=function(){l(this,lo,id).call(this,this.searchValue),this.pending(),this.dispatchEvent(new Event("search"))},In=new WeakSet,Om=function(){this.searchValue="",m(this,dt,!1,to),this.classList.remove("mdw-has-search-value"),l(this,Pt,je).call(this),i(this,at).focus()},Fn=new WeakSet,Nm=function(e){if(e.target.nodeName==="MDW-LIST-ITEM"){if(e.target.hasAttribute("history")){i(this,at).value=e.target.value,this.pending(),this.dispatchEvent(new Event("search"));return}m(this,We,e.target.getAttribute("value")),this.close(),this.dispatchEvent(new Event("change"))}},On=new WeakSet,Hm=function(){this.dispatchEvent(new Event("filter")),this.dispatchEvent(new Event("change"))},Pt=new WeakSet,je=function(){m(this,$t,[]),m(this,_t,[]),l(this,me,eo).call(this)},Nn=new WeakSet,Vm=function(e){return`
      <mdw-list-item value="${e}" history>
        <div class="mdw-svg-icon">${Ll}</div>
        ${e}
      </mdw-list-item>
    `},lo=new WeakSet,id=function(e){i(this,Rt)&&(!e||e.length<2||i(this,U).includes(e)||(i(this,U).unshift(e),i(this,U).length>i(this,io)&&m(this,U,i(this,U).slice(0,i(this,io))),localStorage.setItem(`${i(this,Rt)}_history`,JSON.stringify(i(this,U)))))},Hn=new WeakSet,Ym=function(e){let{key:o,shiftKey:s}=e,r=o==="Escape",a=o==="Tab",h=o==="Enter",u=o==="ArrowDown",b=o==="ArrowUp";if(r&&!v.isMobile&&this.close(),a&&!s||u?(l(this,Vn,jm).call(this),e.preventDefault()):(a&&s||b)&&(l(this,Yn,Wm).call(this),e.preventDefault()),h&&!i(this,ne)){let f=document.activeElement;f.nodeName==="MDW-SEARCH"&&this.searchValue&&(l(this,lo,id).call(this,this.searchValue),this.pending(),this.dispatchEvent(new Event("search"))),f.nodeName==="MDW-LIST-ITEM"&&(f.hasAttribute("history")?(i(this,at).value=f.value,this.pending(),this.dispatchEvent(new Event("search"))):(m(this,We,f.getAttribute("value")),this.close(),this.dispatchEvent(new Event("change"))))}},Vn=new WeakSet,jm=function(){let e=document.activeElement,o;!e||e.nodeName!=="MDW-LIST-ITEM"?o=i(this,X,gt).querySelector("mdw-list-item"):e.nextElementSibling&&e.nextElementSibling.nodeName==="MDW-LIST-ITEM"?o=e.nextElementSibling:e.nextElementSibling&&e.nextElementSibling.nextElementSibling&&e.nextElementSibling.nextElementSibling.nodeName==="MDW-LIST-ITEM"?o=e.nextElementSibling.nextElementSibling:o||(o=i(this,X,gt).querySelector("mdw-list-item")),o&&o.focus()},Yn=new WeakSet,Wm=function(){let e=document.activeElement,o;!e||e.nodeName!=="MDW-LIST-ITEM"?o=[...i(this,X,gt).querySelectorAll("mdw-list-item")].pop():e.previousElementSibling&&e.previousElementSibling.nodeName==="MDW-LIST-ITEM"?o=e.previousElementSibling:e.previousElementSibling&&e.previousElementSibling.previousElementSibling&&e.previousElementSibling.previousElementSibling.nodeName==="MDW-LIST-ITEM"?o=e.previousElementSibling.previousElementSibling:o||(o=[...i(this,X,gt).querySelectorAll("mdw-list-item")].pop()),o&&o.focus()},jn=new WeakSet,Bm=function(e){let o=this.querySelector("[slot=leading]");if(o&&o.contains(e.target))this.close();else{let s=this.querySelector("[slot=trailing]");s&&s.contains(e.target)&&this.close()}},Wn=new WeakSet,Gm=function(){this.close()},Bn=new WeakSet,Zm=function(){m(this,ae,webkitSpeechRecognition?new webkitSpeechRecognition:new SpeechRecognition),i(this,ae).onresult=e=>{let o=e.results[0][0].transcript;o&&(m(this,dt,!0,to),i(this,at).value=o)}},Gn=new WeakSet,Um=function(){i(this,ae)&&i(this,ae).start()},g(Ja,"styleSheets",$m),Ja));var od=new CSSStyleSheet;od.replaceSync(`mdw-suggestions.mdw-panel {
  min-width: 112px;
  max-width: 280px;
  max-height: 320px;
  overflow-y: auto;
  border-radius: 0 0 28px 28px;
  background-color: var(--mdw-surface);
  box-sizing: border-box;
  box-shadow: var(--mdw-elevation-3);
  clip-path: inset(0px -30px -30px -30px);
}

mdw-suggestions::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  border-radius: 0 0 28px 28px;
  background-color: var(--mdw-elevation-tint-3);
  z-index: -1;
}

mdw-search.mdw-has-filters mdw-suggestions,
mdw-search.mdw-has-filters mdw-suggestions::after,
mdw-search.mdw-has-search-value mdw-suggestions,
mdw-search.mdw-has-search-value mdw-suggestions::after {
  padding: 8px 0;
  border-top: 1px solid var(--mdw-surface-variant);
}

mdw-search.mdw-has-filters mdw-suggestions.mdw-panel {
  min-height: 76px;
  padding-top: 46px;
  border-top: none;
  clip-path: inset(1px -30px -30px -30px);
}

.mdw-suggestions mdw-list-item,
mdw-suggestions mdw-list-item {
  cursor: pointer;
}


/* state layer */
.mdw-suggestions mdw-list-item::after,
mdw-suggestions mdw-list-item::after {
  position: absolute;
  content: "";
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
}

.mdw-suggestions mdw-list-item:focus::after,
mdw-suggestions mdw-list-item:focus::after {
  opacity: var(--mdw-state-layer-opacity-focus);
  background-color: var(--mdw-on-surface);
}

.mdw-suggestions mdw-list-item > *,
mdw-suggestions mdw-list-item > * {
  pointer-events: none;
}

.mdw-suggestions mdw-list,
.mdw-suggestions mdw-list-item,
mdw-suggestions mdw-list,
mdw-suggestions mdw-list-item {
  background-color: transparent;
}

.mdw-suggestions mark,
mdw-suggestions mark {
  background-color: var(--mdw-primary-alpha-20);
}

`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,od];var Xm=od;y.registerGlobalStyleSheet(Xm);customElements.define("mdw-suggestions",class extends y{constructor(){super()}connectedCallback(){super.connectedCallback(),this.target=this.parentElement,this.animation="opacity",this.addClickOutsideCloseIgnore(this.parentElement),setTimeout(()=>{this.style.minWidth=`${this.parentElement.offsetWidth}px`})}});var sd=new CSSStyleSheet;sd.replaceSync(`mdw-segmented-button-group {
  display: flex;
  box-sizing: border-box;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,sd];var Km=sd;p.registerGlobalStyleSheet(Km);customElements.define("mdw-segmented-button-group",class extends p{#t=this.classList.contains("mdw-multi-select");#i=this.#o.bind(this);#e="";constructor(){super()}connectedCallback(){this.setAttribute("role","radiogroup"),this.addEventListener("click",this.#i)}disconnectedCallback(){this.removeEventListener("click",this.#i)}static get observedAttributes(){return["value"]}attributeChangedCallback(t,e,o){this[t]=o}get value(){return this.#e}set value(t){t==null&&(t=""),this.#e=t;let e=t.split(",");w.nextAnimationFrameAsync().then(()=>{[...this.querySelectorAll("mdw-segmented-button")].forEach(o=>{o.checked=e.includes(o.value)})})}updateSelection(t,e){if(this.#t){let o=this.value.split(",");if(e===!0)o.push(t);else{let s=o.indexOf(t);o.splice(s,1)}this.#e=o.filter(s=>!!s.trim()).join(",")}else e===!0?([...this.querySelectorAll("mdw-segmented-button.mdw-checked")].filter(s=>s.value!==t).forEach(s=>s.checked=!1),this.#e=t):this.#e=""}deselect(){let t=this.querySelector("mdw-segmented-button.mdw-checked");t&&(t.checked=!1)}#o(t){if(this.#t){t.target.checked=!t.target.checked;return}this.deselect(),t.target.checked=!0}});var nd=new CSSStyleSheet;nd.replaceSync(`:host {
  position: relative;
  display: flex;
  user-select: none;
  border: none;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;

  font-size: var(--mdw-font-label-size-large);
  font-weight: var(--mdw-font-label-weight-large);
  letter-spacing: var(--mdw-font-label-letter-spacing-large);

  padding: 0 16px;
  height: 40px;

  color: var(--mdw-on-surface);
  border-left: 1px solid var(--mdw-outline);
  border-top: 1px solid var(--mdw-outline);
  border-bottom: 1px solid var(--mdw-outline);

  align-items: center;
  vertical-align: middle;
}

:host(.mdw-checked) {
  color: var(--mdw-on-secondary-container);
  background-color: var(--mdw-secondary-container);
}

:host(:last-of-type) {
  border-right: 1px solid var(--mdw-outline);
  border-radius: 0 var(--mdw-button-radius) var(--mdw-button-radius) 0;
}

:host(:first-of-type) {
  border-radius: var(--mdw-button-radius) 0 0 var(--mdw-button-radius);
}

:host(:hover)::after {
  opacity: 0;
}

:host::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  margin-left: -16px;
  opacity: 0;
  border-radius: inherit;
}
:host(:focus)::after {
  opacity: var(--mdw-state-layer-opacity-focus);
  background-color: var(--mdw-on-surface);
}

:host .slot-container {
  display: flex;
}

:host(.mdw-selected-icon) .slot-container {
  transform: translateX(-10px);
  transition: transform 180ms;
  transition-timing-function: var(--mdw-transition-expand-out);
}

:host(.mdw-selected-icon.mdw-checked) .slot-container {
  transform: translateX(0);
  transition: transform 220ms;
}

:host svg {
  margin-left: -32px;
  width: 32px;
  transition: opacity 80ms;
  transition-timing-function: var(--mdw-transition-expand-out);
}

:host(.mdw-checked) svg {
  margin-left: -12px;
}

:host svg path {
  stroke-dashoffset: 22.910259;
  stroke-dasharray: 22.910259;

  stroke: var(--mdw-on-secondary-container);
  animation: mdw-segmented-button-uncheck 120ms;
}

:host svg path {
  animation-duration: 0ms !important;
}

:host(.mdw-checked) svg path {
  stroke-dashoffset: 12;
  animation: mdw-segmented-button-check 220ms;
}

@keyframes mdw-segmented-button-check {

  0%,
  50% {
    stroke-dashoffset: 22.910259;
  }

  50% {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1);
  }

  100% {
    stroke-dashoffset: 12;
  }
}

@keyframes mdw-segmented-button-uncheck {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
    stroke-dasharray: 22.910259;
    stroke-dashoffset: 12
  }

  to {
    stroke-dasharray: 10;
    stroke-dashoffset: 12
  }
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,nd];var Qm=nd;var rd,Xe,mo,co;customElements.define("mdw-segmented-button",(rd=class extends Zt{constructor(){super();g(this,"useShadowRoot",!0);g(this,"useTemplate",!1);n(this,Xe,!1);n(this,mo,this.getAttribute("value")||"");g(this,"useRipple",!1);n(this,co,this.parentElement.classList.contains("mdw-checked-icon"));this.hasAttribute("checked")&&this.classList.add("mdw-checked"),i(this,co)&&this.classList.add("mdw-checked-icon")}static get observedAttributes(){return["value","checked"]}attributeChangedCallback(e,o,s){e==="checked"?this.checked=s!==null:this[e]=s}connectedCallback(){super.connectedCallback(),this.setAttribute("role","radio")}get checked(){return i(this,Xe)}set checked(e){m(this,Xe,!!e),this.classList.toggle("mdw-checked",i(this,Xe)),this.parentElement.updateSelection(this.value,this.checked)}get value(){return i(this,mo)}set value(e){m(this,mo,e)}template(){return`
      ${i(this,co)?`
        <svg version="1.1" focusable="false" viewBox="0 0 16 16">
          <path fill="none" stroke="white" d="M5,8 7.7,10 12,5.5" ></path>
        </svg>
      `:""}
      <div class="slot-container"><slot></slot></div>
    `}},Xe=new WeakMap,mo=new WeakMap,co=new WeakMap,g(rd,"styleSheets",Qm),rd));var ad=new CSSStyleSheet;ad.replaceSync(`:host {
  display: inline-flex;
  box-sizing: border-box;
  height: 56px;
  margin-bottom: 36px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

:host ::slotted(mdw-progress-linear) {
  display: none;
  position: absolute;
  top: 0;
}

:host(.mdw-filter-async-active) ::slotted(mdw-progress-linear) {
  display: block;
}

:host ::slotted(.mdw-no-items) {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 12px;
  user-select: none;
  pointer-events: none;
  outline: none;
  font-size: var(--mdw-font-label-size-large);
  font-weight: var(--mdw-font-label-weight-large);
  line-height: var(--mdw-font-label-line-height-large);
  letter-spacing: var(--mdw-font-label-letter-spacing-large);
  color: var(--mdw-on-surface);
}

:host ::slotted(mdw-option + .mdw-no-items) {
  display: none;
}

mdw-textfield .mdw-select-arrow {
  position: absolute;
  top: 24px;
  right: 18px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid var(--mdw-on-secondary-container-alpha-60);
  transform-origin: center;
  transform: rotate(0);
  transition: transform 280ms;
  z-index: 1;
  pointer-events: none;
}

mdw-textfield .mdw-select-arrow.mdw-open {
  transform: rotate(180deg);
}

mdw-textfield.mdw-invalid .mdw-select-arrow {
  opacity: 0;
}


mdw-textfield.mdw-select-no-filter input {
  cursor: pointer;
}

mdw-panel.mdw-option-group {
  min-width: 112px;
  max-width: 229px;
  /* TODO look into if this should not have have height outside of panel default (100% - padding) */
  max-height: 320px;
  padding: 8px 0;
  overflow-y: auto;
  border-radius: var(--mdw-shape-extra-small);
  background-color: var(--mdw-surface);
  box-shadow: var(--mdw-elevation-1);
  box-sizing: border-box;
}

:host mdw-panel ::slotted(mdw-option) {
  pointer-events: none;
}

:host mdw-panel[open] ::slotted(mdw-option) {
  pointer-events: all;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,ad];var Jm=ad;var dd=new CSSStyleSheet;dd.replaceSync(`mdw-textfield {
  display: inline-flex;
  vertical-align: top;
  position: relative;
  box-sizing: border-box;
  height: 56px;
  padding: 8px 16px;
  margin-bottom: 36px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  /* min-width: 200px; */
}

mdw-textfield input[type=date] {
  min-width: 120px;
}

mdw-textfield::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-radius: var(--mdw-shape-extra-small-top);
  border-bottom: 1px solid;
  border-bottom-color: var(--mdw-on-surface-variant);
  background-color: var(--mdw-surface-variant);
}

mdw-textfield:not(.mdw-outlined):focus-within::after {
  height: calc(100% - 1px);
  border-bottom: 2px solid;
  border-bottom-color: var(--mdw-primary);
}

mdw-textfield > input {
  flex: 1;
  align-self: flex-end;
  width: 100%;
  min-height: 28px;
  /* this is needed for type time on ios */
  box-sizing: border-box;
  border: none;
  background: none;
  outline: none;
  z-index: 1;
  padding: 0;
  margin: 0;
  margin-right: 20px;

  text-decoration: inherit;
  text-transform: inherit;
  font-family: inherit;
  font-size: var(--mdw-font-body-size-large);
  font-weight: var(--mdw-font-body-weight-large);
  line-height: var(--mdw-font-body-line-height-large);
  letter-spacing: var(--mdw-font-body-letter-spacing-large);
  color: var(--mdw-on-surface);
  caret-color: var(--mdw-primary);

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

mdw-textfield > input::-webkit-search-cancel-button {
  -webkit-appearance: none;
  /* display: inline-block;
  width: 12px;
  height: 12px;
  cursor: pointer;
  background-size: 12px;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="rgb(60,60,60)" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>"); */
}

input::-webkit-date-and-time-value {
  text-align: left;
}


mdw-textfield:not(.mdw-outlined) input:-webkit-autofill,
mdw-textfield:not(.mdw-outlined) input:-webkit-autofill:hover,
mdw-textfield:not(.mdw-outlined) input:-webkit-autofill:focus,
mdw-textfield:not(.mdw-outlined) input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px var(--mdw-surface-variant) inset !important;
}

/* hack to keep autofill background color from showing
 *  The issue is that outline does not have a background color so we cannot use a var
 */
mdw-textfield.mdw-outlined input:-webkit-autofill,
mdw-textfield.mdw-outlined input:-webkit-autofill:hover,
mdw-textfield.mdw-outlined input:-webkit-autofill:focus,
mdw-textfield.mdw-outlined input:-webkit-autofill:active {
  transition: background-color 9999s ease-in-out 0s;
}

mdw-textfield > label {
  position: absolute;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: text;
  z-index: 1;
  pointer-events: none;
  top: 15px;

  font-size: var(--mdw-font-body-size-large);
  font-weight: var(--mdw-font-body-weight-large);
  line-height: var(--mdw-font-body-line-height-large);
  letter-spacing: var(--mdw-font-body-letter-spacing-large);
  text-decoration: inherit;
  text-transform: inherit;

  color: var(--mdw-on-surface-variant);

  transform-origin: left top;
  animation: mdw-textfield-label-reverse 164ms;
  animation-timing-function: var(--mdw-transition-expand-in);
}

mdw-textfield:focus-within > label {
  color: var(--mdw-primary);
}

mdw-textfield > input::placeholder {
  font-size: var(--mdw-font-body-size-large);
  font-weight: var(--mdw-font-body-weight-large);
  line-height: var(--mdw-font-body-line-height-large);
  letter-spacing: var(--mdw-font-body-letter-spacing-large);
  color: var(--mdw-on-surface-variant);
}

mdw-textfield.mdw-raise-label label,
mdw-textfield:focus-within label,
mdw-textfield > input:not([placeholder=" "]) + label,
mdw-textfield > input:not(:placeholder-shown) + label {
  font-size: var(--mdw-font-body-size-small);
  top: 4px;
  animation: mdw-textfield-label 164ms;
  animation-timing-function: var(--mdw-transition-expand-in);
}

mdw-textfield.mdw-no-animation > label {
  animation-duration: 0ms !important;
}

mdw-textfield > mdw-icon,
mdw-textfield > .mdw-invalid-icon {
  align-self: center;
  margin-left: -4px;
  margin-right: -4px;
  z-index: 1;
  color: var(--mdw-on-surface-variant);
}

mdw-textfield > mdw-icon + input {
  margin-left: 16px;
}

mdw-textfield > mdw-icon + input + label {
  margin-left: 32px;
}

mdw-textfield > mdw-icon.mdw-input-clear {
  cursor: pointer;
}

mdw-textfield > input + mdw-icon,
mdw-textfield > input + .mdw-invalid-icon,
mdw-textfield > .mdw-supporting-text + mdw-icon,
mdw-textfield > .mdw-supporting-text + .mdw-invalid-icon,
mdw-textfield > .mdw-autocomplete + mdw-icon,
mdw-textfield > .mdw-autocomplete + .mdw-invalid-icon,
mdw-textfield > label + mdw-icon,
mdw-textfield > label + .mdw-invalid-icon {
  /* margin-left: 14px; */

  margin-left: -20px;
}


mdw-textfield > .mdw-supporting-text {
  position: absolute;
  top: 60px;

  font-size: var(--mdw-font-body-size-small);
  font-weight: var(--mdw-font-body-weight-small);
  line-height: var(--mdw-font-body-line-height-small);
  letter-spacing: var(--mdw-font-body-letter-spacing-small);
  color: var(--mdw-on-surface-variant);
}



/* --- disabled --- */

mdw-textfield[disabled] {
  pointer-events: none;
}

mdw-textfield[disabled]::after {
  height: 100%;
  border-bottom: 1px solid;
  border-bottom-color: var(--mdw-on-surface-alpha-38);
  background-color: var(--mdw-on-surface-alpha-4);
}

mdw-textfield[disabled] > input {
  color: var(--mdw-on-surface-alpha-38);
}

mdw-textfield[disabled] > label {
  color: var(--mdw-on-surface-alpha-38);
}

mdw-textfield[disabled] > .mdw-supporting-text {
  color: var(--mdw-on-surface-alpha-38);
}

mdw-textfield[disabled] > mdw-icon {
  color: var(--mdw-on-surface-variant-alpha-38);
}


mdw-textfield.mdw-has-date-picker > input::-webkit-inner-spin-button,
mdw-textfield.mdw-has-date-picker > input::-webkit-calendar-picker-indicator,
mdw-textfield.mdw-has-time-picker > input::-webkit-inner-spin-button,
mdw-textfield.mdw-has-time-picker > input::-webkit-calendar-picker-indicator,
mdw-textfield.mdw-has-month-picker > input::-webkit-inner-spin-button,
mdw-textfield.mdw-has-month-picker > input::-webkit-calendar-picker-indicator {
  display: none;
}

body.mdw-mobile mdw-textfield.mdw-has-date-picker input[type="date"],
body.mdw-mobile mdw-textfield.mdw-has-time-picker input[type="time"],
body.mdw-mobile mdw-textfield.mdw-has-time-picker input[type="month"] {
  pointer-events: none;
}

mdw-textfield .mdw-autocomplete {
  position: absolute;
  top: 21px;
  left: 0;
  box-sizing: border-box;
  border: none;
  background: none;
  outline: none;
  opacity: 0.5;
  z-index: 1;
  pointer-events: none;
  user-select: none;

  text-decoration: inherit;
  text-transform: inherit;
  font-size: var(--mdw-font-body-size-large);
  font-weight: var(--mdw-font-body-weight-large);
  line-height: var(--mdw-font-body-line-height-large);
  letter-spacing: var(--mdw-font-body-letter-spacing-large);
}

mdw-textfield > mdw-icon + input ~ .mdw-autocomplete {
  margin-left: 32px;
}


/* --- outline --- */

mdw-textfield.mdw-outlined::after {
  border-radius: var(--mdw-shape-extra-small);
  border: none;
  background-color: unset;
}

mdw-textfield.mdw-outlined > input {
  align-self: center;
}

mdw-textfield.mdw-outlined label {
  transform-origin: left top;
  animation: mdw-textfield-label-outlined-reverse 164ms;
  animation-timing-function: var(--mdw-transition-expand-in);
}

mdw-textfield.mdw-outlined > mdw-icon + input + label {
  transform-origin: left top;
  animation: mdw-textfield-label-outlined-reverse-icon 164ms;
  animation-timing-function: var(--mdw-transition-expand-in);
}

mdw-textfield.mdw-outlined.mdw-raise-label label,
mdw-textfield.mdw-outlined:focus-within label,
mdw-textfield.mdw-outlined > input:not([placeholder=" "]) + label,
mdw-textfield.mdw-outlined > input:not(:placeholder-shown) + label {
  font-size: var(--mdw-font-body-size-small);
  top: -12px;
  left: 14px;
  animation: mdw-textfield-label-outlined 164ms;
  animation-timing-function: var(--mdw-transition-expand-in);
}

mdw-textfield > .mdw-outlined-border-container {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
}

mdw-textfield > .mdw-outlined-border-container > .mdw-outlined-leading {
  box-sizing: border-box;
  border-radius: var(--mdw-shape-extra-small) 0 0 var(--mdw-shape-extra-small);
  border-left: 1px solid;
  border-right: none;
  width: 12px;
  height: 99.2%;
  border-top: 1px solid;
  border-bottom: 1px solid;
  pointer-events: none;

  border-color: var(--mdw-outline);
}

mdw-textfield > .mdw-outlined-border-container > .mdw-outlined-notch {
  box-sizing: border-box;
  flex: 0 0 auto;
  max-width: calc(100% - 12px * 2);
  height: 99.2%;
  border-bottom: 1px solid;
  pointer-events: none;

  border-color: var(--mdw-outline);
}

mdw-textfield > .mdw-outlined-border-container > .mdw-outlined-trailing {
  box-sizing: border-box;
  border-left: none;
  border-right: 1px solid;
  border-radius: 0 var(--mdw-shape-extra-small) var(--mdw-shape-extra-small) 0;
  flex-grow: 1;
  height: 99.2%;
  border-top: 1px solid;
  border-bottom: 1px solid;
  pointer-events: none;

  border-color: var(--mdw-outline);
}


mdw-textfield:focus-within > .mdw-outlined-border-container > .mdw-outlined-leading,
mdw-textfield:focus-within > .mdw-outlined-border-container > .mdw-outlined-notch,
mdw-textfield:focus-within > .mdw-outlined-border-container > .mdw-outlined-trailing {
  border-width: 2px;
  border-color: var(--mdw-primary);
}

mdw-textfield.mdw-has-leading-icon > .mdw-outlined-border-container > .mdw-outlined-leading {
  width: 43px;
}



/* --- invalid --- */

mdw-textfield.mdw-invalid::after {
  border-bottom-color: var(--mdw-error);
}

mdw-textfield.mdw-invalid > input {
  caret-color: var(--mdw-error);
  color: var(--mdw-on-surface);
}

mdw-textfield.mdw-invalid > label {
  color: var(--mdw-error);
}

mdw-textfield.mdw-invalid > .mdw-supporting-text {
  color: var(--mdw-error);
}

mdw-textfield > .mdw-invalid-icon {
  width: 24px;
  height: 24px;
  z-index: 1;
  align-self: center;
}

mdw-textfield > .mdw-invalid-icon > svg {
  fill: var(--mdw-error);
}

mdw-textfield.mdw-invalid > .mdw-outlined-border-container > .mdw-outlined-leading,
mdw-textfield.mdw-invalid > .mdw-outlined-border-container > .mdw-outlined-notch,
mdw-textfield.mdw-invalid > .mdw-outlined-border-container > .mdw-outlined-trailing {
  border-color: var(--mdw-error);
}

mdw-textfield.mdw-invalid > input + mdw-icon:not(.mdw-invalid-icon),
mdw-textfield.mdw-invalid > .mdw-supporting-text + mdw-icon:not(.mdw-invalid-icon),
mdw-textfield.mdw-invalid > .mdw-autocomplete + mdw-icon:not(.mdw-invalid-icon),
mdw-textfield.mdw-invalid > label + mdw-icon:not(.mdw-invalid-icon) {
  display: none;
}



/* use scale for smooth font transition */
@keyframes mdw-textfield-label {
  0% {
    top: 15px;
    font-size: var(--mdw-font-body-size-large);
    transform: scale(1);
  }

  100% {
    top: 7px;
    font-size: var(--mdw-font-body-size-large);
    transform: scale(0.8);
  }
}

@keyframes mdw-textfield-label-reverse {
  0% {
    top: 7px;
    font-size: var(--mdw-font-body-size-large);
    transform: scale(0.8);
  }

  100% {
    top: 15px;
    font-size: var(--mdw-font-body-size-large);
    transform: scale(1);
  }
}

/* use scale for smooth font transition */
@keyframes mdw-textfield-label-outlined {
  0% {
    top: 15px;
    left: 16px;
    font-size: var(--mdw-font-body-size-large);
    transform: scale(1);
  }

  100% {
    top: -9px;
    left: 14px;
    font-size: var(--mdw-font-body-size-large);
    transform: scale(0.8);
  }
}

@keyframes mdw-textfield-label-outlined-icon {
  0% {
    top: 15px;
    left: 16px;
    font-size: var(--mdw-font-body-size-large);
    transform: scale(1);
  }

  100% {
    top: -9px;
    left: 14px;
    font-size: var(--mdw-font-body-size-large);
    transform: scale(0.8);
  }
}

@keyframes mdw-textfield-label-outlined-reverse {
  0% {
    top: -9px;
    left: 14px;
    font-size: var(--mdw-font-body-size-large);
    transform: scale(0.8);
  }

  100% {
    top: 15px;
    left: 15px;
    font-size: var(--mdw-font-body-size-large);
    transform: scale(1);
  }
}

@keyframes mdw-textfield-label-outlined-reverse-icon {
  0% {
    top: -9px;
    left: 14px;
    font-size: var(--mdw-font-body-size-large);
    transform: scale(0.8);
  }

  100% {
    top: 15px;
    left: 15px;
    font-size: var(--mdw-font-body-size-large);
    transform: scale(1);
  }
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,dd];var Zn=dd;var ld,Ke,It,Qe,ce,Kn,Qn,E,H,L,Je,K,lt,Q,Jn,tr,ho,wo,po,he,uo,go,er,we,O,ir,ti,or,tc,sr,ec,nr,ic,rr,oc,ar,sc,dr,nc,lr,rc,ei,Un,mr,ac,cr,dc,hr,lc,wr,mc,ii,Xn,pr,cc,ur,hc,gr,wc,fr,pc,br,uc;customElements.define("mdw-select",(ld=class extends p{constructor(){super();n(this,or);n(this,sr);n(this,nr);n(this,rr);n(this,ar);n(this,dr);n(this,lr);n(this,ei);n(this,mr);n(this,cr);n(this,hr);n(this,wr);n(this,ii);n(this,pr);n(this,ur);n(this,gr);n(this,fr);n(this,br);g(this,"useShadowRoot",!0);g(this,"useTemplate",!1);n(this,Ke,"");n(this,It,"");n(this,Qe,this.getAttribute("label"));n(this,ce,this.hasAttribute("disabled"));n(this,Kn,this.hasAttribute("required"));n(this,Qn,this.getAttribute("supporting-text"));n(this,E,void 0);n(this,H,void 0);n(this,L,void 0);n(this,Je,void 0);n(this,K,[]);n(this,lt,this.classList.contains("mdw-filter"));n(this,Q,this.classList.contains("mdw-filter-async"));n(this,Jn,l(this,rr,oc).bind(this));n(this,tr,l(this,ar,sc).bind(this));n(this,ho,l(this,or,tc).bind(this));n(this,wo,l(this,sr,ec).bind(this));n(this,po,l(this,dr,nc).bind(this));n(this,he,l(this,mr,ac).bind(this));n(this,uo,w.debounce(l(this,wr,mc),300).bind(this));n(this,go,l(this,ur,hc).bind(this));n(this,er,w.debounce(l(this,gr,wc),300).bind(this));n(this,we,void 0);n(this,O,new AbortController);n(this,ir,w.debounce(l(this,br,uc),240));n(this,ti,"");this.clickOutsideToClose=!0}connectedCallback(){m(this,K,[...this.querySelectorAll("mdw-option")].map(e=>({label:w.getTextFromNode(e),element:e}))),m(this,we,i(this,K))}afterRender(){m(this,Je,this.shadowRoot.querySelector(".mdw-select-arrow")),m(this,H,this.shadowRoot.querySelector("mdw-textfield")),m(this,L,this.shadowRoot.querySelector("input")),m(this,E,this.shadowRoot.querySelector("mdw-panel")),i(this,E).target=this,i(this,E).animation="expand",i(this,E).addClickOutsideCloseIgnore(this),l(this,nr,ic).call(this),!i(this,lt)&&!i(this,Q)&&(i(this,H).classList.add("mdw-select-no-filter"),i(this,E).positionOverlap=!0),i(this,Q)&&this.insertAdjacentHTML("afterbegin",'<mdw-progress-linear class="mdw-indeterminate"></mdw-progress-linear>'),i(this,H).addEventListener("click",i(this,ho),{signal:i(this,O).signal}),i(this,L).addEventListener("focus",i(this,ho),{signal:i(this,O).signal}),i(this,E).addEventListener("open",i(this,Jn),{signal:i(this,O).signal}),i(this,E).addEventListener("close",i(this,tr),{signal:i(this,O).signal})}disconnectedCallback(){super.disconnectedCallback(),i(this,O).abort(),m(this,we,void 0),m(this,K,void 0)}template(){return`
      <mdw-textfield ${i(this,ce)?"disabled":""} ${this.classList.contains("mdw-outlined")?'class="mdw-outlined"':""}>
        <input value="${i(this,It)}" ${i(this,Kn)?"required":""}>
        ${i(this,Qe)?`<label>${i(this,Qe)}</label>`:""}
        <div class="mdw-select-arrow"></div>
        ${this.hasAttribute("supporting-text")?`<div class="mdw-supporting-text">${i(this,Qn)}</div>`:""}
        <mdw-panel class="mdw-option-group" role="listbox" aria-label="${i(this,Qe)}">
          <slot></slot>
        </mdw-panel>
      </mdw-textfield>
    `}static get observedAttributes(){return["value","disabled"]}attributeChangedCallback(e,o,s){e==="disabled"?(m(this,ce,s!==null),i(this,H)&&i(this,H).toggleAttribute("disabled",i(this,ce))):this[e]=s}get value(){return i(this,Ke)}set value(e){m(this,Ke,e),m(this,It,e);let o=this.querySelector(`mdw-option[value="${e}"]`);o&&m(this,It,w.getTextFromNode(o)),i(this,L)&&(i(this,L).value=i(this,It),i(this,L).parentElement.classList.contains("mdw-outlined")&&i(this,L).parentElement.updateNotch()),i(this,E)&&i(this,E).open===!0&&l(this,ei,Un).call(this)}get display(){return i(this,L).value}get disabled(){return i(this,ce)}set disabled(e){this.toggleAttribute("disabled",!!e)}get options(){return this.querySelectorAll("mdw-option")}set optionValues(e){!Array.isArray(e)||e.length===0?m(this,K,[]):m(this,K,e.map(o=>{let s=document.createElement("mdw-option");return s.setAttribute("value",o.value),s.innerText=o.label,{label:o.label,element:s}})),l(this,ii,Xn).call(this)}resolveFilter(){this.classList.remove("mdw-filter-async-active")}reportValidity(){return i(this,L).reportValidity()}checkValidity(){return i(this,L).checkValidity()}},Ke=new WeakMap,It=new WeakMap,Qe=new WeakMap,ce=new WeakMap,Kn=new WeakMap,Qn=new WeakMap,E=new WeakMap,H=new WeakMap,L=new WeakMap,Je=new WeakMap,K=new WeakMap,lt=new WeakMap,Q=new WeakMap,Jn=new WeakMap,tr=new WeakMap,ho=new WeakMap,wo=new WeakMap,po=new WeakMap,he=new WeakMap,uo=new WeakMap,go=new WeakMap,er=new WeakMap,we=new WeakMap,O=new WeakMap,ir=new WeakMap,ti=new WeakMap,or=new WeakSet,tc=function(e){if(!i(this,lt)&&!i(this,Q)&&i(this,L).setAttribute("readonly",""),e.type==="click")return i(this,E).show();document.body.addEventListener("keydown",i(this,he),{signal:i(this,O).signal}),e.target.addEventListener("blur",i(this,wo),{signal:i(this,O).signal})},sr=new WeakSet,ec=function(e){!i(this,lt)&&!i(this,Q)&&i(this,L).removeAttribute("readonly"),i(this,E).open||document.body.removeEventListener("keydown",i(this,he),{signal:i(this,O).signal}),e.target.removeEventListener("blur",i(this,wo),{signal:i(this,O).signal})},nr=new WeakSet,ic=async function(){i(this,E).style.minWidth=`${this.offsetWidth}px`,await document.fonts.ready,i(this,E).style.minWidth=`${this.offsetWidth}px`},rr=new WeakSet,oc=function(){i(this,H).classList.add("mdw-raise-label"),i(this,lt)||l(this,ei,Un).call(this),i(this,Je).classList.add("mdw-open"),this.addEventListener("click",i(this,po),{signal:i(this,O).signal}),document.body.addEventListener("keydown",i(this,he),{signal:i(this,O).signal}),i(this,lt)&&i(this,L).addEventListener("input",i(this,uo),{signal:i(this,O).signal}),i(this,Q)&&i(this,L).addEventListener("input",i(this,go),{signal:i(this,O).signal}),this.options.forEach(e=>e.tabindex=0)},ar=new WeakSet,sc=async function(){this.options.forEach(e=>e.tabindex=-1),i(this,H).classList.remove("mdw-raise-label"),i(this,Je).classList.remove("mdw-open"),this.removeEventListener("click",i(this,po)),document.body.removeEventListener("keydown",i(this,he)),i(this,lt)&&i(this,L).removeEventListener("input",i(this,uo)),i(this,Q)&&i(this,L).removeEventListener("input",i(this,go)),i(this,L).value=i(this,It),(i(this,lt)||i(this,Q))&&(await w.animationendAsync(i(this,E)),l(this,pr,cc).call(this))},dr=new WeakSet,nc=function(e){e.target.nodeName==="MDW-OPTION"&&(l(this,lr,rc).call(this,e.target),i(this,E).close())},lr=new WeakSet,rc=function(e){this.value=e.value,i(this,H).autocomplete="",!i(this,H).classList.contains("mdw-invalid")!==i(this,L).checkValidity()&&i(this,L).reportValidity(),this.dispatchEvent(new Event("change",this))},ei=new WeakSet,Un=function(){let e=this.querySelector("mdw-option[selected]");e&&(e.removeAttribute("selected"),e.removeAttribute("aria-selected"));let o=this.querySelector(`mdw-option[value="${i(this,Ke)}"]`);o&&(o.setAttribute("selected",""),o.setAttribute("aria-selected","true"),o.scrollIntoView({behavior:"smooth",block:"center"}),i(this,E).scrollTop<56&&(i(this,E).scrollTop=0))},mr=new WeakSet,ac=function(e){let{key:o,shiftKey:s}=e,r=o==="Escape",a=o==="Tab",h=o==="Enter",u=o==="ArrowDown",b=o==="ArrowUp";if(!i(this,E).open)if(u||b||h)i(this,E).show();else return;if(r&&this.clickOutsideToClose===!0)i(this,E).close();else if(a&&!s||u)l(this,cr,dc).call(this),e.preventDefault();else if(a&&s||b)l(this,hr,lc).call(this),e.preventDefault();else if(h){let f=document.activeElement;f.nodeName==="INPUT"&&(this.querySelector("mdw-option").click(),i(this,E).close()),f.nodeName==="MDW-OPTION"&&(e.target.click(),i(this,E).close())}else if(!i(this,lt)&&![38,40,13].includes(e.keyCode))return l(this,fr,pc).call(this,e.key)},cr=new WeakSet,dc=function(){let e=document.activeElement,o=this.querySelector("mdw-option[selected]"),s;(!e||e.nodeName!=="MDW-OPTION")&&o&&(s=o.nextElementSibling),e&&e.nodeName==="MDW-OPTION"&&!s&&(s=e.nextElementSibling),s||(s=this.querySelector("mdw-option")),s&&s.focus()},hr=new WeakSet,lc=function(){let e=document.activeElement,o=this.querySelector("mdw-option[selected]"),s;(!e||e.nodeName!=="MDW-OPTION")&&o&&(s=o.previousElementSibling),e&&e.nodeName==="MDW-OPTION"&&!s&&(s=e.previousElementSibling),s||(s=this.querySelector("mdw-option:last-of-type")),s&&s.focus()},wr=new WeakSet,mc=function(){let e=i(this,L).value.trim();if(!e)return l(this,ii,Xn).call(this);let o=w.fuzzySearch(e,i(this,K)),s=new DocumentFragment;for(let r of o)s.append(r.element);if(this.replaceChildren(s),o.length>0){let r=new RegExp(`^${e}`,"i");o[0].label.match(r)===null?i(this,H).autocomplete="":i(this,H).autocomplete=o[0].label}else i(this,H).autocomplete=""},ii=new WeakSet,Xn=function(){let e=new DocumentFragment;for(let o of i(this,K))e.append(o.element);this.replaceChildren(e),i(this,Q)&&this.insertAdjacentHTML("afterbegin",'<mdw-progress-linear class="mdw-indeterminate"></mdw-progress-linear>'),i(this,K).length===0&&this.insertAdjacentHTML("beforeend",'<div class="mdw-no-items">No items</div> '),l(this,ei,Un).call(this),this.resolveFilter()},pr=new WeakSet,cc=function(){let e=new DocumentFragment;for(let o of i(this,we))e.append(o.element);this.replaceChildren(e),i(this,Q)&&this.insertAdjacentHTML("afterbegin",'<mdw-progress-linear class="mdw-indeterminate"></mdw-progress-linear>'),i(this,we).length===0&&this.insertAdjacentHTML("beforeend",'<div class="mdw-no-items">No items</div> ')},ur=new WeakSet,hc=function(){if(!i(this,L).value.trim())return l(this,ii,Xn).call(this);this.classList.add("mdw-filter-async-active"),i(this,er).call(this)},gr=new WeakSet,wc=function(){this.dispatchEvent(new Event("filter",this))},fr=new WeakSet,pc=function(e){m(this,ti,i(this,ti)+e.toLowerCase());let o=i(this,K).find(({label:s})=>s.toLowerCase().startsWith(i(this,ti)));o&&o.element.focus(),i(this,ir).call(this)},br=new WeakSet,uc=function(){m(this,ti,"")},g(ld,"styleSheets",[Jm,Zn,en]),ld));var md=new CSSStyleSheet;md.replaceSync(`:host {
  position: relative;
  display: inline-flex;
  user-select: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  outline: none;
  -webkit-tap-highlight-color: transparent;

  font-size: var(--mdw-font-label-size-large);
  font-weight: var(--mdw-font-label-weight-large);
  letter-spacing: var(--mdw-font-label-letter-spacing-large);

  height: 48px;
  line-height: 48px;
  padding: 0 12px;
  color: var(--mdw-on-surface);
}

:host ::slotted(mdw-icon) {
  vertical-align: middle;
  margin-left: -2px;
  margin-right: 8px;
  width: var(--mdw-font-icon-size-medium) !important;
  height: var(--mdw-font-icon-size-medium) !important;
  font-size: var(--mdw-font-icon-size-medium) !important;
  line-height: var(--mdw-font-icon-size-medium) !important;
}

:host ::slotted(mdw-icon.mdw-trailing) {
  margin-right: -2px;
  margin-left: 8px;
}

:host([disabled]) {
  pointer-events: none;
  cursor: unset;
  color: var(--mdw-on-surface);
  opacity: 0.38;
}

/* state layer */
:host::after {
  position: absolute;
  content: "";
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
}

:host(:focus)::after {
  opacity: var(--mdw-state-layer-opacity-focus);
  background-color: var(--mdw-on-surface);
}


/* hover state layers. Media needed to prevent hover on mobile */
@media (hover: hover) {
  :host(:hover)::after {
    opacity: var(--mdw-state-layer-opacity-hover);
    background-color: var(--mdw-on-surface);
  }
}


:host([selected])::after,
:host:active::after {
  opacity: var(--mdw-state-layer-opacity-pressed);
  background-color: var(--mdw-primary);
}

:host(:not([selected])):focus::after {
  opacity: var(--mdw-state-layer-opacity-focus);
  background-color: var(--mdw-on-surface);
}


/* --- Ripple --- */

.ripple {
  overflow: hidden;
  border-radius: inherit;
  transform: translateZ(0);
  /* fixes bug on ios safari */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
}

.ripple > .mdw-ripple-element {
  background-color: var(--mdw-on-surface-alpha-16);
  border-radius: 50%;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,md];var gc=md;var cd,oi,fo,vr,fc;customElements.define("mdw-option",(cd=class extends p{constructor(){super();n(this,vr);g(this,"useShadowRoot",!0);n(this,oi,this.getAttribute("value")||w.getTextFromNode(this));n(this,fo,void 0);l(this,vr,fc).call(this)}template(){return`
      <span class="text">
        <slot></slot>
      </span>
      <div class="ripple"></div>
    `}connectedCallback(){this.tabIndex=-1,this.setAttribute("role","option"),m(this,oi,this.getAttribute("value")||w.getTextFromNode(this))}afterRender(){m(this,fo,new P({element:this.shadowRoot.querySelector(".ripple"),triggerElement:this}))}disconnectedCallback(){i(this,fo).destroy()}get value(){return i(this,oi)}set value(e){m(this,oi,e)}},oi=new WeakMap,fo=new WeakMap,vr=new WeakSet,fc=function(){let e=this.querySelector("mdw-icon");if(!e)return;let o=e.previousSibling;for(;o&&!(o.nodeType===3&&o.textContent.trim()!=="");)o=o.previousSibling;o&&e.classList.add("mdw-trailing")},g(cd,"styleSheets",gc),cd));var hd=new CSSStyleSheet;hd.replaceSync(`mdw-side-sheet {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  z-index: 11;
  box-sizing: border-box;
  background-color: var(--mdw-surface);

  width: var(--mdw-side-sheet-width);
  transform: translateX(0);
  transition: transform 180ms;
  transition-timing-function: var(--mdw-transition-expand-in);
}

mdw-side-sheet.mdw-global {
  position: fixed;
}

body.mdw-mobile mdw-side-sheet,
mdw-side-sheet.mdw-modal {
  border-radius: var(--mdw-shape-large) 0 0 var(--mdw-shape-large);
  box-shadow: var(--mdw-elevation-2);
}

mdw-side-sheet.mdw-hide {
  pointer-events: none;
  transform: translateX(var(--mdw-side-sheet-width));
  transition: transform 180ms;
  transition-timing-function: var(--mdw-transition-expand-out);
}

body.mdw-mobile mdw-side-sheet.mdw-hide,
mdw-side-sheet.mdw-modal.mdw-hide {
  pointer-events: none;
  transform: translateX(calc(var(--mdw-side-sheet-width) + 24px));
}

mdw-side-sheet + .mdw-side-sheet-placeholder {
  width: var(--mdw-side-sheet-width);
  flex-shrink: 0;
  transition: width 180ms;
  transition-timing-function: var(--mdw-transition-expand-in);
}

mdw-side-sheet.mdw-hide + .mdw-side-sheet-placeholder,
body.mdw-mobile mdw-side-sheet + .mdw-side-sheet-placeholder,
mdw-side-sheet.mdw-modal + .mdw-side-sheet-placeholder {
  width: 0;
  transition: width 180ms;
  transition-timing-function: var(--mdw-transition-expand-out);
}

mdw-side-sheet.mdw-left-align {
  right: unset;
  left: 0;
}

mdw-side-sheet.mdw-left-align.mdw-hide {
  transform: translateX(calc(var(--mdw-side-sheet-width) * -1));
}

body.mdw-mobile mdw-side-sheet.mdw-left-align.mdw-hide,
mdw-side-sheet.mdw-modal.mdw-left-align.mdw-hide {
  transform: translateX(calc(var(--mdw-side-sheet-width) * -1 - 24px));
}

mdw-side-sheet .mdw-header {
  display: flex;
  height: 64px;
  align-items: center;
  justify-content: end;
  padding-left: 16px;
}
mdw-side-sheet .mdw-header .mdw-title {
  flex: 1;

  font-size: var(--mdw-font-title-size-medium);
  font-weight: var(--mdw-font-title-weight-medium);
  letter-spacing: var(--mdw-font-title-letter-spacing-medium);
  color: var(--mdw-on-surface-variant);
}

mdw-side-sheet .mdw-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

mdw-side-sheet .mdw-actions {
  position: relative;
  display: flex;
  height: 72px;
  align-items: center;
  padding-left: 16px;
}

mdw-side-sheet .mdw-actions mdw-button + mdw-button {
  margin-left: 6px;
}

mdw-side-sheet .mdw-actions .mdw-divider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-top: 1px solid var(--mdw-surface-variant);
}


mdw-side-sheet.mdw-no-animation + .mdw-side-sheet-placeholder,
mdw-side-sheet.mdw-no-animation {
  transition: none !important;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,hd];var bc=hd;p.registerGlobalStyleSheet(bc);customElements.define("mdw-side-sheet",class extends p{#t;#i;#e;#o;#s=!1;#l;#c=this.#a.bind(this);#n=this.close.bind(this);constructor(){super(),this.classList.add("mdw-no-animation"),this.classList.add("mdw-hide"),this.#t=!1,this.classList.contains("mdw-global")&&this.classList.add("mdw-modal"),this.#o=this.classList.contains("mdw-modal"),this.#i=this.classList.contains("mdw-scrim"),this.#s=this.classList.contains("mdw-click-scrim-close"),this.#l=document.createElement("div"),this.#l.classList.add("mdw-side-sheet-placeholder"),this.insertAdjacentElement("afterend",this.#l)}connectedCallback(){w.nextAnimationFrameAsync().then(()=>{this.querySelectorAll(".mdw-side-sheet-close").forEach(t=>t.addEventListener("click",this.#n)),this.classList.remove("mdw-no-animation")})}disconnectedCallback(){this.#e&&this.#e.remove(),this.querySelectorAll(".mdw-side-sheet-close").forEach(t=>t.removeEventListener("click",this.#n))}get open(){return this.#t}set open(t){this.#t!==t&&(this.#t=!!t,this.classList.toggle("mdw-hide",!this.#t),this.#o&&this.#i&&(this.#t?(this.#e||(this.#e=document.createElement("mdw-scrim")),this.insertAdjacentElement("beforebegin",this.#e),this.#s&&this.#e.addEventListener("click",this.#c)):this.#e&&(this.#e.removeEventListener("click",this.#c),this.#e.remove())))}get clickScrimClose(){return this.#s}set clickScrimClose(t){this.#s=!!t}get modal(){return this.#o}set modal(t){this.#o=this.classList.contains("mdw-global")?!0:!!t,this.classList.toggle("mdw-modal",this.#o)}get scrim(){return this.#i}set scrim(t){this.#i=!!t,this.classList.toggle("mdw-scrim",this.#i)}show(){this.open=!0}close(){this.open=!1}toggle(){this.open=!this.open}#a(){this.open=!1}});var wd=new CSSStyleSheet;wd.replaceSync(`:host {
  position: relative;
  display: block;
  outline: none;
  width: 200px;
  height: 80px;
}

:host > slot {
  display: block;
  font-size: var(--mdw-font-title-size-large);
  font-weight: var(--mdw-font-title-weight-large);
  letter-spacing: var(--mdw-font-title-letter-spacing-large);
  line-height: var(--mdw-font-title-line-height);
  height: 46px;
}

:host(.mdw-has-icon) > slot {
  margin-left: 42px;
}

::slotted(mdw-icon) {
  position: absolute;
  top: 16px;
  left: 0;
}

:host > .control {
  position: relative;
  display: flex;
  align-items: center;
}

:host(.mdw-has-icon) > .control {
  margin-left: 42px;
}

:host([disabled]) > .control {
  pointer-events: none;
  opacity: .38;
}

:host > .control > .track-active {
  position: absolute;
  display: flex;
  align-items: center;
  width: 50%;
  height: 4px;
  border-radius: 2px;

  background-color: var(--mdw-primary);
}

:host([disabled]) > .control > .track-active {
  background-color: var(--mdw-on-surface);
}

:host > .control > .track-inactive {
  position: absolute;
  left: 50%;
  right: 0;
  height: 4px;
  border-radius: 2px;

  background-color: var(--mdw-surface-variant);
}

:host([disabled]) > .control > .track-inactive {
  background-color: var(--mdw-on-surface-alpha-50);
}

:host > .control > .thumb {
  position: absolute;
  left: 50%;
  margin-left: -10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;

  background-color: var(--mdw-primary);
  box-shadow: var(--mdw-elevation-1);
}

:host > slot {
  display: block;
  line-height: 36px;
}

:host([disabled]) > .control > .thumb {
  background-color: var(--mdw-on-surface);
  box-shadow: none;
}

:host > .control > .thumb::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--mdw-primary);
  opacity: 0;
  transition: opacity 100ms;
}

:host > .control > .thumb:active::before {
  opacity: var(--mdw-state-layer-opacity-pressed);
  transition: opacity 180ms;
}

:host(:focus) > .control > .thumb::before,
:host > .control > .thumb:focus::before {
  opacity: var(--mdw-state-layer-opacity-focus);
  transition: opacity 180ms;
}

:host > .control > .thumb > .label {
  position: absolute;
  top: -36px;
  left: -4px;
  pointer-events: none;
  width: 28px;
  height: 28px;
  border-radius: 50% 50% 0 50%;
  box-sizing: border-box;
  transform-origin: center;
  transform: rotate(45deg);
  background-color: var(--mdw-primary);
  opacity: 0;
  transition: opacity 100ms;
}

:host > .control > .thumb > .label > .label-text {
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  vertical-align: center;
  transform-origin: center;
  transform: rotate(-45deg);
  font-size: var(--mdw-font-label-size-medium);
  font-weight: var(--mdw-font-label-weight-medium);
  letter-spacing: var(--mdw-font-label-letter-spacing-medium);
  color: var(--mdw-on-primary);
}

:host(:focus) > .control > .thumb > .label,
:host > .thumb:focus > .label,
:host > .thumb:active > .label {
  opacity: 1;
  transition: opacity 180ms;
}

/* hover state layers. Media needed to prevent hover on mobile */
@media (hover: hover) {
  :host > .control > .thumb:hover::before {
    opacity: var(--mdw-state-layer-opacity-hover);
    transition: opacity 180ms;
  }

  :host > .control > .thumb:hover > .label {
    opacity: 1;
    transition: opacity 180ms;
  }
}

:host > .control > .marks {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4px;
  pointer-events: none;
}

:host > .control > .marks > .mark {
  width: 4px;
  height: 4px;
  border-radius: 50%;
}

:host > .control > .marks > .mark.active {
  background-color: var(--mdw-on-primary-alpha-38);
}

:host > .control > .marks > .mark.inactive {
  background-color: var(--mdw-on-surface-variant);
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,wd];var vc=wd;var pd,si,J,bt,z,St,ni,pe,ri,ai,Ft,vo,yo,Et,xr,kr,xo,ko,Sr,So,Lt,Er,yc,Eo,ud,Lr,xc,Lo,gd,ue,bo,Ao,fd,di,yr,Co,bd,Ar,kc,Cr,Sc,Mr,Ec,Dr,Lc,Tr,Ac,zr,Cc;customElements.define("mdw-slider",(pd=class extends p{constructor(){super();n(this,Er);n(this,Eo);n(this,Lr);n(this,Lo);n(this,ue);n(this,Ao);n(this,di);n(this,Co);n(this,Ar);n(this,Cr);n(this,Mr);n(this,Dr);n(this,Tr);n(this,zr);g(this,"useShadowRoot",!0);g(this,"useTemplate",!1);n(this,si,!1);n(this,J,0);n(this,bt,100);n(this,z,50);n(this,St,1);n(this,ni,this.classList.contains("mdw-discrete"));n(this,pe,void 0);n(this,ri,void 0);n(this,ai,void 0);n(this,Ft,void 0);n(this,vo,void 0);n(this,yo,void 0);n(this,Et,void 0);n(this,xr,l(this,Mr,Ec).bind(this));n(this,kr,l(this,Cr,Sc).bind(this));n(this,xo,l(this,Ar,kc).bind(this));n(this,ko,l(this,zr,Cc).bind(this));n(this,Sr,l(this,Dr,Lc).bind(this));n(this,So,l(this,Tr,Ac).bind(this));n(this,Lt,new AbortController);this.querySelector("mdw-icon")&&this.classList.add("mdw-has-icon")}template(){return`
      <slot></slot>

      <div class="control">
        <div class="track-inactive"></div>
        <div class="track-active"></div>

        <div class="marks">
          ${i(this,ni)?[...new Array(i(this,Er,yc))].map(e=>'<div class="mark"></div>').join(`
`):""}
        </div>

        <div class="thumb">
          <div class="label">
            <div class="label-text"></div>
          </div>
        </div>
      </div>
    `}connectedCallback(){this.tabIndex=0,this.setAttribute("role","slider"),this.setAttribute("aria-valuenow",i(this,z))}disconnectedCallback(){i(this,Et).destroy(),i(this,Lt).abort()}afterRender(){this.addEventListener("focus",i(this,Sr),{signal:i(this,Lt).signal}),m(this,pe,this.shadowRoot.querySelector(".control")),m(this,ri,this.shadowRoot.querySelector(".track-active")),m(this,ai,this.shadowRoot.querySelector(".track-inactive")),m(this,Ft,this.shadowRoot.querySelector(".thumb")),m(this,vo,this.shadowRoot.querySelector(".label-text")),l(this,di,yr).call(this,{percent:this.percent});let e=w.getTextFromNode(this);e&&this.setAttribute("aria-label",e),m(this,Et,new A(i(this,Ft))),i(this,Et).includeMouseEvents=!0,i(this,Et).onDrag(i(this,xr)),i(this,Et).onStart(i(this,kr)),i(this,Et).enable(),i(this,ai).addEventListener("click",i(this,xo),{signal:i(this,Lt).signal}),i(this,ri).addEventListener("click",i(this,xo),{signal:i(this,Lt).signal})}static get observedAttributes(){return["disabled","min","max","value","step"]}attributeChangedCallback(e,o,s){e==="disabled"&&(this.disabled=s!==null),e==="min"&&(this.min=s),e==="max"&&(this.max=s),e==="value"&&(this.value=s),e==="step"&&(this.step=s)}get disabled(){return i(this,si)}set disabled(e){m(this,si,!!e),this.toggleAttribute("disabled",i(this,si))}get value(){return`${i(this,z)}`}set value(e){m(this,z,parseFloat(e)),l(this,ue,bo).call(this)}get min(){return`${i(this,J)}`}set min(e){m(this,J,parseInt(e)),this.setAttribute("aria-valuemin",e),l(this,ue,bo).call(this)}get max(){return`${i(this,bt)}`}set max(e){m(this,bt,parseInt(e)),this.setAttribute("aria-valuemax",e),l(this,ue,bo).call(this)}get step(){return`${i(this,St)}`}set step(e){m(this,St,parseFloat(e)),l(this,ue,bo).call(this)}get percent(){return(i(this,z)-i(this,J))/(i(this,bt)-i(this,J))}},si=new WeakMap,J=new WeakMap,bt=new WeakMap,z=new WeakMap,St=new WeakMap,ni=new WeakMap,pe=new WeakMap,ri=new WeakMap,ai=new WeakMap,Ft=new WeakMap,vo=new WeakMap,yo=new WeakMap,Et=new WeakMap,xr=new WeakMap,kr=new WeakMap,xo=new WeakMap,ko=new WeakMap,Sr=new WeakMap,So=new WeakMap,Lt=new WeakMap,Er=new WeakSet,yc=function(){return Math.floor((i(this,bt)-i(this,J))/i(this,St))+1},Eo=new WeakSet,ud=function(){return i(this,pe).offsetWidth},Lr=new WeakSet,xc=function(){return i(this,pe).getBoundingClientRect().x-this.getBoundingClientRect().x},Lo=new WeakSet,gd=function(){return i(this,pe).getBoundingClientRect().x},ue=new WeakSet,bo=function(){i(this,z)<i(this,J)&&m(this,z,i(this,J)),i(this,z)>i(this,bt)&&m(this,z,i(this,bt)),m(this,z,l(this,Ao,fd).call(this,i(this,z))),this.setAttribute("aria-valuenow",i(this,z)),this.rendered&&l(this,di,yr).call(this,{percent:this.percent})},Ao=new WeakSet,fd=function(e){let o=1/i(this,St);return Math.round(e*o)/o},di=new WeakSet,yr=function({percent:e,pixels:o}){if(!isNaN(e)&&e>1)throw Error("percent must be from 0 - 1");let s=i(this,Eo,ud);if(isNaN(e)||(o=s*e),o<0&&(o=0),o>s&&(o=s),i(this,Ft).style.left=`${o}px`,i(this,ri).style.width=`${o}px`,i(this,ai).style.left=`${o}px`,i(this,ni)){let r=[...this.shadowRoot.querySelectorAll(".mark")],a=i(this,Ft).getBoundingClientRect().x;r.forEach(h=>{h.getBoundingClientRect().x<=a?(h.classList.remove("inactive"),h.classList.add("active")):(h.classList.remove("active"),h.classList.add("inactive"))})}i(this,vo).innerHTML=i(this,z)},Co=new WeakSet,bd=function(e){let o=i(this,Eo,ud),s=e/o;s<=0&&(s=0),s>=1&&(s=1);let r=i(this,z);m(this,z,l(this,Ao,fd).call(this,i(this,J)+(i(this,bt)-i(this,J))*s)),this.setAttribute("aria-valuenow",i(this,z)),r!==i(this,z)&&this.dispatchEvent(new Event("change")),i(this,ni)&&(e=o*this.percent+i(this,Lr,xc)),l(this,di,yr).call(this,{pixels:e})},Ar=new WeakSet,kc=function(e){l(this,Co,bd).call(this,e.clientX-i(this,Lo,gd))},Cr=new WeakSet,Sc=function(){m(this,yo,i(this,Ft).getBoundingClientRect().x-i(this,Lo,gd)+10)},Mr=new WeakSet,Ec=function({distance:e}){l(this,Co,bd).call(this,i(this,yo)+e.x)},Dr=new WeakSet,Lc=function(){this.addEventListener("blur",i(this,So),{signal:i(this,Lt).signal}),document.body.addEventListener("keydown",i(this,ko),{signal:i(this,Lt).signal})},Tr=new WeakSet,Ac=function(){this.removeEventListener("blur",i(this,So)),document.body.removeEventListener("keydown",i(this,ko))},zr=new WeakSet,Cc=function(e){let o=e.key==="ArrowLeft",s=e.key==="ArrowRight",r=e.key==="ArrowDown",a=e.key==="ArrowUp";o||r?this.value=parseFloat(this.value)-i(this,St):(s||a)&&(this.value=parseFloat(this.value)+i(this,St))},g(pd,"styleSheets",vc),pd));var vd=new CSSStyleSheet;vd.replaceSync(`:host {
  position: relative;
  display: block;
  outline: none;
  width: 200px;
  height: 80px;
}

:host > slot {
  display: block;
  font-size: var(--mdw-font-title-size-large);
  font-weight: var(--mdw-font-title-weight-large);
  letter-spacing: var(--mdw-font-title-letter-spacing-large);
  line-height: var(--mdw-font-title-line-height);
  height: 42px;
}

:host(.mdw-has-icon) > slot {
  margin-left: 42px;
}

::slotted(mdw-icon) {
  position: absolute;
  top: 14px;
  left: 0;
}

:host > .control {
  position: relative;
  display: flex;
  align-items: center;
}

:host(.mdw-has-icon) > .control {
  margin-left: 42px;
}

:host([disabled]) > .control {
  pointer-events: none;
  opacity: .38;
}


:host > .control > .mdw-track-active {
  position: absolute;
  display: flex;
  align-items: center;
  left: 33.333%;
  right: 33.333%;
  height: 4px;
  border-radius: 2px;

  background-color: var(--mdw-primary);
}

:host([disabled]) > .control > .mdw-track-active {
  background-color: var(--mdw-on-surface);
}

:host > .control > .mdw-track-inactive {
  position: absolute;
  height: 4px;
  border-radius: 2px;

  background-color: var(--mdw-surface-variant);
}

:host([disabled]) > .control > .mdw-track-inactive {
  background-color: var(--mdw-on-surface-alpha-50);
}

:host > .control > .mdw-track-inactive.mdw-one {
  left: 0;
  width: 33.33%;
}

:host > .control > .mdw-track-inactive.mdw-two {
  left: 66.666%;
  right: 0;
}


:host > .control > .mdw-thumb {
  position: absolute;
  margin-left: -10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  outline: none;

  background-color: var(--mdw-primary);
  box-shadow: var(--mdw-elevation-1);
}

:host > .control > .mdw-thumb.mdw-one {
  left: 33.333%;
}

:host > .control > .mdw-thumb.mdw-two {
  left: 66.666%;
}

:host([disabled]) > .control > .mdw-thumb {
  background-color: var(--mdw-on-surface);
  box-shadow: none;
}

:host > .control > .mdw-thumb::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--mdw-primary);
  opacity: 0;
}

:host > .control > .mdw-thumb:hover::before {
  opacity: var(--mdw-state-layer-opacity-hover);
}

:host > .control > .mdw-thumb:active::before {
  opacity: var(--mdw-state-layer-opacity-pressed);
}

:host > .control > .mdw-thumb:focus::before {
  opacity: var(--mdw-state-layer-opacity-focus);
  outline: none;
}


:host > .control > .mdw-marks {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4px;
  pointer-events: none;
}

:host > .control > .mdw-marks > .mdw-mark {
  width: 4px;
  height: 4px;
  border-radius: 50%;
}

:host > .control > .mdw-marks > .mdw-mark.mdw-active {
  background-color: var(--mdw-on-primary-alpha-38);
}

:host > .control > .mdw-marks > .mdw-mark.mdw-inactive {
  background-color: var(--mdw-on-surface-variant);
}


:host > .control > .mdw-thumb > .mdw-label {
  position: absolute;
  top: -36px;
  left: -4px;
  pointer-events: none;
  width: 28px;
  height: 28px;
  border-radius: 50% 50% 0 50%;
  box-sizing: border-box;
  transform-origin: center;
  transform: rotate(45deg);
  background-color: var(--mdw-primary);
  opacity: 0;
  transition: opacity 100ms;
}

:host > .control > .mdw-thumb > .mdw-label > .mdw-label-text {
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  vertical-align: center;
  transform-origin: center;
  transform: rotate(-45deg);
  font-size: var(--mdw-font-label-size-medium);
  font-weight: var(--mdw-font-label-weight-medium);
  letter-spacing: var(--mdw-font-label-letter-spacing-medium);
  color: var(--mdw-on-primary);
}


:host > .control > .mdw-thumb:hover > .mdw-label,
:host > .control > .mdw-thumb:focus > .mdw-label,
:host > .control > .mdw-thumb:active > .mdw-label {
  opacity: 1;
  transition: opacity 180ms;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,vd];var Mc=vd;var yd,R,j,x,tt,At,qr,Rr,Ct,Pr,Ir,mi,To,zo,ge,fe,ci,hi,mt,ct,$o,_o,Ot,qo,Fr,Ro,yt,Or,Dc,be,Mo,Ed,Ah,et,vt,Po,xd,Io,kd,wi,$r,pi,_r,Nt,li,ve,Do,Fo,Sd,Nr,Tc,Hr,zc,Vr,$c,Yr,_c,jr,qc,Wr,Rc,Br,Pc,Gr,Ic;customElements.define("mdw-slider-range",(yd=class extends p{constructor(){super();n(this,Or);n(this,be);n(this,Ed);n(this,et);n(this,Po);n(this,Io);n(this,wi);n(this,pi);n(this,Nt);n(this,ve);n(this,Fo);n(this,Nr);n(this,Hr);n(this,Vr);n(this,Yr);n(this,jr);n(this,Wr);n(this,Br);n(this,Gr);g(this,"useShadowRoot",!0);n(this,R,0);n(this,j,100);n(this,x,[30,60]);n(this,tt,1);n(this,At,new A(this));n(this,qr,l(this,Vr,$c).bind(this));n(this,Rr,l(this,Hr,zc).bind(this));n(this,Ct,new A(this));n(this,Pr,l(this,jr,qc).bind(this));n(this,Ir,l(this,Yr,_c).bind(this));n(this,mi,l(this,Nr,Tc).bind(this));n(this,To,void 0);n(this,zo,void 0);n(this,ge,void 0);n(this,fe,void 0);n(this,ci,void 0);n(this,hi,void 0);n(this,mt,void 0);n(this,ct,void 0);n(this,$o,void 0);n(this,_o,void 0);n(this,Ot,!1);n(this,qo,l(this,Gr,Ic).bind(this));n(this,Fr,l(this,Wr,Rc).bind(this));n(this,Ro,l(this,Br,Pc).bind(this));n(this,yt,new AbortController);m(this,Ot,this.classList.contains("mdw-discrete")),this.querySelector("mdw-icon")&&this.classList.add("mdw-has-icon")}template(){return`
      <slot></slot>

      <div class="control">
        <div class="mdw-track-inactive mdw-one"></div>
        <div class="mdw-track-inactive mdw-two"></div>
        <div class="mdw-track-active"></div>

        <div class="mdw-marks">
          ${i(this,Ot)?[...new Array(i(this,Or,Dc))].map(e=>'<div class="mdw-mark"></div>').join(`
`):""}
        </div>

        <div class="mdw-thumb mdw-one" tabindex="0">
          <div class="mdw-label"><div class="mdw-label-text"></div></div>
        </div>
        <div class="mdw-thumb mdw-two" tabindex="0">
          <div class="mdw-label"><div class="mdw-label-text"></div></div>
        </div>
      </div>
    `}connectedCallback(){this.setAttribute("role","slider")}afterRender(){this.addEventListener("focus",i(this,Fr),{signal:i(this,yt).signal}),m(this,ge,this.shadowRoot.querySelector(".control")),m(this,fe,this.shadowRoot.querySelector(".mdw-track-active")),m(this,ci,this.shadowRoot.querySelector(".mdw-track-inactive.mdw-one")),m(this,hi,this.shadowRoot.querySelector(".mdw-track-inactive.mdw-two")),m(this,mt,this.shadowRoot.querySelector(".mdw-thumb.mdw-one")),m(this,ct,this.shadowRoot.querySelector(".mdw-thumb.mdw-two")),m(this,$o,this.shadowRoot.querySelector(".mdw-thumb.mdw-one .mdw-label-text")),m(this,_o,this.shadowRoot.querySelector(".mdw-thumb.mdw-two .mdw-label-text")),l(this,wi,$r).call(this,{percent:this.percents[0]}),l(this,pi,_r).call(this,{percent:this.percents[1]}),m(this,At,new A(i(this,mt))),i(this,At).includeMouseEvents=!0,i(this,At).onDrag(i(this,qr)),i(this,At).onStart(i(this,Rr)),i(this,At).enable(),m(this,Ct,new A(i(this,ct))),i(this,Ct).includeMouseEvents=!0,i(this,Ct).onDrag(i(this,Pr)),i(this,Ct).onStart(i(this,Ir)),i(this,Ct).enable(),i(this,ci).addEventListener("click",i(this,mi),{signal:i(this,yt).signal}),i(this,hi).addEventListener("click",i(this,mi),{signal:i(this,yt).signal}),i(this,fe).addEventListener("click",i(this,mi),{signal:i(this,yt).signal})}disconnectedCallback(){i(this,At).destroy(),i(this,Ct).destroy(),i(this,yt).abort()}static get observedAttributes(){return["min","max","value","step"]}attributeChangedCallback(e,o,s){e==="min"&&(this.min=s),e==="max"&&(this.max=s),e==="value"&&(this.value=s),e==="step"&&(this.step=s)}get value(){return`${i(this,x).join(",")}`}set value(e="30,60"){let o=e.split(",");m(this,x,[parseFloat(o[0]||i(this,R)),parseFloat(o[1]||i(this,j))]),l(this,Nt,li).call(this)}get valueArray(){return i(this,x)}set value(e="30,60"){let o=e.split(",");m(this,x,[parseFloat(o[0]||i(this,R)),parseFloat(o[1]||i(this,j))]),l(this,Nt,li).call(this)}get min(){return`${i(this,R)}`}set min(e=0){m(this,R,parseInt(e)),l(this,Nt,li).call(this)}get max(){return`${i(this,j)}`}set max(e=100){m(this,j,parseInt(e)),l(this,Nt,li).call(this)}get step(){return`${i(this,tt)}`}set step(e=1){m(this,tt,parseFloat(e)),l(this,Nt,li).call(this)}get percents(){return[(i(this,x)[0]-i(this,R))/(i(this,j)-i(this,R)),(i(this,x)[1]-i(this,R))/(i(this,j)-i(this,R))]}},R=new WeakMap,j=new WeakMap,x=new WeakMap,tt=new WeakMap,At=new WeakMap,qr=new WeakMap,Rr=new WeakMap,Ct=new WeakMap,Pr=new WeakMap,Ir=new WeakMap,mi=new WeakMap,To=new WeakMap,zo=new WeakMap,ge=new WeakMap,fe=new WeakMap,ci=new WeakMap,hi=new WeakMap,mt=new WeakMap,ct=new WeakMap,$o=new WeakMap,_o=new WeakMap,Ot=new WeakMap,qo=new WeakMap,Fr=new WeakMap,Ro=new WeakMap,yt=new WeakMap,Or=new WeakSet,Dc=function(){return Math.floor((i(this,j)-i(this,R))/i(this,tt))+1},be=new WeakSet,Mo=function(){return i(this,ge).offsetWidth},Ed=new WeakSet,Ah=function(){return i(this,ge).getBoundingClientRect().x-i(this,et,vt)},et=new WeakSet,vt=function(){return i(this,ge).getBoundingClientRect().x},Po=new WeakSet,xd=function(e){let o=i(this,ct).getBoundingClientRect().x-i(this,et,vt);e>=o-10&&(e=o-10);let s=i(this,be,Mo),r=e/s;r<=0&&(r=0),r>=1&&(r=1);let a=i(this,x)[0];i(this,x)[0]=l(this,ve,Do).call(this,i(this,R)+(i(this,j)-i(this,R))*r),a!==i(this,x)[0]&&this.dispatchEvent(new Event("change")),i(this,Ot)&&(e=s*this.percents[0]),l(this,wi,$r).call(this,{pixels:e})},Io=new WeakSet,kd=function(e){let o=i(this,mt).getBoundingClientRect().x-i(this,et,vt);e<=o+30&&(e=o+30);let s=i(this,be,Mo),r=e/s;r<=0&&(r=0),r>=1&&(r=1);let a=i(this,x)[1];i(this,x)[1]=l(this,ve,Do).call(this,i(this,R)+(i(this,j)-i(this,R))*r),a!==i(this,x)[1]&&this.dispatchEvent(new Event("change")),i(this,Ot)&&(e=s*this.percents[1]),l(this,pi,_r).call(this,{pixels:e})},wi=new WeakSet,$r=function({percent:e,pixels:o}){if(e){if(e>1)throw Error("percent must be from 0 - 1");o=i(this,be,Mo)*e}o<0&&(o=0);let s=i(this,ct).getBoundingClientRect().x-i(this,et,vt);o>=s&&(o=s-1),i(this,mt).style.left=`${o}px`,i(this,fe).style.left=`${o}px`,i(this,ci).style.width=`${o}px`,l(this,Fo,Sd).call(this),i(this,$o).innerHTML=i(this,x)[0]},pi=new WeakSet,_r=function({percent:e,pixels:o}){let s=i(this,be,Mo);if(e){if(e>1)throw Error("percent must be from 0 - 1");o=s*e}let r=i(this,mt).getBoundingClientRect().x-i(this,et,vt);o<=r&&(o=r+1),o>s&&(o=s),i(this,ct).style.left=`${o}px`,i(this,fe).style.right=`${s-o}px`,i(this,hi).style.left=`${o}px`,l(this,Fo,Sd).call(this),i(this,_o).innerHTML=i(this,x)[1]},Nt=new WeakSet,li=function(){i(this,x)[0]<i(this,R)&&(i(this,x)[0]=i(this,R)),i(this,x)[0]>=i(this,x)[1]&&(i(this,x)[0]=i(this,x)[1]-i(this,tt)),i(this,x)[0]=l(this,ve,Do).call(this,i(this,x)[0]),i(this,x)[1]=l(this,ve,Do).call(this,i(this,x)[1]),i(this,x)[1]>i(this,j)&&(i(this,x)[1]=i(this,j)),this.rendered&&(l(this,wi,$r).call(this,{percent:this.percents[0]}),l(this,pi,_r).call(this,{percent:this.percents[1]}))},ve=new WeakSet,Do=function(e){let o=1/i(this,tt);return Math.round(e*o)/o},Fo=new WeakSet,Sd=function(){if(!i(this,Ot))return;let e=[...this.shadowRoot.querySelectorAll(".mdw-mark")],o=i(this,mt).getBoundingClientRect().x,s=i(this,ct).getBoundingClientRect().x;e.forEach(r=>{r.getBoundingClientRect().x>=o&&r.getBoundingClientRect().x<=s?(r.classList.remove("mdw-inactive"),r.classList.add("mdw-active")):(r.classList.remove("mdw-active"),r.classList.add("mdw-inactive"))})},Nr=new WeakSet,Tc=function(e){let o=Math.abs(i(this,mt).getBoundingClientRect().x-e.clientX),s=Math.abs(i(this,ct).getBoundingClientRect().x-e.clientX);o<=s?l(this,Po,xd).call(this,e.clientX-i(this,et,vt)):l(this,Io,kd).call(this,e.clientX-i(this,et,vt))},Hr=new WeakSet,zc=function(){m(this,To,i(this,mt).getBoundingClientRect().x-i(this,et,vt)+10)},Vr=new WeakSet,$c=function({distance:e}){l(this,Po,xd).call(this,i(this,To)+e.x)},Yr=new WeakSet,_c=function(){m(this,zo,i(this,ct).getBoundingClientRect().x-i(this,et,vt)+10)},jr=new WeakSet,qc=function({distance:e}){l(this,Io,kd).call(this,i(this,zo)+e.x)},Wr=new WeakSet,Rc=function(){this.addEventListener("blur",i(this,Ro),{signal:i(this,yt).signal}),document.body.addEventListener("keydown",i(this,qo),{signal:i(this,yt).signal})},Br=new WeakSet,Pc=function(){this.removeEventListener("blur",i(this,Ro)),document.body.removeEventListener("keydown",i(this,qo))},Gr=new WeakSet,Ic=function(e){let o=e.key==="ArrowLeft",s=e.key==="ArrowRight",r=e.key==="ArrowDown",a=e.key==="ArrowUp",h=this.shadowRoot.querySelector(":focus").classList.contains("mdw-one"),u=this.value.split(","),b=parseFloat(u[0]||0),f=parseFloat(u[1]||0);o||r?h?b-=i(this,tt):f-=i(this,tt):(s||a)&&(h?b+=i(this,tt):f+=i(this,tt)),this.value=`${b},${f}`},g(yd,"styleSheets",Mc),yd));var Ld=new CSSStyleSheet;Ld.replaceSync(`mdw-snackbar.mdw-panel {
  display: flex;
  flex-direction: row;
  width: 344px;
  height: 48px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: var(--mdw-shape-extra-small);
  box-shadow: var(--mdw-elevation-1);
  background-color: var(--mdw-surface-inverse);

  font-size: var(--mdw-font-body-size-medium);
  font-weight: var(--mdw-font-body-weight-medium);
  line-height: 24px;
  letter-spacing: var(--mdw-font-body-letter-spacing-medium);
  color: var(--mdw-on-surface-inverse);

  padding: 0 16px;

  top: unset;
  left: calc(172px + 16px);
  bottom: -8px;
}

mdw-snackbar.mdw-panel.mdw-line-two {
  height: 68px;
}

mdw-snackbar mdw-button,
mdw-snackbar mdw-icon {
  color: var(--mdw-primary-container);
}

mdw-snackbar .mdw-icon-svg {
  cursor: pointer;
  width: 24px;
  height: 24px;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Ld];var Fc=Ld;y.registerGlobalStyleSheet(Fc);customElements.define("mdw-snackbar",class extends y{constructor(){super(),this.animation="transitionYReverse",this.clickOutsideClose=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","alertdialog")}});var Ch=new class{defaultTime=4e3;#t;#i=[];show(t={message:"",actionLabel:"",closeButton:!0,time:this.defaultTime}){if(!t.message)throw Error("Message required");t.closeButton===void 0&&(t.closeButton=!0);let e=document.createElement("mdw-snackbar");return t.twoLine&&e.classList.add("mdw-line-two"),e.innerHTML=`
      <div class="mdw-text">${t.message}</div>
      ${t.actionLabel?`<mdw-button onclick="mdwSnackbar.dismiss('action')">${t.actionLabel}</mdw-button>`:""}
      ${t.closeButton?`<div class="mdw-icon-svg" onclick="mdwSnackbar.dismiss('close')">${$s}</div>`:""}
    `,document.body.insertAdjacentElement("beforeend",e),new Promise(o=>{this.#i.push({snackbar:e,resolve:o,time:t.time||this.defaultTime}),this.#e()})}dismiss(){this.#t&&this.#t.snackbar.close()}#e(){if(this.#t||(this.#t=this.#i.shift(),!this.#t))return;let t=setTimeout(()=>{this.#t.snackbar.close()},this.#t.time);this.#t.snackbar.show();let e=async()=>{this.#t.snackbar.removeEventListener("close",e),clearTimeout(t),this.#t.resolve();let o=this.#t.snackbar;w.animationendAsync(o).then(()=>{o.remove()}),this.#t=void 0,await w.wait(500),this.#e()};this.#t.snackbar.addEventListener("close",e)}};window.mdwSnackbar=Ch;var Ad=new CSSStyleSheet;Ad.replaceSync(`:host {
  position: relative;
  display: inline-flex;
  padding: 1px 0;
  outline: none;
  align-items: center;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

:host > .track {
  position: relative;
  width: 52px;
  height: 32px;
  cursor: pointer;
  border-radius: var(--mdw-shape-large);
  box-sizing: border-box;
  border: 2px solid;

  background-color: var(--mdw-surface-variant);
  border-color: var(--mdw-outline);
}

:host(.mdw-checked) > .track {
  background-color: var(--mdw-primary);
  border-color: var(--mdw-primary);
  user-select: none;
}

:host > .track > .thumb {
  position: relative;
  left: 0;
  width: 16px;
  height: 16px;
  margin: 6px;
  border-radius: 50%;
  box-sizing: border-box;

  background-color: var(--mdw-outline);

  transition:
    left 300ms,
    width 200ms,
    height 200ms,
    margin 200ms,
    background-color 200ms,
    border-color 200ms;
}

:host(:active.mdw-checked) > .track > .thumb {
  width: 28px;
  height: 28px;
  margin: 0;
}

:host(.mdw-checked) > .track > .thumb {
  left: 20px;
  width: 24px;
  height: 24px;
  margin: 2px;
  background-color: var(--mdw-on-primary);
}

:host(:active) > .track > .thumb {
  width: 24px;
  height: 24px;
  margin: 2px;
}


:host > .track > .thumb > svg {
  opacity: 0;
  transition: opacity 200ms;
}

:host(.mdw-icon.mdw-checked) > .track > .thumb > svg {
  opacity: 1;
}

:host > .track > .thumb > svg > path {
  stroke-width: 1.1333333333px;
  stroke: var(--mdw-on-primary-container);
}

:host > slot {
  display: block;
  flex: 1;

  font-size: var(--mdw-font-label-size-large);
  font-weight: var(--mdw-font-label-weight-large);
  line-height: var(--mdw-font-label-line-height-large);
  letter-spacing: var(--mdw-font-label-letter-spacing-large);
}

:host(.mdw-label-right) > slot {
  order: 2;
  flex: 1;
  text-align: right;
}


/* --- disabled --- */

:host([disabled]) {
  pointer-events: none;
  cursor: unset;
}

:host([disabled]) > .track {
  background-color: var(--mdw-surface-variant-alpha-12);
  border-color: var(--mdw-on-surface-alpha-12);
}

:host([disabled].mdw-checked) > .track {
  background-color: var(--mdw-on-surface-alpha-12);
  border-color: var(--mdw-on-surface-alpha-0);
}

:host([disabled]) > .track > .thumb {
  background-color: var(--mdw-on-surface-alpha-38);
}

:host([disabled].mdw-checked) > .track > .thumb {
  background-color: var(--mdw-surface);
}

:host(.mdw-icon.mdw-checked[disabled]) > .track > .thumb > svg {
  opacity: .38;
}



:host > .track > .thumb::before {
  position: absolute;
  content: "";
  left: -12px;
  top: -12px;
  bottom: -12px;
  right: -12px;
  border-radius: inherit;
  background-color: var(--mdw-primary);
  opacity: 0;
  transition: opacity 100ms;
  pointer-events: none;
}

:host > .track::after {
  position: absolute;
  content: "";
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  border-radius: inherit;
  background-color: var(--mdw-on-surface);
  opacity: 0;
  transition: opacity 100ms;
  pointer-events: none;
}

:host(:not(.mdw-checked):focus) > .track > .thumb::before {
  opacity: var(--mdw-state-layer-opacity-focus);
  transition: opacity 180ms;
}

:host(:not(.mdw-checked):focus) > .track > .thumb {
  background-color: var(--mdw-on-surface-variant);
}

:host(.mdw-checked:focus) > .track > .thumb {
  background-color: var(--mdw-primary-container);
}

:host(.mdw-checked:focus) > .track {
  background-color: var(--mdw-primary);
}

:host(:not(.mdw-checked):focus) > .track::after {
  opacity: var(--mdw-state-layer-opacity-focus);
}

/* hover state layers. Media needed to prevent hover on mobile */
@media (hover: hover) {
  :host(:not(.mdw-checked):hover) > .track > .thumb::before {
    opacity: var(--mdw-state-layer-opacity-focus);
    transition: opacity 180ms;
  }

  :host(:not(.mdw-checked):hover) > .track > .thumb {
    background-color: var(--mdw-on-surface-variant);
  }

  :host(.mdw-checked:hover) > .track > .thumb {
    background-color: var(--mdw-primary-container);
  }

  :host(.mdw-checked:hover) > .track {
    background-color: var(--mdw-primary);
  }

  :host(:not(.mdw-checked):hover) > .track::after {
    opacity: var(--mdw-state-layer-opacity-hover);
    background-color: var(--mdw-on-surface);
  }
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Ad];var Nc=Ad;var Cd,ui,Ht,No,Ho,Vo,gi,fi,Mt,Zr,Ur,ye,Oo,Yo,Md,Xr,Hc,Kr,Vc,Qr,Yc,Jr,jc,ta,Wc;customElements.define("mdw-switch",(Cd=class extends p{constructor(){super();n(this,ye);n(this,Yo);n(this,Xr);n(this,Kr);n(this,Qr);n(this,Jr);n(this,ta);g(this,"useShadowRoot",!0);n(this,ui,!1);n(this,Ht,!1);n(this,No,"on");n(this,Ho,l(this,Yo,Md).bind(this));n(this,Vo,l(this,Xr,Hc).bind(this));n(this,gi,l(this,Kr,Vc).bind(this));n(this,fi,l(this,Qr,Yc).bind(this));n(this,Mt,void 0);n(this,Zr,l(this,Jr,jc).bind(this));n(this,Ur,l(this,ta,Wc).bind(this))}template(){return`
      <slot></slot>
      <div class="track">
        <div class="thumb">
          <svg version="1.1" focusable="false" viewBox="0 0 16 16">
            <path fill="none" stroke="white" d="M5,8 7.7,10 12,5.5" ></path>
          </svg>
        </div>
      </div>
    `}connectedCallback(){if(this.tabIndex=0,this.setAttribute("role","checkbox"),this.setAttribute("aria-label",w.getTextFromNode(this)),this.addEventListener("focus",i(this,Vo)),!this.hasAttribute("aria-label")){let e=w.getTextFromNode(this);e&&this.setAttribute("aria-label",e)}}disconnectedCallback(){this.shadowRoot.querySelector(".track").removeEventListener("click",i(this,Ho)),this.removeEventListener("focus",i(this,Vo)),this.removeEventListener("blur",i(this,gi)),this.removeEventListener("keydown",i(this,fi)),i(this,Mt).destroy()}afterRender(){this.shadowRoot.querySelector(".track").addEventListener("click",i(this,Ho)),m(this,Mt,new A(i(this,ye,Oo))),i(this,Mt).includeMouseEvents=!0,i(this,Mt).onDrag(i(this,Zr)),i(this,Mt).onEnd(i(this,Ur)),i(this,Mt).enable()}static get observedAttributes(){return["checked","disabled","value"]}attributeChangedCallback(e,o,s){e==="checked"?this.checked=s!==null:e==="disabled"?this.disabled=s!==null:this[e]=s}get checked(){return i(this,Ht)}set checked(e){m(this,Ht,!!e),this.classList.toggle("mdw-checked",i(this,Ht)),this.setAttribute("aria-checked",i(this,Ht).toString()||"false")}get disabled(){return i(this,ui)}set disabled(e){m(this,ui,!!e),this.toggleAttribute("disabled",i(this,ui))}get value(){return i(this,No)}set value(e){m(this,No,e)}},ui=new WeakMap,Ht=new WeakMap,No=new WeakMap,Ho=new WeakMap,Vo=new WeakMap,gi=new WeakMap,fi=new WeakMap,Mt=new WeakMap,Zr=new WeakMap,Ur=new WeakMap,ye=new WeakSet,Oo=function(){return this.shadowRoot.querySelector(".thumb")},Yo=new WeakSet,Md=function(){this.checked=!i(this,Ht),this.dispatchEvent(new Event("change"))},Xr=new WeakSet,Hc=function(){this.addEventListener("blur",i(this,gi)),this.addEventListener("keydown",i(this,fi))},Kr=new WeakSet,Vc=function(){this.removeEventListener("blur",i(this,gi)),this.removeEventListener("keydown",i(this,fi))},Qr=new WeakSet,Yc=function(e){(e.code==="Space"||e.code==="Enter")&&(l(this,Yo,Md).call(this),e.preventDefault())},Jr=new WeakSet,jc=function({distance:e}){let o=e.x;o<0&&(o=0),o>20&&(o=20),i(this,ye,Oo).style.left=`${o}px`},ta=new WeakSet,Wc=function(){parseInt(i(this,ye,Oo).style.left.replace("px",""))>10?this.checked=!1:this.checked=!0,i(this,ye,Oo).style.left=""},g(Cd,"styleSheets",Nc),Cd));var Dd=new CSSStyleSheet;Dd.replaceSync(`mdw-tab-bar {
  position: relative;
  display: flex;
  justify-content: space-around;
  height: 48px;

  background-color: var(--mdw-surface);
  color: var(--mdw-on-surface-variant);

  font-size: var(--mdw-font-title-size-small);
  font-weight: var(--mdw-font-title-weight-small);
  line-height: var(--mdw-font-title-line-height-small);
  letter-spacing: var(--mdw-font-title-letter-spacing-small);

  pointer-events: none;
}

mdw-tab-bar.mdw-line-two {
  height: 64px;
}


mdw-tab-bar .mdw-tab-underline {
  position: absolute;
  bottom: 0;
  border-radius: 3px 3px 0 0;
  border-top: 3px solid var(--mdw-primary);
  pointer-events: none;

  transition: left 220ms, width 220ms;
}

mdw-tab-bar.mdw-tab-secondary .mdw-tab-underline {
  border-top: 2px solid var(--mdw-primary);
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Dd];var Bc=Dd;p.registerGlobalStyleSheet(Bc);customElements.define("mdw-tab-bar",class extends p{#t=document.createElement("div");#i=this.#l.bind(this);#e=this.classList.contains("mdw-tab-secondary");#o;constructor(){super(),this.#t.classList.add("mdw-tab-underline"),this.insertAdjacentElement("beforeend",this.#t),this.#c()}connectedCallback(){this.addEventListener("click",this.#i)}disconnectedCallback(){this.removeEventListener("click",this.#i)}static get observedAttributes(){return["value"]}attributeChangedCallback(t,e,o){this[t]=o}get value(){let t=this.querySelector("mdw-tab[active]");return t&&t.value}set value(t){let e=this.querySelector("mdw-tab[active]");e&&(e.active=!1);let o=this.querySelector(`mdw-tab[value="${t}"]`);o&&(o.active=!0)}update(){this.#s();let t=this.value;t!==this.#o&&this.dispatchEvent(new Event("change")),this.#o=t}#s(){let t=this.querySelector("mdw-tab[active]");if(!t)return;let e=this.getBoundingClientRect(),o=t.getBoundingClientRect(),s=w.getTextWidth(t),r=t.querySelector("mdw-icon"),a=r?r.offsetWidth:s+3,h=o.x-e.x+o.width/2-a/2;this.#e&&(a=o.width,h=o.x-e.x);let u=parseInt(Math.abs(h-parseInt(getComputedStyle(this.#t).left.replace("px",""))));this.#t.style.transitionDuration=`${120+u*.25}ms`,this.#t.style.left=`${h}px`,this.#t.style.width=`${a}px`}#l(t){this.value=t.target.value}#c(){[...this.querySelectorAll("mdw-tab")].find(e=>!(!e.querySelector("mdw-icon")||w.getTextFromNode(e)===""))&&this.classList.add("mdw-line-two")}});var Td=new CSSStyleSheet;Td.replaceSync(`mdw-tab {
  position: relative;
  flex: 1;
  pointer-events: all;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 48px;
  user-select: none;
  cursor: pointer;
  background-color: none;
  outline: none;

  transition: color 120ms, background-color 220ms;
}

/* hover state layers. Media needed to prevent hover on mobile */
@media (hover: hover) {
  mdw-tab:hover {
    background-color: var(--mdw-on-surface-alpha-8);
  }
}

mdw-tab:focus {
  background-color: var(--mdw-on-surface-alpha-12);
}

mdw-tab[active] {
  color: var(--mdw-primary);
}

mdw-tab .mdw-label,
mdw-tab mdw-icon {
  pointer-events: none;
}

mdw-tabs .mdw-underline {
  position: absolute;
  bottom: 0;
  border-radius: 3px 3px 0 0;
  border-top: 3px solid var(--mdw-primary);
  pointer-events: none;

  transition: left 220ms, width 220ms;
}


/* --- Ripple --- */

.mdw-ripple {
  overflow: hidden;
  border-radius: inherit;
  transform: translateZ(0);
  /* fixes bug on ios safari */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
}

.mdw-ripple > .mdw-ripple-element {
  background-color: var(--mdw-primary-alpha-16);
  border-radius: 50%;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Td];var Gc=Td;p.registerGlobalStyleSheet(Gc);customElements.define("mdw-tab",class extends p{#t=!1;#i="";#e=this.#l.bind(this);#o=this.#c.bind(this);#s=this.#n.bind(this);constructor(){super()}connectedCallback(){if(this.tabIndex=0,this.addEventListener("focus",this.#e),!this.hasAttribute("aria-label")){let t=w.getTextFromNode(this);this.setAttribute("aria-label",t||"tab")}}disconnectedCallback(){this.removeEventListener("focus",this.#e),this.removeEventListener("blur",this.#o),this.removeEventListener("keydown",this.#s)}static get observedAttributes(){return["active","value"]}attributeChangedCallback(t,e,o){t==="active"?this.active=o!==null:this[t]=o}get active(){return this.#t}set active(t){this.#t=!!t,this.toggleAttribute("active",this.#t),this.#t===!0&&this.parentElement.update()}get value(){return this.#i}set value(t){this.#i=t}#l(){this.addEventListener("blur",this.#o),this.addEventListener("keydown",this.#s)}#c(){this.removeEventListener("blur",this.#o),this.removeEventListener("keydown",this.#s)}#n(t){(t.code==="Space"||t.code==="Enter")&&(this.click(),t.preventDefault())}});var zd=new CSSStyleSheet;zd.replaceSync(`mdw-tab-content {
  position: relative;
  display: flex;
  width: 100%;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,zd];var Zc=zd;p.registerGlobalStyleSheet(Zc);customElements.define("mdw-tab-content",class extends p{#t;#i=this.#e.bind(this);constructor(){if(super(),this.#t=document.querySelector(this.getAttribute("bar")),!this.#t||this.#t.nodeName!=="MDW-TAB-BAR")throw Error('mdw-tab-content requires the "bar" attribute, containing a valid css selector to a mdw-tab-bar')}connectedCallback(){this.#t.addEventListener("change",this.#i),w.nextAnimationFrameAsync().then(()=>{let t=this.querySelector(`mdw-tab-panel[value="${this.#t.value}"]`);t&&(t.active=!0)})}disconnectedCallback(){this.#t.removeEventListener("change",this.#i)}#e(){let t=this.querySelector("mdw-tab-panel[active]"),e=this.querySelector(`mdw-tab-panel[value="${this.#t.value}"]`);e?(t&&(t.active=!1),e.active=!0):console.warn(`No mdw-tab-panel found for value: "${this.#t.value}". Current active panel will stay active`)}});var $d=new CSSStyleSheet;$d.replaceSync(`mdw-tab-panel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
  height: 0;
  overflow: hidden;
  transition: opacity 420ms;
}

mdw-tab-panel[active] {
  opacity: 1;
  height: unset;
  overflow: unset;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,$d];var Uc=$d;p.registerGlobalStyleSheet(Uc);customElements.define("mdw-tab-panel",class extends p{#t=!1;#i="";constructor(){super()}static get observedAttributes(){return["active","value"]}attributeChangedCallback(t,e,o){t==="active"?this.active=o!==null:this[t]=o}get active(){return this.#t}set active(t){this.#t=!!t,this.toggleAttribute("active",this.#t)}get value(){return this.#i}set value(t){this.#i=t}});var _d=new CSSStyleSheet;_d.replaceSync(`mdw-time-picker.mdw-panel {
  --mdw-time-selector-selector-degrees: 0;

  width: 328px;
  height: 538px;
  max-height: 538px;
  padding: 24px;
  padding-bottom: 0px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: var(--mdw-shape-large);
  background-color: var(--mdw-surface);
  box-shadow: var(--mdw-elevation-3);
}

mdw-time-picker.mdw-panel.mdw-input-view {
  --mdw-time-selector-selector-degrees: 0;

  height: 248px;
  max-height: 248px;
}

mdw-time-picker.mdw-panel::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  z-index: -1;
  background-color: var(--mdw-elevation-tint-3);
}

mdw-time-picker .mdw-headline {
  font-size: var(--mdw-font-label-size-medium);
  font-weight: var(--mdw-font-label-weight-medium);
  line-height: var(--mdw-font-label-line-height-medium);
  letter-spacing: var(--mdw-font-label-letter-spacing-medium);
  color: var(--mdw-on-surface-variant);
}


mdw-time-picker .mdw-time-container {
  display: flex;
  margin-top: 24px;
  margin-bottom: 36px;
}

mdw-time-picker[hour-24] .mdw-time-container {
  margin-left: 28px;
}


mdw-time-picker .mdw-time-container .mdw-time-hour,
mdw-time-picker .mdw-time-container .mdw-time-minute {
  font-size: var(--mdw-font-display-size-large);
  font-weight: var(--mdw-font-display-weight-large);
  line-height: var(--mdw-font-display-line-height-large);
  line-height: 80px;
  letter-spacing: var(--mdw-font-display-letter-spacing-large);
  color: var(--mdw-on-surface);
  background-color: var(--mdw-surface-variant);
  border-radius: var(--mdw-shape-small);
  outline: none;
  border: none;
  width: 98px;
  text-align: center;
  cursor: pointer;
}

mdw-time-picker .mdw-time-container .mdw-time-hour[selected],
mdw-time-picker .mdw-time-container .mdw-time-minute[selected] {
  color: var(--mdw-on-primary-container);
  background-color: var(--mdw-primary-container);
}


mdw-time-picker .mdw-time-container .mdw-time-separator {
  font-size: var(--mdw-font-display-size-large);
  font-weight: var(--mdw-font-display-weight-large);
  line-height: var(--mdw-font-display-line-height-large);
  letter-spacing: var(--mdw-font-display-letter-spacing-large);
  color: var(--mdw-on-surface);
  width: 24px;
  text-align: center;
}

mdw-time-picker .mdw-time-container .mdw-meridiem-container {
  height: 80px;
  width: 52px;
  border-radius: var(--mdw-shape-small);
  border: 1px solid var(--mdw-outline);
  box-sizing: border-box;
  margin-left: 12px;
}

mdw-time-picker .mdw-time-container .mdw-meridiem-container .mdw-am,
mdw-time-picker .mdw-time-container .mdw-meridiem-container .mdw-pm {
  font-size: var(--mdw-font-title-size-medium);
  font-weight: var(--mdw-font-title-weight-medium);
  line-height: 39px;
  letter-spacing: var(--mdw-font-title-letter-spacing-medium);
  color: var(--mdw-on-surface-variant);
  text-align: center;
  cursor: pointer;
}

mdw-time-picker .mdw-time-container .mdw-meridiem-container .mdw-am {
  border-bottom: 1px solid var(--mdw-outline);
  box-sizing: border-box;
  border-radius: var(--mdw-shape-small) var(--mdw-shape-small) 0 0;
}

mdw-time-picker .mdw-time-container .mdw-meridiem-container .mdw-pm {
  line-height: 38px;
  border-radius: 0 0 var(--mdw-shape-small) var(--mdw-shape-small);
}

mdw-time-picker .mdw-time-container .mdw-meridiem-container .mdw-am[selected],
mdw-time-picker .mdw-time-container .mdw-meridiem-container .mdw-pm[selected] {
  color: var(--mdw-on-tertiary-container);
  background-color: var(--mdw-tertiary-container);
}

mdw-time-picker .mdw-dial-container {
  display: flex;
  justify-content: center;
  align-self: center;
  height: 256px;
  width: 256px;
  border-radius: 50%;
  background-color: var(--mdw-surface-variant);
}

body.mdw-mobile mdw-time-picker.mdw-input-view .mdw-dial-container {
  display: none;
}

mdw-time-picker .mdw-dial-container .mdw-dial-hour,
mdw-time-picker .mdw-dial-container .mdw-dial-minute {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 18px;
  margin-left: -24px;
}

mdw-time-picker.mdw-minute-view .mdw-dial-hour {
  display: none;
}

mdw-time-picker:not(.mdw-minute-view) .mdw-dial-minute {
  display: none;
}

mdw-time-picker:not([hour-24]) .mdw-dial-hour-24 {
  display: none;
}

mdw-time-picker .mdw-dial-container .mdw-dial-hour-meridiem .mdw-dial-label,
mdw-time-picker .mdw-dial-container .mdw-dial-hour-24 .mdw-dial-label,
mdw-time-picker .mdw-dial-container .mdw-dial-minute .mdw-dial-label {
  position: absolute;
  display: flex;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: var(--mdw-font-label-size-large);
  font-weight: var(--mdw-font-label-weight-large);
  line-height: var(--mdw-font-label-line-height-large);
  letter-spacing: var(--mdw-font-label-letter-spacing-large);
  color: var(--mdw-on-surface);
  z-index: 1;
  user-select: none;
  cursor: pointer;
}

mdw-time-picker .mdw-dial-container .mdw-dial-minute .mdw-dial-label {
  width: 6px;
  height: 6px;
  margin-left: 20px;
  margin-top: 20px;
  pointer-events: none;
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="0"] {
  transform: rotate(-90deg) translate(102px) rotate(90deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="6"] {
  transform: rotate(-84deg) translate(102px) rotate(84deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="12"] {
  transform: rotate(-78deg) translate(102px) rotate(78deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="18"] {
  transform: rotate(-72deg) translate(102px) rotate(72deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="24"] {
  transform: rotate(-66deg) translate(102px) rotate(66deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="30"] {
  transform: rotate(-60deg) translate(102px) rotate(60deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="36"] {
  transform: rotate(-54deg) translate(102px) rotate(54deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="42"] {
  transform: rotate(-48deg) translate(102px) rotate(48deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="48"] {
  transform: rotate(-42deg) translate(102px) rotate(42deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="54"] {
  transform: rotate(-36deg) translate(102px) rotate(36deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="60"] {
  transform: rotate(-30deg) translate(102px) rotate(30deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="66"] {
  transform: rotate(-24deg) translate(102px) rotate(24deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="72"] {
  transform: rotate(-18deg) translate(102px) rotate(18deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="78"] {
  transform: rotate(-12deg) translate(102px) rotate(12deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="84"] {
  transform: rotate(-6deg) translate(102px) rotate(6deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="90"] {
  transform: rotate(0deg) translate(102px) rotate(0deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="96"] {
  transform: rotate(6deg) translate(102px) rotate(-6deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="102"] {
  transform: rotate(12deg) translate(102px) rotate(-12deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="108"] {
  transform: rotate(18deg) translate(102px) rotate(-18deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="114"] {
  transform: rotate(24deg) translate(102px) rotate(-24deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="120"] {
  transform: rotate(30deg) translate(102px) rotate(-30deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="126"] {
  transform: rotate(36deg) translate(102px) rotate(-36deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="132"] {
  transform: rotate(42deg) translate(102px) rotate(-42deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="138"] {
  transform: rotate(48deg) translate(102px) rotate(-48deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="144"] {
  transform: rotate(54deg) translate(102px) rotate(-54deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="150"] {
  transform: rotate(60deg) translate(102px) rotate(-60deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="156"] {
  transform: rotate(66deg) translate(102px) rotate(-66deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="162"] {
  transform: rotate(72deg) translate(102px) rotate(-72deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="168"] {
  transform: rotate(78deg) translate(102px) rotate(-78deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="174"] {
  transform: rotate(84deg) translate(102px) rotate(-84deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="180"] {
  transform: rotate(90deg) translate(102px) rotate(-90deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="186"] {
  transform: rotate(96deg) translate(102px) rotate(-96deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="192"] {
  transform: rotate(102deg) translate(102px) rotate(-102deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="198"] {
  transform: rotate(108deg) translate(102px) rotate(-108deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="204"] {
  transform: rotate(114deg) translate(102px) rotate(-114deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="210"] {
  transform: rotate(120deg) translate(102px) rotate(-120deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="216"] {
  transform: rotate(126deg) translate(102px) rotate(-126deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="222"] {
  transform: rotate(132deg) translate(102px) rotate(-132deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="228"] {
  transform: rotate(138deg) translate(102px) rotate(-138deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="234"] {
  transform: rotate(144deg) translate(102px) rotate(-144deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="240"] {
  transform: rotate(150deg) translate(102px) rotate(-150deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="246"] {
  transform: rotate(156deg) translate(102px) rotate(-156deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="252"] {
  transform: rotate(162deg) translate(102px) rotate(-162deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="258"] {
  transform: rotate(168deg) translate(102px) rotate(-168deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="264"] {
  transform: rotate(174deg) translate(102px) rotate(-174deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="270"] {
  transform: rotate(180deg) translate(102px) rotate(-180deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="276"] {
  transform: rotate(186deg) translate(102px) rotate(-186deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="282"] {
  transform: rotate(192deg) translate(102px) rotate(-192deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="288"] {
  transform: rotate(198deg) translate(102px) rotate(-198deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="294"] {
  transform: rotate(204deg) translate(102px) rotate(-204deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="300"] {
  transform: rotate(210deg) translate(102px) rotate(-210deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="306"] {
  transform: rotate(216deg) translate(102px) rotate(-216deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="312"] {
  transform: rotate(222deg) translate(102px) rotate(-222deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="318"] {
  transform: rotate(228deg) translate(102px) rotate(-228deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="324"] {
  transform: rotate(234deg) translate(102px) rotate(-234deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="330"] {
  transform: rotate(240deg) translate(102px) rotate(-240deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="336"] {
  transform: rotate(246deg) translate(102px) rotate(-246deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="342"] {
  transform: rotate(252deg) translate(102px) rotate(-252deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="348"] {
  transform: rotate(258deg) translate(102px) rotate(-258deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="354"] {
  transform: rotate(264deg) translate(102px) rotate(-264deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[degree="360"] {
  transform: rotate(270deg) translate(102px) rotate(-270deg);
}


mdw-time-picker .mdw-dial-container .mdw-dial-hour-24 .mdw-dial-label[degree="0"] {
  transform: rotate(-90deg) translate(68px) rotate(90deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-hour-24 .mdw-dial-label[degree="30"] {
  transform: rotate(-60deg) translate(68px) rotate(60deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-hour-24 .mdw-dial-label[degree="60"] {
  transform: rotate(-30deg) translate(68px) rotate(30deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-hour-24 .mdw-dial-label[degree="90"] {
  transform: rotate(0deg) translate(68px) rotate(0deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-hour-24 .mdw-dial-label[degree="120"] {
  transform: rotate(30deg) translate(68px) rotate(-30deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-hour-24 .mdw-dial-label[degree="150"] {
  transform: rotate(60deg) translate(68px) rotate(-60deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-hour-24 .mdw-dial-label[degree="180"] {
  transform: rotate(90deg) translate(68px) rotate(-90deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-hour-24 .mdw-dial-label[degree="210"] {
  transform: rotate(120deg) translate(68px) rotate(-120deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-hour-24 .mdw-dial-label[degree="240"] {
  transform: rotate(150deg) translate(68px) rotate(-150deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-hour-24 .mdw-dial-label[degree="270"] {
  transform: rotate(180deg) translate(68px) rotate(-180deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-hour-24 .mdw-dial-label[degree="300"] {
  transform: rotate(210deg) translate(68px) rotate(-210deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-hour-24 .mdw-dial-label[degree="330"] {
  transform: rotate(240deg) translate(68px) rotate(-240deg);
}

mdw-time-picker .mdw-dial-container .mdw-dial-label[selected] {
  color: var(--mdw-on-primary);
  pointer-events: none;
}



mdw-time-picker .mdw-dial-container .mdw-selector-container {
  position: relative;
  align-self: center;

  transform: rotate(var(--mdw-time-selector-selector-degrees));
}

mdw-time-picker .mdw-dial-container .mdw-selector-center {
  position: absolute;
  width: 8px;
  height: 8px;
  margin-left: -4px;
  margin-top: -4px;
  border-radius: 50%;
  background-color: var(--mdw-primary);
  pointer-events: none;
}

mdw-time-picker .mdw-dial-container .mdw-selector-line {
  position: absolute;
  top: -90px;
  width: 2px;
  margin-left: -1px;
  height: 90px;
  background-color: var(--mdw-primary);
  pointer-events: none;
}

mdw-time-picker .mdw-dial-container .mdw-selector {
  position: absolute;
  width: 48px;
  height: 48px;
  margin-left: -24px;
  margin-top: -126px;
  border-radius: 50%;
  background-color: var(--mdw-primary);
  cursor: pointer;
}

mdw-time-picker .mdw-dial-container .mdw-selector.mdw-hour-24 {
  margin-top: -92px;
}

mdw-time-picker .mdw-dial-container .mdw-selector.mdw-minute-secondary {
  width: 12px;
  height: 12px;
  margin-left: -6px;
  margin-top: -96px;
}

mdw-time-picker .mdw-actions {
  display: flex;
  align-items: center;
  margin-top: 32px;
}

mdw-time-picker.mdw-input-view .mdw-actions {
  margin-top: 0;
}


mdw-time-picker .mdw-actions mdw-button .mdw-svg-icon {
  position: absolute;
  top: 0;
  left: 9px;
  margin-top: 8px;
  height: 24px;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,_d];var Xc=_d;y.registerGlobalStyleSheet(Xc);customElements.define("mdw-time-picker",class extends y{useTemplate=!1;#t;#i;#e="";#o="";#s;#l;#c;#n;#a;#d;#m=[];#r=[];#w=this.#X.bind(this);#u=this.#K.bind(this);#p=this.#Q.bind(this);#h=this.#J.bind(this);#g=this.#tt.bind(this);#f=this.#et.bind(this);#b=this.#it.bind(this);#v=this.#ot.bind(this);#y=this.#G.bind(this);#x=this.#rt.bind(this);#k=this.#at.bind(this);#L=this.#lt.bind(this);#A=this.#mt.bind(this);#D=this.#dt.bind(this);#C=this.#st.bind(this);#T=this.#nt.bind(this);#z=this.#ct.bind(this);#R=this.#ht.bind(this);#_=this.#wt.bind(this);#S=new AbortController;#E;constructor(){if(super(),this.#t=this.parentNode,this.#t.nodeName!=="MDW-TEXTFIELD")throw Error("mdw-date-picker must be a child of mdw-textfield");this.#i=this.#t.querySelector("input"),this.#t.classList.add("mdw-has-time-picker"),v.isMobile?(this.scrim=!0,this.clickOutsideClose=!1):(this.animation="scale",this.scrim=!1,this.clickOutsideClose=!0,this.target=this.#t),this.addClickOutsideCloseIgnore(this.#t),this.#W(),this.#U()}afterRender(){this.#i.addEventListener("focus",this.#w,{signal:this.#S.signal}),v.isMobile&&this.#t.addEventListener("click",this.#u,{signal:this.#S.signal}),this.addEventListener("open",this.#p,{signal:this.#S.signal})}disconnectedCallback(){super.disconnectedCallback(),this.#S.abort(),this.#E&&this.#E.abort()}get value(){return this.#i.value}set value(t){this.#i.value=t}get min(){return this.#i.min}get max(){return this.#i.max}get step(){return this.#i.step}get#M(){return Math.max(1,Math.floor(parseInt(this.step||1)/3600))}get#$(){let t=Math.max(1,Math.floor(parseInt(this.step||1)/60));return t>30?-1:t}get#I(){return this.classList.contains("mdw-input-view")?"input":this.classList.contains("mdw-minute-view")?"minute":"hour"}get#P(){return this.querySelector(".mdw-selector")}get#q(){return this.hasAttribute("hour-24")}template(){let t=this.#O(this.#e);return`
      <div class="mdw-headline">Select time</div>

      <div class="mdw-time-container">
        <input class="mdw-time-hour" readonly type="number" step="${this.#M}" min="${this.#q?"0":"1"}" max="${this.#q?"23":"12"}" value="${t.paddedHour}" selected>
        <div class="mdw-time-separator">:</div>
        <input class="mdw-time-minute" readonly type="number" step="${this.#$}" min="0" max="59" value="${t.paddedMinute}" selected>

        ${this.#q?"":`
          <div class="mdw-meridiem-container">
            <div class="mdw-am" ${t.meridiem==="AM"?"selected":""}>AM</div>
            <div class="mdw-pm" ${t.meridiem==="PM"?"selected":""}>PM</div>
          </div>
        `}
      </div>
    
      <div class="mdw-dial-container">
        <div class="mdw-dial-hour">${this.#Y()}</div>
        <div class="mdw-dial-minute">${this.#j()}</div>

        <div class="mdw-selector-container">
          <div class="mdw-selector-center"></div>
          <div class="mdw-selector-line"></div>
          <div class="mdw-selector"></div>
        </div>
      </div>

      <div class="mdw-actions">
        ${v.isMobile?`
          <mdw-button class="mdw-keyboard mdw-icon-toggle-button">
            <div class="mdw-svg-icon" value="off">${Ml}</div>
            <div class="mdw-svg-icon" value="on">${Dl}</div>
          </mdw-button>
        `:""}
        <span style="flex: 1"></span>
        <mdw-button class="mdw-cancel">cancel</mdw-button>
        <mdw-button class="mdw-ok">ok</mdw-button>
      </div>
    `}#Y(){let t=this.#O(this.#e);return`
      <div class="mdw-dial-hour-meridiem">
        ${this.#m.filter(e=>!e.is24).map(e=>`<div class="mdw-dial-label" hour="${e.hour}" degree="${e.theta}" ${t.hour===e.hour?"selected":""}>${e.paddedHour}</div>`).join(`
`)}
      </div>
      
      ${this.#q?`
        <div class="mdw-dial-hour-24">
          ${this.#m.filter(e=>e.is24).map(e=>`<div class="mdw-dial-label" hour="${e.hour}" degree="${e.theta}" ${t.hour===e.hour?"selected":""}>${e.paddedHour}</div>`).join(`
`)}
        </div>
      `:""}
    `}#j(){let t=this.#B(this.#e);return this.#r.map(e=>`<div class="mdw-dial-label ${e.display?"":"mdw-minute-hidden"}" minute="${e.minute}" degree="${e.theta}" ${t.minute===e.minute?"selected":""}>${e.display?e.paddedMinute:""}</div>`).join(`
`)}#U(){let t=this.#M,e=12/t;this.#m=[...new Array(e)].map((r,a)=>{let h=a===0?12:a*t,u=h<10?`0${h}`:h;return{theta:`${30*(a*t)}`,hour:`${h}`,paddedHour:`${u}`}}),this.#q&&(this.#m=this.#m.concat([...new Array(e)].map((r,a)=>{let h=a===0?"0":a*t+12,u=h<10?`0${h}`:h;return{theta:`${30*(a*t)}`,hour:`${h}`,paddedHour:`${u}`,is24:!0}})));let o=this.#$;if(o===-1)return;let s=60/o;this.#r=[...new Array(s)].map((r,a)=>{let h=a*o,u=h<10?`0${h}`:h;return{theta:`${6*(a*o)}`,minute:`${h}`,paddedMinute:`${u}`,display:h%5===0}})}#W(){if(this.#i.value)this.#e=this.#i.value,this.#o=this.#i.value;else{let t=new Date,e=this.#M,o=Math.round(t.getHours()/e)*e;o<10&&(o=`0${o}`);let s=this.#$,r=s===-1?0:Math.round(t.getMinutes()/s)*s;r<10&&(r=`0${r}`),this.#e=`${o}:${r}`,this.#o=""}}#N({hour:t,minute:e,meridiem:o}){let s=this.#e.split(":"),r=o||(parseInt(s[0])>12?"PM":"AM");t&&(t=parseInt(t),r==="PM"?t!==12&&(t+=12):t===12&&(t=0),s[0]=`${t}`),parseInt(s[0])<10&&(s[0]=`0${s[0]}`),e&&(s[1]=e),this.#e=`${s[0]}:${s[1]}`}#H({hour:t,minute:e}){let o=this.#e.split(":");t=t||parseInt(o[0]),t<10&&(t=`0${t}`),e=e||parseInt(o[1]),e<10&&(e=`0${e}`),this.#e=`${t}:${e}`}#O(t){let e=t.split(":"),o=parseInt(e[0]),s="AM";o>12&&(s="PM",o=o-12),o===0&&(o=12);let r=o<10?`0${o}`:`${o}`,a=parseInt(e[1]),h=a<10?`0${a}`:`${a}`;return{hour:`${o}`,paddedHour:r,minute:a,paddedMinute:h,meridiem:s,formatted:`${r}:${h} ${s}`}}#B(t){let e=t.split(":"),o=parseInt(e[0]),s=o<10?`0${o}`:`${o}`,r=parseInt(e[1]),a=r<10?`0${r}`:`${r}`;return{hour:`${o}`,paddedHour:s,minute:`${r}`,paddedMinute:a,formatted:`${s}:${a}`}}#X(){this.show()}#K(){this.show()}#Q(){this.#E=new AbortController,this.#W();let t=this.#O(this.#e);this.#s=t.hour,this.#c=t.minute,this.#a=t.meridiem,this.#V(!0),this.#F("hour"),this.addEventListener("close",this.#h,{signal:this.#E.signal}),v.isMobile&&(this.#t.removeEventListener("click",this.#u),this.querySelector(".mdw-keyboard").addEventListener("click",this.#z,{signal:this.#E.signal})),this.#i.removeEventListener("focus",this.#w),this.querySelector(".mdw-dial-container").addEventListener("mousedown",this.#b,{signal:this.#E.signal}),this.querySelector(".mdw-dial-container").addEventListener("touchstart",this.#b,{signal:this.#E.signal}),this.#i.addEventListener("input",this.#D,{signal:this.#E.signal}),this.querySelector(".mdw-dial-hour").addEventListener("click",this.#L,{signal:this.#E.signal}),this.querySelector(".mdw-dial-container").addEventListener("click",this.#A,{signal:this.#E.signal}),this.querySelector(".mdw-time-hour").addEventListener("click",this.#C,{signal:this.#E.signal}),this.querySelector(".mdw-time-minute").addEventListener("click",this.#T,{signal:this.#E.signal}),this.querySelector(".mdw-ok").addEventListener("click",this.#g,{signal:this.#E.signal}),this.querySelector(".mdw-cancel").addEventListener("click",this.#f,{signal:this.#E.signal}),this.#q||(this.querySelector(".mdw-am").addEventListener("click",this.#x,{signal:this.#E.signal}),this.querySelector(".mdw-pm").addEventListener("click",this.#k,{signal:this.#E.signal}))}#J(){this.#E.abort(),setTimeout(()=>{v.isMobile&&this.#t.addEventListener("click",this.#u,{signal:this.#S.signal}),this.#i.addEventListener("focus",this.#w,{signal:this.#S.signal})}),this.#i.reportValidity()}#tt(){this.value=this.#e,this.close()}#et(){this.value=this.#o,this.close()}#it(t){let e=this.#P.getBoundingClientRect(),{x:o,y:s}=this.#Z(t);o<e.x&&o>e.right&&s<e.y&&s>e.bottom||(window.addEventListener("mouseup",this.#v,{signal:this.#S.signal}),window.addEventListener("mousemove",this.#y,{signal:this.#S.signal}),window.addEventListener("touchend",this.#v,{signal:this.#S.signal}),window.addEventListener("touchmove",this.#y,{signal:this.#S.signal}),t.preventDefault())}#ot(t){window.removeEventListener("mouseup",this.#v),window.removeEventListener("mousemove",this.#y),window.removeEventListener("touchend",this.#v),window.removeEventListener("touchmove",this.#y),t.preventDefault(),setTimeout(()=>this.#F("minute"))}#st(){this.#F("hour")}#nt(){this.#F("minute")}#F(t="hour"){if(t==="hour")this.classList.remove("mdw-minute-view"),this.classList.remove("mdw-input-view"),this.querySelector(".mdw-time-hour").setAttribute("selected",""),this.querySelector(".mdw-time-minute").removeAttribute("selected"),this.querySelector(".mdw-time-hour").setAttribute("readonly",""),this.querySelector(".mdw-time-minute").setAttribute("readonly",""),this.querySelector(".mdw-time-hour").removeEventListener("input",this.#R),this.querySelector(".mdw-time-minute").removeEventListener("input",this.#_),this.querySelector(".mdw-time-hour").addEventListener("click",this.#C,{signal:this.#S.signal}),this.querySelector(".mdw-time-minute").addEventListener("click",this.#T,{signal:this.#S.signal});else if(t==="minute"){if(this.#$===-1)return;this.#P.classList.remove("mdw-hour-24"),this.classList.add("mdw-minute-view"),this.classList.remove("mdw-input-view"),this.querySelector(".mdw-time-minute").setAttribute("selected",""),this.querySelector(".mdw-time-hour").removeAttribute("selected"),this.querySelector(".mdw-time-hour").setAttribute("readonly",""),this.querySelector(".mdw-time-minute").setAttribute("readonly",""),this.querySelector(".mdw-time-hour").removeEventListener("input",this.#R),this.querySelector(".mdw-time-minute").removeEventListener("input",this.#_),this.querySelector(".mdw-time-hour").addEventListener("click",this.#C,{signal:this.#S.signal}),this.querySelector(".mdw-time-minute").addEventListener("click",this.#T,{signal:this.#S.signal})}else t==="input"&&(this.#P.classList.remove("mdw-hour-24"),this.classList.add("mdw-input-view"),this.classList.remove("mdw-minute-view"),this.querySelector(".mdw-time-hour").setAttribute("selected",""),this.querySelector(".mdw-time-minute").removeAttribute("selected"),this.querySelector(".mdw-time-hour").removeAttribute("readonly"),this.querySelector(".mdw-time-minute").removeAttribute("readonly"),this.querySelector(".mdw-time-hour").addEventListener("input",this.#R,{signal:this.#S.signal}),this.querySelector(".mdw-time-minute").addEventListener("input",this.#_,{signal:this.#S.signal}),this.querySelector(".mdw-time-hour").removeEventListener("click",this.#C),this.querySelector(".mdw-time-minute").removeEventListener("click",this.#T));this.#V(!0)}#G(t){let o=this.querySelector(".mdw-selector-center").getBoundingClientRect(),s=this.#Z(t),r=o.x-s.x,a=o.y-s.y,h=Math.atan2(a,r)*(180/Math.PI),u=this.#I;if(u==="hour"){let b=this.#M*30,f=h-90;f<0&&(f=360+f),f=Math.round(f/b)*b,f===360&&(f=0);let k=this.#q&&r>-80&&r<80&&a>-80&&a<80;this.#s=this.#m.find(_=>_.theta===`${f}`&&(k?_.is24===!0:_.is24!==!0)).hour,this.style.setProperty("--mdw-time-selector-selector-degrees",`${f}deg`)}else if(u==="minute"){let b=this.#$*6,f=h-90;f<0&&(f=360+f);let k=Math.round(f/30)*30-f;Math.abs(k)<6&&(f+=k),f=Math.round(f/b)*b,f===360&&(f=0),this.#c=this.#r.find(_=>_.theta===`${f}`).minute,this.style.setProperty("--mdw-time-selector-selector-degrees",`${f}deg`)}this.#V(),t.stopPropagation()}#V(t=!1){let e=this.#P;if(this.#s!==void 0&&this.#l!==this.#s){let o=this.#q&&!!this.#m.find(a=>a.hour===this.#s).is24;e.classList.toggle("mdw-hour-24",o);let s=this.querySelector(".mdw-dial-label[hour][selected]");s&&s.removeAttribute("selected");let r=this.querySelector(`.mdw-dial-label[hour="${this.#s}"]`);r&&r.setAttribute("selected",""),this.#l=this.#s,t=!0}if(this.#c!==void 0&&this.#n!==this.#c){e.classList.remove("mdw-hour-24");let o=this.querySelector(".mdw-dial-label[minute][selected]");o&&o.removeAttribute("selected");let s=this.querySelector(`.mdw-dial-label[minute="${this.#c}"]`);s&&s.setAttribute("selected",""),this.#n=this.#c,t=!0}if(!this.#q&&this.#a!==void 0&&this.#d!==this.#a&&(this.querySelector(".mdw-am").toggleAttribute("selected",this.#a==="AM"),this.querySelector(".mdw-pm").toggleAttribute("selected",this.#a==="PM"),this.#d=this.#a,t=!0),t){let o=this.#I;if(this.#q)this.#H({hour:this.#s}),this.querySelector(".mdw-time-hour").value=this.#e.split(":")[0],o==="hour"&&e.classList.toggle("mdw-hour-24",this.#s==="0"||this.#s>12);else{this.#N({hour:this.#s,meridiem:this.#a});let r=this.#O(this.#e);this.querySelector(".mdw-time-hour").value=r.paddedHour}this.#H({minute:this.#c}),this.querySelector(".mdw-time-minute").value=this.#e.split(":")[1],e.classList.remove("mdw-minute-secondary");let s;if(o==="hour")s=this.#m.find(r=>r.hour===`${this.#s}`).theta;else if(o==="minute"){let r=this.#r.find(a=>a.minute===`${this.#c}`);s=r.theta,r.display!==!0&&e.classList.add("mdw-minute-secondary")}this.style.setProperty("--mdw-time-selector-selector-degrees",`${s}deg`)}}#rt(){this.querySelector(".mdw-am").setAttribute("selected",""),this.querySelector(".mdw-pm").removeAttribute("selected"),this.#a="AM",this.#N({hour:this.#s,meridiem:"AM"}),this.value=this.#e}#at(){this.querySelector(".mdw-pm").setAttribute("selected",""),this.querySelector(".mdw-am").removeAttribute("selected"),this.#a="PM",this.#N({hour:this.#s,meridiem:"PM"}),this.value=this.#e}#dt(t){let e=this.#q?this.#B(t.target.value):this.#O(t.target.value);this.#s=e.hour,this.#c=e.minute,this.#q||(this.#a=e.meridiem),this.#V()}#lt(t){this.#s=t.target.getAttribute("hour"),setTimeout(()=>this.#F("minute"))}#mt(t){this.#I==="minute"&&this.#G(t)}#ct(){this.#I!=="input"?this.#F("input"):this.#F("hour")}#ht(t){this.#s=t.target.value,this.#q?this.#H({hour:this.#s}):this.#N({hour:this.#s,meridiem:this.#a})}#wt(t){this.#c=t.target.value,this.#H({minute:this.#c})}#Z(t){return{x:t.changedTouches?t.changedTouches[0].clientX:t.clientX,y:t.changedTouches?t.changedTouches[0].clientY:t.clientY}}});var jo=class{#t;#i;#e;#o;#s;#l;#c;#n;#a;#d="";#m="";#r="";#w="";#u=!1;#p;#h=/(\$[\d\&])/;#g=/(\((?:\?\<\w+\>)?([^\)]+)\)\??)/g;#f=["Backspace","Delete","Shift","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab"];#b=this.#z.bind(this);#v=this.#R.bind(this);#y=this.#P.bind(this);#x=this.#I.bind(this);constructor(t){this.#t=t.querySelector("input")}get value(){return this.#d}get formattedValue(){return this.#r}get maskedValue(){return this.#w}get displayValue(){return this.#m}get pattern(){return this.#i}set pattern(t){this.#i=t,this.#L(t)}get format(){return this.#s}set format(t){this.#s=t,this.#A(t)}get mask(){return this.#n}set mask(t){this.#n=t,this.#D(t)}enable(){if(this.#s){if(!this.#e)throw Error("Must set pattern before enabling");this.#k(),this.#t.addEventListener("keydown",this.#b),this.#t.addEventListener("paste",this.#v),this.#t.addEventListener("blur",this.#y),this.#t.addEventListener("focus",this.#x)}}disable(){this.#t.removeEventListener("keydown",this.#b),this.#t.removeEventListener("paste",this.#v),this.#t.removeEventListener("blur",this.#y),this.#t.removeEventListener("focus",this.#x)}#k(){if(this.#u)return;this.#u=!0;let t=this,e=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value");Object.defineProperty(this.#t,"value",{get:function(){return t.#C()},set:function(o){return o=t.#T(o),e.set.call(this,o)}})}#L(t){this.#n?this.#t.removeAttribute("pattern"):this.#t.pattern=t,this.#e=new RegExp(t);let e=0,o=t.replace(this.#g,(s,r)=>(e>0&&r.slice(-1)!=="?"&&(r+="?"),e+=1,r));this.#o=new RegExp(`^${o.replace(/^\//,"").replace(/^\^/,"").replace(/(?<!\\)\$$/,"").replace(/\/$/,"")}`)}#A(t){let e=t.split(this.#h);t[0]===""&&t[0]!==e[0]&&e.splice(0,1),t[t.length-1]!==e[e.length-1]&&e.splice(-1),this.#l=e,this.#c=e.filter(o=>o.match(this.#h)).join("_:_")}#D(t){let e=t.split(this.#h);e[0]===""&&t[0]!==e[0]&&e.splice(0,1),t[t.length-1]!==e[e.length-1]&&e.splice(-1),this.#a=e}#C(){return this.#d}#T(t){let e=t.match(this.#o);return!e&&this.#n&&this.#$(t)?(this.#d=t,this.#r=t,this.#m=t,this.#m):!e||!this.#s?(this.#d=t,this.#r=t,this.#n&&(this.#w=this.#M(t,!1)),this.#m=this.#M(t,!1),this.#m):(this.#r=this.#E(t),this.#n&&(this.#w=this.#M(this.#r)),this.#m=this.#w||this.#r,this.#d||(this.#d=t),this.#m)}#z(t){if(!t.metaKey&&t.key!=="Enter")if(this.#f.includes(t.key)){if(t.key==="Backspace"||t.key==="Delete"){let e=this.#_();e.rawStart>0&&(e.rawStart!==e.rawEnd?this.#d=`${this.#d.slice(0,e.rawStart)}${this.#d.slice(e.rawEnd)}`:this.#d=`${this.#d.slice(0,e.rawStart-1)}${this.#d.slice(e.rawEnd)}`),t.target.value=this.#d,t.preventDefault(),e.rawStart!==e.rawEnd?(t.target.selectionStart=e.displayStart,t.target.selectionEnd=e.displayStart):(t.target.selectionStart=e.displayStart-1,t.target.selectionEnd=e.displayStart-1),this.#S()}}else{let e=this.#_(),o=this.#d.split(""),s=o.slice(0,e.rawStart).join(""),r=o.slice(e.rawEnd).join("");this.#d=`${s}${t.key}${r}`,t.target.value=this.#d,t.preventDefault(),e.displayStart!==e.displayEnd?(t.target.selectionStart=e.displayStart+1,t.target.selectionEnd=e.displayStart+1):e.isAtEnd||(t.target.selectionStart=e.displayEnd+1,t.target.selectionEnd=e.displayEnd+1),this.#S()}}#R(t){t.preventDefault();let e=this.#_(),o=(t.clipboardData||window.clipboardData).getData("text"),s=this.#d.split(""),r=s.slice(0,e.rawStart).join(""),a=s.slice(e.rawEnd).join("");this.#d=`${r}${o}${a}`,t.target.value=this.#d,t.target.selectionStart=e.displayStart+o.length,t.target.selectionEnd=e.displayStart+o.length,this.#S()}#_(){let t=this.#t.selectionStart,e=this.#t.selectionEnd,o=t,s=e,r=s===this.#m.length,a=0,h=this.#n?this.#E(this.#d):this.#m;return h.slice(0,o).split("").filter(u=>{u===this.#d[a]&&(a+=1)}),o=a,a=0,h.slice(0,s).split("").filter(u=>{u===this.#d[a]&&(a+=1)}),s=a,{displayStart:t,displayEnd:e,rawStart:o,rawEnd:s,isAtEnd:r}}#S(){!this.#n&&this.#p===!0&&this.#t.validity.patternMismatch===!1?(this.#t.reportValidity(),this.#p=!0):this.#n&&this.#t.hasAttribute("pattern")&&this.#d.match(this.#e)!==null&&(this.#t.removeAttribute("pattern"),this.#t.reportValidity())}#E(t){let e=t.match(this.#o);if(!e)return t;let o=e[0],s=!1,r=0,a=t.replace(o,""),h=o.replace(this.#o,this.#c).split("_:_");return`${this.#l.map(b=>{if(!s)return b.match(this.#h)&&(b=h[r],r+=1,b===""&&(s=!0)),b}).join("")}${a}`}#M(t,e=!0){if(!this.#n)return t;if(!e)return this.#n.slice(0,t.length);let o=t.replace(this.#o,this.#n);return o.length>t.length?o.slice(0,t.length):o}#$(t){return!this.#n||t.length<this.#n.length?!1:this.#a.filter(o=>o.match(this.#h)===null).filter(o=>!t.includes(o)).length===0}#I(){this.#e&&(this.#p=this.#t.validity.patternMismatch)}#P(){this.#e&&this.#n&&!this.#$(this.#d)&&this.#d.match(this.#e)===null&&this.#t.setAttribute("pattern",this.#i),this.#t.reportValidity()}};p.registerGlobalStyleSheet(Zn);var Mh=w.debounce(d=>{let t=d.getBoundingClientRect();t.y>=0&&t.y+t.height<=window.innerHeight||d.scrollIntoView({behavior:"smooth",block:"center"})},100),ea=class extends p{#t;#i=this.#h.bind(this);#e=this.#g.bind(this);#o=this.#p.bind(this);#s=this.#w.bind(this);#l=this.clear.bind(this);#c=this.querySelector(".mdw-supporting-text")?.innerText;#n;#a=new jo(this);#d=new AbortController;constructor(){super(),this.#t=this.querySelector("input");let t=this.#t.getAttribute("placeholder");this.#t.setAttribute("placeholder",t||" "),this.classList.add("mdw-no-animation"),this.#m(),this.#r(),this.classList.contains("mdw-outlined")&&(this.insertAdjacentHTML("afterbegin",`
        <div class="mdw-outlined-border-container">
          <div class="mdw-outlined-leading"></div>
          <div class="mdw-outlined-notch"></div>
          <div class="mdw-outlined-trailing"></div>
        </div>
      `),(this.#t.value||this.#t.type==="date"||this.#t.type==="month"||this.#t.type==="time"||this.#t.placeholder!==" ")&&this.#h(),this.#t.addEventListener("focus",this.#i,{signal:this.#d.signal}),this.#t.addEventListener("blur",this.#e,{signal:this.#d.signal})),this.insertAdjacentHTML("beforeend",'<div class="mdw-autocomplete"></div>'),this.#t.addEventListener("invalid",this.#o,{signal:this.#d.signal}),this.#t.addEventListener("input",this.#s,{signal:this.#d.signal});let e=this.querySelector("mdw-icon.mdw-input-clear");e&&e.addEventListener("click",this.#l,{signal:this.#d.signal});let o=this.querySelector("label");o&&!o.hasAttribute("for")&&(this.#t.id||(this.#t.id=`mdw-textfield-${w.uid()}`),o.setAttribute("for",this.#t.id))}connectedCallback(){let t=this.#t.pattern;if(t&&(this.pattern=t),this.pattern&&this.#a.enable(),this.querySelector(".mdw-outlined-border-container + mdw-icon")&&this.classList.add("mdw-has-leading-icon"),!this.#t.hasAttribute("aria-label")){let e=this.querySelector("label")?.innerText;e&&this.#t.setAttribute("aria-label",e)}setTimeout(()=>{this.classList.remove("mdw-no-animation")},100)}disconnectedCallback(){this.#d.abort(),this.#a.disable()}static get observedAttributes(){return["disabled","pattern","mask","format"]}attributeChangedCallback(t,e,o){t==="disabled"&&(this.disabled=o!==null),t==="pattern"&&(this.pattern=o),t==="mask"&&(this.mask=o),t==="format"&&(this.format=o)}get autocomplete(){return this.#n}set autocomplete(t){this.#n=t,this.#f()}get disabled(){return this.hasAttribute("disabled")}set disabled(t){this.toggleAttribute("disabled",!!t),this.#t.blur(),this.#t.toggleAttribute("disabled",!!t)}get pattern(){return this.#a.pattern}set pattern(t){this.#a.pattern=t}get mask(){return this.#a.mask}set mask(t){this.#a.mask=t}get format(){return this.#a.format}set format(t){this.#a.format=t}get value(){return this.#t.value}get formattedValue(){return this.#a.formattedValue}get maskedValue(){return this.#a.maskedValue}setCustomValidity(t=""){this.#t.setCustomValidity(t)}reportValidity(){return this.#t.reportValidity()}clear(t){this.#t.value="",t&&t.target.classList.contains("mdw-input-clear")&&(this.classList.add("mdw-raise-label"),this.#t.focus(),setTimeout(()=>{this.classList.remove("mdw-raise-label")}))}#m(){this.#t.hasAttribute("disabled")?this.setAttribute("disabled",""):this.removeAttribute("disabled");let t=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"disabled"),e=t.set,o=this;t.set=function(s){o.toggleAttribute("disabled",!!s),e.apply(this,arguments)},Object.defineProperty(this.#t,"disabled",t)}#r(){let t=this.#t.setCustomValidity;this.#t.setCustomValidity=o=>{t.call(this.#t,o),this.#w()};let e=this.#t.reportValidity;this.#t.reportValidity=()=>{Mh(this.#t);let o=e.call(this.#t);return this.#u(!o),o}}#w(){this.#u(!this.#t.checkValidity()),this.#f()}#u(t=!1){let e=this.querySelector(".mdw-supporting-text:not(.mdw-disable-default)"),o=this.querySelector(".mdw-invalid-icon");t?(this.classList.add("mdw-invalid"),e&&(e.innerText=this.#t.validationMessage),o||this.insertAdjacentHTML("beforeend",`<div class="mdw-invalid-icon">${Cl}</div>`)):(this.classList.remove("mdw-invalid"),e&&(e.innerText=this.#c),o&&o.remove())}#p(t){t.preventDefault()}updateNotch(){this.#t.value?this.#h():this.#g()}#h(){let t=this.querySelector("label");if(!t)return;let e=this.querySelector(".mdw-outlined-notch");getComputedStyle(e).width==="0px"&&(this.querySelector(".mdw-outlined-notch").style.width=`${t.offsetWidth*.9}px`,setTimeout(()=>{this.querySelector(".mdw-outlined-notch").style.width=`${t.offsetWidth+4}px`},165))}#g(){this.#t.value||this.#t.type==="date"||this.#t.type==="time"||this.#t.type==="month"||this.#t.placeholder!==" "||!this.querySelector("label")||(this.querySelector(".mdw-outlined-notch").style.width="0")}#f(){if(typeof this.#n!="string")return;let t=this.#n.match(new RegExp(`^${this.#t.value}(.*)`,"i")),e=!t||t[0]===t[1]?"":t[1];this.querySelector(".mdw-autocomplete").innerText=e;let o=w.getTextWidthFromInput(this.#t);this.querySelector(".mdw-autocomplete").style.left=`${o+16}px`}};customElements.define("mdw-textfield",ea);var qd=new CSSStyleSheet;qd.replaceSync(`mdw-top-app-bar {
  --mdw-top-app-bar-scroll-position: 0px;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  height: 64px;
  box-sizing: border-box;
  padding: 0 16px;
  z-index: 9;
  background-color: var(--mdw-surface);
}

mdw-top-app-bar > mdw-navigation-button {
  margin-left: -8px;
}

mdw-top-app-bar.mdw-auto-hide {
  top: var(--mdw-top-app-bar-scroll-position);
}

body.mdw-navigation-state-open mdw-top-app-bar {
  margin-left: var(--mdw-navigation-drawer-width);
  transition: margin-left 180ms;
  transition-timing-function: var(--mdw-transition-expand-in);
}

body.mdw-navigation-state-hide mdw-top-app-bar {
  margin-left: 0;
  transition: margin-left 180ms;
  transition-timing-function: var(--mdw-transition-expand-out);
}

body.mdw-navigation-state-rail mdw-top-app-bar {
  margin-left: var(--mdw-navigation-rail-width);
  transition: margin-left 180ms;
  transition-timing-function: var(--mdw-transition-expand-in);
}

mdw-top-app-bar:not(.mdw-mobile-only) + page-content::before,
mdw-top-app-bar:not(.mdw-mobile-only) + mdw-navigation + page-content::before,
body.mdw-mobile mdw-top-app-bar.mdw-mobile-only + page-content::before,
body.mdw-mobile mdw-top-app-bar.mdw-mobile-only + mdw-navigation + page-content::before {
  content: '';
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
}

body:not(.mdw-mobile) mdw-top-app-bar.mdw-mobile-only {
  display: none;
}

body.mdw-mobile mdw-top-app-bar.mdw-mobile-hide + page-content::before,
body.mdw-mobile mdw-top-app-bar.mdw-mobile-hide + mdw-navigation + page-content::before {
  content: '';
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
}

body.mdw-mobile mdw-top-app-bar.mdw-mobile-hide {
  display: none;
}

mdw-top-app-bar::before {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background-color: none;
  transition: background-color 80ms linear;
}

mdw-top-app-bar:not(.mdw-no-states).mdw-scrolled::before {
  background-color: var(--mdw-surface-tint-alpha-6);
}

mdw-top-app-bar > .mdw-headline {
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: var(--mdw-font-title-size-large);
  font-weight: var(--mdw-font-title-weight-large);
  line-height: var(--mdw-font-title-line-height-large);
  letter-spacing: var(--mdw-font-title-letter-spacing-large);
  color: var(--mdw-on-surface);
}

mdw-top-app-bar.mdw-center-aligned > .mdw-headline {
  text-align: center;
}

mdw-top-app-bar mdw-icon {
  font-size: 29px;
  width: 24px;
  height: 24px;
}

mdw-top-app-bar:not(.mdw-center-aligned) > mdw-navigation-button + .mdw-headline,
mdw-top-app-bar:not(.mdw-center-aligned) > mdw-icon + .mdw-headline {
  margin-left: 16px;
}



/* --- medium --- */

mdw-top-app-bar.mdw-medium {
  align-items: start;
  padding-top: 20px;
  height: 112px;
}

mdw-top-app-bar.mdw-medium > .mdw-headline {
  font-size: var(--mdw-font-headline-size-small);
  font-weight: var(--mdw-font-headline-weight-small);
  line-height: var(--mdw-font-headline-line-height-small);
  letter-spacing: var(--mdw-font-headline-letter-spacing-small);

  margin-top: 44px;
  transform: translateX(-36px);
}

mdw-top-app-bar.mdw-medium > mdw-navigation-button {
  margin-top: -8px;
}

mdw-top-app-bar.mdw-medium:not(.mdw-auto-hide).mdw-auto-shrink {
  height: calc(112px + var(--mdw-top-app-bar-scroll-position));
}

mdw-top-app-bar.mdw-medium:not(.mdw-auto-hide).mdw-auto-shrink > .mdw-headline {
  margin-top: max(calc(44px + var(--mdw-top-app-bar-scroll-position)), -4px);
  transform: translateX(min(calc(-36px - var(--mdw-top-app-bar-scroll-position)), 0px));
}

mdw-top-app-bar:not(.mdw-mobile-only).mdw-medium + page-content::before,
mdw-top-app-bar:not(.mdw-mobile-only).mdw-medium + mdw-navigation + page-content::before,
body.mdw-mobile mdw-top-app-bar.mdw-mobile-only.mdw-medium + page-content::before,
body.mdw-mobile mdw-top-app-bar.mdw-mobile-only.mdw-medium + mdw-navigation + page-content::before {
  content: '';
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 112px;
}

body.mdw-mobile mdw-top-app-bar.mdw-mobile-hide.mdw-medium + page-content::before,
body.mdw-mobile mdw-top-app-bar.mdw-mobile-hide.mdw-medium + mdw-navigation + page-content::before {
  content: '';
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
}







/* --- large --- */

mdw-top-app-bar.mdw-large {
  align-items: start;
  padding-top: 20px;
  height: 152px;
}

mdw-top-app-bar.mdw-large > .mdw-headline {
  font-size: var(--mdw-font-headline-size-medium);
  font-weight: var(--mdw-font-headline-weight-medium);
  line-height: var(--mdw-font-headline-line-height-medium);
  letter-spacing: var(--mdw-font-headline-letter-spacing-medium);

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: unset;
  align-self: end;
  margin-bottom: 16px;
  transform: translateX(-36px);

  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  box-orient: vertical;
}

mdw-top-app-bar.mdw-large > mdw-navigation-button {
  margin-top: -6px;
}

mdw-top-app-bar.mdw-large:not(.mdw-auto-hide).mdw-auto-shrink {
  height: calc(152px + var(--mdw-top-app-bar-scroll-position));
}

mdw-top-app-bar.mdw-large:not(.mdw-auto-hide).mdw-auto-shrink > .mdw-headline {
  margin-bottom: max(calc(16px + var(--mdw-top-app-bar-scroll-position)), 14px);
  transform: translateX(min(calc(-36px - var(--mdw-top-app-bar-scroll-position)), 0px));
}

mdw-top-app-bar:not(.mdw-mobile-only).mdw-large + page-content::before,
mdw-top-app-bar:not(.mdw-mobile-only).mdw-large + mdw-navigation + page-content::before,
body.mdw-mobile mdw-top-app-bar.mdw-mobile-only.mdw-large + page-content::before,
body.mdw-mobile mdw-top-app-bar.mdw-mobile-only.mdw-large + mdw-navigation + page-content::before {
  content: '';
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 152px;
}

body.mdw-mobile mdw-top-app-bar.mdw-mobile-hide.mdw-large + page-content::before,
body.mdw-mobile mdw-top-app-bar.mdw-mobile-hide.mdw-large + mdw-navigation + page-content::before {
  content: '';
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,qd];var Kc=qd;p.registerGlobalStyleSheet(Kc);customElements.define("mdw-top-app-bar",class extends p{#t=this.classList.contains("mdw-auto-hide");#i=!this.#t&&this.classList.contains("mdw-auto-shrink");#e;#o=this.#s.bind(this);constructor(){super()}connectedCallback(){this.#t?this.#e=this.offsetHeight:this.#i&&(this.classList.contains("mdw-medium")||this.classList.contains("mdw-large"))&&(this.#e=this.offsetHeight-64),w.trackPageScroll(this.#o)}disconnectedCallback(){w.untrackPageScroll(this.#o)}#s({isScrolled:t,direction:e,distance:o,scrollTop:s}){if(!this.#t&&!this.#i){this.classList.toggle("mdw-scrolled",t);return}let r=-parseInt(this.style.getPropertyValue("--mdw-top-app-bar-scroll-position").replace("px","")||0);if(this.classList.toggle("mdw-scrolled",s-Math.max(0,r+o)>0),e===1&&r===0||e===-1&&r===this.#e)return;let a=r+o;a>this.#e&&(a=this.#e),a<0&&(a=0),this.style.setProperty("--mdw-top-app-bar-scroll-position",`${-a}px`)}});var Rd=new CSSStyleSheet;Rd.replaceSync(`mdw-tooltip {
  pointer-events: none;
  position: fixed;
  height: 24px;
  padding: 0 8px;
  font-size: var(--mdw-font-label-size-small);
  font-weight: var(--mdw-font-label-weight-small);
  line-height: 24px;
  letter-spacing: var(--mdw-font-label-letter-spacing-small);

  border-radius: var(--mdw-shape-extra-small);
  background-color: var(--mdw-on-surface-variant);
  color: var(--mdw-on-surface-inverse);

  z-index: 11;
  opacity: 0;
}

mdw-tooltip.mdw-show {
  opacity: 1;
}
`);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Rd];var Qc=Rd;p.registerGlobalStyleSheet(Qc);customElements.define("mdw-tooltip",class extends p{constructor(){super()}connectedCallback(){this.setAttribute("role","tooltip")}show(t,e){let o=t.getBoundingClientRect(),s=parseInt(getComputedStyle(t).marginBottom||0),{clientHeight:r}=document.documentElement,a=o.y+o.height-s+4;a+28>r&&(a-=56),this.style.top=`${a}px`,e?this.style.left=`${e+8}px`:this.style.left=`${o.x+o.width/2}px`,this.classList.add("mdw-show")}hide(){this.classList.remove("mdw-show")}});var Vt,Yt,Pd,Wo,Jc=w.rafThrottle(Th);function Dh(d){d.target.hasAttribute("tooltip")&&(Pd=d.clientX,Yt=d.target,Yt.addEventListener("mouseout",th),Yt.addEventListener("mousemove",Jc),zh())}function Th(d){Pd=d.clientX}function th(){$h()}function zh(){Wo||(Wo=setTimeout(()=>{let d=Yt.getAttribute("tooltip");Vt.innerHTML=d,Vt.setAttribute("aria-label",d),Vt.show(Yt,Pd)},1e3))}function $h(){Wo&&(Vt.hide(),clearTimeout(Wo),Wo=void 0,Yt.removeEventListener("mouseout",th),Yt.removeEventListener("mousemove",Jc),Yt=void 0)}document.addEventListener("DOMContentLoaded",_h);function _h(){Vt=document.createElement("mdw-tooltip"),Vt.classList.add("mdw-main-tooltip"),Vt.setAttribute("aria-label","blank"),document.body.insertAdjacentElement("beforeend",Vt),window.addEventListener("mouseover",Dh,!1)}var qh=/^\//,Rh=/\/$/,Ph=/\/:|\*/g,Ih=/([:*])(\w+)/g,Fh=/\*/g,Oh="(?:.*)",Nh="(?:/$|$)",Hh="(#(.*))?",Vh=typeof window<"u",$=[],bi,ih=!1;Vh&&(window.addEventListener("popstate",d=>{ia(new URL(d.currentTarget.location),!0)}),addEventListener("DOMContentLoaded",()=>{window._webformulaServerSide===!0&&Wh()}));function Uo(d,t,{notFound:e,templateId:o}={notFound:!1,templateId:""}){if(t=Yh([...new Set([...[].concat(t||[]),...d.routes||[]])]),!t)return console.warn("No routes provided for page");let s=!1;if(t.forEach(r=>{let a=jh(r);$.push({pageClass:d,route:r,routeRegex:a,templateId:o}),e&&!bi&&(bi={pageClass:d,route:r,routeRegex:a,templateId:o}),sh(location.pathname,a)&&(s=!0)}),o){let r=document.body.querySelector(`template#${o}`);r&&($.templateFileData=r.innerHTML)}d.templatePath&&!$.templateFileData&&($.initialLoadPage=s,$.templateFileAbort=new AbortController,$.templateFetchPromise=fetch(d.templatePath,{priority:s===!0?"high":"low",signal:$.templateFileAbort.signal}).then(r=>r.text()).then(r=>{$.templateFileData=r})),s&&ia(location),Bh()}function oh(){window.webformulaCoreLinkIntercepts=!0,document.addEventListener("click",d=>{if(d.target.matches("[href]")){if(d.target.getAttribute("href").includes("://")){let t=d.target.getAttribute("target");["_blank","_self","_parent","_top"].includes(t)&&window.open(d.target.getAttribute("href"),t).focus();return}d.preventDefault(),ia(new URL(d.target.href)),d.target.blur()}})}function Yh(d=[]){return d.map(t=>`/${t.replace(Rh,"").replace(qh,"")}`)}function jh(d){let t;return d.match(Ph)===null?d.trim()==="/"||d.includes("#")?t=new RegExp(`^${d}$`):t=new RegExp(`^${d}${Hh}$`):t=new RegExp(`^${d.replace(Ih,(e,o,s)=>`(?<${s}>[^/]+)`).replace(Fh,Oh)}${Nh}$`,""),t}function eh(d,t){let e=t.find(({routeRegex:o})=>sh(d,o));if(e){if(typeof location<"u"){let o=d.match(e.routeRegex),s=Object.fromEntries(new URLSearchParams(location.search.split(/\?(.*)?$/).slice(1).join("")).entries());return{...e,urlParameters:o?.groups,searchParameters:s}}return{...e}}}function sh(d,t){return d.split("?")[0].match(t)!==null}var Bo,Go,Zo,ht=class{constructor(){n(this,Bo,void 0);n(this,Go,void 0);n(this,Zo,void 0)}get searchParameters(){return i(this,Go)}get urlParameters(){return i(this,Bo)}get route(){return i(this,Zo)}connectedCallback(){}disconnectedCallback(){}async beforeRender(){}async afterRender(){}template(){return""}renderTemplateString(t=""){return new Function("page",`return \`${t}\`;`).call(this,this)}escape(t){return t.replace(/[^\w. ]/gi,function(e){return"&#"+e.charCodeAt(0)+";"})}async render(){let t=document.querySelector("page-content");if(!t)throw Error("Could not find <page-content>");await this.beforeRender(),t.innerHTML=this.template.call(this,this);let e=document.querySelector("title");e.innerText=this.pageTitle,await this.afterRender()}_setUrlData(t={urlParameters:{},searchParameters:{},route:""}){m(this,Bo,t?.urlParameters||{}),m(this,Go,t?.searchParameters||{}),m(this,Zo,t?.route)}};Bo=new WeakMap,Go=new WeakMap,Zo=new WeakMap,g(ht,"pageTitle"),g(ht,"routes",[]),g(ht,"templatePath","");async function ia(d,t=!1){let e=d.href.replace(d.origin,""),o=eh(e,$);if(!o&&!ih&&window._webformulaServerSide===!0)try{(await nh(e)).notFound===!0?o=bi:o=eh(e,$)}catch(u){console.warn(`No page found for url: ${e}`,u)}if(!o&&bi&&(o=bi),!o)return console.warn(`No page found for url: ${e}`);let s=window.page;if(s?.constructor===o.pageClass){if(d.hash===location.hash)return;t||window.history.pushState({},s.title,e),window.dispatchEvent(new Event("hashchange"));return}let a=o.pageClass?new o.pageClass:{};t||window.history.pushState({},a.pageTitle,e);let h=o.templateId&&document.querySelector(`template#${o.templateId}`);if(h)a.template=()=>a.renderTemplateString(h.innerHTML);else if(o.pageClass.templatePath){if(!o.pageClass.templateFileData&&$.initialLoadPage)await $.templateFetchPromise;else if(!$.templateFileData){$.templateFileAbort.abort();let u=await fetch(o.pageClass.templatePath);$.templateFileData=await u.text()}$.templateFetchPromise&&($.templateFetchPromise=void 0,$.templateFileAbort=void 0),a.template=()=>$.templateFileData}s&&s.disconnectedCallback(),window.page=a,a._setUrlData({urlParameters:o.urlParameters,searchParameters:o.searchParameters,route:o.route}),a.render(),document.body.scrollTop=0,document.documentElement.scrollTop=0,a.connectedCallback(),window.dispatchEvent(new Event("locationchange"))}async function nh(d){let e=await(await fetch(`/fetch-page${d}`)).json();if(e.notFound&&e.templateId&&document.body.querySelector(`template#${e.templateId}`))return e;let o=await import(`${e.pageClassPath}`),s=document.createElement("template");return s.id=e.templateId,s.innerHTML=e.html,document.body.appendChild(s),Uo(o.default,e.route,{templateId:e.templateId,notFound:e.notFound}),e}async function Wh(){let o=(await(await fetch("/prefetch-pages")).json()).map(r=>()=>nh(r.route)),s=[];for(;o.length;)s.push(o.splice(0,3));for(let r of s)try{await Promise.all(r.map(a=>a()))}catch(a){console.error(a)}ih=!0}var Id;function Bh(){clearTimeout(Id),Id=setTimeout(()=>{Id=void 0,!window.page&&bi&&ia(location)},0)}var rh=`<h3 style="margin-top: 12px; margin-bottom: 0; font-weight: 300;">Webformula Core</h3>
<h6 class="mdw-subheader" style="margin-top: 6px; margin-bottom: 0;">Simple no thrills micro framework. Super performant and light-weight!</h6>

<h5 style="margin-bottom: 0;">Highlights</h5>
<ul style=" margin-top: 8px; font-size: 18px; line-height: 32px; color:rgb(10, 100, 112)">
  <li>&#9889; Lightweight - <span style="font-weight: bold; font-size: 20px; margin-right: 2px;">1.8</span><span style="font-weight: bold;">KB</span> compressed</li>
  <li>&#9889; Fast - Most of the heavy lifting is native browser code</li>
  <li>&#9889; Simple - No complex concepts</li>
  <li>&#9889; 0 dependencies</li>
  <li>&#9889; Single page app compatible. With url or hash routing</li>
  <li>&#9889; HTMLElementExtended adds templates and rendering to web-components</li>
</ul>

<h5 style="margin-bottom: 0;">About</h5>
<div style="color: var(--mdw-on-surface-variant); line-height: 22px;">
  Browsers, javascript, css, and html provide a robust set of features these days. With the addition of a couple of features like routing,
  we can build small performant applications without a steep learning curve. Webformula core provides the tools to achieve this in a tiny package (1.8KB).
</div>
`;var Xo=class extends ht{constructor(){super()}template(){return this.renderTemplateString(rh)}};g(Xo,"pageTitle","Home");var ah=`<h3 style="margin-top: 12px; margin-bottom: 0; font-weight: 300;">Getting started</h3>
<h6 style="margin-top: 0; font-weight: 300;">Build a basic web application</h6>


<h5 style="margin-top: 0; margin-bottom: 0; font-weight: 300;">Links</h5>
<ul class="links">
  <li><a href="#install">Install</a></li>
  <li><a href="#appjs">app.js</a></li>
  <li><a href="#page">Page</a></li>
  <li><a href="#webpack">Webpack page html loading</a></li>
  <li><a href="#indexhtml">index.html</a></li>
</ul>


<section style="margin-top: 48px;">
  <mdw-card id="install">
    <div class="mdw-card-content">
      <div class="mdw-headline">Install</div>
    </div>

    <div class="mdw-card-content">
      <div class="mdw-subheader">NPM</div>
    </div>
    <pre>
      <code class="language-bash">
  \${\`npm install @webformula/core\`}
      </code>
    </pre>
    
    <div class="mdw-card-content" style="margin-top: 12px">
      <div class="mdw-subheader">CDN</div>
    </div>
    <pre>
      <code class="language-html">
  \${page.escape(\`<script src="https://cdn.jsdelivr.net/gh/webformula/core@latest/dist/core.js"><\/script>\`)}
      </code>
    </pre>
  </mdw-card>


  <mdw-card id="appjs">
    <div class="mdw-card-content">
      <div class="mdw-headline">Main application file</div>
      <div class="mdw-subheader">app.js</div>
    </div>

    <pre>
      <code class="language-javascript">
  \${\`import { registerPage, enableLinkIntercepts } from '@webformula/core';
  enableLinkIntercepts();
  
  import one from './pages/one/page.js';
  import two from './pages/two/page.js';
  import notFound from './pages/not-found/page.js';
  
  // routes can be configured in page
  registerPage(one, '/one');
  registerPage(one, '/two');
  registerPage(notFound, '/not-found', { notFound: true });
  
  window.addEventListener('locationchange', () => {
  // custom event dispatched by router
  });
  
  window.addEventListener('hashchange', () => {
  // native event
  });\`}
      </code>
    </pre>
  </mdw-card>


  <mdw-card id="page">
    <div class="mdw-card-content">
      <div class="mdw-headline">Page</div>
      <div class="mdw-subheader">page.js and page.html</div>
    </div>
  
    <pre>
      <code class="language-javascript">
  \${\`import { Page } from '@webformula/core';
  
  export default class extends Page {
    static pageTitle = 'Page'; // html page title

    /** HTML file path (optional)
     *   This will load from the browser. Must be path from root folder.
     *   You can also directly set the template string in the template method
     *   If you use webpack you can load the html file directly
     */
    static templatePath = 'page.html'; // html file path. This will load from browser

    // can be configures with \\\`registerPage(PageClass, '/one')\\\`
    static routes = ['/one', 'one/:id'];

    someVar = 'Some var';
    clickIt_bound = this.clickIt.bind(this);
    userInput;
    
    
    constructor() {
      super();
    }
    
    connectedCallback() {
      // called on element hookup to dome. May not be rendered yet
    
      this.userInput = 'some user input';
      console.log(this.urlParameters()); // { id: 'value' }
      console.log(this.searchParameters()); // { id: 'value' }
    }
    
    disconnectedCallback() {
      // called on element removal
    }
    
    // not called on initial render
    beforeRender() {
      // Do work before render
    }
    
    afterEnder() {
      // Do work after render
      this.querySelector('#event-listener-button').addEventListener('click', this.clickIt_bound);
    }
    
    clickIt() {
      console.log('clicked it!');
    }
    
    changeValueAndRender() {
      this.someVar = 'Re-rendered';
      this.render(); // initial render is automatic
    }
    
    // You can also load an html file using - static templatePath = ''
    template() {
      return /*html*/\\\`\${page.escape(\`
        <div>Page Content</div>
        <div>\\\${this.someVar}</div>
        
        <!-- escape html input -->
        <div>\\\${this.escape(this.userInput)}</div>
        
        <!-- "page" will reference the current page class -->
        <button onclick="page.clickIt()">Click Method</button>
        <button id="event-listener-button">Event listener</button>
        <button onclick="page.changeValueAndRender()">Change value and render</button>
      \`)}\\\`;
    }
  }\`}
      </code>
    </pre>
  </mdw-card>



    <mdw-card id="webpack">
      <div class="mdw-card-content">
        <div class="mdw-headline">Webpack page html loading</div>
        <div class="mdw-supporting-text">Use webpack to load html pages. You will need to use the
          "page.renderTemplateString" method if you want to use javascript template literals.</div>
      </div>
    
      <pre>
      <code class="language-html">
  \${page.escape(\`<div>Page Content</div>
  <div>\${this.someVar}</div>
  <button onclick="page.clickIt()">Click Method</button>
\`)}
      </code>
    </pre>
    <pre>
      <code class="language-javascript">
  \${\`import { Page } from '@webformula/core';
  import html from './page.html';
  
  export default class extends Page {
    static pageTitle = 'Page'; // html page title
    someVar = 'Some var';
    
    constructor() {
      super();
    }
    
    clickIt() {
      console.log('clicked it!');
    }
    
    template() {
      return this.renderTemplateString(html);
    }
  }\`}
      </code>
    </pre>
  </mdw-card>



  <mdw-card id="indexhtml">
    <div class="mdw-card-content">
      <div class="mdw-headline">index.html</div>
    </div>
  
    <pre>
      <code class="language-html">
        \${page.escape(\`<!doctype html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="Cache-Control" content="no-store" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
      <title></title>
      \\<script \\src="app.js" defer><\/script>
    </head>
    
    <body>
      <mdw-navigation>
        <div class="mdw-headline">Webformula core</div>
        <mdw-anchor href="/">Welcome</mdw-anchor>
        <mdw-anchor href="/getting-started">Getting started</mdw-anchor>
      </mdw-navigation>
    
      <page-content></page-content>
    
      <mdw-bottom-app-bar class="mdw-auto-hide mdw-mobile-only">
        <mdw-navigation-button></mdw-navigation-button>
      </mdw-bottom-app-bar>
    </body>
    </html>
  \`)}
      </code>
    </pre>
  </mdw-card>
</section>
`;var Ko=class extends ht{constructor(){super()}template(){return this.renderTemplateString(ah)}};g(Ko,"pageTitle","Getting started");var dh=`<h3 style="margin-top: 12px; margin-bottom: 0; font-weight: 300;">Webpack bundling</h3>
<h6 style="margin-top: 0; font-weight: 300;">Develop and build with webpack</h6>


<h5 style="margin-top: 0; margin-bottom: 0; font-weight: 300;">Links</h5>
<ul class="links">
  <li><a href="#install">Install</a></li>
  <li><a href="#config">Config</a></li>
  <li><a href="#scripts">Page.json scripts</a></li>
</ul>


<section style="margin-top: 48px;">
  <mdw-card id="install">
    <div class="mdw-card-content">
      <div class="mdw-headline">Install</div>
    </div>
    <pre>
      <code class="language-javascript">
  \${\`// Minimal
  npm install @webformula/core webpack webpack-cli webpack-dev-server
  
  // Suggested addons
  npm install css-loader style-loader html-loader html-webpack-plugin copy-webpack-plugin\`}
      </code>
    </pre>
  </mdw-card>

  <mdw-card id="config">
    <div class="mdw-card-content">
      <div class="mdw-headline">webpack.config.js</div>
    </div>
    <pre>
      <code class="language-javascript">
  \${\`import HtmlWebpackPlugin from 'html-webpack-plugin';
  import CopyPlugin from 'copy-webpack-plugin';
  
  export default {
    entry: {
      app: {
        import: './src/app.js', filename: process.env.WEBPACK_SERVE ? '[name].js' : '[name].[contenthash].js'
      }
    },
    output: { clean: true },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        chunks: ['app']
      }),
      new CopyPlugin({
        patterns: [
          { from: 'src/favicon.ico', to: '' }
        ]
      })
    ],
    devServer: {
      static: { directory: './src' },
      historyApiFallback: true
    },
    devtool: process.env.WEBPACK_SERVE ? 'inline-source-map' : undefined,
    module: {
      rules: [
        {
          test: /\\.css$/i,
          oneOf: [
            {
              assert: { type: 'css' },
              loader: 'css-loader',
              options: { exportType: 'css-style-sheet' }
            },
            {
              use: [
                'style-loader',
                { loader: 'css-loader' }
              ]
            }
          ]
        },
        {
          test: /\\.html$/,
          use: ['html-loader']
        }
      ]
    }
  };\`}
      </code>
    </pre>
  </mdw-card>


  <mdw-card id="scripts">
    <div class="mdw-card-content">
      <div class="mdw-headline">Package.json scripts</div>
    </div>
    <pre>
      <code class="language-json">
  \${\`"scripts": {
    "start": "webpack serve --open --mode development",
    "start-production": "NODE_ENV=production webpack serve --open --mode production",
    "start-no-open": "webpack serve --mode development",
    "build": "NODE_ENV=production webpack --mode production"
  }\`}
      </code>
    </pre>
  </mdw-card>
</section>
`;var Qo=class extends ht{constructor(){super()}template(){return this.renderTemplateString(dh)}};g(Qo,"pageTitle","Webpack bundle");oh();Uo(Xo,"/");Uo(Ko,"/getting-started");Uo(Qo,"/webpack");window.addEventListener("hashchange",()=>{location.hash&&Xh(location.hash)});function Xh(d,t=!0){try{let e=document.querySelector(d);e&&(t?window.scroll({top:e.offsetTop,behavior:"smooth"}):window.scroll({top:e.offsetTop}))}catch{console.log("error")}}})();
