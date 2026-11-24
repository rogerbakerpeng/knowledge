export default function weexOsMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const os = hybridJs.os;

    if (weex.isRegisteredModule('ejs')) {
        os.ejs = true;
    }

    if (weex.config.env.osName === 'android') {
        os.android = true;
    }

    if (weex.config.env.osName === 'iOS' || weex.config.env.osName === 'ios') {
        os.ios = true;

        if (weex.config.env.deviceModel.match('iPhone')) {
            os.iPhone = true;
        } else if (weex.config.env.deviceModel.match('iPad')) {
            os.ipad = true;
        }
    }

    os.version = weex.config.env.osVersion;

    // 调整weex位置，在ejs容器中，优先调用ejs原生方法
    hybridJs.supportOsArray.splice(hybridJs.supportOsArray.indexOf('weex'), 1);
    hybridJs.supportOsArray.splice(hybridJs.supportOsArray.indexOf('ejs') + 1, 0, 'weex');
}
