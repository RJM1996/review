function test1() {
  function foo(a) {
    i = 3
    console.log(a + i)
  }
  for (var i = 0; i < 10; i++) {
    foo(i * 2)
  }
}
// test1()

function test2() {
  let a
  console.log(a, typeof a)
  console.log(b, typeof b)
  var b
  console.log(isNaN('a'))
  console.log(Number.isNaN('a'))
  let n1 = {
    a: 1,
  }
  let n2 = {
    a: 1,
  }
  console.log(Object.is(n1, n2))
}
// test2()

function test3() {
  // 仿模板字符串处理功能，
  // 如 "Title: ${ title }, MainArtist: ${ artist[0] }, Album: ${ album.name }",
  // {
  //     title: '珊湖海',
  //     artist: ['周杰伦', '梁心颐'],
  //     album: {
  //         publishTime: '2006-11-1',
  //         name: '十一月的萧邦'
  //     }
  // };
  function template(templateString, obj) {
    return templateString.replace(/\${([^{}]*)}/g, (match, p1) => eval('obj.' + p1.trim()))
  }
  const str = 'Title: ${ title }, MainArtist: ${ artist[0] }, Album: ${ album.name }, Time: ${ album.publishTime }'
  const obj = {
    title: '珊湖海',
    artist: ['周杰伦', '梁心颐'],
    album: { publishTime: '2006-11-1', name: '十一月的萧邦' },
  }
  console.log(template(str, obj))
}
test3()
