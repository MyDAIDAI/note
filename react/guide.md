# `react`入门学习

闲来无事，又不想看理论知识，那你动手学习下`react`吧

## `install`

1. 首先安装`react`的架构工具`create-react-app` : `npm install -g create-react-app`
2. 使用架构工具生成`react`项目：`create-react-app my-first-react-app`

完成上面两个步骤就基本完成了一个`react`项目的初始化，如果在使用`create-react-app`创建`react`应用出现了卡住不动的情况时，请配置`npm`源，`npm config set registry https://registry.npm.taobao.org`

## 认识项目结构

项目安装完成之后，打开文件夹，可以一个初始的`react`项目结构：

```javascript

```

上面中的`manifest.json`指定了开始页面`index.html`，这个是代码执行的源头。

## 元素渲染

在`react`中，元素是构成其应用的最小单位，与浏览器的`DOM`元素不同的是，`react`中的元素是一个普通的对象，这个对象将`DOM`中相应的属性值进行了保存，`ReactDOM`可以确保浏览器`DOM`与`React`元素保持一致。

在`index.js`文件中，将`import App from './App'`注释掉，然后添加下面代码：

```javascript

```

打开浏览器页面，可以看到`element`被渲染在浏览器中。

#### 更新元素渲染

在`react`中，元素是不可变的，当元素被创建之后，无法改变其内容或者属性值，更新界面的唯一办法就是创建一个新的元素，然后将其传入`ReactDOM.render()`方法中

```javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>现在是 {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('example')
  );
}
 
setInterval(tick, 1000);
```

上面的代码每一秒执行一次`tick`函数，每次执行`tick`函数，都会重新创建`element`，并且调用`ReactDOM.render()`，将页面元素进行封装：

```javascript

```

除了使用函数以外，还可以使用`React.component`来进行封装

```javascript
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>现在是{this.props.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}

function tick () {
  ReactDOM.render(
    <Clock date={new Date()}></Clock>, 
    document.getElementById('root'));
}
setInterval(tick, 1000)
```

需要注意的是，为了避免大量的操作`DOM`，`react`使用了虚拟`DOM`以及`diff`算法，在渲染的时候只会更新改变了的部分。

## `React JSX`

`react`使用了`jsx`来代替常规的`javaScript`，可以不使用`jsx`，但是`jsx`有许多的优点：

1. 执行更快，在编译为`javaScript`后代码进行了优化
2. 类型安全，在编译的时候可以发现错误
3. 编写模板更加的简单快速

```javascript
const element = <h1>hello, world</h1> // jsx
```

`jsx`是用来声明`react`当中的元素，与浏览器的`DOM`不同的是，在`react`中的元素只是一个普通的对象，`React DOM`可以确保浏览器`DOM`的数据内容与`react`的元素保持一致。

将`react`中元素渲染到页面中，需要使用`ReactDOM.render()`方法

```javascript
ReactDOM.render(element, document.getElementById('root'))
```

## `React`组件

```javascript
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>现在是{this.props.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}
ReactDOM.render(
    <Clock date={new Date()}></Clock>, 
	document.getElementById('root'));
```

#### 复合组件

```javascript
class Name extends Component {
  render() {
    return (
      <h1>网站名称：{this.props.name}</h1>
    );
  }
}
class Nickname extends Component {
  render() {
    return (
      <h1>网站小名: {this.props.nickname}</h1>
    );
  }
}
class Url extends Component {
  render() {
    return (
      <h1>网址地址: {this.props.url}</h1>
    );
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Name name="菜鸟教程"></Name>
        <Url url="http: //www.runoob.com"></Url>
        <Nickname nickname="小明"></Nickname>
      </div>
    );
  }
}
ReactDOM.render(<App></App>, document.getElementById('root'))
```

## `React State`

`react`把组件看作是一个状态机。通过与用户的交互，实现不同的状态，然后渲染`UI`，让用户界面与数据保持一致。只需要更新组件的`state`，然后`react`会根据`state`中的值重新渲染页面，而不需要操作`DOM`

```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props)
    // 设置 state 状态值
    this.state = {
      date: new Date()
    }
  }
  // Clock 组件挂载在 DOM 元素上时，生命钩子
  componentDidMount () {
    this.timerID = setInterval(() => {
      this.tick()
    }, 1000)
  }
  // Clock 组件从 DOM 移除时，生命钩子
  componentWillUnmount () {
    clearInterval(this.timerID)
  }
  tick () {
    // 改变 state 中的值
    this.setState({
      date: new Date()
    })
  }
  render() {
    return (
      <div>
         <h2>现在是{this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}
ReactDOM.render(<Clock></Clock>, document.getElementById('root'))
```

### 数据自顶向下流动

父组件或者子组件都不能知道某个组件是有状态还是无状态的，并且它们并不关心某个组件是被定义为一个函数还是一个类。除了拥有并设置它的组件外，其他组件不可访问。父组件可以通过`props`给子组件传入值

```javascript
// 子组件
class FormattedDate extends React.Component {
  render() {
    return (
      <h2>现在是{this.props.date.toLocaleTimeString()}</h2>
    )
  }
}
// 父组件
class Clock extends React.Component {
  constructor(props) {
    super(props)
    // 设置 state 状态值
    this.state = {
      date: new Date()
    }
  }
  componentDidMount () {
    this.timerID = setInterval(() => {
      this.tick()
    }, 1000)
  }
  componentWillUnmount () {
    clearInterval(this.timerID)
  }
  tick () {
    // 改变 state 中的值
    this.setState({
      date: new Date()
    })
  }
  // 父组件通过 props 为子组件传参
  render() {
    return (
      <div>
        <FormattedDate date={this.state.date}></FormattedDate>
      </div>
    )
  }
}
ReactDOM.render(<Clock></Clock>, document.getElementById('root'))
```

