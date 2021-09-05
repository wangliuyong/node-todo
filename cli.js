// 参考：【commander】https://github.com/tj/commander.js
const { add, clear} = require('./index.js')
const { program } = require('commander');
program.version('0.0.1');

program
  .command('add')
  .description('add a task')
  .action((x,{args}) => {
    const title = args.join('')
    add(title)
  });
program
  .command('clear')
  .description('clear all task')
  .action(() => {
    clear().then(() => {
      console.log('清除成功')
    }).catch(() => {
      console.log('清除失败')
    })
  });

program.parse(process.argv);