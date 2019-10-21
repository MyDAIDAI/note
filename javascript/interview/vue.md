# 面试题之`Vue`

## `data`为什么是个函数而不是一个对象
当一个组件被定义的时候，`data`必须声明为返回一个对象的函数，因为组件可能被用来创建多个实例，如果`data`为一个纯粹的对象，那么所有的实例将会共享引用同一个数据对象！通过提供`data`函数，每次创建一个新实例后，能够调用`data`函数，从而返回初始数据的一个全新副本数据对象

## 谈谈对`MVVM`开发模式的理解
`MVVM`分为`Model`、`View`与`ViewModel`
- `Model`为数据模型
- `View`为视图模型
- `ViewModel`会监听`Model`中的数据并且更新`View`中的视图。`Model`与`View`并无直接的联系，而是使用`ViewModel`来进行联系.当`Model`中的数据改变时会触发`View`进行改变，`View`中的数据修改也会在`Model`中进行修改

## 简述`Vue`的响应式原理
当一个`vue`实例创建的时候，`vue`会遍历`data`对象中的属性，使用`Object.defineProperty()`中的`getter`与`setter`方法在内部建立依赖追踪，在属性被访问或者修改时通知变化。每个组件实例都有相应的`watcher`程序实例，它会在组件渲染过程中把属性记录为依赖，之后当依赖项的`setter`被调用时，会通知`watcher`重新计算，从而使其关联的组件得以更新

## `computed vs watch vs`方法
  ```
  div id="example">
    <p>Original message: "{{ message }}"</p>
    <p>Computed reversed message: "{{ reversedMessage }}"</p>
  </div>

  var vm = new Vue({
    el: '#example',
    data: {
      message: 'Hello'
    },
    computed: {
      // 计算属性的 getter
      reversedMessage: function () {
        // `this` 指向 vm 实例
        return this.message.split('').reverse().join('')
      }
    },
    // 在组件中
    methods: {
      reversedMessage: function () {
        return this.message.split('').reverse().join('')
      }
    }
  })
  ```
`computed`中的值依赖于`data`，它的结果会被缓存，除非依赖的响应式属性变化才会重新计算。如果某个依赖在该实例范畴之外，则计算属性***不会***被更新
- `computed vs` 方法：`computed`只有当依赖中的值发生改变时才会重新计算，而方法每次都会重新计算
- `computed vs watch`: 当需要在数据变化时执行异步或者开销较大的操作时，`watch`的方式最有用

## `vue`中给`data`中的对象属性添加一个新的属性时会发生什么，如何解决
为`data`中的对象属性或者数组属性添加值值，会发现虽然值被更新，但是视图并未刷新，这是由于`vue`无法探测普通的新增属性，需要使用`$set`方法