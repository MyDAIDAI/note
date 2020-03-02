# `Ajax`

## 数据传输
`ajax`是一种与服务器通信而无须重载页面的方法，数据可以从服务器获取或发送给服务器。有多种不同的方法建立这种通信通道，每种方法都有各自的优缺点

### 请求数据
有下面几种技术用于向服务器请求数据
- `XMLHttpRequest`(`XHR`)
- `Dynamic script tag insertion`动态脚本注入 -- `jsonp`
- `iframes`
- `Comet`
- `Multipart XHR`
在现代高性能`JavaScript`中使用的三种技术是：`XHR`，`JSONP`和`Multipart XHR`

#### `XHR`
`XMLHttpRequest`是目前最常用的技术，它允许异步发送和接受数据。所有的主流浏览器对它都提供了完善的支持，并且还能够精确地控制发送请求和数据接收。可以在请求中添加任何头信息和参数，并读取服务器返回的所有头信息，以及响应文本
```javaScript
var url = '/data.php'
var params = [
  'id=123123123',
  'limit=20'
]
var req = new XMLHttpRequest()
req.onreadystatechange = funciton () {
  if (req.readyState === 4) {
    // 数据处理
  }
}
req.open('GET', url + '?' + params.join('&'), true)
req.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
req.send(null) // 发送一个请求
```
如果监听`readyState`的值等于3，那么可以与传输中的服务器响应进行交互，说明此时正在与服务器进行 交互，响应信息还在传输过程中
// TODO: 文件上传获取上传进度

`GET`与`POST`的区别
- `GET`不会改变服务器的状态，只会获取数据
- `GET`请求的数据会被缓存起来
- `GET`请求的`URL`有长度限制，长度接近或超过2048个字符时，应该用`POST`

#### 动态脚本注入
`XHR`很强大，但是有一个限制是不能跨域请求数据。动态脚本注入则克服了这个限制。但是与`XHR`相比，这种方式是有限的
- 不能设置请求的头信息
- 参数传递只能使用`GET`方法
- 不能设置请求的超时处理或重试
- 不能把整个响应消息作为字符串来处理
因为响应消息作为脚本标签的源码，它必须是可执行的`javaScript`代码，所以不能使用纯`XML`, 纯`JSON`或其他任何格式的数据，这些数据都必须封装在回调函数中
```javaScript
// 后台代码
const express = require('express');
const app = express();

app.get('/jsonp', function (req, res) {
  // 向回调函数中注入数据
  res.jsonp({ user: 'tobi' })
});

app.listen(3000, function() {
  console.log('example app listening on port 3000!')
})

// 前端代码
var scriptElement = document.createElement('script')
scriptElement.src = 'http://localhost:3000/jsonp?callback=jsonpCallback'
document.getElementsByTagName('head')[0].appendChild(scriptElement)

function jsonpCallback(jsonString) {
  console.log('jsonp callback string', jsonString)
}
```
上面的前端代码中，请求了`http://localhost:3000/jsonp?callback=jsonpCallback`这个接口，这个接口会返回一个`Content-Type: text/javascript; charset=utf-8`类型的`js`文件，该文件的内容为`/**/ typeof jsonpCallback === 'function' && jsonpCallback({"user":"tobi"});`, 在该文件中对，对传过去的`callback`参数函数进行了调用，并向其中传入所需要的函数，所以需要在前端代码中对传入后端的回调函数进行声明