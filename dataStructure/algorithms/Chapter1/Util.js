function Node(val) {
  this.val = val
  this.next = null
}
module.exports = {
  testList(callback) {
    let node = new Node(0)
    let arr = [1, 2, 3, 4, 5]
    arr.reduce((pre, cur, index, arr) => {
      return pre.next = new Node(cur)
    }, node)
    console.log('origin list', JSON.stringify(node))
    let args = Array.prototype.slice.call(arguments, 1)
    console.log('after edit', JSON.stringify(callback.apply(this, [node, ...args])))
  }
}