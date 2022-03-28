
function test01 () {
  const myInstanceOf = (target, origin) => {

    let proto = Object.getPrototypeOf(target);
    while (proto) {
      if (proto === origin.prototype) return true
      proto = Object.getPrototypeOf(proto);
    }
    return false
  }

  console.log(myInstanceOf({}, Object))
  console.log({} instanceof Object)
}


function test02 () {

  const remoteAdd = async (a, b) => new Promise(resolve => {
    setTimeout(() => resolve(a + b), 1000);
  });

  // 请实现本地的localAdd方法，调用remoteAdd，能最优的实现输入数字的加法
  async function localAdd (...inputs) {
    // 你的实现
    console.log(inputs)
    const arr = [...inputs]
    console.log('arr', arr)

    // [ 3, 5, 2 ]
    let res = 0
    for (let i = 0; i < arr.length; i++) {
      res = await remoteAdd(arr[i], res)
    }
    return res
  }

  // 请用示例验证运行结果:

  localAdd(1, 2)
    .then(result => {
      console.log(result); // 3
    });

  localAdd(3, 5, 2)
    .then(result => {
      console.log(result); // 10
    });
}

test01()



