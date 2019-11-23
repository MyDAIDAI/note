// 构造函数继承
// 缺点：拿不到原型上的方法，构造函数中的方法每次都会被创建，不能在实例中进行共享
// function Super() {
//     this.name = 'super'
//     this.data = [1]
// }
// Super.prototype.getSuperName = function() {
//     console.log(this.name)
// }
// function Sub() {
//     Super.call(this)
//     this.name = 'sub'
// }
// Sub.prototype.getSubName = function () {
//     console.log(this.name)
// }
// var sub1 = new Sub()
// var sub2 = new Sub()
// console.log('sub', sub1, sub2)

// 原型链继承: 将属性全部放在原型链上继承，则原型链上的所有属性与方法会被共享，引用类型会被所有实例修改
// function Super() {
// }
// Super.prototype.name = 'super'
// Super.prototype.data = [1]
// Super.prototype.getSuperName = function () {
//     console.log(this.name)
// }
// function Sub() {
//     this.name = 'sub'
// }
// // 直接将子类的原型指向父类的原型，那么修改子类的原型会造成父类原型被修改
// // Sub.prototype = Super.prototype
// Sub.prototype = new Super()
// Sub.prototype.getSubName = function () {
//     console.log(this.name)
// }
// var sub = new Sub()
// console.log('sub', sub)

// 组合继承：将需要每个实例单独的属性放在构造函数中，需要共享的放在原型中
// 缺点：Super被调用了两次，子类原型不需要拿到父类构造函数中的属性
// function Super() {
//     this.data = [1]
// }
// Super.prototype.getSuperData = function () {
//     console.log(this.data)
// }
// function Sub(name) {
//     Super.call(this)
//     this.name = name
// }
// Sub.prototype = new Super()
// Sub.prototype.getSubName = function () {
//     console.log(this.name)
// }
// var sub = new Sub('sub')
// console.log('sub', sub)

// 寄生组合：创建一个新的构造函数，将该构造函数的原型指向父类的原型，并返回该构造函数的实例
// 避免了直接引用父类原型造成的对父类原型的修改，以及引用父类的实例，造成多次调用
// 由于直接将子类的原型指向其他原型，则原型中的constructor被覆盖，需要手动添加
// inherit在ES6中可以使用 Object.create(prototype)代替, Object.create(null)可以创建原型不存在的对象
function inherit(prototype) {
  var Fn = function () {}
  Fn.prototype = prototype
  return new Fn()
}
function Super() {
  this.data = [1]
}
Super.prototype.getSuperData = function () {
  console.log('data', this.data)
}
function Sub(name) {
  Super.call(this)
  this.name = name
}
Sub.prototype = inherit(Super.prototype)
Sub.prototype.getSubName = function () {
  console.log(this.name)
}
Sub.prototype.constructor = Sub
var sub = new Sub('sub')
console.log('sub', sub)
