export default function streamMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const stream = weex.requireModule('stream');

    hybridJs.extendModule('stream', [
        {
            namespace: 'fetch',
            os: ['weex'],
            defaultParams: {
                url: '',
                method: 'POST',
                // json text
                type: 'json',
                body: '',
                // 有一些默认的头部信息
                headers: {
                    // application/json
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];
                const success = options.success;
                const resolve = args[1];

                delete options.success;
                delete options.error;

                if (typeof options.body !== 'string') {
                    // weex的body只能传递字符串
                    options.body = JSON.stringify(options.body);
                }

                args[0] = options;
                stream.fetch(options, (response) => {
                    success && success(response);
                    resolve && resolve(response);
                });
            }
        }
    ]);
}
