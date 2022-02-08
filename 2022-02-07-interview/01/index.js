function _typeof () {
  // 'number'
  console.log(typeof 123)
  // 'string'
  console.log(typeof '123')
  // 'boolean'
  console.log(typeof true)
  // 'symbol'
  console.log(typeof Symbol(123))
  // 'object'
  console.log(typeof [])
  // 'object'
  console.log(typeof {})
  // 'function'
  console.log(typeof function () { })
  // 'undefined'
  console.log(typeof undefined)
  // 'object'
  console.log(typeof null)
  // 'object'
  console.log(typeof new Date())
  // 'object'
  console.log(typeof /\d/g)
  // 'object'
  console.log(typeof new Error())
}
_typeof()

function _instanceof () {
  // false
  console.log(123 instanceof Number)
  // false
  console.log('123' instanceof String)
  // false
  console.log(true instanceof Boolean)
  // false
  console.log(Symbol(123) instanceof Symbol)
  // true
  console.log([] instanceof Array)
  // true
  console.log({} instanceof Object)
  // true
  console.log(function () { } instanceof Function)
  console.log('function () {} instanceof Object', function () { } instanceof Object)
  try {
    // TypeError: Right-hand side of 'instanceof' is not an object
    console.log(undefined instanceof undefined)
    // TypeError: Right-hand side of 'instanceof' is not an object
    console.log(null instanceof null)
  } catch (error) {
    console.log(error)
  }
  // true
  console.log(new Date() instanceof Date)
  // true
  console.log(/\d/g instanceof RegExp)
  // true
  console.log(new Error() instanceof Error)
}
// _instanceof()

function _constructor () {
  // true
  console.log((123).constructor === Number)
  // String
  console.log('123'.constructor)
  // Boolean
  console.log(true.constructor)
  // Symbol
  console.log(Symbol(123).constructor)
  // Array
  console.log([].constructor)
  // Object
  console.log({}.constructor)
  // Function
  console.log(function () { }.constructor)
  try {
    // TypeError: Cannot read properties of undefined (reading 'constructor')
    console.log(undefined.constructor)
    // TypeError: Cannot read properties of null (reading 'constructor')
    console.log(null.constructor)
  } catch (error) {
    console.log(error);
  }
  // Date
  console.log(new Date().constructor)
  // RegExp
  console.log(/\d/g.constructor)
  // Error
  console.log(new Error().constructor)
}
// _constructor()

function _toString () {
  // '[object Number]'
  console.log(Object.prototype.toString.call(123))
  console.log(Object.prototype.toString.call(BigInt(123)))
  // '[object String]'
  console.log(Object.prototype.toString.call('123'))
  // '[object Boolean]'
  console.log(Object.prototype.toString.call(true))
  // '[object Symbol]'
  console.log(Object.prototype.toString.call(Symbol(123)))
  // '[object Array]'
  console.log(Object.prototype.toString.call([]))
  // '[object Object]'
  console.log(Object.prototype.toString.call({}))
  // '[object Function]'
  console.log(Object.prototype.toString.call(function () { }))
  // '[object Undefined]'
  console.log(Object.prototype.toString.call(undefined))
  // '[object Null]'
  console.log(Object.prototype.toString.call(null))
  // '[object Date]'
  console.log(Object.prototype.toString.call(new Date()))
  // '[object RegExp]'
  console.log(Object.prototype.toString.call(/\d/g))
  // '[object Error]'
  console.log(Object.prototype.toString.call(new Error()))
}
// _toString()