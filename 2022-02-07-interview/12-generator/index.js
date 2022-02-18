function test1 () {
  async function asyncFn () {
    await 1;
    await 2;
    await 3;
    return 'hello world';
  }
  const a = asyncFn();
  a.then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err)
  });
}

function test2 () {
  function request () {
    setTimeout(() => {
      const b = g.next('hello world');
      console.log('b', b)
    }, 500)
    return 1;
  }
  function* gen () {
    // 获取请求结果
    let res = yield request();
    console.log('res: ' + res);
  }
  let g = gen();
  const a1 = g.next(); // 开始运行
  console.log('a1', a1)
  // const a2 = g.next(); // 开始运行
  // console.log('a2', a2)
}
test2()