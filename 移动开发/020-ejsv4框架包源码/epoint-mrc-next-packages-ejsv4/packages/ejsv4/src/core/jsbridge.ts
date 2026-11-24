import nativeBridge from './nativejsbridge';
import weexBridge from './weexjsbridge';

/**
 * h5和原生交互，jsbridge核心代码
 * 依赖于showError，globalError，os
 * @param {Object} hybrid hybrid对象
 */
export default function jsbridgeMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    if (hybridJs.os.weex) {
        weexBridge(hybridJs);
    } else {
        nativeBridge(hybridJs);
    }
    
}
