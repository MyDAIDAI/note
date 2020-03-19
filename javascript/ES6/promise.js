// let promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject('reject')
//   }, 1000)
// })
// promise.then((res) => {
// }, (error) => {
// //   // 传入 onRejected 会先执行 onRejected 函数，再执行 catch
//   console.log('error', error) // error reject
// }).catch(error => {
//   // 在 then 中没有传入 onrejected 函数的时候才会执行 catch 函数
//   console.log('catch', error) // catch reject
// })

// function timeout(ms) {
//   return new Promise((resolve, reject) => {
//     console.log('promise 立即执行') // promise 立即执行
//     setTimeout(resolve, ms, 'done')
//   })
// }
// timeout(1000).then(res => {
//   console.log('onfulfilled', res) // onfulfilled done
// })

// let getJSON = function (url) {
//   const promise = new Promise((resolve, reject) => {
//     const handler = function () {
//       if (this.readyState !== 4) {
//         return
//       }
//       if (this.status === 200) {
//         resolve(this.response)
//       } else {
//         reject(new Error(this.statusText))
//       }
//     }
//     let client = new XMLHttpRequest()
//     client.open('GET', url)
//     client.onreadystatechange = handler
//     client.setRequestHeader('Accept', 'application/json')
//     client.responseType = 'json'
//     client.send()
//   })
//   return promise
// }
// // const p1 = new Promise((resolve, reject) => {
// //   setTimeout(() => resolve('p1 resolve'), 1000) //
// // })
// // const p2 = new Promise((resolve, reject) => {
// //   // 传递的为 promise, 最后结果有传递的 promise 的状态决定
// //   // 传递到 reject 函数中，则直接将当前状态作为值传入，并进入 onrejected 的回调
// //   // 传递到 resolve 函数中，则会等待传入的状态，并由传入的状态决定进入哪一个状态的回调
// //   setTimeout(() => reject(p1))
// // })
// // p2.then((res) => {
// //   console.log('res', res)
// // }, err => {
// //   console.log('err', err)
// // }).catch(error => {
// //   console.log('catch ', error)
// // })
// const p1 = new Promise((resolve, reject) => {
//   // resolve('resolve')
//   // reject('reject')
//   throw new Error('这是一个错误')
//   // console.log('继续执行') // resolve, reject 不会终结 Promise 的参数函数的执行
// })
// p1.then(res => {
//   console.log('p1 res', res)
// }
// // , error => {
// //   // 错误总是先被 then 中的 onrejected 函数捕获
// //   console.log('p1 error', error) // p1 error reject: 调用reject('reject')时执行的
// // }
// ).then(res => {
//   console.log('res', res)
// }).catch(error => {
//   console.log('p1 catch', error)
// })
const PENDING = void 0
const FULFILLED = 1
const REJECTED = 2
const noop = function () {}
class Promise {
  constructor(resolver) {
    this._result = this._status = undefined
    this._subscribers = []
    initialPromise(this, resolver)
  }
  then(onFulfillment, onRejection) {
    const parent = this
    const child = new this.constructor(noop)
    // 状态存在，则异步执行完毕，直接执行订阅函数
    debugger
    if (parent._status) {
      publish(this)
    } else {
      // 将 then 中的函数加入订阅，在状态改变的时候执行
      subscribe(parent, child, onFulfillment, onRejection)
    }
    // 调用 then 返回一个新的 Promise 实例
    return child
  }
}
/**
 * 初始化 promise
 */
function initialPromise(promise, resolver) {
  try {
    resolver(function (val) {
      resolve(promise, val)
    }, function (reason) {
      reject(promise, reason)
    })
  } catch(err) {
    reject(promise, err)
  }
}
function resolve(promise, val) {
  if (promise._status !== PENDING) return
  promise._status = FULFILLED
  promise._result = val
  debugger
  // 状态改变，执行订阅的函数
  publish(promise)
}
function reject(promise, reason) {
  if (promise._status !== PENDING) return
  promise._status = REJECTED
  promise._result = reason
  publishReject(promise)
}
function publish(promise) {
  let { _subscribers, _status, _result } = promise
  for (let index = 0; index < _subscribers.length; index += 3) {
    let fn = _subscribers[index];
    let callback = _subscribers[index + _status]
    callback(_result)
  }
}
function publishReject(promise) {
}
function subscribe(parent, child, onFulfillment, onRejection) {
 let { _subscribers } = parent
 let { length } = _subscribers
 _subscribers[length] = child // ?
 _subscribers[length + FULFILLED] = onFulfillment
 debugger
 _subscribers[length + REJECTED] = onRejection
}

let promise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('ssfsdfd')
  }, 1000)
})
let promise1 = promise.then((val) => {
  console.log('promise then', val)
})
console.log('promise1', promise1)