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