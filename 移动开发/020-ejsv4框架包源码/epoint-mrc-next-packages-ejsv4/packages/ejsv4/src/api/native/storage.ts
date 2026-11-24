export default function storageMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('storage', [
        {
            namespace: 'getItem',
            os: ['ejs'],
            defaultParams: {
                // 对应的key
                key: ''
            },
            runCode(...rest) {
                // 兼容数组形式
                const args = rest;
                const options = args[0];

                if (!innerUtil.isObject(options.key)) {
                    options.key = [options.key];
                }

                args[0] = options;
                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'setItem',
            os: ['ejs']
            // 格式为 key: value形式，支持多个key value
        },
        {
            namespace: 'removeItem',
            os: ['ejs'],
            defaultParams: {
                // 对应的key
                key: ''
            },
            runCode(...rest) {
                // 兼容数组形式
                const args = rest;
                const options = args[0];

                if (!innerUtil.isObject(options.key)) {
                    options.key = [options.key];
                }

                args[0] = options;
                hybridJs.callInner.apply(this, args);
            }
        },
        {
            // 获取应用管理平台配置的业务接口地址
            namespace: 'getBusinessRestUrl',
            os: ['ejs']
        },
        {
            // 获取小程序配置参数（先从独立配置中获取，否则从通用配置中获取）
            namespace: 'getPlatformParam',
            os: ['ejs'],
            defaultParams: {
                // 对应的key
                key: ''
            },
            runCode(...rest) {
                // 兼容数组形式
                const args = rest;
                const options = args[0];

                if (hybridJs.os.miniH5) {
                    if (!innerUtil.isObject(options.key)) {
                        options.key = [options.key];
                    }
                    args[0] = options;
                    hybridJs.callInner.apply(this, args);
                } else {
                    hybridJs.storage.getItem(options);
                }
            }
        },
        {
            // 获取小程序通用平台参数配置
            namespace: 'getPlatformShareParam',
            os: ['ejs'],
            defaultParams: {
                // 对应的key
                key: ''
            },
            runCode(...rest) {
                // 兼容数组形式
                const args = rest;
                const options = args[0];

                if (hybridJs.os.miniH5) {
                    if (!innerUtil.isObject(options.key)) {
                        options.key = [options.key];
                    }

                    args[0] = options;
                    hybridJs.callInner.apply(this, args);
                } else {
                    hybridJs.storage.getItem(options);
                }
            }
        },
        {
            // 获取小程序独立配置参数
            namespace: 'getPlatformPrivateParam',
            os: ['ejs'],
            defaultParams: {
                // 对应的key
                key: ''
            },
            runCode(...rest) {
                // 兼容数组形式
                const args = rest;
                const options = args[0];

                if (hybridJs.os.miniH5) {
                    if (!innerUtil.isObject(options.key)) {
                        options.key = [options.key];
                    }

                    args[0] = options;
                    hybridJs.callInner.apply(this, args);
                } else {
                    hybridJs.storage.getItem(options);
                }
            }
        },
        {
            // 小程序通用数据库取数据
            namespace: 'getShareItem',
            os: ['ejs'],
            defaultParams: {
                // 对应的key
                key: ''
            },
            runCode(...rest) {
                // 兼容数组形式
                const args = rest;
                const options = args[0];

                // if (hybridJs.os.miniH5) {
                if (!innerUtil.isObject(options.key)) {
                    options.key = [options.key];
                }

                args[0] = options;
                hybridJs.callInner.apply(this, args);
                // } else {
                //     hybridJs.storage.getItem(args);
                // }
            }
        },
        {
            // 小程序通用数据库存数据
            namespace: 'setShareItem',
            os: ['ejs']
            // 格式为 key: value形式，支持多个key value
        },
        {
            // 小程序通用数据库删数据
            namespace: 'removeShareItem',
            os: ['ejs'],
            defaultParams: {
                // 对应的key
                key: ''
            },
            runCode(...rest) {
                // 兼容数组形式
                const args = rest;
                const options = args[0];

                if (!innerUtil.isObject(options.key)) {
                    options.key = [options.key];
                }

                args[0] = options;
                hybridJs.callInner.apply(this, args);
            }
        }
    ]);
}
