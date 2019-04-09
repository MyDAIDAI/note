# 前端面试题之`HTML`

## `<img>`中的`title`与`alt`有什么区别
- `title`是`gloabl attributes`之一，用于为元素提供附加的`advisory information`。当鼠标滑动到元素上时显示
- `alt`为`<img>`的特有属性，是图片的等价描述。当图片无法加载时显示，可提高图片的可访问性。除了纯装饰的图片之外都需要设置有意义的值，搜索引擎会进行分析

## `doctype`是什么，举例常见的`doctype`以及特点
- `<!doctype>`声明必须处于`html`文档的头部，用在`<html>`标签之前，在`HTML5`中不区分大小写
- `<!doctype>`声明不是`HTML`标签，是一个用于告诉浏览器当前`html`版本的指令
- 浏览器引擎通过检测`doctype`来判断使用兼容模式还是标准模式对文档树进行渲染
- 在`HTML 4.01`中`<!doctype>`声明指向一个`DTD`，由于`HTML 4.01`基于`SGML`，所以`DTD`指定了标记规则以保障浏览器正确渲染内容
- `HTML5`不基于`SGML`，所以不用指定`DTD`

#### 常见的`DOCTYPE`声明
- `HTML5`: `<!DOCTYPE html>`
- `HTML 4.01 Strict`: 
  - 该`DTD`包含所有的`HTML`元素和属性，但是不包括展示性的和弃用的袁术，不允许框架集
  - `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">`
- `HTML 4.01 Transitional`:
  - 该 `DTD` 包含所有 `HTML` 元素和属性，包括展示性的和弃用的元素（比如 `font`）。不允许框架集（`Framesets`）
- `HTML 4.01 Frameset`:
  - 该 `DTD` 等同于 `HTML 4.01 Transitional`，但允许框架集内容
  - `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">`
- `XHTML 1.0 Strict`
  - 该 `DTD` 包含所有 `HTML` 元素和属性，但不包括展示性的和弃用的元素（比如 `font`）。不允许框架集（`Framesets`）。必须以格式正确的 `XML` 来编写标记。
  - `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">`
- `XHTML 1.0 Transitional`
  - 该 `DTD` 包含所有 `HTML` 元素和属性，包括展示性的和弃用的元素（比如 `font`）。不允许框架集（`Framesets`）。必须以格式正确的 `XML` 来编写标记。
  - `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`
- `XHTML 1.0 Frameset`
  - 该 `DTD` 等同于 `XHTML 1.0 Transitional`，但允许框架集内容。
  - `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">`
- `XHTML 1.1`
  - 该 `DTD` 等同于 `XHTML 1.0 Strict`，但允许添加模型（例如提供对东亚语系的 `ruby` 支持）
  - `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">`

[`HTML5/HTML 4.01/XHTML` 元素和有效的 `DTD`](http://www.w3school.com.cn/tags/html_ref_dtd.asp)

## `HTML`全局属性有哪些
全局属性是所有`HTML`所共有的属性，它们可以被用在所有的元素上，但是对一些元素来说可能是无效的

除了基本的`HTML`全局属性之外，下面的全局属性也是存在的：
- `xml:lang`,`xml:base`, 它们是被继承于`XHTML`标准，但是是被反对的，存在是为了向后兼容
- `aria-*`属性，用于提高可理解性，便于残疾人士浏览
- 事件处理属性：`onabort`、`onautocomplete`、`onautocompleteerror`、`onblur`、`oncancel`、`oncanplay`、`onchange`、`onclick`、`onclose`、`oncontextment`....
  
下面是`html`的全局属性
|  属性 | 描述 |
| ------ | ------ |
| `accessKey` | 设置访问元素的快捷键 |
| `class` | 规定元素的类名 |
| `contenteditable` | 规定是否可编辑元素的内容 |
| `contextment` | 指定一个元素的上下文菜单。当用户右击该元素时，出现上下文菜单 |
| `data-*` | 用于存储页面的自定义数据 |
| `dir` | 设置元素中内容的文本方向 |
| `draggable` | 指定某个元素是否可以拖动 |
| `dropzone` | 指定是否将数据复制，移动，链接或删除 |
| `hidden` | 规定对元素进行隐藏 |
| `id` | 规定对元素的唯一`id` |
| `lang` | 设置元素中内容的语言代码 |
| `spellcheck` | 检测元素拼写错误 |
| `style` | 规定元素的行内样式 |
| `tabindex` | 设置元素的`tab`键控制次序 |
| `title` | 规定元素的额外信息 |
| `translate` | 指定是否一个元素的值在页面载入时是否需要翻译 |

详情见[Global attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes)

## `web`语义化以及好处
`web`语义化是指通过`HTML`标记表示页面所包含的信息，`web`语义化包含了`HTML`标签的语义化以及`css`命名的语义化
- `HTML`标签语义化是指，通过使用包含语义的标签恰当的表示文档结构
- `CSS`语义化是指，为`HTML`标签添加有意义的`class`，`id`来补充未表达的语义

##### 为什么需要语义化
- 去掉样式后页面可以呈现清晰的结构
- 盲人使用读屏器可以更好的阅读
- 搜索引擎可以更好的理解页面，有利于收录
- 便于团队的运行以及维护
