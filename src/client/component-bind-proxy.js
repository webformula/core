const attrRegex = /([^\s=]*)?(?:="([^"]*)")?\s*/g;

export default function bindProxy(instance, variableReferences) {
  if (!variableReferences || Object.keys(variableReferences).length === 0) return;

  const proxies = new WeakMap();
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
      if (['render', 'onLoadRender', 'internalDisconnect'].includes(key) && typeof value === 'function') return value.bind(target);
      return value;
    },
    set(target, key, value, receiver) {
      const path = [].concat(proxies.get(receiver) || [], key).join('.');
      const variableReference = variableReferences[path];
      if (!variableReference) return Reflect.set(target, key, value, receiver);
      target[key] = value;

      handleBindings(instance.rootElement, instance.expressionBlocks, variableReference, variableReferences._idRefValue);
      return true;
    }
  };

  return new Proxy(instance, handler);
}

function handleBindings(rootElement, expressionBlocks, variableReference, refValues) {
  for (const variable of variableReference) {
    let templateValue;
    try { templateValue = variable.template(); } catch (e) { }

    if (variable.type === 'content') {
      // remove all nodes between expression blocks and re render template
      const startBlock = expressionBlocks.find(n => n.data.includes('wfc-exp-start') && n.data.includes(`wfc-bind-${variable.id}`));
      if (startBlock.parentElement.hasAttribute('wfc-no-binding')) return;
      const endBlock = expressionBlocks.find(n => n.data.includes('wfc-exp-end') && n.data.includes(`wfc-bind-${variable.id}`));
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
      if (boundElement.nodeName === 'INPUT' && variable.attr === 'value') boundElement.value = templateValue;
      boundElement.setAttribute(variable.attr, templateValue);

    } else if (variable.type === 'attr') {
      const attributeBlock = expressionBlocks.find(n => n.data.includes('wfc-exp-attr') && n.data.includes(`wfc-bind-${variable.id}`));
      const currentElement = attributeBlock.nextSibling;
      const oldAttrs = [...refValues[variable.id].lastValue.matchAll(attrRegex)].filter(v => !!v[1]).map(v => v[1]);
      const newAttrs = [...refValues[variable.id].value.matchAll(attrRegex)].filter(v => !!v[1]).map(v => ({ name: v[1], value: v[2] }));

      oldAttrs.forEach(name => currentElement.removeAttribute(name));
      newAttrs.forEach(({ name, value }) => {
        if (value === undefined) value = '';
        currentElement.setAttribute(name, value);
      });
    }
  }
}
