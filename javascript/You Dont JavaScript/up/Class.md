# 混合对象“类”

类设计模式
- 实例化
- 继承
- 多态：父类的通用行为可以被子类更特殊的行为重写

## 混入

### 显式混入
```javaScript
function mixin(source, target) {
  for(var key in source) {
    if (!(key in target)) {
      target[key] = source[key]
    }
  }
  return target
}
var Vehicle = {
  engines: 1,
  ignition: function() {
    console.log('Turning on my engine')
  },
  drive() {
    this.ignition()
    console.log('steering and moveing forward')
  }
}
var car = mixin(Vehicle, {
  wheels: 4,
  drive: function() {
    Vehicle.drive.call(this)
    console.log('Rolling on all ' + this.wheels + ' wheels')
  }
})
car.drive()
```
#### 寄生继承
```javaScript
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
```
### 隐式混入
```javaScript
var something = {
  cool: function() {
    this.greeting = 'hello world'
    this.count = this.count ? this.count++ : 1
  }
}
var another = {
  cool: function () {
    // 隐式把 something 混入 another
    something.cool.call(this)
  }
}
something.cool()
console.log(something.greeting)
console.log(something.count)
another.cool()
console.log(another.greeting)
console.log(another.count)
```

## 小结
- 类是一种设计模式，许多语言都提供了对于面向类软件设计的原生语法，`js`提供了类似的语法，但与其他语言不同
- 类意味着复制
- 传统的类被实例化时，它的行为会被复制到实例中。类被继承时，行为也会被复制到子类中
- 多态（在继承链的不同层次名称相同但功能不同的函数）看起来似乎是从子类引用父类，但是本质上引用的起始是复制的结果
- `js`并不会自动创建对象的副本
- 混入模式可以用来模拟类的复制行为，但是会让代码更加难懂并且难以维护
- 显式混入无法完全模拟类的行为，因为对象和函数只能复制引用，无法复制被引用的对象或者函数本身。这一点会导致许多问题


上面内容来自于 《你不知道的 JavaScript》