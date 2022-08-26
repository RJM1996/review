// 存储副作用函数的集合
const bucket = new Set()

const data = {
  text: 'hello world',
  count: 1,
}
let activeEffect = null
// 副作用函数注册器
function effectRegister(fn) {
  activeEffect = fn
  fn()
}
const proxyData = new Proxy(data, {
  // 读取拦截
  get(target, key) {
    if (activeEffect) {
      bucket.add(activeEffect)
    }
    return target[key]
  },
  // 设置拦截
  set(target, key, value) {
    target[key] = value
    bucket.forEach((fn) => fn())
    return true
  },
})

const content = document.getElementById('content')
const btn = document.getElementById('btn')
const effect = () => {
  console.log('effect fun')
  content.innerText = proxyData.text
  // btn.innerText = proxyData.count
}
effectRegister(effect)

btn.addEventListener('click', () => {
  // proxyData.text = 'hello vue3'
  proxyData.count += 1
})
