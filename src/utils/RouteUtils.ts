/**
 * 
 * @desc navigateTo 跳转到应用内的某个页面。但是不能跳到tabbar页面。
 * @param path 页面路径 /pages/xxxxx/xxxxx
 * @param params 跳转带入参数 {a:'AA', b:1, c:fasle}
 * @param mode 跳转模式 TODO
 */
export function RouteUtils(path: string, params?: IObject, mode?: string) {
    const _params = params ?? {}
    const routeName = path + '?' + Object.keys(_params).map((key) => { return `${key}=${_params[key]}` }).join('&');
    wx.navigateTo({
        url: routeName,
        success: () => { },
        fail: (e: any) => {
            console.error('RouteUtils', e)
        }
    });
}