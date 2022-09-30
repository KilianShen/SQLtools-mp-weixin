const Request = {
    POST: (url: string, params: IObject = {}) => {
        return new Promise<any>((resolve, reject) => {
            uni.request({
                url: url,
                data: params,
                success: (res) => {
                    console.log(1);
                    resolve(res)
                },
                fail: (err) => {
                    console.log(2);
                    reject(err);
                }
            });
        })
    }
}
export default Request;