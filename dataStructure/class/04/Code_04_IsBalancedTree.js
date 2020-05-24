class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}
function isBalance(head) {
  if(!head) return true
  let res = true
  res = getHeight(head).isB
  return res
}
function getHeight(head) {
  if(!head) {
    return {
      isB: true,
      h: 0
    }
  }
  let leftData = getHeight(head.left)
  if(!leftData.isB) {
    return {
      isB: false,
      h: leftData.h
    }
  }
  let rightData = getHeight(head.right)
  if(!rightData.isB) {
    return {
      isB: false,
      h: rightData.h
    }
  }
  let h = Math.max(leftData.h, rightData.h) + 1
  let isB = Math.abs(leftData.h - rightData.h) <= 1
  return {
    h,
    isB
  }
}
function main() {
  let node = new Node(1)
  node.left = new Node(2)
  node.right = new Node(3)
  node.left.left = new Node(4)
  node.left.right = new Node(5)
  node.right.left = new Node(6)
  node.right.right = new Node(7)
  console.log(isBalance(node))
}
main()
