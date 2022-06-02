// 给定一个字符串，找出最长的不具有重复字符的子串的长度。
// 例如，“abcabcbb”不具有重复字符的最长子串是“abc”，长度为3。
// 对于“bbbbb”，最长的不具有重复字符的子串是“b”，长度为1。

const longestStr = (str) => {
  let res = []
  let max = 0
  for (let c of str) {
    while (res.includes(c)) {
      res.shift()
    }
    res.push(c)
    max = Math.max(max, res.length)
  }
  console.log(max)
  return max
}

longestStr('abcabcbb')
longestStr('bbbb')
// bcdabcbb
longestStr('bcdabcbb')
// bcaabcd
longestStr('bcaabcd')
longestStr('bcaacdzyx')
