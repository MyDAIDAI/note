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
// 异步迭代生成器
function foo3(cb) {
  // cb 异步之后的回调函数
  setTimeout(cb, 2000)
}

// 采用回调函数的方式调用，可能陷入回调陷阱
foo3(function () {
  console.log('foo3 callback')
})

// 将异步与生成器结合
function foo4() {
  setTimeout(function () {
    console.log('foo4 callback')
    maIt.next('enter foo4 callback') // 成功时候将值传入next
  }, 2000)
}
function* main() {
  try {
    let text = yield foo4() // 传入next的值会被赋值给text变量，生成器内部代码看似完全同步
    console.log('main text', text)
  } catch (e) {
    console.log('main catch', e)
  }
}
var maIt = main()
maIt.next() // 启动生成器

// 同步错误处理
function* main1() {
  let x = yield 'hello world';
  yield x.toLowerCase()
}
var it2 = main1()
it2.next().value
try {
  it2.next(42) // 生成器函数中国抛出错误
} catch (e) {
  console.log('it2 catch', e)
}

function* main2() {
  try {
    let x = yield 'hello world'
    console.log('main2 x', x)
  } catch (e) {
    // main2 catch it3 throw error: throw抛出的错误被内部捕获
    console.log('main2 catch', e)
  }
}
var it3 = main2()
it3.next()
try {
  // 向 *main2()抛出一个错误，如果 *main2()内部没有进行错误捕获，则会向上
  it3.throw('it3 throw error')
} catch (e) {
  // *main2函数中的没有捕获错误，则被上层捕获
  console.log('it3 catch', e)
}

// Promise与生成器
function foo5() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('foo5 promise resolve')
    })
  })
}
function foo6() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve('foo6 promise resolve')
    })
  })
}
function* main5() {
  try {
    let result1 = yield foo5()
    let result2 = yield foo6()
    return [result1, result2]
    console.log('main5 result', result1, result2) // main5 result foo5 promise resolve
  } catch (e) {
    console.log('main5 catch', e)
  }
}
// var it4 = main5()
// var nextValue = it4.next().value
// console.log('nextValue', nextValue)
// var p = nextValue.then(function (value) {
//   it4.next(value) // 将异步执行结果传入main5函数中并赋值给变量
// })

function run (gen) {
  var args = [].slice.call(this, 1), it;
  it = gen.apply(this, args)

  return Promise.resolve()
    .then(function handleNext(value) {
      var next = it.next(value)
      return (function handleResult(next) {
        if (next.done) {
          return next.value
        } else {
          return Promise.resolve(next.value)
            .then(handleNext, function handleErr(err) {
              return Promise.resolve(it.throw(err))
                .then(handleResult)
            })
        }
      })(next)
    })
}

// var runResult = run(main5)
// async 函数的实现
async function fn(args) {
  //
}
// 上面的async函数等同于下面
function fn(args) {
  return spawn(function* () {
    //...
  })
}
// spawn函数的具体实现
function spawn(genF) {
  return new Promise(function (resolve, reject) {
    var it = genF()
    function step(nextF) {
      try {
        var next = nextF()
      } catch (e) {
        return reject(e)
      }
      if (next.done) {
        return resolve(next.value)
      }
      Promise.resolve(next.value).then(function (value) {
        step(function () {
          return it.next(value)
        })
      }, function (e) {
        step(function () {
          it.throw(e)
        })
      })
    }
    step(function () {
      return it.next()
    })
  })
}
spawn(main5).then(value => {
  console.log('spawn', value)
})
// 生成器委托
// *bar()把迭代控制委托给了*foo7()
// 一旦迭代器消耗掉了整个 *foo7() 迭代器，就会自动转会控制 *bar()
function *foo7() {
  console.log('*foo7 start')
  yield 3
  yield 4
  console.log('*foo7 end')
}
function* bar() {
  yield 1
  yield 2
  yield *foo7()
  yield 5
  yield 6
}
for (let value of bar()) {
  console.log('bar value', value)
}

// 消息委托
function *foo8() {
  console.log('inside *foo8():', yield 'B')
  console.log('inside *foo8()', yield 'C')
  return 'D'
}
function *bar1() {
  console.log('inside *bar1()', yield 'A')
  console.log('inside *bar1()', yield *foo8())
  console.log('inside *bar1()', yield 'E')
  return 'F'
}
var it4 = bar1()
console.log('outside', it4.next().value)
// outside A
console.log('outside', it4.next(1).value)
// inside *bar1() 1
// outside B
console.log('outside', it4.next(2).value)
// inside *foo8() 2
// outside C
console.log('outside', it4.next(3).value)
// inside *foo8() 3
// inside *bar1() D
// outside E
console.log('outside', it4.next(4).value)
// inside *bar1() 4
// outside F

// yield委托甚至不要求必须转到另一个生成器
function *bar2() {
  console.log('inside *bar2()', yield 'A')
  console.log('inside *bar2()', yield *['B', 'C', 'D'])
  console.log('inside *bar2()', yield 'E')
  return 'F'
}
// 默认的数组迭代器不关心通过 next()调用发送的消息
var it4 = bar2()
console.log('outside', it4.next().value)
// outside 'A'
console.log('outside', it4.next(1).value)
// inside *bar2() 1
// outside B
console.log('outside', it4.next(2).value)
// outside C
console.log('outside', it4.next(3).value)
// outside D
console.log('outside', it4.next(4).value)
// inside *bar2() undefined ->  yield *表达式的值与传入的 next()的值无关, 只与返回值有关
// outside E
console.log('outside', it4.next(5).value)
// inside *bar2() 5
// outside F

