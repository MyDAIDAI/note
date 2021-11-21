# 第一部分 基础知识

## 动态类型语言和鸭子类型

编程语言按照数据类型可以分为：

- 静态类型语言：在编译时已确定变量的类型。
  - 优点：
    - 在编译时就能发现类型不匹配的错误
    - 编译器提前找到有可能发现的错误
    - 若在程序中明确地规定了数据类型，编译器还可以针对这些信息对程序进行优化，提高程序执行速度
  - 缺点：
    - 程序员需要按照契约来编写程序，为每个变量规定数据类型
    - 类型的声明会增加更多的代码
- 动态类型语言：程序运行时，待变量被赋予某个值之后，才会具有某种类型。
  - 优点：代码量少，简洁
  - 缺点：无法保证变量的类型，在程序的运行期间可能发生跟类型相关的错误

在`JavaScript`中，当我们对变量赋值时，不需要考虑其类型，则是一门**动态类型语言**

**鸭子类型**: 如果它走起路来像鸭子，叫起来也是鸭子，那么它就是鸭子。
利用鸭子类型的思绪，我们不必借助超类型的帮助，就能轻松地在动态类型语言中实现一个原则：面向接口编程，而不是面向实现编程

## 多态

多态的含义：同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果。也就是说，给不同的对象发送同一个消息的时候，会产生不同的反馈

多态背后的思想是将“做什么”和“谁去做以及怎样去做”分离开来，也就是将“不变的事物”与“可能改变的事物”分离开来

```js
// 多态：同一个操作作用于不同的对象上面，产生不同的解释和不同的执行结果
// 鸡与鸭同时发出叫唤动作，但是叫唤内容不变
const makeSound = (animal) => {
  if (animal instanceof Duck) {
    console.log("嘎嘎嘎！");
  } else if (animal instanceof Chicken) {
    console.log("咯咯咯!");
  }
};

const Duck = function () {};
const Chicken = function () {};

makeSound(new Duck());
makeSound(new Chicken());

// 上面的代码实现了多态，但是如果需要添加新的类型，需要修改makeSound代码，很不友好
// 将“做什么”和“谁去做以及怎样去做”分离开来，也就是将“不变的事物”与“可能改变的事物”分离开来

const makeSound1 = (animal) => {
  animal.sound(); // "做什么" -> 不变的事物
};

const Duck1 = function () {};
const Chicken1 = function () {};

Duck1.prototype.sound = function () {
  console.log("嘎嘎嘎1！");
};

Chicken1.prototype.sound = function () {
  console.log("咯咯咯1！");
};

makeSound1(new Duck1());
makeSound1(new Chicken1());

// 扩展上面的类型，只需要扩展外部功能，不需要修改makeSound1函数

const Dog1 = function () {};
Dog1.prototype.sound = function () {
  console.log("汪汪汪1！");
};

makeSound1(new Dog1());
```
