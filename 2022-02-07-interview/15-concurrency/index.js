//自定义请求函数
const request = url => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`任务${url}完成`)
    }, 1000)
  })
}

//添加任务
function addTask (url) {
  let task = request(url);
  pool.push(task);
  task.then(res => {
    //请求结束后将该Promise任务从并发池中移除
    pool.splice(pool.indexOf(task), 1);
    console.log(`${res}; 当前并发数：${pool.length}`);
    // url = urls.shift();
    // // //每当并发池跑完一个任务，就再塞入一个任务
    // if (url !== undefined) {
    //   addTask(url);
    // }
  })
}

function run (race) {
  race.then(res => {
    let url = urls.shift();
    if (url !== undefined) {
      addTask(url);
      run(Promise.race(pool));
    }
  })
}


let urls = ['bytedance.com', 'tencent.com', 'alibaba.com', 'microsoft.com', 'apple.com', 'hulu.com', 'amazon.com'] // 请求地址
let pool = []//并发池
let max = 3 //最大并发量
//先循环把并发池塞满
while (pool.length < max) {
  let url = urls.shift();
  addTask(url)
}

run(Promise.race(pool));