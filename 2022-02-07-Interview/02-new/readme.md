# new 关键字

js 中定义一个类

```js
// 定义构造函数
function Person (name) {
  console.log("constructor");
  // 将构造函数的this指向新对象
  this.name = name;
}

// 定义类的属性
Person.prototype.say = function () {
  console.log("My name is", this.name);
};

// 创建新对象
const p1 = new Person("tom");
p1.say();
```

在调用 new 时, 主要做了 4 件事:

1. 创建一个新的空对象

2. 将空对象的 `__proto__` 指向构造函数的 `prototype`

3. 执行构造函数, 并将新创建的空对象绑定为构造函数的this对象

4. 如果构造函数有返回一个对象,则返回这个对象,否则返回新创建的那个对象

根据以上规则,我们可以模拟实现一个 new 函数

```js
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
p1.say();
```
