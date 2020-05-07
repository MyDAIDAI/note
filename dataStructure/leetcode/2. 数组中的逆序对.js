// 数组中的逆序对

function mergeSort(arr, lo, hi, data) {
  if(lo >= hi) return
  let mid = Math.floor((lo + hi) / 2)
  mergeSort(arr, lo, mid, data)
  mergeSort(arr, mid + 1, hi, data)
  merge(arr, lo, mid, hi, data)
}
function merge(arr, lo, mid, hi, data) {
  let help = []
  let p1 = lo
  let p2 = mid + 1
  let i = 0
  while (p1 <= mid && p2 <= hi) {

    data.push([arr[p1], arr[p2]])

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
}
function reverseSortData(arr) {
  let res = []
  mergeSort(arr, 0, arr.length - 1, res)
  return res
}

function comparator(arr) {
  let data = []
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if(arr[j] > arr[i]) {
        data.push([arr[j], arr[i]])
      }
    }
  }
  return data
}

let arr = [7,5,6,4]
console.log('res', reverseSortData(JSON.parse(JSON.stringify(arr))))
console.log('comp', comparator(JSON.parse(JSON.stringify(arr))))

