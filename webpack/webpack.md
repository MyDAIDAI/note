# `Webpack`入门

在`webpack`中，将项目作为一个整体，通过一个给定的主文件(如`index.js`)，`webpack`将从这个文件开始找到项目中所需要的依赖文件，使用`loaders`进行处理，最后打包为一个（或多个）浏览器可以识别的`javascript`文件。

`Grunt/Gulp`是在一个配置文件中，指明对某些文件进行编译、组合以及压缩等任务的具体步骤，然后进行自动完成

## `Getting Started`

### `Modules`

在开发项目时，会将代码分割为各个模块，然后根据需要进行导入。在`webpack`中，可以支持各种模块导入的语法：

1. `ES6 export/import`
2. `Commonjs require`
3. `AMD define`
4. `Css @import`

### `Configuration`

`webpack4`中没有要求需要`configuraion`文件，但是在复杂的项目之中，还是需要进行`webpack`配置，步骤如下:

1. 创建 `webpack`配置文件，`webpack.config.js`

2. 在`webpack.config.js`中添加如下配置:

   ```javascript
   const path = require('path')
   module.exports = {
       entry: './src/index.js',
       output: {
           filename: 'main.js',
           path: path.resolve(__dirname, 'dist')
       }
   }
   ```

3. 在终端运行 `npx webpack --config webpack.config.js`

如果`webpack.config.js`文件存在，那么`wepack`命令就会默认选择该配置文件，使用`--config`选项可以指定其他配置文件进行构建

### `NPM Scripts`

将`webpack`命令添加到`NPM Scripts`中，可以更加方便的使用命令

1. 在`package.json`文件的`scripts`属性中添加 `"build": "webpack"`
2. 执行脚本中的命令`npm run build`

## `Asset Management`

在项目中，通常都会有很多的静态资源，比如引入的图片呀之类的。在`webpack`中，静态文件的构建需要与之对应的`loaders`进行编译

### `Loading CSS`

1. 安装`css loader`: `npm install --save-dev style-loader css-loader`

2. 在`webpack`的配置文件中，添加`css loader`配置

   ```javascript
   module.rules = [
       {
           test: /\.css$/,
           use: [
               'style-loader',
               'css-loader'
           ]
       }
   ]
   ```

构建项目之后，`webpack`会在`html`中的`<head>`标签中插入`<style>`标签以及样式

### `Loading Images`

1. 使用`file-loader`，安装`file-loader`：`npm install --save-dev file-loader`

2. `webpack.config.js`的`module.rules`中添加配置

   ```javascript
   {
       test: /\.(png|svg|jpg|gif)$/,
       use: ['file-loader']
   }
   ```

构建项目之后，引入的图片会被处理，然后被放入在`output`指定的输出路径中

### `Loading Fonts`

`file-loader`和`url-loader`加载器可以获取所需要加载的任何文件然后输出到构建目录中，这也就是说，可以使用`file-loader`或者`url-loader`开加载`Fonts`

### `Loading Data`

其他需要 加载的资源就是数据，比如`json`、`CSVs`、`TSVs`、以及`xml`。由于对`json`的支持是内置的，所以在使用的时候，直接引入即可`import Data from './data.json'`，其他的文件则需要使用对应的`loader`来进行处理

## `Output Management`

在需要输出多个打包文件或者文件名需要添加哈希值的时候使用，修改`webpack.config.js`文件

```javascript
entry: {
    app: './src/index.js'
},
output: {
	filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
}
```

### `Setting up HtmlWebpackPlugin`

每一次修改入口文件名都需要修改`html`中所引入的文件名，并且当使用哈希值来构建文件的时候，也需要手动修改引入文件，这样很不方便。`HtmlWebpackPlugin`插件就可以来解决这个问题

1. 安装`HtmlWebpackPlugin`插件： `npm install --save-dev html-webpack-plugin`

2. 在`webpack.config.js`中添加下面配置:

   ```javascript
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   plugins: [
       new HtmlWebpackPlugin({
           title: 'add htmlWebpackPlugin'
       })
   ]
   ```

在构建之后，会生成一个`index.html`文件（原来存在则覆盖），该文件会自动的引入`entry`中配置的入口文件。

`HtmlWebpackPlugin`详细配置见:  [`HtmlWebpackPlugin`]( <https://github.com/jantimon/html-webpack-plugin>)

`HtmlWebpackTemplate`详细配置见: [`HtmlWebpackTemplate`]( <https://github.com/jaketrent/html-webpack-template>)

### `Cleaning up the /dist folder`

在每一次构建之后都会产生新的文件，但是`webpack`不会去追踪那些文件在使用，那些文件不使用。所以在每一次构建之前，都需要将构建文件夹中的内容进行删除，可以用`CleanWebpackPlugin`来进行

1. 安装`CleanWebpackPlugin`插件: `npm install --save-dev clean-webpack-plugin`

2. 在`webpack.config.js`中添加配置：

   ```javascript
    const CleanWebpackPlugin = require('clean-webpack-plugin')
    plugins: [
        new CleanWebpackPlugin(['dist']) // 构建之前会删除 dist 目录
    ]
   ```

### `The Manifest`
使用`webpack-manifest-plugin`插件，在构建之后会生产`manifest.json`文件，这个文件中包含`webpack`在构建时所追踪的所有模块。
1. 安装`webpackManifestPlugin`: `npm install --save-dev webpack-manifest-plugin`

2. 在`webpack.config.js`中添加配置：
    ```javascript
    const ManifestPlugin = require('webpack-manifest-plugin')
    plugins: [
        new ManifestPlugin()
    ]
    ```
详细配置见: [webpackManifestPlugin]( https://github.com/danethurber/webpack-manifest-plugin)

## `Development`
在项目的开发过程中，开发所使用的`webpack`配置与上线打包的配置会有所不同，所以我们需要分模块来进行配置，在`webpack.config.js`中添加`mode`属性为`development`，下面介绍几个在开发中所使用到的配置

### `Using source map`
开发过程中，在项目构建之后，如果一个文件中有错误，那么在浏览器中提示的报错信息就为打包之后的文件，不能知道是哪一个模块文件报的错，不利于排错与维护。所以`wepack`提供了`source-map`来进行

在 `webpack.config.js` 中添加 `devtool: 'inline-source-map'`即可

### `Choosing a Development Tool`
在每一次修改代码之后都需哟手动运行`npm run build`来打包代码是十分麻烦的，在`webpack`中有一些工具可以自动的进行打包
1. `webpack's watch mode`

2. `webpack-dev-server`

3. `webpack-dev-middleware`

下面分别介绍三个工具

#### `Using watch mode`
在`webpack`的`watch`模式下，它会监听依赖图中的所有文件的改变，当其中有文件发送改变的时候，`webpack`就会自动的进行编译打包，在`package.json`中添加脚本 `"watch": "webpack --watch"`即可

#### `Using webpack-dev-server`
`webpack-dev-server`提供了一个简单的`web`服务，可以实现实时加载
1. 安装`webpack-dev-server`: `npm install --save-dev webpack-dev-server`

2. `webpack.config.js`中添加配置
    ```javascript
    devServer: {
        contentBase: './dist' // webpack将dist目录作为跟目录，开启 localhost:8080 服务
    }
    ```

3. `package.json`中添加运行脚本: `"start": "webpack-dev-server --open"`

页面引用的打包文件路径可以使用`publicPath`进行配置，其他详细配置见[webpack-dev-server](https://webpack.js.org/configuration/dev-server/)

#### `Using webpack-dev-middleware`
`webpack-dev-middleware`是一个包装器，它将会向服务器发出由`webpack`处理的文件，在`webpack-dev-server`插件内部也被使用，但也可以作为一个单独的包进行使用。下面将结合`webpack-dev-middleware`与`express`进行使用
1. 安装`webpack-dev-middle`与`express`: `npm install --save-dev webpack-dev-middleware express`

2. `webpack.config.js`中添加配置
    ```javascript
    output: {
        publicPath: '/'
    }
    ```

3. 项目中新建`server.js`文件，并添加配置
    ```javascript
    const express = require('express')
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')

    const app = express()
    const config = require('./webpack.config.js')
    const compiler = webpack(config)

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.pubilcPath
    }))
    app.listen(3000, function () {
        console.log('app listening on port 3000')
    })
    ```

4. 在`package.json`中添加脚本`"server": "node server.js"`

#### 区别（后续）

## `Hot Module Repalcement`
`HMR`可以让各种模块进行实时的更新而不需要进行重启浏览器，也不需要重新刷新浏览器

### `Enabling HMR`
需要使用`HMR`功能，只需要更新`webpack-dev-server`的配置，然后使用`webpack`内置的`HMR`插件即可。

在`webpack.config.js`中添加配置
```javascript
const webpack = require('webpack')
devServer: {
    contentBase: './dist',
    hot: true
},
plugins: [
    new webpack.HotModuleReplacementPlugin()
]
```

执行`npm run start`之后，修改其中的文件内容，`webpack`会自动进行打包

深入理解:
使用`HMR`，在修改代码并且保存之后，`webpack`会对代码进行重新打包并将新的模块发送到浏览器端，浏览器通过新的模块替换老的模块，这样在不刷新浏览器的前提下就能够对应用进行更新。比如，在开发页面的时候，修改其中的样式然后保存，在浏览器没有刷新的前提下，样式发生了改变。感觉就像是直接在浏览器中修改元素，有良好的开发体验

为什么需要`HMR`:
1. `Live Reload`工具不能保存应用的状态，当页面修改刷新之后，应用之前的状态会丢失，不利于开发与测试。而`webpack HMR`则不会刷新浏览器，而是在运行时对模块进行热更新，保证应用状态不会丢失。

2. `HRM`在修改保存代码之后，可以自动的进行代码打包，热更新等一系列的操作，大大提升了开发效率

### `Via the Nodejs API`
当使用`nodejs`的`api`来使用`webpack-dev-server`的时候，需要进行一些其他的配置：
```javascript
    const webpackDevServer = require('webpack-dev-server')
    const webpack = require('webpack')
    
    const config = require('./webpack.config.js')
    const options = {
        contentBase: './dist',
        hot: true,
        host: 'localhost'
    }

    webpackDevServer.addDevServerEntryPoints(config, options)
    const compiler = webpack(config)
    const server = new webpackDevServer(compiler, options)
    server.listen(5000, 'localhost', () => {
        console.log('app server listening on 5000')
    })
```
在 `webpack.config.js`中配置`HMR`插件`new webpack.HotModuleReplacementPlugin()`

`HMR with Stylesheets`
`css`模块的热更新在`style-loader`的帮助下是非常简单的，安装`style-loader`以及`css-loader`之后，在`webpack.config.js`中配置之后，修改`css`中的样式，`webpack`会自动进行热加载

## `Tree shaking`

1. 配置`webpck.config.js`
    ```javascript
    mode: 'development',
    optimization: {
        usedExports: true
    }
    ```

2. 新增一个`math.js`文件以及内容
    ```javascript
    export function square(x) {
        return x * x
    }
    export function cube(x) {
        return x * x *ｘ
    }
    ```

3. 在`index.js`中引入`math.js`中的一个函数`cube`

4. 运行构建命令`npm run build`，打开`app.bundle.js`文件，发现如下内容

    ```javascript
    /***/ "./src/math.js":
    /*!*********************!*\
    !*** ./src/math.js ***!
    \*********************/
    /*! exports provided: square, cube */
    /*! exports used: cube */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* unused harmony export square */
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cube; });
    function square (x) {
        return x * x;
    }
    function cube (x) {
        return x * x * x;
    }
    ```
上面的代码中，有一行`unused harmony export square`注释，在这个注释下面的`square`函数并没有被导入使用，这种代码被称为'死代码'

### `Mark the file as side-effect-free`
在`package.json`中添加`"sideEffects": false`属性可以提示`webpack`它可以安全地删除未使用的导出，比如上面的`square`函数，但是只是配置这个属性，并不能删除相应的代码，还需要配置`webpack.config.js`中的`optimization`属性中的`minimize: true`进行代码压缩才能删除，这个属性在`mode`为`production`模式下时默认为`true`，添加之后，运行`npm run build`命令，可以发现代码被压缩，并且没有`square`函数

好处：
在`webpack 4`中，官方提供了`sideEffects`属性，通过将其设置为`false`，可以主动标识该类库中的文件只执行简单输出，并没有执行其他操作，可以放心`shaking`。除了可以减少`bundle`文件的体积，还可以提升打包速度。为了检测`side effects`，`webpack`需要在打包的时候将所有的文件执行一遍，而在设置`sideEffects`之后，则可以跳过那些未被引用的文件，因为进行了明确的标识

引用自[Webpack 4进阶](https://www.colabug.com/2641390.html)

### `Minify the Output`
修改`webpack.config.js`中的`mode`属性为`prodution`，删除`optimization`属性，再进行打包，可以发现打包文件中没有引入`square`函数。在`prodution`模式下，使用了`ModuleConcatenationPlugin`插件来完成`tree shaking`的工作。

## `Prodution`

### `Setup`
开发环境与生产环境是不相同的。在开发环境中，需要定位错误文件，开启本地服务，以及热模块更新等插件，而在生产环境中，需要的是代码压缩，静态资源优化等等配置。所以，为了根据不同的场景进行构建，需要对`webpack`进行不同的配置
1. 删除`webpack.config.js`文件，新建`webpack.common.js`、`webpack.dev.js`、`webpack.prod.js`文件

2. 由于需要将`webpack.common.js`中的通过配置与`dev`和`prod`的配置进行合并，所以需要`webpack-merge`插件，安装`webpack-merge`，`npm install --save-dev webpack-merge`

3. 在`webpack.common.js`中添加通用配置
    ```javascript
    const path = require('path')
    const CleanWebpackPlugin = require('clean-webpack-plugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')

    module.exports = {
        entry: {
            app: './src/index.js'
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                title: 'prodution'
            })
        ]
    }
    ```

4. 在 `webpack.dev.js`中添加下面配置
    ```javascript
    const merge = require('webpack-merge')
    const common = require('./webpack.common.js')

    module.exports = merge(common, {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist'
        }
    })
    ```

5. 在`webpack.prod.js`中添加下面配置
    ```javascript
    const merge = require('webpack-merge')
    const common = require('./webpack.common.js')

    module.exports = merge(common, {
        mode: 'production'
    })
    ```

### `NPM Script`
不同的环境的配置文件需要使用不同的命令去执行，修改`package.json`中的脚本
```javascript
"start": "webpack-dev-server --open --config webpack.dev.js"
"build": "webpack --config webpack.prod.js"
```
`webpack`的默认配置文件是`webpack.config.js`，使用其他配置文件时需要使用`--config`选项

### `Specify the Mode`
`process.env`在`node`中包含关于系统的环境变量的信息，我们可以在其中添加`NODE_ENV`来判断当前的模式，它是一个自定义的变量，在构建`webpack`前需要先将该变量添加到系统中。但是在系统中配置该环境变量之后，使用`webpack`构建时发现其`process.env.NODE_ENV`的值仍为`undefined`。原因就是需要在`webpack`中进行变量的导入，导入插件为[`webpack.DefinePlugin`](https://webpack.js.org/plugins/define-plugin/)

1. 在`webpack.common.js`中添加配置
    ```javascript
    const webpack = require('webpack')
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify('123')
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
    ```
运行命令之后，在项目中发现`VERSION`有值，但是`process.env.NODE_ENV`的值仍为`undefined`，这是由于在配置`DefinePlugin`时，其变量`process.env.NODE_ENV`引入的是`node`运行时的环境变量中的`NODE_ENV`，现在设置这个环境变量，所以值为`undefined`

2. 在`package.json`的脚本中，为`node`添加`NODE_ENV`环境变量
    ```javascript
    "start": "NODE_ENV=development webpack-dev-server --open --config webpack.dev.js"
    "build": "NODE_ENV=production webpack --config webpack.prod.js"
    ```
3. 运行上面配置的命令之后，在`window`环境下，会出现异常，也就是说`window`不支持这种配置方式，需要一个兼容的方式，也就是使用`cross-env`插件

4. 安装`cross-env`脚本:`npm install --save-dev cross-dev`

5. 配置脚本命令 `"start": "cross-env NODE_ENV=development webpack-dev-server --config webpack.dev.js"`

### `Minication`
在`webpack 4++`中，当处于`production`模式时，代码会被自动压缩。下面的两个插件也可以进行代码压缩
1. `BabelMinifyWebpackPlugin`

2. `ClosureCompilerPlugin`
需要注意的是，使用其他的压缩插件时，需要确保死代码能够被删除（配置 `treeshaking` 以及 `optimization`）

### `Souce Mapping`
在生产环境中使用`source map`，对线上环境的排错以及`debug`时非常有帮助的。

在 `webpack.prod.js` 中添加如下配置: `devtool: 'source-map'`

`souce-map` 插件与开发环境中的 `inline-source-map` 插件具有相同的功能，但是在生产环境中应该避免使用 `inline-***` 和 `eval-**` 的插件，引入它们会增加打包文件的大小并且会降低整体的性能

### `CLI Alternatives`
上面描述的配置也可以通过命令行实现，例如使用 `--optimize-minimize` 将包含 `terserPlugin` 插件, 定义 `--define process.env.NODE_ENV="'production'"`与在 `webpack.DefinePlugin`中定义操作相同. `Webpack -p` 将会自动的调用这两个配置和包括在其中的插件

## `Code Splitting`
`code splitting`是`webpack`最让人感兴趣的特征之一。这个特征允许你可以切割你的代码到不同的打包文件中，这个代码文件可以进行按需加载或者平行加载。它可以用于实现更轻量的打包文件以及控制资源的加载顺序，如果正确的使用了这个功能，可以对加载的时间产生较大的影响。

有三种方式可以进行`code splitting`:
1. `Entry Points`: 通过使用`entry`配置来手动的切割代码

2. `Prevent Duplication`: 使用`SplitChunksPlugin`来推断以及切割块

3. `Dynamic Imports`: 通过模块内的内联函数调用来切割代码

### `Entry Points`
这是分割代码最快也是最直接的办法。但是，这个方法需要进行手动配置，而且还会遇到一些陷阱。下面来进行一些尝试：
1. `src`中添加`another-module.js`文件，并随意添加一些内容

2. `webpack.config.js`中配置`entry`属性
    ```javascript
    entry: {
        app: './src/index.js',
        another: './src/another-module.js'
    }
    ```
运行命令之后可以看到对`another-module`文件进行了打包，但是这个方式的有一些缺点：
1. 如果在入口文件中有重复的模块，那么会被重复的打包进每一个`bundle`文件中，比如，两个文件都引用了一个库代码，那么在这两个打包文件中会对引用文件进行重复的打包。我们在`index.js`与`another-module`文件中都引入`lodash`库，打包后发现在`app.bundle.js`文件以及`another.bundle.js`文件中都包含`lodash`的源代码

2. 这种方式也不灵活，并且不能够根据核心的应用逻辑进行动态的代码分割

## `Prevent Duplication`
上面的方法虽然比较简单，直接。但是也有一些缺点，其中最大的缺点就是对同一个引用进行重复打包的问题。可以使用`SplitChunksPlugin`插件，这个插件将通用的依赖抽取到一个已经存在的入口块中或者抽取到一个完全新的块中。下面进行测试
1. `webpack.config.js`中添加配置
    ```javascript
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
    ```
进行了上诉配置后，进行打包后发现输出结果中多了一个文件 `vendors~another~app.bundle.js`,并且在`app.bundle.js`文件以及`another.bundle.js`文件中都没有了`lodash`的代码
```javascript
                        Asset       Size  Chunks             Chunk Names
            another.bundle.js   1.54 KiB       1  [emitted]  another
                app.bundle.js   2.01 KiB       2  [emitted]  app
                   index.html  325 bytes          [emitted]
vendors~another~app.bundle.js   69.3 KiB       0  [emitted]  vendors~another~app
Entrypoint app = vendors~another~app.bundle.js app.bundle.js
Entrypoint another = vendors~another~app.bundle.js another.bundle.js
```
在社区中还有一些其他的插件可以用来进行`splitting code`:

1. `mini-css-extract-plugin`: `css`切割

2. `bundle-loader`: 可以进行代码切割和懒加载

3. `promise-loader`: 对`promise`进行的代码切割和懒加载

### `Dynamic Imports`
在`webpack`中有两种方式可以实现动态的导入，第一个也是推荐的方式就是去使用`import()`(内部使用`promise`语法，在老式浏览器中使用时需要添加`es6-promise`或者`promise-polyfill`)语法，这个方式符合`ECMAScript`对动态导入的建议。`webpack`指定的遗留方式就是使用`require.ensure`
1. 删除掉`webpack.config.js`中对`entry`以及`optimization.splitChunks`的配置

2. 在`webpack.config.js`中的`output`中添加`chunkFilename`配置 `chunkFilename: '[name].bundle.js'`,这个属性决定了不属于`entry`配置中的块文件名

3. 修改`index.js`中的代码
    ```javascript
    funtion getComponent() {
        return import(/*webpackChunkName: "lodash"*/ lodash).then(({default: _}) => {
            var element = document.createElement('div')
            element.innerHTML = _.jon(['webpack', 'dynamics', 'import'])
            return element
        }).catch(err => console.log('an error occured while loading the component'))
    }
    getComponent().then(component => {
        document.body.appendChild(component)
    })
    ```
上面的代码中在引入`lodash`时, 使用了`{default: _}`, 需要这样使用的原因是在`webpack 4`中与导入的`CommonJS`的模块进行兼容

上面的代码中还添加了一行注释`/*webpackChunkName: "lodash"*/`，这个指定了引入库切块后的文件名。

执行打包命令后输出如下：
```javascript
                   Asset       Size  Chunks             Chunk Names
           app.bundle.js   2.21 KiB       0  [emitted]  app
              index.html  185 bytes          [emitted]
vendors~lodash.bundle.js   69.3 KiB       1  [emitted]  vendors~lodash
```
修改上面`webpackChunkName`中的名称为`lodashTest`后打包输出
```javascript
                   Asset       Size  Chunks             Chunk Names
               app.bundle.js   2.22 KiB       0  [emitted]  app
                  index.html  185 bytes          [emitted]
vendors~lodashTest.bundle.js   69.3 KiB       1  [emitted]  vendors~lodashTest
```
由于`import()`返回的是一个`promise`，所以也可以使用`async`函数，使用`async`函数需要使用`babel`插件
```javascript
async function getComponent() {
    var element = document.createElement('div')
    const {default: _} = await import(/*webpackChunkName: "lodash"*/ 'lodash')
    element.innerHTML = _.jon(['webpack', 'dynamics', 'import'])
    return element
}
getComponent().then(component => {
    document.body.appendChild(component)
})
```

### `Prefetching/Preloading modules`
待后续深入