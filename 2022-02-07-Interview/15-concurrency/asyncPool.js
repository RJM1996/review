

//自定义请求函数
const request = url => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`任务 ${url.padEnd(10, ' ')}完成`)
    }, 1000)
  })
}
const tasks = new Array(10).fill('').map((task, i) => `url - ${i + 1}`)

function test1 () {
  async function asyncPool (poolLimit, array, iteratorFn) {
    const ret = []; // 存储所有的异步任务
    const executing = []; // 存储正在执行的异步任务
    for (const item of array) {
      // 调用iteratorFn函数创建异步任务
      const p = Promise.resolve().then(() => iteratorFn(item, array));
      ret.push(p); // 保存新的异步任务

      // 当poolLimit值小于或等于总任务个数时，进行并发控制
      if (poolLimit <= array.length) {
        // 当任务完成后，从正在执行的任务数组中移除已完成的任务
        const e = p.then((data) => {
          console.log(`${data}; 当前并发数: ${executing.length}`);
          executing.splice(executing.indexOf(e), 1)
        });
        executing.push(e); // 保存正在执行的异步任务
        if (executing.length >= poolLimit) {
          await Promise.race(executing); // 等待较快的任务执行完成
        }
      }
    }
    return Promise.all(ret);
  }
  asyncPool(3, tasks, request).then((res) => {
    console.log('res:', res)
  })
}
// test1()

function test2 () {
  /**
   * 并发控制函数
   * @param {*} tasks 
   * @param {*} max 
   */
  async function myAsyncPool (tasks = [], max = 3) {
    // 待执行任务数组
    // 正在执行的任务数组
    let pool = []
    for (let i = 0; i < tasks.length; i++) {
      // 生成异步任务
      const task = request(tasks[i]);
      // 添加到正在执行的任务数组
      pool.push(task);
      task.then((data) => {
        // 当任务执行完毕, 将其从正在执行任务数组中移除
        console.log(`${data}; 当前并发数: ${pool.length}`);
        pool.splice(pool.indexOf(task), 1)
      })

      // 当并发池满了, 就先去执行并发池中的任务, 有任务执行完成后, 再继续循环
      if (pool.length === max) {
        await Promise.race(pool)
      }
    }
  }
  myAsyncPool(tasks, 3)
}
test2()