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

/**
 * 所有操作
 */
module.exports.operate = async () => {
  const list = await db.read();
  // print  task
  printTask(list);
};

function askOperate(list, index) {
  inquirer
    .prompt([
      {
        type: "list",
        message: "请选择一个操作",
        name: "action",
        choices: [
          { name: "退出", value: "quit" },
          { name: "已完成", value: "done" },
          { name: "未完成", value: "unDone" },
          { name: "改标题", value: "updateTitle" },
          { name: "删除", value: "remove" },
        ],
      },
    ])
    .then((answer) => {
      // operate
      switch (answer.action) {
        case "done":
          list[index].done = true;
          db.write(list);
          break;
        case "unDone":
          list[index].done = false;
          db.write(list);
          break;
        case "updateTitle":
          inquirer
            .prompt([
              {
                type: "input",
                message: "输入新的标题：",
                name: "title",
                default: list[index].title,
              },
            ])
            .then((answer) => {
              list[index].title = answer.title;
              db.write(list);
            });
          break;
        case "remove":
          list.splice(index, 1);
          db.write(list);
          break;
        default:
          break;
      }
    });
}

function printTask(list) {
  inquirer
    .prompt([
      {
        type: "list",
        message: "请选择一个选项：",
        name: "index",
        default: "index",
        choices: [
          { name: "退出", value: "-1" },
          ...list.map((task, index) => {
            return {
              name: `${task.done ? "[x]" : "[_]"} ${index} ${task.title}`,
              value: index,
            };
          }),
          { name: "+添加一个任务", value: "-2" },
        ],
      },
    ])
    .then((answer) => {
      const index = parseInt(answer.index);
      if (index >= 0) {
        // ask  operate
        askOperate(list, index);
      }

      if (index === -2) {
        inquirer
          .prompt([
            {
              type: "input",
              message: "输入任务名称：",
              name: "title",
            },
          ])
          .then((answer) => {
            list.push({
              title: answer.title,
              done: false,
            });
            db.write(list);
          });
      }
    });
}
