## 什么是声明式编程? 有什么好处?

声明式编程的重点在于**做什么**，而不是**怎么去做**

所以声明式编程是把代码写给人看的，而命令式编程是把代码写给机器看的，声明式编程的代码逻辑更加清晰，便于维护。

举例：

```js
function test1() {
  // 输入数据
  const input = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]

  // 输出数据
  const expect = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

  // 数组扁平化, 去重, 排序
  const res = new Set(input.flat(Number.MAX_SAFE_INTEGER).sort((a, b) => a - b))
  console.log(Array.from(res))
}
test1()
```

上述代码使用一系列函数操作，将数组的扁平化、去重、排序依次完成，代码描述了我们需要做什么，不关心具体怎么做：

1. 将 input 数组通过 [flat]([Array.prototype.flat() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)) 函数进行扁平化
2. 使用 [sort]([Array.prototype.sort() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)) 函数对数组进行排序
3. 使用 `new Set()` 将数组转为集合，进行去重操作
4. 最后再通过 `Array.from` 函数将集合转为数组

通过 4 步操作就完成了我们的功能，且代码清晰易懂
