# 盒模型以及相关样式
## 盒模型
### 介绍
css的盒模型有两种，一种是w3c盒模型，一种是IE盒模型，以下分别介绍：
1. w3c盒模型
![](media/15107521807234/15107527066244.jpg)
在标准的盒模型中:
    `width = contentWidth`
    `height = contentHeight`
    `totalWidth = width + leftPadding + rightPadding + leftBorder + rightBorder + leftMargin + rightMargin`
    `totalHeight = height + upPadding + downPadding + upBorder + downBorder + upMargin + downMargin`
2. IE盒模型
![](media/15107521807234/15107530715779.jpg)
在IE盒模型中:
`width = contentWidth + leftPadding + rightPadding + leftBorder + rightBorder `
`height = contentHeight + upPadding + downPadding + upBorder + downBorder`
`totalWight = width + leftMargin + rightMargin`
`totalHeight = height + upMargin + downMargin`

标准盒模型被称为`content-box`,IE盒模型被称为`border-box`，使用哪种盒模型可以通过`box-sizing`这个属性进行指定，在没有使用`box-sizing`这个情况下，默认使用`content-box`
### 实例

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>css测试</title>
    <style>
      div {
        width: 300px;
        border: 30px solid #ffaa00;
        padding: 30px;
        background-color: #ffff00;
        margin: 20 auto;
      }
      div#div1 {
        box-sizing: content-box
      }
      div#div2 {
        box-sizing: border-box
      }
    </style>
  </head>
  <body>
    <div id="div1">示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范</div>
    <hr>
    <div id="div2">示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范</div>
  </body>
</html>
```
`div1`的采用标准盒模型，运行结果如下：
![](media/15107521807234/15107542926806.jpg)
从上图可以看出，`contentWidth = width = 300px`

`div2`采用的是IE盒模型，结果如下：
![](media/15107521807234/15107543954425.jpg)
内容宽度:`contentWidth = width - leftPadding - rightPadding - leftBorder - rightBorder = 300 - 30 - 30 - 30 - 30 = 180px`

注意：在火狐浏览器中还可以将`border-sizing`的属性值设为`padding-box`，即：
`width = contentWidth + leftPadding + rightPadding`

### 为什么要使用`border-sizing`属性
使用该属性可以对元素的总体宽度做一个控制，如果不使用该属性，样式中就会默认使用`content-box`属性值，它只对内容的宽度做了指定，但是没有指定盒模型的总宽度。在有些情况下使用`border-box`属性值会更加方便
比如：将两个`div`元素进行均分且并排显示，将其设为`border-box`,`width: 50%`即可


```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>css测试</title>
    <style>
      div {
        width: 50%;
        border: 30px solid #ffaa00;
        padding: 30px;
        background-color: #ffff00;
        margin: 20 auto;
        box-sizing: border-box;
        /* 浮动，实现并排显示 */
        float: left
      }
    </style>
  </head>
  <body>
    <div id="div1">示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范</div>
    <div id="div2">示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范示范</div>
  </body>
</html>
```
![](media/15107521807234/15107550050807.jpg)

## 盒的类型
在`css`中使用`display`来定义盒的类型，
1. `block`
2. `inline`
3. `inline-block`
4. `inline-table`
5. `list-item`
6. `run-in`
7. `compact`
8. 表格相关类型
9. `none`


