import callDDByArgs from './lib/calldd';

export default function pageMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('page', [
        {
            namespace: 'open',
            os: ['dd'],
            defaultParams: {
                pageUrl: '',
                pageStyle: 1,
                // 横竖屏,默认为1表示竖屏
                orientation: 1,
                // 额外数据
                data: {}
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'pageUrl', 'data');
                const options = args[0];

                // 将额外数据拼接到url中
                options.url = innerUtil.getFullUrlByParams(options.pageUrl, options.data);
                // 去除无用参数的干扰
                options.data = undefined;
                args[0] = options;

                callDDByArgs(args, dd.biz.util.openLink);
            }
        },
        {
            namespace: 'close',
            os: ['dd'],
            runCode(...rest) {
                callDDByArgs(rest, dd.biz.navigation.close);
            }
        }
    ]);
}
