# 对象

除了字符串，数字，布尔以及`null`和`undefined`，其他的值均为对象，比如数组、函数等，它们为`javaScript`的内置对象，而不是自定义对象。

对象是可变的，通过引用而非值来操作对象。若变量`x `指向的是一个对象的引用，那么执行代码`var y = x`，变量`y`也会指向同一个对象，而非对象的副本。通过变量`y`修改这个对象也会对`x`造成影响

对象的常用操作：创建，设置，查找，检测，删除和枚举

对象属性包括属性名和值。属性名是可以包含空字符串在内的任意字符串，但对象中不能存在两个同名的属性名。值可以是任意值，包括原始值或者对象值，或者可以是`getter`或`setter`函数。除了名和值之外，属性还有一些与其特性相关的值，称为“属性特性”

- 可写(`writable attribute`)，表示是否可以设置该属性的值（对值的操作）
- 可枚举(`enumerable attribute`)，表示是否可以通过`for/in`循环返回该属性
- 可配置(`configurable arribute`)，表示是否可以修改，删除该属性（对属性的操作）

除了包含属性之外，每个对象还拥有三个相关的对象特性：

- 对象的原型(`prototype`)指向另外一个对象，该对象的属性继承自它的原型对象
- 对象的类(`class`)是一个标识对象类型的字符串
- 对象的扩展标记(`extensible flag`)指明了是否可以向改对象添加新属性

`javaScript`的三类对象和两类属性：

- 内置对象，由`ECMAScript`规范定义的对象，比如说数组，函数，日期和正则表达式等
- 宿主对象，由`javaScript`解释器所嵌入的宿主环境所定义的，比如`web`浏览器定义的`HTMLElement`对象
- 自定义对象，在`js`代码中所创建的对象
- 自有属性，在`js`代码中所定义的属性
- 继承属性，在对象原型中所定义的属性

## 创建对象

可以通过对象直接量、`new`操作符以及`object.create()`来创建对象

### 对象直接量

```javascript
var empty = {}
var anmial = {
    smell: '',
    kind: {
        name: 'dog',
        age: 1
    }
}
```

对象直接量是一个表达式，这个表达式每次运算都会创建并初始化一个新的对象。每次计算对象直接量的时候，也都会计算其每一个属性的值。也就是说，如果在一个重复调用的函数中的循环体内使用了对象直接量，它将会创建很多个新对象，并且每次创建的属性值也可能不同。（代码优化）

### 通过`new`创建对象

`new`运算符创建并且初始化一个新的对象，`new`后面跟着构造函数，构造函数用于初始化一个新创建的对象。在`javaScript`中的原始类型都包含内置的构造函数

```javascript
var o = new Object()
var a = new Array()
var d = new Date()
```

### 原型

每一个`javaScript`对象（`null`除外）都和另外一个对象相关联，另一个对象也就是原型，每一个对象都是从原型继承属性。

- 通过对象直接量创建的对象都具有同一个原型对象，可以通过`Object.prototype`可以获得对原型对象的引用
- 通过构造函数创建的对象的原型就是构造函数的`prototype`属性的值
  - `new Object()`创建的对象的原型为`Object.prototype`
  - `new Array()`创建的对象的原型为`Array.prototype`
  - `new Date()`创建的对象的原型为`Date.prototype`

注意：`Object.prototype`没有原型对象，它不继承任何属性。其他的原型对象都是普通对象，都具有原型。所有的内置构造函数都具有一个继承自`Object.prototype`的属性

![image-20181117110558831](https://github.com/MyDAIDAI/The-Definitive-Guide-of-Ja:vaScript/blob/master/image-20181117110558831.png)

从上面的图中可以看出，`[]`的原型对象为`Array.prototype`，`Array.prototype`的原型对象为`Object.prototype`，所以`[]`同时继承自`Array.prototype`和`Object.prototype`

### `Object.create()`

`ECMAScript5`定义了一个`Object.create()`方法，用于创建一个新对象，第一个参数是对象原型，第二个可选参数用来对对象的属性进行描述，其为一个静态函数，而不是提供给某个对象调用的方法

```javascript
var o = Obect.create({x:1, y: 2})
//	console.log(o)
//	{}
// 	__proto__:
//		x: 1
//		y: 2
//		__proto__:
//			constructor: f Object()
//			hasOwnProperty: f
// 			isPrototypeOf: f
//			...

```

- 传入参数`null`来创建一个没有原型的新对象，不会继承任何方法，包括`toString()`

  ```javascript
  var a = Object.create(null)
  console.log(a) // {} No propertire
  ```

- 传入`Object.prototype`来创建一个普通的空对象（比如通过`{}`或`new object()`创建的对象）

  ```javascript
  var b = Object.create(Object.prototype)
  //	console.log(b)
  //	{}
  //	__proto__:
  //		constructor: f Object()
  //		hasOwnProperty: f hasOwnProperty()
  // 		...
  var d = Object.create(Array.prototype) // 与通过new Array()创建对象相同
  //	console.log(d)
  //	Array {}
  //		__proto__:
  //			concat: f concat()
  //			pop: f pop()
  //			__proto__:
  //				constructor: f Object()
  ```

可以通过任意原型创建新对象，`Object.creat()`使用的是原型式继承，可以使用`ECMAScript3`对该函数进行模拟

```javascript
function inherit(p) {
    function f() {}
    f.prototype = p
    return new f()
}
var a = inherit(Object.prototype)
//	console.log(a)
//	{}
//	__proto__:
//		constructor: f Object()
//		hasOwnProperty: f hasOwnProperty()
//		...
```

但是需要注意的是，`inherit()`并不能完全代替`Object.create()`，它不能通过传入`null`原型来创建对象，而且不能接收可选的第二个参数。

`inherit()`函数的一个作用是防止修改那些不受你控制的对象。不是将对象直接传入函数，而是将它的继承对象传入，当函数读取继承对象属性的值时，实际上读取的是继承来的值。如果给继承继承属性赋值，只会影响这个继承对象，而不会影响原始对象。

```javascript
var o = {x: "don't change this object"}
function otherFunction(data) {
	console.log(data.x) // don't change this object
	data.y = "y value"
	data.x = "change this object"
	console.log(data)
}
otherFunciton(inherit(o)) 
// don't change this object
// x: "change this object"
// y: "y value"
// __proto__:
// 	x: don't change this object
//	__proto__:
// 		...
```

上面的代码中，第一次调用读取`x`的值时，会从原型中去查找，读取的是继承来的值。但是给属性赋值是，是直接在传入的对象上赋值，不会影响到原始对象。

## 属性的查询和设置

 可以通过(`.`)或者方括号(`[]`)运算符来获取属性的值，也可以创建属性或者给属性赋值

### 作为关联数组的对象

当通过点运算符访问对象属性的时候，属性名用一个标识符来表示。标识符必须直接出现在`javaScript`程序中，它们不是数据类型，程序无法修改它们。

当通过`[]`来访问对象的属性时，属性名通过字符串来表示。字符串是`javaScript`的数据类型，在程序运行时可以修改和创建它们。

### 继承

```javascript
function inherit(object) {
    function fn() {}
    fn.prototype = object
    return new fn()
}
var o = {}
o.x = 1
var p = inherit(o)
p.y = 2
var q = inherit(p)
q.z = 3

```

上面的代码中的`o`、`p`以及`q`分别为：

![image-20181119213203243](https://github.com/MyDAIDAI/The-Definitive-Guide-of-Ja:vaScript/blob/master/image-20181119213203243.png)

现在假设给对象`o`的属性`x`赋值，如果`o`中已经有属性`x`（不是继承属性），那么这个赋值操作只能改变这个已有属性`x`的值。如果`o`中不存在属性`x`，那么赋值操作就会给对象`o`添加一个新属性。如果之前`o`继承了属性`x`，那么继承的属性就会被新创建的同名属性覆盖

属性赋值操作首先检查原型链，以此判定是否允许赋值操作。例如，如果`o`继承自一个只读属性`x`，那么赋值操作是不允许的。如果允许属性进行赋值操作，它也总是在原始对象上创建属性或对已有的属性赋值，而不会去修改原型链。在`javaScript`中，只有在查询属性时才会体会到继承的存在，而设置属性则和继承无关，该特性让程序员可以有选择地覆盖继承的属性。

```javascript
p.x = 2
console.log(p)
// x: 2
// y: 2
// __proto__: 
// 		x: 1
//		__proto__: object
```

从上面的代码中可以看到，当尝试着修改`p`中继承的属性`x`时，并不能成功，只是在`p`上面添加了新的属性`x`，原型对象并没有修改。

### 属性访问错误

在以下场景下给对象`o`设置属性`p`会失败:

- `o`中的对象`p`属性是只读的：不能给只读属性重新赋值（`object.deineProperty()`方法中有一个例外，可以对可配置的只读属性重新赋值）
- `o`中的属性`p`是继承，且它是只读的
- `o`中不存在属性`p`：`o`没有使用`setter`方法继承属性`p`，并且`o`的可扩展性为`false`。如果`o`中不存在`p`，而且没有`setter`方法可供调用，则`p`一定会被添加至对象`o`中。但是如果`o`是不可扩展的，那么在`o`中不能定义新的属性。

## `delete`运算符

`delete`运算符可以删除对象的属性，但是只能删除只有属性，不能删除继承的属性（要删除继承属性必须从定义这个属性的原型对象上删除它，否则会影响到所有继承自这个原型的对象）

![image-20181119220704845](https://github.com/MyDAIDAI/The-Definitive-Guide-of-Ja:vaScript/blob/master/image-20181119220704845.png)

从上面的图中可以发现，当使用`delete`删除继承属性的时候，返回了`true`，但是并没有删除掉`p`原型链中的`x`属性。只能在被继承的原型对象`o`上删除，然后所有继承这个对象的对象都会被影响，因为对象之间的传递是引用传递。

`delete`表达式删除成功或者没有任何副作用（比如删除不存在的属性）时，都会返回`true`，比如删除`p.x`。除此之外`delete`不能删除其可配置项为`false`（即：不可配置）的属性。某些内置对象的属性是不可配置的，比如通过变量声明和函数声明创建的全局对象属性。

```javascript
delete Object.prototype // false
var a = 1
delete a // false
function fn () {}
delete fn // false
```

## 检测属性

对象可以看做是属性的集合，要检测某个属性在对象中是否存在，有三个方法：`in`、`hasOwnProperty()`、`propertyIsEnumerabel()`

- `in`检测属性在对象中是否存在，这个属性可以是自有对象，也可以是继承来的对象，无论是否可以枚举
- `hasOwnProperty()`检测给定名字是否是对象的自有属性，无论是否可枚举
- `propertyIsEnumerabel()`是`hasOwnProperty`的增强版，只在对象的自有属性并且该属性可枚举是才返回`true`，通常由`js`创建的代码的属性都是可枚举的，但是在`es6`中可以配置该属性。

```javascript
function inherit(obj) {
    function fn() {}
    fn.prototype = obj
    return new fn()
}
var o = {x: 1}
var p = inherit(o)
o.y = 2
'y' in p // true
'x' in p // true
p.hasOwnProperty('y') // true
p.hasOwnProperty('x') // false
p.propertyIsEnumerabel('y') // true
p.propertyIsEnumerabel('x') // false
```

除了使用`in`操作符，还是可以使用`!==`来判断一个属性是否是`undefined`，但是如果该属性存在，但是该属性的值为`undefined`，这样就会产生混乱，这时还是需要使用`in`或者`hasOwnProperty`等。

检测属性的方法一般都是用来检测该属性是否存在或者是否为对象自有属性，一般情况下不管是否是可枚举

## 枚举属性

除了检测属性，通常还需要对属性进行枚举和遍历，一般使用`for/in`，`for/in`循环在循环体中遍历对象的所有可枚举属性（包括自有属性和继承属性）

常用对象的属性复制：

- 将对象`p`的所有属性复制到`o`中，`o`中的同名属性被`p`进行覆盖

  ```javascript
  function extend(o, p) {
      for (prop in p) {
          o[prop] = p[prop]
      }
      return o
  }
  var o = {x: 1}
  var p = inherit(o)
  p.y = 2
  var c = extend({}, p)
  console.log(c) // y: 2, x: 1
  ```

  上面的代码中将`p`的所有可枚举属性（无论是自有属性还是可继承属性）都复制到了对象`{}`中，全都变成了对象`{}`的自有属性

- 将`p`中所有可枚举属性复制到`o`中，如果`o`和`p`中有同名属性，则`o`中的属性不受影响

  ```javascript
  function merge(o, p) {
      for (prop in p) {
          if (o.hasOwnProperty(prop)) continue
          o[prop] = p[prop]
      }
      return o
  }
  ```

- 如果`o`的属性在`p`中不存在，则将`o`中的属性删除

  ```javascript
  function restrict(o, p) {
      for (prop in o) {
          if (!(prop in p)) delete o[prop]
      }
      return o
  }
  ```

- 如果`o`中的属性在`p`中存在同名属性，则从`o`中删除这个属性

  ```javascript
  function subtract(o, p) {
      for (prop in p) {
          delete o[prop] // 从o中删除，存在就删除，不存在也不会报错
      }
      return o
  }
  ```

- 返回一个新对象，这个对象同时拥有`o`的属性和`p`的属性，如果`o`与`p`中有同名属性，则使用`p`的属性值

  ```javascript
  function union(o, p) {
      return extend(extend({}, o), p)
  }
  ```

- 返回一个新对象，这个对象有`o`与`p`同时出现的属性

  ```javascript
  function intersection(o, p) {
      return restrict(extend({}, o), p)
  }
  ```

- 返回一个数组，这个数组包含是`o`中可枚举的自有属性

  ```javascript
  function keys(o) {
      if(typeof o !== 'object') throw TypeError()
      var result = []
      for (var prop in o) {
          if (o.hasOwnProperty(prop)) {
              result.push(prop)
          }
      }
      return result
  }
  ```

  上面的函数与`es6`中的`Object.keys()`的工作原理相似，返回一个由可枚举的自有属性名组成的数组。

  `es6`第二个可枚举的函数时`Object.getOwnPropertyNames()`，返回所有自有属性，无论是否可枚举

## 属性`getter`和`setter`

对象的数据可以分为数据属性以及存取器属性，数据属性的只是一个简单的值，而存取器属性是一个`getter`或（和）`setter`方法。当程序读取查询存取器属性的时候，会调用`getter`方法（无参数）。当程序设置一个存取器属性的时候，程序调用`setter`方法，将赋值表达式右侧的值当做参数传入`setter`。

与数据属性不同的是，存取器属性不具有可写性。若属性同时具有`getter`与`setter`方法，那么是一个可读/可写属性，如果只具有`getter`方法，那么它就是一个只读属性。如果只具有`setter`方法，那么它是一个只写属性。

定义存取器属性有两个方式，第一个是直接在对象字面量中定义，第二种使用`Object.defineProperty()`来定义已经存在的属性

```javascript
var o = {
	prop: 'value',
    get accessor_prop () {
        return this.prop
    },
    set accessor_prop (value) {
        this.prop += value
    }
}
o.accessor_prop // "value"
o.accessor_prop = 'new'
o.accessor_prop // "valuenew"
o.prop			// "valuenew"
```

```javascript
var p = {
	x: 1.0,
	y: 1.0,
	get r() {
		return Math.sqrt(this.x * this.x + this.y * this.y)
	},
	set r(newvalue) {
		var oldvalue = Math.sqrt(this.x * this.x + this.y * this.y)
		var ratio = newvalue / oldvalue
		this.x *= ratio
		this.y *= ratio
	},
	get theta() {
		return Math.atan2（this.y, this.x）
	}
}
```

与数据属性一样，存取器属性也是可以继承的。有许多场景都会用到存取器属性，比如智能检测属性的写入值以及每次属性读取的时候返回不同的值

```javascript
var serialnum = {
    $n: 0,
    get next() {
        return this.$n++
    },
    set next(newvalue) {
    	this.$n = newvalue
    }
}
// 每次调用next属性，都会进行自增操作
```

```javascript
var random = {
    get octet() {
        return Math.floor(Math.random() * 256)
    },
    get unit16() {
        return Math.floor(Math.random() * 65536)
    },
    get init16() {
        return Math.floor(Math.random() * 65535 - 32768)
    }
}
// 每次调用的属性返回的随机数都不同
```

## 属性的特性

除了包含名字和值之外，属性还包含一些标识它们可写、可枚举和可配置的特性

- 数据属性特性：值`value`、可写`writable`、可枚举`enumerable`、可配置`configurable`
- 存取器属性特性：读取`get`、写入`set`、可枚举`enumerable`、可配置`configurable`

在`es5`中可以获取或者设置属性的特性

- 获取**自有属性**的属性描述符：`Object.getOwnPropertyDescriptor()`

  ```javascript
  Object.getOwnPropertyDescriptor({x: 1}, 'x')
  // {value: 1, writable: true, enumerable: true, configurable: true}
  Object.getOwnPropertyDescriptor({}, 'x')
  // undefined 不存在x属性，返回undefined
  Object.getOwnPropertyDescriptor({}, 'toString')
  // undefined 继承属性，返回undefind
  var getter = {
  	get value () {
          return 1
  	}
  }
  Object.getOwnPropertyDescriptor(getter, 'value')
  {get: f value(), set: undefined, enumerable: true, configurable: true} // 没有set
  ```

- 设置属性的特性：`Object.defineProperty()`

  ```javascript
  var o = {}
  Object.defineProperty(o, 'x', {
      value: 1,
      writable: true,
      enumerable: false,
      configurable: false
  })
  o.x // 1
  Object.keys(o) // [] 获取对象o的自有可枚举属性
  Object.defineProperty(o, 'x', { // 将数据属性转换为存取器属性
      get: function () {
          return 0
      }
  })
  ```

  使用`Object.defineProperty`创建属性时，属性描述符不必包含所有的四个特性。使用它新创建属性并且属性描述符为空对象时，其特性值为`false`或者`undefined`。这个方法添加对象自有属性或者修改对象的自有属性，不能修改继承的属性，继承的属性只具有只读操作

  ```javascript
  var o = {}
  Object.defineProperty(o, 'x', {})
  Object.getOwnPropertyDescriptor(o, 'x')
  // {value: undefined, writable: false, enumerable: false, configurable: false}
  ```

- 同时设置多个属性的特性：`Object.defineProperties()`

  ```javascript
  var p = Object.defineProperties({}, {
      x: {value: 2, writable: true, enumerable: true, configurable: true},
      y: {value: 3, writable: true, enumerable: false, configurable: true},
      circle: {
          get: function () {
              retunr this.x * this.y
          }
      }
  })
  ```

使用`Object.defineProperty()`以及`Object.defineProperties()`设置特性的规则:

- 若对象不可扩展，则可以修改已有的自有属性，不能添加新属性
- 若属性不可配置，则不能修改它的可配置性和可枚举性
- 若存取器属性不可配置，则不能修改其`getter`和`setter`方法，也不能将其转换为数据属性
- 若数据属性不可配置，也不能转换为存取器属性
- 若数据属性不可配置，则不能将它的可写性从`false`修改为`true`，但是可以将`true`修改为`false`
- 如果数据属性是不可配置且不可写，那么不能修改它的值。如果是可配置但不可写属性，则属性的值是可以修改的

```
var o = {}
Object.defineProperty(o, 'x', {}) 
// {value: undefined, writable: false, enumerable: false, configurable: false}
Object.defineProperty(o, 'x', {
    configurable: true
}) // TypeError: Cannot redefine property: x
Object.defineProperty(o, 'x', {
    get: function () {
        return 0
    }
}) // TypeError: Cannot redefine property: x
Object.defineProperty(o, 'x', {
    wriatable: true
}) // TypeError: Cannot redefine property: x
```

实现`extend`函数，不仅将对象的属性复制到另一个对象中，还需要将属性的特性一起复制

```javascript
Object.defineProperty(Object.prototype, 'extend', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function (o) {
        // 得到所有属性，无论是否可枚举 getOwnPropertyNames: 获取所有自有属性，无论是否可枚举
        var names = Object.getOwnPropertyNames(O)
        for (var i = 0; i < names.length; i++) {
            // 当前this对象中存在该属性，则跳过
            if (names[i] in this) continue
            // 获取属性描述符
            var desc = Oject.getOwnPropertyDescriptor(o, names[i])
            // 用它给this创建一个属性
            Object.defineProperty(this, names[i], desc)
        }
        
    }
})
```

#### `getter`和`setter`的老式`API`

在`es5`之前都是使用老式`API`来查询或者设置属性，所有的对象都拥有这些方法

- `__lookupGetter__()`与`__lookupSetter__()`，返回一个命名属性的`getter`和`setter`方法
- `__defineGetter__()`与`__defineSetter__()`，定义`getter`与`setter`方法

### 总结：

| 检测属性操作符                    | 自有属性     | 继承属性     | 只可枚举     |
| --------------------------------- | ------------ | ------------ | ------------ |
| `in`                              | ok           | ok           |              |
| `hasOwnproperty`                  | ok           |              |              |
| `propertyIsEnumerable`            | ok           |              | ok           |
| **枚举属性操作符**                | **自有属性** | **继承属性** | **只可枚举** |
| `for/in`                          | ok           | ok           | ok           |
| `Object.keys()`                   | ok           |              | ok           |
| `Object.getOwnPropetyNames`       | ok           |              |              |
| **获取与设置属性描述符**          | **自有属性** | **继承属性** | **只可枚举** |
| `Object.getOwnPropertyDescriptor` | ok           |              |              |
| `Object.defineProperty`           | ok           |              |              |

由上面的表中可以得出以下：

- 检测属性操作符，只检测属性是否存在，无论是否可枚举，但`propertyIsEnumerable`为增加版，来检测属性是否为自有属性且可枚举
- 枚举属性操作符，枚举的属性必须是可以枚举的，`getOwnPropertyNames`为扩展版，来获取所有自有属性名，依次来枚举所有属性

## 对象的三个属性

每一个对象都有与之相关的原型`prototype`、类`class`和可扩展性`extensible`

### 原型对象

对象的原型呀从来继承属性，原型属性是在实例对象创建之初就设置好的。通过对象直接量创建的对象使用`Object.prototype`作为它们的原型，使用`new`操作符创建的实例对象使用构造函数的`prototype`属性作为它们的原型，使用`Object.create(obj)`创建的对象使用传入的`obj`作为它们的原型。

在`es6`中可以使用`Object.getPropertyOf()`来查询它的原型对象，在`es3`中可以使用`o.constructor.prototype`来检测一个对象的原型。对象的`constructor`属性指代创建这个对象的构造函数，`constructor.prototype`指代构造函数的原型属性。通过对象直接量可以使用`constructor.prototype`来查询其原型属性，但是使用`Object.create()`创建的对象往往不能这样使用。

检测一个对象是否是另一个对象的原型（或处于原型链中），使用`isPrototypeOf()`方法

```javascript
var p = {x: 1}
var o = Object.create(p)
p.isPrototypeOf(o) // true: o继承自p
Object.prototype.isPrototypeOf(p) // true: p继承自Object.prototype
```

`Mozilla`早些年将`javaScript`对外暴露了一个专门命名为`__proto__`的属性，用于直接查询/设置对象的原型。但是不推荐使用`__proto__`，因为`IE`与`Opera`未实现

### 类属性

对象的类属性时一个字符串，用来表示对象的类型信息，但是`es3`与`es5`都未提供设置这个属性的方法，只能通过`toString()`方法查询。通过调用对象的`toString`方法，会返回`[object calss]`字符串，但是很多对象重写了`toString`方法，所以需要调用`Object.prototype`上的`toString()`方法

```javascript
function classof(o) {
    if (o === null) return "null"
    if (o === undefined) return "undefined"
    return Object.prototype.toString.call(o).slice(8, -1)
}
classof([]) // "Array"
classof({}) // "Object"
```

自定义对象不能通过该方法来区分类别，一律返回`Object`

```javascript
function fn() {}
classof(new fn()) 'Object' // 构造函数创建的对象，返回object，不能判断类型
```

### 可扩展性

对象的可扩展性用来表示是否可以给对象添加新属性。在`es5`中，所有的内置对象和自定义对象都是可扩展的。

- `es5`中使用`Object.isExtensible()`来判断对象是否可扩展

```javascript
Object.isExtensible({}) //true
Object.isExtensible(new Date()) // true
```

- 将对象转为不可扩展使用`Object.preventExtension()`，该方法只能影响到对象本身的可扩展性，如果给一个不可扩展的对象的原型添加属性，这个不可扩展的对象依然可以继承该属性。

```javascript
var o = {x: 1}
Object.isExtensible(o) // true
Object.preventExtensions(o)
o.y = 2
o //{x: 1}
Object.isExtensible(o) // false

// 对象本身不可扩展，但是继承的原型对象可扩展
var p = {x: 1}
var q = Object.create(p)
q
//	{}
//	__proto__: Object
// 		x: 1
//		__proto__: Object
Object.isExtensible(q)
// true
Object.preventExtensions(q)
// {}
q.y = 2
q
// {} 为q添加属性失败
p.z = 3 // 添加
q
//	{}
//	__proto__: 
//		x: 1
//		z: 3
//		__proto__: Object
```

- `Object.seal()`，密封对象，除了能够将对象设置为不可扩展的对象之外，还可以将对象的所有自有属性设置为不可配置的，就不能添加新的属性，对已有的属性也不能删除和配置，但是对于可写的属性，还是可以设置属性值。对于已经封闭`sealed`起来的对象是不能解封的，可以使用`Object.isSealed()`来检测对象是都封闭

```javascript
var z = {x: 1}
Object.isSealed(z)
// false
Object.seal(z)
// {x: 1}
Object.isExtensible(z)
// false
Object.getOwnPropertyDescriptor(z, 'x')
// 将其设置为不可设置的，configurable置为false
// {value: 1, writable: true, enumerable: true, configurable: false}
z.x = 2
z 
// {x: 2} 可写属性可以修改值
z.y = 3
// {x: 2} 不可扩展，不能添加新属性
```

- `Object.freeze()`将对象冻结，除了将对象设置为不可扩展以及将自有属性设置为不可配置外，还将所有自有属性设置为只读（如果对象的存取器属性具有`setter`方法，存取器属性将不受影响，仍可以通过给属性赋值来调用）。使用`Object.isFrizen()`来检测是否冻结

```javascript
var z = {x: 1}
Object.isFrozen(z)
// false
Object.freeze(z)
// {x: 1}
Object.getOwnPropertyDescriptor(z, 'x')
//	使用Object.freeze()将其设置为不可配置与不可写
// {value: 1, writable: false, enumerable: true, configurable: false}

var a = {
	x: 1,
	set y (newValue) {
		return this.x = newValue
	},
	get y () {
		return this.x
	}
}
Object.isFrozen(a)
// false
Object.freeze(a)
// {x: 1}
Object.getOwnPropertyDescriptor(a, 'x')
// configurable与waritable置为false
// {value: 1, writable: false, enumerable: true, configurable: false}
Object.getOwnPropertyDescriptor(a, 'y')
// 存取器属性没有writable特性，不受影响
// {get: ƒ, set: ƒ, enumerable: true, configurable: false}
a.y = 2 // 通过存取器属性设置z.x的值，但是z.x为不可写，不能设置成功
a.x
// 1 
```

最后，`Object.preventExtension`、`Object.seal()`、`Object.freeze()`返回传入的对象

## 序列化对象

对象序列化是指将对象的状态转换为 `JSON` 字符串，也可将`JSON`字符串还原为对象。在`es6`中提供了内置函数`JSON.stringfiy()`和`JSON.parse()`用来序列化和还原`js`对象。

```javascript
var o = {x: 1, y: {z: [false, null, ""]}}
var s = JSON.stringfiy(o)
// "{"x":1,"y":{"z":[false,null,""]}}"
var p = JSON.parse(s)
// {x: 1, y: {z: [false, null, ""]}}

// p是o的深拷贝, o的变化不会影响到p
o.x = 2
console.log(p)
// {x: 1, y: {z: [false, null, ""]}}
```

- `NaN`、`Infinity`、`-Infinity`序列化的结果为`null`
- 日期对象序列化的结果是`ISO`格式的日期字符串,`JSON.parse()`不会将其还原为日期对象
- 函数、`RegExp`、`Error`对象以及`undefined`值不能进行序列化和还原

最后，`JSON.stringify()`只能够序列化对象的可枚举自有属性

## 对象方法

### `toString()`方法

`toString`将返回一个表示调用这个方法的对象值的字符串

- 数组的`toString`方法，返回一个的元素列表，将其中的每个元素都转换为了字符串

```javascript
([1, 2, 3, 4, undefined, null]).toString()
// "1,2,3,4,,"
```

### `toLocalString()`方法

这个方法返回一个表示这个对象的本地化字符串。`Object`中默认的`toLocaleString()`方法并不做任何本地化的操作，仅仅是调用`toString()`方法并返回对应值。`Date`和`Number`可以使用它对数字、日期和时间做本地化的转换。`Array`的`toLocalString()`方法将每个数组元素转换为字符串的时候，使用的是`toLocalString()`方法

### `toJSON()`方法

在待序列化的对象中存在这个对象，则调用它，返回序列化的结果，而不是原始对象

### `valueOf()`方法

当`js`需要将对象转换为某种原始值而非字符串的时候才会调用它。

