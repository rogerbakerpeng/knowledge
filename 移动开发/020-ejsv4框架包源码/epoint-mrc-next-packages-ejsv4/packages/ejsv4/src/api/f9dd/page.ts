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

                if (args[0].success) {
                    // 每次打开页面时，存储一个随机id
                    const id = `ejs${Util.uuid({
                        len: 10,
                        type: 'noline'
                    }).replace(/-/g, '_')}`;

                    if (typeof localStorage.getItem('f9PageGuid') !== 'string') {
                        localStorage.removeItem('f9PageGuid');
                    }
                    const f9PageGuid = JSON.parse(localStorage.getItem('f9PageGuid')) || [];

                    // 根据id命名成功回调函数，关闭页面时调用
                    f9PageGuid.push(id);
                    localStorage.setItem('f9PageGuid', JSON.stringify(f9PageGuid));
                    // console.log('args');
                    // console.log(f9PageGuid);
                    // 当前页面使用id命名成功回调函数
                    window[id] = args[0].success;
                    // 去除钉钉默认成功回调，与ejs保持一致
                    args[0].success = null;
                }

                callDDByArgs(args, dd.biz.util.openLink);
            }
        },
        {
            namespace: 'close',
            os: ['dd'],
            runCode(...rest) {
                const args = rest;
                const options = args[0];
                // if (options.resultData) {
                const f9PageGuid = JSON.parse(localStorage.getItem('f9PageGuid')) || [];
                const funcName = f9PageGuid.slice(-1)[0];

                localStorage.setItem(funcName, JSON.stringify(options));
                // }
                callDDByArgs(rest, dd.biz.navigation.close);
            }
        }
    ]);
}
