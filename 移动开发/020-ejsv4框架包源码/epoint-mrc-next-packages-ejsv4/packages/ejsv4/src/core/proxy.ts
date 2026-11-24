import { compareVersion } from '../util/lang';

/**
 * 依赖于以下的基础库
 * Promise
 * @param {Object} hybrid hybrid对象
 */
export default function proxyMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const globalError = hybridJs.globalError;

    /**
     * 存放所有api调用前拦截func
     * 每一个命名空间下的每一个os都可以执行
     */
    const Interceptors = {};

    /**
     * 添加拦截器
     * @param {String} apiname api名称
     * @param {Object} opt 拦截器配置
     */
    function addInterceptors(apiname, opt) {
        if (!Interceptors[apiname]) {
            Interceptors[apiname] = {
                invoke: [],
                success: [],
                error: []
            };
        }

        const apiInterceptors = Interceptors[apiname];

        if (opt.invoke) {
            apiInterceptors.invoke.push(opt.invoke);
        }

        if (opt.success) {
            apiInterceptors.success.push(opt.success);
        }

        if (opt.error) {
            apiInterceptors.error.push(opt.error);
        }
    }

    function removeInterceptors(apiname, option) {
        if (!Interceptors[apiname]) {
            return;
        }

        if (!option) {
            Interceptors[apiname] = {
                invoke: [],
                success: [],
                error: []
            };

            return;
        }

        if (Interceptors[apiname][option]) {
            Interceptors[apiname][option] = [];
        }
    }

    function getSFuncs(arr, res) {
        let funcArr = [];

        if (arr.length) {
            funcArr = arr.map((item) => {
                const result = item(res);

                if (result instanceof Promise) {
                    return result;
                }
                return new Promise<void>((resolve, reject) => {
                    if (result === false) {
                        reject();
                    } else {
                        resolve();
                    }
                });
            });
        }

        return funcArr;
    }

    hybridJs.addInterceptors = addInterceptors;
    hybridJs.removeInterceptors = removeInterceptors;

    /**
     * 对所有的API进行统一参数预处理，promise逻辑支持等操作
     * @param {Object} api 对应的API
     * @param {Function} callback 回调
     * @constructor
     */
    class Proxy {
        api: EJSNamespace.apiOpt;
        apiName: string;
        callback: EJSNamespace.Callback;
        os: string[];

        constructor(api, callback) {
            this.api = api;
            this.apiName = this.api.moduleName + '.' + this.api.namespace;
            this.callback = callback;
            this.os = this.api.os.slice(0);
        }

        /**
         * 实际的代理操作
         * @param {Object} hy hybrid对象
         * @return {Function} hybrid finallyCallback
         */
        walk(hy) {
            // 实时获取promise
            const Promise = hybridJs.getPromise();

            // 返回一个闭包函数
            return (...rest) => {
                let args = rest;

                if (typeof args[0] === 'undefined') {
                    args[0] = {};
                }

                // 默认参数的处理
                if (this.api.defaultParams && args[0] instanceof Object) {
                    Object.keys(this.api.defaultParams).forEach((item) => {
                        if (args[0][item] === undefined) {
                            args[0][item] = this.api.defaultParams[item];
                        }
                    });
                }

                if (args[0] && args[0].h5UI && this.os.indexOf('h5') === -1) {
                    // 强制使用H5环境下的API
                    hybridJs[this.api.moduleName][this.api.namespace] = 'h5';

                    return hybridJs[this.api.moduleName][this.api.namespace]
                        ? hybridJs[this.api.moduleName][this.api.namespace](args[0])
                        : console.error('请引入H5环境的ejs库');
                } else {
                    hybridJs[this.api.moduleName][this.api.namespace] = false;
                }

                // 决定是否使用Promise
                let finallyCallback;

                if (this.callback) {
                    // 将this指针修正为proxy内部，方便直接使用一些api关键参数
                    finallyCallback = this.callback;
                }

                if (
                    this.api.support &&
                    hybridJs.nativeVersion &&
                    compareVersion(hybridJs.nativeVersion, this.api.support) < 0
                ) {
                    // 如果当前版本还不支持API
                    // 实际上也可以在原生容器进行检测，这里由于遗留问题，改为前端进行
                    const msg = `${this.api.namespace}要求的容器EJS版本至少为:${this.api.support}，当前容器EJS版本：${hybridJs.nativeVersion}，请升级`;

                    const errorTips = {
                        code: globalError.ERROR_TYPE_APINEEDHIGHNATIVEVERSION.code,
                        msg
                    };

                    if (hy.ui && typeof hy.ui.toast === 'function') {
                        hy.ui.toast(msg);
                    }

                    // 不满足要求，直接走错误回调，内部走错误
                    finallyCallback = (...params) => {
                        const len = params.length;
                        const options = params[0];
                        let reject;

                        if (Promise) {
                            reject = params[len - 1];
                        }

                        // 如果存在错误回调
                        options.error && options.error(errorTips);
                        reject && reject(errorTips);
                    };
                }

                if (!finallyCallback) {
                    // 如果没有实现
                    finallyCallback = (...params) => {
                        const len = params.length;
                        const options = params[0];
                        const errorTips = `${this.api.namespace}未定义具体实现方法`;
                        let reject;

                        if (Promise) {
                            reject = params[len - 1];
                        }

                        // 如果存在错误回调
                        options.error && options.error(errorTips);
                        reject && reject(errorTips);
                    };
                }

                if (Promise) {
                    if (Interceptors[this.apiName]) {
                        return new Promise((resolve, reject) => {
                            let invokeFuncs = getSFuncs(Interceptors[this.apiName].invoke, args);

                            Promise.all(invokeFuncs)
                                .then(() => {
                                    // 拓展 args
                                    if (args[0] && args[0] instanceof Object) {
                                        let successOrigin = args[0].success;
                                        let errorOrigin = args[0].error;

                                        args[0].success = (res) => {
                                            let funcs = getSFuncs(Interceptors[this.apiName].success, res);

                                            Promise.all(funcs)
                                                .then(() => {
                                                    successOrigin && successOrigin(res);
                                                })
                                                .catch((error) => {
                                                    errorOrigin && errorOrigin(error);
                                                });
                                        };

                                        args[0].error = (err) => {
                                            let funcs = getSFuncs(Interceptors[this.apiName].error, err);

                                            Promise.all(funcs)
                                                .then(() => {
                                                    errorOrigin && errorOrigin(err);
                                                })
                                                .catch((error) => {
                                                    errorOrigin && errorOrigin(error);
                                                });
                                        };
                                    }

                                    args = args.concat([resolve, reject]);
                                    finallyCallback && finallyCallback.apply(this, args);
                                })
                                .catch((err) => {
                                    console.warn(`${this.apiName}的调用已被拦截：`, err);
                                });
                        });
                    }

                    return (
                        finallyCallback &&
                        new Promise((resolve, reject) => {
                            // 拓展 args
                            args = args.concat([resolve, reject]);
                            finallyCallback.apply(this, args);
                        })
                    );
                }

                return finallyCallback && finallyCallback.apply(this, args);
            };
        }

        /**
         * 析构函数
         */
        dispose() {
            this.apiName = null;
            this.api = null;
            this.callback = null;
        }
    }

    hybridJs.Proxy = Proxy;
}
