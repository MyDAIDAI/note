# 函数

函数只会被定义一次，但是会被执行或调用多次。`js`函数是参数化的：函数的定义会包括一个形参的标识符列表，这些参数在函数体中像局部变量一样工作。函数调用会为形参提供实参的值。函数使用它们实参的值来计算返回值，成为该函数表达式的值。除了实参之外，函数在每次调用的时候还会拥有另外一个值—本次调用的上下文，这就是`this`关键字的值

若函数挂载在对象上，成为对象的一个方法，当通过对象来调用这个方法时，该对象就是此次调用的上下文，也就是该函数的`this`值。

用于初始化一个新创建的对象的函数称为构造函数

在`js`中，函数就是对象，在程序中可以随意的进行操作，比如，可以将函数赋值给变量或者作为参数传递给其他的函数。除此之外，函数还可以嵌套在其他函数内部，这样就可以访问它们被定义时所处的作用域中的任何变量，这样，在`js`中就构成一个闭包。

## 函数定义

函数使用`funciton`关键字来定义，它可以用在函数表达式或者函数声明语句中

- 函数名称标识符，对函数表达式来说，这个名称是可选的：如果存在，该名字只存在于函数体内，并且指代该函数对象本身
- 一对圆括号，其中包含0个或者多个标识符组成的列表
- 一对花括号，包含函数语句

注意，函数声明语句会被提前到外部脚本或者外部函数作用域的顶部，所以用这种方式声明的函数，可以被在它定义之前出现的代码所调用。但是使用函数表达式所定义的函数，变量的声明提前了，但是变量的赋值没有提前，也就是当前变量值为`undefined`，没有被赋值为函数。所以，以表达式定义的函数在定义之前是无法调用的。

```javascript
sayName('1') // name 1
function sayName(name) {
	console.log('name', name)
}
sayAge(11) // sayAge is not a function
var sayAge = function (age) {
	console.log('age', age)
}
```

### 嵌套函数

在`js`中，函数可以嵌套在其他函数内部，如：

```javascript
function hypotense(a, b) {
	function square(x) {return x * x}
	return Math.sqrt(square(a) + square(b))
}
```

嵌套函数可以方法嵌套它们的函数的参数和变量。函数声明并非真正的语句，可以出现在全局代码里，或者嵌套在其他函数中，但是不能出现在循环、条件判断，或者`try/catch/finally`以及`with`语句中。但函数表达式可以出现在`javascript`代码的任何地方。

## 函数调用

在`javaScript`中，构成函数主体的代码在定义的时候不会执行，只有在调用该函数时，才会执行。调用函数一共有四种方式：

- 作为函数
- 作为方法
- 构造函数
- 通过使用`call`以及`apply`进行调用

### 函数调用

使用函数表达式可以进行普通的函数调用也可以进行方法调用，如果函数表达式是一个属性访问表达式，即该函数是一个对象的属性或者数组中的一个元素，那么它就是一个方法调用表达式。下面是普通的函数调用：

```javascript
printprops({x: 1})
var total = distance(0, 0, 2) + distance(2, 3, 4)
```

对于普通的函数调用，函数的返回值成为调用表达式的值，会返回`return`后的表达式的值，如果没有`return`语句，就返回`undefined`

在`ECMAScript3`和非严格的`ECMAScript5`对函数调用的规定，调用上下文(`this`的值)是全局对象，在严格模式下，是`undefined`

以函数形式调用的函数通常不使用`this`关键字，但是可以使用`this`来判断当前是否是严格模式

```javascript
var strict = (function () {
    return !this
}())
```

### 方法调用

一个方法是保存在一个对象属性中的`javaScript`函数，当函数表达式本身是一个属性访问表达式，这意味着该函数被当做一个方法，而不是作为一个普通的函数来调用。

作为方法调用的函数的参数以及返回值的处理与普通函数调用一致，不相同的部分为调用上下文。属性访问表达式由两部分组成，一个对象和一个属性名称。在这样的方法调用表达式里，对象成为其调用上下文，函数体内可以使用关键字`this`来引用该对象。

```javascript
var calculator = {
	operand1: 1,
	operand2: 3,
	add: function () {
		this.result = this.operand1 + this.operand2
	}
}
calculator.add()
calculator.result // 4
```

大多数方法使用点符号来访问属性，使用方括号也可以进行属性访问操作

```javascript
calculator['add']()
```

方法调用也可能包含更加复杂的属性访问表达式

```javascript
var custom = {
	name: 'custom',
	surname: {
		name: 'surname',
		sayName: function () {
			console.log('this', this)
			console.log('name', this.name)
		}
	}	
}
custom.surname.sayName() // 调用custom.surname的方法，所以this指向custom.surname
// this {name: "surname", sayName: ƒ}
// name surname
```

任何函数只要作为方法调用实际上都会传入一个隐式的实参，这个实参是一个对象，方法调用的母体就是这个对象。通常来讲，基于那个对象的方法可以执行多种操作，方法调用的语法就表明了函数将基于一个对象进行操作。

```javascript
rect.setSize(width, height)
setRectSize(rect, width, height)
```

上面的代码的功能完全一样，都作用于一个假定的对象`rect`，可以看出，第一行的方法调用语法非常清晰的表明了这个函数执行的载体是`rect`对象，函数中的所有操作都将会基于这个对象。

关键字`this`没有作用域的限制，嵌套的函数不会从调用它的函数中继承其`this`。嵌套函数如果作为方法调用，其`this`指向调用它的对象。如果嵌套函数作为函数调用，其`this`值不是全局对象就是`undefined`，如果嵌套函数内部想访问外部函数的`this`值，那么需要将`this`保存在一个变量里，这个变量和内部函数都在同一个作用域内

```javascript
var o = {
	m: function () {
		var self = this
		console.log(this === o)
		function fn() {
			console.log(self === o) // self中保存外部函数this值
			console.log('fn this', this) // 内部函数作为普通函数调用，其this指向全局对象
        }
		fn()
	}
}
o.m()
// true
// true
// fn this Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
```

### 构造函数调用 

如果函数或者**方法**调用之前带有关键字`new`，它就构成构造函数调用。构造函数调用和普通的函数调用以及方法调用在实参处理，调用上下文和返回值方面都有不同

#### 实参处理

构造函数带实参调用与普通函数调用一致,但调用的时候如果没有传入实参，可以省略括号，如`var o = new Object`

#### 调用上下文

构造函数调用创建一个新的空对象，这个对象**继承自构造函数的`prototype`属性**。构造函数试图初始化这个新创建的对象，并将这个对象用做其调用上下文，因此构造函数可以使用`this`关键字来引用这个新创建的对象。注意，尽管构造函数看起来像一个方法调用，它依然会使用这个新对象作为调用上下文，也就是说，在表达式`new o.m()`中，其调用上下文并不是`o`

#### 返回值

构造函数通常不使用`return`关键字，构造函数在执行完毕的时候，会返回新创建的对象。如果构造函数显式地使用`return`语句来返回一个对象，那么调用表达式的值就是这个对象。如果使用了`return`语句但没有指定返回值，或者返回一个原始值，这个时候就会忽略返回值，使用新创建的对象作为调用结果。

### 间接调用

在`javaScript`中的函数也是对象，函数对象也可以包含方法，其中的两个方法`call`和`apply`可以用来间接的调用函数。两个方法都可以用来显式的指定调用所需的`this`值。也就是，任何函数可以作为任何对象的方法来进行调用，哪怕这个函数不是那个对象的方法。两个方法都可以指定调用的实参，`call`方法使用参数列表，`apply`方法则要求以数组的形式传入参数

## 构造函数的实参和形参

`javaScript`的函数定义的时候没有指定函数形参的类型，函数调用也未对传入的参数值做任何的类型检查。实际上，`javaScript`的函数调用甚至不会检查传入形参的个数

### 可选形参

当调用函数的时候传入的实参比函数声明的时候指定的形参个数要少，剩下的形参都将被设置为`undefined`值。因此，为了调用函数时参数有较好的适应性，需要为形参设置合理的默认值

```javascript
function getPropertyNames(o, a) {
	if (a === undefined) a = [] // 判断实参a是否存在，不存在，则重新赋值
	//...code
}
var a = getPropertyNames(o)
```

上面的代码中还可以不使用`if`语句，直接使用`||`运算符`a = a || []`

需要注意的是，当用这种可选参数来实现函数的时候，需要将可选参数放在实参列表的最后。调用函数的时候是没有办法省略第一个实参并且传入第二个实参的，它必须使用`undefined`作为第一个实参将其显式的传入。除此之外，在函数定义的时候使用`/*optional*/`来强调形参是可选的。

### 可变长的实参列表：实参对象

当调用函数的时候传入的实参个数超过实参定义时的形参个数的时候，没有办法直接获得未命名值的引用。实参对象解决了这个问题。在函数体内，标识符`arguments`是指向实参对象的引用，实参对象是一个类数组对象，这样可以通过数字下标就可以访问传入函数的实参值，而不是需要通过变量名来引用。

实参对象`arguments`中有一个`length`属性，通过这个可以获取其实参列表的长度。

实参对象的一个重要用途，就是让函数可以操作任意数量的实参。下面的函数就可以传入任意数量的实参，并返回其中的最大值，与`Math.max()`相似

```javascript
function max() {
	var max = Number.NEGATIVE_INFINITY
	for(var i = 0; i < arguments.length; i++) {
		if (arguments[i] > max) {
			max = arguments[i]
		} 
    }
	return max
}
var lagerst = max(1, 2, 45, 6)
lagerst //45
```

类似上面这种函数可以接收任意数量的实参，这种函数也被称为“不定实参函数”。但是需要注意的是，不定实参函数的实参个数不能为0并且`arguments`并不是真正的数组，它是一个实参对象，每个实参对象都包含以数字为索引的一组元素以及`length`属性，但是它并不是真正的数组

在非严格模式下，当一个函数包含若干形参，实参对象的数组元素是函数形参所对应参数的别名，在实参对象中以数字为索引，并且形参名称可以认为是相同变量的不同命名。如果通过实参名字来修改实参值的话，通过`arguments`也可以获取到修改后的值。也就是说，实参对象中与形参列表中所指代的是同一个值，修改其中的一个值也会影响另一个的值

```javascript
function f(x) {
	console.log(x)
	arguments[0] = 2
	console.log(x)
}
f(1)
// 1
// 2
```

#### `callee`和`caller`属性

除了数组元素，实参对象还定义了`callee`和`caller`属性。在`ECMAScript`严格模式中，对这两个属性的读写操作都会产生类型错误。而在非严格模式下，`ECMAScript`标准规定了`callee`属性指代当前正在执行的函数。`caller`是非标准的，但大多数浏览器都实现了这个属性，它指代调用当前正在执行的函数的函数。通过`caller`属性可以访问调用栈。`callee`属性在递归调用的时候非常有用

```javascript
var factorial = function(x) {
	if (x <= 3) return 1
	return x + arguments.callee(x - 1)
}
factorial(5) // 10
```

### 将对象属性用做实参

当函数的形参比较多的时候，使用名/值对的形式来传入参数是一个更好的选择，因为这样不需要按照参数名的顺序来参数，更加快捷方便。为了实现这种风格的方法调用，定义函数的时候，传入的实参都写入一个单独的对象之中，在调用的时候传入一个对象，对象中的名/值对是真正需要的实参数据。

```javascript
function easycopy(args) {
    arraycopy(args.from,
              args.from_start || o,
              args.to,
              args.to_start || o)
}
```

### 实参类型

在函数内部应当添加实参类型检查逻辑，这样对排错更加有利

```javascript
function sum(a) {
	if (Object.prototype.toString.call(a) === '[object Array]') {
		var total = 0
		for (var i = 0; i < a.length; i++) {
			total += a[i]
		}
		return total
	} else {
		throw new Error('sum(): arguments must be array')
	}
}
sum(1)
// Uncaught Error: sum(): arguments must be array
//    at sum (<anonymous>:9:9)
//    at <anonymous>:12:1
```

## 作为值的函数

在`javaScript`中，函数不仅是一种语法，也是值，也就是说，可以将函数赋值给变量，存储在对象的属性或者数组的元素中，作为参数传入另外一个函数等。

在`javaScript`中，函数是这样定义的：

```javascript
function square(x) {return x * x}
```

上面的代码创建了一个新的函数对象，并将其赋值给`square`变量。函数的名字实际上是看不见的，`square`仅仅是变量名字，这个变量指代函数对象。函数还可以赋值给其他的变量，并且仍然可以正常工作。

```javascript
function square(x) {
	return x * x
}
s = square // 将square所指代的函数赋值给变量s，现在变量s与squre指代同一个函数
s(2) // 4
square(2) // 4
```

除了可以将函数赋值给变量，也可以把函数赋值给对象的属性，这样就称为了方法。除此之外，函数甚至可以不需要函数名的放在数组中，使用数组下标进行访问调用。

```javascript
var a =[function (x) {return x * x}, 2]
a[0](2) // 4
a[0](a[1]) // 4
```

下面是一些简单的实例代码：

```javascript
function add(a, b) {return a + b}
function operate(operator, operand1, operand2) {
	return	operator(operand1, operand2)
}
operate(add, 1, 2) // 3
```

在上面的代码中，调用函数`operate`的时候，将实参`add`变量所指代的函数传递给了形参`operator`变量，所以在`operate`函数内部，可以使用`operator`变量调用函数。

#### 自定义函数属性

`javaScript`中的函数并不是原始值，而是一种**特殊的对象**，也就是说，函数可以拥有属性或者方法，其`call`与`apply`就是定义在函数上的方法。

当函数需要一个“静态”变量来在调用的时候保持某个值不变，最方便的方式就是给函数定义属性，而不是定义全局变量，显然定义全局变量会让命名空间变得更加杂乱无章

```javascript
function uniqueInteger() {
	return uniqueInteger.count++ // 先返回计数器的值，再自增
}
uniqueInteger.count = 1 // 为函数添加count属性并初始化
uniqueInteger() // 1
uniqueInteger() // 2
uniqueInteger() // 3
```

```javascript
function factorial(n) {
	if (isFinite(n) && n > 0 && n === Math.round(n)) { // n为有限正整数
		if (!(n in factorial)) { 					   // 判断n属性在factorail中是否存在
			factorial[n] = n * factorial(n - 1) // 不存在，则计算添加
        }
		return factorial[n] // 存在，则直接返回
	} else {
		return NaN
	}
}
factorial[1] = 1 // 初始化属性
factorial(2) // 2
factorial(3) // 6
```

## 作为命名空间的函数

在`javaScript`中的函数作用域的概念：在函数中声明的变量在整个函数体内都是可见的（包括在嵌套函数中），在函数外部是不可见的。不在任何函数内声明的变量是全局变量，在整个`javaScript`程序中都是可见的。由于在`javaScript`中没有块级作用域，所以我们常常简单地定义一个函数用做临时的命名空间，在这个命名空间内定义的变量都不会污染到全局作用域。

```javascript
function myModule() {
    // 模块代码
    // 这个模块中所使用的所有变量都是局部变量
    // 不会污染全局命名空间
}
myModule()
```

上面的代码中仅仅定义了一个单独的全局变量，名叫`myModule`的函数，这样做其实还是有点麻烦，可以直接定义一个匿名函数，并在单个表达式中调用它：

```javascript
(function () { // myModule重写为匿名函数
    // 模块代码
}()) // 结束函数并立即调用该函数
```

注意，在上面的代码中，最外层的括号是必需的，因为如果不写这个左圆括号，`javaScript`解释器会将其解析为函数声明语句，使用圆括号才会正确地将其解析为函数定义表达式。

## 闭包

`javaScript`采用的是词法作用域，也是就说，函数的执行依赖于变量作用域，这个作用域是在函数定义时决定的，而不是函数调用的时候决定的。为了实现这种词法作用域，`javaScript`函数对象内部状态不仅包含函数的代码逻辑，还必须引用当前的作用域链。函数对象可以通过作用域链相互关联起来，函数内部的变量可以保存在函数作用域内，这种特性在计算机中被称为闭包。

```javascript
var scope = "global scope"
function checkscope() {
    var scope = "local scope"
    function fn () {return scope}
    return fn()
}
checkscope() // 'local scope'
```

上面的代码中，调用`checkscope`返回`local scope`，这个原理很简单，现在来对上面的代码做一点改动

```javascript
var scope = 'global scope'
function checkscope() {
	var scope = 'local scope'
	function fn() {
		return scope
	}
	return fn
}
checkscope()() // "local scope"
```

上面的代码中，在定义函数的作用域外面，调用这个嵌套函数，结果依然为`local scope`。这是为什么呢？`javaScript`的函数在执行的时候用到了作用域链，这个作用域链是在**函数定义**的时候创建的。嵌套的函数`fn()`定义在这个作用域链里，其中的变量`scope`一定是局部变量，不管在何时何地执行函数`fn()`，这种绑定在执行`fn()`时依然有效。闭包的这个特性可以捕捉到局部变量（和参数），并一直保存下来。

```javascript
function counter() {
	var n = 0;
	return {
		count: function() {
			return n++
		},
		reset: function() {
			n = 0
		}
	}
}
var c = counter()
var d = counter()
c.count() // 0 
d.count() // 0 : c 与 d 两个计数器互不干扰，是两个不同的对象
c.count() // 1
c.reset()
c.count() // 0
d.count() // 1
```

上面的代码中，在`counter`中返回的对象中的函数，都可以访问函数内部的变量`n`，调用函数两次，可以得到两个计数器对象而不互相干扰，彼此包含不同的私有变量

```javascript
function counter(n) {
	return {
		get count() {
			return n++
		},
		set count(newVal) {
			n = newVal
		}
	}
}
var c = counter(2)
c.count // 5
c.count = 3 // 3
c.count // 3
c.count // 4
```

上面的代码中，返回的对象中没有使用方法，而是使用存取器属性来获取以及设置内部变量的值

```javascript
function addPrivateProperty(o, name) {
	var value;
	o['get' + name] = function () {
		return value
	}
	o['set' + name] = function (newVal) {
		value = newVal
	}
}
var o = {}
addPrivateProperty(o, 'Name')
o // {getName: ƒ, setName: ƒ}
o.setName(1)
o.getName() // 1
addPrivateProperty(o, 'Age')
o.setAge(2)
o.getAge() //2
```

在同一个作用域中的两个闭包，共享同样的私有变量或变量，但是需要小心那些不希望被共享的变量可能会被共享。每次函数调用的时候，都会将函数定义时中的变量添加到作用域中，所以每次调用时函数内部中的变量值都不同。

```javascript
function consfun(v) {
	return function () {
		return v
	}
}
var fnArr = []
for (var i = 0; i < 5; i++) {
	fnArr[i] = consfun(i)
}
fnArr[1]()
```

上面的代码为`fnArr`依次添加了5个匿名函数，每一个函数都是在调用`consfun`函数的时候声明的，匿名函数作用域包括声明时所在的`cosfun`函数作用域，就可以引用到调用`consfun`时传入的局部变量`v`

![image-20181227214710502](/Users/dengpan/Library/Application Support/typora-user-images/image-20181227214710502.png)

由上面的图可以看到，调用数组中的匿名函数的时候，函数内部的作用域链依次是`local` -> `consfun` -> `global`，从作用域链中，可以寻找到声明匿名函数时`cosfun`内的变量`v`

```javascript
function consfun() {
    var fnArr = []
    for (var i = 0; i < 5; i++) {
        fnArr[i] = function () {
            return i;
        }
    }
    return fnArr;
}
var newArr = consfun()
newArr[1]()
```

上面的代码中，调用函数`consfun`在函数`fnArr`中声明了5个匿名函数，当调用里面保存的匿名函数的时候，其作用域链依然为`local`->`consfun`->`global`，但是此时内部的变量`i`的值经过循环之后为`5`，所以无论调用哪一个函数都会返回`5`。需要注意的是，关联到的闭包的作用域链都是”活动的“，记住这一点非常重要。嵌套的函数不会将作用域内的私有成员复制一份，也不会对所绑定的变量生成静态快照。

写闭包的时候还需要注意一件事情就是`this`是`javaScript`的关键字，不是变量。是函数在调用的时候所包含的值，如果闭包在外部函数里，是无法访问其`this`的，应该将其转存为一个变量`var self = this`

除了`this`之外，`arguments`也需要保存在一个变量中，因为每个函数都具有自己所绑定的`arguments`对象。

## 函数属性、方法和构造函数

在`javaScript`中，函数也是对象，也可以拥有属性和方法，就像普通的对象可以拥有属性和方法一样。还可以用`Function()`构造函数来创建新的函数对象。

### `length`属性

在函数体里，`arguments.length`表示的是传入函数的实参的个数，而函数本身的`length`属性表示函数声明时传入的形参个数，该属性是一个只读属性。

```javascript
function check(name, age) {
	console.log(arguments.length)
}
check('daidai') // 1: 传入的实参个数
check.length  //2: 函数声明时的形参个数
```

在函数内部使用`check.length`查看形参个数或者使用`arguments.callee.length`来查看形参个数

### `prototype`属性

每一个函数都包含一个`prototype`属性，这个属性是指向一个对象的引用，这个对象称为”原型对象“。每一个函数都包含不同的原型对象。当将函数用做构造函数的时候，新创建的对象会从原型对象上继承属性。

### `call()`方法和`apply()`方法

函数中包含`call`与`apply`方法，这两个方法可以显式的修改函数内部的`this`值，它们两个的第一个参数是调用上下文，第二个参数是需要传入函数的参数。`call`与`apply`的区别在于，`call`传入的函数参数为列表而`apply`为数组或者为类数组对象。

```javascript
var name = 'global'
function fn() {
	console.log(this.name)
}
fn() // global: 函数调用方式，this值指向全局对象
var o = {
	name: 'o object'
}
fn.call(o) // o object: 显式调用方式，this值指向传入对象
o.fn = fn
o.fn() // o object: 作为方法调用，this值指向方法所属对象
```

从上面的代码可以看出，使用`fn.call(o)`的调用方式的`this`值与`o.fn()`中的`this`值相同。

需要注意的是，传入`apply()`的参数数组可以是类数组对象也可以是真实数组，所以可以将当前函数的`arguments`数组直接传入`apply`来进行调用。

### `bind()`方法

`bind()`是在`ES5`中新增的方法，当在`ES3`中可以轻易的模拟`bind()`，这个方法的主要作用就是将函数绑定至某个对象。当在函数`f()`上调用`bind()`方法并传入一个对象`o`作为参数，这个方法将返回一个新的函数。

```javascript
function fn(y) {
    return this.x + y
}
var o = {x: 1}
var g = fn.bind(o)
g(1) // 2
```

上面的代码使用`bind`方法将函数`fn`中的上下文对象绑定给了对象`o`,并将其绑定后的函数指向变量`g`,调用函数`g`并且传入参数，就可以使用对象o作为上下文和传入的参数来调用函数

可以使用`es5`中的语法来模拟`es6`中的`bind`方法

```javascript
function bind(f, o) {
    return function () {
        return f.apply(o, arguments)
    }
}
```

但是在`es6`中的`bind`方法不仅仅是将函数绑定至一个对象中，它还附带一些其他作用：除了第一个实参之外，其他传入`bind()`的实参也会被绑定在函数变量中，调用的时候可以获取其值，这通常被称为函数柯里化

```javascript
function fn(x, y) {
    return x + y
}
var g = fn.bind(null, 1)
g(2) // 3
```

上面的代码中，`bind`函数绑定的上下文对象为`null`,传入`bind`函数的实参`1`将传递并保存在函数`fn`的变量`x`中

下面使用`ECMAScript3`来实现上面这个功能，这个模拟实现与上面的模拟实现所不同的是，在调用函数`bind`时不仅可以传入上下文对象`this`，还可以传入函数所需要的其他参数

```javascript
function testBind(f, o) {
    var bindArgs = arguments
    return function () {
    	var args = []
        for(let i = 2; i < bindArgs.length; i++) args.push(bindArgs[i])
        for(let j = 0; j < arguments.length; j++) args.push(arguments[j])
        return f.apply(o, args)
    }
}
```

最后需要注意的是，在`ES6`中定义的`bind`方法中的一些特性是上面的代码所无法模拟的：

1. 真正的`bind()`方法返回的一个函数对象，这个函数对象的`length`属性是绑定函数的形参个数减去绑定实参个数
2. `bind()`方法返回的函数可以用作构造函数，当其用作构造函数时，将会忽略传入的`this`，原始函数就会以构造函数的形式进行调用

### `toString()`方法

函数也有`toString()`方法，`ECMAScript`中规定这个方法返回一个字符串，这个字符串和函数声明语句的语法相关。大多数的`toString()`方法的实现都返回函数的完整源码，内置函数会返回一个类似`[native code]`的字符串作为函数体

### `Fucntion()`构造函数

不管是通过函数定义语句还是函数直接量表达式，函数的定义都要使用`function`关键字。除此之外，函数还可以通过`Function`构造函数来定义，如： `var fn = new Function('x', 'y', 'return x - y')`，这一行的代码与下面的代码等价：

```javascript

```

`Function()`构造函数可以传入任意数量的字符串实参，最后一个实参所表示的文本就是函数体，它可以包含任意的`js`语句，每两条语句之间用分号隔开。传入构造函数的其他所有实参字符串是指定函数的形参名字的字符串。如果定义的函数不包含任何参数，只需要给构造函数传入函数体字符串即可。

还需要注意的是，`Function`构造函数并不需要通过传入实参来指定函数名，它所创建的是一个匿名函数。下面还有几点需要注意：

1. `Function`构造函数允许`js`在运行时动态地创建并编译函数

2. 每次调用`Function()`构造函数都会解析函数体，并创建新的函数

3. 使用`Function`构造函数所创建的函数并不是使用词法作用域，相反，函数体代码的编译总会在顶层函数执行

   ```javascript
   var scope = 'global'
   function testFn() {
   	var scope = 'local'
   	return new Function('return scope')
   }
   testFn()() // "global"
   var scope = 'global'
   function testFn() {
   	var scope = 'local'
   	return function () {
   		return scope
   	}
   }
   testFn()() // "local"
   ```

### 可调用的对象

“类数组”并不是真正的数组，但是在大部分的场景下可以将其当作是数组来对待。对于函数也存在类似的情况。“可调用的对象”是一个对象，可以在函数调用表达式中调用这个对象。所有的函数都是可调用的，但并非所有的可调用对象都是函数。

...

如果想检测一个对象是否是真正的函数对象，可以使用下面的方法

```javascript
function isFunction(x) {
    return Object.prototype.toString.call(x) === '[object Function]'
}
```

## 函数式编程

### 使用函数处理数组

假设有一个数组，数组元素都是数字，我们想要重新计算这些元素的平均值和标准差。若使用非函数式编程风格的话，代码会是这样的：

```javascript

```

可以使用数组方法`map()`和`reduce()`来实现同样的计算，这种实现是非常的简洁：

```javascript

```

如果我们基于`ECMAScript3`来实现，由于在`ECMAScript3`中并不包含这些数组方法，如果不存在内置的方法，可以进行自定义`map`和`reduce`函数

```javascript
var map = Array.prototype.map ? function (arr, fn) {
    return arr.map(fn);
} : function (arr, fn) {
    var results = []
    for (var i = 0, len = arr.length; i < len; i++) {
        results[i] = fn.call(null, arr[i], i, arr)
    }
    return results;
}
var reduce = Array.prototype.reduce ? function (arr, fn, initial) {
    if (arguments.length > 2) {
        return arr.reduce(fn, initial)
    } else {
        return arr.reduce(fn)
    }
} : function (arr, fn, initial) {
    var i = 0, len = arr.length, accumulator;
    // 判断是否指定初始值，如果指定了初始值，则使用
    // 没有指定初始值，则使用数组第一个元素作为初始值
    if (arguments.length > 2) {
        accumulator = initial;
    } else {
        if (len === 0) throw TypeError();
        while (i < len) {
            if (i in arr) {
                accumulator = arr[i++];
                break;
            } else {
                i++;
            }
        }
        if (i === len) throw TypeError();
    }
    while(i < len) {
        accumulator = fn.call(null, accumulator, arr[i], i, arr);
        i++;
    }
    return accumulator;
}
```

### 高阶函数

所谓高阶函数就是操作函数的函数，它接受一个或多个函数作为参数，并返回一个新函数

```javascript
function not (fn) {
    return function () {
        return !fn.apply(this, arguments)
    }
}
var even = function (x) {
    return x % 2 === 0
}
var odd = not(even)
[1, 3, 5].every(odd)
```

上面的`not()`函数是一个高阶函数，因为它接受一个函数作为参数，并且返回了一个新的函数。

```javascript
function compose (fn ,gn) {
    return function () {
        return fn.call(this, gn.apply(this, arguments))
    }
}
var square = function(x) {
    return x * x
}
var sum = function(x, y) {
    return x + y
}
var sumToSquare = compose(square, sum)
console.log(sumToSquare(2, 3)) // 25
```

### 不完全函数

函数`f()`的`bind()`方法返回一个新的函数，给新函数传入特定的上下文和一组指定的参数，然后调用函数`f()`。

```javascript

```

利用这种不完全函数的编程技巧，可以编写一些有意思的代码，利用已有的函数来定义新的函数

```javascript
function partialLeft (fn) {
    var args = arguments
    return function () {
        var a = array(args, 1)
        a = a.concat(arguments)
        return fn.apply(this, a)
    }
}
function compose(fn, gn) {
    return function () {
        return fn.call(this, gn.apply(this, arguments))
    }
}
var not = partialLeft(compose, function (x) { return !x })
var even = function (x) {
    return x % 2 === 0
}
var odd = not(even)
odd(2) // false
odd(3) // true
```

### 记忆

在函数式编程当中，缓存数据的技巧叫做“记忆”,下面的例子中，展示了一个高阶函数，该函数接受一个函数作为实参，返回一个带有记忆功能的函数 

```javascript
function memorize(fn) {
    var cache = {}
    return function () {
        var key = Array.prototype.join.call(arguments, ';')
        if (key in cache) {
            return cache[key]
        } else {
            return cache[key] = fn.apply(this, arguments)
        }
    }
}
function sum(x, y) {
    return x + y
}
var sumToMemorize = memorize(sum)
sumToMemorize(1, 2) // cache {1,2: 3}
sumToMemorize(3, 4) // cache {1,2: 3, 3,4: 7}
sumToMemorize(5, 6) // cache {1,2: 3, 3,4: 7, 5,6: 11}
```

使用记忆函数实现递归

```javascript
var factorial = memorize(function (n) {
    return (n <= 1) ? 1 : n * factorial(n - 1)
})
factorial(5)
```





上面内容均来源与：`《javaScript权威指南》`