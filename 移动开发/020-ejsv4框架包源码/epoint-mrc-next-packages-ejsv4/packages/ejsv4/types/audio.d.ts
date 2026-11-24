declare namespace EJSNamespace {
    interface audioType {
        /**
         * 开始录制音频
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持（3.1.2） |   支持（3.1.2）   | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_audio](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_audio)
         * @example ```typescript
         *    ejs.audio.startRecord({
         *      minDuration: 1,
         *      maxDuration: 120,
         *      folderPath: '',
         *      fileName: '',
         *      success: function () {},
         *      error: function (error) {}
         *    });
         * ```
         */
        startRecord: APIType<
            {
                /**
                 * 最小允许可录制时长，默认为1，单位秒
                 *
                 * @support EJS3.4.0开始支持，其他平台不支持
                 */
                minDuration?: number;
                /**
                 * 最大允许可录制时长，默认为120，单位秒，EJS-iOS不支持默认时长
                 */
                maxDuration?: number;
                /**
                 * 音频根目录，不传递则有默认的音频存储根目录
                 *
                 * @support 仅 EJS3.4.0开始支持，EJS-iOS不支持该参数
                 */
                folderPath?: string;
                /**
                 * 音频文件名， 不传递则使用默认的音频文件
                 *
                 * @support 仅 EJS3.4.0开始支持，EJS-iOS不支持该参数
                 */
                fileName?: string;
            },
            void
        >;
        /**
         * 停止录制音频，并返回结果。请在`maxDuration`之前停止
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持（3.1.2） |   支持（3.1.2）   | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_audio](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_audio)
         * @example ```typescript
         *    ejs.audio.stopRecord({
         *      success: function (result) {
         *          console.log('音频时长', result.duration);
         *          console.log('音频本地文件路径', result.path);
         *      },
         *      error: function (error) {}
         *    });
         * ```
         */
        stopRecord: APIType<
            {},
            {
                /**
                 * 录音的时长，单位 s
                 */
                duration: string;
                /**
                 * 录音的完整本地路径
                 */
                path: string;
            }
        >;
        /**
         * 暂停录音
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        |      不支持       | 不支持 | 不支持 | 支持       | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_audio](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_audio)
         * @example ```typescript
         *    ejs.audio.pauseRecord({
         *      success: function () {},
         *      error: function (error) {}
         *    });
         * ```
         */
        pauseRecord?: APIType<{}, void>;
        /**
         * 继续录音
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        |      不支持       | 不支持 | 不支持 | 支持       | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_audio](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_audio)
         * @example ```typescript
         *    ejs.audio.resumeRecord({
         *      success: function () {},
         *      error: function (error) {}
         *    });
         * ```
         */
        resumeRecord?: APIType<{}, void>;
        /**
         * 取消正在进行的音频录制，取消后会销毁文件
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持（3.1.2） |   支持（3.1.2）   | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_audio](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_audio)
         * @example ```typescript
         *    ejs.audio.cancelRecord({
         *      success: function () {},
         *      error: function (error) {}
         *    });
         * ```
         */
        cancelRecord: APIType<{}, void>;
        /**
         * 播放音频文件
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持（3.1.2） |   支持（3.1.2）   | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_audio](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_audio)
         * @example ```typescript
         *    ejs.audio.startPlay({
         *      path: '/storage/emulated/0/com.epoint.workplatform/kfld/Temp/1513243453523.amr',
         *      success: function () {},
         *      error: function (error) {}
         *    });
         * ```
         */
        startPlay: APIType<
            {
                /**
                 * 需要播放的文件路径
                 */
                path: string;
            },
            void
        >;
        /**
         * 停止播放音频文件
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持（3.1.2） |   支持（3.1.2）   | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_audio](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_audio)
         * @example ```typescript
         *    ejs.audio.stopPlay({
         *      success: function () {},
         *      error: function (error) {}
         *    });
         * ```
         */
        stopPlay: APIType<
            {
                /**
                 * 需要停止播放的文件路径
                 *
                 * @support EJS 3.4.0后不需要填写，其他平台不需要填写
                 */
                path?: string;
            },
            void
        >;
        /**
         * 暂停播放音频文件
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        |      不支持       | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_audio](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_audio)
         * @example ```typescript
         *    ejs.audio.pausePlay({
         *      success: function () {},
         *      error: function (error) {}
         *    });
         * ```
         */
        pausePlay?: APIType<{}, void>;
        /**
         * 跳转音频至第几秒
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 不支持        |      不支持       | 不支持 | 不支持 | 支持       | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_audio](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_audio)
         * @example ```typescript
         *    ejs.audio.seek({
         *      position: 2,
         *      success: function () {},
         *      error: function (error) {}
         *    });
         * ```
         */
        seek?: APIType<
            {
                /**
                 * 跳转到音频某个位置，单位秒
                 */
                position: number;
            },
            void
        >;
    }
}
