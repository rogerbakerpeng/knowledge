declare namespace EJSNamespace {
    interface ioType {
        /**
         * 下载文件
         *
         * EJS 默认下载地址`sdk路径/epointapp7/xxx`，H5 端为本地临时路径。
         *
         * 在各个小程序平台运行时，网络相关的 API 在使用前需要配置域名白名单。在 h5 上是跨域的，用户需要处理好跨域问题。
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :----- | :--------- | :----------- |
         * | 支持(3.1.2)   |    支持(3.1.2)    | 跨端框架支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io)
         * @example ```typescript
         *    ejs.io.downloadFile({
         *        url: 'http://app.epoint.com.cn/staticResource/img_head.png',
         *        fileName: 'img_head.png',
         *        reDownloaded: 0,
         *        success: function (result) {
         *            console.log('文件本地路径', result.filePath);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        downloadFile: APIType<
            {
                /**
                 * `必填`，下载文件的地址
                 */
                url: string;
                /**
                 * EJS 端`必填`，下载文件的名称
                 *
                 * @support 仅 ejs 支持
                 */
                fileName?: string;
                /**
                 * 当已经下载过时，是否重新下载，为`0`代表已经存在时会直接打开，为`1`代表会重新下载文件并重命名，默认为`0`
                 *
                 * @support 仅 ejs 支持
                 */
                reDownloaded?: number;
                /**
                 * 是否在后台下载，如果为1，则静默后台下载，否则为0时会专门跳到一个下载页面，默认为1
                 *
                 * @support 仅 ejs 支持
                 */
                isBackground?: number;
                /**
                 * 仅在后台静默下载时有用，请慎重使用，如果有参数(譬如为1)，代表下载后强制打开，默认请不要传递
                 *
                 * @support 仅 ejs 支持
                 */
                openAfterComplete?: number;
                /**
                 * EJS3.4.0新增，是否自动打开下载文件，1自动打开，默认为0
                 *
                 * @support 仅 ejs、微信小程序、支付宝小程序支持，支付宝小程序仅支持打开图片和 pdf 文件
                 */
                autoStart?: number;
                /**
                 * 文件预览地址，若不传此参数，则不显示预览按钮
                 *
                 * @support 仅 ejs 支持
                 */
                previewUrl?: string;
                /**
                 * 指定文件下载后存储的路径 (本地路径)
                 *
                 * @support 仅微信小程序支持（IOS 小程序保存到相册需要添加此字段才可以正常保存）
                 */
                filePath?: string;
            },
            {
                /**
                 * 返回的文件本地路径，H5 端为本地临时路径，注意isBackground为0时，会跳转下载页面，此时不会返回该参数
                 */
                filePath?: string;
            }
        >;
        /**
         * 选择文件，主要用于选择非媒体文件。
         *
         * 注：微信小程序不支持拉起本地文件目录，该 API 仅能获取微信聊天里的文件。
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :----- | :--------- | :----------- |
         * | 支持(3.1.2)   |    支持(3.1.2)    | 跨端框架支持 | 不支持 | 支持       | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io)
         * @example ```typescript
         *    ejs.io.selectFile({
         *        multi: 0,
         *        success: function (result) {
         *            console.log('单选选择文件', result.resultData);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        selectFile?: APIType<
            {
                /**
                 * 是否为多选模式。 `1`：多选；`0`：单选（默认）
                 *
                 * @support ejs 组件版本 v3.2.7.e 后支持
                 */
                multi?: number;
                /**
                 * 多选时，最大可选数量，默认 999
                 *
                 * @support 仅微信小程序支持
                 */
                count?: number;
            },
            {
                /**
                 * 返回文件的本地路径, 微信端返回的是临时路径
                 */
                resultData: string | string[];
                /**
                 * 返回本地文件列表
                 *
                 * @support 仅 H5 端和微信端支持，H5 端每一项是一个 File 对象，微信端是一个普通对象
                 */
                tempFiles?: any[];
            }
        >;
        /**
         * 打开本地文件
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(3.1.2)   |    支持(3.1.2)    | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io)
         * @example ```typescript
         *    ejs.io.openFile({
         *        path: '/storage/emulated/0/DCIM/Camera/IMG_20170703_133717.jpg',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        openFile?: APIType<
            {
                /**
                 * `必填`，需要被打开的本地文件路径，`/storage`开头的这种
                 *
                 * 支付宝端只支持打开 pdf 及图片
                 */
                path: string;
            },
            void
        >;
        /**
         * 重命名文件
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(3.1.2)   |    支持(3.1.2)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io)
         * @example ```typescript
         *    ejs.io.renameFile({
         *        path: '/storage/emulated/0/DCIM/Camera/IMG_20170703_133717.jpg',
         *        newName: 'IMG_20170703_133718',
         *        newSuffix: 'jpg',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        renameFile?: APIType<
            {
                /**
                 * `必填`，需要被重命名的本地文件路径，`/storage`开头的这种
                 */
                path: string;
                /**
                 * `必填`，新的名称，不包含后缀
                 */
                newName: string;
                /***
                 * 新的后缀，注意，**如果不想改变后缀，请不要传这个参数**
                 */
                newSuffix?: string;
            },
            void
        >;
        /**
         * 复制一个文件到新路径，复制后原有文件会保留
         *
         * 注意，前提是对原生路径比较熟悉，而且 Android 与 iOS 有差异
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(3.1.2)   |    支持(3.1.2)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io)
         * @example ```typescript
         *    ejs.io.copyFile({
         *        path: '/storage/emulated/0/DCIM/Camera/IMG_20170703_133717.jpg',
         *        newPath: '/storage/emulated/0/DCIM/Camera2/IMG_20170703_133717.jpg',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        copyFile?: APIType<
            {
                /**
                 * `必填`，需要被复制的本地文件路径，`/storage`开头的这种
                 */
                path: string;
                /**
                 * `必填`，新的路径地址，一样需要完整的路径
                 */
                newPath: string;
            },
            void
        >;
        /**
         * 删除一个本地文件
         *
         * 微信和支付宝小程序端仅支持删除本地存储的文件
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(3.1.2)   |    支持(3.1.2)    | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io)
         * @example ```typescript
         *    ejs.io.deleteFile({
         *        path: '/storage/emulated/0/DCIM/Camera/IMG_20170703_133717.jpg',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        deleteFile?: APIType<
            {
                /**
                 * `必填`，需要被删除的本地文件路径
                 */
                path: string;
            },
            void
        >;
        /**
         * 获取本地图片大小
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |      H5      | 钉钉         | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----------: | :----------- | :--------- | :----------- |
         * | 支持(3.1.7)   |    支持(3.1.7)    | 跨端框架支持 | 跨端框架支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io)
         * @example ```typescript
         *    ejs.io.getFileSize({
         *        path: '/storage/emulated/0/DCIM/Camera/IMG_20170703_133717.jpg',
         *        success: function (result) {
         *            console.log('图片大小', result.size);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        getFileSize?: APIType<
            {
                /**
                 * `必填`，本地图片路径
                 */
                path: string;
            },
            {
                /**
                 * 返回文件的大小，以字节`b`为单位
                 */
                size: number;
            }
        >;
        /**
         * 截屏
         *
         * @support
         * | ejs（H5 应用) |            ejs（新点小程序）            |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :-------------------------------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(3.2.5a)  | 支持(3.2.5a)<br>（ejs-weex 环境不支持） | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io)
         * @example ```typescript
         *    ejs.io.screenShot({
         *        captureType: 1,
         *        success: function (result) {
         *            console.log('图片本地路径', result.picPath);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        screenShot?: APIType<
            {
                /**
                 * 0：截当前屏幕，1：长截图 默认：长截图
                 */
                captureType?: number;
            },
            {
                /**
                 * 截屏后返回图片的本地路径
                 */
                picPath: string;
            }
        >;
        /**
         * 埋点统计
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(4.0.0)   |    支持(4.0.0)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io)
         * @example ```typescript
         *    ejs.io.report({
         *        url: '地址',
         *        responsetime: '响应时间(毫秒)',
         *        request: '请求内容',
         *        response: '响应内容',
         *        belong: '0',
         *        successorfail: '0',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        report?: APIType<
            {
                /**
                 * url 地址
                 */
                url?: string;
                /**
                 * 响应时间(毫秒)
                 */
                responsetime?: string;
                /**
                 * 请求内容（请求出错才有）
                 */
                request?: string;
                /**
                 * 响应内容（请求出错才有）
                 */
                response?: string;
                /**
                 * 网络请求是来自小程序/H5/容器的标识, `0`容器，`1`小程序，`2`H5
                 */
                belong?: string;
                /**
                 * 成功或者失败标示，'0'失败，'1'成功
                 */
                successorfail?: string;
            },
            void
        >;
        /**
         * 基座埋点统计
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持(4.2.22)   |    支持(4.2.22)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_io)
         * @example ```typescript
         *    ejs.io.record({
         *        clickid: '',
         *        clicktitle: '',
         *        eventid: '',
         *        eventname: '',
         *        eventcontent: '',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        record?: APIType<
            {
                /**
                 * 按钮点击id，需产生点击行为
                 */
                clickid?: string;
                /**
                 * 按钮点击名称(如有) 
                 */
                clicktitle?: string;
                /**
                 * 当前流程的标识
                 */
                eventid?: string;
                /**
                 * 流程中当前步骤的名称
                 */
                eventname?: string;
                /**
                 * 流程中当前步骤的详细日志说明
                 */
                eventcontent?: string;
            },
            void
        >;
    }
}
