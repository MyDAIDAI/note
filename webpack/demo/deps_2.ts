import {parse} from '@babel/parser';
import traverse from "@babel/traverse";
import {readFileSync} from "fs";
import {resolve, relative, dirname} from 'path';

// 设置项目根目录的绝对路径
// /Users/didi/Source/note/webpack/demo/project_1
const projectRoot = resolve(__dirname, 'project_2')
// console.log('projectRoot', projectRoot)

// 类型声明
type DepRelation = {
  [key: string] : {
    deps: string[],
    code: string
  }
}
const depRelation: DepRelation = {}

// 获取文件相对于根目录的相对路径
function getProjectPath(path: string) {
  return relative(projectRoot, path).replace(/\\/g, '/')
}

// filePath: /Users/didi/Source/note/webpack/demo/project_1/index.js
function collectCodeAndDeps(filePath: string) {
  // filePath: 文件的绝对路径
  // key: 文件相对项目根目录的相对路径，index.js
  const key = getProjectPath(filePath)
  const code = readFileSync(filePath).toString()
  depRelation[key] = { deps: [], code }
  const ast = parse(code, {sourceType: 'module'})
  traverse(ast, {
    enter: item => {
      if(item.node.type === 'ImportDeclaration') {
        // 值是一个相对路径，先转换为绝对路径，然后转换为相对于入口文件filePath的路径
        const {value} = item.node.source
        // 获取绝对路径
        const dirnamePath = dirname(filePath)
        const depAbsolutePath = resolve(dirname(filePath), value)
        // 转为相对于项目的项目路径
        const depProjectPath = getProjectPath(depAbsolutePath)
        // 将依赖添加进去
        depRelation[key].deps.push(depProjectPath);
        // 递归进入文件，获取依赖
        collectCodeAndDeps(depAbsolutePath)
      }
    }
  })
}

// 将入口文件的绝对路径传入
collectCodeAndDeps(resolve(projectRoot, 'index.js'))

console.log(depRelation)
console.log('done')
