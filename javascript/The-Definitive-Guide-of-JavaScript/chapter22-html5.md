# `HTML5 API`
## 地理位置
地址位置`api`允许`javascript`程序向浏览器询问用户真实的地理位置。

在支持地理位置`API`的浏览器中会定义`navigator.geolocation`属性，该属性有下面一些方法
- `navigator.geolocation.getCurrentPosition()`: 获取用户当前位置
- `navigator.geolocation.watchPosition()`: 获取当前位置，同时不断地监视当前位置，一旦用户位置发生更改，会调用指定的回调函数
- `navigator.geolocation.clearWatch()`: 停止监视用户位置。传递给这个方法的参数应该是调用`watchPosition()`方法的返回值

这些地理位置相关的技术都包含通过网络的数据交换或者和多个卫星之间的通信，因此这个方法都是异步的，`getCurrentPosition`与`watchPosition`方法需要传递回调函数作为参数。会向回调函数中传入位置对象，该对象中包含获取到的地理位置信息以及精度值等信息

```javascript
function getMap () {
  if (!navigator.geolocation) throw "Geolocation not supported"

  var image = document.createElement('img')
  navigator.geolocation.getCurrentPosition(setMapUrl)
  return image;
  function setMapUrl(pos) {
    var latitude = pos.coords.latitude
    var longtitude = pos.coords.longtitude
    var accuracy = pos.coords.accuracy

    var url = "http://maps.google.com/maps/api/staticmap" +
        "?center=" + latitude + "," + longtitude + "&size=640x640&sensor=true"

    var zoomlevel = 20
    if (accuracy > 80) {
        zoomlevel -= Math.round(Math.log(accuracy/50)/Math.LN2)
    }
    url += "&zoom=" + zoomlevel
    image.src = url
  }
}
```
传入`getCurrentPosition()`与`watchPosition()`方法的参数：
- 第一个参数，获取地理位置成功之后的回调函数
- 第二个参数，获取地理位置失败之后的回调函数
- 第三个参数，配置对象，该对象的属性指定了是否需要高精度的位置信息，过期时间以及允许系统在多长时间内获取位置信息

最后，传入回调函数的参数对象，除了包含地理位置，精度等信息之外，可能还包含海拔、速度和航向之类的额外信息

## 历史记录管理
`web`浏览器会记录在一个窗口中载入的所有文档，同时提供了“后退”和“前进”按钮，允许用户在这些文档之间切换浏览。现在的`web`应用通常都是动态地生成或者载入页面内容，并在无须刷新页面的情况下就显示新的应用状态。

- 使用`location.hash`和`hashchange`事件。设置`location.hash`属性会更新显示在地址栏中的`URL`，同时会在浏览器的历史记录中添加一条记录。当浏览器中`URL`的`hash`值发生了变化，就会在`window`对象上触发一个`hashchange`事件。
- `history.pushState()`方法与`popstate`事件。当一个`web`应用进入一个新的状态的时候，它就会调用`history.pushState()`方法将该状态添加到浏览器的浏览历史记录中
  - 第一个参数，状态对象，该对象包含用于恢复当前文档所需要的所有信息，可以是使用`JSON.stringify()`方法转换为字符串形式的对象，也可以是`Date`与`RegExp`类型的对象
  - 第二个参数，可选标题，浏览器可以使用它来标识浏览历史记录中保存的状态
  - 第三个参数，可选`URL`，当前状态的位置

除了`pushState()`方法之外，`History`对象上还定义了`replaceState()`方法，该方法不是将新的状态添加到浏览历史记录中，而是用新的状态代替当前的历史状态

当用户通过"后退"和"前进"按钮浏览保存的历史记录时，或者调用`history`的`back()`，`go()`等方法时，浏览器会在`Window`对象上触发一个`popstate`事件，该事件会传入一个事件对象，事件对象中有一个`state`属性，包含传递给`pushState()`方法的状态对象的副本

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Page Title</title>
</head>
<body>
  <button id="clickMe">点我</button>
  <div id="show"></div>
</body>
<script>
window.onload = function () {
  let btn = document.getElementById('clickMe')
  let state = {
    page: 1
  }
  let show = document.getElementById('show')
  show.innerText = window.location.search
  btn.addEventListener('click', function () {
    history.pushState(state, 'page' + state.page, "?page=" + state.page)
    state.page++
    show.innerText = window.location.search
  })
  window.onpopstate = function (event) {
    console.log('location: ' + window.location + ', state: ' + JSON.stringify(event.state))
    console.log('event', event)
    show.innerText = window.location.search
  }
}
</script>
</html>
```


```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Page Title</title>
  <style>
    #prompt { font-size: 16pt }
    table {
      width: 90%;
      margin: 10px;
      margin-left: 5%;
    }
    #low, #high {
      background-color: lightgray;
      height: 1em;
    }
    #mid {
      background-color: green
    }
  </style>
</head>
<body>
  <h1 id="heading">i am thinking of a number</h1>
  <table>
    <tr>
      <td id="low"></td>
      <td id="mid"></td>
      <td id="high"></td>
    </tr>
  </table>
  <label id="prompt"></label>
  <input id="input" type="text">
</body>
<script>
window.onload = newgame
window.onpopstate = popstate
var state, ui

function newgame(playagian) {
  ui = {
    heading: null,
    prompt: null,
    input: null,
    low: null,
    mid: null,
    high: null
  }

  for (var id in ui) ui[id] = document.getElementById(id)

  ui.input.onchange = handleGuess

  state = {
    n: Math.floor(99 * Math.random()) + 1,
    low: 0,
    high: 100,
    guessnum: 0,
    guess: undefined
  }

  display(state)

  // 重玩游戏，则重新保存游戏状态
  // 通过 load 事件触发时，则不保存游戏状态
  // 由于通过浏览器历史记录从其他文档状态回退到当前状态时，也会触发 load 事件
  // 如果这种情况下保存，那么会将当前的状态进行覆盖
  // 在支持pushState()方法的浏览器中，load事件之后会触发popstate事件
  if (playagian) save(state)
}

function save(state) {
  if (!history.pushState) return

  var url = "#guess" + state.guessnum

  history.pushState(state, "", url)
}

function popstate(event) {
  if (event.state) {
    state = event.state
    display(state)
  } else {
    // 当第一次载入页面时，会触发一个没有状态的popstate事件
    history.replaceState(state, "", "#guess" + state.guessnum)
  }
}

function handleGuess() {
  var g = parseInt(this.value)

  if ((g > state.low) && (g < state.high)) {
    if (g < state.n) {
      state.low = g
    } else if (g > state.n) {
      state.high = g
    }
    state.guess = g
    state.guessnum++
    save(state)
    display(state)
  } else {
    alert（'低:' + state.low + '; 高:' + state.high）
  }
}
function display(state) {
  ui.heading.innerHTML = document.title = "I am thinking of a number between " + state.low + " and" + state.high + '.'

  ui.low.style.width = state.low + "%"
  ui.mid.style.width = (state.high - state.low) + "%"
  ui.high.style.width = (100 - state.high) + "%"

  ui.input.style.visibility = "visible"
  ui.input.value = ""
  ui.input.focus()

  if (state.guess === undefined) {
    ui.prompt.innerHTML = "Type your guess and hit Enter"
  } else if (state.guess < state.n) {
    ui.prompt.innerHTML = state.guess + "is too low. Guess again"
  } else if (state.guess > state.n) {
    ui.prompt.innerHTML = state.guess + "is too high.Guess again"
  } else {
    ui.input.style.visibility = "hidden"
    ui.heading.innerHTML = document.title = state.guess + "  is correct!"
    ui.prompt.innerHTML = "You win! <button onclick='newgame(true)'>Play again</button>"
  }
}
</script>
</html>
```

## 跨域消息传递
`window.postMessage()`方法可以安全地实现跨域通信。通常，对于两个不同页面的脚本，只有当指向它们的页面位于具有相同的协议，端口号以及相同的主机时才能互相通信。该方法允许有限的通信--通过异步消息传递的方式--在两个不同的源的脚本之间。

参数：
- 要传递的消息，该参数可以是任意基本类型值或者可以复制的对象
- 指定目标窗口的源，其中包括协议、主机名和端口号，其他信息会被忽略。如果传递的信息不包含任意敏感消息并且愿意将其传递给任何窗口，就可以直接将参数设置为`*`通配符即可。如果要指定和当前窗口同源的化，那么可以简单的使用`/`

当调用方法之后，在目标窗口的`Window`对象上就会触发一个`message`事件。在目标窗口中的脚本则可以定义通知`message`事件的处理程序函数，调用该处理程序函数时会传递一个事件对象，该事件对象有以下属性：
- `data`: `postMessage`方法的第一个参数的副本
- `source`: 消息源的`window`对象
- `origin`: 指定消息来源(`URL`)

```javascript
/*
 * A窗口的域名是<http://example.com:8080>，以下是A窗口的script标签下的代码：
 */

var popup = window.open(...popup details...);

// 如果弹出框没有被阻止且加载完成

// 这行语句没有发送信息出去，即使假设当前页面没有改变location（因为targetOrigin设置不对）
popup.postMessage("The user is 'bob' and the password is 'secret'",
                  "https://secure.example.net");

// 假设当前页面没有改变location，这条语句会成功添加message到发送队列中去（targetOrigin设置对了）
popup.postMessage("hello there!", "http://example.org");

function receiveMessage(event)
{
  // 我们能相信信息的发送者吗?  (也许这个发送者和我们最初打开的不是同一个页面).
  if (event.origin !== "http://example.org")
    return;

  // event.source 是我们通过window.open打开的弹出页面 popup
  // event.data 是 popup发送给当前页面的消息 "hi there yourself!  the secret response is: rheeeeet!"
}
window.addEventListener("message", receiveMessage, false);



/*
 * 弹出页 popup 域名是<http://example.org>，以下是script标签中的代码:
 */

//当A页面postMessage被调用后，这个function被addEventListenner调用
function receiveMessage(event)
{
  // 我们能信任信息来源吗？
  if (event.origin !== "http://example.com:8080")
    return;

  // event.source 就当前弹出页的来源页面
  // event.data 是 "hello there!"

  // 假设你已经验证了所受到信息的origin (任何时候你都应该这样做), 一个很方便的方式就是把enent.source
  // 作为回信的对象，并且把event.origin作为targetOrigin
  event.source.postMessage("hi there yourself!  the secret response " +
                           "is: rheeeeet!",
                           event.origin);
}

window.addEventListener("message", receiveMessage, false);
```
应该注意的是，用于接受消息的任何事件监听器必须首先使用`origin`和`source`属性来检查消息的发送者身份。否则会导致跨站点脚本攻击

## `Web Worker`
// 后续学习...

## 类型化数组和`ArrayBuffer`

##### 类型化数组`TypedArray`
类型化数组描述了一个基于二进制数据缓存的类数组对象。类型化数组中的元素都是数字。使用构造函数在创建类型化数组的时候决定了数组中数组（有符号或者无符号整数或者浮点数）的类型和大小（以位为单位）

语法：
```javascript
new TypedArray()
new TypedArray(length)
new TypedArray(typedArray)
new TypedArray(object)
new TypedArray(buffer [, byteOffset [, length]])
```

有许多中类型化数组，每一种的元素类型都不同。可以使用如下构造函数创建每种的类型化数组
```javascript
Int8Array()
Uint8Array()
Uint8ClampedArray()
Int16Array();
Uint16Array();
Int32Array();
Uint32Array();
Float32Array();
Float64Array();
BigInt64Array();
BigUint64Array();
```
在创建一个类型化数组的时候，可以传递数组大小给构造函数，或者传递一个数组或者类型化数组来用于初始化数组元素。一旦创建了类型化数组，就可以像操作其他类数组对象那样，通过常规的中括号表示法来对数组元素进行读/写操作：
```javascript
// From a length
var int8 = new Int8Array(2);
int8[0] = 42;
console.log(int8[0]); // 42
console.log(int8.length); // 2
console.log(int8.BYTES_PER_ELEMENT); // 1

// From an array
var arr = new Int8Array([21,31]);
console.log(arr[1]); // 31

// From another TypedArray
var x = new Int8Array([21, 31]);
var y = new Int8Array(x);
console.log(y[0]); // 21

// From an ArrayBuffer
var buffer = new ArrayBuffer(8);
var z = new Int8Array(buffer, 1, 4);

// From an iterable
var iterable = function*(){ yield* [1,2,3]; }();
var int8 = new Int8Array(iterable);
// Int8Array[1, 2, 3]
```

类型化数组还有一个`subarray()`方法，调用该方法返回部分数组内容：
```javascript
var ints = new Int16Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
var lasts = ints.subarray(ints.length -3, ints.length)
lasts // Int16Array(3) [7, 8, 9]
lasts[2] // 2
// subarray()不会创建数据的副本，只是直接返回原数组的一部分，
// ints修改了之后其lasts返回的值也会进行相应的修改
ints[9] = -1 // -1
lasts[2] // -1
```

##### `ArrayBuffer`
继续使用上面的例子
```javascript
ints.buffer
// ArrayBuffer(20) {}
//   [[Int8Array]]: Int8Array(20) [0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 0, 8, 0, -1, -1]
//   [[Int16Array]]: Int16Array(10) [0, 1, 2, 3, 4, 5, 6, 7, 8, -1]
//   [[Int32Array]]: Int32Array(5) [65536, 196610, 327684, 458758, -65528]
//   [[Uint8Array]]: Uint8Array(20) [0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 0, 8, 0, 255, 255]
//   byteLength: (...)
//   __proto__: ArrayBuffer

lasts.buffer
  // ArrayBuffer(20) {}
  //   [[Int8Array]]: Int8Array(20) [0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 0, 8, 0, -1, -1]
  //   [[Int16Array]]: Int16Array(10) [0, 1, 2, 3, 4, 5, 6, 7, 8, -1]
  //   [[Int32Array]]: Int32Array(5) [65536, 196610, 327684, 458758, -65528]
  //   [[Uint8Array]]: Uint8Array(20) [0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 0, 8, 0, 255, 255]
  //   byteLength: (...)
  //   __proto__: ArrayBuffer

ints.buffer === lasts.buffer
// true

lasts.byteLength
// 6
lasts.byteOffset
// 14
```
上面的例子说明了类型化数组中某些重要的概念：它们都是基本字节块的视图，称为`ArrayBuffer`.每个类型化数组都有与基本缓冲区相关的三个属性：
- `buffer`: 返回一个`ArrayBuffer`对象
- `byteOffset`: 返回偏移量
- `bytelength`: 返回该视图字节长度

```javascript
lasts.byteLength
// 6
lasts.buffer.byteLength
// ints中有10个数据，一个数据用16位表示，一共160位，
// ArrayBuffer一个字节8位，则在缓冲区中字节长度为 160 / 8 = 20
// 20
```

`ArrayBuffer`对象用来表示通用的，固定长度的原始二进制数据缓冲区。`ArrayBuffer`不能直接操作，而是要通过类型数组对象或者`DataView`对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容
```javascript
var buffer = new ArrayBuffer(8) // length: 要创建的ArrayBuffer大小，单位为字节，一个字节8位，共 8 * 8 = 64 位
buffer
ArrayBuffer(8) {}
[[Int8Array]]: Int8Array(8) [0, 0, 0, 0, 0, 0, 0, 0] // 64 / 8 = 8， 长度为8
[[Int16Array]]: Int16Array(4) [0, 0, 0, 0] // 64 / 16 = 4， 长度为4
[[Int32Array]]: Int32Array(2) [0, 0] // 64 / 32 = 2, 长度为2
[[Uint8Array]]: Uint8Array(8) [0, 0, 0, 0, 0, 0, 0, 0]
byteLength: (...)
__proto__: ArrayBuffer
```

字节顺序，字节组织成更长的字的顺序。为了高效，类型化数组采用底层硬件的原生顺序。在低位优先(`little-endian`)系统中，`ArrayBuffer`中数字的字节是按照从低位到高位的顺序排列的。在高位优先(`big-endian`)系统中，字节是按照从高位到低位的顺序排列的
```javascript
// 低位：0x00000001 -> 01 00 00 00
// 高位: 0x00000001 -> 00 00 00 01
// 测试系统字节排列顺序
var little_endian = new Int8Array(new Int32Array([1]).buffer)[0] === 1
```
大多数的`CPU`架构都是采用低位优先的，但是在文件中的字节可能是高位优先。当读取文件类型的数据时，可以使用`DataView`类，该类定义了采用显式指定的字节顺序从`ArrayBuffer`中读/写其值的方法

`DataView`类详情见: [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)

## `Blob`
在`javascript`中，`Blob`通常表示二进制数据，`Blob`是不透明的，能对它们进行直接操作就只有获取大小（以字节为单位），`MIME`类型以及将它们分隔为更小的`Blob`.`File`接口基于`Blob`，继承了`Blob`的功能并将其扩展使其支持用户系统上的文件

使用`Blob`的场景：
- `Blob`支持结构性复制算法，可以通过`message`事件从其他窗口或者线程中获取`Blob`(`postMessage`或者`webworker`)
- 可以从客户端数据库中获取`Blob`
- 可以使用`XHR2`标准，通过脚本化`HTTP`从`web`中下载`Blob`
- 可以使用`Blob`构造函数来创建一个`Blob`(`BlobBuilder`已经废弃)
- `File`对象是`Blob`的子类，可以通过`<input type="file">`元素以及拖放`API`来获取`File`对象

### 文件作为`Blob`
`<input type="file">`元素上的`files`属性则是一个`FileList`对象，该对象是一个类数组对象，里面的元素为用户选择的`File`对象。一个`File`对象就是一个`Blob`对象。`File`对象比`Blob`对象多了`name`以及`lastModifiedDate`属性
```html
<input type="file" multiple onchange="fileChange(this.files)">
<script>
  function fileChange(files) {
    console.log('files', files)
    // FileList {0: File, length: 1}
        // 0: File
          // lastModified: 1550822435439
          // lastModifiedDate: Fri Feb 22 2019 16:00:35 GMT+0800 (中国标准时间) {}
          // name: "微贷网及宇视项目周报（尹金铭）.xlsx"
          // size: 13481
          // type: ""
          // webkitRelativePath: ""
          // __proto__: File
        // length: 1
        // __proto__: FileList
  }
</script>
```
除了通过`<input>`元素来选择文件之外，用户还可以使用拖拽来上传文件，`drop`事件对象的`dataTransfer.files`属性会和放入的`FileList`进行关联，所以可以通过`dataTransfer.files`获取`File`对象

### 下载`Blob`
使用`XHR2`，将返回的内容指定以`Blob`的形式
```javascript
// 以Blob的形式获取URL指定的内容，并将其传递给指定的回调函数
// 浏览器可能不支持
function getBlob(url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.responseType = "blob"
  xhr.onload = function () {
    callback(xhr.response)
  }
  xhr.send(null)
}
```
### 构造`Blob`
`Blob()`构造函数返回一个新的`Blob`对象，`Blob`的内容由参数数组中给出的值串联组成
```javascript
var blob = new Blob(array, options)
```
传入参数：
- `array`: 是一个由`ArrayBuffer`、`ArrayBufferView`、`Blob`、`DOMString`等对象构成的`Array`，或者其他类似对象的混合体

- `options`: 可选的`BlobPropertyBag`字典，它指定如下两个属性：
  - `type`, 默认值为`""`，它代表了将会被放入到`Blob`中的数组内容的`MIME`类型
  - `endings`: 默认值为`transparent`，用于指定包含行结束符`\n`的字符串如何被写入。
    - `native`: 代表行结束符会被更改为适合宿主操作系统文件系统的换行符
    - `transparent`: 代表会保持`blob`中保存的结束符不变

```javascript
window.onload = function () {
  function createDownload(filename, content) {
    var blob = new Blob([content])
    var link = document.createElement('a')
    link.innerHTML = filename
    link.download = filename
    link.href = URL.createObjectURL(blob)
    document.getElementsByTagName('body')[0].appendChild(link)
  }
  createDownload('text.txt', 'this is a test file')
}
```