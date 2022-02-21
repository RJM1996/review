// function f (m) {
//   return m * 2;
// }

// f(x + 5);

const x = 1
// 等同于
const thunk = function () {
  return x + 5;
};

function f (thunk) {
  return thunk() * 2;
}


f(thunk)