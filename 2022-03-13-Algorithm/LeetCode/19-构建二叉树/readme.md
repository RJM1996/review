## 构建二叉树

### 一、从前序与中序遍历序列构造二叉树

来源：力扣（LeetCode）  
链接：https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal

#### 题目描述

给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。

<img src="/Users/rongjunming/Documents/00-demo/github/review/2022-03-13-Algorithm/LeetCode/19-构建二叉树/readme.assets/image-20220418214010860.png" alt="image-20220418214010860" style="zoom:50%;" />

示例 1:

```
输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
输出: [3,9,20,null,null,15,7]
```

#### 题目分析

前序遍历：根左右，中序遍历：左根右。因此可得前序遍历的第一个节点为根节点，我们找到根节点在中序遍历序列中的位置，即可将中序遍历序列分为左右两部分，即左右子树的中序遍历序列。然后根据左子树的节点个数，又能找到前序遍历序列中左子树的范围，将前序遍历序列一分为二。如此递归即可构建出整个二叉树。

具体流程：

1. 先使用一个 Map 将节点在中序遍历序列中的下标存起来，方便后面获取根节点的下标
2. 根据前序遍历的第一个值创建根节点
3. 找到根节点在中序遍历序列中的位置 mid
4. 计算左子树节点的个数 leftNum，根据 mid、leftNum 将序列一分为二
5. 递归创建左右子树

#### 代码实现

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  // 根节点为前序遍历第一个节点，中序遍历的中间节点
  // 先将每个节点在中序遍历数组中的位置在 map 中存起来
  const inorderIndexMap = new Map()
  const len = preorder.length
  for (let i = 0; i < len; ++i) {
    inorderIndexMap.set(inorder[i], i)
  }

  const treeRoot = (preorder, inorder, pL, pR, iL, iR) => {
    if (pL > pR) return null

    // 找到根节点在中序遍历数组中的位置
    const mid = inorderIndexMap.get(preorder[pL])
    const root = new TreeNode(preorder[pL])
    // 左子树节点个数
    const leftTreeNum = mid - iL

    // 递归前序遍历左半边，中序遍历左半边
    root.left = treeRoot(preorder, inorder, pL + 1, pL + leftTreeNum, iL, mid - 1)

    // 递归前序遍历右半边，中序遍历右半边
    root.right = treeRoot(preorder, inorder, pL + leftTreeNum + 1, pR, mid + 1, iR)

    return root
  }

  return treeRoot(preorder, inorder, 0, len - 1, 0, len - 1)
}
```

### 二、从后序与中序遍历序列构造二叉树

后序遍历：左右根。即最后一个节点为根节点，思路和前序遍历构建二叉树一致！

直接上代码：

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  // 后序遍历的最后一个节点就是根节点
  // 然后找到根节点在中序遍历数组中的位置，创建根节点
  // 然后递归创建左右子树
  const len = inorder.length
  const map = new Map()
  for (let i = 0; i < len; ++i) {
    map.set(inorder[i], i)
  }

  const treeRoot = (iL, iR, pL, pR) => {
    if (iL > iR) return null

    const rootVal = postorder[pR]
    const root = new TreeNode(rootVal)
    const mid = map.get(rootVal)
    // 计算右子树的节点个数
    const rightNum = iR - mid

    // 难点在于计算将序列一分为二的位置，画个图会比较清晰
    root.right = treeRoot(mid + 1, iR, pR - rightNum, pR - 1)
    root.left = treeRoot(iL, mid - 1, pL, pR - rightNum - 1)
    return root
  }

  return treeRoot(0, len - 1, 0, len - 1)
}
```

### 根据前序和后序遍历构造二叉树

思路和前面一样:
1. 根节点为前序遍历序列的第一个元素，后序的最后一个元素
2. 找到前序的第二个元素在后序序列中的位置，即可确定左子树节点的个数
3. 然后就能将序列一分为二，即可递归处理左右子树了

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var constructFromPrePost = function (preorder, postorder) {
  // 1. 同样使用 map 存储节点在后序遍历序列中的索引
  const len = postorder.length
  const map = new Map()
  for (let i = 0; i < len; i++) {
    map.set(postorder[i], i)
  }
  const treeRoot = (preL, preR, postL, postR) => {
    if (preL > preR || postL > postR) return null

    // 找到根节点的值，构造根节点
    const rootVal = preorder[preL]
    const root = new TreeNode(rootVal)
    if (preL === preR) return root
    
    // 找到左子树根节点在后序序列中的下标
    const leftRootIndex = map.get(preorder[preL + 1])
    // 计算左子树的节点个数
    const leftNodeNum = leftRootIndex - postL + 1

    // 递归处理左右子树
    root.left = treeRoot(preL + 1, preL + leftNodeNum, postL, postL + leftNodeNum - 1)
    root.right = treeRoot(preL + leftNodeNum + 1, preR, postL + leftNodeNum, postR)

    return root
  }

  return treeRoot(0, len - 1, 0, len - 1)
};
```