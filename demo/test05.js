function test01() {
  let str = 'a good   example'
  const arr = str.trim().split(/\s+/)
  console.log(arr)
}
// test01()

function test02() {
  const reverseWords = function (s) {
    // 使用栈，将每个单词依次入栈，然后出栈转为字符串即可
    const stk = []
    let l = 0,
      r = 0,
      len = s.length
    while (r < len) {
      const char = s[r]
      if (char === ' ') {
        r++
      } else {
        // 截取单词
        let word = ''
        let i = r
        while (s[i] !== ' ' && i < len) {
          word += s[i]
          i++
        }
        stk.push(word)
        r = i
      }
    }
    console.log(stk)
  }

  reverseWords('a good   example')
}
test02()
