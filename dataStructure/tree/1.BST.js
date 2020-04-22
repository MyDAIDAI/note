// 二叉搜索树
// 结构：
// 1. 左子树都小于节点
// 2. 右子树都大于节点
// 查找：与当前节点进行比较, 小于则在其左子树中查找，大于则在右子树中查找
// 插入：与当前节点进行比较，小于则遍历左子树，再左子树中插入，否则进入右子树，在右子树中插入
// 删除：3中情况
//  1）删除叶子节点，则直接将其父节点的相关子树置为空
//  2）删除节点有一个子节点，使其父节点指向删除节点的子节点
//  3）删除节点有两个子节点，取右子树中的最小值或者左子树中的最大值代替（左子树的最大值/右子树的最小值可以确保其子节点只有一个或者没有）
// 查找最大值：一直向下查找最右边的节点
// 查找最小值：一直向下查找最左边的节点
//
function Node(value) {
    this.value = value;
    this.left = undefined;
    this.right = undefined;
}

/**
 * 向二叉查找树中插入元素
 * @param node
 * @param val
 * @return {Node|*}
 */
function put(node, val) {
    if (!node) {
        return new Node(val);
    }
    if (val > node.value) {
        node.right = put(node.right, val);
    } else if (val < node.value) {
        node.left = put(node.left, val)
    } else {
        console.log('当前节点已存在')
    }
    return node;
}
function get(node, val) {
    if (!node) {
        return;
    }
    if (val < node.data) {
        return get(node.left, val)
    } else if (val > node.data) {
        return get(node.right, val)
    }
    return node;
}
let arr = [7, 8, 0, 1, 2, 4, 5, 9];
let tree;
for (let index = 0; index < arr.length; index++) {
    tree = put(tree, arr[index]);
}
for (let index = 0; index < arr.length; index++) {
    tree = put(tree, arr[index]);
}
//function preTree(tree) {
//    if (!tree) return;
//    console.log('tree', tree.value);
//    preTree(tree.left);
//    preTree(tree.right);
//}
//preTree(tree)
console.log('tree', JSON.stringify(tree))
