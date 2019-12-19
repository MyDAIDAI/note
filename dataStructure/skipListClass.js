/**
 * author dreamapplehappy
 */

// 代码使用了ES6以及更高版本的JavaScript来表示，需要使用Babel之类的工具处理一下才可以在Node或者浏览器中运行

// 定义了跳表索引的最大级数
const MAX_LEVEL = 4;

/**
 * 定义Node类，用来辅助实现跳表功能
 */
function Node (data, maxLevel) {
  // data属性存放了每个节点的数据
  this.data = data || -1;
  // maxLevel属性表明了当前节点处于整个跳表索引的级数
  this.maxLevel = maxLevel || 0;
  // refer是一个有着MAX_LEVEL大小的数组，refer属性存放着很多个索引
  // 如果用p表示当前节点，用level表示这个节点处于整个跳表索引的级数；那么p[level]表示在level这一层级p节点的下一个节点
  // p[level-n]表示level级下面n级的节点
  this.refer = new Array(MAX_LEVEL);
}

/**
 * 定义SkipList类
 */
function SkipList() {
  // levelCount属性表示了当前跳表索引的总共级数
  this.levelCount = 1;
  // head属性是一个Node类的实例，指向整个链表的开始
  this.head = new Node();

  // 在跳里面插入数据的时候，随机生成索引的级数
}
SkipList.randomLevel = function() {
  let level = 1;
  for(let i = 1; i < MAX_LEVEL; i++) {
    if(Math.random() < 0.5) {
      level++;
    }
  }
  return level;
}

  /**
   * 向跳表里面插入数据
   * @param value
   */
SkipList.prototype.insert = function(value) {
    const level = SkipList.randomLevel();
    const newNode = new Node();
    newNode.data = value;
    newNode.maxLevel = level;
    const update = new Array(level).fill(new Node());
    let p = this.head;
    for(let i = level - 1; i >= 0; i--) {
      while(p.refer[i] !== undefined && p.refer[i].data < value) {
        p = p.refer[i];
      }
      update[i] = p;
    }
    for(let i = 0; i < level; i++) {
      newNode.refer[i] = update[i].refer[i];
      update[i].refer[i] = newNode;
    }
    if(this.levelCount < level) {
      this.levelCount = level;
    }
  }

  /**
   * 查找跳表里面的某个数据节点，并返回
   * @param value
   * @returns {*}
   */
  SkipList.prototype.find = function(value) {
    if(!value){return null}
    let p = this.head;
    for(let i = this.levelCount - 1; i >= 0; i--) {
      while(p.refer[i] !== undefined && p.refer[i].data < value) {
        p = p.refer[i];
        // 标记1，此处用于文章的说明
      }
    }

    if(p.refer[0] !== undefined && p.refer[0].data === value) {
      return p.refer[0];
    }
    return null;
  }

  /**
   * 移除跳表里面的某个数据节点
   * @param value
   * @returns {*}
   */
  SkipList.prototype.remove = function (value) {
    let _node;
    let p = this.head;
    const update = new Array(new Node());
    for(let i = this.levelCount - 1; i >= 0; i--) {
      while(p.refer[i] !== undefined && p.refer[i].data < value){
        p = p.refer[i];
      }
      update[i] = p;
    }

    if(p.refer[0] !== undefined && p.refer[0].data === value) {
      _node = p.refer[0];
      for(let i = 0; i <= this.levelCount - 1; i++) {
        if(update[i].refer[i] !== undefined && update[i].refer[i].data === value) {
          update[i].refer[i] = update[i].refer[i].refer[i];
        }
      }
      return _node;
    }
    return null;
  }

  // 打印跳表里面的所有数据
  SkipList.prototype.printAll = function () {
    let p = this.head;
    while(p.refer[0] !== undefined) {
      // console.log(p.refer[0].data)
      p = p.refer[0];
    }
  }

let skipList = new SkipList()
for (let i = 1; i <= 10; i++) {
  skipList.insert(i)
}
skipList.printAll()
