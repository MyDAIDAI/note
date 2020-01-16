const SortUtil = require('./utils')
const cliProgress = require('cli-progress')
const data = require('./data.json')
const randomData = require('./randomData.json')
// 选择排序
// 首先，找到数组中最小的元素，将它和数组的第一个元素交换位置。
// 然后，在剩下的元素中找到最小的值，将它与数组的第二个元素交换位置，如此往复，直到将整个数组排序
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
function selectSort(arr) {
  bar1.start(arr.length, 0);
  for(let i = 0; i < arr.length; i++) {
    let index = i
    // 遍历剩下的元素，找到最小值
    for(let j = i; j < arr.length; j++) {
      if (SortUtil.less(arr[j], arr[index])) {
        index = j
      }
    }
    SortUtil.exchange(arr, i, index)
    bar1.update(i)
  }
  bar1.stop();
}
// 排序随机数
// random: 9252.736ms
console.time('random')
selectSort(randomData)
console.timeEnd('random')

// 排序顺序数
// sorted: 7335.557ms
console.time('sorted')
selectSort(data)
console.timeEnd('sorted')
module.exports = selectSort
