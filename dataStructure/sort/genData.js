const fs = require('fs')
const SortUtil = require('./utils')
const selectSort = require('./selectSort')
const readLine = require('readline')
require('../../logger')()
let rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
})
let min = 0
let max = 0
let range = 0
rl.question('请您输入数据的最小值，最大值，与数据范围，用 , 分隔\n', function(prompt) {
let data = prompt.split(',')
  min = Number(data[0])
  max = Number(data[1])
  range = Number(data[2])
  rl.close()

  console.logFgCyan(`正在生成${min} ~ ${max} 的 ${range} 位随机数`)
  const randomArr = SortUtil.generateRandom(min, max, range)
  console.logFgCyan('随机数生产完成，正在排序，请稍等...')
  fs.writeFile('./randomData.json', JSON.stringify(randomArr), function(err){
    if(err) console.logFgRed('随机数写入失败')
    else console.logFgGreen('随机数写入完成')
  })
  selectSort(randomArr)
  console.logFgCyan('已排序完成，将写入文件中，请稍等..')
  let buffer = JSON.stringify(randomArr)
  fs.writeFile('./data.json', buffer, function(err){
    if(err) console.logFgRed('顺序数写入失败')
    else console.logFgGreen('顺序数写入成功')
  })
})

 