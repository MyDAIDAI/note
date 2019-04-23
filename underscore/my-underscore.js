(function () {
  let _ = {}
  _.version = 'my-underscore'
  const MAX_ARRAY_INDEX = Math.pow(2, 53) - 1

  let ArrayProto = Array.prototype
  let ObjProto = Object.prototype
  let FunProto = Function.prototype

  let hasOwnProperty = ObjProto.hasOwnProperty


  let nativeKeys = Object.keys

  // 根据传入参数不同，返回带有不同参数的函数
  function optimizeCb(fn, context) {
    return function (value, index, collection) {
      return fn.call(context, value, index, collection)
    }
  }

  // 获取属性函数
  function property(key) {
    return function (collection) {
      return collection == null ? void 0 : collection[key]
    }
  }

  let getLength = property('length')
  // 判断是否是类数组
  function isArrayLike(collection) {
    let length = getLength(collection)
    return typeof length  === 'number' && length >= 0 && length < MAX_ARRAY_INDEX
  }
  
  // Collection
  // each
  _.each = _.forEach = function (list, iteratee, context) {
    iteratee = optimizeCb(iteratee, context)

    let keys = !isArrayLike(list) && _.keys(list)
    let len = (keys || list).length

    for (let i = 0; i < len; i++) {
      let currentKey = keys ? keys[i] : i
      iteratee(list[currentKey], currentKey, list)
    }
  }

  _.map = function (list, iteratee, context) {
    iteratee = optimizeCb(iteratee, context)

    let keys = !isArrayLike(list) && _.keys(list)
    let length = (keys || list).length
    let results = new Array(length)

    for (let i = 0; i < length; i++) {
      let currentKey = keys ? keys[i] : i
      results[i] = iteratee(list[currentKey], currentKey, list)
    }

    return results
  }

  _.redude = function (list, iteratee, memo, context) {
    
  }

  // Object
  // 判断传入参数是否为对象
  _.isObject = function (obj) {
    let type = typeof obj
    return type === 'function' || (type === 'object' && !!obj)
  }
  // 判断是否为自身属性
  _.has = function (obj, key) {
    return obj != null && hasOwnProperty.call(obj, key)
  }

  

  _.keys = function (obj) {
    // 判断是否是 object 类型
    if (!_.isObject(obj)) return []

    // 判断是否支持es6的Object.keys
    if (nativeKeys) return nativeKeys(obj)
    
    let keys = []
    // 遍历本身以及继承的可枚举属性
    for (let item in obj) {
      // 添加自身可枚举属性
      if (_.has(obj, item)) {
        keys.push(item)
      }
    }
    
    // TODO:IE9以下对toString等原型上方法重写不会被遍历的兼容
  }
  window._ = _
})()