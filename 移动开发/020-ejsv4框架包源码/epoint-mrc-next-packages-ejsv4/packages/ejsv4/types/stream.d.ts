declare namespace EJSNamespace {
    interface fileType {
        /**
         * 文件名
         */
        name: string;
        /**
         * 文件本地路径
         */
        path: string;
    }

    interface streamType {
        /**
         * 原生代理请求接口
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 | 官方 weex 端 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_stream](http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_stream)
         * @example ```typescript
         *    ejs.stream.fetch({
         *        url: "http://www.xx.sh.cn/WebBuilderMobileService_URL/appservice/getheadnewslist",
         *        method: 'POST',
         *        type: 'json',
         *        body: {
         *            params: JSON.stringify({
         *                pageindex: currPage,
         *                pagesize: 10,
         *                keyword: 'type1'
         *            })
         *        }
         *        headers: {
         *            'Content-Type': 'application/x-www-form-urlencoded'
         *        },
         *        success: function(result) {
         *            console.log('接口响应数据', result.data);
         *        },
         *        error: function(error) {}
         *    });
         * ```
         */
        fetch: APIType<
            {
                /**
                 * `必填`，请求的 URL
                 */
                url: string;
                /**
                 * `必填`，请求的方法，`GET`或`POST`
                 */
                method: string;
                /**
                 * 设置响应的`result.data`的类型: `json`或`text`。为`json`时会自动将请求结果转为`json`对象。
                 *
                 * 默认值在小程序2.0(安卓`2.0.5-sp1`，iOS`2.0.5-sp2`)之前：安卓为`text`、iOS为`json`。小程序2.0(安卓`2.0.5-sp1`，iOS`2.0.5-sp2`)后保持统一为`text`
                 */
                type?: string;
                /**
                 * HTTP请求头
                 *
                 * @tips 默认`Content-Type`为`application/x-www-form-urlencoded`
                 *
                 * 如果需要通过 `POST` `json` ， 需要将 `Content-Type` 设为 `application/json`
                 */
                headers?: object;
                /**
                 * HTTP请求体
                 */
                body?: string | object;
            },
            {
                /**
                 * 请求成功返回的数据。
                 *
                 * 如果请求的`type`参数是 `json`，则它就是一个 `object`类型；
                 *
                 * 如果是`text`，则它就是一个`string`类型；
                 *
                 * 如果是`auto`，则尝试解析 json 并返回`object`类型，如果返回不了，就以`string`类型返回。
                 */
                data?: any;
                /**
                 * 请求失败返回的状态码
                 */
                status?: number;
                /**
                 * 状态描述文本
                 */
                statusText?: string;
                /**
                 * 详细的错误信息
                 */
                error?: any;
            }
        >;
        /**
         * 原生容器代理上传文件(标准的表单上传)
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_stream](http://app.epoint.com.cn/ejsdoc/index/index.php#page=api_stream)
         * @example ```typescript
         *    ejs.stream.uploadMultipartFile({
         *        url: 'http://115.29.151.25:8012/webUploaderServer/testupload.php',
         *        file: {
         *            path: 'xxxx.jpg',
         *            name: 'test'
         *        },
         *        files: [
         *            {
         *                path: 'xxxx1.jpg',
         *                name: 'file1',
         *            },
         *            {
         *                path: 'xxxx2.jpg',
         *                name: 'file2',
         *            },
         *        ],
         *        type: 'text',
         *        headers: {
         *            'X-Requested-With': 'XMLHttpRequest'
         *        },
         *        dataForm: {
         *            test: 'testValue'
         *        },
         *        success: function (result) {
         *            console.log('接口响应数据', result.data);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        uploadMultipartFile?: APIType<
            {
                /**
                 * `必填`，请求的 URL
                 */
                url: string;
                /**
                 * 除了上传文件外需要额外上传的参数，`json`键值对形式
                 */
                dataForm?: object;
                /**
                 * 上传的单个文件
                 *
                 * 注意：不支持同时设置 file 和 files两个字段，如果同时存在，则忽略 files 字段
                 */
                file?: fileType;
                /**
                 * 多附件上传。多附件上传的成功回调为对象数组，每个元素对应该位置文件的上传结果。
                 *
                 * 注意：不支持同时设置 file 和 files两个字段，如果同时存在，则忽略 files 字段
                 *
                 * @support 支持版本：小程序2.0，安卓`2.0.5-sp1`，iOS`2.0.5-sp2`
                 */
                files?: fileType[];
                /**
                 * HTTP 请求头，注意，请不要传`Content-Type`，因为上传时这个字段不能被改变
                 */
                headers?: object;
                /**
                 * 原生压缩图片效果，范围`0-100`。 安卓默认`70`（安卓存在设置`100`不压缩部分手机闪退问题）；iOS 默认`100`
                 *
                 * @support ejs >= v4.0.3
                 */
                quality?: string;
                /**
                 * 设置响应的`result.data`类型，默认为`text`。支持`json`、`text`、`auto`。
                 *
                 * @support 支持版本：小程序2.0，安卓`2.0.5-sp1`，iOS`2.0.5-sp2`
                 */
                type?: string;
            },
            {
                /**
                 * 请求成功返回的数据。
                 *
                 * 如果请求的`type`参数是 `json`，则它就是一个 `object`类型；
                 *
                 * 如果是`text`，则它就是一个`string`类型；
                 *
                 * 如果是`auto`，则尝试解析 json 并返回`object`类型，如果返回不了，就以`string`类型返回。
                 */
                data?: any;
                /**
                 * 请求失败返回的状态码
                 */
                status?: number;
                /**
                 * 状态描述文本
                 */
                statusText?: string;
                /**
                 * 详细的错误信息
                 */
                error?: any;
            }
        >;
    }
}
