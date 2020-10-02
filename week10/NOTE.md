学习笔记
# LL算法构建AST
## 四则运算
#### 分析：
- TokenNumber: [0-9]
- Operator: + - * /
- WhiteSpace
- LineTerminator: <LF> <CR>

#### 词法定义（产生式）：
```
<Expression>::=
  <AdditiveExpression><EOF>

<AdditiveExpression>::=
  <MultiplicativeExpression>
  |<AdditiveExpression><+><MultiplicativeExpression>
  |<AdditiveExpression><-><MultiplicativeExpression>

<MultiplicativeExpression>::=
  <Number>
  |<MultiplicativeExpression><*><Number>
  |<MultiplicativeExpression></><Number>
```
#### LL语法分析
```
// 从左到右扫描、归并
<AdditiveExpression>::=
  <Number>
  |<MultiplicativeExpression><*><Number>
  |<MultiplicativeExpression></><Number>
  |<AdditiveExpression><+><MultiplicativeExpression>
  |<AdditiveExpression><-><MultiplicativeExpression>

```

## 正则表达式
```
var regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g;
var dictionary = ['Number', 'Whitespace', 'LineTerminator', '*', '/', '+', '-'];
```
