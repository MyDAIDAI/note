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
// console.log([...myIterabddle]) // [ 1, 2, 3 ]

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

// next()传入的参数会被作为被暂停的yield表达式的结果
// 通过yield和next()建立的双向消息传递
function* foo(x) {
  let y = x * (yield)
  return y
}
var it = foo(6)
console.log('foo it', it.next()) // { value: undefined, done: false }
console.log('foo it2', it.next(5)) // foo it2 { value: 30, done: true }

function* foo2(x) {
  let y = x * (yield 'start')
  let z = y * (yield 5)
  return z
}
var it1 = foo2(4)
console.log('foo2 it1', it1.next()) // foo2 it1 { value: 'start', done: false }
console.log('foo2 it2', it1.next((6))) //foo2 it2 { value: 5, done: false }
console.log('foo2 it3', it1.next(2)) // foo2 it3 { value: 48, done: true }

// 产生一系列的值，其中每个值都与前一个有特定的关系
// 1. 使用闭包
// 2. 使用生成器

// 闭包
var gimmeSomething = (function () {
  var nextVal;
  return function () {
    if (nextVal === undefined) {
      nextVal = 1
    } else {
      nextVal = (3 * nextVal) + 6
    }
    return nextVal
  }
})();
console.log('gimmeSomething', gimmeSomething())
console.log('gimmeSomething', gimmeSomething())
console.log('gimmeSomething', gimmeSomething())
console.log('gimmeSomething', gimmeSomething())

// 生成器
var gimmeSomethingGenerator = (function () {
  var nextVal;
  return {
    [Symbol.iterator]: function () {
      return this;
    },
    next: function () {
      if (nextVal ===  undefined) {
        nextVal = 1;
      } else {
        nextVal = (3 * nextVal) + 6
      }
      return {
        value: nextVal,
        done: false
      }
    }
  }
})();
console.log('gimmeSomethingGenerator', gimmeSomethingGenerator.next())
console.log('gimmeSomethingGenerator', gimmeSomethingGenerator.next())
console.log('gimmeSomethingGenerator', gimmeSomethingGenerator.next())
console.log('gimmeSomethingGenerator', gimmeSomethingGenerator.next())
// 由于添加了Symbol.iterator ，可以使用 for...of 进行遍历
for (var v of gimmeSomethingGenerator) {
  console.log('v', v)
  if (v > 500) {
    break
  }
}

function *someThingGen() {
  try {
    var nextVal;
    while (true) {
      if (nextVal === undefined) {
        nextVal = 1
      } else {
        nextVal = nextVal * 2
      }
      yield nextVal
    }
  }
  finally {
    console.log('clean up') // clean up
  }
}
var some = someThingGen()
console.log('someThingGen', some.next())
console.log('someThingGen', some.next())
console.log('someThingGen', some.next())
console.log('someThingGen', some.next())
for (var data of some) {
  console.log('some', data)
  if (data > 100) {
    console.log(some.return('end')) // 返回给定的值并结束生成器 { value: 'end', done: true }
    // break
  }
}
