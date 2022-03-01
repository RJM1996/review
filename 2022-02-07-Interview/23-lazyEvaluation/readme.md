## 惰性计算

惰性求值又叫惰性计算、懒惰求值，也称为传需求调用，目的就是要 **最小化** 计算机做的工作

惰性求值的思想就是：**不需要立即返回的值，就先别计算**

**惰性求值是一种编程语言的特性**，很多纯粹的函数式编程语言都有这种特性，但是在 JS 中是没有的

那么在 JS 中如何模拟实现惰性计算呢？

我们知道 Generator 函数就不是立即执行的，而是调用 next 方法后再执行，这一点就和惰性计算的特性很像

实现 take 函数，取出数组中前 n 条数据

```js
function test1() {
  function* take(n, items) {
    let i = 0
    if (n < 1) return
    for (let item of items) {
      yield item
      i++
      if (i >= n) {
        return
      }
    }
  }

  let thunk = take(3, [1, 2, 3, 4, 5])

  console.log(thunk.next()) // {value: 1, done: false}
  console.log(thunk.next()) // {value: 2, done: false}
  console.log(thunk.next()) // {value: 3, done: false}
  console.log(thunk.next()) // {value: undefined, done: true}
}
test1()
```

可以实现惰性计算的 JS 库

- [lazy.js]([dtao/lazy.js: Like Underscore, but lazier (github.com)](https://github.com/dtao/lazy.js))

- [Lodash](https://lodash.com/)
