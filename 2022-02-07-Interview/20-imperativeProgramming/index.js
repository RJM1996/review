function test1() {
  // 输入数据
  const input = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]

  // 输出数据
  const expect = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

  // 数组扁平化, 去重, 排序
  const a = [1, 2, 3, 4, 5, 6, [7, 8]]
  // console.log(...a)
  // arr = [1,2,3,[4,5]]
  const flat = (arr) => {
    arr.forEach((item) => {
      if (!Array.isArray(item)) {
        return item
      } else {
        return flat(item)
      }
    })
  }
  // console.log(flat(a))

  const res = new Set(input.flat(Number.MAX_SAFE_INTEGER).sort((a, b) => a - b))
  console.log(Array.from(res))
}
test1()
