// const { type } = require("os");

function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}
function isEqual(v1, v2) {
    if(!isObject(v1) || !isObject(v2)) {
        return v1 === v2;
    }
    if(v1.length !== v2.length) {
        return false;
    }
    for(let key in v1) {
        const flag = isEqual(v1[key], v2[key])
        // console.log('isEqual', flag);
        if(!flag) {
            return false;
        }
    }
    return true;
}
let v1 = [
    1,
    'a',
    {
        name: 'zs',
        age: 14,
        subjects: ['yuwen']
    },
    [
        2,
        2,
        false
    ]
];
let v2 = [
    1,
    'a',
    {
        name: 'zs',
        age: 14,
        subjects: ['yuwen']
    },
    [
        2,
        2,
        false
    ]
];
console.log(isEqual(v1, v2));