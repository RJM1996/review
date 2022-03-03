## 对比vue2，vue3的函数式风格体现在什么地方

在 Vue 2 中，函数式组件主要有两个应用场景：

- 作为性能优化，因为它们的初始化速度比有状态组件快得多
- 返回多个根节点

```js
// Vue 2 函数式组件示例
export default {
  functional: true,
  props: ['level'],
  render(h, { props, data, children }) {
    return h(`h${props.level}`, data, children)
  }
}
```

```js
<!-- Vue 2 结合 <template> 的函数式组件示例 -->
<template functional>
  <component
    :is="`h${props.level}`"
    v-bind="attrs"
    v-on="listeners"
  />
</template>

<script>
export default {
  props: ['level']
}
</script>
```

在 Vue 3 中，所有的函数式组件都是用普通函数创建的。换句话说，不需要定义 `{ functional: true }` 组件选项。

```js
import { h } from 'vue'

const DynamicHeading = (props, context) => {
  return h(`h${props.level}`, context.attrs, context.slots)
}

DynamicHeading.props = ['level']

export default DynamicHeading
```
另外 vue3 的 composition api，强调通过各种函数组合来提高代码可读性，复用性，也是函数式编程的体现。

