## TS中的元组和枚举类型的作用 

### 元组

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同

```tsx
//定义一个元组类型
let x: [string, number];
x = ['hello', 10]; // ok
x = [10, 'hello']; // error
```

元组可以越界添加元素（不建议），但是不能越界访问

```tsx
const list: [string, number] = ['hello', 123]
list.push('world')
console.log(list) // [ 'hello', 123, 'world' ]
console.log(list[2]) // error
```

元组中的元素可选：

```js
let list: [number, string?, boolean?]
list = [10, 'hello', true]
list = [10, 'hello']
list = [10]
```

但是可选元素必须在必选元素的后面，可选元素后必须都是可选元素

```js
let list: [number, string?, boolean] 
// Error: A required element cannot follow an optional element
```

### 元组的应用

React Hooks 的返回值类型

```js
import { useState } from 'react';

const [loading, setLoading] = useState<boolean>(false); 
```

因为 hook 的返回值通常是一个数组，并且数组中的元素类型不同，这时候就需要使用元组类型

当我们需要使用数组，但是数组中元素类型可能不同时，就可以使用元组

```js
type Touple = [string, number, string];
let csvData: Touple[] = [
    ['张三', 18, '男'], 
    ['李四', 14, '男']
];
```





### 枚举

枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。

```tsx
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
```

#### 数字枚举

枚举成员会被赋值为从 `0` 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：

```tsx
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
```

#### 字符串枚举

```tsx
enum Status {
  enable = 'enable',
  disable = 'disable',
}
```

