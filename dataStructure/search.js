// 查找

// 二分查找：对有序的数据集合，每次都通过跟区间的中间元素对比，将待查找的区间缩小为之前的一半，直到找到要查找的元素
// 时间复杂度: O(log^n)
// 局限性
// 1. 二分查找依赖的是顺序表结构，也就是数组
// 2. 二分查找的是有序数组
// 3. 数据量太大（二分查找依赖数组，数组要求内存空间连续）
let arr = [8, 11, 19, 23, 27, 33, 45, 55, 67, 98]
// 循环
function bSearch(arr, value) {
  let low = 0
  let high = arr.length - 1
  while (low <= high) {
    let mid = Math.floor((low + high) / 2)
    if (arr[mid] === value) {
      return mid
    } else if (arr[mid] > value){
      high = mid - 1
      mid = Math.floor((low + high) / 2)
    } else {
      low = mid + 1
      mid = Math.floor((low + high / 2))
    }
  }
}
// 递归二分查找
function bSearchRecursion(arr, low, high, value) {
  if (low > high) {
    return -1
  }
  let mid = Math.floor((low + high) / 2)
  if (arr[mid] === value) {
    return mid
  } else if (arr[mid] > value) {
    return bSearchRecursion(arr, low, mid - 1, value)
  } else {
    return bSearchRecursion(arr, mid + 1, high, value)
  }
}
console.log('bsearch', bSearch(arr, 98))
console.log('bSearchRecursion', bSearchRecursion(arr, 0, arr.length - 1, 98))

// 二分查找变形问题
// 1. 查找第一个值等于给定值的元素
// 2. 查找最后一个值等于给定值的元素
// 3. 查找第一个大于等于给定值的元素
// 4. 查找最后一个小于等于给定值的元素

// 查找第一个值等于给定值的元素
function findFirstBSearch(arr, value) {
  let low = 0
  let high = arr.length - 1
  while (low <= high) {
    let mid = parseInt((low + high) / 2)
    if (arr[mid] > value) {
      high = mid - 1
    } else if (arr[mid] < value) {
      low = mid + 1
    } else {
      if (mid === 0 || arr[mid - 1] !== value) {
        return mid
      } else {
        high = mid - 1
      }
    }
  }
}
console.log('查找第一个值等于给定值的元素', findFirstBSearch([1, 2, 3, 4, 4, 5, 5, 9], 5))

// 查找最后一个值等于给定值的元素
function findLastBSearch(arr, value) {
  let low = 0
  let high = arr.length - 1
  while (low <= high) {
    let mid = parseInt((low + high) / 2)
    if (arr[mid] > value) {
      high = mid - 1
    } else if (arr[mid] < value) {
      low = mid + 1
    } else {
      if (mid === (arr.length - 1) || arr[mid + 1] !== value) {
        return mid
      } else {
        low = mid + 1
      }
    }
  }
}
console.log('查找最后一个值等于给定值的元素', findLastBSearch([1, 2, 3, 4, 4, 5, 5, 9], 5))

// 查找第一个大于等于给定值的元素
function findFirstGreaterThanBSearch(arr, value) {
  let low = 0
  let high = arr.length - 1
  while (low <= high) {
    let mid = parseInt((low + high) / 2)
    if (arr[mid] >= value) {
      if (mid === 0 || arr[mid - 1] < value) {
        return mid
      } else {
        high = mid - 1
      }
    } else {
      low = mid + 1
    }
  }
}
console.log('查找第一个大于等于给定值的元素', findFirstGreaterThanBSearch([1, 5, 5, 7, 9], 8))

// 查找最后一个小于等于给定值的元素
function findLastLessThanBSearch(arr, value) {
  let low = 0
  let high = arr.length
  while (low <= high) {
    let mid = parseInt((low + high) / 2)
    if (arr[mid] > value) {
      high = mid - 1
    } else {
      if (mid === arr.length - 1 || arr[mid + 1] > value) {
        return mid
      } else {
        low = mid + 1
      }
    }
  }
}
console.log('查找最后一个小于等于给定值的元素', findLastLessThanBSearch([1, 5, 5, 7, 9], 6))
