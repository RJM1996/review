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
