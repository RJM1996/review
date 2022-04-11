## 重排链表

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reorder-list

### 题目描述

给定一个单链表 L 的头节点 head ，单链表 L 表示为：

```
L0 → L1 → … → Ln - 1 → Ln
```

请将其重新排列后变为：

```
L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
```

不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

示例 1：

```
输入：head = [1,2,3,4,5]
输出：[1,5,2,4,3]
```

### 题目解析

如果链表可以像数组一样使用下标访问，那就很好办了。所以我们可以先把链表节点用数组存起来，然后使用两个指针分别从前往后，从后往前遍历数组，然后依次连接节点即可。

#### 解法一：数组存储节点

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  if (!head) return null
  const nodeArr = []
  let cur = head
  while (cur) {
    nodeArr.push(cur)
    cur = cur.next
  }
  let p = 0,
    q = nodeArr.length - 1
  let n1, n2
  while (p <= q) {
    n1 = nodeArr[p++]
    n2 = nodeArr[q--]
    n1.next = n2
    n2.next = nodeArr[p]
  }
  n2.next = null
}
```

但是这样需要使用额外的数组，空间复杂度为 O(n)

经过观察我们发现，重排后的链表其实就是原链表的左半边和右半边反转后再合并的结果，即：

1、寻找链表中间节点，将其一分为二

2、将后半部分链表反转

3、交叉合并两个链表

#### 解法二：中间节点 + 反转链表 + 合并链表

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  // 1. 找到中间节点
  // 2. 反转后半部分链表
  // 3. 合并两个链表

  // 快慢指针寻找中间节点
  const midNode = (head) => {
    let slow = head
    let fast = head
    while (fast && fast.next) {
      slow = slow.next
      fast = fast.next.next
    }
    return slow
  }
  // 反转链表
  const reverse = (head) => {
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
  // 交叉合并两个链表
  const mergeList = (l1, l2) => {
    let tmp1, tmp2
    while (l1 && l2) {
      tmp1 = l1.next
      tmp2 = l2.next

      l1.next = l2
      l1 = tmp1

      l2.next = l1
      l2 = tmp2
    }
  }

  if (!head) return null
  let l1 = head
  let l2 = null
  const mid = midNode(head)
  console.log('mid', mid)
  l2 = mid.next
  mid.next = null
  l2 = reverse(l2)
  mergeList(l1, l2)
}
```

空间复杂度为 O(1)
