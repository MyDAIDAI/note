(function () {
  let _ = {}
  _.version = 'my-underscore'
  const MAX_ARRAY_INDEX = Math.pow(2, 53) - 1
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
    let i, len
    // 判断 list 类型
    if (isArrayLike(list)) {
      for (i = 0, len = list.length; i < len; i++) {
        iteratee(list[i], i, list)
      }
    } else {
      if (Object.prototype.toString.call(list) !== '[object Object]') {
        list = []
      }
      // Object.keys 返回自身可枚举属性键名所组成的数组
      let keys = Object.keys(list)
      for (i = 0, len = keys.length; i < len; i++) {
        iteratee(list[keys[i]], keys[i], list)
      }
    }
  }

  // Object
  window._ = _
})()