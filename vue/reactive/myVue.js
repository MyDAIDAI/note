

let target = null
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
          console.log('get')
          // 对于值为对象来说，完全是ok的，不需要再在 __ob__ 上添加依赖
          dep.depend() // 只是在闭包中的 dep 变量上添加依赖，没有在 __ob__ 上添加依赖
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
    // arr: [1, 2, 3, [4, 5, [7]]],
    obj: {
      a: 'a',
      b: {
        c: 'c'
      }
    }
  },
  target: function () {
    let data = this.$data
    console.log('this', this)
    console.log(data.obj.a + data.obj.b.c)
  }
})
debugger
console.log('myvue',myvue)