// function ATM() {
//   var num = 0
//   return function () {
//     num += 10
//     // debugger
//     console.log('num: ' + num)
//   }
// }

// ATM()()
// ATM()()

var name = 'window'
var p = {
  name: 'peter',
  getName: function () {
    var self = this
    console.log(this)
    return function () {
      debugger
      return self.name
    }
  }
}

var getName = p.getName()
console.log(getName())
