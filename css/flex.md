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

## `flex`布局最后一行左对齐
使用`css`的`flex`进行布局的时候，如果使用`justify-content`来控制列表的水平对齐方式，如果值为`space-between`，那么可以对每一行进行两队对齐，但是，如果最后一行的元素不能充满整行，就会出现对齐问题
```html
 <div class="flex-container">
      <div class="item item1">item1</div>
      <div class="item">item2</div>
      <div class="item">item</div>
      <div class="item">item</div>
      <div class="item">item</div>
      <div class="item">item</div>
      <div class="item">item</div>
      <div class="item">item</div>
      <div class="item">item</div>
      <div class="item">item</div>
      <div class="item">item</div>
  </div>
```
```css
.flex-container {
  height: 500px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  border: 1px solid red;
}
.item {
  width: 24%; height: 100px;
  background-color: skyblue;
  margin-top: 15px;
}
```


### 固定列数
如果一行的列数是固定的，那么有以下的方法解决这个问题
- 不使用`justify-content：space-between`这个属性，使用`margin`来进行模拟
```css
  .flex-container {
    /* justify-content: spa; */
  }
  /* 设置margin-right的值，最右边的不设置 */
  .item:not(:nth-child(4n)) {
    margin-right: calc(4% / 3);
  }
```
- 根据最后一行元素个数设置最后一个元素的`margin-right`值
```css
  .flex-container {
    justify-content: space-between;
  }
  .item:last-child:nth-child(4n - 1) {
    margin-right: calc(24% + 4% / 3);
  }
  .item:last-child:nth-child(4n - 2) {
    margin-right: calc(48% + 8% / 3);
  }
```

### 元素宽度不确定
内容元素的宽度不确定，那么每一行的列数就不确定，所以不能使用上面对于固定列数的办法
- 对最后一项设置`margin-right: auto`
```html
 <div class="flex-container">
      <div class="item item1" style="width: 200px;">item1</div>
      <div class="item" style="width: 300px;">item2</div>
      <div class="item" style="width: 100px;">item</div>
      <div class="item" style="width: 500px;">item</div>
      <div class="item" style="width: 50px;">item</div>
      <div class="item" style="width: 150px;">item</div>
      <div class="item" style="width: 200px;">item</div>
      <div class="item" style="width: 10px;">item</div>
      <div class="item" style="width: 70px;">item</div>
      <div class="item" style="width: 120px;">item</div>
      <div class="item" style="width: 180px;">item</div>
  </div>
```
```css
.item {
  height: 100px;
  background-color: skyblue;
  margin: 15px;
}
.item:last-child {
  margin-right: auto;
}
```
- 创建伪类元素并设置`flex: auto`或`flex: 1`，设置一个伪类填充容器剩余空间
```css
  .flex-container::after {
    content: '';
    flex: auto;
  }
```

### 列数不固定
列数不固定，使用足够的空白标签进行填充占位，具体的占位数量由最多列数的个数决定
```html
<div class="flex-container">
    <div class="item item1">item1</div>
    <div class="item"></div>
    <div class="item">item</div>
    <div class="item">item</div>
    <div class="item">item</div>
    <div class="item">item</div>
    <div class="item">item</div>
    <div class="item">item</div>
    <div class="item">item</div>
    <div class="item">item</div>
    <div class="item">item</div>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
</div>
```
```css
.flex-container > i {
  width: 200px;
  margin: 15px;
}
```

### 不能调整HTML
如果不能调整`html`，同时布局的列表个数又不固定，那个这个时候可以使用`grid`布局，缺点：会有兼容性问题
```css
.flex-container {
  height: 500px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, 200px);
  justify-content: space-between;
  border: 1px solid red;
}
.item {
  width: 200px;
  height: 100px;
  background-color: skyblue;
}
```

参考：[让CSS flex布局最后一行列表左对齐的N种方法](https://www.zhangxinxu.com/wordpress/2019/08/css-flex-last-align/)


