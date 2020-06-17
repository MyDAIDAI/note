# 第一章 基础

## 1.3 背包、队列和栈

### 背包

**背包**是一种不支持从中删除元素的集合数据类型--它的目的就是帮助用例收集元素并迭代遍历所有收集到的元素，迭代的顺序不确定且与用例无关

| `public class Bag<Item> implements Iterable<Item>` |                   |
| -------------------------------------------------- | ----------------- |
| `Bag()`                                            | 创建一个空背包    |
| `void add(Item item)`                              | 添加 一个元素     |
| `boolean isEmpty()`                                | 背包是否为空      |
| `int size()`                                       | 背包中的 元素数量 |



TODO: 背包的典型用例



### 先进先出队列

先进先出队列是一种基于**先进先出**策略的集合类型。当用例使用`foreach`语句迭代访问队列中的元素时，元素的处理顺序就是它们被添加到队列中的顺序。在应用程序中使用队列的主要原因是**在用集合保存元素的同时保存它们的相对顺序：使它们入列顺序和出列顺序相同**



TODO: 队列的文件读取用例



### 下压栈

下压栈是一种基于**后进先出**策略的集合模型。当用例使用`foreach`语句迭代遍历栈中的元素时，元素的处理顺序和它们被压入的顺序正好相反。在应用程序中使用栈的主要原因是**在用集合保存元素的同时颠倒它们的相对顺序**



#### 算术表达式求值

计算算术表达式的值，例如`(1 + ((2 + 3) * (4 * 5)))`

思路： 

- 使用两个栈，一个运算符栈，一个操作数栈
- 忽略左括号
- 将操作数压入操作数栈
- 将运算符压入运算符栈
- 在遇到右括号时，弹出一个运算符，弹出所需数量的操作数，并将运算符和操作数的运算结果压入栈中

code: [evaluate.js](evaluate.js)

### `Exercises`
- 1.3.1 实现一个固定大小的栈 
    - [1.3.1_FixedCapacityStack.js](1.3.1_FixedCapacityStack.js)
- 1.3.4 `Write a stack client Parentheses.java that reads in sequence of left and right parentheses, braces, and brackets from standard input and uses a stack to determine whether the sequence is properly balanced. For example, your program should print true for [()]{}{[()()]()} and false for [(]).`
    - [1.3.4_Parentheses.js](1.3.4_Parentheses.js)
- 1.3.5 打印N的二进制表示
    - [1.3.5_IntegerToBinary.js](1.3.5_IntegerToBinary.js)
- 1.3.10 `Write a filter Program InfixToPostfix.java that converts an arithmetic expression from infix to postfix.`
    - [1.3.10_InfixToPostfix.js](1.3.10_InfixToPostfix.js)
- 1.3.11 `Write a program EvaluatePostfix.java that that takes a postfix expression from standard input, evaluates it, and prints the value. `
    - [1.3.11_EvaluatePostfix.js](1.3.11_EvaluatePostfix.js)
- 1.3.19 给出一段代码，删除链表的尾节点，其中链表的首节点为`first`
    - [1.3.19_DeleteListTail.js](1.3.19_DeleteListTail.js)
- 1.3.20 编写一个方法`delete()`，接收一个`int`参数`k`，删除链表的第`k`个元素（如果存在）
    - [1.3.20_DeleteListsK.js](1.3.20_DeleteListsK.js)
- 1.3.21 编写一个方法`find()`，接受一条链表和一个字符串`key`作为参数。如果链表中的某个节点的`item`域的值为`key`，则方法返回`true`，否则返回`false`
    - [1.3.21_FindListKey.js](1.3.21_FindListKey.js)
- 1.3.24 编写一个方法`removeAfter()`，接受一个链表结点作为参数并删除该节点的后续节点（如果参数结点或参数结点的后续结点为空则什么也不做）
    - [1.3.24_RemoveListAfter.js](1.3.24_RemoveListAfter.js)
- 1.3.25 编写一个方法`insertAfter()`，接受两个链表结点作为参数，将第二个结点插入链表并使之成为第一个节点的后续节点（如果两个参数为空则什么也不做）
    - [1.3.25_InsertListAfter.js](1.3.25_InsertListAfter.js)
- 1.3.26 编写一个方法`remove()`, 接受一个链表和一个字符串`key`作为参数，删除链表中所有`item`域为`key`的结点
    - [1.3.26_RemoveListByKey.js](1.3.26_RemoveListByKey.js)
- 1.3.27 编写一个方法`max()`，接受一条链表的首节点作为参数，返回链表中键最大的节点的值。假设所有键均为正数，如果链表为空则返回0
    - [1.3.27_GetListMax.js](1.3.27_GetListMax.js)
- 1.3.28 用递归的方法解答上一道练习
    - [1.3.27_GetListMax.js](1.3.27_GetListMax.js)
- 1.3.29 用环形链表实现`Queue`。环形链表也是一条链表，只是没有任何结点的链接为空，且只要链表非空则`last.next`的值为`first`。只能使用一个`Node`类型的实例变量(`last`)
    - [1.3.29_RingListQueue.js](1.3.29_RingListQueue.js)
- 1.3.30 编写一个函数，接受一条链表的首结点作为参数，（破坏性地）将链表反转并返回结果链表的首结点
    - [1.3.30_ReverseList.js](1.3.30_ReverseList.js)
- 1.3.37 `Josephus problem`约瑟夫问题
    - 题目描述：n个人（编号由 1,2, ..., n）围成一圈，由编号为1的人从1开始报数，报到k的退出自杀，剩下的人继续从1开始报数，直到圈内只剩余1人，求胜利者的编号。(n>0, k>0)
    - [1.3.37_Josephus.js](1.3.37_Josephus.js) 
   
## 1.4 `Analysis of Algorithms`

### `threeSum`
- 使用暴力法求解`threeSum`
    - code: [ThreeSum.js](ThreeSum.js)

### `twoSum`
- 使用暴力法求解, 时间复杂度 `O(n ^ 2)`
- 先排序，再使用二分查找，时间复杂度 `O(nlogn)`
- 使用`hash`来进行保存，时间复杂度 `O(n)`
- 可以看到使用先排序再进行二分查找的效率更高，在数量大的时候表现的更加明显
- code: [TwoSum.js](TwoSum.js)

### `Exercises`
- 1.4.10 修改二分查找算法，使之总是返回和被查找的键匹配的索引最小的元素（且仍然能够保证对数级别运行时间）
    - 思路
        - 当大于与小于传入值的时候，按照正常的二分查找进行比较
        - 当等于传入值的时候，判断当前索引是否为第一个，是，则直接返回，否则判断当前索引的前一个与传入值是否相等，相等，则为最小索引，否则，将上界向下移动
    - code: [.4.10_MinIndexOfBinSearch.js](1.4.10_MinIndexOfBinSearch.js)
- 1.4.12 编写一个程序，有序打印给定的两个有序数组中的所有公共元素，最坏情况下所需运行时间应该与N成正比
    - 暴力法：在第一个数组中拿去元素，然后遍历第二个数组，判断是否是公共元素
    - 指针法：给每个数组创建两个指针，同时指向第一个元素，判断两个值是否相等，相等，同时向后移动，不相等，则值小的向后移动
    - code：[1.4.12_CommonItemOfTwoArray.js](1.4.12_CommonItemOfTwoArray.js)
- 1.4.16 最接近的一对(一维)：编写一个程序，给定含有N个double值的数组`a[]`,在其中找到一对最接近的值：两者之差（绝对值）最小的两个数。程序在最坏情况下所需的运行时间应该是**线性对数级别**的
    - 暴力法：拿到每一项的值，分别与其他项计算差值，将结果保存，比较大小，时间复杂度`O(n ^ 2)`
    - 分治法：题目提示了时间复杂度为`O(nlogn)`，那么就可以使用分治法进行求解，使用分治法将数组进行排序，然后
- 1.4.18 `Local minimum in an array`
    - 题目描述：`Write a program that, given an array a[] of n distinct integers, finds a local minimum: an index i such that botha[i] < a[i-1] and a[i] < a[i+1] (assuming the neighboring entry is in bounds). Your program should use ~ 2 lg n compares in the worst case.` 

## `union-find`算法
动态连通性问题：问题的输入是一列整数对，其中每个整数都表示一个某种类型的对象，一对整数`p`, `q`可以被理解为`p`和`q`是相连的。假设"相连"是一种等价关系，那么也就意味着它具有：
    - 自反性：`p`和`q`是相连的
    - 对称性：如果`p`和`q`是相连的，那么`q`和`p`也是相连的
    - 传递性：如果`p`和`q`是相连的且`q`和`r`是相连的，那么`p`和`r`也是相连的 
### `Union-Find API`
下面是实现这个函数所需要的`API`
```
UnionFind
void union(p, q) // 联合
int find(p) // 查找，拿到当前值
boolean connected(p, q) // 判断是否相连
int count() //  连通数量
```
>  思路: 如果`id[p]`与`id[q]`相等，则`p`与`q`相连, 换句话说，一个连通集中的所有点一定是相同的值(为每一个连通集设置一个id, 其id值为最后一个加入的值，同一个连通集的值相同)
```js
class UnionFind {
  constructor(size) {
    this.count = size
    this.ids = [] 
    for (let i = 0; i < size; i++) {
      this.ids[i] = i 
    }
  }
  // 找到p的连通分量的值
  find(p) {
    return this.ids[p] 
  }
  union(p, q) {
    let pId = this.find(p)
    let qId = this.find(q)
    if(pId === qId) return
    for (let i = 0, len = this.ids.length; i < len; i++) {
      if(this.ids[i] === pId) {
        this.ids[i] = qId 
      }
    }
  }
  connected(p, q) {
    return this.find(p) === this.find(q) 
  }
}
```
上面的代码在进行`union`的时候，时间复杂度是`O(N)`, 如果一共有`n`个数需要进行连通，那么总的时间复杂度就变成了`O(n ^ 2)`, 消耗的时间比较长，下面是分别使用`tinyUF`, `mediumUF`以及`largeUF`来进行计算的所花费的大致时间
```js
// tinyUF:0.621ms
// mediumUF:1.128ms
// largeUF:226.196ms
```
#### 优化
上面的算法时间复杂度比较高，那么怎么进行优化呢？可以使用树来进行操作，树的时间复杂度一般为`logN`
> 思路：连通集中每一个点上的值为父节点, 依次沿着父节点向上查找根节点（序号跟值相同），根节点相同，则在一个连通集中，联合操作时只需要将根节点联合即可

在进行优化之后，速度有的有提升，有的提升并不明显，这是怎么回事呢？这种算法的时间复杂度会退回到`O(N ^ 2)`, 所以需要添加权重，让小树添加到大树上

参考代码：[QuickFind.js](QuickFind.js)

## 参考
   - [课后答案](https://www.zhihu.com/question/27876056)
   - [书籍网页版](https://algs4.cs.princeton.edu/14analysis/)
   - [Course课程](https://www.coursera.org/learn/algorithms-part1/supplement/icGHT/welcome-to-algorithms-part-i)
    