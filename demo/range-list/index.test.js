/* eslint-disable no-undef */

const RangeList = require('./index.js');

test('test RangeList add', () => {
  const rl = new RangeList();

  rl.add([1, 5]);
  // Should display: [1, 5)
  expect(rl.print()).toBe('[1, 5)')

  rl.add([10, 20]);
  // Should display: [1, 5) [10, 20)
  expect(rl.print()).toBe('[1, 5) [10, 20)')

  rl.add([20, 20]);
  // Should display: [1, 5) [10, 20)
  expect(rl.print()).toBe('[1, 5) [10, 20)')

  rl.add([20, 21]);
  // Should display: [1, 5) [10, 21)
  expect(rl.print()).toBe('[1, 5) [10, 21)')

  rl.add([2, 4]);
  // Should display: [1, 5) [10, 21)
  expect(rl.print()).toBe('[1, 5) [10, 21)')

  rl.add([3, 8]);
  // Should display: [1, 8) [10, 21)
  expect(rl.print()).toBe('[1, 8) [10, 21)')
});

test('test RangeList remove', () => {
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
  // Should display: [1, 8) [10, 21)
  expect(rl.print()).toBe('[1, 8) [10, 21)')

  rl.remove([10, 11]);
  // Should display: [1, 8) [11, 21)
  expect(rl.print()).toBe('[1, 8) [11, 21)')

  rl.remove([15, 17]);
  // Should display: [1, 8) [11, 15) [17, 21)
  expect(rl.print()).toBe('[1, 8) [11, 15) [17, 21)')

  rl.remove([3, 19]);
  // Should display: [1, 3) [19, 21)
  expect(rl.print()).toBe('[1, 3) [19, 21)')

});
