declare namespace EJSNamespace {
    interface navigatorType {
        /**
         * 设置导航栏标题
         *
         * 注意，页面初始化时会默认读取页面的`title`并自动设置。
         *
         * 在跨端框架中，如果需要在页面进入时设置标题，可以在 onReady 内执行，以避免被框架内的修改所覆盖。如果必须在 onShow 内执行需要延迟一小段时间。
         *
         * @support
         * | ejs（H5 应用) |        ejs（新点小程序）        |      H5      | 钉钉 | 微信小程序 | 支付宝小程序 |
         * | :------------ | :-----------------------------: | :----------: | :--- | :--------- | :----------- |
         * | 支持          | 支持<br>（ejs-weex 环境不支持） | 跨端框架支持 | 支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator)
         * @example ```typescript
         *    ejs.navigator.setTitle({
         *        title: '测试标题',
         *        subTitle: '',
         *        clickable: 0,
         *        direction: 'bottom',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         *    // 兼容快速调用
         *    ejs.navigator.setTitle('测试标题');
         * ```
         */
        setTitle: APIStrType<
            {
                /**
                 * 需要被设置的标题
                 */
                title: string;
                /**
                 * 需要被设置的子标题
                 *
                 * @support 仅 ejs 支持
                 */
                subTitle?: string;
                /**
                 * 是否可点击，如果为1，代表可点击，会在标题右侧出现一个下拉图标，并且能被点击监听，如果为0，永远不会走到回调函数，默认为0
                 *
                 * @support 仅 ejs 支持
                 */
                clickable?: number;
                /**
                 * 箭头的朝向，默认为bottom朝下，使用top时朝上
                 *
                 * @support 仅 ejs 支持
                 */
                direction?: string;
            },
            void,
            [
                /**
                 * 需要被设置的标题
                 */
                string
            ],
            true
        >;
        /**
         * 设置多个标题（会覆盖原有的标题）
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |      不支持       | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator)
         * @example ```typescript
         *    ejs.navigator.setMultiTitle({
         *        titles: ['tab1', 'tab2'],
         *        titleWidth: '50',
         *        success: function (result) {
         *            console.log('点击的tab', result.which);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        setMultiTitle?: APILongCbType<
            {
                /**
                 * 需要被设置的标题数组
                 */
                titles: string[];
                /**
                 * 每个标题的宽度，单位默认为`px`
                 *
                 * @support ejs >= 4.0.3-a 支持，`android`暂时不支持
                 */
                titleWidth?: string;
            },
            {
                /**
                 * 当前被点击的是哪一个标题，譬如`0`是第`1`个，`1`是第`2`个
                 */
                which: number;
            }
        >;
        /**
         * 显示原生导航栏
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |      不支持       | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator)
         * @example ```typescript
         *    ejs.navigator.show({
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        show?: APIType<{}, void>;
        /**
         * 隐藏原生导航栏
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |      不支持       | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator)
         * @example ```typescript
         *    ejs.navigator.hide({
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         *
         * @tips 在微信小程序平台需要隐藏导航栏时，可在`router.js`中对应页面的`style`配置项下，设置`navigationStyle`为`custom`，可查看官方文档说明：[style](https://uniapp.dcloud.io/collocation/pages.html#style)
         */
        hide?: APIType<{}, void>;
        /**
         * 显示状态栏
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |      不支持       | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator)
         * @example ```typescript
         *    ejs.navigator.showStatusBar({
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        showStatusBar?: APIType<{}, void>;
        /**
         * 隐藏状态栏
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |      不支持       | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator)
         * @example ```typescript
         *    ejs.navigator.hideStatusBar({
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        hideStatusBar?: APIType<{}, void>;
        /**
         * 显示 EJS 原生搜索栏，每一次触发搜索栏的搜索功能都会回调
         *
         * **注意 ⚠️: `EJS版本 >= 3.2.2` 及以上不建议使用此 API，推荐使用 `setSearchBar`**
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |      不支持       | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator)
         * @example ```typescript
         *    ejs.navigator.showSearchBar({
         *        success: function (result) {
         *            console.log('搜索的值', result.keyword);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        showSearchBar?: APILongCbType<
            {},
            {
                /**
                 * 搜索的值
                 */
                keyword: string;
            }
        >;
        /**
         * 隐藏 EJS 原生搜索栏
         *
         * *注意 ⚠️: `EJS版本 >= 3.2.2` 及以上不建议使用此 API，推荐使用 `setSearchBar`**
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |      不支持       | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator)
         * @example ```typescript
         *    ejs.navigator.hideSearchBar({
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        hideSearchBar?: APIType<{}, void>;
        /**
         * 拦截`Android`中的系统返回，拦截后原有返回功能不再有
         *
         * @support
         * | ejs（H5 应用) |        ejs（新点小程序）        |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :-----------------------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          | 支持<br>（ejs-weex 环境不支持） | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator)
         * @example ```typescript
         *    ejs.navigator.hookSysBack({
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        hookSysBack?: APILongCbType<{}, void>;
        /**
         * 拦截导航栏左侧的返回按钮，拦截后原有返回功能不再有
         *
         * @support
         * | ejs（H5 应用) |        ejs（新点小程序）        |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :-----------------------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          | 支持<br>（ejs-weex 环境不支持） | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator)
         * @example ```typescript
         *    ejs.navigator.hookBackBtn({
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         *
         * @tips
         * 在跨端框架中，在 H5 和支付宝小程序端需要拦截页面返回按钮时，可以使用`onBackPress`生命周期函数，具体请看[uni-app 自定义返回逻辑教程](https://ask.dcloud.net.cn/article/35120)。若不满足要求，也可以通过生命周期函数 onUnload 来监听离开该页面事件。
         */
        hookBackBtn?: APILongCbType<{}, void>;
        /**
         * 设置右侧第`which`个按钮，并且监听，按钮点击后回调
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉 | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :--- | :--------- | :----------- |
         * | 支持          |      不支持       | 不支持 | 支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator)
         * @example ```typescript
         *    ejs.navigator.setRightBtn({
         *        isShow: 1,
         *        text: '按钮右1',
         *        imageUrl: 'http://app.epoint.com.cn/staticResource/testicon2.png',
         *        which: 0,
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        setRightBtn?: APILongCbType<
            {
                /**
                 * 是否显示，1代表显示，0代表隐藏，默认为1
                 */
                isShow?: number;
                /**
                 * 按钮的文本（最多设置 3 个中文或者 6 个英文字符）
                 */
                text?: string;
                /**
                 * 按钮的图片，如果设置图片了，会优先显示(覆盖原有的文本)
                 */
                imageUrl?: string;
                /**
                 * 默认为0，代表需要操作的是右侧第几个按钮，从最右侧开始算
                 */
                which?: number;
                /**
                 * 按钮宽度，例如：100、98.5
                 *
                 * @support `ejs(Andriod) >= 4.2.2-sp12` `ejs(iOS) >= 4.2.2-sp7`
                 */
                btnWidth?: number;
                /**
                 * 按钮文本颜色，例如：#FF0000  或者  FF0000  可以选择不带  #
                 *
                 * @support `ejs(Andriod) >= 4.2.2-sp12` `ejs(iOS) >= 4.2.2-sp7`
                 */
                textColor?: string;
                /**
                 * 图片是否保持原始特性, 1  或者  0，默认  0  不保持
                 *
                 * @support `ejs(Andriod) >= 4.2.2-sp12` `ejs(iOS) >= 4.2.2-sp7`
                 */
                isImageAlwaysOriginal?: number;
                /**
                 * 允许的最大英文字符数，默认值为 6，即按钮最多允许 6 个英文字符，或 3 个中文
                 *
                 * @support ejs
                 */
                maxCount?: number;
            },
            {
                /**
                 * result 回调不需要判断 result.which 返回值。iOS EJS3.2.6e 组件版本之前没有返回 which 字段
                 */
                which?: number;
            }
        >;
        /**
         * 设置左侧按钮，并且监听，按钮点击后回调
         *
         * 根据[钉钉导航栏设计规范](https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.Y9Lijn&treeId=171&articleId=104928&docType=1#setTitle)，钉钉中左侧按钮只在`iOS`中有效
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |      不支持       | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator)
         * @example ```typescript
         *    ejs.navigator.setLeftBtn({
         *        isShow: 1,
         *        text: '按钮左',
         *        imageUrl: 'http://app.epoint.com.cn/staticResource/testicon2.png',
         *        isShowArrow: 0,
         *        direction: 'bottom',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        setLeftBtn?: APILongCbType<
            {
                /**
                 * 是否显示，`1`代表显示，`0`代表隐藏，默认为`1`
                 */
                isShow?: number;
                /**
                 * 按钮的文本 （最多设置 3 个中文或者 6 个英文字符）
                 */
                text?: string;
                /**
                 * 按钮的图片，如果设置图片了，会优先显示(覆盖原有的文本)
                 */
                imageUrl?: string;
                /**
                 * 默认为`0`，是否显示下拉图标，如果显示(`1`)代表是主操作键，会同时占有左侧按钮和左侧返回按钮的位置
                 */
                isShowArrow?: number;
                /**
                 * ejs3.4.0 新增。 在 isShowArrow 为 1 的情况下有效，direction 参数值支持：“bottom（箭头向下，默认值）”，“top（箭头向上）”
                 */
                direction?: string;
            },
            void
        >;
        /**
         * 设置右侧下拉菜单，并且监听，按钮点击后回调
         *
         * 注意，会覆盖右侧按钮`1`
         *
         * `DD`中的`iconItems`必须是[官方指定的 ICON 索引值](https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.Y9Lijn&treeId=171&articleId=104928&docType=1#iconIndex)
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉 | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :--- | :--------- | :----------- |
         * | 支持          |      不支持       | 不支持 | 支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator)
         * @example ```typescript
         *    ejs.navigator.setRightMenu({
         *        isShow: 1,
         *        text: '下拉',
         *        imageUrl: 'http://app.epoint.com.cn/staticResource/testicon2.png',
         *        titleItems: ['按钮1', '按纽2'],
         *        iconItems: ['http://app.epoint.com.cn/staticResource/img_head.png', 'http://app.epoint.com.cn/staticResource/img_head.png'],
         *        success: function (result) {
         *            console.log('点击的下拉按钮', result.which);
         *            console.log('点击的下拉按钮文本', result.content);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        setRightMenu?: APILongCbType<
            {
                /**
                 * 是否显示，`1`代表显示，`0`代表隐藏，默认为`1`
                 */
                isShow?: number;
                /**
                 * 定位按钮的文本
                 */
                text: string;
                /**
                 * 定位按钮的图片，如果设置图片了，会优先显示(覆盖原有的文本)
                 */
                imageUrl?: string;
                /**
                 * 下拉按钮的文本数组
                 */
                titleItems: string[];
                /**
                 * 下拉按钮的图片数组
                 */
                iconItems?: string[];
            },
            {
                /**
                 * 被点击按钮的索引值，从 0 开始
                 */
                which: number;
                /**
                 * 按钮对应的文本
                 */
                content: string;
            }
        >;
        /**
         * 搜索页面设置搜索关键字
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持（3.1.9） |      不支持       | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator)
         * @example ```typescript
         *    ejs.navigator.setSearchWord({
         *        keyword: 'epoint',
         *        success: function () {},
         *        error: function () {}
         *    });
         *    // 兼容快速调用
         *    ejs.navigator.setSearchWord('epoint');
         * ```
         */
        setSearchWord?: APIStrType<
            {
                /**
                 * 搜索关键字
                 */
                keyword: string;
            },
            void,
            [
                /**
                 * 搜索关键字
                 */
                string
            ],
            false
        >;
        /**
         * 搜索页面获取搜索关键字
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持（3.1.9） |      不支持       | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator)
         * @example ```typescript
         *    ejs.navigator.getSearchWord({
         *        success: function (result) {
         *            console.log('搜索关键字', result.keyword);
         *        },
         *        error: function () {}
         *    });
         * ```
         */
        getSearchWord?: APIType<
            {},
            {
                /**
                 * 搜索的关键字
                 */
                keyword: string;
            }
        >;
        /**
         * 设置原生搜索栏
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持（3.2.2） |      不支持       | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator)
         * @example ```typescript
         *    ejs.navigator.setSearchBar({
         *        isShow: 1,
         *        isSearchable: 1,
         *        placeholder: '',
         *        keyword: '',
         *        cancelOnSearchBarAndNotRefresh: 0,
         *        hideBottomLine: 0,
         *        success: function (result) {
         *            console.log('搜索关键字', result.keyword);
         *        },
         *        error: function () {}
         *    });
         * ```
         */
        setSearchBar?: APILongCbType<
            {
                /**
                 * 是否显示搜索框，`1` 为显示，`0` 为隐藏，默认值为 `0`
                 *
                 * 仅支持设置导航栏下面的 `searchBar`，导航栏上的 `searchBar` 通过 `openPage` Api 中参数 `pageStyle` 控制显示
                 */
                isShow?: number;
                /**
                 * `0` 表示 `searchBar` 不支持点击输入关键字或语音搜索，点击之后执行 `success` 回调，`1` 表示 `searchBar` 支持输入关键字或语音进行搜索。默认值为`0`。
                 *
                 * **注意该参数仅支持设置导航栏下面的 searchBar**。
                 */
                isSearchable?: number;
                /**
                 * 设置搜索提示语, 兼容两个 `searchBar`, 原生默认值为 `请输入搜索关键字`
                 */
                placeholder?: string;
                /**
                 * 设置搜索关键字,兼容两个 `searchBar`，原生默认值为空字符串
                 */
                keyword?: string;
                /**
                 * 是否点击导航栏下面的 searchBar 上的取消按钮自动刷新页面，仅 iOS 支持，0 刷新，1 不刷新，默认为 0。
                 *
                 * @support ejs(native) > 3.2.7.e
                 */
                cancelOnSearchBarAndNotRefresh?: number;
                /**
                 * 支持隐藏原生搜索栏底部分割线。 0 不隐藏，1 隐藏，默认为 0
                 *
                 * @support ejs(native) > 3.4.2.a
                 */
                hideBottomLine?: number;
            },
            {
                /**
                 * 搜索关键字
                 */
                keyword: string;
                /**
                 * 当 isSearchable 为 0 的时候，会返回 isShowSpeech 是否显示语音搜索 1是0否
                 */
                isShowSpeech?: number;
            }
        >;
        /**
         * 在跨端框架中，ejs 封装了 uni 的设置导航栏颜色的 API，可以通过该 API 在 H5 端或微信小程序端设置导航栏颜色
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :----- | :--------- | :----------- |
         * | 不支持        |      不支持       | 跨端框架支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator)
         * @example ```typescript
         *    ejs.navigator.setNavigationBarColor({
         *        frontColor: '#ffffff',
         *        backgroundColor: '#ff0000',
         *        animation: {
         *            duration: 400,
         *            timingFunc: 'easeIn'
         *        },
         *        success: function () {},
         *        error: function () {}
         *    });
         * ```
         */
        setNavigationBarColor?: APIType<
            {
                /**
                 * 前景颜色值，包括按钮、标题、状态栏的颜色
                 *
                 * @support 微信小程序平台仅支持 `#ffffff` 和 `#000000`，支付宝小程序不支持
                 */
                frontColor?: string;
                /**
                 * 背景颜色值，有效值为十六进制颜色
                 */
                backgroundColor?: string;
                /**
                 * 动画效果
                 *
                 * @support 仅微信小程序支持
                 */
                animation?: {
                    /**
                     * 动画变化时间，单位 ms，默认为 0
                     */
                    duration?: number;
                    /**
                     * 动画变化方式，默认为`linear`, 可选值为`easeIn` `easeOut` `easeInOut`
                     */
                    timingFunc?: string;
                };
            },
            void
        >;
        /**
         * 隐藏导航栏左上角返回按钮
         *
         * @support
         * | ejs（H5 应用)  |            ejs（新点小程序）             |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------- | :--------------------------------------: | :----: | :----- | :--------- | :----------- |
         * | 支持 （3.4.1） | 支持（3.4.1）（ejs-weex 环境不支持） | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_navigator)
         * @example ```typescript
         *    ejs.navigator.hideBackBtn({
         *        success: function () {},
         *        error: function () {}
         *    });
         *    // 兼容快速调用
         *    ejs.navigator.hideBackBtn();
         * ```
         */
        hideBackBtn?: APIStrType<{}, void, [], false>;
        hideBackButton?: navigatorType['hideBackBtn'];
    }
}
