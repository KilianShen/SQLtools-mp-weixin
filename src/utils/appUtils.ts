import Router from "./module/Router";
import Basic from "./module/Basic";
import Request from "./module/Request";
const appUtils = {
  // 基础功能
  ...Basic,
  // 路由相关
  ...Router,
  // 发起请求
  ...Request,
};

export default appUtils;