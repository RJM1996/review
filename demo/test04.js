const arr = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
]

// 打印第 1 列, 第 row 行
const print = (arr) => {
  let row = arr.length - 1
  let col = arr[0].length - 1

  let tmpR = row

  let r = 0
  let c = 0

  const res = []
  let level = 0

  while (r <= row && c <= col && level <= row) {
    res[level] = []
    while (r <= tmpR && c <= col) {
      // console.log(arr[r][c])
      res[level].push(arr[r][c])
      if (r === tmpR) {
        c++
      } else {
        r++
      }
    }
    level++
    // 循环结束, r=0, c=col-1
    tmpR--

    r = 0
    c = level
  }
  return res
}

console.log(print(arr))
