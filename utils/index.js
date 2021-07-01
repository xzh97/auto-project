const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const createFolder = (foldername) => {
    return new Promise((resolve, reject) => {
        // let dirPath = `${process.cwd()}/${foldername}`
        let dirPath = path.resolve(process.cwd(),foldername)
        console.log('目录路径---', dirPath);
        fs.mkdir(dirPath,{recursive:true},(err) => {
            if(err){
                reject(err)
                console.log(chalk.redBright(`创建${foldername}目录失败`));
            }
            else{
                resolve()
                console.log(chalk.blue(`创建${foldername}目录成功`));
            }
        })
    })
    
}

const createFile = (name) => {
    return new Promise((resolve, reject) => {
        let filepath = path.resolve(process.cwd(),name);
        console.log('文件路径---', filepath);
        fs.writeFile(filepath,'',(err => {
            if(err){
                reject(err)
                console.log(`新建${name}文件错误：`,err)

            }
            else{
                resolve()
                console.log(`新建${name}文件成功：`)
            }
        }))
    })
    
}

const isObject = (val) => {
    return typeof val === 'object' && val !== null
}

module.exports = {
    createFolder,
    createFile,
    isObject
}