/**
 * 函数组合
 */
module.exports = function compose() {}

function test() {
  function fn(str) {
    const a1 = str.toUpperCase()
    const a2 = a1.split('').reverse().join('')
    return a2
  }
  console.log(fn('hello'))
}

// test()

function test2() {
  const strToUpperCase = (str) => str.toUpperCase()
  const strReverse = (str) => str.split('').reverse().join('')
  const strToArray = (str) => str.split('')

  // function compose(f, g, m) {
  //   return function (str) {
  //     return m(g(f(str)))
  //   }
  // }

  function compose(...fns) {
    return function (x) {
      return fns.reduce((arg, fn) => fn(arg), x)
    }
  }

  const strToUpperAndReverse = compose(strToUpperCase, strReverse, strToArray)
  console.log(strToUpperAndReverse('hello'))
}
test2()
