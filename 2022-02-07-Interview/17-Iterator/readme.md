## 什么是迭代器? 如何实现一个迭代器?

### 什么是迭代器?

迭代器是帮助我们对某个数据结构进行遍历的对象, 它有一个 next 方法, next 方法返回一个对象

```js
{
  done: boolean, // 为 true 时代表迭代完毕
  value: any     // done 为 true 时取值为 undefined
}
```

模拟实现一个迭代器:

```js
function test1() {
  function createArrayIterator(arr) {
    let index = 0
    return {
      next: () =>
        index < arr.length
          ? { value: arr[index++], done: false }
          : { value: undefined, done: true },
    }
  }

  // 测试
  const nums = [11, 22, 33, 44]
  const numsIterator = createArrayIterator(nums)
  console.log(numsIterator.next())
  console.log(numsIterator.next())
  console.log(numsIterator.next())
  console.log(numsIterator.next())
  console.log(numsIterator.next())
}
test1()
```

### 可迭代对象

实现了生成迭代器方法的对象称为 `可迭代对象`
也就是说这个对象中包含一个方法, 该方法返回一个迭代器对象
一般使用 [`Symbol.iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) 来定义该属性, 学名叫做 `@@iterator` 方法

```js
function test2() {
  // 一个可迭代对象需要具有[Symbol.iterator]方法，并且这个方法返回一个迭代器
  const obj = {
    names: ['111', '222', '333'],
    [Symbol.iterator]() {
      let index = 0
      return {
        next: () =>
          index < this.names.length
            ? { value: this.names[index++], done: false }
            : { value: undefined, done: true },
        return: () => {
          console.log('迭代器提前终止了...')
          return { value: undefined, done: true }
        },
      }
    },
  }
  for (const item of obj) {
    console.log(item)
    if (item === '222') break
  }
}
test2()
```

这样我们就可以使用 `for of` 等方法对该对象就行遍历了, 并且当遍历中途停止的时候, 还会调用迭代器对象的 `return` 方法
一些原生实现了 `@@iterator` 方法的对象: String、Array、Map、Set、arguments 对象, 所以我们才能对这些对象进行遍历

### 使用生成器来创建一个迭代器

我们知道生成器函数的返回值就是一个迭代器对象, 所以我们可以使用生成器来创建迭代器

```js
function test3() {
  const obj = {
    names: ['111', '222', '333'],
    [Symbol.iterator]: function* () {
      for (const name of this.names) {
        yield name
      }
    },
  }
  for (const item of obj) {
    console.log(item)
  }
}
test3()
```

或者使用 [yield\*](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield*) 这个语法糖使得代码更简洁:

```js
const obj = {
  names: ['111', '222', '333'],
  [Symbol.iterator]: function* () {
    yield* this.names
  },
}
```

主要是学习一些原生对象为什么可以被遍历的原理, 实际开发中使用场景较少
