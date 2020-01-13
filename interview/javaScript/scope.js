// javaScript 变量的作用域链
var scope = 'global scope'
function checkScope() {
  var scope = 'local scope'
  console.log(scope)
}
checkScope()

var name = 'zhangsan'
function func() {
  var name = 'liming';
  var sayName = function() {
    console.log(name)
  }
  return sayName;
}

var sayName = func();
sayName(); // 输出liming

// var a = 1
// function fn1(){
//   function fn2(){
//     console.log(a)
//   }
//   function fn3(){
//     var a = 4
//     fn2()
//   }
//   var a = 2
//   return fn3
// }
// var fn = fn1()
// fn() // 2

// var a = 1
// function fn1(){
//   function fn3(){
//     var a = 4
//     fn2()
//   }
//   var a = 2
//   return fn3
// }
// function fn2(){
//   console.log(a)
// }
// var fn = fn1() // 1

var a = 1
function fn1(){
  function fn3(){
    function fn2(){
      console.log(a)
    }
    var a
    fn2()
    a = 4
  }
  var a = 2
  return fn3
}

var fn = fn1()

fn() //undefined

// 参考链接
// https://github.com/mqyqingfeng/Blog/issues/6#
