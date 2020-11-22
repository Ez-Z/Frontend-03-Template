学习笔记

## 使用gesture
将轮播组件的事件替换成手势系统的事件：
- 使用`start pan end`替换`mousedown mousemove mouseup`
- `start` 和 `end`是在gusture中新增的两个事件，start事件中可以做一些参数初始化操作

## 引入动画
- 在`render`中创建`timeLine`并且`start`,将`setInterval`中的动画实现代码替换成`timeLine + Animation`的形式
- 当发生手势系统`start`函数触发，则需要暂停`timeLine`的播放
- 当手势系统结束`end`函数触发，则需要重启`timeLine`的播放
- `timeLine`的重新启动需要计算出上一次移动距离`ax`以及`position`的计算

## 增加组件属性
- 组件增加属性支持需要对`Component`进行调整，增加`attributes state`字段，也就是我们常见的属性和状态，这样轮播组件即可直接添加属性到`state`中

## 增加组件事件
增加`onClick onChange`事件：
- 在Component中增加一个triggerEvent方法来触发事件使用原生CustomEvent
- 调用this.triggerEvent()

## 增加Children机制
Children有两种类型的，一种是内容型,和模板型
- 内容型：例：`<Button>按钮</Button>`
- 模板型：例：`<List> <Item></Item> </List>`

- 在appendChild中将模板List{}中的内容(一般为函数)保存起来,render函数获取到属性data迭代并生成children放入到`this.root`中作为子节点