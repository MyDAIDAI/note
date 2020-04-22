let cwd = process.cwd();
console.log('cwd', cwd);
let url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://www.baidu.com';
console.log('url', url);
let args = process.argv;
let importArgs = process.argv.slice(2).reduce((previous, current, index, arr) => {
	if (current.includes('--')) {
		previous[current.slice(2)] = arr[index + 1];
	}
	return previous;
}, {})
console.log('args', args, importArgs);
