var value = 1;

function foo() {
  console.log(value);
}

function bar() {
  var value = 2;
  foo();
}

bar(); // 打印1，javascript 采用词法作用域，从定义时的位置向上层查找

var scope = 'global scope'
function checkScope() {
  var scope = 'local scope'
  function f() {
    return scope
  }
  return f
}
console.log(checkScope()())

// 函数声明优先级大于变量声明优先级
console.log(foo)
function foo () {
  console.log('foo')
}
var foo = 1