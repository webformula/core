import { isSignal, isMapHTML } from './signals.js';

const tagRegex = /<\w+([^<>]*<!--#-->[^<\/>]*)+\/?>/g;
const attrRegex = /(?:(\s+[^\s\/>"=]+)\s*=\s*"([\w\s]*<!--#-->[\w\s]*)")|(\s*<!--#-->\s*)/gi;
const signalCommentRegex = /<!--#-->/g;
const twoSpaceRegex = /\s\s/g;
const attrPlaceholderRegex = /###/g;
const insideCommentRegex = /<!--(?![.\s\S]*-->)/;
const attrReplaceString = '###';
const signalReplaceString = '<!--#-->';
const signalTextNodeString = '#wfc#';
const docReplaceString = '<!--#doc#-->';
const docCache = new Map();
const signalCache = new WeakMap();
const parser = new DOMParser();
const signalsToWatch = new Set();



export function html(strings, ...args) {
  args.reverse();

  const signals = [];
  const subDocs = [];
  let template = '';
  let i = 0;

  for (; i < strings.length - 1; i++) {
    const arg = args.pop();
    template = template + strings[i]

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
      template += signalReplaceString;
    } else if (arg instanceof NodeList) {
      subDocs.push(arg);
      template += docReplaceString;
    } else {
      template += sanitize(arg);
    }
  }
  template += strings[i];

  if (!docCache.has(template)) docCache.set(template, buildVirtualDOM(template));
  const doc = docCache.get(template);

  return prepareDOM(doc, signals, subDocs);
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
      item[0].value = item[1].replace('###', function () {
        return item[2][i++].untrackValue;
      });
    } else if (isMapHTML(signal)) {
      for (const node of item[2]) {
        node.remove();
      }
      const nodeList = signal.untrackValue;
      const activeNodes = [];
      for (const subNode of nodeList) {
        activeNodes.push(...subNode);
        item[0].parentElement.insertBefore(...subNode, item[0]);
      }
      item[2] = activeNodes;
    } else {
      item[0].textContent = signal.untrackValue;
    }
  }
}


function sanitize(str) {
  return ('' + str).replace(/[^\w. ]/gi, c => '&#' + c.charCodeAt(0) + ';');
  // for (const script of [...node.querySelectorAll('script')]) {
  //   script.remove();
  // }
}

function buildVirtualDOM(template) {
  template = adjustTemplateForAttributes(template);
  const doc = parser.parseFromString('<!DOCTYPE html><html><head></head><body>' + template + '</body></html>', 'text/html');
  const nodes = doc.createNodeIterator(
    doc.body,
    NodeFilter.COMMENT_NODE
  );

  let node = nodes.nextNode();
  while (node = nodes.nextNode()) {
    switch (node.nodeType) {
      case Node.COMMENT_NODE:
        // replace signal comment with textNode
        if (node.data === '#') {
          const textNode = doc.createTextNode(signalTextNodeString);
          node.parentElement.replaceChild(textNode, node);
        }
        break;
    }
  }

  return doc;
}

function adjustTemplateForAttributes(template) {
  return template.replace(tagRegex, function (all) {
    let attrNameCounter = 0; // ensures unique attr names <div ${page.disabled ? 'disabled' : ''}
    return all
      .replace(attrRegex, function (attr, _name, _value, expr) {
        if (expr) return attr.replace(signalCommentRegex, attrReplaceString + attrNameCounter++)
        return attr.replace(signalCommentRegex, attrReplaceString);
      }).replace(twoSpaceRegex, ' ');
  });
}

function prepareDOM(doc, args, subDocs) {
  args.reverse();
  subDocs.reverse();
  const importedNode = document.importNode(doc.body, true);
  const nodes = document.createNodeIterator(
    importedNode,
    NodeFilter.SHOW_ALL
  );

  let node = nodes.nextNode(); // first element is body. We do not want this
  while (node = nodes.nextNode()) {
    switch (node.nodeType) {
      case Node.COMMENT_NODE:
        if (node.data === '#doc#') {
          const subDoc = subDocs.pop();
          node.parentElement.insertBefore(...subDoc, node);
        }
        break;
      case Node.TEXT_NODE:
        if (node.textContent === signalTextNodeString) {
          const signal = args.pop();

          if (isMapHTML(signal)) {
            const nodeList = signal.untrackValue;
            const activeNodes = [];
            for (const subNode of nodeList) {
              activeNodes.push(...subNode);
              node.parentElement.insertBefore(...subNode, node);
            }
            signalCache.get(signal).push([node, nodeList, activeNodes]);
            node.textContent = '\n';

          } else {
            signalCache.get(signal).push([node]);
            node.textContent = signal.value;
          }
        }
        break;
      case Node.ELEMENT_NODE:
        const toRemove = []
        const toAdd = []

        let i = 0;
        for (; i < node.attributes.length; i++) {
          if (node.attributes[i].value.includes(attrReplaceString)) {
            const signals = new Set();
            const expressions = [];
            const templateValue = node.attributes[i].value;

            node.attributes[i].value = templateValue.replace(attrPlaceholderRegex, function () {
              const signal = args.pop();
              expressions.push(signal)
              if (isSignal(signal)) {
                signals.add(signal);
                return signal.value;
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
          } else if (node.attributes[i].name.includes(attrReplaceString)) {
            const signal = args.pop();
            signalCache.get(sig).push([node.attributes[i], expressions]);
            toAdd.push(node.ownerDocument.createAttribute(signal));
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

  return importedNode.childNodes;
}
