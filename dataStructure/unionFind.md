# 动态连通问题
问题描述：给与一个长度为 n 个数的集合，实现下面两个命令
- 连接命令：连接两个对象
- 连接查询：判断两个对象是否相连，相连则返回 `true`, 不相连则返回 `false`

![20200317153610.png](https://raw.githubusercontent.com/MyDAIDAI/PicGo/master/img/20200317153610.png)

## 连接模型
可以推测出“是否连接到”有下面的特性：
- 相称性：如果 p 连接到 q, 那么 q 连接到 p
- 传递性：如果 p 连接到 q, q 连接到 r, 那么 p 就可以连接到 r

设置连通分量

![20200317154129.png](https://raw.githubusercontent.com/MyDAIDAI/PicGo/master/img/20200317154129.png)

上面图片中的 `{ 0 }`，`{ 1 4 5 }`，`{ 2 3 6 7 }`就会连通分量，同时在同一个连通分量中的数字是连接的

所以对于连接查询可以直接判断是否在同一个连通分量中即可，同理，那么连接命令就把两个连通分量合并到一个连通分量中

![20200317154525.png](https://raw.githubusercontent.com/MyDAIDAI/PicGo/master/img/20200317154525.png)

## 实现思路
- 新建一个大小长度为`N`的数组，数组的索引值为对象值
- 数组的每一项的值为连通分量的值，初始化每一个连通分量为对象值
- 连接两个对象 `p` 与 `q`，则将 `p`的连通分量设置为`q`的连通分量值
- 判断两个对象 `p` 与 `q` 是否相连，则判断 `p` 与 `q` 的连通分量是否相等即可

```javaScript
class QuickFindUF {
  constructor(N) {
    this.id = []
    for (let index = 0; index < N; index++) {
      this.id[index] = index
    }
  }
  /**
   * 判断 p 与 q 是否连接
   */
  connected(p, q) {
    return this.id[p] === this.id[q]
  }
  /**
   * 将 p 与 q相连
   */
  union(p, q) {
    let qid = this.id[q]
    let pid = this.id[p]
    for (let index = 0, len = this.id.length; index < len; index++) {
      if (this.id[index] === pid) {
        this.id[index] = qid
      }
    }
  }
}
```

## 复杂度分析
- 初始化复杂度: N
- 查询复杂度: 1
- 连接复杂度: N