// 1. 结果:1,3,2

// 2. 
function fun (...dim) {
  const [layer, ...d] = dim;
  return d.length ? Array(layer).fill(0).map(_ => fun(...d)) : Array(d)
}
console.log(fun(2, 3, 4))


function TreeNode (val, left, right) {
  this.left = left || null;
  this.right = right || null;
  this.val = val || 0;
}
const root = new TreeNode(4)

const node6 = new TreeNode(6)
const node7 = new TreeNode(7)
root.left = node6
root.right = node7

const node1 = new TreeNode(1)
const node9 = new TreeNode(9)
node6.left = node1
node6.right = node9

const node3 = new TreeNode(3)
const node5 = new TreeNode(5)
node9.left = node3
node9.right = node5


/**
 * 
 * @param {*} root 
 */
function test (root) {
  const res = []
  // 遍历二叉树,从左往右存储所有的叶子节点,然后判断是否为等差数列
  const printTree = (root) => {
    if (!root) return null
    if (!root.left && !root.right) {
      res.push(root.val)
    }
    printTree(root.left)
    printTree(root.right)
  }
  printTree(root)
  console.log(res)
  const t = res[1] - res[0]
  for (let i = 1; i < res.length - 1; i++) {
    if (res[i + 1] - res[i] !== t) {
      return false
    }
  }
  return true
}

console.log(test(root))

