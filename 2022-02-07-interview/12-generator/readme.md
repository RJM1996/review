## Generator 如何解决回调地狱的问题?



### 什么是 Generator ？

首先了解两个概念生成器和迭代器，生成器就是用来生成一个可迭代对象的函数

因此 `generator` 就是一个返回值为 `iterator` 的函数，`iterator ` 是一个可迭代对象

Generator 函数的语法为：

```js
function *createIterator() {
  yield 1;
  yield 2;
  yield 3;
}
// generator 可以像正常函数一样被调用，不同的是会返回一个 iterator
let iterator = createIterator();
console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 3
```

星号 `*` 标明这是个 generator，yield 关键字用来在调用 next 方法时返回 value

一旦遇到 `yield` 表达式，生成器的代码将被暂停运行，直到生成器的 `next()` 方法被调用。每次调用生成器的`next()`方法时，生成器都会恢复执行

The [`next()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator/next) 方法也接受一个参数用于修改生成器内部状态。传递给 `next()` 的参数值会被 yield 接收

因此我们可以将异步操作中获取的结果通过 next 方法传递给 yield

```js
function test2 () {
  function request () {
    setTimeout(() => {
      const b = g.next('hello world');
      console.log('b', b) // { value: undefined, done: true }
    }, 500)
    return 1;
  }
  function* gen () {
    // 获取请求结果
    let res = yield request();
    console.log('res: ' + res); // hello world
  }
  let g = gen();
  const a1 = g.next(); // 开始运行
  console.log('a1', a1) // { value: 1, done: false }
}
test2()
```

第一次g.next()仅仅是启动gen函数，运行到ajax中的`yield request()`停止，然后调用request函数去通过ajax发送请求，此时`res`还不知道yield的结果，通过调用`g.next(data)`将yield结果返回给res



### Generator 和 Promise 结合使用，解决回调地狱的问题

将Generator函数封装成可以一直把yield迭代完的方法，使其自动执行，并将每一步的结果传给 next() 方法，被 yield 接收，从而可以将若干异步代码写为同步的方式，从而解决回调地狱的问题。

其实 ES7 中的 async 和 await 就是 Generator 函数的语法糖，async 相当于星号，await 相当于 yield



