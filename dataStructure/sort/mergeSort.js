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
  if (hi <= lo) {
    return
  }
  let mid = Math.floor(lo + (hi - lo) / 2)
  mergeSort(arr, lo, mid)
  mergeSort(arr, mid + 1, hi)
  merge(arr, lo, mid, hi)
}
// 排序随机数
// random: 327.208ms
// 对于随机数，排序的时间提高了许多
console.time('random')
mergeSort(randomData, 0, randomData.length - 1)
console.timeEnd('random')

// 排序顺序数
// sorted: 298.133ms
console.time('sorted')
mergeSort(data, 0, data.length - 1)
console.timeEnd('sorted')
module.exports = mergeSort
