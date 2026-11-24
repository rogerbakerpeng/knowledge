/* eslint-disable camelcase */
import callXmByArgs from './lib/callxm';

export default function runtimeMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('runtime', [
        {
            namespace: 'getGeolocation',
            os: ['xm'],
            defaultParams: {
                // 1代表火星坐标系GCJ-02（天朝特色，带偏差，国内高德坐标也是这个），0代表地球坐标系WGS84（标准坐标）
                coordinate: 1,
                isShowDetail: 1
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];

                args[0] = innerUtil.extend(args[0], {
                    sdk: options.coordinate === 1 ? 0 : 1
                });
                args[0].dataFilter = (result) => ({
                    longitude: result.lng,
                    latitude: result.lat,
                    addressComponent: {
                        country: result.country,
                        country_code: 0,
                        province: result.province,
                        city: result.city,
                        district: result.district,
                        adcode: result.adcode,
                        street: result.street,
                        street_number: result.streetNum,
                        direction: result.streetNum
                    }
                });
                callXmByArgs(args, xm.getLocation);
            }
        },
        {
            namespace: 'getAppVersion',
            os: ['xm'],
            runCode(...rest) {
                const args = rest;

                args[0].dataFilter = (result) => ({
                    version: result.version
                });
                callXmByArgs(args, xm.getAppVersion);
            }
        },
        {
            namespace: 'clearCache',
            os: ['xm'],
            runCode(...rest) {
                const args = rest;

                callXmByArgs(args, xm.clearStorage);
            }
        },
        {
            namespace: 'canIUse',
            os: ['xm'],
            defaultParams: {
                apis: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;

                args[0].params = {
                    api: args[0].apis
                };

                args[0].dataFilter = (result) => {
                    let res = {};

                    result.forEach((element, i) => {
                        res[args[0].apis[i]] = element ? 1 : 0;
                    });

                    return res;
                };

                callXmByArgs(args, xm.canIUse);
            }
        }
    ]);
}
