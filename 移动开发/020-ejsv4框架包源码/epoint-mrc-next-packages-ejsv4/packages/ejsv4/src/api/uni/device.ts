import onlyH5Device from '../h5/onlyH5/device';

let shakeCb;

export default function deviceMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    onlyH5Device(hybridJs);

    function shakeEvent(cb) {
        let shake = 50,
            lastUpdate = 0,
            x = 0,
            y = 0,
            z = 0,
            lastx = 0,
            lasty = 0,
            lastz = 0,
            flag = true;

        return (eventData) => {
            let acceleration = eventData,
                currTime = new Date().valueOf(),
                diffTime = currTime - lastUpdate;

            let callback = () => {
                if (flag) {
                    setTimeout(() => {
                        cb();
                        flag = true;
                    }, 800);
                }

                flag = false;
            };

            if (diffTime > 100) {
                lastUpdate = currTime;
                x = acceleration.x;
                y = acceleration.y;
                z = acceleration.z;
                let speed = (Math.abs(x + y + z - lastx - lasty - lastz) / diffTime) * 10000;

                if (speed > shake) {
                    callback();
                }
                lastx = x;
                lasty = y;
                lastz = z;
            }
        };
    }

    hybridJs.extendModule('device', [
        {
            namespace: 'getDeviceId',
            os: ['miniprogram', 'h5'],
            runCode(params, resolve, reject) {
                if (hybridJs.os.wechat) {
                    const res = uni.getDeviceInfo();

                    let result = {
                        deviceId: res.deviceId,
                        uniparams: res
                    };

                    params.success && params.success(result);
                    resolve && resolve(result);
                } else {
                    uni.getSystemInfo({
                        success(res) {
                            let result = {
                                deviceId: res.deviceId,
                                uniparams: res
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
            namespace: 'getVendorInfo',
            os: ['miniprogram', 'h5'],
            runCode(params, resolve, reject) {
                uni.getNetworkType({
                    success(res) {
                        let netWorkType = -1;

                        if (res.networkType === 'wifi') {
                            netWorkType = 1;
                        } else if (res.networkType !== 'none') {
                            netWorkType = 0;
                        }

                        uni.getSystemInfo({
                            success(sysres) {
                                let result = {
                                    netWorkType,
                                    deviceId: sysres.deviceId,
                                    uaInfo: sysres.ua,
                                    uniparams: Object.assign({}, sysres, res)
                                };

                                params.success && params.success(result);
                                resolve && resolve(result);
                            },
                            fail(error) {
                                params.error && params.error(error);
                                reject && reject(error);
                            }
                        });
                    },
                    fail(error) {
                        params.error && params.error(error);
                        reject && reject(error);
                    }
                });
            }
        },
        {
            namespace: 'isTablet',
            os: ['miniprogram'],
            runCode(params, resolve, reject) {
                if (hybridJs.os.wechat) {
                    const { deviceType } = uni.getDeviceInfo();

                    let result = {
                        isTablet: deviceType === 'pad' ? 1 : 0
                    };

                    params.success && params.success(result);
                    resolve && resolve(result);
                } else {
                    uni.getSystemInfo({
                        success(res) {
                            let result = {
                                isTablet: res.deviceType && res.deviceType === 'pad' ? 1 : 0
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
            namespace: 'getNetWorkInfo',
            os: ['miniprogram', 'h5'],
            runCode(params, resolve, reject) {
                uni.getNetworkType({
                    success(res) {
                        let netWorkType = -1;

                        if (res.networkType === 'wifi') {
                            netWorkType = 1;
                        } else if (res.networkType !== 'none') {
                            netWorkType = 0;
                        }

                        let result = {
                            netWorkType,
                            uniparams: res
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
        },
        {
            namespace: 'callPhone',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                phoneNum: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'phoneNum');
                const params = args[0];
                const resolve = args[1];
                const reject = args[2];

                uni.makePhoneCall({
                    phoneNumber: params.phoneNum,
                    success() {
                        params.success && params.success();
                        resolve && resolve();
                    },
                    fail(error) {
                        params.error && params.error(error);
                        reject && reject(error);
                    }
                });
            }
        },
        {
            namespace: 'closeInputKeyboard',
            os: ['miniprogram', 'h5'],
            runCode(params, resolve) {
                uni.hideKeyboard();
                params.success && params.success();
                resolve && resolve();
            }
        },
        {
            namespace: 'vibrate',
            os: ['miniprogram'],
            runCode(params, resolve, reject) {
                uni.vibrate({
                    success: function () {
                        params.success && params.success();
                        resolve && resolve();
                    },
                    fail(error) {
                        params.error && params.error(error);
                        reject && reject(error);
                    }
                });
            }
        },
        {
            namespace: 'shake.disable',
            os: ['miniprogram', 'h5'],
            runCode(params, resolve) {
                uni.offAccelerometerChange(shakeCb);
                params.success && params.success();
                resolve && resolve();
            }
        },
        {
            namespace: 'shake.enable',
            os: ['miniprogram', 'h5'],
            // 启用摇一摇后，只要有摇一摇就会回调，属于长期回调范围
            runCode(params, resolve) {
                shakeCb = shakeEvent(() => {
                    params.success && params.success();
                    resolve && resolve();
                });
                uni.onAccelerometerChange(shakeCb);
            }
        },
        {
            namespace: 'requestPermissions',
            os: ['miniprogram'],
            defaultParams: {
                permissionsType: 0
            },
            runCode(params, resolve) {
                let scope;

                switch (params.permissionsType) {
                    // 默认定位
                    default:
                        scope = 'scope.userLocation';
                        break;
                    case 0:
                        scope = 'scope.userLocation';
                        break;
                    // 拍照
                    case 3:
                        scope = 'scope.camera';
                        break;
                    // 麦克风
                    case 6:
                        scope = 'scope.record';
                        break;
                }

                uni.authorize({
                    scope,
                    success: function () {
                        let res = {
                            resultData: 0
                        };

                        params.success && params.success(res);
                        resolve && resolve();
                    },
                    fail() {
                        let res = {
                            resultData: 1
                        };

                        params.success && params.success(res);
                        resolve && resolve();
                    }
                });
            }
        },
        {
            namespace: 'goAppSetting',
            os: ['miniprogram'],
            runCode(params, resolve, reject) {
                uni.openSetting({
                    success: function (res) {
                        params.success && params.success(res);
                        resolve && resolve(res);
                    },
                    fail(error) {
                        params.error && params.error(error);
                        reject && reject(error);
                    }
                });
            }
        },
        {
            namespace: 'setEnableShot',
            os: ['miniprogram'],
            defaultParams: {
                isEnableShot: 0
            },
            runCode(params, resolve, reject) {
                if (hybridJs.os.android && hybridJs.os.wechat && wx) {
                    wx.setVisualEffectOnCapture({
                        visualEffect: params.isEnableShot === 0 ? 'hidden' : 'none',
                        success() {
                            params.success && params.success();
                            resolve && resolve();
                        },
                        fail(error) {
                            params.error && params.error(error);
                            reject && reject(error);
                        }
                    });
                } else if (hybridJs.os.android && hybridJs.os.alipay && my) {
                    my.setVisualEffectOnCapture({
                        visualEffect: params.isEnableShot === 0 ? 'hidden' : 'none',
                        success() {
                            params.success && params.success();
                            resolve && resolve();
                        },
                        fail(error) {
                            params.error && params.error(error);
                            reject && reject(error);
                        }
                    });
                } else {
                    params.error && params.error('禁止截屏仅支持安卓端微信和支付宝小程序');
                    reject && reject('禁止截屏仅支持安卓端微信和支付宝小程序');
                }
            }
        },
        {
            namespace: 'getDeviceInfo',
            os: ['miniprogram', 'h5'],
            runCode(params, resolve, reject) {
                if (hybridJs.os.wechat) {
                    const res1 = uni.getDeviceInfo();
                    const res2 = uni.getWindowInfo();

                    let result = {
                        osType: res1.osName || res1.platform,
                        osVersion: hybridJs.os.version || '',
                        deviceID: res1.deviceId,
                        statusBarHeight: res2.statusBarHeight,
                        uniparams: Object.assign({}, res1, res2)
                    };

                    params.success && params.success(result);
                    resolve && resolve(result);
                } else {
                    uni.getSystemInfo({
                        success(res) {
                            let result = {
                                osType: res.osName || res.platform,
                                osVersion: hybridJs.os.version || '',
                                deviceID: res.deviceId,
                                statusBarHeight: res.statusBarHeight,
                                uniparams: res
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
        }
    ]);
}
