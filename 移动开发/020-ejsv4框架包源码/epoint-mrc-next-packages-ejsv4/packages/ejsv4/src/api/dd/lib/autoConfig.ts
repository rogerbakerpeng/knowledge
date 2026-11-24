import { compareVersion } from '../../../util/lang';

let utilAjax = null;
let hybridJs = null;

// 用于M7框架编码，避免老版本M7框架没有编码的情况
function param(data) {
    let params = [];

    for (let k in data) {
        params.push(encodeURIComponent(k) + '=' + encodeURIComponent(data[k]));
    }

    return params.join('&').replace(/%20/g, '+');
}

// 获取sso地址
function getSsoUrl(preUrl) {
    return new Promise((resolve, reject) => {
        let getSSOUrl = `${preUrl}rest/common/getSSOUrl`;

        let option = {
            url: getSSOUrl,
            contentType: 'application/x-www-form-urlencoded',
            type: 'GET',
            // 获取sso地址是匿名
            isAutoProxy: false,
            success(result) {
                let resUrl = (result.custom && result.custom.ssourl) || '';

                resUrl.substring(resUrl.length - 1) === '/'
                    ? (resUrl = resUrl.substring(0, resUrl.length - 1))
                    : resUrl;
                if (result.status && parseInt(result.status.code, 10) === 1 && resUrl && resUrl !== getSSOUrl) {
                    hybridJs.storage.setItem({
                        'h5Home_sso_url': result.custom.ssourl,
                        success: function () {
                            console.log('ejs存储sso地址成功');
                            resolve(result.custom.ssourl);
                        },
                        error: function (error) {
                            console.error('ejs存储sso地址失败', error);
                            reject(error);
                        }
                    });
                } else {
                    console.error('ejs存储sso地址失败', result);
                    reject(result);
                }
            },
            error(err) {
                console.error('ejs存储sso地址失败', err);
                reject(err);
            }
        };

        utilAjax(option);
    });
}

// 通过不同接口获取鉴权参数
function getJsTicket(env, ssoUrl, data, token, cb) {
    let ajax = (getJsTicketUrl) => {
        return new Promise((resolve, reject) => {
            let option:any = {
                url: `${ssoUrl}${getJsTicketUrl}`,
                data,
                contentType: 'application/x-www-form-urlencoded',
                isAutoProxy: true,
                success(result) {
                    if (result.status && parseInt(result.status.code, 10) === 1) {
                        cb && cb(result.custom);
                        reject();
                    } else {
                        resolve(result);
                    }
                },
                error(error) {
                    console.log(error);
                    resolve(error);
                }
            };

            // 跨端框架无法获取全局的Config
            if (Config.version && compareVersion(Config.version, '8.0.0') < 0) {
                // M7框架需要独立编码
                option.data = param(option.data);
            }

            if (token) {
                // 如果传了token，或者不自动代理情况下传了token
                option.isAutoProxy = false;
                option.headers = {
                    Authorization: `Bearer ${token}`
                };
            }
            utilAjax(option);
        });
    };

    // 先用新接口获取鉴权参数
    let getJsTicketUrl = 'rest/thirdparty/common/getJsTicket';

    if (env === 'wxWorkLocal') {
        data.tickettype = 'govweixin';
    } else if (env === 'wxWork') {
        data.tickettype = 'weixin';
    }

    ajax(getJsTicketUrl)
        .then((res) => {
            console.log('通过新版getJsTicket接口获取鉴权参数失败');
            console.log('改为使用旧版getJsTicket接口获取鉴权参数');
            getJsTicketUrl = 'rest/common/getJsTicket';

            if (env === 'wxWorkLocal' || env === 'wxWork') {
                data.tickettype = 'weixin';
            }

            ajax(getJsTicketUrl)
                .then((res) => {
                    console.error(res);
                })
                .catch((error) => {
                    console.log('获取JSTicket成功');
                });
        })
        .catch((error) => {
            console.log('获取JSTicket成功');
        });
}

// 用于自动鉴权
export default function autoConfig(env, preUrl, token, agentId, paramsAjax, hybrid) {
    utilAjax = paramsAjax;
    hybridJs = hybrid;

    return new Promise((resolve, reject) => {
        const data = {
            tickettype: 'dingtalk',
            // 政务微信获取时，中文传参编译有问题，此处不进行编译
            pageurl: window.location.href.replace(window.location.hash, ''),
            agentid: agentId || ''
        };

        let cb = (result) => {
            if (result.jsApiSignature) {
                resolve(result);
            } else {
                let finalResult = {
                    nonceStr: result.nonceStr,
                    jsApiSignature: result.signature,
                    corpId: result.corpId,
                    timestamp: result.timestamp,
                    userInfoSignature: '',
                    'dingtalk_agentid': result.dingtalk_agentid
                };

                resolve(finalResult);
            }
        };

        // 获取sso地址，用于刷新token
        getSsoUrl(preUrl)
            .then((res:any) => {
                res += res.substring(res.length - 1) === '/' ? '' : '/';
                // 获取JSTicket
                getJsTicket(env, res, data, token, cb);
            })
            .catch(() => {
                console.log('获取sso地址失败，使用传进来的url获取鉴权参数');
                // 获取JSTicket
                getJsTicket(env, preUrl, data, token, cb);
            });
    });
}