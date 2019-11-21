// 冒泡排序
// 时间复杂度 O(n^2)
let arr = [4, 5, 6, 3, 1, 2]
function onceBubbleSort(arr) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    if (arr[i] > arr[i + 1]) {
      let tmp = arr[i]
      arr[i] = arr[i + 1]
      arr[i + 1] = tmp
    }
  }
  return arr
}
// 一次冒泡 ，将数字6冒泡到最上层 [ 4, 5, 3, 1, 2, 6 ]
let arr1 = onceBubbleSort(arr)
console.log('onceBubbleSort(arr) arr1', arr1) // onceBubbleSort(arr) arr1 [ 4, 5, 3, 1, 2, 6 ]
let arr2 = onceBubbleSort(arr1)
console.log('onceBubbleSort(arr) arr2', arr2) // onceBubbleSort(arr) arr2 [ 4, 3, 1, 2, 5, 6 ]
let arr3 = onceBubbleSort(arr2)
console.log('onceBubbleSort(arr) arr3', arr3) // onceBubbleSort(arr) arr3 [ 3, 1, 2, 4, 5, 6 ]
let arr4 = onceBubbleSort(arr3)
console.log('onceBubbleSort(arr) arr4', arr4) // onceBubbleSort(arr) arr4 [ 1, 2, 3, 4, 5, 6 ]
let arr5 = onceBubbleSort(arr4)
console.log('onceBubbleSort(arr) arr5', arr5) // onceBubbleSort(arr) arr5 [ 1, 2, 3, 4, 5, 6 ]
let arr6 = onceBubbleSort(arr5)
console.log('onceBubbleSort(arr) arr6', arr6) // onceBubbleSort(arr) arr6 [ 1, 2, 3, 4, 5, 6 ]

// 一次冒泡一个数字，冒泡所有的数字需要冒泡 arr.length 次
function bubbleSort(arr) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let tmp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = tmp
      }
    }
  }
  return arr
}
console.log('bubbleSort', bubbleSort(arr)) // bubbleSort [ 1, 2, 3, 4, 5, 6 ]

// 插入排序：将数组分为已排序区间以及未排序区间， 依次将未排序区间中的值按照顺序插入到已排序区间中
// 时间复杂度 O(n^2)
function insertSort (arr = [4, 6, 5, 3, 1, 2]) {
  let len = arr.length
  // 初始化已排序区间为 arr[0]
  for (let i = 1; i < len; i++) {
    // 需要插入到已排序区间中的值
    let value = arr[i]
    let j = i - 1
    // 遍历已排序区间，比较值的大小
    for (; j >= 0; j--) {
      // 需要插入值则向后移动
      if (value < arr[j]) {
        arr[j + 1] = arr[j]
      } else {
        break
      }
    }
    arr[j + 1] =  value
    // insertSorting [4,6,5,3,1,2]
    // insertSorting [4,5,6,3,1,2]
    // insertSorting [3,4,5,6,1,2]
    // insertSorting [1,3,4,5,6,2]
    // insertSorting [1,2,3,4,5,6]
    console.log('insertSorting', JSON.stringify(arr))
  }
  return arr
}
console.log('insertSort', insertSort()) // insertSort [ 1, 2, 3, 4, 5, 6 ]

// 选择排序：将数组分为已排序区间以及未排序区间，每次从未排序区间中选取最小的放入已排序区间的最后
// 时间复杂度 O(n^2)
function selectSort(arr = [4, 5, 6, 2, 1, 3]) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    let minVal = arr[i]
    let j = i + 1
    let minIndex = i
    for (; j < len; j++) {
      if (arr[j] < minVal) {
        minVal = arr[j]
        minIndex = j
      }
    }
    arr[minIndex] = arr[i]
    arr[i] = minVal
    // selectSort [1,5,6,2,4,3]
    // selectSort [1,2,6,5,4,3]
    // selectSort [1,2,3,5,4,6]
    // selectSort [1,2,3,4,5,6]
    // selectSort [1,2,3,4,5,6]
    // selectSort [1,2,3,4,5,6]
    console.log('selectSort', JSON.stringify(arr))
  }
}
selectSort()

// 归并排序：利用分治思想，把数组逐渐分解为最小单位然后进行排序合并，最后依次合并为一个大数组
function mergeSort(array = [4, 5, 6, 2, 3, 1]) {
  if (array.length === 1) {
    return array
  }
  let middle = Math.floor(array.length / 2)
  let left = array.slice(0, middle)
  let right = array.slice(middle)
  // let splitLeft = mergeSort(left)
  // let splitRight = mergeSort(right)
  return merge(mergeSort(left), mergeSort(right))
}
function merge(left, right) {
  let result = []
  while (left && left.length > 0 && right && right.length > 0) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  // 将数组中剩余部分拼接到result后
  return result.concat(left).concat(right)
}
mergeSort()

// 快速排序：在数组中随便取一个基准值，将小于的值放在左边，将大于的值放在右边，依次递归完成排序
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  let pivotIndex = Math.floor(arr.length / 2)
  let pivot = arr.splice(pivotIndex, 1)[0]
  let left = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  // left: 2,6,5,0,1, right: , pivot: 9
  // left: 2,0,1, right: 6, pivot: 5
  // left: , right: 2,1, pivot: 0
  // left: , right: 2, pivot: 1
  console.log(`left: ${left}, right: ${right}, pivot: ${pivot}`)
  return quickSort(left).concat([pivot], quickSort(right))
}
console.log(quickSort([2, 6, 5, 9, 0, 1]))
