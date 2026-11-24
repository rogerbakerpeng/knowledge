import autoConfig from './lib/autoConfig';
import { log } from '../../util/debug';

export default function eventMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.extendModule('event', [
        {
            namespace: 'config',
            os: ['dd'],
            runCode(params) {
                if (params.isAutoConfig === 1 && params.jsApiList && params.jsApiList.length > 0) {
                    params.preUrl += params.preUrl.substring(params.preUrl.length - 1) === '/' ? '' : '/';

                    if (window.dd) {
                        autoConfig('dd', params.preUrl, params.token, params.agentId, params.ajax, hybridJs).then((res:any) => {
                            const { nonceStr, jsApiSignature, corpId, timestamp } = res;
                            const agentId = res.dingtalk_agentid;

                            dd.config({
                                agentId: agentId || params.agentId || '', // 必填，微应用ID
                                corpId, // 必填，企业ID
                                timeStamp: timestamp, // 必填，生成签名的时间戳
                                nonceStr, // 必填，生成签名的随机串
                                signature: jsApiSignature, // 必填，签名
                                // 选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
                                type: 0,
                                jsApiList: params.jsApiList || [
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
                                // 为了不阻塞页面展示，鉴权失败也能继续进入ready
                                params.success && params.success();
                            });
                            dd.ready(() => {
                                log('dd ready');
                                localStorage.setItem('corpId', corpId);
                                params.success && params.success();
                            });
                        });
                    } else {
                        hybridJs.ui.toast('未引入钉钉的JSSDK，无法自动鉴权');
                    }

                } else {
                    params.success && params.success();
                }
            }
        }
    ]);
}
