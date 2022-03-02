## React 为什么是典型的 FP？ReactView = render(data) 怎样以 FP 的方式理解？

函数式编程的特性：

**1、数据不可变(Immutable)**

- 在 React 中，强调一个组件不能去修改传入的 prop 值，也是遵循 Immutable 的原则；

- 在 Redux 中，更是强调 Immutable 的作用，每个 reducer 不能够修改 state，只能返回一个新的 state

**2、纯函数**

- 在 React 中，组件的 render 函数应该是一个纯函数，只有这样组件渲染的结果才只和 state/props 有关系，遵循 UI = f(state) 这个公式；
  $$UI = f(state)$$

- 在 Redux，reducer 必须是一个纯函数，也是函数式编程的要求

另外 React 官网也说 React 可以使用声明式编写 UI，让你的代码更加可靠，且方便调试。

以及函数式组件，hooks，都是函数式编程的体现。
