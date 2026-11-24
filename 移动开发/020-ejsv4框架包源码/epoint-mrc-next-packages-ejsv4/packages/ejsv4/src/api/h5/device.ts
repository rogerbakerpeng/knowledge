import onlyH5Device from './onlyH5/device';

export default function deviceMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    onlyH5Device(hybridJs);

    hybridJs.extendModule('device', [
        {
            namespace: 'callPhone',
            os: ['h5'],
            defaultParams: {
                phoneNum: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'phoneNum');
                const phoneNum = args[0].phoneNum;

                window.location.href = `tel:${phoneNum}`;
            }
        }
    ]);
}
