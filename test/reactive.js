let obj = {
  a: 1,
  name: '12',
  b: {
    name: '123'
  }
}
let arr = [1, 2, 3]
let patchProto = Object.create(Array.prototype)
['push', 'pop', 'slice', 'shift', 'unshift', 'reverse', 'sort', 'splice'].forEach(method => {
  patchProto[method] = function () {
    let originMethod = Array.prototype[method]
    let result = originMethod.call(this, ...arguments)
    update()
    return result
  }
})
function update() {
  console.log('视图更新')
}
function observer(obj) {
  if(Array.isArray(obj)) {
    obj.__proto__ = proto
    return
  }
  if(typeof obj !== 'object') return obj
  for (let key in obj) {
    if(obj.hasOwnProperty(key)) {
      defineReactive(obj, key, obj[key])
    }
  }
}

function defineReactive(obj, key, value) {
  observer(value)
  Object.defineProperty(obj, key, {
    get() {
      return value
    },
    set(v) {
      observer(v)
      if(value === v) return value
      update()
      value = v
    }
  })
}
observer(obj)
// obj.name = 'sdfsdf'
// obj.b.name = 'sdfsdf'
obj.b = {
  a: '12312'
}
obj.b.a = '测试'
arr.push(666)