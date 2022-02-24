## 如何使用事件解决回调地狱？

其实 Promise 就是一个例子，写在 then 方法中的回调函数就相当于在监听着 Promise 的 resolve 事件，当 resolve 事件触发时，then 中的回调函数就执行

为了防止回调函数层层嵌套，我们可以使用一个 EventBus

例如我们有两个请求，请求2依赖请求1，先在 eventBus 中注册某个事件，事件处理函数为请求2

当请求 1 执行完毕后，在其回调函数中触发 eventBus 的这个事件，则此时请求2就会被触发，这样就避免了请求2嵌套在请求1的回调函数中，避免了回调地狱的形成

```js
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

  eventBus.listener((param) => {
    request(param, (res) => {
      console.log(res)
    })
  })
  request(1, (res) => {
    eventBus.trigger(res)
  })
  
}
test1()

```



