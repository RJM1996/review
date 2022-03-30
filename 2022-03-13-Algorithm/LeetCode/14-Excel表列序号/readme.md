## Excel 表列序号

来源：力扣（LeetCode）  
链接：https://leetcode-cn.com/problems/excel-sheet-column-number

### 题目描述

给你一个字符串 columnTitle ，表示 Excel 表格中的列名称。返回 该列名称对应的列序号 。

例如：

```
A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28
...
```

示例 1:

```
输入: columnTitle = "AB"
输出: 28
```

### 题目分析

由于 Excel 表的列名称由大写字母组成，大写字母共有 26 个，相当于是 26 进制，这道题目相当于要将 26 进制转换为 10 进制

我们学过二进制转十进制，例如 0101 转为 10 进制：

```
1*2^0 + 0*2^1 + 1*2^2 + 0*2^3 = 1 + 0 + 4 + 0 = 5
```

那么对于字符串 ABC，它所表示的 10 进制数字为：

```
C*26^0 + B*26^1 + A*26^2
```

我们又知道 A=1, B=2, C=3 ... ，所以则有：

```
C*26^0 + B*26^1 + A*26^2 = 3*1 + 2*26 + 1*26*26 = 731
```

因此我们可以遍历字符串，对每一位字符进行上述的转换，然后相加，即为该字符串的 10 进制表示

### 代码实现

```js
/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function (columnTitle) {
  // ABC 看做一个26进制的数字
  // C*26^0 + B*26^1 + A*26^2
  // 3 + 2*26 + 1*26*26
  let res = 0
  let len = columnTitle.length - 1
  for (let i = 0; i < columnTitle.length; i++, len--) {
    // 获取当前字符对应的 26 进制数字
    const cur = columnTitle[i].charCodeAt() - 'A'.charCodeAt() + 1
    // 将每一位字符转为 10 进制后累加到结果中
    res += cur * Math.pow(26, len)
  }
  return res
}
```

时间复杂度：O(n)，其中 n 是列名称 columnTitle 的长度，需要遍历列名称一次

空间复杂度：O(1)
