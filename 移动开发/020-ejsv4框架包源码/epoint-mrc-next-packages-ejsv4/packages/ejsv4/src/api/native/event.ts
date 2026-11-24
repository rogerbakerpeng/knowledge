export default function eventMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    /**
     * 前端的EVENT名称和原生容器的有一些差别
     */
    const EVENT_MAPPING = {
        resume: 'OnPageResume',
        pause: 'OnPagePause',
        miniH5Resume: 'OnMiniPageResume',
        netChange: 'OnNetChanged',
        search: 'OnSearch',
        destroy: 'OnPageDestroy',
        created: 'OnPageCreated',
        cardOpenbox: 'onCardOpenbox',
        cardClosebox: 'onCardClosebox'
    };

    hybridJs.extendModule('event', [
        {
            namespace: 'registerEvent',
            os: ['ejs'],
            defaultParams: {
                key: ''
            },
            runCode(this: any, ...rest) {
                const args = rest;
                const options = args[0];

                options.key = EVENT_MAPPING[options.key] || options.key;
                args[0] = options;

                // 长期回调为true，里面会自动生成长期回调id
                this.api.isLongCb = true;
                // 标识是event，event的时候需要额外增加一个port参数，对应相应的长期回调id
                this.api.isEvent = true;
                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'unRegisterEvent',
            os: ['ejs'],
            defaultParams: {
                key: ''
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];

                options.key = EVENT_MAPPING[options.key] || options.key;
                args[0] = options;

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'isRegisterEvent',
            os: ['ejs'],
            defaultParams: {
                key: ''
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];

                options.key = EVENT_MAPPING[options.key] || options.key;
                args[0] = options;

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'dispatchEventToNative',
            os: ['ejs']
        },
        {
            namespace: 'on',
            os: ['ejs'],
            defaultParams: {
                key: ''
            },
            runCode(this: any, ...rest) {
                const args = rest;

                // 长期回调为true，里面会自动生成长期回调id
                this.api.isLongCb = true;
                // 标识是event，event的时候需要额外增加一个port参数，对应相应的长期回调id
                this.api.isEvent = true;

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'once',
            os: ['ejs'],
            defaultParams: {
                key: ''
            }
        },
        {
            namespace: 'emit',
            os: ['ejs'],
            defaultParams: {
                key: ''
            }
        },
        {
            namespace: 'off',
            os: ['ejs'],
            defaultParams: {
                key: ''
            }
        },
        {
            namespace: 'app',
            os: ['ejs'],
            defaultParams: {
                onLaunch: '',
                onShow: '',
                onHide: '',
                onClose: ''
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];

                if (hybridJs.os.ejs) {
                    hybridJs.event.registerEvent({
                        key: 'created',
                        success: () => {
                            options.onLaunch && options.onLaunch();
                        }
                    });
                    hybridJs.event.registerEvent({
                        key: 'miniH5Resume',
                        success: () => {
                            options.onShow && options.onShow();
                        }
                    });
                    hybridJs.event.registerEvent({
                        key: 'pause',
                        success: () => {
                            options.onHide && options.onHide();
                        }
                    });
                    hybridJs.event.registerEvent({
                        key: 'destroy',
                        success: () => {
                            options.onClose && options.onClose();
                            hybridJs.event.dispatchEventToNative({
                                key: 'DOMContentUnLoaded'
                            });
                        }
                    });
                } else if (hybridJs.os.xm) {
                    xm.on('onLoad', () => {
                        options.onLaunch && options.onLaunch();
                    });
                    xm.on('onPageShow', () => {
                        options.onShow && options.onShow();
                    });
                    xm.on('onPageHide', () => {
                        options.onHide && options.onHide();
                    });
                    xm.on('onAppClose', () => {
                        options.onClose && options.onClose();
                    });
                }
            }
        }
    ]);
}
