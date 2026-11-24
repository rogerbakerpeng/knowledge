import { log } from '../util/debug';
import { extend } from '../util/lang';

/**
 * 初始化给配置全局函数
 * @param {Object} hybrid hybrid对象
 */
export default function initMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const globalError = hybridJs.globalError;
    const showError = hybridJs.showError;

    /**
     * 几个全局变量 用来控制全局的config与ready逻辑
     * 默认ready是false的
     */
    let readyFunc;
    let isAllowReady = false;
    let isConfig = false;

    /**
     * 页面初始化时必须要这个config函数
     * 必须先声明ready，然后再config
     * @param {Object} params
     * config的jsApiList主要是同来通知给原生进行注册的
     * 所以这个接口到时候需要向原生容器请求的
     */
    hybridJs.config = function config(params) {
        if (isConfig) {
            showError(globalError.ERROR_TYPE_CONFIGMODIFY.code, globalError.ERROR_TYPE_CONFIGMODIFY.msg);
        } else {
            isConfig = true;

            const successcb = () => {
                // 允许ready直接执行
                isAllowReady = true;
                // 如果这时候有ready回调
                if (readyFunc) {
                    log('ready!');
                    readyFunc();
                }
            };

            if (this.os.h5 || this.os.miniprogram) {
                // 由于H5平台需要进行调试，较为特殊，所以在这里直接兼容
                // 小程序平台不需要鉴权
                successcb();

                return;
            }

            if (!this.event || !this.event.config) {
                // 如果没有模块方法，需要报错提示
                showError(
                    globalError.ERROR_TYPE_UNKNOWN.code,
                    '当前event.config方法不存在，请确认是否引入了对应环境下的ejs文件'
                );

                return;
            }

            this.event.config(
                extend(
                    {
                        success() {
                            successcb();
                        },
                        error(error) {
                            const tips = JSON.stringify(error);

                            showError(globalError.ERROR_TYPE_CONFIGERROR.code, tips);
                        }
                    },
                    params
                )
            );
        }
    };

    /**
     * 初始化完毕，并且config验证完毕后会触发这个回调
     * 注意，只有config了，才会触发ready，否则无法触发
     * ready只会触发一次，所以如果同时设置两个，第二个ready回调会无效
     * @param {Function} callback 回调函数
     */
    hybridJs.ready = function ready(callback) {
        // 修改ready，改为可以触发多个ready回调
        readyFunc = callback;
        // 如果config先进行，然后才进行ready,这时候恰好又isAllowReady，代表ready可以直接自动执行
        if (isAllowReady) {
            log('ready!');
            readyFunc();
        }
    };

    hybridJs.app = function app(params) {
        this.event.app(extend({}, params));
    };

    hybridJs.callApi = function callApi() {
        return this.Promise.reject('未引入ejs环境文件');
    };
}
