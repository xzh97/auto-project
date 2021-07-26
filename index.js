/*
 * @Author: xizh 
 * @Date: 2021-07-21 22:57:14 
 * @Last Modified by: xizh
 * @Last Modified time: 2021-07-24 23:22:47
 */

'use strict'

const path = require('path');
const fs = require('fs')

const chalk = require('chalk');
const figlet = require('figlet');
const ora = require('ora');
const inquirer = require('inquirer');

const {createFolder, createFile, isObject} = require('./utils/index');
const downloadRepo = require('download-git-repo')

class XizhCli {
    constructor(options){
        this.options = options;
        this.config = null;
        this.rules = [
            {
                key: 'name',
                required: true,
            },
            {
                key: 'description',
                required: false,
                defaultValue: 'a Vue.js or React.js Project'
            },
            {
                key: 'author',
                required: false,
            },
            {
                key: 'framework',
                required: true,
                defaultValue: 'vue'
            },
        ]
        this.questions = [
            {
                type: 'input',
                name: 'name',
                message: '项目名称',
            },
            {
                type: 'input',
                name: 'description',
                message: '项目描述',
            },
            {
                type: 'input',
                name: 'author',
                message: '作者名',
            },
            {
                type: 'list',
                name: 'framework',
                message: '使用框架',
                choices:['vue']
            }, 
        ]
    }
    run(){
        console.log(
            chalk.blue(
                figlet.textSync(`xizh-cli`,{
                    font: "Ghost",
                    horizontalLayout: 'fitted',
                    verticalLayout: 'default',
                })
            )
        )
        this.init();
    }
    
    init(){
        /**
         *  type：表示提问的类型，包括：input, confirm, list, rawlist, expand, checkbox, password, editor；
            name: 存储当前问题回答的变量；
            message：问题的描述；
            default：默认值；
            choices：列表选项，在某些type下可用，并且包含一个分隔符(separator)；
            validate：对用户的回答进行校验；
            filter：对用户的回答进行过滤处理，返回处理后的值；
            transformer：对用户回答的显示效果进行处理(如：修改回答的字体或背景颜色)，但不会影响最终的答案的内容；
            when：根据前面问题的回答，判断当前问题是否需要被回答；
            pageSize：修改某些type类型下的渲染行数；
            prefix：修改message默认前缀；
            suffix：修改message默认后缀。
         */
        
        inquirer.prompt(this.questions).then(res => {
            this.validateConfig(res).then(res => {
                this.config = res;
                this.downloadTemplate()
            }).catch(err => {
                console.log('输入参数有误',err.msg)
            })
        }).catch(err => {
            console.log('初始化错误', err)
        })

    }
    downloadTemplate = () => {
        // 1. download git 仓库
        const spinner = ora('downloading template').start();
        spinner.color = 'blue'

        downloadRepo(`github:xzh97/vue-project-template`, `${__dirname}/${this.config.name}/`, err => {
            spinner.stop()
            if(!err){
                // 把自定义的内容写入模板内
                console.log(chalk.blue(`downloading template success}`))
                this.writeConfig()

            }
            else{
                console.log(chalk.blue('download template error'))
                console.log(err)
            }
        })
        
    }
    validateConfig(res){
        return new Promise((resolve, reject) => {
            this.rules.forEach(item => {
                let { key, required, defaultValue = '' } = item;
                let val = res[key];
                let configInfo = this.questions.find(item => item.name === key)
                if(val){

                }
                else{
                    if(required){
                        let str = configInfo.type === 'input' ? '输入' : '选择'
                        let err = {
                            msg: `请${str}${configInfo.message}`
                        }
                        console.log(err.msg)
                        reject(err)
                    }
                    else{
                        res[key] = defaultValue
                    }
                }
                resolve(res)
            })
        })
    }
    writeConfig(){
        let { name, description, author } = this.config;
        let packageJsonPath = path.resolve(__dirname, name)
        let packageJSON = require(packageJsonPath)
        console.log(packageJSON);

    }
}

// const createDir = (project, config, filepath = '') => {
//     // let curPath = `${project}/${filepath}`;
//     let curPath = path.resolve(project, filepath);
//     console.log('createDir path-------',curPath);
//     config.map(item => {
//         if(isObject(item)){
//             let p = path.resolve(curPath, item.name)
//             if(item.isFile){
//                 createFile(p)
//                 // .catch(err => {
//                 //     console.log(`新建${item.name}文件出现错误`)
//                 // })
//             }
//             else{
//                 createFolder(p).then(res => {
//                     if(item.children && item.children.length){
//                         let dirPath = `${item.name}/`;
//                         createDir(curPath, item.children, dirPath);
//                     }
//                 })
//                 // .catch(err => {
//                 //     console.log(`新建${item.name}目录出现错误`)
//                 // })
//             }
//         }
//         else{
//             let p = path.resolve(curPath, item)
//             createFile(p)
//             // .catch(err => {
//             //     console.log(`新建${item}文件出现错误`)
//             // })
//         }
//     })
// }

const demo = new XizhCli();
demo.run();