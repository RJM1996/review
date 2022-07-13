
1、无重复字符的最长子串
```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  // 滑动窗口
  const queue = []
  let max = 0
  for (let c of s) {
    while (queue.includes(c)) {
      queue.shift()
    }
    queue.push(c)
    max = Math.max(max, queue.length)
  }
  return max
};
```

2、手写 call 函数
```js
Function.prototype.myCall = function (context, ...args) {
  if(typeof this !== 'function') {
    throw new Error('this must be a function')
  }
  context = context || window
  const fn = Symbol()
  context[fn] = this
  const res = context[fn](...args)
  delete context[fn]
  return res
}

function say(age=18) {
  console.log(this, this.name, age)
  return this.name + age
}

const tom = {
  name: 'tom'
}

const res = say(12)
const res1 = say.myCall(tom, 13)
const res2 = say.call(tom)
console.log('res', res)
console.log('res1', res1)
console.log('res2', res2)
```

3、手写 Promise.all()
```js
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
      console.log(222, res)
    })
    .catch((err) => {
      console.log(err)
    })
```