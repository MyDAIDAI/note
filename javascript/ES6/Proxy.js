// 原始方法
let obj = {
  name: 'obj',
  arr: [1, 2]
};
Object.defineProperty(obj, 'property1', {
  get() {
    return this.name;
  },
  set(v) {
    console.log('v', v, this.name);
    this.name = v;
  }
});
Object.defineProperty(obj, 'arr', {
  get() {
    console.log('get arr');
    return [1, 2, 3, 4]
  },
  set(v) {
    console.log('set arr');
    return this.name
  }
});
console.log('obj.arr', obj.arr);
obj.arr = [1, 1, 1];
console.log('obj.arr', obj.arr);
console.log(obj.property1);
obj.property1 = 'property1';
console.log('obj.name', obj.name);

// 使用 ES6 的 Proxy
let handler = {
  get: function(target, propKey) {
    console.log('get', propKey)
    return target[propKey]
  },
  set: function(target, propKey, value) {
    console.log('set', propKey, value)
    target[propKey] = value // 修改 target 的值，那么修改 p 中的属性值，也会修改 target 中的属性值
  }
}
// 只能触发第一层的 get set ????
// TODO: p.b = 2 触发 set, p.b[0] = 123 不触发 set
// TODO: p.c = 2134 触发 set, p.c.d = 324 不触发 set
let target = {
  a: 'a',
  b: [1, 2, 3],
  c: {
    d: 'd'
  }
}
let p = new Proxy(target, handler)
// console.log('p.c', p.c) // p中c的属性不存在，返回37
// console.log('target', JSON.stringify(p), JSON.stringify(target)) // 修改将会应用在 target 对象上
// console.log('target', target.a, target.c, p.c) // 1 undefined 37： handler 中的处理只会应用在 new Proxy()之后的对象上

let proxyObj = Object.create(p)
console.log('proxyObj', proxyObj)

function createArray(...elements) {
  let handler = {
    get: function (target, propKey) {
      let index = Number(propKey)
      console.log('get', propKey)
      if (index < 0) {
        propKey = String(target.length + index)
      }
      return target[propKey]
    }
  }
  let target = []
  target.push(...elements)
  return new Proxy(target, handler)
}
let ca = createArray('a', 'b', 'c', {e: 'f', h: [1, 2, 3]}) // 对内部的引用类型值也可以监听到
console.log('a')

var double = n => n * 2
var pow = n => n * n
var reverseInt = n => n.toString().split('').reverse().join('') | 0

var pipe = (function() {
  return function(value) {
    let funcStack = []
    var proxy = new Proxy({}, {
      get: function(target, propKey) {
        if (propKey === 'get') {
          return funcStack.reduce(function (val ,fn) {
            return fn(val)
          }, value)
        }
        // funcStack.push(window[propKey])
        return proxy // 每次都把代理返回
      }
    })
    return proxy
  }
}());
console.log(pipe(3).double.pow.get)

var sum = function(left, right) {
  return left + right
}
var sumProxy = new Proxy(sum, {
  apply: function(target, contxt, args) {
    return target.apply(contxt, args) * 2
  }
})
console.log(sumProxy(2, 3), sumProxy.call(null, 4, 5), sumProxy.apply(null, [5, 6]))

// constructor
var constructorP = new Proxy(function() {}, {
  construct: function(target, args) {
    console.log('construct', args)
    return {
      value: args[0]
    }
  }
})
console.log((new constructorP(123)).value)

// deleteProperty
var deletePropertyProxy = new Proxy({
  _proto: '_proto',
  a: 'a'
}, {
  deleteProperty: function(target, propKey) {
    if(propKey[0] === '_') {
      throw new Error('invalid delete private property')
    }
    return true
  }
})
console.log('deletePropertyProxy', delete deletePropertyProxy.a)
console.log(deletePropertyProxy)

let dom = new Proxy({}, {
  get: function(target, key) {
    return function(attrs = {}, ...children) {
      const el = document.createElement(key)
      for (let prop of Object.keys(attrs)) {
        el.setAttribute(prop, attrs[prop])
      }
      for (let child of children) {
        if (typeof child === 'string') {
          child = document.createTextNode(child)
        }
        console.log('child', child)
        el.appendChild(child)
      }
      return el
    }
  }
})
// const el = dom.div({}, 
//   'hello, my name is',
//   dom.a({herf: 'http://www.baidu.com'}, 'Mark'),
//   'I like: ',
//   dom.ul({}, 
//     dom.li({}, 'the web'),
//     dom.li({}, 'food'),
//     dom.li({}, '...other')))

// document.body.appendChild(el)

let targetObj = Object.defineProperties({}, {
  foo: {
    value: 123,
    writable: false,
    configurable: false
  }
})
let targetProxy = new Proxy(targetObj, {
  get: function() {
    return 'abc'
  }
})
// TypeError: 'get' on proxy: property 'foo' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '123' but got 'abc')
// console.log('targetProxy', targetProxy.foo) 只有配置的属性不可以
console.log('targetProxy', targetProxy.fn)

function invariant(key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`)
  }
}

let privateProxy = new Proxy({}, {
  get: function(target, key) {
    invariant(key, 'get')
    return target[key]
  },
  set: function(target, key, val) {
    invariant(key, 'set')
    target[key] = val
    return true
  }
})
// Error: Invalid attempt to get private "_name" property
// console.log('privateProxy', privateProxy._name)

// apply
var fnProxy = new Proxy(function() {
  return 'this is a fnTarget function'
}, {
  apply: function() {
    return 'this is a apply'
  }
})
console.log('fnProxy()', fnProxy())

// has: 拦HasProperty 操作，判断某个对象是否具有某个属性时进行拦截，比如 in 操作符
let hasProxy = new Proxy({ _prop: 'prop', key: 'key', __proto__: {name: 'name'} }, {
  has: function(target, key) {
    if (key[0] === '_') {
      return false
    }
    return key in target
  }
})
console.log('has', '_prop' in hasProxy) // false
console.log('has', 'key' in hasProxy) // true
console.log('has', 'name' in hasProxy) // true
// 不会影响 for/in 操作
for(let porp in hasProxy) {
  // porp _prop prop
  // porp key key   
  console.log('porp', porp, hasProxy[porp])
}
// construct
let ConProxy = new Proxy(function() {}, {
  construct: function(target, argumentsList) {
    // TypeError: 'construct' on proxy: trap returned non-object ('false')
    // return false
    return {}
  }
})
let conProxy = new ConProxy()
// deleteProperty
// 报错或者返回 false，则不能使用 delete 操作符删除
let deleteTarget = {_prop: '_prop', name: 'name'}
let deleteProxy = new Proxy(deleteTarget, {
  deleteProperty (target, key) {
    console.log('deleteProperty key', key)
    if (key[0] === '_') {
      return false
    }
    delete target[key]
    return true
  }
})
delete deleteProxy.name
// delete deleteProxy._prop
console.log('deleteProxy', deleteProxy, deleteTarget)