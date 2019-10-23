function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'end';
}
var hw = helloWorldGenerator()
console.log(hw.next()) // { value: 'hello', done: false }
console.log(hw.next()) // { value: 'world', done: false }
console.log(hw.next()) // { value: 'end', done: true }

// 一旦 next 方法返回对象的 done 属性为true, for...of 就会终止循环，且不包含该返回对象，所以上面没有返回 end 值
for (let value of helloWorldGenerator()) {
  console.log('value', value) // hello, world
}
function* f() {
  console.log('a')
}
// 只返回Iterator遍历器，不会执行函数，当调用遍历器的 next 函数时，才会开始执行
// 直到 yield 截止
var fn = f()
setTimeout(() => {
  fn.next()
}, 2000)

var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
  return 4;
};
console.log([...myIterable]) // [ 1, 2, 3 ]

function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  yield x + y + z;
}
// next()方法中传入的值，表示上一个 yield 表达式的返回值，所以第一次调用next函数时，传递参数无效
var fooFn = foo(5);
console.log(fooFn.next()) // { value: 6, done: false } x === 5
console.log(fooFn.next(6)) // { value: 4, done: false } y = 2 * 6 -> 12
console.log(fooFn.next(12)) // z = 12 -> x + y + z -> 29

// TODO: 如果想要第一次调用next方法就能够输入值，需要在Generator函数外面再包一层

