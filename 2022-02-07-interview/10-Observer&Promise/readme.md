## Promise 和观察者模式的关系

### 什么是观察者模式？
> 观察者模式也叫发布订阅模式，因此它存在两个操作：发布和订阅
>
> 例如我们订阅一本杂志，每个月杂志发布的时候就会通知我们，浏览器中的事件机制就是典型的发布订阅模式

```js
document.addEventListener("keydown", function (e) {
  console.log(e) // 订阅 keydown 事件，事件触发时执行回调函数
})
```

### 观察者模式在 Promise 中的应用

在 Promise 中一般会订阅两种状态 resolve 和 reject

- 使用 then 方法第1个参数来订阅 resolve
- 使用 then 方法第2个参数或者 catch 方法来订阅 reject

发布操作就是执行 resolve 或 reject 函数，当 resolve 和 reject 函数执行时，then 或 catch 中传递的订阅函数也将执行，订阅函数的入参就是 resolve 或 reject 调用时传递的参数。因此在 Promise 中：

- 发布者就是 resolve 和 reject
- 订阅者就是 then 和 catch 方法中的回调函数



