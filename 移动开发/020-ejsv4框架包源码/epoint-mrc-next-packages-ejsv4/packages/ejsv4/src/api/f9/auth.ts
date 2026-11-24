export default function authMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.extendModule('auth', [
        {
            namespace: 'getUserInfo',
            os: ['h5'],
            runCode(...rest) {
                const innerUtil = hybridJs.innerUtil;
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'title');
                const options = args[0];
                const resolve = args[1];

                Util.ajax({
                    url: `${Util.getProjectBasePath('')}rest/frame/getuserinfo_guid_v7`,
                    contentType: 'application/x-www-form-urlencoded',
                    type: 'POST',
                    data: {
                        params: JSON.stringify({})
                    },
                    success(result) {
                        const userInfo = {
                            userInfo: JSON.stringify(result.custom)
                        };

                        options.success && options.success(userInfo);
                        resolve && resolve(userInfo);
                    },
                    error(err) {
                        console.log(err);
                    }
                });
            }
        }
    ]);
}
