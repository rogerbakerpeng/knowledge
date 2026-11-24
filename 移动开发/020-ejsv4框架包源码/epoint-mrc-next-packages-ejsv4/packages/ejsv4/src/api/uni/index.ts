export default function extendMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    // 拓展uniAPI之前需要先拓展小程序平台的OS
    hybridJs.extendOS('miniprogram', function (os) {
        const miniprogram = !window;

        // 根据是否存在window对象判断小程序环境
        if (miniprogram) {
            os.miniprogram = true;
        }

        const setOs = (res) => {
            if (
                !os.android &&
                ((res.osName && res.osName === 'android') || (res.platform && res.platform === 'android'))
            ) {
                os.android = true;
                if (res.osVersion) {
                    os.version = res.osVersion;
                } else if (res.system) {
                    os.version = res.system.replace('Android ', '');
                }

                // 部分机型不支持该字段，无法判断
                if (res.romName === 'HarmonyOS Next') {
                    os.harmonyOs = true;
                }
            }

            if (!os.ios && ((res.osName && res.osName === 'ios') || (res.platform && res.platform === 'ios'))) {
                os.ios = true;
                if (res.osVersion) {
                    os.version = res.osVersion;
                } else if (res.system) {
                    os.version = res.system.replace('iOS ', '');
                }

                if ((res.deviceType && res.deviceType === 'phone') || (res.brand && res.brand === 'iPhone') || (res.model && res.model === 'iPhone')) {
                    os.iPhone = true;
                } else if ((res.deviceType && res.deviceType === 'pad') || (res.brand && res.brand === 'iPad') || (res.model && res.model === 'iPad')) {
                    os.ipad = true;
                }
            }
        }

        if (uni.getAppBaseInfo) {
            const { hostName } = uni.getAppBaseInfo();

            if (hostName) {
                os[hostName.toLowerCase()] = true;
            }
        }

        if (os.wechat) {
            // 微信端不使用 getSystemInfo，避免出现警告
            const res = uni.getDeviceInfo();

            setOs(res);
        } else {
            uni.getSystemInfo({
                success(res) {
                    setOs(res);

                    if (res.hostName && res.hostName) {
                        os[res.hostName.toLowerCase()] = true;
                    }
                },
                fail(error) {
                    console.log('获取系统信息失败', error);
                }
            });
        }
    });
}
