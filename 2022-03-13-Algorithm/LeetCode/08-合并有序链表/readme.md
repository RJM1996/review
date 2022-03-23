## 合并两个有序链表

### 题目描述

将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

例如：

<img src="readme.assets/merge_ex1.jpeg" alt="merge_ex1" style="zoom:67%;" />

### 题目分析

要合并两个有序链表，那么就是从两个链表的头结点开始，比较哪个小，就把哪个加到结果里

例如，要合并 [1,2,4] 和 [1,3,4] ，则可以看作要合并 1 和 [2,4]与[1,3,4] 的合并结果，同理：

1、合并 [2,4]与[1,3,4]，那就看作合并 1 和 [2,4]与[3,4] 的合并结果

2、合并[2,4]与[3,4]，就看作合并 2 与 [4]与[3,4] 的合并结果

...

因此可以将这个问题转化为递归实现

#### 1. 递归

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  // 一条链表为空，则直接返回另一条链表
  if (!list1) return list2
  if (!list2) return list1
  if (list1.val < list2.val) {
    // 谁小就将谁的 next 指向剩余链表的合并结果
    list1.next = mergeTwoLists(list1.next, l2)
    // 然后返回当前链表
    return list1
  } else {
    list2.next = mergeTwoLists(list2.next, list1)
    return list2
  }
}
```

理解递归实现时，我们只需要将 `mergeTwoLists(list1.next, l2)` 当做一个已经合并完成的链表

如果 list1.val 更小，那么肯定是 list1.next 指向这个已合并完成的链表，然后返回 list1

递归操作只是在不断缩小这个已合并的链表，直到某一条链表为空，不能继续缩小时，就该返回了。

时间复杂度：O(m+n)，m 和 n 分别为两个链表的长度

空间复杂度：O(m+n)，因为递归函数最多调用 m+n 次

其实感觉我们常规思路一般是：遍历链表，然后比较当前两个节点哪个的值小，就把哪个节点接到头结点的后面

#### 2. 循环遍历

首先我们先设置一个 head 节点用于保存头结点，最后好返回；然后设置一个 p 节点用于遍历链表，将较小的节点接在 p 的后面，然后 p 节点往前一步，再继续遍历

```js
var mergeTwoLists = function (list1, list2) {
  let head = new ListNode()
  let p = head
  // 遍历两个链表，其中有一个为空即可退出循环
  while (list1 && list2) {
    if (list1.val < list2.val) {
      // 谁小就把谁接在 p 后面，然后向前一步
      p.next = list1
      list1 = list1.next
    } else {
      p.next = list2
      list2 = list2.next
    }
    p = p.next
  }
  // 最后谁还有剩余，就接在 p 的后面即可
  p.next = list1 || list2
  return head.next
}
```

时间复杂度：O(m+n)，遍历次数不会超过两个链表长度之和

空间复杂度：O(1)，只用了两个额外的变量
