export default function storageMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('storage', [
        {
            namespace: 'getItem',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                // 对应的key
                key: ''
            },
            runCode(...rest) {
                // 兼容数组形式
                const args = rest;
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                if (!innerUtil.isObject(options.key)) {
                    options.key = [options.key];
                }

                try {
                    let result = {};

                    options.key.forEach((element) => {
                        result[element] = uni.getStorageSync(element);
                    });

                    options.success && options.success(result);
                    resolve && resolve(result);
                } catch (msg) {
                    const err = {
                        code: 0,
                        msg: `uni.getStorageSync获取值出错:${JSON.stringify(options.key)}`,
                        result: msg
                    };

                    options.error && options.error(err);
                    reject && reject(err);

                    return;
                }
            }
        },
        {
            namespace: 'setItem',
            os: ['miniprogram', 'h5'],
            // 格式为 key: value形式，支持多个key value
            runCode(...rest) {
                const args = rest;
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                try {
                    Object.keys(options).forEach((key) => {
                        if (key !== 'success' && key !== 'error') {
                            const value = options[key];

                            uni.setStorageSync(key, value);
                        }
                    });
                } catch (msg: any) {
                    let errorMsg = '';

                    if (msg.name === 'QuotaExceededError') {
                        errorMsg = '超出本地存储限额，建议先清除一些无用空间!';
                    } else {
                        errorMsg = 'uni.setStorageSync存储值出错';
                    }

                    const err = {
                        code: 0,
                        msg: errorMsg,
                        result: msg
                    };

                    options.error && options.error(err);
                    reject && reject(err);

                    return;
                }

                options.success && options.success({});
                resolve && resolve({});
            }
        },
        {
            namespace: 'removeItem',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                // 对应的key
                key: ''
            },
            runCode(...rest) {
                // 兼容数组形式
                const args = rest;
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                if (!innerUtil.isObject(options.key)) {
                    options.key = [options.key];
                }

                const keys = options.key;

                try {
                    keys.forEach(element => {
                        uni.removeStorageSync(element);
                    });
                } catch (msg) {
                    const err = {
                        code: 0,
                        msg: `uni.removeStorageSync移除值出错:${JSON.stringify(keys)}`,
                        result: msg
                    };

                    options.error && options.error(err);
                    reject && reject(err);

                    return;
                }

                options.success && options.success({});
                resolve && resolve({});
            }
        },
        {
            namespace: 'getShareItem',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                // 对应的key
                key: ''
            },
            runCode(params) {
                const options = params;

                hybridJs.storage.getItem.apply(this, [options]);
            }
        },
        {
            namespace: 'setShareItem',
            os: ['miniprogram', 'h5'],
            runCode(params) {
                const options = params;

                hybridJs.storage.setItem.apply(this, [options]);
            }
        },
        {
            namespace: 'removeShareItem',
            os: ['miniprogram', 'h5'],
            runCode(params, resolve, reject) {
                const options = params;

                hybridJs.storage.removeItem.apply(this, [options]);
            }
        }
    ]);
}
