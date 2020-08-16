学习笔记
总结
## HTML

https://html.spec.whatwg.org/multipage/
#### Tokenization

利用FSM来实现解析HTML的分析

在HTML标准中已经规定了HTML的状态

状态机计算逻辑

## 第四步

- 在状态机中，除了状态迁移，我们还会要加入业务逻辑
- 标签结束状态时提交标签token

处理属性

如果是 input 标签 `<input type="text">` 其 type属性，会跟 currentToken.type 冲突。
currentTokent = {type: 'startTag', tagName: ''},
后期在解析 attribute nam时， currentAttibute = {name: 'type', value: 'text'},
则 `currentToken[currentAttribute.name] = currentAttribute.value => currentToken[type] = 'text'`

- 属性分为单引号、双引号、无引号，需要分别处理
- 使用全局属性attribute
- 属性结束把属性加到token上


### 构建dom树

- 从标签构建DOM树的基本技巧是使用栈
- 遇到开始标签时创建元素并入栈，遇到结束标签时出栈
- 自封闭节点入栈后立即出栈
- 任何元素的父元素是它入栈前的栈顶元素


### 文本节点合并

- 入栈后立即出栈
- 多个文本节点需要合并
- 


## CSS
##### css 解析需要使用到编译原理的基础, 暂不考虑使用css包

##### 只有知道所有父元素才能判断元素与规则是否匹配
##### 首先是当前元素从内向外逐级计算

##### 选择器也是从当前元素向外排序
##### 复杂选择器拆成对单个元素的选择器，用循环匹配父元素队列

##### 根据选择器的类型和元素属性，计算是否与当前元素匹配

##### 一旦选择匹配，就应用选择器到元素上，形成computeStyle


div div #id

[0, 1, 0, 2] // inline id class tag

div #id

[0, 1, 0, 1] // inline id class tag

div .cls #id

[0, 1, 1, 1] // inline id class tag

不进位覆盖
先看优先级高的位，高的优先，相同再看低位数量