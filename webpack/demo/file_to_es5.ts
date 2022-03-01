import {parse} from "@babel/parser";
import * as babel from '@babel/core';
import * as fs from 'fs'

// 同步读取test.js文件中的代码，并将其转换为字符串
const code = fs.readFileSync('./test.js').toString();
// 将字符串代码解析为AST语法树
const ast = parse(code, {sourceType: 'module'});
// 将AST语法树中的ES6语法转换为ES5语法
const result = babel.transformFromAstSync(ast, code, {
    presets: ['@babel/preset-env']
})
// 将结果同步写入test.es5.js中
fs.writeFileSync('./test.es5.js', result.code)