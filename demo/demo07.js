const fb = (n) => {
  if (n < 2) return n
  // const dp = [0, 1]
  let p = 0,
    q = 1,
    r = 1
  // 0 1 1 2 3 5
  for (let i = 3; i <= n; ++i) {
    p = q
    q = r
    r = p + q
  }
  return r
}
console.log(fb(5))

const fb1 = (n) => {
  // dp[i] = dp[i-1] + dp[i-2]
}

const add = (n1, n2) => {
  let sum = 0
  let carry = 0
  let p1 = n1.length - 1
  let p2 = n2.length - 1
  const res = []
  while (p1 >= 0 || p2 >= 0) {
    const num1 = p1 >= 0 ? +n1[p1] : 0
    const num2 = p2 >= 0 ? +n2[p2] : 0
    sum = num1 + num2 + carry
    console.log(num1, num2, sum, carry)
    res.push(sum % 10)
    carry = Math.floor(sum / 10)
    p1--, p2--
  }
  return res.reverse().join('')
}
console.log(add('123', '4567'))
// 123
// 4567
// 
