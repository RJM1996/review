function test1() {
  const map = new Map()
  const weakMap = new WeakMap()

  ;(function () {
    const foo = { a: 1 }
    const bar = { b: 1 }

    map.set(foo, 1)
    weakMap.set(bar, 2)
  })()

  console.log({ map, weakMap })
}
// test1()

function test2() {
  const obj = {
    val: 0,
    [Symbol.iterator]() {
      return {
        next() {
          return {
            value: obj.val++,
            done: obj.val > 10,
          }
        },
      }
    },
  }
  for (const o of obj) {
    console.log({ o })
  }

  const arr = [1, 2, 3, 4, 5]
  const itr = arr[Symbol.iterator]()
  console.log(itr.next())
  console.log(itr.next())
  console.log(itr.next())
  console.log(itr.next())
  console.log(itr.next())
  console.log(itr.next())
  console.log(itr.next())
}
// test2()

function test3 () {
  const obj = {}
  const arr = [obj]
  console.log({arr: arr.includes(arr[0])})
}
test3()

