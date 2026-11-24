import { warn } from '../util/debug';
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
    const JSBridge = hybridJs.JSBridge || {} as EJSNamespace.JSBridgeType;
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
        // 参数转为字符串
        params = encodeURIComponent(getParam(params));
        // uri 补充,需要编码，防止非法字符
        uri += `:${callbackId}/${method}?${params}`;

        return uri;
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

        if (os.ejs && os.weex) {
            // 依赖于os判断
            weex.requireModule('ejs').postMessage(uri, function () {
                console.log('success');
            });
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
     * 注册接收原生的错误信息
     */
    JSBridge.registerHandler('handleError', (data) => {
        showError(globalError.ERROR_TYPE_NATIVE.code, JSON.stringify(data));
    });

    /**
     * 获取长监听数据回调
     *
     */
    weex.requireModule('globalEvent').addEventListener('onJSAPIResponse', function (rlt) {
        let responseId = rlt.responseId || '';
        const responseData = rlt.responseData;
        let responseCallback;
        let isLongCb = false;

        if (responseId.length > 0) {
            // 这里规定,原生执行方法完毕后准备通知h5执行回调时,回调函数id是responseId
            responseCallback = JSBridge.responseCallbacks[responseId];
            if (!responseCallback) {
                responseCallback = JSBridge.responseCallbacksLongTerm[responseId];
                isLongCb = true;
            }
            // 执行本地的回调函数
            responseCallback && responseCallback(responseData);
            // 执行完 删除短期回调
            if (!isLongCb) {
                delete JSBridge.responseCallbacks[responseId];
            }
        }
    });
}
