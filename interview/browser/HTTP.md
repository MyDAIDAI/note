# 前端面试题之`HTTP`

## `HTTP`请求方法
- `GET`: 最常用的方法，通常用于请求服务器发送某个资源，对服务器没有副作用并且发送的资源可以缓存
- `HEAD`: 与`GET`类似，但服务器在响应中只返回首部，不返回实体部分
- `PUT`: 让服务器用请求的主体部分来创建一个由所请求的`URL`命名的新文档，或者如果那个`URL`存在，就用主体替代
- `POST`: 会对服务器产生副作用，同样的请求值响应可能会不同，资源不能缓存
- `TRACE`: 在目的服务器端发起一个回环诊断，最后一站的服务器会弹回一个`TRACE`响应并在响应主体中携带它受到的原始请求报文。`TRACE`方法主要用于诊断，用于验证请求是否如愿穿过了请求/响应链
- `OPTIONS`: 请求`web`服务器告知其支持的各种功能，可以查询服务器支持哪些方法或者对某些特殊资源支持哪些方法
- `DELETE`: 请求服务器删除请求`URL`指定的资源

## 从浏览器地址输入`URL`到显示页面的过程
- 在浏览器地址栏中输入`URL`
- 浏览器查看缓存，如果请求资源在缓存中并且为过期，则进行转码
  - 如果资源未缓存，则发起新的请求
  - 如果已缓存，检测是否过期，如果未过期则直接进行转码，否则与服务器进行验证
  - 检查是否过期通常使用`HTTP`头部的`Expires`和`Cache-Control`
- 浏览器解析`URL`获取协议、主机、端口以及路径
- 浏览器组装`HTTP`请求报文
- 浏览器将输入的`URL`转换为`ip`地址
  - 浏览器缓存
  - 本机缓存
  - `hosts`文件
  - 路由器缓存
  - `ISP DNS`缓存
  - `DNS`查询
- 打开一个`socket`与目标`ip`地址、目标端口建立`TCP`链接，三次握手
  - 客户端发送一个`TCP`的`SYN = 1`, `Seq = X`的包给服务器
  - 服务器接收到客户端报文，并回传`SYN = 1`, `ACK = X + 1`, `Seq = Y`的报文给客户端
  - 客户端接收到服务器返回报文，确定服务器可以接收到客户端发送的报文，但服务器不确定客户端是否可以收到其发过去的报文，所以客户端需要发送确定报文`ACK = Y + 1`, `Seq = Z`给服务器
- `TCP`链接建立之后，发送`HTTP`请求
- 服务器接收到请求并且进行解析，将应用程序报文转发到相应的程序中
- 服务器检测`HTTP`请求头是否包含缓存验证信息，如果资源未更新，返回`304`
- 处理程序读取请求并生成`HTTP`响应数据
- 服务器将响应报文通过`TCP`链接发回到客户端
- 浏览器接收到`HTTP`响应信息之后，根据情况选择关闭`TCP`链接或者保留重用，关闭`TCP`的四次挥手
  - 主动方发送`Fin = 1`, `Ack = Z`, `Seq = X`报文
  - 被动方发送`ACK = X + 1`, `Seq = Z`的报文
  - 被动方关闭连接之后，向主动方发送`Fin = 1`, `ACK = X`, `Seq = Y`报文
  - 主动方发送`ACK = Y`, `Seq = X`报文
- 浏览器检测响应状态码是否为`1xx`、`3xx`、`4xx`、`5xx`，这些情况与`2xx`不同
- 对响应类型进行解码
- 根据返回的资源类型来决定处理方式，若资源为`HTML`文档
- 解析`HTML`文档，构建`DOM`树，下载资源，构造`CSSOM`树，执行`js`脚本，这些操作没有严格的先后顺序
  - 构建`DOM`树
    - `Tokenizing`: 根据`HTML`规范将字符流解析为标记
    - `Lexing`: 词法分析将标记转换为对象并定义属性和规则
    - `DOM construction`: 根据`HTML`标记关系将对象组成`DOM`树
  - 解析过程遇到图片，样式表，`javascript`文件就启动下载
  - 构建`CSSOM`树
    - `Tokenizing`: 字符流转换为标记流
    - `Node`: 根据标记创建节点
    - `CSSOM`: 节点创建`CSSOM`树
  - 根据`DOM`树和`CSSOM`树构建渲染树
    - 从`DOM`树的根节点遍历所有可见节点，不可见节点包括`script`、`meta`这样本身不可见标签以及使用`CSS`隐藏的节点
    - 对可见节点，找到`CSSOM`规则并应用
    - 发布可视节点的内容和计算样式
  - `javascript`解析
    - 浏览器创建`Document`对象并解析`HTML`，将解析到的元素和文本节点添加到文档中，此时`document.readystate`为`loading`
    - `HTML`解析器遇到没有`async`和`defer`的`script`标签时，会将它们添加到文档中，然后执行。这个脚本会同步执行，并且在脚本下载和执行时`HTML`解析器会暂停。这样就可以用`document.write()`把文本输入到文档流。同步脚本经常简单定义函数和注册事件处理程序，***它们只能遍历和操作它们标签之前的文档内容***
    - 当`HTML`解析器遇到设置了`async`属性的`script`时，会开始下载脚本并且`HTML`解析器继续执行文档（脚本下载为异步操作），脚本会在下载完成后尽快执行，但是解析器不会停下来等它下载，异步脚本禁止使用`document.write()`，***可以访问和操作标签之前的文档内容***
    - 文档解析完成，`document.readystate`变为`interactive`
    - 所有的`defer`脚本会按照在文档的出现顺序执行，延迟脚本可以访问完整的文档树，不能使用`document.write()`
    - 浏览器在`Document`对象上触发`DOMContentLoaded`事件
    - 文档完全解析完成，浏览器可能等待图片等内容的加载，图片等内容完全载入并且所有异步脚本完成载入和执行后，`document.readystate`变为`complete`，在`window`对象上触发`load`事件
  - 显示页面（浏览器解析过程中会逐步显示页面）

## `HTTP`请求的报文结构
- 首行包括：请求方法  请求`URL`  协议
- 首行之后是请求头，包括`general-header`，`request-header`或者`entity-header`
- 最后是请求实体

```
GET /Protocols/rfc2616/rfc2616-sec5.html HTTP/1.1
Host: www.w3.org
Connection: keep-alive
Cache-Control: max-age=0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36
Referer: https://www.google.com.hk/
Accept-Encoding: gzip,deflate,sdch
Accept-Language: zh-CN,zh;q=0.8,en;q=0.6
Cookie: authorstyle=yes
If-None-Match: "2cc8-3e3073913b100"
If-Modified-Since: Wed, 01 Sep 2004 13:24:52 GMT

name=qiu&age=25
```

## `HTTP`响应报文结构
- 首行是状态行：`HTTP`版本  状态码 状态描述
- 响应头部，包括通用头部，响应头部以及实体头部
- 响应实体
```
HTTP/1.1 200 OK
Date: Tue, 08 Jul 2014 05:28:43 GMT
Server: Apache/2
Last-Modified: Wed, 01 Sep 2004 13:24:52 GMT
ETag: "40d7-3e3073913b100"
Accept-Ranges: bytes
Content-Length: 16599
Cache-Control: max-age=21600
Expires: Tue, 08 Jul 2014 11:28:43 GMT
P3P: policyref="http://www.w3.org/2001/05/P3P/p3p.xml"
Content-Type: text/html; charset=iso-8859-1

{"name": "qiu", "age": 25}
```

## 如何进行网站性能优化
- `Content`
  - `Make Fewer HTTP Requests`
  - `Reduce DNS Lookups`
  - `Avoid Redirects`
  - `Make Ajax Cacheable`
  - `Postload Components`
  - `Preload Comoonents`
  - `Reduce the Number of DOM Elements`
  - `Split Components Across Domains`
  - `Minimize Number of iframes`
  - `Avoid 404s`
- `Server`
  - `Use a Content Delivery Network(CDN)`
  - `Add Expires or Cache-Control Header`
  - `Gzip Components`
  - `Configure ETags`
  - `Flush Buffer Early`
  - `Use GET for Ajax Requests`
  - `Avoid Empty Image src`
- `Cookie`
  - `Reduce Cookie Size`
  - `Use Cookie-Free Domains for Components`
- `Css`
  - `Put Stylesheets at Top`
  - `Avoid CSS Expressions`
  - `Choose <link> over @import`
  - `Avoid Filters`
- `JavaScript`
  - `Put Script at Bottom`
  - `Make JavaScript and CSS External`
  - `Minify JavaScript and CSS`
  - `Remove Duplicate Scripts`
  - `Minimize DOM Access`
  - `Develop Smart Event Handlers`
- `Images`
  - `Optimize Images`
  - `Optimize CSS Sprites`
  - `Do Not Scale Images in HTML`
  - `Make favicon.ico Small and Cacheable`
- `Mobile`
  - `Keep Components Under 25 KB`
  - `Pack Components Into a Multipart Document`

详情见[雅虎Best Practices for Speeding Up Your Web Site](https://developer.yahoo.com/performance/rules.html#etags)

## `HTTP`状态码及其含义
- `1xx`: 信息状态码
  - `100 Continue`
  - `101 Switching Protocols`
- `2xx`: 成功状态码
  - `200 ok`
  - `201 Created`
  - `202 Accepted`
  - `203 Non-Authoritative Information`
  - `204 No Content`
  - `205 Reset Content`
  - `206 Partial Content`
- `3xx`: 重定向
  - `300 Multiple Choices`
  - `301 Moved Permanently`
  - `302 Found`
  - `303 See Other`
  - `304 Not Modified`
  - `305 Use Proxy`
  - `306 (unused)`
  - `307 Temporary Redirect`
- `4xx`: 客户端错误
  - `400 Bad Request`
  - `401 Unauthorized`
  - `402 Payment Required`
  - `403 Forbidden`
  - `404 Not Found`
  - `405 Method Not Allowed`
  - `406 Not Acceptable`
  - `407 Proxy Authentication Required`
  - `408 Request Timeout`
  - `409 Conflict`
- `5xx`: 服务器错误
  - `500 Internal Server Error`
  - `501 Not Implemented`
  - `502 Bad Gateway`
  - `503 Service Unavailable`
  - `504 Gateway Timeout`
  - `505 HTTP Version Not Supported`
  
   ## `HTTP`知识
   
   - `HTTP/1.1`是无状态的协议，但为了实现期望的保持状态功能，于是引入了`Cookie`技术，有了`cookie`之后再用`HTTP`协议进行通信，就可以管理状态了
   - `cookie`会根据从服务器端发送的响应报文内的一个叫做`Set-Cookie`的首部字段信息，通知客户端保存`Cookie`，当下次客户端再往服务器发送请求时，客户端会自动在请求报文中加入`Cookie`的值后发送
