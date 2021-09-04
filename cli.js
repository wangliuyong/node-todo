// 参考：【commander】https://github.com/tj/commander.js
const { add } = require('./index.js')
const { program } = require('commander');
program.version('0.0.1');


program
  .option('-d, --debug', 'output extra debugging')

// const options = program.opts();
// Command implemented using action handler (description is supplied separately to `.command`)
// Returns new command for configuring.
program
  .command('add')
  .description('add a task')
  .action((x,{args}) => {
    // const xx = args.slice(0,-1) 
    add(args)
    // console.log(args);
  });
program
  .command('clear')
  .description('clear all task')
  .action((x,{args}) => {
    // const xx = args.slice(0,-1) 
    // console.log(args);
  });

program.parse(process.argv);