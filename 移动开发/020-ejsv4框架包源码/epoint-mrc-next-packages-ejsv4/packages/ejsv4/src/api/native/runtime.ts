export default function runtimeMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('runtime', [
        {
            namespace: 'launchApp',
            os: ['ejs'],
            defaultParams: {
                // android应用的包名
                packageName: '',
                // android应用页面类名
                className: '',
                // android应用页面配置的ActionName
                actionName: '',
                // 页面配置的Scheme名字，适用于Android与iOS
                scheme: '',
                // 传递的参数。需要目标应用解析获取参数。字符串形式
                data: ''
            }
        },
        {
            namespace: 'isApplicationExist',
            os: ['ejs'],
            support: '3.1.2',
            defaultParams: {
                // android应用的包名
                packageName: '',
                // ios下的scheme
                scheme: ''
            }
        },
        {
            namespace: 'getAppKey',
            os: ['ejs']
        },
        {
            namespace: 'getAppVersion',
            os: ['ejs']
        },
        {
            namespace: 'getEjsVersion',
            os: ['ejs']
        },
        {
            namespace: 'clearCache',
            os: ['ejs']
        },
        {
            namespace: 'getGeolocation',
            os: ['ejs'],
            defaultParams: {
                isShowDetail: 1,
                // 1采用的火星坐标系，0采用地球坐标系
                coordinate: 1
            }
        },
        {
            namespace: 'clipboard',
            os: ['ejs'],
            defaultParams: {
                text: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'text');

                args[0].text = String(args[0].text);
                let success = args[0].success;

                args[0].success = () => {
                    hybridJs.ui.toast('内容已复制');
                    success && success();
                };

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'openUrl',
            os: ['ejs'],
            defaultParams: {
                url: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject(rest, 'url');

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            // 调试面板，如果native开启了调试，会在面板中打印
            namespace: 'logPanel',
            os: ['ejs'],
            support: '3.1.4',
            defaultParams: {
                text: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'text');

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'openSetting',
            os: ['ejs'],
            support: '3.1.6'
        },
        {
            namespace: 'getPlatformUrl',
            os: ['ejs'],
            support: '3.1.9'
        },
        {
            namespace: 'getPluginVersion',
            os: ['ejs'],
            support: '3.2.1',
            defaultParams: {
                pluginName: '',
                packageName: ''
            }
        },
        {
            namespace: 'securityType',
            os: ['ejs'],
            support: '3.4.0'
        },
        {
            namespace: 'platform',
            os: ['ejs'],
            support: '3.4.0'
        },
        {
            namespace: 'canIUse',
            os: ['ejs'],
            support: '4.0.0'
        },
        {
            namespace: 'startLocationUpdate',
            os: ['ejs'],
            support: '4.0.3'
        },
        {
            namespace: 'stopLocationUpdate',
            os: ['ejs'],
            support: '4.0.3'
        },
        // 以下为 EUI4.0 新增API
        // 获取当前模式
        // 出参(string)：0-标版模式；1-适老模式
        {
            namespace: 'getCurrentMode',
            os: ['ejs']
        },
        // 获取当前主题。（目前仅有默认主题，支持自定义扩展主题，可以设置成主题1、主题2这种）
        // 出参(string)： 0-默认主题；1-主题1；2-主题2
        {
            namespace: 'getCurrentTheme',
            os: ['ejs']
        },
        // 获取指定模式下的配置。（例如：type:0，是获取标版模式下的所有原生尺寸配置。）
        // 出参：{"key1":"value1","key2":"value2"}
        {
            namespace: 'getModeConfig',
            os: ['ejs'],
            defaultParams: {
                type: '0'
            }
        },
        // 获取指定主题下的配置。（例如：type:0，是获取默认主题下的所有原生颜色配置。）
        // 出参：{"key1":"value1","key2":"value2"}
        {
            namespace: 'getThemeConfig',
            os: ['ejs'],
            defaultParams: {
                type: '0'
            }
        },
        // 获取指定样式值（主要针对扩展样式，默认样式规范和命名按照基础token文档定义，可以根据样式名称获取对应的值信息）
        // 出参(string)：value
        {
            namespace: 'getConfigValue',
            os: ['ejs'],
            defaultParams: {
                key: ''
            }
        }
    ]);
}
