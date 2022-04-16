// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100,201)

/** *
 * NOTE: Feel free to add any extra member variables/functions you like.
 */
class RangeList {
  constructor() {
    this.list = [];
  }
  // judge the range is valid
  isValidRange (range) {
    return range.end > range.begin
  }
  // judge the range is include the range
  isInclude (target, source) {
    return target.begin >= source.begin && target.end <= source.end
  }
  /**
   * Adds a range to the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add (range) {
    // TODO: implement this
    const newRange = {
      begin: range[0],
      end: range[1]
    }
    if (!this.isValidRange(newRange)) return

    this.list.push(newRange);

    const len = this.list.length;

    if (len > 1) {
      const res = []
      this.list.sort((a, b) => a.begin - b.begin)
      // 取第一个区间为 tmp
      let tmp = this.list[0]
      // 从第二个区间开始遍历
      for (let i = 1; i < len; i++) {
        const cur = this.list[i]
        // 判断 cur 和 tmp 是否重叠
        if (tmp.end >= cur.begin) {
          tmp.end = Math.max(cur.end, tmp.end)
        } else {
          // 如果没有重叠说明 tmp 不能再合并了， 则把 tmp 加入结果
          res.push(tmp)
          tmp = cur
        }
      }
      res.push(tmp)
      this.list = res
    }
  }
  /**
   * Removes a range from the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove (range) {
    // TODO: implement this

    const newRange = {
      begin: range[0],
      end: range[1]
    }
    if (!this.isValidRange(newRange)) return

    const res = []
    for (let i = 0; i < this.list.length; i++) {
      const curRange = this.list[i]
      if (curRange.end < newRange.begin) {
        // 没有重叠
        res.push(curRange)
      } else {
        // 有重叠
        // 1. new 完全包含于 cur
        if (newRange.begin >= curRange.begin && newRange.end <= curRange.end) {
          const range1 = {
            begin: curRange.begin,
            end: newRange.begin
          }
          const range2 = {
            begin: newRange.end,
            end: curRange.end
          }
          // console.log(111, range1, range2, res)
          if (this.isValidRange(range1)) {
            res.push(range1);
          }
          if (this.isValidRange(range2)) {
            res.push(range2);
          }
        }
        else {
          // 2. begin 在一个区间
          if (newRange.begin > curRange.begin && newRange.begin < curRange.end) {
            const range1 = {
              begin: curRange.begin,
              end: newRange.begin
            }
            const range2 = {
              begin: newRange.begin,
              end: curRange.end
            }
            // console.log('range1', range1)
            // console.log('range2', range2)
            if (!this.isInclude(range1, newRange)) {
              res.push(range1)
            }
            if (!this.isInclude(range2, newRange)) {
              res.push(range2)
            }
          }
          // 3. end 在另一个区间
          if (newRange.end > curRange.begin && newRange.end < curRange.end) {
            const range1 = {
              begin: curRange.begin,
              end: newRange.end
            }
            const range2 = {
              begin: newRange.end,
              end: curRange.end
            }
            if (!this.isInclude(range1, newRange)) {
              res.push(range1)
            }
            if (!this.isInclude(range2, newRange)) {
              res.push(range2)
            }
          }
        }
      }
    }
    this.list = res
  }
  /**
   * Prints out the list of ranges in the range list
   */
  print () {
    // TODO: implement this
    const res = this.list.map(item => {
      return `[${item.begin}, ${item.end})`
    }).join(' ')
    console.log(res)
    return res
  }
}

module.exports = RangeList

// Example run
const rl = new RangeList();
rl.add([1, 5]);
rl.print();
// Should display: [1, 5)
rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)

rl.remove([10, 10]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 11]);
rl.print();
// Should display: [1, 8) [11, 21)
rl.remove([15, 17]);
rl.print();
// Should display: [1, 8) [11, 15) [17, 21)
rl.remove([3, 19]);
rl.print();
// Should display: [1, 3) [19, 21)



