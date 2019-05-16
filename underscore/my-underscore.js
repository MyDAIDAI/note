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

  /**
   * 根据传入参数类型返回不同的函数进行调用
   * @param value
   * @param context
   * @param argCount
   * @returns {(function(*=, *=, *=): *)|(function(*=, *=, *=, *=): *)|(function(): *)|(function(*=): (*|boolean))|Function}
   */
  var cb = function (value, context, argCount) {
    if (_.isFunction(value)) return optimizeCb(value, context)
    if (_.isObject(value)) return _.matcher(value)
    return _.property(value)
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

  /**
   * 返回 predicate 为 true 的第一个值
   * @param list
   * @param predicate
   * @param context
   * @returns {*}
   */
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
          return index
        }
      }
      return -1
    }
  }

  /**
   * 返回 obj 中包含 attrs 的第一个值
   * @param obj
   * @param attrs
   * @returns {*}
   */
  _.findWhere = function (obj, attrs) {
    return _.find(obj, _.matcher(attrs))
  }

  /**
   * 返回 obj 包含 attrs 的所有值
   * @param obj
   * @param attrs
   * @returns {Array}
   */
  _.where = function (obj, attrs) {
    return _.filter(obj, _.matcher(attrs))
  }

  /**
   * 遍历 obj 中的每个值，返回所有通过 predicate 真值检测的元素所组成的数组
   * @type {function(*=, *=, *=): Array}
   */
  _.filter = _.select = function (obj, predicate, context) {
    var results = []
    predicate = cb(predicate, context)
    _.each(obj, function (value, index, list) {
      if (predicate(value, index, list)) {
        results.push(value)
      }
    })
    return results
  }

  /**
   * 遍历 obj, 返回 predicate 返回值为 false 的值组成的数组
   * @param obj
   * @param predicate
   * @param context
   * @returns {Array}
   */
  _.reject = function (obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context)
  }

  /**
   * 对 predicate 执行的结果取反
   * @param predicate
   * @returns {function(): boolean}
   */
  _.negate = function (predicate) {
    return function () {
      return !predicate.apply(this, arguments)
    }
  }

  /**
   * 遍历 obj, predicate 都返回 true，则返回 true
   * @param obj
   * @param predicate
   * @param context
   * @returns {boolean}
   */
  _.every = _.all = function (obj, predicate, context) {
    predicate = cb(predicate, context)
    let keys = !isArrayLike(obj) && _.keys(obj)
    let length = (keys || obj).length
    for (let index = 0; index < length; index++) {
      let currentKey = keys ? keys[index] : index
      if (!predicate(obj[currentKey], currentKey, obj)) {
        return false
      }
    }
    return true
  }

  /**
   * 遍历 obj, predicate 有一个返回 true, 则返回 true
   * @param obj
   * @param predicate
   * @param context
   * @returns {boolean}
   */
  _.some = _.any = function (obj, predicate, context) {
    predicate = cb(predicate, context)
    let keys = !isArrayLike(obj) && _.keys(obj)
    let length = (keys || obj).length
    for (let index = 0; index < length; index++) {
      let currentKey = keys ? keys[index] || index
      if (predicate(obj[currentKey], currentKey, obj)) {
        return true
      }
    }
    return false
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

  _.matcher = function (attrs) {
    attrs = _.extendOwn(attrs)
    return function (obj) {
      return _.isMatch(obj, attrs)
    }
  }

  _.isMatch = function (object, attrs) {
    var keys = _.keys(attrs)
    var length = keys.length
    if (object == null) return !length
    var obj = Object(object)

    for (var i = 0; i < length; i++) {
      var key = keys[i]
      if (attrs[key] !== obj[key] || !(key in obj)) {
        return false
      }
    }
    return true
  }

  // function
  // 判断是否是函数
  _.isFunction = function (obj) {
    return typeof obj === 'function'
  }
  window._ = _
})()