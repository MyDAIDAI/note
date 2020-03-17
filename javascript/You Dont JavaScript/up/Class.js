// // 交通工具类
// class Vehicle {
//   constructor() {
//     this.engines = 1
//   }
//   ignition() {
//     console.log('Turning on my engine')
//   }
//   drive() {
//     this.ignition()
//     console.log('steering and moveing forward')
//   }
// }
// // 汽车类
// class Car extends Vehicle {
//   constructor() {
//     super()
//     this.wheels = 4
//   }
//   dirve() {
//     super.dirve()
//     console.log('Rolling on all ' + this.wheels + ' wheels') // ? 为什么没有执行？
//   }
// }
// let car = new Car(4)
// car.drive()

// 显式混入
// function mixin(source, target) {
//   for(var key in source) {
//     if (!(key in target)) {
//       target[key] = source[key]
//     }
//   }
//   return target
// }
// var Vehicle = {
//   engines: 1,
//   ignition: function() {
//     console.log('Turning on my engine')
//   },
//   drive() {
//     this.ignition()
//     console.log('steering and moveing forward')
//   }
// }
// var car = mixin(Vehicle, {
//   wheels: 4,
//   drive: function() {
//     Vehicle.drive.call(this)
//     console.log('Rolling on all ' + this.wheels + ' wheels')
//   }
// })
// car.drive()
// 寄生继承
function Vehicle() {
  this.engines = 1
}
Vehicle.prototype.ignition = function () {
  console.log('Turning on my engine')
}
Vehicle.prototype.drive = function() {
  this.ignition()
  console.log('steering and moveing forward')
}
function Car() {
  var car = new Vehicle()
  car.wheels = 4
  var vehDrice = car.drive
  car.drive = function () {
    vehDrice.call(this)
    console.log('Rolling on all ' + this.wheels + ' wheels')
  }
  return car
}
var car = new Car()
car.drive()
var something = {
  cool: function() {
    this.greeting = 'hello world'
    this.count = this.count ? this.count++ : 1
  }
}
var another = {
  cool: function () {
    something.cool.call(this)
  }
}
something.cool()
console.log(something.greeting)
console.log(something.count)
another.cool()
console.log(another.greeting)
console.log(another.count)