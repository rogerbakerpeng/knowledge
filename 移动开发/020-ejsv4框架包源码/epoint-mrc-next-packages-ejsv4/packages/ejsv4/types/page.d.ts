declare namespace EJSNamespace {
    interface pageType {
        /**
         * 新窗口打开一个页面
         *
         * 注意，新页面会默认读取页面的`title`并设置
         *
         * 非`ejs`环境下是兼容情况，仅剩下打开页面以及传递参数功能，其他配置部分兼容
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 | 官方 weex 端 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- | :----------- |
         * | 支持          |       支持        | 支持 | 支持 | 支持       | 支持         | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_page](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_page)
         * @example ```typescript
         *    ejs.page.open({
         *        pageUrl: './ejs_demo_v3_simple.html',
         *        pageStyle: 1,
         *        orientation: 1,
         *        alive: 0,
         *        data: {
         *            key1: 'value1'
         *        },
         *        useRouter: false,
         *        success: function (result) {
         *            console.log('目标页面关闭后的回传参数', result.resultData);
         *        },
         *        error: function (error) {}
         *    });
         *    // 兼容快速调用
         *    ejs.page.open('./ejs_demo_v3_simple.html', {
         *        key1: 'value1'
         *    });
         * ```
         */
        open: APIStrType<
            {
                /**
                 * 目标页面的地址
                 *
                 * @support
                 * 1. `ejs`、`H5`和`钉钉`环境下，支持`http或https或//`开头的网络路径、`./`或`../`开头的相对路径以及`pages/xxx`开头的绝对路径，绝对路径的方式下要求当前页面必须在`pages`文件夹中(如`pages/a.html`)，否则会计算错误。
                 *
                 * 2. 微信及支付宝等其他小程序平台，只支持在`pages.json`里注册的 vue 页面，`web url`请使用 `web-view组件` 或 uni 框架封装的[uni-link 组件](https://uniapp.dcloud.io/component/uniui/uni-link.html)。
                 *
                 * 3. 官方 weex 端只支持路由页面及其他 weex 页面的跳转
                 *
                 * @tips **支持 URL 后拼接参数控制 EJS 原生页面初始功能**
                 *
                 * | 参数                  | 说明（URL 后拼接使用）                                                                                    | EJS 支持版本                        |
                 * | :-------------------- | :-------------------------------------------------------------------------------------------------------- | :---------------------------------- |
                 * | ejs_orientation       | 不使用路由跳转时，`-1`打开的页面方向跟随系统，`0` 打开的页面为横屏，`1` 默认打开的页面为竖屏              |                                     |
                 * | ejs_pagestyle         | 不使用路由跳转时，`-1`打开隐藏导航栏的页面，`2` 打开带搜索导航栏类型的页面，`1` 默认导航栏的页面          |                                     |
                 * | pageStartVoice        | 不使用路由跳转时，iOS 打开页面时打开语音组件操作，`1`打开，默认不打开。需要配合导航栏带搜索的页面类型使用 |                                     |
                 * | ejs_nav_bgcolor       | 不使用路由跳转时，控制打开页面时的导航栏颜色，例如 000000。                                               | `>= 3.2.3a`                         |
                 * | ejs_nav_line          | 不使用路由跳转时，控制打开页面时导航栏下划线显隐，为`0`时隐藏，默认为`1`。                                | `Android >= 3.2.6f; iOS >= 3.2.7b`  |
                 * | ejs_show_speech       | 不使用路由跳转时，打开页面时打开语音组件操作，`1`打开，默认不打开。需要配合导航栏带搜索的页面类型使用。   | `Android >= 3.2.6.i; iOS >= 3.2.7b` |
                 * | ejs_pagetitle         | 不使用路由跳转时，支持容器页面打开前设置页面标题                                                          | `>= 3.4.2`                          |
                 * | ejs_reserve_statusbar | 不使用路由跳转时，是否从状态栏开始渲染页面，0：从状态栏开始渲染，1：不从状态栏渲染                        | `>= 3.4.2`                          |
                 * | ejs_wv_bgcolor        | 不使用路由跳转时，webview 背景颜色，如：`'4169E1'`                                                        | `>= 3.4.2`                          |
                 */
                pageUrl: string;
                /**
                 * 不使用路由跳转时，是横屏打开还是竖屏打开，`1`为竖屏，`0`为横屏，默认为`1`,`-1`为跟随系统
                 *
                 * @support 仅`ejs`支持
                 */
                orientation?: number;
                /**
                 * 不使用路由跳转时，页面的类型，有多种类型，默认为`1`
                 *
                 * 当值为 `-1` 的时候，打开的是隐藏导航栏后的页面类型，当值为 `2` 的时候，打开的是带搜索导航栏类型的页面类型，默认值为 `1` 的时候，打开的是默认导航栏类型的页面类型
                 *
                 * @support 仅`ejs`支持
                 */
                pageStyle?: number;
                /**
                 * 为 1 保活状态关闭小程序，为 0 不保活，默认为 0
                 *
                 * @support 仅`ejs`支持，新点小程序 2.0 不支持此参数
                 */
                alive?: number;
                /**
                 * 需要传递的参数，`JSON`键值对形式
                 */
                data?: object;
                /**
                 * 不使用路由跳转时，打开页面的展示类型，`0` 自右向左侧滑入场，`1` 自底向上冒泡入场，默认为 `0`
                 *
                 * @support 仅`ejs` 支持，EJS原生支持版本 `v7.3 >= 3.2.9.a` `v7.4 >= 3.4.2`
                 */
                openStyle?: number;
                /**
                 * 针对单页应用，是否使用路由跳转，可选值为布尔值：`true`、 `false`或者字符串：`auto`(`v4.2.2`支持)
                 *
                 * 非跨端框架默认为 `false`，ejs 环境下及跨端框架默认为`true`，当值为`auto`时，与默认值表现相反
                 *
                 * @support 仅`ejs`、`h5`及官方 weex 端支持
                 */
                useRouter?: boolean | string;
            },
            {
                /**
                 * 目标页面关闭后会触发这个回调，参数是页面通过close传递过来的参数
                 *
                 * 可能是json，也可能是普通字符串，要看怎么传参的
                 *
                 * @support 仅ejs环境支持，且不支持路由跳转
                 */
                resultData?: any;
            },
            [string, object?],
            true
        >;
        /**
         * 打开应用内原生页面
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_page](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_page)
         * @example ```typescript
         *    ejs.page.openLocal({
         *        className: ejs.os.android ? 'com.epoint.demo.view.ComponentCaseActivity' : 'EPTFileSelectViewController',
         *        isOpenExist: 0,
         *        data: {
         *            key1: 'value1'
         *        },
         *        success: function (result) {
         *            console.log('页面关闭后的回传参数', result.resultData);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        openLocal?: APIType<
            {
                /**
                 * 页面的类名，`Android`和`iOS`下有差异
                 */
                className: string;
                /**
                 * 是否打开已经存在的页面并且页面置顶，如果为`1`，会杀掉栈内该页面上面的所有页面(比如有`A->B->C`，如果打开`B`并且设置`1`，那么`A`页面会被杀掉)，默认为`0`
                 *
                 * @support 新点小程序 2.0 不支持此参数
                 */
                isOpenExist?: number;
                /**
                 * 当值为 `-1` 的时候，打开的是隐藏导航栏后的原生页面
                 */
                pageStyle?: number;
                /**
                 * 需要传递的参数，`JSON`键值对形式，键值对不能再嵌套子`JSON`
                 */
                data?: object;
            },
            {
                /**
                 * 目标页面关闭后的回传参数
                 *
                 * 参数需要原生页面主动设置result才能正常返回
                 *
                 * 可能是json，也可能是普通字符串，要看怎么传参的
                 */
                resultData?: any;
            }
        >;
        /**
         * 关闭页面
         *
         * 在非`ejs`环境下只支持普通的关闭，无法传参。
         *
         * 非跨端框架单页应用使用`vue-router`路由跳转的情况下，建议直接使用`vue-router`提供的 API 返回。
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 | 官方 weex 端 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- | :----------- |
         * | 支持          |       支持        | 支持 | 支持 | 支持       | 支持         | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_page](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_page)
         * @example ```typescript
         *    ejs.page.close({
         *        resultData: {
         *            key: 'value2'
         *        },
         *        success: function () {},
         *        error: function (error) {}
         *    });
         *    // 兼容快速调用(快速调用只支持字符串)
         *    ejs.page.close(JSON.stringify({ key: 'value2' }));
         *    ejs.page.close('value2');
         * ```
         */
        close: APIStrType<
            {
                /**
                 * 需要关闭的页面层级，默认为`1`，只会关闭一层
                 *
                 * @support 官方 weex 端仅路由跳转支持
                 */
                popPageNumber?: number;
                /**
                 * 需要传递给上一个页面的数据，可以是`JSON`格式数据或者是普通字符串数据
                 *
                 * @support 仅`ejs`支持，且不支持路由跳转
                 */
                resultData?: string | object;
                /**
                 * 针对单页应用，是否使用路由返回，可选值为布尔值：`true`、 `false`。
                 *
                 * 非跨端框架默认为 `false`，ejs 环境下及跨端框架默认为`true`
                 *
                 * @support `ejs >= 4.2.2`时仅`ejs`环境下支持，`ejs >= 4.2.5`时`H5`和`ejs`环境都支持，注意使用路由返回时不支持`resultData`参数
                 */
                useRouter?: boolean;
            },
            void,
            [string?],
            false
        >;
        /**
         * 重新加载页面
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- |
         * | 支持          |       支持        | 支持 | 支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_page](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_page)
         * @example ```typescript
         *    ejs.page.reload();
         * ```
         */
        reload?: APIType<{}, void>;
        /**
         * 显示原生内置的错误提示控件
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_page](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_page)
         * @example ```typescript
         *    ejs.page.showError({
         *        type: 0,
         *        success: function () {},
         *        error: function (error) {}
         *    });
         *    // 兼容快速调用
         *    ejs.page.showError(type);
         * ```
         */
        showError?: APIStrType<
            {
                /**
                 * 错误类型，目前支持类型为-- `0`: 网络异常 `1`: 服务器异常 `2`: 访问超时 `3`: 页面加载失败
                 */
                type: number;
            },
            void,
            [number],
            false
        >;
        /**
         * 替换当前页面
         *
         * @support
         * | ejs（H5 应用)  |             ejs（新点小程序）              |      H5      | 钉钉         | 微信小程序 | 支付宝小程序 | 官方 weex 端 |
         * | :------------- | :----------------------------------------: | :----------: | :----------- | :--------- | :----------- | :----------- |
         * | 支持（3.4.3a） | 支持 （3.4.3a）（ejs-weex 环境不支持） | 跨端框架支持 | 跨端框架支持 | 支持       | 支持         | 支持         |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_page](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_page)
         * @example ```typescript
         *    ejs.page.replace({
         *        url: '',
         *        success: function () {},
         *        error: function (error) {}
         *    });
         *    // 兼容快速调用
         *    ejs.page.replace(url);
         * ```
         */
        replace?: APIStrType<
            {
                /**
                 * 用来替换的页面地址
                 *
                 * @support
                 *
                 * ejs 支持版本：`ejs(Andriod) >= 3.2.10.a` `ejs(iOS) >= 3.2.10`
                 *
                 * H5、微信及支付宝等其他小程序平台，只支持在`pages.json`里注册的 vue 页面的替换
                 *
                 * 官方 weex 端仅支持替换路由页面
                 */
                url: string;
                /**
                 * 针对单页应用，是否使用路由替换，可选值为布尔值：`true`、 `false`
                 *
                 * 非跨端框架默认为 `false`，ejs 环境下及跨端框架默认为`true`
                 *
                 * @support `ejs >= 4.2.5`时`H5`和`ejs`环境开始支持
                 */
                useRouter?: boolean;
            },
            void,
            [string],
            false
        >;
    }
}
