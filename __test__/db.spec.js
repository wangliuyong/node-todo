// @ts-nocheck
const db = require('../db')

const fs =require('fs')

jest.mock('fs');

describe('db',() => {
  it('can read',() => {
    // expect(db.read instanceof Function).toBe(true);
    expect(fs.x()).toBe('xxx')
  })

  it('can write',() => {
    expect(db.write instanceof Function).toBe(true);
  })
})