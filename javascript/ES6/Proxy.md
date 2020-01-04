# `Proxy`

`Proxy`用于定义基本操作的自定义行为（属性查找，赋值，枚举，函数调用等等）

## 语法
`let proxy = new Proxy(target, handler)`
- `target`: 用`Proxy`包装的目标对象（任何类型的对象，包括原生数组，函数或者另一个代理等等）
- `handler`: 一个对象，其属性是当执行一个操作时定义代理的行为的函数

## 一些示例
```javaScript
let target = {}
let handler = {
  get: function(target, name) {
    return name in target ? target[name] : 37
  }
}
let proxy = new Proxy(target)
proxy.a = 1
proxy.b = undefined
proxy.c // 37: c 属性不在 proxy 中，返回 37
proxy // Proxy {a: 1, b: undefined}
target // Object {a: 1, b: undfined} : 在 proxy 上添加的属性会被代理到 target 上
proxy.d // 37: 该值在 proxy 上不存在，返回 37
targte.d // undefined: target 对象不会进过代理，所以当获取不存在的属性值时返回 undefined
```

当`handler`的值为`{}`时，那就等于直接通向原对象
```javaScript
let target = {}
let handler = {}
let proxy = new Proxy(target, handler)
p // Proxy {a: 1, b: undefined}
target // Object {a: 1, b: undefined}
p.c // undefined : 没有设置 handler ，则行为与源对象相同
target.c // undefined
```
`Proxy`实例也可以作为其他对象的原型对象，当该对象没有值的时候，会在原型链上寻找，并返回原型对象上的相应值

```javaScript
let handler = {
  get: function() {
    return 37
  }
}
let proxy = new Proxy({}, handler)
let p = Object.create(proxy)
p.c = 1
p.c = 1
p.d // 37: 当访问不存在的属性时，会根据原型链向上查找，查找到原型上的Proxy对象，返回 get 函数的值
```

## `Proxy`支持的所有拦截操作
- `get(target, propKey, receiver)`: 拦截对象属性的读取
- `set(target, propKey, value, receiver)`: 拦截对象属性的设置
- `has(target, propKey)`: 拦截`propKey in target`的操作，返回一个布尔值, 不会拦截`for/in`遍历操作
- `deleteProperty(target, propKey)`: 拦截`delete proxy[propKey]`的操作，返回一个布尔值
- `ownKeys(target)`: 拦截`Object.getOwnPropertyNames(proxy)`, `Object.getOwnPropertySymbols(proxy)`, `Object.keys(proxy)`, 返回一个数组
- `getOwnPropertyDescriptor(target, propKey)`: 拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象
- `defineProperty(target, propKey, propDesc)`: 拦截`Object.defineProperty(proxy, propKey, propDesc)`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值
- `preventExtensions(target)`: 拦截`Object.preventExtensions(proxy)`， 返回一个布尔值
- `getPrototypeOf(target)`: 拦截`Object.getPrototypeOf(proxy)`， 返回一个对象
- `isExtensible(target)`: 拦截`Object.isExtensible(proxy)`，返回一个布尔值
- `setPrototypeOf(target, proto)`: 拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值，如果目标对象时函数，那么还有另外两种额外的操作可以拦截
- `apply(target, object, args)`: 拦截`proxy`实例，并将其作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`, `proxy.apply(object, args)`
- `construct(target, args)`: 拦截`Proxy`实例作为构造函数调用的操作，比如`new Proxy(...args)`

