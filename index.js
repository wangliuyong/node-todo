const db = require("./db.js");

module.exports.add = async (title) => {
  // 读取之前的任务
  const list = await db.read();
  // 构造任务
  list.push({ title, done: false });
  // 存储任务
  db.write(list);
};
