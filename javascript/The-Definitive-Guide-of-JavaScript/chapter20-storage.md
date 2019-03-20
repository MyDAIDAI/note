# 客户端存储
`web`应用允许使用浏览器`API`实现将数据存储到用户的电脑上。客户端存储遵循“同源策略”，因此不同站点的页面是无法互相读取对方存储的数据，而同一站点的不同页面之间是可以互相共享存储数据的，它为我们提供了一种通信机制，这样在一个页面上面填写的表单数据可以显示在另外一个页面中。`web`应用可以选择它们存储数据的有效期：比如采用临时存储可以让数据保存至当前窗口关闭或浏览器退出；采用永久存储，可以将数据永久地存储在硬盘上，数年或数月不失效

客户端存储有以下几种形式：
- `Web`存储：包含`localStorage`对象和`sessionStorage`对象，该存储易于使用、支持大容量数据存储同时兼容当前所有主流浏览器
- `cookie`: 只适合存储少量文本数据，并且不论服务器是否需要，每一次`HTTP`请求都会把这些数据传输到服务器
- `IE User Data`: 在`IE8`以前的`IE`浏览器中，将其作为`Web`存储的替代方案
- 离线`Web`应用: 在`HTML5`中定义了一组离线`Web`应用，用来缓存`Web`页面以及相关资源（脚本、`CSS`文件、图像）。它将`web`应用整体存储在客户端，而不仅仅是存储数据。它能够让`web`应用“安装”在客户端，这样在离线时也可以对应用进行访问
- `web`数据库: 现在有一种正在标准化的数据库`API`，称为“索引数据库`API`”。调用该`API`返回的是一个不包含查询语句的简单数据库对象
- 文件系统`API`: 该`API`可以用于操作一个私有的本地文件系统。在该文件系统中可以对文件进行读写操作

## `localStorage`和`sessionStorage`
`Window`对象上定义了两个属性：`localStorage`和`sessionStorage`。这两个属性都代表同一个`Storage`对象 -- 一个持久化的关联数组，数组使用字符串来索引，存储的值也是字符串的形式.`Storage`对象在使用上和一般的`js`对象没什么区别：设置对象的属性为字符串，浏览器就会将该值存储起来。`localStorage`与`sessionStorage`的区别在于存储的有效期和作用域不同，也就是数据的存储时间以及访问权限

`web`存储草案标准指出，既可以存储结构化的数据，也可以存储原始类型数据，还可以存储日期、正则表达式等内置类型的数据，但现在浏览器只支持存储字符串类型的数据。使用其他类型数据需要进行编码以及解码

```javascript
localStorage.x = 10
var x = parseInt(localStorage.x)

// json
localStorage.data = JSON.stringify(data)
var data = JSON.parse(localStorage.data)
```

### 存储有效期和作用域
|  | 有效期 | 作用域 |
| ------ | ------ | ------ |
| `localStorage` | 永久存储，除非手动删除 | 同源可互相访问 |
| `sessionStorage` | 窗口或标签页被关闭，数据被删除 | 同源且同一个窗口（标签页） |

需要注意的是，`sessionStorage`中一个标签页中的脚本是无法读取或者覆盖由另一个标签页脚本写入的数据，即使这两个标签页渲染的是同一个页面，运行的是同一个脚本。除此之外，`session`中的窗口作用域指的是顶级窗口，若一个标签页中包含不同的`<iframe>`，则它们的`sessionStorage`是可以共享的

### 存储`API`
|  | 设置 | 查询 | 删除 | 清除所有 | 获取长度 | 获取键名 |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| `localStorage` | `setItem(name, value)`方法或通过属性直接设置 | `getItem(name)`方法或通过属性直接查询 | `removeItem(name)` | `clear()` | `length` | `key(index)` | 
| `sessionStorage` | `setItem(name, value)`方法或通过属性直接设置 | `getItem(name)`方法或通过属性直接查询 | `removeItem(name)` | `clear()` | `length`| `key(index)` |

### 存储事件
无论什么时候存储在`localStorage`或者`sessionStorage`的数据发送改变，浏览器都会在其他对该数据可见的窗口对象上触发存储事件`storage`（在对数据进行改变的窗口对象上不会触发）。只有当存储数据真正发生改变的时候才会触发，设置一个一样的值或者删除不存在的值是不会触发的

与存储事件相关事件对象的重要属性：
- `key`: 被设置或者移除的项的名字或者键名。若调用`clear()`函数，则该属性值为`null`
- `newValue`: 新值，调用`removeItem`后，该值为`null`
- `oldValue`: 原先的值，当插入一个新项的时候，该属性值为`null`
- `url`: 触发该存储变化脚本所在文档的`URL`

需要注意的是，`localStorage`和存储事件都采用的是广播机制，浏览器会对当前正在访问同样站点的所有窗口发生消息

## `cookie`
`cookie`是指`web`浏览器存储的少量数据，会自动在`web`浏览器与`web`服务器之间传输，因此服务端脚本就可以读、写存储在客户端的`cookie`的值

##### 检测`cookie`是否启用
在绝大多数的浏览器中，可以通过检测`navigator.cookieEnable`这个属性，若值为`true`，那么当前的`cookie`是启用的，否则是禁用的。但该属性不是所有浏览器都支持

### `cookie`属性: 有效期和作用域

##### 有效期
`cookie`默认的有效期很短暂，它只能持续在`web`浏览器的会话期间，一旦用户关闭浏览器，`cookie`保存的数据就丢失了。

`cookie`的有效期与`sessionStorage`还是有区别的，`cookie`的作用域并不是局限在浏览器的单个窗口中，它的有效期和整个浏览器进程一致而不是单个浏览器窗口一致。

若想要延长`cookie`的有效期，可以通过设置`max-age`属性，但必须明确告诉浏览器有效期是多长（单位是秒）。一旦设置了有效期，浏览器就会将`cookie`数据存储在一个文件，并且直到过了指定有效期才会删除文件

##### 作用域
`cookie`的作用域是通过文档源与文档路径来确定的，其可以通过`cookie`的`path`和`domain`来进行配置
```
http://www.example.com/catalog/index.html // 在该页面设置 cookie

http://www.example.com/catalog/order.html // 同源且路径为 /catalog ，cookie 可以共享

http://www.example.com/catalog/widgest/index.html // 同源且路径为 /catalog ，cookie 可以共享

http://www.example.com/index.html // 同源但路径不同，不共享
```
可以通过设置`cookie`的`path`属性来指定路径
```
http://www.example.com/catalog/widgest/index.html // 设置 cookie.path = '/catalog'

http://www.example.com/catalog/order.html // 可共享

// 设置 cookie.path = '/', 则http://www.example.com上的所有页面均共享
```
当`cookie.path='/'`时，与`localStorage`有相同的作用域，同时当它请求该站点上任何一个`web`页面的时候，浏览器都必须将`cookie`的名字和值传递给服务器

`cookie`的作用域默认由文档源限制，如果想要在子域之间互相共享`cookie`，那么可以设置`cookie`的`domain`属性，需要注意的是，`cookie`只能设置为当前服务器的域

```
// 设置 cookie.path = '/', cookie.domain = '.example.com'
catalog.example.com // 所有页面共享
index.example.com // 所有页面共享
***.expample.com // 所有页面共享
```

`cookie`的属性`secure`属性，是一个布尔类型的值，用来表明`cookie`的值以何种形式进行传播。其默认传播形式是不安全的(`http`)。若设置为“安全的”，那么只能当浏览器和服务器通过`https`或者其他安全协议链接时才传递

### 保存`cookie`
保存`cookie`只需将`cookie`属性设置为一个字符串形式的值: `name=value`，如`document.cookie="version" + encodeURIComponent(document.lastModified)`，`cookie`的名/值中不允许包含分号、逗号和空白符，所以需要进行编码

设置`max-age`: `name=value;max-age=seconds`

```javascript
function setCookie(name, value, daysToLive) {
  var cookie = name + '=' + encodeURICcomponent(value)
  if (type daysToLive === 'number') {
    cookie += ';max-age=' + (daysToLive * 60 * 60 * 24)
  }
  document.cookie = cookie
}
```
设置其他属性： `name=value;max-age=seconds;path=path;domain=domain;secure`新设置的属性值会覆盖原来的属性值

删除`cookie`，指定一个非空的值，并将其`max-age=0`即可

### 读取`cookie`
查询`document.cookie`时返回的是一个字符串，该字符串将键值对用`;`和空格分开，其内容包含了所有作用在当前文档的`cookie`

```javascript
// 解析 documen.cookie,返回对象
function getcookie () {
  var cookie = {}
  var all = document.cookie
  if (all === '') {
    return cookie
  }
  var list = all.split('; ')
  for (var i = 0; i < list.lenght; i++) {
    currentCookie = list[i]
    var index = currentCookie.indexOf('=')
    var name = currentCookie.substring(0, index)
    var value = currentCookie.substring(index + 1)
    value = decodeURIComponent(value)
    cookie[name] = value
  }
  return value
}
```

### `cookie`的局限性
- 浏览器保存不能超过 300 个`cookie`
- 每个服务器不超过 20 个
- `cookie`保存的数据不超过 `4kb`

### `cookie`相关的存储
下面为`cookie`定义一些方法，可以更方便的进行操作
```javascript
function cookieStorage (maxage, path) {
    var cookie = (function () {
        var cookie = {}
        var all = document.cookie
        if (all === '') {
            return cookie
        }
        var list = all.split('; ')
        for (var i = 0; i < list.length; i++) {
            var item = list[i]
            var index = item.indexOf('=')
            var name = item.substring(0, index)
            var vallue = item.substring(index + 1)
            value = decodeURIComponent(value)
            cookie[name] = value
        }
        return cookie
    })()
    var keys = []
    for (var key in keys) keys.push(key)
    this.length = keys.length
    this.keys = keys
    this.cookie = cookie
    this.maxage = maxage
    this.path = path
}
cookieStorage.prototype.getKey = function (n) {
    if (n < 0 || n >= this.keys.length) return null
    return this.keys[n]
}
cookieStorage.prototype.getItem = function (name) {
    return this.cookie[name] || null
}
cookieStorage.prototype.setItem = function (key, value) {
    // key 不存在则添加 key
    if (!(key in this.cookie)) {
        this.keys.push(key)
        this.length++
    }
    this.cookie[key] = value
    // 将值设置到 document.cookie 中
    var cookie = key + '=' + encodeURIComponent(value)
    if (this.maxage) cookie += "; max-age=" + this.maxage
    if (this.path) cookie += "; path=" + this.path
    document.cookie = cookie
} 
cookieStorage.prototype.removeItem = function (key) {
    if (!(key in this.cookie)) return
    delete this.cookie[key]
    var index = this.keys.indexOf(key)
    this.keys.splice(index, 1)
    this.length--
    // 将 max-age 设置为 0来删除指定的 cookie
    document.cookie = key + '=;max-age=0' 
}
cookieStorage.prototype.clear = function () {
    this.keys = []
    this.length = 0
    this.cookie = {}

    for (var i = 0; i < this.keys.length; i++) {
        document.cookie = this.keys[i] + '=; max-age=0' 
    }
}
```