import autoConfig from '../dd/lib/autoConfig';
import { log } from '../../util/debug';
export default function eventMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.extendModule('event', [
        {
            namespace: 'config',
            os: ['wxWork', 'wxWorkLocal'],
            defaultParams: {
                // 一个数组，不要传null，否则可能在iOS中会有问题
                jsApiList: []
            },
            runCode(params) {
                if (params.isAutoConfig === 1 && params.jsApiList && params.jsApiList.length > 0 && window.self === window.top) {
                    if (window.wx) {
                        let env = 'wxWork';
    
                        if (hybridJs.os.wxWorkLocal) {
                            env = 'wxWorkLocal';
                        }
                        // 企业微信或政务微信自动鉴权
                        autoConfig(env, params.preUrl, params.token, params.agentId, params.ajax, hybridJs).then((res:any) => {
                            let { nonceStr, jsApiSignature, corpId, timestamp, userInfoSignature } = res;
    
                            timestamp = Number(timestamp);
    
                            window.wx.config({
                                beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
                                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
                                appId: corpId, // 必填，企业微信的corpID
                                timestamp, // 必填，生成签名的时间戳
                                nonceStr, // 必填，生成签名的随机串
                                signature: jsApiSignature, // 必填，签名，见附录1
                                jsApiList: params.jsApiList || [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                            });
                            window.wx.ready(() => {
                                log(env + ' ready');
                                if (params.agentId && userInfoSignature) {
                                    if (hybridJs.os.wxWorkLocal) {
                                        window.wx.invoke(
                                            'agentConfig',
                                            {
                                                agentid: params.agentId, // 必填，单位应用的agentid
                                                corpid: corpId, // 必填，政务微信的corpid
                                                timestamp, // 必填，生成签名的时间戳,int类型, 如 1539100800
                                                nonceStr, // 必填，生成签名的随机串
                                                signature: userInfoSignature // 必填，签名，见附录5
                                            },
                                            function (res) {
                                                if (res.err_msg != 'agentConfig:ok') {
                                                    hybridJs.ui.alert('应用身份鉴权失败');
                                                    console.log(res);
    
                                                    return;
                                                }
                                                log(env + ' agentConfig ready');
                                                params.success && params.success();
                                            }
                                        );
                                    } else {
                                        window.wx.agentConfig({
                                            corpid: corpId, // 必填，企业微信的corpid，必须与当前登录的企业一致
                                            agentid: params.agentId, // 必填，企业微信的应用id （e.g. 1000247）
                                            timestamp, // 必填，生成签名的时间戳
                                            nonceStr, // 必填，生成签名的随机串
                                            signature: userInfoSignature, // 必填，签名，见附录-JS-SDK使用权限签名算法
                                            jsApiList: params.jsApiList || [], //必填，传入需要使用的接口名称
                                            success: function (res) {
                                                log(env + ' agentConfig ready');
                                                params.success && params.success();
                                            },
                                            fail: function (res) {
                                                console.warn(res);
                                                if (res.errMsg.indexOf('function not exist') > -1) {
                                                    hybridJs.ui.alert('应用身份鉴权失败, 版本过低请升级');
                                                }
                                                // 为了不阻塞页面展示，鉴权失败也能继续进入ready
                                                params.success && params.success();
                                            }
                                        });
                                    }
                                } else {
                                    params.success && params.success();
                                }
                            });
                            window.wx.error((error) => {
                                console.log(`wxWork error: ${JSON.stringify(error)}`);
                                // 为了不阻塞页面展示，鉴权失败也能继续进入ready
                                params.success && params.success();
                            });
                        });
                    } else {
                        hybridJs.ui.toast('未引入企业微信的JSSDK，无法自动鉴权');
                    }
                } else {
                    params.success && params.success();
                }
            }
        }
    ]);
}
