// document.addEventListener("keydown", function (e) {
//   console.log(e)
// })

function fetch () {
  return Promise.resolve('hello').then(result => {
    return Promise.resolve(result)
  })
}

fetch().then(result => {
  console.log('result', result)
})