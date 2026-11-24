import callDDByArgs from './lib/calldd';
import ddF9Config from './lib/ddconfig';

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
        },
        {
            namespace: 'hookBackBtn',
            os: ['dd'],
            defaultParams: {
                control: true,
                text: ''
            },
            runCode(...rest) {
                // 只拦截ios
                const args = rest;

                args[0] = innerUtil.extend(args[0], {
                    control: args[0].control,
                    text: args[0].text
                });
                callDDByArgs(args, dd.biz.navigation.setLeft);
            }
        },
        {
            namespace: 'hookSysBack',
            os: ['dd'],
            runCode(...rest) {
                // 只拦截Android
                const args = rest;
                const options = args[0];

                ddF9Config().then(() => {
                    document.addEventListener('backbutton', (e) => {
                        // 在这里处理你的业务逻辑
                        // backbutton事件的默认行为是回退历史记录，如果你想阻止默认的回退行为，那么可以通过preventDefault()实现
                        e.preventDefault();
                        options.success && options.success();
                    });
                });
            }
        }
    ]);
}
