/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
  this.values = [];
  this.k = k;
  for (const num of nums) this.add(num);
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  this.values.push(val);
  this.bubbleUp();
  if (this.values.length > this.k) this.pop();
  return this.values[0];
};

KthLargest.prototype.bubbleUp = function (passedIndex) {
  const index = passedIndex || this.values.length - 1;
  const parentIndex = Math.floor((index - 1) / 2);
  if (this.values[parentIndex] > this.values[index]) {
    this.swap(index, parentIndex);
    this.bubbleUp(parentIndex);
  }
};

KthLargest.prototype.pop = function () {
  this.swap(0, this.values.length - 1);
  const result = this.values.pop();
  this.bubbleDown();
  return result;
};

KthLargest.prototype.bubbleDown = function (passedIndex) {
  const parentIndex = passedIndex || 0;
  const child1Index = parentIndex * 2 + 1;
  const child2Index = parentIndex * 2 + 2;

  const parent = this.values[parentIndex];
  let child1 = Infinity,
    child2 = Infinity;
  if (this.values[child1Index] !== undefined) child1 = this.values[child1Index];
  if (this.values[child2Index] !== undefined) child2 = this.values[child2Index];

  const smallest = Math.min(child1, child2);
  if (smallest === Infinity || smallest > parent) return;

  if (smallest === child1) {
    this.swap(parentIndex, child1Index);
    this.bubbleDown(child1Index);
  } else if (child2 !== Infinity) {
    this.swap(parentIndex, child2Index);
    this.bubbleDown(child2Index);
  }
};

KthLargest.prototype.swap = function (index1, index2) {
  const temp = this.values[index1];
  this.values[index1] = this.values[index2];
  this.values[index2] = temp;
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

// [4,8,9]
