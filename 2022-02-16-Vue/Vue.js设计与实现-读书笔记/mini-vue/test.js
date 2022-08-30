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
test1()
