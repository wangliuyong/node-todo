#!/usr/bin/env node

// 参考：【commander】https://github.com/tj/commander.js
const api = require('./index.js')
const { program } = require('commander');
const  pkg = require('./package.json')


program.version(pkg.version);
program
  .option('-d, --debug', 'output extra debugging')

program
  .command('add')
  .description('add a task')
  .action((x,{args}) => {
    const title = args.join('')
    api.add(title).then(() => {
      console.log('添加成功')
    }).catch(() => {
      console.log('添加失败')
    })
  });
program
  .command('clear')
  .description('clear all task')
  .action(() => {
    api.clear().then(() => {
      console.log('清除成功')
    }).catch(() => {
      console.log('清除失败')
    })
  });

program
  .command('show')
  .description('show all operate')
  .action(() => {
    api.showAll()
  });

program
  .command('-')
  .description('show all task')
  .action(() => {
    api.operate()
  });

program.parse(process.argv);
