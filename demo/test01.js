/**
 * 冒泡排序
 * @param {*} nums 
 * @returns 
 */
const bubble_sort = function (nums) {
  let len = nums.length
  if (len <= 1) {
    return nums
  }
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
      }
    }
  }
  return nums
};
const arr = [7, 2, 3, 4, 1, 8, 5, 9, 6]
console.log(bubble_sort(arr))
