const SortUtil = require('./utils')
const data = require('./data.json')
const randomData = require('./randomData.json')
// 插入排序
// 将右侧无序数组中的值依次放到左侧有序数组中，左侧数据需要进行相应的移动
// 与选择排序不同的是，插入排序所需的时间取决于输入中元素的初始顺序
// 对一个很大且其中的元素已经有序（或接近有序）的数组进行排序将会比对随机顺序的数组或是逆序数组进行排序要快的多
function insertSort(arr) {
  for(let i  = 1; i < arr.length; i++) {
    // 由于左侧有序数组以及有序，那么用后一个数字与前一个数字进行比较，小于，则互换位置，并向前继续比较
    // 如果比前一个大，那么已经有序，则停止
    for(let j = i; j > 0 && SortUtil.less(arr[j], arr[j - 1]); j--) {
      SortUtil.exchange(arr, j, j - 1)
      // console.log(`arr: ${arr}, j: ${j}`)
    }
  }
}
// 排序随机数
// random: 6774.329ms
console.time('random')
insertSort(randomData)
console.timeEnd('random')

// 排序顺序数
// sorted: 1.427ms
console.time('sorted')
insertSort(data)
console.timeEnd('sorted')
module.exports = insertSort