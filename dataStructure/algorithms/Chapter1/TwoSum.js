// 两数之和: 求一堆数组两个数的和为某个数的个数
const fs = require('fs')
// 暴力法 O(n ^ 2)
function count1(arr) {
  if(!arr || arr.length === 0) return
  let len = arr.length
  let count = 0
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if(Number(arr[i]) + Number(arr[j]) === 0) {
        count++
      }
    }
  }
  return count
}
// O(nlogn)
function count2(arr) {
  if(!arr || arr.length === 0) return
  let len = arr.length
  let count = 0
  arr.sort((a, b) => {
    return a - b
  })
  debugger
  for (let i = 0; i < len; i++) {
    let j = binarySearch(arr, -Number(arr[i]))
    if(j > i) {
      count++
    }
  }
  return count
}
function binarySearch(arr, val) {
  let l = 0
  let r = arr.length - 1
  while (l <= r) {
    let mid = l + ((r - l) >> 1)
    if(Number(arr[mid]) < val) {
      l = mid + 1
    } else if(Number(arr[mid]) > val) {
      r = mid - 1
    } else {
      return mid
    }
  }
  return -1
}
function readFileData(filename) {
  if(!filename) return
  const data = fs.readFileSync(`./${filename}.txt`, 'utf8')
  return data
}
/**
 * 使用暴力法求解twoSum问题
 * 分别对 '1Kints', '2Kints', '4Kints', '8Kints', '16Kints', '32Kints'的进行计算
 * 1Kints: 10.338ms
 * 2Kints: 19.309ms
 * 4Kints: 74.109ms
 * 8Kints: 273.724ms
 * 16Kints: 999.372ms
 * 32Kints: 3893.443ms
 *
 * 使用排序以及二分查找
 * 1Kints: 3.577ms
 * 2Kints: 9.292ms
 * 4Kints: 13.229ms
 * 8Kints: 22.194ms
 * 16Kints: 41.235ms
 * 32Kints: 77.672ms
 */
function main() {
  let txtName = ['1Kints', '2Kints', '4Kints', '8Kints', '16Kints', '32Kints']
  // let txtName = ['1Kints', '2Kints']
  for (let i = 0, len = txtName.length; i < len; i++) {
    let itemName = txtName[i]
    let data = readFileData(itemName)
    console.time(`${itemName}`)
    // console.log(count1(data.split('\n')))
    count2(data.split('\n'))
    console.timeEnd(`${itemName}`)
  }
}
main()