// 实现 call 函数
function call() {
  Function.prototype.myCall = function (context, ...args) {
    if (typeof this !== 'function') {
      throw new Error('this must be a function')
    }
    // context = context || window
    context = context || global
    const fn = Symbol()
    context[fn] = this
    const res = context[fn](...args)
    delete context[fn]
    return res
  }

  function say(age = 18) {
    console.log(this, this.name, age)
    return this.name + age
  }

  const tom = {
    name: 'tom',
  }

  const res = say(12) // global, undefined, 12
  const res1 = say.myCall(tom, 13) // tom, tom, 13
  const res2 = say.call(tom, 13)
  console.log({
    res,
    res1,
    res2,
  })
}
// call()

// 实现 Promise.all()
function promiseAll() {
  const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('p1 delay 1000ms')
    }, 1000)
  })

  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('p2 delay 2000ms')
    }, 2000)
  })

  const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('p3 delay 3000ms')
    }, 3000)
  })

  const p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('p4 delay 4000ms')
    }, 4000)
  })

  const pool = [p1, p2, p3, p4]

  Promise.all(pool)
    .then((res) => {
      console.log('all', res)
    })
    .catch((err) => {
      console.log('all reject', err)
    })

  Promise.race(pool)
    .then((res) => {
      console.log('race', res)
    })
    .catch((err) => {
      console.log('race', err)
    })

  Promise.myAll = function (promises = []) {
    const len = promises.length
    let count = 0
    let result = []
    return new Promise((resolve, reject) => {
      if (len === 0) {
        resolve([])
      }
      promises.forEach((p) => {
        Promise.resolve(p)
          .then((res) => {
            count++
            result.push(res)
            if (count === len) {
              resolve(result)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    })
  }

  Promise.myAll(pool)
    .then((res) => {
      console.log('myAll', res)
    })
    .catch((err) => {
      console.log('myAll reject', err)
    })

  Promise.myRace = function (promises = []) {
    return new Promise((resolve, reject) => {
      promises.forEach((p) => {
        Promise.resolve(p)
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    })
  }
  Promise.myRace(pool)
    .then((res) => {
      console.log('myRace', res)
    })
    .catch((err) => {
      console.log(err)
    })
}
promiseAll()
