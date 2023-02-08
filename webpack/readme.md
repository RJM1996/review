## webpack 配置收藏

1、externals [外部扩展(externals) (docschina.org)](https://v4.webpack.docschina.org/configuration/externals#externals)

防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖

2、打包去除 console

```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

config.optimization = {
  minimizer: [
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false,
        compress: {
          drop_console: true, // 放弃对`console.*`函数的调用（删除console）
          drop_debugger: false, // 删除debugger
          pure_funcs: ['console.log'],
        },
      },
    }),
  ],
}
```

