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
  
}
```