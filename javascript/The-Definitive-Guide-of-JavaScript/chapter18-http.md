# 脚本化`HTTP`
超文本传输协议(`HyperText Transfer Protocal, HTTP`)规定`Web`浏览器如何`Web`服务器获取文档和向`Web`服务器提交表单内容，以及`Web`服务器如何响应这些请求和提交

`Ajax`描述了了一种主要使用脚本操纵`HTTP`的`Web`应用架构。`Ajax`应用的主要特点是使用脚本操纵`HTTP`和`Web`服务器进行数据交换，不会导致页面重载。

在某种意义上，`Comet`和`Ajax`相反，在`Comet`中，`Web`服务器发起通信并异步发送消息到客户端，如果`Web`应用需要响应服务端发生的消息，则会使用`Ajax`发送或请求数据。在`Ajax`中，客户端从服务器"拉"数据，而在`Comet`中，服务器向客户端"推"数据

下面是一些常用的请求方式：
- `<img src="URL">`：在`img`标签中设置`src`属性为`URL`时，浏览器会发起`HTTP`的`GET`请求来下载图片。因此，可以将信息设置为图片`URL`的查询字符串部分，这样就能将信息传输给服务器，服务器会返回某个图片作为请求结构，但它一定要不可见：比如，返回一个`1 x 1`像素的透明图片。这种方法的数据交换是单向的，因为服务器发送回客户端的数据是图片，客户端无法轻易从中提取信息

- `<iframe scr="URL">`：将需要发送的信息放在`iframe`标签中的`src`属性中，服务器能够创建一个包含响应内容的`HTML`文档并且将其返回给浏览器，浏览器会将其渲染在`iframe`中，将`iframe`设置为不可见，然后使用`js`读取`iframe`中的内容即可。这种方法受限于同源策略限制，不能进行跨域传输(可以通过其他方式来进行跨,`iframe`本身不能实现跨域）
  - 通过修改`document.domain`来跨子域
  - 通过`otherWindow.postMessage(message, targetOrigin)`来进行跨域
  ```javascript
    // 当前窗口
    var otherwindow = window.open('https://www.baidu.com')
    otherwindow.postMessage('send a data', "*")
    // baidu 窗口
    window.onmessage = function (event) {
      // 使用event中的origin以及source验证发送身份，避免出现安全问题
      console.log('event', event.data)
    }
    // event send a data
  ```
- `<script src="URL">`：设置`<script>`的`src`属性可以发起`HTTP`的`GET`请求，可以进行跨域请求。使用该方法传入数据时，服务器的响应采用`JSON`编码的数据格式，当执行脚本的时候，`js`解释器能自动将其"解码"，这种方法也被称为`JSONP`

- `XMLHttpRequest`请求，这种请求方式除了常用的`GET`请求，还能包含`POST`等请求能力，同时能用文本或`Document`对象的形式返回服务器的响应。

## 使用`XMLHttpRequest`
浏览器在`XMLHttpRequest`类上定义了它们的`HTTP API`，这个类的每个实例都表示一个独立的请求/响应对，并且这个对象的属性和方法允许指定请求细节和提取响应数据

实例化`XMLHttpRequest`：`var request = new XMLHttpRequest()`

一个`HTTP`请求由4个部分组成：
- 请求方法
- `URL`
- 请求头
- 请求主体

一个`HTTP`响应由3个部分组成:
- 响应状态码
- 响应头
- 响应主体

### 指定请求
创建`XMLHttpRequest`对象之后，发起`HTTP`请求的下一步就是调用`XMLHttpRequest`对象的`open()`方法去指定请求的两个必需部分：请求方法与`URL`

- 请求方法，`open`方法的第一个参数就是指定请求的方法或动作。这个字符不区分大小写，但通常大家都是用大写的形式
  - `GET`方法，适用于当`URL`完全指定请求资源，当请求对服务器没有任何副作用以及当服务器的响应是可以缓存时
  - `POST`方法，它在请求主体中包含额外的数据并且这些数据会对服务器产生副作用。相同`URL`的重复的`POST`请求从服务器获得的响应可能不同，所以不应该缓存使用这个方法的请求
  - `DELETE`
  - `OPTIONS`
  - `PUT`

- 请求`URL`，该`URL`是相对文档的`URL`，如果指定绝对路径事，必须完全匹配其协议，主机，端口号。如果跨域则通常会报错，但可以通过配置服务器实现跨域请求

可以通过请求对象的`setRequestHeader()`方法来设置请求头，如`request.setRequestHeader('Content-Type', 'text/plain')`，调用多次会生成一个合并了多个值得请求头

有些请求头字段不能指定，详情见[`Forbidden header name
`](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name)

使用`XMLHttpRequest`发起请求的最后一步是指定可选的请求主体并向服务器发送它，使用`send()`方法进行发送

```javascript
// 使用 POST 方法发送
function postMessage(msg) {
  var request = new XMLHttpRequset()
  requset.open('POST', './log.php')
  requset.setRequsetHeader('Content-Type', 'text/plain')
  requset.send(msg)
}
```

### 取得响应
一个完整的`HTTP`响应由状态码、响应头以及响应主体组成
- 状态码，`status`与`statusText`属性以数字和文本的形式返回`HTTP`的状态码
- 响应头，可以使用`request`请求对象的`getResponeseHeader()`和`getAllResponseHeaders()`来查询响应头，
- 响应主体，可以从`responseText`以及`responseXML`中得到不同形式的响应主体，`responseText`得到文本形式的，`responseXML`得到`Document`形式的，如果采用`application/json`的格式进行传输，那么可以使用`JSON.parse(request.responseText)`进行解析

由于`XMLHttpRequest`一般都采用异步发生请求，只有当响应返回之后，上面所列出的属性以及方法才有效，为请求对象监听`readyStateChange`事件，可以监听发送与响应的过程，当响应完成后再执行后续代码。可以通过`request`对象的`readyState`来查看`HTTP`请求的状态，该状态值每一次改变都会触发`readyStateChange`事件，下面是`readyState`的值

```
常量              值        含义
UNSENT            0         open()尚未调用
OPENED            1         open()已调用
HEADERS_RECEIVED  2         接收到头信息
LOADING           3         接收到响应主体
DONE              4         响应完成
```

```javascript
function getText(url, callback) {
  var request = new XMLHttpRequset()
  requset.open('GET', url)
  requset.onreadyStateChange = function () {
    if (requset.readyState === 4 &&　request.status === 200) {
      var type = request.getResponseHeader('Content-Type')
      if (type.match('/^text/')) {
        callback(request.responseText)
      }
    }
  }
  request.send(null)
}
```

##### 同步响应
使用`XMLHttpRequest`可以设置为同步请求，只需要设置`open()`方法的第三个参数为`false`即可。在这种情况下，不需要设置事件处理程序，一旦`send()`返回，检测其`status`属性即可，下面使用同步请求重写上面的`getText`函数

```javascript
function getText(url, callback) {
  var request = new XMLHttpRequest()
  request.open('GET', url, false)
  request.send(null)

  if (request.status !== 200) {
    throw new Error(request.statusText)
  }
  var type = request.getResponseHeader('Content-Type')

  if (!type.match(/^text/)) {
    throw new Error('error type')
  }
  return callback(request.responseText)
}
```
应该尽量避免使用同步响应，因为`javascript`是单线程的，当`send()`方法阻塞时，通常会导致整个浏览器冻结

##### 响应解码
- 使用`text/plain`、`text/html`或`text/css`的`MIME`类型发送响应文本，则使用`request`对象的`responseText`属性获取响应文本
- 如果发生`XML`或`XHTML`进行响应，则可以通过`responseXML`属性获取
- 服务器发送对象或数组等结构化的数据类型，应该传输`JSON`编码的字符串数据，客户端使用`responseText`获取后再使用`JSON.parse()`方法进行解析

```javascript
function get(url, callback) {
  var request = new XMLHttpRequest()
  request.open('GET', url)
  request.onreadyStateChange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var type = request.getResponseHeader('Content-Type')
      if (type.indexOf('xml') !== -1 && request.responseXML) {
        callback(request.responseXML)
      } else if (type === 'application/json') {
        callback(JSON.parse(request.responseText))
      } else {
        callback(response.responseText)
      }
    }
  }
  request.send(null)
}
```

 `web`服务器通常使用二进制数据（图片文件）响应`HTTP`请求，`responseText`属性只能应用于文本，不能解析二进制数据，后面定制了解析二进制响应的办法

 服务器响应的正确解码是假设服务器为这个响应设置了`Content-Type`和正确的`MIME`类型，否则数据不能被正确解析，相应的属性也不能得到正确的值。可以在`send`发送之前通过调用`overrideMimeType()`方法来重写其`MIME`类型`request.overrideMimeType('text/plain; charset=utf-8')`

 ### 编码请求主体
`HTTP POST`请求包括请求主体，它包含客户端传递给服务器的数据，请求主体可能是简单的字符串，可能是表单数据、`JSON`数据、`XML`数据或者文件等.

##### 表单编码的请求
当用户提交表单时，表单中的数据（每个表单元素的名字和值）编码到一个字符串中并随请求发送。默认情况下，`HTML`表单通过`POST`方法发送给服务器，而编码后的表单数据则作为请求主体发送。对表单数据进行普通的`URL`编码，使用等号把编码后的名字和值分开，并使用`&`分开各个名/值对，比如:
```javascript
find=pizza&zipcode=02123&radius=1km
```
表单数据编码格式的`MIME`类型为：`application/x-www-form-urlencoded`，使用这种类型发送数据时，还可以发送`javascript`对象，上面的数据也可以使用下面的形式进行发送：
```javascript
{
  find: 'pizza',
  zipcode: 02134,
  radius: '1km'
}
```
下面是一个简单的样例
```javascript
// 编码发送数据
function encodeFromData (data) {
  if (!data) return ''
  var paris = []
  if (var name in data) {
    if (!data.hasOwnProperty(name)) continue // 跳过继承属性
    if (typeof data[name] === 'function') continue // 跳过方法
    var value = data[name].toString()
    name = encodeURIComponent(name.replace("%20", '+'))  // 编码名字
    value = encodeURIComponent(value.relace("%20", '+'))
    paris.push(name + '=' + value)
  }
  return paris.join('&')
}
// 使用 POST 发送数据
function postData (url, data, callback) {
  var request = new XMLHttpRequest()
  request.open('POST', url)
  request.onreadystatechange = function () {
    if (request.readyState === 4 && callback) {
      callback(request)
    }
  }
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  request.send(encodeFromData(data))
}
```
当表单提交只是为了查询时，可以使用`Get`方法进行提交，将查询参数放在`URL`中
```javascript
function getData(url, data, callback) {
  var request = new XMLHttpRequest()
  request.open('GET', url + '?' + encodeFromData(data))
  request.onreadystatechange = function () {
    if (request.readyState === 4 && callback) {
      callback(request)
    }
  }
  request.send(null)
}
```

##### `JSON`编码的请求
使用`MIME`为`application/json`类型，可以发送请求主体为`json`的数据
```javascript
function postJSON(url, data, callback) {
  var request = new XMLHttpRequest()
  request.open('POST', url)
  request.onreadystatechange = function () {
    if (request.readyState === 4 && callback) {
      callback(request)
    }
  }
  request.setRequestHeader("Content-Type", "application/json")
  request.send(JSON.stringify(data))
}
```

##### `XML`编码的请求
`XML`也可以用于数据传输的编码，上面所传输的数据格式用`XML`可以表示为
```xml
<query>
  <find zipcode="02134" radius="1km">
    pizza
  </find>
</query>
```
下面将上面的`XML`数据格式使用`POST`方法进行传输
```javascript
function postQuery(url, what, where, radius, callback) {
  var request = new XMLHttpRequest()
  request.open('GET', url)
  request.onreadystatechange = function () {
    if (request.readyState === 4 && callback) {
      callback(request)
    }
  }

  // 创建xml
  var doc = document.implementation.createDocument("", "query", null)
  var query = doc.documentElement
  var find = doc.createElement("find")
  query.appendChild(find)
  find.setAttribute("zipcode", where)
  find.setAttribute("radius", radius)
  find.appendChild(doc.createTextNode(what))

  request.send(doc) // 为`send`方法传入xml文档，会自动设置请求头
}
```

##### 上传文件
由于没有`File()`对象构造函数，脚本只能获得表示用户当前选择文件的`file`对象。在支持`File`对象的浏览器中，每个`<input type="file">`元素有一个`files`属性，它是一个类数组对象，获取其中的文件传入`send()`方法即可。在拖拽的`API`中，可以通过拖放事件的`dataTransfer.files`属性获取文件
```javascript
var elts = document.getElementByTagName("input")
for (var i = 0; i < elts.length; i++) {
  var input = elts[i]
  if (input.type !== "file") continue
  var url = input.getAttribute("data-uploadto")
  if (!url) continue

  input.addEventListener("change", function () {
    var file = this.files[0]
    var request = new XMLHttpRequset()
    if (!file) return 
    request.open("POST", url)
    request.send(file)
  }) 
}
```
在`HTML5`可以使用`Blob`类型来传递文件类型

##### `multipart/form-data`请求
当`HTML`表单同时包含文件上传元素和其他元素时，浏览器不能使用普通的表单编码而必须使用`multipart/form-data`类型的来进行编码。这种编码包括使用长“边界”字符串把请求主体分离成多个部分

在`XHR2`中定义了`FormData API`，它能够实现多部分请求主体。首先，使用`FormData()`构造函数创建`FormData`对象，然后按需多次调用这个对象的`append()`方法把值添加到请求中。最后，把`FromData`对象传递给`send()`对象即可
```javascript
function postFromData(url, data, callback) {
  if (typeof FormData === "undefined") {
    throw new Error("FormData is not implemented")
  }
  var request = new XMLHttpRequest()
  request.open("POST", url)
  request.onreadystatechange = function () {
    if (request.readyState === 4 && callback) {
      callback(request)
    }
  }
  
  var formData = new FromData
  for(var name in data) {
    if (!data.hasOwnProperty(name)) continue
    var value = data[name]
    if (typeof value === "function") continue
    formData.append(name, value)
  }

  request.send(formData) // send 会自动设置 Content-Type 头
}
```

### `HTTP`进度事件
在前面的代码中，使用的是`readystatechange`事件来检测`HTTP`请求的完成。在后续的`XHR2`定于了更多的事件集，能够使其`XMLHttpRequest`对象在请求的不同阶段触发不同的事件，也就不需要再检测`readystate`属性了

- `loadstart`: 调用`send()`方法时触发
- `progress`: 正在加载服务器响应时触发,每个`50ms`左右触发一次。其中有一些属性可以进行使用, `loaded`属性表示目前传输字节数值，`total`属性时`Content-Length`头传输数据的整体长度，如果不知道内容长度则为0, 如果知道内容长度，其`lengthComputable`属性为`true`，否则为`false`
- `load`: 请求完成

请求完成不一定是一个成功的请求，请求无法完成一般有三种情况：
- `timeout`: 请求超时
- `abort`: 请求中止
- `error`: 请求发生错误

监控响应进度：
```javascript
request.onprogress = function (e) {
  if (e.lengthComputable) {
    progress.innerHTML = Math.round(100 * e.loaded / e.total) + '% Complete'
  } 
}
```

##### 上传进度事件
`XHR2`中也给出了用于监控`HTTP`请求上传的事件。在`XMLHttpRequest`中有一个`upload`属性，该属性是一个对象，在该对象有`onprogress`、`onload`等事件来监控上传进度

可以像使用常见的`progress`事件处理程序一样使用`upload`事件处理程序。对于`XMLHttpRequest`对象`x`，设置`x.onprogress`以监控下载进度，设置`x.upload.onprogress`来监控上传进度

### 中止请求和超时
可以通过调用`XMLHttpRequest`对象的`abort`方法来中止请求，调用会触发`onabort`事件。调用这个方法的主要原因是完成取消或超时请求消耗的时间或者当响应无关的时候，比如，使用`XMLHttpRequest`为文本输入域请求自动完成推荐。如果用户在服务器的建议到达之前输入了新的字符，那么就中止上一次的请求

`XHR2`定义了`timeout`属性来设置中止的毫秒数，也定义了`timeout`事件用于在请求超时的时候触发

```javascript
// 在不支持 timeout 属性的浏览器中使用

function timedGetText(url, timeout, callback) {
  var request = new XMLHttpRequest()
  request.open('GET', url)
  var timedout = false
  var timer = setTimeout(function () {
    timedout = true
    request.abort()
  }, timeout)
  request.onreadystatechange = function () {
    if (request.readyState !== 4) return
    if (timedout) return
    clearTimeout(timer)
    if (request.status === 200) {
      callback(request)
    }
  }
  request.send(null)
}
```

### 跨域`HTTP`请求
作为同源策略的一部分，`XMLHttpRequest`对象通常仅可以发起和文档具有相同服务的`HTTP`请求。这个限制关闭了安全漏洞，但也限制了跨域的请求。在`XHR2`中通过在`HTTP`响应中选择发送合适的`CORS`（`Cross-Origin Resource Sharing`，跨域资源共享）允许跨域访问网站。使用这个功能并不需要做什么额外的工作：如果浏览器支持`XMLHttpRequest`的`CORS`且实现跨域请求的网站决定使用`CORS`允许跨域请求，那么同源策略将不放宽而跨域请求会正常工作

整个`CORS`通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，`CORS`通信与同源的`AJAX`通信没有差别，代码完全一样。浏览器一旦发现`AJAX`请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现`CORS`通信的关键是服务器。只要服务器实现了`CORS`接口，就可以跨源通信。

需要注意的是，`CORS`请求默认不发送`Cookie`和`HTTP`认证信息，如果要把`Cookie`信息发送到服务器，首先要服务器同意，服务器需要指定`Access-Control-Allow-Credentials`字段为`true`，然后需要设置请求头中的`withCredentails`为`true`。并且如果要发送`Cookie`，那么`Access-Controll-Allow-Origin`就不能设置为星号，必须指定明确的、与请求网页一致的域名

#### 两种请求
浏览器将`CORS`请求分为两类，简单请求和非简单请求，满足下面两个条件，就属于简单请求
- 请求方法是以下三种方法之一
  - `HEAD`
  - `GET`
  - `POST`
- `HTTP`的头信息不超过以下几种字段
  - `Accept`
  - `Accept-Language`
  - `Content-Language`
  - `Last-Event-ID`
  - `Content-Type`: 只限于`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`

不同时满足上面两个条件，就属于非简单请求，浏览器对于这两个请求的处理是不同的

#### 简单请求
浏览器对于简单请求，会在头信息中，增加一个`origin`字段，然后将请求发出
```
GET /cors HTTP/1.1
Origin: http://api.com
Accept-Language: EN-US
Connection: keep-alive
User-Agent: Mozilla/5.0
```
在上面的发送请求中，服务器会根据发送的`origin`字段来决定是否同意本次请求。如果`origin`指定的源不在许可范围以内，服务器会返回一个正常的`HTTP`响应，但是没有`Access-Control-Allow-Origin`字段。浏览器检测发现没有`Access-Control-Allow-Origin`字段，会抛出一个错误，然后被`XMLHttpRequest`的`onerror`回调函数捕获

如果`origin`在指定的范围之内，服务器返回的响应会多出几个头信息字段
```
Access-Control-Allow-Origin: http://api.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
```
与跨域有关的头部都以`Access-Control-`开头：
- `Access-Control-Allow-Origin`
  - 必须字段，它的字段要么是请求时`Origin`字段的值，要要么是`*`，表示接收任意域名的请求
- `Access-Control-Allow-Credentials`
  - 可选字段
  - 布尔值，表示是否允许发送`cookie`
  - 默认情况下，`cookie`不包括在`CORS`请求之中，如果需要发送`cookie`，则将该字段设为`true`，表明服务器许可
- `Access-Control-Expose-Headers`
  - 可选字段
  - `CORS`请求时，`XMLHttpRequest`对象的`getResponseHeader()`方法只能拿到6个基本字段：`Cache-Control`、`Content-Language`、`Content-Type`、`Expires`、`Last-Modified`、`Pragma`
  - 想取得其他头部信息的值，需要在`Access-Control-Expose-Headers`中暴露出来，再使用`getResponseHeader()`获取

#### `withCredentials`属性
`CORS`请求中，默认不会发送`Cookie`和`HTTP`认证信息。如果需要发送到服务器，则需要

1. 服务器设置`Access-Control-Allow-Credentials`字段为`true`
2. 请求时设置请求头部`withCredential`字段为`true`

需要完成上面两步浏览器才会自动发送`cookie`信息，否则即使服务器同意发送`cookie`，浏览器也不会发送

需要注意的是，如果发送`cookie`，那么`Access-Control-Allow-Origin`字段不能设置为`*`，必须指定明确的，与请求网页一致的域名

#### 非简单请求
非简单请求是对服务器有特殊要求的请求，比如请求方法是`PUT`或者`DELETE`，或者`Content-Type`字段的类型是`application/json`

非简单请求的`CORS`请求会在正式通信之前,增加一次`HTTP`查询请求，称为预检请求(`preflight`)

##### 预检请求
浏览器首先会询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些`HTTP`方法和头信息字段。只有服务器发送正确的响应报文后，浏览器才会发出正式的`XMLHttpRequest`请求

下面是一个跨域的`PUT`请求脚本
```javascript
var url = 'https://www.baidu.com'
var request = new XMLHttpRequest()
request.open('PUT', url, true)
request.setRequestHeader('X-Custom-Header', 'value') // 设置自定义请求头 X-Custom-Header
request.send()
```
在上面的请求中，浏览器发现这是一个非简单请求，会先发送一个预检请求，询问服务器可以请求的方法以及可以获取的头部字段，下面是一个预检头部
```
OPTIONS url HTTP/1.1
Origin: orginUrl
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: ...
Accept-Language: en-us
Connection: keep-alive
...
```
预检请求的请求方法是`OPTIONS`，表示这个请求是用来询问的
- `Origin`: 请求源`url`
- `Access-Control-Request-Method`: 表示浏览器的跨域请求会用到哪些方法
- `Access-Control-Request-Headers`: 指定浏览器会发送的额外的头部信息字段

##### 预检请求的回应
服务器收到预检请求之后，根据浏览器发送的`Origin`、`Access-Control-Request-Method`以及`Access-Control-Request-Headers`字段判断是否允许跨域请求

```
HTTP/1.1 200 ok
Access-Control-Allow-Origin: http://...
Access-Control-Allow-Method: PUT, DELETE, GET, POST
Access-Contorl-Allow-Headers: X-Custom-Header
Content-Type: text/html;charset=utf-8
...
```
上面的`Access-Control-Allow-Origin`也可以设置为`*`，表示同意任意跨域请求

如果服务器否定了预检请求，会返回一个正常的`HTTP`响应，但是没有任何与跨域相关的头部信息，也就是没有`Access-Control-`头部信息。浏览器会明白没有通过服务器的预检请求，并且触发`error`事件

- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Method`: 服务器允许的跨域请求方法
- `Access-Control-Allow-Headers`： 服务器支持的所有头信息字段
- `Access-Control-Allow-Credentials`
- `Access-Control-Max-Age`：指定本次预检请求的有效期，单位为秒。在有效期内，不会重复发送预检请求

##### 浏览器正常请求和回应
在服务器通过预检请求之后，以后的每次浏览器的`CORS`请求都与简单请求相同，会有一个`Origin`字段，并且服务器头部会返回`Access-Control-Allow-Origin`字段

预检之后的`CORS`请求
```
PUT /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
X-Custom-Header: value
Accept-Language: en-US
Connection: keep-alive
...
```
服务器响应
```
// 每次服务器响应必须包含，否则浏览器会触发request的error事件
Access-Control-Allow-Origin: http://api.bob.com 
```



参考链接[跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)

## 借助`<script>`发送`HTTP`请求：`JSONP`
设置`<script>`元素的`src`属性，然后浏览器就会发送一个`HTTP`请求以下载`src`属性所指向的`URL`。使用`<script>`元素进行`ajax`传输的一个主要原因是，它不受同源策略的影响，因此可以使用它们从其他的服务器请求数据，第二个元素是所包含的`JSON`的编码数据的响应体会自动进行解码

使用`<script>`响应的数据需要使用函数名和圆括号包裹起来，当浏览器下载完毕后就可以执行其中的代码。在下载之前可以在`src`中指定函数名称，并在下载前进行声明，这样响应的编码数据就可以进行解析执行

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>JSONP 实例</title>
</head>
<body>
    <div id="divCustomers"></div>
    <script type="text/javascript">
      // 声明响应返回的函数
      function callbackFunction(result, methodName)
        {
            var html = '<ul>';
            for(var i = 0; i < result.length; i++)
            {
                html += '<li>' + result[i] + '</li>';
            }
            html += '</ul>';
            document.getElementById('divCustomers').innerHTML = html;
        }
</script>
<!--  使用 script 进行跨域，在URL中设置返回的函数名callbackFucntion -->
<script type="text/javascript" src="http://www.runoob.com/try/ajax/jsonp.php?jsoncallback=callbackFunction"></script>
</body>
</html>
```

## 基于服务器端推送事件的`Comet`技术
// 待完成