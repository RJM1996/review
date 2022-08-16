// 内置工具类型

// 1. Required 将所有属性变为必选
interface Person {
  name?: string,
  age?: number,
  hobby?: string[]
}

const user: Required<Person> = {
  name: "树哥",
  age: 18,
  hobby: ["code"]
}

console.log({ user })

// 2. Partial 将所有属性变为可选
interface Person1 {
  name: string,
  age: number,
}

type User = Partial<Person1>

const shuge: User = {
  name: '树哥'
}
console.log({ shuge })

// 3. Exclude 移除部分属性, 构成新类型
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number

// 4. Extract 提取部分属性, 构成新类型
type T0 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
type T1 = Extract<string | number | (() => void), Function>; // () =>void

// 5. Readonly
interface Perso2 {
  name: string;
  age: number;
  gender?: "male" | "female";
}

let p: Readonly<Perso2> = {
  name: "hello",
  age: 10,
  gender: "male",
};
// p.age = 11; // error  Cannot assign to 'age' because it is a read-only property.

// 6. Record 构造具有一组属性 K 的类型 T 的类型
type Property = 'key1' | 'key2'
type Person = Record<Property, string>;

const p: Person = {
  key1: "hello 啊",
  key2: "树哥",
};

// 7. Pick 
// type Pick<T, K extends keyof T> = { [P in K]: T[P]; } 从 T 中，选取一组键位于并集 K 中的属性
type Person = {
  name: string;
  age: number;
  gender: string
}

type P1 = Pick<Person, "name" | "age">; // { name: string; age: number; }

const user: P1 = {
  name: '树哥',
  age: 18
}

// 8. Omit 剔除部分属性
interface Person3 {
  name: string,
  age: number,
  gender: string
}
type P1 = Omit<Person3, "age" | "gender">
const user: P1 = {
  name: '树哥'
}

// 9. NonNullable 从 T 中排除 null 和 undefined
type P1 = NonNullable<string | number | undefined>; // string | number
type P2 = NonNullable<string[] | null | undefined>; // string[]

// 10. ReturnType 获取函数类型的返回类型
type Func = (value: string) => string;
const test: ReturnType<Func> = "1";

// 11. Parameters 获取元组中函数类型的参数
type P1 = Parameters<(a: number, b: string) => void>; // [number, string]

// 12. InstanceType 获取构造函数类型的返回类型
class C {
  x = 0;
  y = 0;
}

type D = InstanceType<typeof C>;  // C