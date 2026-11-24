declare namespace EJSNamespace {
    interface h5UIType {
        /**
         * 是否强制使用 H5-UI 效果，默认`false`
         *
         * @support 仅 ejs > 3.4.2a 支持，`ejs-weex`及官方`weex`端不支持
         */
        h5UI?: boolean;
    }

    interface popPickerElm {
        value: string;
        text: string;
    }

    interface popPickerMutiData extends popPickerElm {
        children?: popPickerMutiData[];
    }

    interface uiType {
        /**
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 | 官方 weex 端 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- | :----------- |
         * | 支持          |       支持        | 支持 | 支持 | 支持       | 支持         | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui](http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui)
         * @example ```typescript
         *    ejs.ui.toast({
         *        message: 'sd#ddd测试',
         *        h5UI: false,
         *        success: function () {},
         *        error: function (err) {}
         *    });
         *    // 兼容快速调用
         *    ejs.ui.toast('sd#ddd测试');
         * ```
         */
        toast: APIStrType<
            h5UIType & {
                /**
                 * 消息内容
                 */
                message: string;
            },
            void,
            [string],
            false
        >;
        /**
         * 点击按钮才会触发成功回调
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持（4.0.3） |   支持（4.0.3）   | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui](http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui)
         * @example ```typescript
         *    ejs.ui.toastAndEvent({
         *        message: 'sd#ddd测试',
         *        buttonName: '收藏设置',
         *        iconType: '0',
         *        duration: '2000',
         *        position: 'bottom',
         *        success: function () {},
         *        error: function (err) {}
         *    });
         * ```
         */
        toastAndEvent?: APIType<
            {
                /**
                 * 消息内容
                 */
                message?: string;
                /**
                 * 按钮显示文字
                 */
                buttonName?: string;
                /**
                 * `0`无图标，`1`成功图标，`2`失败图标
                 */
                iconType?: string;
                /**
                 * 弹框持续时间，不传默认 2000，单位 ms
                 */
                duration?: string;
                /**
                 * 弹出位置，可选值为 `top`(距离顶部 1/3) `center`（中间）`bottom`（距离底部 1/3）
                 */
                position?: string;
            },
            void
        >;
        /**
         * 原生容器中，弹出一个有复制按钮的弹窗，可以快速复制弹出信息
         *
         * 在`ejs`以外的环境中兼容成了普通的`alert`形式
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 | 官方 weex 端 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- | :----------- |
         * | 支持          |       支持        | 支持 | 支持 | 支持       | 支持         | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui](http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui)
         * @example ```typescript
         *    ejs.ui.showDebugDialog({
         *        debugInfo: '信息',
         *        success: function () {},
         *        error: function (err) {}
         *    });
         *    // 兼容快速调用
         *    ejs.ui.showDebugDialog('信息');
         * ```
         */
        showDebugDialog?: APIStrType<
            h5UIType & {
                /**
                 * 消息内容
                 */
                debugInfo: string;
            },
            void,
            [string],
            false
        >;
        /**
         * 点击 alert的按钮后回调
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 | 官方 weex 端 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- | :----------- |
         * | 支持          |       支持        | 支持 | 支持 | 支持       | 支持         | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui](http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui)
         * @example ```typescript
         *    ejs.ui.alert({
         *        title: '标题',
         *        message: '信息',
         *        buttonName: '确定',
         *        cancelable: 1,
         *        h5UI: false,
         *        success: function () {},
         *        error: function (err) {}
         *    });
         *    // 兼容快速调用
         *    ejs.ui.alert('信息', '标题', '确定');
         * ```
         */
        alert: APIStrType<
            h5UIType & {
                /**
                 * 消息标题
                 */
                title?: string;
                /**
                 * 消息内容
                 */
                message?: string;
                /**
                 * 确定按钮的文字
                 */
                buttonName?: string;
                /**
                 * 点击遮罩是否可取消，为`1`为可取消，默认为`1`
                 *
                 * @support 官方 weex 端不支持
                 */
                cancelable?: number;
            },
            void,
            [string?, string?, string?],
            false
        >;
        /**
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 | 官方 weex 端 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- | :----------- |
         * | 支持          |       支持        | 支持 | 支持 | 支持       | 支持         | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui](http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui)
         * @example ```typescript
         *    ejs.ui.confirm({
         *        title: '是否选择',
         *        message: 'sd#ddd测试',
         *        buttonLabels: ['取消', '确定'],
         *        cancelable: 1,
         *        h5UI: false,
         *        success: function (result) {
         *            console.log('点击的按钮', result.which);
         *        },
         *        error: function (err) {}
         *    });
         * ```
         */
        confirm: APIType<
            h5UIType & {
                /**
                 * 标题
                 */
                title?: string;
                /**
                 * 消息说明
                 */
                message?: string;
                /**
                 * 按钮名称数组
                 */
                buttonLabels?: string[];
                /**
                 * 点击遮罩是否可取消，为`1`为可取消，默认为`1`
                 *
                 * @support 官方 weex 端不支持
                 */
                cancelable?: number;
            },
            {
                /**
                 * 被点击按钮的索引值，从 0 开始
                 */
                which: number;
            }
        >;
        /**
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 | 官方 weex 端 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- | :----------- |
         * | 支持          |       支持        | 支持 | 支持 | 支持       | 支持         | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui](http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui)
         * @example ```typescript
         *    ejs.ui.prompt({
         *        title: '测试输入',
         *        hint: '',
         *        text: '',
         *        lines: 1,
         *        maxLength: 10000,
         *        buttonLabels: ['取消', '确定'],
         *        cancelable: 1,
         *        h5UI: false,
         *        success: function (result) {
         *            console.log('点击的按钮', result.which);
         *            console.log('输入的内容', result.content);
         *        },
         *        error: function (err) {}
         *    });
         * ```
         */
        prompt: APIType<
            h5UIType & {
                /**
                 * 标题
                 *
                 * @support 官方 weex 端不支持
                 */
                title?: string;
                /**
                 * 输入框提示
                 *
                 * @support 官方 weex 端不支持
                 */
                hint?: string;
                /**
                 * 输入框默认的文本，默认为空
                 */
                text?: string;
                /**
                 * 最多允许的输入行数，默认为`1`
                 *
                 * @support 仅在 h5 环境下用来限制输入框高度，官方 weex 端不支持
                 */
                lines?: number;
                /**
                 * 最多允许的输入字符个数，默认为`10000`
                 *
                 * @support 官方 weex 端不支持
                 */
                maxLength?: number;
                /**
                 * 按钮名称数组
                 */
                buttonLabels?: string[];
                /**
                 * 点击遮罩是否可取消，为`1`为可取消，默认为`1`
                 *
                 * @support `ejs`环境下仅在 `android` 中有效，`ios` 下无效，官方 weex 端不支持
                 */
                cancelable?: number;
            },
            {
                /**
                 * 被点击按钮的索引值，从 0 开始
                 */
                which: number;
                /**
                 * 输入的内容
                 */
                content: string;
            }
        >;
        /**
         * 显示等待对话框
         *
         * 注意，同时只会存在一个等待对话框
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- |
         * | 支持          |       支持        | 支持 | 支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui](http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui)
         * @example ```typescript
         *    ejs.ui.showWaiting({
         *        message: '正在加载...'
         *        h5UI: false,
         *        success: function() {},
         *        error: function(err) {}
         *    });
         *    // 兼容快速调用
         *    ejs.ui.showWaiting('正在加载...');
         * ```
         */
        showWaiting: APIStrType<
            h5UIType & {
                /**
                 * 显示的信息，默认为`加载中...`
                 */
                message?: string;
                /**
                 * 是否锁定点击空白处取消等待框，默认值为`true`
                 *
                 * @support 仅 ejs(H5) > 4.0.3-c-beta2 支持
                 */
                padlock?: boolean;
            },
            void,
            [string?],
            false
        >;
        /**
         * 关闭等待对话框
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- |
         * | 支持          |       支持        | 支持 | 支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui](http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui)
         * @example ```typescript
         *    ejs.ui.closeWaiting({
         *        h5UI: false,
         *        success: function () {},
         *        error: function (err) {}
         *    });
         * ```
         */
        closeWaiting: APIType<h5UIType, void>;
        /**
         * 操作列表
         *
         * 在小程序平台中调用的是原生提供的弹出框，所以不同平台的样式不同。
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- |
         * | 支持          |       支持        | 支持 | 支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui](http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui)
         * @example ```typescript
         *    ejs.ui.actionSheet({
         *        items: ['远野贵树', '篠原明里', '澄田花苗', '立花泷', '宫水三叶'],
         *        h5UI: false,
         *        success: function (result) {
         *            console.log('点击的按钮索引值', result.which);
         *            console.log('对应的内容', result.content);
         *        },
         *        error: function (err) {}
         *    });
         * ```
         */
        actionSheet?: APIType<
            h5UIType & {
                /**
                 * 内容数组
                 */
                items: string[];
            },
            {
                /**
                 * 被点击按钮的索引值，从 0 开始 ,如果是`-1`代表点击了取消按钮
                 */
                which: number;
                /**
                 * 选择的内容
                 */
                content: string;
            }
        >;
        /**
         * 选择日期
         *
         * @support `v4.2.4`版本开始支持跨端框架
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 | 官方 weex 端 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- | :----------- |
         * | 支持          |       支持        | 支持 | 支持 | 支持       | 支持         | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui](http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui)
         * @example ```typescript
         *    ejs.ui.pickDate({
         *        title: 'pickDate',
         *        datetime: '2016-12-05',
         *        minDate: '2010-12-01',
         *        maxDate: '2020-12-01',
         *        h5UI: false,
         *        success: function (result) {
         *            console.log('日期', result.date);
         *        },
         *        error: function (err) {}
         *    });
         * ```
         */
        pickDate: APIType<
            h5UIType & {
                /**
                 * 标题，部分设备上设置标题后遮挡控件可不设置标题
                 *
                 * @support 官方 weex 端不支持
                 */
                title?: string;
                /**
                 * 默认的时间，默认值为当前时间，格式为`yyyy-MM-dd`
                 */
                datetime?: string;
                /**
                 * h5 模式下，可选时间的开始日期，格式为`yyyy-MM-dd`
                 */
                minDate?: string;
                /**
                 * h5 模式下，可选时间的结束日期，格式为`yyyy-MM-dd`
                 */
                maxDate?: string;
            },
            {
                /**
                 * 选择的日期，示例：'2016-12-05'
                 */
                date: string;
            }
        >;
        /**
         * 选择时间
         *
         * @support `v4.2.4`版本开始支持跨端框架
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 | 官方 weex 端 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- | :----------- |
         * | 支持          |       支持        | 支持 | 支持 | 支持       | 支持         | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui](http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui)
         * @example ```typescript
         *    ejs.ui.pickTime({
         *        title: 'pickTime',
         *        datetime: '10:20',
         *        minHour: 0,
         *        maxHour: 23,
         *        minMinute: 0,
         *        maxMinute: 59,
         *        h5UI: false,
         *        success: function (result) {
         *            console.log('日期', result.time);
         *        },
         *        error: function (err) {}
         *    });
         * ```
         */
        pickTime?: APIType<
            h5UIType & {
                /**
                 * 标题，部分设备上设置标题后遮挡控件可不设置标题
                 *
                 * @support 官方 weex 端不支持
                 */
                title?: string;
                /**
                 * 默认的时间，默认值为当前时间，格式为`HH:mm`
                 */
                datetime?: string;
                /**
                 * h5 模式下，可选时间的开始时
                 *
                 * @support 官方 weex 端不支持
                 */
                minHour?: number;
                /**
                 * h5 模式下，可选时间的结束时
                 *
                 * @support 官方 weex 端不支持
                 */
                maxHour?: number;
                /**
                 * h5 模式下，可选时间的开始分钟
                 *
                 * @support 官方 weex 端不支持
                 */
                minMinute?: number;
                /**
                 * h5 模式下，可选时间的结束分钟
                 *
                 * @support 官方 weex 端不支持
                 */
                maxMinute?: number;
            },
            {
                /**
                 * 选择的时间，示例：'10:20'
                 */
                time: string;
            }
        >;
        /**
         * 选择日期时间
         *
         * @support `v4.2.4`版本开始支持跨端框架
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- |
         * | 支持          |       支持        | 支持 | 支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui](http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui)
         * @example ```typescript
         *    ejs.ui.pickDateTime({
         *        title: '选择日期时间',
         *        datetime: '2016-12-05 10:20',
         *        h5UI: false,
         *        success: function (result) {
         *            console.log('日期时间', result.datetime);
         *            console.log('星期几', result.week);
         *        },
         *        error: function (err) {}
         *    });
         * ```
         */
        pickDateTime?: APIType<
            h5UIType & {
                /**
                 * 选择日期时间的标题
                 *
                 * @support `h5`环境下可用
                 */
                title?: string;
                /**
                 * h5 模式下，可选时间的开始日期，格式为`yyyy-MM-dd HH:mm`
                 */
                minDate?: string;
                /**
                 * h5 模式下，可选时间的结束日期，格式为`yyyy-MM-dd HH:mm`
                 */
                maxDate?: string;
                /**
                 * 默认的时间，默认值为当前时间，格式为`yyyy-MM-dd HH:mm`
                 */
                datetime?: string;
                /**
                 * 是否显示秒，默认`false`
                 *
                 * @support 仅`h5`环境下可用，仅 ejs >= 4.1.1-sp4 支持，`ejs-weex`及官方`weex`端不支持
                 */
                showSecond?: boolean;
            },
            {
                /**
                 * 选择的日期时间，示例：'2016-12-05 10:20'
                 */
                datetime: string;
                /**
                 * 选择的星期数，h5 模式下才会返回，示例：'周一'
                 */
                week?: string;
            }
        >;
        /**
         * 选择月份
         *
         * @support `v4.2.4`版本开始支持跨端框架
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- |
         * | 不支持        |      不支持       | 支持 | 支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui](http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui)
         * @example ```typescript
         *    ejs.ui.pickMonth({
         *        title: '选择月份',
         *        datetime: '2017-06',
         *        success: function (result) {
         *            console.log('日期时间', result.month);
         *        },
         *        error: function (err) {}
         *    });
         * ```
         */
        pickMonth?: APIType<
            h5UIType & {
                /**
                 * 标题，部分设备上设置标题后遮挡控件可不设置标题
                 */
                title?: string;
                /**
                 * 默认的时间，默认值为当前时间，格式为`yyyy-MM`
                 */
                datetime?: string;
                /**
                 * h5 模式下，可选时间的开始年月，格式为`yyyy-MM`
                 */
                minDate?: string;
                /**
                 * h5 模式下，可选时间的结束年月，格式为`yyyy-MM`
                 */
                maxDate?: string;
            },
            {
                /**
                 * 选择的月份，示例：'2016-06'
                 */
                month: string;
            }
        >;
        /**
         * 选择器，目前支持`1-3`级别的选择
         *
         * ejs 环境下调用实际使用的是 H5 的实现，所以需要引入 H5 端的 ejs 库。
         *
         * `ejs-weex`端用不了H5的实现，所以不支持该 API。
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- |
         * | 不支持        |      不支持       | 支持 | 支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui](http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui)
         * @example ```typescript
         *    ejs.ui.popPicker({
         *        layer: 2,
         *        data: [
         *            {
         *                value: 'value111',
         *                text: 'text111',
         *                children: [
         *                    {
         *                        value: 'value11',
         *                        text: 'text11'
         *                    },
         *                    {
         *                        value: 'value12',
         *                        text: 'text12'
         *                    }
         *                ]
         *            },
         *            {
         *                value: 'value222',
         *                text: 'text222',
         *                children: [
         *                    {
         *                        value: 'value21',
         *                        text: 'text21'
         *                    },
         *                    {
         *                        value: 'value22',
         *                        text: 'text22'
         *                    }
         *                ]
         *            }
         *        ],
         *        success: function (result) {
         *            console.log('选择的对象', result.items);
         *        },
         *        error: function (err) {}
         *    });
         * ```
         */
        popPicker?: APIType<
            h5UIType & {
                /**
                 * 层级，默认为`1`
                 */
                layer?: number;
                /**
                 * 选择器的数据，不同层次的数据格式不一样
                 */
                data: popPickerMutiData[];
            },
            {
                /**
                 * 选择的对象
                 *
                 * 格式为 `[{text: 一级xxx, value: 一级xxx}, ..., {text: N级xxx, value: n级xxx}]`
                 */
                items: popPickerElm[];
            }
        >;
        /**
         * 选择列表
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 | 官方 weex 端 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- | :----------- |
         * | 支持          |       支持        | 支持 | 支持 | 支持       | 支持         | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui](http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui)
         * @example ```typescript
         *    // 普通单选
         *    ejs.ui.select({
         *        title: '',
         *        items: ['远野贵树', '篠原明里', '澄田花苗', '立花泷', '宫水三叶'],
         *        cancelable: 1,
         *        h5UI: false,
         *        success: function (result) {
         *            console.log('选择的index', result.which);
         *            console.log('选择的内容', result.content);
         *        },
         *        error: function (err) {}
         *    });
         *    // 多选
         *    ejs.ui.select({
         *        title: '',
         *        items: ['远野贵树', '篠原明里', '澄田花苗', '立花泷', '宫水三叶'],
         *        choiceState: ['0', '0', '0', '1', '1'],
         *        isMultiSelect: 1,
         *        cancelable: 1,
         *        h5UI: false,
         *        success: function (result) {
         *            console.log('选择状态', result.choiceState);
         *            console.log('选择的内容数组', result.choiceContent);
         *        },
         *        error: function (err) {}
         *    });
         *    // 九宫格单选
         *    ejs.ui.select({
         *        title: '',
         *        items: ['远野贵树', '篠原明里', '澄田花苗', '立花泷', '宫水三叶'],
         *        type: 1,
         *        columns: 2,
         *        cancelable: 1,
         *        h5UI: false,
         *        success: function (result) {
         *            console.log('选择的index', result.which);
         *            console.log('选择的内容', result.content);
         *        },
         *        error: function (err) {}
         *    });
         * ```
         */
        select?: APIType<
            h5UIType & {
                /**
                 * 标题
                 */
                title?: string;
                /**
                 * 内容数组
                 */
                items: string[];
                /**
                 * 多选时的选中状态，只有多选时生效
                 *
                 * @support 官方 weex 端不支持
                 */
                choiceState?: string[];
                /**
                 * 是否是多选，`1`为多选，默认为`0`
                 *
                 * @support 官方 weex 端不支持
                 */
                isMultiSelect?: number;
                /**
                 * 选择类别，默认为 0。0：单列表样式；1：九宫格样式(九宫格目前只支持单选，新点小程序 2.0 不支持九宫格, ejs-weex 端同样不支持)
                 *
                 * @support 新点小程序 2.0 及 ejs-weex 端不支持九宫格, 官方 weex 端不支持该字段
                 */
                type?: number;
                /**
                 * 多选模式下，是否展示全选，默认为 0。0：不展示全选；1：展示全选
                 *
                 * @support 支持版本号 `>= 4.2.2`，官方 weex 端不支持
                 */
                isShowSelectAll?: number;
                /**
                 * 九宫格样式时的每一行的列数，默认为`2`
                 *
                 * @support 官方 weex 端不支持
                 */
                columns?: number;
                /**
                 * 点击遮罩是否可取消，为`1`为可取消，默认为`1`
                 *
                 * @support 官方 weex 端不支持
                 */
                cancelable?: number;
            },
            {
                /**
                 * 单选返回, 被点击按钮的索引值，从 0 开始
                 */
                which?: number;
                /**
                 * 单选返回, 选择的内容
                 */
                content?: string;
                /**
                 * 多选返回，每一个 item 的选择状态，示例：`['0', '0', '0', '1', '1']`
                 */
                choiceState?: string[];
                /**
                 * 多选返回，选择的内容数组，示例：`['立花泷', '宫水三叶']`
                 */
                choiceContent?: string;
            }
        >;
        /**
         * 右上角弹出窗口
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |      不支持       | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui](http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_ui)
         * @example ```typescript
         *    ejs.ui.popWindow({
         *        titleItems: ['立花泷', '宫水三叶'],
         *        iconItems: ['http://app.epoint.com.cn/staticResource/img_head.png', 'http://app.epoint.com.cn/staticResource/img_head.png'],
         *        iconFilterColor: '',
         *        success: function (result) {
         *            console.log('选择的index', result.which);
         *            console.log('选择的内容', result.content);
         *        },
         *        error: function (err) {}
         *    });
         * ```
         */
        popWindow?: APIType<
            {
                /**
                 * 标题数组
                 */
                titleItems: string[];
                /**
                 * 图片数组，只支持网络图片
                 */
                iconItems?: string[];
                /**
                 * 过滤色，默认为空，填写过滤色后，图片中非透明的地方都会变为过滤色
                 */
                iconFilterColor?: string;
            },
            {
                /**
                 * 被点击按钮的索引值，从 0 开始
                 */
                which: number;
                /**
                 * 选择的内容
                 */
                content: string;
            }
        >;
    }
}
