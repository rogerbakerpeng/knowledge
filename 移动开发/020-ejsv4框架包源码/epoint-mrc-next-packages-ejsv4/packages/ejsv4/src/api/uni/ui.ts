import uiApi from './lib/uiApi';

export default function uiMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('ui', [
        {
            namespace: 'toast',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                message: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                options.message = options.message || String(options.message);

                uiApi('toast', options, resolve, reject);
            }
        },
        {
            namespace: 'showDebugDialog',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                debugInfo: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject(rest, 'debugInfo');

                args[0] = {
                    title: '',
                    message: args[0].debugInfo,
                    h5UI: true,
                    success: args[0].success
                };

                hybridJs.ui.alert.apply(this, args);
            }
        },
        {
            namespace: 'alert',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                title: '',
                message: ''
            },
            // 用confirm来模拟alert
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
                const resolve = args[1];
                const reject = args[2];

                options.title = String(options.title);
                options.message = String(options.message);
                options.buttonName = String(options.buttonName || '确定');

                uiApi('alert', options, resolve, reject);
            }
        },
        {
            namespace: 'confirm',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                title: '',
                message: '',
                buttonLabels: []
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                uiApi('confirm', options, resolve, reject);
            }
        },
        {
            namespace: 'prompt',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                title: '',
                hint: '',
                text: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                uiApi('prompt', options, resolve, reject);
            }
        },
        {
            namespace: 'actionSheet',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                items: []
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                uiApi('actionSheet', options, resolve, reject);
            }
        },
        {
            namespace: 'pickDate',
            os: ['miniprogram', 'h5'],
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
                const resolve = args[1];
                const reject = args[2];

                uiApi('pickDate', options, resolve, reject);
            }
        },
        {
            namespace: 'pickTime',
            os: ['miniprogram', 'h5'],
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
                const resolve = args[1];
                const reject = args[2];

                uiApi('pickTime', options, resolve, reject);
            }
        },
        {
            namespace: 'pickDateTime',
            os: ['miniprogram', 'h5'],
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
                const resolve = args[1];
                const reject = args[2];

                uiApi('pickDateTime', options, resolve, reject);
            }
        },
        {
            namespace: 'pickMonth',
            os: ['miniprogram', 'h5'],
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
                const resolve = args[1];
                const reject = args[2];

                uiApi('pickMonth', options, resolve, reject);
            }
        },
        {
            namespace: 'showWaiting',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                message: '',
                padlock: true
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                options.message = String(options.message);

                uiApi('showWaiting', options, resolve, reject);
            }
        },
        {
            namespace: 'closeWaiting',
            os: ['miniprogram', 'h5'],
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                uiApi('closeWaiting', options, resolve, reject);
            }
        },
        {
            namespace: 'popPicker',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                // 层级，默认为1
                layer: 1,
                data: []
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                uiApi('popPicker', options, resolve, reject);
            }
        },
        {
            namespace: 'select',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                title: '',
                items: [],
                choiceState: [],
                // 由以前的true和false替换为了1和0
                isMultiSelect: 0,
                // 样式类型，默认为0。 0：单列表样式；1：九宫格样式(目前只支持单选)
                type: 0,
                columns: 2,
                isShowSelectAll: 0,
                // 可取消
                cancelable: 1
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                uiApi('select', options, resolve, reject);
            }
        }
    ]);
}
