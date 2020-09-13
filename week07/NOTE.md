学习笔记

## HTML的定义：XML 与 SGML
DTD
不推荐使用&nbsp 使用white-space来设置空格

#### namespace

## HTML标签语义
aside
title
hn
ul > li
main
header
nav
article
section
footer
small
strong
em
mark
figure
figcaption
cite
blockquoto
time
abbr
address
progress

## html语法
#### 合法元素
- Element: <tagName>...</tagName>
- Text: text
- Comment: \<!-- comments -->
- DocumentType: <!Doctype html>
- ProesingInstruction: <?a1?>
- CDATA:<![CDATA[ ]]>

#### 字符引用
- &#161 ;
- &amp ;
- &lt ;
- &quot ;


## Node
#### Element
- HTMLElement
  - HTMLAnchorElment
  - HTMLAppleElement
  - HTMLAreaElement
  - HTMLAudioElement
  - HTMLBaseElement
  - HTMLbodyElement
  - ...
- SVGElement
  - SVGAElement
  - SVGAItGlyphElement
  - ...

#### Document：文档根节点

#### CharacterData：字符
- Text:文本节点
- Comment：注释
- ProcessingInstruction:处理信息

#### DocumentFragment：文档片段

#### DocumentType：文档类型

## 导航类操作

- parentNode
- childNodes
- firstChild
- lastChild
- nextSibling
- previousSibling
- parentElement
- children
- firstElementChild
- lastElementChild
- nextElementSibling
- previousElementSibling


## 修改操作
- appendChild
- insertBefore
- removeChild
- replaceChild

## 高级操作
- compareDocumentPosition 是用于比较两个节点中关系的函数
- contains 检查一个节点是否包含另一个节点的函数
- isEqualNode 检查两个节点是否完全相同
- isSameNode 检查两个节点是否是同一个节点，实际上在JS中可以用'==='
- cloneNode 复制一个节点，如果传入参数true，则会连同子元素做深拷贝


## addEventListener

- addEventListener(type, listener, [,options])
- addEventListener(type, listener, [,useCapture])
- addEventListener(type, listener, [,useCapture, wantsUntrusted])

```
options: {
    capture,
    once,
    passive,// 阻止默认事件
}
```

## removeEventListener


## Range API
- var range = new Range()
- range.setStart(element, 9)
- range.setEnd(element,4)
- var range = document.getSelection().getRangeAt(0)
- 
- range.setStartBefore
- range.setEndBefore
- range.setStartAfter
- range.setEndAfter
- range.selectNode
- range.selectNodeContents

var fragment = range.extractContents();
range.insertNode(document.createTextNode('aaa'))


```
function reverseChildren(element) {
    let range = new Range();
    range.selectNodeContents(element);
    
    let fragment = range.extractContents();
    let l = fragment.childNodes.length;
    
    while(l-- > 0) {
        fragment.appendChild(fragment.childNodes[l])
    }
    element.appendChild(fragment);
}
```


## Rules
- document.styleSheets[0].cssRules
- document.styleSheets[0].insertRule('p { color: pink; }', 0)
- document.styleSheets[0].removeRule(0)

- CSSStyleRule
  - selectorText String
  - style K-V结构

#### getComputedStyle

- window.getComputedStyle(elt, pseudoElt);
  - elt 想要获取的元素
  - pseudoElt 可选，伪元素
  
## view
#### window
- window.innerHeight, window.innerWidth
- window.outerHeight, window.outerWidth
- window.devicePixelRatio
- window.screen
  - window.screen.width
  - window.screen.height
  - window.screen.availWidth
  - window.screen.availHeight
 
#### window API
- window.open('about: blank', '_blank', "width=100, height=100,left=100,right=100")
- moveTo(x,y) 
- moveBy(x,y)
- resizeTo(x,y)
- resizeBy(x,y)
- 

#### scroll
- scrollTop
- scrollLeft
- scrollWidth
- scrollHeight
- scroll(x, y)
- scrollBy(x, y)
- scrollIntoView()
- window
  - scrollX
  - scrollY
  - scroll(x, y)
  - scrollBy(x, y)
  
#### layout
- getClientRects()
- getBoundingClientRect()


