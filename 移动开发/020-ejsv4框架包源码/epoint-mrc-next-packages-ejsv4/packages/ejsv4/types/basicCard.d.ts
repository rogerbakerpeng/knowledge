declare namespace EJSNamespace {
    interface basicCardType {
        /**
         * 卡片底部增加箭头按钮，点击展开卡片扩展页面
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        |    支持(4.0.1)    | 不支持 | 不支持 | 不支持       | 不支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_basicCard](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_basicCard)
         * @example ```typescript
         *    ejs.basicCard.showBigCardEntrance();
         * ```
         */
        showBigCardEntrance: APIType<{}, void>;
        /**
         * 设置扩展卡片标题
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        |    支持(4.0.1)    | 不支持 | 不支持 | 不支持       | 不支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_basicCard](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_basicCard)
         * @example ```typescript
         *    ejs.basicCard.setBigCardTitle({
         *        text: '卡片标题',
         *        success: function(){};
         *        error: function(){};
         *    });
         * ```
         */
        setBigCardTitle: APIType<
            {
                /**
                 * 标题文字, 可选
                 */
                text?: string;
            },
            void
        >;
        /**
         * 设置卡片高度
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        |    支持(4.0.1)    | 不支持 | 不支持 | 不支持       | 不支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_basicCard](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_basicCard)
         * @example ```typescript
         *    ejs.basicCard.setCardHeight({
         *        height: 50,
         *        success: function(){};
         *        error: function(){};
         *    });
         * ```
         */
        setCardHeight: APIType<
            {
                /**
                 * 卡片高度, 可选
                 */
                height?: string | number;
            },
            void
        >;
    }
}
