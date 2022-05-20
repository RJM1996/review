// 翻转链表
// { next: {}, val: ''}
// 1 2 3 4 5
// 5 4 3 2 1
const reverse = (head) => {
  if (!head) return null
  let prev = null
  let cur = head
  while (cur) {
    const next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }
  return prev
}

const head = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: null,
    },
  },
}

// console.log(reverse(head))

const findRepeat = (arr) => {
  const obj = {}
  arr.forEach((num) => {
    if (!obj[num]) obj[num] = 1
    else obj[num]++
  })
  return Object.keys(obj).filter((key) => {
    return obj[key] > 1
  })
}
const arr = [1, 2, 3, 4, 5, 6, 3, 4, 5]
console.log(findRepeat(arr))
