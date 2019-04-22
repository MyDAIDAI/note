# 面试题之`JavaScript`

## 原始类型有哪几种？`null`是对象吗？原始数据类型和复杂数据类型存储有什么区别？
- 原始类型有6中，`Number`, `String`, `Boolean`, `undefined`, `null`, `symbol`(`ES6`新增)
- `typeof null === 'object'`, 但是`null`不是对象，而是基本数据类型的一种
- 原始数据类型存储在桟类型中，存储的是值
- 复杂数据类型的地址存储在桟内存，指向存储在堆内存中的值。当传递复杂数据类型时，传递的是桟内存中的地址，其指向同一块内存空间.

## `typeof`是否能够正确判断类型？`instanceof`?`instanceof`的实现原理是什么？
- `typeof`能够正确判断基本数据类型，除了`type null === 'object'之外`
- 对于复杂数据类型，`typeof`只能判断`function`与`object`，不能进行其他类型的判断
- `instanceof`可以准确判断复杂数据类型，但是不能正确判断基本数据类型
- `instanceof`是通过原型链进行判断的，跟着原型链依次向上查找，直到查找到最顶层
```javascript
L instanceof R

function instance_if (L, R) {
  let O = R.prototype // 获取构造函数的原型对象
  L = L.__proto__ // 获取实例的隐式原型
  
}
```
## `offsetWidth/offsetHeight`, `clientWidth/clientHeight`与`scrollWidth/scrollHeight`区别
- `offsetWidth/offsetHeight` = `content + padding + border`, 效果与`e.getBoundingClientRect()`相同
- `clientWidth/clientHeight` = `content + padding`, 如果有滚动条也不包含
- `scrollWidth/scrollHeight` = `content + padding + scrollcontent`

## `XMLHttpRequest`通用属性和方法
- `readyState`: 表示请求状态的整数
  - `UNSET(0)`: 对象已创建
  - `OPENED(1)`: `open()`成功调用，在该状态下，可以为`xhr`设置请求头或者使用`send()`发送请求
  - `HEADERS_RECEIVED(2)`: 所有重定向已经完成自动访问
  - `LOADING(3)`: 响应体正在接收
  - `DONE(4)`: 数据传输完成或者传输产生错误

- `onreadystatechange`: `readyState`改变时调用的函数
- `status`: 服务器返回的状态码
- `statusText`: 服务器返回的状态信息
- `responseText`: 作为字符串形式的来自服务器的完成响应
- `responseXML`: 服务器响应的解析为`xml`的文档
- `abort`: 取消异步`HTTP`请求
- `getAllResponseHeaders()`: 返回一个字符串，包含响应中服务器发送的全部`HTTP`报头
- `getResponseHeader(headname)`: 返回`headname`对应的报头值
- `open(method, url, asynchronous)`: 初始化准备发送到服务器的请求
- `setRequestHeader(name, value)`: 设置`http`请求头
- `send(body)`: 对服务器请求进行初始化

## `focus/blur`与`focusin/focusout`的区别与联系
- `focus/blur`不冒泡，`focusin/focusout`冒泡
- `focus/blur`兼容性良好，`focusin/focusout`在除了`FireFox`外都兼容，在`FireFox`可以使用事件捕获`ele.addEventListener('focus', handler, true)`
- 可获得焦点的元素
  - `window`
  - 链接被点击或键盘操作
  - 表单控件被点击或者键盘操作
  - 设置了`tabindex`属性的元素被点击或者键盘操作

## `mouseover/mouseout`与`mouseenter/mouseleave`的区别与联系
- `mosueover/mouseout`是冒泡事件，`mouseenter/mouseleave`不冒泡，需要为多个元素监听鼠标移入/移出事件时，推荐使用`mouseover/mouseout`来提高性能

## `sessionStorage`、`localStorage`、`cookie`的区别
- 都会在浏览器保存，有大小以及同源限制
- `cookie`会在请求时发送到服务器，作为会话标识，服务器可以修改`cookie`，`storage`不会被发送到服务器
- `cookie`有`path`，子路径可以访问父路径`cookie`，父路径不能访问子路径`cookie`
- 有效期
  - `cookie`在设置的有效期内有效，默认为浏览器关闭
  - `sessionStorage`在窗口关闭前有效
  - `localStorage`长期有效，直到用户删除
- 共享
  - `sessionStorage`同窗口共享
  - `localStorage`同源共享
  - `cookie`同源且符合`path`规则之间共享
- `localStorage`的修改会触发其他文档窗口的`update`事件
- `cookies`有`secure`属性时需要使用`HTTPS`传输
- 浏览器不能保存超过`300`个`cookie`，单个服务器不能超过`20`个，每个`cookie`不能超过`4k`，`storage`可以达到`5M`

## 跨域通信
同源：两个文档同源需要满足
- 协议相同
- 域名相同
- 端口相同
跨域通信
- 简单跨域： `<img>`、`<link>`、`<iframe>`
- `jsonp`: `<script>`
- 多窗口通信: `otherwindow.postMessage(message, originTarget)`以及`window.onmessage`事件
- `CORS`：服务器端设置`Access-Control-Allow-Origin`

## 什么是闭包，闭包有什么作用
闭包是在某个作用域内定义的函数，它可以访问这个作用域中的所有变量

闭包作用域中通常包含：
- 函数本身作用域
- 闭包定义时作用域
- 全局作用域

闭包常见用途：
- 创建特权方法用于访问控制
- 事件处理程序以及回调

## 对象到字符串转换步骤
- 如果对象有`toString()`方法，则调用，如果返回一个原始值，则将其转换为字符串作为结果
- 如果对象没有`toString()`方法或者返回的不是原始值，那么调用对象`valueOf()`方法，将返回的原始值转换为字符串
- 如果不能从`toString()`或者`valueOf()`中获得原始值，那么就抛出一个错误

## 对象到数字的转换步骤
- 如果对象有`valueOf()`方法并且返回元素值，那么将返回值转换为数字
- 否则，调用对象`toString()`方法并且将返回原始值转换为对象
- 否则，抛出错误

## 评价一下三种方法实现继承的优缺点并改进
```javascript
function Shape () {}
function Rect () {}

// 方法1
Rect.prototype = new Shape()

// 方法2
Rect.prototype = Shape.prototype

// 方法3
Rect.prototype = Object.create(Shape.prototype)
```
- 方法1: 子类会继承父类实例中的属性，如果属性值为引用类型，则会造成错误
- 方法2: 将子类的原型指向父类的原型，那么修改子类的原型会造成父类的原型被修改
- 方法3: 避免了上面两个的缺点，但是`ES6`中的方法，需要注意兼容性

改进：
- 对于属性的继承应该使用构造函数继承
  ```javascript
  function Rect() {
    Shape.call(this)
  }
  ```
- 重新定义原型中的`constructor`
  ```javascript
  Rect.prototype.constructor = Rect
  ```
- 第三种方法的`ES5`模拟
  ```javascript
  function inherit (obj) {
    if (Object.create) {
      return Object.create(obj)
    }
    var fn = function () {}
    fn.prototype = obj
    fn.prototype.constructor = fn
    return new fn()
  }
  ```

## `Object.create()`
`Object.create`: 该方法创建一个新对象，使用传入对象来提供新创建对象的`__proto__`
语法：`Object.create(proto, [propertiesObject])`
```javascript
var o = Object.create({name: 'name'}, {
  age: {
    writable: true,
    configurable: true,
    value: 'hello'
}})

// o
// {age: "hello"}
//  age: "hello"
//    __proto__: 
//      name: "name"
//      __proto__: Object
```

## 编写`javascript`深度克隆函数
```javascript
function cloneDeep(obj) {
  var _toString = Object.prototype.toString
  if (!obj || typeof obj === 'object') {
    return obj
  }
  if (obj.nodeType && 'cloneNode' in obj) {
    return obj.cloneNode(true)
  }
  var result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}
  for (var key in obj) {
    result[key] = cloneDeep(obj[key])
  }
  return result
}
```