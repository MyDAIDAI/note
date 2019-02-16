# 选择器

`jQuery`最基础的操作就是查询，查询文档元素对象，所以狭隘的说，`jQuery`就是一个选择器，并在这个基础上构建和运行查询过滤器，查询需要匹配查询元素，匹配主要使用正则，`jQuery`中文档元素查询的正则表达式为：

```javascript
rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/
```

将上面的正则表达式进行分解，可以分解为下面两个部分，通过选择`|`分割二义，匹配`^`开头或者`$`结尾

- `^(?:\s*(<[\w\W]+>)[^>]*`
  - `(?:pattern)`：匹配`pattern`，但不获取匹配结果，也就是说这是一个非获取匹配，不进行存储
  - `\s*`：匹配任何空白字符串，包括空格、制表符、换页符等等，零次或多次，等价于`{0,}`
  - `(pattern)`：匹配`pattern`并获取这一个匹配，所获取的匹配可以从产生的`maches`集合中得到，使用`$0...$9`属性
  - `[\w\W]+`：匹配于`[A-Za-z0-9]`或`[^A-Za-z0-9]`一次或多次，等价于`{1,}`
  - `（<[wW]+>）`：表示字符串里要包含用`<>`包含的字符，例如`<p>`,`<div>`等都符合要求
  - `[^>]*`：负值字符集合，字符串尾部是除了`>`的任意字符或者没有字符，零次或多次等价于`{0,}`
- `#([\w-]+))$`
  - 匹配带上`#`号的任意字符，包括下划线与`-`

## `jQuery`选择器接口

`jQuery`选择器支持9中方式进行匹配查询

```javascript
1. jQuery(selector[, context])  --> $('#test')
2. jQuery(element) --> $(document.body)
3. jQuery(elementArray) --> $(myForm.elements)
4. jQuery(object) --> $({foo: "bar", hello: "world"})
5. jQuery(jQuery object) --> $($('#test'))
6. jQuery() --> $()
7. jQuery(html[, ownerDocument]) --> $('<div>')
8. jQuery(html, attributes) --> $('<div>', {class: 'test', text: 'click me'})
9. jQuery(callback) --> $(function () {})
```

要学会`jQuery`选择器的源码，那么了解用法是有必要的，下面依次对上面9中用法进行简单介绍

- `jQuery(selector[, context])`，根据传入的`selector`选择器以及`context`上下文匹配`DOM`元素，并通过这些元素创建一个新的`jQuery`对象
- `jQuery(element)`、` jQuery(elementArray)`，  根据传入的`DOM`元素，将其转换为`jQuery`对象，然后就可以在`jQuery`对象上调用`jQuery`方法
- `jQuery(object)`，传入普通对象，可以更方便对普通对象进行查找，修改，监听等操作
- `jQuery(jQuery object)`，`jQuery`对象作为参数传给`$()`方法时，这个对象的一个克隆对象被创建，这个新的`jQuery`对象引用同一个`DOM`元素
- `jQuery()`，返回一个`length`为0的空`jQuery`设置
- `jQuery(html[, ownerDocument])`，根据提供的原始的`HTML` 标记字符串，动态创建由`jQuery`对象包装的`DOM`元素
- `jQuery(html, attributes)`， `html`为一个单标记的`HTML`元素字符串，如`<div/> or <div></div>`，`attributes`为新创建元素的属性，事件和方法
- `jQuery(callback)`，当`DOM`完成加载的时候绑定一个要执行的函数

```javascript
var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/
var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i
var jQuery = function (selector, context) {
    return new jQuery.fn.init(selector, context)
}
jQuery.fn = jQuery.prototype.fn = {}
var init = jQuery.fn.init = function (selector, context) {
    var match, elem;
    if (!selector) {
        return
    }
    // 处理selector为字符串的情况
    // 比如: jQuery('div'), jQuery('<div>'), jQuery('#id')
    if (typeof selector === 'string') {
        console.log('selector', selector)
        // 匹配html标签，如<div>
        if (selector[0] === '<' && selector[selector.length - 1] === '>' && selector.length >= 3) {
            match = [ null, selector, null ]
            console.log('match', match)
        } else { // 匹配id
            match = rquickExpr.exec(selector)
            console.log('match', match)
        }
        // 匹配html标签或者没有指定上下文的#id
        if (match && (match[1] || !context)) {
            // 匹配html标签
            if (match[1]) {
                context = context instanceof jQuery ? context[0] : context
                //  解析html字符串 code...
                // 匹配 jQuery(html, props) 
                // 如，jQuery('<div>', {class: 'test', text: 'click me'})
                if (rsingleTag.test(match[1]) && typeof context === 'object') { 
                    for (match in context) {
                        // 根据属性的类型不同进行相应的添加
                        console.log(match)
                    }
                }
            } else {
                // 匹配id
                elem = document.getElementById(match[2])
                if (elem) {
                    this[0] = elem
                    this.length = 1
                }
                return this
            }
        } else if (!context || context.jQuery) { 
            // 处理context不存在，或者context为jquery对象时的css选择器，jQuery(expr, $(...))
            return (context || root).find(selector)
        } else {
            // 处理上下文存在时的css选择器
            return this.constructor(context).find(selector) 
        }
    } else if (selector.nodeType) { 
        // 匹配 jQuery(DOMElement) --> jQuery(document.body)
        console.log('selector', selector)
        this[0] = selector
        this.length = 1
        return this;
    } else if (typeof selector === 'function') { 
        // 匹配函数 --> jQuery(function () {})
        // 传入函数，则在dom完毕后立即执行
    }
    // 处理jQuery参数是object的情况，
    // 如jQuery({foo: 'bar', hello: 'world'})，jQuery(jQuery('#test'))
    return jQuery.makeArray(selector, this) 
}
init.prototype = jQuery.fn
```

