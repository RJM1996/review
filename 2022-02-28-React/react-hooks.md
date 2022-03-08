## React 常用 hooks 总结

*Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

### 为什么使用 hooks ？

- 组件之间复用状态逻辑很难 
- 复杂组件变的难以理解 
- 难以理解的 class，类的实例化开销较大

### 常用的 hooks

**useState**：用于定义函数组件中的 state，相当于类组件中的 this.state 和 this.setState

**useEffect**：通过依赖触发的钩子函数，常用于处理副作用，例如请求接口等

**useCallback**：缓存回调函数，避免每次组件更新时都生成一个新的函数实例，使得依赖组件重复渲染，通常用于性能优化

**useMemo**：用于缓存数据，当依赖项改变时才重新计算并生成数据。有助于避免在每次渲染时都进行高开销的计算

**useRef**：它可以[很方便地保存任何可变值](https://zh-hans.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables)，其类似于在 class 中使用实例字段的方式。通常用于命令式地访问子组件，或者用于保存定时器ID，以便在需要时销毁

**useLayoutEffect**：和 useEffect 使用方式相同，但它会在所有的 DOM 变更之后同步调用传入的回调函数。可以使用它来读取 DOM 布局并同步触发重渲染

**useReducer**：是 useState 的替代方案，类似于 Redux 思想的实现。可以理解为一个组件内部的 redux，会随着组件卸载而销毁。单纯使用它并不能共享数据，搭配 useContext 使用可以实现一个轻量级的 redux

**useContext**：使得函数组件中也可以使用 Context API。相当于 class 组件中的 `static contextType = MyContext` 或者 `<MyContext.Consumer>`

**useImperativeHandle**：可以让你在使用 `ref` 时自定义暴露给父组件的实例值，应当与 [`forwardRef`](https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref) 一起使用



