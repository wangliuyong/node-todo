// @ts-nocheck
const db = require('../db')

const fs =require('fs');

jest.mock('fs');

describe('db',() => {
  afterEach(() => {
    fs.clearMock()
  })
  it('can read',async() => {
    // expect(fs.setMock instanceof Function).toBe(true);
    const data = [{title:'111',name:'wang1'}]
    fs.setReadMock('/xxxx', null, JSON.stringify(data))
    const list = await db.read('/xxxx')
    expect(list).toStrictEqual(data)
  })

  it('can write',async () => {
    // expect(db.write instanceof Function).toBe(true);
    let writeFile
    fs.setWriteMock('/xx2',(path,data,option,callback) => {
      writeFile = data 
      callback(null)
    })
    const data = [{name:'222',name:'wang2'}]
    await db.write(data,'/xx2')
    expect(writeFile).toBe(JSON.stringify(data))
  })
})