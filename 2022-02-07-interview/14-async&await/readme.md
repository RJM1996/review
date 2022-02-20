## async 和 await 的原理

「这是我参与2022首次更文挑战的第 1 天，活动详情查看：[2022首次更文挑战](https://juejin.cn/post/7052884569032392740)」。

### 什么是 async 和 await ？如何使用？

`async/await`的用处就是：**用同步方式，执行异步操作**

如果需要使用第一个异步请求的结果作为第二个异步请求的入参

promise 嵌套写法：

```js
request(1).then(res1 => {
  console.log(res1)
  request(res1).then(res2 => {
    console.log(res2)
  })
})
```

async await 写法：

```js
async function fn () {
  const res1 = await request(1)
  const res2 = await request(res1) 
}
fn()
```



### 实现原理

async 和 await 就是 generator 函数的语法糖，generator 函数的写法和 async await 是不是很像呢

```js
function* gen() {
  yield 1
  yield 2
  yield 3
  return 4
}
const g = gen()
console.log(g.next()) // { value: 1, done: false }
console.log(g.next()) // { value: 2, done: false }
console.log(g.next()) // { value: 3, done: false }
console.log(g.next()) // { value: 4, done: true }
```

只不过 generator 函数需要使用 next 方法手动执行，并且 next 方法是可以传参的，next 方法中的参数会作为 yield 表达式的返回值

```js
function test2 () {
  function* gen () {
    const num1 = yield 1
    console.log(num1, 'num1')
    const num2 = yield 2
    console.log(num2, 'num2')
    return 3
  }
  const g = gen()
  console.log(1, g.next()) // 第一次 next 调用时传参时没用的
  console.log(2, g.next(11111)) // 第二次 next 调用时传递的参数会作为第一个 yield 表达式的返回值，也就是 num1 的值
  console.log(3, g.next(22222)) // 第三次 next 调用时传递的参数会作为第二个 yield 表达式的返回值，也就是 num2 的值
}
test2()
// 1 { value: 1, done: false }
// 11111 num1
// 2 { value: 2, done: false }
// 22222 num2
// 3 { value: 3, done: true }
```

一般 await 后面都是接一个 promise 对象，promise 对象 then 方法中回调函数的参数就是 await 表达式的结果

那么如果 yield 后面是一个 promise 对象，该如何将 promise then 方法中获取的结果作为 yield 表达式的返回值呢？

通过上面代码知道 yield 表达式的返回值是 next 方法中传递的参数，所以我们只要在 promise 对象的 then 方法中调用 next 方法并将结果作为参数传递，就可以使异步操作的结果作为 yield 表达式的返回值了。

```js
function test3 () {
  function fn (nums) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(nums * 2)
      }, 1000)
    })
  }
  function* gen () {
    const num1 = yield fn(1)
    const num2 = yield fn(num1)
    return num2
  }
  const g = gen()
  const next1 = g.next()
  next1.value.then(res1 => {
    console.log(next1) // 1秒后同时输出 { value: Promise { 2 }, done: false }
    console.log(res1) // 1秒后同时输出 2

    const next2 = g.next(res1) // 传入上次的res1
    next2.value.then(res2 => {
      console.log(next2) // 2秒后同时输出 { value: Promise { 4 }, done: false }
      console.log(res2) // 2秒后同时输出 4

      const next3 = g.next(res2) // 传入上次的res2
      console.log(next3, 'next3')

    })
  })
}
test3()
```

目前我们是通过手动调用 next 并不断嵌套来执行 generator 函数的，如果可以使其自动执行，那么就和 async await 很像了。



### 模拟实现

```js
  function myAsync (generatorFn) {
    return function () {
      const gen = generatorFn.apply(this, arguments)
      return new Promise((resolve, reject) => {

        function next (arg) {
          const { value, done } = gen.next(arg)
          if (done) {
            resolve(value)
          } else {
            // 因为 value 可能是基础类型，也可能是 Promise，所以要用 Promise.resolve
            Promise.resolve(value).then(val => {
              next(val)
            }, err => {
              reject(err)
            })
          }
        }
        next()
      })
    }
  }

  const asyncFn = myAsync(gen)

  asyncFn().then(result => {
    console.log(result)
  }).catch(err => {
    console.log(err)
  })
```



