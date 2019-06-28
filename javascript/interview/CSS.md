# 面试题之`CSS`
## `CSS`选择器
- `*`: 通用选择器，选择所有元素，不参与计算优先级，兼容`IE6`
- `#x`: `id`选择器，选择`id`值为`x`的元素，兼容`IE6`
- `.x`: `class`选择器，选择`class`包含`x`的元素，兼容`IE6`
- `x y`: 后代选择器，选择满足`x`选择器的后代节点中满足`y`选择器的元素
- `:link, :visited, :focus, :hover, :active`: 链接状态，选择特定状态的链接元素，顺序`LoVe HAte`
- `x + y`: 直接兄弟选择器，在`x`之后第一个兄弟节点中选择满足`y`选择器的元素
- `x > y`: 子选择器，选择`x`的子元素中满足`y`选择器的元素
- `x ~ y`: 兄弟选择器，选择`x`之后所有兄弟节点中满足`y`选择器的元素
- `[attr]`: 选择所有设置了`attr`属性的元素
- `[attr=value]`: 选择属性值为`value`的元素
- `[attr~=value]`: 选择属性值为空白分隔符，其中有一个值为`value`的元素
- `[attr|=value]`: 选择属性值刚好为`value`或者以`value`开头的元素
- `[attr^=value]`: 选择属性值以`value`开头的元素
- `[attr$=value]`: 选择属性值以`value`结尾的元素
- `[attr=value]*`: 选择属性中包含`value`的元素 ？
- `[:checked]`: 选择单选框，复选框，下拉框中选中状态下的元素
- `x:after, x::after`: `after`为伪元素，选择元素虚拟子元素，元素最后一个子元素
- `x:hover`: 鼠标移入状态的元素
- `x:not(selector)`: 选择不符合`selector`的元素，不参与计算优先级
- `x::first-letter`: 伪元素，选择块元素第一行的第一个字母
- `x::first-line`: 伪元素，选择块的第一行
- `x:nth-child(an + b)`: 伪类，首先找到所有当前元素`x`的兄弟元素，然后按照位置先后顺序从`1`开始排序，选择结果为`an + b`个元素的集合，不是`x`的元素会参与计数，但不会被选择
- `x:nth-last-child(an + b)`: 伪类，它基本上和`:nth-child`一样，只是它从结尾处反序计数，而不是从开头处。
- `x:nth-of-type(an + b)`: 伪类，首先找到所有当前元素`x`的兄弟元素，然后按照位置先后顺序从`1`开始排序，选择结果为`an + b`个元素的集合，不是`x`的元素不参与计数，不会被选择
- `x:nth-last-of-type(an + b)`: 伪类，它基本上和`:nth-of-type`一样，只是它从结尾处反序计数，而不是从开头处。
- `x:first-child`: 伪类，表示在`x`的一组兄弟元素中的第一个元素。
- `x:last-child`: 伪类，表示在`x`的一组兄弟元素中的最后一个元素。
- `x:only-child`: 伪类，选择满足`x`选择器的元素，且这个元素是其父元素的唯一子元素，除`x`的其他类型标签会被计算
- `x:only-of-type`: 伪类，选择`x`选择器的元素，解析得到的元素标签，如果该元素没有相同类型的兄弟节点时选中
- `x:first-of-type`:伪类，选中`x`选择器的元素，解析得到的元素标签，如果该元素是此类型元素的第一个兄弟，则选中

伪类选择器中`*-child`与`*-of-type`区别在于前者会将其他标签加入计算而后者不会，但它们都只会选择`x`标签的元素

详情见 [选择器](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Getting_started/Selectors)

## `css sprite`是什么以及相关优缺点
`css sprite`将多个小图片拼接在一个图片中，通过`background-position`进行定位选择其中的某个图片

- 优点
  - 减少`HTTP`请求，提高页面加载速度
  - 增加图片信息重复度，提高压缩比，减少图片大小

- 缺点
  - 图片合并麻烦
  - 维护麻烦，修改一个图片可能需要重新布局等等

## `display:none`与`visibility:hidden`的区别
- 相同点：都使其元素不可见
- 不同点：
  - 是否占据渲染树位置
    - `display: none`会让元素从渲染树中消失，渲染的时候不占据任何空间
    - `visibility: hidden`不会让元素从渲染树中消失，渲染的时候会占据空间，只是内容不可见
  - 是否可继承
    - `display: none`不可继承，子孙节点消失是由于元素从渲染树中消失
    - `visibility: hidden`可继承，子孙节点消失时由于继承了`hidden`，通过设置`visibility`可使其显示
  - 对文档的影响
    - `display: none`会造成文档回流
    - `visibility: hidden`只会造成元素重绘
  - 读屏器不会读取`display: none`元素的内容，会读取`visibility: hidden`中的内容

## `css hack`原理以及常用`hack`
原理：利用不同浏览器对`css`的支持和解析结果不一致，编写针对特定浏览器的样式。常见有属性`hack`，选择器`hack`，`IE`条件注释

- `IE`条件注释，适用于`IE5`至`IE9`
  ```
  <!--[if IE 6]>
  special instructions for IE6 here
  <![endif]-->
  ```
- 选择器`hack`，不同浏览器对选择器的支持不一样
  ```
  /***** Selector Hacks ******/

  /* IE6 and below */
  * html #uno  { color: red }

  /* IE7 */
  *:first-child+html #dos { color: red }

  /* IE7, FF, Saf, Opera  */
  html>body #tres { color: red }

  /* IE8, FF, Saf, Opera (Everything but IE 6,7) */
  html>/**/body #cuatro { color: red }

  /* Opera 9.27 and below, safari 2 */
  html:first-child #cinco { color: red }

  /* Safari 2-3 */
  html[xmlns*=""] body:last-child #seis { color: red }

  /* safari 3+, chrome 1+, opera9+, ff 3.5+ */
  body:nth-of-type(1) #siete { color: red }

  /* safari 3+, chrome 1+, opera9+, ff 3.5+ */
  body:first-of-type #ocho {  color: red }

  /* saf3+, chrome1+ */
  @media screen and (-webkit-min-device-pixel-ratio:0) {
  #diez  { color: red  }
  }

  /* iPhone / mobile webkit */
  @media screen and (max-device-width: 480px) {
  #veintiseis { color: red  }
  }

  /* Safari 2 - 3.1 */
  html[xmlns*=""]:root #trece  { color: red  }

  /* Safari 2 - 3.1, Opera 9.25 */
  *|html[xmlns*=""] #catorce { color: red  }

  /* Everything but IE6-8 */
  :root *> #quince { color: red  }

  /* IE7 */
  *+html #dieciocho {  color: red }

  /* Firefox only. 1+ */
  #veinticuatro,  x:-moz-any-link  { color: red }

  /* Firefox 3.0+ */
  #veinticinco,  x:-moz-any-link, x:default  { color: red  }
  ```
- 属性`hack`: 不同浏览器解析`bug`或方法
  ```
  /* IE6 */
  #once { _color: blue }

  /* IE6, IE7 */
  #doce { *color: blue; /* or #color: blue */ }

  /* Everything but IE6 */
  #diecisiete { color/**/: blue }

  /* IE6, IE7, IE8 */
  #diecinueve { color: blue\9; }

  /* IE7, IE8 */
  #veinte { color/*\**/: blue\9; }

  /* IE6, IE7 -- acts as an !important */
  #veintesiete { color: blue !ie; } /* string after ! can be anything */
  ```

## `specified value, computed value, used value`计算方法
- `specified value` 计算方法
  - 如果样式表设置了一个值，则使用这个值
  - 如果没有设置值，这个属性是继承属性，那么从父元素上继承
  - 如果没有设置并且不是继承属性，那么使用`css`规范定义的初始值
- `computed value`
  - 以`specified value`根据规范定义的行为进行计算，通常将相对值计算为绝对值。例如，`em`根据`font-size`进行计算等等
- `used value`属性计算后的最终值，对于大多数属性可以通过`window.getComputedStyle()`方法获得，尺寸值单位为像素

详情见[Specified value](https://developer.mozilla.org/en-US/docs/Web/CSS/specified_value)

## `link`与`@import`的区别
- `link`是`html`引入方式，`@import`是`css`引入方式
- `link`最大限度支持并行下载，`@import`嵌套为串行下载
- `link`可以通过`rel="alternate stylesheet"`指定候选样式
- `@import`必须在样式规则之前，可以在`css`文件中引用其他文件
- `link`优于`@import`

## `display: block`与`display: inline`的区别
- `Inline elements`:
  - `respect left & right margins and padding, but not top & bottom`
  - `cannot have a width and height set`
  - `allow other elements to sit to their left and right.`
  - `see very important side notes on this here.`
- `Block elements`:
  - `respect all of those`
  - `force a line break after the block element`
  - `acquires full-width if width not defined`
- `Inline-block elements`:
  -`allow other elements to sit to their left and right`
  -`respect top & bottom margins and padding`
  -`respect height and width`

## `css`可继承属性
- 与文字有关的属性
  - `font`
  - `word-break`
  - `letter-spacing`
  - `text-align`
  - `text-rendering`
  - `word-spacing`
  - `white-space`
  - `text-indent`
  - `text-transform`
  - `text-shadow`
- `line-height`
- `color`
- `visibility`
- `cursor`

## 块格式化上下文
块格式化上下文(`Block Formatting Context`, `BFC`)是`Web`页面的可视化`css`渲染的一部分，块格式化上下文会包含创建它的元素内部的所有内容

下面的方式会创建块格式化上下文：
- 根元素或者包含根元素的元素
- 浮动元素（元素的`float`不为`none`）
- 绝对定位元素（元素的`position`为`absolute`或`fixed`）
- 行内块元素（元素的`display`为`inline-block`）
- 表格单元格（元素的`display`为`table-cell`， `HTML`表格单元格默认为该值）
- 表格标题（元素的`display`为`table-caption`, `  HTML`表格标题默认为该值）
- `overflow`值不为`visible`的块元素
- `display`值为`flow-root`的元素
- `contain`值为`layout`、`content`或`strict`的元素
- 弹性元素（`display`为`flex`或`inline-flex`元素的直接子元素）
- 网格元素（`display`为`grid`或`line-grid`元素的直接子元素）
- 多列容器（元素的`column-count`或`column-width`不为`auto`, 包括`column-count`为`1`）

浮动不会影响其他`BFC`中元素的布局，而清除浮动只能清除同一个`BFC`中在它前面的元素的浮动。外边距折叠(`margin collapsing`)也只会发生在属于同一个`BFC`的块级元素之间

### 清除浮动
```html
<div class="box">
    <div class="float">this is a float box
    </div>
    <p>i am content inside the container</p>
</div>
```
```css
.box {
    background: rgb(224, 206, 247);
    border: 5px solid rebeccapurple;
    overflow: auto;
    /*display: inline-block;*/
    /*float: left;*/
}
.float {
    float: left;
    width: 40px;
    height: 200px;
    background: aliceblue;
    border: 1px solid black;
    margin-right: 20px;
}
```
在上面的实例中，浮动元素的高度高于容器内容的高度，容器没有包含浮动元素，为容器添加`float: left`或者`display: inline-block`将其设置`BFC`, 那么就可以包裹内部的所有元素，也就可以包裹浮动元素，容器的高度也与浮动元素相同

### 外边距塌陷
一个`BFC`中相邻的两个元素之间的外边距会发生塌陷，可以通过创建新的`BFC`来避免
```html
<div class="container">
    <p>Sibling 1</p>
    <p>Sibling 2</p>
</div>
```
```css
.container {
    background-color: red;
    overflow: hidden;
}
p {
    background-color: lightgreen;
    margin: 10px 0;
}
```
上面可以看到在`Sibling 1`跟`Sibling 2`之间的边距为`10`, 不折叠应该为`20`, 为了避免发生边距折叠，可以在外层添加`BFC`
```html
<div class="container">
    <p>Sibling 1</p>
    <div class="bfc-container">
        <p>Sibling 2</p>
    </div>
</div>
```
```css
.container {
    background-color: red;
    overflow: hidden;
}
p {
    background-color: lightgreen;
    margin: 10px 0;
}
.bfc-container {
    overflow: hidden;
}
```
修改为上面以后，可以看到`Sibling 1`与`Sibling 2`之间的间距变为了`20`

### `BFC`阻止内容环绕浮动元素
```html
<div class="outer">
    <div class="float">i am a float element</div>
    <div class="text">i am a text</div>
</div>
```
```css
.float {
    float: left;
    width: 40px;
    height: 200px;
    background: aliceblue;
    border: 1px solid black;
    margin-right: 20px;
}
.outer {
    background-color: #ccc;
    overflow: auto;
}
```
上面的实例中浮动元素会遮挡`text`的背景，但是不会遮挡其内容，为上面的`text`添加`overflow: hidden;`将其变为`BFC`, 两个`BFC`之间互相隔离，互不影响

### 创建`BFC`
一般使用`float: left`或者`overflow: auto`来设置`BFC`, 会产生副作用。可以使用一个新的`display`属性的值，它可以创建无副作用的`BFC`。在父级块中使用`display: flow-root`可以创建新的`BFC`

详情见[块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

## 清除浮动
- 容器元素闭合标签前添加额外元素并设置`clear: both`
- 父元素触发块级格式化上下文(`overflow: auto`)
- 设置容器元素的伪元素进行清理
```css
/* 1 content: ''用于修复opera下文档中出现contenteditable属性时在清理浮动元素上下的空白 */
/* 2 使用display: table而不是block可以防止容器与子元素top-margin折叠 */
.clearfix:before,
.clearfix:after {
  content: ''; /* 1 */
  display: table; /* 1 */
}
.clearfix:after {
  clear: both;
}
/* IE 6/7下使用 */
.clearfix {
  *zoom: 1;
}
```

## 什么是`FOUC`?如何避免
`FOUC`(`Flash Of Unstyled Content`)：用户定义样式表加载之前浏览器使用默认样式显示文档，用户样式加载渲染之后再重新显示文档，造成页面闪烁
解决办法：将样式表放在`head`标签中

## 使用`css`画箭头
```html
<div class="arrow"></div>
<div class="triangle"></div>
```
```css
.arrow {
    width: 14px;
    height: 14px;
    border-top: 1px solid;
    border-right: 1px solid;
    transform: rotate(45deg);
    position: relative;
}
.arrow::after {
    content: '';
    height: 25px;
    width: 1px;
    background: black;
    position: absolute;
    top: -4px;
    left: 5px;
    transform: rotate(45deg);
}
.triangle {
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-left-color: red;
}

```