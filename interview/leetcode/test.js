
class RangeList {

  constructor() {
    this.data = [];
  }

  add([left, right]) {
    if (!this.data.length || left > this.data[this.data.length - 1][1]) {
      this.data.push([left, right]);
    } else if (right < this.data[0][0]) {
      this.data.unshift([left, right]);
    } else {
      let leftIndex = 0;
      while (this.data[leftIndex][1] < left) {
        leftIndex++;
      }
      let rightIndex = this.data.length - 1;
      while (this.data[rightIndex][0] > right) {
        rightIndex--;
      }
      left = Math.min(left, this.data[leftIndex][0]);
      right = Math.max(right, this.data[rightIndex][1]);
      this.data.splice(leftIndex, rightIndex - leftIndex + 1, [left, right]);
    }
  }

  print() {
    for(let i = 0; i < this.data.length; i++) {
      const item = this.data[i];
      console.log(`[${item[0]}, ${item[1]})`)
    }
  }

  remove([left, right]) {
    if (!this.data.length || left >= this.data[this.data.length - 1][1] || right <= this.data[0][0]) {
      return;
    } else {
      left = Math.max(left, this.data[0][0]);
      right = Math.min(right, this.data[this.data.length - 1][1]);

      let leftIndex = 0;
      while (this.data[leftIndex][1] < left) {
        leftIndex++;
      }
      let rightIndex = this.data.length - 1;
      while (this.data[rightIndex][0] > right) {
        rightIndex--;
      }
      const existLeftValue = this.data[leftIndex][0];
      const existRightValue = this.data[rightIndex][1];
      const insertData = [];
      if (existLeftValue < left) {
        insertData.push([existLeftValue, left]);
      }
      if (existRightValue > right) {
        insertData.push([right, existRightValue]);
      }
      this.data.splice(leftIndex, rightIndex - leftIndex + 1, ...insertData);
    }
  }
}
const r1= new RangeList()
r1.add([1, 5])
r1.print()
r1.add([10, 20])
// r1.print()
r1.add([20, 20])
// r1.print()
r1.add([20, 21])
// r1.print()
r1.add([2, 4])
r1.add([7, 9])
// r1.print()
r1.add([3, 8])
// r1.print()
r1.remove([10, 10])
// r1.print()
r1.remove([10, 11])
// r1.print()
r1.remove([15, 17])
// r1.print()
r1.remove([3, 19])
// r1.print()
// console.log('r1', r1)