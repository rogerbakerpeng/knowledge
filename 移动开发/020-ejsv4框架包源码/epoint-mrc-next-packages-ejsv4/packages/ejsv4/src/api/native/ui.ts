export default function uiMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('ui', [
        {
            namespace: 'toast',
            os: ['ejs'],
            defaultParams: {
                message: '',
                h5UI: false
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');

                args[0].message = args[0].message || String(args[0].message);

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'showDebugDialog',
            os: ['ejs'],
            defaultParams: {
                debugInfo: '',
                h5UI: false
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject(rest, 'debugInfo');
                
                args[0].debugInfo = String(args[0].debugInfo);

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'alert',
            os: ['ejs'],
            defaultParams: {
                title: '',
                message: '',
                // 默认可取消
                cancelable: 1,
                h5UI: false
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

                args[0].buttonLabels = [String(args[0].buttonName || '确定')];
                hybridJs.ui.confirm.apply(this, args);
            }
        },
        {
            namespace: 'confirm',
            os: ['ejs'],
            defaultParams: {
                title: '',
                message: '',
                buttonLabels: [],
                // 默认可取消
                cancelable: 1,
                h5UI: false
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;

                args[0].title = String(args[0].title);
                args[0].message = String(args[0].message);
                args[0].buttonLabels = args[0].buttonLabels.length ? args[0].buttonLabels.map((item) => {
                    return String(item);
                }) : ['取消', '确定'];
                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'prompt',
            os: ['ejs'],
            defaultParams: {
                title: '',
                hint: '',
                text: '',
                lines: 1,
                maxLength: 10000,
                // 默认可取消
                cancelable: 1,
                h5UI: false
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;

                args[0].buttonLabels =
                    args[0].buttonLabels && args[0].buttonLabels.length ? args[0].buttonLabels : ['取消', '确定'];
                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'select',
            os: ['ejs'],
            defaultParams: {
                title: '',
                items: [],
                choiceState: [],
                // 由以前的true和false替换为了1和0
                isMultiSelect: 0,
                // 样式类型，默认为0。 0：单列表样式；1：九宫格样式(目前只支持单选)
                type: 0,
                columns: 2,
                // 可取消
                cancelable: 1,
                isShowSelectAll: 0,
                h5UI: false
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];

                const originalItems = options.items;

                options.dataFilter = (res) => {
                    const newRes = res;
                    let index = -1;
                    let content = '';

                    if (newRes.result) {
                        const choiceState = newRes.result.choiceState;

                        if (newRes.result.which !== undefined) {
                            index = newRes.result.which || 0;
                            content = originalItems[index];
                            // 需要将中文解码
                            newRes.result.content = decodeURIComponent(content);
                        } else if (choiceState !== undefined) {
                            newRes.result.choiceContent = [];
                            for (let i = 0, len = choiceState.length; i < len; i += 1) {
                                if (+choiceState[i] === 1) {
                                    newRes.result.choiceContent.push(originalItems[i]);
                                }
                            }
                        }
                    }

                    return newRes;
                };

                args[0] = options;
                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'actionSheet',
            os: ['ejs'],
            defaultParams: {
                items: [],
                // 默认可取消
                cancelable: 1,
                h5UI: false
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];
                const originalItems = options.items;

                options.dataFilter = (res) => {
                    const newRes = res;
                    let index = -1;
                    let content = '';

                    if (newRes.result) {
                        index = newRes.result.which || 0;
                        content = originalItems[index];
                        // 需要将中文解码
                        newRes.result.content = decodeURIComponent(content);
                    }

                    return newRes;
                };

                args[0] = options;
                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'popWindow',
            os: ['ejs'],
            defaultParams: {
                titleItems: [],
                iconItems: undefined,
                iconFilterColor: ''
            },
            /**
             * 有横向菜单和垂直菜单2种
             * 可配合setNBRightImage、setNBRightText使用(iOS 不可配合使用)
             */
            runCode(...rest) {
                const args = rest;
                const options = args[0];

                const originalItems = options.titleItems;

                // 处理相对路径问题
                if (options.iconItems) {
                    for (let i = 0, len = options.iconItems.length; i < len; i += 1) {
                        options.iconItems[i] = innerUtil.getFullPath(options.iconItems[i]);
                    }
                }

                options.dataFilter = (res) => {
                    const newRes = res;
                    let index = -1;
                    let content = '';

                    if (newRes.result) {
                        index = newRes.result.which || 0;
                        content = originalItems[index];
                        // 需要将中文解码
                        newRes.result.content = decodeURIComponent(content);
                    }

                    return newRes;
                };

                args[0] = options;
                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'pickDate',
            os: ['ejs'],
            defaultParams: {
                // h5中的开始年份
                minDate: '',
                // h5中的结束年份
                maxDate: '',
                // 部分设备上设置标题后遮挡控件可不设置标题
                title: '',
                // 默认为空为使用当前时间
                // 格式为 yyyy-MM-dd。
                datetime: '',
                h5UI: false
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'pickTime',
            os: ['ejs'],
            defaultParams: {
                // 部分设备上设置标题后遮挡控件可不设置标题
                title: '',
                // 默认为空为使用当前时间
                // 格式为 HH:mm
                datetime: '',
                minHour: 0,
                maxHour: 23,
                minMinute: 0,
                maxMinute: 59,
                h5UI: false
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'pickDateTime',
            os: ['ejs'],
            defaultParams: {
                title1: '',
                title2: '',
                // h5中的开始年份
                minDate: '',
                // h5中的结束年份
                maxDate: '',
                // 默认为空为使用当前时间
                // 格式为 yyyy-MM-dd HH:mm
                datetime: '',
                showSecond: false,
                h5UI: false
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'showWaiting',
            os: ['ejs'],
            defaultParams: {
                message: '',
                h5UI: false
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');

                args[0].message = String(args[0].message);

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'closeWaiting',
            os: ['ejs'],
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'toastAndEvent',
            os: ['ejs'],
            defaultParams: {
                message: '',
                buttonName: '',
                iconType: '0',
                duration: '2000',
                position: '',
                h5UI: false
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');

                args[0].message = String(args[0].message);
                args[0].buttonName = String(args[0].buttonName);

                hybridJs.callInner.apply(this, args);
            }
        }
    ]);
}
