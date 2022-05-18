const fs = require('fs')

const shouldIgnore = (d) => {
  return (
    d.startsWith('.') ||
    ['node_modules', 'dist', 'package.json', 'package-lock.json', 'LICENSE', 'README.md'].includes(d)
  )
}

const directoryList = {}
const readDir = (path = './', level = 1) => {
  if (level < 0) return
  try {
    const dirs = fs.readdirSync(path)
    // console.log(dirs)
    dirs
      .filter((dir) => !shouldIgnore(dir))
      .forEach((dir) => {
        const str = `[${dir}](${path}${dir})\n`
        if (!directoryList[path]) {
          directoryList[path] = []
        }
        directoryList[path].push(str)
        // console.log(str)
        readDir(`${path}${dir}/`, level - 1)
      })
  } catch (error) {
    return
  }
}

readDir('./')
console.log(directoryList)
const buildDir = (directoryList) => {
  Object.keys(directoryList).forEach((path) => {
    console.log(`### ${path}`)
    const children = directoryList[path]
    children.forEach((child) => {
      console.log(`${child}`)
    })
    console.log('\n\n')
  })
}
buildDir(directoryList)
