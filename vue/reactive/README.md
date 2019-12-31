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

上面就是响应式的基本原理，基本的了解之后，再去看源码中对特殊数据类型的处理，比如属性值为对象或者数组时的情况