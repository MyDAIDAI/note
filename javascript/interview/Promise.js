function Promise(excutor) {
  let _this = this
  _this.status = "pending"
  _this.value = ""
  _this.reason = ""
  _this.onReslovedCallbacks = []
  _this.onRejectedCallbacks = []
  function resolve (value) {
    if (_this.status === "pending") {
      _this.status = "resolved"
      _this.value = value
      _this.onReslovedCallbacks.forEach(fn => {
        fn()
      })
    }
  }
  function reject (reason) {
    if (_this.status === "pending") {
      _this.status = "rejected"
      _this.reason = reason
      _this.onRejectedCallbacks.forEach(fn => {
        fn()
      })
    }
  }
  try {
    excutor(resolve, reject)
  } catch (error) {
    // 有异常以及错误时都走 catch 
    reject(error)
  }
}
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
Promise.prototype.then = function (onFulfilled, onRejected) {
  // 判断传入参数是否为函数
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : function (value) {
    return value
  }
  onRejected = typeof onRejected === "function" ? onRejected : function (error) {
    throw error
  }
  let _this = this
  let promise2
  if (_this.status === "resolved") {
    promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          let x = onFulfilled(_this.value)
          resolvePromise(promise2, x , resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  if (_this.status === "rejected") {
    promise2 = new Promise(function (resolve, reject) {
     setTimeout(function () {
        try {
          let x = onRejected(_this.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
     })
    })
  }

  if (_this.status === "pending") {
    promise2 = new Promise(function (resolve, reject) {
      _this.onReslovedCallbacks.push(function () {
        setTimeout(function () {
          try {
            let x = onFulfilled(_this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      })
      _this.onRejectedCallbacks.push(function () {
        setTimeout(function () {
          try {
            let x = onRejected(_this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      })
    })
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 解决前一次 then 返回本身
  // var p1 = p.then(function () {
  //  return p1 
  // })
  if (promise2 === x) {
    return reject(new TypeError('循环引用'))
  }

  // 判断调用是否成功，解决同时调用 resolve 与 reject
  let called
  // 判断上次调用返回值类型
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // 根据是否有 then 方法来判断是否是 promise实例对象
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, function (y) {
          if (called) return
          called = true
          resolvePromise(promise2, y, resolve, reject) 
        }, function (err) {
          if (called) return
          called = true
          reject(err)
        })
      } else {
        // 不是 promise 对象，直接将值返回
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(e) 
    }
  } else {
    resolve(x)
  }
}

// 其他方法
Promise.prototype.catch = function(callback) {
  return this.then(null, callback)
}

Promise.all = function (promises) {
  return new Promise(function (resolve, reject) {
    let arr = []
    let i = 0
    function processData (index, y) {
      arr[index] = y
      // 执行完毕后将执行结果返回
      if (++i === promises.length) {
        resolve(arr)
      }
    }
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(function (data) {
        processData[i, data]
      }, reject)
    }
  })
}

Promise.race = function (promises) {
  return new Promise(function (resolve, reject) {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject)
    }
  })
}

Promise.reslove = function (value) {
  return new Promise(function (reslove, reject) {
    reslove(value)
  })
}

Promise.reject = function (reason) {
  return new Promise(function (resolve, reject) {
    reject(reason)
  })
}