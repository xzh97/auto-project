#!/usr/bin/env node
/*
 * @Author: xizh
 * @Date: 2021-08-01 21:44:04
 * @Last Modified by: xizh
 * @Last Modified time: 2021-09-22 22:34:21
 */

const { program } = require("commander");
const minimist = require("minimist");
const XizhCli = require("../index");


program
    .version(require("../package.json").version)
    .usage("<command> [options]");

program
    .command("create [app-name]")
    .description("create a new project")
    .action((name, options) => {
        console.log(name, options);
        let params = {
            name
        }
        const instance = new XizhCli(params);
        instance.run();
    });

program.parse(process.argv);