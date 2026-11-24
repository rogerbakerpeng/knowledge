export default function storageMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('storage', [
        {
            namespace: 'getItem',
            os: ['h5'],
            defaultParams: {
                // 对应的key
                key: ''
            },
            runCode(params, resolve, reject) {
                const options = params;
                const success = options.success;
                const error = options.error;

                if (!innerUtil.isObject(options.key)) {
                    options.key = [options.key];
                }

                const keys = options.key;
                const values = {};

                try {
                    for (let i = 0, len = keys.length; i < len; i += 1) {
                        const value = localStorage.getItem(keys[i]);

                        values[keys[i]] = value;
                    }
                } catch (msg) {
                    const err = {
                        code: 0,
                        msg: `localStorage获取值出错:${JSON.stringify(keys)}`,
                        result: msg
                    };

                    error && error(err);
                    reject && reject(err);

                    return;
                }

                success && success(values);
                resolve && resolve(values);
            }
        },
        {
            namespace: 'setItem',
            os: ['h5'],
            runCode(params, resolve, reject) {
                const options = params;
                const success = options.success;
                const error = options.error;

                try {
                    Object.keys(options).forEach((key) => {
                        if (key !== 'success' && key !== 'error') {
                            const value = options[key];

                            localStorage.setItem(key, value);
                        }
                    });
                } catch (msg: any) {
                    let errorMsg = '';

                    if (msg.name === 'QuotaExceededError') {
                        errorMsg = '超出本地存储限额，建议先清除一些无用空间!';
                    } else {
                        errorMsg = 'localStorage存储值出错';
                    }

                    const err = {
                        code: 0,
                        msg: errorMsg,
                        result: msg
                    };

                    error && error(err);
                    reject && reject(err);

                    return;
                }

                success && success({});
                resolve && resolve({});
            }
        },
        {
            namespace: 'removeItem',
            os: ['h5'],
            defaultParams: {
                // 对应的key
                key: ''
            },
            runCode(params, resolve, reject) {
                const options = params;
                const success = options.success;
                const error = options.error;

                if (!innerUtil.isObject(options.key)) {
                    options.key = [options.key];
                }

                const keys = options.key;

                try {
                    for (let i = 0, len = keys.length; i < len; i += 1) {
                        localStorage.removeItem(keys[i]);
                    }
                } catch (msg) {
                    const err = {
                        code: 0,
                        msg: `localStorage移除值出错:${JSON.stringify(keys)}`,
                        result: msg
                    };

                    error && error(err);
                    reject && reject(err);

                    return;
                }

                success && success({});
                resolve && resolve({});
            }
        },
        {
            namespace: 'getShareItem',
            os: ['h5'],
            defaultParams: {
                // 对应的key
                key: ''
            },
            runCode(params, resolve, reject) {
                const options = params;

                hybridJs.storage.getItem.apply(this, [options]);
            }
        },
        {
            namespace: 'setShareItem',
            os: ['h5'],
            runCode(params, resolve, reject) {
                const options = params;

                hybridJs.storage.setItem.apply(this, [options]);
            }
        },
        {
            namespace: 'removeShareItem',
            os: ['h5'],
            runCode(params, resolve, reject) {
                const options = params;

                hybridJs.storage.removeItem.apply(this, [options]);
            }
        }
    ]);
}
