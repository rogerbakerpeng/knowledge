declare namespace EJSNamespace {
    interface miniH5Type {
        /**
         * 打开小程序。
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持        |    支持(3.4.1)    | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5)
         * @example ```typescript
         *    ejs.miniH5.navigateTo({
         *        appId: 'appcenter',
         *        path: './index.html#/appcenter/edit',
         *        alive: 0,
         *        extraData: {}
         *    });
         * ```
         *
         * @tips
         * 在微信小程序平台中：
         *
         * 1. 需要用户触发跳转，若用户未点击小程序页面任意位置，则开发者将无法调用此接口自动跳转至其他小程序。
         *
         * 2. 需要用户确认跳转, 在跳转至其他小程序前，将统一增加弹窗，询问是否跳转，用户确认后才可以跳转其他小程序。如果用户点击取消，则回调 `fail cancel`
         */
        navigateTo: APIType<
            {
                /**
                 * `必填`，要打开的小程序 appId
                 */
                appId: string;
                /**
                 * `选填`，打开指定的页面路径
                 */
                path?: string;
                /**
                 * 为 1 保活状态关闭小程序，为 0 不保活，默认为 0
                 *
                 * @support 仅 ejs 支持
                 */
                alive?: number;
                /**
                 * `选填`，需要传递给小程序的额外参数
                 */
                extraData?: object;
            },
            any
        >;
        /**
         * 返回小程序上一页
         *
         * @support
         * | ejs（H5 应用) |           ejs（新点小程序）            |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :------------------------------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        | 支持(3.4.1)<br>（ejs-weex 环境不支持） | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5)
         * @example ```typescript
         *    ejs.miniH5.navigateBack({
         *        extraData: {},
         *        useRouter: true
         *    });
         * ```
         */
        navigateBack: APIType<
            {
                /**
                 * `选填`，需要传递给上一个小程序的额外参数
                 *
                 * @support 仅 ejs 支持
                 */
                extraData?: object;
                /**
                 * `选填`, 是否是单页应用，关闭时使用路由返回，默认为`false`
                 *
                 * @support 仅 ejs 支持
                 */
                useRouter?: boolean;
            },
            void
        >;
        /**
         * 返回小程序上一页的监听拦截
         *
         * @support
         * | ejs（H5 应用) |           ejs（新点小程序）            |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :------------------------------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        | 支持(3.4.1)（ejs-weex 环境不支持） | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5)
         * @example ```typescript
         *    ejs.miniH5.onNavigateBack({
         *        success: function(){}
         *    });
         * ```
         */
        onNavigateBack?: APILongCbType<{}, void>;
        /**
         * 设置导航栏的背景色、风格
         *
         * @support
         * | ejs（H5 应用) |           ejs（新点小程序）            |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :------------------------------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        | 支持(3.4.1)（ejs-weex 环境不支持） | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5)
         * @example ```typescript
         *    ejs.miniH5.setNavigationBarColor({
         *        frontColor: 'blue',
         *        backgroundColor: '#ff0000'
         *    });
         * ```
         */
        setNavigationBarColor: APIType<
            {
                /**
                 * 前景色，支持设置胶囊按钮，标题，状态栏的风格
                 *
                 * @support 新点小程序仅支持`blue`、`white`，微信小程序平台仅支持 `#ffffff` 和 `#000000`，支付宝小程序不支持
                 */
                frontColor?: string;
                /**
                 * 导航栏背景色
                 */
                backgroundColor?: string;
            },
            void
        >;
        /**
         * 设置导航栏的标题
         *
         * @support
         * | ejs（H5 应用) |            ejs（新点小程序）            |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :-------------------------------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        | 支持(3.4.1) <br>（ejs-weex 环境不支持） | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5)
         * @example ```typescript
         *    ejs.miniH5.setNavigationBarTitle({
         *        title: '标题'
         *    });
         * ```
         */
        setNavigationBarTitle: APIType<
            {
                /**
                 * 导航栏标题
                 */
                title: string;
            },
            void
        >;
        /**
         * 获取应用 ID
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        |    支持(3.4.1)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5)
         * @example ```typescript
         *    ejs.miniH5.getEpointCodeInfo({
         *        success: function (result) {
         *            console.log('应用 ID', result.appId);
         *        }
         *    });
         * ```
         */
        getEpointCodeInfo?: APIType<
            {},
            {
                /**
                 * 应用 ID
                 */
                appId: string;
            }
        >;
        /**
         * 关闭小程序
         *
         * 在微信和支付宝小程序平台中，必须要有点击行为才能成功调用。
         *
         * @support
         * | ejs（H5 应用) |            ejs（新点小程序）            |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :-------------------------------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        | 支持(4.0.0) <br>（ejs-weex 环境不支持） | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5)
         * @example ```typescript
         *    ejs.miniH5.close({
         *        alive: 1,
         *        extraData: {
         *            key1: 'value1'
         *        },
         *        success: function () {}
         *    });
         * ```
         */
        close: APIType<
            {
                /**
                 * 为 1 保活状态关闭小程序，为 0 不保活，默认 1
                 *
                 * @support 仅 ejs 支持
                 */
                alive?: number;
                /**
                 * 关闭小程序时的回调参数
                 *
                 * @support 仅 ejs 支持
                 */
                extraData?: object;
            },
            void
        >;
        /**
         * 检测小程序是否已更新
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        |    支持(4.0.2)    | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5)
         * @example ```typescript
         *    ejs.miniH5.checkForUpdate({
         *        success: function (result) {
         *            console.log('小程序是否已更新', result.hasUpdate);
         *        },
         *        error: function (err) {}
         *    });
         * ```
         */
        checkForUpdate: APIType<
            {},
            {
                /**
                 * 小程序是否已更新, `0`没有更新的小程序，`1`已有更新的小程序
                 */
                hasUpdate: number;
            }
        >;
        /**
         * 小程序强制更新并重启
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        |    支持(4.0.2)    | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5)
         * @example ```typescript
         *    ejs.miniH5.applyUpdate({
         *        success: function () {},
         *        error: function (err) {}
         *    });
         * ```
         */
        applyUpdate: APIType<{}, void>;
        /**
         * 小程序支持下载卡片资源
         *
         * @support
         * | ejs（H5 应用) |             ejs（新点小程序）             |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------------------------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        | 支持(4.0.3-a) （ejs-weex 环境不支持） | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_miniH5)
         * @example ```typescript
         *    ejs.miniH5.applyCard({
         *        isforce: '0',
         *        appkey: '',
         *        version: '',
         *        cardguid: '',
         *        isdebug: '',
         *        success: function () {},
         *        error: function (err) {}
         *    });
         * ```
         */
        applyCard?: APIType<
            {
                /**
                 * 强制更新, 1 不再执行判断逻辑、直接更新, 0 正常更新
                 */
                isforce?: string;
                /**
                 * 传入卡片 appkey
                 */
                appkey: string;
                /**
                 * 传入卡片版本
                 */
                version: string;
                /**
                 * 传入卡片 cardguid
                 */
                cardguid: string;
                /**
                 * 是否是调试卡片 isdebug
                 */
                isdebug: string;
            },
            void
        >;
    }
}
