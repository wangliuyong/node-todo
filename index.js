const db = require("./db.js");
const inquirer = require("inquirer");
/**
 * 添加任务
 * @param {string} title 任务名称
 */
module.exports.add = async (title) => {
  // 读取之前的任务
  const list = await db.read();
  // 构造任务
  list.push({ title, done: false });
  // 存储任务
  db.write(list);
};

/**
 * 清除所有任务
 */
module.exports.clear = async () => {
  await db.write([]);
};

/**
 * 展示所有任务
 */
module.exports.showAll = async () => {
  const list = await db.read();
  list.forEach((task, index) => {
    console.log(`${task.done ? "[x]" : "[_]"}  ${task.title}-`);
  });
};

module.exports.operate = async () => {
  const list = await db.read();
  inquirer
    .prompt([
      {
        type: "list",
        message: "请选择一个选项：",
        name: "index",
        default: "index",
        choices: [{name:'退出', value:'-1'},...list.map((task, index) => {
          return {
            name: `${task.done ? "[x]" : "[_]"} ${index} ${task.title}`,
            value: index,
          };
        }),{name:'添加一个任务',value:'-2'}],
      },
    ])
    .then((answer) => {
      console.log(answer);
    });
};
