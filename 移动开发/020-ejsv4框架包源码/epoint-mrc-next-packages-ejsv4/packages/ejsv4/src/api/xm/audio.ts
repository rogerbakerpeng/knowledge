import callXmByArgs from './lib/callxm';

export default function audioMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('audio', [
        {
            namespace: 'startRecord',
            os: ['xm'],
            defaultParams: {
                maxDuration: 120
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;

                args[0] = innerUtil.extend(args[0], {
                    duration: args[0].maxDuration * 1000
                });
                callXmByArgs(args, xm.startRecord, true);
            }
        },
        {
            namespace: 'stopRecord',
            os: ['xm'],
            defaultParams: {},
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;

                args[0] = innerUtil.extend(args[0], {});
                args[0].dataFilter = (result) => ({
                    duration: result.duration,
                    path: result.filePath
                });
                callXmByArgs(args, xm.stopRecord, true);
            }
        },
        {
            namespace: 'cancelRecord',
            os: ['xm'],
            defaultParams: {},
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;

                args[0] = innerUtil.extend(args[0], {});

                callXmByArgs(args, xm.cancelRecord, true);
            }
        },
        {
            namespace: 'startPlay',
            os: ['xm'],
            defaultParams: {
                path: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;

                args[0] = innerUtil.extend(args[0], {
                    url: args[0].path
                });

                callXmByArgs(args, xm.playAudio, true);
            }
        },
        {
            namespace: 'stopPlay',
            os: ['xm'],
            defaultParams: {},
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;

                args[0] = innerUtil.extend(args[0], {});

                callXmByArgs(args, xm.stopAudio, false);
            }
        }
    ]);
}
