function defineReactive (data, key, val) {
  // 该属性的依赖数组
  let dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      dep.depend()
      return val
    },
    set: function (newVal) {
      if (val === newVal) {
        return
      }
      // 值改变，循环遍历依赖数组，执行依赖函数
      dep.notify()
      console.log('set', newVal)
      val = newVal
    }
  })
}
var a = {}
defineReactive(a, 'a', '123')
console.log('a', a)

export default class Dep {
  static target
  constructor () {
    this.id = uid++
    this.subs = []
  }
  addSub (sub) {
    this.subs.push(sub)
  }
  removeSub(sub) {
    remove(this.subs, sub)
  }
  depend () {
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }
  notify () {
    let subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

class Watch {
  constructor (expOrFn, cb) {
  }
  get (key) {
    Dep.target = this
    this.value = data[key]
    Dep.target = null
  }
}