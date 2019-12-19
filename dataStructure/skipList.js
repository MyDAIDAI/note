// 跳表
const MAX_LEVEL = 3
function Node(value, level) {
  this.value = value
  this.level = level
  this.refer = new Array(level)
}

function generateRandomLevel() {
  let random = 1
  for (let i = 1; i <= MAX_LEVEL; i++) {
    if (Math.random() < 0.5) {
      random++
    }
  }
  return random
}

function generateSkipList() {
  let levelCount = 1
  // 初始化空跳表
  let head = new Node(-1, 0)
  // 使用 for 循环生成50个数据，随机插入不同的层
  let POINTER = head
  for (let i = 0; i < 10; i++) {
    let randomLevel = generateRandomLevel()
    let newNode = new Node(i, randomLevel)
    let update = new Array(randomLevel).fill(newNode)
    for (let j = randomLevel - 1; j >= 0; j--) {
      // 找到插入值在每一层中的插入位置
      while (POINTER.refer[j] != undefined && POINTER.refer[j].value < i) {
        POINTER = POINTER.refer[j]
      }
      // 将每一层的插入位置保存在数组中
      update[j] = POINTER
    }
    // 依次将每层的指针进行转换
    for (let n = 0; n < randomLevel; n++) {
      newNode.refer[n] = update[n].refer[n]
      update[n].refer[n] = newNode
    }
    if (randomLevel > levelCount) {
      levelCount = randomLevel
    }
  }
  return head
}
let skipList = generateSkipList()
console.log(skipList)

