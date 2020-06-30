// 日期， 正则，对象，数组等等
/**
 * 深拷贝
 * @param obj 需要深拷贝的对象
 * @param hash 有默认值，不存在时为 WeakMap, 这样初次调用的时候不需要传默认值
 * @return {any|RegExp|Date}
 */
function deepClone(obj, hash = new WeakMap()) {
  if(obj == null) return obj
  if(obj instanceof RegExp) return new RegExp(obj)
  if(obj instanceof Date) return new Date(obj)
  if(typeof obj !== 'object') return obj
  if(hash.has(obj)) return hash.get(obj)
  let instance = new obj.constructor()
  hash.set(obj, instance)
  for (let key in obj) {
    if(obj.hasOwnProperty(key)) {
      instance[key] = deepClone(obj[key], hash)
    }
  }
  return instance
}

let obj = {a: 1}
obj.b = obj
// let a = {
//   b: 1,
//   c: {
//     d: a
//   }
// }
let dpArr = deepClone(obj)
// a.c.d = 3
console.log(dpArr)

