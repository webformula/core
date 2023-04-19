(()=>{"use strict";var e={d:(t,r)=>{for(var a in r)e.o(r,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:r[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{HTMLElementExtended:()=>n,Page:()=>r,enableSPA:()=>b,registerPage:()=>E});class r{pageTitle;routes=[];#e;#t;constructor(e,t){this.pageTitle=e,this.routes=t}get searchParameters(){return this.#t}get urlParameters(){return this.#e}connectedCallback(){}disconnectedCallback(){}async beforeRender(){}async afterRender(){}template(){return""}renderTemplateString(e=""){return new Function("page",`return \`${e}\`;`).call(this,this)}escape(e){return e.replace(/[^\w. ]/gi,(function(e){return"&#"+e.charCodeAt(0)+";"}))}async render(){const e=document.querySelector("page-content");if(!e)throw Error("Could not find <page-content>");await this.beforeRender(),e.innerHTML=this.template.call(this,this),document.querySelector("title").innerText=this.pageTitle,await this.afterRender()}_setUrlData(e={urlParameters:{},searchParameters:{}}){this.#e=e?.urlParameters||{},this.#t=e?.searchParameters||{}}}const a={};class n extends HTMLElement{useShadowRoot=!1;useTemplate=!0;#r=!1;#a;#n;#s=!this.template.toString().includes('template(){return""}');#o=this;#c=function(e){return Array.from(e).reduce(((e,t)=>Math.imul(31,e)+t.charCodeAt(0)|0),0)}(this.constructor.toString());constructor(){var e;super(),this.#s&&(e=()=>{this.#i(),this.render()},o.push(e),!1===c&&(l.observe(s,{characterData:!0}),c=!0,s.data=i++))}get rendered(){return this.#r}connectedCallback(){}disconnectedCallback(){}template(){return""}renderTemplateString(e=""){return new Function(`return \`${e}\`;`).call(this)}beforeRender(){}afterRender(){}render(){this.#r&&this.beforeRender(),this.useTemplate||(this.#n.innerHTML=this.template()),this.#o.replaceChildren(this.#n.content.cloneNode(!0)),this.#r=!0,this.afterRender()}stringifyStyleSheet(e){return e?[...e.cssRules].map((e=>e.cssText)).join("\n"):""}#i(){this.#a=this.template(),this.useTemplate?(a[this.#c]||(a[this.#c]=document.createElement("template"),a[this.#c].innerHTML=this.#a),this.#n=a[this.#c]):this.#n=document.createElement("template"),this.useShadowRoot?(this.attachShadow({mode:"open"}),this.#o=this.shadowRoot):this.#o=this}}const s=document.createTextNode("");let o=[],c=!1,i=0;const l=new MutationObserver((()=>{for(;o.length;)o.pop()();l.disconnect(),c=!1})),h=/\/:|\*/g,d=/([:*])(\w+)/g,u=/\*/g,p="(?:.*)",m="(?:/$|$)",g=[];let w,f;function b(){window.paxCoreSPA=!0,document.addEventListener("click",(e=>{if(e.target.matches("[href]"))if(e.target.getAttribute("href").includes("://")){const t=e.target.getAttribute("target");["_blank","_self","_parent","_top"].includes(t)&&window.open(e.target.getAttribute("href"),t).focus()}else e.preventDefault(),P(new URL(e.target.href)),e.target.blur()})),window.addEventListener("popstate",(e=>{P(new URL(e.currentTarget.location),!0)}))}function E(e,t,r=!1){(t=[...new Set([t,...e.routes||[]])].map((e=>`/${e.replace(/\/$/,"").replace(/^\//,"")}`)))?(t.forEach((t=>{const r=function(e){let t;return t=null===e.match(h)?new RegExp(`^${e}$`):new RegExp(`^${e.replace(d,((e,t,r)=>`(?<${r}>[^/]+)`)).replace(u,p)}${m}$`,""),t}(t);g.push({route:t,routeRegex:r,pageClass:e.constructor}),null!==location.pathname.match(r)&&P(location)})),r&&(w={pageClass:e.constructor}),clearTimeout(f),f=setTimeout((()=>{f=void 0,!window.page&&w&&P(location)}),0)):console.warn("No routes provided for page")}function P(e,t=!1){const r=e.pathname,a=window.page;if(!1===t&&a&&r===location.pathname)return function(e){const t=e.hash;t!==location.hash&&(window.history.pushState({},"",t),t&&window.dispatchEvent(new Event("hashchange")))}(e);let n=function(e){const t=g.find((({routeRegex:t})=>null!==e.match(t)));if(!t)return;const r=e.match(t.routeRegex),a=Object.fromEntries(new URLSearchParams(location.search.split(/\?(.*)?$/).slice(1).join("")).entries());return{...t,urlParameters:r.groups,searchParameters:a}}(r);if(a===r)return;if(!n){if(!w)return void console.warn(`No page found for path: ${r}`);n=w}const s=n.pageClass?new n.pageClass:{};var o;(o=r)===location.href||o===location.pathname?!0===t&&setTimeout((()=>{window.dispatchEvent(new Event("locationchange"))}),0):(window.history.pushState({},"",`${r}${e.hash}`),window.dispatchEvent(new Event("locationchange")));const c=e.hash===location.hash;e.hash&&!c&&window.dispatchEvent(new Event("hashchange")),!0===t&&location.hash&&setTimeout((()=>{window.dispatchEvent(new Event("hashchange"))}),0),a&&a.disconnectedCallback(),window.page=s,s._setUrlData({urlParameters:n.urlParameters,searchParameters:n.searchParameters||{}}),s.render(),document.body.scrollTop=0,document.documentElement.scrollTop=0,s.connectedCallback()}})();