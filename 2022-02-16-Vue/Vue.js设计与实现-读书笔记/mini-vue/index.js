// 存储副作用函数的集合
const bucket = new WeakMap()

const data = {
  text: 'hello world',
  count: 1,
  ok: true,
  foo: 1,
}
let activeEffect = null
// 新增一个副作用函数栈
const effectStack = []

// 副作用函数注册器
function effectRegister(fn, options = {}) {
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
    effectStack.push(effectFn)
    const res = fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
    return res
  }
  effectFn.options = options
  // 存储包含该副作用函数的依赖集合
  effectFn.deps = []
  if (!options.lazy) {
    effectFn()
  }
  return effectFn
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
    effects &&
      effects.forEach((effect) => {
        if (activeEffect !== effect) {
          effectsToRun.add(effect)
        }
      })
    effectsToRun.forEach((fn) => {
      if (fn.options && fn.options.scheduler) {
        fn.options.scheduler(fn)
      } else {
        fn()
      }
    })
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
  console.log({ temp1, temp2 })
  proxyData.count++
})

let temp1, temp2
effectRegister(function effectFn1() {
  console.log('effectFn1')
  effectRegister(() => {
    console.log('effectFn2')
    temp2 = proxyData.count
  })
  temp1 = proxyData.text
})

const jobQueue = new Set()
const promise = Promise.resolve()
let isFlushing = false

effectRegister(
  () => {
    console.log(proxyData.count)
  },
  // options
  {
    scheduler(fn) {
      // setTimeout(fn)
      // fn()
      jobQueue.add(fn)
      flushJob()
    },
  }
)
proxyData.count++
proxyData.count++
console.log('done')

function flushJob() {
  if (isFlushing) return

  isFlushing = true
  promise
    .then(() => {
      jobQueue.forEach((fn) => fn())
    })
    .finally(() => {
      isFlushing = false
    })
}

// 计算属性的实现
function computed(getter) {
  let cachedValue = null
  let dirty = true
  // 注册副作用函数, 生成一个 lazy 的 effectFn
  const effectFn = effectRegister(getter, {
    lazy: true,
    scheduler() {
      if (!dirty) {
        dirty = true
        trigger(res, 'value')
      }
    },
  })
  const res = {
    get value() {
      // 当读取 value 时才执行 effectFn
      if (dirty) {
        cachedValue = effectFn()
        dirty = false
      }
      track(res, 'value')
      return cachedValue
    },
  }
  return res
}

const sumRes = computed(() => {
  console.log('computed run')
  if (proxyData.ok) {
    return proxyData.text
  }
  return 'no ok'
})
console.log({ sumRes: sumRes.value })
console.log({ sumRes: sumRes.value })

effectRegister(() => {
  console.log(111, { sumRes: sumRes.value })
})

proxyData.ok = false

console.log({ sumRes: sumRes.value })

// watch 的实现
function watch(source, cb) {
  effectRegister(() => traverse(source), {
    scheduler() {
      cb()
    },
  })
}
watch(proxyData, () => {
  console.log('数据变化了', proxyData)
})
proxyData.foo++
proxyData.count++

function traverse(source, seen = new Set()) {
  if (typeof source !== 'object' || source === null || seen.has(source)) return
  seen.add(source)
  for (let key in source) {
    traverse(source[key], seen)
  }
  return source
}
