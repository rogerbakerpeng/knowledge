declare namespace EJSNamespace {
    interface utilType {
        /**
         * 打开二维码扫描
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util)
         * @example ```typescript
         *    ejs.util.scan({
         *        showHistory: 0,
         *        success: function (result) {
         *            console.log('扫描后的结果', result.resultData);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        scan?: APIType<
            {
                /**
                 * `0`不显示历史记录，`1`显示历史记录，默认`0`
                 *
                 * @support EJS 原生支持版本: `v7.4 >= 3.4.0`。仅 ejs 支持，新点小程序2.0不再支持
                 */
                showHistory?: number;
                /**
                 * `0`底座处理扫描结果， `1`H5 处理扫描结果，默认 `1`
                 *
                 * @support EJS 原生支持版本: `v7.4 >= 3.4.2` `v7.3 >= 3.2.9.a`。仅 ejs 支持，新点小程序2.0不再支持
                 */
                needResult?: number;
            },
            {
                /**
                 * 二维码扫描后解析出的字符串
                 */
                resultData: string;
            }
        >;
        /**
         * 采用原生播放器播放视频
         *
         * 需要跨端播放视频时，建议使用 video 组件，及 Util.createVideoContext 方法进行视频播放。
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util)
         * @example ```typescript
         *    ejs.util.playVideo({
         *        videoUrl: 'http://app.epoint.com.cn/staticResource/video_demo.mp4',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        playVideo?: APIType<
            {
                /**
                 * `必填`，视频地址
                 *
                 * 注意： `videoUrl` 的值必须为设备本机地址或者带后缀的视频地址，无法播放接口请求的附件地址
                 */
                videoUrl: string;
            },
            void
        >;
        /**
         * 从相册中选择图片
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 跨端框架支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util)
         * @example ```typescript
         *    ejs.util.selectImage({
         *        photoCount: 9,
         *        showGif: 0,
         *        previewEnabled: 1,
         *        selectedPhotos: ['/storage/emulated/0/DCIM/Camera/IMG_20170703_133717.jpg'],
         *        showCamera: 0,
         *        success: function (result) {
         *            console.log('选择的图片', result.resultData);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        selectImage?: APIType<
            {
                /**
                 * 选择图片的最大允许数量，默认为`9`
                 *
                 * 该值在 H5 平台的表现，基于浏览器本身的规范。目前测试的结果来看，只能限制单选/多选，并不能限制数量。并且，在实际的手机浏览器很少有能够支持多选的。
                 */
                photoCount?: number;
                /**
                 * 是否允许选择`gif`图，`1`为显示，`0`为不显示，默认为`0`
                 *
                 * @support 仅 ejs 支持
                 */
                showGif?: number;
                /**
                 * 是否允许预览图片，`1`为允许，`0`为不允许，默认为`1` ，仅在`Android`中生效，iOS 默认预览图片
                 *
                 * @support 仅 ejs 支持
                 */
                previewEnabled?: number;
                /**
                 * 已选的图片数组(本地路径)，传了后，对应路径的图片会变为选择状态
                 *
                 * @support EJS-Android 支持(新点小程序2.0暂不支持)
                 */
                selectedPhotos?: string[];
                /**
                 * EJS`3.4.0`新增参数 是否允许拍照，`1`为允许，`0`为不允许，默认为`0`
                 *
                 * 该值在 H5 平台根据浏览器的不同而表现不同，一般不可限制仅使用相册，部分浏览器也无法限制是否使用相机。
                 */
                showCamera?: number;
            },
            {
                /**
                 * 返回图片的本地路径数组
                 *
                 * H5 端及其他小程序平台返回的是临时路径
                 */
                resultData: string[];
                /**
                 * 图片的本地文件列表，每一项是一个 File 对象
                 *
                 * @support 仅 H5 、微信小程序、支付宝小程序支持
                 */
                tempFiles?: any[];
            }
        >;
        /**
         * 拍照获取图片
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 跨端框架支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util)
         * @example ```typescript
         *    ejs.util.cameraImage({
         *        width: 720,
         *        quality: 70,
         *        defaultCamera: '0',
         *        success: function (result) {
         *            console.log('拍照图片路径', result.resultData);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        cameraImage?: APIType<
            {
                /**
                 * 照片的宽度，默认为`720`
                 *
                 * @support 仅 ejs 支持，安卓无效
                 */
                width?: number;
                /**
                 * 照片的压缩质量，百分比，默认为`70`
                 *
                 * @support 仅 ejs 支持，安卓无效
                 */
                quality?: number;
                /**
                 * 拍照时默认打开后置摄像头，`'1'`表示默认打开前置摄像头，默认为`'0'`
                 *
                 * @support 仅`ejs >= 3.2.7`支持
                 */
                defaultCamera?: string;
            },
            {
                /**
                 * 返回图片的本地路径
                 *
                 * H5 及其他小程序端返回的是临时路径
                 */
                resultData: string;
                /**
                 * 返回图片的本地文件对象
                 *
                 * @support 仅 H5 及其他小程序端支持
                 */
                tempFile?: any;
            }
        >;
        /**
         * 录制视频
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :----- | :--------- | :----------- |
         * | 支持（3.1.2） |   支持（3.1.2）   | 跨端框架支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util)
         * @example ```typescript
         *    ejs.util.recordVideo({
         *        maxDuration: 120,
         *        success: function (result) {
         *            console.log('录制的视频路径', result.resultData);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        recordVideo?: APIType<
            {
                /**
                 * 视频录制允许的最大长度，单位为秒
                 *
                 * @support 仅 ejs、微信小程序、支付宝小程序端支持，ejs 端最大可为 120 秒，微信端最大可为 60 秒
                 */
                maxDuration?: number;
            },
            {
                /**
                 * 返回视频的本地路径
                 *
                 * H5、微信和支付宝端返回的都是临时路径
                 */
                resultData: string;
            }
        >;
        /**
         * 预览图片
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉         | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :----------- | :--------- | :----------- |
         * | 支持          |       支持        | 跨端框架支持 | 跨端框架支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util)
         * @example ```typescript
         *    ejs.util.prevImage({
         *        index: 0,
         *        selectedPhotos: [
         *            'http://img4.duitang.com/uploads/item/201508/10/20150810161432_5ujhU.thumb.224_0.jpeg',
         *            'http://img4.duitang.com/uploads/item/201508/10/20150810161432_5ujhU.thumb.224_0.jpeg'
         *        ],
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        prevImage?: APIType<
            {
                /**
                 * 初始显示的图片序号，默认为`0`代表显示第一张图片
                 */
                index?: number;
                /**
                 * 需要被预览的图片数组，只支持网络路径(`http`等开头)
                 */
                selectedPhotos: string[];
            },
            void
        >;
        /**
         * 获取在线预览的地址头部
         *
         * 一个第三方在线预览插件的 http 地址头部，每一个项目可能都不一样
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util)
         * @example ```typescript
         *    ejs.util.getPreviewUrl({
         *        success: function (result) {
         *            console.log('获取的预览地址头部', result.previewUrl);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getPreviewUrl?: APIType<
            {},
            {
                /**
                 * 预览地址
                 */
                previewUrl: string;
                /**
                 * 需要被替换掉的地址字符串
                 *
                 * `3.2.7`版本新增内网预览：如果 repalceurl 有值，则 previewUrl 字符串中将 repalceurl 部分替换成 previebnwurl
                 */
                repalceurl?: string;
                /**
                 * 将 repalceurl 部分替换成 previebnwurl
                 *
                 * `3.2.7`版本新增内网预览：如果 repalceurl 有值，则 previewUrl 字符串中将 repalceurl 部分替换成 previebnwurl
                 */
                previebnwurl?: string;
            }
        >;
        /**
         * 进入通用搜索页面
         *
         * 会打开一个原生页面，搜索完毕后，回到本页面时触发回调（类似于`openLocal`）
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util)
         * @example ```typescript
         *    ejs.util.goSearch({
         *        searchType: '',
         *        conditions: '',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        goSearch?: APIType<
            {
                /**
                 * 搜索类别
                 */
                searchType?: string;
                /**
                 * 搜索条件
                 */
                conditions?: string;
            },
            void
        >;
        /**
         * 字符串生成二维码
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持（3.1.8） |   支持（3.1.8）   | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util)
         * @example ```typescript
         *    ejs.util.createQRCode({
         *        qrCodeStr: 'https://fe.epoint.com.cn/ejsdoc/index/index.php#page=changelog',
         *        size: 200,
         *        success: function (result) {
         *            console.log('生成的二维码', result.img);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        createQRCode?: APIType<
            {
                /**
                 * `必填`，要生成二维码的字符串
                 */
                qrCodeStr: string;
                /**
                 * 生成二维码的大小，范围在`200`-`2000`，默认值为 `200`, 注意：100 的倍数生成的二维码无白边框
                 */
                size?: number;
            },
            {
                /**
                 * 生成的二维码图片Base64
                 */
                img: string;
            }
        >;
        /**
         * 将二维码图片的 `base64` 或 `本地路径` 或 `图片网络路径`解析成字符串
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持（3.1.8） |   支持（3.1.8）   | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util)
         * @example ```typescript
         *    ejs.util.recognizeQRCode({
         *        imgPath: '',
         *        imgBase64: '',
         *        success: function (result) {
         *            console.log('解析出来的字符串', result.corePath);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        recognizeQRCode?: APIType<
            {
                /**
                 * `选填`，二维码图片的 `本地路径`。
                 *
                 * iOSEJS 组件`3.2.6e`、安卓 EJS 组件`3.2.6g`版本支持传参图片为`网络路径`
                 */
                imgPath?: string;
                /**
                 * `选填`，二维码图片的 `base64`
                 */
                imgBase64?: string;
            },
            {
                /**
                 * 解析后的字符串
                 */
                corePath: string;
            }
        >;
        /**
         * 调用组件 API
         *
         * [原生组件 API 文档](https://fdoc.epoint.com.cn/onlinedoc/rest/d/MZbEb2)
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持（3.2.0） |   支持（3.2.0）   | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util)
         * @example ```typescript
         *    ejs.util.invokePluginApi({
         *        path: 'contact.provider.localOperation',
         *        dataMap: {
         *            method: 'getOUAndUserList',
         *            ouguid: ouguid
         *        },
         *        appVersion: '',
         *        success: function (result) {},
         *        error: function (err) {}
         *    });
         * ```
         */
        invokePluginApi?: APIType<
            {
                /**
                 * `必填`，调用 `API` 的 `PATH`
                 *
                 * 参考 [原生组件 API 文档](https://fdoc.epoint.com.cn/onlinedoc/rest/d/MZbEb2)
                 */
                path: string;
                /**
                 * `必填`，`API` 的调用参数
                 *
                 * 参考 [原生组件 API 文档](https://fdoc.epoint.com.cn/onlinedoc/rest/d/MZbEb2)
                 */
                dataMap: object;
                /**
                 * `选填`，用于容器组件版本校验
                 */
                appVersion?: string;
            },
            any
        >;
        /**
         * 对字符串进行框架默认加密
         *
         * 除 EJS 平台外使用该 API 前，需引入 crypto-js 库。跨端框架需将其设为全局函数
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |     H5      | 钉钉        | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :---------: | :---------- | :--------- | :----------- |
         * | 支持（3.2.3） |   支持（3.2.3）   | 支持(3.2.3) | 支持(3.2.3) | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util)
         * @example ```typescript
         *    ejs.util.encrypt({
         *        type: '1',
         *        keys: ['qnbpwgttcfv96fgwq8ya0hj5sm50e1f0', '1234567890123456'],
         *        text: 'epoint12345',
         *        success: function (result) {
         *            console.log('加密过后的密文', result.text);
         *        },
         *        error: function () {}
         *    });
         * ```
         */
        encrypt?: APIType<
            {
                /**
                 * `可选`，值为 `1` 使用 AES 加密，`0` 为不使用加密， 默认根据原生系统配置逻辑
                 *
                 * @tips
                 * 当传入 `type` 时，对应的 `keys` 也必须传值，否则加密无效，同样，当传入 `keys` 时，`type` 也必须传值。
                 *
                 * H5 端 AES 加密需要 EJS 版本`>3.2.6c`，必须传参`type`和`keys`参数，H5 页面需要自行引用 [aes.js](http://app.epoint.com.cn/ejsdoc/js/libs/aes.js#) 文件
                 */
                type?: string;
                /**
                 * `可选`，加密参数
                 *
                 * @tips
                 * 当传入 `type` 时，对应的 `keys` 也必须传值，否则加密无效，同样，当传入 `keys` 时，`type` 也必须传值。
                 *
                 * H5 端 AES 加密需要 EJS 版本`>3.2.6c`，必须传参`type`和`keys`参数，H5 页面需要自行引用 [aes.js](http://app.epoint.com.cn/ejsdoc/js/libs/aes.js#) 文件
                 */
                keys?: string[];
                /**
                 * `必填`，需要加密的字符串
                 */
                text: string;
            },
            {
                /**
                 * 加密过后的密文
                 */
                text: string;
            }
        >;
        /**
         * 对字符串进行框架默认解密
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持（3.4.0） |   支持（3.4.0）   | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util)
         * @example ```typescript
         *    ejs.util.decrypt({
         *        type: '1',
         *        keys: ['qnbpwgttcfv96fgwq8ya0hj5sm50e1f0', '1234567890123456'],
         *        text: 'voxzdeEdmlw+jSoFuGB8Ww==',
         *        success: function (result) {
         *            console.log('解密过后的密文', result.text);
         *        },
         *        error: function () {}
         *    });
         * ```
         */
        decrypt?: APIType<
            {
                /**
                 * `可选`，值为 `1` 使用框架解密，`0` 为不使用解密，默认为 `1`
                 *
                 * @tips
                 * 当传入 `type` 时，对应的 `keys` 也必须传值，否则解密无效，同样，当传入 `keys` 时，`type` 也必须传值。
                 */
                type?: string;
                /**
                 * `可选`，解密参数
                 *
                 * @tips
                 * 当传入 `type` 时，对应的 `keys` 也必须传值，否则解密无效，同样，当传入 `keys` 时，`type` 也必须传值。
                 */
                keys?: string[];
                /**
                 * `必填`，需要解密的字符串
                 */
                text: string;
            },
            {
                /**
                 * 解密过后的密文
                 */
                text: string;
            }
        >;
        /**
         * 从相册中选择视频
         *
         * @support EJS 前端支持版本为`>= 3.4.1b`, EJS 原生支持版本为`Android && iOS >= 3.2.8.a`
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- |
         * | 支持          |       支持        | 支持 | 支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util)
         * @example ```typescript
         *    ejs.util.selectVideo({
         *        videoCount: 1,
         *        success: function (result) {
         *            console.log('选择的视频路径', result.resultData);
         *        },
         *        error: function () {}
         *    });
         * ```
         */
        selectVideo?: APIType<
            {
                /**
                 * `可选`， 选择视频的最大允许数量，默认为`1`
                 *
                 * @support 仅 ejs 支持
                 */
                videoCount?: number;
            },
            {
                /**
                 * 返回视频的本地路径
                 *
                 * H5、微信和支付宝端返回的都是临时路径
                 */
                resultData: string[];
            }
        >;
        /**
         * 保存图片至系统相册
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        |      不支持       | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util)
         * @example ```typescript
         *    ejs.util.saveImageToPhotosAlbum({
         *        filePath: '/storage/emulated/0/DCIM/Camera/IMG_20170703_133717.jpg',
         *        success: function () {},
         *        error: function () {}
         *    });
         * ```
         */
        saveImageToPhotosAlbum?: APIType<
            {
                /**
                 * `必填`，图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
                 */
                filePath: string;
            },
            void
        >;
        /**
         * 保存视频至系统相册
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        |      不支持       | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_util)
         * @example ```typescript
         *    ejs.util.saveVideoToPhotosAlbum({
         *        filePath: '/storage/emulated/0/com.epoint.workplatform/kfld/Temp/20171215112129.mp4',
         *        success: function () {},
         *        error: function () {}
         *    });
         * ```
         */
        saveVideoToPhotosAlbum?: APIType<
            {
                /**
                 * `必填`，视频文件路径，可以是临时文件路径也可以是永久文件路径
                 */
                filePath: string;
            },
            void
        >;
    }
}
