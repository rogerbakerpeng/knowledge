/* eslint-disable camelcase */
import callXmByArgs from './lib/callxm';

export default function authMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.extendModule('auth', [
        {
            namespace: 'getToken',
            os: ['xm'],
            runCode(...rest) {
                const args = rest;

                args[0].params = 'getEpointToken';
                args[0].dataFilter = (result) => ({
                    access_token: result
                });
                callXmByArgs(args, xm.native);
            }
        },
        {
            namespace: 'getAuthCode',
            os: ['xm'],
            defaultParams: {
                appkey: ''
            },
            runCode(...rest) {
                const args = rest;

                args[0].dataFilter = (result) => ({
                    authCode: result.encryptedString
                });
                callXmByArgs(args, xm.getAuthCode);
            }
        },
        {
            namespace: 'refreshToken',
            os: ['xm'],
            runCode(...rest) {
                const args = rest;

                args[0].params = 'refreshEpointToken';
                args[0].dataFilter = (result) => ({
                    access_token: result
                });
                callXmByArgs(args, xm.native);
            }
        },
        {
            namespace: 'getUserInfo',
            os: ['xm'],
            runCode(...rest) {
                const args = rest;

                args[0].dataFilter = (result) => ({
                    userInfo: result
                });
                callXmByArgs(args, xm.getLoginUserInfo);
            }
        }
    ]);
}
