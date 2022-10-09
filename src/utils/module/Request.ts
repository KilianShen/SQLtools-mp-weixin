const Request = {
    POST: (url: string, params: IObject = {}) => {
        return new Promise<any>((resolve, reject) => {
            uni.request({
                url: url,
                data: params,
                success: (res) => {
                    resolve(res)
                },
                fail: (err) => {
                    reject(err);
                }
            });
        })
    }
}
export default Request;