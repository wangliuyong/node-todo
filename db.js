const fs = require("fs");
const path = require("path");
// home路径，兼容macOS  windows
const homePath = process.env.HOME || require("os").homedir();
// 构造存储数据的文件路径
const dbPath = path.join(homePath, ".todo");

/**
 * @description  读取文件todo，没有就会创建todo（{flag:'a+'}）
 * @param {homePath} path home的路径
 * @returns Promise
 */
module.exports.read = (path = homePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, { flag: "a+" }, async (error, data) => {
      if (error) {
        return reject(error);
      } else {
        let list;
        try {
          list = JSON.parse(data.toString());
        } catch (error) {
          list = [];
        }
        resolve(list);
      }
    });
  });
};

/**
 * @description 将内容写入文件
 * @param {Array} list 
 * @param {homePath} path 
 * @returns Promise
 */
module.exports.write = (list, path = homePath) => {
  return new Promise((resolve, reject) => {
    const strings = JSON.stringify(list);
    fs.writeFile(dbPath, strings, (error) => {
      if (error) {
        return reject(error);
      } else {
        resolve();
      }
    });
  });
};
