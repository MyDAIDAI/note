(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.mySingleSpa = {}));
})(this, (function (exports) { 'use strict';

  /**
   * 注册app
   * @param {string} appName 要注册的app名称
   * @param {Function<Promise>|Object} loadFunction app异步加载函数或者app内容
   * @param {Function<boolean>} activityWhen 判断app何时启动
   * @param {Object} customProps 自定义配置
   * @return Promise
   */

  function registerApplication(appName, loadFunction, activityWhen, customProps) {
    if (!appName || typeof appName !== 'string') {
      throw new Error('appName must be a string!');
    }

    if (!loadFunction) {
      throw new Error('loadFunction must be a function or object');
    }

    if (typeof loadFunction !== 'function') {
      loadFunction = () => Promise.resolve(loadFunction);
    }

    if (typeof activityWhen !== 'function') {
      throw new Error('activityWhen must be a function');
    }
    return Promise.all();
  }

  function start() {}

  exports.registerApplication = registerApplication;
  exports.start = start;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=my-single-spa.js.map
