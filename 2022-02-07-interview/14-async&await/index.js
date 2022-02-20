function test1 () {
  function request (num) { // 模拟接口请求
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(num * 2)
      }, 500)
    })
  }

  // request(1).then(res1 => {
  //   console.log(res1) // 1秒后 输出 2

  //   request(2).then(res2 => {
  //     console.log(res2) // 2秒后 输出 4
  //   })
  // })

  request(1).then(res1 => {
    return res1
  }).then(res2 => {
    console.log(res2)
  })
}

function test2 () {
  function* gen () {
    const num1 = yield 1
    console.log(num1, 'num1')
    const num2 = yield 2
    console.log(num2, 'num2')
    return 3
  }
  const g = gen()
  console.log(1, g.next()) // { value: 1, done: false }
  console.log(2, g.next(11111))
  console.log(3, g.next(22222))
}
// test2()
// 1 { value: 1, done: false }
// 11111 num1
// 2 { value: 2, done: false }
// 22222 num2
// 3 { value: 3, done: true }

function test3 () {
  function fn (nums) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(nums * 2)
      }, 500)
    })
  }
  function* gen () {
    const num1 = yield fn(1)
    console.log('num1', num1)
    const num2 = yield fn(num1)
    console.log('num2', num2)
    const num3 = yield 666
    return num3
  }
  // const g = gen()
  // const next1 = g.next()
  // next1.value.then(res1 => {
  //   console.log(next1) // 1秒后同时输出 { value: Promise { 2 }, done: false }
  //   console.log(res1) // 1秒后同时输出 2

  //   const next2 = g.next(res1) // 传入上次的res1
  //   next2.value.then(res2 => {
  //     console.log(next2) // 2秒后同时输出 { value: Promise { 4 }, done: false }
  //     console.log(res2) // 2秒后同时输出 4

  //     const next3 = g.next(res2) // 传入上次的res2
  //     console.log(next3, 'next3')

  //   })
  // })

  // 自动执行 generator 函数
  function generatorToAsync (generatorFn) {
    return function () {
      const gen = generatorFn.apply(this, arguments) // gen有可能传参

      // 返回一个Promise
      return new Promise((resolve, reject) => {

        function go (key, arg) {
          let res
          try {
            res = gen[key](arg) // 这里有可能会执行返回reject状态的Promise
          } catch (error) {
            return reject(error) // 报错的话会走catch，直接reject
          }

          // 解构获得value和done
          const { value, done } = res
          if (done) {
            // 如果done为true，说明走完了，进行resolve(value)
            return resolve(value)
          } else {
            // 如果done为false，说明没走完，还得继续走
            // value有可能是：常量，Promise，Promise有可能是成功或者失败
            return Promise.resolve(value).then(val => {
              // 在 then 方法里调用 next 方法，传入 val, 作为 yield 表达式的结果
              go('next', val)
            }, err => go('throw', err))
          }
        }

        go("next") // 第一次执行
      })
    }
  }

  function myAsync (generatorFn) {
    return function () {
      const gen = generatorFn.apply(this, arguments)
      return new Promise((resolve, reject) => {

        function next (arg) {
          const { value, done } = gen.next(arg)
          if (done) {
            resolve(value)
          } else {
            // 因为 value 可能是基础类型，也可能是 Promise，所以要用 Promise.resolve
            Promise.resolve(value).then(val => {
              next(val)
            }, err => {
              reject(err)
            })
          }
        }
        next()
      })
    }
  }

  // const asyncFn = generatorToAsync(gen)
  const asyncFn = myAsync(gen)

  asyncFn().then(result => {
    console.log(result)
  }).catch(err => {
    console.log(err)
  })

}
test3()

