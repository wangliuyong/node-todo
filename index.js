const {read, write} = require('./db.js')

module.exports.add =  async(title) => {
  const list = await read()
  list.push({
    title,
    done: false
  })
  write(list)
}