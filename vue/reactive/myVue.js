

let target = null

// 对数组方法的处理
let methodProto = Array.prototype
let methodsPatch = [
  'push',
  'slice',
  'pop',
  'shift',
  'unshift'
]
let methodObject = Object.create(methodProto)
methodsPatch.forEach((method) => {
  let original = methodProto[method]
  Object.defineProperty(methodObject, method, {
    enumerable: false,
    value: function (...args) {
      let result = original.apply(this, args)
      console.log('array method', this)
      this.__ob__ && this.__ob__.dep.notify()
      return result
    }
  })
})
class MyVue {
  constructor(options) {
    const vm = this
    this.$options = options
    this.$data = options.data
    this.initData(vm)
    this.initRender(vm)
  }
  initData(vm) {
    observer(vm.$data)
  }
  initRender(vm) {
    new Watcher(vm, this.$options.target)
  }
}
/**
 * 监听者，并保存 vm 对象以及内部的数据
 */
class Watcher {
  constructor(vm, fn) {
    this.vm = vm
    this.getter = fn
    Dep.target =  this
    this.get()
    Dep.target = null
  }
  get() {
    return this.getter.call(this.vm)
  }
  addDep(dep) {
    dep.addSub(this)
  }
  update() {
    return this.get()
  }
}
// function watcher(vm) {
//   target = vm.$options.target
//   target.call(vm, vm.$data)
//   target = null
// }
function isPlainObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]'
}
/**
 * 观察函数
 * @param {any} data 
 */
function observer(data) {
  let ob
  if (Array.isArray(data) || isPlainObject(data)) {
    ob = new Observer(data)
  }
  return ob
}
function def(obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: false,
    value: val
  })
}

/**
 * 观察类
 * 值为引用类型就向其中添加观察类
 * 观察类中记录依赖
 */
class Observer{
  constructor(value) {
    this.dep = new Dep()
    def(value, '__ob__', this)
    this.value = value
    if (Array.isArray(value)) {
      value.__proto__ = methodObject
      this.observerArray(value)
    } else {
      this.walk(value)
    }
  }
  walk(val) {
    Object.keys(val).forEach(key => {
      let dep = new Dep()
      let internalVal = val[key]
      let childOb = observer(internalVal)
      let that = this
      Object.defineProperty(val, key, {
        get: function() {
          console.log('get')
          // 对于值为对象来说，完全是ok的，不需要再在 __ob__ 上添加依赖, 直接修改 data 中的 arr 属性可以触发更新 myvue.$data.arr = [2, 3, 4, 5, [6, 7, [9]]]
          dep.depend() // 只是在闭包中的 dep 变量上添加依赖，没有在 __ob__ 上添加依赖
          if (childOb) { // 对值为数组的处理，向 __ob__ 中添加依赖，使用 push，pop 等代理方法可以触发该依赖
            childOb.dep.depend()
            if (Array.isArray(internalVal)) { // 值为数组，则递归向数组的 __ob__ 对象上添加依赖, 调用数组的代理方法可以触发更新 myvue.$data.arr[3].push(1)/myvue.$data.arr[3][2].push(1)调用的代理方法，所以都会触发更新
              that.dependArray(internalVal)
            }
          } 
          return internalVal
        },
        set: function(val) {
          internalVal = val
          console.log('notify', dep)
          dep.notify()
          return val
        }
      })
    })
  }
  dependArray(internalVal) {
    for(let i = 0, len = internalVal.length; i < len; i++) {
      let item = internalVal[i]
      item && item.__ob__ && item.__ob__.dep.depend()
      if (Array.isArray(item)) {
        this.dependArray(item)
      }
    }
  } 
  observerArray(val) {
    for(let i = 0, len = val.length; i < len; i++) {
      observer(val[i])
    }
  }
}
/**
 * 依赖类
 * 依赖的收集以及分发
 */
class Dep {
  constructor() {
    this.subs = []
    this.express = target && target.toString()
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
  notify() {
    this.subs.forEach(watcher => {
      watcher.update()
    })
  }
}

// MyVue实例
let myvue = new MyVue({
  data: {
    arr: [1, 2, 3, [4, 5, [7]]],
    obj: {
      a: 'a',
      b: {
        c: 'c'
      }
    }
  },
  target: function () {
    let data = this.$data
    let totalArr = 0
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
    console.log('totalArr notify', totalArr)
  }
})
debugger
console.log('myvue',myvue)