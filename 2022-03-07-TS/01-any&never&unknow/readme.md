## any、never、unknow

### any

`any` 是任意值类型，定义为 any 类型的变量允许被赋值为任意类型。

```ts
let myFavoriteNumber: any = 'seven'
myFavoriteNumber = 7
```

**变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型**，也就是说声明为 any 类型和写 JS 没啥区别

### never

`never` 类型表示的是那些永不存在的值的类型。例如一个抛出异常的函数，一个永远不会返回的函数的返回值类型

```tsx
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}

// 推断的返回值类型为never
function fail() {
  return error('Something failed')
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {}
}
```

never 类型是任何类型的子类型，可以赋值给任意类型。但是没有类型是 never 类型的子类型，即使是 any 类型也不能赋值给 never 类型

### unknown

`unknown` 类型是 ts 中所有基础类型的父类型，所有基础类型都能赋值为 unknown 类型。

但是当 unknown 类型赋值为其他任意类型时，就会进行类型检查。我们必须将这个 unknown 类型的变量断言为具体的类型，才可以继续使用。

所以 any 和 unknown 的区别就是：

> 二者都是可以赋值给任意类型的， `any` 会绕过类型检查，直接可用；而 `unkonwn` 则必须要在判断完它是什么类型之后才能继续使用
