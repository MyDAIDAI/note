# 脚本化`css`

## 查询计算出的样式
元素的计算样式是一组属性值，它由浏览器通过把内联样式结合所有链接样式表中所有可引用的样式规则导出（或计算）得到的，它就是一组在显示元素时实际使用的属性值。计算样式也是一个`CSSStyleDeclaration`对象来表示的，计算样式是只读的。

计算样式通过调用`window.getComputedStyle()`得到：
- 第一个参数（必须）为需要获取其计算样式的元素
- 第二个参数（必须）通常为`null`或空字符串，但它也可以是命名`CSS`伪对象的字符串，如`:before`,`:after`,`:first-line`或`:first-letter`

`getComputedStyle()`方法的返回值是一个`CSSStyleDeclaration`对象，它代表了应用在指定元素（或伪对象）上的所有样式。表示计算样式的`CSSStyleDeclaration`对象和表示内联 样式的对象之间由一些重要区别：

- 计算样式的属性为只读的
- 计算样式的值为绝对值：类式百分比和点之类的相对单位会被转换为绝对值。所有指定尺寸的属性都有以像素为度量单位的值。其值为颜色的属性将会以`rgb(#, #, #)`或`rgba(#, #, #, #)`的格式返回
- 不计算复合属性的值，它们只基于基本属性，如没有`margin`属性的值，只有`marginLeft`、`marginTop`等等
- 计算样式的`cssText`属性为定义

需要注意的是，`window.getComputedStyle()`所得到的值不一定准确。当查询`font-family`属性时，为适应跨平台可移植性，它可以接受以逗号隔开的字体系列列表，当查询一个计算样式的`fontFamily`属性时，只能得到应用到该元素上的具体的`font-family`样式的值，无法知道实际使用了哪种字体。除此之外，如果没有绝对定位元素，查询计算属性的`top`、`left`等值返回的为`auto`，如果需要查询元素的尺寸以及位置，应该使用`e.getBoundingClientRect()`

## 脚本化`CSS`类
修改元素样式时，可以直接修改`HTML`元素的类来修改元素的样式，`e.className = 'attention'`，操作元素的`className`属性会直接覆盖原来的值，比如`e.className = ''`则删除所有应用在元素上的类。这样的操作对于只需要添加或者删除其中一个类名是很繁琐的。

在`HTML5`中为每一个元素都定义了`classList`属性，这个属性只是`DOMTokenList`对象，一个只读的类数组对象，并且其中包含`add`、`contains`、`entries`、`remove`、`replace`、`toggle`等方法.`DOMTokenList`对象是动态实时地，而非一个静态快照。但并非所有的浏览器都兼容`classList`属性，可以对其进行模拟实现
```javascript
function classList(e) {
    return new CSSClassList(e)
}
function CSSClassList (e) {
    this.e = e
}
CSSClassList.prototype.contains = function (c) {
    if (c.length === 0 || c.indexOf('') !== -1) {
           throw new Error('invalid class name' + c)
    }
    let classes = this.e.className
    if (!classes) return false
    if (classes === c) {
        return true
    }
    return classes.search("\\b" + c + "\\b") !== -1
}
CSSClassList.prototype.add = function (c) {
    if (this.contains(c)) {
        return
    }
    let classes = this.e.className
    if (classes && classes[classes.length - 1] !== '') {
        c = '' + c
    }
    classes += c
}
CSSClassList.prototype.remove = function (c) {
    if (c.length === 0 || c.indexOf(' ') !== -1) {
        throw new Error('invalid class name' + c)
    }
    var pattern = new RegExp("\\b" + c + "\\b\\s*", "g")
    this.e.className = this.e.className.replace(pattern, '')
}
CSSClassList.prototype.toggle = function (c) {
    if (this.contains(c)) {
        this.remove(c)
        return false
    } else {
        this.add(c)
        return true
    }
}
CSSClassList.prototype.toString = function () {
    return this.e.className
}
CSSClassList.prototype.toArray = function () {
    return this.e.className.match(/\b\w+\b/g) || []
}
```