/**
 * @description
 * 实现 call, apply, bind
 */
function test01() {
  /**call */
  Function.prototype.myCall = function (context) {
    // 判断调用对象
    if (typeof this !== 'function') {
      throw new Error('Type error')
    }
    // 首先获取参数
    let args = [...arguments].slice(1)
    let result = null
    // 判断 context 是否传入，如果没有传就设置为 window
    context = context || window
    // 将被调用的方法设置为 context 的属性
    // this 即为我们要调用的方法
    context.fn = this
    // 执行要被调用的方法
    result = context.fn(...args)
    // 删除手动增加的属性方法
    delete context.fn
    // 将执行结果返回
    return result
  }
  function fn() {
    console.log(this.name, ...arguments)
  }
  fn.myCall({ name: 'lily' })
  fn.call({ name: 'lily' })

  /**apply */
  Function.prototype.myApply = function (context) {
    if (typeof this !== 'function') {
      throw new Error('Type error')
    }
    let result = null
    context = context || window
    // 与上面代码相比，我们使用 Symbol 来保证属性唯一
    // 也就是保证不会重写用户自己原来定义在 context 中的同名属性
    const fnSymbol = Symbol()
    context[fnSymbol] = this
    // 执行要被调用的方法
    const args = arguments[1] ? [...arguments[1]] : []
    result = context[fnSymbol](...args)
    // 删除手动增加的属性方法
    delete context[fnSymbol]
    return result
  }
  fn.myApply({ name: 'apply' }, [1, 2, 3])
  fn.apply({ name: 'apply' }, [1, 2, 3])
  fn.myApply({ name: 'apply' })

  /**bind */
  Function.prototype.myBind = function (context) {
    // 判断调用对象是否为函数
    if (typeof this !== 'function') {
      throw new Error('Type error')
    }
    // 获取参数
    const args = [...arguments].slice(1)
    const fn = this
    return function Fn() {
      return fn.apply(
        this instanceof Fn ? this : context,
        // 当前的这个 arguments 是指 Fn 的参数
        args.concat(...arguments)
      )
    }
  }
  fn.myBind({ name: 'bind' }, 1, 2, 3)(4)
}
test01()
