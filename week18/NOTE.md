学习笔记

# 单元测试

## mocha

```
npm i -g mocha

npm i -D mocha
```
由于mocha是刚开始为node做单元测试的工具，所以只能用`module.exports` 和 `require`，所以使用babel来解决

```
npm i -D @babel/core @babel/register @babel/preset-env

// .babelrc
{
  "presets": ["@babel/preset-env"]
}
```
## nyc (测试覆盖程度)
```
npm i -D nyc babel-plugin-istanbul @istanbuljs/nyc-config-babel
// .babelrc
{
  "presets": ["@babel/preset-env"],
  "plugins": ["istanbul"]
}
// nycrc
{
  "extends": "@istanbuljs/nyc-config-babel"
}
```

