// ejs原生模块后续主要用于跨端框架，所以useRouter默认为true
export default function pageMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;
    const navigator = weex.requireModule('navigator');

    hybridJs.extendModule('page', [
        {
            //weex端open只支持打开路由页面或者其他完整的weex页面路径
            namespace: 'open',
            os: ['weex'],
            defaultParams: {
                pageUrl: '',
                // 额外数据
                data: {},
                useRouter: true
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'pageUrl', 'data');
                const options = args[0];
                const resolve = args[1];

                if (options.useRouter && options.useRouter !== 'auto' && !/^(http|https)/.test(options.url)) {
                    let url = innerUtil.getFullUrlByParams(options.pageUrl, options.data, true);

                    options.pageUrl = url;
                    // @ts-ignore
                    Vue['$router'].push(options.pageUrl);

                    return;
                }

                // 将额外数据拼接到url中
                options.pageUrl = innerUtil.getFullUrlByParams(options.pageUrl, options.data);
                // 去除无用参数的干扰
                options.data = undefined;

                navigator.push(
                    {
                        url: options.pageUrl,
                        animated: 'false'
                    },
                    (event) => {
                        options.success && options.success(event);
                        resolve && resolve(event);
                    }
                );
            }
        },
        {
            // weex端close多层级是循环调用，效果并不好，所以这里重点是在weex端兼容路由方式的返回
            namespace: 'close',
            os: ['weex'],
            defaultParams: {
                // 需要关闭的页面层级，默认只会关闭一层
                popPageNumber: 1,
                useRouter: true
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'resultData');
                const options = args[0];
                const resolve = args[1];

                if (options.useRouter && options.useRouter !== 'auto') {
                    // @ts-ignore
                    Vue['$router'].go(-options.popPageNumber);

                    return;
                }

                navigator.pop(
                    {
                        animated: 'false'
                    },
                    (event) => {
                        options.success && options.success(event);
                        resolve && resolve(event);
                    }
                );
            }
        },
        {
            // weex端replace这里是先返回再跳转到替换后的页面，效果并不好，所以这里重点是在weex端兼容路由方式的替换
            namespace: 'replace',
            os: ['weex'],
            defaultParams: {
                url: '',
                useRouter: true
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'url');

                const options = args[0];
                const resolve = args[1];

                if (options.useRouter && options.useRouter !== 'auto') {
                    // @ts-ignore
                    Vue['$router'].replace(options.url);

                    return;
                }

                // 将额外数据拼接到url中
                options.url = innerUtil.getFullPath(options.url);

                args[0] = options;

                navigator.pop(
                    {
                        animated: 'false'
                    },
                    () => {
                        navigator.push(
                            {
                                url: options.url,
                                animated: 'false'
                            },
                            () => {
                                options.success && options.success();
                                resolve && resolve();
                            }
                        );
                    }
                );
            }
        }
    ]);
}
