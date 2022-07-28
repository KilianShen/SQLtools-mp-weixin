#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
let exec = require("child_process").exec;
function execute (cmd) {
  console.log(cmd);
  exec(cmd, function (error, stdout, stderr) {
    if (error) {
      console.error(error);
    } else {
      console.log("success");
    }
  });
}

let isWin = /^win/.test(process.platform);
let cliPath = "/Applications/wechatwebdevtools.app/Contents/MacOS/cli";
if (isWin) {
  cliPath = "C:\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat";
}

const cli = process.env.APEX_WX_TOOLS || cliPath;

if (!fs.existsSync(cli)) {
  console.warn("开发者工具路径不存在: 请在环境变量里设置 APEX_WX_TOOLS 设置为${开发者工具的路径}\\cli.bat");
  console.log("默认开发者工具路径:" + cli);
  return;
}

try {
  execute(`${cli} open --project ${process.cwd()}/dist/${process.argv[2]}/mp-weixin`);
} catch (e) {
  console.warn("自动开启微信开发者工具失败")
}
