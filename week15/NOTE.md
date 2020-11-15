学习笔记

# gesture （手势）
当我们点击时，可能会发生一些微小的位移，特别是触屏上，事件发生的过程都会是down、 move、 up（touchstart，touchmove，touchend）。

```
start - end - > tap 

start - move 10px -> pan start (pan 摄影中的概念，表示移动摄像机) - move -> pan - end -> pan end (如果end时，达到一定速度就会flick轻扫一下)

start - 0.5 -> press start (长按) - move 10px -> pan start -> ..... 
start - 0.5 -> press start (长按) - end -> press end 
```
## 监听
### addEventListener
通过`element.addEventListener`监听原生事件。
鼠标事件涉及：`mousedown mousemove mouseup`
触屏事件涉及：`touchstart touchmove touchend touchcancel`

### 原生事件:
- tap
- panstart
- pan
- flick
- panend
- pressstart
- pressend
- ...

## dispatch

dom中事件的派发使用new Event()，然后通过addEventListener处理手势操作。