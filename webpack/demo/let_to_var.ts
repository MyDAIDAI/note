import {parse} from "@babel/core";
import traverse from "@babel/traverse";
import generate from "@babel/generator";

const code = `let a = 'let'; let b = 2`;
// 将code 解析为一个AST语法树
const ast = parse(code, {sourceType: 'module'});
// 遍历递归AST语法树，可以在中间修改某个节点属性对应的
traverse(ast, {
    enter: item => {
        if(item.node.type === 'VariableDeclaration') {
            if(item.node.kind === 'let') {
                item.node.kind = 'var';
            }
        }
    }
})
// 将修改后的AST语法树生成为新的代码字符串
const result = generate(ast, {}, code);
console.log('ast', ast, result)