

let target = null
class MyVue {
  constructor(options) {
    this.$data = options.data
    // target = options.target
    this.initData()
    this.initTarget(options.target)
  }
  initData() {
    observer(this.$data)
  }
  initTarget(fn) {
    watcher(fn)
  }
}
function watcher(fn) {
  target = fn
  target()
  target = null
}
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
      this.observerArray(value)
    } else {
      this.walk(value)
    }
  }
  walk(val) {
    Object.keys(val).forEach(key => {
      let dep = new Dep()
      let internalVal = val[key]
      let ob = observer(internalVal)
      Object.defineProperty(val, key, {
        get: function() {
          if (target) {
            dep.depend()
          }
          return internalVal
        },
        set: function(val) {
          internalVal = val
          return val
        }
      })
    })
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
class Dep{
  constructor() {
    this.subs = []
    this.express = target && target.toString()
  }
  depend() {
    if(target && !this.subs.includes(target)) {
      this.subs.push(target)
    }
  }
  notify() {
    this.subs.forEach(fn => {
      fn()
    })
  }
}
let target = null
// MyVue实例
let myvue = new MyVue({
  data: {
    arr: [1, 2, 3, [4, 5, [7]]]
  },
  target: () => {
    console.log(this.data.arr, this.data.arr[0])
  }
})
debugger
console.log('myvue',myvue)