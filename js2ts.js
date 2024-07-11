const fs = require('fs')

// 修改前的内容
const updateStr = '.js'
// 要替换的内容
const newStr = '.ts'

const path = './src/utils'
const files = fs.readdirSync(path)
files.forEach((file, index) => {
  if (file.includes(updateStr)) {
    const newName = file.replace(updateStr, newStr)
    fs.rename(`${path}/${files[index]}`, `${path}/${newName}`, (err) => {
      if (!err) {
        console.log(`${newName} 已重命名！`)
      }
    })
  }
})
