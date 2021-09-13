// @ts-nocheck
const path = require('path');
const fs = jest.genMockFromModule('fs');
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

const mocks = {}

fs.setMock = (path, error, data)=> {
  mocks[path] = [error,data]
}

fs.readFile = (path, options, callback) => {

  if(callback === undefined){
    callback = options
  }



  
}

module.exports = fs;