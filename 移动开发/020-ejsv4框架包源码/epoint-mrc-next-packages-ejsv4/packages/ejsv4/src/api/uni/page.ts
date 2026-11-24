import onlyH5Page from '../h5/onlyH5/page';

export default function pageMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    onlyH5Page(hybridJs);

    hybridJs.extendModule('page', [
        {
            namespace: 'open',
            os: ['miniprogram', 'h5'],
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
                const reject = args[2];

                let url = innerUtil.getFullUrlByParams(options.pageUrl, options.data, true);

                if (options.useRouter && options.useRouter !== 'auto' && !/^(http|https)/.test(url)) {
                    let uniOption = {
                        url,
                        success() {
                            options.success && options.success();
                            resolve && resolve();
                        },
                        fail(err) {
                            options.error && options.error(err);
                            reject && reject(err);
                        }
                    };

                    uni.navigateTo(Object.assign({}, options, uniOption));
                } else if (hybridJs.os.h5) {
                    window.location.href = url;
                    options.success && options.success();
                    resolve && resolve();
                }
            }
        },
        {
            namespace: 'close',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                // 需要关闭的页面层级，默认只会关闭一层
                popPageNumber: 1,
                useRouter: true
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'resultData');
                const resolve = args[1];
                const reject = args[2];

                const options = args[0];

                if (options.useRouter && options.useRouter !== 'auto') {
                    let uniOption = {
                        delta: options.popPageNumber,
                        success() {
                            options.success && options.success();
                            resolve && resolve();
                        },
                        fail(err) {
                            options.error && options.error(err);
                            reject && reject(err);
                        }
                    };

                    uni.navigateBack(Object.assign({}, options, uniOption));

                    return;
                } else if (hybridJs.os.h5) {
                    window.history.go(-options.popPageNumber);
                    options.success && options.success();
                    resolve && resolve();
                }
            }
        },
        {
            namespace: 'replace',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                url: '',
                useRouter: true
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'url');

                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                if (options.useRouter && options.useRouter !== 'auto' && !/^(http|https)/.test(options.url)) {
                    let url = innerUtil.getFullUrlByParams(options.url, options.data, true);

                    uni.redirectTo({
                        url,
                        success() {
                            options.success && options.success();
                            resolve && resolve();
                        },
                        fail(err) {
                            options.error && options.error(err);
                            reject && reject(err);
                        }
                    });
                } else if (hybridJs.os.h5) {
                    options.url = innerUtil.getFullPath(options.url);
                    window.location.replace(options.url);
                    options.success && options.success();
                    resolve && resolve();
                }
            }
        }
    ]);
}
