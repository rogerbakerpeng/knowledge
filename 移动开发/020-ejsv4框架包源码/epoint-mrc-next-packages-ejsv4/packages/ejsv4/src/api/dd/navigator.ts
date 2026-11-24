import callDDByArgs from './lib/calldd';

export default function navigatorMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('navigator', [
        {
            namespace: 'setTitle',
            os: ['dd'],
            defaultParams: {
                title: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'title');

                args[0].title = String(args[0].title);
                callDDByArgs(args, dd.biz.navigation.setTitle);
            }
        },
        {
            namespace: 'setRightBtn',
            os: ['dd'],
            defaultParams: {
                text: '',
                imageUrl: '',
                isShow: true
            },
            runCode(...rest) {
                const args = rest;

                args[0] = innerUtil.extend(args[0], {
                    control: true,
                    show: Boolean(args[0].isShow)
                });

                callDDByArgs(args, dd.biz.navigation.setRight);
            }
        },
        {
            namespace: 'setRightMenu',
            os: ['dd'],
            defaultParams: {
                text: '',
                imageUrl: '',
                // 过滤色默认为空
                iconFilterColor: '',
                // 点击后出现的菜单列表，这个API会覆盖rightBtn
                titleItems: [],
                iconItems: [],
                // 钉钉中的参数
                backgroundColor: '#ADD8E6',
                textColor: '#ADD8E611'
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;
                const titleItems = args[0].titleItems;
                const iconItems = args[0].iconItems;
                const items = [];

                for (let i = 0, len = titleItems.length; i < len; i += 1) {
                    items.push({
                        id: i + 1,
                        text: titleItems[i],
                        iconId: iconItems[i]
                    });
                }

                args[0] = innerUtil.extend(args[0], {
                    items
                });

                callDDByArgs(args, dd.biz.navigation.setMenu);
            }
        }
    ]);
}
