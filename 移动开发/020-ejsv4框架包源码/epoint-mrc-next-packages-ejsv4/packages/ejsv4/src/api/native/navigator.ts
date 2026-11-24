export default function navigatorMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    /**
     * 按钮最多允许6个英文字符，或3个中文
     */
    // const MAX_BTN_TEXT_COUNT = 6;

    hybridJs.extendModule('navigator', [
        {
            namespace: 'setTitle',
            os: ['ejs'],
            defaultParams: {
                title: '',
                // 子标题
                subTitle: '',
                // 是否可点击，可点击时会有点击效果并且点击后会触发回调，不可点击时永远不会触发回调
                // 可点击时，title会有下拉箭头
                // promise调用时和其他长期回调一样立马then
                direction: 'bottom',
                // 是否可点击，如果为1，代表可点击，会在标题右侧出现一个下拉图标，并且能被点击监听
                clickable: 0
            },
            runCode(this: any, ...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'title');

                this.api.isLongCb = true;

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'setMultiTitle',
            os: ['ejs'],
            defaultParams: {
                titles: ''
            },
            runCode(this: any, ...rest) {
                this.api.isLongCb = true;

                hybridJs.callInner.apply(this, rest);
            }
        },
        {
            namespace: 'show',
            os: ['ejs']
        },
        {
            namespace: 'hide',
            os: ['ejs']
        },
        {
            namespace: 'showSearchBar',
            os: ['ejs'],
            runCode(this: any, ...rest) {
                this.api.isLongCb = true;

                hybridJs.callInner.apply(this, rest);
            }
        },
        {
            namespace: 'hideSearchBar',
            os: ['ejs']
        },
        {
            namespace: 'hideBackButton',
            os: ['ejs']
        },
        {
            namespace: 'hookSysBack',
            os: ['ejs'],
            runCode(this: any, ...rest) {
                this.api.isLongCb = true;

                hybridJs.callInner.apply(this, rest);
            }
        },
        {
            namespace: 'hookBackBtn',
            os: ['ejs'],
            runCode(this: any, ...rest) {
                this.api.isLongCb = true;

                hybridJs.callInner.apply(this, rest);
            }
        },
        {
            namespace: 'setRightBtn',
            os: ['ejs'],
            defaultParams: {
                text: '',
                imageUrl: '',
                isShow: 1,
                // 对应哪一个按钮，一般是0, 1可选择
                which: 0,
                // 按钮最多允许6个英文字符，或3个中文
                maxCount: 6
            },
            runCode(this: any, ...rest) {
                const args = rest;
                const options = args[0];

                options.imageUrl = options.imageUrl && innerUtil.getFullPath(options.imageUrl);
                options.text = innerUtil.eclipseText(options.text, options.maxCount);

                args[0] = options;
                this.api.isLongCb = true;

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'setRightMenu',
            os: ['ejs'],
            defaultParams: {
                text: '',
                imageUrl: '',
                // 过滤色默认为空
                iconFilterColor: '',
                // 点击后出现的菜单列表，这个API会覆盖rightBtn
                titleItems: [],
                iconItems: []
            },
            /**
             * 这个API比较特殊，暂时由前端模拟
             */
            runCode(...rest) {
                const newArgs = [].slice.call(rest);
                const newOptions = innerUtil.extend({}, newArgs[0]);

                newOptions.success = () => {
                    // 点击的时候，弹出菜单
                    hybridJs.ui.popWindow.apply(this, rest as Parameters<EJSNamespace.uiType['popWindow']>);
                };

                newArgs[0] = newOptions;
                hybridJs.navigator.setRightBtn.apply(this, newArgs as Parameters<EJSNamespace.navigatorType['setRightBtn']>);
            }
        },
        {
            namespace: 'setLeftBtn',
            os: ['ejs'],
            defaultParams: {
                text: '',
                imageUrl: '',
                isShow: 1,
                // 是否显示下拉箭头,如果带箭头，它会占两个位置，同时覆盖左侧按钮和左侧返回按钮
                isShowArrow: 0,
                // ejs3.4.0新增 在 isShowArrow 为1的情况下有效，direction 参数值支持：“bottom（箭头向下，默认值）”，“top（箭头向上）”
                direction: 'bottom',
                // 按钮最多允许6个英文字符，或3个中文
                maxCount: 6
            },
            runCode(this: any, ...rest) {
                const args = rest;
                const options = args[0];

                options.imageUrl = options.imageUrl && innerUtil.getFullPath(options.imageUrl);
                options.text = innerUtil.eclipseText(options.text, options.maxCount);

                args[0] = options;
                this.api.isLongCb = true;

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'showStatusBar',
            os: ['ejs']
        },
        {
            namespace: 'hideStatusBar',
            os: ['ejs']
        },
        {
            namespace: 'setSearchWord',
            os: ['ejs'],
            support: '3.1.9',
            defaultParams: {
                keyword: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'keyword');

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'getSearchWord',
            os: ['ejs'],
            support: '3.1.9'
        },
        {
            namespace: 'setSearchBar',
            os: ['ejs'],
            defaultParams: {
                isShow: 1,
                keyword: '',
                placeholder: '请输入搜索关键字',
                isSearchable: 0,
                cancelOnSearchBarAndNotRefresh: 0,
                hideBottomLine: 0
            },
            support: '3.2.2',
            runCode(this: any, ...rest) {
                this.api.isLongCb = true;

                hybridJs.callInner.apply(this, rest);
            }
        },
        {
            namespace: 'hideBackBtn',
            os: ['ejs'],
            support: '3.4.1'
        }
    ]);
}
