## 两个数组的交集

来源：力扣（LeetCode）  
链接：https://leetcode-cn.com/problems/intersection-of-two-arrays

### 题目描述

给定两个数组 nums1 和 nums2 ，返回 它们的交集 。输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序 。

示例 1：

```
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]
```

### 题目分析

常规思路：遍历 nums1，判断当前元素是否在 nums2 中存在，若存在则加入到结果集合中

#### 1. 暴力循环

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  const res = []
  nums1.forEach((n1) => {
    nums2.forEach((n2) => {
      if (n1 === n2) res.push(n1)
    })
  })
  return [...new Set(res)]
}
```

时间复杂度 O(n^2)

上述方法每次查找都要遍历一次 nums2 ，真是太蠢了，我们可以先将 nums2 存到一个 Map 中，这样查找的时候就可以打到 O(1) 的时间复杂度。

#### 2. 迭代 + Map

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  // 将其中一个数组存储到 map 中，查询时间复杂度可到 O(1)
  const map = new Map()
  nums1.forEach((n) => map.set(n, n))
  const res = []
  nums2.forEach((n) => {
    if (map.has(n)) res.push(n)
  })
  return [...new Set(res)]
}
```

时间复杂度 O(n1+n2)，即两个数组各遍历一次

空间复杂度 O(n)，Map 的大小不超过其中一个数组的大小

如果两个数组是有序的，那么则可以使用两个指针，从前往后遍历数组，如果相等则加入结果集合，如果不相等，则比较大小，谁小谁就向前一步，然后继续比较 ...

#### 3. 排序 + 双指针

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  // 先将数组排序，再用两个指针遍历数组，如果相等则加入结果，指针右移
  // 如果不相等，则需要比较大小，谁小谁右移
  nums1 = nums1.sort((a, b) => a - b)
  nums2 = nums2.sort((a, b) => a - b)
  let p1 = 0,
    p2 = 0,
    len1 = nums1.length,
    len2 = nums2.length,
    res = [],
    prev = null
  while (p1 < len1 && p2 < len2) {
    const n1 = nums1[p1]
    const n2 = nums2[p2]
    if (n1 === n2) {
      // prev 用于记录前一个加入结果的元素，防止重复元素加入
      if (n1 !== prev) {
        res.push(n1)
        prev = n1
      }
      p1++, p2++
    }
    if (n1 < n2) p1++
    if (n1 > n2) p2++
  }
  return res
}
```
