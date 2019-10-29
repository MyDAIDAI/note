// 原始方法
let obj = {
  name: 'obj',
  arr: [1, 2]
};
Object.defineProperty(obj, 'property1', {
  get() {
    return this.name;
  },
  set(v) {
    console.log('v', v, this.name);
    this.name = v;
  }
});
Object.defineProperty(obj, 'arr', {
  get() {
    console.log('get arr');
    return [1, 2, 3, 4]
  },
  set(v) {
    console.log('set arr');
    return this.name
  }
});
console.log('obj.arr', obj.arr);
obj.arr = [1, 1, 1];
console.log('obj.arr', obj.arr);
console.log(obj.property1);
obj.property1 = 'property1';
console.log('obj.name', obj.name);

// 使用 ES6 的 Proxy

let proxyObj = {
  name: 'proxyObj'
};

let target = {
  testName: 'testName'
}
// handler 设置为空对象时，proxy 直接通向 target
// 在 proxy 上的修改会影响 target 对象，在 target 上的修改也会影响 proxy
let handler = {
  get: function(target, property) {
    // console.log('proxy get', target, property);
    return 35;
  }
}
let proxy = new Proxy(target, handler);
proxy.name = 'proxyName';
proxy.testName = 'proxyTestName';
target.age = '123123';
console.log('proxy', proxy, target);
console.log('proxy', proxy.name);
console.log('proxy', proxy.testName);

