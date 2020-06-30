// 函数柯里化
function add(x, y) {
	return x + y
}
console.log(add(1, 2))
// function curry(x) {
// 	return y => x + y
// }
// 实现固定某个参数，只传剩余参数进入
// let add1 = curry(1)
// console.log(add1(2))
// console.log(add1(3))
// console.log(add1(4))
// function curry(fn) {
// 	let args = [].slice.call(arguments, 1)
// 	return function () {
// 		return fn.apply(this, [...args, ...arguments])
// 	}
// }
// let addCurry = curry(add, 1)
// console.log(addCurry(2))
function curry(fn, ...args) {
	let len = fn.length
	args = args || []
  return function () {
		let _args = args.slice(0)
	  _args.push(...arguments)
	  if (_args.length < len) {
			return curry.call(this, fn, ..._args)
	  }else {
	  	return fn.apply(this, [...args, ...arguments])
	  }
	}
}
function curry(fn, ...args) {
	args = args || []
	return function () {
		let _args = args.slice(0)
		_args.push(...arguments)
		if (_args.length === fn.length) {
			fn.apply(this, _args)
		} else {
			return curry.call(this, fn, _args)
		}
	}
}
let fn1 = curry(function (a, b, c) {
	console.log([a, b, c])
})
fn1("a", "b", "c") // ["a", "b", "c"]
fn1("a", "b")("c") // ["a", "b", "c"]
fn1("a")("b")("c") // ["a", "b", "c"]
fn1("a")("b", "c") // ["a", "b", "c"]

