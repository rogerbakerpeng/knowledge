export default function uiMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;
    const modal = weex.requireModule('modal');
    const picker = weex.requireModule('picker');

    hybridJs.extendModule('ui', [
        {
            namespace: 'toast',
            os: ['weex'],
            defaultParams: {
                message: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');
                const options = args[0];
                const resolve = args[1];

                options.message = options.message || String(options.message);

                modal.toast(options);

                options.success && options.success();
                resolve && resolve();
            }
        },
        {
            namespace: 'showDebugDialog',
            os: ['weex'],
            defaultParams: {
                debugInfo: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'debugInfo');

                args[0] = {
                    title: '',
                    message: args[0].debugInfo,
                    success: args[0].success
                };

                hybridJs.ui.alert.apply(this, args);
            }
        },
        {
            namespace: 'alert',
            os: ['weex'],
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

                options.title = String(options.title);
                options.message = String(options.message);
                options.buttonName = String(options.buttonName || '确定');

                modal.alert(
                    {
                        ...options,
                        okTitle: options.buttonName
                    },
                    function () {
                        options.success && options.success();
                        resolve && resolve();
                    }
                );
            }
        },
        {
            namespace: 'confirm',
            os: ['weex'],
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

                options.title = String(options.title);
                options.message = String(options.message);
                options.buttonLabels = options.buttonLabels.length
                    ? options.buttonLabels.map((item) => {
                        return String(item);
                    })
                    : ['取消', '确定'];

                modal.confirm(
                    {
                        ...options,
                        okTitle: options.buttonLabels[1] || '确定',
                        cancelTitle: options.buttonLabels[0]
                    },
                    function (value) {
                        let result: {which: number};

                        if (value === options.buttonLabels[1]) {
                            result.which = 1;
                        } else {
                            result.which = 0;
                        }
                        options.success && options.success(result);
                        resolve && resolve(result);
                    }
                );
            }
        },
        {
            namespace: 'prompt',
            os: ['weex'],
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

                modal.prompt(
                    {
                        ...options,
                        okTitle: options.buttonLabels[1],
                        cancelTitle: options.buttonLabels[0]
                    },
                    function ({ result, data }) {
                        let res = {
                            which: 0,
                            content: data
                        };

                        if (result === options.buttonLabels[1]) {
                            res.which = 1;
                        } else {
                            res.which = 0;
                        }
                        options.success && options.success(res);
                        resolve && resolve(res);
                    }
                );
            }
        },
        {
            namespace: 'pickDate',
            os: ['weex'],
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

                let currDate = new Date();
                let currY = currDate.getFullYear();
                let currM:string | number = currDate.getMonth() + 1;
                let currD:string | number = currDate.getDate();

                currM = currM > 9 ? currM : '0' + currM;
                currD = currD > 9 ? currD : '0' + currD;

                picker.pickDate({
                    value: options.datetime || `${currY}-${currM}-${currD}`,
                    max: options.maxDate,
                    min: options.minDate
                }, function(res) {
                    if (res.result === 'success') {
                        let result = {
                            date: res.data
                        };

                        options.success && options.success(result);
                        resolve && resolve(result);
                    } else if (res.result === 'error') {
                        options.error && options.error(res);
                        reject && reject(res);
                    }
                });
            }
        },
        {
            namespace: 'pickTime',
            os: ['weex'],
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

                let currDate = new Date();
                let currH:string | number = currDate.getHours();
                let currm:string | number = currDate.getMinutes();

                currH = currH > 9 ? currH : '0' + currH;
                currm = currm > 9 ? currm : '0' + currm;

                picker.pickTime({
                    value: options.datetime || `${currH}:${currm}`
                }, function(res) {
                    if (res.result === 'success') {
                        let result = {
                            time: res.data
                        };

                        options.success && options.success(result);
                        resolve && resolve(result);
                    } else if (res.result === 'error') {
                        options.error && options.error(res);
                        reject && reject(res);
                    }
                });
            }
        },
        {
            namespace: 'select',
            os: ['weex'],
            defaultParams: {
                title: '',
                items: []
                // choiceState: [],
                // 由以前的true和false替换为了1和0
                // isMultiSelect: 0,
                // 样式类型，默认为0。 0：单列表样式；1：九宫格样式(目前只支持单选)
                // type: 0,
                // columns: 2,
                // 多选时是否展示全选
                // isShowSelectAll: 0,
                // 可取消
                // cancelable: 1
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                picker.pick({
                    ...options,
                    items: options.items
                }, function(res) {
                    if (res.result === 'success') {
                        let result = {
                            which: res.data,
                            content: options.items[res.data]
                        };

                        options.success && options.success(result);
                        resolve && resolve(result);
                    } else if (res.result === 'error') {
                        options.error && options.error(res);
                        reject && reject(res);
                    }
                });
            }
        }
    ]);
}
