// 命令行
const { program } = require('commander')
const minimist = require('minimist')


program.version(require('../package.json').version)
        .usage('<command> [options]')

program.command('create [app-name]')
        .description('create a new project')
        .action((name, options) => {
            console.log(name, options)
        })


program.parse(process.argv)