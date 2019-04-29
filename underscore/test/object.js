(function () {
  var _ = window._
  QUnit.test('extendOwn', function (assert) {
    var result = _.extendOwn({}, {'a': 'a', 'b': 'b'})
    assert.strictEqual(result.a, 'a', 'extend own can extend an object with the attributes of another')

    result = _.extendOwn({'a': 'b'}, {'a': 'a'})
    assert.strictEqual(result.a, 'b', 'properties in source override destination')
  })
})()
