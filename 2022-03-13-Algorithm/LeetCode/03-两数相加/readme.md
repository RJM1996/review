## 两数相加

### 题目描述

给你两个 **非空** 的链表，表示两个非负的整数。它们每位数字都是按照 **逆序** 的方式存储的，并且每个节点只能存储 **一位** 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

例如：

2 --> 4 --> 3

5 --> 6 --> 4

=

7 --> 0 --> 8



### 题目分析

因为每位数字都是按照逆序存储的，所以可以直接从第一个节点开始相加，如果有进位，就将进位的值记录下来，在下一位两个节点相加时再加上进位，所以每次两个节点相加的和 `sum = val1 + val2 + carry`

代码思路：

1、遍历链表 l1 和 l2，计算 sum = val1 + val2 + carry

2、创建一个新节点，存储 sum 的值，存储的值应该为 sum % 10，例如 sum=11，则实际这一位的值应该是 sum % 10 = 1，进位 1 需要在下一步使用

3、遍历完之后，如果 carry 不为 0，则应该在最后再加上值为 carry 的节点。例如两个 3 位数相加变成了 4 位数：

105

994

=

0001

画图理解：

<img src="/Users/rongjunming/Documents/00-demo/github/review/2022-03-13-Algorithm/LeetCode/03-两数相加/readme.assets/image-20220320002220825.png" alt="image-20220320002220825" style="zoom:50%;" />



### 代码实现

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    // head 用于保存头结点，tail 用于指向新节点，carry 代表进位的值
    let head = null, tail = null, carry = 0;
    // 最长的一个链表遍历完为止
    while (l1 || l2) {
        // 因为可能其中一个链表已经遍历到空节点了， 那么这一位的值就是 0
        const val1 = l1 ? l1.val : 0
        const val2 = l2 ? l2.val : 0
        // 当前位的和就是两个节点的值加上之前的进位
        const sum = val1 + val2 + carry
        if (!head) {
            // 缓存头结点，用于返回
            head = tail = new ListNode(sum % 10)
        } else {
            // tail 表示新链表当前的最后节点
            tail.next = new ListNode(sum % 10)
            tail = tail.next
        }
        // 计算进位
        carry = Math.floor(sum / 10)
        // 遍历 l1 和 l2
        if (l1) l1 = l1.next
        if (l2) l2 = l2.next
    }
    // 遍历完之后，还有进位，说明新链表的长度比 l1 和 l2 最长的还多一位
    if (carry) {
        tail.next = new ListNode(carry)
    }
    return head
};
```



### 复杂度分析

时间复杂度：O(n)，n 为最长的那个链表的长度 

空间复杂度：O(n)，n 为新链表的长度，因为创建了 n 个节点





