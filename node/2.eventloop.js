// node事件环
// The Node.js Event Loop, Timers, and process.nextTick()
// 1. 当Node启动的时候，会初始化事件环
// 2. js脚本执行的过程中可能会产生异步API调用，定时器或者调用process.nextTick()
// timers: setTimeout(), setInterval()
// I/O callbacks: 此阶段执行某些操作系统的回调。
// idle, prepare: 仅在内部使用
// poll: 检索新的I/O事件，执行与I/O有关的回调（除了close callbacks, timers和setImediate的几乎所有），node在恰当的时候会阻塞在这里
// check: setImmediate()
// close callbacks: 一些关闭回调，如 socket.on('close', ...)

//setTimeout(() => {
//    console.log('set time out')
//}, 1000)
//
//process.nextTick(() => {
//    console.log('next tick')
//})
//console.log('hello')

//const fs = require('fs');
//console.time('setTimeout');
setTimeout(() => {
//    console.timeEnd('setTimeout');
    console.log('set time out');
}, 0);
//console.time('readFile')
//fs.readFile('./age.txt', (err, data) => {
//    console.timeEnd('readFile')
//})
setImmediate(() => {
    console.log('set immediate')
})
