## Co函数的作用，如何编写Co函数？



[co 函数库](https://github.com/tj/co)是著名程序员 TJ Holowaychuk 于2013年6月发布的一个小工具，用于 Generator 函数的自动执行。

使用 co 的前提条件是：Generator 函数的 yield 命令后面，只能是 Thunk 函数或 Promise 对象。

### 如何编写 co 函数？

Generator 函数就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。

两种方法可以做到这一点：

- 回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
- Promise 对象。将异步操作包装成 Promise 对象，用 then 方法交回执行权。

```js
function run(gen){
  var g = gen();

  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }

  next();
}

run(gen); // gen 是一个 Generator 函数
```

只要 Generator 函数还没执行到最后一步，next 函数就递归调用，从而实现自动执行。



