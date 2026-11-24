// ejs原生模块后续主要用于跨端框架，所以useRouter默认为true
export default function pageMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('page', [
        {
            namespace: 'open',
            os: ['ejs'],
            defaultParams: {
                pageUrl: '',
                pageStyle: 1,
                // 横竖屏,默认为1表示竖屏
                orientation: 1,
                // 为1保活状态关闭小程序，为0不保活,默认为0
                alive: 0,
                // 额外数据
                data: {},
                useRouter: true
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'pageUrl', 'data');
                const options = args[0];

                if (options.useRouter && options.useRouter !== 'auto' && !/^(http|https)/.test(options.url)) {
                    let url = innerUtil.getFullUrlByParams(options.pageUrl, options.data, true);

                    if (hybridJs.os.weex) {
                        options.pageUrl = url;
                        // @ts-ignore
                        Vue['$router'].push(options.pageUrl);

                        return;
                    }

                    if (window.vm && window.vm.$router) {
                        options.pageUrl = url;
                        window.vm.$router.push(options.pageUrl);

                        return;
                    }

                    try {
                        if (uni) {
                            let uniOption = {
                                url,
                                success() {
                                    options.success && options.success();
                                },
                                fail(err) {
                                    options.error && options.error(err);
                                }
                            };

                            uni.navigateTo(Object.assign({}, options, uniOption));

                            return;
                        }
                    } catch {}
                }

                // 将额外数据拼接到url中
                options.pageUrl = innerUtil.getFullUrlByParams(options.pageUrl, options.data);
                // 去除无用参数的干扰
                options.data = undefined;

                args[0] = options;
                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'openLocal',
            os: ['ejs'],
            defaultParams: {
                className: '',
                // 为1则是打开已存在的页面，会杀掉所有该页面上的页面
                isOpenExist: 0,
                // 额外数据，注意额外数据只能一层键值对形式，不能再包裹子json
                data: {}
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];
                const pageStyle = options.data.pageStyle;

                // 兼容 pageStyle, 确保传递给原生的均是 Number 类型
                if (pageStyle) {
                    options.data.pageStyle = typeof pageStyle === 'string' ? parseInt(pageStyle, 10) : pageStyle;
                }

                options.dataFilter = (res) => {
                    const newRes = res;

                    if (!innerUtil.isObject(newRes.result.resultData)) {
                        try {
                            newRes.result.resultData = JSON.parse(newRes.result.resultData);
                        } catch (e) {}
                    }

                    return newRes;
                };

                args[0] = options;
                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'close',
            os: ['ejs'],
            defaultParams: {
                // 需要关闭的页面层级，默认只会关闭一层
                popPageNumber: 1,
                // 需要传递的参数，是一个字符串
                resultData: '',
                useRouter: true
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'resultData');
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                if (options.useRouter && options.useRouter !== 'auto') {
                    if (hybridJs.os.weex) {
                        // @ts-ignore
                        Vue['$router'].go(-options.popPageNumber);

                        return;
                    }

                    if (window.vm && window.vm.$router) {
                        window.vm.$router.go(-options.popPageNumber);

                        return;
                    }

                    try {
                        if (uni) {
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
                        }
                    } catch {}
                }

                if (innerUtil.isObject(args[0].resultData)) {
                    args[0].resultData = JSON.stringify(args[0].resultData);
                }

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'reload',
            os: ['ejs']
        },
        {
            namespace: 'showError',
            os: ['ejs'],
            defaultParams: {
                // 0: 网络异常  1: 服务器异常 2: 访问超时 3: 页面加载失败
                type: 0
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'type');

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'replace',
            os: ['ejs'],
            defaultParams: {
                url: '',
                useRouter: true
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'url');

                const options = args[0];

                if (options.useRouter && options.useRouter !== 'auto') {
                    if (hybridJs.os.weex) {
                        // @ts-ignore
                        Vue['$router'].replace(options.url);

                        return;
                    }

                    if (window.vm && window.vm.$router) {
                        window.vm.$router.replace(options.url);

                        return;
                    }

                    try {
                        if (uni) {
                            let uniOption = {
                                url: options.url,
                                success() {
                                    options.success && options.success();
                                },
                                fail(err) {
                                    options.error && options.error(err);
                                }
                            };

                            uni.redirectTo(Object.assign({}, options, uniOption));

                            return;
                        }
                    } catch {}
                }

                // 将额外数据拼接到url中
                options.url = innerUtil.getFullPath(options.url);

                args[0] = options;

                hybridJs.callInner.apply(this, args);
            }
        }
    ]);
}
