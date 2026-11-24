export default function deviceMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('device', [
        {
            namespace: 'setOrientation',
            os: ['ejs'],
            defaultParams: {
                // 1表示竖屏，0表示横屏，-1表示跟随系统
                orientation: 1
            }
        },
        {
            namespace: 'setZoomControl',
            os: ['ejs'],
            defaultParams: {
                isShow: 1
            }
        },
        {
            namespace: 'getDeviceId',
            os: ['ejs']
        },
        {
            namespace: 'getMacAddress',
            os: ['ejs']
        },
        {
            namespace: 'getScreenInfo',
            os: ['ejs']
        },
        {
            namespace: 'getVendorInfo',
            os: ['ejs']
        },
        {
            namespace: 'isTablet',
            os: ['ejs']
        },
        {
            namespace: 'getNetWorkInfo',
            os: ['ejs']
        },
        {
            namespace: 'callPhone',
            os: ['ejs'],
            defaultParams: {
                phoneNum: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'phoneNum');

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'sendMsg',
            os: ['ejs'],
            defaultParams: {
                phoneNum: '',
                message: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'phoneNum', 'message');

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'closeInputKeyboard',
            os: ['ejs']
        },
        {
            namespace: 'vibrate',
            os: ['ejs'],
            defaultParams: {
                duration: 200
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'duration');

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'sendTo',
            os: ['ejs'],
            defaultParams: {
                title: '',
                url: '',
                imgBase64: '',
                imgURL: '',
                sdPath: ''
            }
        },
        {
            namespace: 'setZoomControl',
            os: ['ejs'],
            defaultParams: {
                // 1表示显示，0表示隐藏
                isShow: 1
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'isShow');

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'setBounce',
            os: ['ejs'],
            defaultParams: {
                // 1表示开启，0表示关闭
                isEnable: 1
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'isEnable');

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'shake.disable',
            os: ['ejs'],
            runCode(this: any, ...rest) {
                // 修改为原生中的namespace
                this.api.namespace = 'shakeDisable';

                hybridJs.callInner.apply(this, rest);
            }
        },
        {
            namespace: 'shake.enable',
            os: ['ejs'],
            /**
             * 启用摇一摇后，只要有摇一摇就会回调，属于长期回调范围
             */
            runCode(this: any, ...rest) {
                // 修改为原生中的namespace
                this.api.namespace = 'shakeEnable';
                this.api.isLongCb = true;

                hybridJs.callInner.apply(this, rest);
            }
        },
        {
            namespace: 'checkPermissions',
            os: ['ejs'],
            support: '3.1.5',
            defaultParams: {
                // 0-6分别对应：location，storage，phone，camera，sms，contacts，microphone
                permissionsType: 0
            }
        },
        {
            namespace: 'requestPermissions',
            os: ['ejs'],
            support: '3.1.5',
            defaultParams: {
                // 0-6分别对应：location，storage，phone，camera，sms，contacts，microphone
                permissionsType: 0
            }
        },
        {
            namespace: 'beep',
            support: '3.4.0',
            os: ['ejs']
        },
        {
            namespace: 'goAppSetting',
            support: '3.4.0',
            os: ['ejs']
        },
        {
            namespace: 'setEnableShot',
            os: ['ejs'],
            support: '3.4.0',
            defaultParams: {
                isEnableShot: 0
            }
        },
        {
            namespace: 'getDeviceInfo',
            os: ['ejs'],
            support: '3.4.2'
        },
        {
            namespace: 'isHasVirtualPosApp',
            os: ['ejs'],
            support: '4.0.0'
        }
    ]);
}
