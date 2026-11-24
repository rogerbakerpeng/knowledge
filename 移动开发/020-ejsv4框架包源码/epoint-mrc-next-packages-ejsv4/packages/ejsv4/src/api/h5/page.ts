// 该H5模块主要用于M7框架，所以useRouter全都默认为false
import onlyH5Page from './onlyH5/page';
export default function pageMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    onlyH5Page(hybridJs);

    hybridJs.extendModule('page', [
        {
            namespace: 'open',
            os: ['h5'],
            defaultParams: {
                pageUrl: '',
                // 额外数据
                data: {},
                useRouter: false
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'pageUrl', 'data');
                const options = args[0];

                // 政务微信环境下，统一去掉.html后缀
                if (hybridJs.os.wxWorkLocal) {
                    options.pageUrl = options.pageUrl.replace(/.html/, '');
                }

                if (
                    window.vm &&
                    window.vm.$router &&
                    (options.useRouter || options.useRouter === 'auto') &&
                    !/^(http|https)/.test(options.pageUrl)
                ) {
                    options.pageUrl = innerUtil.getFullUrlByParams(options.pageUrl, options.data, true);
                    window.vm.$router.push(options.pageUrl);
                } else {
                    // 将额外数据拼接到url中
                    options.pageUrl = innerUtil.getFullUrlByParams(options.pageUrl, options.data);
                    // 普通
                    window.location.href = options.pageUrl;
                }
            }
        },
        {
            namespace: 'close',
            os: ['h5'],
            defaultParams: {
                popPageNumber: 1,
                useRouter: false
            },
            runCode(...rest) {
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'resultData');
                const options = args[0];
                const resolve = args[1];
                let popPageNumber = -options.popPageNumber;


                if (window.vm && window.vm.$router && options.useRouter && options.useRouter !== 'auto') {
                    window.vm.$router.go(popPageNumber);

                    return;
                }


                // 浏览器退出
                if (window.history.length > 1) {
                    window.history.go(popPageNumber);
                    options.success && options.success();
                    resolve && resolve();
                }
            }
        },
        {
            namespace: 'replace',
            os: ['h5'],
            defaultParams: {
                url: '',
                useRouter: false
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'url');

                const options = args[0];

                if (
                    window.vm &&
                    window.vm.$router &&
                    options.useRouter &&
                    options.useRouter !== 'auto' &&
                    !/^(http|https)/.test(options.url)
                ) {
                    window.vm.$router.replace(options.url);

                    return;
                }

                // 将额外数据拼接到url中
                options.url = innerUtil.getFullPath(options.url);

                window.location.replace(options.url);
            }
        }
    ]);
}
