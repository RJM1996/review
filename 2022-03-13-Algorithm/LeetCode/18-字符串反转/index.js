function test01() {
  const reverseStr = (str) => (str !== '' ? reverseStr(str.substr(1)) + str.charAt(0) : '')
  console.log(reverseStr('hello, world !'))
}

function test02() {
  const reverseStr = (str) => {
    let resultStr = ''
    for (let i = str.length - 1; i >= 0; i--) {
      resultStr += str[i]
    }
    return resultStr
  }
  console.log(reverseStr('hello, world !'))

  const reverseStr1 = (str) => {
    const strArr = str.split('')
    let left = 0
    let right = strArr.length - 1
    while (left < right) {
      ;[strArr[left], strArr[right]] = [strArr[right], strArr[left]]
      left++, right--
    }
    return strArr.join('')
  }
  console.log(111, reverseStr1('hello'))

  const reverseStr2 = (str) => {
    const stk = []
    str.split('').forEach((c) => stk.push(c))
    let res = ''
    while (stk.length) {
      res += stk.pop()
    }
    return res
  }
  console.log('reverseStr2', reverseStr2('hello'))
}

test02()
