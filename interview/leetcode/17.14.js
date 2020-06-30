/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var smallestK = function(arr, k) {
  let res = []
  let dataIndexs = []
  for(let index = 0; index < k; index++) {
    dataIndexs.push(index)
  }
  quickSort(arr, 0, arr.length - 1, dataIndexs, res)
  return res
};
function quickSort(arr, l, r, dataIndexs, res) {
  if(l < r && dataIndexs.length > 0) {
    let p = partition(arr, l, r)
    for(let index = p[0]; index <= p[1]; index++) {
      let findIndex = dataIndexs.findIndex(e => e === index)
      if(findIndex > -1) {
        res.push(arr[index])
        dataIndexs.splice(findIndex, 1)
      }
    }

    quickSort(arr, l, p[0] - 1, dataIndexs, res)
    quickSort(arr, p[1] + 1, r, dataIndexs, res)
  }
}

function partition(arr, l, r) {
  let less = l - 1
  let more = r
  let data = arr[l]
  let index = l
  while(index < more) {
    if(arr[index] < data) {
      swap(arr, ++less, index++)
    } else if(arr[index] > data) {
      swap(arr, --more, index)
    } else {
      index++
    }
  }
  swap(arr, more, r)
  return [less + 1, more]
}

function swap(arr, i, j) {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}
let arr = [1,3,5,7,2,4,6,8]
console.log(smallestK(arr, 4))
