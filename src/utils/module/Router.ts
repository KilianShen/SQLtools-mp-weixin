import _ from 'lodash';

const Router = {
    /**
     * @desc navigateTo 跳转到应用内的某个页面。但是不能跳到tabbar页面。
     * @param path 页面路径 /pages/xxxxx/xxxxx
     * @param params 跳转带入参数 {a:'AA', b:1, c:fasle}
     * @param mode 跳转模式 TODO
     */
    push: (path: string, params: IObject = {}, mode?: string) => {
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
    },

    /**
     * @desc navigateBack 关闭当前页面，返回上一页面或多级页面
     * @param params 跳转带入参数 {a:'AA', b:1, c:fasle}
     */
    back: (params?: IObject) => {
        uni.navigateBack({
            animationType: "slide-out-left",
        });
    },

    /**
     * @return 当前页面路径
     */
    getCurrentPages: (d: IObject = {}) => {
        try {
            const navs = getCurrentPages();
            const lastNav = (navs[navs.length - 1] as IObject) || {};
            const opts = {
                ...lastNav.options,
                ...d,
            };
            const route = d.route || lastNav.route;
            delete opts.route;
            let p = _.isEmpty(d) ? `${route}` : `${route}?${Object.keys(opts)
                .map((k) => {
                    return `${k}=${opts[k]}`;
                })
                .join('&')}`;
            return `/${p}`.replace(/^\/+/gi, '/');
        } catch (error) {
            return '';
        }
    },
    /**
     * 路径拼接参数 /pages/testPage?userId=007&extraData=someData
     * @param url:路由
     * @param params:拼接参数
     * @returns 新的小程序路径
     */
    urlAddParams: (url: string, params: IObject = {}) => {
        if (params) {
            return `${url}?${Object.keys(params)
                .map((k) => `${k}=${params[k]}`)
                .join('&')}`.replace('??', '?');
        }
        return url;
    },
}

export default Router;