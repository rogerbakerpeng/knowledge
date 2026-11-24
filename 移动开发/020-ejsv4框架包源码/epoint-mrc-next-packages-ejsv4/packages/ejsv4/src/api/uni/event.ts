let NetworkStatusChangeCb;

export default function eventMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.extendModule('event', [
        {
            namespace: 'registerEvent',
            os: ['miniprogram'],
            defaultParams: {
                key: ''
            },
            runCode(params, resolve, reject) {
                if (params.key === 'netChange') {
                    NetworkStatusChangeCb = (res) => {
                        params.success && params.success(res);
                        resolve && resolve(res);
                    };
                    uni.onNetworkStatusChange(NetworkStatusChangeCb);
                } else if (hybridJs.os.wechat && wx && params.key === 'onLocationChange') {
                    // 监听实时地理位置变化事件
                    wx.onLocationChange((res) => {
                        let result = Object.assign({}, res, {
                            locationtype: 'gcj02'
                        });

                        params.success && params.success(result);
                        resolve && resolve(result);
                    });
                } else {
                    params.error && params.error('非ejs环境或微信小程序仅支持网络状态变化监听');
                    reject && reject('非ejs环境或微信小程序仅支持网络状态变化监听');
                }
            }
        },
        {
            namespace: 'unRegisterEvent',
            os: ['miniprogram'],
            defaultParams: {
                key: ''
            },
            runCode(params, resolve, reject) {
                if (params.key === 'netChange') {
                    NetworkStatusChangeCb && uni.offNetworkStatusChange(NetworkStatusChangeCb);
                    params.success && params.success();
                    resolve && resolve();
                } else if (hybridJs.os.wechat && wx && params.key === 'onLocationChange') {
                    wx.offLocationChange();
                    params.success && params.success();
                    resolve && resolve();
                } else {
                    params.error && params.error('非ejs环境或微信小程序仅支持网络状态变化监听');
                    reject && reject('非ejs环境或微信小程序仅支持网络状态变化监听');
                }
            }
        },
        {
            namespace: 'on',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                key: ''
            },
            runCode(params, resolve) {
                uni.$on(params.key, (data) => {
                    params.success && params.success(data);
                    resolve && resolve(data);
                });
            }
        },
        {
            namespace: 'once',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                key: ''
            },
            runCode(params, resolve) {
                uni.$once(params.key, (data) => {
                    params.success && params.success(data);
                    resolve && resolve(data);
                });
            }
        },
        {
            namespace: 'emit',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                key: ''
            },
            runCode(params, resolve) {
                uni.$emit(params.key, params);
                params.success && params.success();
                resolve && resolve();
            }
        },
        {
            namespace: 'off',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                key: ''
            },
            runCode(params, resolve) {
                uni.$off(params.key);
                params.success && params.success();
                resolve && resolve();
            }
        }
    ]);
}
