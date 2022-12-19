function test00 () {

  function Observer (obj) {
    console.log(obj === data);
    const keys = Object.keys(obj)
    keys.forEach(key => {
      Object.defineProperty(this, key, {
        get () {
          return obj[key];
        },
        set (value) {
          // debugger
          console.log(this === data, `${key} 被改了`)
          obj[key] = value
        }
      })
    })
  }

  let data = { name: 'hpu' };
  let obs = new Observer(data);
  console.log({ obs })
  data.name = 123

  // let vm = {}
  // vm._data = data = obs

  // // 结果: true, true, true
  // console.log(vm._data === data, vm._data === obs, data === obs)


  // data.name = 'abc'
  // console.log({ data, obs, vmData: vm._data })

  // vm._data.name = '123'
  // console.log({ data, obs, vmData: vm._data })

  // obs.name = 'abc123'
  // console.log({ data, obs, vmData: vm._data })
}
test00()

function test01 () {
  function Observer (obj) {
    Object.defineProperty(data, 'name', {
      get () {
        return data.name
      },
      set (value) {
        data.name = value
      }
    })
  }

  let data = {
    name: 'hpu'
  };
  let obs = new Observer(data);
  console.log({ obs })
  data.name = 123
}
// test01()