import generateJSBridgeTrigger from '../inner/triggerjsbridge';
import { compareVersion } from '../util/lang';

/**
 * 定义如何调用一个API
 * 一般指调用原生环境下的API
 * 依赖于Promise,calljsbridgeMixin
 * @param {Object} hybrid hybrid
 */
export default function callnativeapiMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const JSBridge = hybridJs.JSBridge;
    // 只有在 JSBridge 存在时才创建 callJsBridge
    const callJsBridge = JSBridge ? generateJSBridgeTrigger(JSBridge) : null;
    const os = hybridJs.os;

    /**
     * 调用自定义API
     * @param {Object} options 配置参数
     * @return {Object} 返回一个Promise对象，如果没有Promise环境，直接返回运行结果
     */
    function callApi(options): Promise<unknown> {
        // 实时获取promise
        const Promise = hybridJs.getPromise();
        const finalOptions = options || {};

        const callback = (resolve?: (value: unknown) => void, reject?: (reason: unknown) => void): Promise<unknown> => {
            // 1. 如果是 EJS 原生环境，直接走 callJsBridge（与历史行为一致）
            if (os.ejs) {
                const appVersion = finalOptions.appVersion;

                const callInner = () => {
                    callJsBridge(
                        {
                            handlerName: finalOptions.name,
                            proto: finalOptions.mudule,
                            data: finalOptions.data || {},
                            success: finalOptions.success,
                            error: finalOptions.error,
                            isLongCb: finalOptions.isLongCb,
                            isEvent: finalOptions.isEvent
                        },
                        resolve,
                        reject
                    );
                };

                if (appVersion) {
                    // 若传了容器版本，需要进行比较
                    hybridJs.runtime.getAppVersion({
                        success: function (result) {
                            if (result.version && compareVersion(result.version, appVersion) >= 0) {
                                // 若容器版本大于传进来的最低版本
                                callInner();
                            } else {
                                const msg = `${finalOptions.name}要求的容器版本至少为:${appVersion}，当前容器版本：${result.version}，请升级`;

                                hybridJs.showError(
                                    hybridJs.globalError.ERROR_TYPE_APINEEDHIGHNATIVEVERSION.code,
                                    msg
                                );
                            }
                        },
                        error: function (error) {
                            console.error(error);
                        }
                    });
                } else {
                    callInner();
                }

                if (!resolve && !reject) {
                    return Promise && Promise.resolve();
                }

                return;
            }

            // 2. 非 EJS 原生环境，复用 Proxy.walk() 机制调用 extendModule 注册的 API
            const moduleName = finalOptions.mudule;
            const apiName = finalOptions.name;
            const proxyApi = hybridJs._getProxyApi ? hybridJs._getProxyApi(moduleName, apiName) : null;

            if (!proxyApi) {
                // 未找到注册的 API，返回错误
                const error = {
                    code: hybridJs.globalError.ERROR_TYPE_APINOTEXIST.code,
                    msg: `非EJS环境下需要先通过 extendModule 注册 API: ${moduleName}.${apiName}`
                };

                hybridJs.showError(error.code, error.msg);

                if (finalOptions.error) {
                    finalOptions.error(error);
                }

                if (reject) {
                    reject(error);
                }

                return;
            }

            // 复用 _getNameSpaceApi 获取对应端的 Proxy 对象
            const proxyObj = hybridJs._getNameSpaceApi ? hybridJs._getNameSpaceApi(proxyApi, os) : null;

            if (!proxyObj) {
                // 当前环境不支持该 API
                const error = {
                    code: hybridJs.globalError.ERROR_TYPE_APIOS.code,
                    msg: `API ${moduleName}.${apiName} 无法在当前OS下运行`
                };

                hybridJs.showError(error.code, error.msg);

                if (finalOptions.error) {
                    finalOptions.error(error);
                }

                if (reject) {
                    reject(error);
                }

                return;
            }

            // 复用 Proxy.walk() 返回的函数，自动支持：
            // - 默认参数合并
            // - h5UI 切换
            // - 拦截器（invoke、success、error）
            // - Promise 支持
            const proxyFn = proxyObj.walk(hybridJs);

            // 构建调用参数，将 data、success、error 合并
            const callOptions = {
                ...finalOptions.data,
                success: finalOptions.success,
                error: finalOptions.error
            };

            // 支持 h5UI 参数
            if (finalOptions.h5UI) {
                callOptions.h5UI = finalOptions.h5UI;
            }

            // 支持长期回调参数
            if (finalOptions.isLongCb) {
                callOptions.isLongCb = finalOptions.isLongCb;
            }

            // 支持事件参数
            if (finalOptions.isEvent) {
                callOptions.isEvent = finalOptions.isEvent;
            }

            // 调用代理函数，传入 resolve 和 reject
            return proxyFn(callOptions, resolve, reject);
        };

        return (Promise && new Promise(callback)) || callback();
    }

    hybridJs.callApi = callApi;
    hybridJs.callNativeApi = callApi;
}
