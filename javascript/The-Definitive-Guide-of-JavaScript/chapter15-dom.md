# 脚本化文档
## `DOM`概览
文档节点的部分层次结构：
- `Node`
  - `Document`
    - `HTMLDocument`
  - `CharacterData`
    - `Text`
    - `Comment`
  - `Element`
    - `HTMLElement`
      - `HTMLHeadElement`
      - `HTMLBodyElement`
      - `HTMLTitleElement`
      - `HTMLInputElement`
      - `HTMLTableElement`
      - ...
  - `Attr`
上面节点中`Comment`节点代码`HTML`或`XML`的注释，由于注释基本上是文本字符串，因此它们很像表示文档中显示的`Text`节点

`Attr`节点类型代表`XML`或`HTML`属性，但几乎从不使用，因为和文档节点不同，`Element`类型定义了将属性当作“名/值”对使用的方法

`DocumentFragment`类在实际文档中并不存在的一种节点，它代表一系列没有常规父节点的节点，对一些文档操作来说`DocumentFragment`非常有用

## 选取文档元素
`DOM`定义许多方式来选取元素，查询文档的一个或多个元素有如下方法：
- 用指定的`id`元素
- 用指定的`name`属性
- 用指定的标签名字
- 用指定的`CSS`类
- 匹配指定的`CSS`选择器

### 通过`ID`选取元素
任何`HTML`元素可以有一个`id`属性，在文档中该值必须唯一，可以使用`Document`对象的`getElementById()`方法选取一个基于唯一`ID`的元素

通过`ID`查找多个元素
```javascript
function getElements(/*ids...*/) {
  var elements = {}
  for (var i = 0; i < arguments.length; i++) {
    var id = arguments[i]
    var elt = document.getElementById(id)
    if (elt == null) {
      throw new Error('no element with id')
    }
    elements[id] = elt
  }
  return elements
}
```

### 通过名字选取元素
`name`属性最初打算为表单元素分配名字，在表单数据提交到服务器的时候使用该属性的值，与`id`不同的是，`name`属性的值不是必须唯一，并且只在少数`HTML`元素中有效，包括表单、表单元素、`<iframe>`和`<img>`元素

基于`name`属性的值选取`HTML`元素，可以使用`Document`对象的`getElementsByName()`方法，但是需要注意的是，该方法定义在`HTMLDocument`类中，而不在`Document`类中，所以它只针对`HTML`文档可用，在`XML`文档中不可用。该方法返回一个`NodeList`对象

###  通过标签名选取元素
`Document`对象的`getElementsByTagName()`方法用来选取指定类型（标签名）的所有`HTML`或`XML`对象，返回一个`NodeList`对象，在`NodeList`中返回的元素按照在文档中的顺序排序

`HTML`标签不区分大小写，所以在使用`getElementsByTagName()`的时候，它也进行的是不区分大小写的标签名比较，为其传入通配符`*`将获得一个代表文档中所有元素的`NodeList`对象

`Element`类也定义了`getElementsByTagName()`方法，其原理与`Document`版本的一样，但是它只选取调用该方法的元素的后代元素

由于历史原因，`HTMLDocument`类定义一些快捷属性来访问各种各样的节点：
- `document.images` -> `<img>`
- `document.forms` -> `<form>`
- `document.links` -> `<a>`
- `document.enbeds/document.plugins` -> `<embed>`
- `document.script` -> `<script>`
- `document.anchors` -> 有一个`name`属性的`<a>`元素
- `document.body` -> `<body>`
- `document.head` -> `<head>`
- `document.documentElement` -> 指代文档的根元素，在`HTML`文档中，指代`<html>`元素

`getElementsByName`和`getElementsByTagName`返回的是`NodeList`对象，而类似`document.images`和`document.forms`的属性为`HTMLCollection`对象。这些对象都是只读的类数组对象，含有`length`属性，可以使用`for`循环进行遍历或者使用`Array.prototype.map.call(document.getElementsByTagName, function(e) {return e.innerHTML})`方法来使用数组方法。

> 需要注意是的，`NodeList`与`HTMLCollection`对象不是历史文档状态的一个静态快照，而通常是实时的，并且当文档变化时它们所包含的元素列表能随之改变。如果要在迭代一个`NodeList`对象时在文档中添加或者删除元素的时候，需要对`NodeList`对象生成一个静态的副本`var snapshot = Array.prototype.slice.call(nodelist, 0)`，否则会进行死循环

### 通过`CSS`类选取元素
`HTML`定义了`getElementsByClassName()`方法，它基于其`class`属性值中的标识符来选取成组的文档元素，返回值时一个实时的`NodeList`对象，包含文档或元素所有匹配的后代节点，参数为字符串，该字符串可以由多个空格隔开的标识符组成，只有当元素包含所有指定的标识符时才匹配，标识符的顺序无关紧要。

> 注意，在怪异模式下，`getElementsByClassName()`方法将执行不区分大小写的字符串比较，否则，该比较区分大小写

### 通过`CSS`选择器选取元素
`CSS`样式表有一种非常强大的语法，就是选择器，它用来描述文档中的若干或多组元素
```javascript
#nav // id="nav"的元素
div // 所有<div>标签
.warning // 所有class属性包含 warning 的元素

// 基于属性值选取
.p[lang="fr"] // 所有使用法语的段落，如 <p lang="fr">
*[name="x"] // 所有包含 name="x" 属性的元素

// 组合使用
span.fatal.error // 其class 包含 "fatal" 和 "error" 的所有 <span> 元素
span[lang="fr"].warning // 所有有 lang="fr" 属性并且 class 包含 "warning" 的元素

// 指定文档结构
#log span // id="log"元素的后代元素中的所有 <span> 元素
#log>span // id="log"元素的子元素中所有 <span> 元素
body>h1:first-child // <body>的子元素中的第一个 <h1> 元素

// 组合选取多个或多组元素
div, #log // 选取所有 <div> 元素以及 id="log" 的元素
```

获取匹配一个给定选择器的元素的方法为`Document`中的`querySelectorAll()`，它接受包含一个`CSS`选择器的字符串参数，返回一个表示文档中匹配选择器的所有元素的`NodeList`对象。但与前面描述的选取元素的方法不同的是，`querySelectorAll()`返回的`NodeList`对象并**不是实时**的：它包含在调用时刻选择器所匹配的元素，但它不更新后续文档的变化

除了`querySelectorAll()`方法之外，文档对象还定义了`querySelector()`方法，与`querySelectorAll`原理类型，但是它只是返回以文档顺序所匹配的第一个元素，没有匹配元素则返回`null`

上面的方法在`Element`中也有定义，在元素上调用时，指定的选择器仍然在整个文档中进行匹配，然后过滤除结果集以便它只包含指定元素的后代元素。这意味着选择器字符串能包含元素的祖先而不仅是所匹配元素

> 注意，在`css`中定义的`:first-line`，`:first-letter`等伪元素在`querySelector()`等方法中是不匹配的


### `document.all[]`
在`DOM`标准化之前，`IE 4`引入了`document.all[]`集合来表示所有文档中的元素（除了`Text`节点）
```javascript
document.all[0] // 文档中的第一个元素
document.all['navbar'] // id 或 name 为 "navbar" 的元素或多个元素
document.all.tags("div") // 文档中所有的 <div> 元素
document.all.tags("p")[0] // 文档中的第一个 <p> 元素
```

## 文档结构和遍历
从文档中选取了一个元素，有时候需要查找文档中与之在结构上相关的部分（父亲、兄弟和子女）

### 作为节点树的文档
`Document`对象，它的`Element`对象和文档中表示文本的`Text`对象都是`Node`对象，`Node`对象定义了以下一些属性：
- `parentNode`: 该节点的父节点
- `childNodes`: 只读的类数组对象，它是该节点的子节点的实时表示
- `firstChild`、`lastChild`: 该节点的子节点中的第一个和最后一个，如果该节点没有子节点则为`null`
- `nextSibling`、`previousSibling`: 该节点的兄弟节点中的前一个和下一个，具有相同父节点的两个节点为兄弟节点。节点的顺序反映了它们在文档中出现的顺序。这两个属性将节点之间以双向链表的形式连接起来
- `nodeType`: 该节点的类型
  - `9` -> `Document`节点
  - `1` -> `Element`节点
  - `3` -> `Text`节点
  - `8` -> `Comment`节点
  - `11` -> `DocumentFragment`节点
- `nodeValue`: `Text`节点或者`Comment`节点的内容
- `nodeName`: 元素的标签名，以大小的形式表示

### 作为元素树的文档
如果只注意文档中的元素而非它们之间的文本（`Text`和`Comment`）时，可以使用下面这些更有用的`API`，这些`API`将文档看作是`Element`对象树，忽略`Text`和`Comment`节点，下面是`Element`对象的一些属性：
- `children`: 类似`childNodes`，也是一个`NodeList`对象，但`children`列表只包含`Element`对象
- `firstElementChild`、`lastElementChild`: 类似`firstChild`和`lastChild`，但只代表子`Element`节点
- `nextElementSibling`、`previousElementSibling`: 类似`nextSibling`和`previousSibling`，但只代表兄弟`Element`
- `childElementCount`: 子元素数量。返回的值和`children.length`值相等

```javascript
// 返回元素e的第n层祖先元素，如果不存在此类祖先元素或祖先元素不是 Element，则返回null
function parent(e, n){
  if (n === undefined) n = 1
  while(n-- && e) e = e.parentNode
  if (!e || e.nodeType !== 1) return null
  return e
}

// 返回元素 e 的第 n 个兄弟元素
// 如果 n 为正，则返回后续的第 n 个兄弟元素
// 如果 n 为负，则返回前面的第 n 个兄弟元素
// 如果 n 为零，则返回 e 本身
function sibling(e, n) {
  while(e && n !== 0) {
    if (n > 0) {
      if (e.nextElementSibling) {
        e = e.nextElementSibling
      } else {
        for (e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling); // 一直循环到 Element元素
      }
      n--;
    } else {
      if (e.previousElementSibling) {
        e = e.previousElementSibling
      } else {
        for (e = e.previousSibling; e && e.nodeType !== 1; e = e.previousSibling);
      }
    }
  }
  return e
}

// 返回元素 e 的第 n 代子元素，不存在则返回 null
// 负值则为从后往前计数，0代表第一个子元素
function child(e, n) {
  if (e.children) {
    if (n < 0) n += e.children.length
    if (n < 0) return null
    return e.children[n]
  }
  if (n > 0) {
    // 获得第一个元素，然后获取其兄弟元素
    if (e.firstElementChild) {
        e = e.firstElementChild
    } else {
        for (e = firstChild; e && e.nodeType !== 1; e = nextSibling);
    }
    return sibling(e, n)
  } else {
    // 获得最后一个元素，然后获取前 n - 1 个元素
    if (e.lastElementChild) {
        e = e.lastElementChild
    } else {
        for (e = e.lastChild; e && e.nodeType !== 1; e = e.previousSibling);
    }
    return sibling(e, n + 1)
  }
}
```

#### 自定义`Element`的方法
所有当前的浏览器都实现了`DOM`，故类似`Element`和`HTMLDocument`等类型都像`String`和`Array`一样是类。它们不是构造函数，但它们有原型对象，可以用自定义方法进行拓展

```javascript
// 打开 baidu 首页以及控制台
document.getElementById('lg') // <div id=​"lg">​…​</div>​
document.getElementById('lg').next // undefined

Element.prototype.next = function () {
	if (this.nextElementSibling) return this.nextElementSibling
	for (var sib = this.nextSibling; sib && sib.nodeType !== 1; sib = sib.nextSibling);
	return sib
}
document.getElementById('lg').next() 
//<a href=​"/​" id=​"result_logo" onmousedown=​"return c({'fm':​'tab','tab':​'logo'}​)​">​…​</a>​
```
上面的技术在`IE7`中不支持，除此之外，可以将`IE`中的`children`属性在其他不支持的浏览器中进行模拟使用
```javascript
if (!document.documentElement.children) {
  Element.prototype.__defineGetter__("children", function () {
    var kids = []
    for (var c = this.firstChild; c !== null; c = c.nextSibling) {
      if (c.nodeType === 1) {
        kids.push(c)
      }
    }
    return kids
  })
}
```

## 属性
`HTML`元素由一个标签和一组称为属性的名/值对组成。`HTML`元素的属性值在代表这些元素的`HTMLElement`对象的属性中是可用的，除此之外，`DOM`还定义了另外的`API`来获取或设置`XML`属性值和非标准的`HTML`属性

### `HTML`属性作为`Element`的属性
`HTMLElement`定义了通用的`HTML`属性（如`id`等），以及事件处理程序属性，并且还为特定的`Element`子类型元素定义了特定的属性

`HTML`属性名不区分大小写，但是在`javascript`中对大小写敏感。从`HTML`属性名转换到`javascript`属性名需要采用小写形式，如果属性名包含的不止一个单词，那么需要使用驼峰

有的`HTML`属性名在`javascript`中为保留字，对于这些属性，一般的规则是为属性名加前缀`html`，但`class`在`javascript`中为`className`

`HTML`属性的值通常是字符串，也会是布尔值、数值或者函数等。任何`HTML`元素的`style`属性的值为`CSSStyleDeclaration`对象

### 获取和设置非标准`HTML`属性
`Element`类型还定义了`getAttribute()`和`setAttribute()`方法来查询和设置非标准的`HTML`属性，也可以用来查询和设置`XML`文档中元素上的属性。除此之外，还有`hasAttribute()`和`removeAttribute()`

如果操作包含来自其他命名空间中属性的`XML`文档，可以使用其命名空间版本: `getAttributeNS()`、`setAttributeNS()`、`hasAttributeNS()`、`removeAttributeNS()`

### 数据集属性
在`HTML 5`文档中，任意以`data-`为前缀的小写的属性名字都是合法的，这些“数据集属性”将不会对其元素的表现产生影响。

`HTML 5`还在`Element`对象上定义了`dataset`属性，这个属性指代一个对象，它的各个属性对应于去掉前缀的`data-`属性

> `dataset`属性是元素的`data-`属性的实时，双向接口，设置或删除`dataset`的一个属性就等同于设置或移除对应元素的`data-`属性

### 作为`Attr`节点的属性
`Node`类型定义了`attributes`属性，针对非`Element`对象的任何节点，返回`null`。对于`Element`对象，`attributes`属性是只读的类数组对象，并且是实时的。它可以使用索引进行访问，也可以使用属性名进行访问

## 元素的内容
现在有一个标签`<p>This is a <i>simple</i> document</p>`，里面的的内容分为三种：
- 内容是`HTML`字符串`This is a <i>simple</i> document`
- 内容是存文本字符串 `This is a simple document`
- 内容是一个`Text`节点、一个包含了一个`Text`节点的`Element`节点和另一个`Text`节点

### 作为`HTML`的元素内容
读取`Element`的`innerHTML`属性将作为字符串标记返回那个元素的内容。设置改属性会调用`web`浏览器的解析器，用新字符串内容的解析展现形式替换元素当前内容（也可以在`XML`中使用）

`Web`浏览器设置`innerHTML`的效率非常高，但对`innerHTML`属性用`+=`操作符重复追加文本通常效率底下，因为它既要序列化又要解析

除了`innerHTML`属性之外，`HTML5`还标准化了`outerHTML`属性，当查询`outerHTML`时，返回的`HTML`或`XML`标记的字符串包含被查询元素的开头和结尾标签。当设置元素的`outerHTML`时，元素本身被新的内容替换（只有`Element`元素定义了`outerHTML`属性，`Document`节点则无）

### 作为纯文本的元素内容
有时需要查询文本形式的元素内容，或者在文档中插入纯文本（不用转义`HTML`标记中使用的尖括号和`&`符号），可以使用`Node`的`textContent`来实现，`textContent`属性会返回后代节点中所有的文本所拼接的字符串

`textContent`属性在除了`IE`的所有当前的浏览器中都支持。在`IE`中，可以用`Element`的`innerText`属性来代替。`textContent`与`innerText`属性非常相似，通常可以替换使用

#### `<script>`中的文本
内联的`<script>`元素（也就是没有`src`属性的）有一个`text`属性来获取它们的文本。浏览器不显示`<script>`元素的内容，并且`HTML`解析器忽略脚本中的尖括号和星号。这使得`<script>`元素成为应用程序用来嵌入任意文本内容的一个理想地方。简单地将元素的`type`属性设置为某些值（如`text/x-custom-data`），就表明了脚本为不可执行的`javascript`代码，`js`解释器将忽略该脚本，但该元素将仍然存在于文档树中，它的`text`属性将返回数据给你

### 作为`Text`节点的元素内容
另一种方法处理元素的内容是来当作一个子节点列表，每个子节点可能有它自己的一组子节点。当考虑元素的内容时，通常感兴趣的是它的`Text`节点。在`XML`文档中，还有`CDATASection`节点
```javascript
// 返回元素e的纯文本内容，递归进入其子元素
// 类似于 Element 的 textContent 属性

function textContent(e) {
  var child, type, s = ''
  for (child = e.firstChild; child !== null; child = child.nextSibling) {
    type = child.nodeType
    if (type === 3 || type === 3) {
      s += child.nodeValue
    } else if (type === 1) {
      s += textContent(child)
    }
  }
  return s
}
```
`nodeValue`属性定义在`Node`类型中，它保存`Text`或`CDATASection`节点的内容（其他节点调用返回`null`），可以读/写，设置它可以改变`Text`或`CDATASection`节点所显示的内容

## 创建、插入和删除节点
`Document`类型定义了创建`Element`和`Text`对象的方法，`Node`类型定义了在节点树种插入、删除和替换的方法

## 创建节点
- 创建`Element`节点，`document.createElement()`，传递标签名
- 创建`Text`节点，`document.createTextNode()`，传递文本内容
- 创建`Comment`节点，`document.createComment()`
- 创建`Fragment`，`document.createDocumentFragment()`
- 复制已存在的节点，`cloneNode()`，返回该节点的一个全新副本，传入`true`为深复制，传入`false`为浅复制

### 插入节点
可以使用`Node`的方法`appendChild()`或`insertBefore()`将它插入到文档中
- `appendChild()`，在需要插入的`Element`节点上调用，它插入指定的节点使其成为那个节点的最后一个子节点
- `insertBefore()`，接受两个参数，第一个参数为待插入的节点，第二个参数是已存在的节点，新节点将插入到该节点的前面

> 如果调用`appendChild()`或`insertBefore()`将已存在文档中的一个节点再次插入，那个节点将自动从它当前的位置删除并在新的位置重新插入，没有必要显式删除该节点

### 删除和替换节点
- 删除节点，`removeChild()`，`n.parentNode.removeChild(n)`
- 替换节点，`replaceChild()`，第一个参数是新节点，第二个参数是需要代替的节点

### 使用`DocumentFragment`
`DocumentFragment`是一种特殊的`Node`，它作为其他节点的一个临时容器。与`Document`节点一样，`DocumentFragment`是独立的，而不是任何其他文档的一部分，它的`parentNode`为空，但可以有任意多的子节点，可以使用`appendChild()`、`removeChild()`等方法来进行操作

`DocumentFragment`的特殊之处在于它使得一组节点被当作一个节点来看待：如果给`appendChild`、`insertBefore`或`replaceChild`传递一个`DocumentFragment`，其实是将该文档片段的所有子节点插入到文档中，而非片段本身
```javascript
// 将 n 中的元素反转
function reverse(n) {
  var f = document.createDocumentFragment()
  while(n.lastChild) f.appendChild(n.lastChild)
  n.appendChild(f)
}
```

## 文档和元素的几何形状和滚动

### 文档坐标和视口坐标
元素的位置是以像素来度量的，向右代表`X`坐标的增加，向下代表`Y`坐标的增加。但是，会有两个不同的点作为坐标系的原点：元素的`X`和`Y`坐标可以相对与文档的左上角或者相对于显示文档的视口的左上角

文档坐标比视口坐标更加基础，并且在用户滚动的时候它们不会发生变化。在使用`CSS`来指定元素位置的时候运用的是文档坐标。但一般查询元素位置时，返回的是其相对视口坐标的位置

为了在坐标系之间互相转换，需要判断浏览器窗口滚动距离，也就是滚动条的位置。
- `winodw.pageXOffset`、`window.pageYOffset` (只读)
- `document.documentElement.scrollTop`、`document.documentElement.scrollLeft`(正常模式下，可写)
- `document.body.scrollTop`、`document.body.scrollLeft`(怪异模式下，可写)

```javascript
// 查询窗口滚动条的位置
function getScrollOffsets(w) {
  // 使用指定的窗口，如果不带参数则使用当前窗口
  w = w || window
  if (w.pageXOffset !== null) {
    return {
      x: w.pageXOffset,
      y: w.pageYOffset
    }
  }
  var d = w.document
  // 标准模式下的IE
  if (document.compatMode === 'CSS1Compat') {
    return {
      x: d.documentElement.scrollLeft,
      y: d.documentElement.scrollTop
    }
  }
  // 怪异模式下的浏览器
  return {
    x: d.body.scrollLeft,
    y: d.body.scrollTop
  }
}
```

获取视口的尺寸
```javascript
function getViewportSize (w) {
  w = w || window
  if (w.innerWidth !== null) {
    return {
      w: w.innerWidth,
      h: w.innerHeight
    }
  }
  var d = w.document
  if (document.compatMode === 'CSS1Compat') {
    return {
      w: w.documentElement.clientWidth,
      h: w.documentElement.clientHeight
    }
  }
  return {
    w: w.body.clientWidth
    h: w.body.clientHeight
  }
}
```

### 查询元素的几何尺寸
判断一个元素的尺寸和位置最简单的办法就是调用它的`getBoundingClientRect()`方法。该方法不需要参数，返回一个有`left`、`right`、`top`、`bottom`属性的对象，返回的坐标包含元素的内边距和边框，但是不包含外边距。这个方法返回元素在视口坐标中的位置。为了转化为元素在文档中的位置，需要加上滚动的偏移量：
```javascript
var box = e.getBoundingClientRect() // 视口坐标
var offsets = getScrollOffsets()
var x = offsets.x + box.left // 文档坐标
var y = offsets.y + box.top
```
`getBoundingClientRect()`返回的对象还包含`width`和`height`属性，但在原始的`IE`中并没有实现，可以通过其他属性值进行计算
```javascript
var box = e.getBoundingClientRect()
var width = box.width || (box.right - box.left)
var height = box.height || (box.bottom - box.top)
```
> 需要注意的是，浏览器在布局时，块状元素总是为矩形，但是内联元素可能跨了多个文档，因此可能有多个矩形组成。如果在内联元素上调用`getBoundingClientRect()`，它返回"边界矩形", 如果想查询内联元素每个独立的矩形，可以使用`getClientRects()`

最后需要注意的是，`getBoundingClientRect`和`getClientRects`并不是实时的，它们只是调用方法时文档视觉状态的静态快照，在用户滚动或者改变浏览器窗口大小的时候并不会进行更新

### 判定元素在某点
`getBoundingClientRect()`方法使我们能在视口中判定元素的位置。但有时我们想要判断视口中某一个位置上有什么元素，这可以用`Document`对象的`elementFromPoint()`方法来进行判定。传递`X`和`Y`坐标（视口坐标），该方法返回在指定位置的一个元素。如果指定的点在视口以外，则返回`null`

### 滚动
可以设置`scrollLeft`以及`scrollTop`属性来让浏览器滚动，但还有一种更简单的方法，`Window`对象的`scrollTo()`方法，接受一个点的`X`和`Y`坐标（文档坐标），并作为滚动条的偏移量设置它们。也就是，窗口滚动到文档坐标中指定的点到视口的左上角。
```javascript
// 滚动浏览器到文档最下面的页面可见
var documentHeight = document.documentElement.offsetHeight
var viewportHeight = window.innerHeight
window.scrollTo(0, documentHeight - viewportHeight)
```
`Window`的`scrollBy()`方法和`scroll()`和`scrollTo()`类似，但它的参数是相对的，并在当前滚动条的偏移量上增加。除此之外，还可以在需要显示的`HTML`元素上调用`scrollIntoView()`方法，此方法保证了元素能在视口中可见

### 关于元素尺寸、位置和溢出的更多信息
`getBoundingClientRect()`方法在当前的所有浏览器上都有定义，但如果需要支持老式浏览器，不能够依靠此方法而必须使用更老的技术来判断元素的尺寸和位置

获得元素尺寸:
- `offsetHeight`，返回尺寸包含元素的内边距和边框，不包含外边距
- `offsetWidth`，返回尺寸包含元素的内边距和边框，不包含外边距

获得元素坐标，对于很多元素，这些值是文档坐标，并直接指定元素的位置。但对于已定位元素的后代元素和一些其他元素，这些属性返回的坐标是相对于祖先元素的坐标而非文档:
- `offsetLeft`
- `offsetTop`

可以通过`offsetParent`属性指定这些属性所相对的父元素，如果`offsetParent`为`null`，这些属性就为文档坐标
```javascript
// 计算一个元素的文档坐标，有两种方式
// 第一种，使用 getBoundingClientRect + document.documentElement.clientHight
// 第二种，循环获得父元素 offsetLeft 与 offsetTop
function getElementPosition(e) {
  var x = 0, y = 0
  while(e !== null) {
    x += e.offsetLeft
    y += e.offsetTop
    e = e.offsetParent
  }
  return {
    x: x,
    y: y
  }
}
```
除了这些名字以`offset`开头的属性之外，所有的文档元素定义了其他两组属性，一组以`client`开头，一组以`scroll`开头
```javascript
offsetHeight        clientWidth         scrollWidth
offsetWidth         clientHeight        scrollHeight
offsetLeft          clientLeft          scrollLeft
offsetTop           clientTop           scrollTop
offsetParent
```
- `offsetHeight`,`offsetWidht`:  `content + pad + border`
- `clientHeight`,`clientWidth`: `content + pad`
- `scrollHeight`,`scrollWidth`: `content + pad + overContent`

- `offsetLeft`,`offsetTop`: 相对父元素或文档坐标
- `clientLeft`,`clientTop`: 通常等于左边和上边的边框宽度
- `scrollLeft`,`scrollTop`: 指定元素的滚动条的位置（可写）

## 其他文档特性
### `Document`的属性
下面介绍一些`document`的属性：
- `cookie`: 允许`javascript`程序读写`HTTP cookie`的特殊属性
- `domain`: 该属性允许当`web`页面之间交互时，相同域名下互相信任的`web`服务器之间协作放宽同源策略安全限制
- `lastModified`: 文档修改时间的字符串
- `location`: 与`window`对象的`location`属性引用同一个`Location`对象
- `referrer`: 如果有，它表示浏览器导航到当前链接的上一个文档。该属性值和`HTTP`的`Referer`头信息的内容相同
- `title`: 文档的`<title>`和`</title>`标签之间的内容
- `URL`: 文档的`URL`,只读字符串而不是`Location`对象

### 查询选取的文本
有时判定用户在文档中选取了那些文本非常有用
```javascript
function getSelectedText() {
  if (window.getSelection) { // HTML5标准 API
    return window.getSelection().toString()
  } else if (document.selection) {
    return document.selection.createRange().text
  }
}
```
需要注意的是,`Window`对象的`getSelection()`方法无法返回那些表单元素`<input>`或`<textarea>`内部选中的文本，它只返回在文档主体本身中选取的文本。但是,`IE`的`document.selection`属性可以返回文档中任意地方选取的文本,从文本输入域或`<textarea>`元素中获取选取的文本可以使用下面的代码：`elt.value.substring(elt.selectionStart, elt.selectionEnd)`

### 可编辑的内容
有两种方法可以启用元素的编辑功能：
- 设置任何标签的`HTML contenteditable`属性
- 设置对应元素的`JavaScript contenteditable`属性
上面两种方法将使得元素的内容变成可编辑。当用户单击该元素的内容的时候就会出现插入光标，用户敲击键盘就可以插入其中

浏览器可能为表单字段和`contenteditable`元素支持自动拼写检查。在支持该功能的浏览器中，检测可能默认开启或关闭。为元素添加`spellcheck`属性来显式开启拼写检查，而使用`spellcheck=false`来显式关闭该功能

将`Document`对象的`designMode`属性设置为字符串`on`使得整个文档可编辑，设置为`off`将恢复为只读文档。`designMode`属性并没有对应的`HTML`属性，只能使用`js`进行添加
```javascript
const mode = document.designMode;
document.designMode = "on";
​document.designMode = "off";
```
浏览器定义了多项文本编辑命令，大部分没有键盘快捷键。为了执行这些命令，可以使用`document`的`execCommand()`方法，该方法的第一个参数为命令字符串，第二个参数如果为`true`，则浏览器会自动提示用户输入所需值。但为了提高可移植性，应该提示用户输入，并传递`false`作为第二个参数，传递用户输入的值作为第三个参数。下面有一些命令有关的方法：
- `document.queryCommandSupport()`: 传递命令来查询浏览器是否支持该命令
- `document.queryCommandEnabled()`: 查询当前所使用的命令
- `document.queryCommandState()`: 判断命令当前是否可以使用
- `document.queryCommandValue()`: 查询命令值
- `document.queryCommandIndeterm()`: 检测命令值是否为不确定的

一旦用户编辑了某元素的内容，该元素设置了`conteneditable`属性，就可以使用`innerHTML`属性得到已编辑内容的`HTML`标记

