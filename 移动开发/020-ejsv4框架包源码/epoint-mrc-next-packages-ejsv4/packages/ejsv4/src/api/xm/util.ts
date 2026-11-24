import callXmByArgs from './lib/callxm';

export default function utilMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('util', [
        {
            namespace: 'scan',
            os: ['xm'],
            runCode(...rest) {
                const args = rest;

                args[0].dataFilter = (result) => ({
                    resultData: result
                });
                callXmByArgs(args, xm.scanCode);
            }
        },
        {
            namespace: 'playVideo',
            os: ['xm'],
            defaultParams: {
                videoUrl: 0
            },
            runCode(...rest) {
                const args = rest;

                args[0] = innerUtil.extend(args[0], {
                    url: args[0].videoUrl
                });
                callXmByArgs(args, xm.playMedia);
            }
        },
        {
            namespace: 'selectImage',
            os: ['xm'],
            defaultParams: {
                photoCount: 9,
                showCamera: 0
            },
            runCode(...rest) {
                const args = rest;

                args[0].params = {
                    selectType: args[0].showCamera ? 0 : 2,
                    count: args[0].photoCount
                };
                args[0].dataFilter = (result) => {
                    const path = [];

                    result.length &&
                        result.forEach((item) => {
                            path.push(item.path);
                        });

                    return {
                        resultData: path
                    };
                };
                callXmByArgs(args, xm.chooseImage);
            }
        },
        {
            namespace: 'cameraImage',
            os: ['xm'],
            runCode(...rest) {
                const args = rest;

                args[0].params = {
                    selectType: 1
                };
                args[0].dataFilter = (result) => {
                    const path = [];

                    result.length &&
                        result.forEach((item) => {
                            path.push(item.path);
                        });

                    return {
                        resultData: path[0]
                    };
                };
                callXmByArgs(args, xm.chooseImage);
            }
        },
        {
            namespace: 'prevImage',
            os: ['xm'],
            defaultParams: {
                index: '',
                selectedPhotos: {}
            },
            runCode(...rest) {
                const args = rest;

                args[0] = innerUtil.extend(args[0], {
                    current: args[0].index,
                    urls: args[0].selectedPhotos
                });
                callXmByArgs(args, xm.previewImages, false);
            }
        },
        {
            namespace: 'invokePluginApi',
            os: ['xm'],
            defaultParams: {
                path: '',
                dataMap: {}
            },
            runCode(...rest) {
                const args = rest;
                const resolve = args[1];
                const reject = args[2];

                xm.native('invokePlugin', {
                    path: args[0].path,
                    dataMap: args[0].dataMap
                })
                    .then((res) => {
                        console.log('res.data');
                        console.log(res.data);
                        args[0].success && args[0].success(res.data);
                        resolve && resolve(res.data);
                    })
                    .catch((err) => {
                        reject && reject(err);
                    });
            }
        },
        {
            namespace: 'recordVideo',
            os: ['xm'],
            support: '3.1.2',
            defaultParams: {
                // 最大时长，单位为秒
                maxDuration: 120,
                className: hybridJs.os.android
                    ? 'com.epoint.baseapp.component.media.ShootActivity'
                    : 'EPTVideoRecordViewController'
            },
            runCode(...rest) {
                const args = rest;

                args[0].params = {
                    max: args[0].maxDuration
                };

                args[0].dataFilter = (result) => {
                    return {
                        resultData: result.videoPath
                    };
                };
                callXmByArgs(args, xm.recordVideo);
            }
        }
    ]);
}
