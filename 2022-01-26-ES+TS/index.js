import MyPromise from './MyPromise/MyPromise.js'

const fun = () => {
  const p1 = new MyPromise((resolve, reject) => {
    console.log('1s 之后输出:')
    setTimeout(() => {
      resolve('success')
      reject('failure')
    }, 2000)
  })
  p1.then(
    (res) => {
      console.log('resolve', res)
      console.log('1 then...')
    },
    (err) => {
      console.log('reject', err)
    }
  )

  p1.then((res) => {
    console.log('2 then...')
  })

  p1.then(
    (res) => {
      console.log('3 then...')
    },
    (err) => {
      console.log(err)
    }
  )

  p1.then()
    .then()
    .then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    )
}
// fun()

const fun1 = () => {
  const p1 = new MyPromise((resolve, reject) => {
    resolve('success')
  })

  p1.then((res) => {
    console.log(111, res)
    return p1
  })
    .then((res) => {
      console.log(222, res)
    })
    .then((res) => {
      console.log(333, res)
    })

  const p2 = new Promise((resolve, reject) => {
    resolve('success')
  })

  p2.then((res) => {
    console.log('p2-1', res)
    return p2
  })
    .then((res) => {
      console.log('p2-2', res)
    })
    .then((res) => {
      console.log('p3-3', res)
    })
}
// fun1()

const fun2 = () => {
  const promise = new MyPromise((resolve, reject) => {
    resolve(100)
  })
  const p1 = promise.then((value) => {
    console.log(value)
    return p1
  })
}
// fun2()

const fun3 = () => {
  const promise = new MyPromise((resolve, reject) => {
    reject('err')
  })

  promise
    .then()
    .then()
    .then(
      (value) => console.log(value),
      (reason) => console.log(reason)
    )
}
// fun3()

const fun4 = () => {
  const TmpPromise = MyPromise
  // const TmpPromise = Promise
  TmpPromise.resolve(100).then((res) => {
    console.log('resolve', res)
  })
  TmpPromise.reject(100).then(
    (res) => {
      console.log(res)
    },
    (err) => {
      console.log('reject', err)
    }
  )
  TmpPromise.reject(200).catch((err) => {
    console.log('err', err)
  })

  const p = new TmpPromise((resolve, reject) => {
    const num = Math.floor(Math.random() * 10)
    console.log(num)
    if (num % 2) {
      resolve('success')
    } else {
      reject('failure')
    }
  })
  p.then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}
fun4()
