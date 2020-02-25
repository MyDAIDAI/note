const randomData = require('../../dataStructure/sort/randomData.json')
// 循环
// 1. 减少迭代处理的事务

// 普通循环
// commonCircle: 2.679ms
// console.time('commonCircle')
// for(let i = 0; i < randomData.length; i++) {
//   // console.log(i, randomData[i])
// }
// console.timeEnd('commonCircle')

// 优化对对象的查找
// optimizeCircle1: 1.371ms
// console.time('optimizeCircle1')
// for(let i = 0, len = randomData.length; i < len; i++) {
//   // console.log(i, randomData[i])
// }
// console.timeEnd('optimizeCircle1')
// 优化对对象变量的引用查找操作后会减少一半的时间

// 颠倒执行顺序
// optimizeCircle2: 1.179ms
// console.time('optimizeCircle2')
// for (let i = randomData.length; i--;) {}
// console.timeEnd('optimizeCircle2')

function controlIfElse() {
  for(let i = 0, len = randomData.length; i < len; i++) {
    let item = randomData[i]
    let number = parseInt(item % 10)
    if (number === 0) {
      return 0
    } else if(number === 1) {
      return 1
    } else if(number === 2) {
      return 2
    } else if(number === 3) {
      return 3
    } else if(number === 4) {
      return 4
    } else if(number === 5) {
      return 5
    } else if(number === 6) {
      return 6
    } else if(number === 7) {
      return 7
    } else if(number === 8) {
      return 8
    } else if(number === 9) {
      return 9
    } else {
      return 'other'
    }
  }
}
// controlIfElse: 0.145ms
console.time('controlIfElse')
controlIfElse()
console.timeEnd('controlIfElse')

function optimizeIfElse() {
  for(let i = 0, len = randomData.length; i < len; i++) {
    let item = randomData[i]
    let number = parseInt(item % 10)
    if (number < 6) {
      if (number < 3) {
        if (number === 0) {
          return 0
        } else if(number === 1) {
          return 1
        } else {
          return 2
        }
      } else {
        if (number === 3) {
          return 3
        } else if(number === 4) {
          return 4
        } else {
          return 5
        }
      }
    } else {
      if (number < 8) {
        if (number === 6) {
          return 6
        } else {
          return 7
        }
      } else {
        if (number === 8) {
          return 8
        } else if (number === 9) {
          return 9
        } else {
          return 'other'
        }
      }
    }
  }
}
// optimizeIfElse: 0.054ms
console.time('optimizeIfElse')
optimizeIfElse()
console.timeEnd('optimizeIfElse')

function controlSwitch() {
  for(let i = 0, len = randomData.length; i < len; i++) {
    let item = randomData[i]
    let number = parseInt(item % 10)
    switch(number) {
      case 0:
        return 0;
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      case 4:
        return 4;
      case 5:
        return 5;
      case 6:
        return 6;
      case 7:
        return 7;
      case 8:
        return 8;
      case 9:
        return 9;
      default:
        return 'other'
    }
  }
}
// controlSwitch: 0.046ms
console.time('controlSwitch')
controlSwitch()
console.timeEnd('controlSwitch')

function controlMap() {
  let map = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'other']
  for(let i = 0, len = randomData.length; i < len; i++) {
    let item = randomData[i]
    let number = parseInt(item % 10)
    return map[number]
  }
}
// controlMap: 0.039ms
console.time('controlMap')
controlMap()
console.timeEnd('controlMap')