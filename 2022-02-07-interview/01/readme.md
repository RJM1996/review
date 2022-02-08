JavaScript 判断数据类型的方式共有四种

- typeof
- instanceof
- constructor
- Object.prototype.toString

## typeof

`typeof` 可以准确判断除 `null` 之外的所有基本数据类型以及 `Function`
对于 `null` 及其他引用数据类型都返回 `object`

```js
function _typeof() {
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
  console.log(typeof function () {})
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
```

## instanceof

`instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个 `实例对象` 的原型链上，即目标值是否为指定构造函数的实例

```js
function _instanceof() {
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
  console.log(function () {} instanceof Function)
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
_instanceof()
```
`instanceof` 的缺点
> 1. 不能判断基本数据类型,因为基本数据类型不是构造函数的实例,没有原型链
> 2. 引用数据类型的原型链上都会存在 object.prototype, 所以引用数据类型的 instanceof Object 都为 true
> 3. 原型链可以修改, 结果可能不准确

## constructor

```js
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
_constructor()
```

`constructor` 可以判断目标值是否为指定构造函数的实例, 可以判断除了 `null` 和 `undefined` 以外的所有数据类型; 因为 `null` 和 `undefined` 是在 js 运行环境创建之初就已经存在的数据类型,没有构造函数.
为什么基本数据类型也有 `constructor` 属性呢?
> 因为在基本数据类型获取 `constructor` 属性的时候, js 会自动将基本数据类型的值转为包装对象实例, 并在使用后立即销毁

缺点: constructor 属性可以被修改, 结果可能不准确


## Object.prototype.toString

可以返回 `对象的类型字符串`, 能够准确判断所有数据类型
```js
function _toString () {
  // '[object Number]'
  console.log(Object.prototype.toString.call(123))
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
_toString()
```




