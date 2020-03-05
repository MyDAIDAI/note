// 默认绑定
// function foo() {
//   console.log(this.a)
// }
// var a = 'global'
// foo()

// 隐式绑定
// function foo() {
//   console.log(this.a)
// }
// var obj = {
//   a: 2,
//   foo: foo
// }
// var obj1 = {
//   a: 3,
//   obj: obj
// }
// obj.foo() // 2
// obj1.obj.foo() // 2
// 隐式丢失
// var bar = obj.foo
// bar() // undefined

// function doFoo(fn) {
//   // 参数传递是一种隐式赋值，因此传入的参数也会被隐式赋值
//   fn()
// }
// doFoo(obj.foo) // undefined
// setTimeout(obj.foo, 1000); // undefined

// 显式绑定
// 使用call(), apply() 进行绑定
// function foo() {
//   console.log(this.a)
// }
// var obj = {
//   a: 'obj'
// }
// foo.call(obj) // obj
// foo.apply(obj) // obj
// 硬绑定
// 将foo的this强制绑定了obj, 无论之后如何调用函数bar, 它总会手动在obj上调用foo
// var bar = function() {
//   foo.call(obj)
// }
// bar() // obj
// setTimeout(bar, 1000) // obj
// bar.call({
//   a: 'bar'
// }) // obj
// 硬绑定的应用
// 1. 创建包裹函数，负责接收参数并且返回
// function foo(params) {
//   console.log(this.a, params)
//   return this.a + params
// }
// var obj = {
//   a: 2
// }
// var bar = function () {
//   return foo.apply(obj, arguments)
// }
// console.log('bar', bar(3)) // 5
// 2. 创建一个可以重复使用的辅助函数
// function bind(fn, obj) {
//   return function () {
//     return fn.apply(obj, arguments)
//   }
// }
// var bar1 = bind(foo, obj)
// console.log('bar1()', bar1(1)) // 3
// 由于硬绑定是一种非常常用的模式，所以ES5提供了内置的方法Function.prototype.bind


// new 绑定
// function foo(a) {
//   this.a = a
// }
// var bar = new foo(2)
// console.log('bar', bar.a) // 2

// 优先级
// 显式绑定 > 隐式绑定
// function foo() {
//   console.log(this.a)
// }
// var obj1 = {
//   a: 2,
//   foo: foo
// }
// var obj2 = {
//   a: 3,
//   foo: foo
// }
// obj1.foo.call(obj2) // 3: 显式绑定大于隐式绑定
// new 绑定 > 隐式绑定
// function foo(a) {
//   this.a = a
// }
// var obj1 = {
//   foo: foo
// }
// // var obj2 = {}
// var bar = new obj1.foo(3)
// console.log(bar.a, obj1.a) // 3 undefined: new 绑定大于隐式绑定
//new 绑定 > 显式绑定
// function foo(a) {
//   this.a = a
// } 
// var obj1 = {}
// var bar = foo.bind(obj1)
// var baz = new bar(2)
// console.log(baz.a, obj1.a) // 2 undefind: new 绑定大于显式绑定
// // MDN上的Bind函数实现
// Function.prototype.bind = function(oThis) {
//   if (typeof this !== 'function') {
//     throw new TypeError('抛出参数类型错误')
//   }
//   var aArgs = Array.prototype.slice.call(arguments, 1)
//   var fToBind = this
//   var fNOP = function () {}
//   var fBound = function () {
//     // 使用new操作符调用，则 this instanceof fNOP 为true, 返回实例 this, 否则，使用传入 this
//     return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)))
//   }
//   return fBound
// }


// 判断 this
// 1. 函数是否在new 中调用，如果是的话 this 绑定的是新创建的对象（new 绑定）
// 2. 函数是否通过 call, apply 或者硬绑定调用，如果是的话，this 绑定的是指定的对象(显式绑定)
// 3. 函数是否在某个上下文对象中调用 ？ 如果是的话，this 绑定的是那个上下文对象（隐式绑定）
// 4. 如果上面都不是，则使用默认绑定，在严格模式下绑定到 undefined, 否则绑定到 全局对象

// 绑定例外
// 将 null, undefined 传入 call, apply, 或者bind时会被忽略，应用默认绑定规则
// 间接引用
// function foo() {
//   console.log(this.a)
// }
// var o = {
//   a: 3,
//   foo: foo
// }
// var p = {
//   a: 4
// }
// (p.foo = o.foo)()

// 箭头函数
// 箭头函数的this值指向外层包裹函数