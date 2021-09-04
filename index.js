const fs = require('fs')
const path = require('path')

// home路径，兼容macOS  windows
const homePath = process.env.HOME || require('os').homedir()  
// 构造存储数据的文件
const dbPath = path.join(homePath,'.todo')

module.exports.add = (title) => {
  // 读取文件todo，没有就会创建todo（{flag:'a+'}）
  fs.readFile(dbPath,{flag:'a+'}, (err1, data) => {
    if (err1) {
      console.log(err1)
    } else {
      let list
      try {
        list = JSON.parse(data.toString())
      } catch (error) {
        list = []
      }

      const task = {
        title,
        done: false
      }

      list.push(task)
      
      const strings = JSON.stringify(list) 

      fs.writeFile(dbPath,strings,(err2) => {
        console.log(err2)
      })

    }
    




    console.log(data.toString());
  });
}