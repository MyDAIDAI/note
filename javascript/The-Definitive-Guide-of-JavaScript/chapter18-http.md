# 脚本化`HTTP`
超文本传输协议(`HyperText Transfer Protocal, HTTP`)规定`Web`浏览器如何`Web`服务器获取文档和向`Web`服务器提交表单内容，以及`Web`服务器如何响应这些请求和提交

`Ajax`描述了了一种主要使用脚本操纵`HTTP`的`Web`应用架构。`Ajax`应用的主要特点是使用脚本操纵`HTTP`和`Web`服务器进行数据交换，不会导致页面重载。

在某种意义上，`Comet`和`Ajax`相反，在`Comet`中，`Web`服务器发起通信并异步发生消息到客户端，如果`Web`应用需要响应服务端发生的消息，则会使用`Ajax`发送或请求数据。在`Ajax`中，客服端从服务器"拉"数据，而在`Comet`中，服务器向客户端"推"数据

下面是一些常用的请求方式：
- `<img src="URL">`：在`img`标签中设置`src`属性为`URL`时，浏览器会发起`HTTP`的`GET`请求来下载图片。因此，可以将信息设置为图片`URL`的查询字符串部分，这样就能将信息传输给服务器，服务器会返回某个图片作为请求结构，但它一定要不可见：比如，返回一个`1 x 1`像素的透明图片。这种方法的数据交换是单向的，因为服务器发送回客户端的数据是图片，客户端无法轻易从中提取信息

- `<iframe scr="URL">`：将需要发送的信息放在`iframe`标签中的`src`属性中，服务器能够创建一个包含响应内容的`HTML`文档并且将其返回给浏览器，浏览器会将其渲染在`iframe`中，将`iframe`设置为不可见，然后使用`js`读取`iframe`中的内容即可。这种方法受限于同源策略限制，不能进行跨域传输

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