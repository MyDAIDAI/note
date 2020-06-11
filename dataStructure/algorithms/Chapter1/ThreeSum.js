// 三数之和：求一堆数组中的三个数和为某个数的个数
const fs = require('fs')

function count(arr) {
  if(!arr || arr.length === 0) return
  let len = arr.length
  let count = 0
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      for (let k = j + 1; k < len; k++) {
        if(Number(arr[i]) + Number(arr[j]) + Number(arr[k]) === 0) {
          count++
          // console.log(arr[i], arr[j], arr[k])
        }
      }
    }
  }
  return count
}
function readFileData(filename) {
  const dataArr = fs.readFileSync(`./${filename}.txt`, 'utf-8')
  return dataArr
}

/**
 * 使用暴力法求解threeSum问题
 * 分别对 '1Kints', '2Kints'的进行计算
 * 1Kints: 20184.752ms
 * 2Kints: 153847.449ms
 */
function main() {
  // let txtName = ['1Kints', '2Kints', '4Kints', '8Kints', '16Kints', '32Kints', '1Mints']
  let txtName = ['1Kints', '2Kints']
  for (let i = 0, len = txtName.length; i < len; i++) {
    let itemName = txtName[i]
    let data = readFileData(itemName)
    console.time(`${itemName}`)
    count(data.split('\n'))
    console.timeEnd(`${itemName}`)
  }
}
main()