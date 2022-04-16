async function async1 () {
  console.log("a");
  const res = await async2();
  console.log('res1', res);
  console.log("b");
  return 1
}

async function async2 () {
  console.log("c");
  return 2;
}

console.log("d");

setTimeout(() => {
  console.log("e");
}, 0);

new Promise(resolve => {
  console.log("a");
  new Promise(resolve => {
    console.log("c");
    resolve(2);
  }).then((res) => {
    // mic1
    console.log('res1', res);
    console.log("b");
    resolve(1);
  })
}).then((res) => {
  console.log('res2', res);
  console.log("f")
})

// async1().then(res => {
//   console.log('res2', res);
//   console.log("f")
// })

new Promise((resolve) => {
  console.log("g");
  resolve();
}).then(() => {
  console.log("h");
});

console.log("i");

// dacgibhfe

/**
* 输出结果：d a c g i b h f e 
*/
