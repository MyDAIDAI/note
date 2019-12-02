// 一个简单的哈希表
function HashTable () {
  this.table = new Array(1024)
}
HashTable.prototype.hash = function (data) {
  let total = 0
  for (let i = 0; i < data.length; i++) {
    total += data.charCodeAt(data[i])
  }
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
      console.log('i:' + i + 'value: ' + this.table[i])
    }
  }
}
let someNames = ["David","Jennifer","Donnie","Raymond","Cynthia","Mike","Clayton","Danny","Jonathan"]
let hash = new HashTable()
for(let i = 0; i < someNames.length; ++i) {
  hash.insert(someNames[i], someNames[i])
}

hash.show()
