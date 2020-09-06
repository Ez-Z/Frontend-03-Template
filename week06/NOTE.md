学习笔记

## 盒模型
从内到外：
content => padding => border => margin

box-sizing：
- content-box 宽度等于content + padding + border
- border-box 宽度等于content + border


## 正常流
从左往右写
同一行写的文字是对齐的
一行写满，就换到下一行

### 正常流排版
- 收集盒
- 计算盒在行中的排布
- 计算盒在块中的排布

IFC
T e inline-box
------------>

BFC
| line-box
| block-level-box

#### 行级排布
Text
文字都有宽width和高height，有一个基线origin
#### 行模型 IFC
- line-top
- text-top
- base-line
- text-bottom
- line-bottom

ps: inline-block 的基线是随着盒内文字变化的

#### 块级排布 BFC
float 会影响生成行盒的尺寸，元素影响高度所在多行的行盒尺寸，当有一个float存在，增加另一个float，可能会产生float堆叠的现象，都会影响行盒尺寸
clear 找一块没有干净的空间，执行float。

#### BFC合并

##### Block
- Block Container: 里面有BFC
    - 能容纳正常流的盒
- Block-level Box： 外面有BFC
- Block-box = block Container + Block-level Box： 里外都有BFC

----
Block Container
- block
- inline-block
- table-cell
- flex-item
- grid cell
- table-caption

----
Block-level Box:

block-level
- display: block;
- display: flex;
- display: table;
- display: grid;
- ...

inline-level
- display: inline-box;
- display: inline-flex;
- display: inline-table;
- display: inline-grid;
- ...

display: run-in;

-----

#### 设置BFC
- floats
- absolutely positioned elements
- block containers that are not block boxes,
    - flex items
    - grid cell
    - ...
- and block boxes with 'overflow' other than 'visible'

#### BFC合并
- block box && overflow: visible
    - BFC合并与float
    - BFC合并与边距折叠

## Flex 排版
- 收集盒进行
- 计算盒在主轴方向上的排布
- 计算盒在交叉轴方向的排布

- 分行
    - 根据主轴尺寸，把元素进行分行
    - 若设置了no-wrap，就在同一行按照比例排布

- 计算主轴方向
    - 找出所有flex元素
    - 把主轴放下的剩余尺寸按照比例计算

## 动画与绘制

### Animation
- @keyframes定义
- animation: 使用
    - animation-name
    -  animation-duration 动画时长
    -  animation-timing-function 动画的时间曲线
    -  animation-delay 动画开始前的延迟
    -  animation-iteration-count 动画播放次数
    -  animation-direction 动画的方向

Transition
- transition-property 要变换的属性
- transition-duration 变化的时长
- transition-timing-function 时间曲线
- transition-delay 延迟

cubic-bezier 曲线 cubic-bezier.com
用一个变量t控制，两个控制点

### 颜色
人眼能看到 400 - 760nm 的光
cmyk 
rgb

HSL与HSV
H hue 色相
S saturation 纯度
L 亮度
V value 色值 明度


