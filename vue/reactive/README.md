# `Vue`响应式解析

一个`vue`的小`demo`

```javaScript
<template>
  <div>price: {{price}}</div>
  <div>total: {{price * quantity}}</div>
  <div>totalPriceWithSale: {{totalPriceWithSale}}</div>
</template>
<script>
var vue = new Vue({
  el: '#app',
  data: {
    price: 5,
    quantity: 10,
    sum: 0
  },
  computed: {
    totalPriceWithSale() {
      return this.price * 0.8
    }
  },
  watch: {
    price (val) {
      this.sum += val
    }
  }
})
</script>
```

在`vue`中当改变`data`中的`price`, `quantity`, `sum`中的值，其依赖这三个字段的地方就会触发更新，这就是响应式，那么`vue`具体是怎么实现的呢？

由于`vue`中的涉及的功能较多，所以我们先脱离`vue`，从最简单的开始了解

```js
> let price = 5
> let quantity = 10
> let sum = 0
> let totalPriceWithSale = price * 0.8
> let total = price * quantity
> totalPriceWithSale
4
> total
50
> price = 10 // 修改 price 的值为10
10
> totalPriceWithSale // 未改变
4
> total // 未改变
50
```

将`vue`中的代码改写成上面最原始的样子，当我们修改`price`的值为`10`，打印其依赖`price`的变量`totalPriceWithSale`与`total`发现其值并没有改变，然而，在响应式中当`price`改变其依赖该属性的也会发生改变，那进一步优化一下吧, 将每次值更新需要重新执行的代码放在一个函数中,然后放在一个数组中保存起来，值更新后就重新执行函数

```js
let price = 5
let quantity = 10
let sum = 0
let total = 0
let target = null // 当前需要执行的依赖函数
let storage = []
target = () => {
  total = price * quantity
}
function record() {
  storage.push(target)
}
record() // 保存值更新时需要执行的函数
target() // 初始化执行设置 total 值
// 遍历执行函数
function replay() {
  storage.forEach(run => run())
}
price = 20
console.log(total) // 50
replay() // 执行依赖函数
console.log(total) // 200：值更新
```

上面的代码中，`price`的值更新后执行`replay`函数，其依赖`price`的`total`变量的值就进行了更新。还可以将上面的代码中对依赖的收集以及执行使用一个类来进行优化

```js
class Dep{
  constructor() {
    this.subs = []
  }
  depend() {
    if (target && !this.subs.includes(target)) {
      this.susb.push(target)
    }
  }
  notify() {
    this.subs.forEach(run => run())
  }
}
```

使用上面的类对以上的代码来进行优化

```js
let price = 5
let quantity = 10
let sum = 10
let total = 0
const dep = new Dep()
let target = null
target = () => {
  total = price * quantity
}
dep.depend() // 收集依赖
target()
console.log(total) // 50
price = 10 // 修改 price 的值
dep.notify() // 更新其依赖 price 的值
console.log(total) // 100
```

在`vue`中对`data`中每一个属性都进行了`Dep`的实例，用来保存对其的依赖，在依赖的属性改变的时候更新值.现在对依赖收集进行了优化，那么能否对需要`target`进行优化使其复用呢

```js
target = () => {
  total = price * quantity
}
dep.depend() // 收集依赖
target()
```

上面的这段代码，如果监听依赖`price`的另一个变量，则需要进行重写，不能友好的复用

```js
watcher(() => {
  total = price * quantity
})
watcher(() => {
  sum = price + quantity
})
function wathcer(myFun) {
  target = myFun
  dep.depend()
  target()
  target = null
}
console.log(total, sum) // 50 15
price = 10
dep.notify()
console.log(total, sum) // 100 20
```

使用`watcher`能够很好的进行复用，在`watcher`中收集依赖函数，添加依赖。那么又有一个问题，每次修改值都需要手动的去执行`dep.notify()`函数，能不能当值改变的时候自动执行`notify`函数呢。在`vue`中，数据是存放在`data`属性中，该属性返回的是一个对象，可以对对象中的每一个属性进行监听，当获取或者设置值的时候调用相关的函数

```javaScript
let price = 5
let quantity = 10
let sum = 10
let total = 0
let salePrice = 0
// const dep = new Dep()
let target = null
let data = {
  price: 5,
  quantity: 10
}
Object.keys(data).forEach(ele => {
  const dep = new Dep()
  let interVal = data[ele]
  Object.defineProperty(data, ele, {
    get: () => {
      dep.depend()
      console.log(ele, dep.subs)
      // 其中的属性以及subs, price的subs中有3个函数，quantity只有两个
      //   price, Array(1) []
      //   quantity, Array(1) []
      //   price, Array(2) [, ]
      //   quantity, Array(2) [, ]
      //   price, Array(3) [, , ]
      //   price, Array(3) [, , ]
      //   quantity, Array(2) [, ]
      return interVal
    },
    set: (val) => {
      interVal = val
      dep.notify()
    }
  })
})
function watcher(myFun) {
  target = myFun
  target()
  target = null
}
watcher(() => {
  total = data.price * data.quantity
})
watcher(() => {
  sum = data.price + data.quantity
})
watcher(() => {
  salePrice = data.price * 0.7
})
```

## 值为对象时的处理

上面就是响应式的基本原理，现在`data`中的值都为基本的类型值，很容易处理，如果其属性值仍然为对象呢？

值仍然为对象时，那么需要进行递归监听，将`Object.defineProperty`的监听操作进行相应的封装，使用`observe`函数进行值额类型判断
如果其值为对象，则对其中的每个属性设置`getter`与`setter`, 并且在设置`getter`与`setter`之前判断其值的类型，值为对象则继续添加`getter`与`setter`

```javascript
let data = {
  // price: 5,
  // quantity: 10,
  obj: {
    a: 1,
    b: 2,
    c: {
      d: 3
    }
  }
}
function isObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]'
}
function observe(val) {
  if (isObject(val)) {
    const keys = Object.keys(val)
    keys.forEach(key => {
      defineProperty(val, key)
    })
  }
}
function defineProperty(obj, key) {
  const dep = new Dep()
  let internalVal = obj[key]
  observe(internalVal) // 对对象进行深度监听
  Object.defineProperty(obj, key, {
    get: function () {
      // TODO 外层对象改变，内部对象也应该更新依赖
      dep.depend()
      // target 函数为 target = () => { console.log('render obj', data.obj, data.obj.a, data.obj.b, data.obj.c, data.obj.c.d) }
      // obj 被访问5次，向其中添加了5次 watcher 中的 target 函数
      // obj 中的 c 属性，被访问两次，则其对应的 subs 中有两个 watcher 中的 target 函数
      // 为了避免向 subs 中添加重复的 target 函数，需要判断是否存在 this.subs.includes(target)
      console.log(`get key: ${key} dep: ${dep} subs: ${dep.subs}`)
      return internalVal
    },
    set: function(val) {
      internalVal = val
      dep.notify()
    }
  })
}
observe(data)
function watcher(myFun) {
  target = myFun
  target()
  target = null
}
watcher(() => {
  total = data.obj.a + data.obj.b + data.obj.c.d
  // console.log('render obj', data.obj, data.obj.a, data.obj.b, data.obj.c, data.obj.c.d)
})
// 修改其中的每一个属性的值，total 的值
total // 6
data.obj.a = 2
total // 7
data.obj.b = 3
total // 8
data.obj.c.d = 4
total // 9
```

上面对值为对象时进行了循环递归添加，那么当值为数组时怎么处理呢？

## 值为数组时的处理

```javaScript
let data = {
  arr: [1, 2, 3, {a: 4}, [5, 6]]
}
function observer(val) {
  if (isObject(val)) {
    const keys = Object.keys(val)
    keys.forEach(key => defineProperty(val, key))
  } else if(Array.isArray(val)) {
    // 对数组中的每一项绑定
    val.forEach(ele => defineProperty(val,))
  }
}
```

上面的代码中对数组中的每一项都会进行监听，然后在数组的每一项改变的时候都会进行依赖更新，由于数组的数据量可能会很大，这样会比较影响性能（[记一次思否问答的问题思考：Vue为什么不能检测数组变动](https://segmentfault.com/a/1190000015783546#comment-area)）

将上面的代码优化一下，当数组的中的值是基本类型时，不进行监听，引用类型是再进行监听

```javaScript
let data = {
  arr: [1, 2, 3, [4, 5], {a:  7}
}
function observer(val) {
  if (isObject(val) || Array.isArray(val)) {
    addObserver(val)
  }
}
function addObserver(val) {
  if(isObject(val)) {
    const keys = Object.keys(val)
    keys.forEach(key => defineProperty(val, key))
  } else if(Array.isArray(val)) {
    val.forEach(ele => {
      observer(ele)
    })
  }
}
watcher(() => {
  total = data.arr[0] + data.arr[1] + data.arr[2] + data.arr[3][0] + data.arr[3][1] + data.arr[4].a
})
total // 22
data.arr[0] = 2 // 修改其中某个依赖的值
total // 22 未更新
data.arr[3][0] = 5 // 修改数组中的数组中的值
total // 22 未更新
data.arr[4].a = 8 // 修改数组中的对象的某个属性值
total // 25 更新
```

上面的方法没有监听数组中值为基本类型的值，但出现了一个问题，数组内嵌套数组不会被监听到，这也就是在`vue`中直接修改数组内的值或者数组中嵌套的数组中的值不会触发视图更新的原因，但是`vue`给我们提供了一些改变数组值的方法可以触发更新或者`$set`方法

那么`vue`中是怎么做到可以使用数组的方法修改数组以此来触发视图更新的呢？

## 对数组中的方法进行处理

```javaScript
// 用Array原型中的方法创建一个新对象
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)
// 需要进行重写的方法
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
methodsToPatch.forEach(ele => {
  const original = arrayProto[ele]
  Object.defineProperty(arrayMethods, ele, {
    value: function(...args) {
      const result = original.apply(this, args)
      console.log(`调用 ${ele} 方法`)
      return result
    },
    enumerable: false,
    writable: true,
    configurable: true
  })
})
function protoAugment(target, proto) {
  targte.__proto__ = proto
}
function addObserver(val) {
  if (isObject(val)) {
    const keys = Object.keys(val)
    keys.forEach(key => defineProperty(val, key))
  } else if(Array.isArray(val)) {
    protoAugment(val, arrayMethods)
    val.forEach(ele => observe(ele))
  }
}
```

上面的代码执行后，调用`data.arr`数组的`push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`都会打印出对应的提示，这样在调用相应的方法时都可以进行依赖分发。那么，问题又来了，怎么可以拿到依赖的`dep`呢？当我们调用这些方法时，是通过`data.arr.push(3)`这样的方式进行调用的，那么在`push`方法内部就可以通过`this`拿到`data.arr`这个数组，所以我们可以在这个数组中保存所需要的依赖`dep`，然后进行分发即可

```javaScript
let data = {
  arr: [1, 2, 3]
}
function observe(val) {
  if (isObject(val) || Array.isArray(val)) {
    return addObserver(val)
  }
}
function addObserver(val) {
  const dep = new Dep()
  Object.defineProperty(val, '__dep__', {
    value: dep,
    enumerable: false,
    writable: true,
    configurable: true
  })
  if (isObject(val)) {
    const keys = Object.keys(val)
    keys.forEach(key => defineProperty(val, key))
  } else if(Array.isArray(val)) {
    val.forEach(ele => observe(ele))
  }
  return val
}
function defineProperty(val, key) {
  const dep = new Dep()
  const internalVal = val[key]
  const childOb = observe(internalVal) // 获取到值为引用类型的 __dep__
  Object.defineProperty(val, key, {
    get: function() {
      dep.depend()
      if (childOb) {
        childOb.__dep__.depend() // 添加依赖，当调用 push 等方法时进行依赖分发
      }
    },
    set: function(newVal) {
      internalVal = newVal
      dep.notify()
    }
  })
}
methodsToPatch.forEach(ele => {
  const original = arrayProto[ele]
  Object.defineProperty(arrayMethods, ele, {
    value: function(...args) {
      const result = original.apply(this, args)
      const dep = this.__dep__
      console.log(`调用 ${ele} 方法`)
      dep.notity()
      return result
    },
    enumerable: false,
    writable: true,
    configurable: true
  })
})
total // 6
data.arr.push(4)
total // 10 值进行了更新
```
## `vue2`中的响应式
我将`vue2`中对响应式的处理画了一个简单的数据流图，不全面，但可以简单了解下处理过程
![`vue`中响应式数据处理过程](./vue-reactive.jpg)

从上面图中可以大概了解到：
- 在`vue`的生命周期中实例了三种`Watcher`， 分别是`computed`, `watch`, 以及`render`
- 执行`render watcher` 时会触发`Object.defineProperty`中的`get`方法，进行依赖收集
- 对数据响应式的处理都会进行`observe`函数，在该函数中，只有`Array/Object`类型的数据才会进行`new Observer()`
- 在`get`函数中会对对象的属性值进行进一步的`observe`, 如果值为`Array/Object`类型，会向其中添加当前的依赖，当内层的值修改，便可以触发外层的依赖进行更新

### 具体实现分析

当我们在执行`new Vue({...options})`时就是在创建`Vue`的实例，那么在创建实例的过程中会执行`this._init(options)`函数, 如下
```javaScript
function Vue(options) {
  // some code...
  this._init(options)
}
```
在`_init`函数执行中，会对`vue`中的一些值以及生命周期进行初始化
```js
Vue.prototype._init = function (object) {
  // some code...
  // 初始化生命周期, 事件以及 render 函数
  initLifeCycle(vm)
  initEvents(vm)
  initRender(vm)
  // 调用 beforeCreate 生命周期钩子函数
  callHook(vm, 'beforeCreate')
  // 初始化 injections, state, provide
  initInjections(vm)
  initState(vm)
  initProvide(vm)
  // 调用 created 生命周期钩子函数
  callHook(vm, 'created')

  // 判断DOM是否存在，存在则进行挂载
  if (vm.$options.$el) {
    vm.$mount(vm.$options.el)
  }
}
```
在`initState`中对`props`, `methods`, `data`, `computed`, `watch`都进行了初始化，其中对`data`的初始化就是添加了响应式
```js
function initState(vm) {
  // some code
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) initData(vm)
  if (opts.computed) {
    initComputed(vm, opts.computed)
  }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```
对`computed`以及`watch`的处理后面再说，先说对`data`的响应式处理
```js
function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  // some code
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    // some code
    if (!isReserved(key)) {
      proxy(vm, `_data`, key) // 添加代理，将 _data 中的值代理到 this 上
    }
  }
  // observe data
  observe(data, true /* asRootData */)
}
```
在`vue`源码中对响应式的处理分为**依赖收集**以及依赖的**批量派发更新**。下面分情况进行讨论：
#### 依赖收集
在`initData`这个函数中对里面的每一个属性都判断了是否在`props`以及`methods`中重名，重名则发出警告，然后进行了`observe`函数
```js
export function observe (value: any, asRootData: ?boolean): Observer | void {
  // 值不是对象或者是一个 VNode 实例则返回
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob: Observer | void
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) && // 对于可扩展的值才添加响应式，否则设置 getter 与 setter 会报错或无效
    !value._isVue
  ) {
    ob = new Observer(value) // 对值添加实例
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}
```
在 `observe` 函数中，主要是对传入值的一个处理，如果不是对象或者是一个 `VNODE` 实例则直接返回，如果已经存在 `__ob__`属性，则直接取上面的值。如果都不满足，则判断数据类型是不是数组或者对象并且需要该值可扩展。如果是，则进行实例，并将其生成的观察者实例返回

在`vue`的源码中，对数组以及对象进行了不同的处理，下面我们分别进行分析

##### 对对象的处理

```js
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data

  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    // 向传入的值上添加 __ob__ 属性，属性值为该 Observer 实例
    def(value, '__ob__', this)
    // 根据不同的数据类型进行不同的处理
    if (Array.isArray(value)) {
      // 向数组上添加代理处理方法，以此来触发数组的响应式更新
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk (obj: Object) {
    // 遍历对象，对里面的每一个属性添加响应式
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray (items: Array<any>) {
    // 遍历数组里面的每一项，对每一项的数据调用 observe 函数，进行数据判断
    // 如果数组项的值仍为数组或者对象，则继续添加响应式
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}
```
在`Observer`的构造函数中可以看到，对数组以及对象做了不同的处理，那么我们先看对对象的处理.对于对象，遍历里面的每一个属性，向其中添加响应式，也就是执行`defineReactive`函数
```js
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  const dep = new Dep()

  // some code
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        // 当前属性的 dep 中添加依赖
        dep.depend()
        // some code
      }
      return value
    }
  })
}
```
在`defineReactive`函数中为对象的每一个属性创建了一个`Dep`实例，并且使用`Object.defineProperty()`方法向其中添加了`getter`。在`getter`中，如果`Dep.target`存在，则调用`dep.depend()`函数向其中添加依赖。

对对象的响应式的分析大致完成了，那么现在有一个问题，我们可以知道，当设置一个对象的属性值是可以触发`setter`函数，当获取属性时可以触发`getter`函数，那么在`vue`内部什么时候，在什么地方会触发`getter`进行依赖收集呢？让我们回到`_init()`函数中，在该函数执行的最后，调用了`vm.$mount(vm.$options.el)`方法对`DOM`进行了挂载，那么看看`$mount`里面是什么吧
```js
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};
function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  // some code
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (config.performance && mark) {
    // some code
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}
```
可以看到，在上面的代码中，主要调用了`beforeMount`、`beforeUpdate`以及`mounted`钩子函数，除此之外最重要的就是对`Watcher`进行了实例，并向其中传入了`updateComponent`方法。那我们看看在实例`Watcher`过程中发生了什么吧
```js
export default class Watcher {
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  before: ?Function;
  getter: Function;
  value: any;

  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      // some code
    }
    this.value = this.lazy
      ? undefined
      : this.get()
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get () {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      popTarget()
      this.cleanupDeps()
    }
    return value
  }
}
Dep.target = null
const targetStack = []

export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
```
可以看到在实例`Watcher`时，会对传入的参数进行一系列的赋值，最后调用`get`方法，在`get`方法中执行了`pushTarget`函数.在`pushTarget`函数中将当前的`Watcher`实例赋值给了`Dep.target`静态属性。执行完`pushTarget`函数后接着执行了`value = this.getter.call(vm, vm)`这一句，也就是在实例`Watcher`时传入的`updateComponent`方法，那么该方法是什么呢？在上面的`mountComponent`函数中可以看到下面这段代码，这段代码就是创建`VNODE`并且进行渲染更新，在创建`vnode`的过程中，就会获取`data`中的属性值，继而触发属性中的`getter`方法进行依赖更新
```js
updateComponent = function () {
  vm._update(vm._render(), hydrating);
};
```
// TODO: child.dep.depend()作用

##### 对数组的处理
从上面代码中可以看到，在`Observer`构造函数对，对数组主要进行了两个不同的操作，第一个操作是将可以触发响应式的数组方法添加到数组原型上，第二个操作是对数组内的每一个元素进行递归执行`observe`函数，如果里面有嵌套的`Array`或者`Object`类型的数据，继续添加响应式处理

1. 将触发响应式的数组方法添加到数组原型上
```js
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data

  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  walk (obj: Object) {
    // some code
  }

  /**
   * Observe a list of Array items.
   */
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}
```
上面的代码可以看到，并没有直接对数组调用`Object.defineProperty()`来添加依赖，而是对数组做了两件事，第一件事是判断是否有原型对象，如果有原型对象，则将代理方法对象添加到原型对象上，否则直接复制到当前数组上.第二件事是对数组中的每一项的值调用`observe`函数，如果其中值为数组或者对象类型，则递归添加响应式
```js
function protoAugment (target, src: Object) {
  /* eslint-disable no-proto */
  target.__proto__ = src
  /* eslint-enable no-proto */
}
function copyAugment (target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}
```
在上面的代码中，也就是将一个`src`赋值给`target.__proto__`，或者遍历`src`中的`keys`，直接将属性添加到数组上。那么其中的`src`到底是什么呢？上面的代码展示看出来，`src`为`arrayMethods`，那么这个参数在哪里呢？在`core/instance/observer/array.js`中可以查看到具体内容
```js
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // 缓存原生数组方法
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    // 使用原生数组方法执行
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 如果是插入新元素，则对新添加的元素添加响应式
    if (inserted) ob.observeArray(inserted)
    // 触发更新
    ob.dep.notify()
    return result
  })
})
export function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}
```
上面的代码是对数组的可响应的方法的处理过程，它首先拿到了`Array`原型对象，并且用该对象作为原型创建了一个新对象。然后对数组中的一个操作方法进行遍历，将每一个方法代理到新创建的对象中，并且对新加入的值添加响应式以及依赖更新

上面的操作中对数组的处理并没有直接向数组添加响应式，而是使用了代理方法`push`等来触发依赖更新，那么依赖是什么时候添加进行的呢？这是一个很重要的问题！！！

我们重新看看上面的代码，发现在上面的代码中有这么一行`ob.dep.notify()`，而`const ob = this.__ob__`，那么`this`是什么呢？了解`this`的用法会知道`this`指向当前的调用对象，也就是数组。那么这个数组的依赖时什么时候添加的呢？让我们在回头去看看在`Object.defineProperty`中的`getter`函数
```js
let childOb = !shallow && observe(val)
Object.defineProperty(obj, key, {
  enumerable: true,
  configurable: true,
  get: function reactiveGetter () {
    const value = getter ? getter.call(obj) : val
    if (Dep.target) {
      dep.depend()
      if (childOb) {
        childOb.dep.depend()
        if (Array.isArray(value)) {
          dependArray(value)
        }
      }
    }
    return value
  })
```
在上面的函数中可以看到在触发`getter`时，不仅向当前的`dep`实例中添加了依赖，还向`childOb`添加了依赖，而`childOb`是什么呢？`childOb`是执行`observe(val)`函数的返回值，也就是说如果当前属性的值是一个数组或者对象，就会在当前值上添加一个`__ob__`属性，值为`Observer`实例且将该实例返回，赋值给`childOb`。假设有如下对象：
```js
const data = {
  a: [1, 2, 3]
}
```
那么添加响应式后，该对象如下：
```js
const data = {
  a: [
    0: 1,
    1: 2,
    2: 3,
    __ob__: {...}
  ],
  __ob__: {...}
}
```
上面属性为`a`的数组中的`__ob__`属性就是在执行`Object.defineProperty(data, 'a')`的`getter`函数时，执行`let childOb = !shallow && observe(val)`时添加的，并且此时`childOb`就等于`data.a.__ob__`。然后执行`childOb.dep.depend()`方法。在`Observe`构造函数实例的时候，会对`Dep`进行实例，里面保存一个依赖对象，如果该数组的值为数组或者对象，则同时向其中添加依赖。

也就是说依赖不仅添加到对象属性的`dep`实例这个“筐”中，如果该属性的值是数组或者对象值，那么还会同时加到其中的`__ob__`的`dep`实例这个“筐”中。这两个“筐”中的依赖的触发时机是不同的。第一个“筐”是在该属性的值被修改的时候触发，第二个“筐”里收集的依赖是在使用`$set`、`Vue.set`或者调用数组的`push`等方法时进行触发的。使用这种方式第一可以处理对数组修改的派发更新，第二可以处理对对象新添加属性的派发更新（也就是使用`$set`的情况）
#### 依赖派发更新



参考：
- [Vue技术内幕](http://caibaojian.com/vue-design/art/7vue-reactive.html#definereactive-%E5%87%BD%E6%95%B0)
- [Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/prepare/)


## 仿照`vue2`的简单响应式

```javaScript
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
/**
 * 观察类，添加了观察类的值是可以被观察到的，也就是响应式的
 * 在该类中对数组以及对象做不同的处理
 */
class Observer {
  constructor(val) {
    this.val = val
    def(val, '__ob__', this)
    this.dep = new Dep()
    if (Array.isArray(this.val)) {
      // TODO: 1. 对数组原型方法的处理
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
      let childOb = observer(internalVal)
      Object.defineProperty(value, key, {
        enumerable: true,
        configurable: true,
        get: function() {
          dep.depend()
          if (childOb) {
            // TODO:3. 为 $set 使用，直接给对象添加属性可能不会触发响应式，使用 $set 可以为其添加依赖
            childOb.dep.depend()
            // TODO:2. 对值为数组的处理，遍历数组，递归添加依赖，以便后续使用 push, pop等方法可以进行更新
          }
          return internalVal
        },
        set: function(newVal) {
          internalVal = newVal
          childOb = observer(newVal) // 为刚设置的值添加监听
          dep.notify()
        }
      })
    })
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
  arr: [1, 2, [3, 4, 5]],
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
      } else {
        totalArr += ele
      }
    })
  }
  sum(data.arr)
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

// totalArr notify 15
// totalObj notify abdh
// data.obj.a = 'b' 修改对象中的属性值，触发监听 notify
// totalObj notify bbdh
// "b"
// data.arr[0] = 1 修改数组中某个值为基本类型值的索引值，不触发监听
// 1
// data.arr[2] = [1, 2, 3]
// Array(3) [1, 2, 3]
// data.arr = [4, 5, 6] 将整个数组修改为其他值，触发监听
// totalArr notify 15
// Array(3) [4, 5, 6]
// data.obj.c.e.h = 'g': 
// totalObj notify bbdg
// data.arr = [4, 5, [6, 7, 8]]
// totalArr notify 30
// Array(3) [4, 5, Array(3)]
// data.arr[2] = [9, 10, 11] 直接使用索引修改数组中某一项的值，不会触发更新
// Array(3) [9, 10, 11]
```
- `resolve TODO 1`
```javaScript
// 将数组的实例原型指向数组方法代理对象，调用代理对象中的方法，触发更新
let arrayProto = Array.prototype
let arrayMethods = Object.create(arrayProto)
let methodsToPatch = [
  'push',
  'pop'
  'slice'
  // ...
]
methodsToPatch.forEach(function (method) {
  let original = arrayProto[method]
  def(arrayMethods, method, function(...args) {
    let result = original.apply(this, args)
    this.__ob__ && this.__ob__.dep.notify()
    return result
  })
})
class Observer {
  constructor(val) {
    this.val = val
    def(val, '__ob__', this)
    this.dep = new Dep()
    if (Array.isArray(this.val)) {
      // 将数组实例的原型设置为代理对象
      val.__proto__ = arrayMethods
      this.observerArray(val)
    } else {
      this.walk(val)
    }
  }
}
// data.arr[0] = 2 : 直接根据索引值修改值不会触发更新
// data.arr.push(7) : 使用 push 方法向 arr 方法添加值，触发更新
// totalArr notify 22 
// data.arr[2].push(8) : 未触发更
// data.arr[2].push(6): 调用实例中的代理方法可以触发更新
// totalArr notify 21
```
在上面中对`data.arr`使用`push`方法触发了更新，而对`data.arr[2]`中的数组使用`push`方法没有触发更新，这是为什么呢？我们打印`arr`的值看看
```javaScript
// arr:Array(3)
//   __ob__:Observer {val: Array(3), dep: Dep}
//     dep:Dep {subs: Array(1)} 有依赖
//     val:Array(3) [1, 2, Array(3)]
//     __proto__:Object {constructor: , observerArray: , walk: }
//   length:3
//   __proto__:Array(0) [, …]
//   0:1
//   1:2
//   2:Array(3) [3, 4, 5]
//     __ob__:Observer {val: Array(3), dep: Dep}
//       dep:Dep {subs: Array(0)} 数组中的数组没有添加上依赖
//       val:Array(3) [3, 4, 5]
//       __proto__:Object {constructor: , observerArray: , walk: }
//     length:3
//     __proto__:Array(0) [, …]
//     0:3
//     1:4
//     2:5
```
从上面打印的结果可以看出，`data.arr`中的`__ob__`中的`dep`包含依赖，而`data.arr[2]`的数组上的`__ob__`的`dep`中没有依赖项，所以没有依赖可以更新，为了解决这个问题，就需要在添加依赖时，判断值如果为数组，则进行遍历递归添加依赖，如下

- `resolve TODO 2`
在值为数组时依次遍历，向其中添加依赖
```javascript
Object.defineProperty(value, key, {
  enumerable: true,
  configurable: true,
  get: function() {
    dep.depend()
    if (childOb) {
      childOb.dep.depend()
      // 对数组内的值进行遍历添加依赖，内层的值更新
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
function dependArray(arr) {
  for(let i = 0; i < arr.length; i++) {
    let e = arr[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}
// arr:Array(3)
//   __ob__:Observer {val: Array(3), dep: Dep}
//   length:3
//   __proto__:Array(0) [, …]
//   0:1
//   1:2
//   2:Array(3) [3, 4, 5]
//     __ob__:Observer {val: Array(3), dep: Dep}
//     dep:Dep {subs: Array(1)}
//       subs:Array(1) [] : 遍历数组中的每一项的值，如果值存在 __ob__，就向 __ob__ 的dep中添加依赖，以便后面调用数组方法时可以进行依赖更新
//       __proto__:Object {constructor: , depend: , notify: }
//       val:Array(3) [3, 4, 5]
//     __proto__:Object {constructor: , observerArray: , walk: }
//     length:3
//     __proto__:Array(0) [, …]
//     0:3
//     1:4
//     2:5

// data.arr.push(4)
// totalArr notify 19 触发更新
// data.arr[2].push(6)
// totalArr notify 25 触发更新
```

// TODO: vue3 中的响应式

以上内容为本人理解，如有不对处，请指正

参考：
- [Build a Reactivity System - Advanced Components | Vue Mastery](https://www.vuemastery.com/courses/advanced-components/build-a-reactivity-system/)
