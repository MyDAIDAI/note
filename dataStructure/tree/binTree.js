let binTree = {
  data: 'a',
  left: {
    data: 'b',
    left: {
      data: 'd'
    },
    right: {
      data: 'f',
      left: {
        data: 'e'
      }
    }
  },
  right: {
    data: 'c',
    left: {
      data: 'g',
      right: {
        data: 'h'
      }
    },
    right: {
      data: 'i'
    }
  }
}
function preTree(node) {
  if (!node) {
    return
  }
  console.log('pre', node.data)
  preTree(node.left)
  preTree(node.right)
}
preTree(binTree)

function inTree(node) {
  if (!node) {
    return
  }
  inTree(node.left)
  console.log('in', node.data)
  inTree(node.right)
}
inTree(binTree)


function postTree(node) {
  if (!node) {
    return
  }
  postTree(node.left)
  postTree(node.right)
  console.log('post', node.data)
}
postTree(binTree)
// 非递归实现前中后序遍历
// 使用一个栈来进行模拟
function InOrderTraversal(node) {
  let stack = []
  while (node || stack.length > 0) {
    while (node) {
      stack.push(node)
      node = node.left
    }
    let currentNode = stack.pop()
    console.log(currentNode.data)
    node = currentNode.right
  }
}
InOrderTraversal(binTree)