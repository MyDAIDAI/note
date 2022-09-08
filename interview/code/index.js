// function getBottleNumber(number) {
//     let sum = 0;
//     while(number > 1) {
//         sum += number / 3;
//         number = number / 3 + number % 3;
//         if(number === 2) {
//             sum++;
//             break;
//         }
//     }
//     return sum;
// }
// getBottleNumber(3);
// getBottleNumber(10);
// getBottleNumber(81);
function permute( num ) {
    // write code here
    const result = [];
    const path = [];
    function dfs(path, num) {
        if(path.length === num.length) {
            console.log('path', path, num)
            result.push([...path]);
            return;
        }
        for(let i = 0; i < num.length; i++) {
           if(path.indexOf(num[i]) === -1) {
                path.push(num[i]);
                dfs(path, num);
                path.pop();
           }
        }
    }
    dfs(path, num);
    console.log('result', result);
    return result;
}
console.log('permute([1, 2, 3])', permute([1, 2, 3]))