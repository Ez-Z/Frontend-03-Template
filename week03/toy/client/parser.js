const css = require('css');

const EOF = Symbol('EOF'); // EOF: end of File
let currentToken = null;
let currentAttribute = null;


let currentTextNode = null;
let stack = [{ type: 'document', children: [] }];


// 增加css规则函数
let rules = [];

function addCSSRules(text) {
  let ast = css.parse(text);
  console.log(JSON.stringify(ast, null, "  "));
  rules.push(...ast.stylesheet.rules);
}

// 匹配元素与选择器是否匹配
function match(elm, selector) {
  if (!selector || !elm.attributes) return false;

  // 复合选择器
  // if (selector.indexOf('#') > 0 || selector.indexOf('.') > 0) {
  //   let tagN = selector.split('.')[0].split('#')[0];
  //   let clsName = selector.split('.')[1];
  //   let id = selector.split('#')[1];
  //   let matchd = false;
  //   if (tagN) {
  //     if (elm.tagName === selector) {
  //       matchd = true;
  //     }
  //     if (clsName) {
  //       let attr = elm.attributes.filter(attr => attr.name === 'class')[0];
  //       if (attr && attr.value === selector.replace(".", '')) matchd = true;
  //       if (id) {
  //         let attr = elm.attributes.filter(attr => attr.name === 'id')[0];
  //         if (attr && attr.value === selector.replace("#", '')) matchd = true;
  //         else matchd = false
  //       }
  //     } else if (id) {
  //       let attr = elm.attributes.filter(attr => attr.name === 'id')[0];
  //       if (attr && attr.value === selector.replace("#", '')) matchd = true;
  //       if (clsName) {
  //         let attr = elm.attributes.filter(attr => attr.name === 'class')[0];
  //         if (attr && attr.value === selector.replace(".", '')) matchd = true;
  //         else matchd = false
  //       }
  //     }
  //   } else if (clsName) {
  //     let attr = elm.attributes.filter(attr => attr.name === 'class')[0];
  //     if (attr && attr.value === selector.replace(".", '')) matchd = true;
  //     if (id) {
  //       let attr = elm.attributes.filter(attr => attr.name === 'id')[0];
  //       if (attr && attr.value === selector.replace("#", '')) matchd = true;
  //       else matchd = false
  //     }
  //   } else if (id) {
  //     let attr = elm.attributes.filter(attr => attr.name === 'id')[0];
  //     if (attr && attr.value === selector.replace("#", '')) matchd = true;
  //     if (clsName) {
  //       let attr = elm.attributes.filter(attr => attr.name === 'class')[0];
  //       if (attr && attr.value === selector.replace(".", '')) matchd = true;
  //       else matchd = false
  //     }
  //   }
  //   return matchd;
  // }

  if (selector.charAt(0) == '#') {
    let attr = elm.attributes.filter(attr => attr.name === 'id')[0];
    if (attr && attr.value === selector.replace("#", '')) return true;
  } else if (selector.charAt(0) == '.') {
    let attr = elm.attributes.filter(attr => attr.name === 'class')[0];
    if (attr && attr.value === selector.replace(".", '')) return true;


  } else {
    if (elm.tagName === selector) {
      return true;
    }
  }
  return false
}

// 计算css
function computeCSS(elm) {
  // slice() 不传参就是复制一遍原数组
  // 逐级向外传递
  let elms = stack.slice().reverse();
  if (!elm.computeStyle) {
    elm.computeStyle = {}
  }

  for (let rule of rules) {

    let selectorParts = rule.selectors[0].split(" ").reverse();
    if (!match(elm, selectorParts[0])) continue;

    let matched = false;

    let j = 1;
    for (let i = 0; i < elms.length; i++) {
      if (match(elms[i], selectors[j])) {
        j++;
      }
    }
    if (j >= selectorParts.length) matched = true;

    if (matched) {
      // console.log('Element', elm, "matched rule", rule);
      let sp = specificity(rule.selectors[0]);

      let computeStyle = elm.computeStyle;
      for (let declaration of rule.declarations) {
        if (!computeStyle[declaration.property]) computeStyle[declaration.property] = {};

        if (!computeStyle[declaration.property].specificity) {
          computeStyle[declaration.property].value = declaration.value;
          computeStyle[declaration.property].specificity = sp;
        } else if (compare(computeStyle[declaration.property].specificity, sp) < 0) {
          computeStyle[declaration.property].value = declaration.value;
          computeStyle[declaration.property].specificity = sp;
        }
      }
      // console.log(elm.computeStyle);

    }
  }
}

function specificity(selector) {
  let p = [0, 0, 0, 0];
  let selectorParts = selector.split(' ');
  for (let part of selectorParts) {
    if (part.charAt(0) == '#') {
      p[1] += 1;
    } else if (part.charAt(0) == '.') {
      p[2] += 1;
    } else {
      p[3] += 1;
    }
  }

  return p;
}

function compare(sp1, sp2) {
  if (sp1[0] - sp2[0]) {
    return sp1[0] - sp2[0];
  } else if (sp1[1] - sp2[1]) {
    return sp1[1] - sp2[1];
  } else if (sp1[2] - sp2[2]) {
    return sp1[2] - sp2[2];
  }

  return sp1[3] - sp2[3];
}

// 挂载dom树
function emit(token) {
  // console.log(token);
  // if (token.type === "text") {
  //   return;
  // }
  let top = stack[stack.length - 1];
  // 入栈
  if (token.type === "startTag") {
    let elm = {
      type: 'element',
      children: [],
      attributes: [],
    }

    elm.tagName = token.tagName;
    for (let p in token) {
      if (p != "type" && p != "tagName") {
        elm.attributes.push({
          name: p,
          value: token[p],
        })
      }
    }

    // 在startTag入栈前，计算css
    computeCSS(elm);

    top.children.push(elm);

    // elm.parent = top;

    if (!token.isSelfClosing) {
      stack.push(elm);
    }

    currentTextNode = null;

  } else if (token.type == "endTag") { // 出栈
    if (top.tagName != token.tagName) {
      throw new Error("Tag start end doesn't match!")
    } else {
      // 执行添加css规则操作
      if (top.tagName === 'style') {
        addCSSRules(top.children[0].content);
      }

      stack.pop();
    }
    currentTextNode = null;
  } else if (token.type == 'text') {
    if (currentTextNode == null) {
      currentTextNode = {
        type: 'text',
        content: '',
      }
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content;
  }
}


function data(c) {
  if (c == '<') {
    return tagOpen;
  } else if (c == EOF) {
    emit({
      type: 'EOF',
    });
    return;
  } else {
    emit({
      type: 'text',
      content: c,
    })
    return data;
  }
}

// 标签

function tagOpen(c) {
  if (c == '/') {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: '',
    }
    return tagName(c);
  } else {
    return;
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: '',
    };
    return tagName(c);
  } else if (c == '>') {

  } else if (c == EOF) {

  } else {

  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == '/') {
    return selfClosingTag;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c; // .toLowerCase();
    return tagName;
  } else if (c == '>') {
    emit(currentToken);
    return data;
  } else {
    return tagName;
  }
}

function selfClosingTag(c) {
  if (c == '>') {
    currentToken.isSelfClosing = true;
    return data;
  } else if (c == EOF) {

  } else {

  }
}

// <html a=1>

// 属性处理逻辑
function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == '>' || c == '/' || c == EOF) {
    return afterAttributeName(c);
  } else if (c == '=') {
    // return beforeAttributeName;
  } else {
    currentAttribute = {
      name: "",
      value: "",
    }
    return attributeName;
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c == '>' || c == '/' || c == EOF) {
    return afterAttributeName(c);
  } else if (c == "=") {
    return beforeAttributeValue;
  } else if (c == '\u0000') {

  } else if (c == '\"' || c == "'" || c == '<') {

  } else {
    currentAttribute.name += c;
    return attributeName;
  }
}

function afterAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName;
  } else if (c == '/') {
    return selfClosingStartTag;
  } else if (c == '=') {
    return beforeAttributeValue;
  } else if (c == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == EOF) {

  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: "",
      value: "",
    };
    return attributeName(c);
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c == '>' || c == '/' || c == EOF) {
    return beforeAttributeValue;
  } else if (c == '\"') {
    return doubleQuotedAttributeValue;
  } else if (c == '\'') {
    return singleQuotedAttributeValue;
  } else if (c == ">") {
    // return data;
  } else {
    return UnquotedAttributeValue(c);
  }
}

function doubleQuotedAttributeValue(c) {
  if (c == '\"') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c == '\u0000') {

  } else if (c == EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function singleQuotedAttributeValue(c) {
  if (c == '\'') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c == '\u0000') {

  } else if (c == EOF) {

  } else {
    currentAttribute.value += c;
    return singleQuotedAttributeValue;
  }
}

function afterQuotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == '/') {
    return selfClosingStartTag;
  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}


function UnquotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (c == '/') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingTag;
  } else if (c == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c.match(/^[\t\n\f ]$/) || c == '>' || c == '/' || c == EOF) {

  } else if (c == '\u0000') {

  } else if (c == EOF) {

  } else {
    currentAttribute.value += c;
    return UnquotedAttributeValue;
  }
}


function selfClosingStartTag(c) {
  if (c === '>') {
    currentToken.isSelfClosing = true;
    emit(currentToken);
    return data;
  } else if (c === EOF) {
  } else {
  }
}


module.exports.parseHTML = function parseHTML(html) {
  console.log(html);
  let state = data;
  for (let c of html) {
    state = state(c);
  }

  state = state(EOF);

  return stack[0];
}