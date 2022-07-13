// num 在数组中第一次出现的位置
const find = (num, arr) => {
  let left = 0
  let right = arr.length - 1
  for (let i = 0; i < arr.length; i++) {
    const mid = (left + right) >> 1
    if (arr[mid] === num) {
      for (let j = mid; j >= 0; j--) {
        if (arr[j] !== arr[mid]) {
          return j + 1
        }
      }
      return 0
    }
    if (arr[mid] < num) left = mid + 1
    if (arr[mid] > num) right = mid - 1
  }
  return -1
}

const num = 5
const arr = [1, 2, 3, 3, 4, 5, 6]
const arr1 = [1, 3, 3, 3, 4, 5, 6]
const arr2 = [1, 5, 5, 5, 5, 5, 6]
const index = find(num, arr2)
console.log(index)

