// 一个简单的哈希表
function HashTable () {
  this.table = new Array(1024)
}
HashTable.prototype.hash = function (data) {
  let total = 0
  for (let i = 0; i < data.length; i++) {
    total += data.charCodeAt(data[i])
  }
  // hash value:David->340
  // hash value:Jennifer->592 冲突
  // hash value:Donnie->408
  // hash value:Raymond->574
  // hash value:Cynthia->469 冲突
  // hash value:Mike->308
  // hash value:Clayton->469
  // hash value:Danny->340 冲突
  // hash value:Jonathan->592
  console.log('hash value:' + data + '->' + total)
  return total % this.table.length
}
HashTable.prototype.insert = function (key, val) {
  let pos = this.hash(key)
  this.table[pos] = val
}
HashTable.prototype.get = function (key) {
  let pos = this.hash(key)
  return this.table[pos]
}
HashTable.prototype.show = function () {
  for (let i = 0; i < this.table.length; i++) {
    if (this.table[i] != undefined) {
      console.log('i:' + i + 'value: ' + JSON.stringify(this.table[i]))
    }
  }
}
// let someNames = ["David","Jennifer","Donnie","Raymond","Cynthia","Mike","Clayton","Danny","Jonathan"]
// let hash = new HashTable()
// for(let i = 0; i < someNames.length; ++i) {
//   hash.insert(someNames[i], someNames[i])
// }
//
// hash.show()

// 上面由于哈希函数简单，所以产生了冲突，
// 并且没有冲突对应的解决办法，有以下解决办法
// 1. 开放寻址法
// 2. 链表法

// 开放寻址法
// 从计算的位置依次向下寻找，直到找到空余位置
HashTable.prototype.insert = function (key, value) {
  let pos = this.hash(key)
  while (this.table[pos] != undefined) {
    pos++
  }
  console.log('pos ->' + pos + ' value ->' + value)
  this.table[pos] = value
}
// let someNames = ["David","Jennifer","Donnie","Raymond","Cynthia","Mike","Clayton","Danny","Jonathan"]
// let hash = new HashTable()
// for(let i = 0; i < someNames.length; ++i) {
//   hash.insert(someNames[i], someNames[i])
// }
// hash.show()

// hash value:David->340
// pos ->340 value ->David
// hash value:Jennifer->592
// pos ->592 value ->Jennifer
// hash value:Donnie->408
// pos ->408 value ->Donnie
// hash value:Raymond->574
// pos ->574 value ->Raymond
// hash value:Cynthia->469
// pos ->469 value ->Cynthia
// hash value:Mike->308
// pos ->308 value ->Mike
// hash value:Clayton->469 冲突
// pos ->470 value ->Clayton
// hash value:Danny->340 冲突
// pos ->341 value ->Danny
// hash value:Jonathan->592 冲突
// pos ->593 value ->Jonathan
// 上面的结果显示，冲突的hashKey根据开放寻址法依次向下查找空余位置

// 链表法
function ValuePair(key, val) {
  this.key = key
  this.val = val
}
function Node(val) {
  this.val = val
  this.next = null
}
function LinkedList() {
  this.head = new Node('head')
}
LinkedList.prototype.append = function (val) {
  let currentNode = this.head
  while (currentNode != null && currentNode.next != null) {
    currentNode = currentNode.next
  }
  let node = new Node(val)
  currentNode.next = node
}
LinkedList.prototype.isEmpty = function () {
  if (this.head.next == null) {
    return true
  }
  return false
}
HashTable.prototype.insert = function (key, val) {
  let pos = this.hash(key)
  if (this.table[pos] == undefined) {
    this.table[pos] = new LinkedList()
  }
  this.table[pos].append(new ValuePair(key, val))
}
HashTable.prototype.get = function (key) {
  let pos = this.hash(key)
  if (this.table[pos] != undefined) {
    let currentNode = this.table[pos].next
    while (currentNode != null && currentNode.val.key !== key) {
      currentNode = currentNode.next
    }
    return currentNode
  }
  return -1
}
HashTable.prototype.remove = function (key) {
  let pos = this.hash(key)
  if (this.table[pos] != undefined) {
    let currentNode = this.table[pos]
    while (currentNode.next != null && currentNode.next.val.key !== key) {
      currentNode = currentNode.next
    }
    if (currentNode.next == null) {
      currentNode = -1
    }
    let preNode = currentNode
    preNode.next = preNode.next.next
  }
  if (this.table[pos].isEmpty()) {
    this.table[pos] = undefined
  }
}
let someNames = ["David","Jennifer","Donnie","Raymond","Cynthia","Mike","Clayton","Danny","Jonathan"]
let hash = new HashTable()
for(let i = 0; i < someNames.length; ++i) {
  hash.insert(someNames[i], someNames[i])
}
hash.show()

// i:308value: {"head":{"val":"head","next":{"val":{"key":"Mike","val":"Mike"},"next":null}}}
// i:340value: {"head":{"val":"head","next":{"val":{"key":"David","val":"David"},"next":{"val":{"key":"Danny","val":"Danny"},"next":null}}}}
// i:408value: {"head":{"val":"head","next":{"val":{"key":"Donnie","val":"Donnie"},"next":null}}}
// i:469value: {"head":{"val":"head","next":{"val":{"key":"Cynthia","val":"Cynthia"},"next":{"val":{"key":"Clayton","val":"Clayton"},"next":null}}}}
// i:574value: {"head":{"val":"head","next":{"val":{"key":"Raymond","val":"Raymond"},"next":null}}}
// i:592value: {"head":{"val":"head","next":{"val":{"key":"Jennifer","val":"Jennifer"},"next":{"val":{"key":"Jonathan","val":"Jonathan"},"next":null}}}}
