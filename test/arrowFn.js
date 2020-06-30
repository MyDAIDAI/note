let a = 100
let obj = {
  a: 1,
  fn() {
    setTimeout(function () {
      console.log('setTimeout', this.a) // undefined: let 声明的全局变量不会绑定到 window 对象上
    })
    console.log('fn', this.a) // 1
  }
}
obj.fn()

let obj1 = {
  a: 1,
  fn: () => {
    setTimeout(() => {
      console.log('setTimeout', this.a) // undefined: 箭头函数没有this， 会向上层查找 fn 的 this, fn中没有 this, 则查找全局 window
    })
    console.log('obj1', this.a)
  }
}
obj1.fn()

let arrowFn = () => {
  console.log('arrowFn', this, arguments)
}
arrowFn()
console.log('arrowFn.prototype', arrowFn.prototype) // 箭头函数没有 prototype 属性