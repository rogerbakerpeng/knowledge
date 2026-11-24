export default function runtimeMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('runtime', [
        {
            namespace: 'clipboard',
            os: ['weex'],
            defaultParams: {
                text: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'text');

                let success = args[0].success;

                args[0].success = () => {
                    hybridJs.ui.toast('内容已复制');
                    success && success();
                };

                weex.requireModule('clipboard').setString(args[0].text);

                args[0].success();
            }
        }
    ]);
}
