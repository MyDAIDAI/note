class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

function serialByPre(node) {
  if(node == null) {
    return '#_'
  }
  let str = `${node.value}_`
  str += serialByPre(node.left)
  str += serialByPre(node.right)
  return str
}
function serialByPreUnRecur(node) {
  if(node != null) {
    let res = ''
    let stack = []
    stack.push(node)
    while (stack.length != 0) {
      let data = stack.pop()
      res += data == null ? '#_' : `${data.value}_`
      if(data != null && data.right == null) {
        stack.push(data.right)
      }
      if(data && data.right != null) {
        stack.push(data.right)
      }
      if(data != null && data.left == null) {
        stack.push(data.left)
      }
      if(data && data.left != null) {
        stack.push(data.left)
      }
    }
    return res
  }
}
function serialByIn(node) {
  if(node == null) {
    return '#_'
  }
  let res = ''
  res += serialByIn(node.left)
  res += `${node.value}_`
  res += serialByIn(node.right)
  return res
}

function serialByInUnRecur(node) {
  if(node != null) {
    let stack = []
    let res = ''
    while (stack.length != 0 || node != null) {
      if(node != null) {
        stack.push(node)
        if(node.left == null) {
          stack.push(null)
        }
        node = node.left
      } else {
        let data = stack.pop()
        if(data != null && data.right == null) {
          stack.push(null)
        }
        res += data == null ? '#_' : `${data.value}_`
        node = data && data.right ? data.right : null
      }
    }
    return res
  }
}

function serialByPost(node) {
  if(node == null) {
    return '#_'
  }
  let res = ''
  res += serialByPost(node.left)
  res += serialByPost(node.right)
  res += `${node.value}_`
  return res
}

function serialByPostUnRecur(node) {
  if(node != null) {
    let stack1 = []
    let stack2 = []
    stack1.push(node)
    while (stack1.length != 0) {
      node = stack1.pop()
      stack2.push(node)

      if(node && node.left != null) {
        stack1.push(node.left)
      } else if(node && node.left == null) {
        stack1.push(null)
      }
      if(node && node.right != null) {
        stack1.push(node.right)
      } else if(node && node.right == null) {
        stack1.push(null)
      }
    }
    let str = []
    while (stack2.length != 0) {
      let data = stack2.pop()
      str += data == null ? '#_' : `${data.value}_`
    }
    return str
  }
}
function getNodeQueue(str) {
  str = str.split('_')
  let queue = []
  for (let index = 0; index < str.length; index++) {
    let item = str[index]
    if(item != '') {
      let node = item === '#' ? null : new Node(item)
      queue.push(node)
    }
  }
  return queue
}
function reconByPreString(str) {
  return reconPreOrder(getNodeQueue(str))
}
function reconPreOrder(queue) {
  if(queue.length == 0) return
  let node = queue.shift()
  if(node == null) return null
  node.left = reconPreOrder(queue)
  node.right = reconPreOrder(queue)
  return node
}
function reconByInString(str) {
  return reconByInOrder(getNodeQueue(str))
}
function reconByInOrder(queue) {
  if (queue == null) return
  let node = queue.shift()
  if (node == null) return null
  // node =
}








function main() {
  let head = new Node(1)
  let pre = serialByPre(head)
  console.log('pre',  pre)
  let node = reconByPreString(pre)
  console.log('pre node', node)

  pre = serialByPreUnRecur(head)
  console.log('un recur pre', pre)
  // node = reconByPreString(pre)
  // console.log('pre node', node)

  let inSerial = serialByIn(head)
  console.log('in', inSerial)
  // node = reconByPreString(pre)
  // console.log('pre node', node)

  inSerial = serialByInUnRecur(head)
  console.log('un recur in', inSerial)
  // node = reconByPreString(pre)
  // console.log('pre node', node)

  let post = serialByPost(head)
  console.log('post', post)
  // node = reconByPreString(pre)
  // console.log('pre node', node)

  post = serialByPostUnRecur(head)
  console.log('un recur post', post)
  // node = reconByPreString(pre)
  // console.log('pre node', node)

  head = new Node(1);
  head.left = new Node(2);
  head.right = new Node(3);
  head.left.left = new Node(4);
  head.right.right = new Node(5);
  pre = serialByPre(head)
  console.log('pre', pre)
  node = reconByPreString(pre)
  console.log('pre node', node)

  pre = serialByPreUnRecur(head)
  console.log('un recur pre', pre)
  // node = reconByPreString(pre)
  // console.log('pre node', node)

  inSerial = serialByIn(head)
  console.log('in', inSerial)
  // node = reconByPreString(pre)
  // console.log('pre node', node)

  inSerial = serialByInUnRecur(head)
  console.log('un recur in', inSerial)
  post = serialByPost(head)
  console.log('post', post)
  // post = serialByPostUnRecur(head)
  // console.log('un recur post', post)

  head = new Node(100);
  head.left = new Node(21);
  head.left.left = new Node(37);
  head.right = new Node(-42);
  head.right.left = new Node(0);
  head.right.right = new Node(666);
  pre = serialByPre(head)
  console.log('pre', pre)
  node = reconByPreString(pre)
  console.log('pre node', node)

  pre = serialByPreUnRecur(head)
  console.log('un recur pre', pre)
  inSerial = serialByIn(head)
  console.log('in', inSerial)
  inSerial = serialByInUnRecur(head)
  console.log('un recur in', inSerial)
  post = serialByPost(head)
  console.log('post', post)
  post = serialByPostUnRecur(head)
  console.log('un recur post', post)
}
main()
