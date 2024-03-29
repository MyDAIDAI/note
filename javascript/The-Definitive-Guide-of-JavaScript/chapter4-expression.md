# 第4章 表达式和运算符

## 原始表达式

原始表达式是表达式的最小单位，包含常量或直接量、关键字和变量

- 直接量是直接在程序中出现的常数值 `1.11`，`hello`，`/pattern/`
- 关键字，`true`，`false`，`null`，`undefined`等
- 变量，`i`，`sum`，`undefined`

## 对象和数组初始化表达式

对象与数组初始化表达式不是原始表达式，由于它们所包含的成员或者元素都是子表达式

- 数组初始化表达式

  ```javascript
  []
  [1, 2, 3]
  [1+2, 3+4]
  [[1, 2, 3], [5, 4, 3], [0, 3, 2]] // 可以嵌套数组
  [1,,,3] // 元素可省略，省略部分填充undefined
  ```

- 对象初始化表达式

  ```javascript
  var p = {x:2, y: 1}
  var q = {}
  q.x = 2 q.y = 1
  // 可以嵌套其他对象
  var rectangle = {
      upperLeft: {x: 2, y: 1},
      lowerRight: {x: 3, y: 3}
  } 
  // 属性名可以是字符串而不是标识符，值可以不为常数值
  var square = {
      "upperLeft": {x: p.x, y: p.y},
      "lowerRight": {x: p.x, y: p.y}
  }
  ```

## 函数定义表达式

```javaScript
var square = function () {}
```

## 属性访问表达式

 属性访问表达式运算得到一个对象属性或一个数组元素的值，语法为

- `expression.identifier` --> 对象.标识符
- `expression[expression]` --> 对象[属性名称] 或 数组[索引]

## 调用表达式

`javaScript`的调用表达式是一种调用（或者执行）函数或方法的语法表示，当调用表达式进行求值时，会经历以下几个步骤

- 首先计算函数表达式，然后计算参数表达式，得到一组参数值
- 若函数表达式不是一个可调用的对象，则抛出类型错误
- 然后将实参依次赋值给形参，执行函数体
- 若函数使用`return `给出一个返回值，那么这个返回值就是整个调用表达式的值。否则，返回`undefined`

## 对象创建表达式

对象创建表达式创建一个对象并调用一个函数（构造函数）初始化新对象的属性

```javascript
new Object()
new Point(2, 3)
// 不传参数，则括号可以省略
new Object
new Point
```

## 运算符

| 运算符                        | 操作                               | A    | N    | 类型                |
| ----------------------------- | ---------------------------------- | ---- | ---- | ------------------- |
| ++                            | 前/后增量                          | R    | 1    | lval -> num         |
| --                            | 前/后增量                          | R    | 1    | lval -> num         |
| - TODO: ?                     | 求反                               | R    | 1    | num -> num          |
| +                             | 转换为数字                         | R    | 1    | num -> num          |
| ~                             | 按位求反                           | R    | 1    | int -> int          |
| !                             | 逻辑非                             | R    | 1    | bool -> bool        |
| delete                        | 删除属性                           | R    | 1    | lval -> bool        |
| typeof                        | 检测操作数类型                     | R    | 1    | any -> str          |
| void                          | 返回undefined值                    | R    | 1    | any -> undef        |
| *、/、%                       | 乘、除、求余                       | L    | 2    | num,num -> num      |
| +、-                          | 加、减                             | L    | 2    | num,num -> num      |
| +                             | 字符串链接                         | L    | 2    | str,str -> str      |
| <<                            | 左移位                             | L    | 2    | int,int -> int      |
| >>                            | 有符号右移                         | L    | 2    | int,int -> int      |
| >>>                           | 无符号右移                         | L    | 2    | int,int -> int      |
| <、<=、>、>=                  | 比较数字顺序                       | L    | 2    | num,num -> bool     |
| <、<=、>、>=                  | 比较在字母表中的顺序               | L    | 2    | str,str -> str      |
| instanceof                    | 测试对象类                         | L    | 2    | obj,func -> bool    |
| in                            | 测试属性是否存在                   | L    | 2    | str,obj -> bool     |
| ==                            | 判断相等                           | L    | 2    | any,any -> bool     |
| !=                            | 判断不等                           | L    | 2    | any,any -> bool     |
| ===                           | 判断恒等                           | L    | 2    | any,any -> bool     |
| !==                           | 判断非恒等                         | L    | 2    | any,any -> bool     |
| &                             | 按位与                             | L    | 2    | int,int -> bool     |
| ^                             | 按位异或                           | L    | 2    | int,int -> int      |
| \|                            | 按位非                             | L    | 2    | int,int -> int      |
| &&                            | 逻辑与                             | L    | 2    | any,any -> any      |
| \|\|                          | 逻辑或                             | L    | 2    | any,any -> any      |
| ?:                            | 条件运算符                         | R    | 3    | bool,any,any -> any |
| =                             | 变量赋值或对象属性赋值             | R    | 2    | lval,any -> any     |
| *=、/=、%=、-=、&=、^=、\=... | 运算且赋值                         | R    | 2    | lval,any -> any     |
| ,                             | 忽略第一个操作数，返回第二个操作数 | L    | 2    | any,any -> any      |

### 操作数的个数

运算符可以根据操作数的个数进行分类，分为一元运算符、二元运算符和三元运算符

### 操作数的类型和结果类型

`javaScript`运算符通常会根据需要对**操作数**进行**类型转换**。如，乘法运算符希望操作数是数字，会将`"5" * "3"  --15`，这个表达式的值是数字15，而不是字符串的`"15"`。对于操作数是布尔类型的操作符来说，其操作数可以是任意类型，因为在`javaScript`中的值不是真值就是加值，所以都可以转换为布尔类型。

### 左值

左值是指表达式只能出现在赋值运算符的左侧

### 运算符的优先级

运算符的优先级控制着运算符的执行顺序。优先级高的运算符的执行总是先与优先级低的运算符，与小学学习的先乘除后加减相似

### 运算符的结合性

`L`指**从左至右**结合，`R`指**从右至左**结合。结合性指定了在多个具有同样优先级的运算符表达式中的运算顺序，从左至右是指运算的执行是按照由左至右的顺序执行，一元操作符、赋值和三元条件运算符都具有从右至左的结合性

```javascript
w = x - y - z ==> w = (x - (y - z))
x = ~-y ==> x = ~(-y)
w = x = y = z ==> w = (x = (y = z))
q = a ? b : c ? d : e ? f : g ==> q = (a ? b : (c ? d : (e ? f : g))
```

## 算术表达式

基本的算术运算符是`+、-、*、/、%`，除了加法运算符，其他的基本运算符都很简单，只是在有必要的时候将操作数转换为数字，然后求积，商，余数和差。所有无法转换为数字的操作符都转换为`NaN`，若操作符为`NaN`，运算符的结果也为`NaN`

在`javaScript`中，所有的数字都是**浮点型**的，除法运算的结果也是**浮点型**

### `+`运算符

二元加法运算符`+`可以对两个数字做加法，也可以对字符串做连接操作

加法操作的行为表现为：

- 如果其中的一个操作数是对象，则对象会遵循对象到原始值的转换规则转换为原始类值

- 对象转换为原始值之后，如果其中的一个操作数是**字符串**的话，另一个操作数也会转换为**字符串**，然后进行字符串连接

- 否则，两个操作数都将转换为数字（或者`NaN`），然后进行加法操作

  ```javascript
  1 + 2          		// 3
  "1" + "2"			// "12"
  "1" + 2				// "12"
  1 + {}				// "1[object Object]": 对象转换为字符串
  {} + 1        // 1 : {} 被作为一个空的代码块，+ 1为字符串转换操作，返回 1
  true + true 		// 2: 布尔值转换为数字后做加法
  2 + null			// 2: null转换为0后做加法
  2 + undefined		// NaN: undefined转换为NaN之后做加法
  ```

- 需要注意的是，当加号运算符和字符串和数字一起使用的时候，需要考虑加法的结合性对运算顺序的影响

- ```javascript
  1 + 2 + 'hello' // '3hello' 从左至右，先计算 1 + 2 等于3，再计算 3 + 'hello'
  1 + (2 + 'hello') // 先计算 2 + 'hello'，结果为'2hello'，再计算 1 + '2hello'
  ```

### 一元操作运算符

一元运算符具有很高的优先级，并且都是右结合

- 一元加法`+`：把操作数转换为**数字**（或者`NaN`)，并返回这个转换后的数字
- 一元减法`-`：根据需要把操作数转换为**数字**，然后改变运算符的符号
- 递增`++`：当运算符在操作数之前，称为**前增量运算符**，对操作符进行增量计算，并返回计算后的值。当运算符在操作数之后，称为**后增量运算符**，对操作数进行增量计算，返回未做增量计算的值
- 递减`—-`：与递增运算符操作相同，只是进行减法运算

### 位运算符

暂时跳过该小节内容

## 关系表达式

 关系运算符用于测试两个值之间的关系，根据关系是否存在而返回`true`或`false`

### 相等和不等运算符

- `===`运算符

  - 如果两个值的**类型不相同**，则它们不相等

  - 如果两个值都是布尔值`true`或布尔值`false`，则它们相等

  - 如果其中一个值是`NaN`，或者两个值都是`NaN`，则它们**不相等**。`NaN`与其他任何值都不相等，包括它本身，可以通过`x !== x`来判断是否为`NaN`

  - 如果两个值为数字且数值相等，则它们相等。若一个值为0，一个值为-0，则它们同样相等 `0 == -0 true`，`0 === -0 true`

  - 如果两个值是字符串，且所含的对应位上的16位数完全相等，则它们相等。两个字符串可以含义完全一样且所显示的字符也一样，但是具有不同编码的16位值。由于`javaScript`并不对`unicode`进行标准化的转化，因此这样的字符串通过`===`和`==`运算符的比较结果不同，可以使用`String.localeCopmpare()`来进行字符串的比较

  - 如果两个引用值指向同一个对象、数组或者函数，则它们是相等的。如果指向不同的对象，则它们是不相等的，尽管两个对象具有完全一样的属性

    ```javascript
    true === true 	// true
    false === false // true
    0 === -0 		// true
    
    {} === {} 		// false
    var obj1 = {}
    var obj2 = {}
    obj1 === obj2 	// false: 指向不同的对象
    var obj3 = obj1
    obj3 === obj1	// true: 指向同一个对象
    ```

- `==`运算符

  - 如果两个操作数的类型相同，则和上文所述的严格相等的比较规则一样

  - 如果两个操作数的类型不相同，则`==`操作符也可能认为它们相等，会进行类型转换

    - 如果一个值是`null`，另一个是`undefined`，则它们相等

    - 如果一个值是数字，另一个是字符串，则先将**字符串**转换为**数字**，然后使用转换后的值进行比较

    - 如果其中一个值是`true`，则将其转换为`1`再进行比较。如果其中一个值是`false`，则将其转换为`0`再进行比较(也就是转换为数字)

    - 如果一个值是对象，另一个值是数字或字符串，则将对象转换为原始值，再进行比较

    - 其他不同类型之间的比较均不相等

      ```javascript
      null == undefined 		// true
      1 == '1'				// true
      true == 1				// true
      false == 0				// true
      [] == 0					// true: []转换为原始值为0
      [] == false				// true: []转换为原始值为0,false转换为0
      ['1'] == 1				// true: ['1']转换为原始值为1
      null == 0				// false: null不进行转换，所以为最后一种情况
      undefined == 0   // false: undefined 不进行转换，为最后一种情况
      NaN != NaN        // 特殊情况，NaN与自身不相等
      '1' = true				// true: true转换为1，'1'转换为1
      ```

      注意：`[]`、`{}`转换为布尔值为`true`，但转换为原始值是`[]`为`0`，`{}`根据情况而定

### 比较运算符

比较运算符用来检测两个操作数的大小关系（数值大小或者字母表的顺序）,`<`、`>`、`<=`、`>=`，比较操作符的操作数可能是任意类型，但是只有数字和字符串才能真正执行比较操作，其他类型的操作数都会进行类型转换，转换规则：

- 如果操作数是对象，那么对象将会按照转换规则转换为原始值：如果`valueOf()`返回一个原始值，那么直接使用这个原始值。否则，使用`toString()`的转换结果进行比较操作
- 对象转换为原始值之后，如果两个操作数都是字符串，那么将会依照字母表的顺序进行比较
- 对象转换为原始值之后，如果至少有一个操作数不是字符串，那么两个操作数都将转换为数字进行数值比较，`0`与`-0`是相等的，`Infinity`比其他任何数字都大（除了`Infinity`本身），`-Infinity`比其他任何数字都小(除了它自身)。如果其中一个操作数是（或转换后是）`NaN`，那么操作数总返回`false`

也就是说，若其中至少有一个操作数（或者转换后的操作数）不是字符串，那么就将都转换为数字进行数值比较。需要注意的是，`javaScript`字符串是一个由16位整数值组成的序列，字符串的比较也只是两个字符串中的字符的数值进行比较。由`Unicode`定义的字符编码顺序和任何特定语言或者本地语言字符集的传统字符编码顺序不尽相同。字符串区分大小写。

对于数字和字符串操作符来说，加号运算符和比较运算符的行为 有所不同，**加号运算符**更偏爱**字符串**，如果它其中一个操作数是**字符串**的话，就进行**字符串连接**操作。而比较运算符更偏爱**数字**，只有在**两个操作数**都是**字符串**的时候，才会进行字符串比较

```javascript
 1 + 2 		//3
'1' + 2		//"12"：有一个为字符串，则进行字符串的拼接操作
'1' + '2'	//"12"
1 < 2		//true
11 < 3		//false
'11' < 3	//false: '11'转换为数字11, 有一个为数字，进行数字的比较操作
'11' < '3'	//true: 两个都为字符串，进行字符串的比较操作
'one' < 2	//false: 'one'转换为数字为NaN,返回false
```

### `in`运算符

`in`运算符用来判断某属性在对象中是否存在，左操作数是一个字符串或可以转换为字符串，右操作数是一个对象。若右侧的对象拥有一个名为左操作数值的属性名，那么返回`true`

```javascript
var point = {x: 1, y: 2}
'x' in point			//true
'y' in point			//true
'toString' in point		//true: 包含原型链上的属性
var data = [4, 5, 6]
'0' in data				//true
1 in data				//true
```

### `instanceof`运算符

`instanof`运算符左操作数是一个对象，右操作数是标识对象的类。如果左侧的对象是右侧类的实例，那么表达式返`true`，否则返回`false`

```javascript
var d = new Date()
d instanceof Date		//true
d instanceof Object		//true
d instanceof RegExp		//false
var arr = [1, 2, 3]
arr instanceof Array	//true
arr instanceof Object	//true
arr instanceof RegExp	//false
```

所有的对象都是`object`的实例，当通过`instanceof`判断一个对象是一个类的实例的时候，这个判断也会包含对`父类`的检测

## 逻辑表达式

### 逻辑与`&&`

假值是`false`、`null`、`undefined`、`''`、`0`、`-0`、`NaN`，**所有其他的值**都是**真值**。

逻辑与运算符首先计算左操作数的值，即首先计算`&&`左侧的表达式。如果计算结果为假值，那么整个表达式的结果也一定是假值，因此`&&`这时返回左操作数的值，而不会对右操作数进行计算。当左操作数是真值时，`&&`运算符将计算右操作数的值并将其返回作为整个表达式的计算结果

```javascript
Boolean('') // false
Boolean("''") // true
Boolean('0') // true: 字符串中如果有内容，则为true，无论内容是 '' 还是 0
var o = {x: 1}
o && o.x 	// 1: o为真值，返回o.x的值
var p = null
p && p.x	// null: p为假值，返回p的值
```

`&&`的行为有时也被称作短路，与`if`等价

```javascript
if (a == b) stop()	//如果a == b，则执行stop函数
(a == b) && stop()	// 如果 a == b为真值，就执行stop()，并将其执行结果返回
```

### 逻辑或`||`

逻辑或会首先计算第一个操作数的值，也就是首先计算左侧的表达式，如果计算结果为真值，那么返回这个真值。否则，再计算第二个操作数的值，并返回这个表达式的计算结果

这个运算符最常使用的方式是用来从一组备选表达式中选出第一个真值表达式

```javascript
var max =  max_width || perferences_max_width || 500 // 若max_width定义了，就直接使用否则依次判断后面的值
```

这个方法经常用在函数体内，用来给参数提供默认值

```javascript
function copy (o, p) {
    p = p || {} // 若p传入，则使用p,否则使用{}
}
```

### 逻辑非`!`

`!`运算符首先将操作数转换为布尔值，然后再对布尔值进行求反，也就是说，`!`总是返回`true`或者`false`，并且可以通过两次逻辑非运算来得到一个值的等价布尔值`!!x`，`!`运算符具有很高的优先级，并且和操作数紧密的绑定在一起。

```javascript
!(p && q) === !p || !q
!(p || q) === !p && !q
```

## 赋值表达式

赋值表达式`=`，具有非常低的优先级，其结合性是从右至左

### 带操作的赋值运算

可以将赋值运算与其他运算符连接起来，如`+=`、`-=`、`/=`、`%=`

```
total += sales_tax  ==> total = total + sales_tax
```

在大多数情况下，表达式为`a op= b`，其中`op`代表一个运算符，等价于`a = a op b`

## 表达式计算

不经常使用，暂时跳过

## 其他运算符

### 条件运算符`?:`

条件运算符是`js`中唯一的一个三元运算符，与`if`具有同样的效果，只是更加简便

### `typeof`运算符

`typeof`是一元操作符，返回值为表示操作数类型的一个字符串

| x                              | typeof x    |
| ------------------------------ | ----------- |
| undefined                      | "undefined" |
| null                           | "object"    |
| true/false                     | "boolean"   |
| 任意数字或NaN                  | "number"    |
| 任意字符串                     | "string"    |
| 任意函数                       | "function"  |
| 任意内置对象（非函数, [], {}） | "object"    |

需要注意的是，`typeof null`为`"object"`，`typeof []`为`"object"`，这种判断操作数类型的方式只能判断出原始值与对象，对于对象中`{}`与`[]`的判断不能进行，这个时候需要调用`object.prototype.toString`来进行对象中具体类型的判断，如果想区分对象的**类**，则需要使用其他手段，如`instanceof`、`class`、`constructor`等

### `delete`运算符

`delete`用来删除对象属性或者数组元素，希望它的操作数是一个左值，如果不是左值，那么`delete`不进行任何操作，并且返回`true`。删除成功也会返回`true`。可以通过`in`运算符来检测这个属性是否在对象(`{}`、`[]`)中存在，以下几种情况不能进行删除：

- 内置核心和客户端属性不能进行删除
- 通过`var`声明的变量不能进行删除
- 通过`function`语句定义的函数和函数参数不能进行删除

需要注意的是，`delete`删除**数组**中的元素时，其数组的**长度**不会改变

```javascript
var o = {x: 1, y: 2}
delete o.x 		//true
"x" in o		//false
o				//{y: 2}
var arr = [1, 2, 3]
delete arr[0]	//true
"0" in arr		//false
arr				//(3) [empty, 2, 3]
arr.length		//3

// 删除不能删除的变量
delete o		//false
var x = 1		
delete x		//false
function fn () {}
delete fn		//false
```

### `void`运算符

`void`是一元运算符，出现在操作数之前，操作数可以是**任意类型**。在使用的时候，操作数会经常计算，但会忽略计算结果并返回`undefined`，由于`void`会忽略操作数的值，因此在操作数具有副作用的时候使用`void`来使程序更有语义

### 逗号运算符`,`

逗号运算符是二元运算符，它首先计算左操作数，然后计算右操作数，最后返回右操作数的值

```javascript
i = 0, j = 1, k = 2 ==> 返回2
```

上面内容来自： 《javaScript权威指南》