# 原型

## `[[Prototype]]`
当试图引用对象的属性时就会触发`[[Get]]`操作，对于默认的`[[Get]]`操作来说，第一步就是检查对象本身是否有这个属性，如果有就使用它，如果没有，就需要使用对象的`[[Prototype]]`
```javaScript
var anotherObject = {
  a: 2
}
var b = Object.create(anotherObject)
console.log(b.a) // 2 对象本身属性中没有，向上查找原型链得到
```
查找过程会持续到找到匹配的属性名或者查找完整条`[[Prototype]]`链

使用`for...in`遍历对象时原理和查找`[[Prototype]]`链类似，任何可以通过原型链访问到并且`enumerable`为`true`的属性都会被枚举。使用`in`操作符来检查属性在对象中是否存在，同样会查找对象的整条原型链（无论属性是否可枚举）
```javaScript
var anotherObject = {
  a: 2
}
var b = Object.create(anotherObject)
b.c = 3
var c = Object.create(b)
for(var key in c) {
  console.log(key) // c a : 依次顺着原型链向上查找
}
```

### `Object.prototype`
所有普通的`[[Prototype]]`链最终都会指向内置的`Object.prototype`

### 属性设置和屏蔽
```javaScript
myobject.foo = 'bar'
```
给一个对象设置属性并不仅仅是添加一个新属性或者修改已有的属性值。
- 如果`myObject`对象中包含名为`foo`的普通数据访问属性，这条赋值语句只会修改已有的属性值
- 如果`foo`不是直接存在于`myObject`中，`[[Prototype]]`链就会被遍历，类似`[[Get]]`操作，如果原型链上找不到`foo`, `foo`就会被直接添加到`myObject`上
- 如果属性名既出现在`myObject`上，也出现在`[[Prototype]]`上，那么就会发生屏蔽。`myObject`中包含的`foo`属性会屏蔽原型链上层的所有`foo`属性
- 如果`foo`不直接存在于`myObject`中而是存在于原型链的上层
  - 如果在`[[Prototype]]`链上层存在名为`foo`的普通访问器属性并且**没有**被标记为只读，那么会就直接在`myObject`中添加`foo`属性（它是屏蔽属性）
  - 如果在`[[Prototype]]`链上层存在名为`foo`的普通访问器属性并且**被标记**为只读，那么无法修改已有属性或者在`myObject`上创建屏蔽属性。严格模式会抛出错误，非严格模式会忽略该赋值语句
  - 如果在`[[Prototype]]`链上层存在名为`foo`并且它是一个`setter`，那么会调用该`setter`。`foo`不会被添加到`myObject`上，也不会重新定义`foo`的`setter`
  ```javaScript
  var anotherObject = {
  }
  Object.defineProperty(anotherObject, 'a', {
    value: 2,
    writable: false
  })
  var b = Object.create(anotherObject)
  b.a = 3 // 原型链上有且不可写，该语句被忽略
  console.log(b.a) // 2
  ```