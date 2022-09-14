## uni-app 一个域名下部署多个应用

如果是 vue-cli 创建的项目，可以直接配置 publicPath，详见 vue-cli 官网配置说明

<img src="./uni-app 一个域名下部署多个应用.assets/image-20220914110845979.png" alt="image-20220914110845979" style="zoom: 50%;" />

然后再配置 vue-router 的 base 选项（3.x 版本）

<img src="./uni-app 一个域名下部署多个应用.assets/image-20220914111705179.png" alt="image-20220914111705179" style="zoom:50%;" />

vue-router 4.x 版本这样配置

<img src="./uni-app 一个域名下部署多个应用.assets/image-20220914111755393.png" alt="image-20220914111755393" style="zoom:50%;" />

我这里是 uni-app 项目，查询官网文档发现需要在 manifest.json 文件中配置

<img src="./uni-app 一个域名下部署多个应用.assets/image-20220914111922809.png" alt="image-20220914111922809" style="zoom:50%;" />

<img src="./uni-app 一个域名下部署多个应用.assets/image-20220914112013098.png" alt="image-20220914112013098" style="zoom:50%;" />

```json
// src/manifest.json
{
  "h5": {
    "router": {
      "base": "/agt/"
    }
  }
}
```

我现在有两个 uni-app 开发的 H5 应用，但是只有一个域名（假设为 myapp.cn），我的需求就是当访问 myapp.cn 时进入 app1，访问 myapp.cn/agt/ 时进入 app2。因此我只要在 app2 中配置 base 为 /agt/ 即可。

然后我们打包项目生成静态资源文件，发现生成的 index.html 文件中引用的资源路径已经加上了前缀 /agt

<img src="./uni-app 一个域名下部署多个应用.assets/image-20220914113155073.png" alt="image-20220914113155073" style="zoom:50%;" />

将两个项目的打包文件放入 test 目录中

<img src="./uni-app 一个域名下部署多个应用.assets/image-20220914113301790.png" alt="image-20220914113301790" style="zoom:50%;" />

其中 agt 目录存放 app2 的打包文件，app1 的打包文件则直接放在 test 目录下

然后我们使用 [serve - npm (npmjs.com)](https://www.npmjs.com/package/serve) 工具启动一个服务部署 test 文件夹

<img src="./uni-app 一个域名下部署多个应用.assets/image-20220914113457172.png" alt="image-20220914113457172" style="zoom:50%;" />

访问 app1

<img src="./uni-app 一个域名下部署多个应用.assets/image-20220914113737439.png" alt="image-20220914113737439" style="zoom: 33%;" />

访问 app2

<img src="./uni-app 一个域名下部署多个应用.assets/image-20220914113936457.png" alt="image-20220914113936457" style="zoom:50%;" />

一切正常，这样就可以使用一个域名部署多个应用了。
