// TODO: 构造函数被执行
function Person (name) {
  console.log("constructor");
  // TODO: 将构造函数的this指向新对象
  this.name = name;
}

// TODO: 将新建对象的__proto__属性设置为构造函数的prototype
Person.prototype.say = function () {
  console.log("My name is", this.name);
};

// TODO: 创建新对象
const b = new Person("tom");
b.say();
console.log(b.__proto__ === Person.prototype)


// 模拟实现 new 函数
function myNew (constructorFn, ...args) {
  // 1. 创建一个空对象
  const obj = {}
  // 2. 将空对象的__proto__指向constructor的prototype
  obj.__proto__ = constructorFn.prototype
  // 3. 执行 constructor, 并将新对象绑定为constructor的this对象
  const res = constructorFn.apply(obj, args)
  // 4. 如果构造函数有返回值则返回res,否则返回新对象
  return typeof res === 'object' ? res : obj
}

const p1 = myNew(Person, "jack");
console.log(p1)
p1.say();