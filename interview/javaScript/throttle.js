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
  let previous = 0 // 第一次调用的时候 previous 为 0, current - previous 必然大于 wait, 所以进去会先直接执行一次, 可以实现第一次的直接调用
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
      timer = setTimeout(() => { // setTimeout立即执行，但会在 wait 之后才会第一次开始执行函数，可以实现最后的wait调用
        fn.apply(this, args)
        timer = null
      }, wait)
    }
  }
}

/**
 * 可以控制第一次与最后一次函数调用的节流函数
 * @param {function} fn 要执行的函数
 * @param {number} wait 延迟时间
 * @param {object} option 可选项 {leading: false} 立即执行不调用，{trailing: false} 最后一次延迟不调用, 默认leading: true, trailing： true
 */
function throttle(fn, wait, options) {
  let result, timeout
  let previous = 0
  if (!options) options = {} // 未传入 options 参数，设置为空对象，取属性则为 undefined
  // 满足执行立即调用第一次
  return function(...args) {
    // debugger
    let current = +(new Date())
    // 不执行第一次函数调用且为第一次执行则把 previous 置为当前值
    if (!previous &&　options.leading === false) {
      previous = current
    }
    let remaining = wait - (current - previous)
    if (remaining <= 0) { // 时间到了，执行函数
      if (timeout) {  // 清除计时器，同时只执行一种
        clearTimeout(timeout)
        timeout = null
      }
      previous = current
      result = fn.apply(this, args)
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(() => {
        // 将闭包内保存的变量 previous 初始化，避免影响后续的调用
        previous = options.leading === false ? 0 : +(new Date())
        result = fn.apply(this, args)
        timeout = null
      }, remaining) // 在最后一次调用的时间差之后去调用该函数
    }
    return result
  }
}

// let index = 0
// const fn = () => {
//   console.log(`fn执行了 ${++index} 次`)
// }
// setInterval(throttle1(fn, 3000), 10)
// setInterval(throttle2(fn, 2000), 10)
// setInterval(throttle(fn, 3000, {leading: false}), 10)
// setInterval(fn, 10)

// 实现第一次进入时执行
function throttle1(fn, time) {
  let previous = 0;
  return function (...args) {
    let current = +new Date()
    if (current - previous > time) {
      previous = current
      fn.apply(this, args)
    }
  }
}
function throttle2(fn, time) {
  let timer = null
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, time)
    }
  }
}


