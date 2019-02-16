# Callbacks

在`jQuery`中使用`jQuery.Callbacks()`函数来管理回调函数队列。由于在很多时候需要控制一系列函数进行顺序执行，所以需要一个函数队列来解决这个问，这个时候`jQuery.Callbacks()`就可以派上用场啦

```javascript
var callbacks = jQuery.Callbacks();
callbacks.add(function () {
    alert('a')
})
callbacks.add(function () {
    alert('b')
})
callbacks.fire()
```

`jQuery`提供下面几个方法来添加与调用函数以及确认函数的状态：

- `callbacks.add()`
- `callbacks.disable()`
- `callbacks.disabled()`
- `callbacks.empty()`
- `callbacks.fire()`
- `callbacks.fired()`
- `callbacks.fireWith()`
- `callbacks.has()`
- `callbacks.lock()`
- `callbacks.locked()`
- `callbacks.remove()`

调用`$.Callbacks()`时，可以传入字符串参数，该参数可以影响函数队列的调用行为

- `once`:确保回调队列只能被触发一次，类似`Deferred`
- `memory`:追踪以前的值，并且将最近追踪的值添加到调用的函数中
- `unique`:确保一个回调函数只能被添加一次
- `stopOnFalse`:当回调函数返回`false`的时候中断调动

```javascript
var callbacks = $.Callbacks();
callbacks.add( fn1 );
 
// outputs: foo!
callbacks.fire( "foo!" );
 
callbacks.add( fn2 );
 
// outputs: bar!, fn2 says: bar!
callbacks.fire( "bar!" );
```

上面是`jQuery`官网对于这个方法的例子，这个与我们平时的用的发布/订阅者模式有些相似，简单的实现下上面的功能：

```javascript
var Observable = {
    callbacks: [],
    add: function (fn) {
    	this.callbacks.push(fn)
	},
    fire: function () {
        this.callbacks.forEach(ele => {
            ele()
        })
    }
}
Observable.add(function () {
    alert(1)
})
Observable.add(function () {
    alert(2)
})
Observable.fire()
```

上面是一个简单的实现，在`jQuery`中由于参数以及方法比较多，所以代码也比较复杂

- `Callbacks`初始化代码以及`add`函数

- ```javascript
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
      // options = typeof options === 'string' ? createOptions(options) : {};
      var list = [];
      var self = {
          add: function () {
              (function add(args) {
                  jQuery.each(args, function (_, arg) {
                      if (typeof arg === 'function') {
                          list.push(arg);
                      } else if (arg && arg.length && typeof arg !== 'string') { // 数组或者类数组
                          add(arg);
                      }
                  })
              })(arguments);
  			return this;
          }
      }
      return self;
  }
  var callbacks = jQuery.Callbacks()
  callbacks.add(function () {
       console.log(1)
  })
  callbacks.add(function () {
       console.log(2)
  }, function () {
       console.log(3)
  })
  callbacks.add([function () {
      console.log(4)
  }, function () {
      console.log(5)
  }])
  ```

  上面是`jQuery`代码中`Callbacks`中的`add`部分的实现，使用正则将传入的使用空格分开的字符串参数转换为数组，然后使用`createOptions`将其中的数组属性转换为对象属性保存在`options`中，当调用`jQuery.Callbacks()`后，会返回一个对象，该对象中保存着可以进行操作的方法，比如`add`，`remove`，`fire`等，这些方法使用了闭包，保存着对`Callbacks`函数中变量的引用，可以将其中的变量一直保存在内存中，不会被回收。每一个方法都会返回当前的`this`对象，依次来实现链式调用

  `add`方法中判断了传入的参数类型，如果是`function`类型，则直接`push`进入队列中，如果参数是一个数组或者类数组对象，则进行循环调用添加函数

- `fire`方法

  `fire`方法除调用的是返回对象中的`fireWith`方法，在`fireWith`方法中，执行的是函数内部的`fire`函数，`fire`函数去掉对参数的处理代码，主要就是对函数队列的执行

  ```javascript
  var fire = function () {
      list[firingIndex].apply(memory[0], memory[1])
  }
  ```

  去掉`jQuery`中的无关代码

  ```javascript
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
          // 下面的调用方式：
          // 调用fn1时value ==> arguments对象
          // list[firingIndex](memory[1])
          // 使用apply的调用方式
          // fn1的value ==> argument[0]
          // 所以使用apply的方式调用函数
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
        // 将参数添加进入参数队列
        // 由于使用arguments作为参数调用函数，
        // 需要使用apply来调用函数，则需要传入上下文对象this
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
  ```

- `empty`方法

  这个方法与调用`jQuery.Callbacks()`传入的参数无关，也很简单，就是将参数队列清空

  ```javascript
  empty = function () {
      if (list) {
          list = []
      }
      return this
  }
  ```

- 参数`once`

  传入参数`once`，该函数队列就只触发一次，无论后面是否对其进行了`add`、`remove`操作，再进行`fire`时，函数队列都不再执行

  ```javascript
  var callbacks = $.Callbacks( "once" );
  callbacks.add( fn1 );
  callbacks.fire( "foo" );
  callbacks.add( fn2 );
  callbacks.fire( "bar" );
  callbacks.remove( fn2 );
  callbacks.fire( "foobar" );
  /*
  output:
  foo76
  */
  ```

  在`jQuery`源码中，在第一次触发函数进行调用的时候来对`option`进行判断，若传入了`once`字符串，则将其函数队列`list`置为空字符串，那么下一次调用`add`函数向函数队列添加函数的时候，会进行判断 ，若`list`为空，则不会进行添加，再进行`fire`函数的调用也会判断该参数，为`false`才进行调用

  ```javascript
   fire = function() {
  
        // 根据传入的once参数设置locked
        locked = locked || options.once;
  
        // Execute callbacks for all pending executions,
        // respecting firingIndex overrides and runtime changes
        for ( ; queue.length; firingIndex = -1 ) {
          // 取出传入实参值
          memory = queue.shift();
          while ( ++firingIndex < list.length ) {
  		  // 根据传入实参值依次调用List函数队列中的函数
            // 若函数返回为false,并且设置了stopOnFalse属性，则跳出while循环
            // memory[0] ==> self
            // memory[1] ==> 调用fire传入的arguments
            if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
              options.stopOnFalse ) {
  
              // 将firingIndex设置为list的长度以此来跳出while循环
              firingIndex = list.length;
            }
          }
        }
  
        // 若传入once参数，则将其函数队列List置为''
        if ( locked ) {
  		list = "";
        }
      },
       
       // Call all callbacks with the given context and arguments
       // 用给定的上下文和参数调用所有的回调函数
       fireWith: function( context, args ) {
           // 根据locked，判断是否进行调用，
           // 传入了once参数，则locked为true
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
       // fire
       fire: function() {
           self.fireWith( this, arguments );
           return this;
       },
  ```

  上面的代码省去了`jQuery`中与`once`功能无关的代码，从上面的代码可以看出，当传入`once`参数后，`add`与`fire`都只能执行一次。

- 参数`memory`

  参数`memory`会保存最近一次调用的参数，并且在后面调用`add`方法是使用该参数调用添加进入`add`的函数

  ```javascript
  var callbacks = jQuery.callbacks('memory')
  function fn1 (value) {
      console.log('fn1 value: ' + value)
  }
  callbacks.add(fn1)
  callbacks.fire('foo') // 'fn1 value: foo'
  function fn2 (value) {
      console.log('fn2 value: ' + value)
  }
  callbacks.add(fn2) // 'fn2 value: foo'
  ```

  `jQuery`的源码中在第一个调用`fire`函数时，对`memory`参数进行了判断，若指定了`memory`参数，那么在下一次调用`add`函数的时候，就会先将`memory`中存储的上一次调用`fire`传入的参数推入`queue`的参数队队列中，然后指定其需要调用的函数队列的`index`，最后调用`fire`函数

  ```javascript
  add: function() {
      if (list) {
          // 指定了memory参数
          // 将保存的memory推入queue
          // 并且指定函数遍历的Index
          if (memory && !firing) {
           	firingIndex = list.length - 1;
              queue.push(memory)
          }
          // 递归添加函数
          (function add (args) {
              jQuery.each(args, function (_, arg) {
                  if (typeof arg === 'function') {
                      if (!options.unique || !self.has(arg)) {
                          list.push(arg);
                      }
                  } else if (arg && arg.length && typeof arg !== 'string') {
                   	// 类数组或者数组
                      add(arg);
                  }
              })
          })(arguments);
          // 传入memory参数，调用函数
          if (memory && !firing) {
              fire()
          }
      }
  },
      
  fire: function () {
      self.fireWith(this, arguments)
      return this
  }
  
  fireWith: function(context, args) {
      if (!locked) {
          // 处理传入的参数
          args = args || []
          args = [context, args.slice ? args.slice() : args]
       	queue.push(args)
          if (!firing) {
              fire()
          }
      }
   	return this
  }
  fire = function () {
      fired = firing = true
      for (; queue.length; firingIndex = -1) {
          // 双层循环遍历
          // 使用每一个参数来调用每一个函数
          memory = queue.shift()
          while (++firingIndex < list.length) {
              if (list[firingIndex].apply(memory[0], memory[1] === false && options.stopOnFalse)) {
               	firingIndex = list.length // 使其终止while循环
                  memory = false
              }
          }
      }
      // 没有传memory,则将其标识memory置为false
      // 在后面执行add函数时，不会调用fire函数
      if (!option.memory) {
          memory = false 
      }
      firing = false
      // other code
  }
  ```

- 参数`unique`

  参数`unique`指定同一个函数只能被添加一次，默认的情况下是可以重复添加的

  ```javascript
  var callbacks = jQuery.Callbacks();
  function fn1 (value) {
    console.log(value);
  }
  callbacks.add(fn1);
  callbacks.add(fn1);
  callbacks.fire('foo'); // foo foo
  
  // 使用unique参数
  var callbacks = jQuery.Callbacks('unique');
  function fn1 (value) {
    console.log(value);
  }
  callbacks.add(fn1);
  callbacks.add(fn1); // 添加不进去
  callbacks.fire('foo'); // foo
  ```

  在`jQuery`中对源码的处理很简单，就是在添加的时候进行了判断

  ```javascript
  add: function () {
      (function add(args) {
          jQuery.each(args, function (_, arg) {
              if (typeof arg === 'function') {
                  // 判断传入的函数参数是否已经在List函数队列中存在
                  if (!options.unique || !self.has(arg)) {
                      list.push(arg)
                  }
              } else if (arg && arg.length && typeof arg !== 'string') {
                  add(arg)
              }
          })
      })(arguments)
  }
  ```

- 参数`stopOnFalse`

  当指定了该参数，并且一个函数返回`false`，则中断函数队列中后续函数的执行

  ```javascript
  var callbacks = jQuery.callbacks('stopOnFalse')
  function fn1(value) {
      console.log('fn1 value:' + value)
      return false
  } 
  function fn2(value) {
      console.log('fn2 value: ' + value)
  }
  callbacks.add(fn1)
  callbacks.add(fn2)
  callbacks.fire('foo') // fn1 value: foo --> fn2中止了运行
  ```

  `jQuery`中对该参数的处理也很简单，主要是通过中止对`list`函数队列遍历的中止

  ```javascript
  fire = function () {
      for(; queue.length; firingIndex = -1) {
          memory = queue.shift()
          while(++firingIndex < list.length) {
              // 判断函数返回值以及是否传入stopOnFalse参数
              if (list[firingIndex].apply(memory[0], memory[1]) === false && option.stopOnFalse) {
                  firingIndex = list.length // 跳出while循环，中断list中后续函数执行
                  memory = false // 使add函数不再触发fire
                  }     
          }
      }
  }
  ```





  最后，对所`callbacks`进行详细的解释

  ```javascript
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
        // 判断当前函数队列是否被禁用
        disabled: function() {
          return !list;
        },
  
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
  ```


参考链接：

- [jQuery 2.0.3 源码分析 回调对象 - Callbacks](https://www.cnblogs.com/aaronjs/p/3342344.html)
- [jQuery.Callbacks()](https://api.jquery.com/jQuery.Callbacks/)