# Flex布局

## `flex`容器

- `display: flex` — 容器内元素自动变为`flex`成员
- 设置`flex`属性后，子元素的`float`，`clear`，`vertical-align`都将失效
- 属性
  - `flex-direction`	
    - 主轴排列方向
    - `row(default)` | `row-reverse` | `column` | `colum-reverse`
  - `flex-wrap`
    - 排列换行方式
    - `nowrap(default)`  | `wrap` | `wrap-reverse`
  - `flex-flow`
    - `<flex-direction>` || `<flex-warp>` 简写
    - `row nowrap(default)`
  - `justify-content`
    - 主轴对其方式
    - `flex-start(default)` | `flex-end` | `center` | `space-between` | `space-around`
  - `align-items`
    - 交叉轴对齐方式
    - `flex-start ` | `flex-end` | `center` | `baseline` | `stretch(default)`
  - `align-content`
    - 多根交叉轴对齐方式
    - `flex-start` | `flex-end` | `center` | `space-between` | `space-around` | `stretch(default)`

## `flex`成员

- `order`
  - `flex`成员排列顺序
  - 值越小越靠前，默认为0
- `flex-grow`
  - `flex`成员放大比例
  - 默认为0，即存在剩余空间也不放大
  - 若所有的项目的`flex-grow`属性都为`1`，则它们将等分剩余空间。如果有一个项目的`flex-grow`属性为`2`，其他项目都为`1`，则前者所占据的剩余空间将比后者多一倍
- `flex-shrink`
  - `flex`成员缩小比例
  - 默认为1，即容器空间不足，项目会自动缩小
  - 若所有的项目`flex-shrink`属性都为`1`，则它们会等比例缩小。如果有一个项目的`flex-shrink`属性为`0`，其他为`1`，则空间不足时，前者不缩小
- `flex-basis`
  - `flex`成员在分配多余空间之前，所占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间(设置该值后会覆盖元素上的 `width`或者`height`的值)
  - 默认为`auto`
- `flex`
  - `<flex-grow>` || `<flex-shrink>` || `<flex-basis>` 简写
  - 默认值 `0 1 auto`
  - `auto` -- `1 1 auto`
  - `none` -- `0 0 auto`
  - `1` -- `1 1 0%`
  - `0%` -- `1 1 0%`
  - 值为非负数字，则该数字为`flex-grow`的值，其`flex-shrink`为`1`，`flex-basis`为`0%`
  - 值为长度或百分比，则改数字为`flex-basis`的值，其`flex-grow`为`1`，`flex-shrink`为`1`
  - 值为两个非负数字，则分别为`flex-grow`，`flex-shrink`的值，其`flex-basis`为`0%`
  - 后面的`flex`属性会覆盖前面的`flex`属性
- `align-self`
  - 允许单个项目与其他项目不一致的对齐方式，可覆盖`align-item`属性
  - 默认值为`auto`