// 什么是迭代器?
function test1 () {
  function createArrayIterator (arr) {
    let index = 0
    return {
      next: () => index < arr.length ?
        { value: arr[index++], done: false } :
        { value: undefined, done: true }
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
// test1()

// 什么是可迭代对象?
function test2 () {
  // 一个可迭代对象需要具有[Symbol.iterator]方法，并且这个方法返回一个迭代器
  const obj = {
    names: ["111", "222", '333'],
    [Symbol.iterator] () {
      let index = 0;
      return {
        next: () => index < this.names.length ?
          { value: this.names[index++], done: false } :
          { value: undefined, done: true },
        return: () => {
          console.log('迭代器提前终止了...')
          return { value: undefined, done: true }
        }
      }
    }
  }
  for (const item of obj) {
    console.log(item)
    if (item === '222') break
  }
}
// test2()

// 原生可迭代对象: String、Array、Map、Set、arguments对象

function test3 () {
  const obj = {
    names: ["111", "222", '333'],
    [Symbol.iterator]: function* () {
      // for (const name of this.names) {
      //   yield name
      // }
      yield* this.names
    }
  }
  for (const item of obj) {
    console.log(item)
  }
}
test3()