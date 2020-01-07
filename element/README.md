# `ELEMENT`源码解析

在使用`vue`之后，一直在使用`element`框架，作为一个开源的前端框架，是非常不错的，所以闲来无事，学习学习

## `element`目录层次
```javaScript
element
├── .babelrc
├── .eslintignore
├── .eslintrc
├── .travis.yml
├── CHANGELOG.en-US.md
├── CHANGELOG.es.md
├── CHANGELOG.zh-CN.md
├── FAQ.md
├── LICENSE
├── Makefile
├── README.md
├── build  // 代码构建发布相关
│   ├── bin
│   ├── config.js
│   ├── cooking.common.js
│   ├── cooking.component.js
│   ├── cooking.conf.js
│   ├── cooking.demo.js
│   ├── cooking.test.js
│   ├── deploy-ci.sh
│   ├── deploy-faas.sh
│   ├── gen-single-config.js
│   ├── release.sh
│   ├── salad.config.json
│   └── strip-tags.js
├── components.json // 组件列表json, 方便引用
├── element_logo.svg
├── examples // 官网demo ？
├── lerna.json
├── package.json
├── packages // 组件源码
├── src
│   ├── directives // 实现滚轮优化和避免重复点击
│   ├── index.js // 用于安装以及导出组件
│   ├── locale // 国际化
│   ├── mixins // 混合到组件中的mixin
│   ├── transitions // 组件中使用到的动画
│   └── utils // 工具
├── test // 组件单元测试
│   └── unit
├── types // 各个组件的type 感觉项目中没用上
└── yarn.lock
```

## `css`设计
## 组件与测试