## 无状态和数据不可变

### 什么是无状态？

第一次听说`无状态`这个词是在学习 HTTP 协议时了解到：标准的 HTTP 协议是一个`无状态，无连接`的通信协议

因为每一个 http 请求都是独立的，和前后的请求都没有什么关系，服务器也不会存储和该请求相关的任何信息。

但有时候我们为了记住用户的登录状态，就引入了 cookie、session 等机制保存请求上下文，记录状态。

后面在学习 React 时又听说了`有状态组件` 和 `无状态组件` ：

- 有状态组件：组件内部有自己的变量记录一些组件自身的数据
- 无状态组件：组件内部没有额外变量，完全依赖于外部传入的数据

无状态组件的好处：

- 相同的输入总是产生相同的输出，不容易产生难以定位的bug，便于测试
- 可以使用函数式编程的写法，代码可读性提升
- 组件渲染就是执行函数，不用实例化对象，性能提高



### 什么是数据不可变？

不可变数据概念来源于**函数式编程**。函数式编程中，对已初始化的“变量”是不可以更改的，每次更改都要创建一个新的“变量”。

新的数据进行有副作用的操作都不会影响之前的数据。

在 React 中不可变数据的意思就是：始终保持 state 的原值不变，不要直接修改 state，遇到数组或者对象，拷贝一份新的数据再进行改变。

例如我们有一个 js 对象

```js
let a = {
  num: 1
}
let b = a
b.num++
```

这样 a 和 b 中的 num 都会变成 2，因为他们指向的是同一个内存地址。在 React 中当引用类型的数据改变，需要重新渲染组件时，只会进行引用地址的浅比较，例如 `a.num++` 没有修改 a 的引用地址，组件并不会重新渲染，所以我们每次 setState 时都要传递一个新的对象

对于浅层对象我们可以使用 Object.assign、展开运算符来进行浅拷贝，深层对象使用 `JSON.parse(JSON.stringify())` 进行深拷贝，但这种方式对于 function、symbol、undefined 等类型的数据无法进行处理，而真正的深拷贝性能开销也比较大。

所以产生了一种新的 `不可变数据结构` ，当深层次对象中的属性没有改变时，依然进行内存共享，当发生改变时才创建新的变量进行存储，避免了对整个对象进行拷贝。

了解到有两个库可以实现不可变数据结构

- [immutable.js]([immutable-js/immutable-js: Immutable persistent data collections for Javascript which increase efficiency and simplicity. (github.com)](https://github.com/immutable-js/immutable-js))
- [immer.js]([Introduction to Immer | Immer (immerjs.github.io)](https://immerjs.github.io/immer/))

### immutable.js

- 自己维护了一套数据结构，Javascript 的数据类型和 `immutable.js` 的类型需要相互转换，对数据有侵入性
- 库的体积比较大（63KB），不太适合包体积紧张的移动端
- API 极其丰富，学习成本较高
- 兼容性非常好，支持 IE 较老的版本

### immer.js

- 使用 Proxy 实现，兼容性欠缺
- 体积很小（12KB），移动端友好
- API 简洁，使用 Javascript 原生数据类型，几乎没有理解成本

目前项目中还没有使用过这两个库，一般都是使用深拷贝的方式解决的，先记录一下，后面可以学习学习并在项目中进行使用。



