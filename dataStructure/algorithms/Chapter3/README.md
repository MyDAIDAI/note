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
- 最小值: 使用递归，一直向左子树中查找，一直查找到某个节点没有左子节点，返回其右子节点
- 最大值：使用递归，一直在右子树中查找，一直查找到某个节点没有右子节点，返回其左子节点
```js
  function deleteMin(node) {
    if(node == null) return
    if(node.left == null) return node.right
    node.left = this.deleteMin(node.left)
    return node
  }
  function deleteMax(node) {
    if(node == null) return
    if(node.right == null) return node.left
    node.right = this.deleteMax(node.right)
    return node
  }
```

#### 删除某个节点
- 该节点只有左子树，则直接将其右子树返回
- 该节点只有右子树，则直接将其左子树返回
- 该节点同时有两个子节点，则从右子树中拿到最小的节点，并将其该删除了最小值的右子树作为最小节点的右子树，将原节点的左子树作为其左子树
```js
  function deleteNode (node, key) {
    if(node == null) return
    if(node.key < key) {
      node.right = this.delete(node.right, key)
    } else if(node.key > key) {
      node.left = this.delete(node.left, key)
    } else {
      // 没有左子树，则把右子树直接返回
      if(node.left == null) return node.right
      // 没有右子树，则把左子树直接返回
      if(node.right == null) return node.left
      // 左右子树都存在
      let t = node
      let x = this.getMin(node.right)
      x.right = this.deleteMin(node.right)
      x.left = t.left
      return x
    }
  }
```

## 平衡查找树

### 2-3查找树
为了保证查找树的平衡性，在这里我们允许树中的一个结点保存多个键。准确的来说，我们将一颗标准的二叉查找树中的结点称为2-结点（含有一个键和两个链接），现在引入3-结点，它含有两个键和三条链接。2-结点和3-结点中的每条链接都对应着其中保存的键所分割产生的一个区间

> 定义：一棵2-3查找树或为一棵空树，或由以下结点组成：
>   - 2- 结点：含有一个键和两条链接，左链接指向的2-3树中的键都小于该结点，右链接指向的2-3树中的键都大于该结点
>   - 3- 结点：含有两个键和三条链接，左链接指向的2-3树中的键都小于该结点，中链接指向的2-3树中的键都位于该结点的两个键之间，右链接指向的2-3树中的键都大于该结点
>
一棵完美平衡的2-3查找树中的所有空链接到根节点的距离都是相同的

尽管我们可以用不同的数据类型表示2-结点与3-结点并写出变换所需的代码，但用这种直白的表示方法实现大多数的操作并不方便，因为需要处理的情况实在太多。我们需要维护两种不同类型的结点，将被查找的键和结点中的每个键进行比较，将链接和其他信息从一种结点复制到另一种结点，将结点从一种数据类型转换到另一种数据类型，等等。实现这些不仅需要大量的代码，而且它们所产生的额外开销可能会使算法比标准的二叉查找树更慢

### 红黑二叉查找树

#### 替换3-结点
**红黑二叉查找树**的思想是用标准的二叉查找树（完全由2-结点构成）和一些额外的信息（替换3-结点）来表示2-3树。将树中的链接分为两种类型：
- **红链接**将两个2-结点连接起来构成一个3-结点
- **黑链接**则是2-3树中的普通链接
将3-结点表示为一条红色链接相连的两个2-结点，这种表示法的一个优点是，无需修改就可以直接使用标准二叉查找树的`get()`方法。对于任意2-3树，只要对结点进行转换，都可以立即派生出一棵对应的二叉查找树，将这种方式表示2-3树的二叉查找树成为红黑树

- 一种等价的定义
红黑树的另一种定义是含有红黑链接并满足下列条件的二叉查找树：
- 红链接均为**左链接**
- 没有任何一个节点同时和两条红链接相连（一条红链接构成一个3-节点，两个则不符合）
- 该树是**完美黑色平衡**的，即任意空链接到根节点的路径上的**黑链接**数量相同（黑链接数量在2-3树中即为所经过路径）