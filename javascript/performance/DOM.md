# `javaScript`性能优化之`DOM`篇

## `DOM`访问与修改
`js`访问`DOM`节点是有代价的，所以应该减少`DOM`的访问次数，将运算尽量在`js`端处理

## `HTML`集合
`HTML`集合包含了节点引用的类数组对象，该对象在底层文档对象更新的时候，也会自动更新。也就是，该集合一直与文档保持着连接，每次调用都会进行查询.返回该集合的方法有：
- `document.getElementsByName()`
- `document.getElmentsByClassName()`
- `document.getElementsByTagName()`
- `document.images`
- `document.links`
- `document.forms`
- `document.forms[0].elements`

由于集合是实时的，这可能会造成无限循环
```javascript
var divs = document.getElementsByTagName('div')
for (var i = 0; i < divs.length; i++) {
  document.body.appendChild(document.createElement('div'))
} 
```
优化建议：
- 将集合的`length`属性缓存在局部变量中，避免重新查询
- 由于集合的计算比数据慢，可以将其复制到数组中对其进行操作，但复制过程也会消耗时间
- 将需要操作的元素缓存在局部变量中，减少集合查询次数

```javascript
var divs = documents.getElementsByTagName('div')
var len = divs.length // 缓存长度
var name = ''
for (var i = 0; i < len; i++) {
  name = document.getElementsByTagName[i].nodeName  // 最慢
  name = divs[i].nodeName // 较快
  // 最快
  var ele = divs[i]
  name = ele.nodeName
}
```

## 遍历`DOM`
**节点**
有些`DOM`元素属性，如`childNodes`, `firstNode`, `nextSibling`并不会区分元素节点与其他节点类型（注释节点或者文本节点等）。在有些情况下不需要这些节点类型，这些节点类型会增加节点查询时间，所以使用只返回含有元素节点的属性更好
- `children`
- `nextElementSibling`
- `previousElementSibling`
- `firstElementChild`
- `lastElementChild`
- `childElementCount`

**选择器**
使用`querySelectorAll`配合`css`选择器更加高效，该方法不会返回`HTML`集合，因此返回的节点不会对应实时的文档结构，这就避免了前面由于`HTML`集合引起的性能以及逻辑问题

## 重绘与重排
当`DOM`的变化影响了元素的几何属性（宽和高），比如边框宽度，内容高度等。浏览器需要重新计算元素的几何属性，其他元素的几何属性和位置也会受到影响。浏览器会使渲染树种受到影响部分失效，并重新构造渲染树，这个过程为**重排**。重排之后，浏览器会重新绘制受影响的部分到屏幕中，这个过程为**重绘**

重排和重绘都是代价昂贵的操作，会导致浏览器的`UI`反应变慢。因此应该尽可能减少这种操作

**重排发生**
当页面的布局和几何属性发生改变的时候就需要进行重排
- 添加或者删除可见`DOM`元素
- 元素的位置发生改变
- 元素的尺寸发生改变（外边距，内边距，边框宽度，高度，宽度）
- 内容改变
- 页面渲染器初始化
- 浏览器窗口大小发生改变

**渲染树变化的排队与刷新**
浏览器通过队列化修改并且批量执行来优化重排过程。但一个操作会强制刷新队列并要求任务立即执行
- `offsetTop offsetLeft offsetWidth offsetHeight`
- `scrollTop scrollLeft scrollWidth scrollHeight`
- `clientTop clientLeft clientWidth clientHeight`
- `getComputedStyle`
上面的属性和方法会返回最新的布局信息，因此浏览器不得不执行渲染队列中的“待处理变化”并触发重排将将最新的布局信息返回

在修改样式的过程中，最好避免使用上面的属性。

**最小化重绘和重排**
1. 样式改变
  由于重绘和重排的代价非常昂贵，为了减少发生次数，应该合并多次对`DOM`和样式的修改，然后一次进行处理
  ```javascript
  // 修改了三次布局，会造成三次重排
  var elem = document.getElementById('div')
  elem.style.boderStyle = "2px"
  elem.style.padding = "2px"
  elem.style.margin = "5px"
  // 优化，或者直接修改class
  elem.style.cssText += "border: 2px;padding: 2px; margin: 5px"
  ```
1. 批量修改`DOM`
  - 使元素脱离文档流
  - 将改变应用到元素上
  - 把元素带回文档中
  上面的方法在第一步以及第三步会触发两次重排，但如果不这样做的话，在第二步中会触发更多次重排，具体方法有：
  - 隐藏元素，应用样式，显示元素
  - 使用代码片段`fragment`在当前`DOM`之外构建一个子树，再把它拷贝回文档
  - 将原始原始拷贝到一个脱离文档的节点中，修改之后替换原始元素

**缓存布局信息**
尽量减少布局信息的获取次数，获取之后把它赋值给布局变量，然后再操作局部变量

**让元素脱离动画流**
使用以下步骤可以避免页面中的大部分重排：
- 使用绝对位置定位页面上的动画元素，将其脱离文档流
- 让元素动起来。当它扩大，会临时覆盖部分页面，但这只是页面一个小区域的重绘过程，不会产生重排
- 当动画结束的时候恢复定位，从而只会发生一次重排、

**事件委托**
事件处理器的绑定是有代价的，会消耗更多的时间以及内存。由于事件会逐层冒泡并能被父元素捕获。所以使用事件代理，只需要给外层元素绑定一个处理器就可以处理在子元素上触发的所有事件

事件发生过程：
- 捕获
- 处于目标
- 冒泡

## 小结
减少`DOM`编码带来的性能损失，应该注意：
- 最小化`DOM`访问次数，尽可能在`javascript`端处理
- 需要多次访问`DOM`节点，使用局部变量缓存引用
- 小心处理`HTML`集合，由于实时连接底层文档。应该将长度属性缓存在局部变量中，如果需要多次操作集合，应该将其拷贝到数组中
- 使用更快的方法或属性，如`querySelectAll()`、`firstElementChild`等
- 注意重绘和重排，批量修改样式时，将其脱离文档流，使用缓存，并减少访问布局信息的次数
- 动画中使用绝对定位，使用拖放代理
- 使用事件委托