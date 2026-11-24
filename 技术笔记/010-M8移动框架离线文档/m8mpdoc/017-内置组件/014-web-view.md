#### web-view

`web-view` 是一个 web 浏览器组件，可以用来承载网页的容器，会自动铺满整个页面。

> 各小程序平台，web-view 加载的 url 需要在后台配置域名白名单，包括内部再次 iframe 内嵌的其他 url 。

**属性说明**

| 属性名   | 类型         | 说明                                                                                                                                                           | 平台差异说明                                                                                                          |
| :------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| src      | String       | webview 指向网页的链接                                                                                                                                         | &nbsp;                                                                                                                |
| allow    | String       | 用于为 [iframe](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) 指定其[特征策略](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/策略特征) | H5 支持                                                                                                               |
| sandbox  | String       | 该属性对呈现在 [iframe](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) 框架中的内容启用一些额外的限制条件。                                 | H5 支持                                                                                                               |
| @message | EventHandler | 网页向应用 `postMessage` 时，会在特定时机（后退、组件销毁、分享）触发并收到消息。                                                                              | H5 暂不支持（可以直接使用 [window.postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)） |

**src**

| 来源 | H5  | 微信小程序 | 支付宝小程序 |
| :--- | :-: | :--------: | :----------: |
| 网络 |  √  |     √      |      √       |
| 本地 |  √  |     x      |      x       |

::: preview https://hellouniapp.dcloud.net.cn/pages/component/web-view/web-view

```html
<template>
    <view>
        <web-view src="https://uniapp.dcloud.io/static/web-view.html"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {};
        }
    };
</script>

<style></style>
```

:::

注意：

-   平台小程序仅支持加载网络网页，不支持本地 html
-   平台小程序端 web-view 组件一定有原生导航栏，下面一定是全屏的 web-view 组件，navigationStyle: custom 对 web-view 组件无效。

<pre v-pre="" data-lang="">
	<code class="lang-" style="padding:0">
┌─components
├─hybrid
│  └─html
│     ├─css
│     │  └─test.css
│     ├─img
│     │  └─icon.png
│     ├─js
│     │  └─test.js
│     └─local.html
├─pages
│  └─index
│     └─index.vue
├─static
├─main.js
├─App.vue
├─manifest.json
└─pages.json
	</code>
</pre>

**示例** [查看示例](https://hellouniapp.dcloud.net.cn/pages/component/web-view/web-view)

```html
<template>
    <view>
        <web-view src="/hybrid/html/local.html"></web-view>
    </view>
</template>
```

`<web-view>` 加载的网页中支持调用部分 API 接口（网页中需引入`uni.webview.js`，最新版地址：[https://gitee.com/dcloud/uni-app/raw/dev/dist/uni.webview.1.5.4.js](https://gitee.com/dcloud/uni-app/raw/dev/dist/uni.webview.1.5.4.js)：

| 方法名           | 平台差异说明                                   |
| :--------------- | :--------------------------------------------- |
| page.open        |                                                |
| page.replace     |                                                |
| page.close       |                                                |
| Util.postMessage | H5 暂不支持（可以直接使用 window.postMessage） |

##### Util.postMessage(OBJECT)

网页向应用发送消息，在 `<web-view>` 的 `message` 事件回调 `event.detail.data` 中接收消息。

**Tips**

-   传递的消息信息，必须写在 data 对象中。
-   `event.detail.data` 中的数据，以数组的形式接收每次 post 的消息。（注：支付宝小程序除外，支付宝小程序中以对象形式接受）

##### `web-view`组件的层级问题

web-view 组件在 平台小程序中层级较高，如需要在 vue 页面中写代码为 web-view 组件覆盖内容，平台小程序端无解，只能由 web-view 的组件自己弹出 div。

##### web-view 组件的浏览器内核说明

-   H5 端的 web-view 其实是被转为 iframe 运行，使用的是当前的浏览器
-   平台小程序的 web-view 使用的是平台小程序自带的浏览器内核，不同厂商不一样，[详见](https://ask.dcloud.net.cn/article/1318)

**注意事项**

-   `<web-view>` 组件默认铺满全屏并且层级高于前端组件。H5 端可以改为直接使用 iframe。
-   `<web-view>` 组件所在窗口的标题，跟随页面的 `<title>` 值的变化而变化（不含 H5 端）。微信小程序平台本地开发者工具不生效，真机预览生效。
-   平台小程序平台， `src` 指向的链接需登录平台小程序管理后台配置域名白名单。`H5` 无此限制。

##### FAQ

Q：web-view 的页面怎么和应用内的页面交互？
A：调用 uni 相关的 API，就可以实现页面切换及发送消息。参考：[在 web-view 加载的 HTML 中调用 uni 的 API](https://ask.dcloud.net.cn/article/35083)

Q: web-view 加载H5页面，内部跳转冲突如何解决
A：使用 uni.webView.navigateTo...

uni.webView.navigateTo 示例，注意 uni sdk 放到 body 下面

```html
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        ...
    </head>
    <body>
        <noscript>
            <strong>Please enable JavaScript to continue.</strong>
        </noscript>
        <div id="app"></div>
        <!-- built files will be auto injected -->
    </body>
    <!-- uni 的 SDK -->
    <!-- 需要把 uni.webview.1.5.4.js 下载到自己的服务器 -->
    <script type="text/javascript" src="https://unpkg.com/@dcloudio/uni-webview-js@0.0.3/index.js"></script>
    <script>
        document.addEventListener('UniAppJSBridgeReady', function () {
            uni.webView.getEnv(function (res) {
                console.log('当前环境：' + JSON.stringify(res));
            });
            // uni.webView.navigateTo(...)
        });
    </script>
</html>
```
