## 路径总和

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/path-sum

### 题目描述

给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。如果存在，返回 true ；否则，返回 false 。

叶子节点 是指没有子节点的节点

例如：target = 22，则下面二叉树蓝色节点组成的路径之和满足条件

<img src="/Users/rongjunming/Documents/00-demo/github/review/2022-03-13-Algorithm/LeetCode/06-路径总和/readme.assets/image-20220322205433747.png" alt="image-20220322205433747" style="zoom:50%;" />

### 题目分析和代码

#### 1. 递归

求从根节点到叶子节点的路径和是否等于 target，可以转化为：求从根节点的左节点开始到叶子节点的路径和是否等于 target - root.val

右节点同理。我们只需要不断递归左右子树，当到达叶子节点时，判断叶子节点的 val 是否等于最终的 target 即可

```js
var hasPathSum = function (root, targetSum) {
  // 我们可以转化为判断根节点的子树是否满足条件
  if (!root) return false
  // 到达叶子节点，判断当前节点 val 是否等于最终的 target
  if (!root.left && !root.right) return targetSum === root.val
  // 递归判断左右子树
  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)
}
```

时间复杂度：O(n)，n 为节点个数，每个节点都要遍历一次

空间复杂度：O(h)，h 为树的深度

#### 2. 双队列

相当于层序遍历二叉树，一个队列用于存储遍历过程中的节点，另一个队列存储当前遍历节点到根节点路径之和。

```js
var hasPathSum = function (root, targetSum) {
  // 使用双队列，一个用来记录当前节点，一个记录以当前节点为叶子节点的路径之和
  if (!root) return false
  // 根节点入队
  const queue = [root]
  const valQueue = [root.val]
  // 队列不为空则继续遍历
  while (queue.length) {
    // 出队一个节点
    const node = queue.shift()
    // 这里的 val 即为当前出队节点到根节点的路径之和
    const val = valQueue.shift()
    // 如果当前出队节点是叶子节点，并且 val 等于 target，则说明找到了这条路径
    if (!node.left && !node.right && val === targetSum) return true
    // 否则就继续遍历当前节点的左右子树
    if (node.left) {
      queue.push(node.left)
      valQueue.push(val + node.left.val)
    }
    if (node.right) {
      queue.push(node.right)
      valQueue.push(val + node.right.val)
    }
  }
  return false
}
```

时间复杂度：O(n)，每个节点都要遍历一遍

空间复杂度：O(n)，队列的元素个数不会超过节点个数 n
