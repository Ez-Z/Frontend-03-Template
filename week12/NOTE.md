学习笔记

## reactive

### 使用Proxy set、get监听数据

```javascript

let object = {a: 1};
let po = new Proxy(object, {
  set (obj, prop, val) {
    console.log(obj, prop, val);
    obj[prop] = val;
    return val;
  },
  get (obj, prop) {
    console.log(obj, prop);
    return obj[prop];
  }
});
```

### reactive 思路:

effect注册事件 - 执行callback()触发 -> proxyObject get - 找到需要事件监听的对象 -> use reactive -> 根据使用过的对象callback加索引 -> callbacks 

数据发生改变 -> proxyObject set - 根据索引注册的所有事件 -> callbacks

## Range & 拖拽
- mousemove、mouseup事件挂到document上
- 获取所有文本间的可插入位置；循环文本数量，在之间生成range；
  - newRange.setStart(Node, index);
- 找到最近距离的range
  - 循坏所有range，获取range的Rect得到坐标x、y，算出距离（range.getBoundingClientRect()）;
  - 在mousemove的时候找到最近的range，插入draggable的元素