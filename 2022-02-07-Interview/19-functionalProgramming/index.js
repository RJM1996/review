function test1() {
  const capitalize = (x) => x[0].toUpperCase() + x.slice(1).toLowerCase()

  const genObj = curry((key, x) => {
    let obj = {}
    obj[key] = x
    return obj
  })

  const capitalizeName = compose(join(' '), map(capitalize), split('-'))
  const convert2Obj = compose(genObj('name'), capitalizeName)
  const convertName = map(convert2Obj)

  convertName(['john-reese', 'harold-finch', 'sameen-shaw'])
}

function test2() {
  const add = function (x) {
    return function (y) {
      return x + y
    }
  }
  const res = add(1)(10)
  console.log(res)
}
// test2()

function test3() {
  const compose = (f, g) => (x) => f(g(x))

  const f = (x) => x + 1
  const g = (x) => x * 2
  const fg = compose(f, g)
  console.log(fg(1))
}
test3()