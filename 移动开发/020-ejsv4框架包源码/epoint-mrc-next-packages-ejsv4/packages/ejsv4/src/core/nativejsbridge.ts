import { warn } from '../util/debug';
import { uuid } from '../util/lang';
import {
    CUSTOM_PROTOCOL_SCHEME,
    getCallbackId,
    getLongCallbackId,
    handleFunOpt,
    getParam
} from '../inner/commonjsbridge';

/**
 * h5和原生交互，jsbridge核心代码
 * 依赖于showError，globalError，os
 * @param {Object} hybrid hybrid对象
 */
export default function jsbridgeMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const ejsIframeUuid = uuid({
        len: 10,
        type: 'noline'
    });

    // 必须要有一个全局的JSBridge，否则原生和H5无法通信
    // 已有的JSBridge将被重写
    window.JSBridge = window.JSBridge || {} as EJSNamespace.JSBridgeType;

    const JSBridge = window.JSBridge;
    // 声明依赖
    const showError = hybridJs.showError;
    const globalError = hybridJs.globalError;
    const os = hybridJs.os;

    hybridJs.JSBridge = JSBridge;

    // 本地注册的方法集合,原生只能调用本地注册的方法,否则会提示错误
    if (!JSBridge.messageHandlers) {
        JSBridge.messageHandlers = {};
    }
    // 短期回调函数集合
    // 在原生调用完对应的方法后,会执行对应的回调函数id，并删除
    if (!JSBridge.responseCallbacks) {
        JSBridge.responseCallbacks = {};
    }
    // 长期存在的回调，调用后不会删除
    if (!JSBridge.responseCallbacksLongTerm) {
        JSBridge.responseCallbacksLongTerm = {};
    }

    if (!JSBridge.functionCallbacks) {
        JSBridge.functionCallbacks = {};
    }

    /**
     * 递归获取当前iframe位置层级
     * @param {Object} win window环境
     * @param {String} str 拼接的iframe字符串
     * @returns {String} 拼接的iframe字符串
     */
    function getParentWindow(win:Window, str?:string) {
        let callBack;
        let callStr;

        if (win.parent === win) {
            // 当前页面已经是根页面了
            if ((str || '').length >= 0) {
                callBack = str;
            }
        } else {
            // 存在父级页面
            try {
                const p = win.parent;
                // 跨域执行时，无法获取到p.document，走try-catch回调
                const frames = p.document.getElementsByTagName('iframe');
                let index = 0;

                for (let i = 0; i < frames.length; i += 1) {
                    const frame = frames[i];

                    if (frame.contentWindow === win) {
                        index = i;
                        break;
                    }
                }
                if ((str || '').length > 0) {
                    callStr = `.${str}`;
                }
                callBack = getParentWindow(
                    p,
                    `document.getElementsByTagName("iframe")[${index}].contentWindow${callStr || ''}`
                );
            } catch (error) {
                console.error(
                    // '请勿在小程序内嵌入iframe使用ejs，或者请升级ejs容器组件、ejs前端框架版本4.0.3-c及以上，4.0.3-c及以上请忽略'
                    '识别当前页面为iframe下跨域使用ejsapi\n为了正常使用ejsapi，请确认：\n移动前端框架ejs版本v4.0.3-c及以上\nv7容器ejs组件版本v3.5.1.e(Android)、v3.5.1.l(iOS)及以上\nM8容器ejs组件版本v4.0.3.c及以上\n同时iframe标签请去除sandbox属性或者sandbox属性增加allow-modals值'
                );
            }
        }

        return callBack;
    }
    /**
     * 提取出原生给ejs回调处理方式
     * @param {Object} bridge JSBridge变量
     * @param {Object} message 原生传递给ejs的回调参数
     */
    function nativeActionCallback(bridge, message) {
        // 回调函数
        const responseId = message.responseId;
        const responseData = message.responseData;
        let responseCallback;

        if (responseId) {
            // 这里规定,原生执行方法完毕后准备通知h5执行回调时,回调函数id是responseId
            responseCallback = bridge.responseCallbacks[responseId];
            // 默认先短期再长期
            responseCallback = responseCallback || bridge.responseCallbacksLongTerm[responseId];
            // 执行本地的回调函数
            responseCallback && responseCallback(responseData);
            // 删除api回调
            // eslint-disable-next-line no-param-reassign
            delete bridge.responseCallbacks[responseId];
            // 删除参数函数回调
            if (bridge.functionCallbacks[responseId]) {
                bridge.functionCallbacks[responseId].forEach((e) => {
                    // eslint-disable-next-line no-param-reassign
                    delete bridge.responseCallbacks[e];
                });
            }
        } else {
            /**
             * 否则,代表原生主动执行h5本地的函数
             * 从本地注册的函数中获取
             */
            const handler = bridge.messageHandlers[message.handlerName];
            const data = message.data;

            // 执行本地函数,按照要求传入数据和回调
            handler && handler(data);
        }
    }
    /**
     * 给所有iframe页面推送内容
     * @param {Object} message 对应的方法的详情,需要手动转为json
     */
    function allIframePostMessage(message) {
        // 获取原生传递过来指定的iframe标记
        const iframeUuid = message.callbackIframeUUid || message.iframeUuid;
        const ifrmaePages = document.getElementsByTagName('iframe');

        [].forEach.call(ifrmaePages, (e: HTMLIFrameElement) => {
            e.contentWindow.postMessage(
                {
                    iframeUuid,
                    message
                },
                '*'
            );
        });
    }
    /**
     * 获取最终的url scheme
     * @param {String} proto 协议头，一般不同模块会有不同的协议头
     * @param {Object} message 兼容android中的做法
     * android中由于原生不能获取JS函数的返回值,所以得通过协议传输
     * @return {String} 返回拼接后的uri
     */
    function getUri(proto, message) {
        let uri = `${CUSTOM_PROTOCOL_SCHEME}://${proto}`;

        // 回调id作为端口存在
        let callbackId;
        let method;
        let params;

        if (message.callbackId) {
            // 必须有回调id才能生成一个scheme
            // 这种情况是H5主动调用native时
            callbackId = message.callbackId;
            method = message.handlerName;
            params = message.data;
        }
        if (!(window.self === window.top)) {
            // 老版本对ejsiframe页面ejs兼容，存在跨域无法响应问题
            params.callbackFunc = getParentWindow(window);
            // 4.0.3a以上，使用新版iframe兼容，由原生判断使用新版还是老版
            params.callbackIframeUUid = `${ejsIframeUuid}`;
        }
        // 参数转为字符串
        params = encodeURIComponent(getParam(params));
        // uri 补充,需要编码，防止非法字符
        uri += `:${callbackId}/${method}?${params}`;

        return uri;
    }
    /**
     * 将长字符串转成数组
     * @param {String} uri 长参数字符串
     * @returns {Array} ejsLongArr 根据5000长度拆分的数组
     */
    function longStringToArr(uri) {
        const ejsLongArr = [];
        const n = 5000;

        for (let i = 0, l = uri.length; i < l / n; i += 1) {
            const a = uri.slice(n * i, n * (i + 1));

            ejsLongArr.push(a);
        }

        return ejsLongArr;
    }
    /**
     * 手动实现setItem
     * @param {Number} id 数字
     * @param {String} string 数据拆分后的字符串
     * @param {String} index 拆分序列
     * @returns {String} uir 单独调用存储api
     */
    function callSetItem(id, string, index) {
        let uir = '';

        if (hybrid.version > '4.0.3') {
            // 在小程序里传大数据参数,setItem原生无法正常获取,改用setLongCache
            uir = `EpointJSBridge://storage:${id + 99}/setLongCache?${encodeURIComponent(
                `{"${id}-${index}":"${string}"}`
            )}`;
        } else {
            uir = `EpointJSBridge://storage:${id + 99}/setItem?{"${id}-${index}":"${string}"}`;
        }

        return uir;
    }
    /**
     * JS调用原生方法前,会先send到这里进行处理
     * @param {String} proto 这个属于协议头的一部分
     * @param {JSON} message 调用的方法详情,包括方法名,参数
     * @param {Object} responseCallback 调用完方法后的回调,或者长期回调的id
     */
    function doSend(proto, message, responseCallback) {
        const newMessage = message;

        newMessage.funcitonCallbackId = [];
        // 递归处理api参数内函数参数
        handleFunOpt(newMessage, message.data, JSBridge);
        if (typeof responseCallback === 'function') {
            // 如果传入的回调时函数，需要给它生成id
            // 取到一个唯一的callbackid
            const callbackId = getCallbackId();

            // 回调函数添加到短期集合中
            JSBridge.responseCallbacks[callbackId] = responseCallback;
            // 方法的详情添加回调函数的关键标识
            newMessage.callbackId = callbackId;
            // 将函数参数与函数回调绑定
            if (newMessage.funcitonCallbackId.length > 0) {
                // 与api回调id存储在functionCallbacks中
                JSBridge.functionCallbacks[callbackId] = newMessage.funcitonCallbackId;
            }
        } else {
            // 如果传入时已经是id，代表已经在回调池中了，直接使用即可
            newMessage.callbackId = responseCallback;
        }

        // 获取 触发方法的url scheme
        const uri = getUri(proto, newMessage);

        if (os.ejs) {
            // 依赖于os判断
            if (os.ios) {
                // ios采用
                window.webkit.messageHandlers.WKWebViewJavascriptBridge.postMessage(uri);
            } else if (os.android && !os.harmonyOs && uri.length > 5000) {
                // 当安卓传入数据大于5000时，进行拆分
                const uriArr = longStringToArr(uri);
                const callbackId = newMessage.callbackId;
                const callArr = [];

                uriArr.forEach((e, n) => {
                    const uriLong = callSetItem(callbackId, e, n);

                    // eslint-disable-next-line no-alert
                    window.prompt(uriLong, '');
                    callArr.push(`${callbackId}-${n}`);
                });
                const newUri = `EpointJSBridge://veryLongString?{'storageKey':${JSON.stringify(callArr)}}`;

                // eslint-disable-next-line no-alert
                window.prompt(newUri, '');
            } else if (os.android) {
                // eslint-disable-next-line no-alert
                window.prompt(uri, '');
            } else {
                warn(`当前ejs环境未识别系统类型，对应ua:${navigator.userAgent}`);
            }
        } else {
            // 浏览器
            warn(`浏览器中jsbridge无效,对应scheme:${uri}`);
        }
    }

    /**
     * 注册本地JS方法通过JSBridge给原生调用
     * 我们规定,原生必须通过JSBridge来调用H5的方法
     * 注意,这里一般对本地函数有一些要求,要求第一个参数是data,第二个参数是callback
     * @param {String} handlerName 方法名
     * @param {Function} handler 对应的方法
     */
    JSBridge.registerHandler = function registerHandler(handlerName, handler) {
        JSBridge.messageHandlers[handlerName] = handler;
    };

    /**
     * 注册长期回调到本地
     * @param {String} callbackId 回调id
     * @param {Function} callback 对应回调函数
     */
    JSBridge.registerLongCallback = function registerLongCallback(callbackId, callback) {
        JSBridge.responseCallbacksLongTerm[callbackId] = callback;
    };

    /**
     * 获得本地的长期回调，每一次都是一个唯一的值
     * @retrurn 返回对应的回调id
     * @return {Number} 返回长期回调id
     */
    JSBridge.getLongCallbackId = getLongCallbackId;

    /**
     * 调用原生开放的方法
     * @param {String} proto 这个属于协议头的一部分
     * @param {String} handlerName 方法名
     * @param {JSON} data 参数
     * @param {Object} callback 回调函数或者是长期的回调id
     */
    JSBridge.callHandler = function callHandler(proto, handlerName, data, callback) {
        doSend(
            proto,
            {
                handlerName,
                data
            },
            callback
        );
    };
    /**
     * 函数参数执行回调
     * @param {String} messageJSON 对应的方法的详情,需要手动转为json
     */
    // eslint-disable-next-line max-len
    JSBridge._handleParamCallbackMessageFromNative = function _handleParamCallbackMessageFromNative(messageJSON) {
        /**
         * 处理原生过来的方法
         */
        function doDispatchMessageFromNative() {
            let message;
            const bridge = window.JSBridge || JSBridge || {} as EJSNamespace.JSBridgeType;

            if (!messageJSON) {
                showError(globalError.ERROR_TYPE_NATIVECALL.code, globalError.ERROR_TYPE_NATIVECALL.msg);

                return;
            }

            try {
                if (typeof messageJSON === 'string') {
                    message = decodeURIComponent(messageJSON);
                    message = JSON.parse(message);
                } else {
                    message = messageJSON;
                }
            } catch (e) {
                showError(globalError.ERROR_TYPE_NATIVECALL.code, globalError.ERROR_TYPE_NATIVECALL.msg);

                return;
            }

            // 回调函数
            const responseId = message.responseId;
            const responseData = message.responseData;
            let responseCallback;

            if (responseId) {
                // 这里规定,原生执行方法完毕后准备通知h5执行回调时,回调函数id是responseId
                responseCallback = bridge.responseCallbacks[responseId];
                // 默认先短期再长期
                responseCallback = responseCallback || bridge.responseCallbacksLongTerm[responseId];
                // 执行本地的回调函数
                if (responseData && responseData.code === 1) {
                    responseData.result && responseCallback && responseCallback(responseData.result);
                } else {
                    console.error('原生返回的参数函数回调responseData');
                    console.error(responseData);
                }
            } else {
                /**
                 * 否则,代表原生主动执行h5本地的函数
                 * 从本地注册的函数中获取
                 */
                const handler = bridge.messageHandlers[message.handlerName];
                const data = message.data;

                if (handler) {
                    // 执行本地函数,按照要求传入数据和回调
                    handler(data);
                } else {
                    showError(0, `未在本地找到${message.handlerName}方法的回调`);
                }
            }
        }
        setTimeout(doDispatchMessageFromNative);
    };
    /**
     * 原生调用H5页面注册的方法,或者调用回调方法
     * @param {String} messageJSON 对应的方法的详情,需要手动转为json
     */
    JSBridge._handleMessageFromNative = function _handleMessageFromNative(messageJSON) {
        /**
         * 处理原生过来的方法
         */
        function doDispatchMessageFromNative() {
            let message;
            const bridge = window.JSBridge || JSBridge || {} as EJSNamespace.JSBridgeType;

            if (!messageJSON) {
                showError(globalError.ERROR_TYPE_NATIVECALL.code, globalError.ERROR_TYPE_NATIVECALL.msg);

                return;
            }

            try {
                if (typeof messageJSON === 'string') {
                    message = decodeURIComponent(messageJSON);
                    message = JSON.parse(message);
                } else {
                    message = messageJSON;
                }
            } catch (e) {
                showError(globalError.ERROR_TYPE_NATIVECALL.code, globalError.ERROR_TYPE_NATIVECALL.msg);

                return;
            }

            // 回调函数
            const responseId = message.responseId;
            const responseData = message.responseData;
            let responseCallback;

            if (responseId) {
                // 这里规定,原生执行方法完毕后准备通知h5执行回调时,回调函数id是responseId
                responseCallback = bridge.responseCallbacks[responseId];
                // 默认先短期再长期
                responseCallback = responseCallback || bridge.responseCallbacksLongTerm[responseId];
                // 执行本地的回调函数
                responseCallback && responseCallback(responseData);
                // 删除api回调
                delete bridge.responseCallbacks[responseId];
                // 删除参数函数回调
                if (bridge.functionCallbacks[responseId]) {
                    bridge.functionCallbacks[responseId].forEach((e) => {
                        delete bridge.responseCallbacks[e];
                    });
                }
            } else {
                /**
                 * 否则,代表原生主动执行h5本地的函数
                 * 从本地注册的函数中获取
                 */
                const handler = bridge.messageHandlers[message.handlerName];
                const data = message.data;

                if (handler) {
                    // 执行本地函数,按照要求传入数据和回调
                    handler(data);
                } else {
                    showError(0, `未在本地找到${message.handlerName}方法的回调`);
                }
            }
        }

        // 使用异步
        setTimeout(doDispatchMessageFromNative);
    };

    // 用于给原生在iframe跨域情况下给ejs的回调信息
    // eslint-disable-next-line no-underscore-dangle
    JSBridge._handlePostMessage = function _handlePostMessage(messageJSON) {
        let message;

        try {
            if (typeof messageJSON === 'string') {
                message = decodeURIComponent(messageJSON);
                message = JSON.parse(message);
            } else {
                message = messageJSON;
            }
        } catch (e) {
            showError(globalError.ERROR_TYPE_NATIVECALL.code, globalError.ERROR_TYPE_NATIVECALL.msg);

            return;
        }

        // 给所有的iframe推送消息
        allIframePostMessage(message);
    };

    // 用于监听跨域iframe发送的执行内容
    window.addEventListener('message', (e) => {
        if (e.data && e.data.message) {
            const message = e.data.message;
            const iframeUuid = message.iframeUuid;

            if (iframeUuid === ejsIframeUuid) {
                const bridge = window.JSBridge || JSBridge || {};

                nativeActionCallback(bridge, message);
            } else {
                // 给所有的iframe推送消息
                allIframePostMessage(message);
            }
        }
    });

    window &&
        document &&
        document.addEventListener('DOMContentLoaded', () => {
            if (!hybridJs.os.ejs) {
                return;
            }
            hybridJs.event.dispatchEventToNative &&
                hybridJs.event.dispatchEventToNative({
                    key: 'DOMContentLoaded'
                });
        });

    /**
     * 注册接收原生的错误信息
     */
    JSBridge.registerHandler('handleError', (data) => {
        showError(globalError.ERROR_TYPE_NATIVE.code, JSON.stringify(data));
    });
}
