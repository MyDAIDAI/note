(function () {
  var _ = window._

  QUnit.module('Object')

  QUnit.test('extendOwn', function (assert) {
    var result = _.extendOwn({}, {'a': 'a', 'b': 'b'})
    assert.strictEqual(result.a, 'a', 'extend own can extend an object with the attributes of another')

    result = _.extendOwn({'a': 'b'}, {'a': 'a'})
    assert.strictEqual(result.a, 'b', 'properties in source override destination')
  })

  QUnit.test('isMatch', function (assert) {
    var moe = {name: 'Moe Howard', hair: true}
    var curly = {name: 'Curly Howard', hair: true}

    assert.strictEqual(_.isMatch(moe, {hair: true}), true, 'Returns a boolean')
    assert.strictEqual(_.isMatch(curly, {hair: true}), true, 'Returns a boolean')

    assert.strictEqual(_.isMatch(null, {}), true, 'empty spec called with null object return true')
    assert.strictEqual(_.isMatch(null, {a: 1}), false, 'non-empty spec called with null object returns false')

    // 检测原型上的属性是否可用
    function Prototest () {}
    Prototest.prototype.x = 1
    var specObj = new Prototest()
    assert.strictEqual(_.isMatch({x: 1}, specObj), true, 'can handle property in prototype')

    specObj.y = 5
    assert.strictEqual(_.isMatch({x: 1, y: 5}, specObj), true)
    assert.strictEqual(_.isMatch({x: 1, y: 4}, specObj), false)

    assert.ok(_.isMatch(specObj, {x: 1, y: 5}), 'inherited and own properties are checked on the test object')

    Prototest.x = 5
    assert.ok(_.isMatch({x: 5, y: 1}, Prototest), 'spec can be a function')

    assert.strictEqual(_.isMatch({b: 1}, {a: void 0}), false, 'handles undefined values')

    _.each([true, 5, NaN, null, void 0], function (item) {
      assert.strictEqual(_.isMatch({a: 1}, item), true, 'treats primitives as empty')
    })
  })

  QUnit.test('matcher', function (assert) {
    var moe = {name: 'Moe', hair: true}
    var curly = {name: 'Curly', hair: false}
    var stooges = [moe, curly]

    assert.strictEqual(_.matcher({hair: true})(moe), true, 'returns a boolean')
    assert.strictEqual(_.matcher({hair: true})(curly), false, 'returns a boolean')

    assert.strictEqual(_.matcher({})(null), true, 'empty spec called with null object returns true')
    assert.strictEqual(_.matcher({a: 1})(null), false, 'non-empty called with null object returns false')

    assert.strictEqual(_.find(stooges, _.matcher({hair: false})), curly, 'returns a predicate that can be used by finding functions')
    assert.strictEqual(_.find(stooges, _.matcher(moe)), moe, 'can be used to locate an object exists in a collection')

    // 检测原型上的属性是否可用
    function Prototest () {}
    Prototest.prototype.x = 1
    var specObj = new Prototest()
    assert.strictEqual(_.matcher({x: 1})(specObj), true, 'can handle property in prototype')

    specObj.y = 5
    assert.strictEqual(_.matcher({x: 1, y: 5})(specObj), true)
    assert.strictEqual(_.matcher({x: 1, y: 4})(specObj), false)

    assert.ok(_.matcher(specObj)({x: 1, y: 5}), 'inherited and own properties are checked on the test object')

    Prototest.x = 5
    assert.ok(_.matcher(Prototest)({x: 5, y: 1}), 'spec can be a function')

    assert.strictEqual(_.matcher({b: 1})({a: void 0}), false, 'handles undefined values')

    _.each([true, 5, NaN, null, void 0], function (item) {
      assert.strictEqual(_.matcher(item)({a: 1}), true, 'treats primitives as empty')
    })

  })
})()
