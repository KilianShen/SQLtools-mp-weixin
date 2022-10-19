import Router from "./module/Router";
import Basic from "./module/Basic";
import Request from "./module/Request";
import log from './module/log'
const appUtils = {
  // 基础功能
  ...Basic,
  // 路由相关
  ...Router,
  // 发起请求
  ...Request,
  // 实时日志管理器
  log
};

export default appUtils;