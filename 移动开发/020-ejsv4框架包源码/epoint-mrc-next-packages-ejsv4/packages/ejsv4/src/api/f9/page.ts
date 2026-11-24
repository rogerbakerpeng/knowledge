export default function pageMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('page', [
        {
            namespace: 'open',
            os: ['h5'],
            defaultParams: {
                pageUrl: '',
                // 额外数据
                data: {}
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'pageUrl', 'data');
                const options = args[0];

                // 将额外数据拼接到url中
                options.pageUrl = innerUtil.getFullUrlByParams(options.pageUrl, options.data);

                // f9
                if (parent && parent.appendIframe) {
                    parent.appendIframe(options.pageUrl, options.success);
                } else {
                    document.location.href = options.pageUrl;
                }
            }
        },
        {
            namespace: 'close',
            os: ['h5'],
            runCode(params) {
                const options = params;

                // 浏览器退出
                if (parent && parent.delIframe) {
                    parent.delIframe(options);
                } else {
                    window.history.back();
                }
            }
        },
        {
            namespace: 'reload',
            os: ['h5'],
            runCode() {
                window.location.reload();
            }
        }
    ]);
}
