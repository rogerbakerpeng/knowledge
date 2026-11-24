export default function audioMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    function addEvent(type, successCb, errCb, instanceType) {
        const instance = hybridJs[instanceType];
        let successCallback = () => {
            return (res) => {
                successCb && successCb(res);
            };
        };

        let errorCallback = () => {
            return () => {
                errCb && errCb();
            };
        };

        if (!hybridJs[`_has${instanceType}${type}Event`]) {
            hybridJs[`_has${instanceType}${type}Event`] = 1;

            instance[`on${type}`](successCallback());
        }

        if (!hybridJs[`_has${instanceType}ErrorEvent`]) {
            hybridJs[`_has${instanceType}ErrorEvent`] = 1;

            instance.onError(errorCallback());
        }
    }

    hybridJs.extendModule('audio', [
        {
            namespace: 'startRecord',
            os: ['miniprogram'],
            defaultParams: {
                minDuration: 1,
                maxDuration: 120,
                folderPath: '',
                fileName: ''
            },
            runCode(params, resolve, reject) {
                const recorderManager = hybridJs.recorderManager || uni.getRecorderManager();

                hybridJs.recorderManager = recorderManager;

                const opt = Object.assign(
                    {},
                    {
                        duration: params.maxDuration * 1000
                    },
                    params,
                    {
                        success: null
                    }
                );

                addEvent(
                    'Start',
                    () => {
                        params.success && params.success();
                        resolve && resolve();
                    },
                    (err) => {
                        params.error && params.error(err);
                        reject && reject(err);
                    },
                    'recorderManager'
                );

                recorderManager.start(opt);
            }
        },
        {
            namespace: 'stopRecord',
            os: ['miniprogram'],
            runCode(params, resolve, reject) {
                const recorderManager = hybridJs.recorderManager || uni.getRecorderManager();

                hybridJs.recorderManager = recorderManager;

                addEvent(
                    'Stop',
                    (result) => {
                        let res = Object.assign({}, result, {
                            path: result.tempFilePath,
                            duration: result.duration / 1000
                        });

                        params.success && params.success(res);
                        resolve && resolve(res);
                    },
                    (err) => {
                        params.error && params.error(err);
                        reject && reject(err);
                    },
                    'recorderManager'
                );

                recorderManager.stop();
            }
        },
        {
            namespace: 'pauseRecord',
            os: ['miniprogram'],
            runCode(params, resolve, reject) {
                const recorderManager = hybridJs.recorderManager || uni.getRecorderManager();

                hybridJs.recorderManager = recorderManager;

                addEvent(
                    'Pause',
                    () => {
                        params.success && params.success();
                        resolve && resolve();
                    },
                    (err) => {
                        params.error && params.error(err);
                        reject && reject(err);
                    },
                    'recorderManager'
                );

                recorderManager.pause();
            }
        },
        {
            namespace: 'resumeRecord',
            os: ['miniprogram'],
            runCode(params, resolve, reject) {
                const recorderManager = hybridJs.recorderManager || uni.getRecorderManager();

                hybridJs.recorderManager = recorderManager;

                addEvent(
                    'Resume',
                    () => {
                        params.success && params.success();
                        resolve && resolve();
                    },
                    (err) => {
                        params.error && params.error(err);
                        reject && reject(err);
                    },
                    'recorderManager'
                );

                recorderManager.resume();
            }
        },
        {
            namespace: 'startPlay',
            os: ['miniprogram'],
            defaultParams: {
                path: ''
            },
            runCode(params, resolve, reject) {
                let innerAudioContext = hybridJs.innerAudioContext || uni.createInnerAudioContext();

                innerAudioContext.src = params.path;

                innerAudioContext = Object.assign(innerAudioContext, params);

                hybridJs.innerAudioContext = innerAudioContext;

                addEvent(
                    'Play',
                    () => {
                        params.success && params.success();
                        resolve && resolve();
                    },
                    (err) => {
                        params.error && params.error(err);
                        reject && reject(err);
                    },
                    'innerAudioContext'
                );

                innerAudioContext.play();
            }
        },
        {
            namespace: 'stopPlay',
            os: ['miniprogram'],
            runCode(params, resolve, reject) {
                let innerAudioContext = hybridJs.innerAudioContext;

                hybridJs.innerAudioContext = innerAudioContext;

                addEvent(
                    'Stop',
                    () => {
                        params.success && params.success();
                        resolve && resolve();
                    },
                    (err) => {
                        params.error && params.error(err);
                        reject && reject(err);
                    },
                    'innerAudioContext'
                );

                innerAudioContext.stop();
            }
        },
        {
            namespace: 'pausePlay',
            os: ['miniprogram'],
            runCode(params, resolve, reject) {
                let innerAudioContext = hybridJs.innerAudioContext;

                hybridJs.innerAudioContext = innerAudioContext;

                addEvent(
                    'Pause',
                    () => {
                        params.success && params.success();
                        resolve && resolve();
                    },
                    (err) => {
                        params.error && params.error(err);
                        reject && reject(err);
                    },
                    'innerAudioContext'
                );

                innerAudioContext.pause();
            }
        },
        {
            namespace: 'seek',
            os: ['miniprogram'],
            defaultParams: {
                position: ''
            },
            runCode(params, resolve, reject) {
                let innerAudioContext = hybridJs.innerAudioContext;

                hybridJs.innerAudioContext = innerAudioContext;

                addEvent(
                    'Seeked',
                    () => {
                        params.success && params.success();
                        resolve && resolve();
                    },
                    (err) => {
                        params.error && params.error(err);
                        reject && reject(err);
                    },
                    'innerAudioContext'
                );

                innerAudioContext.seek(params.position);
            }
        }
    ]);
}
