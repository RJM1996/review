interface Add {
  (x: number, y: number): number;
}

// function add(...numbers: number[]): number {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     sum += numbers[i];
//   }
//   return sum;
// }

// console.log({ add: add(1, 2, 3) })

function add(x: number, y: number): number;
function add(x: string, y: string): string;
function add(x: any, y: any): any {
  return x + y;
}

console.log({ add: add(1, 2) })

let str: any = "to be or not to be";
let strLength: number = str.length;
let strLength1: number = (str as string).length;
console.log({
  strLength1: strLength1,
  strLength: strLength
})