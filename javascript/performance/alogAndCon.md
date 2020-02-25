# 算法与流程控制
代码的组织结构和解决问题的思路是影响代码性能的主要原因
## 循环
一般有下面几种循环语句
- `for(let i = 0; i < len; i++) {}`
- `var i = 0; while(i < len) { i++ }`
- `var i = 0; do {} while(i++ < len) `
- `for(var prop in obj) {}`
- 基于函数的迭代`arr.forEach(function(value, index, array) {})`

在上面几种循环中，`for-in`循环比其他几种明显要慢，因为每次迭代操作会同时搜索实例以及原型属性，`for-in`循环的每次迭代都会产生更多的开销。因此应该尽量避免使用`for-in`循环

除此之外，基于函数的迭代`forEach`等迭代函数会比基于循环的迭代要慢一些，对于每个数组项调用外部方法所带来的开销是速度减慢的主要原因


除了`for-in`循环，其他几种循环类型的速度相差不多，所以性能与循环语句无关，而与下面两种因素有关：
- 每次迭代处理的事务
- 迭代的次数

#### 减少每次迭代处理的事务
由于性能与每次迭代处理的事务密切相关，所以，要提高性能，就需要尽可能的减少每次迭代所处理的事务，主要有下面两种方法
- 减少对象成员及数组项的查找次数
  ```javaScript
  // items的length属性没有改变，缓存为局部变量可以优化性能
  for(var i = 0, len = items.length; i < len; i++) {}
  ```
- 颠倒数组的顺序来提高循环性能
  ```javaScript
  // 使用倒序循环，并把减法操作放在控制条件中，每个控制条件只是简单的与零比较，控制条件从两次比较减少到一次比较，可以调高性能
  for(var i = items.length; i--; ) {}
  ```

性能测试
```javaScript
const randomData = require('../../dataStructure/sort/randomData.json')

// 普通循环
// commonCircle: 2.679ms
console.time('commonCircle')
for(let i = 0; i < randomData.length; i++) {}
console.timeEnd('commonCircle')

// 优化对对象的查找
// optimizeCircle1: 1.371ms
console.time('optimizeCircle1')
for(let i = 0, len = randomData.length; i < len; i++) {}
console.timeEnd('optimizeCircle1')
// 优化对对象变量的引用查找操作后会减少一半的时间

// 颠倒执行顺序
// optimizeCircle2: 1.179ms
console.time('optimizeCircle2')
for (let i = randomData.length; i--;) {}
console.timeEnd('optimizeCircle2')
```

#### 减少迭代的次数
减少迭代次数能获得更加显著的性能提升，最广为人知的是一种限制循环迭代次数的模式，被称为”达夫模式“，但该模式在老版本的浏览器中优化性能能得到大幅度的提升，而新版的浏览器引擎对循环迭代进行了更强的优化，所以”达夫设备“能实现的优化效果日趋减弱甚至于没有


## 条件语句
条件语句主要为`if-else`与`switch`，流行的方法是基于测试条件的数量来判断：条件数量越大，越倾向于使用`switch`而不是`if-else`.在大多数情况下`switch`比`if-else`运行的要快，但只有当条件数量很大时才明显。这两个语句的主要性能区别是：当条件增加的时候，`if-else`性能增加的程度比`switch`要多

#### 优化`if-else`
## 递归

## 小结