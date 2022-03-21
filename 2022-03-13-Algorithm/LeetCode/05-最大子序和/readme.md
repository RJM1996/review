## 最大子数组和

### 题目描述

给你一个整数数组 `nums` ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

**子数组** 是数组中的一个连续部分。

例如：

```
输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
```



### 题目分析

我们定义 f(i) 就是以第 i（0<=i<nums.length）个数结尾的连续子序列的最大和，那么就有
$$
f(i) = Max(f(i-1)+nums[i],nums[i])
$$
因为如果 f(i-1)+nums[i] 比 nums[i] 还小，那么以第 i 个数为结尾的连续子数组的最大和就是 nums[i] 本身了

例如：[-2, 1 ,-3, 4]，以第 2 个数结尾的最大子数组的和为 -2+1-3 = -4，以第 3 个数结尾的最大子数组和为

```
f(3) = Max(-4+4, 4) = 4
```



### 代码实现

根据上述动态规划转移方程，则可以写出如下代码

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    const dp = [nums[0]]
    let max = dp[0]
    for (let i = 1; i < nums.length; ++i) {
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
        max = dp[i] > max ? dp[i] : max
    }
    return max
};
```

时间复杂度：O(n)，遍历了 n 次

空间复杂度：O(n)，使用了长度为 n 的 dp 数组

我们发现其实计算第 i 项时只需要第 i-1 项的值，不需要都存起来，所以可以改进代码如下：

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let prev = nums[0]
  max = prev
  for (let i = 1; i < nums.length; i++) {
    prev = Math.max(prev + nums[i], nums[i])
    max = prev > max ? prev : max
  }
  return max
};
```

这样空间复杂度就成了 O(1)



