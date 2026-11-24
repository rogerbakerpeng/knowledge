declare namespace EJSNamespace {
    interface runtimeType {
        /**
         * 打开第三方 APP
         *
         * `DD`中只有`Scheme`(`iOS`)以及`Android`中的`packageName`与`className`生效
         *
         * 微信小程序平台建议使用`em-button`组件实现
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉 | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :--- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.launchApp({
         *        packageName: '',
         *        className: '',
         *        actionName: '',
         *        scheme: 'taobao://',
         *        data: 'testdata'
         *        success: function() {},
         *        error: function(error) {}
         *    });
         * ```
         */
        launchApp?: APIType<
            {
                /**
                 * Android 应用的包名
                 */
                packageName?: string;
                /**
                 * Android 应用页面类名
                 */
                className?: string;
                /**
                 * Android 应用页面配置的 ActionName
                 */
                actionName?: string;
                /**
                 * 页面配置的 Scheme 名字，适用于 Android 与 iOS
                 *
                 * 支持传递值的示例：`alipay`、`alipay://`、`alipay://platformapi/startup?key1=val1&key2=val2`
                 */
                scheme?: string;
                /**
                 * 传递的参数。需要目标应用解析获取参数。
                 *
                 * 支持传递值的示例：`key1=val1&key2=val2`，注意:开头不需要写`?`
                 */
                data?: string;
            },
            void
        >;
        /**
         * 判断应用是否已经安装
         *
         * 注意：iOS 机制和 Android不同，通过对App增加白名单参数向系统进行注册，才能获取其他App是否可以安装。
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(3.1.2)   |    支持(3.1.2)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.isApplicationExist({
         *        packageName: '',
         *        scheme: 'taobao://',
         *        success: function (result) {
         *            console.log('应用是否已安装', result.isExist);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        isApplicationExist?: APIType<
            {
                /**
                 * Android 应用的包名
                 */
                packageName?: string;
                /**
                 * iOS 中传 scheme，如`qq`、`wx`、`alipay`等
                 */
                scheme?: string;
            },
            {
                /**
                 * 是否已经安装
                 */
                isExist: number;
            }
        >;
        /**
         * EJS 环境下获取中间平台 APP Key(应用 ID)
         *
         * 在 H5 和其他平台中，获取的是`manifest.json`中的 appid。
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉         | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :----------- | :--------- | :----------- |
         * | 支持          |       支持        | 跨端框架支持 | 跨端框架支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.getAppKey({
         *        success: function (result) {
         *            console.log('应用appkey', result.appKey);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getAppKey?: APIType<
            {},
            {
                /**
                 * 对应的 appkey
                 */
                appKey: string;
            }
        >;
        /**
         * 获取容器的 EJS 版本号
         *
         * 注，是容器的 EJS 版本号，与前端的 EJS 版本号不一样，前端 EJS 版本号通过`ejs.version`获取，只有两者一致才能正常使用
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.getEjsVersion({
         *        success: function (result) {
         *            console.log('容器的 EJS 版本号', result.version);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getEjsVersion?: APIType<
            {},
            {
                /**
                 * 容器的 EJS 版本号
                 */
                version: string;
            }
        >;
        /**
         * 获取地理位置
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉 | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :--- | :--------- | :----------- |
         * | 支持          |       支持        | 跨端框架支持 | 支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.getGeolocation({
         *        success: function (result) {
         *            console.log('地理位置', result);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         *
         * @tips
         * 1. 在较新的浏览器上，H5 端获取定位信息，要求部署在 https 服务上，本地预览（localhost）仍然可以使用 http 协议。
         *
         * 2. 移动端浏览器 普遍仅支持 GPS 定位，在 GPS 信号弱的地方可能定位失败。
         *
         * 3. PC 设备 使用 Chrome 浏览器的时候，位置信息是连接谷歌服务器获取的，国内用户可能获取位置信息失败。
         *
         * 4. 在 EJS 容器下对定位要求较高的产品与项目，建议集成地图组件 SDK。调用该 API 会使用地图组件 API 定位功能进行定位。
         *
         * EJS 兼容组件 SDK 定位版本说明：
         * > 组件 API 调整在 EJS 组件中调整，版本从：4.1.9-sp13 开始支持
         * >
         * > 基座客户端：
         * >
         * > 821：8.2.1.14 更新 ejs 到该版本
         * >
         * > 822：8.2.2-sp3 更新 ejs 到该版本。
         */
        getGeolocation?: APIType<
            {
                /**
                 * 默认为`1`，`1`代表火星坐标系`GCJ-02`（天朝特色，带偏差，国内高德坐标也是这个），`0`代表地球坐标系`WGS84`（标准坐标）
                 */
                coordinate?: number;
                /**
                 * 默认为`1`，`1`代表显示详细地理位置，否则不显示
                 *
                 * @support 仅 ejs 支持
                 */
                isShowDetail?: number;
            },
            {
                /**
                 * 经度
                 */
                longitude: string;
                /**
                 * 纬度
                 */
                latitude: string;
                /**
                 * 详细的地理位置，内部包含详细的省市县等地理位置信息
                 *
                 * @support 仅 ejs 支持
                 */
                addressComponent?: {
                    /**
                     * 商圈名称
                     */
                    businessCircle?: string;
                    /**
                     * 结合当前位置POI的语义化结果描述
                     */
                    location_describe?: string;
                    /**
                     * 国家
                     */
                    country?: string;
                    /**
                     * 省份名称
                     */
                    province?: string;
                    /**
                     * 城市名称
                     */
                    city?: string;
                    /**
                     * 区县名称
                     */
                    district?: string;
                    /**
                     * 乡镇
                     */
                    town?: string;
                    /**
                     * 街道名称
                     */
                    street?: string;
                    /**
                     * 街道号码
                     */
                    streetNumber?: string;
                    /**
                     * 行政区域编码
                     */
                    adCode?: string;
                    /**
                     * 国家代码
                     */
                    countryCode?: string;
                    /**
                     * 信息点
                     */
                    poi?: string;
                };
            }
        >;
        /**
         * 清除 webview 容器缓存，相关缓存包括图片缓存等
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉         | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :----------- | :--------- | :----------- |
         * | 支持          |       支持        | 跨端框架支持 | 跨端框架支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.clearCache({
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        clearCache?: APIType<{}, void>;
        /**
         * 复制文本信息到剪切板，复制成功会弹出 toast 提示
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉 | 微信小程序 | 支付宝小程序 | 官方 weex 端 |
         * | :------------ | :---------------: | :----------: | :--- | :--------- | :----------- | :----------- |
         * | 支持          |       支持        | 跨端框架支持 | 支持 | 支持       | 支持         | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.clipboard({
         *        text: '',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         *    // 支持快速调用
         *    ejs.runtime.clipboard('需要复制的文本');
         * ```
         */
        clipboard?: APIStrType<
            {
                /**
                 * 需要复制的文本
                 */
                text: string;
            },
            void,
            [string],
            false
        >;
        /**
         * 外部浏览器打开 url
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.openUrl({
         *        url: 'https://www.baidu.com/',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         *    // 支持快速调用
         *    ejs.runtime.openUrl('https://www.baidu.com/');
         * ```
         */
        openUrl?: APIStrType<
            {
                /**
                 * 需要被打开的 url
                 */
                url: string;
            },
            void,
            [string],
            false
        >;
        /**
         * 调试面板，如果 native 开启了调试，会在面板中打印
         *
         * **注：iOS 暂不支持该 API，但是会有回调返回**
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(3.1.4)   |    支持(3.1.4)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.logPanel({
         *        text: '',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         *    // 支持快速调用
         *    ejs.runtime.logPanel('需要记录的信息，直接传json对象也可');
         * ```
         */
        logPanel?: APIStrType<
            {
                /**
                 * 需要记录的信息
                 */
                text: string;
            },
            void,
            [string],
            false
        >;
        /**
         * 打开手机系统设置界面，`Android`打开系统设置界面，`iOS`基于安全考虑，只能打开系统应用设置
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(3.1.6)   |    支持(3.1.6)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.openSetting({
         *        success: function () {},
         *        error: function (error) {}
         *    });
         *    // 支持快速调用
         *    ejs.runtime.openSetting();
         * ```
         */
        openSetting?: APIStrType<{}, void, [], false>;
        /**
         * 获取中间平台地址
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(3.1.9)   |    支持(3.1.9)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.getPlatformUrl({
         *        success: function (result) {
         *            console.log('中间平台地址', result.platformUrl);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getPlatformUrl?: APIType<
            {},
            {
                /**
                 * 中间平台地址
                 */
                platformUrl: string;
            }
        >;
        /**
         * 获取组件版本号
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(3.2.1)   |    支持(3.2.1)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.getPluginVersion({
         *        pluginName: '',
         *        success: function (result) {
         *            console.log('组件版本号', result.version);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getPluginVersion?: APIType<
            {
                /**
                 * 组件的名字，例如 `ec`、`contact`、`sso`这些值
                 */
                pluginName: string;
            },
            {
                /**
                 * 版本号
                 */
                version: string;
            }
        >;
        /**
         * 获取容器版本号
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.getAppVersion({
         *        success: function (result) {
         *            console.log('容器版本号', result.version);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getAppVersion?: APIType<
            {},
            {
                /**
                 * 容器的版本号
                 */
                version: string;
            }
        >;
        /**
         * 获取容器加密类型
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(3.4.0)   |    支持(3.4.0)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.securityType({
         *        success: function (result) {
         *            console.log('容器加密类型', result.type);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        securityType?: APIType<
            {},
            {
                /**
                 * “0”：不加密 “1”: AES 加密 “2”: SM2 加密
                 */
                type: string;
            }
        >;
        /**
         * 获取平台应用类型
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(3.4.3)   |    支持(3.4.3)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.platform({
         *        success: function (result) {
         *            console.log('平台应用类型', result.type);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        platform?: APIType<
            {},
            {
                /**
                 * 平台应用类型
                 *
                 * EMP8 平台与 EMP7 版本 的参数有差异
                 *
                 * | EMP7 版本 | EMP8 版本 |
                 * | :--- | :------: |
                 * | “0”：others 类型; |“0”：Android 手机;|
                 * |“1”: AndroidPhone 类型; |“1”: Android 平板; |
                 * |“2”: AndroidPad 类型; |“2”: Android 通用;|
                 * |“3”: iPhone 类型; |“3”: iOS 手机;|
                 * |“4”: iPad 类型; |“4”: iPad 类型;|
                 * |“5”: AndroidUniversal 类型; | “5”: iOS 通用|
                 * |“6”: iOSUniversal 类型;||
                 */
                type: string;
                /**
                 * 历史原因，保留platform参数，同type
                 */
                platform?: string;
            }
        >;
        /**
         * 判断 API 当前是否可用
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉         | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :----------- | :--------- | :----------- |
         * | 支持(4.0.0)   |    支持(4.0.0)    | 跨端框架支持 | 跨端框架支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.canIUse({
         *        apis: ['ui.actionsheet', 'ui.alert'],
         *        success: function (result) {
         *            console.log('ui.actionsheet是否可用', result['ui.actionsheet']);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        canIUse?: APIType<
            {
                /**
                 * 需要检查的 API 的名称数组;
                 *
                 * ejs 端支持查询 ejs 原生 API，H5 端和其他平台支持查询 uni 框架相关 API，具体请查看 uni 官方文档:[canIUse](https://uniapp.dcloud.io/api/caniuse.html)
                 */
                apis: string[];
            },
            {
                /**
                 * `1` 可用, `0` 不可用
                 */
                [key: string]: number;
            }
        >;
        /**
         * 开启实时定位。
         *
         * EJS 容器中，用户每次点击 `runtime.startLocationUpdate`，始终提示“开启实时定位功能，将会持续造成 APP 耗电问题，请谨慎使用。”
         *
         * 增加“不再提示”的复选框，如果用户点击“不再提示”复选框，那么下次就不会提示。
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(4.0.3-a) |   支持(4.0.3-a)   | 不支持 | 不支持 | 支持       | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.startLocationUpdate({
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         *
         * @tips
         *
         * 微信小程序中开启实时定位监听需要进行授权：
         *
         * 1. 首先要在`manifest.json`文件中声明需要后台定位能力：
         * ```typescript
         * {
         *     "name": "",
         * 	   "appid": "",
         *     "mp-weixin": {
         * 		    "requiredBackgroundModes": ["location"]
         * 	    }
         * }
         * ```
         *
         * 2. 监听定位前请先确保有使用后台地理位置的权限。若没有权限，需要引导用户在设置页中，主动将“位置信息”选项设置为“使用小程序期间和离开小程序后”。开发者可以通过调用`ejs.device.goAppSetting`，打开设置页。
         */
        startLocationUpdate?: APIType<{}, void>;
        /**
         * 停止实时定位
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(4.0.3-a) |   支持(4.0.3-a)   | 不支持 | 不支持 | 支持       | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.stopLocationUpdate({
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        stopLocationUpdate?: APIType<{}, void>;
        /**
         * 获取当前模式
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(4.2.22)   |    支持(4.2.22)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.getCurrentMode({
         *        success: function (result) {
         *            console.log('当前模式', result.type);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getCurrentMode?: APIType<
            {},
            {
                /**
                 * 当前模式
                 *
                 * '0' 标版模式；'1'-适老模式
                 */
                type: string;
            }
        >;
        /**
         * 获取当前主题
         *
         * 目前仅有默认主题，支持自定义扩展主题，可以设置成主题1、主题2这种
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(4.2.22)   |    支持(4.2.22)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.getCurrentTheme({
         *        success: function (result) {
         *            console.log('当前主题', result.type);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getCurrentTheme?: APIType<
            {},
            {
                /**
                 * 当前主题
                 *
                 * '0'-默认主题；'1'-主题1；'2'-主题2；
                 */
                type: string;
            }
        >;
        /**
         * 获取指定模式下的配置
         *
         * 例如：type: '0'，是获取标版模式下的所有原生尺寸配置。
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(4.2.22)   |    支持(4.2.22)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.getModeConfig({
         *        type: '0',
         *        success: function (result) {
         *            console.log('标版模式下的配置', result);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getModeConfig?: APIType<
            {
                /**
                 * 需要获取配置的模式类型;
                 *
                 * '0' 标版模式；'1'-适老模式
                 */
                type?: string;
            },
            {
                /**
                 * 模式配置
                 */
                [key: string]: any;
            }
        >;
        /**
         * 获取指定主题下的配置
         *
         * 例如：type: '0'，是获取默认主题下的所有原生颜色配置。
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(4.2.22)   |    支持(4.2.22)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.getThemeConfig({
         *        type: '0',
         *        success: function (result) {
         *            console.log('默认主题下的配置', result);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getThemeConfig?: APIType<
            {
                /**
                 * 需要获取配置的主题类型;
                 *
                 * '0'-默认主题；'1'-主题1；'2'-主题2；
                 */
                type?: string;
            },
            {
                /**
                 * 主题配置
                 */
                [key: string]: any;
            }
        >;
        /**
         * 获取指定样式值
         *
         * 主要针对扩展样式，默认样式规范和命名按照基础token文档定义，可以根据样式名称获取对应的值信息
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(4.2.22)   |    支持(4.2.22)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_runtime)
         * @example ```typescript
         *    ejs.runtime.getConfigValue({
         *        key: '',
         *        success: function (result) {
         *            console.log('样式值', result.value);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getConfigValue?: APIType<
            {
                /**
                 * 需要获取值的样式名称;
                 */
                key: string;
            },
            {
                /**
                 * 样式值
                 */
                value: string;
            }
        >;
    }
}
