## useEffect

语法

```js
useEffect(
  function create() {
    // 创建副作用的回调函数
    return function destroy() {
      // 清理副作用的回调函数
    }
  },
  // 副作用对应的依赖
  [...deps]
)
```

create 和 destory 的执行顺序？

### 先 destroy 再 create

在组件状态更新后，React 将先调用所有的 `destroy` 函数，再调用所有的 `create` 函数

### destory 的调用分为两种情况

1. 从组件树中删除虚拟 DOM 时，引起的 `destroy` 函数调用，即组件**卸载时**
2. 组件内 Hook 的依赖发生改变时，引起的 `destroy` 函数调用，即组件**更新时**

#### 卸载时

React 使用[先序遍历](https://link.juejin.cn/?target=https%3A%2F%2Fbaike.baidu.com%2Fitem%2F%E5%85%88%E5%BA%8F%E9%81%8D%E5%8E%86)，处理卸载时的虚拟 DOM，并执行它们的 destroy 函数。

即先执行父组件的，再执行子组件的。

#### 更新时

React 使用[后序遍历](https://link.juejin.cn/?target=https%3A%2F%2Fbaike.baidu.com%2Fitem%2F%E5%90%8E%E5%BA%8F%E9%81%8D%E5%8E%86)，即先执行子组件的，再执行父组件的。

#### 同时存在卸载和更新时

当组件的 children 同时存在卸载和更新的虚拟 DOM 时，会先处理被卸载的虚拟 DOM，再处理更新的。

### create 的调用顺序

React 使用[后序遍历](https://link.juejin.cn/?target=https%3A%2F%2Fbaike.baidu.com%2Fitem%2F%E5%90%8E%E5%BA%8F%E9%81%8D%E5%8E%86)虚拟 DOM 树的方式，执行它们的 `create` 回调函数，即先执行子组件的，再执行父组件的。

### useEffect 和 useLayoutEffect

`useEffect` 和 `useLayoutEffect` 的区别： `useLayoutEffect` 是在提交( commit ) 阶段同步执行的，而 `useEffect` 是在未来某时刻执行的。

`useEffect` 回调的执行时机有两种情况：

1. 由 React Scheduler 调度，在后续宏任务中执行
2. 在下一次调和阶段之前执行

与生命周期函数 `componentDidMount` 更类似的是 `useLayoutEffect`，都是在渲染完成后同步执行的，而 `useEffect` 是在渲染完成后异步执行的。

### 依赖数组 deps

useEffect 第二个参数传入 undefined、[]、[...deps] 时会有不同的执行效果：

- 传入 undefined 每次都会执行
- 空数组只会执行一次
- 而依赖数组只有在依赖有变化时才会执行

hooks 是在 fiber 节点的 memorizedState 属性上存取数据的，会组织一个和 hook 一一对应的链表。

构建这个链表的阶段叫 mount，后面只需要 update，因此所有 hook 的实现都分为了 mountXxx 和 updateXxx 两部分。

useEffect 在 update 时会对比新传入的 deps 和之前存在 memorizedState 上的 deps，从而确定是否执行 effect 回调函数，具体处理逻辑为：

1. 当 deps 是 null（undefined 也会处理成 null）时，判定为不相等
2. 如果是热更新的时候，判定为不相等
3. 否则会对比数组的每个依赖项来判断是否相等（使用 [Object.is() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 来判断）。只要新旧 deps 不相等就执行 effect 回调函数


参考文章：
1. [深入理解 useEffect 和 useLayoutEffect 中回调函数的执行时机 - 掘金 (juejin.cn)](https://juejin.cn/post/6959372766114119688#heading-0)
2. [从源码理清 useEffect 第二个参数是怎么处理的 - 掘金 (juejin.cn)](https://juejin.cn/post/7083230365027926053#heading-0)
3. [关于useEffect的一切 - 掘金 (juejin.cn)](https://juejin.cn/post/6867338827418042375)
