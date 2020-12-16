学习笔记

# 实现一个线上web服务

## 初始化server
- 安装 [Oracle VM VirtualBox](https://www.virtualbox.org/)
- 下载 [Ubuntu 20.04.1 LTS (Focal Fossa)](https://releases.ubuntu.com/20.04/)
- 新建node server
- 使用阿里云服务 http://mirrors.aliyun.com/ubuntu
- 选择安装openssh服务

## 利用Express编写服务器

- 外部文件夹server 安装express
```
npx express-generator
npm i
```
- 启用ssh
```
service ssh start
```
- 使用scp
  - 设置转发网络设置->端口转发 -> (8022 -> 22)
  - 在服务器上创建 server文件夹
  - 外部server 执行 `scp -P 8022 -r ./* zsd920514@127.0.0.1:/home/zsd920514/server`
  - 设置转发网络设置->端口转发 -> (8080 -> 3000)
  - 可以用8080打开服务器里的服务

- 实现发布服务
  - 创建 publish-server 和 publish-tool
  - 使用 http 模块创建简单请求


## nodejs 流

### 可写流
- Event 'drain' 当可写流可以接受更多的数据时的一个标志。
- Event 'finish' 当所有的数据都写入到底层系统中时会触发。

### 可读流
- Event 'data' 当流传递给消费者一个数据块的时候会触发
- Event 'end' 当在流中没有可以消费的数据的时候会触发

### 管道
- pipe 两个流可以用一个管道相连


## 文件部署

- 将文件压缩成 .zip 包

```
// publish.js
const archiver = require("archiver");

archive.directory("./samples/", false);
archive.finalize();
archive.pipe(fs.createWriteStream("dist.zip"));
```
- 服务端将接收的包解压

```
// server.js
const unzipper = require("unzipper");

http.createServer(function (request) {
    request.pipe(unzipper.Extract({ path: '../server/public' }));
}).listen(8082);
```

## OAuth 鉴权

[Github OAuth Doc](https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps)

[注册](https://github.com/settings/developers) OAuth 应用，获得 Client ID, Client secrets

```js
Application name: toy-publish
Homepage URL: http://127.0.0.1:8082
Authorization callback URL: http://127.0.0.1:8082/auth
```

#### 1. 客户端 通过调用下面的 API 获取 Github 的身份信息

```bash
GET https://github.com/login/oauth/authorize
```

- 打开隐身模式直接访问 https://github.com/login/oauth/authorize?client_id=xxx
- 就会询问你是否需要登录XX应用
- 登录成功后，询问是否要授权。允许授权则会重定向至上面的 Callback URL 并携带 code 参数
- http://127.0.0.1:8082/auth?code=xxx

#### 2. 服务端 使用 `code` 去获取 Token

- 请求参数 client_id, client_secret, code

```bash
POST https://github.com/login/oauth/access_token
```

```js
const request = https.request(
    {
        host: "github.com",
        path: `/login/oauth/access_token?code=${code}&client_id=${clientId}&client_secret=${clientSecret}`,
        port: 443,
        method: "POST",
    },
    (response) => {
        let body = "";
        response
            .on("data", (chunk) => {
                body += chunk.toString();
            })
            .on("end", (chunk) => {
                callback(querystring.parse(body));
            });
    }
);
request.end();
```

- 响应内容为 Token 信息，格式支持 json, xml

```bash
access_token=xxxx&token_type=bearer
```

3. 使用通行令牌访问 API
拿到 Token 后，去获取 Github 用户信息

```js
Authorization: token OAUTH-TOKEN
GET https://api.github.com/user
```