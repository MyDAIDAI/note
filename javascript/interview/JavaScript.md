# 面试题之`JavaScript`

## 原始类型有哪几种？`null`是对象吗？原始数据类型和复杂数据类型存储有什么区别？
- 原始类型有6中，`Number`, `String`, `Boolean`, `undefined`, `null`, `symbol`(`ES6`新增)
- `typeof null === 'object'`, 但是`null`不是对象，而是基本数据类型的一种
- 原始数据类型存储在桟类型中，存储的是值
- 复杂数据类型的地址存储在桟内存，指向存储在堆内存中的值。当传递复杂数据类型时，传递的是桟内存中的地址，其指向同一块内存空间.

## `typeof`是否能够正确判断类型？`instanceof`?`instanceof`的实现原理是什么？
- `typeof`能够正确判断基本数据类型，除了`type null === 'object'之外`
- 对于复杂数据类型，`typeof`只能判断`function`与`object`，不能进行其他类型的判断
- `instanceof`可以准确判断复杂数据类型，但是不能正确判断基本数据类型
- `instanceof`是通过原型链进行判断的，跟着原型链依次向上查找，直到查找到最顶层
```javascript
L instanceof R

function instance_if (L, R) {
  let O = R.prototype // 获取构造函数的原型对象
  L = L.__proto__ // 获取实例的隐式原型
  while (true) {
    if (L === null) {
      return false
    }
    if (L === O) {
      return true
    }
    L = L.__proto__
  }
}
```

## `for of`、`for in`和`forEach`、`map`的区别
|   | 可使用 | 是否可中断 |
| ------ | ------ | ------ |
| `for of` | 具有`iterator`接口(数组，类数组对象，`Set`，`Map`，`Generator`对象，字符串) | 可以中断循环 |
| `for in` | 遍历对象自身的和可继承的可枚举属性 | 可以中断 |
| `forEach` | 只能遍历数组 | 不能中断 |
| `map` | 只能遍历数组 | 不能中断 |

`Object.keys()`返回给定对象自身可枚举的属性的字符串数组

## 如何判断一个变量是不是数组
- `Array.isArray`, 返回`true`, 则说明是数组
- `instanceof Array`, 返回`true`, 则说明是数组
- `Object.prototype.toString.call()`, 返回值为`[object Array]`
- 通过`constructor`判断，如果是数组，`arr.constructor === Array`(不准确，因为可以指定一个对象的构造函数为`Array`)

## 类数组和数组的区别是什么
- 类数组
  - 拥有`length`属性，其他属性