# 第五章 语句

表达式在`javascript`中是短语，语句是`javascript`整句或者命令，以分号结束

## 表达式语句

- 赋值语句
- `delete`运算符语句
- 函数调用语句

## 复合语句和空语句

`javaScript`可以将多条语句联合在一起，形成一条复合语句，复合语句使用**花括号**将语句括起来，下面的几行代码就可以当做一条单独的语句

```javascript
{
    x = Math.PI;
    cx = Math.cos(x);
    console.log("cos(x) = " + cx)
}
```


需要注意的是：
- 在计算表达式中直接使用花括号需要注意计算顺序
    ```javascript
    > {} + [] 
    0 // {} 作为一整个代码块，然后计算 + [], 返回0
    > {} + {} 
    '[object Object][object Object]' // TODO: WHY?
    > [] + {}
    '[object Object]' // [] 转换为 0， + {} 转为换字符串 [object Object]，0转换为字符串为 '', 返回 '[object Object]'
    ```
- 语句块的结尾**不需要**分号
- `javaScript`**没有块级作用域**(`let`等具有块级作用域)

空语句`;`允许包含0条语句的语句，`javaScript`解释器执行空语句时不会执行任何动作。但是当创建一个具有空语句循环体的循环

```javascript
for (i = 0; i < a.length; a[i++] = 0) ; 
```

上面的`for`循环操作中，所有的操作都在表达式`a[i++] = 0`中完成，而不需要使用任何的循环体。但是循环体中需要至少要包含一条语句，因此现在使用一个单独的分号来表示一条空语句。

需要注意的是，`for`、`while`、`if`等右括号后面的分号很容易导致`bug`

```javascript
if ((a == 0) || (b == 0));
o = null // 该语句不包含在if语句内
```

## 声明语句

`var`与`function`都是声明语句，它们声明或者定义变量或函数。

### `var`

`var`语句用来声明一个或者多个变量，语法如下：

`var name_1 [ = value_1][ ,..., name_n [ = value_n]]`

关键字`var`之后跟随的是要声明的变量列表，列表中的变量可以带有初始化表达式，用于指定其初始值。若`var`语句出现在函数体内，那么它定义的为局部变量，其作用域为定义位置的函数。如果在顶层使用`var`语句，则声明的是全局变量，全局变量是全局对象的属性，但是使用`var`声明的变量不能使用`delete`进行删除。

还需要注意以下几点：

- 使用`var`声明的变量会进行**变量提升**，提前到脚本或者函数的顶部，但是初始化的操作仍然在原来的`var`语句的位置执行，在声明语句之前变量的值是`undefined`。
- 在`for`以及`for/in`循环中的`var`声明也会进行**变量提升**（没有块级作用域）

### `function`

关键字`function`用来定义函数。函数定义可以使用**函数定义表达式**或者**函数声明语句**

```javascript
var f = function () {} 		// 函数定义表达式
function f () {}			// 函数声明语句
```

函数声明的语法：

```javascript
function funcname([arg1 [, arg2 [..., argn]]) {
    statements
}
```

`function`语句里面的花括号是必须的，即使函数体内只包含一条语句。需要注意的是，函数定义不能出现在`if`语句，`while`循环或其他任何语句中

虽然使用函数定义表达式与函数声明都可以用来声明定义一个函数，但是还是有区别的：

- 使用函数定义表达式声明定义的函数，由于使用了`var`进行定义，`var`会将函数的变量名提升到全局或者函数顶部，变量的初始化代码，也就是函数的定义代码仍在原来的位置（函数不存在提升）
- 使用函数声明语句，函数名称和函数体均会提升到作用域的顶部（函数被提升到作用域顶部）

最后，与`var`声明变量一样，使用函数声明语句所创建的变量也是无法使用`delete`进行删除的。

```javaScript
fn()
var fn = function() {
    console.log('this is a fn function')
}
// statement:1 Uncaught TypeError: fn is not a function： fn 为函数表达式，不会进行函数提升，fn为 undefined

fn()
function fn() {
    console.log('this is a fn function')
}
// this is a fn function: 函数 fn 为函数声明语句，会进行变量提示，fn为函数

```


## 条件语句

条件语句是通过判断指定表达式的值来决定执行还是跳过某些语句。

### `if`

语法:

```javascript
if (expression) 
    statement
```

执行`if`语句的时候会首先计算表达式`expression`的值，如果其计算结果为真值，则进行`statement`，否则就不执行`statement`

`if-else`

```javascript
if (expression) 
    statement1
else 
    statement2
```

### `else if`

```javascript
if (n == 1) {
	// code1    
} else if (n == 2) {
    // code2
} else if (n == 3) {
    // code3
} else {
    // code4
}
```

### `switch`

当所有的分支都依赖于同一个表达式的值时，`else if`并不是最佳的解决方案，因为这样会重复计算多条`if`语句中的表达式，比较浪费时间，`switch`就可以处理一个表达式的情况，首先计算这个表达式的值，然后根据这个值进入不同的分支：

```javascript
switch(expression) {
        statements
}
```

注意，

- `switch`中查找`case`子句中的表达式与`expression`是按照`===`**全等运算符**进行查找的，如果找不到匹配的`case`，那么就会执行`default:`后面的代码块。
- `break`语句可以使解释器跳出`switch`语句或者循环语句，在`switch`语句中，`case`只是指明了要执行的代码的起点，并没有指明终点。若没有`break`语句，那么`switch`语句就会从与`expression`的值相匹配的`case`标签的开始执行，依次执行后续的语句，一直到整个`switch`代码块的结尾。因此应该使用`break`语句来终止每个`case`语句。除此之外，如果在函数中使用`switch`语句，可以使用`return`来代替`break`，`return`和`break`都可以用来终止`switch`语句

`switch`语句执行过程：

- 首先计算`switch`关键字后面的表达式
- 然后按照从上到下的顺序计算每个`case`后面的表达式，直到执行到`case`的表达式的值与`switch`表达式的值相等的时候为止

由于`switch`语句中的执行过程，并不是每一个`case`后面的表达式都会被执行到，所以`case`后面的表达式应该避免使用带有副作用的`case`表达式，如函数调用表达式和赋值表达式。最好的方式是在`case`后面使用常量。

## 循环

循环语句就是程序路径的一个回路，可以让一部分代码**重复执行**，在`javaScript`中有四种循环语句:`while`、`do-while`、`for`、`for-in`

### `while`

```javascript
while (expression) {
    statement
}
```

在执行`while`语句之前，`javaScript`解释器首先会计算`expression`的值，如果其值是假值，那么程序直接跳过循环体中的逻辑`statement`转而执行程序的下一条语句。反之，若`expression`的值是真值，那么就会执行循环体内的逻辑，然后再次计算表达式`expression`的值，一直循环，直到`expression`的值为假值为止。

### `do-while`

`do-while`是在循环的尾部而不是顶部检测循环表达式，这就意味着循环体**至少会被执行一次**。

```javascript
do {
    statement
} while (expression);
```

`do-while`与`while`的不同

- `do-while`循环使用`do`循环来标识循环的开始，用`while`来标识循环的结尾并进入循环条件判断
- `do-while`循环需要使用分号结尾

### `for`

循环语句一般过程为：

- 在循环开始之前，初始化循环计数变量
- 每次循环之前，都需要检测循环计数变量的值，计算其表达式`expression`是否为真值
- 最后，计数器变量做自增操作，否则，在循环结束之后、下一次判断循环条件之前做修改

在这些循环语句中，计数器的关键部分为：初始化，检测，和更新。`for`语句将这三部操作明确为循环语法的一部分

```javascript
for (initialize; test; increment)
    statement
```

上面的`for`与下面的`while`等价(在使用`continue`语句时，其并不等价)：

```javascript
initialize;
while (test) {
	statement;
    increment;
}
```

一般情况下，循环变量都是数字，但这并不是必需的，还可以使用`for`来遍历链表结构，并返回链表的最后一个对象（也就是不包含`next`属性的对象）。

```javascript
function tail(o) {
    for(; o.next; o = o.next); //empty
    return o
}
```

在上面的`for`循环中，初始化表达式可以省略，其实在`for`循环中，三个表达式中的任何一个都可以忽略，但是两个分号必不可少。若省略`test`表达式，那么这将是一个死循环，与`while(true)`相同。

### `for/in`

`for/in`循环语句的语法：

```javascript
for (variable in object)
    statement
```

`variable`可以是一个产生左值的表达式，也可以是一个声明过的变量，`object`是一个表达式，这个表达式的结果是一个对象，一般使用`for`循环来遍历数组，使用`for/in`循环来遍历对象。

执行`for/in`语句的过程：

- `javaScript`解释器首先会计算`object`的值，若`object`的值为`null`或者`undefined`，则直接跳过该循环体，执行后面的语句。若该`object`是一个**原始值**，则将其转换为与之相应的**包装对象**（一般为字符串）
- 在每次循环之前，`javaScript`都会计算`variable`表达式的值，并将属性名依次赋值给该变量

需要注意的是，只要`for/in`循环中`variable`的值可以当做赋值表达式的左值，那么`variable`可以是任何表达式。每次循环都会计算`variable`表达式，也就是说每次循环计算的表达式的值都可能不同。

```javascript
var a = [], i = 0
var o = {
    x: 1，
    y: 2，
    z: 3
}
for (a[i++] in o); //empty
console.log(a) // ['x', 'y', 'z']
```

`for/in`循环只遍历"可枚举"的属性，`javaScript`对象中原生的属性和方法是不可枚举的，所以不会被遍历到，比如`toString`属性。我们向对象中添加的属性与方法默认是可枚举的，也可以通过`definePorperty`将其设置为不可枚举。除此之外，对象继承其他对象的属性也是可以枚举的。`for/in`可遍历到**可枚举**的**自身**以及**原型链**上的属性以及方法

#### 属性枚举顺序

`ECMAScript`规范中没有指定在`for-in`循环中使用什么顺序来枚举对象属性，但主流的浏览器厂商是按照**属性定义的先后顺序**来枚举简单对象的属性

## 跳转

### 标签语句

 语句是可以添加标签的，标签是由语句前的标识符和冒号组成，通过给语句添加标签，就可以在程序的任何地方通过标签引用这条语句。

```javascript
identifier: statement
```

### `break`语句

单独使用`break`语句的作用是立即退出**最内层**的循环或`switch`语句

```javascript
for (var i = 0; i < a.length; i++) {
    if (a[i] === target) break;
}
```

上面的`break`单独使用，就可以退出`for`循环。除了单独使用之外，在`javaScript`中就还可以跟标签一起使用，当与标签一块使用的时候，程序将会跳转到该标签所标识的语句块的结束，或者直接终止这个闭合语句块的执行。

当希望通过`break`来跳出非就近的循环体或者`switch`语句的时候，就需要用到带标签的`  break`语句。

```javascript
var martix = [[1, 2], [NaN, 3], [4, 5], [6, 7]]
var sum = 0
compute_sum: for (var x = 0; x < martix.length; x++) {
    var row = martix[x];
    if (!row) break compute_sum;
    for (var y = 0; y < row.length; y++) {
        var cell = row[y];
        if (isNaN(cell)) break compute_sum;
        sum += cell
    }
}
//break语句会跳转至此(break语句会跳转到该标签所标识的语句块的结束)
//直接在内层的for循环中终止了整个外层for循环
console.log(sum) // 3
```

最后一个需要注意的是，使用`break`语句无论是否带标签，都不能越过**函数的边界**，不能从**函数内部**通过标签跳转到**函数外部**。

### `continue`语句

`continue`只能在循环体内使用，并且它不是**退出循环**，而是转而执行**下一次循环**。在不同的循环语句中，`continue`的行为也有所区别:

- 在`while`循环中，在循环开始处指定的`expression`会重复检测，如果检测结果为`true`，则循环体会从头开始执行
- 在`do/while`循环中，程序的执行直接跳到循环结尾处，重新判断循环条件之后才会进行下一次循环
- 在`for`循环中，会首先计算自增表达式，然后判断检测`test`表达式，若符合条件，再进行下次循环
- 在`for/in`循环中，循环开始遍历下一个属性名，赋值给指定的变量。

需要注意的是`continue`在`while`和`for`循环语句中的区别，在`while`循环中是直接进入下一轮循环条件的判断，但是在`for`循环中会先对循环变量进行自增操作，也就是先计算`increment`表达式，再判断循环条件

```javascript
var data = [[1, 2], , [NaN, 4], [5, 6]];
var total = 0;
compute_sum: for (var i = 0;i < data.length; i++) {
  var row = data[i];
  if (!row) break;
  for (var j = 0; j < row.length; j++) {
    var cell = row[j];
    if (!cell) continue compute_sum;
    total += cell
  }
}
console.log(total) // 3
// break直接终止了最外层的循环，结果为3

var data = [[1, 2], , [NaN, 4], [5, 6]];
var total = 0;
compute_sum: for (var i = 0;i < data.length; i++) {
  var row = data[i];
  if (!row) continue;
  for (var j = 0; j < row.length; j++) {
    var cell = row[j];
    if (!cell) continue compute_sum;
    total += cell
  }
}
console.log(total) // 14
// continue跳过data中的第二个元素
// 内层遍历遇到NaN元素，直接使用continue compute_sum 跳到最外层循环，跳过了第三个数组元素

var data = [[1, 2], , [NaN, 4], [5, 6]];
var total = 0;
compute_sum: for (var i = 0;i < data.length; i++) {
  var row = data[i];
  if (!row) break;
  for (var j = 0; j < row.length; j++) {
    var cell = row[j];
    if (!cell) continue;
    total += cell
  }
}
console.log(total) // 18
// 内层continue只是跳过了内层的一次循环，也就是[NaN, 4]中的NaN
```

### `return`语句

`return`语句只会在函数体内使用，否则会报错，当执行到`return`语句的时候，函数会终止执行，并且返回`expression`的值给调用程序。如果没有`return`语句，则函数调用会依次执行函数体内的每一条语句，直到函数结束，最后返回调用程序，其表达式的值为`undefined`

### `throw`语句

所谓异常是当发生了某种异常情况或错误时产生的一个信号。抛出异常就是用信号通知发生了错误或异常情况。捕获异常是指处理这个信号，也就是采取必要的手段从异常中恢复

```javascript
throw expression; // 语法
throw new Error('...')
```

当抛出异常的时候，`javaScript`解释器会**立即停止**当前正在执行的逻辑，并**跳转至就近**的异常处理程序。如果没有找到任何异常处理程序，`js`会把异常当做程序错误来处理

### `try/catch/finally`语句

`try/catch/finally`是`javaScript`的异常处理机制

```javascript
try {
    // 通常来讲，这里的代码会从头执行到尾而不会产生任何问题
    // 但有时候会抛出一个异常，要么是由throw语句直接抛出异常
    // 要么是通过调用一个方法来间接抛出异常
} catch(e) {
    // 当且仅当try语句块抛出了异常，才会执行这里的代码
    // 这里可以通过局部变量e来获得对Error对象或者抛出的其他值的引用
    // 这里的代码块可以基于某种原因处理这个异常，也可以忽略这个异常
    // 还可以通过throw重新抛出异常
}
finally {
    // 不管try语句块是否抛出了异常，这里的逻辑总是会执行，终止try语句块的方式有：
    // (1) 正常终止，执行完语句块的最后一句
    // (2) 通过break，continue或return语句终止
    // (3) 抛出一个异常，异常被catch从句捕获
    // (4) 抛出一个异常，异常未被捕获，继续向上传播
}
```

`try/catch`的使用

```javascript
function factorial(x) {
	if (x < 0) throw new Error('X必须大于0')
	for (var f = 1; x > 1; f *= x, x--);
	return f
}
try {
	var n = Number(prompt('请输入一个正整数', ''))
	var f = factorial(n)
	alert(n + '!=' + f)
} catch (e) {
	alert(e)
} finally {
    console.log('this is a finally') // 最后会执行
}
```

上面的`try`代码中的`factorial`会根据输入的`x`判断是否要抛出错误，当抛出一个错误，就会终止当前逻辑，转到`catch`中的代码进行执行。

通常情况下，解释器执行到`try`块的尾部，然后开始执行`finally`中的逻辑，以便进行必要的清理工作。。。

## 其他语句类型

### `with`语句

暂时跳过

### `debugger`语句

暂时跳过

### `use strict`

使用`use strict`指令的目的是说明（脚本或函数中）后续的代码将会解析为严格代码，严格代码以严格模式执行。`ECMAScript5`中的严格模式是该语言的一个受限制的子集，它修正了语言的重要缺陷，并提供健壮的差错功能和增强的安全机制。严格模式和非严格模式的区别：

- 严格模式禁止使用`with`语句
- 严格模式，所有变量都需要先声明，给未声明的变量，函数，参数等赋值会抛出错误
- 严格模式中，调用的函数中的一个`this`值是`undefined`，非严格模式，调用的函数中的`this`值为全局对象
- 严格模式中，通过`call`和`apply`调用函数的时候，其中的 `this`为传入的第一个参数
- 严格模式中，给只读属性和不可扩展对象创建新成员会抛出错误
- 严格模式中，函数里的`arguments`对象拥有传入函数值的静态副本，但在非严格模式中，`arguments`里的数组元素和函数参数都是指向同一值的引用
- 严格模式中，当`delete`运算符后跟随非法的标识符，会抛出语法错误
- 严格模式中，删除一个不可配置的属性将抛出类型错误异常
- 严格模式中，在一个对象直接量中定义两个或多个同名属性将产生一个语法错误
- 严格模式中，函数声明中存在两个或多个同名参数将产生一个语法错误
- 严格模式不允许使用八进制整数直接量
- 严格模式中，`arguments.caller`和`arguments.callee`会抛出一个类型错误，函数具有`caller`和`arguments`属性，当访问者两个属性的时候，将会抛出类型错误异常。



上面内容来自《javaScript权威指南》