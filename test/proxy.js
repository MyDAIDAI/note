let obj = {
  a: 1,
  b: 2,
  arr: [1, 2, 3],
  d: {
    a: 1
  }
}

function update() {
  console.log('视图更新')
}

const handler = {
  get(target, p, receiver) {
    if(typeof target[p] === 'object') {
      return new Proxy(target[p], handler)
    }
    return Reflect.get(target, p, receiver)
  },
  set(target, p, value, receiver) {
    if(p === 'length') return true
    update()
    return Reflect.set(target, p, value, receiver)
  }
}

let proxyObj = new Proxy(obj, handler)
// proxyObj.a = 100
// proxyObj.arr.push(11)
proxyObj.d.a = 100
proxyObj.new = 200
console.log('obj', obj)