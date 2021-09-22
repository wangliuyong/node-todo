// @ts-nocheck
const path = require('path');
// 生成fs
const fs = jest.genMockFromModule('fs');
// 获取到真正的fs
const _fs = jest.requireActual('fs')

// 将真正的fs生的属性复制到生成的fs上面
Object.assign(fs, _fs)

const readMocks = {}

// 添加方法
fs.setReadMock = (path, error, data)=> {
  readMocks[path] = [error,data]
}

fs.readFile = (path, options, callback) => {
  if(callback === undefined){
    callback = options
  }

  if(path in readMocks){
    callback(...readMocks[path])
  } else {
    _fs.readFile(path, options, callback)
  }
}

module.exports = fs;