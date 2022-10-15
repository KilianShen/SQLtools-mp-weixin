const Request = {
    POST: (url: string, params: IObject = {}) => {
        return new Promise<any>((resolve, reject) => {
            uni.request({
                url: url,
                data: params,
                success: (res) => {
                    resolve(res);
                    console.info(`%c[POST]${url}`, 'background: #2a53cd')
                    console.info(res);
                },
                fail: (err) => {
                    reject(err);
                }
            });
        })
    },
    GET: (url: string, params: IObject = {}) => {
        return new Promise<any>((resolve, reject) => {
            uni.request({
                url: url,
                data: params,
                success: (res) => {
                    resolve(res);
                    console.info(`%c[GET]${url}`, 'background: #2a53cd')
                    console.info(res);
                },
                fail: (err) => {
                    reject(err);
                }
            });
        })
    }
}
export default Request;