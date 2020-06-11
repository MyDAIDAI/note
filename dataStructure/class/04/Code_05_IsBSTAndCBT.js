class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}
function isBST(head) {
  let data = []
  inOrder(head, data)
  let is = true
  for (let index = 0, len = data.length; index < len; index++) {
    if(data[index] > data[index + 1]) {
      is = false
      break
    }
  }
  return is
}
function inOrder(head, data) {
  if(!head) return
  inOrder(head.left, data)
  data.push(head.value)
  inOrder(head.right, data)
}
function main() {
  let node = new Node(4)
  node.left = new Node(2)
  node.right = new Node(6)
  node.left.left = new  Node(1)
  node.left.right = new Node(3)
  node.right.left = new Node(5)
  console.log(isBST(node))
}
main()