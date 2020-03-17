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
let test = new QuickFindUF(10)
debugger
console.log('test', test)