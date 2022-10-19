/** 实时日志功能 基础库2.7.1 开始支持
 * https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/wx.getRealtimeLogManager.html
 * 开发者可从小程序管理后台“开发->开发管理->运维中心->实时日志”进入小程序端日志查询页面
*/
const logger = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null
const log = {
    debug(...data: any[]) {
        if (!logger) return
        logger.debug.apply(logger, data)
    },
    info(...data: any[]) {
        if (!logger) return
        logger.info.apply(logger, data)
    },
    warn(...data: any[]) {
        if (!logger) return
        logger.warn.apply(logger, data)
    },
    error(...data: any[]) {
        if (!logger) return
        logger.error.apply(logger, data)
    },
    setFilterMsg(msg: string) { // 从基础库2.7.3开始支持
        if (!logger || !logger.setFilterMsg) return
        if (typeof msg !== 'string') return
        logger.setFilterMsg(msg)
    },
    addFilterMsg(msg: string) { // 从基础库2.8.1开始支持
        if (!logger || !logger.addFilterMsg) return
        if (typeof msg !== 'string') return
        logger.addFilterMsg(msg)
    }
}
export default log;