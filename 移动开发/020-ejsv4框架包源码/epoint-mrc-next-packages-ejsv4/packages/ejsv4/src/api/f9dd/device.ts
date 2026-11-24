import callDDByArgs from './lib/calldd';

export default function deviceMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.extendModule('device', [
        {
            namespace: 'getDeviceId',
            os: ['dd'],
            runCode(...rest) {
                const args = rest;

                args[0].dataFilter = (result) => ({
                    deviceId: result.uuid
                });

                callDDByArgs(args, dd.device.base.getUUID);
            }
        },
        {
            namespace: 'vibrate',
            os: ['dd'],
            defaultParams: {
                duration: 500
            },
            runCode(...rest) {
                callDDByArgs(rest, dd.device.notification.vibrate);
            }
        },
        {
            namespace: 'getNetWorkInfo',
            os: ['dd'],
            runCode(...rest) {
                const args = rest;
                const netTypeMap = {
                    wifi: 1,
                    '2g': 0,
                    '3g': 0,
                    '4g': 0,
                    unknown: -1,
                    none: -1
                };

                args[0].dataFilter = (result) => ({
                    // 保留原来状态
                    result: result.result,
                    netWorkType: netTypeMap[result.result]
                });

                callDDByArgs(args, dd.device.connection.getNetworkType);
            }
        }
    ]);
}
