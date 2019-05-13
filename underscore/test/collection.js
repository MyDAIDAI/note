(function () {
  var _ = window._

  QUnit.module('Collections')

  QUnit.test('each', function (assert) {
    _.each([1, 2, 3], function(num, i) {
      assert.strictEqual(num, i + 1, 'each iterators provide value and iteraction count')
    })
    var answer = []
    _.each([1, 2, 3], function (num) {
      answer.push(num * this.multiplier)
    }, {multiplier: 5})
    assert.deepEqual(answer, [5, 10, 15], 'context object property accessed')

    answer = []
    _.each([1, 2, 3], function (num) { answer.push(num) })
    assert.deepEqual(answer, [1, 2, 3], 'can iterator a simple array')

    answer = []
    var obj = {one: 1, two: 2, three: 3}
    _.each(obj, function (value, key) {
      answer.push(key)
    })
    assert.deepEqual(answer, ['one', 'two', 'three'], 'iterator over objects works')

    answer = []
    obj.constructor.prototype.four = 4
    _.each(obj, function (value, key) {
      answer.push(key)
    })
    assert.deepEqual(answer, ['one', 'two', 'three'], 'iterator ignore the object prototype')

    var count = 0
    obj = {1: 'foo', 2: 'bar', 3: 'baz'}
    _.each(obj, function () { count++ })
    assert.strictEqual(count, 3, 'the function should be called 3 times')

    answer = 0
    _.each(null, function () { ++answer })
    assert.strictEqual(answer, 0, 'null should be called 0 times')

    answer = 0
    _.each(false, function () { ++answer })
    assert.strictEqual(answer, 0, 'false should be called 0 times')
  })

  QUnit.test('forEach', function (assert) {
    assert.strictEqual(_.forEach, _.each, 'forEach is an alias for each')
  })

  QUnit.test('look up iterator with context', function (assert) {
    _.each([true, false, 'yes', '', 0, 1, {}], function (context) {
      _.each([1], function (value) {
        // 将基本类型作为上下文对象传入时会将其转换为包装对象
        console.log('value this', value, this, context)
        // value this 1 Boolean {true} true
        // value this 1 Boolean {false} false
        // value this 1 String {"yes"} yes
        // value this 1 String {""} 
        // value this 1 Number {0} 0
        // value this 1 Number {1} 1
        // value this 1 {} {}
        assert.strictEqual(typeof this, 'object', 'context is a wrapped primitive')
        assert.strictEqual(this.valueOf(), context, 'the unwrapped context is the specified primitive')
        assert.equal(this, context, 'context can be coerced to the specified primitive')
      }, context)
    })
  })
  
  QUnit.test('map', function (assert) {
    _.map([1, 2, 3], function(num, i) {
      assert.strictEqual(num, i + 1, 'map iterators provide value and iteraction count')
    })
    
    var answer = _.map([1, 2, 3], function (num) {
      return num * this.multiplier
    }, {multiplier: 5})
    assert.deepEqual(answer, [5, 10, 15], 'context object property accessed')

    answer = _.map([1, 2, 3], function (num) { return num })
    assert.deepEqual(answer, [1, 2, 3], 'can iterator a simple array')

    
    var obj = {one: 1, two: 2, three: 3}
    answer = _.map(obj, function (value, key) {
      return key
    })
    assert.deepEqual(answer, ['one', 'two', 'three'], 'iterator over objects works')

    obj.constructor.prototype.four = 4
    answer =_.map(obj, function (value, key) {
      return key
    })
    assert.deepEqual(answer, ['one', 'two', 'three'], 'iterator ignore the object prototype')

    var count = 0
    obj = {1: 'foo', 2: 'bar', 3: 'baz'}
    _.map(obj, function () { count++ })
    assert.strictEqual(count, 3, 'the function should be called 3 times')

    answer = 0
    _.map(null, function () { ++answer })
    assert.strictEqual(answer, 0, 'null should be called 0 times')

    answer = 0
    _.map(false, function () { ++answer })
    assert.strictEqual(answer, 0, 'false should be called 0 times')
  })

  QUnit.test('reduce', function (assert) {
    var answer = 0
    answer = _.reduce([1, 2, 3, 4], function (memo, value, index, list) {
      return memo + value
    }, 1)
    assert.strictEqual(answer, 11, 'the value should be equal to 11')

    answer = _.reduce([1, 2, 3, 4], function (memo, value, index, list) {
      return memo + value
    })
    assert.strictEqual(answer, 10, 'the value should be equal to 10')

    var obj = {'foo': 1, 'bar': 2, 'baz': 3}
    answer = _.reduce(obj, function (memo, value) { 
      return memo + value
    }, 10)
    assert.strictEqual(answer, 16, 'the test of object value should be equal to 16')

    var obj = {'foo': 'foo', 'bar': 'bar', 'baz': 'baz'}
    answer = _.reduce(obj, function (memo, value) { 
      return memo + value
    }, '')
    assert.strictEqual(answer, 'foobarbaz', 'the test of object string value should be equal to foobarbaz')
  })
  QUnit.test('reduceRight', function (assert) {
    var list = _.reduceRight(['foo', 'bar', 'baz'], function (memo, str) {
      return memo + str
    }, '')
    assert.strictEqual(list, 'bazbarfoo', 'can perform right folds')

    list = _.reduceRight(['foo', 'bar', 'baz'], function (memo, str) {
      return memo + str
    })
    assert.strictEqual(list, 'bazbarfoo', 'default inital value')

    var sum = _.reduceRight({a: 1, b: 2, c: 3}, function (memo, num) {
      return memo + num
    })
    assert.strictEqual(sum, 6, 'default inital object')

    assert.strictEqual(_.reduceRight(null, _.noop, 138), 138, 'handles a null (with initial value) properly')
    assert.strictEqual(_.reduceRight([_], _.noop), _, 'collection of length one with no initial value returns the first item')
    assert.strictEqual(_.reduceRight([], _.noop, void 0), void 0, 'undefined can be passed as a special case')
    assert.strictEqual(_.reduceRight([], _.noop), void 0, 'return undefined when collection is empty and no initial value')
  })

  QUnit.test('findIndex', function (assert) {
    let index = _.findIndex([1, 2, 3], function (value) {
      return value === 1
    })
    assert.strictEqual(index, 0, 'find index from array')
  })
  QUnit.test('findLastIndex', function (assert) {
    let index = _.findLastIndex([1, 2, 3], function (value) {
      return value === 3
    })
    assert.strictEqual(index, 2, 'find index from array')
  })
  QUnit.test('find', function (assert) {
    let result = _.find([1, 2, 3], function (value) {
      return value === 1
    })
    assert.strictEqual(result, 1, 'find 1 from array')
  })
  QUnit.test('filter', function (assert) {
    var evenArray = [1, 2, 3, 4, 5, 6]
    var evenObject = {one: 1, two: 2, three: 3}
    var isEven = function (num) { return num % 2 === 0 }

    assert.deepEqual(_.filter(evenArray, isEven), [2, 4, 6])
    assert.deepEqual(_.filter(evenObject, isEven), [2])
    // assert.deepEqual(_.filter([{}, evenObject, []], 'two'), )

    // var list = [{a: 1, b: 2}, {a: 2, b: 2}, {a: 1, b: 3}, {a: 1, b: 4}]
    // assert.deepEqual(_.filter(list, {a: 1}), [{a: 1, b: 2}, {a: 1, b: 3}, {a: 1, b: 4}])
    // assert.deepEqual(_.filter(list, {b: 2}, [{a: 1, b: 2}, {a: 2, b: 2}]))
    // assert.deepEqual(_.filter(list, {}), list, 'empty object accepts all items')

    _.filter([1], function () {
      assert.strictEqual(this, evenObject, 'given context')
    }, evenObject)
  })
  
})()