# 快速响应的用户界面

大多数浏览器让一个单线程共用与执行`javaScript`代码和更新用户界面。每个时刻只能执行其中一种操作，这意味着当`javaScript`代码正在执行时用户界面无法响应。所以管理好`javaScript`的运行时间对`web`应用的性能非常重要

## 浏览器的ui线程
用于执行`javaScript`和更新用户界面的进程通常被称为“浏览器UI线程”。UI线程的工作基于一个简单的队列系统，任务会被保存到**队列**中直到进程空闲，一旦空闲，队列中的下一个任务就被重新提取出来并运行

#### 浏览器限制
浏览器限制了`javaScript`任务的运行时间，这种限制是有必要的，它确保某些恶意代码不能通过永不停止的密集操作锁住用户的浏览器或计算机。此类限制有以下两种
- 调用栈大小限制
- 长时间运行限制

单个`javaScipt`操作花费的总时间（最大值）不应该超过200毫秒

### 使用定时器让出时间判断
有时难免会有一些复杂的`js`任务不能在100ms或更短的时间内完成，这个时候，最理想的办法就是让出UI线程的控制权，使得UI可以更新。让出控制权意味着停止执行`js`，使UI线程有机会更新，然后再继续执行`js`

## 定时器
在`js`中可以使用`setTimeout`和`setInterval`来创建定时器，定时器与`UI`线程的交互方法有助于把允许耗时较长的脚本拆分为较短的片段，调用定时器会告诉`javaScript`引擎先**等待**一段时间，然后添加一个`javaScript`任务到`UI`队列

```javaScript
function greeting() {
  alert('hello world')
}
setTimeout(greeting, 250)
```
上面这段代码将在250毫秒之后将`greeting`函数插入到UI队列中。

> 注意，第二个参数表示任务何时被添加到UI队列中，而不是一定会在这段时间后执行；这个任务会等待队列中其他所有任务执行完毕才会执行

提示： `setInterval`函数和`setTimeout`几乎相同，除了前者会重复添加`js`任务到`ui`队列，它们最主要的区别是，如果UI队列中已经存在由同一个`setInterval`创建的任务，那么后续任务不会被添加到UI队列中

### 定时器的精度
`javaScript`定时器延迟通常不太准确，相差大约几毫秒，指定定时器延时250毫秒，并不意味着任务一定会在`setTimeout`调用之后过250毫秒时精确地加入队列。所有浏览器都试图尽可能准确，但都会发生偏移。正因如此，定时器不可用于测试实际时间

设置定时器延时小于15将会导致IE锁定，所以延迟的最小值建议为25毫秒，以确保至少有15毫秒延迟。因为再小的延迟，对大多数UI更新来说不够用

定时器延时的最小值有助于避免在其他浏览器和其他操作系统中的定时器出现分辨率问题。大多数浏览器在在定时器延时等于或小于10毫秒时表现不太一致


### 使用定时器处理数组
常见的一种造成长时间运行脚本的起因就是耗时过长的循环，使用定时器可以把循环的工作分解到一系列的定时器中，比如：
```javaScript
for (var i = 0, len = items.length; i < len; i++>) {
  process(items[i])
}
```
上面这段代码运行时间过长的原因主要是`process()`的复杂度以及`items`的大小，是否可以用定时器取代循环的两个决定性因素：
- 处理过程是否必须同步
- 数据是否必须按顺序处理
如果上面两个的答案都是“否”，那么代码将适用于定时器分解任务，上面的实例代码可以进行如下分解

```javaScript
var todo = items.concat()
setTimeout(function() {
  process(todo.shift())
  if (todo.length > 0) {
    setTimeout(arguments.callee, 25)
  } else {
    callback(items)
  }
}, 25)
```
可以将上面的功能进行跟进一步的封装
```javaScript
function processArray(items, process, callback) {
  let todo = items.concat()
  setTimeout(function () {
    process(todo.shift())
    if (todo.length > 0) {
      setTimoue(arguments.callee, 25)
    } else {
      callback(items)
    }
  }, 25)
}
```
使用定时器处理数组的副作用是处理数组的总时长增加了。这是因为在每一个条目处理完成后UI线程会空闲出来，并且在下一条目开始处理之前会有一段时间的延时。尽管如此，为避免浏览器锁定，这种取舍是必要的

#### 分割任务
通常会把一个任务分解成一系列的子任务。如果一个函数运行时间太长，那么检查一下是否可以把它拆分成功一系列能在较短时间内完成的子函数。可以使用上面处理数组的方法来处理任务
```javaScript
function saveDocument(id) {
  // 保存文档
  openDocument(id)
  writeText(id)
  closeDocument(id)
  // 更新UI
  updateUI(id)
}
// 将上面的任务进行分割
function saveDocuemnt(id) {
  let tasks = [openDocument, writeText, closeDocument, updateUI]
  setTimeout(function() {
    let task = tasks.shift()
    task(id)
    if (tasks.length > 0) {
      setTimeout(arguments.calleem 25)
    }
  }, 25)
}
```