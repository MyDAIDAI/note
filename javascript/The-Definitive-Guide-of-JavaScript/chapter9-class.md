# 类和模块

在`javaScript`中可以定义对象的类，让每个对象都共享某些属性。类的实现是基于其原型继承机制的。如果两个实例都从同一个原型对象上继承了属性，那么它们就是同一个类的实例。

## 类和原型

在`javaScript`中，类的所有实例对象都从同一个原型对象上继承属性。因此，原型对象是类的核心。如果定义一个原型对象，然后通过`inherit()`函数创建一个继承自它的对象，这样就定义了一个`javaScript`类。通常，类的实例还需要进一步的初始化，通常是通过定义一个函数来创建并初始化这个新对象。

```javascript
function inherit (object) {
    var fn = function () {}
    fn.prototype = object;
    return new fn();
}
function range(from, to) {
    var r = inherit(range.methods);
    r.from = from;
    r.to = to;
    return r;
}
range.methods = {
    includes: function (x) {
        return this.from <= x && x <= this.to;
    },
    foreach: function (f) {
        for(var x = Math.ceil(this.from); x <= this.to; x ++) {
            f(x)
        }
    },
    toString: function () {
        return "(" + this.from + "..." + this.to  + ")"
    }
}
var r = range(1, 3)
r.includes(2) // true
r.foreach(console.log) // 1 2 3
console.log(r) // (1 ... 3)
```

上面定义了一个工厂方法`range()`，用来创建新的范围对象。

## 类和构造函数

在实际中，更加常用的是使用`new`关键字来创建一个类的新对象。调用构造函数的一个重要特征是，构造函数的`prototype`属性被用作新对象的原型。这意味着通过同一个构造函数创建的所有对象都继承自同一个原型对象，因此它们都是同一个类的成员。现在使用类的方法来重构上面的`range`

```javascript
function Range(from, to) {
    this.from = from
    this.to = to
}
Range.prototype = {
    includes: function (x) {
        return this.from <= x && x <= this.to;
    },
    foreach: function (f) {
        for(var x = Math.ceil(this.from); x <= this.to; x ++) {
            f(x)
        }
    },
    toString: function () {
        return "(" + this.from + "..." + this.to  + ")"
    }
}
var r = new Range(2, 3)
console.log(r.includes(1))
```

上面的代码中，定义了一个`Range`类，这里有一个常见的编程约定，定义类的时候，首字母大写，而普通函数和方法都是首字母小写。

### 构造函数和类的标识

原型对象是类的唯一标识：当且仅当两个对象继承自同一个原型对象时，它们才是属于同一个类的实例。而初始化对象的状态的构造函数则不能作为类的标识，两个构造函数的`prototype`属性可能指向同一个原型对象，那么这两个构造函数创建的实例时属于同一个类的。

构造函数的名字通常用作类名，当使用`instanceof`运算符来检测对象是否属于某个类时会用到构造函数,`r intanceof Range`，如果`r`继承自`Range.prototype`,则返回`true`，实际上`instanceof`运算符并不会检查`r`是否由`Range()`构造函数初始化而来，而会检查`r`是否继承自`Range.prototype`

### `constructor`属性

任何`javaScript`函数都可以用作构造函数，并且调用构造函数是需要用到一个`prototype`属性的。因此，每个`javaScript`函数（`ECMAScript 5`中的`Function.bind()`方法返回的函数除外），都会自动拥有一个`prototype`属性，这个属性的值是一个对象，这个对象包含唯一一个不可枚举属性`constructor`。`constructor`属性的值是一个函数对象。

```javascript
var F = function () {}
var p = F.prototype
var c = p.constructor
console.log(c === F) // true： 对于任意函数 F.prototype.constructor === F
```

上面的代码意味着对象通常继承的`constructor`均指代它们的构造函数，由于构造函数是类的“公共标识，因此这个`constructor`属性为对象提供了类。

```javascript

```

但是需要注意的是，当使用一个新对象重写了预定义的`prototype`之后，新定义的原型对象不包含有`constructor`属性，需要显式的给原型添加一个构造属性：

```javascript

```

另一个常见的办法是，直接向预定义的原型对象中添加方法：

```javascript
Range.prototype.include = function (x) {
    return this.from <== x && x <== this.to
}
```

## `javaScript`中`java`式的类继承

在`java`或其他类似强类型面向对象语言中，类包含下面几种：

1. 实例字段：它们基于实例的属性或变量，用以保存独立对象的状态
2. 实例方法：它们是类的所有实例所共享的方法，由每个独立的实例调用
3. 类字段：这些属性或变量是属于类的，而不是属于类的实例的
4. 类方法：这些方法是属于类的，而不是属于类的实例的

在`javaScript`中，三种对象的属性的行为和下面三种类的成员非常相似：

构造函数对象：任何添加到这个构造函数对象中的属性都是类字段和类方法

原型对象：原型对象的属性被类的所有实例所继承，如果原型对象的属性值是函数的话，这个函数就作为类的实例和方法来调用

实例对象：类的每个实例都是一个独立的对象，直接给这个实例定义的属性是不会为所有实例对象所共享的。

在`javaScript`中定义类的步骤可以缩减为一个分三步的算法。第一步，先定义一个构造函数，并设置初始化新对象的实例属性。第二步，给构造函数的`prototype`对象定义实例的方法。第三步，给构造函数定义类的字段和类属性。将这三个步骤封装进一个简单的`defineClass()`函数中：

```javascript
function defineClass(constructor, methods, statics) {
    if (methods) {
        extend(constructor.prototype, methods)
    }
    if (statics) {
        extend(constructor, statics)
    }
    return constructor
}
function extend(o, p) {
    for (prop in p) {
        if (o.hasOwnProperty[prop]) {
            continue;
        }
        o[prop] = p[prop]
    }
    return o;
}
var SimpleRange = defineClass(function (from, to) {
    this.from = from
    this.to = to
}, {
    includes: function (x) {
        return this.from <= x && x <= this.to
    }
}, {
    upto: function(x) {
        return new SimpleRange(0, x)
    }
})
var simple = new SimpleRange(2, 3)
console.log('simple', simple)
var simple1 = SimpleRange.upto(4)
console.log('simple1', simple1)
```

下面是一个比较全面的类的例子：

```javascript

```

## 类的扩充

`javaScript`中基于原型的继承机制是动态的：对象从其原型继承属性，如果创建对象之后原型的属性发生改变，也会影响到继承这个原型的所有实例对象。这意味着我们可以通过给原型对象添加新方法来扩充`javaScript`类

```javascript
var c = new Complex(2, 3)
var d = new Complex(c.i, c.r)
Complex.prototype.conj = function () {
    return new Complex(this.r, -this.i);
}
console.log(c) 
Complex {r: 2, i: 3}
i: 3
r: 2
__proto__: 
	add: ƒ (that)
	conj: ƒ ()
	equals: ƒ (that)
	mag: ƒ ()
	mul: ƒ (that)
	neg: ƒ ()
	toString: ƒ ()
	constructor: ƒ Complex(real, imaginary)
	__proto__: Object
```

从上面的实例中，可以看到，先对`Complex`进行实例化之后，再向`Complex`中的原型对象上添加`conj`方法，但是实例对象`c`中仍然继承了该方法，说明原型的继承机制的确是动态变化的。

`javaScript`内置类的原型对象也是一样，也就是说可以给数字，字符串，数组，函数等数据类型添加方法

```javascript
Function.prototype.getName = function () {
    reutnr this.name || this.toString().match(...)
}
```

可以给`Object.prototype`添加方法，从而使所有的对象都可以调用这些方法。但这种做法并不推荐，因为在`ECMAScript5`之前，无法将这些新增的方法设置为不可枚举的，这些新增的属性是可以被`for/in`循环遍历到的。在`ECMAScript5`中，可以使用`Object.deineProperty()`来设置其添加的方法为不可枚举，但并不是所有的宿主环境都可以使用`Object.defineProperty()`。

## 类和类型

在`javaScript`中定义的数据类型有：`null`，`undefined`，布尔值，字符串，数字，函数，对象。使用`typeof`运算符可以得出值的类型。但是在类的使用中，希望可以得出对象所属的类。`javaScript`语言核心中的内置对象可以根据它们的`class`属性来区分，但是对于自定义的类型来说，实例对象的`class`属性都是`Object`，所以需要可以检测任意对象的类的技术：`instanceof`运算符，`constructor`属性以及构造函数的名字。

### `instanceof`运算符

使用`instanceof`操作符时，左操作数是待检测其类的对象，右操作数是定义类的构造函数。如果`o`继承自`c.prototype`，则表达式`o instanceof c`的结果为`true`，这里的继承可以不是直接继承，如果`o`所继承的对象继承自另一个对象，后一个对象继承自`c.prototype`，那么这个表达式的运算结果也是`true`。

在`javaScript`中构造函数是类的公共标识，但是原型是唯一的标识。尽管`instanceof`运算符的右操作树是构造函数，但是计算过程实际上是检测了对象的继承关系，而不是检测创建对象的构造函数。

可以通过使用`isPrototypeOf()`来检测对象的原型链上是否存在某个特定的原型对象，`range.methods.isPrototypeOf(r)`，`range.methods`是`r`所继承的原型对象

`instanceof`运算符和`isPrototypeOf()`方法的缺点是，我们无法通过对象来获得类名，只能检测对象是否属于指定的类名。在客户端`javaScript`中还有一个比较严重的不足，就是在多窗口和多框架子页面的`web`应用中兼容性不佳。每个窗口和框架子页面都具有单独的执行上下文，每个上下文都包含独有的全局变量和一组构造函数。在两个不同框架页面中创建的两个数组继承自两个相同但互相独立的原型对象，其中一个框架页面中的数组不是另一个框架页面的`Array()`构造函数的实例，`instanceof`运算结果是`false`

### `constructor`属性

另一种识别对象是否属于某个类的方法是使用`constructor`属性，因为构造函数是类的公共标识，所以直接的方法就是使用`constructor`属性

```javascript
function typeAndValue(x) {
    if (x == null) return ""
    switch(x.constructor) {
        case Number: return "Number" + x;
        case String: return "String" + x;
        case Date: return "Date" + x;
        case RegExp: return "RegExp" + x;
        case Complex: return "Complex" + x
    }
}
var date = new Date()
console.log(typeAndValue(date))  // DateThu Jan 17 2019 10:25:52 GMT+0800 (中国标准时间)
console.log(typeAndValue(c))	// Complex{2,3}
```

使用`constructor`属性检测对象的是否属于某个类的不足之处与`instanceof`一样。在多个执行上下文的场景中它是无法正常工作的（比如在浏览器窗口的多个框架子页面中）。在这种情况下，每个框架页面各自拥有独立的构造函数集合，一个框架页面中的`Array`构造函数和另一个框架页面的`Array`构造函数不是同一个构造函数。

还需要注意的是，在`javaScript`中并非所有的对象都包含`constructor`属性，如果使用自定义的原型对象重写了默认的原型对象，就不包含`constructor`属性，需要手动指定。

### 构造函数的名称

使用`instanceof`运算符和`constructor`属性来检测对象所属的类有一个主要的问题，就是在多个执行上下文中存在构造函数的多个副本的时候哦，这两种方法的检测结果会出错。多个执行上下文中的函数看起来一模一样，但是它们是互相独立的对象，因此彼此也并不相等。

一种解决办法就是使用构造函数的名字而不是使用构造函数本身作为类标识符。一个窗口中的`Array`构造函数和另一个窗口的`Array`构造函数是不相等的，但是它们的名称是一致的。

在`javaScript`中，可以通过`name`属性获取函数名称，或者直接将函数转换为字符串，然后提取出函数名

```javascript
function type(o) {
    var t, c, n;
    // 检测null
    // typeof null === "object"
    if (o === null) {
     	return "null"   
    }
    // 检测 NaN
    // typeof NaN === "number"
    if (o !== o) {
        return 'NaN'
    }
    // 检测常用类型，undefined, string, number, boolean, function, object
    if ((t = typeof o) !== 'object') {
     	return t   
    }
    // 检测内置对象类，Array, Date, RegExp等
    if ((c = classof(o)) !== 'Object') {
     	return c   
    }
    // 检测自定义类，如对象原型中没有 constructor 则会出错
    if (o.constructor && typeof o.constructor === 'funciton' &&
       (n = o.constructor.getName())) {
     	return n   
    }
    return 'object'
}
function classof(o) {
    return Object.prototype.toString.call(o).slice(8, -1)
}
Function.prototype.getName = function () {
    if ('name' in this) return this.name
    return this.name = this.toString().match(...)
}
```

### 鸭式辩型

上面所描述的检测对象的类的各种方法都会有各自的弊端，解决弊端的方法就是规避掉这些问题：不要关注”对象的类是什么“，而是关注”对象能做什么“。这种思考方式被称为”鸭式辩型“。

对于`javaScript`程序员来说，可以理解为：如果一个对象可以像鸭子一样走路，游泳并且嘎嘎叫，就认为这个对象是鸭子，哪怕它并不是从鸭子类的原型对象继承而来的。

比如说我们并不知道一个对象是否是`Array`的实例，当然是可以通过判断是否包含非负的`length`属性来得知是否是`Array`的实例，可以说”包含一个值是非负整数的`lenght`“是数组的一个特征--"会走路"，任何具有”会走路“这个特征的对象都可以当作数组来对待，但是真正数组的`length`属性有一些独特的行为：

1. 当添加新的元素的时候，数组的长度会自动更新
2. 当给`length`属性设置一个更小的整数的时候，数组会被自动截断

上面的这些特征可以被叫做”会游泳“以及”嘎嘎叫“，如果所实现的代码需要”会游泳“以及”嘎嘎叫“，则不能使用只”会走路“的类数组对象。

`other...`

## `javaScript`中的面向对象技术

在上面的内容中，讲解了`javaScript`中的类的基础知识：原型对象，构造函数以及`instanceof`等，下面举一些实际的例子。

### 一个例子：集合类

集合`set`是一种数据结构，用以表示非重复值的无序集合，集合的基础方法包括添加值、检测值是否在集合中等等。下面实现了一个更加通用的`Set`类，它实现了从`javaScript`值到唯一字符串的映射，然后将字符串用作属性名。对象和函数都不具备如此简明可靠的唯一字符串标注，因此集合类必须给集合中的每一个对象或函数定义一个唯一的属性标识。

```javascript
function Set() {
    this.values = {}
    this.n = 0
    this.add.apply(this, arguments)
}
Set.prototype.add = function () {
    for (var i = 0; i < arguments.length; i++) {
        var val = arguments[i]
        var str = Set._v2s(val)
        if (!this.values.hasOwnProperty(str)) {
            this.values[str] = val
            this.n++
        }
    }
    return this
}
Set.prototype.remove = function () {
    for (var i = 0; i < arguments.length; i++) {
        var str = Set._v2s(arguments[i])
        if (this.values.hasOwnProperty(str)) {
            delete this.values[str]
            this.n--
        }
    }
    return this
}
Set.prototype.contain = function (value) {
    return this.values.hasOwnProperty(Set._v2s(value))
}
Set.prototype.size = function () {
    return this.n
}
Set.prototype.foreach = function (f, context) {
    for (var value in this.values) { // 遍历集合中的所有字符串
        if (this.values.hasOwnProperty(value)) { // 忽略继承属性
            f.call(context, this.values[value])
        }
    }
}
// Set 静态属性
Set._v2s = function (val) {
    switch (val) {
        case undefined: return 'u'
        case null: return 'n'
        case true: return 't'
        case false: return 'f'
        default: switch (typeof val) {
            case 'number': return '#' + val;
            case 'string': return '"' + val;
            default: return '@' + objectId(val)
        }
    }
    function objectId(o) {
        var prop = ''
        if (!o.hasOwnProperty(prop)) {
            o[prop] = Set._v2s.next++
        }
        return o[prop]
    }
}
Set._v2s.next = 100
```

### 一个例子：枚举类型

枚举类型是一种类型，它是值的有限集合，如果值定义为这个类型，则该值是可枚举的。

```javascript
// 继承方法
function inherit (o) {
    var fn = function () {}
    fn.prototype = o
    return new fn()
}
// 返回一个包含枚举类型属性，foreach 方法的函数
function enumeration(namesToValues) {
    var enumeration = function () { throw "can't instantiate enumeration" }
    var proto = enumeration.prototype = {
        constructor: enumeration,
        toString: function () {
            return this.name;
        },
        valueOf: function () {
            return this.value
        },
        toJSON: function () {
            return this.name
        }
    }
    enumeration.values = []
    for (name in namesToValues) {
        // 创建继承 enumeration.prototype 原型的对象
        var e = inherit(proto)
        e.name = name
        e.value = namesToValues[name]
        // 将其添加在函数属性上
        enumeration[name] = e
        enumeration.values.push(e)
    }
    // 为函数添加 foreach 方法
    enumeration.foreach = function (f, c) {
        for (var i = 0; i < this.values.length; i++) {
            f.call(c, this.values[i])
        }
    }
    return enumeration
}
function Card(suit, rank) {
    this.suit = suit
    this.rank = rank
}
// 使用枚举类型定义花色和点数，定义在Card的静态方法 Card.Suit 以及 Card.Rank中
// 定义 Card 静态方法，方法中包含枚举类型属性
Card.Suit = enumeration({Clubs: 1, Diamonds: 2, Hearts: 3,  Spades: 4})
Card.Rank = enumeration({Two: 2, Three: 3, Four: 4, Five: 5, Six: 6})
console.log('suit', Card.Suit.Clubs)
// 定义 Card 原型方法
Card.prototype.toString = function () {
    return this.rank.toString() + 'of' + this.suit.toString()
}
Card.prototype.compareTo = function (that) {
    if (this.rank < that.rank) return -1;
    if (this.rank > that.rank) return 1;
    return 0;  
}
// 定义 Card 静态方法
Card.orderByRank = function (a, b) {
    return a.compareTo(b)
}
Card.orderBySuit = function (a, b) {
    if (a.suit <　b.suit) return -1;
    if (a.suit > b.suit) return 1;
    if (a.rank < b.rank) return -1;
    if (a.rank > b.rank) return 1;
    return 0;
}
// 定义一副标准的扑克牌
function Deck() {
    var cards = this.cards = []
    // 使用 Card.Suit 以及 Card.Rank 中的枚举类型依次创建 Card 实例
    Card.Suit.foreach(function (s) {
        Card.Rank.foreach(function (r) {
            cards.push(new Card(s, r))
        })
    })
}
// Deck 原型方法
Deck.prototype.shuffle = function () {
    var deck = this.cards, len = deck.length
    for (var i = len - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1)), tmp;
        tmp = deck[i]
        deck[i] = deck[r]
        deck[r] = tmp
    }
    return this
}
Deck.prototype.deal = function (n) {
    if (this.cards.length < n) {
        throw 'out of cards'
    }
    return this.cards.splice(this.cards.length - n, n)
}
var deck = (new Deck).shuffle()
console.log('deck', deck)
```

上面的代码中首先创建了一个`enumeration`函数，该函数会将其传入的对象中的属性依次添加到一个函数的属性中，然后将其函数返回。后面定义了一个`Card`类，分别为`Card`添加了`Card.Suit`和`Card.Rank`静态函数，每一个静态函数中都包含枚举的属性、`values`属性以及`foreach`方法。最后定义了一个标准的牌类`Deck`，该牌类在创建实例时，会使用`Card`中的`Card.Suit`以及`Card.Rank`中的枚举属性和`foreach`方法来创建所需要的牌。

### 标准转换方法

1. 重要的方法首先是`toString()`，这个方法的作用是返回一个可以表示这个对象的字符串。在希望使用字符串的地方用到对象的话，`js`会自动地调用这个方法。如果没有实现这个方法，类会默认从`Object.prototype`中继承`toString()`啊方法，这个方法的运算结果是`[object Object]`
2. 第二个方法是`toLocaleString()`与`toString()`相似，`toLocaleString()`是以本地敏感性`locale-sensitive`的方式来将对象转换为字符串。默认情况下，对象所继承的`toLocaleString()`方法只是简单的调用`toString()`方法
3. `valueOf`，它用来将对象转换为原始值。大多数对象都没有合适的原始值来表示它们，也没有定义这个方法
4. `toJSON`，这个方法是由`JSON.stringify()`自动调用，`JSON`格式用于序列化良好的数据结构，而且可以处理`javaScript`原始值、数组和纯对象。它和类无关，当对一个对象执行序列号操作的时候，它会忽略对象的原型和构造函数。也就是说使用`JSON.parse()`解析`JSON.stringify()`序列化后的对象，不会包含继承来的属性和方法。

### 比较方法

`javaScipt`的相等运算符比较对象时，比较的是引用而不是值，也就是说，给定两个对象引用，如果要看它们是否指向同一个对象，不是检查这两个对象是否具有相同的属性名和属性值，则可以使用相等运算符

如果比较一个类，并且希望比较类的实例，就应该定义合适的方法来执行比较操作。对于简单的类，可以通过简单地比较它们的`constructor`属性来确保两个对象是相同类型，然后比较两个对象的实例属性以保证它们的值相等

```javascript
Range.prototype.equals = function (that) {
    if (that === null) return false
    if (that.constructor !== Range) return false
    return this.form === this.form && this.to === this.to
}
```

上面给`Range`类定义了一个`equals`方法来比较两个`Range`实例是否相等。

如果将对象用于`javaScript`的关系比较运算符，比如`<`或者`<=`，`javaScript`会首先调用对象的`valueOf()`方法，如果这个方法返回一个原始值，则直接比较原始值。但是大多数类都没有`valueOf`这个方法，为了按照显式定义的规则来比较这些类型的对象，可以定义一个名叫`compareTo()`的方法

### 方法借用

在`js`中的方法就是 一些简单的函数，将其赋值给了对象的属性，可以通过对象来调用。一个对象可以赋值给两个属性，然后作为两个方法来调用。多个类中的方法共用一个单独的函数。比如，`Array`类通常定义了一些内置方法，如果定义了一个类，它的实例是类数组对象，则可以从`Array.prototype`中将函数复制至所定义的类的原型对象中。

### 私有状态

在经典的面向对象编程中，经常需要将对象的某个状态封装或隐藏在对象内，只有通过对象的方法才能访问这些状态，对外只暴露一些重要的状态变量就可以直接进行读写。我们可以通过将变量（或参数）闭包在一个构造函数内来模拟实现私有实例字段，调用构造函数会创建一个实例。为了做到这一点，需要在构造函数内部定义一个函数，并这个函数赋值给新创建对象的属性。

```javascript
function Range(from, to) {
    this.from = function () {
        return from
    }
    this.to = function () {
        this.to
    }
}
Range.prototype = {
    constructor: Range,
    includes: function (x) {
        return this.from() <= x && x <= this.to()
    }
}
```

上面的`Range`构造函数中，将传入的值保存在闭包中，这个值在实例创建之后就不能进行修改了，但是`from`与`to`属性是可写的，可以直接修改这两个属性

```javascript
var r = new Range(2, 3)
r.from() // 2
r.to() 	 // 3
r.from = function () {
    return 0
}
r.from() // 0
```

使用闭包需要注意的是，会占用更多的内存，运行速度更加慢

### 构造函数的重载和工厂方法

有时希望对象的初始化有多种方式，可以根据传入的不同参数来进行不同的初始化操作，这个方法就是重载

```javascript
function Set() {
    this.values = {}
    this.n = 0
    // 根据传入的参数不同，进行不同的操作
    if (arguments.length === 1 && isArrayLike(arguments[0])) {
        this.add.apply(this, arguments[0])
    } else if (arguments.length > 0) {
     	this.add.apply(this, arguments)          
    }
}
```

工厂方法--一个类的方法用以返回类的实例

```javascript
// 返回 set 方法的实例
Set.fromArray = function (a) {
    s = new Array()
    s.add.apply(s, a)
    return a
}
```

## 子类

### 定义子类

`javaScript`的对象可以从类的原型对象中继承属性跟方法

```javascript
function inherit (o) {
    var fn = function () {}
    fn.prototype = o
    return new fn()
}
function A () {
    this.name = 'a'
}
A.prototype.name = function () {
    return 'a'
}
function B () {
    this.age = 'b'
}
B.prototype = inherit(A.prototype)
B.prototype.constructor = B
var a = new A()
var b = new B()

B {age: "b"}
	age: "b"
	__proto__: A // 由于B.prototype继承的是实例，实例中的原型继承 A.prototype
    	__proto__:  // 原型继承 A.prototype 中的方法
			name: ƒ ()
			constructor: ƒ A()
				__proto__: Object
```

如果不继承其他对象，那么原型对象仅仅是一个普通的对象，它只继承自`Object.prototype`。

```javascript
function defineSubclass(superclass, constructor, methods, statics) {
    constructor.prototype = inherit(superclass.prototype)
    constructor.prototype.constructor = constructor
    if(methods) extend(constructor.prototype, methods)
    if(statics) extend(constructor, statics)
    return constructor
}
var C = defineSubclass(A, function () {
    this.c = c
})
var c = new C()
{c: "c"}
	c: "c"
	__proto__: A
    	constructor: ƒ () // C constructor
		__proto__: 
			name: ƒ ()
			constructor: ƒ A() // A constructor
			__proto__: Object
```

### 构造函数和方法链

有时候在定义子类时，往往希望对父类的行为进行修改或扩充，而不是完全的使用或者替换它们。为了做到这一点，构造函数和子类的方法需要调用或链接父类构造函数以及父类原型中的方法。基本的方式是使用`apply`或者`call`

```javascript
function NonNullSet() {
    // 链接父类中的属性
    // 将父类作为普通函数调用，传入当前构造函数的上下文以及参数，则会将父类的属性添加到当前上下文中
    Set.apply(this, arguments)
}
NonNullSet.prototype = inherit(Set.prototype)
NonNullSet.prototype.constrcutor = NonNullSet
NonNullSet.prototype.add = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] == null)
            throw new Error('can not add null or undefined to ...')
    }
    // 调用的父类的add()方法来执行实际的插入操作，调用父类原型中的方法
    return Set.prototype.add.apply(this, arguments)
}
```

将上面的方法进行封装

```javascript
function filteredSetSubclass(superclass, filter) {
    var constructor = function () {
        superclass.apply(this, arguments)
    }
    constrcutor.prototype = inherit(superclass.prototype)
    constructor.prototype.constructor = constructor
    constructor.prototype.add = function () {
        for (var i = 0; i < arguments.length; i++) {
            if (!filter(arguments[i])) throw 'typeof error'
        }
        return superclass.prototype.add.apply(this, arguments)
    }
    return constructor
}
```

上面的代码中使用`Set.appy(this, arguments)`的方式，即使用普通函数调用的方式来调用`Set`函数，并为其指定上下文`this`，就可以就`Set`构造函数中的属性添加到当前的`this`对象上。后面右使用`Set.prototype.add.apply(this, arguments)`来调用`Set`原型中的方法，这样可以在父类方法的基础上进行修改。

### 组合 `vs` 子类

```javascript
Function.prototype.extend = function (constructor, methods, statics) {
    return defineSubclass(this, constructor, methods, statics)
}
var FilteredSet = Set.extend(
    function FilteredSet(set, filter) {
        this.set = set
        this.filter = filter
    },
    {
        remove: function () {
            this.set.remove.apply(this, arguments) // 调用set实例中的remove方法
            return this
        }
    }
)
var s = new FilteredSet(new Set(), function (x) { return x !== null})
// 将filteredSet实例传入，可以对已经过滤后的集合进行过滤
var t = new FilteredSet(s, function (x) { return !(x instanceof Set) })
```

使用组合的一个好处是，只需创建一个单独的`FilteredSet`子类即可。可以利用这个类的实例来创建任意带有成员限制的集合实例

### 类的层次结构和抽象类

...后续内容

## `ECMAScript 5`中的类

`ECMAScript 5`为属性特性增加了方法支持(`getter`，`setter`，`enumerable`，`configurable`与`writable`)，而且增加了对象可扩展性的限制。

### 让属性不可枚举

为一个对象添加属性时，使用`for-in`循环对这个对象进行遍历，那么新添加的属性也会被遍历到。在`es6`中可以通过设置属性为"不可枚举"来让属性不会被遍历到

```javascript
var testObj = {
    name: 'a'
}
Object.defineProperty(testObj, 'id', {
    get: function () {
        return 1
    },
    enumerable: false,
    configurable: false
})
for (prop in testObj) {
    console.log(prop) // name
}
console.log(testObj)
name: "a"
id: 1
get id: ƒ ()
__proto__: Object

delete testObj.id // false: configurable为false, 不可删除
```

### 定义不可变的类

除了可以设置属性为不可枚举的，还可以设置属性为只读的。可以使用`Object.defineProperties()`来为类创建原型对象，并将（原型对象的）实例方法设置为不可枚举的，就像内置的方法一样。

```javascript
function Range(from, to) {
    var props = {
        from: {
            value: from,
            enumerable: true,
            writable: false,
            configurable: false
        },
        to: {
            value: to,
            enumerable: true,
            writable: false,
            configurable: false
        }
    }
    if (this instanceof Range) {  // 判断当前对象是否时 Range 的实例，作为构造函数使用
        Object.defineProperties(this, props)
    } else {				// 作为普通函数调用，返回 以 Range.prototype 为原型的对象
        return Object.create(Range.prototype, props)
    }
}
var r1 = Range(1, 2)
r1.from = 3 // 修改from属性的值
r1.from = 1 // from 属性不可写
// 为 Range.prototype 对象添加属性特性配置
Object.defineProperties(Range.prototype, {
    includes: {
        value: function () {
            return this.from <= x && x <= this.to
        }
    }
})
```

上面的代码可以用来定义不可写以及不可删除的属性特性，但是对每一个对象属性都进行定义，会使代码的可读性变大更差，一个改进的做法就是将修改已定义属性的特性的操作定义为一个工具函数

```javascript
function freezeProps(o) {
    var props = arguments.length === 1 ? Object.getOwnPropertyNames(o) : Array.prototype.slice.call(arguments, 1)
    props.forEach(function (n) {
        Object.defineProperty(o, n, {
            writable: false,
            configurable: false
        })
    })
    return o;
}
function hideProps(o) {
    var props = arguments.length === 1 ? Object.getOwnPropertyNames(o) : Array.prototype.slice.call(arguments, 1)
    props.forEach(function (n) {
        Object.defineProperty(o, n, {
            enumerable: false
        })
    })
    return o
}

function Range(from, to, id) {
    this.from = from
    this.to = to
    this.id = id
    freezeProps(this)
}
Range.prototype = hideProps({
    include: function (x) {
        return this.from <= x && x <= this.to
    }
})
var r1 = new Range(1, 2, 333)
// {value: ƒ, writable: true, enumerable: false, configurable: true}
Object.getOwnPropertyDescriptor(Range.prototype, 'include')
// {value: 1, writable: false, enumerable: true, configurable: false}
Object.getOwnPropertyDescriptor(r1, 'from')
```

### 封装对象状态

构造函数中的变量和参数可以用做它创建的对象的私有状态。该方法在`ECMAScript3`中的一个缺点是，可以修改该状态的值。在`ECMAScript5`中可以通过设置`getter`与`setter`来将状态变量更加健壮地封装起来

```javascript
function Range(from, to, id) {
    function getFrom() {
        return from
    }
    function getTo() {
        return to
    }
    function setFrom(f) {
        if (f) {
            from = f   
        }
    }
    function setTo(f) {
        if (f) {
            to = f
        }
    }
    Object.defineProperties(this, {
        from: {
            get: getFrom,
            set: setFrom,
            enumerable: true,
            configurable: false
        },
        to: {
            get: getTo,
            set: setTo,
            enumerable: true,
            configurable: false
        }
    })
    freezeProps(this)
}
```

### 防止类的扩展

通常认为，通过给原型对象添加方法可以动态地对类进行扩展，这是`js`的特性。在`ECMASctipt 5`中可以对该特性进行限制。

1. `Object.preventExtensions()`可以将对象设置为不可扩展的，也就是说不能给对象添加任何新属性
2. `Object.seal()`阻止对象添加新属性，将已有的属性设置为不可配置（不能删除，但可写）
3. `Object.freeze()`阻止对象添加新属性，并将已有属性设置为不可配置以及只读

需要注意的是，如果一个对象中的属性继承了只读属性，那么为该属性赋值操作会失败，并且不会为其创建新属性。如果需要重写继承来的只读属性，那么就需要使用`Object.definePropertt`、`Object.defineProperties`、`Object.create`来创建这个新属性。

```javascript
function testObject() {}
testObject.prototype = {
    constructor: testObject,
    name: function () {
        console.log('name')
    }
}
Object.freeze(testObject.prototype)
function testProp () {}
testProp.prototype = inherit(testObject.prototype)
testProp.prototype.age = function () {
    console.log('age')
}
var prop = new testProp()
prop.name() // name
prop.name = 'prop name'
prop.name() // name
Object.defineProperty(prop, 'name', {})
prop.name // undefined
```

### 子类和`ECMAScript5`

在`ECMAScript5`中可以使用`Object.create()`来创建原型对象，这个原型对象继承子父类的原型，同时为新创建的对象定义属性，如果使用该方法创建对象时传入了参数`null`，那么这个创建的对象就没有继承任何成员。

```javascript
function StringSet() {
    this.set = Object.create(null)
    this.n = 0
}
StringSet.prototype = Object.create(Set.prototype, {
    constructor: StringSet,
    size: {
        value: function () {
            return this.n
        }
    }
})
var stringset = new StringSet()

```

### 属性描述符

```javascript
(function namespace () {
    function properties () {
        var names;
        if(arguments.length === 0) {
            names = Object.getOwnPropertyNames(this)
        } else if (arguments.length === 1 && Array.isArray(arguments[0])) {
            names = arguments[0]
        } else {
            names = Array.prototype.splice.call(arguments, 0)
        }
        return new Properties(this, names)
    }
    // 为 object.prototype 中添加 properties 方法，该方法返回一个 Properties 实例
    Object.defineProperty(Object.prototype, 'properties', {
        value: properties,
        enumerable: false,
        writable: true,
        configurable: true
    })
    // Properties 构造函数
    function Properties(o, names) {
        this.o = o
        this.names = names
    }
    Properties.prototype.hide = function () {
        var o = this.o
        var hidden = {
            enumerable: false
        }
        this.names.forEach(function (ele) {
            if (o.hasOwnProperty(ele)) {
                Object.defineProperty(o, ele, hidden)
            }
        })
        return this
    }
    Properties.prototype.freeze = function () {
        var o = this.o
        var freeze = {
            writable: false,
            configurable: false
        }
        this.names.forEach(function (ele) {
            if (o.hasOwnProperty(ele)) {
                Object.defineProperty(o, ele, freeze)
            }
        })
    }
    Properties.prototype.descriptors = function () {
        var o = this.o
        var desc = {}
        this.names.forEach(function (ele) {
            if (o.hasOwnProperty(ele)) {
                desc[ele] = Object.getOwnPropertyDescriptor(o, ele)
            }
        })
        return desc
    }
})()
var o = {}
o.name = 1
o.age = 2
// 调用继承的 object.prototype 中的 properties 方法，该方法返回 Properties 实例
// 可以采用链式调用 Properties 实例中的方法对 o 对象中的属性进行操作
o.properties().descriptors()
age: {value: 2, writable: true, enumerable: true, configurable: true}
name: {value: 1, writable: true, enumerable: true, configurable: true}
```

## 模块

将代码组织到类中的一个原因是，让代码更加的“模块化”，可以在很多不同的场景中实现代码的重用。但是类不是唯一的模块化代码的方式。一般来讲，模块是一个独立的`js`文件。模块文件可以包含一个类定义、一组相关的类、一个实用函数库或者是一些待执行的代码。只要是以模块的形式编写的代码，任何`js`代码段都可以当作一个模块

在`ECMAScript 5` 以前，服务器端模块化使用`CommonJS`规范，浏览器端使用`AMD`规范。在`ECMASCript 5`中，可以使用`import `与`export`进行模块的导入与导出

模块化的目标是支持大规模的程序开发，处理分散源中代码的组装，并且能让代码正确的运行，即使代码包含了作者所不期望出现的模块代码，也可以正确地执行代码。为了做到这一点，不同的模块必须避免修改全局执行上下文，因此后续模块应当在它们所期望运行的原始上下文中执行。这也意味着模块应当尽可能少的定义全局标识，理想状况是，所有模块都不应当定义超过一个全局标识。

### 用作命名空间的对象

在模块的创建过程中，避免污染全局变量的一种方法是使用一个对象作为命名空间。它将函数和值作为命名空间对象属性存储起来，而不是定义全局函数和变量

```javascript
var sets = {} // 命名空间对象
sets.SingletonSet = sets.AbstractEnumerableSet.extend(...) // 向对象中添加方法
var s = new sets.SingletonSet(1) // 使用命名空间对象中的方法
```

最顶层的命名空间往往用来标识创建模块的作者或者组织，并避免命名空间的命名冲突。比如，`google`的`Closure`库在它的命名空间`goog.structs`中定义了`Set`类。这样创建的命名空间前缀是全局唯一的，一般不会被其他模块作者采用。

按照约定，模块的文件名应当和命名空间匹配。如`sets`模块应当保存在`sets.js`中，如果这个模块使用命名空间`collections.sets`，那么这个文件应当保存在目录`collections/`下（这个目录还应当包含另一个文件`maps.js`）。

### 作为私有命名空间的函数

模块对外导出一个公用`API`，这些`API`是提供给其他程序员使用的，包括函数、类、属性和方法。但模块的实现往往需要一些额外的辅助函数和方法，这些函数和方法并不需要在模块外部可见。

可以通过将模块定义在**某个函数**的内部来实现。在一个函数中定义的变量和函数都属于函数的局部成员，在函数的外部是不可见的。所以可以将这个函数作用域用作模块的私有命名空间。

```javascript

```

上面的代码中使用了立即执行的匿名函数，这在`js`中是一种惯用法。如果想让代码在一个私有命名空间中运行，只须要给这段代码加上前缀`(function() { code...}())`。开始的左圆括号确保这是一个函数表达式，而不是函数定义语句

一旦将模块代码封装进一个函数，就需要一些方法导出其公用`API`,以便在模块函数的外部调用。在上面的例子中，模块函数返回构造函数，这个构造函数赋值给一个全局变量。将构造函数返回即将该模块的`API`导出在函数作用域之外。如果模块`API`包含多个单元，则可以返回一个命名空间对象。

```javascript

```

还可以将模块函数当作构造函数，使用`new`来调用，通过将它们赋值给`this`来将其导出

```javascript
var collections;
if (!collections) collections = {}
collections.sets = ( new function namespace() {
    ...code
    this.AbstractSet = AbstractSet
    this.NotSet = NotSet
    this.AbstractEnumerableSet = AbstractEnumerableSet
})
```

除了上面两种方式，还可以在模块函数内部直接设置全局对象

```javascript
var collections;
if (!collections) collections = {}
collections.sets = {}
(function namespace() {
    collections.sets.AbstractSet = AbstractSet
    collections.sets.NotSet = NotSet
    collections.sets.AbstractEnumerableSet = AbstractEnumerableSet
})

```

注： 上面的内容来自于 `《javaScript》权威指南`