# `Window`对象

## 计时器
`setTimeout`和`setInterval`可以用来注册在指定的时间之后单次或者重复调用的函数，会返回一个值，这个值可以传递给`clearTimeoout`和`clearInterval`来取消函数调用

由于历史原因，`setTimout`和`setInterval`的第一个参数可以作为字符串传入，这个字符串会在指定的超时时间或间隔之后进行求值（相当于`eval`），`HTML5`还允许`setTimeout`和`setInterval`传入额外的参数，并在调用函数的时候将这个参数传递过去（`IE`中不兼容）
```javascript
setTimeout(function (a, b, c) {
	console.log(a, b, c)
}, 1000, 1, 2 ,3)
// 1秒后打印出1 2 3
```

## 浏览器定位和导航
`window`对象的`location`属性引用的是`Location`对象，它表示该窗口中当前显示的文档的`URL`，并定义了方法来载入新的文档，`Document`对象的`location`属性也是引用的`Location`对象，也就是`window.location === document.location => true`

在`document`中有一个`URL`属性，保存的是文档首次载入后的`URL`字符串，这个字符串不会发生改变。比如定位到文档中的片段标识符(如`#table-of-contents`)，`location`对象会做相应的更新，但是`document.URL`不会

### 解析`URL`
下面是`location`对象中的常用属性及方法：
1. `hash`: 哈希值，包含`#`以及后面的内容
2. `host`: 主机
3. `hostname`: 域名
4. `href`: 完整`URL`,如果值改变，文档会被定位到新地址
5. `origin`: 只读（待深入）
6. `pathname`: 路径名称
7. `port`: 使用端口号
8. `protocol`: 使用协议
9. `search`： 参数，包含`?`之后的所有内容，现代浏览器提供`URLSearchParams`和`URL.searchParams`可以很容易的解析出相关参数
10. `assign`: 使窗口载入并显示你指定的`URL`中的文档
11. `replace`: 载入指定文档，但在载入前会从浏览历史中将当前文档删除
12. `reload`: 重新加载当前文档


下面是一个获取浏览器参数的例子
```javascript
function urlArgs () {
  var args = {}
  var query = location.search.substring(1)
  var pairs = query.split('&')

  for (var i = 0; i < pairs.length; i++) {
      var pos = pairs[i].indexOf('=')
      if (pos === -1) continue
      var name = pairs[i].substring(0, pos)
      var value = pairs[i].substring(pos, pairs[i].length)
      args[name] = value
  }
  return args
}
```

### 载入新的文档
- `assign`: 使窗口载入并显示你指定的`URL`中的文档
- `replace`: 载入新文档并将当前文档从历史中删除
- `reload`: 重新载入当前文档
- 直接为`location`赋值，可以为`location`不同的属性进行赋值
  ```javascript
  location = 'http://www.baidu.com'
  location = 'page2.html' // 相对URL路径
  // 设置片段标识符，跳转页面某个位置
  location = '#top' // 跳转文档中id为top元素的位置, 路径url 后添加 #top
  location = '?name=value' // 在url后添加 ?name=value
  // location对象分解属性可写
  location.search = '?name=value'
  ```

## 浏览历史
`window`对象的`history`属性引用的是该窗口的`History`对象，该对象是用来把窗口的浏览历史用文档和文档状态列表的形式表示，其中的`length`属性表示浏览历史列表中的元素数量，但出于安全方面的因素，脚本不能访问已保存的`URL`

下面是`History`对象中的一些属性与方法：
- `go`: 接收一个参数，可以在浏览器历史中向前（正参数）或向后（负参数）跳过任意多个页
- `back`: 使浏览器在浏览历史中向后跳转一格
- `forward`: 使浏览器在浏览历史中向前跳转一格
- `lenght`: 浏览器历史列表中的元素数量
- `pushState`: `history.pushState(state, title, url)`，无刷新的向浏览器历史最前方加入一条记录
  - `state`: 状态对象，由`pushState()`方法创建，与历史记录相关的`javascript`对象，当用户定向到一个新状态时，会触发`window.popstate`事件，事件的`state`属性包含了历史记录的`state`对象，如果不需要这个对象，可以填`null`
  - `title`: 新页面标题，所有浏览器都会忽略这个值，因此可以填`null`
  - `URL`: 新历史记录地址，新`URL`必须和当前`URL`在同一个域，否则，会抛出异常。该参数可选，如没有，则会被设置为文档当前的`URL`
- `replaceState`: `history.replaceState(state, title, url)`，参数见上，无刷新地替换当前的历史记录

## 浏览器和屏幕信息
脚本有时候需要获取和它们所在的`web`浏览器或浏览器所在的桌面的相关信息，`window`对象的`navigator`和`screen`属性，分别引用的是`Navigator`和`screen`对象，这些对象提供的信息允许脚本来根据环境定制自己的行为

### `Navigator`对象
当需要解决存在于某个特定的浏览器的特定版本中的特殊`bug`时，就需要用到浏览器嗅探。`Navigator`对象有4个属性用于提供关于运行中的浏览器版本信息，并且可以使用这些属性进行浏览器嗅探

- `appName`: `web`浏览器全称，在`IE`中为`Microsoft Internet Explorer`，在其他浏览器中为`Netscape`
- `appVersion`: 浏览器厂商和版本信息的详细字符串
- `userAgent`: 浏览器在它的`USER-AGENT HTTP`头部中发送的字符串，由于这个属性包含绝大部分信息，因此浏览器嗅探代码通常用它来进行嗅探
- `platform`: 在其上运行浏览器的操作系统的字符串

下面是使用`navigator.userAgent`来进行浏览器嗅探
```javascript
//  "webkit": Safari或Chrome;版本号是Webkit的版本号
// "opera": Opera; 版本号就是软件的版本号
// "mozilla": FireFox或者其他基于gecko内核的浏览器;版本号是Gecko的版本号
// "msie": IE;版本号为软件版本号
var brower = (function () {
  var s = navigator.userAgent.toLowerCase()
  rwebkit = /(webkit)[ \/]([\w.]+)/
  ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/
  rmsie = /(msie) ([\w.]+)/
  rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/
  var match = rwebkit.exec( ua ) ||
    ropera.exec( ua ) ||
    rmsie.exec( ua ) ||
    ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
    [];
   return { browser: match[1] || "", version: match[2] || "0" };
})()
```
下面是一些其他的属性：
- `onLine`: 浏览器当前是否连接到网络
- `geolocation`: `Geolocation`对象定义用于确定用户地理位置信息的接口
- `javaEnabled()`: 非标准方法，当浏览器可以运行`java`小程序时返回`true`
- `cookieEnable()`: 非标准方法，如果浏览器可以保存永久`cookie`时，返回`true`

### `Screen`对象
`window`对象的`screen`属性引用的是`Screen`对象，它提供有关窗口显示的大小和可用的颜色数量的信息
- `width/height`: 以像素为单位的窗口大小
- `availWidth/availHight`: 实际可用的显示大小，排除了像桌面任务栏这样的特性所占用的空间
- `colorDepth`: 显示的是`BPP`(`bits-per-pixel`)值