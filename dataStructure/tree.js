// function dfsTraversal(node, fn) {
//   node = fn(node)
//   // nodeList.push(node)
//   if (node.children.length) {
//     for (var i = 0; i < node.children.length; i++) {
//       node.children[i] = dfsTraversal(node.children[i], fn)
//     }
//   }
//   return node;
// }
function dfsTraversal (node, nodeList, fn) {
  let newNode = fn(node, nodeList);
  nodeList.push(newNode);
  if (node.children.length) {
    let children = node.children
    for (let i = 0, len = children.length; i < len; i++) {
      newNode.children[i] = dfsTraversal(children[i], nodeList, fn).newNode;
    }
  }
  return { nodeList, newNode }
}
function Node(node) {
  this.name = node.name
  this.children = node.children
}
Node.prototype.setName = function (name) {
  this.name = name
}
var treeData = {
  name: 'root',
  children: [
      {
          name: 'children1',
          children: [
              {
                  name: 'children11',
                  children: [
                      {
                          name: 'children111',
                          children: []
                      }
                  ]
              },
              {
                  name: 'children12',
                  children: []
              }
          ]
      },
      {
          name: 'children2',
          children: []
      },
      {
          name: 'children3',
          children: []
      }
  ]
}
const data = dfsTraversal(treeData, [], (node) => {
  return new Node(node);
})
console.log('nodes', data);
