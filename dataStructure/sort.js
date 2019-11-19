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
