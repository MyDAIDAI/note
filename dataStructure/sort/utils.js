// 排序算法所用工具库

module.exports = {
  /**
   * 判断a是否小于b
   * @param {number}} a 
   * @param {number} b 
   */
  less: function(a, b) {
    return a - b < 0
  },
  /**
   * 判断a是否大于b
   * @param {number}} a 
   * @param {number}} b 
   */
  more: function(a, b) {
    return a - b > 0
  },
  /**
   * 将数组arr中的i与j互换位置
   * @param {array} arr 
   * @param {number} i 
   * @param {number} j 
   */
  exchange: function(arr, i, j) {
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  },
  /**
   * 遍历arr，打印数组中的每个值
   * @param {array} arr 
   */
  show: function(arr) {
    for(let i = 0, len = arr.length; i < len; i++) {
      console.log(`arr: ${arr}, i: ${i}, item: ${arr[i]}`)
    }
  },
  /**
   * 判断数组是否有序
   * @param {array}} arr 
   */
  isSorted: function(arr) {
    for(let i = 1, len = arr.length; i < len; i++) {
      if (this.less(arr[i], arr[i - 1])) {
        return false
      }
      return true
    }
  }
}