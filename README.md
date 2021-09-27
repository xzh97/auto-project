## XIZH-CLI

目的是为了能够配置化的生成初始化工程项目模板，而不是需要自己去弄

同时是为了学习一下脚手架的原理


### cli流程分析

-  用户自定义的内容
    - 项目名 name
    - 项目描述 description
    - 框架选择 framework
        - vue
        - react

- 下载模板：根据框架选择下载对应的工程模板
- 写入自定义的内容到package.json
- 安装依赖

### todoList
- [x] 可以用`xizh create 'projectName'`来做到`new CLI.run()`
- [x] 项目模板git工程



