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
  observe(internalVal)
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

上面的代码中对数组中的每一项都会进行监听，然后在数组的每一项改变的时候都会进行依赖更新，由于数组的数据量可能会很大，这样会比较影响性能（我暂时是这么认为的）

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


## `Vue`中的响应式
