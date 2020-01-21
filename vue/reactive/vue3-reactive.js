// 在 vue3中的响应式

// const collectionType = new Set([Set, Map, WeakMap, WeakSet])
const targetMap = new WeakMap() // 创建 target 依赖 map

function isObject(val) {
  return val !== null && typeof val === 'object'
}
/**
 * 创建响应式对象
 * @param {any} target
 * @param {WeakMap} toProxy
 * @param {WeakMap} toRaw
 * @param {ProxyHandler} baseHandlers
 * @param {ProxyHandler} collectionHandlers
 */
function createReactiveObject(target, toProxy, toRaw) {
  if (!isObject(target)) {
    return
  }
  let observed = new Proxy(target, {
    get: function (target, key, receiver) {
      // const res = Reflect.get(target, key, receiver)
      const res = target[key]
      // 添加依赖
      track(target, 'get', key)
      if (isObject(target)) {
        return createReactiveObject(res)
      }
      return res
    },
    set: function (target, key, value, receiver) {
      // const result = Reflect.set(target, key, value, receiver)
      target[key] = value
      trigger(target, 'set', key, value)
      return value
    }
  })
  return observed
}
/** 依赖收集栈 */
// const reactionStack = []
/** 从栈的末尾取到正在运行的observe包裹的函数 */
// function getRunningReaction() {
//   const [runningReaction] = reactionStack.slice(-1)
//   return runningReaction
// }
let targetFn = null
/**
 * 依赖添加函数
 * @param {any} target 需要添加依赖的目标对象
 * @param {string} type 触发依赖的函数类型
 * @param {string} key 属性名称
 */
function track(target, type, key) {
  if (!targetFn) {
    return
  }
  let depsMap = targetMap.get(target)
  if (depsMap === void 0) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (dep === void 0) {
    depsMap.set(key, (dep = new Set()))
  }
  if (!dep.has(targetFn)) {
    dep.add(targetFn)
  }
}
/**
 * 依赖触发函数
 * @param {any} target 需要添加依赖的目标对象
 * @param {string} type 触发依赖的函数类型
 * @param {string} key 属性名称
 */
function trigger(target, type, key) {
  const depsMap = targetMap.get(target)
  if (depsMap === void 0) {
    return
  }
  let dep = depsMap.get(key)
  if (dep === void 0) {
    return
  }
  console.log('set dep', dep)
  dep.forEach(run => run())
}

function watcher(fn) {
  targetFn = fn
  targetFn()
  targetFn = null
}
let data = {
  // num: 1,
  arr: [1, 2, [3, 4, 5], {a: 6, b: {c: 7}}],
  // arrObj: [{a: 'a', b: {c: '}}]
  obj: {
    // a: 'a',
    b: 'b',
    c: {
     d: 'd'
    }
  }
}
let observerData = createReactiveObject(data) // 只对外层的 data 添加了代理
let totalArr = 0
let totalObj = ''
watcher(() => {
  totalArr = 0
  function sum(arrdata) {
    debugger
    Object.keys(arrdata).forEach(key => {
      let ele = arrdata[key]
      console.log('ele', ele)
      if (Array.isArray(ele)) {
        sum(ele)
      } else if (typeof ele === 'number'){
        totalArr += ele
      }
    })
  }
  sum(observerData.arr)
  // totalArr = totalArr
  console.log('totalArr notify', totalArr)
})

// observeData.obj = {a: 'aaaa', b: 'bbb'} 监听了observeData对象，其中的属性添加了响应式
// Object {a: "aaaa", b: "bbb"}
// set dep
// Set(1) {}
// totalObj notify aaaabbb
// observeData.obj.a = 'ccccc' 修改深层次的属性，没有触发响应式。因为在上面的代码中只对Proxy的第一层属性做了拦截，
// "ccccc"
debugger
console.log(data)