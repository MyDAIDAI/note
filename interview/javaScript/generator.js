const path = require('path')
const fs = require('fs').promise
function* readAge() {
	let content = yield fs.readFile('./a.txt', 'utf8')
	let age = yield fs.readFile(content, 'utf8')
	return age
}
let it = readAge()
let {value} = it.next().value
value.then((data) => {
	console.log('data', data)
	let {value} = it.next(data)
	value.then((data1) => {
		console.log('data1', data1)
	})
})

function co(it) {
	return new Promise((resolve, reject) => {
		function next(r) {
			let {value, done} = it.next(r)
			if (done) {
				resolve(value)
			} else {
				Promise.resolve(value).then((data) => {
					next(data)
				}, reject)
			}
		}
		next()
	})
}

function flatten(arr) {
	let res = []
	if(Array.isArray(arr)) {
		for (let index = 0; index < arr.length; index++) {
			let item = arr[index]
			if(Array.isArray(item)) {
				res.concat(flatten(item))
			} else {
				res.push()
			}
		}
	} else {
		return arr
	}
}
