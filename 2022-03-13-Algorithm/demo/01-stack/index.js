// 封装一个栈
function Stack() {
  this.items = []

  // 入栈
  this.push = function (item) {
    this.items.push(item)
  }

  // 出栈
  this.pop = function () {
    return this.items.pop()
  }

  this.peek = function () {
    return this.items[this.items.length - 1]
  }

  this.isEmpty = function () {
    return this.items.length === 0
  }

  this.toString = function () {
    return this.items.join(' ')
  }
}

const stk = new Stack()
stk.push(1)
stk.push(2)

console.log(stk.toString())

// 10进制转2进制
function dec2bin(number) {
  const stk = new Stack()
  while (number > 0) {
    stk.push(number % 2)
    number = Math.floor(number / 2)
  }
  let binStr = ''
  while (!stk.isEmpty()) {
    binStr += stk.pop()
  }
  console.log(binStr)
}
dec2bin(100)
