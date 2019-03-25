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