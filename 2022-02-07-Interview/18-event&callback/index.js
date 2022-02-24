function test1() {
  function request(req, cb) {
    setTimeout(function () {
      console.log(req)
      cb && cb(req + 1)
    })
  }

  function EventBus() {
    this.cb = null
    // 触发事件
    this.trigger = (res) => {
      this.cb(res)
    }
    // 监听事件
    this.listener = (cb) => {
      this.cb = cb
    }
  }

  const eventBus = new EventBus()

  eventBus.listener(request)

  request(1, (res) => {
    eventBus.trigger(res)
  })
  
}
test1()
