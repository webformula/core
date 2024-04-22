import { isSignal, isMapHTML } from './signals.js';

const attrString = '###';
const signalString = '#signal#';
const signalComment = `<!--${signalString}-->`;
const subTemplateString = '#template#';
const subTemplateComment = `<!--${subTemplateString}-->`;
const tagRegex = new RegExp(`<\\w+([^<>]*${signalComment}[^<\\/>]*)+\\/?>`, 'g');
const attrRegex = new RegExp(`(?:(\\s+[^\\s\\/>"=]+)\\s*=\\s*"([\\w\\s]*${signalComment}[\\w\\s]*)")|(\\s*${signalComment}\\s*)`, 'g');
const signalCommentRegex = new RegExp(signalComment, 'g');
const twoSpaceRegex = /\s\s/g;
const attrPlaceholderRegex = new RegExp(attrString, 'g');
const insideCommentRegex = /<!--(?![.\s\S]*-->)/;
const templateCache = new Map();
const signalCache = new WeakMap();
const signalsToWatch = new Set();
const dangerousNodes = ['SCRIPT', 'IFRAME', 'NOSCRIPT'];
const dangerousAttributesLevel2 = ['src', 'href', 'xlink:href'];
const dangerousAttributesLevel1 = ['onload', 'onerror'];
const securityLevels = [0,1,2];
let securityLevel = 1;



export function setSecurityLevel(level = 1) {
  if (!securityLevels.includes(level)) throw Error('Invalid security level. Valid values [0,1,2]')
  securityLevel = level;
}

export function html(strings, ...args) {
  args.reverse();

  const signals = [];
  const subClonedNodes = [];
  let template = '';
  let i = 0;

  for (; i < strings.length - 1; i++) {
    const arg = args.pop();
    template = template + strings[i];

    // replace commented out expression
    const lastCommentOpen = template.match(insideCommentRegex);
    if (lastCommentOpen) {
      template += '\${commented expression}';
    } else if (isSignal(arg)) {
      signals.push(arg);
      if (!signalCache.has(arg)) {
        signalCache.set(arg, []);
        signalsToWatch.add(arg);
      }
      template += signalComment;
    } else if (arg instanceof DocumentFragment) {
      subClonedNodes.push(arg);
      template += subTemplateComment;
    } else {
      template += escape(arg);
    }
  }
  template += strings[i];

  if (!templateCache.has(template)) templateCache.set(template, buildTemplateElement(template));
  const templateElement = templateCache.get(template);

  return prepareTemplateElement(templateElement, signals, subClonedNodes);
}

export function watchSignals() {
  queueMicrotask(() => {
    for(const sig of signalsToWatch) {
      sig.watch(signalChange);
    }
  });
}

// what is html is used outside of page?
export function destroySignalCache() {
  for (const sig of signalsToWatch) {
    sig.unwatch(signalChange);
  }
  signalsToWatch.clear();
}






function signalChange(signal) {
  const signalItems = signalCache.get(signal);
  if (!signalItems) return;

  for (const item of signalItems) {
    // TODO im not sure i can assume the an element not connected can be ignored
    //      Could be temporally removed, like reordering list
    // if (!item[0].isConnected) {
    //   signalItems.splice(signalItems.indexOf(item), 1);
    //   continue;
    // }

    if (item[0].nodeType === Node.ATTRIBUTE_NODE) {
      let i = 0;
      item[0].value = item[1].replace(attrString, function () {
        return item[2][i++].untrackValue;
      });
    } else if (isMapHTML(signal)) {
      for (const node of item[2]) {
        node.remove();
      }
      const nodeList = signal.untrackValue;
      const activeNodes = [];
      for (const subNode of nodeList) {
        activeNodes.push(...subNode.childNodes);
        item[0].parentElement.insertBefore(subNode, item[0]);
      }
      item[2] = activeNodes;
    } else {
      item[0].textContent = signal.untrackValue;
    }
  }
}

function buildTemplateElement(template) {
  template = adjustTemplateForAttributes(template);
  const templateElement = document.createElement('template');
  templateElement.innerHTML = template;
  const nodes = document.createNodeIterator(
    templateElement.content,
    NodeFilter.SHOW_ALL
  );

  let node = nodes.nextNode();
  while (node = nodes.nextNode()) {
    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        sanitizeNode(node);
        break;

      case Node.COMMENT_NODE:
        // replace signal comment with textNode
        if (node.data === signalString) {
          const textNode = document.createTextNode(signalString);
          node.parentElement.replaceChild(textNode, node);
        }
        break;
    }
  }

  return templateElement;
}

function adjustTemplateForAttributes(template) {
  return template.replace(tagRegex, function (all) {
    let attrNameCounter = 0; // ensures unique attr names <div ${page.disabled ? 'disabled' : ''}
    return all
      .replace(attrRegex, function (attr, _name, _value, expr) {
        if (expr) return attr.replace(signalCommentRegex, attrString + attrNameCounter++)
        return attr.replace(signalCommentRegex, attrString);
      }).replace(twoSpaceRegex, ' ');
  });
}

function prepareTemplateElement(templateElement, args, subClonedNodes) {
  args.reverse();
  subClonedNodes.reverse();
  const clonedNode = templateElement.content.cloneNode(true);
  const nodes = document.createNodeIterator(
    clonedNode,
    NodeFilter.SHOW_ALL
  );

  let node = nodes.nextNode(); // first element is body. We do not want this
  while (node = nodes.nextNode()) {
    switch (node.nodeType) {
      case Node.COMMENT_NODE:
        if (node.data === subTemplateString) {
          const subClonedNode = subClonedNodes.pop();
          node.parentElement.insertBefore(subClonedNode, node);
        }
        break;
      case Node.TEXT_NODE:
        if (node.textContent === signalString) {
          const signal = args.pop();

          if (isMapHTML(signal)) {
            const nodeList = signal.untrackValue;
            const activeNodes = [];
            for (const subNode of nodeList) {
              activeNodes.push(...subNode.childNodes);
              node.parentElement.insertBefore(subNode, node);
            }
            signalCache.get(signal).push([node, nodeList, activeNodes]);
            node.textContent = '\n';

          } else {
            signalCache.get(signal).push([node]);
            node.textContent = signal.untrackValue;
          }
        }
        break;
      case Node.ELEMENT_NODE:
        const toRemove = []
        const toAdd = []

        let i = 0;
        for (; i < node.attributes.length; i++) {
          if (node.attributes[i].value.includes(attrString)) {
            const signals = new Set();
            const expressions = [];
            const templateValue = node.attributes[i].value;

            node.attributes[i].value = templateValue.replace(attrPlaceholderRegex, function () {
              const signal = args.pop();
              expressions.push(signal)
              if (isSignal(signal)) {
                signals.add(signal);
                return signal.untrackValue;
              }
              return signal;
            });

            if (signals.size > 0) {
              for (const sig of signals) {
                signalCache.get(sig).push([node.attributes[i], templateValue, expressions]);
              }
              signals.clear();
            }

          // handle expression attr <div ${this.var}>
          } else if (node.attributes[i].name.includes(attrString)) {
            const expressionValue = args.pop();
            // TODO handle signals?
            // signalCache.get(sig).push([node.attributes[i], expressions]);
            toAdd.push(document.createAttribute(expressionValue));
            toRemove.push(node.attributes[i]);
          }
        }

        // Add and remove after to prevent node attributes from being modified on parse
        i = 0;
        for (; i < toAdd.length; i++) {
          node.setAttributeNode(toAdd[i]);
        }
        i = 0;
        for (; i < toRemove.length; i++) {
          node.removeAttributeNode(toRemove[i]);
        }
        break;
    }
  }

  return clonedNode;
}



/**
 * Escaped content not wrapped in html template tag ${`anything`}
 *   The sanitizeNode method will handle xss
 */
const escapeElement = document.createElement('p');
function escape(str) {
  escapeElement.textContent = str;
  return escapeElement.innerHTML;
}


/**
 * Provide basic protection from XSS
 *   This is meant as a safety net. This should not be relied on to prevent attacks.
 * 
 * TODO replace with HTML Sanitizer API when available. https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API
 */
const dangerousAttributeValueRegex = /javascript:|eval\(|alert|document.cookie|document\[['|"]cookie['|"]\]|&\#\d/gi;
function sanitizeNode(node) {
  let sanitized = false;

  if (dangerousNodes.includes(node.nodeName)) {
    if (securityLevel === 0) {
      if (window.wfcDev === true) console.warn(`Template sanitizer (WARNING): Potentially dangerous node NOT removed because of current level (${securityLevel}) "${node.nodeName}"`);
    } else {
      if (window.wfcDev === true) console.warn(`Template sanitizer (INFO): A ${node.nodeName} tag was removed because of security level (${securityLevel})`);
      node.remove();
      sanitized = true;
    }
  }

  const attributes = node.attributes;
  for (const attr of attributes) {
    if (sanitizeAttribute(attr) === true) sanitized = true;
  }

  return sanitized;
}

function sanitizeAttribute(attr) {
  const nameSanitized = sanitizeAttributeName(attr.name, attr.value);
  const valueSanitized = sanitizeAttributeValue(attr.name, attr.value);
  if (nameSanitized || valueSanitized) {
    if (window.wfcDev === true) console.warn(`Template sanitizer (INFO): Attribute removed "${attr.name}: ${attr.value}"`);
    attr.ownerElement.removeAttribute(attr.name);
    return true;
  }
  return false;
}

function sanitizeAttributeName(name, value) {
  let shouldRemoveLevel2 = false;
  let shouldRemoveLevel1 = false;

  if ((name.startsWith('on') || dangerousAttributesLevel2.includes(name))) shouldRemoveLevel2 = true;
  if (dangerousAttributesLevel1.includes(name)) shouldRemoveLevel1 = true;

  if (
    window.wfcDev === true &&
    (securityLevel === 1 && shouldRemoveLevel2 && !shouldRemoveLevel1)
    || (securityLevel === 0 && (!shouldRemoveLevel2 || !shouldRemoveLevel1))
  ) {
    console.warn(`Template sanitizer (WARNING): Potentially dangerous attribute NOT removed because of current level (${securityLevel}) "${name}: ${value}"`);
  }

  return (shouldRemoveLevel1 && securityLevel > 0) || (shouldRemoveLevel2 && securityLevel === 2);
}

function sanitizeAttributeValue(name, value) {
  value = value.replace(/\s+/g, '').toLowerCase();
  if (value.match(dangerousAttributeValueRegex) !== null) {
    if (securityLevel === 0) {
      console.warn(`Template sanitizer (WARNING): Potentially dangerous attribute NOT removed because of current level (${securityLevel}) "${name}: ${value}"`);
    } else return true;
  }

  return false;
}
