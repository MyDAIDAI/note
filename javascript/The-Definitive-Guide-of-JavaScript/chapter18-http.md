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