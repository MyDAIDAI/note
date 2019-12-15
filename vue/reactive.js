// vue 响应式原理

// 将数据变成可观察的
function observe(data, cb) {
  Object.keys(data).forEach(key => defineReactive(data, key, data[key], cb))
}
function defineReactive(obj, key, val, cb) {
  Object.defineProperty(obj, key,{
    configurable: true,
    enumerable: true,
    get () {
      // 进行依赖收集等等操作
      return val
    },
    set(v) {
      val = v
      // 订阅者收到消息的回调
      cb()
    }
  })
}
// vue 实例
class Vue {
  constructor(options) {
    this._data = options.data
    observe(this._data, options.render)
    _proxy.call(this, options.data)
  }
}
let vue = new Vue({
  data: {
    num: 123
  },
  render() {
    console.log('render')
  }
})
// 只能监听实例时传入的值
console.log('num', vue._data.num)
vue._data.num = '123123123' // 触发 render 函数

// 代理，将 vue._data.num 代理到 vue.num 上
function _proxy(data) {
  let that = this
  Object.keys(data).forEach(key => {
    Object.defineProperty(that, key, {
      configurable: true,
      enumerable: true,
      get () {
        return that._data[key]
      },
      set(v) {
        that._data[key] = v
      }
    })
  })
}
console.log('num',vue.num)
vue.num = 'testnum'
