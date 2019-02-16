// 正则，匹配空格，将字符串根据空格分隔为数组
var reg = /[^\x20\t\r\n\f]+/g
var jQuery = {}
// jQuery数组与对象的遍历函数
jQuery.each = function (obj, callback) {
  var length, i = 0
  if (isArrayLike(obj)) {
    length = obj.length
    for (; i < length; i++) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  }else {
    for (i in obj) {
      if (callback.call(obj[i], i, obj[i])) {
        break;
      }
    }
  }
  return obj;
}
jQuery.inArray = function (ele, arr, i) {
  return arr == null ? -1 : Array.prototype.indexOf.call(arr, ele, i)
}
// 数组类型判断
function isArrayLike(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]' ? true : false
}
/**
 * options.match(reg) --> 将'once'转换为['once'], 将'once memory'转换为['once', 'memory']
 * 将传入的参数转换为对象
 **/
function createOptions(options) {
  var object = {}
  jQuery.each(options.match(reg) || [], function (_, flag) {
    object[flag] = true
  })
  return object
}
jQuery.Callbacks = function (options) {
  // options = options ? createOptions(options) || {}
  var list = []; // 函数队列
  var queue = []; // 参数队列
  var firingIndex = -1;
  var memory;
  var fire = function () {
    for (; queue.length; firingIndex = -1) {
      memory = queue.shift();
      while (++firingIndex < list.length) {
        list[firingIndex].apply(memory[0], memory[1])
      }
    }
  }
  var self = {
    add: function () {
      (function add (args) {
        jQuery.each(args, function (_, arg) {
          if (typeof arg === 'function') {
            list.push(arg)
          } else if (arg && arg.length && typeof arg !== 'string') {
            add(arg)
          }
        })
      })(arguments)
    },
    fire: function () {
      queue.push([this, arguments])
      fire()
    }
  }
  return self;
}
var myCallbacks = jQuery.Callbacks()
function fn1 (value) {
  console.log('fn1 value:' + value)
  console.log('fn1 this:' + this)
}
myCallbacks.add(fn1)
myCallbacks.fire('hello')
