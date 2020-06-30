// 防抖函数
// 防抖函数指在某段时间内，无论触发了多少次回调，都只执行最后一次
// 使用setTimeout进行计时，如果在wait时间内重复触发，则清除以前的定时器
function debounce1(fn, wait) {
  let timer = null
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, wait)
  }
}
// 上面的没有处理对第一次调用时函数的调用，添加一个可选项
function debounce2(fn, wait, immediate) {
  let timer = null
  return function (...args) {
    if (immediate && !timer) {
      fn.apply(this, args)
    }
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, wait)
  }
}
// 上面的函数仍然会有一个问题，如果在指定的时间期间一直触发，那么就会一直清空并设置新的定时器
// 那么在 wait 时间之后也不会进行触发，可以结合节流中的时间差值来进行优化, 加强版节流函数
function throttle(fn, wait) {
  let previous = 0
  let timer = null
  return function (...args) {
    let current = Date.now()
    if (current - previous < wait) {
      // console.log('current - previous < wait', current - previous)
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      timer = setTimeout(() => {
        previous = current
        fn.apply(this, args)
        timer = null
      }, wait)
    } else {
      // console.log('current - previous > wait', current - previous)
      previous = current
      fn.apply(this, args)
    }
  }
}

function debounce(fn, wait, immediate) {
  let timer = null
  let result = ''
  return function(...args) {
    if (immediate && !timer) {
      result = fn.apply(this, args)
    }
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      result = fn.apply(this, args)
      timer = null
    }, wait)
    return result
  }
}
function format(num) {
  let str = num + ''
  return str.split('').reverse().reduce((prev, current, index) => {
    return (index % 3 ? current : (current + ',')) + prev
  })
}
console.log(format(12345678));
