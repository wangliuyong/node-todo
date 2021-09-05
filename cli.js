// 参考：【commander】https://github.com/tj/commander.js
const api = require('./index.js')
const { program } = require('commander');
program.version('0.0.1');

program
  .option('-d, --debug', 'output extra debugging')

program
  .command('add')
  .description('add a task')
  .action((x,{args}) => {
    const title = args.join('')
    api.add(title)
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

program.parse(process.argv);


if(process.argv.length === 2){
  api.showAll()
}