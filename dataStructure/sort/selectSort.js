const SortUtil = require('./utils')
// 选择排序
// 首先，找到数组中最小的元素，将它和数组的第一个元素交换位置。
// 然后，在剩下的元素中找到最小的值，将它与数组的第二个元素交换位置，如此往复，直到将整个数组排序

function selectSort(arr) {
  for(let i = 0; i < arr.length; i++) {
    let index = i
    // 遍历剩下的元素，找到最小值
    for(let j = i; j < arr.length; j++) {
      if (SortUtil.less(arr[j], arr[index])) {
        index = j
      }
    }
    SortUtil.exchange(arr, i, index)
  }
}
// selectSort: 109.899ms
let arr = SortUtil.generateRandom(0, 10000)
console.time('selectSort')
selectSort(arr)
console.timeEnd('selectSort')
console.log('arr', arr)
module.exports = selectSort
