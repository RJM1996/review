function test1 () {
  function Person () {

  }
  // prototype是函数才会有的属性
  Person.prototype.name = 'Kevin';
  var person1 = new Person();
  var person2 = new Person();
  console.log(person1.name) // Kevin
  console.log(person2.name) // Kevin
  console.log(person1.__proto__ === Person.prototype); // true
  console.log(Person === Person.prototype.constructor); // true
}
// test1()

function test2 () {
  function Person () {

  }

  var person = new Person();

  console.log(person.__proto__ == Person.prototype) // true
  console.log(Person.prototype.constructor == Person) // true
  // 顺便学习一个ES5的方法,可以获得对象的原型
  console.log(Object.getPrototypeOf(person), Person.prototype)
  console.log(Object.getPrototypeOf(person) === Person.prototype) // true
}
// test2()

function test3 () {
  // Function
  function Foo () { }
  let f1 = new Foo();
  let f2 = new Foo();

  // 实例的 __proto__ 等于构造函数的 prototype
  console.log('实例的 __proto__ 等于构造函数的 prototype')
  console.log('f1.__proto__ === Foo.prototype', f1.__proto__ === Foo.prototype)
  console.log('f2.__proto__ === Foo.prototype', f2.__proto__ === Foo.prototype)

  // 原型对象的 __proto__ 指向 Object.prototype
  console.log('原型对象的 __proto__ 指向 Object.prototype')
  console.log('Foo.prototype.__proto__ === Object.prototype', Foo.prototype.__proto__ === Object.prototype)
  console.log('Object.prototype.__proto__ === null', Object.prototype.__proto__ === null)

  // 构造函数的 prototype 的 constructor 指向构造函数本身
  console.log('构造函数的 prototype 的 constructor 指向构造函数本身')
  console.log('Foo.prototype.constructor === Foo', Foo.prototype.constructor === Foo)

  // 函数对象是由内置函数 Function 创建的
  console.log('函数对象是由内置函数 Function 创建的, Foo 是 Function 的实例')
  console.log('Foo.__proto__ === Function.prototype', Foo.__proto__ === Function.prototype)

  console.log('Function.prototype本质也是普通对象')
  console.log('Function.prototype.__proto__ === Object.prototype', Function.prototype.__proto__ === Object.prototype)


  // Object
  let o1 = new Object();
  let o2 = new Object();

  console.log('实例的 __proto__ 等于构造函数的 prototype')
  console.log('o1.__proto__ === Object.prototype', o1.__proto__ === Object.prototype)
  console.log('o2.__proto__ === Object.prototype', o2.__proto__ === Object.prototype)

  console.log('Object.prototype.__proto__ === null', Object.prototype.__proto__ === null)
  console.log('Object.prototype.constructor === Object', Object.prototype.constructor === Object)

  // 所有函数的 __proto__  都和 Function.prototype 指向同一个地方
  console.log('所有函数的 __proto__  都和 Function.prototype 指向同一个地方')
  console.log('Object.__proto__ === Function.prototype', Object.__proto__ === Function.prototype)
  console.log('Function.prototype.__proto__ === Object.prototype', Function.prototype.__proto__ === Object.prototype)

  console.log('相当于 Function 是 Function 自己的实例')
  console.log('Function.__proto__ === Function.prototype', Function.__proto__ === Function.prototype)
  console.log('Function.prototype.constructor === Function', Function.prototype.constructor === Function)

}
test3()
