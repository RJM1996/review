## JS 实现并发控制

### 背景

当我们有若干任务需要同时执行, 例如同时发起多个异步请求, 但是系统资源有限, 不能同时处理这么多请求, 所以我们需要控制同时执行任务的数量, 我们把它叫做 `并发控制`

### 分析

在这个场景中, 我们有 3 个需要关注的对象:

> 1. 待运行任务的列表 tasks
> 2. 同时运行任务的列表 pools
> 3. 最大并发数（即同时运行任务的个数）max

一般这里的任务都是指异步任务, 我们把每个任务都包装为一个 Promise 对象, 方便获取任务运行结果, 用数组模拟任务列表, 整个流程分为如下几步:

> 1. 遍历待运行任务列表 tasks, 将每个任务包装为一个 Promise 对象
> 2. 将生成的 Promise 对象存到 pools 中
> 3. 当 pools 中的任务数量等于最大并发数 max 时, 就执行 pools 中的任务
> 4. 当该 Promise 对象 reslove 时, 就将其从 pools 中删除

### 实现

```js
// 模拟异步请求
const request = (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`任务 ${url.padEnd(10, ' ')}完成`)
    }, 1000)
  })
}

/**
 * 并发控制函数
 * @param {*} tasks
 * @param {*} max
 */
async function myAsyncPool(tasks = [], max = 3) {
  // 正在执行的任务数组
  let pool = []
  for (let i = 0; i < tasks.length; i++) {
    // 生成异步任务
    const task = request(tasks[i])
    // 添加到正在执行的任务数组
    pool.push(task)
    task.then((data) => {
      // 当任务执行完毕, 将其从正在执行任务数组中移除
      console.log(`${data}; 当前并发数: ${pool.length}`)
      pool.splice(pool.indexOf(task), 1)
    })

    // 当并发池满了, 就先去执行并发池中的任务, 有任务执行完成后, 再继续循环
    if (pool.length === max) {
      await Promise.race(pool)
    }
  }
}
const tasks = new Array(10).fill('').map((task, i) => `url - ${i + 1}`)
myAsyncPool(tasks, 3)
```

### 执行结果演示

实际每次是 3 个一组打印出来的

```sh
任务 url - 1   完成; 当前并发数: 3
任务 url - 2   完成; 当前并发数: 3
任务 url - 3   完成; 当前并发数: 3
任务 url - 4   完成; 当前并发数: 3
任务 url - 5   完成; 当前并发数: 3
任务 url - 6   完成; 当前并发数: 3
任务 url - 7   完成; 当前并发数: 3
任务 url - 8   完成; 当前并发数: 3
任务 url - 9   完成; 当前并发数: 2
任务 url - 10  完成; 当前并发数: 1
```

### 参考资源

一般我们都会用一些现成的库来进行并发的控制, 例如: [async-pool](https://github.com/rxaviers/async-pool)
