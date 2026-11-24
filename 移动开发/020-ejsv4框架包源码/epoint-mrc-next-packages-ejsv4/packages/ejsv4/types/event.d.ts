declare namespace EJSNamespace {
    interface SupportEventKey {
        /**
         * 事件的名称，必须在支持的范围内，支持的事件：
         *
         * | 名称 | 触发条件 | 备注 | 平台差异说明                     |
         * | :------------- |:-------------|:-------------|:-------------|
         * | OnPageInit `新增`  | 当页面首次加载时。支持版本见下方说明 |对应原生`OnPageInit`事件|非 ejs 环境不支持                |
         * | created| 当页面首次DOM加载完成时 | 对应原生`OnPageCreated`事件|非 ejs 环境不支持                |
         * | resume | 当页面重新可见并可以交互时 | 对应原生`OnPageResume`事件|非 ejs 环境不支持                |
         * | pause | 当页面不可见时 |对应原生`OnPagePause`事件|非 ejs 环境不支持                |
         * | netChange | 当网络状态发生变化时 |对应原生`OnNetChanged`事件||
         * | cardOpenbox | 卡片显示事件 |对应原生`onCardOpenbox`事件|非 ejs 环境不支持                |
         * | cardClosebox | 卡片隐藏事件 |对应原生`onCardClosebox`事件|非 ejs 环境不支持                |
         * | OnPullRefresh | 卡片监听首页下拉刷新事件，未监听时卡片默认执行刷新操作 |对应原生`OnPullRefresh`事件|非 ejs 环境不支持                |
         * | onLocationChange `v4.0.3-a` | 需要先开启实时定位，然后才能监听位置变化，成功回调中返回实时定位的经纬度`longitude`、`latitude`及坐标类型`locationtype`（坐标类型值为`wgs84`代表原始坐标系，值为`bd`代表百度坐标系，`gcj02`代表火星坐标系） |对应EJS原生`onLocationChange`事件|仅`ejs v4.0.3-a`、微信小程序支持 |
         * | onModeChanged | 当原生触发模式切换时回调 |出参 `type`：'0'-标版模式；'1'-适老模式；|非 ejs 环境不支持                |
         * | onThemeChanged | 当原生触发主题切换时回调 |出参 `type`：'0'-默认主题；'1'-主题 1；'2'-主题 2|非 ejs 环境不支持                |
         *
         * @tips
         * `OnPageInit`支持版本：
         *
         *      Android：M822：EC版本 2.0.3-sp5及以上；M821：ejs版本 4.2.2-sp9及以上
         *
         *      iOS：M822：EC版本 2.0.3-sp1及以上；M821：ejs版本 4.2.2-sp6及以上
         *
         * 容器生命周期状况说明：[生命周期整改](http://218.4.136.114:8866/?ssl=1&fname=e9fed20c-59f9-4601-9647-8d4a7e65894d.docx&furl=https://oa.epoint.com.cn:8080/OA9/rest/frame/base/attach/attachAction/getContent?isCommondto=true&attachGuid=e9fed20c-59f9-4601-9647-8d4a7e65894d)
         */
        key: string;
    }

    interface CustomEventKey {
        /**
         * 自定义事件名称
         */
        key: string;
    }

    interface eventType {
        /**
         * 注册事件监听，请参考`支持的事件`表格
         *
         * 注，必须通过`EJS`API 才能监听
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_event](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_event)
         * @example ```typescript
         *    ejs.event.registerEvent({
         *        key: 'resume',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         *
         */
        registerEvent?: APILongCbType<SupportEventKey, any>;
        /**
         * 取消事件监听
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_event](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_event)
         * @example ```typescript
         *    ejs.event.unRegisterEvent({
         *        key: 'resume',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        unRegisterEvent?: APIType<SupportEventKey, void>;
        /**
         * 判断对应的事件是否有监听
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_event](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_event)
         * @example ```typescript
         *    ejs.event.isRegisterEvent({
         *        key: 'resume',
         *        success: function (result) {
         *            console.log('是否支持', result.isRegister);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        isRegisterEvent?: APIType<
            SupportEventKey,
            {
                /**
                 * 是否监听，`1`代表已经监听，`0`代表没有
                 */
                isRegister: number;
            }
        >;
        /**
         * 小程序、H5 卡片事件通信，注册长期监听的事件
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :----- | :--------- | :----------- |
         * | 支持（4.0.0） |   支持（4.0.0）   | 跨端框架支持 | 跨端框架支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_event](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_event)
         * @example ```typescript
         *    ejs.event.on({
         *        key: 'custom',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        on?: APILongCbType<CustomEventKey, any>;
        /**
         * 小程序、H5 卡片事件通信，注册短期监听的事件，只执行一次
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :----- | :--------- | :----------- |
         * | 支持（4.0.0） |   支持（4.0.0）   | 跨端框架支持 | 跨端框架支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_event](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_event)
         * @example ```typescript
         *    ejs.event.once({
         *        key: 'custom',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        once?: APIType<CustomEventKey, any>;
        /**
         * 小程序、H5 卡片事件通信，触发监听的事件，可向事件回调传递任意参数
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :----- | :--------- | :----------- |
         * | 支持（4.0.0） |   支持（4.0.0）   | 跨端框架支持 | 跨端框架支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_event](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_event)
         * @example ```typescript
         *    ejs.event.emit({
         *        key: 'custom',
         *        data: {
         *            param1: 'value1',
         *            param2: 'value2'
         *        }
         *    });
         * ```
         */
        emit?: APIType<
            CustomEventKey & {
                /**
                 * 事件的传参, 可选
                 */
                data?: object;
            },
            void
        >;
        /**
         * 小程序、H5 卡片事件通信，解除事件绑定
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :----- | :--------- | :----------- |
         * | 支持（4.0.0） |   支持（4.0.0）   | 跨端框架支持 | 跨端框架支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_event](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_event)
         * @example ```typescript
         *    ejs.event.off({
         *        key: 'custom',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        off?: APIType<CustomEventKey, void>;
        app?: EJSType['app'];
        config?: EJSType['config'];
        /**
         * 主要用于页面 DOMContentLoaded 事件触发时向原生发送消息
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :----- | :--------- | :----------- |
         * | 支持 |   支持   | 不支持 | 不支持 | 不支持       | 不支持         |
         */
        dispatchEventToNative?: APIType<
            {
                /**
                 * 事件名称，一般是DOMContentLoaded
                 */
                key: string;
            },
            void
        >;
    }
}
