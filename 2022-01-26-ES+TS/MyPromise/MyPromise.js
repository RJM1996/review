// promise 的三个状态
const STATUS = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected'
}
/**
 * 自定义 promise
 */
class MyPromise {
  constructor(executor) {
    if (typeof executor === 'function') {
      try {
        executor(this.resolve, this.reject)
      } catch (error) {
        this.reject(error)
      }
    } else {
      throw new TypeError(`Promise resolver ${executor} is not a function`)
    }
  }
  status = STATUS.pending
  // fulfilled 时返回的结果
  value = undefined
  // rejected 时返回的错误原因
  reason = undefined

  // 缓存成功和失败时的回调函数
  onFulfilledCallbackArr = []
  onRejectedCallbackArr = []

  resolve = (value) => {
    if (this.status === STATUS.pending) {
      this.status = STATUS.fulfilled
      this.value = value
      while (this.onFulfilledCallbackArr.length) {
        const c = this.onFulfilledCallbackArr.shift()
        c && c(value)
      }
    }
  }
  reject = (reason) => {
    if (this.status === STATUS.pending) {
      this.status = STATUS.rejected
      this.reason = reason
      while (this.onRejectedCallbackArr.length) {
        const c = this.onRejectedCallbackArr.shift()
        c && c(reason)
      }
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err
          }

    // 返回 promise 以支持 then 的链式调用
    const promise = new MyPromise((resolve, reject) => {
      if (this.status === STATUS.fulfilled) {
        queueMicrotask(() => {
          microtask(resolve, reject, onFulfilled, this.value, promise)
        })
      }
      if (this.status === STATUS.rejected) {
        queueMicrotask(() => {
          microtask(resolve, reject, onRejected, this.reason, promise)
        })
      }
      if (this.status === STATUS.pending) {
        this.onFulfilledCallbackArr.push(() => {
          queueMicrotask(() => {
            microtask(resolve, reject, onFulfilled, this.value, promise)
          })
        })
        this.onRejectedCallbackArr.push(() => {
          queueMicrotask(() => {
            microtask(resolve, reject, onRejected, this.reason, promise)
          })
        })
      }
    })
    return promise
  }
  catch(onRejected) {
    this.then(null, onRejected)
  }

  static resolve(res) {
    if (res instanceof MyPromise) {
      return res
    }
    return new MyPromise((resolve) => {
      resolve(res)
    })
  }

  static reject(err) {
    return new MyPromise((_, reject) => {
      reject(err)
    })
  }
}

function microtask(resolve, reject, callBack, value, promise) {
  try {
    // 调用 callBack 获取返回值
    const res = callBack(value)
    resolvePromise(res, resolve, reject, promise)
  } catch (error) {
    reject(error)
  }
}

function resolvePromise(x, resolve, reject, promise) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise === x) {
    return reject(new TypeError('The promise and the return value are the same'))
  }

  if (typeof x === 'object' || typeof x === 'function') {
    // x 为 null 直接返回，走后面的逻辑会报错
    if (x === null) {
      return resolve(x)
    }

    let then
    try {
      // 把 x.then 赋值给 then
      then = x.then
    } catch (error) {
      // 如果取 x.then 的值时抛出错误 error ，则以 error 为据因拒绝 promise
      return reject(error)
    }

    // 如果 then 是函数
    if (typeof then === 'function') {
      let called = false
      try {
        then.call(
          x, // this 指向 x
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          (y) => {
            // 如果 resolvePromise 和 rejectPromise 均被调用，
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量 called
            if (called) return
            called = true
            resolvePromise(promise, y, resolve, reject)
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          (r) => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } catch (error) {
        // 如果调用 then 方法抛出了异常 error：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
        if (called) return

        // 否则以 error 为据因拒绝 promise
        reject(error)
      }
    } else {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x)
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x)
  }
}

MyPromise.deferred = function () {
  const result = {}
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

export default MyPromise
// module.exports = MyPromise
