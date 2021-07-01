'use strict'
// 自动生成工程目录脚本
const path = require('path');

const chalk = require('chalk');
const figlet = require('figlet');
const {program} = require('commander'); // 好像不是很有必要
const inquirer = require('inquirer');
const commander = require('commander');

const config = require('./_config');
const {createFolder, createFile, isObject} = require('./utils/index');

class AutoProject {
    constructor(options){
        this.options = options;
    }
    run(){
        this.init();

    }
    init(){
        console.log(
            chalk.blue(
                figlet.textSync(`XiZh`,{
                    font: "Ghost",
                    horizontalLayout: 'fitted',
                    verticalLayout: 'default',
                })
            )
        )

        this.getProjectConfig();

    }
    async getProjectConfig(){
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
        const questions = [
            {
                type: 'input',
                name: 'project',
                message: '输入项目名',
            },
            // {
            //     type: 'list',
            //     name: 'framework',
            //     message: '选择使用的框架',
            //     choices:['vue', 'react']
            // }, 
        ]
        let res = await inquirer.prompt(questions)
        console.log(res);

        createProject(res)
    }
}

const createProject = (params) => {
    let {project} = params;
    createFolder(project).then(res => {
        createDir(project, config);
    }).catch(err => {
        console.log(err);
    })
}

const createDir = (project, config, filepath = '') => {
    // let curPath = `${project}/${filepath}`;
    let curPath = path.resolve(project, filepath);
    console.log('createDir path-------',curPath);
    config.map(item => {
        if(isObject(item)){
            let p = path.resolve(curPath, item.name)
            if(item.isFile){
                createFile(p)
                // .catch(err => {
                //     console.log(`新建${item.name}文件出现错误`)
                // })
            }
            else{
                createFolder(p).then(res => {
                    if(item.children && item.children.length){
                        let dirPath = `${item.name}/`;
                        createDir(curPath, item.children, dirPath);
                    }
                })
                // .catch(err => {
                //     console.log(`新建${item.name}目录出现错误`)
                // })
            }
        }
        else{
            let p = path.resolve(curPath, item)
            createFile(p)
            // .catch(err => {
            //     console.log(`新建${item}文件出现错误`)
            // })
        }
    })
}


const demo = new AutoProject();
demo.run();