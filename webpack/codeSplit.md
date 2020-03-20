# `webpack`之代码分割

## 默认配置

### 静态引入
文件夹中有如下文件`a.js`, `main.js`, `webpack.config.js`

`a.js`中为空，没有任何内容
`main.js`有以下内容，在`main.js`中静态引入 `a.js`文件
```javaScript
require('./a')
```
`webpack.config.js`中有如下配置：
```javaScript
var path = require("path");
module.exports = {
	// mode: "development || "production",
	entry: {
		main: "./main.js"
	},
	optimization: {
		runtimeChunk: true
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].[chunkhash].js",
		chunkFilename: "[name].[chunkhash].js"
	}
};
```
执行`webpack`后生成
```
Hash: 9523fd6b60546b96dcd3
Version: webpack 4.0.1
Time: 188ms
Built at: 2020-3-20 10:39:09
                               Asset       Size  Chunks             Chunk Names
runtime~main.297929bbe0221ed990a6.js   1.04 KiB       0  [emitted]  runtime~main
        main.299c9fb303eac4ae26b4.js  106 bytes       1  [emitted]  main
Entrypoint main = runtime~main.297929bbe0221ed990a6.js main.299c9fb303eac4ae26b4.js
   [0] ./a.js 0 bytes {1} [built]
   [1] ./main.js 14 bytes {1} [built]
```
从上面的输出可以看出打包生成了两个文件，`a.js`与`main.js`被打包在了一个文件（`main.[hash].js`）中，现在如果修改`main.js`中的内容，那么打包生成的`main.[hash].js`文件中的`hash`值就会改变

```
Hash: cd22467756a6795f289f
Version: webpack 4.0.1
Time: 195ms
Built at: 2020-3-20 10:45:57
                               Asset       Size  Chunks             Chunk Names
runtime~main.297929bbe0221ed990a6.js   1.04 KiB       0  [emitted]  runtime~main
        main.1bda243ef4d11d13ddf8.js  134 bytes       1  [emitted]  main
Entrypoint main = runtime~main.297929bbe0221ed990a6.js main.1bda243ef4d11d13ddf8.js
   [0] ./a.js 0 bytes {1} [built]
   [1] ./main.js 42 bytes {1} [built]

```
由于`main.js`改变了，所以生成的`hash`值改变了，则浏览器就会从服务器拿去新的文件，那么`a.js`的内容就重复下载了，就会影响渲染性能

### 动态引入
将`main.js`修改为`import('./a')`，执行`webpack`
```
Hash: 99cbd0196295cf1b8534
Version: webpack 4.0.1
Time: 222ms
Built at: 2020-3-20 10:49:25
                               Asset       Size  Chunks             Chunk Names
           0.80707e7649458ec4bb5c.js   77 bytes       0  [emitted]
runtime~main.3e2775f464046a6b28ec.js   1.78 KiB       1  [emitted]  runtime~main
        main.82611f06e39d5a71b33f.js  217 bytes       2  [emitted]  main
Entrypoint main = runtime~main.3e2775f464046a6b28ec.js main.82611f06e39d5a71b33f.js
   [0] ./main.js 13 bytes {2} [built]
   [1] ./a.js 0 bytes {0} [built]
```
从上面的输出可以看出，对于动态引入，`webpack`会将其单独打包为一个`chunk`，这个时候再修改`main.js`文件，那么只会修改`main.[hash].js`的文件名，而没有修改`a.js`打包后的文件名，这样浏览器就会从缓存中读取该文件，依次达到性能的目的
```
Hash: f7a8104c145a2709028d
Version: webpack 4.0.1
Time: 222ms
Built at: 2020-3-20 10:51:56
                               Asset       Size  Chunks             Chunk Names
           0.80707e7649458ec4bb5c.js   77 bytes       0  [emitted]
runtime~main.3e2775f464046a6b28ec.js   1.78 KiB       1  [emitted]  runtime~main
        main.f035888e43f53e84c52d.js  247 bytes       2  [emitted]  main
Entrypoint main = runtime~main.3e2775f464046a6b28ec.js main.f035888e43f53e84c52d.js
   [0] ./main.js 43 bytes {2} [built]
   [1] ./a.js 0 bytes {0} [built]
```

## `optimization.splitChunks`
配置`optimization.splitChunks`，可以自定义自己的打包需求，让其更适合自己的项目

- `chunks`
  - `all`, 会将`node_modules`中的包打包进入`vendor.[chunkhash].js`文件中，如果文件较小会被合并
  ```
  Hash: 5f26063d7d27bcd69c85
  Version: webpack 4.0.1
  Time: 197ms
  Built at: 2020-3-20 14:36:54
                                Asset       Size  Chunks             Chunk Names
  vendors~main.0138bed13b27e583859f.js  108 bytes       0  [emitted]  vendors~main
          main.02c9cc9555efd5615d42.js   1.12 KiB       1  [emitted]  main
  Entrypoint main = vendors~main.0138bed13b27e583859f.js main.02c9cc9555efd5615d42.js
    [3] ./main.js 136 bytes {1} [built]
      + 3 hidden modules
  ```
  - `async`, 优先考虑动态模块的加载，会把动态模块单独打包出来
  ```
  Hash: ad12b9cdb4ff4f52cc59
  Version: webpack 4.0.1
  Time: 217ms
  Built at: 2020-3-20 14:41:20
                        Asset      Size  Chunks             Chunk Names
    0.e82e196f159472e39f0e.js  78 bytes       0  [emitted]
  main.effa2d16e2e8b34292c2.js  1.84 KiB       1  [emitted]  main
  Entrypoint main = main.effa2d16e2e8b34292c2.js
    [3] ./main.js 135 bytes {1} [built]
    [4] ./a.js 0 bytes {0} [built]
      + 3 hidden modules
  ```

- `cacheGroups`, 允许自定义规则分离`chunk`, 并且每条`cacheGroups`规则下都允许定义上面提到的`chunks`和`minSize`字段用于覆盖全局配置

## 优化分包策略
- 对于不经常改变的第三方类库，可以将其分离，打包为单独的文件中，利用浏览器缓存，优化加载速度
- 对于第三方类库中的大文件，可以单独打包出来
- 对应用代码进行分离，抽取公用组件单独打包
- 对于`polyfills`，打包为单独的`chunk`, 然后对浏览器判断，如果需要，再进行动态加载
- 基于路由的动态加载，使用异步动态加载需要的组件


## 优化开发体验
当代码不断增多的时候，打包速度也在不断增长。但是`node_modules`中的库文件应该是一直不变的，不需要被重新编译，这个时候就可以使用`DLL`技术


参考
- [深入理解 Webpack 打包分块（上）](https://juejin.im/post/5cdfb48fe51d4510ac6721b7#heading-5)
- [深入理解 Webpack 打包分块（下）](https://juejin.im/post/5cdfb5abf265da1b7c60e7b7#heading-8)
