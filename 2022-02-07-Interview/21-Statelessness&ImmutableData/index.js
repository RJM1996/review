function test1() {
  let a = {
    num: 1,
  }
  let b = a
  b.num++
  console.log(a, b)
}
test1()
