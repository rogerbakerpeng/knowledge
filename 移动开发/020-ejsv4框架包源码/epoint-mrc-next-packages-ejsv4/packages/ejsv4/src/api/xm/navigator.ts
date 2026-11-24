import callXmByArgs from './lib/callxm';

export default function navigatorMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('navigator', [
        {
            namespace: 'setTitle',
            os: ['xm'],
            defaultParams: {
                title: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'title');

                callXmByArgs(args, xm.setNavigationBarTitle, false);
            }
        }
    ]);
}
