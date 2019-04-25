# `let & const`

## `let`命令

### 基本用法
`let`用来声明变量，用法类似于`var`，但由一下区别
- `let`所声明的变量只在代码块内有效
  ```javascript
  {
    let a = 10
    var b = 5
  }
  // a ReferenceError: a is not defined
  // b 5
  for (let i = 0; i < 10; i++) {}
  //  i ReferenceError: i is not defined
  var a = []
  for (var i = 0; i < 10; i++) {
    a[i] = function () {
      console.log(i)
    }
  }
  // a[6]()
  // 10 : var 声明的变量没有块级作用域，所以 i 为全局变量，每次循环都为全局变量赋值，数组a的函数内部保存的变量i指向的也为全局变量i
  var a = []
  for (let i = 0; i < 10; i++) {
    a[i] = function () {
      console.log(i)
    }
  }
  // a[6]()
  // 6 : 变量i使用let进行声明，每次循环的变量i都是一个新的变量，所以数组a的函数内部保存的是当前块作用域的变量i
  for (var i = 0; i < 10; i++) {
   (function () {
		var j = i
      setTimeout(function () {
        console.log(j)
      }, 0)
    })()
  }
  // 0 ~ 9
  for (var i = 0; i < 10; i++) {
    {	
      let j = i
      setTimeout(function () {
        console.log(j)
      }, 0)
    }
  }
  // 0 ~ 9
  // 每一次for循环都会在内部创建一个作用域，setTimeout引用的为内部作用域中的变量，而非全局变量i
  ```
- `let`不存在变量提升
  ```javascript
  console.log(d) // undefined
  var d = 1
  console.log(e) // ReferenceError: e is not defined
  let e = 2
  // 上面的代码中，使用 var 声明的变量会发生变量提升，所以输出 undefined, 使用 let 声明的变量不会发生变量提升，则报错
  ```
- 暂时性死区
  ```javascript
  var tmp = 123
  if (true) {
    tmp = 456
    let tmp
  }
  // ReferenceError: tmp is not defined
  // ES6明确规定，如果区块中存在 let 和 const 命名，这个区块对这些命令声明的变量从一开始就会形成一个封闭作用域。凡是在声明之前就是用这些变量的，就会报错
  // 在代码块内，使用 let 命名声明变量之前，该变量都是不可用的。在语法上称为暂时性死区
  ```
  - 在`let`声明的变量前使用`typeof`会报错
    ```javascript
    typeof undeclaredVaribale
    // "undefined" : typeof 对于未声明的变量输出 undefined，不会报错
    typeof zz 
    let zz
    // Uncaught ReferenceError: zz is not defined：typeof 对于使用 let 声明并且处于暂时性死区的变量会报错
    ```
  -  其他问题
    ```javascript
    function bar(x = y, y = 2) {
      return [x, y]
    }
    bar()
    // ReferenceError: y is not defined
    var qq = qq;
    let dd = dd;
    // ReferenceError: dd is not defined

    // 上面的报错也是因为暂时性死区，在使用let声明语句之前就是用了变量
    ```
  总之，暂时性死区的本质就是只要一进入当前作用域，在该作用域中使用`let`声明的变量就已经存在，但是不可获取，只有等到声明变量那一句执行之后才能使用

- 不允许重复声明，`let`不允许在相同的作用域内，重复声明同一个变量
  ```javascript
  let a
  let a // Identifier 'a' has already been declared
  function func(arg) {
    let arg
  }
  func()
  // Uncaught SyntaxError: Identifier 'arg' has already been declared
  function func(arg) {
    {
      let arg // 新增内部块级作用域，所以不在同一作用域内，不会报错
    }
  }
  func() // 不报错
  ```

## `const`命令

### 基本用法
`const`声明一个只读常量。一旦声明，常量的值就不会再改变
- 作用域与`let`命令相同，只在声明所在的块级作用域内有效
- `const`命令声明的常量也不会提升，同样存在暂时性死区，只能再声明的位置后面使用
- 也不可重复声明
- 声明时必须初始化

```javascript
const PI = 3.123123
PI
3.123123
PI = 3
// TypeError: Assignment to constant variable. ： 修改 const 声明的常量会报错
const foo
// SyntaxError: Missing initializer in const declaration ： 声明 const 常量时没有赋值
MAX = 5
const MAX
// SyntaxError: Missing initializer in const declaration ： 存在暂时性死区
```

`const`本质上不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单数据类型来说，值就保存在变量所指向的那个内存地址，因此等同于常量。但是对于对象以及数组来说，变量指向的是内存地址，`const`只能保证其内存地址是不变的，而非其中的内容不变

```javascript
const foo = {}
foo.props = 21 // 向 foo 中添加属性
foo.props = 12 // 修改 foo 中属性的值

foo = {} // 将 foo 指向其他内存地址
// TypeError: Assignment to constant variable.
```
如果想将内存冻结，应该使用`Object.freeze`方法
```javascript
const name = Object.freeze({})
name.age = 1
name
// {} : 向冻结的name中添加属性无效
```

## 顶层对象的属性
```javascript
var ee = 1
window.ee
// 1 : 在全局作用中使用 var 声明的变量会添加到 window 上
qq = 2
window.qq
// 2 
window.rr = 4
rr
// 4
let uu = 1
window.uu
// undefined : 使用 let 声明的变量不会被添加到全局 window 上
```
在`es6`中，为了兼容性，`var`命名和`function`命名声明的全局变量依旧是顶层对象的属性；另一方面，`let`命令、`const`命令、`class`命令声明的全局变量，不属于顶层对象的属性

## `globalThis`对象
在`javaScript`中存在一个顶层对象，它提供全局环境，所有的代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的

- 浏览器中，顶层对象是`window`，但`node`和`web worker`没有`window`
- 浏览器和`web worker`里面，`self`也指向顶层对象，但是`node`没有`self`
- `node`里面，顶层对象是`global`，但其他环境都不支持

很难找到一种方法可以在所有情况下都取到顶层对象，下面是勉强可以使用的方法
```javascript
var getGlobal = function () {
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw new Error('unable to locate global object') 
}
```
现在有一个提案，引入`globalThis`作为顶层对象。也就是，在任何环境下，`globalThis`都是存在的，都可以从它拿到顶层对象