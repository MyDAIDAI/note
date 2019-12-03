// 75. 颜色分类
// 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
//
// 此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
//
// 注意:
// 不能使用代码库中的排序函数来解决这道题。
//
// 示例
// 输入: [2,0,2,1,1,0]
// 输出: [0,0,1,1,2,2]


/**
 * 冒泡排序
 * 执行用时：68 ms
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var bubbleSortColors = function(nums) {
  let len = nums.length
  for (let i = 0; i < len; i++) {
    let flag = false
    for (let j = 0; j < len - i; j++) {
      if (nums[j] > nums[j + 1]) {
        let tmp = nums[j]
        nums[j] = nums[j + 1]
        nums[j + 1] = tmp
        flag = true
      }
    }
    if (!flag) {
      break
    }
  }
  console.log('bubbleSortColors', nums)
};
let arr = [2,0,2,1,1,0]
bubbleSortColors(arr)
console.log('bubbleSortColors', arr)

/**
 * 插入排序
 * 执行用时：80ms
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var insertSortColors = function(nums) {
  let len = nums.length
  for (let i = 1; i < len; i++) {
    let index = 0
    let value = nums[i]
    for (let j = i - 1; j >= 0; j--) {
      if (nums[j] > value) {
        nums[j + 1] = nums[j]
      } else {
        index = j + 1
        break
      }
    }
    nums[index] = value
  }
  console.log('insertSortColors', nums)
}
let arr1 = [2,0,2,1,1,0]
insertSortColors(arr1)
console.log('insertSortColors', arr1)
/**
 * 选择排序
 * 执行用时：80ms
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var selectSortColors = function (nums) {
  let len = nums.length
  for (let i = 0; i < len; i++) {
    let minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (nums[j] < nums[minIndex]) {
        minIndex = j
      }
    }
    let tmp =  nums[i]
    nums[i] = nums[minIndex]
    nums[minIndex] = tmp
  }
  console.log('selectSortColors', nums)
}
let arr2 = [2,0,2,1,1,0]
selectSortColors(arr2)
console.log('selectSortColors', arr2)

function generateRandom(min, max) {
  let arr = []
  for (let i = 0; i < max; i++) {
    arr.push(Math.round(Math.random() * (max - min)) + min)
  }
  return arr
}
let randomArr = generateRandom(0, 100000)
console.log('randomArr', randomArr)
console.time('bubble')
bubbleSortColors(JSON.parse(JSON.stringify(randomArr)))
console.timeEnd('bubble')
console.time('insert')
insertSortColors(JSON.parse(JSON.stringify(randomArr)))
console.timeEnd('insert')
console.time('select')
selectSortColors(JSON.parse(JSON.stringify(randomArr)))
console.timeEnd('select')
