// // vue 响应式原理
// // vue 数据劫持
// // 观察者
// class Watcher {
//   constructor() {
//     Dep.target = this
//   }
//   update() {
//     console.log(`视图更新啦: ${Dep.target}`)
//   }
// }
// // 订阅者
// class Dep{
//   constructor() {
//     this.subs = []
//   }
//   addSub(sub) {
//     this.subs.push(sub)
//   }
//   notify() {
//     this.subs.forEach(sub => {
//       sub.update()
//     })
//   }
// }
// Dep.target = null
//
// // 将数据变成可观察的
// function observe(data) {
//   Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
// }
// function defineReactive(obj, key, val) {
//   const dep = new Dep()
//   Object.defineProperty(obj, key,{
//     configurable: true,
//     enumerable: true,
//     get () {
//       // 进行依赖收集等等操作
//       dep.addSub(Dep.target)
//       console.log(`get: ${obj}, ${key}, ${JSON.stringify(dep)}`)
//       return val
//     },
//     set(v) {
//       val = v
//       // 订阅者收到消息的回调
//       console.log(`set: ${obj}, ${key}, ${JSON.stringify(dep)}`)
//       dep.notify()
//       // cb()
//     }
//   })
// }
// // vue 实例
// class Vue {
//   constructor(options) {
//     this._data = options.data
//     // 数据监听
//     observe(this._data, options.render)
//     new Watcher()
//     // 数据劫持，绑定数据到 this 对象上
//     _proxy.call(this, options.data)
//   }
// }
// let vue = new Vue({
//   data: {
//     num1: 123,
//     num2: 456
//   },
//   render() {
//     console.log('render')
//   }
// })
// // 只能监听实例时传入的值
// // console.log('num', vue._data.num)
// // vue._data.num = '123123123' // 触发 render 函数
//
// // 代理，将 vue._data.num 代理到 vue.num 上
// function _proxy(data) {
//   let that = this
//   Object.keys(data).forEach(key => {
//     Object.defineProperty(that, key, {
//       configurable: true,
//       enumerable: true,
//       get () {
//         return that._data[key]
//       },
//       set(v) {
//         that._data[key] = v
//       }
//     })
//   })
// }
// console.log(vue._data.num1)
// vue._data.num1 = '123123123'
//   console.log(vue._data.num1)


// 一个简单的响应式
// let price = 10
// let quantity = 20
// let total = 0
// let saleTotal = 0
// let target = null// 依赖变量的计算，当price以及quantity更新的时候，需要重新进行计算
// 每次修改price,以及quantity的值，
// 需要手动进行调用依赖它们的函数，
// 进行相应的数据更新

// let storage = []
// // 存储需要重新进行计算的依赖
// function record() {
//   storage.push(target)
// }
// record()
// target()
// // 依次进行计算
// function replay() {
//   storage.forEach(run => run())
// }
// target()
// 新建一个 Dep 类来保存 target, 对 record 以及 replay 进行封装
class Dep {
  constructor() {
    this.subs = []
  }
  depend() {
    if (target && !this.subs.includes(target)) {
      this.subs.push(target)
    }
  }
  notify() {
    this.subs.forEach(run => run())
  }
}

let price = 5
let quantity = 10
let sum = 10
let total = 0
let salePrice = 0
// const dep = new Dep()
let target = null
let data = {
  price: 5,
  quantity: 10,
  arr: [1, 2, 3, 5]
}
Object.keys(data).forEach(ele => {
  const dep = new Dep()
  let interVal = data[ele]
  Object.defineProperty(data, ele, {
    get: () => {
      dep.depend()
      console.log(ele, dep.subs)
      return interVal
    },
    set: (val) => {
      interVal = val
      dep.notify()
    }
  })
})
function watcher(myFun) {
  target = myFun
  target()
  target = null
}
watcher(() => {
  total = data.price * data.quantity
})
watcher(() => {
  sum = data.price + data.quantity
})
watcher(() => {
  salePrice = data.price * 0.7
})
console.log(total, sum, salePrice)
// target = () => {
//   total = price * quantity
// }
// dep.depend() // 收集依赖
// target()
// function watcher(myFunc) {
//   target = myFunc
//   dep.depend()
//   target()
//   target = null
// }
// watcher(() => {
//   total = price * quantity
// })
// watcher(() => {
//   sum = price + quantity
// })
// console.log(total, sum)
// price = 10
// dep.notify()
// console.log(total, sum)
// dep.depend(target)
// 对不同的target的执行进行封装
// function watcher(myFunc) {
//   target = myFunc
//   target()
//   target = null
// }


// 对数据设置 getter 与 setter，使其可以自动收集依赖以以及进行自动更新操作
// let data = {
//   price: 10,
//   quantity: 20
// }
// defineProperty()
// function defineProperty() {
//   Object.keys(data).forEach(key => {
//     const dep = new Dep()
//     let internalVal = data[key]
//     Object.defineProperty(data, key, {
//       get() {
//         dep.depend()
//         return internalVal
//       },
//       set(v) {
//         internalVal = v
//         dep.notify()
//       }
//     })
//   })
// }
// watcher(() => { total = data.price * data.quantity })
// watcher(() => {
//   saleTotal = data.price * 0.9
// })
// console.log('total', total)
