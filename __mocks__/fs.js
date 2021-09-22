// @ts-nocheck
const path = require('path');
// 生成fs
const fs = jest.genMockFromModule('fs');
// 获取到真正的fs
const _fs = jest.requireActual('fs')

// 将真正的fs生的属性复制到生成的fs上面
Object.assign(fs, _fs)

const mocks = {}

// 添加方法
fs.setMock = (path, error, data)=> {
  mocks[path] = [error,data]
}

fs.readFile = (path, options, callback) => {
  if(callback === undefined){
    callback = options
  }

  if(path in mocks){
    callback(...mocks[path])
  } else {
    _fs.readFile(path, options, callback)
  }
}

module.exports = fs;