// 希尔排序
// 希尔排序是对插入排序的一种优化，由于插入排序对于部分有序数组是非常高效的，希尔在原来的插入排序的算法上进行了优化，使得可以应用到大规模的乱序数组中

const SortUtil = require('./utils')
// const cliProgress = require('cli-progress')
const data = require('./data.json')
const randomData = require('./randomData.json')

function shellSort(arr) {
  let len = arr.length
  let h = 1
  while(h < len / 3) {
    h = 3 * h + 1
  }
  while(h >= 1) {
    for(let i = h; i < len; i++) {
      for(let j = i; j >= h && SortUtil.less(arr[j], arr[j - h]); j -= h) {
        SortUtil.exchange(arr, j, j - h)
      }
    } 
    h = Math.floor(h / 3)
  }
}

// 排序随机数
// random: 37.187ms
// 对于随机数，排序的时间提高了许多
console.time('random')
shellSort(randomData)
console.timeEnd('random')

// 排序顺序数
// sorted: 6.233ms
console.time('sorted')
shellSort(data)
console.timeEnd('sorted')
module.exports = shellSort
// shellSort([8, 9, 1, 7, 2, 3, 5, 4, 6, 0])