function test () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000)
  })
}

test().then((res) => {
  console.log(res)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, 1000)
  })
}).then((res) => {
  console.log(res)
})

async function test2 () {
  try {
    const r1 = await test()
    console.log(r1)
    const r2 = await test()
    console.log(r2)
  } catch (error) {
    console.error(error)
  }
}
test2()