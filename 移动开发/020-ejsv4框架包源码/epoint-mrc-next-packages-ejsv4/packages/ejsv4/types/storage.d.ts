declare namespace EJSNamespace {
    interface storageType {
        /**
         * 获取键值对
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 | 官方 weex 端 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- | :----------- |
         * | 支持          |       支持        | 支持 | 支持 | 支持       | 支持         | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage)
         * @example ```typescript
         *    ejs.storage.getItem({
         *        key: 'key1',
         *        success: function (result) {
         *            console.log('获取的值', result['key1']);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getItem: APIType<
            {
                /**
                 * 键名或者键名数组，**EJS 原生容器中会自动给`key`加上`ejs_`前缀**
                 */
                key: string | string[];
            },
            {
                /**
                 * 获取的对应键值对
                 */
                [key: string]: string;
            }
        >;
        /**
         * 存储键值对
         *
         * **注意 ⚠️: 在 部分 `android` 手机上调用此 API 存储总数据量超过 `1KB` 会报错，如需要存储超过 `1KB` 的数据，建议试用 HTML5 API `LocalStorage` 进行存储**
         *
         * [LocalStorage 使用说明文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 | 官方 weex 端 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- | :----------- |
         * | 支持          |       支持        | 支持 | 支持 | 支持       | 支持         | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage)
         * @example ```typescript
         *    ejs.storage.setItem({
         *        key1: 'value1',
         *        key2: 'value2',
         *        success: function() {},
         *        error: function(error) {}
         *    });
         * ```
         */
        setItem: APIType<
            {
                /**
                 * 存储的键值对
                 *
                 * **EJS 原生容器中会自动给`key`加上`ejs_`前缀**
                 */
                [key: string]: string;
            },
            void
        >;
        /**
         * 移除键值对
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 | 官方 weex 端 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- | :----------- |
         * | 支持          |       支持        | 支持 | 支持 | 支持       | 支持         | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage)
         * @example ```typescript
         *    ejs.storage.removeItem({
         *        key: 'key1',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        removeItem: APIType<
            {
                /**
                 * 键名或者键名数组
                 *
                 * **EJS 原生容器中会自动给`key`加上`ejs_`前缀**
                 */
                key: string | string[];
            },
            void
        >;
        /**
         * 获取应用管理平台配置的业务接口地址
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage)
         * @example ```typescript
         *    ejs.storage.getBusinessRestUrl({
         *        success: function (result) {
         *            console.log('业务接口地址', result['business-rest-url']);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getBusinessRestUrl?: APIType<
            {},
            {
                /**
                 * 返回中间平台配置的接口地址
                 */
                'business-rest-url': string;
            }
        >;
        /**
         * 小程序通用数据库获取键值对
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |     H5      | 钉钉 | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :---------: | :--- | :--------- | :----------- |
         * | 支持 (4.1.0)  |    支持(4.0.0)    | 支持(4.1.0) | 支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage)
         * @example ```typescript
         *    ejs.storage.getShareItem({
         *        key: 'key1',
         *        success: function (result) {
         *            console.log('获取的值', result['key1']);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getShareItem?: APIType<
            {
                /**
                 * 键名或者键名数组
                 *
                 * **EJS 原生容器中会自动给`key`加上`ejs_`前缀**
                 */
                key: string | string[];
            },
            {
                /**
                 * 获取的键值对
                 */
                [key: string]: string;
            }
        >;
        /**
         * 小程序通用数据库存储键值对
         *
         * **注意 ⚠️: 在 部分 `android` 手机上调用此 API 存储总数据量超过 `1KB` 会报错，如需要存储超过 `1KB` 的数据，建议试用 HTML5 API `LocalStorage` 进行存储**
         *
         * [LocalStorage 使用说明文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |     H5      | 钉钉 | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :---------: | :--- | :--------- | :----------- |
         * | 支持 (4.1.0)  |    支持(4.0.0)    | 支持(4.1.0) | 支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage)
         * @example ```typescript
         *    ejs.storage.setShareItem({
         *        key1: 'value1',
         *        key2: 'value2',
         *        success: function() {},
         *        error: function(error) {}
         *    });
         * ```
         */
        setShareItem?: APIType<
            {
                /**
                 * 存储的键值对
                 *
                 * **EJS 原生容器中会自动给`key`加上`ejs_`前缀**
                 */
                [key: string]: string;
            },
            void
        >;
        /**
         * 获取小程序配置参数（先从独立配置中获取，否则从通用配置中获取）
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        |    支持(4.0.0)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage)
         * @example ```typescript
         *    ejs.storage.getPlatformParam({
         *        key: 'key1',
         *        success: function (result) {
         *            console.log('小程序配置参数', result['key1']);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getPlatformParam?: APIType<
            {
                /**
                 * 键名或者键名数组
                 */
                key: string | string[];
            },
            {
                /**
                 * 小程序配置参数
                 */
                [key: string]: string;
            }
        >;
        /**
         * 获取小程序通用平台参数配置
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        |    支持(4.0.0)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage)
         * @example ```typescript
         *    ejs.storage.getPlatformShareParam({
         *        key: 'key1',
         *        success: function (result) {
         *            console.log('小程序通用平台参数', result['key1']);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getPlatformShareParam?: APIType<
            {
                /**
                 * 键名或者键名数组
                 */
                key: string | string[];
            },
            {
                /**
                 * 小程序通用平台参数
                 */
                [key: string]: string;
            }
        >;
        /**
         * 获取小程序独立配置参数
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        |    支持(4.0.0)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage)
         * @example ```typescript
         *    ejs.storage.getPlatformPrivateParam({
         *        key: 'key1',
         *        success: function (result) {
         *             console.log('小程序独立配置参数', result['key1']);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getPlatformPrivateParam?: APIType<
            {
                /**
                 * 键名或者键名数组
                 */
                key: string | string[];
            },
            {
                /**
                 * 小程序独立配置参数
                 */
                [key: string]: string;
            }
        >;
        /**
         * 小程序通用数据库删数据
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉         | 微信小程序   | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :----------- | :----------- | :----------- |
         * | 支持(4.2.17)  |    支持(4.0.0)    | 支持(4.2.17) | 支持(4.2.17) | 支持(4.2.17) | 支持(4.2.17) |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_storage)
         * @example ```typescript
         *    ejs.storage.removeShareItem({
         *        key: 'key1',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        removeShareItem?: APIType<
            {
                /**
                 * 键名或者键名数组
                 */
                key: string | string[];
            },
            void
        >;
    }
}
