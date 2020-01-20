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
// 3. TODO: 熵最优的排序，一个元素全部重复的子数组就不需要排序了，但算法仍会继续将它切分为更小的数组，一个简单的想法是将数组切分为三部分，分别对应小于、等于和大于切分元素的数组元素

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

// 排序随机数
// random: 17.224ms
// 对于随机数，排序的时间提高了许多
console.time('random')
quickSort(randomData, 0, randomData.length - 1)
console.timeEnd('random')

// 排序顺序数 爆栈？
// 在顺序树中，切分每次都取第一个值作为基准值，就会存在切分不平衡的情况
// 在切分不平衡时，效率会非常低，并且会导致爆栈
// sorted: 298.133ms
// console.time('sorted')
// quickSort(data, 0, data.length - 1)
// console.timeEnd('sorted')