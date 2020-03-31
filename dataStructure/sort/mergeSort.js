const SortUtil = require('./utils')
const data = require('./data.json')
const randomData = require('./randomData.json')
// 归并排序
/**
 * 合并两个已排序数组
 * @param {array} arr 需要进行排序的数组
 * @param {number} lo 归并的最小索引
 * @param {number} mid 归并的中间索引
 * @param {number} hi 归并的最大索引
 */
function merge(arr, lo, mid, hi) {
  console.log('merge arr', lo, mid, hi)
  let i = lo, j = mid + 1
  let aux = []
  for(let k = lo; k <= hi; k++) {
    aux[k] = arr[k] // 将arr中的数据复制到 aux 中
  }
  // i, j 分别为两个已排序数组的游标，依次向右移动，比较两个数的大小
  for(let k = lo; k <= hi; k++) {
    if (i > mid) { // 左边游标的大于mid，则表示左边数据已经排列完毕，直接将右侧数据复制
      arr[k] = aux[j++]
    } else if(j > hi){ // 右边数据大于hi, 则表示右侧数据已经排序完毕，直接将左侧数据复制
      arr[k] = aux[i++]
    } else if(SortUtil.less(aux[j], aux[i])) { // 比较左右两个已排序数组的大小，将较小的值复制到 arr 中
      arr[k] = aux[j++]
    } else {
      arr[k] =  aux[i++]
    }
  }
}

/**
 * 自顶向下的归并排序
 * 时间复杂度 NlgN
 * 空间复杂度 N
 * @param {array} arr 排序数组
 * @param {number} lo 索引最小值
 * @param {number} hi 索引最大值
 */
function mergeSort(arr, lo, hi) {
  console.log('mergeSort', lo, hi)
  if (hi <= lo) {
    return
  }
  let mid = Math.floor(lo + (hi - lo) / 2)
  mergeSort(arr, lo, mid) // 将该部分执行完
  mergeSort(arr, mid + 1, hi)
  merge(arr, lo, mid, hi)
}
console.log('mergeSort', mergeSort([3, 4, 5, 2, 1, 0, 8], 0, 7))
/**
 * 自底向上的归并排序
 * 时间复杂度 NlgN
 * 空间复杂度 N
 * @param {array} arr 排序数组
 * 自底向上的归并排序比较适合链表组织的数据
 */
function mergeSortBU(arr) {
  let len = arr.length
  let aux = []
  for(let sz = 1; sz < len; sz = sz * 2) { // sz子数组的大小，依次加倍
    for(let lo = 0; lo < len - sz; lo += sz * 2) { // 子数组索引
      merge(arr, lo, lo + sz - 1, Math.min(lo + sz + sz + 1, len - 1))
    }
  }
} 
// 自顶向下的归并排序排序随机数
// random: 327.208ms
// 对于随机数，排序的时间提高了许多
// console.time('random')
// mergeSort(randomData, 0, randomData.length - 1)
// console.timeEnd('random')

// // 自顶向下的归并排序排序顺序数
// // sorted: 298.133ms
// console.time('sorted')
// mergeSort(data, 0, data.length - 1)
// console.timeEnd('sorted')

// // 自底向上的归并排序随机数
// // random: 314.682ms
// console.time('random')
// mergeSortBU(randomData, 0, randomData.length - 1)
// console.timeEnd('random')

// // 自底向上的归并排序顺序数
// // sorted: 314.735ms
// console.time('sorted')
// mergeSortBU(data, 0, data.length - 1)
// console.timeEnd('sorted')
// module.exports = mergeSort
