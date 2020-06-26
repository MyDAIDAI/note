# 简单排序

## 插入排序
思路：从数组中取最小的值与第一个位置进行交换，然后在剩下的数据项中取最小的值，与第二个位置进行交换，依次类推

复杂度：
   - 时间复杂度：O(n ^ 2)
   - 空间复杂度：O(1)

code: [Selection.js](Selection.js)

## 优先队列

### 初级实现
- 数组实现（无序）
    - 插入的时候直接在数组最后插入，时间复杂度`O(1)`
    - `deleteMax`的时候，遍历数组，拿到最大元素索引，将该索引与数组最后位置交换, 时间复杂度`O(n)`
    - code: [UnorderedArrayMaxPQ.js](UnorderedArrayMaxPQ.js)
- 数组实现（有序）
    - 插入的时候，按照插入排序算法，从后往前遍历元素进行比较，大于则向后移动，留出位置，将插入元素放入， 时间复杂度`O(n)`
    - `deleteMax`, 直接拿去数组最后的元素
    - code: [OrderedArrayMaxPQ.js](OrderedArrayMaxPQ.js)
- 链表表示

上面的初级实现，在最坏的情况下需要线性时间来完成。下面讨论下基于数据结构堆的实现来保证这两种操作更快的执行

### 堆的定义
定义
    - 当一棵二叉树的每个节点都大于等于它的两个子节点时，它被称为堆有序
    - 在堆有序的二叉树中，每个结点都小于等于它的父节点，根节点是堆有序的二叉树中的最大结点
#### 二叉堆表示法
- 用指针表示，每个结点需要三个指针来找到上下节点（父节点与两个子节点）
- 用数组表示，将完全二叉树的节点按照层级顺序放入数组中，根节点在位置1，它的子节点在位置2和3，而子节点的子节点则分别在位置4，5，6，7，依次类推
    - 在一个堆中，位置`k`的结点的父结点的位置为`[k/2]`, 两个子节点的位置为`2k`和`2k+1`
    - 大顶堆
        - 定义：根节点为最大的结点，左右两个节点都小于父节点
        - 插入：向大顶堆中插入元素
            - 在树的最后插入元素
            - 将树最后的元素依次上浮
            ```js
              function insert(val) {
                if(val == undefined) return
                qp[count++] = val
                swim(count)
              }
              // 从位置k开始上浮
              // 父节点位置为 k >> 1
              function swim(k) {
                while(k > 1 && pq[k] > pq[k >> 1]) {
                  exchange(k, k >> 1)
                  k = k >> 1
                }   
              }
            ```
        - 删除最大值：
            - 最大值即为数组的第一个元素
            - 将数组最后的元素放到第一个元素位置上
            - 将第一个位置的元素依次下沉
            ```js
              function deleteMax() {
                let max = pq[1]
                exchange(1, count--)
                pq[count + 1] = undefined
                sink(1)
              }
              // 从k的位置开始下沉
              function sink(k) {
                while (k * 2 <= count) {
                  let child = k * 2
                  if(child < count && pq[child] < pq[child + 1]) {
                    child++
                  }
                  if(pq[k] > pq[child]) {
                    break
                  }
                  exchange(k, child)
                  k = child
                }
              }
            ```
         - code: [MaxPriorQueue.js](MaxPriorQueue.js)
    - 小顶堆：
        - 定义：节点小于两个子节点，所以根节点为最小值
        - code: [MinPriorQueue.js](MinPriorQueue.js)

### 堆排序
- 思路：
    - 1. 先将原数组使用**下沉**的方式构造**大顶堆**
    - 2. 依次将**第一个位置**与**最后一个位置--**进行交换，然后将**第一个位置**进行**下沉**，维持大顶堆
    - 3. 直到交换到最后一个位置索引为1时停止
- code: [HeapSort.js](HeapSort.js)