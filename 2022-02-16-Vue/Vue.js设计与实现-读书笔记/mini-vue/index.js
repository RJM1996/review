// 存储副作用函数的集合
const bucket = new WeakMap()

const data = {
  text: 'hello world',
  count: 1,
  ok: true,
}
let activeEffect = null
// 副作用函数注册器
function effectRegister(fn) {
  function cleanup(effectFn) {
    for (let i = 0; i < effectFn.deps.length; i++) {
      const deps = effectFn.deps[i]
      deps.delete(effectFn)
    }
    effectFn.deps.length = 0
  }
  function effectFn() {
    cleanup(effectFn)
    activeEffect = effectFn
    fn()
  }
  // 存储包含该副作用函数的依赖集合
  effectFn.deps = []
  effectFn()
}
// 定义代理对象
const proxyData = new Proxy(data, {
  // 读取拦截
  get(target, key) {
    track(target, key)
    return target[key]
  },
  // 设置拦截
  set(target, key, value) {
    target[key] = value
    trigger(target, key)
    return true
  },
})

// 抽离 set 拦截器的逻辑
function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (depsMap) {
    // 获取与该 key 相关联的副作用函数并执行
    const effects = depsMap.get(key)
    const effectsToRun = new Set(effects)
    effectsToRun.forEach((fn) => fn())
  }
}

// 抽离 get 拦截器的逻辑
function track(target, key) {
  // const bucket = { // weakMap
  //   target: { // Map
  //     key: [] // Set
  //   }
  // }
  if (activeEffect) {
    let depsMap = bucket.get(target)
    if (!depsMap) {
      depsMap = new Map()
      bucket.set(target, depsMap)
    }
    let deps = depsMap.get(key)
    if (!deps) {
      deps = new Set()
      depsMap.set(key, deps)
    }
    deps.add(activeEffect)
    // 将包含该副作用函数的依赖集合收集起来
    activeEffect.deps.push(deps)
  }
}

const contentEle = document.getElementById('content')
const btnEle = document.getElementById('btn-add')
const btnChangeEle = document.getElementById('btn-change')

effectRegister(() => {
  console.log('effect fun')
  // btnEle.innerText = proxyData.count
  contentEle.innerText = proxyData.ok ? proxyData.text : 'not'
})

btnEle.addEventListener('click', () => {
  // proxyData.text = 'hello vue3'
  proxyData.count += 1
  proxyData.ok = false
})

btnChangeEle.addEventListener('click', () => {
  proxyData.text = 'hello Vue3'
})
