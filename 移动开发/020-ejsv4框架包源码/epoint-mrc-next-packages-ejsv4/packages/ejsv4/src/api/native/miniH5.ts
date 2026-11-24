import { compareVersion } from '../../util/lang';

export default function miniH5Mixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('miniH5', [
        {
            namespace: 'navigateTo',
            os: ['ejs'],
            support: '3.4.1',
            defaultParams: {
                // 要打开的小程序 appId
                appId: '',
                // 打开指定的页面路径
                path: '',
                // 为1保活状态关闭小程序，为0不保活,默认为0
                alive: 0,
                // 需要传递给小程序的额外参数
                extraData: {}
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'appId', 'path', 'extraData');
                const options = args[0];

                // 去除无用参数的干扰
                options.data = undefined;

                options.dataFilter = (res) => {
                    const newRes = res;

                    if (!innerUtil.isObject(newRes.result.extraData)) {
                        try {
                            newRes.result.extraData = JSON.parse(newRes.result.extraData);
                        } catch (e) {}
                    }

                    return newRes;
                };

                args[0] = options;

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'navigateBack',
            os: ['ejs'],
            support: '3.4.1',
            defaultParams: {
                // 需要关闭的页面层级，默认只会关闭一层
                popPageNumber: 1,
                // 需要传递的参数，是一个字符串
                resultData: '',
                useRouter: false
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'extraData');

                if (args[0].useRouter) {
                    if (hybridJs.os.weex) {
                        // @ts-ignore
                        Vue['$router'].go(-1);

                        return;
                    }

                    if (window.vm && window.vm.$router) {
                        window.vm.$router.go(-1);
                    }
                } else if (innerUtil.isObject(args[0].resultData)) {
                    args[0].resultData = JSON.stringify(args[0].resultData);
                }

                hybridJs.page.close(args[0]);
            }
        },
        {
            namespace: 'onNavigateBack',
            os: ['ejs'],
            support: '3.4.1',
            runCode(this: any, ...rest) {
                this.api.isLongCb = true;
                hybridJs.callInner.apply(this, rest);
            }
        },
        {
            // 获取应用管理平台配置的业务接口地址
            namespace: 'getEpointCodeInfo',
            os: ['ejs']
        },
        {
            namespace: 'setNavigationBarTitle',
            os: ['ejs'],
            support: '3.4.1',
            defaultParams: {
                // 页面标题
                title: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'title');

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'setNavigationBarColor',
            os: ['ejs'],
            support: '3.4.1',
            defaultParams: {
                // 页面前景色
                frontColor: '',
                // 导航栏背景色
                backgroundColor: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'frontColor', 'backgroundColor');

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'close',
            os: ['ejs'],
            support: '3.4.1',
            defaultParams: {
                // 为1保活状态关闭小程序，为0不保活，默认1
                alive: 1
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;

                if (hybridJs.os.ios) {
                    // ios环境下做版本兼容
                    hybridJs.runtime.getEjsVersion({
                        success(result) {
                            const appVersion = result.version;

                            if (compareVersion('4.0.1.a', appVersion) > 0) {
                                args[0].alive = args[0].alive === 1 ? 0 : 1;
                            }
                        },
                        error(error) {
                            args[0].error && args[0].error(error);
                        }
                    });
                }

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            // 检测小程序是否已更新
            namespace: 'checkForUpdate',
            os: ['ejs'],
            support: '4.0.2'
        },
        {
            // 小程序强制更新并重启
            namespace: 'applyUpdate',
            os: ['ejs'],
            support: '4.0.2'
        },
        {
            // 小程序支持下载卡片资源
            namespace: 'applyCard',
            os: ['ejs'],
            support: '4.0.2',
            defaultParams: {
                // 支持配置强制更新 isforce 参数，1 不再执行判断逻辑、直接更新  0 正常更新
                isforce: '0',
                // 传入卡片 appkey、version、cardguid、isdebug
                appkey: '',
                version: '',
                cardguid: '',
                isdebug: ''
            }
        }
    ]);
}
