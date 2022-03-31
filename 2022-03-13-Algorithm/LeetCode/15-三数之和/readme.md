## 三数之和

来源：力扣（LeetCode）  
链接：https://leetcode-cn.com/problems/3sum

### 题目描述

给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。

示例 1：

```
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
```

### 题目分析

看到这题发现和两数之和很像，既然两数之和可以用暴力循环解法，那么三数之和应该也可以

但是这样时间复杂度就是 O(n^3) 了！并且题目还要求不能重复！所以得另辟蹊径啊

既然是一堆数字，那我们就先给它排序看看

```
[-1,0,1,2,-1,-4] 排序 [-4, -1, -1, 0, 1, 2]
```

然后我们遍历数组，因为题目要求结果不能重复，那么针对当前元素 cur，如果有 cur + a + b == 0， 那么 a 和 b 只能在 cur 后面去找，因为如果往前找，可能导致重复，例如 [-1, 0, 1] 这三个数，当 -1 作为 cur 时，[0, 1] 已经被用了，当 0 作为 cur 时，如果还去用前面的 -1，就会导致重复。所以我们每次遍历时，只在当前元素 cur 的后面去找 a 和 b。

具体过程如下：

1. 令 cur = nums[i]，如果 cur > 0，因为后面都比 cur 大，肯定不存在加起来为 0 的数了，就可以终止循环了

2. 如果 nums[i] === nums[i-1]，则会找到重复的结果，所以就直接跳过，继续从下一个开始找

3. 针对 nums[i]，我们令 left = i+1，right = nums.length - 1，即找到它后面元素的首尾两个

4. 然后计算 sum = nums[i] + nums[left] + nums[right]

5. 如果 sum === 0，则加入结果集合

   5.1 然后 left++, right--, 继续寻找其他组合

   5.2 如果 nums[left] === nums[left+1]，为了避免重复，则跳过

   5.3 如果 nums[right] === nums[right-1]，为了避免重复，则跳过

6. sum > 0，说明 nums[right] 大了，则 right-- 左移一位

7. sum < 0，说明 nums[left] 小了，则 left++ 右移一位

### 代码实现

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  // 1. 排序
  // 2. 遍历数组，对于 nums[i]，设置 l = i+1, r = len-1
  // 3. 计算 sum = nums[i] + nums[l] + nums[r]
  // 4. 判断 sum 的三种情况
  //    4.1 等于0：加入结果
  //    4.2 大于0：说明 nums[r] 大了， r--
  //    4.3 小于0：说明 nums[l] 小了， l++
  // 5. 当 l 与 r 相遇时，以 nums[i] 开头的结果遍历完毕，开始下一次遍历

  const len = nums.length
  if (len < 3) return []

  nums.sort((a, b) => a - b)
  const res = []

  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) return res
    if (i > 0 && nums[i] === nums[i - 1]) continue

    let left = i + 1,
      right = len - 1
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right]
      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]])
        while (left < right && nums[left] === nums[left + 1]) {
          left++
        }
        while (left < right && nums[right] === nums[right - 1]) {
          right--
        }
        left++, right--
      } else if (sum < 0) {
        left++
      } else if (sum > 0) {
        right--
      }
    }
  }
  return res
}
```

时间复杂度：O(N^2)，其中 _N_ 是数组的长度。因为一个 for 循环遍历当前元素，一个 while 循环遍历 left 和 right
