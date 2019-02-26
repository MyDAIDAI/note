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

上面的方法在`Element`中也有定义，在元素上调用时，指定的选择器仍然在整个文档中进行匹配，然后过滤除结果集以便它只包含指定元素的后代元素。这意味着选择器字符串能包含元素的祖先而不经就是上诉所匹配元素

> 注意，在`css`中定义的`:first-line`，`:first-letter`等伪元素在`querySelector()`等方法中是不匹配的


### `document.all[]`
在`DOM`标准化之前，`IE 4`引入了`document.all[]`集合来表示所有文档中的元素（除了`Text`节点）
```javascript
document.all[0] // 文档中的第一个元素
document.all['navbar'] // id 或 name 为 "navbar" 的元素或多个元素
document.all.tags("div") // 文档中所有的 <div> 元素
document.all.tags("p")[0] // 文档中的第一个 <p> 元素
```