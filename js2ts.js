const fs = require('fs')

const replaceFileFun = (path) => {
  // 修改前的内容
  const updateStr = '.js'
  // 要替换的内容
  const newStr = '.ts'
  const files = fs.readdirSync(path)
  files.forEach((file, index) => {
    const filePath = `${path}/${file}`
    fs.stat(filePath, (err, data) => {
      // 如果是文件夹，读取下级
      if (data.isDirectory()) {
        replaceFileFun(filePath)
      }
      // 否则，替换js文件为ts
      else if (file.includes(updateStr)) {
        const newName = file.replace(updateStr, newStr)
        fs.rename(`${path}/${files[index]}`, `${path}/${newName}`, (err) => {
          if (!err) {
            console.log(`${path}/${newName} 已重命名！`)
          }
        })
      }
    })
  })
}

replaceFileFun('./src/utils')
