import i18n from './i18n.js';

const expressionCommentBlockRegex = /<!--(?:(?!-->)[\S\s])*-->/g;
const expressionOpenRegex = /(?<!\\)\${/g;
const expressionCloseRegex = /(?<!\\)}/g;
const expressionTickRegex = /(?<!\\)`/g;
const variableRegex = /(?:\page\.|this\.)((?:[a-zA-Z0-9_.]+)+)(\(|'|"|\s*={1,3})?/g;
const attributeValueMatchRegex = /\s+(\S+)=\s*\"\s*$/;
const attributeMatchRegex = /<([^<>]*)$/;
const idPageRegex = /id\s*=\s*"\page"/g;
const attrRegex = /([^\s=]*)?(?:="([^"]*)")?\s*/g;
const noBindingEndTag = /(<code[^<>]+>|<[^<]+wfc-no-binding[^>]*>)(:?[\s\n]*)?$/;


let bindingsDisabled = !!document.querySelector('meta[name="wfc-disable-binding"]');
export function disableBindings() {
  bindingsDisabled = true;
}

export default class BindPage  {
  #instance;
  #proxy;
  #proxies;
  #parsed;
  #templateString;
  #variableReferences = {};
  #expressionBlocks = [];
  #refValues = {};


  constructor(instance) {
    this.#instance = instance;

    this.#buildProxy();
  }


  get parsed() { return this.#parsed; }
  get proxy() { return this.#proxy; }
  get templateString() { return this.#templateString; }
  get refValues() { return this.#refValues; }
  get variableReferences() { return this.#variableReferences; }
  get enabled() { return !bindingsDisabled; }
  
  postRender() {
    const nodeIterator = document.createNodeIterator(
      document.body,
      NodeFilter.SHOW_COMMENT,
      (node) => node.data.includes('wfc-exp')
    );
    
    let currentNode;
    while ((currentNode = nodeIterator.nextNode())) {
      this.#expressionBlocks.push(currentNode);
    }
  }

  parseTemplate() {
    this.#parsed = true;

    let templateString = this.#instance.constructor.html || this.#instance.template.toString().replace(/^[^`]*/, '').replace(/[^`]*$/, '').slice(1, -1);
    if (templateString.match(idPageRegex)) throw Error('An element contains id="page". This is not allowed');
    if (bindingsDisabled) return () => new Function('page', `return \`${templateString}\`;`).call(this.#instance, this.#instance);

    const htmlCommentBlocks = [...templateString.matchAll(expressionCommentBlockRegex)].map(v => [v.index, v.index + v[0].length]);
    const expressionOpens = [...templateString.matchAll(expressionOpenRegex)].map(v => ['open', v.index]);
    const expressionClose = [...templateString.matchAll(expressionCloseRegex)].map(v => ['close', v.index]);
    const expressionTick = [...templateString.matchAll(expressionTickRegex)].map(v => ['tick', v.index]);
    const combined = [...expressionOpens, ...expressionClose, ...expressionTick].sort((a, b) => a[1] - b[1]);
    let wrapOpened = false;
    let opened = false;
    let opens = 0;
    let closes = 0;
    let inTick = false;
    let ticks = 0;

    /* look through chars and categorize them
   * open = initial '${'
   * open-sub = '${' after initial
   * tick-open = opening '`'
   * tick-close = closing '`'
   * close = final '}'
   * close-sub = '}' inner close before final
   * close-tick = '}' inside of ticks (not a real close) */

    const expressionIndexes = [];
    for (const item of combined) {
      if (htmlCommentBlocks.find(([start, end]) => item[1] > start && item[1] < end)) continue;

      switch (item[0]) {
        case 'open':
          opens += 1;
          inTick = false;
          if (!opened) {
            opened = true;
            wrapOpened = true;
            expressionIndexes.push(item);
            continue;
          } if (wrapOpened) {
            expressionIndexes.push(['open-sub', item[1]]);
            continue;
          }

        case 'close':
          if (!wrapOpened) continue;
          if (!inTick) {
            closes += 1;
            if (closes >= opens) {
              wrapOpened = false;
              opened = false;
              opens = 0;
              closes = 0;
              ticks = 0;
              expressionIndexes.push(['close', item[1]]);
              continue;
            } else if (ticks > 0) {
              inTick = true;
              expressionIndexes.push(['close-sub', item[1]]);
              continue;
            }
            expressionIndexes.push(['close-tick', item[1]]);
            continue;
          }
          expressionIndexes.push(['close-tick', item[1]]);
          continue;

        case 'tick':
          if (!wrapOpened) continue;
          if (!inTick) {
            inTick = true;
            ticks += 1;
            expressionIndexes.push(['tick-open', item[1]]);
            continue;
          } else {
            ticks -= 1;
            inTick = false;
            expressionIndexes.push(['tick-close', item[1]]);
            continue;
          }
      }
    }


    // group based on 'open' and 'close' chars
    const grouped = [];
    const types = ['open', 'open-sub', 'close-sub'];
    let last;
    for (const item of expressionIndexes) {
      const type = item[0];
      if (type === 'open') {
        grouped.push({
          open: item[1],
          variables: []
        });
        last = undefined;
      } else if (type === 'close') {
        grouped[grouped.length - 1].close = item[1];
      }

      // find variables in expression
      // We are skipping over string sections ${`text ${this.var}`}
      if (last && types.includes(last[0])) {
        [...templateString.substring(last[1], item[1]).matchAll(variableRegex)]
          .filter(v => !v[2] || v[2].trim() === '==' || v[2].trim() === '===')
          .forEach(v => {
            if (!grouped[grouped.length - 1].variables.includes(v[1])) grouped[grouped.length - 1].variables.push(v[1]);
          });
      }

      last = item;
    }


    // Modify template and build variable reference
    // Attributes: add 'wfc-bind-${id}' attribute to element
    // Element content: wrap in comments <!-- wfc-exp-end wfc-bind-${id} -->${}<!-- wfc-exp-start wfc-bind-${id} -->
    //   comments are used to replace content
    const groupedVariables = grouped.reverse().filter(({ variables }) => variables.length > 0);

    let id = 0;
    for (const group of groupedVariables) {
      let templateStr = templateString.slice(group.open, group.close + 1);
      const attrValueMatch = templateString.slice(0, group.open).match(attributeValueMatchRegex);
      const attrMatch = attrValueMatch === null && templateString.slice(0, group.open).match(attributeMatchRegex);

      if (attrValueMatch !== null) {
        templateString = `${templateString.slice(0, attrValueMatch.index)} wfc-bind-${id}${attrValueMatch[0]}${templateString.slice(group.open)}`;
      } else if (attrMatch !== null) {
        templateStr = `${templateString.slice(attrMatch.index, group.open)}\${page.bindAttrVal(\`${templateString.slice(group.open, group.close + 1)}\`, ${id})}${templateString.slice(group.close + 1)}`;
        templateString = `${templateString.slice(0, attrMatch.index)}<!-- wfc-exp-attr wfc-bind-${id} -->${templateStr}`;
      } else {
        const preStart = templateString.slice(0, group.open);
        if (preStart.match(noBindingEndTag)) continue;
        templateString = `${templateString.slice(0, group.close + 1)}<!-- wfc-exp-end wfc-bind-${id} -->${templateString.slice(group.close + 1)}`;
        templateString = `${preStart}<!-- wfc-exp-start wfc-bind-${id} -->${templateString.slice(group.open)}`;
      }

      const variableConfig = {
        id: id++,
        type: attrValueMatch !== null ? 'attr-value' : attrMatch !== null ? 'attr' : 'content',
        attr: attrValueMatch !== null ? attrValueMatch[1] : undefined,
        template: () => new Function('page', `return \`${templateStr}\`;`).call(this.#instance, this.#instance)
      };

      // split variable into sub paths for easy lookup
      // one.two = ['one', 'one.two']
      for (const variable of group.variables) {
        const modifiedVariable = variable.split('.').join('.');
        const properties = modifiedVariable
          .split('.').slice(1)
          .map(prop => modifiedVariable.slice(0, modifiedVariable.indexOf(prop) - 1)).concat(modifiedVariable);
        properties.forEach(parentProperty => {
          if (!this.#variableReferences[parentProperty]) this.#variableReferences[parentProperty] = [];
          this.#variableReferences[parentProperty].push(variableConfig);
        });
      }
    }

    this.#templateString = templateString;
    return () => new Function('page', `return \`${templateString}\`;`).call(this.#instance, this.#instance);
  }


  #buildProxy() {
    this.#proxies = new WeakMap();
    const variableReferences = this.#variableReferences;
    const proxies = this.#proxies;
    const handleBindings = this.#handleBindings.bind(this);

    const handler = {
      get(target, key, receiver) {
        if (key == 'isProxy') return true;

        // create sub proxy for nested paths: this.one.two
        if (variableReferences[key]) {
          const varValue = target[key];
          if (typeof varValue == 'undefined') return;
          if (!varValue.isProxy && typeof varValue === 'object') {
            const prox = new Proxy(varValue, handler);
            const routes = [].concat(proxies.get(receiver) || [], key);
            proxies.set(prox, routes);
            target[key] = prox;
          }
        }

        const value = target[key];
        // bind render to original class object so it has access to private variables;
        if (['render', 'internalDisconnect', 'bindAttrVal'].includes(key) && typeof value === 'function') return value.bind(target);
        return value;
      },

      set(target, key, value, receiver) {
        const path = [].concat(proxies.get(receiver) || [], key).join('.');
        const variableReference = variableReferences[path];
        if (!variableReference) return Reflect.set(target, key, value, receiver);
        target[key] = value;
        handleBindings(variableReference);
        i18n.bindingVariableChange(key);
        return true;
      }
    };

    this.#proxy = new Proxy(this.#instance, handler);
  }

  #handleBindings(variableReference) {
    const expressionBlocks = this.#expressionBlocks;
    const rootElement = this.#instance.rootElement;

    for (const variable of variableReference) {
      let templateValue;
      try { templateValue = variable.template(); } catch (e) { }

      if (variable.type === 'content') {
        // remove all nodes between expression blocks and re render template
        const startBlock = expressionBlocks.find(n => n.data.trim().startsWith('wfc-exp-start') && n.data.trim().endsWith(`wfc-bind-${variable.id}`));
        if (startBlock.parentElement.hasAttribute('wfc-no-binding')) return;
        const endBlock = expressionBlocks.find(n => n.data.trim().startsWith('wfc-exp-end') && n.data.trim().endsWith(`wfc-bind-${variable.id}`));
        const replaceNodes = [];
        let currentNode = startBlock.nextSibling;
        while (currentNode !== endBlock) {
          replaceNodes.push(currentNode);
          currentNode = currentNode.nextSibling;
        }
        replaceNodes.forEach(n => n.remove());
        const template = document.createElement('template');
        template.innerHTML = templateValue;
        startBlock.parentElement.insertBefore(template.content, endBlock);

      } else if (variable.type === 'attr-value') {
        const boundElement = rootElement.querySelector(`[wfc-bind-${variable.id}]`);
        if (boundElement.hasAttribute('wfc-no-binding')) return;
        if (boundElement.nodeName === 'INPUT' && variable.attr === 'value' && boundElement.value !== templateValue) boundElement.value = templateValue;
        if (boundElement.getAttribute(variable.attr) !== templateValue) boundElement.setAttribute(variable.attr, templateValue);
        
      } else if (variable.type === 'attr') {
        const attributeBlock = expressionBlocks.find(n => n.data.trim().startsWith('wfc-exp-attr') && n.data.trim().endsWith(`wfc-bind-${variable.id}`));
        const currentElement = attributeBlock.nextSibling;
        const oldAttrs = [...this.#refValues[variable.id].lastValue.matchAll(attrRegex)].filter(v => !!v[1]).map(v => v[1]);
        const newAttrs = [...this.#refValues[variable.id].value.matchAll(attrRegex)].filter(v => !!v[1]).map(v => ({ name: v[1], value: v[2] }));

        oldAttrs.forEach(name => currentElement.removeAttribute(name));
        newAttrs.forEach(({ name, value }) => {
          if (value === undefined) value = '';
          currentElement.setAttribute(name, value);
        });
      }
    }
  }
}
