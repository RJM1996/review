const { counts, sayHello } = require('./module.js')

// 注意此处的代码结果
const click = () => {
  console.log('counts: ', counts) // 每次点击事件，打印的 counts 始终为 1
  sayHello() // 1  ==》 3秒钟后 =>> 3
}

click()
