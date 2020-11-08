学习笔记

## js定时器和帧动画

`setInterval`和`setTimeout`都是和时间挂钩的定时器，也就是最低可以16ms执行一次

`requestAnimationFrame`则是浏览器决定下一渲染出现时机，这个时机就是浏览器的下次重绘时候

- `setInterval`
- `setTimeout`
- `requestAnimationFrame`

```
//  现代浏览器中不推荐使用，不可控，容易产生积压
//  人类一般可识别的动画的帧率为60帧即，16ms执行一次
setInterval(() => {}, 16)

let tick = () => {
    setTimeout(tick, 16)
}

let tick = () => {
    //  浏览器执行下一帧的时候执行此代码，跟浏览器帧率相关
    let handler = requestAnimationFrame(tick);
    cancelAnimationFrame(handler);
}
```

## timeline时间线

- 开始 start
- 暂停 pause
- 恢复 resume
- 重置动画 reset
- 添加/删除动画 add

### 存在的问题:

当我们暂停动画并重启它后，如果再暂停动画重启，按现在的resume来看是有问题的，我们的时间线启动方法start是在一开始就执行的，当我们再暂停多次后动画里执行的startTime始终为最初启动时的那个，而我们的pauseTime却始终是最后一次暂停的那个时间，所以会出现第二次动画暂停启动后出现动画移动的问题，这里我们应该在每次resume的时候去，加上之前所有的暂停时间

## 动画

- 属性名
- 起始属性值
- 结束属性值
- 持续时长
- 延时执行时常
- 动画曲线 （三次贝塞尔曲线）

