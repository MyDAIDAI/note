# 整体架构

`jQuery`框架的使用方式

```javascript
$('div').find().css()
$('div').hide().html()
```

从上面的代码中我们可以发现两个问题：

- `jQuery`对象的构建方式
- `jQuery`对象的调用方式

## 构建方式

创建一个实例，一般按照下面的方法进行：

```javascript
function jQuery(selector, context) {
}
jQuery.prototype = {}
var a = new jQuery('div')
a.hide()
a.html()
```

但是实际上`jQuery`不是这样使用的，在使`jQuery`的时候并没有显式的进行实例化，并且还可以使用点操作符进行连续的调用，如

```javascript
jQuery('div').hide().html()
```

要实现这个，就需要在调用`jQuery('div')`时，进行实例化，并且返回当前的实例

```javascript
var jQuery = function (selector, context) {
    return new jQuery()
}
jQuery.prototype = {
    hide: function () {},
    css: function () {}
}
```

上面虽然进行实例，也将实例返回了，但是进入了死循环，所以不能这么做！！！

在`jQuery`的源码中，将构造函数定义在了原型中

```javascript
jQuery = function (selector, context) {
    return new jQuery.fn.init(selector, context)
}
jQuery.fn = jQuery.prototype = {
}
init = jQuery.fn.init = function (selector, context, root) {
    var slice = Array.prototype.slice
    var dom = slice.call(document.querySelectorAll(selector))
    var i, len = dom ? dom.length : 0
    for (i = 0; i < len; i++) {
        this[i] = dom[i]
    }
    this.selector = selector
}
init.prototype = jQuery.fn
```

在上面的代码中当调用`jQuery`时，返回的都是一个新的实例化对象，每个实例化对象都包含原型中的方法与属性，实现这个功能主要是将构造函数的原型又指向其`jQuery`的原型

## 链式调用

在`jQuery`中可以通过点运算符进行链式调用，实现链式调用的基本条件就是实例`this`的存在，并且是同一个实例，所以我们在每一个方法中，将当前的实例`this`返回即可

```javascript
var jQuery = function (selector, context) {
    return new jQuery.fn.init(selector, context)
}
jQuery.fn = jQuery.prototype = {
    css: function () {
        console.log('css')
        return this
    },
    html: function () {
        console.log('html')
        return this
    }
}
var init = jQuery.fn.init = function (selector, context) {
    var slice = Array.prototype.slice
    var dom = slice.call(document.querySelectorAll(selector))
    var i, len = dom ? dom.length : 0
    for (i = 0; i < len; i++) {
        this[i] = dom[i]
    }
    this.selector = selector
}
```

参考： http://www.cnblogs.com/aaronjs/p/3278578.html