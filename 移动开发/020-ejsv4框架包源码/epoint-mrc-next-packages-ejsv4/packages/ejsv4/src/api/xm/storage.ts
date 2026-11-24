export default function storageMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.extendModule('storage', [
        {
            namespace: 'setItem',
            os: ['xm'],
            runCode(params, resolve) {
                const options = params;
                const success = options.success;

                Object.keys(options).forEach((key) => {
                    if (key !== 'success' && key !== 'error') {
                        const value = options[key];

                        xm.setStorage({
                            key,
                            value
                        });
                    }
                });
                success && success({});
                resolve && resolve({});
            }
        },
        {
            namespace: 'getItem',
            os: ['xm'],
            runCode(params, resolve) {
                const options = params;
                const success = options.success;
                const res = {};
                const getStorage = (key) =>
                    new Promise<void>((r) => {
                        xm.getStorage({
                            key
                        }).then((data) => {
                            res[key] = data;
                            r();
                        });
                    });
                const array = [];

                if (options.key instanceof Array) {
                    options.key.forEach((key) => {
                        array.push(getStorage(key));
                    });
                } else {
                    array.push(getStorage(options.key));
                }
                Promise.all(array).then(() => {
                    success && success(res);
                    resolve && resolve(res);
                });
            }
        },
        {
            namespace: 'removeItem',
            os: ['xm'],
            runCode(params, resolve) {
                const options = params;
                const success = options.success;

                const removeStorage = (key) =>
                    new Promise<void>((r) => {
                        xm.removeStorage({
                            key
                        }).then(() => {
                            r();
                        });
                    });
                const array = [];

                if (options.key instanceof Array) {
                    options.key.forEach((key) => {
                        array.push(removeStorage(key));
                    });
                } else {
                    array.push(removeStorage(options.key));
                }
                Promise.all(array).then(() => {
                    success && success({});
                    resolve && resolve({});
                });
            }
        },
        {
            // 小程序通用数据库取数据
            namespace: 'getShareItem',
            os: ['xm'],
            defaultParams: {
                // 对应的key
                key: ''
            },
            runCode(params, resolve) {
                const options = params;
                const success = options.success;
                const res = {};
                const getStorage = (key) =>
                    new Promise<void>((r) => {
                        xm.getStorage({
                            key,
                            isGlobal: true
                        }).then((data) => {
                            res[key] = data;
                            r();
                        });
                    });
                const array = [];

                if (options.key instanceof Array) {
                    options.key.forEach((key) => {
                        array.push(getStorage(key));
                    });
                } else {
                    array.push(getStorage(options.key));
                }
                Promise.all(array).then(() => {
                    success && success(res);
                    resolve && resolve(res);
                });
            }
        },
        {
            // 小程序通用数据库存数据
            namespace: 'setShareItem',
            os: ['xm'],
            runCode(params, resolve) {
                const options = params;
                const success = options.success;

                Object.keys(options).forEach((key) => {
                    if (key !== 'success' && key !== 'error') {
                        const value = options[key];

                        xm.setStorage({
                            key,
                            value,
                            isGlobal: true
                        });
                    }
                });
                success && success({});
                resolve && resolve({});
            }
        },
        {
            // 小程序通用数据库删数据
            namespace: 'removeShareItem',
            os: ['xm'],
            defaultParams: {
                // 对应的key
                key: ''
            },
            runCode(params, resolve) {
                const options = params;
                const success = options.success;

                const removeStorage = (key) =>
                    new Promise<void>((r) => {
                        xm.removeStorage({
                            key,
                            isGlobal: true
                        }).then(() => {
                            r();
                        });
                    });
                const array = [];

                if (options.key instanceof Array) {
                    options.key.forEach((key) => {
                        array.push(removeStorage(key));
                    });
                } else {
                    array.push(removeStorage(options.key));
                }
                Promise.all(array).then(() => {
                    success && success({});
                    resolve && resolve({});
                });
            }
        }
    ]);
}
