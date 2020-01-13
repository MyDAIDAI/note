// 节流: 在一定时间内只触发一次
// 实现方法
// 1. 第一种是用时间戳来判断是否已到执行时间，记录上次执行的时间戳，然后每次触发事件执行回调，回调中判断当前时间戳距离上次执行时间戳的间隔是否已经达到时间差（Xms） ，如果是则执行，并更新上次执行的时间戳，如此循环。
// 2. 第二种方法是使用定时器，比如当 scroll 事件刚触发时，打印一个 hello world，然后设置个 1000ms 的定时器，此后每次触发 scroll 事件触发回调，如果已经存在定时器，则回调不执行方法，直到定时器触发，handler 被清除，然后重新设置定时器。

// 第一种实现方式
/**
 * 使用第一种方式的节流函数
 * @param {function} fn 要执行的函数
 * @param {number} wait 等待时间，毫秒级 
 */
function throttle1(fn, wait) {
  let previous = 0 // 第一次调用的时候 previous 为 0, current - previous 必然大于 wait, 所以进去会先直接执行依次
  return function(...args) {
    let current = +(new Date())
    if (current - previous >= wait) {
      previous = current
      fn.apply(this, args)
    }
  }
}

/**
 * 使用 setTimeout 方法实现
 * @param {function} fn 要执行的函数
 * @param {number} wait 等待时间，毫秒级
 */
function throttle2(fn, wait) {
  let timer = null
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => { // setTimeout立即执行，但会在 wait 之后才会第一次开始执行函数
        fn.apply(this, args)
        timer = null
      }, wait)
    }
  }
}
let index = 0
const fn = () => {
  console.log(`fn执行了 ${++index} 次`) 
}
setInterval(throttle1(fn, 2000), 10)
// setInterval(throttle2(fn, 2000), 10)
// setInterval(fn, 10)