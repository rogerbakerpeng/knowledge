export default function eventMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.extendModule('event', [
        {
            namespace: 'on',
            os: ['xm'],
            defaultParams: {
                key: ''
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];

                xm.on(options.key, (data) => {
                    options.success && options.success(data);
                });
            }
        },
        {
            namespace: 'once',
            os: ['xm'],
            defaultParams: {
                key: ''
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];

                xm.once(options.key, (data) => {
                    options.success && options.success(data);
                });
            }
        },
        {
            namespace: 'emit',
            os: ['xm'],
            defaultParams: {
                key: ''
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];

                xm.emit(options.key, options);
                options.success && options.success();
            }
        },
        {
            namespace: 'off',
            os: ['xm'],
            defaultParams: {
                key: ''
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];

                xm.off(options.key);
                options.success && options.success();
            }
        },
        {
            namespace: 'app',
            os: ['xm'],
            defaultParams: {
                onLaunch: '',
                onShow: '',
                onHide: '',
                onClose: ''
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];

                xm.on('onLaunch', () => {
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
    ]);
}
