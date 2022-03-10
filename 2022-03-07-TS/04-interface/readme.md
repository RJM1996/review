## TS 中接口是什么？与类型的关系是什么？

### 接口（interface）

通俗来说，接口就是用来描述复杂数据结构的一种类型

语法：

```typescript
interface Person {
  firstName: string
  lastName: string
}
function name(person: Person) {
  console.log(person.firstName, person.lastName)
}
```

这里的 Person 就是一个接口，也就是一种自定义的类型

接口还能定义函数类型：

```typescript
interface AddFunc {
  (num1: number, num2: number): number
}

const add: AddFunc = (n1, n2) => n1 + n2
const join: AddFunc = (n1, n2) => `${n1} ${n2}` // 不能将类型'string'分配给类型'number'
add('a', 2) // 类型'string'的参数不能赋给类型'number'的参数
```

使用接口定义一个类的成员：

```typescript
interface ClockInterface {
  currentTime: Date
  setTime(d: Date): void
}

class Clock implements ClockInterface {
  currentTime: Date = new Date()
  setTime(d: Date) {
    this.currentTime = d
  }
  constructor(h: number, m: number) {}
}
```

### interface 和 type 的区别

- 用 type 声明类型不能使用 extends 关键字来继承，但可以用&来实现
- interface 声明参数的类型可以覆盖，而 type 声明过的类型不能再次声明
- interface 一般用来声明组件内部属性、组件之间的传递的接口参数，而 type 用于简单参数类型的语义化
- type 比 interface 更适用于联合类型和枚举类型
