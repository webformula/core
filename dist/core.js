(()=>{"use strict";var e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{HTMLElementExtended:()=>a,Page:()=>r,enableSPA:()=>E,registerPage:()=>b});class r{pageTitle;routes=[];#e;#t;constructor(e,t){this.pageTitle=e,this.routes=t}get searchParameters(){return this.#t}get urlParameters(){return this.#e}connectedCallback(){}disconnectedCallback(){}async beforeRender(){}async afterRender(){}template(){return""}renderTemplateString(e=""){return new Function("page",`return \`${e}\`;`).call(this,this)}escape(e){return e.replace(/[^\w. ]/gi,(function(e){return"&#"+e.charCodeAt(0)+";"}))}async render(){const e=document.querySelector("page-content");if(!e)throw Error("Could not find <page-content>");await this.beforeRender(),e.innerHTML=this.template.call(this,this),document.querySelector("title").innerText=this.pageTitle,await this.afterRender()}_setUrlData(e={urlParameters:{},searchParameters:{}}){this._urlParameters=e?.urlParameters||{},this._searchParameters=e?.searchParameters||{}}}const n={};class a extends HTMLElement{useShadowRoot=!1;useTemplate=!0;#r=!1;#n;#a;#o=!this.template.toString().includes('template(){return""}');#s=this;#c=function(e){return Array.from(e).reduce(((e,t)=>Math.imul(31,e)+t.charCodeAt(0)|0),0)}(this.constructor.toString());constructor(){var e;super(),this.#o&&(e=()=>{this.#i(),this.render()},s.push(e),!1===c&&(l.observe(o,{characterData:!0}),c=!0,o.data=i++))}get rendered(){return this.#r}connectedCallback(){}disconnectedCallback(){}template(){return""}renderTemplateString(e=""){return new Function(`return \`${e}\`;`).call(this)}beforeRender(){}afterRender(){}render(){this.#r&&this.beforeRender(),this.useTemplate||(this.#a.innerHTML=this.template()),this.#s.replaceChildren(this.#a.content.cloneNode(!0)),this.#r=!0,this.afterRender()}stringifyStyleSheet(e){return e?[...e.cssRules].map((e=>e.cssText)).join("\n"):""}#i(){this.#n=this.template(),this.useTemplate?(n[this.#c]||(n[this.#c]=document.createElement("template"),n[this.#c].innerHTML=this.#n),this.#a=n[this.#c]):this.#a=document.createElement("template"),this.useShadowRoot?(this.attachShadow({mode:"open"}),this.#s=this.shadowRoot):this.#s=this}}const o=document.createTextNode("");let s=[],c=!1,i=0;const l=new MutationObserver((()=>{for(;s.length;)s.pop()();l.disconnect(),c=!1})),h=/\/:|\*/g,d=/([:*])(\w+)/g,u=/\*/g,p="(?:.*)",m="(?:/$|$)",g=[];let w,f;function E(){window.paxCoreSPA=!0,document.addEventListener("click",(e=>{if(e.target.matches("[href]"))if(e.target.getAttribute("href").includes("://")){const t=e.target.getAttribute("target");["_blank","_self","_parent","_top"].includes(t)&&window.open(e.target.getAttribute("href"),t).focus()}else e.preventDefault(),T(new URL(e.target.href)),e.target.blur()})),window.addEventListener("popstate",(e=>{T(new URL(e.currentTarget.location),!0)}))}function b(e,t,r=!1){(t=t||e.routes)?([].concat(t).forEach((r=>{const n=function(e){let t;return t=null===e.match(h)?new RegExp(`^${e}$`):new RegExp(`^${e.replace(d,((e,t,r)=>`(?<${r}>[^/]+)`)).replace(u,p)}${m}$`,""),t}(r);[].concat(t).forEach((t=>g.push({route:t,routeRegex:n,pageClass:e.constructor}))),null!==location.pathname.match(n)&&T(location)})),r&&(w={pageClass:e.constructor}),clearTimeout(f),f=setTimeout((()=>{f=void 0,!window.page&&w&&T(location)}),0)):console.warn("No routes provided for page")}function T(e,t=!1){const r=e.pathname,n=window.page;if(!1===t&&n&&r===location.pathname)return function(e){const t=e.hash;t!==location.hash&&(window.history.pushState({},"",t),t&&window.dispatchEvent(new Event("hashchange")))}(e);const a=r||location.pathname;let o=function(e){const t=g.find((({routeRegex:t})=>null!==e.match(t)));if(!t)return;const r=e.match(t.routeRegex);return{...t,urlParameters:r.groups}}(a);if(n===a)return;if(!o){if(!w)return void console.warn(`No page found for url: ${r}`);o=w}const s=o.pageClass?new o.pageClass:{},c=function(e){return e===location.href||e===location.pathname}(r);c?!0===t&&setTimeout((()=>{window.history.pushState({},"",`${r}${e.hash}`),window.dispatchEvent(new Event("locationchange"))}),0):(window.history.pushState({},"",`${r}${e.hash}`),window.dispatchEvent(new Event("locationchange")));const i=e.hash===location.hash;e.hash&&!i&&window.dispatchEvent(new Event("hashchange")),!0===t&&location.hash&&setTimeout((()=>{window.dispatchEvent(new Event("hashchange"))}),0),n&&n.disconnectedCallback(),window.page=s,s._setUrlData({urlParameters:o.urlParameters,searchParameters:{}}),s.render(),document.body.scrollTop=0,document.documentElement.scrollTop=0,s.connectedCallback()}})();