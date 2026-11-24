import callDDByArgs from './lib/calldd';

export default function uiMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('ui', [
        {
            namespace: 'toast',
            os: ['dd'],
            defaultParams: {
                message: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');

                // 有参数形式不一样，需要重新定义
                args[0] = innerUtil.extend(args[0], {
                    // icon样式，有success和error，默认为空 0.0.2
                    icon: '',
                    // 提示信息
                    text: args[0].message || String(args[0].message),
                    // 显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
                    duration: 2,
                    // 延迟显示，单位秒，默认0
                    delay: 0
                });

                callDDByArgs(args, dd.device.notification.toast);
            }
        },
        {
            namespace: 'alert',
            os: ['dd'],
            defaultParams: {
                title: '',
                message: '',
                buttonName: '确定'
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

                // 参数形式一样，无需重新定义
                callDDByArgs(args, dd.device.notification.alert);
            }
        },
        {
            namespace: 'confirm',
            os: ['dd'],
            defaultParams: {
                title: '',
                message: '',
                buttonLabels: ['取消', '确定']
            },
            runCode(...rest) {
                const args = rest;

                args[0].dataFilter = (result) => ({
                    which: result.buttonIndex
                });

                // 参数形式一样，无需重新定义
                callDDByArgs(args, dd.device.notification.confirm);
            }
        },
        {
            namespace: 'prompt',
            os: ['dd'],
            defaultParams: {
                title: '',
                text: '',
                hint: '',
                lines: 1,
                maxLength: 10000,
                buttonLabels: ['取消', '确定']
            },
            runCode(...rest) {
                const args = rest;

                args[0] = innerUtil.extend(args[0], {
                    message: args[0].text,
                    defaultText: args[0].hint
                });

                args[0].dataFilter = (result) => ({
                    which: result.buttonIndex,
                    content: result.value
                });

                // 参数形式一样，无需重新定义
                callDDByArgs(args, dd.device.notification.prompt);
            }
        },
        {
            namespace: 'showWaiting',
            os: ['dd'],
            defaultParams: {
                message: ''
            },
            runCode(...rest) {
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');

                args[0] = innerUtil.extend(args[0], {
                    // 提示信息
                    text: args[0].message,
                    showIcon: true
                });

                callDDByArgs(args, dd.device.notification.showPreloader);
            }
        },
        {
            namespace: 'closeWaiting',
            os: ['dd'],
            runCode(...rest) {
                callDDByArgs(rest, dd.device.notification.hidePreloader);
            }
        },
        {
            namespace: 'actionSheet',
            os: ['dd'],
            defaultParams: {
                title: '',
                items: []
            },
            runCode(...rest) {
                const args = rest;

                args[0] = innerUtil.extend(args[0], {
                    cancelButton: '取消',
                    otherButtons: args[0].items
                });

                const originalItems = args[0].items;

                args[0].dataFilter = (result) => ({
                    which: result.buttonIndex,
                    content: originalItems[result.buttonIndex]
                });

                callDDByArgs(args, dd.device.notification.actionSheet);
            }
        },
        {
            namespace: 'pickDate',
            os: ['dd'],
            defaultParams: {
                // 部分设备上设置标题后遮挡控件可不设置标题
                title: '',
                // 默认为空为使用当前时间
                // 格式为 yyyy-MM-dd。
                datetime: ''
            },
            runCode(...rest) {
                const args = rest;

                args[0] = innerUtil.extend(args[0], {
                    format: 'yyyy-MM-dd',
                    value: args[0].datetime
                });

                args[0].dataFilter = (result) => ({
                    date: result.value
                });

                callDDByArgs(args, dd.biz.util.datepicker);
            }
        },
        {
            namespace: 'pickTime',
            os: ['dd'],
            defaultParams: {
                // 部分设备上设置标题后遮挡控件可不设置标题
                title: '',
                // 默认为空为使用当前时间
                // 格式为 HH:mm
                datetime: ''
            },
            runCode(...rest) {
                const args = rest;

                args[0] = innerUtil.extend(args[0], {
                    format: 'HH:mm',
                    value: args[0].datetime
                });

                args[0].dataFilter = (result) => ({
                    time: result.value
                });

                callDDByArgs(args, dd.biz.util.timepicker);
            }
        },
        {
            namespace: 'pickDateTime',
            os: ['dd'],
            defaultParams: {
                title1: '',
                title2: '',
                // 默认为空为使用当前时间
                // 格式为 yyyy-MM-dd HH:mm
                datetime: ''
            },
            runCode(...rest) {
                const args = rest;

                args[0] = innerUtil.extend(args[0], {
                    format: 'yyyy-MM-dd HH:mm',
                    value: args[0].datetime
                });

                args[0].dataFilter = (result) => ({
                    datetime: result.value
                });

                callDDByArgs(args, dd.biz.util.datetimepicker);
            }
        }
    ]);
}
