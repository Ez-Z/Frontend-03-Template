学习笔记

## YEOMAN（脚手架生成器）https://yeoman.io/
```
npm install -g yo

npm install -g generator-webapp
```

## 使用yo实现一个类似vue-cli脚手架(generator-vue)
- creating and running a generator
  - yeoman 的 API 是非常奇怪的，它会顺次地执行一个 class 里的所有方法，跟我们的认知不是特别一致。this.option('babel')，其实就是允许我们去加 babel 的 flag，这个我们暂时也用不到，可以直接删掉。
  - 执行 npm link，这个命令会把我们在本地的一个模块，link 到一个我们的 npm 的标准的模块里面去，所以可以看到它把 toolchain 的全局的模块，变成了我们开发中的模块。
  - link 完之后我们就可以用 yeoman 去启动它了。将 package 的名字改成 generator-toolchain，因为 package 的名字必须是 generator 开头的。重新 link 一下。
  - 执行 yo toolchain
- prompts用于收集用户输入项
- file system
  - 创建一个 template
  - 通过 this.fs.copyTpl 来复制模版，template 允许传一个 json，来替换模版中的变量
- dependencis 用户安装项目相关依赖

## webpack 

(ps: 最初是为node设计的一款打包工具，把一个Node的代码打包成一个浏览器可用的代码)
- loader：做转换（编译），文本转换和二进制文件转换
  - babel-loader
  - css-loader 
  - view-loader
- plugin：使用生命周期钩子在不用的环节做一些操作

## babel
主要功能是将新的语法编译成低版本浏览器能识别的代码，从而提升代码的兼容性
### 常用的babel
- babel/preset-env
- babel/preset-es2015
- babel/plugin-syntax-dynamic-import
- ...
