# `Iterator`和`for...of`循环

## `Iterator`(遍历器)的概念

在`javascript`中表示“集合”的数据结构主要是`array`，`object`，`map`，`set`结构，用户可以分开或者组合使用这些数据结构，这个时候就需要一种统一的接口机制来处理所有不同类型的数据结构。`iterator`就是这样一种机制，它提供一种接口，为不同的数据结构提供统一的访问机制。任何数据结构，只要部署了`interator`接口，就可以完成遍历操作

`iterator`的作用：

- 为各种数据结构提供一个统一的，方便的访问接口
- 使得数据结构的成员能够按照某种次序进行访问
- 使用`for of`进行遍历

`iterator`遍历操作如下：

- 创建一个指针，指向当前数据结构的起始位置
- 第一次调用，执行`next()`方法，将指针指向数据结构的第一个成员
- 第二次调用，执行`next()`方法，将指针指向数据结构的第二个成员
- 不断调用指针对象的`next`方法，直到它只想数据结构的结束位置

每次调用`next`方法都会返回数据结构的当前成员信息，也就是一个对象，该对象中包含`value`和`done`两个属性的对象，`value`表示当前成员的值，`done`表示当前遍历是否结束

模拟`next`方法

```javascript
function makeIterator(arr) {
    let index = 0
    return {
        next: function () {
            if (index < arr.length) {
                return {
                    value: arr[index++],
                    done: false
                }
            } else {
                return {
                    value: undefined,
                    done: true
                }
            }
        }
    }
}
let iterator = makeIterator(['a', 'b', 'c', 'd'])
// {value: "a", done: false}
iterator.next()
// {value: "b", done: false}
iterator.next()
{// value: "c", done: false}
iterator.next()
// {value: "d", done: false}
iterator.next()
// {value: undefined, done: true}
```

## 默认`Iterator`接口
`iterator`接口的目的是为所有数据结构提供一种统一的访问机制，即`for...of`循环。当使用`for...of`循环来遍历某种数据结构的时候，该循环会自动去寻找`Iterator`接口

`ES6`规定默认的`Iterator`接口部署在数据接口的`Symbol.iterator`属性中，也就是说，一个数据结构只要具有`Symbol.iterator`属性，那么就可以认为其是可遍历的。调用当前`Symbol.iterator`方法，就可以得到当前数据结构默认的遍历器生成函数

```javascript
const obj = {
    [Symbol.iterator]: function () {
        return {
            next: function () {
                return {
                    value: 'a',
                    done: false
                }
            }
        }
    }
}
```
上面的代码中为`obj`对象部署了`Symbol.iterator`接口，使其变成了可遍历的

`ES6`的有些数据结构原生具备`Iterator`接口，即不用任何处理就可以被`for...of`新欢遍历。这些数据结构原生部署了`Symbol.iterator`属性。所有部署了`Symbol.iterator`属性的数据接口都称为部署了遍历器接口，调用这个接口就会返回一个遍历器对象

原生具备`Iterator`接口的数据结构如下：
  
- `Array`
- `Set`
- `Map`
- `String`
- `TypedArray`
- 函数`arguments`对象
- `NodeList`对象

```javascript
// NodeList对象原生部署了Symbol.iterator接口
var nodelist = document.getElementById('form')
var nodelistArr = nodelist[Symbol.iterator]()
nodelistArr.next()
// {value: input, done: false}
nodelistArr.next()
// {value: input, done: false}
nodelistArr.next()
// {value: input, done: false}
nodelistArr.next()
// {value: input, done: false}
nodelistArr.next()
// {value: undefined, done: true}
```

除了上面的数据结构外，其他类型的数据结构（主要是对象）的`Iterator`接口都需要自己在`Symbol.iterator`属性上面部署，这样才会被`for...of`循环遍历

对象没有默认部署`Iterator`接口，是因为对象属性的遍历先后顺序是不确定的，需要开发者手动指定。本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器就等于部署一种线性转换

对于类似数组的对象（存在数值键名和`length`属性），可以直接引用数组的遍历器接口

```javascript
nodelist.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]

var obj = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
    4: 'e',
    length: 5,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
}
for (var data in obj) {
    console.log(data)
}
// 0 1 2 3 4 length
for (var data of obj) {
    console.log(data)
}
// 0 1 2 3 4
// 由于next函数是移动指针来获取值，所以其指针必须是线性结构，也就是键名需要为数值
// 不能遍历其他非数值属性
```

注意，对普通的对象部署数组的`iterator`方法并没有效果

```javascript
var obj = {
    a: 'a',
    b: 'b',
    length: 2,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
}
for (var data of obj) {
    console.log(data)
}
// undefined undefined undefined
```

如果其`Symbol.iterator`方法不是一个遍历器生成函数，那么`javascirpt`引擎会报错

```javascript
var obj = {
    a: 'a',
    b: 'b',
    length: 2,
    [Symbol.iterator]: () => {}
}
for (var data of obj) {
    console.log(data)
}
// Uncaught TypeError: Result of the Symbol.iterator method is not an object
// at VM2203 iterator:56
```

## 调用`Iterator`接口的场合

有一个场合会默认调用`iterator`接口，也就是`Symbol.iterator`方法

- 解构赋值, 对数组和`set`结构进行结构赋值时，会默认调用`Symbol.iterator`方法
- 扩展运算符
- `yield*`
- 其他场合
  - `for...of`
  - `Array.from()`
  - `Map()`, `Set()`, `WeakMap()`和`WeakSet()`
  - `Promise.all()`
  - `Promise.race()`

## 字符串的`Iterator`接口

字符串是一个类数组对象，具有原生的`iterator`

```javascript
var string = 'hello world'
string
"hello world"
var strIterator = string[Symbol.iterator]()
undefined
strIterator.next()
// {value: "h", done: false}
strIterator.next()
// {value: "e", done: false}
strIterator.next()
// {value: "l", done: false}
strIterator.next()
// {value: "l", done: false}
strIterator.next()
// {value: "o", done: false}
strIterator.next()
// {value: " ", done: false}
strIterator.next()
// {value: "w", done: false}
strIterator.next()
// {value: "o", done: false}
strIterator.next()
// {value: "r", done: false}
strIterator.next()
// {value: "l", done: false}
strIterator.next()
// {value: "d", done: false}
strIterator.next()
// {value: undefined, done: true}
```

可以覆盖原生的`Symbol.iterator`方法达到修改遍历器行为的目的

## `Iterator`接口与`Generator`函数

后续学习

## 遍历器对象的`return()`、`throw()`

遍历器对象除了具有`next`方法，还可以具有`return`方法和`throw`方法。

- `return`方法使用场景
  - 在`for...of`循环中提前退出（出错或者使用`break`, `continue`）
  - 在遍历完成前需要清理或者释放资源

```javascript
function readLinesSync (file) {
    return {
        next () {
            return { done: true }
        },
        return () {
            file.done()
            return {
                done: true
            }
        }
    }
}
```

## `for...of`循环

一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有`iterator`接口，就可以使用`for...of`循环遍历它的成员。也就是说，`for...of`循环内部调用的是数据结构的`Symbol.iterator`方法

### 数组

数组原生具备`iterator`接口

```javascript
var arr = ['green', 'blue', 'red']
for (var data of arr) {
    console.log(data)
}
// green
// blue
// red
var obj = {}
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr)

for (var i of obj) {
    console.log('i', i)
}
// i green
// i blue
// i red
for (var a in arr) {
    console.log('a', a)
}
// a 0
// a 1
// a 2
```

`for...in`与`for...of`的区别：

- `for...in`获得的对象的键名，不能直接获取键值。`for...of`允许遍历获得键值
- `for...in`会返回所有自身以及继承的可枚举属的键值，`for...of`只返回具有数字索引的属性

### `Set`和`Map`结构

`Set`和`Map`结构原生具有`iterator`接口，可以直接使用`for...of`循环

```javascript

var engines = new Set(["1", "2", "3"])
for (var data of engines) {
    console.log(data)
}
var map = new Map().set('a', 1).set('b', 2)
for (var [key, value] of map) {
    console.log
}
```

### 计算生成的数据结构

有些数据结构是在现有数据结构的基础上生成的。比如`ES6`的数组、`Set`、`Map`都部署了以下三个方法，调用之后都返回遍历器对象

- `entries()`: 返回一个遍历器对象，用于遍历`[键名, 键值]`组成的数组。对于数组，键名就是索引值；对于`Set`，键名与键值相同。`Map`结构的`iterator`接口默认就是调用`entries`方法
- `keys()`: 返回一个遍历器对象，用于遍历所有的键名
- `values()`: 返回一个遍历器对象，用于遍历所有键值

```javascript
var arr = ['a', 'b', 'c']
for (var data of arr.entries()) {
    console.log(data)
}
// [0, "a"]
// [1, "b"]
// [2, "c"]
```

### 类数组对象

- 字符串, 使用`for...of`来遍历字符串，可以正确识别32位的`UTF-16`字符串
- `NodeList`
- `arguments`

并不是所有的类似数组的对象都具有`iterator`接口，一个简单的方式就是使用`Array.from()`将其转换为数组

### 对象
对于普通对象，`for...of`结构不能直接使用，否则会报错，必须部署了`iterator`接口的才可以使用。但是，`for...in`可以使用。一个解决办法是使用`for...of`遍历`Object.keys()`转化后的数组，另一个解决办法是使用`Generator`函数将对象重新包装

### 与其他遍历语法的比较

1. `for`循环，写法较麻烦
2. `forEach`，无法中途退出循环，`break`与`return`均无效
3. `for...in`循环可以遍历数组，对象的键名，主要是为遍历对象而非数组
   1. 数组的键名是数字，但`for...in`循环是以字符串作为键名，如"1", "2", "3"等
   2. `for...in`循环不仅可以遍历数字键名，还可以遍历其他键名，以及继承的属性
   3. 某些情况下，`for...in`循环会以任意顺序遍历键名
4. `for...of`优点
   1. 简洁，使用方便
   2. 可以使用`break`以及`return`跳出循环
   3. 提供了遍历所有数据结构的统一操作接口