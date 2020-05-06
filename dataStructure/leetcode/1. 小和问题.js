let arr = [1, 3, 4, 2, 5]
function mergeSort(arr, lo, hi) {
  if (hi === lo) {
    return 0
  }
  let mid = Math.floor((lo + hi) / 2)
  let left = mergeSort(arr, lo, mid)
  let right = mergeSort(arr, mid + 1, hi)
  return  left + right + merge(arr, lo, mid, hi)
}
function smallSum(arr) {
  if(arr == null || arr.length < 2) return 0
  return mergeSort(arr, 0, arr.length - 1)
}
function merge(arr, lo, mid, hi) {
  let help = []
  let i = 0
  let p1 = lo
  let p2 = mid + 1
  let sum = 0
  while (p1 <= mid && p2 <= hi) {
    sum += arr[p1] < arr[p2] ? arr[p1] * ((hi - p2) + 1) : 0
    help[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++]
  }
  while (p1 <= mid) {
    help[i++] = arr[p1++]
  }
  while (p2 <= hi) {
    help[i++] = arr[p2++]
  }
  for (let j = 0; j < help.length; j++) {
    arr[lo + j] = help[j]
  }
  // console.log('help', help, sum)
  return sum
}

// 对数器 for test
function comparator(arr) {
  if (arr == null || arr.length < 2) {
    return 0
  }
  let res = 0
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++ ) {
      res += arr[j] < arr[i] ? arr[j] : 0
    }
  }
  return res
}

function generateRandomArray(maxSize, maxValue) {
  let arr = []
  let range = Math.floor((maxSize + 1) * Math.random())
  for (let i = 0; i < range; i++) {
    arr[i] = Math.floor((maxValue + 1) * Math.random() - maxValue * Math.random())
  }
  return arr
}

function copyArray(arr) {
  if (arr == null) return null
  let res = []
  for (let i = 0; i < arr.length; i++) {
    res[i] = arr[i]
  }
  return res
}

function isEqual(arr1, arr2) {
  if((arr1 == null && arr2 != null) || (arr1 != null && arr2 == null)) {
    return false
  }
  if (arr1 == null || arr2 == null) return true
  if (arr1.length !== arr2.length) return false
  for (let i = 0; i < arr1.length; i++) {
    if(arr1[i] !== arr2[2]) {
      return false
    }
    return true
  }
}
function printArray(arr) {
  if(arr == null) return
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i] + ' ')
  }
  console.log('\n')
}
function main() {
  let testTime = 500000
  let maxSize = 100
  let maxValue = 100
  let success = true
  for (let i = 0; i < testTime; i++) {
    let arr1 = generateRandomArray(maxSize, maxValue)
    let arr2 = copyArray(arr1)
    if(smallSum(arr1) !== comparator(arr2)) {
      success = false
      printArray(arr1)
      printArray(arr2)
      break
    }
  }
  console.log(success ? 'good' : 'bad')
}
main()