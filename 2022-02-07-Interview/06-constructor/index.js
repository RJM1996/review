const list = [null, undefined, 1, true, "", Symbol(), { a: 1 }, [1, 2]]
  .map((v) => [
    v,
    function () {
      return v;
    },
  ])
  .map(([ret, MyConstructor]) => [
    Object.prototype.toString.call(ret),
    ret,
    JSON.stringify(new MyConstructor())
  ])

console.table(list)

function BasicType () {
  return 1
}
const b1 = new BasicType()
console.log('b1:', b1)