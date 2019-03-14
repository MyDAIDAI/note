# 事件处理

## 事件类型
事件可以大致分为以下几类：
- 依赖于设备的输入事件，这些事件和特定输入设备直接相关，比如鼠标和键盘事件等等
- 独立于设备的输入事件，有些输入事件没有直接相关的特定输入设备。例如，`click`事件表示激活了链接、按钮或其他文档元素，这通常是通过鼠标单击实现的，但是也可以通过键盘或触摸感知设备上的手势来实现
- 用户界面事件，用户界面事件是较高级的事件，通常出现在定义`Web`应用用户界面的`HTML`表单元素上。包括文本输入域获取键盘焦点的`focus`事件，用户改变表单元素显示值的`change`事件和用户表单中的"提交"按钮的`submit`事件
- 状态变化事件，这些事件不是由用户活动而是由网路或浏览器活动触发，用来表示某种生命周期或相关状态的变化。比如，`window`对象上的`load`事件等等
- 特定`API`事件，`HTML5`及相关规范定义的大量`Web API`都有自己的事件类型，比如拖放`API`定义了如`dragstart`、`dragenter`、`dragover`等，`<video>`和`<audio>`元素定义了如`waiting`、`playing`、`seeking`等事件
- 计时器和错误处理程序，计时器和错误处理程序属于客户端`javascript`异步编程模型的部分，并有相似的事件

### 传统事件类型
##### 表单事件
- 表单提交`submit`与`reset`事件
- 与类按钮表单元素（单选与复选）交互的`click`事件
- 表单元素状态改变的`change`事件
- 改变焦点的表单元素在得到和失去焦点时的`focus`与`blur`事件

需要注意的时，`focus`与`blur`事件不会冒泡，但其他表单事件都可以。可以使用`focusin`和`focusout`事件来模拟这两个事件，这两个事件可以进行冒泡

##### `Window`事件
`window`事件是指事件的发生与浏览器窗口本身而非窗口中显示的任何特定文档内容相关
- `load`事件，当文档和其所有的外部资源完全加载并显示给用户时就会进行触发
- `unload`事件，当用户离开当前文档转向其他文档时会触发它
- `beforeunload`事件，提供询问用户是否确定离开当前页面的机会
- `error`事件，当`js`程序出错时触发
- `focus`与`blur`事件，浏览器获得或失去焦点时触发
- `resize`事件，用户调整浏览器窗口大小时触发
- `srcoll`事件，浏览器窗口滚动时触发

##### 鼠标事件
用户在文档上移动或单击鼠标时都会产生鼠标事件。这些事件在鼠标指针所对应的最深嵌套元素上触发，并且冒泡到最顶层
- `mousemove`事件，移动或拖动鼠标时触发，该事件发生非常频繁，不能计算密集型任务
- `mousedown`与`mouseup`事件，用户按下或释放鼠标按键时触发
- `click`事件，该事件在`mousedown`和`mouseup`之后
- `dbclick`事件，用户在短时间内连续两次单击鼠标按键时触发
- `contextment`事件，单击鼠标右键时触发
- `mouseover`事件，当用户移动鼠标指针从而使它悬停到新元素上时触发，事件对象包含`relatedTarget`属性指明移动过程中涉及的其他元素
- `mouseout`事件，当鼠标移动指针从而使其不再悬停在某个元素上时触发，事件对象包含`relatedTarget`属性指明移动过程中涉及的其他元素
- `mouseenter`事件，鼠标进入元素时触发，不冒泡
- `mouseleave`事件，鼠标离开元素时触发，不冒泡
- `mousewheel`事件，用户滚动鼠标滚轮时触发

下面是`mouseout`与`mouseleave`的区别：
![`mouseout`与`mouseleave`区别](https://github.com/MyDAIDAI/note/blob/master/javascript/The-Definitive-Guide-of-JavaScript/mouse.png)

##### 键盘事件
无论任何文档元素获取键盘焦点都会触发键盘事件，并且会冒泡到`Document`和`Window`对象
- `keydown`与`keyup`，按下或释放案件触发
- `keypress`，在`keydown`与`keyup`之间触发，当按下键重复产生字符时，在`keyup`事件之前会产生很多`keypress`事件，其事件对象指定产生的字符而非按下的键

### `HTML5`事件
`HTML5`中新定义的事件包含`<audio>`以及`<vedio>`事件，拖拽相关事件，历史管理事件以及对离线`web`事件等的支持

### 触摸屏和移动设备事件
移动设备建立了许多事件，比如旋转设备时产生的`orientationchange`事件，手势事件`gesturestart`、`gesturechange`...以及触摸事件`touchstart`、`touchmove`、`touchend`事件等

## 注册事件处理程序
注册事件处理程序有两种基本方式：
- 给事件目标元素或文档元素设置属性
- 将事件处理程序传递给对象或元素的方法`addEventListener`

### 设置`javascript`对象属性为事件处理程序
注册事件处理程序最简单的方式就是通过设置事件目标的属性为所需事件处理程序函数。事件处理程序属性的名字由`on`后面跟随事件名所组成:`onclick`、`onchange`、`onload`等
```javascript
window.onload = function () {
  var elt = document.getElementById('elt')
  elt.onsubmit = function () {}
}
```
这种事件处理程序注册技术适用于所有浏览器的所有常用类型，但缺点是每个事件目标的每种事件只能注册一个事件处理程序，后面的处理程序会覆盖前面的

### 设置`HTML`标签属性为事件处理程序
可以在`HTML`标签中为元素设置属性来添加事件处理程序，其属性值应该是`javascript`代码字符串，这段代码应该是事件处理程序函数的主体，而非完整的函数声明。也就是说，`HTML`事件处理程序代码不应该用大括号包围且使用`function`关键字作为前缀
```html
<button onclick="alert('click button')">确定</button>
```
如果`HTML`事件处理程序属性包含多条`javascript`语句，需要使用分号分隔这些语句或断开属性值使其跨多行。这种方式应该避免使用

### `addEventListener()`
任何能成为事件目标的对象，包括`window`对象、`document`对象和所有的文档元素都定义了一个`addEventListener()`方法，使用这个方法可以为事件目标注册事件处理程序，参数分别为：
- 第一个参数，要注册处理程序的事件类型
- 第二个参数，当指定类型的事件发生时应该调用的函数
- 第三个参数，布尔值，`false`为冒泡阶段调用，`true`为捕获阶段调用
下面是一个简单的例子：
```javascript
var b = document.getElementById("mybutton")
b.onclick = function () { alert("thanks for clicking me") }
b.addEventListener("click", function () { alert('thanks again') }, false)
```
用`click`作为第一个参数调用`addEventListener()`不会影响`onclick`属性的值，上面对`click`事件使用不同的方式注册的事件处理程序在事件发生时会按照注册顺序进行调用

可以使用`removeEventListener()`方法来删除添加在事件上的事件处理程序，参数与`addEventListener`相同

### `attachEvent`
在`IE9`之前的`IE`不支持`addEventListener()`和`removeEventListener()`方法，可以使用`attachEvent()`与`detachEvent()`方法来进行添加与删除，这个方法的工作原理与`addEventListener`类似，但也有一些不同之处：
- `IE`事件不支持事件捕获，所以其方法只有两个参数
- `IE`的事件注册时事件类型需要添加`on`字符

```javascript
// 注册事件兼容
var b = document.getElementById("mybutton")
var handler = function () {
  alert('thank')
}
if (b.addEventListener) {
  b.addEventListener('click', handler, false)
} else {
  b.attachEvent('onclick', handler)
}
```

## 事件处理程序的调用
一旦注册了事件处理程序，浏览器就会在指定对象上发生指定类型事件时自动调用。

### 事件处理程序的参数
通常调用事件处理程序时把事件对象作为它们的第一个参数。事件对象的属性提供了有关事件的详细信息。需要注意的是，在`IE8`及以前版本中，通过设置属性注册事件来处理程序，当调用它们时并未传递对象，需要使用`window.event`来获取事件对象

### 事件处理程序的运行环境
- 通过设置属性来注册事件处理程序的时候，事件处理程序在事件目标上定义，该程序作为事件目标的方法来进行调用。也就是说，在事件处理程序内部，`this`关键字指的是事件目标
- 通过`addEventListener`方法来注册事件时，调用的处理程序使用事件目标作为其`this`值，与`event`对象中的`currentTarget`值相同
- 通过`attachEvent`方法来注册事件时，其`this`值为全局`window`对象，需要将事件目标显式地传递进行调用
```javascript
elt.attachEvent('on' + type, function (event) {
  return handler.call(elt, event)
})
```
### 事件处理程序的作用域
与其他`js`函数一样，事件处理程序也是词法作用域。它们在其定义时的作用域而非调用时的作用域中执行，并且它们能够存取那个作用域中的任何一个本地变量

需要注意的是，通过`HTML`属性来注册的事件处理程序的作用域为`with`动态生成，它们被转换为能够存取全局变量的顶级函数而非任何本地变量
```javascript
function(event) {
  with (document) {
    with(this.form || {}) {
      with (this) {
        // code...
      }
    }
  }
}
```
在上面的作用域链中，需要警惕同名属性的覆盖问题

### 事件处理程序的返回值
通过设置对象属性或`HTML`属性注册事件处理程序的返回值为`false`，就会阻止该事件的默认操作。但使用`addEventListener`或`attachEvent`方法注册的函数，需要调用事件对象的`preventDefault()`或设置事件对象的`returnValue`属性来进行设置

### 调用顺序
事件处理程序会按照它们的注册顺序进行调用

### 事件传播
在调用在目标元素上注册事件处理程序后，大部分事件会“冒泡”到`DOM`树根，然后依次调用目标的父元素的事件处理程序，调用目标祖父元素上注册的事件处理程序，一直到达`Document`对象，最后达到`Window`对象。这样就可以在共同的祖先元素上注册一个处理程序来处理所有的事件

发生在文档元素上的大部分事件都会冒泡，但`focus`、`blur`、`scroll`、`mouseenter`、`mouseleave`事件不会发生冒泡

事件传播一共有三个阶段：捕获阶段 -> 处于目标阶段 -> 冒泡阶段

可以通过设置`addEventListener`方法的第三个参数来修改阶段，如果这个参数为`true`，那么事件处理程序会在捕获阶段进行调用，否则在冒泡阶段进行调用

事件捕获阶段是反向的冒泡阶段，最先调用`Window`对象的捕获处理程序，然后是`Document`对象的捕获处理程序，依次沿着`DOM`树向下，在目标对象本身上注册的捕获事件不会被调用。事件捕获提供了在事件没有送达目标之前查看它们的机会。事件捕获能用于程序调试或过滤掉事件从而使目标事件处理程序绝不会被调用

### 事件取消
取消事件默认行为：
- 对象属性或`HTML`注册的事件处理程序通过返回`false`取消
- 通过`addEventListener`或`attachEvent`注册的事件处理程序通过调用方法`preventDefault()`取消或设置`returnValue = false`取消

取消事件传播：

在支持`addEventListener`的浏览器中，可以调用事件对象的一个`stopPropagation()`方法来阻止事件的继续传播。该方法可以在事件传播期间的任何时间调用，它能工作在捕获阶段，处于目标阶段以及冒泡阶段。该方法调用之后，阻止了事件的传播，任何冒泡或捕获阶段的对象的该事件处理程序将不会被调用，但同一个对象上所定义的同一种事件类型的事件处理程序，在事件发生时仍会被调用

除此之外，`DOM`中还定义了一个`stopImmediatePropagation`方法，该方法不仅会阻止事件的传播，也会阻止在同一个对象上注册的相同类型的事件的处理程序的调用
```html
<!DOCTYPE html>
<html>
    <head>
        <style>
            p { height: 30px; width: 150px; background-color: #ccf; }
            div {height: 30px; width: 150px; background-color: #cfc; }
        </style>
    </head>
    <body>
        <div>
            <p>paragraph</p>
        </div>
        <script>
            const p = document.querySelector('p')
            p.addEventListener("click", (event) => {
              alert("我是p元素上被绑定的第一个监听函数");
            }, false);

            p.addEventListener("click", (event) => {
              alert("我是p元素上被绑定的第二个监听函数");
              event.stopImmediatePropagation();
              // event.stopPropagation();
              // 执行stopImmediatePropagation方法,阻止click事件冒泡,并且阻止p元素上绑定的其他click事件的事件监听函数的执行.
            }, false);

            p.addEventListener("click",(event) => {
              alert("我是p元素上被绑定的第三个监听函数");
              // 调用stopImmediatePropagation方法时，该监听函数排在上个函数后面，该函数不会被执行
              // 调用stopPropagation方法时，该函数仍会被执行
            }, false);
            p.addEventListener("mouseout", (event) => {
                alert("我是p元素的 mouseout 事件")
                // 该监听函数一直会执行
            })
            document.querySelector("div").addEventListener("click", (event) => {
              alert("我是div元素,我是p元素的上层元素");
              // p元素的click事件没有向上冒泡，该函数不会被执行
            }, false);
        </script>
    </body>
</html>
```

## 文档加载事件
后续添加...

## 鼠标事件
鼠标事件的种类很多，除了`mouseenter`与`mouseleave`之外的所有鼠标事件都能冒泡，下面是一些鼠标类型
- `click`, 当用户按下并释放鼠标按键或其他方式“激活”元素时触发，该事件在`mousedown`与`mouseup`之后触发
- `contextmenu`, 可以取消的事件，当上下文菜单即将出现时触发。当前浏览器在鼠标右击时显示上下文菜单，所以这个事件也能像`click`事件那样使用
- `dbclick`, 当用户双击鼠标时触发
- `mousedown`, 当用户按下鼠标按键时触发
- `mouseup`, 当用户释放鼠标按键时触发
- `mousemove`, 当用户移动鼠标时触发
- `mouseover`, 当鼠标进入元素时触发，`relatedTarget`指的是鼠标来自的元素
- `mouseout`, 当鼠标离开元素时触发，`relatedTarget`指的是鼠标要去往的元素
- `mouseenter`, 类似`mouseover`，但不冒泡
- `mouseleave`, 类似`mouseout`，但不冒泡

```html
<!-- 这是一个拖拽例子 -->
<!DOCTYPE html>
<html>
    <head>
      <style>
        .container {
          position: absolute;
          left: 100px;
          top: 100px;
          width: 250px;
          background-color: white;
          border: 1px solid black;
          height: 100px;
        }
        .drag-ele {
          background-color: gray;
          border-bottom: 1px dotted black;
          padding: 3px;
          font-weight: bold;
          height: 50px;
        }
      </style>
    </head>
    <body>
        <div class="container">
          <div class="drag-ele">拖动我</div>
        </div>
    </body>
    <script>
      document.getElementsByClassName('drag-ele')[0].addEventListener('mousedown', dragHandler)

      function dragHandler (event) {
        let dragParentEle = event.target.parentNode
        let scroll = getScrollOffset()
        let startX = event.clientX + scroll.x
        let startY = event.clientY + scroll.y

        let originX = dragParentEle.offsetLeft
        let originY = dragParentEle.offsetTop

        let deltaX = startX - originX
        let deltaY = startY - originY

        document.addEventListener('mousemove', moveHandler, true)
        document.addEventListener('mouseup', upHandler, true)

        
        function moveHandler (event) {
          let scroll = getScrollOffset()
          dragParentEle.style.top = event.clientY + scroll.y - deltaY + 'px'
          dragParentEle.style.left = event.clientX + scroll.x - deltaX + 'px'

          if (event.stopPropagation) {
            event.stopPropagation()
          } else {
            event.cancelBubble = true
          }
        }

        function upHandler (event) {
          document.removeEventListener('mousemove', moveHandler, true)
          document.removeEventListener('mouseup', upHandler, true)
        }
      }


      function getScrollOffset () {
        return {
          x: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
          y: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        }
      }
    </script>
</html>
```