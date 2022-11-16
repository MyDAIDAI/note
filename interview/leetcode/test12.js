// function getPriceMethod(price) {
//     if(!price) return;
//     const resultList = [];
//     const path = [];
//     const minLen = Number.MAX_VALUE;
//     const priceList = [100, 50, 10, 5, 1]

//     function dfs(startIndex, curPrice) {
//         console.log('dfs', curPrice);

//         if(curPrice === 0) {
//             resultList.push([...path]);
//             return;
//         }
//         for(let i = startIndex; i < priceList.length; i++) {
//             if(priceList[i] <= curPrice) {
//                 console.log('priceList', priceList[i], path)
//                 path.push(priceList[i]);
//                 dfs(i, price - priceList[i]);
//                 path.pop();
//             }
//         }
//     } 
//     dfs(0, price);
//     for(let i = 0; i < resultList.length; i++) {
//         minLen = Math.min(resultList[i].length, minLen);
//     }
//     return minLen;
// }
// // console.log(getPriceMethod(67));

// let method = 0;
// function getPrice(price, method) {
//     const priceList = [100, 50, 10, 5, 1];
//     let result = price;
//     for(let i = 0; i < priceList.length; i++) {
//         let item = priceList[i];
//         if(result >= item) {
//             result = result - item;
//             method++;
//             console.log('result', result, i, item);
//             console.log('method', method);
//             if(result > 0) {
//                 getPrice(result, method);
//             }
//         }
//     }
// }

// function getMethod() {
//     let method =  0;
//     getPrice(price, method);
//     return method;
// }

// console.log(getPrice(251, 0));

const list1 = [1, 5, 7];
const list2 = [2, 4, 8, 9];

function mergeList(list1, list2) {
    if(!list1 && !list2) return [];
    if(!list1) return list2;
    if(!list2) return list1;
    let i = 0;
    let j = 0;
    const result = [];
    while(i < list1.length || j < list2.length) {
        if(list1[i] < list2[j] || j >= list2.length) {
            result.push(list1[i]);
            i++;
        } else if(list1[i] > list2[j] || i >= list1.length) {
            result.push(list2[j]);
            j++
        } else {
            result.push(list1[i]);
            result.push(list2[j]);
            i++;
            j++
        }
    }
    return result;
}
console.log(mergeList(list1, list2));