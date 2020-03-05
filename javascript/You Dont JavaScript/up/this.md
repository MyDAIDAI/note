# `this`全面解析
每个函数的`this`是在调用时被绑定的，完全取决于函数的调用方式，下面是几种绑定规则

## 默认规则
独立函数调用时绑定默认规则，或者在无法应用其他规则时的默认规则
```javaScript
function foo() {
  console.log(this.a)
}
var a = 'global'
foo() // global
```

## 隐式绑定
当函数调用时有调用上下文对象，或者说是否被某个对象拥有或者包含
```javaScript
function foo() {
  console.log(this.a)
}
var obj = {
  a: 2,
  foo: foo
}
var obj1 = {
  a: 3,
  obj: obj
}
obj.foo() // 2
obj1.obj.foo() // 2: 对象属性引用链中只有上一层或者说最后一层在调用位置中起作用
```
### 隐式丢失
```javaScript
var bar = obj.foo
bar() // undefined

// 参数传递是一种隐式赋值，因此传入的参数也会被隐式赋值
function doFoo(fn) {
  fn()
}
doFoo(obj.foo) // undefined
setTimeout(obj.foo, 1000); // undefined
```

## 显式绑定
可以使用函数的`call(..)`和`apply(..)`方法来显式进行绑定
```javaScript
function foo() {
  console.log(this.a)
}
var obj = {
  a: 'obj'
}
foo.call(obj) // obj
foo.apply(obj) // obj
```

### 硬绑定
```javaScript
var bar = function() {
  foo.call(obj)
}
bar() // obj
setTimeout(bar, 1000) // obj
bar.call({
  a: 'bar'
}) // obj
```
上面的代码中将foo的this强制绑定了obj, 无论之后如何调用函数bar, 它总会手动在obj上调用foo。这种绑定是一种显式的强制绑定，称之为硬绑定，有以下应用场景
- 创建一个包裹函数，负责接收参数并返回值
```javaScript
function foo(params) {
  console.log(this.a, params)
  return this.a + params
}
var obj = {
  a: 2
}
var bar = function () {
  return foo.apply(obj, arguments)
}
console.log('bar', bar(3)) // 5
```
- 创建一个可以重复使用的辅助函数
```javaScript
function bind(fn, obj) {
  return function() {
    return fn.apply(obj, arguments)
  }
}
var bar1 = bind(foo, obj)
console.log('bar1()', bar1(1)) // 3
```
由于硬绑定是一种非常常用的模式，所以在ES5中提供了内置的`Function.prototype.bind`方法

## new 绑定
```javaScript
function foo(a) {
  this.a = a
}
var bar = new foo(2)
console.log('bar', bar.a) // 2
```

## 优先级
默认规则优先级最低
- 显式绑定 > 隐式绑定
```javaScript
function foo() {
  console.log(this.a)
}
var obj1 = {
  a: 2,
  foo: foo
}
var obj2 = {
  a: 3,
  foo: foo
}
obj1.foo.call(obj2) // 3: 显式绑定大于隐式绑定
```
- new 绑定 > 隐式绑定
```javaScript
function foo(a) {
  this.a = a
}
var obj1 = {
  foo: foo
}
// var obj2 = {}
var bar = new obj1.foo(3)
console.log(bar.a, obj1.a) // 3 undefined: new 绑定大于隐式绑定
```
- new 绑定 > 显式绑定
```javaScript
function foo(a) {
  this.a = a
} 
var obj1 = {}
var bar = foo.bind(obj1)
var baz = new bar(2)
console.log(baz.a, obj1.a) // 2 undefind: new 绑定大于显式绑定
```
`MDN`上的`Bind`的函数实现
```javaScript
Function.prototype.bind = function(oThis) {
  if (typeof this !== 'function') {
    throw new TypeError('函数才能调用...')
  }
  let fToBind = this
  let fNOP = function () {}
  let aArgs = Array.prototype.slice.call(arguments, 1)
  let fBound = function () {
    return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)))
  }
  return fBound
}
```
## 判断this
- 函数是否在new 中调用，如果是的话 this 绑定的是新创建的对象（new 绑定）
- 函数是否通过 call, apply 或者硬绑定调用，如果是的话，this 绑定的是指定的对象(显式绑定)
- 函数是否在某个上下文对象中调用 ？ 如果是的话，this 绑定的是那个上下文对象（隐式绑定）
- 如果上面都不是，则使用默认绑定，在严格模式下绑定到 undefined, 否则绑定到 全局对象

## 绑定例外
- 被忽略的this
```javaScript
function foo() {
  console.log(this.a)
}
var a = 2
foo.call(null)
```
上面的代码中将`null`或者使用`undefined`来作为`this`的绑定对象传入，会应用默认规则，使用这种方法可能会产生一种副作用。如果某个函数中确实使用了this，那么这样使用会使其绑定到全局对象上。更安全的做法是传入一个特殊的对象，比如`Object.create(null)`
- 间接引用
```javaScript
function foo() {
  console.log(this.a)
}
var a = 2
var o = {
  a: 3,
  foo: foo
}
var p = {
  a: 4
}
(p.foo = o.foo)() // 2: p.foo = o.foo 返回目标对象的引用，相当于直接调用 foo()
```

## 箭头函数
箭头函数是根据外层（函数或者全局）作用域来决定`this`

## 小结
this的值由函数的调用方式决定，可以顺序应用下面这几条规则来判断
- 由new调用，绑定到新创建的对象
- 由call，apply或者bind调用，绑定到指定的对象
- 由上下文对象调用，绑定到该上下文对象
- 默认：在严格模式下绑定到 undefined, 否则绑定到全局对象
- 箭头函数绑定到外层作用域

> 注意：将 null 或者 undefined 传入 call, apply 或者bind中可能会无意使用默认规则，如果想要更加安全的忽略 this 绑定，可以传入 `Object.create(null)` 这个对象


参考：以上内容来源于 《你不知道的 JavaScript》上卷