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
