// function Promise(excutor) {
//   let _this = this
//   _this.status = "pending"
//   _this.value = ""
//   _this.reason = ""
//   _this.onReslovedCallbacks = []
//   _this.onRejectedCallbacks = []
//   function resolve (value) {
//     if (_this.status === "pending") {
//       _this.status = "resolved"
//       _this.value = value
//       _this.onReslovedCallbacks.forEach(fn => {
//         fn()
//       })
//     }
//   }
//   function reject (reason) {
//     if (_this.status === "pending") {
//       _this.status = "rejected"
//       _this.reason = reason
//       _this.onRejectedCallbacks.forEach(fn => {
//         fn()
//       })
//     }
//   }
//   try {
//     excutor(resolve, reject)
//   } catch (error) {
//     // 有异常以及错误时都走 catch
//     reject(error)
//   }
// }
// 简易 then 方法
// Promise.prototype.then = function (onFulfilled, onRejected) {
//   let _this = this
//   if (_this.status === "resolved") {
//     onFulfilled(_this.value)
//   }
//   if (_this.status === "rejected") {
//     onRejected(_this.reason)
//   }
//   if (_this.status === "pending") {
//     _this.onRejectedCallbacks.push(function () {
//       onRejected(_this.reason)
//     })
//     _this.onReslovedCallbacks.push(function () {
//       onFulfilled(_this.value)
//     })
//   }
// }

// 使用 then 方法实现链式调用
// 每次返回新的 Promise 实例

// Promise.prototype.then = function (onFulfilled, onRejected) {
//   var promise2
//   var _this = this
//   if (_this.status === "resolved") {
//     promise2 = new Promise(function (resolve, reject) {
//       try {
//         let x = onFulfilled(_this.value)
//         resolve(x)
//       } catch (error) {
//         reject(error)
//       }
//     })
//   }
//   if (_this.status === "rejected") {
//     promise2 = new Promise(function (resolve, reject) {
//       try {
//         let x = onRejected(_this.reason)
//         resolve(x)
//       } catch (error) {
//         reject(error)
//       }
//     })
//   }
//   if (_this.status === "pending") {
//     promise2 = new Promise(function (resolve, reject) {
//       _this.onReslovedCallbacks.push(function () {
//         try {
//           let x = onFulfilled(_this.value)
//           resolve(x)
//         } catch (error) {
//           reject(error)
//         }
//       })
//       _this.onRejectedCallbacks.push(function () {
//         try {
//           let x = onRejected(_this.reason)
//           resolve(x)
//         } catch (error) {
//           reject(error)
//         }
//       })
//     })
//   }
//   return promise2
// }

// 兼容多种情况的 then 方法
// Promise.prototype.then = function (onFulfilled, onRejected) {
//   // 判断传入参数是否为函数
//   onFulfilled = typeof onFulfilled === "function" ? onFulfilled : function (value) {
//     return value
//   }
//   onRejected = typeof onRejected === "function" ? onRejected : function (error) {
//     throw error
//   }
//   let _this = this
//   let promise2
//   if (_this.status === "resolved") {
//     promise2 = new Promise(function (resolve, reject) {
//       setTimeout(function () {
//         try {
//           let x = onFulfilled(_this.value)
//           resolvePromise(promise2, x , resolve, reject)
//         } catch (error) {
//           reject(error)
//         }
//       })
//     })
//   }
//
//   if (_this.status === "rejected") {
//     promise2 = new Promise(function (resolve, reject) {
//      setTimeout(function () {
//         try {
//           let x = onRejected(_this.reason)
//           resolvePromise(promise2, x, resolve, reject)
//         } catch (error) {
//           reject(error)
//         }
//      })
//     })
//   }
//
//   if (_this.status === "pending") {
//     promise2 = new Promise(function (resolve, reject) {
//       _this.onReslovedCallbacks.push(function () {
//         setTimeout(function () {
//           try {
//             let x = onFulfilled(_this.value)
//             resolvePromise(promise2, x, resolve, reject)
//           } catch (error) {
//             reject(error)
//           }
//         })
//       })
//       _this.onRejectedCallbacks.push(function () {
//         setTimeout(function () {
//           try {
//             let x = onRejected(_this.value)
//             resolvePromise(promise2, x, resolve, reject)
//           } catch (error) {
//             reject(error)
//           }
//         })
//       })
//     })
//   }
// }
//
// function resolvePromise(promise2, x, resolve, reject) {
//   // 解决前一次 then 返回本身
//   // var p1 = p.then(function () {
//   //  return p1
//   // })
//   if (promise2 === x) {
//     return reject(new TypeError('循环引用'))
//   }
//
//   // 判断调用是否成功，解决同时调用 resolve 与 reject
//   let called
//   // 判断上次调用返回值类型
//   if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
//     try {
//       // 根据是否有 then 方法来判断是否是 promise实例对象
//       let then = x.then
//       if (typeof then === 'function') {
//         then.call(x, function (y) {
//           if (called) return
//           called = true
//           resolvePromise(promise2, y, resolve, reject)
//         }, function (err) {
//           if (called) return
//           called = true
//           reject(err)
//         })
//       } else {
//         // 不是 promise 对象，直接将值返回
//         resolve(x)
//       }
//     } catch (error) {
//       if (called) return
//       called = true
//       reject(e)
//     }
//   } else {
//     resolve(x)
//   }
// }
//
// // 其他方法
// Promise.prototype.catch = function(callback) {
//   return this.then(null, callback)
// }
//
// Promise.all = function (promises) {
//   return new Promise(function (resolve, reject) {
//     let arr = []
//     let i = 0
//     function processData (index, y) {
//       arr[index] = y
//       // 执行完毕后将执行结果返回
//       if (++i === promises.length) {
//         resolve(arr)
//       }
//     }
//     for (let i = 0; i < promises.length; i++) {
//       promises[i].then(function (data) {
//         processData[i, data]
//       }, reject)
//     }
//   })
// }
//
// Promise.race = function (promises) {
//   return new Promise(function (resolve, reject) {
//     for (let i = 0; i < promises.length; i++) {
//       promises[i].then(resolve, reject)
//     }
//   })
// }
//
// Promise.reslove = function (value) {
//   return new Promise(function (reslove, reject) {
//     reslove(value)
//   })
// }
//
// Promise.reject = function (reason) {
//   return new Promise(function (resolve, reject) {
//     reject(reason)
//   })
// }

var a, b = 1
console.log(a + b) // 要判断 a 与 b 是否都存在再执行某些运算

// getA 与 getB 是异步或者同步代码
// getA 与 getB 在成功或者失败后会执行传入的函数 fn
// fn 内部判断值是否存在，存在则执行最后的回调 cb
function add (getA, getB, cb) {
  var a, b;
  getA(function (aVal) {
    a = aVal;
    if (b != undefined) {
      cb(a + b);
    }
  })
  getB(function (bVal) {
    b = bVal;
    if (a != undefined) {
      cb(a + b);
    }
  })
}
function fetchA(fn) {
  setTimeout(function () {
    fn(2)
  }, 1000)
}
function fetchB(fn) {
  setTimeout(function () {
    fn(5)
  }, 2000)
}
add(fetchA, fetchB, function (value) {
  console.log('a + b', value)
})
// 使用 Promise 重写上面的 add 函数
function add1(aPromise, bPromise) {
  var promise = Promise.all([aPromise, bPromise])
    .then(function (values) {
      return values[0] + values[1]
    }, function (fail) { // 错误一般先被内部捕获，内部捕获的错误，如果不继续向上冒泡，则不会被上层捕获
      console.log('neibu failed', fail)
      return new Error('neibu failed')
    })
  return promise
}
var add1Promise = add1(new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(3)
  }, 1000)
}), new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(10)
  }, 2000)
}))
// Promise （一旦决议）一直保持其决议结果（完成或拒绝）不变，可以按照需要多次查看
add1Promise.then(function (value) {
  console.log('add1: a + b', value)
}, function (fail) {
  console.log('add1: a + b failed', fail)
})
add1Promise.then(function (value) {
  console.log('add1 copy: a + b', value)
})

// Promise 解决回调的信任问题
// 1. 调用回调过早 -> 即使立即完成的Promise，提供给 then 的回调也总会被异步调用
// 2. 调用回调过晚（或不被调用） -> Promise 为微任务，会在下一个异步时机上被依次调用, 不被调用，只要内部决议，就会被调用，没有决议，则使用竞态
// 3. 调用回调次数过少或过多 -> Promise中的状态只能被改变一次
// 4. 未能传递所需要的环境参数 -> 可以使用 resolve, reject 进行传值
// 5. 吞掉可能出现的错误或异常

// 2. 调用过晚
// 打印结果为 a b c setTimeout
// promise 为微任务，会在一次事件循环之后将任务队列中的所有任务取出来调用，再执行 setTimeout
// js同步脚本为一次宏任务，执行之后执行任务队列中的微任务，打印 a b c
// 再次执行宏任务，打印 setTimeout
var p = new Promise(function (resolve, reject) {
  resolve('ppppp')
})
setTimeout(function () {
  console.log('setTimeout')
}, 0)
p.then(function () {
  p.then(function () {
    console.log('c')
  })
  console.log('a')
})
p.then(function () {
  console.log('b')
})

// TODO: 结果为 B A, 书上说 A B ?
var p3 = new Promise(function (resolve, reject) {
  resolve('B')
})
var p1 = new Promise(function (resolve) {
  resolve(p3)
})
var p2 = new Promise(function (resolve) {
  resolve('A')
})
p1.then(function (value) {
  console.log(value)
})
p2.then(function (value) {
  console.log(value)
})
// 2. 不被调用：使用竞态
function timeoutPromise(delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject('Timeout')
    }, delay)
  })
}

var pro = new Promise(function () {
  console.log('执行 promise')
})
Promise.race([pro, timeoutPromise(3000)])
  .then(() => {
  })
  .catch((e) => {
    console.log('catch error', e)
  })

