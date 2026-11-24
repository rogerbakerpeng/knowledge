/*
 * 作者: 吴松泽
 * 创建时间: 2020-06-15 09:07:04
 * 修改时间: 2020-06-17 19:23:38
 * 版本: [1.0]
 * 版权: 江苏国泰新点软件有限公司
 * 描述:
 */
/**
 * 统一调用迅盟API
 * @param {Object} args 传参
 * @param {String} api api名称
 * @param {Boolean} isPromise 是否支持promise
 */
export default function callXmByArgs(args:any, api:string|((opt:any) => Promise<any>), isPromise?: boolean) {
    const options = args[0];
    // const resolve = options.success;
    // const reject = options.error;
    const resolve = args[1];
    const reject = args[2];

    if (api && typeof api === 'function') {
        const dataFilter = options.dataFilter;
        const opt = options.params ? options.params : options;

        if (isPromise === undefined || isPromise === true) {
            api(opt)
                .then((result) => {
                    let newResult = result;

                    if (dataFilter) {
                        newResult = dataFilter(result);
                    }
                    options.success && options.success(newResult);
                    resolve && resolve(newResult);
                })
                .catch((error) => {
                    options.error && options.error(error);
                    reject && reject(error);
                });
        } else if (isPromise === false) {
            api(opt);
            options.success && options.success();
            resolve && resolve();
        }
    } else {
        console.error('api不存在');
    }
}
