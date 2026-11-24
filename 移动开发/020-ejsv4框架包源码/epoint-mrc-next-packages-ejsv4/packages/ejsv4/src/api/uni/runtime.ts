export default function runtimeMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('runtime', [
        {
            namespace: 'getAppKey',
            os: ['miniprogram', 'h5'],
            runCode(params, resolve, reject) {
                if (hybridJs.os.wechat) {
                    const { appId } = uni.getAppBaseInfo();
                    let result = {
                        appKey: appId
                    };

                    params.success && params.success(result);
                    resolve && resolve(result);
                } else {
                    uni.getSystemInfo({
                        success(res) {
                            let result = {
                                appKey: res.appId
                            };

                            params.success && params.success(result);
                            resolve && resolve(result);
                        },
                        fail(error) {
                            params.error && params.error(error);
                            reject && reject(error);
                        }
                    });
                }
            }
        },
        {
            namespace: 'clearCache',
            os: ['miniprogram', 'h5'],
            runCode(params, resolve, reject) {
                try {
                    uni.clearStorageSync();
                    params.success && params.success();
                    resolve && resolve();
                } catch (error) {
                    params.error && params.error(error);
                    reject && reject(error);
                }
            }
        },
        {
            namespace: 'getGeolocation',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                // 1采用的火星坐标系，0采用地球坐标系
                coordinate: 1
            },
            runCode(params, resolve, reject) {
                let uniOption = {
                    type: params.coordinate === 1 ? 'gcj02' : 'wgs84',
                    success(res) {
                        let result = {
                            longitude: res.longitude,
                            latitude: res.latitude
                        };

                        params.success && params.success(result);
                        resolve && resolve(result);
                    },
                    fail(error) {
                        params.error && params.error(error);
                        reject && reject(error);
                    }
                };

                uni.getLocation(Object.assign({}, params, uniOption));
            }
        },
        {
            namespace: 'clipboard',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                text: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'text');
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                uni.setClipboardData({
                    data: options.text,
                    showToast: false,
                    success() {
                        if (hybridJs.os.h5 || hybridJs.os.alipay) {
                            // 微信自动弹出提示，与微信小程序保持一致
                            hybridJs.ui.toast('内容已复制');
                        }
                        options.success && options.success();
                        resolve && resolve();
                    },
                    fail(error) {
                        options.error && options.error(error);
                        reject && reject(error);
                    }
                });
            }
        },
        {
            namespace: 'canIUse',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                apis: []
            },
            runCode(options, resolve, reject) {
                try {
                    let apis = options.apis;
                    let result = {};

                    apis.length &&
                        apis.forEach((element) => {
                            result[element] = uni.canIUse(element) ? 1 : 0;
                        });

                    options.success && options.success(result);
                    resolve && resolve(result);
                } catch (msg) {
                    const err = {
                        code: 0,
                        msg: 'uni.canIUse获取出错',
                        result: msg
                    };

                    options.error && options.error(err);
                    reject && reject(err);

                    return;
                }
            }
        },
        {
            namespace: 'startLocationUpdate',
            os: ['miniprogram'],
            runCode(params, resolve, reject) {
                if (hybridJs.os.wechat && wx) {
                    // 开启前后台接收位置信息
                    wx.startLocationUpdateBackground({
                        type: 'gcj02',
                        success() {
                            params.success && params.success();
                            resolve && resolve();
                        },
                        fail(err) {
                            params.error && params.error(err);
                            reject && reject(err);
                        }
                    });
                } else {
                    params.error && params.error('非ejs环境或微信小程序不支持');
                    reject && reject('非ejs环境或微信小程序不支持');
                }
            }
        },
        {
            namespace: 'stopLocationUpdate',
            os: ['miniprogram'],
            runCode(params, resolve, reject) {
                if (hybridJs.os.wechat && wx) {
                    // 申请后台定位权限
                    wx.stopLocationUpdate({
                        success() {
                            params.success && params.success();
                            resolve && resolve();
                        },
                        fail(err) {
                            params.error && params.error(err);
                            reject && reject(err);
                        }
                    });
                } else {
                    params.error && params.error('非ejs环境或微信小程序不支持');
                    reject && reject('非ejs环境或微信小程序不支持');
                }
            }
        }
    ]);
}
