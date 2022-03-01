import {parse} from "@babel/parser";
import * as babel from '@babel/core';

const code = `let a = 'let'; let b = 2; const c = 3`
const ast = parse(code, {sourceType: 'module'});
// 直接将浏览器不兼容的es6语法转换为es5语法
const result = babel.transformFromAstSync(ast, code, {
    presets: ['@babel/preset-env']
})
console.log('result', result.code)

