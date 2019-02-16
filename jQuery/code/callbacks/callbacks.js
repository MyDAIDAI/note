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

jQuery.Callbacks = function( options ) {

  // 将传入的字符串参数转为对象参数缓存在options中
  options = typeof options === "string" ?
    createOptions( options ) : {};

  var // 正在触发标志
    firing,

    // 存储上一次函数调用参数
    memory,

    // 函数队列是否执行标志
    fired,

    // 阻止触发标志
    locked,

    // 函数队列
    list = [],

    // 参数队列
    queue = [],

    // 当前正在触发的回调函数的索引
    firingIndex = -1,

    // fire函数
    fire = function() {

      // 强制单次触发
      locked = locked || options.once;
      // 标识触发状态
      fired = firing = true
      for ( ; queue.length; firingIndex = -1 ) {
        memory = queue.shift();
        while ( ++firingIndex < list.length ) {

          // 调用回调函数并判断中止状态
          // memory[0] --> self对象
          // memory[1] --> arguments
          if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
            options.stopOnFalse ) {

            // 终止while变量以及调用add不再触发fire
            firingIndex = list.length;
            memory = false;
          }
        }
      }

      // 未传入memory参数，memory置未false
      // 阻止add中fire函数的滴啊用
      if ( !options.memory ) {
        memory = false;
      }
      // 标识函数调用完成
      firing = false;

      // 若传入'once'参数，则只执行一次
      // 锁定函数的执行
      if ( locked ) {

        // 如果传入memory参数，则将已执行函数队列清空
        // 调用add函数时执行最新添加函数
        if ( memory ) {
          list = [];

          // 清除函数队列数组
        } else {
          list = "";
        }
      }
    },

    // 调用jQuery.callbacks返回对象
    // 该对象中的方法通过返回this，实现链式调用
    // 对象的方法中保存对callbacks中局部作用域以及变量的引用
    // 形成了闭包，可以将变量作为私有变量，外部作用域不能访问
    self = {

      // 向函数队列中添加函数
      add: function() {
        if ( list ) { // 判断该队列是否存在，`once`参数使其队列为''

          // 如果传入memory参数，并且当前没有在fire状态
          // 将memory中存储的上一次调用的函数参数传入参数队列queue
          if ( memory && !firing ) {
            firingIndex = list.length - 1; // 重置firingIndex，确保从最新的添加的函数开始执行
            queue.push( memory );
          }
          // 私有add函数
          // 循环遍历参数将函数添加入函数队列
          ( function add( args ) {
            jQuery.each( args, function( _, arg ) {
              if ( typeof arg === 'function') {
                // 判断是否传入unique以及当前是否存在该函数
                // !option.unique || !self.has(arg) 等同与 option.unique && self.has(arg)
                if ( !options.unique || !self.has( arg ) ) {
                  list.push( arg );
                }
              } else if ( arg && arg.length && typeof arg !== "string" ) {

                // 递归添加
                add( arg );
              }
            } );
          } )( arguments );

          // 若传入memory则在函数添加完成之后执行
          if ( memory && !firing ) {
            fire();
          }
        }
        return this;
      },

      // 从函数队列中删除函数
      remove: function() {
        jQuery.each( arguments, function( _, arg ) {
          var index;
          // 由于add默认可以重复添加函数，所以使用while循环
          // 如果在list中找到该arg,就删除
          while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
            list.splice( index, 1 );

            // 若当前删除的index比firingIndex小
            // 则firingIndex减1
            if ( index <= firingIndex ) {
              firingIndex--;
            }
          }
        } );
        return this;
      },

      // 判断传入函数是否在函数队列中存在
      // 若不传入参数，则返回当前函数队列中是否有值
      has: function( fn ) {
        return fn ?
          jQuery.inArray( fn, list ) > -1 :
          list.length > 0;
      },

      // 将函数队列情况
      empty: function() {
        if ( list ) {
          list = [];
        }
        return this;
      },

      // 清空所有的回调函数和值
      // 中止任何正在执行的函数
      disable: function() {
        locked = queue = [];
        list = memory = "";
        return this;
      },
      //
      disabled: function() {
        return !list;
      },

      // Disable .fire
      // Also disable .add unless we have memory (since it would have no effect)
      // Abort any pending executions

      // 锁定队列，后面的函数不再执行，除非传入memory
      lock: function() {
        locked = queue = [];
        if ( !memory && !firing ) {
          list = memory = "";
        }
        return this;
      },
      locked: function() {
        return !!locked;
      },

      // 使用给定的上下文context和参数args调用函数
      // 该函数是对上下文以及传入参数的处理
      fireWith: function( context, args ) {
        if ( !locked ) {
          args = args || [];
          args = [ context, args.slice ? args.slice() : args ];
          queue.push( args );
          if ( !firing ) {
            fire();
          }
        }
        return this;
      },
      // 使用给定的参数调用函数
      fire: function() {
        self.fireWith( this, arguments );
        return this;
      },

      // 判断函数队列是否至少被调用一次
      fired: function() {
        return !!fired;
      }
    };

  return self;
};
var callbacks = jQuery.Callbacks('stopOnFalse');
function fn1 (value) {
  console.log('fn1 value:' + value);
  return false;
}
function fn2 (value) {
  console.log('fn2 value:' + value);
}
callbacks.add(fn1);
callbacks.add(fn2);
callbacks.fire('foo');
// callbacks.add(fn2);
// callbacks.fire('bar')

