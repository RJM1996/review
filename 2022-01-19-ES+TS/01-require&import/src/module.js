
// module.js

let counts = 1
function sayHello() {
  console.log(`"hello , ${counts}`)
}

setTimeout(() => {
  counts += 2
}, 3000)

module.exports = { counts, sayHello }
