#! /usr/bin/env node
let package = require('../package.json')

let commander = require('commander')
let parser = {
  port:3000,
  host:'localhost',
  dir:process.cwd()
}
commander.on('--help',()=>{
  console.log('usage:')
  console.log('  http-server -p 3000')
})
let args = commander
            .version(package.version)
            // 配置参数
            .option('-p,--port <v>','server port')
            .option('-o,--host <v>','server hostname')
            .option('-d,--dir <v>','server directory')
            .parse(process.argv)

parser = {...parser,...args}
console.log('==>',parser.dir)

let Server = require('../server')
let server = new  Server({...parser,...args})
server.start() // 启动服务
