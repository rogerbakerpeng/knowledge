import callXmByArgs from './lib/callxm';

export default function miniH5Mixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('miniH5', [
        {
            namespace: 'navigateTo',
            os: ['xm'],
            defaultParams: {
                // 要打开的小程序 appId
                appId: '',
                // 打开指定的页面路径
                path: '',
                // 需要传递给小程序的额外参数
                extraData: {}
            },
            runCode(...rest) {
                const args = rest;

                args[0] = innerUtil.extend(args[0], {
                    appid: Number(args[0].appId),
                    param: args[0].extraData,
                    relativeUrl: args[0].path
                });
                callXmByArgs(args, xm.openApp, false);
            }
        },
        {
            namespace: 'navigateBack',
            os: ['xm'],
            defaultParams: {
                delta: 1,
                useRouter: false
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];

                if (window.vm && window.vm.$router && options.useRouter) {
                    window.vm.$router.back();
                } else {
                    xm.navigateBack({
                        delta: args[0].delta
                    });
                }
            }
        },
        {
            namespace: 'close',
            os: ['xm'],
            defaultParams: {
                params: 'close'
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'params');

                callXmByArgs(args, xm.native, true);
            }
        },
        {
            namespace: 'setNavigationBarTitle',
            os: ['xm'],
            defaultParams: {
                title: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;

                args[0].params = {
                    title: args[0].title
                };

                callXmByArgs(args, xm.setNavigationBarTitle, false);
            }
        },
        {
            namespace: 'onNavigateBack',
            os: ['xm'],
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;

                xm.on('onNavigateBack', () => {
                    args[0].success && args[0].success();
                });
            }
        }
    ]);
}
