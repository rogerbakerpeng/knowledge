declare namespace EJSNamespace {
    interface authType {
        /**
         * 获取token，标准接口需要token才能正常请求
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_auth](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_auth)
         * @example ```typescript
         *    ejs.auth.getToken({
         *      success: function (result) {
         *          console.log(result.access_token);
         *      },
         *      error: function (error) {}
         *    });
         * ```
         */
        getToken?: APIType<
            {},
            {
                /**
                 * 对应的token，必须登录后才会有，token的刷新由原始容器进行，无需关心
                 */
                access_token: string;
            }
        >;
        /**
         * 刷新tokenAPI
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_auth](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_auth)
         * @example ```typescript
         *    ejs.auth.refreshToken({
         *      success: function () {},
         *      error: function (error) {}
         *    });
         * ```
         */
        refreshToken?: APIType<
            {
                /**
                 * 是否强制刷新 token，默认超出 expires_in 过期时间后才会刷新，如果要强制刷新传 1。
                 *
                 * @support iOS（ejs > 3.4.0） 支持；Android 默认支持
                 */
                isForce?: number;
                /**
                 * refreshToken 过期后是否自动退出登录，默认会自动退出，如果不自动退出则传 0。
                 *
                 * @support iOS（ejs > 3.4.0） 支持；Android 默认支持
                 */
                isAutoLogout?: number;
            },
            void
        >;
        /**
         * 获取当前登陆用户信息
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_auth](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_auth)
         * @example ```typescript
         *    ejs.auth.getUserInfo({
         *      success: function (result) {
         *          console.log('用户信息', JSON.parse(result.userInfo));
         *      },
         *      error: function (error) {}
         *    });
         * ```
         */
        getUserInfo: APIType<
            {},
            {
                /**
                 * userInfo 是一个 JSON 格式的字符串，包含当前登录用户的信息。
                 *
                 * JSON.parse()解析 userInfo 后所得到的用户信息对象的属性说明：
                 * | 参数 | 参数类型 | 说明 |
                 * | :------------- |:-------------:|:-------------|
                 * | displayname | String | 用户姓名 |
                 * | ouguid | String | 部门标识 |
                 * | baseouname | String | 独立部门名称 |
                 * | baseouguid | String | 独立部门标识 |
                 * | ccworksequenceid | String | 新版即时通讯账号 |
                 * | loginid | String | 登录名 |
                 * | forcemodifypwd | String | 是否需要强制修改密码 |
                 * | oaversion | String | 返回业务系统的oa版本 |
                 * | userguid | String | 用户标识 |
                 * | previewurl | String | 文件在线预览地址 |
                 * | complexpassword | String | 密码复杂度规则 |
                 * | usersignpicture | String | 用户签名图片地址 |
                 * | photourl | String | 用户个人头像地址 |
                 * | ouname | String | 部门名称 |
                 * | sequenceid | String | 用户微消息帐号 |
                 */
                userInfo: string;
            }
        >;
        /**
         * 更新原生本地的用户信息，并返回新的用户信息
         *
         * @support
         * | ejs（H5 应用)   | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :-------------- | :---------------: | :----: | :----- | :--------- | :----------- |
         * | `>= 4.2.3 `支持 | `>= V2.0.2` 支持  | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_auth](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_auth)
         * @example ```typescript
         *    ejs.auth.refreshUserInfo({
         *      success: function (result) {
         *          console.log('用户信息', result.userInfo);
         *      },
         *      error: function (error) {}
         *    });
         * ```
         */
        refreshUserInfo?: APIType<
            {},
            {
                /**
                 * 对应的当前登录用户信息
                 */
                userInfo: {
                    /**
                     * 用户姓名
                     */
                    displayname: string;
                    /**
                     * 部门标识
                     */
                    ouguid: string;
                    /**
                     * 独立部门名称
                     */
                    baseouname: string;
                    /**
                     * 独立部门标识
                     */
                    baseouguid: string;
                    /**
                     * 新版即时通讯账号
                     */
                    ccworksequenceid: string;
                    /**
                     * 登录名
                     */
                    loginid: string;
                    /**
                     * 是否需要强制修改密码
                     */
                    forcemodifypwd: string;
                    /**
                     * 返回业务系统的oa版本
                     */
                    oaversion: string;
                    /**
                     * 用户标识
                     */
                    userguid: string;
                    /**
                     * 文件在线预览地址
                     */
                    previewurl: string;
                    /**
                     * 密码复杂度规则
                     */
                    complexpassword: string;
                    /**
                     * 用户签名图片地址
                     */
                    usersignpicture: string;
                    /**
                     * 用户个人头像地址
                     */
                    photourl: string;
                    /**
                     * 部门名称
                     */
                    ouname: string;
                    /**
                     * 用户微消息帐号
                     */
                    sequenceid: string;
                };
            }
        >;
        /**
         * 获取用户授权码(只有在需要鉴权的项目中需要用到)
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_auth](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_auth)
         * @example ```typescript
         *    ejs.auth.getAuthCode({
         *      success: function (result) {
         *          console.log('用户授权码', result.authCode);
         *      },
         *      error: function (error) {}
         *    });
         * ```
         */
        getAuthCode?: APIType<
            {},
            {
                /**
                 * 用户授权码
                 */
                authCode: string;
            }
        >;
        /**
         * 调用框架接口获取 authcode，H5 应用下需要鉴权后使用
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_auth](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_auth)
         * @example ```typescript
         *    ejs.auth.getUserAuthCode({
         *      appkey: '123123',
         *      success: function (result) {
         *          console.log('用户授权码', result.authcode);
         *      },
         *      error: function (error) {}
         *    });
         * ```
         */
        getUserAuthCode?: APIType<
            {
                /**
                 * 应用的appkey
                 */
                appkey: string;
            },
            {
                /**
                 * 用户授权码
                 */
                authcode: string;
            }
        >;
        /**
         * 退出当前用户至登录页面
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持（3.5.0） |    支持(3.5.0)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_auth](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_auth)
         * @example ```typescript
         *    ejs.auth.logoutUserWithAlert({
         *      title: '提示',
         *      message: '请重新登录',
         *      success: function () {},
         *      error: function (error) {}
         *    });
         * ```
         */
        logoutUserWithAlert?: APIType<
            {
                /**
                 * 提示标题
                 */
                title?: string;
                /**
                 * 提示内容
                 */
                message?: string;
            },
            void
        >;
        /**
         * 退出当前用户至登录页面，无 UI 提示
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持（4.1.9） |    支持(4.1.9)    | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_auth](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_auth)
         * @example ```typescript
         *    ejs.auth.logout({
         *        success: function () {},
         *        error: function (error) {}
         *    });
         * ```
         */
        logout?: APIType<{}, void>;
    }
}
