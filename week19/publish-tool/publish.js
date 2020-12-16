let http = require("http")
let fs = require('fs')
let archiver = require('archiver')
let child_process = require('child_process');
let querystring = require('querystring');

// auth路由： 接受code，用code+cliend_id+cliend_secrent换取token
// 用token后去用户信息，检查权限
// 接受发布

// 请求Github
child_process.exec(`start chrome https://github.com/login/oauth/authorize?client_id=f1892c96499b3b9b2fd0`);

// code 7de7bc5db10e85900081

// 获取token
http.createServer(function (request, response) {
  let query = querystring.parse(request.url.match(/^\/\?([\s\S]+)$/)[1]);
  publish(query.token);
}).listen(8083);

function publish(token) {
  let request = http.request({
    hostname: '127.0.0.1',
    port: 8082,
    method: 'post',
    path: `/publish?token=${token}`,
    headers: {
      'Content-Type': 'application/octet-stream',
    }
  }, response => {
    console.log(response);
  });

  const archive = archiver('zip', {
    zlib: {
      level: 9
    }
  });

  archive.directory('./samples/', false);

  archive.finalize();

  archive.pipe(request)
}
// 文件大小
// fs.stats(path, (err, stats) => stats.size)

// file.on('data', chunck => {
//   console.log(chunck.toString())
//   request.write(chunck);
// })

// file.on('end', chunck => {
//   console.log('read finished')
//   request.end(chunck);
// })

// request.end();