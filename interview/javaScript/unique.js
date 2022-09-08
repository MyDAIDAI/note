// 拿到n个数组中的相交元素

function getSome(...list) {
    const [first, ...otherList] = list;
    return otherList.reduce((pre, cur) => {
        return pre.filter(item => cur.includes(item));
    }, first);
}
console.log(getSome([1, 2, 3, 5], [3, 4, 5], [7, 8, 3, 5]))