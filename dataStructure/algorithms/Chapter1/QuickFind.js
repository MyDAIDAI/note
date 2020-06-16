const fs = require('fs')
// tinyUF:0.621ms
// mediumUF:1.128ms
// largeUF:226.196ms
class QuickFind {
  constructor(size) {
    this.ids = []
    this.count = size
    for (let i = 0; i < size; i++) {
      this.ids[i] = i
    }
  }
  find(p) {
    return this.ids[p]
  }
  connected(p, q) {
    return this.find(p) === this.find(q)
  }
  union(p, q){
    let pId = this.find(p)
    let qId = this.find(q)
    if(pId === qId) return
    for (let i = 0, len = this.ids.length; i < len; i++) {
      if(this.ids[i] === pId) {
        this.ids[i] = qId
      }
    }
    this.count--
  }
  getCount() {
    return this.count
  }
}
// tinyUF: 0.278ms
// mediumUF: 2.079ms
// largeUF: 272.357ms
class QuickUnionUF {
  constructor(size) {
    this.count = size
    this.parents = []
    for (let i = 0; i < size; i++) {
      this.parents[i] = i
    }
  }
  // 一直向上找到根节点
  findRoot(p) {
    while (p != this.parents[p]) {
      p = this.parents[p]
    }
    return p
  }
  union(p, q) {
    let pRoot = this.findRoot(p)
    let qRoot = this.findRoot(q)
    if(pRoot === qRoot) return
    this.parents[pRoot] = qRoot
    this.count--
  }
  connected(p, q) {
    return this.findRoot(p) === this.findRoot(q)
  }
  getCount() {
    return this.count
  }
}
class WeightedQuickUnionUF {
  constructor(size) {
    this.count = size
    this.parents = []
    this.size = []
    for (let i = 0; i < size; i++) {
      this.parents[i] = i
      this.size[i] = 1
    }
  }
  findRoot(p) {
    while (p != this.parents[p]) {
      p = this.parents[p]
    }
    return p
  }
  union(p, q) {
    let pRoot = this.findRoot(p)
    let qRoot = this.findRoot(q)
    if(pRoot === qRoot) return
    if(this.size[pRoot] < this.size[qRoot]) {
      this.parents[pRoot] = qRoot
      this.size[qRoot] += this.size[pRoot]
    } else {
      this.parents[qRoot] = pRoot
      this.size[pRoot] += this.size[qRoot]
    }
    this.count--
  }
  connected(p, q) {
    return this.findRoot(q) === this.findRoot(q)
  }
}
function readFileData(filename) {
  const dataStr = fs.readFileSync(`./${filename}.txt`, 'utf-8')
  let dataArr = dataStr.split('\n')
  debugger
  return {
    size: Number(dataArr[0]),
    data: dataArr.slice(1)
  }
}

function main() {
  let {size, data} = readFileData('largeUF')
  console.time('QuickUnionUF')
  let quickFind = new WeightedQuickUnionUF(size)
  let len = data.length
  let index = 0
  while (index < len) {
    let item = data[index]
    let [p, z, q] = item.split('')
    index++
    if(p == undefined || q == undefined) continue
    p = Number(p)
    q = Number(q)
    if(quickFind.connected(p, q)) {
      continue
    }
    quickFind.union(p, q)
  }
  console.timeEnd('QuickUnionUF')
}
main()