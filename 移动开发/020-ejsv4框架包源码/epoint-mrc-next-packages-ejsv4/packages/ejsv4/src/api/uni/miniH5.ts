export default function miniH5Mixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    let updateErrInfo = '';
    let hasUpdate = 0;

    if (uni.getUpdateManager && uni.canIUse('getUpdateManager')) {
        const updateManager = uni.getUpdateManager();
        if (updateManager && updateManager.onCheckForUpdate) {
            updateManager.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                hasUpdate = res.hasUpdate ? 1 : 0;
            });
        } else {
            updateErrInfo = '当前版本不支持onCheckForUpdate方法';
        }
    } else {
        updateErrInfo = '当前版本不支持getUpdateManager方法';
    }

    hybridJs.extendModule('miniH5', [
        {
            namespace: 'navigateTo',
            os: ['miniprogram'],
            defaultParams: {
                // 要打开的小程序 appId
                appId: '',
                // 打开指定的页面路径
                path: '',
                // 需要传递给小程序的额外参数
                extraData: {}
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'appId', 'path', 'extraData');
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                let uniOption = {
                    appId: options.appId,
                    path: options.path,
                    extraData: options.extraData,
                    success(result) {
                        options.success && options.success(result);
                        resolve && resolve(result);
                    },
                    fail(err) {
                        options.error && options.error(err);
                        reject && reject(err);
                    }
                };

                uni.navigateToMiniProgram(Object.assign({}, options, uniOption));
            }
        },
        {
            namespace: 'navigateBack',
            os: ['miniprogram'],
            defaultParams: {
                // 需要关闭的页面层级，默认只会关闭一层
                popPageNumber: 1
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'extraData');
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                let uniOption = {
                    delta: options.popPageNumber,
                    success() {
                        options.success && options.success();
                        resolve && resolve();
                    },
                    fail(err) {
                        options.error && options.error(err);
                        reject && reject(err);
                    }
                };

                uni.navigateBack(Object.assign({}, options, uniOption));
            }
        },
        {
            namespace: 'setNavigationBarTitle',
            os: ['miniprogram'],
            defaultParams: {
                // 页面标题
                title: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'title');
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                uni.setNavigationBarTitle({
                    title: options.title,
                    success() {
                        options.success && options.success();
                        resolve && resolve();
                    },
                    fail(err) {
                        options.error && options.error(err);
                        reject && reject(err);
                    }
                });
            }
        },
        {
            namespace: 'setNavigationBarColor',
            os: ['miniprogram'],
            defaultParams: {
                // 页面前景色
                frontColor: '',
                // 导航栏背景色
                backgroundColor: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'frontColor', 'backgroundColor');
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                let uniOption = {
                    frontColor: options.frontColor,
                    backgroundColor: options.backgroundColor,
                    success() {
                        options.success && options.success();
                        resolve && resolve();
                    },
                    fail(err) {
                        options.error && options.error(err);
                        reject && reject(err);
                    }
                };

                uni.setNavigationBarColor(Object.assign({}, options, uniOption));
            }
        },
        {
            namespace: 'close',
            os: ['miniprogram'],
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];
                let opt = {
                    success() {
                        options.success && options.success();
                        resolve && resolve();
                    },
                    fail(err) {
                        options.error && options.error(err);
                        reject && reject(err);
                    }
                };

                if (hybridJs.os.wechat) {
                    wx.exitMiniProgram(opt);
                } else if (hybridJs.os.alipay) {
                    my.exitMiniProgram(opt);
                }
            }
        },
        {
            // 检测小程序是否已更新
            namespace: 'checkForUpdate',
            os: ['miniprogram'],
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                let successFunc = () => {
                    let result = {
                        hasUpdate: hasUpdate ? 1 : 0
                    };

                    options.success && options.success(result);
                    resolve && resolve(result);
                };
                let errorFunc = () => {
                    options.error && options.error(updateErrInfo);
                    reject && reject(updateErrInfo);
                };

                if (updateErrInfo) {
                    errorFunc();
                } else {
                    successFunc();
                }
            }
        },
        {
            // 小程序强制更新并重启
            namespace: 'applyUpdate',
            os: ['miniprogram'],
            runCode(...rest) {
                const args = rest;
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                let errFunc = (errInfo) => {
                    options.error && options.error(errInfo);
                    reject && reject(errInfo);
                };

                if (uni.getUpdateManager && uni.canIUse('getUpdateManager')) {
                    const updateManager = uni.getUpdateManager();

                    if (updateManager) {
                        if (hasUpdate) {
                            hybridJs.ui.showWaiting('正在下载最新版本');
                            updateManager.onUpdateReady(function (res) {
                                hybridJs.ui.closeWaiting();
                                updateManager.applyUpdate();
                                options.success && options.success();
                                resolve && resolve();
                            });

                            updateManager.onUpdateFailed(function (res) {
                                hybridJs.ui.closeWaiting();
                                options.error && options.error(res);
                                reject && reject(res);
                            });
                        } else {
                            errFunc('已是最新版本');
                        }
                    } else {
                        errFunc('当前版本不支持获取updateManager');
                    }
                } else {
                    errFunc('当前版本不支持getUpdateManager方法');
                }
            }
        }
    ]);
}
