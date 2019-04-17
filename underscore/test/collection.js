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

})()