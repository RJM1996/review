const curry = require('./curry')

function test1() {
  const add = curry(function (a, b, c, d, e) {
    console.log(a + b + c + d + e)
  })

  add(1, 2, 3, 4, 5)
  console.log(111, add(1, 2, 3, 4, 5))
  add(1)(2)(3, 4, 5)
  console.log(222, add(1)(2))
  add(1, 2)(3, 4)(5)
  add(1)(2)(3)(4)(5)
}
test1()
