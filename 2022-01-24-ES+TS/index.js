// let 的原理: 匿名函数自调用
const fun = () => {
  for (var i = 0; i < 5; i++) {
    ;(function (i) {
      setTimeout(() => {
        console.log('var', i)
      })
    })(i)
  }

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log('let', i)
    })
  }
}
// fun()

// 使用 call 或 apply 实现 bind
function getSalary(base, x1 = 0, x2 = 0) {
  console.log(this, this.name)
  console.log(`${this.name}的薪水:${base + x1 + x2}`)
}
const ll = {
  name: '李雷'
}
const hmm = {
  name: '韩梅梅'
}
getSalary.call(ll, 10000, 1000, 2000)
getSalary.call(hmm, 10000, 1000, 2000)
getSalary(10000, 1000)
const getSalary1 = getSalary.bind(ll, 10000)
getSalary1(1000, 200)
Function.prototype.bind = function (obj) {
  const fun = this
  const defaultArg = [].slice.call(arguments, 1)

  return function () {
    const arg = defaultArg.concat([].slice.call(arguments))
    fun.call(obj, ...arg)
  }
}
const getSalary2 = getSalary.bind(hmm, 10000)
console.log(getSalary2)
getSalary2(2000, 3000)

function fun1() {
  var a = { n: 1 } // a: 0x1234
  var b = a // b: 0x1234
  a.x = a = { n: 2 } // a: 0x2345
  a.n = 3 
  console.log(a, b)
}
fun1()
