const expressionOpenRegex = /(?<!\\)\${/g;
const expressionCloseRegex = /(?<!\\)}/g;
const expressionTickRegex = /(?<!\\)`/g;
const variableRegex = /(?:page\.|this\.)((?:[a-zA-Z0-9_.]+)+)(\(|'|"|\s*={1,3})?/g;
const attributeValueMatchRegex = /\s+(\S+)=\s*\"\s*$/;
const attributeMatchRegex = /<(\S+)([^<>]*)$/;

// modify template and create expression variable reference
export default function expressionParse(instance, templateString) {
  if (window.webformulaCoreBinding === false) return templateString;

  const expressionOpens = [...templateString.matchAll(expressionOpenRegex)].map(v => ['open', v.index]);
  const expressionClose = [...templateString.matchAll(expressionCloseRegex)].map(v => ['close', v.index]);
  const expressionTick = [...templateString.matchAll(expressionTickRegex)].map(v => ['tick', v.index]);
  const combined = [...expressionOpens, ...expressionClose, ...expressionTick].sort((a, b) => a[1] - b[1]);
  let opened = false;
  let opens = 0;
  let closes = 0;
  let inTick = false;
  let ticks = 0;

  // look through chars and categorize them
  // open = initial '${'
  // open-sub = '${' after initial
  // tick-open = opening '`'
  // tick-close = closing '`'
  // close = final '}'
  // close-sub = '}' inner close before final
  // close-tick = '}' inside of ticks (not a real close)
  const expressionIndexes = combined.map(([type, index]) => {
    switch (type) {
      case 'open':
        opens += 1;
        inTick = false;
        if (!opened) {
          opened = true;
          return [type, index];
        }
        return ['open-sub', index];

      case 'close':
        if (!inTick) {
          closes += 1;
          if (closes >= opens) {
            opened = false;
            opens = 0;
            closes = 0;
            ticks = 0;
            return ['close', index];
          } else if (ticks > 0) {
            inTick = true;
            return ['close-sub', index];
          }
          return ['close-tick', index];
        }
        return ['close-tick', index];

      case 'tick':
        if (!inTick) {
          inTick = true;
          ticks += 1;
          return ['tick-open', index];
        } else {
          ticks -= 1;
          inTick = false;
          return ['tick-close', index];
        }
    }
  });

  // group based on 'open' and 'close' chars
  const grouped = [];
  let last;
  for (let i = 0; i < expressionIndexes.length; i += 1) {
    const type = expressionIndexes[i][0];
    if (type === 'open') {
      grouped.push({
        open: expressionIndexes[i][1],
        variables: []
      });
      last = undefined;
    } else if (type === 'close') {
      grouped[grouped.length - 1].close = expressionIndexes[i][1];
    }

    // find variables in expression
    // We are skipping over string sections ${`text ${this.var}`}
    if (last && ['open', 'open-sub', 'close-sub'].includes(last[0])) {
      [...templateString.substring(last[1], expressionIndexes[i][1]).matchAll(variableRegex)]
        .filter(v => !v[2] || v[2].trim() === '==' || v[2].trim() === '===')
        .forEach(v => {
          if (!grouped[grouped.length - 1].variables.includes(v[1])) grouped[grouped.length - 1].variables.push(v[1]);
        });
    }

    last = expressionIndexes[i];
  }

  // Modify template and build variable reference
  // Attributes: add 'wfc-bind-${id}' attribute to element
  // Element content: wrap in comments <!-- expression-block-end wfc-bind-${id} -->${}<!-- expression-block-start wfc-bind-${id} -->
  //   comments are used to replace content
  const variableReferences = {};
  grouped.reverse()
    .filter(({ variables }) => variables.length > 0)
    .forEach(({ open, close, variables }, i) => {
      const templateStr = templateString.slice(open, close + 1);
      const attrValueMatch = templateString.slice(0, open).match(attributeValueMatchRegex);
      const attrMatch = attrValueMatch === null && templateString.slice(0, open).match(attributeMatchRegex);
      
      if (attrValueMatch !== null) {
        templateString = `${templateString.slice(0, attrValueMatch.index)} wfc-bind-${i}${attrValueMatch[0]}${templateString.slice(open)}`;
      } else if (attrMatch !== null) {
        templateString = `${templateString.slice(0, open).replace(attributeMatchRegex, `<$1 wfc-bind-${i} $2`)}${templateString.slice(open)}`;
      } else {
        templateString = `${templateString.slice(0, close + 1)}<!-- expression-block-end wfc-bind-${i} -->${templateString.slice(close + 1)}`;
        templateString = `${templateString.slice(0, open)}<!-- expression-block-start wfc-bind-${i} -->${templateString.slice(open)}`;
      }

      const variableConfig = {
        id: i,
        type: attrValueMatch !== null ? 'attribute-value' : attrMatch !== null ? 'attribute' : 'content',
        attribute: attrValueMatch !== null ? attrValueMatch[1] : undefined,
        template: () => new Function('page', `return \`${templateStr}\`;`).call(instance, instance)
      };

      // split variable into sub paths for easy lookup
      // one.two = ['one', 'one.two']
      variables.forEach(variable => {
        const modifiedVariable = variable.split('.').join('.');
        const properties = modifiedVariable
          .split('.').slice(1)
          .map(prop => modifiedVariable.slice(0, modifiedVariable.indexOf(prop) - 1)).concat(modifiedVariable);
        properties.forEach(parentProperty => {
          if (!variableReferences[parentProperty]) variableReferences[parentProperty] = [];
          variableReferences[parentProperty].push(variableConfig);
        });
      });
    });

  return {
    variableReferences,
    templateString
  };
}
