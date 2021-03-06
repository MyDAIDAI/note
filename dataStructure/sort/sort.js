const SortUtil = require('./utils')
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
// 与选择排序不同的是，插入排序所需要的时间取决于输入中元素的初始顺序
// 例如，对一个很大且其中的元素已经有序的数组进行排序将会比对随机顺序的数组要快的多
// 平均情况 ~N^2/4 次比较以及 ~N^2/4 次交换
// 最坏情况 ~N^2/2 次比较以及 ~N^2/2 次交换
// 最好情况 ~N - 1 次比较以及 0 次交换
// 当数组已经有序时，使用插入排序比选择排序更有效
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
  }
  return arr
}
console.log('insertSort', insertSort()) // insertSort [ 1, 2, 3, 4, 5, 6 ]

// 选择排序：将数组分为已排序区间以及未排序区间，每次从未排序区间中选取最小的放入已排序区间的最后
// 首先，找到数组中的最小的那个元素，其次，将它和数组的第一个元素交换位置。
// 再次，在剩下的元素中找到最小的元素，将它与数组的第二个元素交换位置
// 如此往复，直到将整个数组排序
// 对于长度为N的数组，选择排序需要大约 N^2/2次比较和N次交换
// (N - 1) + (N - 2) + (N - 3) + ....+ 2 + 1 = N(N-1)/2 ~ N^2/2
// 运行时间与输入无关：有序数列与无序数列所用时间一样长
// 数据移动是最少的：每次交换改变两个数组元素的值，直接进行交换，不会进行数据的移动
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
  return quickSort(left).concat([pivot], quickSort(right))
}
console.log(quickSort([2, 6, 5, 9, 0, 1]))

// 原地排序的快速排序
const swap = (arr, i, j) => {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}
function partition (arr, pivot, left, right) {
  const pivotVal = arr[pivot]
  let startIndex = left
  for (let i = left; i < right; i++) {
    if (arr[i] < pivotVal) {
      swap(arr, i, startIndex)
      startIndex++
    }
  }
  swap(arr, startIndex, pivot)
  return startIndex
}
const quickSort1 = (arr, left, right) => {
  if (left < right) {
    let pivot = right
    let partitionIndex = partition(arr, pivot, left. right)
    quickSort1(arr, left, partitionIndex - 1 < left ? left : right)
    quickSort1(arr, partitionIndex + 1 > right ? right : left, right)
  }
}

function bucketQuickSort(arr) {
  if (arr && arr.length <= 1) {
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
  return bucketQuickSort(left).concat([pivot], bucketQuickSort(right))
}

// 桶排序
// 适用在外部排序找那个
// 外部排序就是数据存储在外部磁盘且数据量大，但内存有限，无法将整个数据全部加载到内存中进行排序
// 对0 ~ 40 之间的数据 进行排序
// data: 3, 1, 6, 0, 8, 30, 39, 20, 25, 18, 17, 32, 18, 14
function bucketSort(arr) {
  let bucketArr = []
  // 分桶
  for (let i = 0; i < arr.length; i++) {
    let value = Math.floor(arr[i] / 8)
    if (!bucketArr[value]) {
      bucketArr[value] = [arr[i]]
    } else {
      bucketArr[value].push(arr[i])
    }
  }
  // 对每个桶进行排序
  for (let j = 0; j < bucketArr.length; j++) {
    let sortedItem = bucketQuickSort(bucketArr[j])
    bucketArr[j] = sortedItem
  }
  // 逐个拿出桶内的数据
  let retData = []
  bucketArr.forEach(ele => {
    retData.push(...ele)
  })
  return retData
}
// bucketSort [ [ 3, 1, 6, 0 ],
//   [ 8, 15, 14 ],
//   [ 20, 18, 17 ],
//   [ 30, 25 ],
//   [ 39, 32 ] ]

//bucketSort [ [ 0, 1, 3, 6 ],
//   [ 8, 14, 15 ],
//   [ 17, 18, 20 ],
//   [ 25, 30 ],
//   [ 32, 39 ] ]
console.log('bucketSort', bucketSort([3, 1, 6, 0, 8, 30, 39, 20, 25, 18, 17, 32, 15, 14]))

// 计数排序
function countSort(arr) {
  const countArr = []
  const sumCountArr = []
  const resultArr = []
  // 遍历数组，对存在的数据进行计数
  for (let i = 0; i < arr.length; i++) {
    if (!countArr[arr[i]]) {
      countArr[arr[i]] = 1
    } else {
      countArr[arr[i]]++
    }
  }
  let currentVal = countArr[0]
  sumCountArr[0] = currentVal
  for (let j = 1; j < countArr.length; j++) {
    let val = countArr[j] == undefined ? 0 : countArr[j]
    currentVal += val
    sumCountArr[j] = currentVal
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    let count = sumCountArr[arr[i]] - 1
    resultArr[count] = arr[i]
    sumCountArr[arr[i]]--
  }
  console.log('count sort', countArr, sumCountArr, resultArr)
}
countSort([3, 1, 6, 0, 8, 30, 39, 20, 25, 18, 17, 32, 15, 14])

function generateRandom(min, max) {
  let arr = []
  for (let i = 0; i < max; i++) {
    arr.push(Math.round(Math.random() * (max - min)) + min)
  }
  return arr
}
// 十万数据量排序时间比较
// bubble: 58989.055ms
// insert: 3052.756ms
// select: 6594.701ms
// merge: 165.832ms
// quick: 55.696ms
//
// let randomArr = generateRandom(0, 100000)
// console.time('bubble')
// bubbleSort(JSON.parse(JSON.stringify(randomArr)))
// console.timeEnd('bubble')
//
// console.time('insert')
// insertSort(JSON.parse(JSON.stringify(randomArr)))
// console.timeEnd('insert')
//
// console.time('select')
// selectSort(JSON.parse(JSON.stringify(randomArr)))
// console.timeEnd('select')
//
// console.time('merge')
// mergeSort(JSON.parse(JSON.stringify(randomArr)))
// console.timeEnd('merge')
//
// console.time('quick')
// quickSort(JSON.parse(JSON.stringify(randomArr)))
// console.timeEnd('quick')
//
// console.time('bucket')
// bucketSort(JSON.parse(JSON.stringify(randomArr)))
// console.timeEnd('bucket')
//
// console.time('count')
// countSort(JSON.parse(JSON.stringify(randomArr)))
// console.timeEnd('count')
