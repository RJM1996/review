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
  /**
   * Adds a range to the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add (range) {
    const newRange = {
      begin: range[0],
      end: range[1]
    }
    if (!isValidRange(newRange)) return

    this.list.push(newRange);

    const len = this.list.length;

    if (len > 1) {
      const res = []
      this.list.sort((a, b) => a.begin - b.begin)
      // Take the first interval as tmp
      let tmp = this.list[0]
      // Traverse from the second interval
      for (let i = 1; i < len; i++) {
        const cur = this.list[i]
        // Judge whether cur and tmp overlap
        if (tmp.end >= cur.begin) {
          tmp.end = Math.max(cur.end, tmp.end)
        } else {
          // If there is no overlap, it indicates that tmp cannot be merged again, then add tmp to the result
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
    const newRange = {
      begin: range[0],
      end: range[1]
    }
    if (!isValidRange(newRange)) return

    const res = []
    for (let i = 0; i < this.list.length; i++) {
      const curRange = this.list[i]
      // No overlap
      if (curRange.end < newRange.begin) {
        res.push(curRange)
      }
      // overlap
      else {
        // 1. newRange is completely included in curRange
        if (isInclude(newRange, curRange)) {
          const range1 = {
            begin: curRange.begin,
            end: newRange.begin
          }
          const range2 = {
            begin: newRange.end,
            end: curRange.end
          }
          if (isValidRange(range1)) {
            res.push(range1)
          }
          if (isValidRange(range2)) {
            res.push(range2)
          }
        }
        else {
          // 2. newRange.begin is included curRange
          if (newRange.begin > curRange.begin && newRange.begin < curRange.end) {
            const range1 = {
              begin: curRange.begin,
              end: newRange.begin
            }
            const range2 = {
              begin: newRange.begin,
              end: curRange.end
            }
            if (!isInclude(range1, newRange)) {
              res.push(range1)
            }
            if (!isInclude(range2, newRange)) {
              res.push(range2)
            }
          }
          // 3. newRange.end is included curRange
          if (newRange.end > curRange.begin && newRange.end < curRange.end) {
            const range1 = {
              begin: curRange.begin,
              end: newRange.end
            }
            const range2 = {
              begin: newRange.end,
              end: curRange.end
            }
            if (!isInclude(range1, newRange)) {
              res.push(range1)
            }
            if (!isInclude(range2, newRange)) {
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
    const res = this.list.map(item => {
      return `[${item.begin}, ${item.end})`
    }).join(' ')
    console.log(res)
    return res
  }
}

// judge the range is valid
function isValidRange (range) {
  return range.end > range.begin
}
// judge the range is include the range
function isInclude (target, source) {
  return target.begin >= source.begin && target.end <= source.end
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



