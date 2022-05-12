// AbcdEfghiJklMN -> abcd_efghi_jkl_m_n

const transform = (str) => {
  const ACode = 'A'.charCodeAt()
  const ZCode = 'Z'.charCodeAt()
  let res = ''
  for (let ch of str) {
    if (ch.charCodeAt() >= ACode && ch.charCodeAt() <= ZCode) {
      res += `_${ch.toLowerCase()}`
    } else {
      res += `${ch.toLowerCase()}`
    }
  }
  console.log(res.substring(1, res.length))
  return res.substring(1, res.length)
}

const transform1 = (str) => {
  if (typeof str !== 'string') {
    throw new Error('str must be a string')
  }
  const ACode = 'A'.charCodeAt()
  const ZCode = 'Z'.charCodeAt()
  return str
    .split('')
    .map((ch, i) => {
      if (ch.charCodeAt() >= ACode && ch.charCodeAt() <= ZCode) {
        return i === 0 ? ch.toLowerCase() : `_${ch.toLowerCase()}`
      }
      return ch
    })
    .join('')
}

transform1('AbcdEfghiJklMN')

function test() {
  function foo() {
    console.log('foo')
    foo()
  }
  function bar() {
    console.log('bar')
    setTimeout(() => {
      bar()
    }, 0)
  }
  function fooBar() {
    console.log('fooBar')
    new Promise((resolve) => {
      resolve()
    }).then(fooBar())
  }

  // foo()
  // bar()
  // fooBar()
}
test()

// pattern
// 驼峰命名转下划线命名
function toUnderLine(str) {
  return str.replace(/[A-Z]/g, function (ch, i) {
    return (i === 0 ? '' : '_') + ch.toLowerCase()
  })
}
console.log(toUnderLine('YxjComCn'))
console.log(toUnderLine('axjComCn'))

// 下划线命名转驼峰命名
function toUpperCase(str) {
  // 匹配一个或多个下划线+ 后一个不是以下划线开头的字符
  return str.replace(/(?:_)+([^_])/g, function (ch, p1, i) {
    return p1.toUpperCase()
  })
}
console.log(toUpperCase('__name_yxj_com')) // NameYxjCom
