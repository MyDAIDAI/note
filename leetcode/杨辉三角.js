var generate = function(numRows) {
	let result = []
	let i = 1;
	while(i <= numRows) {
		let j = 1
		let current = []
		while(j <= i) {
			let num = generateNum(i, j)
			current.push(num)
			j++
		}
		result.push(current)
		i++
	}
	return result
};
function generateNum(i, j) {
	if (i <= 0 || j <= 0) return 0
	if (j === 1 || j === i) return 1
	else return generateNum(i - 1, j - 1) + generateNum(i - 1, j)
}
console.log(generate(5))
