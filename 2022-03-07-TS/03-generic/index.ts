// 泛型

interface LengthWise {
  length: number;
}

// 使用泛型定义函数
function getValue<T extends LengthWise>(arg: T): T {
  console.log({
    arg,
    type: typeof arg,
    length: arg.length // 会报错, T 类型上不一定存在 length
  })
  return arg;
}

// 调用
getValue<string>('树哥'); // 定义 T 为 string 类型
// getValue<number>(123);
// getValue<boolean>(true);


// 定义多个泛型变量
function getValue1<T, U>(arg: [T, U]): [T, U] {
  console.log({
    arg,
    len: arg.length
  })
  return arg;
}

// 使用
const str = getValue1(['树哥', 18]);

// 泛型接口
interface KeyValue<T, U> {
  key: T;
  value: U;
}

const person1: KeyValue<string, number> = {
  key: '树哥',
  value: 18
}
const person2: KeyValue<number, string> = {
  key: 20,
  value: '张麻子'
}
console.log({
  person1, person2
})

// 泛型类
// class Test<T> {
//   value: T;
//   add: (x: T, y: T) => T;
// }

// let myTest = new Test<number>(1);
// console.log({
//   myTest
// })
// myTest.value = 0;
// myTest.add = function (x, y) {
//   return x + y;
// };
// console.log({
//   res: myTest.add(1, 2)
// })

// 泛型类型别名
type Cart<T> = { list: T[] } | T[];
let c1: Cart<string> = { list: ["1"] };
let c2: Cart<number> = [1];
console.log({
  c1, c2
})

// 泛型工具类型
// typeof
// 先定义变量，再定义类型
let p1 = {
  name: "树哥",
  age: 18,
  gender: "male",
};
type People = typeof p1;
function getName(p: People): string {
  return p.name;
}
console.log({
  p: getName(p1)
})

// keyof
interface Person {
  name: string;
  age: number;
  gender: "male" | "female";
}

type PersonKey = keyof Person; // type PersonKey = 'name'|'age'|'gender';

function getValueByKey(p: Person, key: PersonKey) {
  return p[key];
}
let val = getValueByKey({ name: "树哥", age: 18, gender: "male" }, "gender");
console.log({ val }); // 树哥

// in 遍历枚举类型
type Keys = "a" | "b" | "c"

type Obj = {
  [p in Keys]: any
} // -> { a: any, b: any, c: any }

// infer
type ReturnType<T> = T extends (
  ...args: any[]
) => infer R ? R : any;

// 索引访问接口
interface Person {
  name: string;
  age: number;
}

type x = Person["name"]; // type x = string
type y = Person["age"]; // type y = number
