// jsbridge协议定义的名称
export const CUSTOM_PROTOCOL_SCHEME = 'EpointJSBridge';
// 要排除掉的端口号
export const excludePort = [8193, 8194, 8195];

// 唯一id,用来确保长期回调的唯一性，初始化为最大值
let uniqueLongCallbackId = 65536;

// 临时解决：iframe跨域时，长期回调port需要随机。防止安卓非iframe的webview下，从全局port中读取到iframeuuid，误以iframe传参方式进行回调。
if (typeof weex === 'undefined' && !(window.self === window.top)) {
    uniqueLongCallbackId = 50000 + Math.round(Math.random() * (65536 - 50000));
}

/**
 * 获取短期回调id，内部要避免和长期回调的冲突
 * @return {Number} 返回一个随机的短期回调id
 */
export function getCallbackId() {
    const exclude = function exclude(port) {
        if (excludePort.indexOf(port) !== -1) {
            return exclude(Math.floor(Math.random() * uniqueLongCallbackId));
        }

        return port;
    };

    // 确保每次都不会和长期id相同
    return exclude(Math.floor(Math.random() * uniqueLongCallbackId));
}

export function getLongCallbackId() {
    uniqueLongCallbackId -= 1;

    return uniqueLongCallbackId;
}

/**
 * 手动函数传参
 * @param {String} UUID 唯一标识
 * @returns {String} FuncString 带协议的字符串
 */
export function callFuncData(UUID) {
    const FuncString = `JSBridgeParamForCallback://${UUID}`;

    return FuncString;
}
/**
 * 将函数转换为唯一协议标识
 * @param {object} newMessage 构建后参数
 * @param {function} fun 函数参数
 * @param {object} JSBridge JSBridge
 * @returns {String} FuncString 带协议的字符串
 */
export function funToGuid(newMessage, fun, JSBridge) {
    const FuncId = getCallbackId();

    // 全局存储参数函数
    JSBridge.responseCallbacks[FuncId] = fun;
    // 存储函数参数id至本地，将与api成功回调id绑定，用于统一成功回调后销毁
    newMessage.funcitonCallbackId.push(FuncId);

    return callFuncData(FuncId);
}
/**
 * 递归处理传参内函数参数未唯一协议标识字符串
 * @param {object} newMessage 构建后参数
 * @param {object} data api入参
 * @param {object} JSBridge JSBridge
 */
export function handleFunOpt(newMessage, data, JSBridge) {
    data &&
        Object.keys(data).forEach((item) => {
            if (typeof data[item] === 'function') {
                // eslint-disable-next-line no-param-reassign
                data[item] = funToGuid(newMessage, data[item], JSBridge);
            } else if (typeof data[item] === 'object') {
                handleFunOpt(newMessage, data[item], JSBridge);
            }
        });
}

/**
 * 将JSON参数转为字符串
 * @param {Object} data 对应的json对象
 * @return {String} 转为字符串后的结果
 */
export function getParam(data) {
    if (typeof data !== 'string') {
        return JSON.stringify(data);
    }

    return data;
}
