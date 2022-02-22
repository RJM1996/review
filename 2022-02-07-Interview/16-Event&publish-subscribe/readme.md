
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

1. btn 节点
2. click 事件
3. 事件处理函数

`addEventListener()` 的工作原理是将实现[`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener)的函数或对象添加到调用它的[`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget)上的指定事件类型的事件侦听器列表中。也就是说在 btn 这个对象中针对每一种事件类型，都有一个事件侦听器列表，上述代码就是将事件处理函数添加到 btn 对象中 click 类型事件的侦听器列表中。



### 什么是发布订阅模式？

在发布订阅模式中有三个角色：

1. 发布者 `Publisher` 
2. 事件调度中心 `Event Channel` 
3. 订阅者 `Subscriber`

将这三个角色套用到上面 dom 事件的处理逻辑中，