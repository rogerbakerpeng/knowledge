import Vue from 'vue';
import { Toast } from 'vant';
import uiVue from './muilib/ui_vue';
import { getI18nTxt } from './muilib/geti18ntxt';

const $t = getI18nTxt;

export default function uiMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('ui', [
        {
            namespace: 'toast',
            os: ['h5'],
            defaultParams: {
                message: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');
                const options = args[0];
                const resolve = args[1];

                options.message = $t(options.message) || String(args[0].message);

                Toast(options.message);
                options.success && options.success();
                resolve && resolve();
            }
        },
        {
            namespace: 'showDebugDialog',
            os: ['h5'],
            defaultParams: {
                debugInfo: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'debugInfo');

                args[0] = {
                    title: '',
                    message: args[0].debugInfo,
                    buttonName: '确定',
                    success: args[0].success
                };

                hybridJs.ui.alert.apply(this, args);
            }
        },
        {
            namespace: 'alert',
            os: ['h5'],
            defaultParams: {
                title: '',
                message: '',
                buttonName: '确定',
                // 默认可取消
                cancelable: 1
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

                options.title = String(options.title);
                options.message = String(options.message);
                options.buttonName = String(options.buttonName || '确定');

                options.buttonName = $t(options.buttonName);
                options.title = $t(options.title);
                options.message = $t(options.message);

                uiVue(args, 'alert', hybridJs.os);
            }
        },
        {
            namespace: 'confirm',
            os: ['h5'],
            defaultParams: {
                // 这是默认参数，API的每一个参数都应该有一个默认值
                title: '',
                message: '',
                buttonLabels: ['取消', '确定'],
                cancelable: 1
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;
                const options = args[0];

                options.buttonLabels = options.buttonLabels.map((ele) => $t(ele));

                options.title = $t(options.title);

                options.message = $t(options.message);

                uiVue(args, 'confirm', hybridJs.os);
            }
        },
        {
            namespace: 'prompt',
            os: ['h5'],
            defaultParams: {
                title: '',
                hint: '',
                text: '',
                lines: 1,
                cancelable: 1,
                maxLength: 10000,
                buttonLabels: ['取消', '确定']
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;
                const options = args[0];

                options.buttonLabels = options.buttonLabels.map((ele) => $t(ele));
                options.title = $t(options.title);
                options.hint = $t(options.hint);
                options.text = $t(options.text);

                uiVue(args, 'prompt', hybridJs.os);
            }
        },
        {
            namespace: 'actionSheet',
            os: ['h5'],
            defaultParams: {
                cancelable: 1,
                items: []
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;
                const options = args[0];

                options.items = options.items.map((ele) => $t(ele));

                uiVue(args, 'actionSheet', hybridJs.os);
            }
        },
        {
            namespace: 'pickDate',
            os: ['h5'],
            defaultParams: {
                // h5中的开始年份
                minDate: '',
                // h5中的结束年份
                maxDate: '',
                // 默认为空为使用当前时间
                // 格式为 yyyy-MM-dd。
                datetime: '',
                title: '选择日期'
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;
                const options = args[0];

                options.title = $t(options.title);

                uiVue(args, 'pickDate', hybridJs.os);
            }
        },
        {
            namespace: 'pickTime',
            os: ['h5'],
            defaultParams: {
                // 默认为空为使用当前时间
                // 格式为 hh:mm。
                datetime: '',
                title: '选择时间',
                minHour: 0,
                maxHour: 23,
                minMinute: 0,
                maxMinute: 59
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;

                const options = args[0];

                options.title = $t(options.title);

                uiVue(args, 'pickTime', hybridJs.os);
            }
        },
        {
            namespace: 'pickDateTime',
            os: ['h5'],
            defaultParams: {
                // 默认为空为使用当前时间
                // 格式为 yyyy-MM-dd hh:mm。
                datetime: '',
                // h5中的开始年份
                minDate: '',
                // h5中的结束年份
                maxDate: '',
                showSecond: false,
                title: '选择日期时间'
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;

                const options = args[0];

                options.title = $t(options.title);

                uiVue(args, 'pickDateTime', hybridJs.os);
            }
        },
        {
            namespace: 'pickMonth',
            os: ['h5'],
            defaultParams: {
                // 默认为空为使用当前时间
                // 格式为 yyyy-MM
                datetime: '',
                // h5中的开始年份
                minDate: '',
                // h5中的结束年份
                maxDate: '',
                title: '选择年月'
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;
                const options = args[0];

                options.title = $t(options.title);

                uiVue(args, 'pickMonth', hybridJs.os);
            }
        },
        {
            namespace: 'popPicker',
            os: ['h5'],
            defaultParams: {
                // 层级，默认为1
                layer: 1,
                data: []
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;
                const options = args[0];

                options.data = options.data.map((ele) => {
                    const res = ele;

                    res.text = $t(res.text);
                    if (res.children && res.children.length) {
                        res.children = res.children.map((item) => {
                            const res2 = item;

                            res2.text = $t(res2.text);
                            if (res2.children && res2.children.length) {
                                res2.children = res2.children.map((element) => {
                                    const res3 = element;

                                    res3.text = $t(element.text);

                                    return res3;
                                });
                            }

                            return res2;
                        });
                    }

                    return res;
                });

                uiVue(args, 'popPicker', hybridJs.os);
            }
        },
        {
            namespace: 'showWaiting',
            os: ['h5'],
            defaultParams: {
                message: '加载中...',
                padlock: true
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');
                const options = args[0];

                options.message = String(options.message);

                options.message = $t(options.message);

                uiVue(args, 'showWaiting', hybridJs.os);
            }
        },
        {
            namespace: 'closeWaiting',
            os: ['h5'],
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;
                const options = args[0];
                const resolve = args[1];

                setTimeout(() => {
                    if (Vue && Vue.prototype.$ejsUI) {
                        Vue.prototype.$ejsUI.$nextTick(() => {
                            Vue.prototype.$ejsUI.showWaiting.show = false;
                        });
                    }

                    options.success && options.success();
                    resolve && resolve();
                }, 300);
            }
        },
        {
            namespace: 'select',
            os: ['h5'],
            defaultParams: {
                title: '',
                items: [],
                choiceState: [],
                // 由以前的true和false替换为了1和0
                isMultiSelect: 0,
                // 样式类型，默认为0。 0：单列表样式；1：九宫格样式(目前只支持单选)
                type: 0,
                columns: 2,
                // 多选时是否展示全选
                isShowSelectAll: 0,
                // 可取消
                cancelable: 1
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;
                const options = args[0];

                options.title = $t(options.title);
                options.items = options.items.map((item) => $t(item));

                uiVue(args, 'select', hybridJs.os);
            }
        }
    ]);
}
