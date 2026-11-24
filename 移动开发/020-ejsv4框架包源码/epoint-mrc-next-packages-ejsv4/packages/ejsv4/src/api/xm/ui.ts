import callXmByArgs from './lib/callxm';
import uiVue from '../h5/muilib/ui_vue';
import { getI18nTxt } from '../h5/muilib/geti18ntxt';

const $t = getI18nTxt;

export default function uiMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('ui', [
        {
            namespace: 'toast',
            os: ['xm'],
            defaultParams: {
                message: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');

                args[0].message = $t(args[0].message);
                args[0] = innerUtil.extend(args[0], {
                    message: args[0].message || String(args[0].message)
                });
                callXmByArgs(args, xm.showToast, false);
            }
        },
        {
            namespace: 'showDebugDialog',
            os: ['xm'],
            defaultParams: {
                debugInfo: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject(rest, 'debugInfo');

                args[0].debugInfo = $t(args[0].debugInfo);
                args[0] = innerUtil.extend(args[0], {
                    title: '',
                    message: args[0].debugInfo
                });
                args[0].dataFilter = (result) => ({
                    which: result === 'ok' ? 1 : 0
                });
                callXmByArgs(args, xm.showConfirm, true);
            }
        },
        {
            namespace: 'alert',
            os: ['xm'],
            defaultParams: {
                title: '',
                message: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(
                    this,
                    rest,
                    'message',
                    'title',
                    'buttonName'
                );
                const options = args[0];

                options.buttonName = $t(options.buttonName || '确定');
                options.message = $t(options.message);
                options.title = $t(options.title);

                args[0] = innerUtil.extend(args[0], {
                    title: args[0].title,
                    message: args[0].message
                });
                args[0].dataFilter = (result) => ({
                    which: result === 'ok' ? 1 : 0
                });
                callXmByArgs(args, xm.showConfirm, true);
            }
        },
        {
            namespace: 'confirm',
            os: ['xm'],
            defaultParams: {
                title: '',
                message: ''
            },
            runCode(...rest) {
                const args = rest;

                args[0].title = $t(args[0].title);

                args[0].message = $t(args[0].message);

                args[0] = innerUtil.extend(args[0], {
                    title: args[0].title,
                    message: args[0].message
                });

                args[0].dataFilter = (result) => ({
                    which: result === 'ok' ? 1 : 0
                });
                callXmByArgs(args, xm.showConfirm, true);
            }
        },
        {
            namespace: 'prompt',
            os: ['xm'],
            defaultParams: {
                title: '',
                hint: '',
                text: ''
            },
            runCode(...rest) {
                const args = rest;

                args[0].title = $t(args[0].title);
                args[0].hint = $t(args[0].hint);
                args[0].text = $t(args[0].text);

                args[0] = innerUtil.extend(args[0], {
                    title: args[0].title,
                    message: $t('请输入'),
                    placeholder: args[0].hint,
                    defaultValue: args[0].text
                });

                args[0].dataFilter = (result) => ({
                    which: 1,
                    content: result
                });
                callXmByArgs(args, xm.showPrompt, true);
            }
        },
        {
            namespace: 'showWaiting',
            os: ['xm'],
            defaultParams: {
                message: '加载中...',
                h5UI: false
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');
                const options = args[0];
                const h5UI = options.h5UI;

                options.message = $t(options.message);

                if (h5UI !== false) {
                    uiVue(args, 'showWaiting', hybridJs.os);
                } else {
                    args[0] = innerUtil.extend(args[0], {});
                    callXmByArgs(args, xm.showLoading, false);
                }
            }
        },
        {
            namespace: 'closeWaiting',
            os: ['xm'],
            defaultParams: {},
            runCode(...rest) {
                const args = rest;

                if (window.Vue && window.Vue.prototype.$ejsUI && window.Vue.prototype.$ejsUI.showWaiting.show) {
                    window.Vue.prototype.$ejsUI.showWaiting.show = false;
                }

                callXmByArgs(args, xm.hideLoading, false);
            }
        },
        {
            namespace: 'select',
            os: ['xm'],
            defaultParams: {
                title: '',
                items: []
            },
            runCode(...rest) {
                const args = rest;

                args[0].title = $t(args[0].title);
                args[0].items = args[0].items.map(item => $t(item));
                const itemList = args[0].items.map((value, index) => ({
                    text: value,
                    value: index
                }));

                args[0] = innerUtil.extend(args[0], {
                    title: args[0].title,
                    list: itemList,
                    defaultValue: ''
                });

                args[0].dataFilter = (result) => ({
                    which: Number(result.value),
                    content: result.text
                });
                callXmByArgs(args, xm.picker, true);
            }
        },
        {
            namespace: 'actionSheet',
            os: ['xm'],
            defaultParams: {
                items: []
            },
            runCode(...rest) {
                const args = rest;

                args[0].items = args[0].items.map(ele => $t(ele));

                const itemList = args[0].items.map((value, index) => ({
                    text: value,
                    value: index
                }));

                args[0] = innerUtil.extend(args[0], {
                    title: $t('请选择'),
                    itemList,
                    defaultValue: ''
                });

                args[0].dataFilter = (result) => ({
                    which: Number(result.value),
                    content: result.text
                });
                callXmByArgs(args, xm.showActionSheet, true);
            }
        },
        {
            namespace: 'pickDate',
            os: ['xm'],
            defaultParams: {
                datetime: '',
                format: 'yyyy-MM-dd'
            },
            runCode(...rest) {
                const args = rest;
                // 兼容ios
                const datetime = args[0].datetime.replace(/-/g, '/');

                args[0] = innerUtil.extend(args[0], {
                    format: args[0].format,
                    defaultValue: new Date(datetime).getTime()
                });

                args[0].dataFilter = (result) => ({
                    date: result
                });
                callXmByArgs(args, xm.selectDate, true);
            }
        }
    ]);
}
