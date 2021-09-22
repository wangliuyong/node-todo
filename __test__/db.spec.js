// @ts-nocheck
const db = require('../db')

const fs =require('fs');
const { log } = require('console');

jest.mock('fs');

describe('db',() => {
  it('can read',async() => {
    // expect(fs.setMock instanceof Function).toBe(true);
    const data = [{title:'111',name:'wang'}]
    fs.setMock('/xxxx', null, JSON.stringify(data))
    const list = await db.read('/xxxx')
    expect(list).toStrictEqual(data)
  })

  it('can write',() => {
    expect(db.write instanceof Function).toBe(true);
  })
})