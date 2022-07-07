// call
function call() {
  function say() {
    console.log(this, this.name)
  }
  say()

  const cat = {
    name: 'tom',
  }

  say.call(cat)
  say.call()

  Function.prototype.myCall = function (context, ...args) {
    if (typeof this !== 'function') {
      throw new Error('caller must be a function')
    }
    context = context || global
    context.fn = this
    context.fn(...args)
    delete context.fn
  }
  say.myCall(cat)
  say.myCall()
}
// call()

// apply
function apply() {
  function say() {
    console.log(this, this.name)
  }
  say()

  const cat = {
    name: 'tom',
  }

  say.apply(cat)
  say.apply()

  Function.prototype.myApply = function (context, args) {
    if (typeof this !== 'function') {
      throw new Error('caller must be a function')
    }
    context = context || global
    const fnSymbol = Symbol()
    context[fnSymbol] = this
    if (args) {
      context[fnSymbol](...args)
    } else {
      context[fnSymbol]()
    }
    delete context[fnSymbol]
  }
  say.myApply(cat)
  say.myApply()
}
// apply()

// bind
function bind() {
  function say(a, b) {
    console.log(this, this.name, a, b)
  }
  // say()

  const cat = {
    name: 'tom',
  }

  say.bind(cat, 1)(2)
  // say.bind()()

  Function.prototype.myBind = function (context, ...args1) {
    if (typeof this !== 'function') {
      throw new Error('caller must be a function')
    }
    const fn = this
    return function (...args2) {
      fn.apply(context, [...args1, ...args2])
    }
  }
  say.myBind(cat, 1)(2)
  // say.myBind()()
}
bind()
