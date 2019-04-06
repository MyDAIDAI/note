# `Promise`

## 基本用法
```javascript
var promise = new Promise(function (resolve, reject) {
    // 异步操作
    if (/* 异步操作成功*/) {
        resolve(data)
    } else {
        reject(error)
    }
})
```
- `Promise`构造函数接受一个函数作为参数，传入函数的参数分别为`resolve`与`reject`，在异步成功之后执行`resolve()`，异步失败之后执行`reject()`
- `resolve`执行之后，`promise`的状态从`pending`变为`resolved`
- `reject`执行之后，`promise`的状态从`pending`变为`rejected`
- 状态一旦改变，就不会再变化

实例生成之后，使用`promise`实例的`then`方法，指定成功之后的回调与失败之后的回调函数，回调函数会在当前脚本所有同步任务执行完成之后才会执行
```javascript
promise.then(function (value) {
    // success code
}, function (error) {
    // fail error
})
```
调用`resolve`函数和`reject`函数时带有参数，那么其参数会被传递给回调函数, `resolve`函数的参数除了正常的值以外，还可能是另一个`promise`实例
```javascript
var p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject('resolve'), 3000)
})

var p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log('success', result))
  .catch(error => console.log('error', error))
// Promise {<pending>}
// VM1920:11 error resolve
var p1 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve('resolve'), 3000)
})

var p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log('success', result))
  .catch(error => console.log('error', error))
// Promise {<pending>}
// VM1970:10 success resolve
var p1 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve('resolve'), 3000)
})

var p2 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(p1), 1000)
})

p2
  .then(result => console.log('success', result))
  .catch(error => console.log('error', error))
// Promise {<pending>}
// VM2017:11 error Promise {<pending>}
var p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject('resolve'), 3000)
})

var p2 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(p1), 1000)
})

p2
  .then(result => console.log('success', result))
  .catch(error => console.log('error', error))
// Promise {<pending>}
// VM2092:11 error Promise {<pending>}
```
上面的代码中，`p1`是一个`promise`，在3秒钟之后改变状态，当`p2`调用`reject`时，直接抛出`p1`的`Promise pending`错误，当`p2`调用`resolve`时，`p2`的状态由`p1`的状态决定，当`p1`调用`resolve`，则`p2`调用成功之后的回调，当`p1`调用`reject`，则`p2`调用失败之后的回调

需要注意的是，调用`resolve`与`reject`之后并不会终止`Promise`传入参数的执行

## `Promise.prototype.then()`
`then`方法的第一个参数是`resolved`状态的回调函数，第二个（可选）参数是`rejected`状态的回调函数。`then`方法返回的是一个新的`Promise`实例（不是原来的`Promise`实例），因此可以采用链式写法

采用链式调用的`then`方法，可以指定一组按照次序调用的回调函数。这时，前一个回调函数有可能返回的仍然为一个`Promise`对象，这时后一个回调函数就会等待该`Promise`对象的状态发生变化才会被调用

其他方法见[Promise 对象](http://es6.ruanyifeng.com/#docs/promise)

## `Promise`面试题
```javascript
const promise = new Promise(function (resolve, reject) {
    console.log(1)
    resolve()
    console.log(2)
})
promise.then(() => {
    console.log(3)
})
console.log(4)
// 输出结果：1 2 4 3
```
思路：
1. `resolve`与`reject`之后的代码仍会被执行
2. `Promise`构造函数中的代码是同步执行的，`then`方法中传入的函数是异步执行的
   
```javascript
const promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve('success')
        reject('error')
    }, 1000)
})
promise.then((res) => {
    console.log(res)
}, (err) => {
    console.log(err)
})
// 输出结果：success
```
思路：
1. `promise`的状态一旦改变就不会再发生更改
   
```javascript
Promise.resolve(1)
    .then(2)
    .then(Promise.resolve(3))
    .then(console.log)

// 输出结果： 1
```
思路：
1. `Promise`的`then`方法的参数期望的是传入函数，传入非函数则会发生值穿透

```javascript
setTimeout(() => {
    console.log('setTimeout')
})
let p1 = new Promise((resolve) => {
    console.log('Promise1')
    resolve('Promise2')
})
p1.then(res => {
    console.log(res)
})
console.log(1)
// 输出结果：Promise1 1 Promise2 setTimeout
```
思路：
1. 整个`js`代码，以及`setTimeout`放在宏任务中
2. `promise.then`方法放在微任务中
3. `js`会执行时会取一个宏任务执行，执行之后会将所有的微任务执行完成，再取宏任务中的`setTimeout`来执行

```javascript
const promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
        console.log('start')
        resolve('success')
    }, 5000)
})
const start = Date.now()
promise.then((res) => {
    console.log(res, Date.now() - start)
})
promise.then(res => {
    console.log(res, Date.now() - start)
})
// 输出结果： start, success 5002, success 5002
```
思路：`promise`的`then`函数以及`catch`函数可以被调用多次，但`Promise`构造函数只执行一次。也就是说`promise`的状态一旦改变，并且有了一个值，那么后面每次调用`then`方法与`catch`方法拿到的值都相同

```javascript
let p1 = new Promise((resolve,reject)=>{
  let num = 6
  if(num<5){
    console.log('resolve1')
    resolve(num)
  }else{
    console.log('reject1')
    reject(num)
  }
})
p1.then((res)=>{
  console.log('resolve2')
  console.log(res)
},(rej)=>{
  console.log('reject2')
  let p2 = new Promise((resolve,reject)=>{
    if(rej*2>10){
      console.log('resolve3')
      resolve(rej*2)
    }else{
      console.log('reject3')
      reject(rej*2)
    }
  })
　　return p2
}).then((res)=>{
  console.log('resolve4')
  console.log(res)
},(rej)=>{
  console.log('reject4')
  console.log(rej)
})
// 输出结果：reject1, reject2, resolve3, resolve4, 12
```

```javascript
const first = () => (new Promise((resolve,reject)=>{
    console.log(3);
    let p = new Promise((resolve, reject)=>{
         console.log(7);
        setTimeout(()=>{
           console.log(5);
           resolve(6); 
        },0)
        resolve(1);
    }); 
    resolve(2);
    p.then((arg)=>{
        console.log(arg);
    });

}));

first().then((arg)=>{
    console.log(arg);
});
console.log(4);
// 输出结果：3 7 4 1 2 5
```
思路：
1. 执行同步任务，输出3 7 4
2. 将`setTimeout`加入宏任务中
3. 将`p.then`与`first.then`加入微任务中
4. 同步代码执行完成后，取出所有的微任务进行执行，依次输出 1 2
5. 微任务执行完成后从宏任务中取出`setTimeout`进行执行，输出 5
6. `p`中的状态在`resolve(1)`时已经发生了改变，所有执行`setTimeout`中的`resolve`不会发生变化
   

无论前一个`then`方法是从成功的回调函数中返回还是从失败的回调函数中返回值，都会传入后一个`then`方法成功的回调函数中
```javascript
var promise = new Promise(function (resolve, reject) {
	setTimeout(function () {
		reject('fail')
	}, 0)
})
promise.then(function (data) {
	console.log('resolve', data)
}, function (reason) {
	console.log('reject', reason)
	return 'reject reason'
}).then(function (data) {
	console.log('resolve2', data)
}, function (reason) {
	console.log('reject2', reason)
})
// Promise {<pending>}
// reject fail
// resolve2 reject reason
var promise = new Promise(function (resolve, reject) {
	setTimeout(function () {
		reject('fail')
	}, 0)
})
promise.then(function (data) {
	console.log('resolve', data)
}, function (reason) {
	console.log('reject', reason)
	return new Error('reject error')
}).then(function (data) {
	console.log('resolve2', data)
}, function (reason) {
	console.log('reject2', reason)
})
// Promise {<pending>}
// reject fail
// resolve2 Error: reject error
//     at <anonymous>:10:9
```