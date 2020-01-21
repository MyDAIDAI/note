const SortUtil = require('./utils')
const data = require('./data.json')
const randomData = require('./randomData.json')

// 快速排序
// 快速排序是一种分治的排序算法，它将一个数组分成两个子数组，将两部分独立地排序
// 快速排序和归并排序是互补的：
// 归并排序是将数组分成两个子数组分别有序，并将有序的子数组归并以将整个数组排序，递归调用发生在处理整个数组之前
// 快速排序则是当两个子数组都有序的时候，整个数组也就有序了，递归调用发生在处理整个数据之后
// 算法改进
// 1. 对于小数组，快速排序比插入排序慢
// 2. 使用子数组的一小部分元素的中位数来切分数组，即三取样切分
// 3. important: 熵最优的排序，一个元素全部重复的子数组就不需要排序了，但算法仍会继续将它切分为更小的数组，一个简单的想法是将数组切分为三部分，分别对应小于、等于和大于切分元素的数组元素

/**
 * 快速排序
 * @param {array} arr 需要排序的数组
 * @param {number} lo 索引的最小值
 * @param {number} hi 索引的最大值
 */
function quickSort(arr, lo, hi) {
  if (hi <= lo) {
    return
  }
  let prat = pratition(arr, lo, hi)
  quickSort(arr, lo, prat - 1)
  quickSort(arr, prat + 1, hi)
}
/**
 * 切分函数
 */
function pratition(arr, lo, hi) {
  // 将数组切分为 a[lo...i-1], a[i], a[i+1, hi]
  let i = lo, j = hi + 1
  let value = arr[lo]
  while (true) {
    while (SortUtil.less(arr[++i], value)) { // 左边部分比 value 小，直到 i === hi 退出
      if (i === hi) break
    }
    while (SortUtil.less(value, arr[--j])) { // 右边部分比 value 大，直到 j === lo 退出
      if(j === lo) break
    }
    if (i >= j) {
      break // 两个指针相遇退出
    }
    SortUtil.exchange(arr, i, j) // 碰到大于的 value 的数或者小于 value 的数，就将其调换位置
  }
  SortUtil.exchange(arr, lo, j) // 将 arr[lo] 的值放入正确的位置
  return j
}

/**
 * 三向切分的快速排序
 * 对于包含大量重复元素的数组，它将排序时间从线性对数级降低到了线性级别
 * @param {array} arr 待排序数组
 * @param {number} lo 数组索引的最小值
 * @param {number} hi 数组索引的最大值
 * 对于一个数组，一次扫描要有三个指针。
 * lt 为低指针，gt为高指针，i为当前遍历元素（待比较元素）。
 * 首先我们选取一个枢轴v。扫描是如何进行的呢，
 * 我们利用这三个指针和lo，hi 标示数组范围的指针把数组arr分成以下几个部分。
 * 其中，arr[lo]~arr[lt-1] 为小于v的元素。
 * arr[lt]~arr[gt]为等于v的元素。
 * arr[gt+1]~arr[hi]为大于v的元素。
 * 特别的，在遍历中。arr[i]~arr[gt]为还没决定的元素。
 * 这样一次分区以后，我们就可以有效减少重复元素的消耗了，
 * 因为重复的枢轴都集中到了arr[lt]~arr[gt]这个区间里，我们递归可以不用在对这一部分进行分区了。
 * arr[i]~arr[gt]为还为决定的元素，在这一时刻，我们只用保证我们挪到后面的元素比枢轴大就行了，
 * 所以能够确定的是gt要减一，因为我们确实挪动了一个大于枢轴的元素到了后面，
 * 但是i不能动，因为还没确定新换来的这个元素跟枢轴的大小关系。
 * 至于arr[i] 跟 arr[gt]的大小关系，我们不关心也不在意，因为我们是再用枢轴v分区，而不是再用arr[i]分区
 */
function quickSort3Way(arr, lo, hi) {
  if (hi <= lo) {
    return
  }
  let lt = lo, i = lo + 1, gt = hi;
  let value = arr[lo]
  debugger
  while (i <= gt) {
    let cmp = arr[i] - value
    if (cmp < 0) {
      SortUtil.exchange(arr, lt++, i++) // arr[i] 小于 value, 则将 arr[i]放到数组最前面，lt 向后移动， 需要进行比较的索引 i 也需要向后移动
    } else if(cmp > 0) {
      SortUtil.exchange(arr, i, gt--)  // arr[i] 大于 value， 则将 arr[i]放到数组最后, gt 向前移动，不确定交换后的值是否大于 value, 所以 i不加
    } else {
      i++  // 两个值相等，则将指针向后移动(i 保存当前基准值的位置)
    }
  }
  // 可以不再需要对 lt ~ gt 区间中的重复值进行递归快排
  quickSort3Way(arr, lo, lt - 1)
  quickSort3Way(arr, gt + 1, hi)
}

// 排序随机数
// random: 17.224ms
// 对于随机数，排序的时间提高了许多
// console.time('random')
// quickSort(randomData, 0, randomData.length - 1)
// console.timeEnd('random')

// 排序顺序数 爆栈？
// 在顺序数中，切分每次都取第一个值作为基准值，就会存在切分不平衡的情况
// 在切分不平衡时，效率会非常低，可能会导致爆栈
// sorted: 298.133ms
// console.time('sorted')
// quickSort(data, 0, data.length - 1)
// console.timeEnd('sorted')

// 三向切分的快速排序
// quickSort3Way: 20.657ms
// console.time('quickSort3Way')
// quickSort3Way(randomData, 0, randomData.length - 1)
// console.timeEnd('quickSort3Way')

let arrData = [3, 4, 5, 3, 2, 1, 10, 1, 8, 8, 9, 3, 2, 1]
console.time('quickSort3Way')
quickSort3Way(arrData, 0, arrData.length - 1)
console.timeEnd('quickSort3Way')
console.log('sorted arr', arrData)