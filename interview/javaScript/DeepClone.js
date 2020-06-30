function shallowClone (source) {
  var target = {}
  for (var i in source) {
    if (source.hasOwnProperty(i)) {
      target[i] = source[i]
    }
  }
  return target
}
var a1 = {b: {c: {}}}
var a2 = shallowClone(a1)
console.log('a2.b.c === a1.b.c', a2.b.c === a1.b.c)

function isObject (obj) {
  return typeof obj === 'object' && obj != null
  // return Object.prototype.toString.call(obj) === '[object Object]'
}

function clone (source) {
  if (!isObject(source)) {
    return source
  }
  var target = Array.isArray(source) ? [] : {}
  for (var i in source) {
    if (Object.prototype.hasOwnProperty.call(source, i)) {
      if (isObject(source[i])) {
        target[i] = clone(source[i])
      } else {
        target[i] = source[i]
      }
    }
  }
  return target
}
var a3 = clone(a1)
console.log('a3.b.c === a1.b.c', a3.b.c === a1.b.c)

function createData (deep, breadth) {
  var data = {}
  var temp = data
  for (var i = 0; i < deep; i++) {
    temp = temp['data'] = {}
    for (var j = 0; j < breadth; j++) {
      temp[j] = j
    }
  }
  return data
}
console.log(createData(1, 2))
console.log(JSON.stringify(createData(5, 2)))
clone(createData(1000))
// clone(createData(10000)) // RangeError: Maximum call stack size exceeded

function cloneJSON (source) {
  return JSON.parse(JSON.stringify(source))
}
// cloneJSON(createData(10000)) // RangeError: Maximum call stack size exceeded

function cloneLoop (x) {
  const root = {}
  const loopList = [{
    parent: root,
    key: undefined,
    data: x
  }]
  while(loopList.length) {
    const node = loopList.pop()
    const key = node.key
    const parent = node.parent
    const data = node.data

    let res = parent
    if (typeof key !== 'undefined') {
      res = parent[key] = Array.isArray(data) ? [] : {}
    }

    for (let k in data) {
      if (Object.prototype.hasOwnProperty.call(data, k)) {
        if (isObject(data[k])) {
          loopList.push({
            parent: res,
            key: k,
            data: data[k]
          })
        } else {
          res[k] = data[k]
        }
      }
    }
  }
  return root
}
var obj = {
  a: 1,
  b: {
    c: {
      d: 2
    }
  }
}
var d = cloneLoop(obj)
// console.log(cloneLoop(createData(10000))) // 顺利执行

var b = {}
var a = {a1: b, a2: b}
console.log(a.a1 === a.a2)
var c = clone(a)
console.log(c.a1 === c.a2)

function find (arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].source === item) {
      return arr[i]
    }
  }
  return null
}

function cloneForce (x) {
  // 去重数组
  const uniqueList= []
  const root = {}
  const loopList = [{
    parent: root,
    key: undefined,
    data: x
  }]
  while (loopList.length) {
    const node = loopList.pop()
    const parent = node.parent
    const key = node.key
    const data = node.data

    let res = parent
    if (typeof key !== 'undefined') {
      res = parent[key] = {}
    }

    let uniqueData = find(uniqueList, data)
    if (uniqueData) {
      parent[key] = uniqueData.target
      break
    }
    uniqueList.push({
      source: data,
      target: res
    })

    for (let key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (isObject(data[key])) {
          loopList.push({
            parent: res,
            key: key,
            data: data[key]
          })
        } else {
          res[key] = data[key]
        }
      }
    }
  }
  return root
}
var obj1 = {
  a: 1,
  b: {
    c: {
      d: 2
    }
  }
}

// 保持引用关系
function cloneForce1(x) {
  // =============
  const uniqueList = []; // 用来去重
  // =============

  let root = {};

  // 循环数组
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x,
    }
  ];

  while(loopList.length) {
    // 深度优先
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== 'undefined') {
      res = parent[key] = {};
    }

    // =============
    // 数据已经存在
    let uniqueData = find1(uniqueList, data);
    if (uniqueData) {
      parent[key] = uniqueData.target;
      break; // 中断本次循环
    }

    // 数据不存在
    // 保存源数据，在拷贝数据中对应的引用
    uniqueList.push({
      source: data, // 保存原有值，根据该值判断是否引用同一个对象
      target: res, // 新创建的引用，如果有引用同一个对象，则将其赋值（深度拷贝不能直接引用原有对象）
    });
    // =============

    for(let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === 'object') {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k],
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }

  return root;
}

function find1(arr, item) {
  for(let i = 0; i < arr.length; i++) {
    if (arr[i].source === item) {
      return arr[i];
    }
  }

  return null;
}

// var d1 = cloneForce(obj1)
// console.log('d1', JSON.stringify(d1))
var b = {d: 1}
var a = {a1: b, a2: b}
console.log('a', a.a1 === a.a2)
var c = cloneForce1(a)
console.log('c', c.a1 === c.a2)

let obj = {}
obj.a = obj
function deepClone(obj, hash = new WeakMap()) {
  if (obj == null) return obj
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)
  if (typeof obj !== 'object') return obj
  if (hash.has(obj)) return hash.get(obj)
  let instance = new obj.constructor()
  hash.set(obj, instance)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      instance[key] = deepClone(obj[key], hash)
    }
  }
  return instance
}
console.log(deepClone(obj))
