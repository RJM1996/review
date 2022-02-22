
## 事件和发布订阅的关系

### 什么是事件?

```js
const btn = document.getElementById("btn");
btn.addEventListener("click", function (e) {
  console.log(e)
}, false);
```

addEventListener 中的第一个参数 `click` 就是一个事件，第二个参数就是事件处理程序

上述代码包含几个关键对象：

1. btn 节点（事件源）
2. click 事件（事件）
3. 事件处理函数（事件驱动程序）

`addEventListener()` 的工作原理是将实现 [`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener) 的函数或对象添加到调用它的  [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget)  上的指定事件类型的事件侦听器列表中。也就是说在 btn 这个对象中针对每一种事件类型，都有一个事件侦听器列表，上述代码就是将事件处理函数添加到 btn 对象中 click 类型事件的侦听器列表中。



### 事件和发布订阅的关系

在发布订阅模式中有三个角色：

1. 发布者 `Publisher` 
2. 事件调度中心 `Event Channel` 
3. 订阅者 `Subscriber`

将这三个角色套用到上面 dom 事件的处理逻辑中：

1. 对 btn 对象的 `click` 事件添加一个事件处理函数 ，就相当于订阅操作
2. 触发 `click` 事件就相当于发布的操作

我理解这里的事件调度中心就是 btn 对象，在 btn 对象中维护着各种事件的侦听器列表；

事件处理函数就相当于订阅者，订阅了这个事件，当事件触发时会通知事件处理函数进行执行；

发布者就是触发事件的对象，可能是用户点击，或者直接执行 `btn.onclick()`

并且发布订阅是一种一对多的关系，例如我们可以针对 click 事件注册多个事件处理函数，这些函数都会添加到 click 事件的侦听器列表中，当事件触发时依次执行。



### 总结

事件就是发布订阅模式的一种具体实现，本质就是一种消息通知机制，使得订阅者和发布者能够通过一个第三方渠道进行通信。







