# ES6 模块化

## 基本语法

1. ```js
   export
   import
   ```



## 开发环境配置

1. `babel ` --  将`es6`语法转为浏览器接受的语法
   - `npm init`
   - `npm install --save-dev babel-core babel-preset-es2015 babel-preset-latest`
   - 新建配置文件`.babelrc`，填写相关配置
   - 安装`babel`全局框架，`npm install -g babel-cli`
   - 运行 `bable index.js`
2. `webpack `  -- 模块化工具
   - `npm init`
   - `npm intall --save-dev webpack babel-loader`
   - 新建配置文件`webpack.config.js`，填写相关配置
   - `package.json` 中添加`start`命令
3. `rollup` -- 打包模块化，功能单一，`webpack`的功能强大
   - `npm init`
   - `npm install rollup rollup-plugin-node-resolve rollup-plugin-babel babel-plugin-external-helpers babel-preset-latest`
   - 配置`babel`，添加配置文件`.babelrc`
   - 配置`rollup`，添加配置文件`rollup.config.js`
   - `package.json`中添加 `start`命令：`rollup -c rollup.config.js`
   - 运行`npm start`

## 模块化标准

1. `CommonJS`
   - 语法：`require('utils')`
   - `nodejs`端使用，浏览器端不兼容
   - 必须导入完整的库，`import {ajax} from 'utils'`可以实现按需导入
   - `require`为同步执行，会导致浏览器等待时间过长，所以浏览器只能使用异步加载`asynchronous`  --> `AMD`产生背景
2. `AMD` -- `Asynchronous Module Definition`
   - 采用异步加载，模块的加载不影响后面代码的运行，所有依赖模块的语句，都被定义在一个回调函数中，等依赖加载完成后再执行
   - 语法：`require([module], callback)`
   - 模块定义：`define([module], function() {})`，模块引用：`require([module], function() {})`
   - 需要加载未按照模块定义的库时，需要在引用文件前使用`require.config({shim: {}})` --> `shim`属性：配置不兼容模块
3. `CMD` --> 未大量使用
4. `export`与`import`
5. 关于模块化标准
   1. 没有模块化
   2. `CommonJS`在`nodejs`中使用
   3. `AMD`成为标准，少量`CMD`
   4. 前端统一打包工具`webpack`，`rollup`
   5. `es6`中的统一现在所有的模块化标准`export`，`import`
   6. `Nodejs`已支持`es6`标准，但浏览器尚未统一