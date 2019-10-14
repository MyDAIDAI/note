# 类型、值和变量

## 数字

`js`不区分整数值和浮点数值

### 整型直接量

- 用一个数字序列表示一个十进制数 `0 3 10000`
- 也能识别十六进制值，以`0x`或`0X`为前缀，其后跟随十六进制数串的直接量 `0xff oxCAFE911`

### 浮点型直接量

- 浮点型直接量可以含有小数点，一个实数由整数部分、小数点、小数部分组成
- 还可以用指数记数法表示
- `[digits][.digits][(E/e)[(+/-)digitis]]`
- `1.43234E-23`

### `JavaScript`中的算术运算

- 基本运算：加，减，乘，除，求余 `+  - * / %`

- 除了基本运算以外，`javaScript`还支持更加复杂的算术运算，通过`Math`对象的属性定义的函数和常量来实现

  ```javascript
  Math.pow(2, 23) // 2的23次幂
  Math.round(.6) // 四舍五入
  Math.ceil(.6)  // 向上求整
  Math.floor(.6) // 向下求整
  Math.abs(-5)   // 求绝对值
  Math.max(2, 3) // 求最大值
  Math.min(2, 3) // 求最小值
  Math.random    // 生成伪随机数
  Math.PI        // 圆周率
  Math.E         // 自然对数的底数
  ...
  ```

- 溢出、下溢或被零整除时不会报错

  - 溢出
    - 超出上限，用`Infinity`表示
    - 超出下限，用`-Infinity`表示
  - 下溢
    - 运算结果无限接近于零并比`JavaScript`能表示的最小值还小的时候
    - 返回`0`
  - 被零整除
    - 返回无穷大`Infinity`或负无穷大`-Infinity`
    - `0/0`返回`NaN`

- `NaN`

  - 与任何值都不相等，包括自身
  - 使用`x != x`，当且仅当`x`为`NaN`的时候，表达式才为`true`


### 二进制浮点数和四舍五入错误

在`javaScript`中使用实数，常常只是真实值的一个近似表示，`js`所采用的`IEEE-754`浮点表示法，是一种二进制表示法，可以精确的表示分数`1/2 1/8和 1/ 1024`，但我们常用的分数都是十进制分数`1/10 1/ 1000`，二进制浮点数表示法并不能精确表示类似`0.1`这样简单的数字

```
var x = 0.3 - 0.2
var y = 0.2 - 0.1
x == y // false
x // 0.09999999999999998
y // 0.1
```

为了避免上述错误，更愿意使用大整数进行重要的金融计算，例如，要使用整数“分”而不要使用小数“元”进行基于货币的运算

### 日期和时间

使用`Date()`构造函数，用来创建表示日期和时间的对象



## 文本

`js`字符串是由一组无符号的16位值组成的序列，代表字符串中的单个字符，那些不能表示为16位的`Unicode`字符，遵循`UTF-16`编码规则—用两个16位值组成的一个序列表示，这表示一个长度为2的字符串，有可能表示一个`Unicode`字符

### 字符串直接量

- 使用单引号时，需要注意对英文缩写和所有格进行转义，因为撇号与引号是同一个字符

### 转义字符

`\`,反斜线符号后面加一个字符，就不再表示其字面含义，常用转义字符

| 转义字符 | 含义                                 |
| -------- | ------------------------------------ |
| \b       | 退格符                               |
| \t       | 水平制表符                           |
| \n       | 换行符                               |
| \v       | 垂直制表符                           |
| \uXXXX   | 由4位十六进制数XXXX指定的Unicode字符 |

### 字符串的使用

- `+`连接字符串
- `length`确定字符串长度
- 其他方法 
  - `charAt`
  - `substring`
  - `slice`
  - `indexof`
  - `lastIndexof`
  - `split`
  - `replace`
  - `toUpperCase`
- 注意：在`javaScript`字符串是固定不变的，类似`replace()`和`toUpperCase()`的方法都是返回新字符串，原字符串本身并没有发生改变

### 模式匹配

使用`RegExp()`构造函数，用来创建表示文本匹配模式的对象，`String`和`RegExp`对象均定义了利用正则表达式进行模式匹配和查找与替换的函数

```javascript
var text = 'testing: 1, 2, 3'
var pattern = /\d+/g
pattern.test(text) // true
text.search(pattern) // 9
text.match(pattern) // ["1", "2", "3"]
text.replace(pattern, "#") // 'testing: #， #， #'
text.split(/D+/) // ["", "1", "2", "3"]
```

## 布尔值

任意`javaScript`的值都可以转换为布尔值，以下将会被转换为`false`,所有其他值，包括所有对象（数组）,包括空数组，空对象，都会转换为`true`，布尔运算符，`&&`，`||`， `!`

- `undefined`
- `null`
- `0`
- `-0`
- `NaN`
- `''`

## `null`和`undefined`

- `type null ==> 'object'`
- `type undefined ==> 'undefined'`
- 若想将它们赋值给变量或者属性，或将它们作为参数传入函数，最佳选择是使用`null`

## 全局对象

全局对象的属性是全局定义的符号，`javaScipt`程序可以直接使用，当`javaScript`解释器启动时或者浏览器重新加载页面的时候，它将创建一个新的全局对象，并给它一组定义的初始属性：

- 全局属性，比如`undefined`, `Infinity`和`NaN`
- 全局函数，比如`isNaN()`, `parseInt()`, `eval()`
- 构造函数，比如`Date()`, `RegExp()`,`String()`, `Object()`, `Array()`, `Number()`
- 全局对象，比如`Math`和`JSON`

如果代码声明了一个全局变量，这个全局变量就是全局对象的一个属性

## 包装对象

`javaScript`对象是一种复合值：它是属性或已命名值的集合。可以通过`.`符号来引用属性值，通过 `o.m()`来调用其中的方法，其实字符串也具有同样的属性和方法

```javascript
var s = 'hello world'
var word = s.substring(s.indexOf(" ") + 1, s.length)
```

字符串不是对象，但是`javaScript`会将字符串值通过调用`new String(s)`的方式转换为对象，这个对象继承了字符串的方法，并被用来处理属性的引用。一旦属性引用结束，这个新创建的对象就会被销毁，`Number（）`和`Boolean（）`同样，但是`null`和`undefined`没有包装对象，访问它们的属性会造成类型错误

```javascript
var s = "test"
s.len = 4
var t = s.len
console.log(t) // undefined
```

`javaScript`在第二行创建一个临时字符串对象，并将其`len`属性赋值为4，随即就销毁这个对象。再次访问该属性，该属性不存在，所以为`undefined`

存取字符串、数字或布尔值的属性时创建的临时对象被称做包装对象，它只是偶尔用来区分字符串值和字符串对象，数字和数值对象以及布尔值和布尔对象

需要注意的是，可通过`String()`，`Number()`, `Boolean()`构造函数类显式创建包装对象，但是会在必要的时候将包装对象转换为原始值，使用`===`和`typeof`可以检测出原始值与包装对象的不同

## 不可变的原始值和可变的对象引用

`javaScript`中的原始值(`undefined`, `null`, 布尔值，字符串和数字)与对象（数组，函数）有着根本区别

- 原始值是不可改变的，任何方法都无法更改一个原始值

  - 改变数字与布尔的值本身就说不通

  - 字符串看起来像是由字符组成的数组，我们期望可以通过指定索引来 修改字符串中的字符。但`javaScript`禁止这样做，字符串中所有的方法看上去返回了一个修改后的字符串，实际上返回的是一个新的字符串值

  - ```javascript
    var s = 'hello world'
    s.toUppperCase() // HELLO WORLD
    console.log(s) // hello world
    ```

- 原始值的比较

  - 数字，布尔值，`null`和`undefined`，只有在它们的值相等的时候它们才相等
  - 字符串，当且仅当它们的长度相等且每个索引的字符都相等的时候，`javaScript`才认为它们相等

- 对象值是可变的，它们的值是可以修改的

  ```javascript
  var o = { x: 1 }
  o.x = 2
  o.y = 1
  o // {x: 2, y: 1}
  
  var a = [1, 2, 3]
  a[0] = 2
  a[3] = 4
  a // [2, 2, 3, 4]
  ```

- 对象的比较

  - 对象的比较并非值的比较，即使两个对象包含同样的属性及相同的值，它们也是不相等的

  - 各个索引元素完全相等的两个数组也不相等

    ```javascript
    var o = {x:1}
    var p = {x:1}
    o === p // false: 两个单独的对象永不相等
    var a = [1, 2, 3]
    var b = [1, 2, 3]
    a === b // false: 两个单独的数组永不相等
    ```

  - 通常将对象称为引用类型，以此来和`javaScript`的基本类型进行区分，根据术语的叫法，其对象值都是引用，对象的比较均是引用的比较，当且仅当它们引用同一个基对象时，它们才相等

  - ```javascript
    var a = [] 	// 定义一个引用空数组的变量a
    var b = a	// 变量b引用同一个数组
    b[0] = 1	// 通过变量b来修改引用的数组
    a[0] 		// 1: a变量也会修改
    a === b 	// true: a和b引用同一个数组，因此相等
    ```

    如上面的代码那样，将对象（或数组）赋值给一个变量，仅仅是赋值的引用值，对象本身并没有复制一次。若想得到对象或者数组的副本，就必须要显式复制对象的每个属性或者数组的每个元素。同样，我们想比较两个单独的对象或者数组，则必须 比较它们的属性或元素，下面的代码定义了一个比较两个数组的函数：

    ```javascript
    function equalArrays (a, b) {
    	if (a.length !== b.length) {return false} 	// 两个长度不同的数组不相等
        for (var i = 0; i < a.length; i++) {		
            if (a[i] !== b[i]) {					// 若有任意元素不相等，则数组不相等
                return false
            }
    	}
        return true
    }
    ```

## 类型转换

### 抽象值操作

#### `ToString`

- 基本类型值转换
  - `undefined` -> `'undefined'`
  - `null` -> `'null'`
  - `true` -> `'true'`
  - `NaN` -> `'NaN'`
  - `0` -> `'0'`
- 对象类型值转换
  - `{}` -> `'[object Object]'`, 如果对象有自定义的`toString()`方法，那么字符串串化时就会调用该方法(对象，数组，函数同样)
  - `[1, 2]` -> `'1, 2'`
  - `function () {}` -> `'function () {}'`
- 其它值
  - `Infinity` -> `'Infinity'`
  
  ```javascript
  > String(undefined)
  'undefined'
  > String(null)
  'null'
  > String('')
  ''
  > String({})
  '[object Object]'
  > String([])
  ''
  > String([1, 2])
  '1,2'
  > String([1, 0])
  '1,0'
  > String([1, null])
  '1,' // TODO: 为什么没有 'null' 值
  > String([1, undefined])
  '1,' // TODO: 为什么没有 'undefined' 值
  > String([1, NaN])
  '1,NaN'
   // 在对象上自定义 toString 方法，字符串串化时会调用该方法
  > var a = {b: 'a'}
  > a
  { b: 'a' }
  > a.toString =  function () {return 'ccccc'}
  [Function]
  > String(a)
  'ccccc'
  > var b = ['a', 'b', 'c']
  > String(b)
  'a,b,c'
  > b.toString = function () {return 'ddd'}
  [Function]
  > String(b)
  'ddd'
  > var fn = function () {return 'sfsdf'}
  > String(fn)
  'function () {return \'sfsdf\'}'
  > fn.toString = function () {return 'adfadfadf'}
  [Function]
  > String(fn)
  'adfadfadf'
  ```

- `JSON`
  - 不能转换的值`undefined`, `function () {}`, `symbol`
    - 对不能转换的值得处理
      - 值在数组内，将其转换为`null`， 使其占位
      - 在其他中，将其忽略
  - `NaN`序列化转换为 `null`
  - 在转换对象时，对象会调用`toJson`方法，在将其`toJson`方法返回的值进行序列化，可以自定义`toJSON`方法
  - 可选参数
    - `replace`， 类型为`Array`或者`Function`，可以对序列化的属性进行处理以及筛选
    - `space`, 类型为`Number`或者`String`, 指定缩进间隔或者缩进字符

  ```javascript
  > JSON.stringify(42)
  '42'
  > JSON.stringify('42')
  '"42"'
  > JSON.stringify([])
  '[]'
  // 数组中使用 null 对其 undefined 以及 function () {} 等值进行占位
  > JSON.stringify([1, undefined])
  '[1,null]'
  > JSON.stringify([1, null])
  '[1,null]'
  > JSON.stringify([1, function () {}])
  '[1,null]'
  > JSON.stringify([1, NaN])
  '[1,null]'
  > JSON.stringify(null)
  'null'
  > JSON.stringify(undefined)
  undefined // 忽略 undefined 值
  > JSON.stringify(function () {})
  undefined // 忽略 function () {} 值
  > JSON.stringify(NaN)
  'null'
  > JSON.stringify([1, null, undefined, 2, function () {}])
  '[1,null,null,2,null]'
  > JSON.stringify([1, null, undefined, 2, function () {}, NaN])
  '[1,null,null,2,null,null]'
  // 在对象中直接忽略值为 undefined, function () 等的属性
  > JSON.stringify({a: 2, b: undefined, c: function () {}})
  '{"a":2}'
  // 循环调用会报错
  > var o = {}
  undefined
  > var a = {b: 42, c: o, d: function () {}}
  undefined
  > o.e = a
  { b: 42, c: { e: [Circular] }, d: [Function: d] }
  > JSON.stringify(a)
  TypeError: Converting circular structure to JSON
      at JSON.stringify (<anonymous>)
  // 对循环调用的对象定义toJSON方法，因为JSON字符串化时会首先调用该方法
  // 可以使用该方法返回指定的值，再将返回的值进行序列化
  > a.c.toJSON = function () {return 'a.c'}
  [Function]
  > JSON.stringify(a)
  '{"b":42,"c":"a.c"}'
  > JSON.stringify(a, ['b'])
  '{"b":42}'
  > JSON.stringify(a, function (k, v) {console.log(k, v);return v})
  { b: 42,
    c: { e: [Circular], toJSON: [Function] },
    d: [Function: d] }
  b 42
  c a.c
  d function () {}
  '{"b":42,"c":"a.c"}
  // 添加可选参数
  > JSON.stringify(a, null, 3)
  '{\n   "b": 42,\n   "c": "a.c"\n}'
  > JSON.stringify(a, null, '---')
  '{\n---"b": 42,\n---"c": "a.c"\n}'
  ```

#### `ToNumber`

- 基本类型值转换
  - `true` -> `1`
  - `false` -> `0`
  - `undefined` -> `NaN`
  - `null` -> `0`
- 对象类型值转换
  - 使用抽象操作`ToPrimitive`检查该值是否含有`valueOf`方法，如果有并且返回基本类型值，就是用该值进行类型转换
  - 如果上面没有`valueOf`方法，或者其没有返回基本类型的值，则调用`toString`方法将其强制转换为基本类型的值
  - 如果使用`valueOf`与`toString`均没有返回基本类型的值，会产生`TypeError`错误
  - 根据上面的转换原理，使用`Object.create(null)`生成的对象，不能转换为数字以及字符串类型

  ```javascript
  // 基本类型值转换
  > Number(true)
  1
  > Number(false)
  0
  > Number(undefined)
  NaN
  > Number(null)
  0
  > Number(NaN)
  NaN
  > var o = {}
  > o.valueOf()
  {}
  > o.toString()
  '[object Object]'
  > Number(o) // o.toString()返回的为字符串'[object Object]'，该字符串不能转换为数字，则返回NaN
  NaN
  > o.a = 1
  1
  > o.valueOf()
  { a: 1 }
  > o.toString()
  '[object Object]'
  > Number(o) // 同上
  NaN
  > o.valueOf = function () {return '1'} // 自定义 valueOf 方法
  [Function]
  > Number(o)
  1
  > o
  { a: 1, valueOf: [Function] }
  > var a = {}
  > Number(a)
  NaN
  > a.toString = function () {return '123'} // 自定义 toString 方法
  [Function]
  > Number(a)
  123
  > a
  { toString: [Function] }
  > var otherObj = Object.create(null)
  > Number(otherObj)  // 内部没有 valueOf 方法与 toString 方法
  TypeError: Cannot convert object to primitive value
      at Number (<anonymous>)
  ```

#### `ToBoolean`
- 假值
  - `undefined`
  - `null`
  - `0`
  - `''`
  - `false`
  - `NaN`
- 真值
  - 除了假值之外的其他值都为真值
  - `"''"`
  - `[]`
  - `{}`
  - `'0'`
  - `'false'`
  - `function () {}`
  - `new Boolean(false)`
  - `new String('')`
  - `new Number(0)`
  
  ```javascript
  > Boolean(0)
  false
  > Boolean(false)
  false
  > Boolean('')
  false
  > Boolean(null)
  false
  > Boolean(undefined)
  false
  > Boolean(NaN)
  false
  > Boolean('0')
  true
  > Boolean("''")
  true
  > Boolean([])
  true
  > Boolean({})
  true
  > Boolean('false')
  true
  > Boolean(function () {})
  true
  > Boolean(new Boolean(false))
  true
  > Boolean(new Number(0))
  true
  > Boolean(new String(''))
  true
  ```

| 值                        | 字符串         | 数字 | 布尔值 | 对象                  |
| ------------------------- | -------------- | ---- | ------ | --------------------- |
| undefined                 | "undefined"    | NaN  | false  | throws TypeError      |
| null                      | "null"         | 0    | false  | throws TypeError      |
| true                      | "true"         | 1    |        | new Boolean(true)     |
| false                     | "false"        | 0    |        | new Boolean(false)    |
| ""                        |                | 0    | false  | new String("")        |
| "1.2"(非空，数字)         |                | 1.2  | true   | new String("1.2")     |
| "one"(非空，非数字)       |                | NaN  | true   | new String("one")     |
| 0                         | "0"            |      | false  | new Number(0)         |
| -0                        | "0"            |      | false  | new Number(-0)        |
| NaN                       | "NaN"          |      | false  | new Number(NaN )      |
| Infinity                  | "Infinity"     |      | true   | new Number(Infinity)  |
| -Infinity                 | "-Infinity"    |      | true   | new Number(-Infinity) |
| 1(无穷大，非零)           | "1"            |      | true   | new Number(1)         |
| {}(任意对象)              |                |      | true   |                       |
| [] (任意数组)             |                |      | true   |                       |
| [ 9 ] (1个数组元素)       | "9"            | 9    | true   |                       |
| ['a'] (其他数组)          | 使用join()方法 | NaN  | true   |                       |
| function () {} (任意函数) |                | NaN  | true   |                       |

- 原始值转换为数字：
  - 以数字表示的字符串可以直接转换为数字，也允许在开始和结尾处带有空格
  - 在开始与结尾处的任意非空字符都不能被当做数字直接量的一部分，会转换为`NaN`
- 原始值到对象的转换，原始值通过调用`String()`，`Number()`，`Boolean()`构造函数，转换为它们各自的包装对象
- `null`和`undefined`转换为对象会造成类型错误

### 转换和相等性

`javaScript`可以做灵活的类型转换，因此在`==`相等运算符也随相等的含义灵活多变，`===`恒等运算符在判断相等时并未做任何类型转换

注意：一个值转换为另一个值并不意味着两个值相等，比如，在使用布尔值的地方使用了`undefined`，它将会转换为`false`，但并不意味着`undefined == false`, `==`运算符从不试图将其操作数转换为布尔值

### 显式类型转换

使用`Boolean()`，`Number()`，`String()`，`Object()`来显式的进行类型转换，当不通过`new`运算符调用这些函数的时候，它们会作为类型转换函数进行转换:

```javascript
Number("3") // 3
String(false) // "false"
Boolean([]) // true
Object(3) // new Number(3)
```

- 除了`null`和`undefined`之外的任何值都具有`toString()`方法，这个方法的执行结果与`String()`方法一致

- 若将`null`和`undefined`转换为对象，会抛出类型错误

- 某些运算符会做隐式类型转换，下面是一些类型转换的惯用法：

  - `+`运算符的一个操作数是字符串，那么会将另一个操作数也转为字符串

  - 一元`+`运算符将其操作符转换为数字

  - 一元`!`运算符将其操作数转为为布尔值并取反

    ```javascript
    x + "" // 数字转为字符串，等价于String(x)
    +x 	   // 字符串转为数字，等价于Number(x)
    !!x    // 转换为布尔值，等价于Boolean(x)
    ```

- `javaScript`提供了专门的函数与方法用来做更加精确的数字到字符串和字符串到数字的转换

  - 数字 --> 字符串

    - `toString()`：可以接受转换基数作为参数，不指定，则转换基于十进制，注意，转换前数字的基数都是基于十进制，参数代表的是转换之后的基数

      ```javascript
      var n = 17;
      binary_string = n.toString(2) // "10001"
      octal_string = "0" + n.toString(8) // "021"
      hex_string = "0x" + n.toString(16) // "0x11"
      ```

    - `toFixed()`：根据小数点后的指定位数将数字转换 为字符串，它从不使用指数计数法

    - `toExponential()`：使用指数记数法将数字转换为指数形式的字符串，其中小数点前只有一位，小数点后的位数则由参数指定

    - `toPrecision()`：根据指定的有效数字位数将数字转换为字符串，如果有效数字的位数少于数字整数部分的位数，则转换为指数形式

      ```javascript
      var n = 123456.789
      n.toFixed(0)
      "123457"
      n.toFixed(1)
      "123456.8"
      n.toFixed(2)
      "123456.79"
      n.toExponential(0)
      "1e+5"
      n.toExponential(1)
      "1.2e+5"
      n.toExponential(2)
      "1.23e+5"
      n.toExponential(3)
      "1.235e+5"
      n.toExponential(4)
      "1.2346e+5"
      n.toPrecision(3)
      "1.23e+5"
      n.toPrecision(10)
      "123456.7890"
      ```

  - 字符串 --> 数字

    - 通过`Number()`转换函数将字符串转换为数字，只能基于十进制数进行转换，并且不能出现非法的尾随字符，但`parseInt()`和`parseFloat()`更加灵活，都会跳过任意数量的前导空格，尽可能解析更多数值字符，并忽略后面的内容

    - `parseInt()`：只解析为整数，字符串前缀为`0x`或者是`0X`，会将其解释为十六进制

    - `parseFloat()`：可以解析为整数和浮点数

      ```javascript
      parseInt('3 bilind mics')
      3
      parseInt(" 3.14 ")
      3
      parseInt(" -12.34 ")
      -12
      parseInt("0Xff")
      255
      parseInt("-0xff")
      -255
      parseFloat(".1")
      0.1
      parseInt("0.1")
      0
      parseInt(".1")
      NaN 整数不能以"."开始
      parseFloat("$92.1")
      NaN 数字不能以"$"开头
      ```

    - `parseInt()`（没有`parseFloat`）可以接收第二个可选参数，这个参数指定数字转换的基数

      ```javascript
      parseInt('11', 2)
      3
      parseFloat('11.11', 2)
      11.11
      parseInt("FF", 16)
      255
      ```

      注意：上面的基数是转换之前字符串所代表的基数，最后都将其转换为十进制，无论是使用`toString()`将数字转换为字符串，还是使用`parseInt()`将字符串转换为数字，其中的数字都是十进制，基数参数都是字符串的基数，`toString`中的基数参数代表的是转换之后的字符串的基数，`parseInt`代表的是转换前字符串的基数

  ### 对象转换为原始值

  - 对象 --> 布尔值

    - 所有的对象（包括数组和函数）都转换为`true`
    - 对包装对象也是如此，`new Boolean(false)`是一个对象而不是原始值，它将转换为`true`

  - 对象 --> 字符串 

    - 如果对象具有`toString()`方法，则调用这个方法，如果它返回一个原始值，`javaScript`将这个值转换为字符串，并返回这个字符串结果。

    - 如果对象没有`toString()`方法，或者这个方法并不返回一个原始值，那么`javaScript`会调用`valueOf()`方法。如果存在这个方法，则`javaScript`调用它，如果返回值是原始值，`javaScript`将这个值转换为字符串，并返回这个字符串结果

    - 否则，`javaScript`无法从`toString()`或`valueOf()`获得原始值，因此它将抛出一个类型错误

    - 各种对象的`toString()`方法

      - 数组类的`toString()`方法将每个数组元素转换为一个字符串，并在元素之间添加逗号后合并成结果字符串，与`join(',')`方法返回结果相同

      - 函数类的`toString()`方法返回这个函数的实现定义的表示方法

      - 日期类的返回一个可读的日期和时间字符串

      - `RegExp`类定义的`toString()`方法将`RegExp`对象转换为表示正则表达式直接量的字符串

        ```javascript
        [1, 2, 3, 4].toString()
        "1,2,3,4"
        [1, 2, 3, 4].join('')
        "1234"
        [1, 2, 3, 4].join(',')
        "1,2,3,4"
        (function(x) {f(x);}).toString()
        "function(x) {f(x);}"
        /\d+/g.toString()
        "/\d+/g"
        new Date(2010, 0, 1).toString()
        "Fri Jan 01 2010 00:00:00 GMT+0800 (中国标准时间)"
        ```

  - 对象 --> 数字

    - `valueOf()`，如果存在任意原始值，它就默认将对象转换为表示它的原始值。对象是复合值，而且大多数对象无法真正表示为一个原始值，因此默认的`valueof()`方法返回对象本身。
    - 如果对象具有`valueOf()`方法，然后返回一个原始值，则`javaScript`将这个原始值转换为数字并返回这个数字
    - 否则，如果对象具有`toString()`方法，若返回一个原始值，则`javaScript`将这个字符串原始值转换为数字类型并返回这个数字
    - 否则，`javaScript`抛出一个类型错误异常
    - `[]` --> `0`, `[1]` --> `1`
      - 数组继承了默认的`valueOf()`方法，但返回的是一个对象本身，所以会调用其`toString()`方法，`[]`调用`toString()`返回的是一个空字符串，空字符串转换为数字为`0`，`[1]`调用`toString()`返回`'1'`，转为数字为`1`
      - 注意，`[1, 2, 3]` --> `NaN`，因为对象调用`toString()`方法返回`1, 2, 3`，由于其中有逗号，所以转换为数字则为`NaN`

  ## 变量声明

  - 使用`var`进行变量声明，声明变量，在存入值之前，它的初始值为`undefined`
  - `javaScript`变量声明中并没有指定变量的数据类型，可以是任意数据类型

  ### 重复的声明和遗漏的声明

  - 重复的声明是合法且无害的
  - 读取与使用一个未声明的变量，`javaScript`会报错

  ## 变量作用域

  一个变量的作用域是程序源代码中顶一个这个变量的区域

  - 全局变量拥有全局作用域，在`javaScript`中的任何地方都有定义
  - 函数内声明的变量和函数参数只在函数体内有定义，是局部变量，作用域是局部性的
    - 函数体内，局部变量的优先级高于同名的全局变量
    - 函数体内声明变量不使用`var`，则会将变量添加到全局作用域中

  ### 函数作用域和声明提前

  - `javaScript`没有块级作用域，而是使用了函数作用域：变量在声明它们的函数体以及这个函数体嵌套的任意函数体内都是有定义的

  - 声明提前，`javaScript`函数里声明的所有变量（但不涉及赋值）都被"提前"至函数的顶部，声明提前这步操作是在`javaScript`引擎的"预编译"时进行的，是在代码开始运行之前

    ```javascript
    var scope = "global"
    function f() {
    	console.log(scope)
    	var scope = "local"
    	console.log(scope)
    }
    f() 
    // undefined
    // local
    ```

    上面的代码在`f`函数中，由于变量提升，但没有进行赋值，所以在开始打印出来`undefined`，只有在程序执行到`var`语句的时候，局部变量才会被真正赋值，上面的代码等价于：

    ```javascript
    function f() {
        var scope;
        console.log(scope)
        scope = "local"
        console.log(scope)
    }
    ```

  ### 作为属性的变量

  - 声明一个`javaScript`全局变量，实际上是定义了全局对象的一个属性

  - 使用`var`声明一个变量时，创建的这个属性时不可配置的，不能使用`delete`进行删除

    ```javascript
    var truevar = 1
    fakevar = 2
    delete fakevar
    true
    delete truevar
    false
    ```

  ### 作用域链

  - `javaScript`是基于词法作用域的语言，也就是静态作用域

  - 当定义一个函数的时候，它实际上保存一个作用域链。当调用这个函数时，它创建一个新的对象来存储它的局部变量，并将这个对象添加至保存的那个作用域链上，同时创建一个新的更长的表示函数调用作用域的"链"

    ```javascript
    var scope = "global scope"
    function checkscope() {
        var scope2 = "local scope"
    	return scope2
    }
    checkscope()
    ```

    上面代码的执行过程主要为以下几个步骤：

    - `checkscope`函数定义的时候，在其内部有一个`[[scope]]`属性，该属性保存定义位置的所有父变量对象到其中，在上面的代码中，也就是全局对象`GlobalContext`的变量对象（`globalContext.VO`）

      ```javascript
      checkscope.[[scope]] = [
          globalContext.VO
      ]
      ```

    - 在函数开始调用，也就是函数执行前，会进行以下几个步骤：

      - 将当前函数的上下文对象推入上下文对象栈中

        ```javascript
        ECS = [
            checkscopeContext,
            globalContext
        ]
        ```

      - 将函数定义时的`[[scope]]`属性复制到函数上下文对象中的`scope`属性中

        ```javascript
        checkscopeContext = {
            scope: checkscope.[[scope]]
        }
        ```

      - 向函数上下文对象中添加活动对象

        ```javascript
        checkscopeContext = {
            AO: {
                arguments: {
                    length: 0
                },
                scope2: undefined
            },
            scope: checkscope.[[scope]]
        }
        ```

      - 将活动对象添加至`scope`属性中

        ```javascript
        checkscopeContext = {
            AO: {
                arguments: {
                    length: 0
                },
                scope2: undefined
            },
            scope: [AO, checkscope.[[scope]]]
        }
        ```

      - 执行函数内代码，相应修改活动对象中的变量值

        ```javascript
        checkscopeContext = {
            AO: {
                arguments: {
                    length: 0
                },
                scope2: 'local scope'
            },
            scope: [AO, checkscope.[[scope]]]
        }
        ```

    - 函数执行结束，将当前函数的执行上下文从上下文栈中弹出

      ```javascript
      ECS = [
          globalContext
      ]
      ```



参考： 

- 《`javaScript`权威指南》
- [`JavaScript`深入之作用域链](https://github.com/mqyqingfeng/Blog/issues/6)

基本类型数据与引用类型数据

- 复制变量值
  - 基本数据类型：从一个变量向另一个变量复制基本类型的值，会在变量上创建一个新值，然后把值复制到为新变量分配的位置上
  
  ![var-base](https://github.com/MyDAIDAI/The-Definitive-Guide-of-JavaScript/blob/master/var-base.png)

  - 引用数据类型：引用类型也会将存储在变量中的值复制一份放到为新变量分配的空间中。但这个值实际上是一个指针，这个指针指向存储在堆中的一个对象。复制后，两个变量指向的是堆中的同一个对象。

  ![var-object](https://github.com/MyDAIDAI/The-Definitive-Guide-of-JavaScript/blob/master/var-object.png)

- 传递参数
  所有的参数都是按值传递的。把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样
  - 基本类型：复制给函数中的局部变量，不会互相影响
  - 引用类型：复制的为堆内存中的引用，会相互影响
  
  ```javascript
  function setName (obj) {
	  obj.name = 'asdasdf'; // 函数传递的是堆内存中的引用，修改obj，也就是修改传入的person
    obj = new Object() // 重新将 obj 局部变量指向一个新堆内存地址，不会影响外部引用变量
    obj.name = 'new name'
  }
  var person = new Object();
  setName(person);
  console.log('person', person)
  // person {name: "asdasdf"}

  function addTen (num) {
      num += 10
      return num
  }
  var count = 10
  var result = addTen(count) // 复制的是值，不会影响外部变量
  console.log(count, result)
  // 10 20
  ```
- 检测类型
  - 基本数据类型：`typeof`
  - 引用数据类型：`instanceof`(根据原型链查找)

扩展：`instanceof`实现原理，由于实例的原型对象指向构造函数的原型对象，依次向上层递归查找原型是否相同
```javascript
function instance_of (L, R) {
  let O = R.prototype
  L = L.__proto__
  while (true) {
    if (L === null) {
      return false
    }
    if (L === O) {
      return true
    }
    L = L.__proto__
  }
}
```
  
### 作用域
 - 没有块级作用域
 ```javascript
 for (var i = 0; i < 10; i++) {}
  i // 10
  for (let j = 0; j < 10; j++) {}
  j // ReferenceError: j is not defined
 ```
 对于有块级作用域的语言来说，`for`语句初始化变量的表达式所定义的变量，只会存在于循环的环境之中。而在`js`中，在循环结束之后，会存在于外部环境之中

 ### 垃圾收集
 在`javascript`程序中，所需内存的分配以及无用内存的回收完全实现了自动管理。这种垃圾收集机制的原理就是找出那些不再继续使用的变量，然后释放其占用的内存。所以，垃圾收集器会按照固定的时间间隔（或代码执行中预定的收集时间）周期性地执行这一操作

 对于函数中的局部变量而言，由于局部变量只在函数执行的过程中存在。在这个过程中，会为局部变量在栈（堆）内存上分配相应的空间来存储其值，在函数执行结束后，局部变量就没有存在的必要了，就可以释放它们的内存。
 
 上面的情况很容易判断变量是否有存在的必要，但是其他情况就比较复杂。垃圾收集器需要跟踪哪个变量有用哪个变量无用，对于无用的变量打上标记以便将来回收其内存

 下面是两种标识无用变量的策略

 - 标记清除（主流使用方法）
 - 引用计数（循环引用会导致问题）

 ### 总结
`javascript`变量可以用来保存两种类型的值：基本类型值和引用类型值。基本类型值有6种数据类型：`Undefined`、`Null`、`Boolean`、`String`、`Number`、`Symbol`。基本类型值和引用类型值具有以下特点：

- 基本类型值在内存中占据固定大小的空间，因此被保存在栈内存中
- 从一个变量向另一个变量复制基本类型的值，会创建一个这个值的副本
- 引用类型的值是对象，保存在堆内存中
- 包含引用类型值的变量实际上包含的并不是对象本身，而是一个指向该对象的指针
- 从一个变量向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终都指向同一个对象
- 确定一个值是哪种基本类型可以使用`typeof`操作符，而确定一个值是哪种引用类型可以使用`instanof`操作符

所有变量（包括基本类型和引用类型）都存在于一个执行环境（作用域）当中，这个执行环境决定了变量的生命周期，以及哪一部分代码可以访问其中的变量。以下是关于执行环境的几点总结：

- 执行环境有全局执行环境和函数执行环境之分
- 每次进入一个新的执行环境，都会创建一个用于搜索变量和函数的作用域链
- 函数的局部环境不仅有权访问函数作用域中的变量，而且有权访问其包含环境乃至全局环境
- 全局环境只能访问全局环境中定义的变量和函数，而不能直接访问局部变量环境中的任何数据
- 变量的执行环境有助于确定应该何时释放内存

`javascript`是一门具有自动垃圾收集机制的编程语言，开发人员不用关心内存分配和回收问题。对`javascript`的垃圾收集例程做如下总结：

- 离开作用域的值将被自动标记为可以回收，因此将在垃圾收集期间被删除
- “标记清除”是目前主流的垃圾收集算法，这种算法的思想是给当前不使用的值加上标记，然后再回收其内存
- 另一种垃圾收集算法是“引用计数”，这种算法的思想是跟踪记录所有值被引用的次数。`javascript`引擎目前都不再使用这种算法，因为会导致循环引用的问题
- 当代码中存在循环引用现象时，“引用计数”算法就会导致问题
- 解除变量的引用不仅有助于消除循环引用现象，而且对垃圾收集也有好处。为了确保有效地回收内存，应该及时解除不再使用的全局对象，全局对象属性以及循环引用变量的引用




