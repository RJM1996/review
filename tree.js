const fs = require('fs')

const shouldIgnore = (d) => {
  return (
    d.startsWith('.') ||
    ['node_modules', 'dist', 'package.json', 'package-lock.json', 'LICENSE', 'README.md', 'pptx'].includes(d)
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
        if (!dir.includes('pptx')) {
          const str = `[${dir}](${path}${dir})\n`
          if (!directoryList[path]) {
            directoryList[path] = []
          }
          directoryList[path].push(str)
          // console.log(str)
          readDir(`${path}${dir}/`, level - 1)
        }
      })
  } catch (error) {
    return
  }
}

readDir('./')
console.log(directoryList)
const buildDir = (directoryList) => {
  const readmePath = './README.md'
  fs.rmSync(readmePath, { force: true })
  const fd = fs.openSync(readmePath, 'w+')
  console.log('fd', fd)
  fs.writeSync(fd, '## TIL \n > Today I Learned \n ### 记录每天学到的知识点\n\n')
  Object.keys(directoryList).forEach((path) => {
    const title = `### ${path}\n`
    console.log(title)

    fs.writeSync(fd, title)
    const children = directoryList[path]
    children.forEach((child) => {
      const subTitle = `#### ${child}`
      console.log(subTitle)
      fs.writeSync(fd, subTitle)
    })
    console.log('\n\n')
    fs.writeSync(fd, '\n\n')
  })
}
buildDir(directoryList)
