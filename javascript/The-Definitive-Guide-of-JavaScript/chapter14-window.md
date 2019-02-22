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