// 整个代码片段是一个宏任务 mac1
console.log('1');

// mac2
setTimeout(function () {
  console.log('2'); // 2-1
  process.nextTick(function () {
    console.log('3'); // 2-3
  })
  new Promise(function (resolve) {
    console.log('4'); // 2-2
    resolve();
  }).then(function () {
    console.log('5') // 2-4
  })
})
// mic1
process.nextTick(function () {
  console.log('6');
})

new Promise(function (resolve) {
  console.log('7');
  resolve();
}).then(function () {
  // mic2
  console.log('8')
})

// mac3
setTimeout(function () {
  console.log('9'); // 3-1
  process.nextTick(function () {
    console.log('10'); // 3-3
  })
  new Promise(function (resolve) {
    console.log('11'); // 3-2
    resolve();
  }).then(function () {
    console.log('12') // 3-4
  })
})
