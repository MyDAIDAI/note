const Promise = require('./promise')
let promise1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    reject(100)
  }, 1000);
})
let promise2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('sdfdsf')
  }, 200)
})
// then 返回一个新的Promise, 并把前一个的返回值传递过去
// 1) 前一个 promise 返回一个普通值，则直接 resolve
// 2) 前一个 promise 返回一个 Promise, 则状态根据返回的 Promise 的状态决定
// let promise2 = promise.then(function (val) {
//   return promise2
// })
// promise2.then().then().then(function (val) {
//   console.log('val', val)
// }).catch(function (err) {
//   console.log('err', err)
// })
Promise.race([promise2, promise1]).then((result => {
  console.log('promise race', result)
}), err => {
  console.log('err', err)
})