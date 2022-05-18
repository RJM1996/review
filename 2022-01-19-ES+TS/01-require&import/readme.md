## require 和 import 的区别

区别：

1. 导入 `require`， 导出 `exports/module.exports` 是 `CommonJS` 规范，通常适用于 `Node.js`

2. `import/export` 是 `ESModule` 规范

3. `require` 是一个函数，在**运行时加载**，是同步的。因为是函数，所以可以写在任何地方。

4. `import` 是**解构过程**，并且是**编译时执行**，是异步加载。`import` 会提升到整个模块的顶部，一般也建议写在文件的顶部

5. `require` 加载会有缓存，后续就从缓存中获取; `import` 在编译时执行, 没有缓存的问题
