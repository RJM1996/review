## 柯里化与组合(curry&combine)

### 柯里化

> 将一个多参数的函数, 转换为一个单参数的函数, 并且新的函数可以继续接收剩余的参数

例如:

```js
function add(a, b, c) {
  return a + b + c
}
// 通过柯里化函数 curry 进行转换
const _add = curry(add)
// 结果和使用 add(1, 2, 3) 一样
_add(1)(2)(3)
```

严格来说柯里化后的函数只能接收一个参数, 但是为了实际使用更加方便, 也可以改成能够接收多个参数

```js
// 结果都是一样的
add(1, 2, 3, 4, 5)
add(1)(2)(3, 4, 5)
add(1, 2)(3, 4)(5)
add(1)(2)(3)(4)(5)
```

编写柯里化函数

```js
/**
 * 将函数柯里化
 * @param fn    待柯里化的原函数
 * @param len   所需的参数个数，默认为原函数的形参个数
 */
module.exports = function curry(fn, len = fn.length) {
  return _curry.call(this, fn, len)
}

/**
 * 中转函数
 * @param fn    待柯里化的原函数
 * @param len   所需的参数个数
 * @param args  已接收的参数列表
 */
function _curry(fn, len, ...args) {
  return function (...params) {
    let _args = [...args, ...params]
    // 当函数参数个数等于原函数需要的参数个数时, 就开始执行
    if (_args.length >= len) {
      return fn.apply(this, _args)
    } else {
      // 否则就继续柯里化
      return _curry.call(this, fn, len, ..._args)
    }
  }
}
```

柯里化的优点:

- 参数复用
- 代码简洁
- 延迟执行

### 组合

> 函数组合就是将一个函数的输出作为另一个函数的输入, 经过若干次组合, 最后获得最终的结果

例如有一个需求: 将一个字符串转换为大写, 再反转
我们一般会写一个函数, 先将字符串转换为大写, 再将这个结果进行反转

```js
function test() {
  function fn(str) {
    const a1 = str.toUpperCase()
    const a2 = a1.split('').reverse().join('')
    return a2
  }
  console.log(fn('hello'))
}
```

如果使用函数组合, 可以这样实现
ps: 通常我们使用 `compose` 函数来对函数进行组合

```js
function test2() {
  const strToUpperCase = (str) => str.toUpperCase()
  const strReverse = (str) => str.split('').reverse().join('')
  function compose(f, g) {
    return function (str) {
      return g(f(str))
    }
  }
  const strToUpperAndReverse = compose(strToUpperCase, strReverse)
  console.log(strToUpperAndReverse('hello'))
}
test2()
```

看起来变得更麻烦了, 但是如果我们的需求变了, 需要再将字符串转为数组, 那么第一种方式我们就需要修改原来封装的函数, 但是使用函数组合, 我们只需要再写一个将字符串转为数组的函数就好了

```js
const strToArray = (str) => str.split('') // 新增一个工具函数

const strToUpperAndReverse = compose(
  strToUpperCase,
  strReverse,
  strToArray // 进行组合
)
```

所以函数组合就是将函数功能单一化, 然后再将这些单一功能的函数进行组合, 实现更复杂的逻辑, 就像搭积木一样, 方便扩展
我们上面实现的 compose 函数只能处理有限个参数, 通常 `compose` 函数可以接受任意个函数进行组合, 我们可以使用 [reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 实现

```js
function compose(...fns) {
  return function (x) {
    return fns.reduce((arg, fn) => fn(arg), x)
  }
}
```
