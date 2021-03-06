# 剑指`offer`

最近找工作的过程中碰到了许多问题，复盘之后发现除了技术方面不够好之外，其他方面准备的也不够充分。于是乎，买了这本书来看，希望可以在其中学习到想要的东西，拿到满意的`offer`。加油呀

注意点： 
- 想好再开始写
- **先写测试用例，注意边界条件以及错误输入**

### 数据结构

#### 数组
- 面试题3：数组中的重复的数字
    - 题目描述：在一个长度为n的数字里的所有数字都在 0 ~ n - 1的范围内。数组中的某些数字时重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。例如输入长度为7的数组`[2, 3, 1, 0, 2, 5, 3]`，那么对应的重复数字是2或者3
    - 思路：
        1. 使用排序的方式，判断当前值的前后是否是重复的，时间复杂度`O(nlogn)`，空间复杂度`O(1)`
        2. 使用哈希表，遍历数组的时候判断当前值是否在哈希表中存在，存在直接返回，否则将其保存在哈希表中，时间复杂度`O(n)`，空间复杂度`O(n)`
        3. 由于数据范围是存在在`0`到`n - 1`的范围内，那么可以拿到索引为`0`的值，判断当前数组中该索引是否等于`0`，不等于，则拿到当前的值，去值的索引处取值，进行交换，直到数字等于`0`，依次向下进行比较，时间复杂度`O(n)`，空间复杂度`O(1)`
    - code: [DuplicationInArray.js](DuplicationInArray.js)
- 题目二：不修改数组找出重复的数字
    - 题目描述：在一个长度为n的数字里的所有数字都在 0 ~ n - 1的范围内。数组中的某些数字时重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。例如输入长度为7的数组`[2, 3, 1, 0, 2, 5, 3]`，那么对应的重复数字是2或者3
    - 思路：
        1. 不修改原数组，那么可以创建一个大小空间为`n`的新数组，在新数组中进行操作，时间复杂度`O(n)`, 空间复杂度`O(n)`
        2. 使用二分法：可以将 0 ~ n - 1中的数字从中间的数字m分为两部分，前面一半是 0 ~ m, 后面一半是 m + 1 ~ n - 1，如果 0 ~ m 的数字的数目超过 m + 1, 那么这一半的区间一定有重复的，否则，另一半区间 m + 1 ~ n - 1中一定包含重复项，依次类推 

#### 链表

#### 树
- 面试题7： 重建二叉树
    - 题目描述：输入某个二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含有重复数字
    - 思路：
        - 前序遍历（根左右），中序遍历（左根右）
        - 前序遍历的第一个为根节点，由于不含有重复数字，可以将该根节点在中序遍历中进行查找，计算其左子节点个数
        - 使用递归进行深层次的建构以及查找
    - code: [ConstructBinaryTree.js](ConstructBinaryTree.js)
- 面试题8：二叉树的下一个节点
    - 题目描述：给定一棵二叉树和其中的一个节点，如何找出中序遍历序列的下一个节点？树中的节点除了有两个分别指向左、右子节点的指针，还有一个指向父节点的指针
    - 思路:
        - 中序遍历序列为左根右
        - 如果该节点有右子节点（将其作为根节点），那么中序遍历序列的下一个节点为**右子树中的最左边的节点**
        - 如果该节点没有右节点
            - 如果该节点是父节点的左子节点，那么下一个节点为**父节点**
            - 如果该节点是父节点的右子节点，那么需要沿着父节点的指针一直向上遍历，知道找到一个是它父节点的左子节点的节点
    - code: [NextNodeInBinaryTrees.js](NextNodeInBinaryTrees.js)
- 面试题11：旋转数组的最小数字
    - 题目描述：把一个数组最开始的若干个元素搬到数组的末尾，称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素
    - 思路：
        - 使用顺序遍历，时间复杂度O(n)
        - 旋转之后的数组实际上被划分为两个排序的子数组，而且前面子数组的元素都大于或者等于后面子数组的元素
        - 最小的元素刚好是这两个子数组的分界线
        - 在排序数组中可以使用**二分法**实现O(logn)时间复杂度的查找
        - 和二分查找一样，用两个指针分别指向数组的第一个元素和最后一个元素。按照题目的旋转规则，第一个元素应该是大于等于最后一个元素的
        - 接着我们找到数组中间的元素，如果该中间元素位于前面的递增子数组，那么它应该大于或等于第一个指针指向的元素。此时最小的元素应该位于该中间元素的后面
        - 依次类推，当左右两个索引的差值为1时，表示第一个指针已经指向第一个递增子数组的末尾，而第二个指针指向第二个子数组的开头
    - code: [MinNumberInRotatedArray.js](MinNumberInRotatedArray.js)    
    
## 高质量的代码

- 代码的完整性：通常面试官会检查应聘者的代码是否完成了**基本功能**、**输入边界值**是否能够得到正确的输出、是否对各种**不规范**的非法输入做出了合理的错误处理
    - 功能测试
    - 边界测试
    - 负面测试

- 面试题18: 删除链表的节点
    - 题目描述：给定单向链表的头指针和一个节点指针，定义一个函数在O(1)时间内删除该节点
    - 思路：
        - 由于给定的时间复杂度要求为O(1)，所以不能进行顺序遍历（时间复杂度O(n)）
        - 思考进行顺序遍历的原因是想要找到被删除节点的前一个节点，那么就可以直接将前一个节点的`next`指针指向被删除节点的下一个节点即可
        - 那我们可以将下一个节点的内容复制到需要删除的节点上覆盖原有的内容，再把下一个节点删除
        - 比如我们要删除节点i, 先把i的下一个节点j的内容复制到i上，然后把i的指针指向节点j的下一个节点
        - 对于 n - 1 个非尾节点而言，可以在O(1)时间内把下一个节点复制覆盖要删除的节点，并删除下一个节点；对于尾节点而言，仍然需要进行顺序查找，总的平均时间复杂度是`[(n - 1) * O(1) + o(n)] / n`, 结果还是为O(1)
    - code: [DeleteNodeInList.js](DeleteNodeInList.js)