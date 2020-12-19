学习笔记

# 持续集成
- daily build 使用服务端技术把当天的代码build一下，看当天代码问题
- BVT(build verification test) 构建验证测试（冒烟测试）
  - 前端使用lint形式来检测

## git hooks

### pre-commit

```
chmod +x ./pre-commit // 获取执行权限

// pre-commit
#!/usr/bin/env node
let process = require("process");
console.log('hooks');

process.exit(1);

```

## ESLint

```
npm i -D eslint
npx eslint --init
npx eslint ./index.js
```


### git hooks 与 eslint结合

```
// pre-commit
#!/usr/bin/env node

let process = require("process");
let child_process = require("child_process");

function exec(name) {
  return new Promise(function(resolve, reject) {
    child_process.exec(name, resolve)
  })
}

const {
  ESLint
} = require("eslint");

(async function main() {
  // 1. Create an instance with the `fix` option.
  const eslint = new ESLint({
    fix: false
  });

  await exec("git stash push -k");

  // 2. Lint files. This doesn't modify target files.
  const results = await eslint.lintFiles(["index.js"]);

  await exec("git stash pop");

  // 3. Modify the files with the fixed code.
  // await ESLint.outputFixes(results);

  // 4. Format the results.
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);

  // 5. Output it.
  console.log(resultText);
  for (let result of resultText) {
    if (result.errorCount) {
      process.exitCode = 1;
    }
  }


})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
```


## 使用无头浏览器检查DOM
```
// 在终端键入下面代码就可以直接通过chrome命令直接打开浏览器了
alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"

// 打开无头浏览器
chrome --headless
// 输入dom
chrome --headless --dump-dom about:blank

```

### puppeteer 
```
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/main.html');
  // const a = await page.$('a');
  const img = await page.$$('a');
  // console.log(await a.asElement().boxModal);
  console.log(img)
  // await browser.close();
})();

```
