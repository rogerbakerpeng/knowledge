/**
 * 作者: guotq
 * 创建时间: 2017/06/13
 * 版本: [1.0, 2017/06/13 ]
 * 版权: 江苏国泰新点软件有限公司
 * 描述: 统一前端框架
 * 对 ajax的一次二次业务封装，方便使用，主要是进行了一次返回数据的自定义路径处理
 * 目前针对ajax和upload都可以进行
 */
(function () {
    var defaultSetting = {
        dataPath: null,
        delay: 0
    };
    var oldAjax = Util.ajax;
    var oldUpload = Util.upload;
    // 确保在某个时间内token只会刷新一次
    // 单位毫秒
    var MIN_REFRESH_GAP = 1000;
    var lastRefreshTimeStamp = 0;
    var isRefreshing = false;
    // 刷新完毕后通知所有的等待函数
    var refreshTokenCallback = [];

    /**
     * 每次打印日志时的id
     */
    var logId = 0;

    function appLog(data, logId) {
        if (Config.isAutoLogInNativeLogPanel) {
            var logData = {
                logId: logId,
                data: data
            };

            // 打印
            ejs.runtime.logPanel({
                text: logData,
                success: function (result) {},
                error: function (error) {}
            });
        }
    }

    /**
     * 实现多个ajax请求时刷新token的异步锁
     * 简单点，如果时间间隔小于一定时间，就不会重复刷新
     * @param {Function} success 成功回调
     * @param {Function} error 失败回调
     */
    function notifyContaineRefreshToken(success, error) {
        // 添加到回调中
        refreshTokenCallback.push({
            success: success,
            error: error,
        });
        if (isRefreshing) {
            // 锁住状态，刷新中，不会重复刷新，并等待回调
            return;
        }
        var refreshCallback = function (isSuccess) {
            var len = refreshTokenCallback.length;

            for (var i = 0; i < len; i++) {
                var callbackObj = refreshTokenCallback[i];

                if (isSuccess) {
                    callbackObj && callbackObj.success();
                } else {
                    callbackObj && callbackObj.error({
                        message: '无权限, 刷新失败'
                    });
                }
            }
            refreshTokenCallback = [];
            isRefreshing = false;
            if (isSuccess) {
                // 成功才会更新时间戳
                lastRefreshTimeStamp = (new Date()).getTime();
            }
        };
        var currRefreshTimeStamp = (new Date()).getTime();

        if (currRefreshTimeStamp - lastRefreshTimeStamp <= MIN_REFRESH_GAP) {
            // 在刷新的间隔阈值内，此时可以肯定已经刷新完毕了，所以直接回调成功
            refreshCallback(true);

            return;
        }

        // 否则，大于时间了，则重新刷新，并锁住
        isRefreshing = true;
        // 通知原生容器刷新，先刷新token，然后还不行则会重新登陆
        if (ejs.os.ejs && Config.ejsVer === 3) {
            ejs.auth.refreshToken({
                success: function () {
                    refreshCallback(true);
                },
                error: function () {
                    refreshCallback(false);
                }
            });
        } else {
            refreshCallback(false);
        }
    }

    /**
     * 将对象代理，增加一个dataFilter方法
     * 代理时 对外不允许改变内部的 deferred模块
     * @param {Object} oldObj 例如ajax或者upload
     * @return {Function} 返回代理后的函数
     */
    function proxy(oldObj) {
        var isAutoDealError = Config.ajax && Config.ajax.isAutoDealError;
        var isAutoToast = Config.ajax && Config.ajax.isAutoToast;
        var MAX_REQUEST_COUNT = 2;

        return function (options) {
            var newOptions = Util.extend({}, defaultSetting, options);
            var oldErrorHandle = newOptions.error;
            // 请求次数，如果大于最大请求次数则会直接进入错误回调，防止无限循环
            var requestCount = 0;

            // 兼容requestData这种统一的API调用
            newOptions.data = newOptions.data || newOptions.dataRequest;

            // 记录信息
            appLog({
                url: newOptions.url,
                params: newOptions.data
            }, logId);

            // 数据处理
            newOptions.dataFilter = function (response, dataType, resolve, reject) {
                try {
                    response = JSON.parse(response);
                } catch (e) {
                    // 记录信息
                    appLog({
                        response: response,
                    }, logId++);

                    return response;
                }

                var result = Util.dataProcess(response, {
                    isDebug: true,
                    dataPath: newOptions.dataPath
                });

                if (result.code === 0) {
                    // 错误回调，抛出错误原因即可，内部或捕获
                    throw new Error(result.message);
                } else {
                    // 记录信息
                    appLog({
                        response: response,
                    }, logId++);

                    return result;
                }

            };

            // 默认的错误回调
            var errorFun = function (error) {
                var isCanDeal = (isAutoDealError && newOptions.isAutoDealError !== false) || newOptions.isAutoDealError;

                requestCount++;

                if (isCanDeal) {
                    // 如果自己抛出去的错误存在信息
                    var errorMsg = error.message || error.type;

                    // 如果存在xhr，使用xhr
                    if (error.xhr) {
                        var status = error.xhr && error.xhr.status;
                        var responseText = error.xhr.responseText;

                        // token失败的处理和其它处理不一样，token失败默认会刷新并重新请求
                        if (status === 401 || status === 403) {
                            // 不允许提示权限相关
                            errorMsg = status === 403 ? '无权限' : '未登陆';

                            if (requestCount < MAX_REQUEST_COUNT) {
                                // 还在最大请求次数的限制内，重新刷新并请求
                                notifyContaineRefreshToken(function () {
                                    // 重新请求，请求次数要+1
                                    requestCount++;
                                    // 此时可以确定newOptions已经是一个完全体了（想到于是闭包中的内容）
                                    ejs.auth.getToken({
                                        success: function (result) {
                                            newOptions.headers = newOptions.headers || {};
                                            newOptions.headers.Authorization = 'Bearer ' + result.access_token;
                                            
                                            oldObj(newOptions);
                                        },
                                        error: function (err) {
                                            // 刷新失败也要直接回调
                                            oldErrorHandle && oldErrorHandle(error);
                                        }
                                    });
                                }, function () {
                                    // 刷新失败也要直接回调
                                    oldErrorHandle && oldErrorHandle(error);
                                });
                            } else {
                                // 自己弹出提示，并回调
                                isAutoToast && Util.ejs.ui.toast(errorMsg);
                                oldErrorHandle && oldErrorHandle(error);
                            }

                            // 内部的处理和其它统一处理不一样
                            return;
                        }

                        if (status === 400) {
                            errorMsg = responseText || '服务端安全模块拦截';
                        } else if (status === 404) {
                            errorMsg = responseText || '资源未找到';
                        } else if (status === 500) {
                            errorMsg = responseText || '服务器发生其它异常';
                        } else if (status === 503) {
                            errorMsg = responseText || '服务不可用';
                        }
                    }

                    isAutoToast && Util.ejs.ui.toast(errorMsg);
                }

                // 记录信息，id要+
                appLog({
                    error: error
                }, logId++);

                oldErrorHandle && oldErrorHandle(error);
            };

            newOptions.error = errorFun;

            return oldObj(newOptions);
        };
    }

    Util.ajax = proxy(oldAjax);
    Util.upload = proxy(oldUpload);

})();