# 数组

`javaScript`的数组是无类型的，数组元素也可以是任意类型。`javaScript`数组是动态的，根据需要它们会增长或者缩短。也可能是稀疏的：数组元素的索引不一定要连续的，它们之间可以有空缺。每一个`javaScipt`数组都有一个`lenght`属性，对于非稀疏数组，该属性的就是数组元素的个数。对于非稀疏数组，`length`比所有元素的索引要大。

在`js`中，数组是对象的特殊形式，数组索引实际上与属性名为整数的对象差不多。数组的实现是经过优化的，通过数组索引来访问元素比对象访问属性要快许多。

## 创建数组

- 数组直接量
  - `var empty = [], var misc = [1, '2', []]`
  - 数组中省略的值会被赋值为`undefined`
  - 允许有可选的结尾的逗号，`[,,]`的长度为2
- 使用构造函数`Array`

## 数组元素的读和写

区分数组的索引与对象的属性名，所有的索引都是属性名，但是只有`0~2^32 - 2`之间的整数属性名才是索引。所有的数组都是对象，可以为其创建任意名字的的属性。但如果使用的属性是数组的索引，数组的特殊行为就是根据需要更新其`length`属性值。

```javascript
var arr = [1, 3, 4]
arr[4] = 2
arr.length // 5
arr.new = 4 // 添加属性名为new的属性
arr.length // 5: 只维持属性名在0~2^32-2之间的整数属性
```

数组索引仅仅是对象属性名的一种特殊类型，当试图查询任何对象中不存在的属性时，不会报错，只会返回`undefined`

数组也是对象，所以也可以从原型中继承元素。在`es6`中，数组可以定义元素的`getter`和`setter`方法。

## 稀疏数组

稀疏数组就是包含从0开始的不连续索引的数组。通常，数组的`length`属性值代表数组中元素的个数，如果数组是稀疏的，`length`属性值大于元素的个数。可以使用`Array()`构造函数或者指定数组的索引大于当前的数组长度来创建稀疏数组

```javascript
a = new Array(4) // 数组中没有元素，但是长度为4
a = []
a[1000] = 4
```

绝大多数`js`数组不是稀疏数组，即使有该数组，那么代码会像对待非稀疏数组一样对待，中间包含`undefined`值

## 数组长度

每个数组都有一个`length`属性，就是这个属性使其区别于常规的`js`对象，`length`的两个特殊行为

- 为一个数组赋值，它的索引大于或等于现有数组的长度，则`length`设置为`i+1`
- 将`length`设置为一个小于当前的非负整数`n`时，当前数组那些索引值大于或等于`n`的元素将会被删除

将`length`设置为大于当前的长度，则会在数组尾部创建一个空的区域，并不会向其中添加新的值。在`es6`中，可以使用`Object.defineProperty()`将数组中的`length`设置为只读的

```javascript
var a = [1, 2, 3]
Object.defineProperty(a, 'length', {
    writable: false
})
a.length = 1 // 设置a的length
console.log(a.length) // 3, a数组的length长度没有改变
```

## 数组元素的添加和删除

- 添加数组元素
  - 使用方括号，为新索引赋值: `a[1] = 2`
  - 使用`push()`方法在数组末尾增加一个或多个元素: `a.push('1', '2')`
  - 使用`unshift()`方法在数组首部插入一个元素，并且将其他元素依次移动到更高的索引处。
- 删除数组元素
  - 使用`delete`操作符，但是该操作符不会修改数组的`length`属性，也不会将元素从高处向下移动填充空白：`delete a[0]`
  - 设置`length`属性为一个新的长度来删除数组尾部的元素
  - 使用`pop()`方法，使其数组长度减1，删掉数组尾部元素，并返回删掉的元素
  - 使用`shift()`，从数组头部删除一个元素

`splice()`是一个通用的方法来插入，删除或者替换数组元素。它会根据需要修改`length`属性并移动元素到更高或较低的索引处。

## 数组遍历

- 使用`for`循环

```javascript
var arr = [1, 2, 3, 4, 5]
for(var i = 0; i < arr.length; i++) {}
// 在嵌套循环或其他性能非常重要的上下文中，需要将上面的代码进行优化，缓存数组的长度len
for (var i = 0, len = arr.length; i < len; i++) {}
// 若数组为稀疏数组，操作之前需要判断当前值
for (var i = 0, len = arr.length; i < len; i++) {
    if (!arr[i])	continue // 跳过null、undefined和不存在
    if (arr[i] === undefined)  continue// 跳过undefined
    if (!(i in arr))  continue// 跳过不存在
}
```

- 使用`for/in`循环，
  - 可以来处理稀疏数组，循环每次将一个可枚举的属性名赋值给循环变量，不存在的索引不会遍历到。
  - 但是`for/in`也可以遍历到继承的可枚举方法，如添加到`Array.prototype`中的方法，可以使用`hasOwnProperty()`来排除继承的属性。
  - 除此之外，`for/in`循环以不同的顺序遍历对象的属性

```
var a = new Array(5)
a[1] = 1
a[3] = 3
for (var i in a) {
    console.log(i, a[i]) // 1 1, 3 3:不会遍历到不存在的属性a[0],a[2],a[4]
}
```

- 使用`forEach()`等函数

## 多维数组

`js`不支持真正的多维数组，但是可以使用数组的数组来近似

## 数组方法

### `join()`

`Array.join()`方法将数组中的所有元素转换为字符串拼接在一起，返回最后生成的字符串。可以指定一个可选的字符串在生成的字符串中来分隔数组中的各个元素。**原数组未改变**

```javascript
var a = [1, 2, 3]
a.join('') 		// '123'
a.join('1') 	// '11213'
a.join(',')		// '1,2,3'
a.join(' ')		// '1 2 3'
a.join()		// '1,2,3':	不传入参数，则分隔字符串为,
var b = new Array(10)
b.join('-')		// "---------"
```

`Array.join()`方法是`String.split()`方法的逆向操作，后者是将字符串分隔为若干块来创建一个数组

### `reverse()`

`Array.reverse()`方法将数组中的元素颠倒顺序，返回逆序的数组。它采取的是替换模式，而不是将数组元素重新排列返回新的数组。**原数组被修改**。

```javascript
var a = [1, 2, 3]
a.reverse() // [3, 2, 1]
a 			// [3, 2, 1]
```

### `sort()`

`Array.sort()`方法将数组中的元素排序并返回排序后的数组，**原数组被修改**。当不带参数调用`sort()`时，数组元素以字母表的顺序进行排序，`undefined`元素会被排到数组的尾部

```javascript
var a = new Array('banna', undefined, 'cherry', 'apple')
a.sort() // ["apple", "banna", "cherry", undefined]
```

使用其他方式进行排序，为`sort`方法传入一个函数

- 第一个参数在前，则函数返回小于`0`的数值
- 第一个参数在后，函数返回大于`0`的数值
- 第一个参数与第二个参数的顺序无关紧要，则返回`0`

```javascript
var a = [111, 2, 334, 809]
a.sort()
// (4) [111, 2, 334, 809]
a.sort(function (a, b) {
	return a - b // 升序
})
// (4) [2, 111, 334, 809]
a
// (4) [2, 111, 334, 809] : 原数组被改变
```

### `concat()`

`Array.concat()`方法创建并返回一个新的数组，所以**不会修改原数组**。如果参数是数组，则连接的是元素，而不是数组本身，但是需要注意的是，`concat()`不会扁平化数组的数组。

```javascript
var a = [1, 2, 3]
a.concat(4, 5)	// [1, 2, 3, 4, 5]
a				// [1, 2, 3]
a.concat(4, [5, 6])	// [1, 2, 3, 4, 5, 6]
a.concat([4, 5], [6, 7])	// [1, 2, 3, 4, 5, 6, 7]
a.concat([4, 5, [6, 7]], [8, [9, 10]])	// [1, 2, 3, 4, 5, [6, 7], 8, [9, 10]]
```

数组扁平化：

- `concat()`：只能扁平化一层

- `...`扩展符：只能展开一层数组

- `toString`：将其中的值也转换为了字符串

- `join`：与`toString`方法相同

  ```javascript
  [1, 2, 3, [4, 5, [6, 7]]].toString() // "1,2,3,4,5,6,7"
  [1, 2, 3, [4, 'b', ['a', 7]]].toString() // "1,2,3,4,b,a,7"
  [1, {}, 3, [4, 'b', ['a', 7]]].toString() // "1,[object Object],3,4,b,a,7"
  [1, [], 3, [4, 'b', ['a', 7]]].toString() // 1,,3,4,b,a,7"

    var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
    arr.toString().split(',').map(Number)
    // [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10]
  ```

### `slice()`

`Array.slice()`返回指定数组的一个片段或者子集，**不会修改原数组**，参数分别指定了数组切割开始和结束位置

- 返回的数组包含起始位置的值，但是不包含终点位置的值。
- 不指定终点位置，则返回到数组最后一个元素
- 若参数为负数，则相对于数组中的最后一个元素的位置

```javascript
var a = [1, 2, 3, 4, 5]
a.slice(1, 2) // [2]
a.slice(2) // (3) [3, 4, 5]
a.slice(2, -1) // (2) [3, 4]
a // (5) [1, 2, 3, 4, 5]
a.slice() // (5) [1, 2, 3, 4, 5]
```

### `splice()`

`Array.splice()`方法是在数组中插入或者删除元素的通用方法，**会修改调用数组**。第一个参数指定了插入或者删除的起始位置，第二个参数指定了要操作的元素个数，若省略，则从起始位置到数组结尾的所有元素都会被删除，后面的任意个数的参数为被插入的元素，从起始位置开始插入。返回一个由删除元素组成的数组，没有删除则返回空数组

```javascript
var a = [1, 2, 3, 4, 5, 6, 7]
a.splice(1, 2) // (2) [2, 3]
a // (5) [1, 4, 5, 6, 7]
a.splice(3) // (2) [6, 7]
a // (3) [1, 4, 5]
a.splice(0, 0, 4, 4, 4, 4) // []
a // (7) [4, 4, 4, 4, 1, 4, 5]
a.splice(1, 2, [1, 2], 3, 4) // (2) [4, 4]
a // (8) [4, [1, 2], 3, 4, 4, 1, 4, 5]
```

与`concat()`不同的是，这里直接插入数组，而非数组元素

### `push()`与`pop()`

`push()`方法和`pop()`方法允许将数组当做栈来使用.`push()`方法在数组的尾部添加一个或多个元素，并返回数组的新长度。`pop()`方法在数组的尾部删除一个元素，减小数组长度，并返回删除的值。两个方法都会**修改原来的数组**

### `unshift()`与`shift()`

`unshift()`与`shift()`是在数组的头部添加与删除数组。`unshift()`在数组的头部添加一个或多个元素，并将已存在的元素移动到更高索引的位置来获取足够的空间，返回数组新长度。`shift()`删除数组头部的元素，返回删除的元素，并将数组内的所有元素下移。

注意：数组左边是头部，右边是尾部

```javascript
var a = []
a.unshift(1) // 1
a // [1] 
a.push(2) // 2
a // (2) [1, 2]
a.unshift(3) // 3
a // (3) [3, 1, 2]
a.unshift([4, 5], 6) // 5
a // (5) [Array(2), 6, 3, 1, 2]
a.push(8) // 6
a // (6) [Array(2), 6, 3, 1, 2, 8]
```

当使用多个参数调用`unshift`的时候，参数是一次性插入的而非一次一次的插入，否则顺序应该相反。

### `toString`与`toLocalString()`

该方法将其每个元素转化为字符串，并且输出用逗号分隔的字符串列表，注意，输出不包括方括号或其他任何形式的包裹数组值的分隔符

```javascript
var a = [1, 2, 3, [4, 5]]
a.toString() // "1,2,3,4,5"
a.join()	 // "1,2,3,4,5"
var a = ['b', [1, 'c']]
a.toString() // "b,1,c"
a.join()	// "b,1,c"
```

这里与不使用任何参数调用`join()`方法返回的字符串是一样的，但是向`join()`中传入分隔符，则分隔符的位置只在一层数组的位置

```javascript
var a = ['b', [1, 'c']]
a.join() // "b,1,c"
a.join('|') // "b|1,c"
```

## `ECMAScript5`中的数组方法

`ECMAScript5`中定义了9个新的数组方法来遍历，映射，过滤、检测、简化和搜索数组，这里面的方法中，大部分方法的一个参数为一个函数，为函数提供了三个参数：数组元素，元素的索引和数组本身。

### `forEach`

`forEach`方法从头至尾遍历数组，为每个元素调用指定的函数。

```javascript
var a = [1, 2, 3, 4]
var sum = 0
a.forEach(ele => {
	sum += ele
})
console.log(sum) // 10
```

注意，`forEach()`无法在所有元素都传递给调用的函数之前终止遍历，也就是说，没有像`for`循环中使用的相应的`break`语句。如果要提前终止，必须把`forEach()`方法放在一个`try`块中，并能抛出一个异常。如果`forEach()`调用的函数抛出`foreach.break`异常，循环就会提前终止。

```javascript
function foreach(a, f, t) {
    try {
        a.forEach(f, t)
    }
    catch(e) {
        if (e === foreach.break)	return
        else throw e;
    }
}
foreach.break = new Error('StopIteration')
```

### `map()`

`map()`方法将调用的数组的每个元素传递给指定的函数，并返回一个数组，它包含该函数的返回值。

```javascript
var a = [1, 2, 3, 4]
var b = a.map(ele => ele * 2)
console.log(a)	// [1, 2, 3, 4]
console.log(b)	// [2, 4, 6, 8]
```

传递给`map`的函数应该有返回值，并且返回的是新数组，**原来的数组没有改变**。如果是稀疏数组，返回的也是相同方式的稀疏数组：它具有相同的长度，相同的缺失元素。最后需要注意的是，传入`map`的函数中，也不能使用`break`跳出循环

```javascript
var a = [1, 2, 3, 4]
var b = a.map(ele => {
	if (ele === 3) {
		break
	}
	return ele * 2
})
// 抛出语法错误
// VM1478:4 Uncaught SyntaxError: Illegal break statement
//    at Array.map (<anonymous>)
//     at <anonymous>:2:11
// (anonymous) @ VM1478:2
```

### `filter()`

`filter()`方法返回的数组元素是调用数组的一个子集。传递的函数是用来逻辑判定的：该函数返回的是`true`还是`false`，如果返回值为`true`或者为能够转化为`true`的值，那么传递给判定函数的元素就是这个子集的成员，它将会被添加到一个作为返回值的数组中

```javascript
var a = [1,, 2, 3, 4]
var b = a.filter(ele => {
	return ele > 2
})
console.log(b) //  (2) [3, 4]
```

需要注意的是，`filter`会跳过稀疏数组中缺少的元素，它的返回值总是稠密的。为了压缩稀疏数组的空缺，可以像下面这样写

```javascript
var a = new  Array(5)
a[1] = 3, a[4] = 6
var b = a.filter(() => {
    return true // 返回值能够转换为 true 的元素
})
console.log(b) // [3, 6]
console.log(a) // [empty, 3, empty * 2, 6]

// 压缩空缺并且珊瑚undefined和null元素
a[0] = null
a[2] = undefined
console.log(a) // [null, 3, undefined, empty, 6]
b.filter(ele => {
    return ele !== undefined && ele !== null
})
```

### `every()`和`some()`

`every()`和`some()`方法是数组的逻辑判定：它们对数组元素应用指定的函数进行判定，返回`true`或`false`。`every()`方法为当且仅当数组中的所有元素调用判断函数都返回`true`，那么它才返回`true`

```javascript
var a = [3, 4, 5, 6]
var b = a.every(ele => {
	return ele < 10
})
b // true
var c = a.every(ele => {
	return ele % 2 === 0
})
console.log(c) // false
```

`some()`方法当数组中至少有一个元素调用判定函数返回`true`,它就返回`true`,当且仅当数组中的所有元素调用判定函数都返回`false`，它才会返回`false`

```javascript
var a = [3, 4, 5, 6]
var b = a.some(ele => {
	return ele >4
})
b // true
var c = a.some(ele => {
	return ele > 7
})
c // false
```

注意，一旦`every()`和`some()`确认该返回什么值，它们就会停止遍历数组元素。`some()`在判定函数第一次返回`true`就会返回`true`，但如果判定函数一直返回`false`，那么它将会遍历整个数组。`every()`在判定函数第一次返回`false`，就返回`false`，但如果判定一直返回`true`，它将会遍历整个数组。

### `reduce()`和`reduceRight()`

`reduce()`和`reduceRight()`方法使用指定的函数将数组元素进行组合，生成单个值。这个方法需要两个参数，第一个是执行化简操作的函数，化简操作的任务就是使用某种方法把两个值组合或化简为一个值，并返回化简后的结果。第二个（可选）的参数是一个传递给函数的初始值。

传入`reduce`中的化简函数的第一个参数是到目前为止的化简操作所累积的结果，第一次调用函数时，第一个参数是一个初始值（也就是传递给`reduce`的第二个参数），如果没有指定初始值，那么就将使用数组的第一个元素作为其初始值。在接下来的调用中，这个值就是上一次化简函数所返回的值。

```javascript
var a = [1, 2, 3, 4, 5]
// 未指定初始值，使用数组的第一个元素
var b = a.reduce((x, y) => {
	console.log(x, y)
	return x + y
})
// 1 2
// 3 3
// 6 4
// 10 5
// 指定初始值，使用初始值作为第一次化简函数调用的x参数
var c = a.reduce((x, y) => {
	console.log(x, y)
	return x + y
}, 10)
// 10 1
// 11 2
// 13 3
// 16 4
// 20 5
```

在空数组上，不带初始值参数调用`reduce()`将导致类型错误异常。如果调数组只有一个元素并且没有指定初始值或者有一个空数组，指定了一个初始值，那么`reduce()`只是简单的返回那个值而不会做调用简化函数

```javascript

var a = []
// 没有执行化简函数，所以没有conosle.log打印
// 只是简单的返回了初始值
var b = a.reduce((x, y) => {
	console.log(x, y)
	return x + y
}, 10)
b // 10
// 没有执行化简函数，所以没有conosle.log打印
// 只是简单的返回了数组中的值
var a = [1]
var b = a.reduce((x, y) => {
	console.log(x, y)
	return x + y
})
b // 1
```

`reduceRight()`的工作原理和`reduce()`一样，不同的是它按照数组的索引从高到低处理数组，而不是从低到高

`reduce()`与`reduceRight()`除了计算数字之外，还可以计算一些复杂的东西，比如，可以将数组中的所有对象元素合并

```javascript
var objects = [{x: 1}, {y: 2}, {z: 3}]
var merge = objects.reduce((x, y) => {
    for (prop in y) {
        x[prop] = y[prop]
    }
    return x
})
```

### `indexOf()`和`lastIndexOf()`

`indexOf()`与`lastIndexOf()`搜索整个数组中具有给定值的元素，返回找到的第一个元素的索引，或者没有找到就返回`-1`。`indexOf()`从头至尾搜索，`lastIndexOf()`则反向搜索。第一个参数是需要搜索的值，第二个参数指定开始搜索的位置

```javascript
在一个数组中搜索指定的值并返回包含所有匹配的数组索引的一个数组
function findAll(a, x) {
    var results = []
    var len = a.length
    var pos = 0
    while(pos < len) {
        pos = a.indexof(x, pos)
        if (pos === -1) break
        results.push(pos)
        pos++
    }
    return results
}
var a = [1, 3, 4, 3, 4, 5]
var b = findAll(a, 3) // [1, 3]
```

## 数组类型

数组是具有特殊行为的对象，在`es6`中，可以使用`Array.isArray()`函数来判断是对象还是数组

```javascript
Array.isArray([]) // true
Array.isArray({}) // false
```

在`es5`以前，由于数组是一种特殊的对象，所以不能使用`typeof`操作符，`typeof`操作符只能区别原始类型与对象类型，可以使用`instanceof`操作符来区别

```javascript
[] instanceof Array // true
({}) instanceof Array // false
```

但是使用`instanceof`的问题是在浏览器中可能会有多个窗口或者窗体(`frame`)存在，每个窗口都会有自己的`javaScript`环境，有自己的全局对象，并且，每个全局对象都有自己的构造函数。因此一个窗体中的对象将不可能是另外窗体中的构造函数的实例，所以使用`instanceof`来判断是不可靠的

解决办法检测对象的类属性

```javascript
var isArray = function (o) {
	return typeof o === 'object' && Object.prototype.toString.call(o) === '[object Array]'
}
```

## 类数组对象

在`js`中，数组是一种特殊类型的对象，有一些其他对象没有的特性：

- 当有新的元素添加时，自动更新`length`属性
- 设置`length`为较小值时将截断数组
- 会从`Array.prototype`中继承方法
- 类属性为`Array`

上面的特性使数组与对象有明显的区别，但是并不是定义数组的本质特征。可以把拥有一个数值`length`属性和对应非负整数属性的对象看做一种类型的数组。

```javascript
var a = {}
var i = 0
while (i < 6) {
	a[i] = i * i
	i++
}
a.length = i
var total = 0
for (var j = 0; j < a.length; j++) {
	total += a[j]
}
```

上面的代码中为对象`a`添加了属性名为非负整数的属性和`length`属性，就可以使用`for`循环像数组一样进行遍历。

在`js`中，`arguments`对象就是一个类数组对象，在浏览器中，`DOM`的一些方法，如`document.getElementsByTagName`返回的也是类数组对象。

检测是否是类数组对象条件：

- 是一个对象
- 其`length`为非负整数

```javascript
function isArrayLike(o) {
	if (o&&										// 判断o是否存在
		typeof o === 'object' &&				// 判断o是否是对象
		isFinite(o.length) &&					// o.length是有限值
		o.length > 0 &&							// o.length 非负
		o.length === Math.floor(o.length) &&	// o.length 整数
		0.length < 4294967296)					// o.length < 2 ^32
		return true
	else
		return false
}
```

类数组没有继承自`Array.prototype`，不能在它们上面直接调用数组方法，但是可以间接的使用`Function.call`方法进行调用

```javascript
var a = {
	"0": "a",
	"1": "b",
	"2": "c",
	length: 3
}
Array.prototype.join.call(a) // "a,b,c"
Array.prototype.slice.call(a, 0) // (3) ["a", "b", "c"] 返回数组的副本
Array.prototype.slice.call(a, 1)  // ["b", "c"]
```

在`Firefox`中，数组还有许多的静态方法可以让类数组调用

```javascript
var a = {
	"0": "a",
	"1": "b",
	"2": "c",
	length: 3
}
Array.join(a)
Array.slice(a, 0)
```

但是上面的静态方法不是标准的，不是在任何浏览器中都可以调用，可以进行适当的修改

```javascript
Array.join = Array.join || function (a, sep) {
    return Array.prototype.join.call(a, sep)
}
Array.slice = Array.slice || function (a, from, to) {
    return Array.prototype.slice.call(a, from, to)
}
Array.map = Array.map || function (a, f, thisArg) {
    return Array.prototype.map.call(a, f, thisArg)
}
```

## 作为数组的字符串

在`es6`中，字符串的行为类似于只读的数组，除了可以使用`charAt()`方法来访问单个的字符以外，还可以使用方括号

```javascript
var str = '123123'
str.charAt(3) // '1'
str[3]		  // '1 '
```

字符串的行为类似于数组，就可以将数组的许多方法应用在字符串上

```javascript
var str = '123123123' 
Array.prototype.join.call(str, ' ') // "1 2 3 1 2 3 1 2 3"
```

需要注意的是，字符串的值本身是不可变的，当作为数组使用的时候，是只读的，如果在字符串上面调用修改数组本身的方法，如`sort()`、`reverse()`等是无效的，还导致错误，并且没有出错提示