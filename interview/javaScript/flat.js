// 数组扁平化

Array.prototype.myFlat = function(level) {
    let result = [];
    const list = this;
    function recusive(data, level) {
        console.log('data', data, level);
        if(level === 0 || !Array.isArray(data)) return data;
        for (let index = 0; index < data.length; index++) {
            const item = data[index];
            // console.log('item', item);
            const returnData = recusive(item, level - 1);
            // console.log('returnData', returnData)
            if(returnData !== undefined) {
                result = result.concat(returnData);
            }
        }
        
    }
    recusive(list, level);
    return result;
}
Array.prototype.myFlat1 = function(depth) {
    const list = this;
    depth = depth == undefined ? Infinity : depth ;
    // console.log('list', list, depth);
    const result = depth > 0 ? list.reduce((pre, cur, index) => {
        return pre.concat(Array.isArray(cur) ? cur.myFlat(depth - 1) : cur);
    }, []) : list.slice();
    // console.log('result', result)
    return result;
}
console.log([[1,2,3], [4, [5, [6]]], [8, 9, 0, [11]]].myFlat())
console.log([[1,2,3], [4, [5, [6]]], [8, 9, 0, [11]]].myFlat(1))