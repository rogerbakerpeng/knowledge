/* eslint-disable camelcase */
import callXmByArgs from './lib/callxm';

export default function deviceMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.extendModule('device', [
        {
            namespace: 'setOrientation',
            os: ['xm'],
            defaultParams: {
                orientation: 1 // 1表示竖屏，0表示横屏
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];

                // 设为竖屏，迅盟api为调用切换横竖屏
                if (options.orientation === 1 && window.ejs_xm_orientation !== 0) {
                    callXmByArgs(args, xm.horizontalScreen, false);
                    window.ejs_xm_orientation = 0;
                } else if (options.orientation === 0 && window.ejs_xm_orientation !== 1) {
                    callXmByArgs(args, xm.horizontalScreen, false);
                    window.ejs_xm_orientation = 1;
                }
            }
        },
        {
            namespace: 'getNetWorkInfo',
            os: ['xm'],
            runCode(...rest) {
                const args = rest;
                const options = args[0];
                const isOnline = xm.isOnline();

                options.success &&
                    options.success({
                        netWorkType: isOnline ? (xm.isWifi() ? 1 : 0) : -1
                    });
            }
        },
        {
            namespace: 'callPhone',
            os: ['xm'],
            defaultParams: {
                phoneNum: ''
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];

                args[0].params = {
                    dialNumber: options.phoneNum
                };
                callXmByArgs(rest, xm.makePhoneCall, false);
            }
        },
        {
            namespace: 'getDeviceId',
            os: ['xm'],
            runCode(...rest) {
                const args = rest;

                args[0].dataFilter = (res) => ({
                    deviceId: res.id
                });
                callXmByArgs(rest, xm.getSystemInfo);
            }
        },
        {
            namespace: 'getScreenInfo',
            os: ['xm'],
            runCode(...rest) {
                const args = rest;

                args[0].dataFilter = (res) => ({
                    pixel: Number(res.screenWidth) + '*' + Number(res.screenHeight)
                });
                callXmByArgs(rest, xm.getSystemInfo);
            }
        },
        {
            namespace: 'sendTo',
            os: ['xm'],
            defaultParams: {
                title: '',
                url: '',
                imgBase64: '',
                imgURL: '',
                sdPath: ''
            },
            runCode(...rest) {
                const args = rest;

                args[0].params = {
                    pic: args[0].imgURL || args[0].imgBase64 || args[0].sdPath,
                    title: args[0].title,
                    desc: '分享链接，点击试试',
                    link: args[0].url
                };

                callXmByArgs(rest, xm.shareLink);
            }
        },
        {
            namespace: 'getDeviceInfo',
            os: ['xm'],
            runCode(...rest) {
                const args = rest;

                args[0].dataFilter = (res) => ({
                    deviceName: res.brand + ' ' + res.model,
                    osType: res.platform,
                    osVersion: res.system,
                    deviceID: res.id
                });
                
                callXmByArgs(args, xm.getSystemInfo);
            }
        },
        {
            namespace: 'getMacAddress',
            os: ['xm'],
            runCode(...rest) {
                const args = rest;

                args[0].dataFilter = (res) => ({
                    macAddress: res.mac
                });
                
                callXmByArgs(args, xm.getCurrentWifi);
            }
        },
        {
            namespace: 'getVendorInfo',
            os: ['xm'],
            runCode(...rest) {
                const args = rest;

                args[0].dataFilter = (res) => ({
                    netWorkType: xm.isOnline() ? (xm.isWifi() ? 1 : 0) : -1,
                    deviceId: res.id,
                    pixel: Number(res.screenWidth) + '*' + Number(res.screenHeight),
                    uaInfo: `${res.platform} ${res.brand} ${res.model}`
                });
                
                callXmByArgs(args, xm.getSystemInfo);
            }
        }
    ]);
}
