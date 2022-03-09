## TS 中泛型的作用

泛型（Generics），从字面上理解，泛型就是一般的，广泛的。
泛型是指在定义函数、接口或类的时候，不预先指定具体类型，而是在使用的时候再指定类型。
泛型中的 T 就像一个占位符、或者说一个变量，在使用的时候可以把定义的类型像参数一样传入，它可以原封不动地输出。
泛型在成员之间提供有意义的约束，这些成员可以是：函数参数、函数返回值、类的实例成员、类的方法等。

泛型的优点：
- 函数和类可以支持多种类型，方便扩展复用
- 避免冗长的联合类型
- 灵活控制类型间的约束

```ts
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```