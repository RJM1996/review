## 合并区间

来源：力扣（LeetCode）  
链接：https://leetcode-cn.com/problems/merge-intervals

### 题目描述

以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。

示例 1：

```
输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6]
```

### 题目解析

一般区间相关的问题，我们都可以先将区间进行排序，这样可以合并的区间一定是连续的。

例如这个已经按照 start 进行排序的区间集合

```
[[1,3],[2,6],[8,10],[15,18]]
```

我们首先比较前两个区间，判断其是否可以合并。

我们定义第一个区间为 prev，第二个区间为 cur，通过观察发现：如果 `prev[1] >= cur[0]`，则说明这两个区间有重叠，可以合并

以上面数据为例，前两个区间合并后为 [1, 6]，即新区间的 start 为 prev 的 start，新区间的 end 为两个区间 end 的较大值

得到新的区间后，我们令 prev = 新区间，然后再和下一个区间进行比较合并，如果可以合并则更新 prev

如果不能合并则将 prev 加入到结果中，然后更新 prev 为 cur，继续和后面的区间比较

### 代码实现

```js
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  // 先将区间按照 start 排序
  intervals = intervals.sort((a, b) => a[0] - b[0])

  // 用于存放结果
  const res = []
  // 取第 1 个区间为临时区间
  let tmp = intervals[0]

  // 从第 2 个区间开始遍历
  for (let i = 1; i < intervals.length; ++i) {
    const cur = intervals[i]
    // 如果两个区间有重叠
    if (tmp[1] >= cur[0]) {
      // 则将 tmp 合并为新区间
      tmp[1] = Math.max(cur[1], tmp[1])
    } else {
      // 否则将 tmp 加入到结果中，更新 tmp 为 cur
      res.push(tmp)
      tmp = cur
    }
  }
  // 需要把最后一个 tmp 也加入结果
  res.push(tmp)
  return res
}
```

时间复杂度：O(nlogn)，其中 n 为区间的数量。除去排序的开销，我们只需要一次遍历，主要的时间开销是排序的 O(nlogn)
