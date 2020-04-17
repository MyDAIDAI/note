const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class Promise {
  constructor (executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    let resolve = (val) => {
      if (this.status === PENDING) {
        this.status = RESOLVED
        this.value = val
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : e => {throw e}
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVED) {
        try {
          let x = onFulfilled(this.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      }
      if (this.status === REJECTED) {
        try {
          let x = onRejected(this.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      }
      if (this.status === PENDING) {
        this.onRejectedCallbacks.push(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
        this.onResolvedCallbacks.push(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
    })
    
    return promise2
  }
  catch(onRejected) {
    this.then(null, onRejected)
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  // 1. 判断 x 是否等于 promise2 如果等于则报错
  if (promise2 === x) {
    throw new TypeError('[TypeError: Chaining cycle detected for promise #<Promise>]')
  }
  let called;
  // 2. 判断返回值 x 是否是 Promise
  // 判断条件， x 是不为 null 的对象，且 x.then 是一个函数
  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, (y) => {
          // 处理 y 中仍然有 Promise 的情况
          if (called) return
          called = true 
          resolvePromise(promise2, y, resolve, reject)
        }, (r) => {
          if (called) return
          called = true 
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true 
      reject(error)
    }
  } else {
    // 3. 返回值 x 是一个普通值
    resolve(x)
  }
}
function isPromise(x) {
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    if (typeof x.then === 'function') {
      return true
    }
  } 
  return false
}
Promise.all = function (promises) {
  let result = []
  let idx = 0;
  function progress(val, index, resolve) {
    result[index] = val
    if (++idx === promises.length) {
      resolve(result)
    }
  }
  return new Promise((resolve, reject) => {
    for(let index = 0; index < promises.length; index++) {
      let currentValue = promises[index]
      if (isPromise(currentValue)) {
        currentValue.then(val => {
          progress(val, index, resolve)
        }, reject)
      } else {
        progress(currentValue, index, resolve)
      }
    }
  })
}
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for(let index = 0; index < promises.length; index++) {
      let currentValue = promises[index]
      if (isPromise(currentValue)) {
        currentValue.then(resolve, reject)
      } else {
        resolve(currentValue)
      }
    }
  })
}
Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise(function (resolve, reject) {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = Promise