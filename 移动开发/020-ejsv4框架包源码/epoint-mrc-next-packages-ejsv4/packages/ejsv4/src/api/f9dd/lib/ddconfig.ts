// 获取sso地址
function getSsoUrl() {
    return new Promise((resolve, reject) => {
        console.log(Util.getProjectBasePath('js'));
        Util.ajax({
            url: `${Util.getProjectBasePath()}rest/common/getSSOUrl`,
            contentType: 'application/x-www-form-urlencoded',
            type: 'GET',
            isAutoProxy: false,
            success(result) {
                console.log(result);
                if (result.status.code === '1' && result.custom.ssourl && result.custom.ssourl !== '') {
                    const res = {
                        ssoUrl: result.custom.ssourl || '',
                        agentId: result.custom.dingtalk_agentid || ''
                    };

                    resolve(res);
                } else {
                    reject('ssourl地址没获取到');
                }
            },
            error(err) {
                console.log(err);
                reject(err);
            }
        });
    });
}
let isF9DdFirst = 0;

// 用于钉钉鉴权
function ddF9Config(jsApiList?: any[]) {
    return new Promise<void>((resolve, reject) => {
        // 一个页面只需要config一次
        if (ejs.os.dd && isF9DdFirst === 0) {
            getSsoUrl()
                .then((res: any) => {
                    Util.ajax({
                        url: `${res.ssoUrl}/rest/common/getJsTicket`,
                        data: {
                            tickettype: 'dingtalk',
                            pageurl: decodeURIComponent(window.location.href)
                        },
                        contentType: 'application/x-www-form-urlencoded',
                        isAutoProxy: false,
                        success(result) {
                            const nonceStr = result.custom.nonceStr;
                            const signature = result.custom.signature;
                            const corpId = result.custom.corpId;
                            const timestamp = result.custom.timestamp;
                            const agentId = result.custom.dingtalk_agentid || '';

                            dd.config({
                                agentId: agentId || res.agentId || '', // 必填，微应用ID
                                corpId, // 必填，企业ID
                                timeStamp: timestamp, // 必填，生成签名的时间戳
                                nonceStr, // 必填，生成签名的随机串
                                signature, // 必填，签名
                                // 选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
                                type: 0,
                                jsApiList: jsApiList || [
                                    'runtime.info',
                                    'biz.contact.choose',
                                    'device.notification.confirm',
                                    'device.notification.alert',
                                    'device.notification.prompt',
                                    'biz.ding.post',
                                    'biz.util.openLink',
                                    'biz.contact.complexPicker',
                                    'biz.cspace.saveFile',
                                    'biz.cspace.preview',
                                    'biz.cspace.chooseSpaceDir',
                                    'biz.util.uploadAttachment'
                                ] // 必填，需要使用的jsapi列表，注意：不要带dd。
                            });
                            dd.error((error) => {
                                console.log(`dd error: ${JSON.stringify(error)}`);
                                reject(error);
                            });
                            dd.ready(() => {
                                isF9DdFirst = 1;
                                localStorage.setItem('corpId', corpId);
                                document.addEventListener('resume', () => {
                                    // 读取最后打开的页面id
                                    let funcName = JSON.parse(localStorage.getItem('f9PageGuid')) || [];
                                    // console.log(funcName);

                                    funcName = funcName.slice(-1)[0];
                                    // 触发打开页面时id生成的函数
                                    if (typeof window[funcName] === 'function' && localStorage.getItem(funcName)) {
                                        const resData =
                                            localStorage.getItem(funcName) === '{}'
                                                ? ''
                                                : localStorage.getItem(funcName);
                                        // @ts-ignore
                                        // eslint-disable-next-line no-Util.safeEval
                                        Util.safeEval(`${funcName}(${resData})`);
                                        localStorage.removeItem(funcName);
                                        // 去除该id
                                        let f9PageGuid = JSON.parse(localStorage.getItem('f9PageGuid'));
                                        const deleteArrItems = (arr, item) => arr.filter((v) => v.indexOf(item) === -1);

                                        f9PageGuid = deleteArrItems(f9PageGuid, funcName);
                                        // f9PageGuid.splice(f9PageGuid.findIndex(e => e === funcName));
                                        // console.log(f9PageGuid);
                                        localStorage.setItem('f9PageGuid', JSON.stringify(f9PageGuid));
                                    }
                                });
                                resolve();
                            });
                        },
                        error(error) {
                            console.log(error);
                            isF9DdFirst = 1;
                            reject(error);
                        }
                    });
                })
                .catch((error) => {
                    reject(error);
                });
        } else {
            resolve();
        }
    });
}

export default ddF9Config;
