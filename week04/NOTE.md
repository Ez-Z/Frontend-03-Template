学习笔记

# 排版
## 实现flex
#### 主轴，交叉轴
flex-direction: row;

flex-direction: column;


#### 分行计算
wrap
超过一行就把超过的元素放入下一个flexLine


nowrap
默认把所有的元素放入一行

### 计算主轴
- 找出所有的flex元素
- 把主轴方向的剩余尺寸按比例分配给这些元素
- 剩余空间为负数，所有flex元素为0，等比例压缩剩余元素

### 计算交叉轴
- 根据每一行中最大元素尺寸计算行高
- 根据行高flex-align和items-align，确定元素具体位置

# 绘制DOM
### 绘制单个元素

- 绘制需要依赖一个图形环境 images
- 绘制在一个viewport上绘制相关属性：background-color、border、background-image等

### 绘制dom树
- 递归调用子元素的绘制方法完成dom树的绘制
- 忽略一些不需要绘制的节点
- 在实际浏览器中，文字绘制是难点，需要依赖字体库
