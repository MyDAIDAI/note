// 翻转二叉树，将左右子树交换
// 递归
function invertTree(root) {
    if(!root) return root;
    swap(root.left, root.right);
    invertTree(root.left);
    invertTree(root.right);
}


function compare(left, right) {
    if(left === null && right !== null) {
        return false;
    } else if(left !== null  && right === null) {
        return false;
    } else if(left.val !== right.val) {
        return false;
    }
    let outside = compare(left.left, right.right);
    let inside = compare(left.right, right.left);
    return outside && inside;
}
// 对称二叉树
function isSymmetric(node) {
    if(!root) return true;
    compare(node.left, node.right);
}

function getNodeNum(node) {
    if(!node) return 0;
    let leftNode = getNodeNum(node.left);
    let rightNode = getNodeNum(node.right);
    return leftNode + rightNode + 1
}

// 二叉树的所有路径
function getTreeAllPath(tree) {
    const list = [];
    function recursive(node, path, list) {
        if(!node.left && !node.right) {
            list.push(path.join('->'));
            return;
        }
        path.push(node.val);
        if(node.left) {
            recursive(node.left);
        }
        if(node.right) {
            recursive(node.right);
        }
    }
    recursive(tree, [], list)
}