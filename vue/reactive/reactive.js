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
// // 新建一个 Dep 类来保存 target, 对 record 以及 replay 进行封装
// class Dep {
//   constructor() {
//     this.subs = []
//   }
//   depend() {
//     if (target && !this.subs.includes(target)) {
//       this.subs.push(target)
//     }
//   }
//   notify() {
//     this.subs.forEach(run => run())
//   }
// }

// let price = 5
// let quantity = 10
// let sum = 10
// let total = 0
// let salePrice = 0
// // const dep = new Dep()
// let target = null
// let data = {
//   // price: 5,
//   // quantity: 10,
//   // obj: {
//   //   a: 1,
//   //   b: 2,
//   //   c: {
//   //     d: 3
//   //   }
//   // }
//   arr: [1, 2, 3]
// }
// function isObject(val) {
//   return Object.prototype.toString.call(val) === '[object Object]'
// }
// function observe(val) {
//   if (isObject(val) || Array.isArray(val)) {
//     return addObserver(val)
//   }
// }
// const arrayProto = Array.prototype
// const arrayMethods = Object.create(arrayProto)
// // 需要进行重写的方法
// const methodsToPatch = [
//   'push',
//   'pop',
//   'shift',
//   'unshift',
//   'splice',
//   'sort',
//   'reverse'
// ]
// methodsToPatch.forEach(ele => {
//   const original = arrayProto[ele]
//   Object.defineProperty(arrayMethods, ele, {
//     value: function(...args) {
//       const result = original.apply(this, args)
//       const dep = this.__dep__
//       console.log(`调用 ${ele} 方法`)
//       dep.notify()
//       return result
//     },
//     enumerable: false,
//     writable: true,
//     configurable: true
//   })
// })
// function protoAugment(target, proto) {
//   target.__proto__ = proto
// }

// function addObserver(val) {
//   const dep = new Dep()
//   Object.defineProperty(val, '__dep__', {
//     value: dep,
//     enumerable: false,
//     writable: true,
//     configurable: true
//   })
//   if (isObject(val)) {
//     const keys = Object.keys(val)
//     keys.forEach(key => defineProperty(val, key))
//   } else if(Array.isArray(val)) {
//     protoAugment(val, arrayMethods)
//     val.forEach(ele => observe(ele))
//   }
//   return val
// }
// function defineProperty(obj, key) {
//   const dep = new Dep()
//   let internalVal = obj[key]
//   const childOb = observe(internalVal)
//   Object.defineProperty(obj, key, {
//     get: function () {
//       dep.depend()
//       // obj 被访问5次，向其中添加了5次 watcher 中的 target 函数
//       // obj 中的 c 属性，被访问两次，则其对应的 subs 中有两个 watcher 中的 target 函数
//       // 为了避免向 subs 中添加重复的 target 函数，需要判断是否存在
//       console.log(`get key: ${key} dep: ${dep} subs: ${dep.subs}`)
//       if (childOb) {
//         childOb.__dep__.depend()
//       }
//       return internalVal
//     },
//     set: function(val) {
//       internalVal = val
//       dep.notify()
//     }
//   })
// }
// observe(data)
// function watcher(myFun) {
//   target = myFun
//   target()
//   target = null
// }
// watcher(() => {
//   total = 0
//   data.arr.forEach(ele => {
//     total += ele
//   })
// })
// watcher(() => {
//   sum = data.price + data.quantity
// })
// watcher(() => {
//   salePrice = data.price * 0.7
// })
// console.log(total, sum, salePrice)
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

// 对Vue2中的响应式按照自己的理解进行重写
let target = null
/**
 * 依赖类，对依赖的收集以及执行
 */
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
function watcher(fn) {
  target = fn
  target() // 执行该函数时，会获取 data 中的相应数据，触发 get 监听，向其中添加依赖
  target = null
}
/**
 * 向对象中添加相应的属性值, 该属性不可遍历
 * @param {*} obj 
 * @param {*} key 
 * @param {*} val 
 */
function def(obj, key, val) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: false,
    writable: false,
    configurable: true
  })
}

let arrayProto = Array.prototype
let arrayMethods = Object.create(arrayProto) // 使用数组的原型创建一个对象，并向该对象上添加代理数组方法，再该代理方法中可以进行依赖更新
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift'
]
methodsToPatch.forEach(function(method) {
  let original = arrayProto[method]
  def(arrayMethods, method, function(...args) {
    // this 指向调用该方法的数组
    let result = original.apply(this, args)
    this.__ob__ && this.__ob__.dep.notify()
    return result
  })
})
/**
 * 观察类，添加了观察类的值是可以被观察到的，也就是响应式的
 * 在该类中对数组以及对象做不同的处理
 */
class Observer {
  constructor(val) {
    this.val = val
    this.expression = target && target.toString()
    def(val, '__ob__', this)
    this.dep = new Dep()
    if (Array.isArray(this.val)) {
      // 对数组原型方法的处理
      val.__proto__ = arrayMethods
      this.observerArray(val)
    } else {
      this.walk(val)
    }
  }
  observerArray(value) {
    for(let i = 0; i < value.length; i++) {
      observer(value[i])
    }
  }
  walk(value) {
    let keys = Object.keys(value)
    keys.forEach(key => {
      let internalVal = value[key]
      let dep = new Dep()
      // debugger
      let childOb = observer(internalVal)
      Object.defineProperty(value, key, {
        enumerable: true,
        configurable: true,
        get: function() {
          dep.depend()
          if (childOb) {
            childOb.dep.depend()
            // 对数组内的值进行遍历添加依赖
            if (Array.isArray(internalVal)) {
              dependArray(internalVal)
            }
          }
          return internalVal
        },
        set: function(newVal) {
          internalVal = newVal
          childOb = observer(newVal) // 为刚设置的值添加监听
          dep.notify() // 该方法不能触发数组内某一项值的改变的监听
        }
      })
    })
  }
}
function dependArray(arr) {
  for(let i = 0; i < arr.length; i++) {
    let e = arr[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
function observer(value) {
  let ob
  if (Array.isArray(value) || isPlainObject(value)) {
    ob = new Observer(value)
  }
  return ob
}
let data = {
  // num: 1,
  arr: [1, 2, [3, 4, 5], {a: 6, b: {c: 7}}],
  // arrObj: [{a: 'a', b: {c: '}}]
  obj: {
    a: 'a',
    b: 'b',
    c: {
     d: 'd',
     e: {
       h: 'h'
     } 
    }
  }
}
observer(data)
let totalArr = 0
let totalObj = ''
watcher(() => {
  totalArr = 0
  function sum(arrdata) {
    arrdata.forEach(ele => {
      if (Array.isArray(ele)) {
        sum(ele)
      } else if (typeof ele === 'number'){
        totalArr += ele
      }
    })
  }
  sum(data.arr)
  totalArr = totalArr + data.arr[3].a + data.arr[3].b.c
  console.log('totalArr notify', totalArr)
})
watcher(() => {
  totalObj = ''
  function sum(objData) {
    const keys = Object.keys(objData)
    keys.forEach(key => {
      let val = objData[key]
      if (isPlainObject(val)) {
        sum(val)
      } else {
        totalObj += val
      }
    })
  }
  sum(data.obj)
  console.log('totalObj notify', totalObj)
})
// watcher(() => {
//   totalObj = data.arrObj[0].a + data.arrObj[0].b.c
// })
console.log('total', totalArr)
