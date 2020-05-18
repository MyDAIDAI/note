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

function main() {
  let head = new Node(1)
  let pre = serialByPre(head)
  console.log('pre',  pre)
  pre = serialByPreUnRecur(head)
  console.log('un recur pre', pre)
  let inSerial = serialByIn(head)
  console.log('in', inSerial)
  inSerial = serialByInUnRecur(head)
  console.log('un recur in', inSerial)
  let post = serialByPost(head)
  console.log('post', post)


  head = new Node(1);
  head.left = new Node(2);
  head.right = new Node(3);
  head.left.left = new Node(4);
  head.right.right = new Node(5);
  pre = serialByPre(head)
  console.log('pre', pre)
  pre = serialByPreUnRecur(head)
  console.log('un recur pre', pre)
  inSerial = serialByIn(head)
  console.log('in', inSerial)
  inSerial = serialByInUnRecur(head)
  console.log('un recur in', inSerial)
  post = serialByPost(head)
  console.log('post', post)

  head = new Node(100);
  head.left = new Node(21);
  head.left.left = new Node(37);
  head.right = new Node(-42);
  head.right.left = new Node(0);
  head.right.right = new Node(666);
  pre = serialByPre(head)
  console.log('pre', pre)
  pre = serialByPreUnRecur(head)
  console.log('un recur pre', pre)
  inSerial = serialByIn(head)
  console.log('in', inSerial)
  inSerial = serialByInUnRecur(head)
  console.log('un recur in', inSerial)
  post = serialByPost(head)
  console.log('post', post)
}
main()