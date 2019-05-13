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
  function optimizeCb(fn, context, argCount) {
    switch (argCount == null ? 3 : argCount) {
      case 3: return function (value, index, collection) {
        return fn.call(context, value, index, collection)
      };
      case 4: return function (accumulator, value, index, collection) {
        return fn.call(context, accumulator, value, index, collection)
      };
    }
    return function () {
      return fn.call(context, arguments)
    }
  }

  var cb = function (value, context, argCount) {
    if (_.isFunction(value)) return optimizeCb(value, context)
    // if (_.isObject(value)) return _.matcher(value)
    // return _.property(value)
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

  _.map = _.collect = function (list, iteratee, context) {
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

  // 模拟原生reduce函数, reduce简单实现
  // _.reduce = function (list, iteratee, memo, context) {
  //   iteratee = optimizeCb(iteratee, context, 4)
  //
  //   let keys = !isArrayLike(list) && _.keys(list)
  //   let length = (keys || list).length
  //   if (arguments.length < 3) {
  //     memo = 0
  //   }
  //
  //   for (let i = 0; i < length; i++) {
  //     let currentKey = keys ? keys[i] : i
  //     memo = iteratee(memo, list[currentKey], currentKey, list)
  //   }
  //   return memo
  // }

  _.reduce = _.foldl = createReduce(1)

  _.reduceRight = _.foldr = createReduce(-1)

  function createReduce(dir) {
    var reducer = function (obj, iteratee, memo, initial) {
      var keys = !isArrayLike(obj) && _.keys(obj)
      var length = (keys || obj).length
      var index = dir > 0 ? 0 : length - 1
      if (!initial) {
        memo = obj[keys ? keys[index] : index]
        index += dir
      }
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index
        memo = iteratee(memo, obj[currentKey], currentKey, obj)
      }
      return memo
    }
    return function (obj, iteratee, memo, context) {
      var initial = arguments.length >= 3
      return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial)
    }
  }

  // list: array, object
  // predicate: function, object...
  _.find = function (list, predicate, context) {
    let key = isArrayLike(list) ? _.findIndex(list, predicate, context) : _.findKey(list, predicate, context)
    if (key !== void 0 && key !== -1) return list[key] 
  }

  _.findIndex = createPredicateIndexFinder(1)

  _.findLastIndex = createPredicateIndexFinder(-1)

  function createPredicateIndexFinder(dir) {
    return function (array, predicate, context) {
      predicate = cb(predicate, context)
      
      let index = dir > 0 ? 0 : array.length - 1
      let length = array.length
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) {
          console.log('index', index)
          return index
        }
      }
      return -1
    }
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

  // 获取对象中所有自身可枚举的keys
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

  // 获取对象所有可枚举的keys，包括自身以及继承
  _.allKeys = function (obj) {
    if (!_.isObject(obj)) return []
    var keys = []
    for (let key in obj) {
      keys.push(key)
    }
    return keys
  }
  
  // 将传入对象的所有自身属性复制到传入的第一个参数中
  _.extendOwn = _.assign = createAssigner(_.keys)

  // 内部函数
  function createAssigner(keysFunc) {
    return function (obj) {
      let length = arguments.length
      // 处理只传入一个参数
      if (length < 2 || obj == null) return obj
      for (let index = 1; index < length; index++) {
        let source = arguments[index] // 从第二个参数后面以此取变量
        let keys = keysFunc(source)
        let len = keys.length
        for (let i = 0; i < len; i++) {
          let key = keys[i]
          if (obj[key] === void 0) obj[key] = source[key] 
        }
      }
      return obj
    }
  }

  // function
  // 判断是否是函数
  _.isFunction = function (obj) {
    return typeof obj === 'function'
  }
  window._ = _
})()