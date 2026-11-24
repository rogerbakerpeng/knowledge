export default function storageMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;
    const storage = weex.requireModule('storage');

    hybridJs.extendModule('storage', [
        {
            namespace: 'getItem',
            os: ['weex'],
            defaultParams: {
                // 对应的key
                key: ''
            },
            runCode(...rest) {
                // 兼容数组形式
                const args = rest;
                const options = args[0];
                const success = options.success;
                const error = options.error;
                const resolve = args[1];
                const reject = args[2];

                delete options.success;
                delete options.error;

                if (!innerUtil.isObject(options.key)) {
                    options.key = [options.key];
                }

                args[0] = options;

                let keys = options.key;
                let len = keys.length;
                let result = {};
                let getItemFunc = () => {
                    len--;
                    if (keys[len]) {
                        storage.getItem(keys[len], (e) => {
                            if (e.result === 'success') {
                                result[keys[len]] = e.data;
                            } else {
                                result[keys[len]] = '';
                            }

                            if (len > 0) {
                                getItemFunc();
                            } else {
                                success && success(result);
                                resolve && resolve(result);
                            }
                        });
                    } else {
                        let msg = 'weex端存储的键或值都不允许设置空字符串或null';

                        error && error(msg);
                        reject && reject(msg);
                    }
                };

                getItemFunc();
            }
        },
        {
            namespace: 'setItem',
            os: ['weex'],
            // 格式为 key: value形式，支持多个key value
            runCode(...rest) {
                // 兼容数组形式
                const args = rest;
                const options = args[0];
                const success = options.success;
                const error = options.error;
                const resolve = args[1];
                const reject = args[2];

                delete options.success;
                delete options.error;

                let keys = Object.keys(options);
                let len = keys.length;
                let setItemFunc = () => {
                    len--;
                    storage.setItem(keys[len], options[keys[len]], (e) => {
                        if (e.result === 'success') {
                            if (len > 0) {
                                setItemFunc();
                            } else {
                                success && success();
                                resolve && resolve();
                            }
                        } else if (e.data === 'invalid_param') {
                            let msg = 'weex端存储的键或值都不允许设置空字符串或null';

                            error && error(msg);
                            reject && reject(msg);
                        }
                    });
                };

                setItemFunc();
            }
        },
        {
            namespace: 'removeItem',
            os: ['weex'],
            defaultParams: {
                // 对应的key
                key: ''
            },
            runCode(...rest) {
                // 兼容数组形式
                const args = rest;
                const options = args[0];
                const success = options.success;
                const error = options.error;
                const resolve = args[1];
                const reject = args[2];

                delete options.success;
                delete options.error;

                if (!innerUtil.isObject(options.key)) {
                    options.key = [options.key];
                }

                args[0] = options;
                let keys = options.key;
                let len = keys.length;
                let removeItemFunc = () => {
                    len--;
                    storage.removeItem(keys[len], (e) => {
                        if (e.result === 'success') {
                            if (len > 0) {
                                removeItemFunc();
                            } else {
                                success && success();
                                resolve && resolve();
                            }
                        } else {
                            let msg = 'weex端存储的键或值都不允许设置空字符串或null';

                            error && error(msg);
                            reject && reject(msg);
                        }
                    });
                };

                removeItemFunc();
            }
        }
    ]);
}
