/**
 * @param {number[]} array1
 * @param {number[]} array2
 * @return {number[]}
 */
var findSwapValues = function(array1, array2) {
  if(!array1 || array1.length === 0) return []
  if(!array2 || array2.length === 0) return []
  let map1 = {}
  let map2 = {}
  let sum1 = 0
  let sum2 = 0
  for(let index1 = 0, len1 = array1.length; index1 < len1; index1++) {
    let item = array1[index1]
    sum1 += item
    map1[item] = map1[item] ? ++map1[item] : 1
  }
  for(let index2 = 0, len2 = array2.length; index2 < len2; index2++) {
    let item = array2[index2]
    sum2 += item
    map2[item] = map2[item] ? ++map2[item] : 1
  }
  let averge = (sum1 + sum2) / 2
  if(averge % 1 != 0) return []
  let delta1 = averge - sum1
  let delta2 = averge - sum2
  let res = []
  for(let index = 0; index < array1.length; index++) {
    let val = array1[index] + delta1
    if(map2[val]) {
      res = [array1[index], val]
      return res
    }
  }
  return res
};
