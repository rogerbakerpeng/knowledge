/// <reference types="@dcloudio/types" />

declare namespace EJSNamespace {
    interface deviceType {
        /**
         * 设置屏幕方向
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.setOrientation({
         *        orientation: 1,
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         *
         * @tips 微信小程序基础库版本 2.4.0 开始，支持通过 pageOrientation 字段设置屏幕旋转，具体可看官方文档: [https://developers.weixin.qq.com/miniprogram/dev/framework/view/resizable.html](https://developers.weixin.qq.com/miniprogram/dev/framework/view/resizable.html)
         */
        setOrientation?: APIType<
            {
                /**
                 * 必填，屏幕方向，1表示竖屏，0表示横屏，其他表示跟随系统,-1为跟随系统
                 */
                orientation: number;
            },
            void
        >;
        /**
         * 设置页面的缩放控件，仅在Android中生效
         *
         * @support
         * | ejs（H5 应用) |        ejs（新点小程序）        |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :-----------------------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          | 支持<br>（ejs-weex 环境不支持） | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.setZoomControl({
         *        isShow: 1,
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        setZoomControl?: APIType<
            {
                /**
                 * 是否显示页面的缩放控件，1为显示，0为隐藏，默认为0，一般配合页面的meta标签使用，需要meta开启缩放后，才会显示控件
                 */
                isShow?: number;
            },
            void
        >;
        /**
         * 设置页面是否回弹，仅在iOS中生效
         *
         * 注意：iOS版本16.0至16.1, 由于系统bug，该API不生效
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |      不支持       | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.setBounce({
         *        isEnable: 1,
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        setBounce?: APIType<
            {
                /**
                 * 默认为1代表开启，为0时会关闭回弹
                 */
                isEnable?: number;
            },
            void
        >;
        /**
         * 获取设备 ID
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉 | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :--- | :--------- | :----------- |
         * | 支持          |       支持        | 跨端框架支持 | 支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.getDeviceId({
         *        success: function (result) {
         *            console.log('设备ID', result.deviceId);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         *
         * @tips
         * ejs-Android 设备 ID 生成原理：
         * 在设备首次启动时，安卓系统会生成一个 64 位的数字（Android 8.0 及以上由系统根据应用签名密钥、用户、设备信息生成；Android 8.0 以下是由系统随机生成），并把这个数字以十六进制字符串的形式保存下来作为设备 ID，设备恢复出厂设置或重装手机系统或者 APK 签名密钥发生更改导致设备 ID 发生变化。
         *
         * ejs-iOS 设备 ID 生成原理：
         * App 首次安装会自动生成 UUID，并保存至系统钥匙串中，系统钥匙串和 App 包名绑定，设备恢复出厂设置或重装手机系统后会发生改变。
         */
        getDeviceId?: APIType<
            {},
            {
                /**
                 * 对应的设备 ID。在 非 ejs 环境下，由 uni-app 框架生成并存储，清空 Storage 会导致该 id 改变
                 */
                deviceId: string;
                /**
                 * 在非 ejs 环境下，会额外返回 uniAPI 返回的参数
                 *
                 * @support 非 ejs 环境支持
                 */
                uniparams?: UniApp.GetSystemInfoResult;
            }
        >;
        /**
         * 获取设备 Mac 地址，仅 Android 中能用
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.getMacAddress({
         *        success: function (result) {
         *            console.log('设备 Mac 地址', result.macAddress);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getMacAddress?: APIType<
            {},
            {
                /**
                 * 对应的 mac 地址
                 */
                macAddress: string;
            }
        >;
        /**
         * 获取屏幕像素信息
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.getScreenInfo({
         *        success: function (result) {
         *            console.log('屏幕像素信息', result.pixel);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getScreenInfo?: APIType<
            {},
            {
                /**
                 * 屏幕的像素信息，宽高以*分隔，示例：1080*1920
                 */
                pixel: string;
            }
        >;
        /**
         * 获取网络状态
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉 | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :--- | :--------- | :----------- |
         * | 支持          |       支持        | 跨端框架支持 | 支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.getNetWorkInfo({
         *        success: function (result) {
         *            console.log('网络状态', result.netWorkType);
         *            console.log('设备 ip', result.ip);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getNetWorkInfo?: APIType<
            {},
            {
                /**
                 * 网络状态，1代表wifi,0代表移动网络，-1代表无网络
                 */
                netWorkType: number;
                /**
                 * 当前设备 ip
                 *
                 * @support 仅 ejs 及钉钉平台支持
                 */
                ip?: string;
                /**
                 * 在 非 ejs 环境下，会额外返回 uniAPI 返回的参数
                 *
                 * @support 非 ejs 环境支持
                 */
                uniparams?: UniApp.GetNetworkTypeSuccess;
            }
        >;
        /**
         * 获取设备厂商信息，同时将设备其它信息也一起返回
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉         | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :----------- | :--------- | :----------- |
         * | 支持          |       支持        | 跨端框架支持 | 跨端框架支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.getVendorInfo({
         *        success: function (result) {
         *            console.log('设备厂商信息', result);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getVendorInfo?: APIType<
            {},
            {
                /**
                 * 网络状态，1代表wifi,0代表移动网络，-1代表无网络
                 */
                netWorkType: number;
                /**
                 * 对应的设备唯一 ID
                 */
                deviceId: string;
                /**
                 * 屏幕的像素信息，宽高以*分隔
                 *
                 * @support 非 ejs 环境不支持
                 */
                pixel?: string;
                /**
                 * 厂商信息
                 *
                 * @support 非 ejs 或 h5 环境不支持
                 */
                uaInfo?: string;
                /**
                 * 在非 ejs 环境下，会额外返回 uniAPI 返回的参数
                 *
                 * @support 非 ejs 环境支持
                 */
                uniparams?: UniApp.GetNetworkTypeSuccess & UniApp.GetSystemInfoResult;
            }
        >;
        /**
         * 判断设备是否是平板
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.isTablet({
         *        success: function (result) {
         *            console.log('设备是否是平板', result.isTablet);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        isTablet?: APIType<
            {},
            {
                /**
                 * 0代表非平板，1代表平板
                 */
                isTablet: number;
            }
        >;
        /**
         * 拨打电话
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :--: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.callPhone({
         *        phoneNum: '182xxxxxxxx',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         *    // 兼容快速调用
         *    ejs.device.callPhone('182xxxxxxxx');
         * ```
         */
        callPhone?: APIStrType<
            {
                /**
                 * 需要拨打的电话号码
                 */
                phoneNum: string;
            },
            void,
            [
                /**
                 * 需要拨打的电话号码
                 */
                string
            ],
            false
        >;
        /**
         * 发送短信
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :--: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.sendMsg({
         *        phoneNum: '182xxxxxxxx',
         *        message: 'hello',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         *    // 兼容快速调用
         *    ejs.device.sendMsg('182xxxxxxxx', 'hello');
         * ```
         */
        sendMsg?: APIStrType<
            {
                /**
                 * 目标的电话号码
                 */
                phoneNum: string;
                /**
                 * 短信内容
                 */
                message: string;
            },
            void,
            [
                /**
                 * 目标的电话号码
                 */
                string,
                /**
                 * 短信内容
                 */
                string
            ],
            false
        >;
        /**
         * 发送给其他 app、系统分享功能。一般图片三种方式选一种即可。
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.sendTo({
         *        title: '测试标题',
         *        url: 'http://www.liantu.com/',
         *        imgBase64: '',
         *        imgURL: '',
         *        sdPath: '',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         *
         * @tips
         *
         * 在不同平台，分享的调用方式和逻辑有较大差异:
         *
         * 1. 小程序：不支持 API 调用，只能用户主动点击触发分享。可使用自定义按钮方式 <button open-type="share"> 或监听系统右上角的分享按钮 onShareAppMessage 进行自定义分享内容。
         *
         * 2. H5：如果是普通浏览器，浏览器自带分享按钮；如果是在微信内嵌浏览器中，可调用 js-sdk 进行分享，[参考](https://ask.dcloud.net.cn/article/35380)。
         */
        sendTo?: APIType<
            {
                /**
                 * 标题
                 */
                title?: string;
                /**
                 * 链接的 url
                 */
                url: string;
                /**
                 * 图片的 base64
                 */
                imgBase64?: string;
                /**
                 * 图片的 URL 地址
                 */
                imgURL?: string;
                /**
                 * 图片在 SD 卡内部的路径
                 */
                sdPath?: string;
            },
            void
        >;
        /**
         * 关闭输入法软键盘，如果已经打开，则关闭
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 跨端框架支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.closeInputKeyboard({
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        closeInputKeyboard?: APIType<{}, void>;
        /**
         * 调用原生的震动功能
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉 | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :--- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 支持 | 不支持     | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.vibrate({
         *        duration: 200,
         *        success: function () {},
         *        error: function (error) {}
         *    });
         *    // 支持快速调用
         *    ejs.device.vibrate(200);
         * ```
         */
        vibrate?: APIStrType<
            {
                /**
                 * 震动的持续时间，单位是毫秒，默认是`200`。
                 *
                 * @support 只在`Android`中有用，`iOS`中请忽略。该参数仅在 ejs 和钉钉环境中有效
                 */
                duration?: number;
            },
            void,
            [
                /**
                 * 震动的持续时间，单位是毫秒，默认是`200`。
                 *
                 * @support 只在`Android`中有用，`iOS`中请忽略。该参数仅在 ejs 和钉钉环境中有效
                 */
                number?
            ],
            false
        >;
        /**
         * 原生摇一摇功能
         */
        shake?: {
            /**
             * 开启原生摇一摇功能。开启后，原生每次摇一摇成功都会进入回调
             *
             * @support
             * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉   | 微信小程序 | 支付宝小程序 |
             * | :------------ | :---------------: | :----------: | :----- | :--------- | :----------- |
             * | 支持          |       支持        | 跨端框架支持 | 不支持 | 支持       | 支持         |
             *
             * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
             * @example ```typescript
             *    ejs.device.shake.enable({
             *     success: function () {},
             *     error: function (error) {}
             *    });
             * ```
             */
            enable: APIType<{}, void>;
            /**
             * 关闭原生摇一摇功能
             *
             * @support
             * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉   | 微信小程序 | 支付宝小程序 |
             * | :------------ | :---------------: | :----------: | :----- | :--------- | :----------- |
             * | 支持          |       支持        | 跨端框架支持 | 不支持 | 支持       | 支持         |
             *
             * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
             * @example ```typescript
             *    ejs.device.shake.disable({
             *        success: function () {},
             *        error: function (error) {}
             *    });
             * ```
             */
            disable: APIType<{}, void>;
        };
        /**
         * 检查权限是否存在
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(3.1.5)   |    支持(3.1.5)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.checkPermissions({
         *        permissionsType: 0,
         *        success: function (result) {
         *            console.log('权限是否存在', result.permissionGranted);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        checkPermissions?: APIType<
            {
                /**
                 * 权限类别，默认为`0`。可选值为：
                 *
                 * | 值  | 对应权限             |
                 * | :-- | :------------------- |
                 * | `0` | location（定位）     |
                 * | `1` | storage（存储）      |
                 * | `2` | phone（电话）        |
                 * | `3` | camera（拍照）       |
                 * | `4` | sms（短信）          |
                 * | `5` | contacts（通讯录）   |
                 * | `6` | microphone（麦克风） |
                 */
                permissionsType?: number;
            },
            {
                /**
                 * 是否有权限，`1`为有权限，`0`为无权限
                 */
                permissionGranted: number;
            }
        >;
        /**
         * 申请特定权限
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(3.1.5)   |    支持(3.1.5)    | 不支持 | 不支持 | 支持       | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.requestPermissions({
         *        permissionsType: 0,
         *        success: function (result) {
         *            console.log('权限申请结果', result.resultData);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         *
         * @tips
         * 微信小程序端查询定位权限需要在 `manifest.json` 配置 `permission`字段
         * ```typescript
         * {
         *     "name": "",
         *     "appid": "",
         *     "mp-weixin": {
         *         "permission": {
         *             "scope.userLocation": {
         *                 "desc": "你的位置信息将用于小程序位置接口的效果展示"
         *             }
         *         }
         *     }
         * }
         * ```
         */
        requestPermissions?: APIType<
            {
                /**
                 * 权限类别，默认为`0`。可选值为：
                 *
                 * | 值  | 对应权限             |
                 * | :-- | :------------------- |
                 * | `0` | location（定位）     |
                 * | `1` | storage（存储）      |
                 * | `2` | phone（电话）        |
                 * | `3` | camera（拍照）       |
                 * | `4` | sms（短信）          |
                 * | `5` | contacts（通讯录）   |
                 * | `6` | microphone（麦克风） |
                 */
                permissionsType: number;
            },
            {
                /**
                 * 申请权限的结果，`0`为申请权限时点了允许，`1`为申请权限时点了拒绝，`2`为由于以前申请权限时点了拒绝并选择不再提示，所以默认拒绝
                 *
                 * @support 仅 ejs 环境下支持，非 ejs 环境默认不再提示
                 */
                resultData?: number;
            }
        >;
        /**
         * 调用原生的蜂鸣功能
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(3.4.0)   |    支持(3.4.0)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.beep({
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        beep?: APIType<{}, void>;
        /**
         * 跳转至应用的权限设置界面
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(3.4.0)   |    支持(3.4.0)    | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.goAppSetting({
         *        success: function (result) {
         *            console.log('用户授权结果', result.authSetting);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        goAppSetting?: APIType<
            {},
            {
                /**
                 * 用户授权结果，其中 key 为 scope 值，value 为 Boolean 值，表示用户是否允许授权
                 *
                 * @support 仅其他厂商小程序平台会返回该参数
                 */
                authSetting?: {
                    /**
                     * 用户信息
                     */
                    'scope.userInfo'?: boolean;
                    /**
                     * 地理位置
                     */
                    'scope.userLocation'?: boolean;
                    /**
                     * 后台定位
                     *
                     * @support 仅微信小程序支持
                     */
                    'scope.userLocationBackground'?: boolean;
                    /**
                     * 通信地址
                     */
                    'scope.address'?: boolean;
                    /**
                     * 录音功能
                     */
                    'scope.record'?: boolean;
                    /**
                     * 保存到相册
                     */
                    'scope.writePhotosAlbum'?: boolean;
                    /**
                     * 摄像头
                     */
                    'scope.camera'?: boolean;
                    /**
                     * 获取发票
                     *
                     * @support 仅微信小程序支持
                     */
                    'scope.invoice'?: boolean;
                    /**
                     * 发票抬头
                     *
                     * @support 仅微信小程序支持
                     */
                    'scope.invoiceTitle'?: boolean;
                    /**
                     * 微信运动步数
                     *
                     * @support 仅微信小程序支持
                     */
                    'scope.werun'?: boolean;
                };
            }
        >;
        /**
         * 设置是否允许系统截屏，仅在`Android`中生效
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(3.4.0)   |    支持(3.4.0)    | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.setEnableShot({
         *        isEnableShot: 0,
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        setEnableShot?: APIType<
            {
                /**
                 * 是否允许系统截屏，默认`0`不允许，`1`为允许
                 */
                isEnableShot?: number;
            },
            void
        >;
        /**
         * 获取系统信息：包含设备 OS 类型、设备版本、设备名称
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉         | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :----------- | :--------- | :----------- |
         * | 支持(3.4.2)   |    支持(3.4.2)    | 跨端框架支持 | 跨端框架支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.getDeviceInfo({
         *        success: function (result) {
         *            console.log('设备名称', result.deviceName);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getDeviceInfo?: APIType<
            {},
            {
                /**
                 * 设备名称
                 *
                 * @support 非 ejs 环境不支持
                 */
                deviceName?: string;
                /**
                 * 设备平台类型，可选值：iOS、android
                 */
                osType: string;
                /**
                 * 系统版本
                 */
                osVersion: string;
                /**
                 * deviceID, 在 非 ejs 环境下，由 uni-app 框架生成并存储，清空 Storage 会导致该 id 改变
                 */
                deviceID: string;
                /**
                 * 原生顶部状态栏高度
                 */
                statusBarHeight: number;
                /**
                 * 在 非 ejs 环境下，会额外返回 uniAPI 返回的参数
                 *
                 * @support 非 ejs 环境支持
                 */
                uniparams?: UniApp.GetSystemInfoResult;
            }
        >;
        /**
         * 检测手机上是否安装虚拟定位软件（仅 Andriod）
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(4.0.0)   |    支持(4.0.0)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_device)
         * @example ```typescript
         *    ejs.device.isHasVirtualPosApp({
         *        success: function (result) {
         *            console.log('是否安装', result.result);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        isHasVirtualPosApp?: APIType<
            {},
            {
                /**
                 * '1'：未安装，安全，'0'：安装了，不安全
                 */
                result: string;
                /**
                 * 应用名称，不安全时返回
                 */
                appname?: string;
                /**
                 * 包名，不安全时返回
                 */
                packagename?: string;
            }
        >;
    }
}
