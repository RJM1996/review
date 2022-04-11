
## 反转字符串

### 一、数组反转

```js
const reverseStr = str => str.split('').reverse().join('')
```



### 二、递归

```js
const reverseStr = (str) => (str !== '' ? reverseStr(str.substr(1)) + str.charAt(0) : '')

console.log(reverseStr('hello, world !')) // ! dlrow ,olleh
```



### 三、循环遍历

```js
function test02() {
  const reverseStr = (str) => {
    let resultStr = ''
    for (let i = str.length - 1; i >= 0; i--) {
      resultStr += str[i]
    }
    return resultStr
  }
  console.log(reverseStr('hello, world !'))
}
test02()
```

### 四、双指针

```js
  const reverseStr = (str) => {
    const strArr = str.split('')
    let left = 0
    let right = strArr.length - 1
    while (left < right) {
      ;[strArr[left], strArr[right]] = [strArr[right], strArr[left]]
      left++, right--
    }
    return strArr.join('')
  }
```



### 五、使用栈

```js
  const reverseStr = (str) => {
    const stk = []
    str.split('').forEach((c) => stk.push(c))
    let res = ''
    while (stk.length) {
      res += stk.pop()
    }
    return res
  }
  
  console.log(reverseStr('hello')) // olleh
```

