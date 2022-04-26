/**
 * 深拷贝
 * @param {Object} obj 要拷贝的对象
 * @param {Map} map 用于存储循环引用对象的地址
 */

function deepClone(obj = {}, map = new Map()) {
  if (typeof obj !== 'object') {
    return obj
  }
  if (map.get(obj)) {
    return map.get(obj)
  }

  let result = {}
  // 初始化返回结果
  if (
    obj instanceof Array ||
    // 加 || 的原因是为了防止 Array 的 prototype 被重写，Array.isArray 也是如此
    Object.prototype.toString(obj) === '[object Array]'
  ) {
    result = []
  }
  // 防止循环引用
  map.set(obj, result)
  for (const key in obj) {
    // 保证 key 不是原型属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用
      result[key] = deepClone(obj[key], map)
    }
  }

  // 返回结果
  return result
}

function test1() {
  const a = {
    b: {
      c: 'c',
    },
  }
  const b = {
    a,
  }
  a.b = b
  console.log(a, b)
  const c = deepClone(a)
  console.log(c === a)
}
// test1()

function test2() {
  function foo() {
    console.log('foo')
  }
  function bar() {
    console.log('bar')
    foo()
  }
  function baz() {
    console.log('baz')
    bar()
  }
  baz()
}
// test2()

function test3() {
  function foo(el, index, array) {
    console.log(el, index, array, this.id)
  }
  const obj = {
    id: 'hello',
  }
  ;[1, 2, 3].forEach(foo, obj)
}
test3()
