import callXmByArgs from './lib/callxm';

export default function pageMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    function getFullUrlByParams(url = '', data) {
        let extrasDataStr = '';

        if (data) {
            Object.keys(data).forEach((item) => {
                if (extrasDataStr.indexOf('?') === -1) {
                    extrasDataStr += '?';
                } else {
                    extrasDataStr += '&';
                }
                extrasDataStr += `${item}=${data[item]}`;
            });
        }

        return url + extrasDataStr;
    }
    hybridJs.extendModule('page', [
        {
            namespace: 'open',
            os: ['xm'],
            defaultParams: {
                pageUrl: '',
                pageStyle: 1,
                // 额外数据
                data: {},
                useRouter: false
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'pageUrl', 'data');
                const options = args[0];

                if (window.vm && window.vm.$router && options.useRouter) {
                    options.pageUrl = innerUtil.getFullUrlByParams(options.pageUrl, options.data, true);
                    window.vm.$router.push(options.pageUrl);
                } else {
                    let navBgcolor = '',
                        pagestyle = '',
                        query = options.pageUrl.substring(options.pageUrl.indexOf('?') + 1),
                        arr = query.split('&');

                    if (arr && arr.length) {
                        arr.forEach((item) => {
                            let tmp = item.split('='),
                                key = tmp[0],
                                val = tmp[1];

                            if (key === 'ejs_nav_bgcolor') {
                                navBgcolor = val;
                            }

                            if (key === 'ejs_pagestyle') {
                                pagestyle = val;
                            }
                        });
                    }

                    if (/^(http|https|ftp|epth|h5|\/\/)/g.test(options.pageUrl)) {
                        // 将额外数据拼接到url中
                        options.pageUrl = innerUtil.getFullUrlByParams(options.pageUrl, options.data);
                        args[0] = innerUtil.extend(args[0], {
                            url: options.pageUrl,
                            hideNavibar: options.pageStyle === -1 || pagestyle === '-1',
                            navibarColor: args[0].navibarColor || navBgcolor
                        });
                        // 如果是全路径
                        callXmByArgs(args, xm.openExternal);
                    } else {
                        if (options.data) {
                            // eslint-disable-next-line
                            for (const key in options.data) {
                                // eslint-disable-next-line no-prototype-builtins
                                if (options.data.hasOwnProperty(key)) {
                                    const element = options.data[key];

                                    options.data[key] = encodeURI(element);
                                }
                            }
                        }
                        xm.off('resultData');

                        const opt = {
                            url: getFullUrlByParams(options.pageUrl, options.data),
                            events: {
                                resultData: (result) => {
                                    options.success &&
                                        options.success({
                                            resultData: result
                                        });
                                }
                            },
                            hideNavibar: options.pageStyle === -1 || pagestyle === '-1',
                            navibarColor: args[0].navibarColor || navBgcolor
                        };

                        xm.navigateTo(opt);
                    }
                }
            }
        },
        {
            namespace: 'close',
            os: ['xm'],
            defaultParams: {
                // 需要关闭的页面层级，默认只会关闭一层
                popPageNumber: 1,
                // 需要传递的参数，是一个字符串
                resultData: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'resultData');
                const options = args[0];

                if (window.vm && window.vm.$router) {
                    window.vm.$router.go(-args[0].popPageNumber);
                }

                options.resultData &&
                    xm.emitParent(
                        'resultData',
                        typeof options.resultData === 'string' ? JSON.stringify(options.resultData) : options.resultData
                    );
                xm.navigateBack({
                    delta: args[0].popPageNumber
                });
            }
        },
        {
            namespace: 'showError',
            os: ['xm'],
            defaultParams: {
                // 0: 网络异常  1: 服务器异常 2: 访问超时 3: 页面加载失败
                type: 0
            },
            runCode(...rest) {
                // 兼容字符串形式
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'type');
                let msg = '';

                switch (args[0].type) {
                    default:
                        break;
                    case 0:
                        msg = '网络异常';
                        break;
                    case 1:
                        msg = '服务器异常';
                        break;
                    case 2:
                        msg = '访问超时';
                        break;
                    case 3:
                        msg = '页面加载失败';
                        break;
                }
                args[0].params = {
                    msg
                };

                callXmByArgs(args, xm.showExceptionTip, false);
            }
        }
    ]);
}
