/**
 * 
 * @desc navigateTo 跳转到应用内的某个页面。但是不能跳到tabbar页面。
 * @param path 页面路径 /pages/xxxxx/xxxxx
 * @param params 跳转带入参数 {a:'AA', b:1, c:fasle}
 * @param mode 跳转模式 TODO
 */
export function push(path: string, params: IObject = {}, mode?: string) {
    path = `/${path}`.replace(/^\/+/, "/");
    const url =
        path +
        "?" +
        Object.keys(params)
            .map((key) => {
                return `${key}=${params[key]}`;
            })
            .join("&");
    if (mode === "replace") {
        uni.redirectTo({
            url,
            fail: () => {
                console.warn("路由替换失败");
            },
        });
    } else if (mode === "reset") {
        uni.reLaunch({
            url,
            fail: () => {
                console.warn("路重置失败");
            },
        });
    } else {
        console.log("getCurrentPages()\n", getCurrentPages());
        uni.navigateTo({
            url,
            animationType: "slide-in-right",
            fail: (err: any) => {
                console.warn("路由跳转失败", err);
            },
        });
    }
}

/**
 * 
 * @desc navigateBack 关闭当前页面，返回上一页面或多级页面
 * @param params 跳转带入参数 {a:'AA', b:1, c:fasle}
 */
export function back(params?: IObject) {
    uni.navigateBack({
        animationType: "slide-out-left",
    });
}