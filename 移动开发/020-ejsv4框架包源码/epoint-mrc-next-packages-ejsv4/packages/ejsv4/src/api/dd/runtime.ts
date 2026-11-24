import callDDByArgs from './lib/calldd';

export default function runtimeMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('runtime', [
        {
            namespace: 'launchApp',
            os: ['dd'],
            defaultParams: {
                // android应用的包名
                packageName: '',
                // android应用页面类名
                className: '',
                // 页面配置的Scheme名字，适用于Android与iOS
                scheme: ''
            },
            runCode(...rest) {
                const args = rest;

                args[0] = innerUtil.extend(args[0], {
                    app: hybridJs.os.android ? args[0].packageName : args[0].scheme,
                    activity: args[0].className
                });

                callDDByArgs(args, dd.device.launcher.launchApp);
            }
        },
        {
            namespace: 'clipboard',
            os: ['dd'],
            defaultParams: {
                text: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'text');

                args[0].text = String(args[0].text);

                callDDByArgs(args, dd.biz.clipboardData.setData);
            }
        },
        {
            namespace: 'getGeolocation',
            os: ['dd'],
            defaultParams: {
                isShowDetail: 0,
                targetAccuracy: 1000,
                coordinate: 1,
                useCache: true,
                withReGeocode: false
            },
            runCode(...rest) {
                callDDByArgs(rest, dd.device.geolocation.get);
            }
        }
    ]);
}
