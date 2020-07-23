# 查找

## 符号表
### 顺序查找（基于无序链表）
`get()`会顺序地搜索链表查找给定的键，`put()`会顺序搜索链表查找给定的键，如果找到则更新相关的值，否则则会用给定的键值对创建一个新的结点并插入到链表的开头

在含有`N`对键值的基于（无序）链表的符号表中，查找和插入操作都需要`N`次比较

时间复杂度：`O(N)`
code: [SequentialSearchST.js](SequentialSearchST.js)

### 有序数组中的二分查找
`rank`函数的作用：
- 如果表中存在该键，`rank()`应该返回该键的位置，也就是表中小于它的键的数量
- 如果表中不存在该键，`rank()`还是应该返回表中小于它的键的数量

时间复杂度：`O(logN)`

一般情况下**二分查找**都比**顺序查找**快得多，它也是众多实际应用程序的最佳选择。对于一个**静态表**（不允许插入）来说，将其在初始化时就排序是值的的
code: [BinarySearchST.js](BinarySearchST.js)

#### 符号表的各种实现的优缺点
|  数据结构|实现  |优点  |缺点|
| --- | --- | --- | --- |
| 链表（顺序查找） | SequentialSearchST  | 适用于小型问题 | 对于大型符号表很慢 |
| 有序数组（二分查找） | BinarySearchST  | 最优的查找效率和空间需求，能够进行有序性相关的操作 | 插入操作很慢|
| 二叉查找树 | BST | 实现简单，能够进行有序性相关的操作 | 没有性能上界的保证，链接需要额外的空间 |
| 平衡二叉查找树 | RedBlackBST | 最优的查找和插入效率，能够进行有序性相关的工作 | 链接需要额外的空间 |
| 散列表 | SeparateChainHashST/LinearProbingHashST | 能够快速地查找和插入常见类型的数据 | 需要计算每种类型的数据的散列，无法进行**有序性**相关的操作，链接和空结点需要额外的空间 |


## 二叉查找树
**二叉查找树**: 每个结点都含有一个键，且每个结点的键都大于其左子树中的任意结点而小于右子树的任意结点。如果将一颗二叉查找树的所有键投影到一条直线上，保证一个结点的左子树中的键出现在它的左边，右子树中的键出现在它的右边，那么一定可以得到一个有序的键列

### 基本实现

#### 查找
一般说来，在符号表中查找一个键可能得到两种结果。如果含有该键的结点存在于表中，则查找命中并返回该值。否则查找未命中。那么使用递归算法可以得到，将当前值与根节点值进行判断，如果相等则返回，小于则去根的左子树中判断，大于则去根的右子树中判断

```js
class Node {
  constructor(key, val) {
    this.key = key
    this.val = val
    this.left = null
    this.right = null
  }
}

class BST {
  constructor(root) {
    this.root = root
  }
  get(node, key) {
    if(key == undefined) return 
    if(node == null) return null
    if(key < node.key) {
      return this.get(node.left, key)
    } else if(key > node.key) {
      return this.get(node.right, key)
    } else {
      return node
    }
  }
}
```
#### 插入
递归的插入方法的实现逻辑与查找很相似，如果树是空的，就返回一个含有该键值对的新结点，如果被查找的键小于根结点的键，那么继续在左子树中插入该键，否则在右子树中插入该键
```js
function put(node, key, val) {
    if(node == null) return new Node(key, val)
    if(key < node.key) {
      node.left = this.put(node.left, key, val)
    } else if(key > node.key) {
      node.right = this.put(node.right, key, val)
    } else {
      node.val = val
    }
    return node
  }
```
#### 最大键和最小键
如果根节点的左链接为空，那么一颗二叉查找树中最小的键就是根结点。如果左链接非空，那么树中的最小键就是左子树中的最小键。找出最大值的方法也是类似的
```js
function getMin(node) {
  if(node == null) return
  if(node.left == null) return node
  return this.getMin(node.left)
}
function getMax(node) {
  if(node == null) return
  if(node.right == null) return node
  return this.getMax(node.right)
}
```
#### 向上取整和向下取整
```js
// todo
```

#### 删除最大值和最小值
