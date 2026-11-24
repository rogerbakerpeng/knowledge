export default function authMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.extendModule('auth', [
        {
            namespace: 'getToken',
            os: ['ejs']
        },
        {
            namespace: 'refreshToken',
            os: ['ejs']
        },
        {
            namespace: 'getUserInfo',
            os: ['ejs']
        },
        {
            namespace: 'refreshUserInfo',
            os: ['ejs'],
            support: '4.2.3'
        },
        {
            namespace: 'getAuthCode',
            os: ['ejs'],
            support: '3.2.4'
        },
        {
            namespace: 'logoutUserWithAlert',
            os: ['ejs'],
            support: '3.5.0',
            defaultParams: {
                title: '提示',
                message: '请重新登录'
            }
        },
        {
            namespace: 'logout',
            os: ['ejs'],
            support: '4.1.9'
        },
        {
            namespace: 'getUserAuthCode',
            os: ['ejs'],
            support: '4.0.2', // 实际支持版本4.0.3a，为兼容姑苏项目降为4.0.2
            defaultParams: {
                appkey: ''
            }
        }
    ]);
}
