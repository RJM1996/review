// 实现一个发布订阅模式 on off emit once
// var eventEmitter = new EventEmitter()
// eventEmitter.on('click', fn)
// eventEmitter.off('click', fn)
// eventEmitter.emit('click', 123)
// eventEmitter.once('click2', fn2)

class EventEmitter {
  constructor() {
    this.store = {}
  }
  on(eventName, cb, isOnce = false) {
    if (!this.store[eventName]) {
      this.store[eventName] = []
    }
    this.store[eventName].push({
      cb,
      isOnce,
      emitCount: 0,
    })
  }
  off(eventName, cb) {
    if (!this.store[eventName]) return
    this.store[eventName] = this.store[eventName].filter((item) => item.cb !== cb)
  }
  emit(eventName, data) {
    const cbs = this.store[eventName] || []
    cbs.forEach((cb) => {
      cb.cb(data)
      if (cb.isOnce) {
        this.off(eventName, cb.cb)
      }
    })
  }
  // 只能触发一次
  once(eventName, cb) {
    this.on(eventName, cb, true)
  }
}

var eventEmitter = new EventEmitter()
const fn = (data) => {
  console.log(111, data)
}
const fn2 = (data) => {
  console.log(222, data)
}
eventEmitter.on('click', fn)
eventEmitter.emit('click', 123)
eventEmitter.off('click', fn)
eventEmitter.emit('click', 123)

eventEmitter.once('click2', fn2)
eventEmitter.emit('click2', 123)
eventEmitter.emit('click2', 123)

// 列表转树
const data = [
  {
    id: 10002,
    content: '该评论已删除',
    author: '小B',
    createAt: 1618389235,
    replyId: 0, // 父级ID
    status: 1,
  },
  {
    id: 10007,
    content: '该评论已删除',
    author: '小7',
    createAt: 1618389335,
    replyId: 10006,
    status: 1,
  },
  {
    id: 10006,
    content: '该评论已删除',
    author: '小6',
    createAt: 1618389235,
    replyId: 10002,
    status: 1,
  },
  {
    id: 10004,
    content: '哈哈我也是',
    author: '小D',
    createAt: 1618389535,
    replyId: 10005,
    status: 0,
  },
  {
    id: 10005,
    content: '的确不错，有学习到',
    author: '小C',
    createAt: 1618389335,
    replyId: 10002,
    status: 0,
  },
  {
    id: 10001,
    content: '这写的真好，我也要学习',
    author: '小F',
    createAt: 1618389035,
    replyId: 0,
    status: 0,
  },
  {
    id: 10003,
    content: '这写的真好，我也要学习到了一些东西真的是很干货啊',
    author: '小A',
    createAt: 1618389335,
    replyId: 0,
    status: 0,
  },
]

const listToTree = (data) => {
  const getSubNode = (node) => {
    node.children = data.filter((item) => item.replyId === node.id) || []
    node.children.forEach((ch) => getSubNode(ch))
  }
  data.forEach((d) => {
    if (d.replyId === 0) getSubNode(d)
  })
  const res = data.filter((item) => item.replyId === 0)
  console.log(JSON.stringify(res))
}
// listToTree(data)
