## 二分查找

#### 题目描述

给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1



#### 题目分析

1、遍历数组进行查找，但是最坏的情况就需要遍历整个数组，时间复杂度是 O(n)

2、我们发现题目中的数组是有序的，可以利用这一点来进行更快地查找。就像平时我们猜一个价格，别人说不对，那我们会问高了还是低了，其实就是在不断缩小范围。

所以我们可以先以数组中间的那个元素为基准 base，即下标为 mid 的元素

1）如果 target < base，说明 target 在 base 的左边，即元素下标区间为 [0, mid)

2）如果 target > base，说明 target 在 base 的右边，即元素下标区间为 (mid, 1]

3）如果相等，则下标为 mid

重复上述过程，不断缩小查找范围，直到找到目标值

          

#### 代码实现

```js
const search = (nums, target) {
  let l = 0
  let r = nums.length - 1
  // 保证 [l,r] 这个区间有效
  while(l <= r) {
    // 计算中间位置
    const mid = Math.floor((r-l)/2) + l
    if(nums[mid] === target) return mid
    if(nums[mid] > target) r = mid - 1
    if(nums[mid] < target) l = mid + 1
  }
  return -1
}
```



#### 可以优化的点

计算中间位置可以使用右移运算符 >>，因为右移一位相当于除以 2。例如 5 的二进制 0101，右移一位是 0010，即 2

```js
const mid = (r + l) >> 1
```









