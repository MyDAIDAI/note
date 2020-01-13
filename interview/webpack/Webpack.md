# 面试题之`webpack`

## 对`webpack`的看法

`webpack`是一个打包工具，可以使用它管理项目的模块依赖，并编译输出模块所需要的静态文件，它可以很好的管理、打包开发中所用到的`html`、`css`、`javascript`以及静态文件。对于不同类型的依赖，`wepack`有对应的模块加载器，而且会分析模块之间的依赖关系，最后合并生成优化后的静态资源

## `webpack`的基本功能和工作原理

- 代码转换；将`TypeScript`编译为`javascript`，`scss`编译为`css`等

- 文件优化：压缩`javascript`、`css`、`html`代码、压缩合并图片等等

- 代码分割：提取多个页面的公共代码，提取首屏不需要执行部分的代码使其异步加载

- 模块合并：在采用模块化的项目中有很多模块和文件，需要构建功能把模块分类合并为一个文件

- 自动刷新：监听本地源代码的变化，自动构建，刷新浏览器

- 代码校验：在代码被提交到仓库之前需要检测代码是否符合规范，以及单元测试是否通过

- 自动发布：更新发代码后，自动构建出线上发布代码并上传发布

## `webpack`常用插件

- `HotModuleReplacementPlugin`与`devServer`: 热更新
  
- `webpack.DefinePlugin`: 全局变量定义

- `HtmlWebpackPlugin`: 复制`html`模板并将打包后的静态资源插入

- `devtool: '#source-map'`: 报错定位插件

- `UglifyJsPlugin`: `js`压缩插件

- `OptimizeCSSPlugin`: `css`优化插件

- `CopyWebpackPlugin`: 复制静态文件

- `webpack.optimize.CommonsChunkPlugin`: 共有模块抽取插件
  
## `webpack`构建过程

- 从`enrty`里配置的`module`开始递归解析`entry`依赖的所有`module`

- 每找到一个`module`，就会根据配置的`loader`去找对应的转换规则

- 对`module`进行转换后，再解析出当前`module`所依赖的`module`

- 这些模块会以`entry`为单位进行分组，一个`entry`和其他所有依赖的`module`被分到一组`chunk`

- 最后`webpack`会把所有的`chunk`转换为文件输出  