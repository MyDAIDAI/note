module.exports = {
  swap(arr, i, j) {
    if(i === j) return
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  },
  isSorted(arr) {
    if(!Array.isArray(arr)) return
    for (let i = 1; i < arr.length; i++) {
      if(arr[i] < arr[i - 1]) {
        console.log('no sorted', arr, i, i - 1, arr[i], arr[i - 1])
        return false
      }
    }
    return true
  }
}