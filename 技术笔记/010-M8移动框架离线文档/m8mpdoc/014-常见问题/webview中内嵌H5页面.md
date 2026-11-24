# webview中内嵌H5页面

## 加载不同来源的 HTML

1. 若`web-view`中加载的是网络地址，将组件的 src 地址设为可访问的地址即可。

2. 非平台小程序环境下，若需加载本地的 HTML 页面，则必须存放在规定的目录下，即 `src/hybrid/html` 目录。这个hybrid目录不会被编译器编译，所以这里的不能放vue文件。

注意：在本地 HTML 中引入网络资源时，必须补全协议。比如：https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.2.js。

然后修改 `web-view` 的 src 为 `/hybrid/html/xxx.html` 即可。

## H5页面使用 uni、wx、my 等对象

### 引用依赖的文件

##### 使用uni

在 `web-view` 加载的 HTML 中调用 uni 的 API，需要在 HTML 中引用必要的 JS-SDK。

```html
<!-- uni 的 SDK，必须引用。 -->  
<script type="text/javascript" src="https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.2.js"></script>
```

可使用的API有：`uni.getEnv`、`uni.navigateBack`、`uni.navigateTo`、`uni.postMessage`、`uni.reLaunch`、`uni.redirectTo`、`uni.switchTab`。

若加载的H5页面同样是由跨端框架编译的，需要将以上sdk资源下载至H5页面工程内`static`目录引用：

```js
import web from '@static/uni.webview.1.5.2.js'

const webview = web.webView;

webview.postMessage({
    data: {
        aa:111
    }
});
```

##### 使用wx

在微信小程序中，需要在 HTML 中引入微信的 JS-SDK，使用wx的相关接口进行页面跳转、消息通讯等。

```html
<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>  
```
在h5页面中可以使用的wx接口请参考[微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)。
部分接口使用需要鉴权，相当于开发微信公众号。

**注意：`uni`和`wx`的两个资源文件同时引入时，注意引入的顺序，微信的需要在前。**

若加载的H5页面同样是由跨端框架编译的，需要将以上sdk资源下载至H5页面工程内`static`目录引用（若有报错，需要将`jweixin-1.4.0.js`中的`this`字段改成`window`）：

```js
import wx from '@static/jweixin-1.4.0.js'

const wxMiniProgram = wx.miniProgram;

wxMiniProgram.postMessage({
    data: {
        aa:111
    }
});
```

##### 使用my

在支付宝小程序中，需要在 HTML 中引入支付宝的 JS-SDK，使用my的相关接口进行页面跳转、消息通讯等。

以下JS-SDK只能在支付宝客户端进行访问：

```html
<script type="text/javascript" src="https://appx/web-view.min.js"></script>  
```

可以使用的my接口请参考[支付宝小程序开发文档](https://opendocs.alipay.com/mini/component/web-view?pathHash=97f1ab2c)

若加载的H5页面同样是由跨端框架编译的，在`public/index.html`中的`head`标签内插入以上引用，即可在页面中使用my进行页面跳转、消息通讯等接口。

### 调用的时机

在引用`uni`依赖的文件后，h5页面初始化时需要在 HTML 中监听 `UniAppJSBridgeReady` 事件触发后，才能安全调用 uni 的 API。

```js
document.addEventListener('UniAppJSBridgeReady', function() {  
    uni.getEnv(function(res) {  
        console.log('当前环境：' + JSON.stringify(res));  
    });  
});
```

### 页面跳转

支持调用所有的 uni 路由方法，可以实现从 HTML 重新跳转回应用内的页面。

`wx`、`my`使用类似。

```js
document.querySelector('.btn-list').addEventListener('click', function(evt) {  
    uni.navigateTo({  
        url: '/pages/index/index'  
    });
});
```

### 发送消息

**注意：由于`web-view`组件在H5环境会被渲染为`iframe`，父子页面可以通过 `window.postMessage`传递消息，通过监听`message`事件获取传递的消息。**

**以下方法主要说明在平台小程序中如何传递消息**

##### 子页面向父页面传消息

1. 可以通过 `uni.postMessage` 在 HTML 中向应用发送消息。参数格式须是 `data: {}`。也就是说，传递的消息信息必须在 `data` 这个对象中。

```js
document.addEventListener('UniAppJSBridgeReady', function() {  
    uni.postMessage({  
        data: {  
            action: 'postMessage'  
        }  
    });  
});
```

2. 应用监听 `web-view` 组件的 `message` 事件，然后在事件回调的 `event.detail.data` 中接收传递过来的消息。注意只在特定时机（后退、组件销毁、分享）才会触发`message`事件，支付宝小程序没有这个限制：

```html
<template>  
    <view>  
        <web-view src="http://192.168.1.1:3000/test.html" @message="handleMessage"></web-view>  
    </view>  
</template>  
```
```js
export default {  
    methods: {  
        handleMessage(evt) {  
            console.log('接收到的消息：' + JSON.stringify(evt.detail.data));  
        }  
    }  
}  
```

##### 父页面向子页面传消息

支付宝小程序中，小程序可通过创建 `WebViewContext` 向 webview 组件传递消息，H5页面通过 `my.onMessage` 接收小程序传过来的消息，具体请查看官方文档：https://opendocs.alipay.com/mini/api/webview-context;

微信小程序中，父页面向子页面传消息只能通过在 url 上拼接参数进行传递。

1. 父页面在url上拼接`query`参数：

```html
<template>
    <web-view :src="webviewSrc"></web-view>
</template>
```
```js
export default {  
    computed: {
        webviewSrc() {
            return `http://192.168.118.8:8081/src/hybrid/html/test.html?msg=${this.msg}`;
        }
    }
}
```

2. 子页面截取 `query` 参数获取父页面传递的消息：

```js
export default {  
    onLoad(option) {
        // 获取父页面传递的msg
        this.msg = option.msg;
    }
}
```

该方法只能在初始化时向子页面传递消息，若需动态传参，修改拼接的`query`参数时，H5页面会刷新。

若不想在传参时刷新H5页面，可以将参数改为 hash 拼接，子页面监听 `popstate` 事件监听 hash 变化，hash 变化时截取 hash 值从而获取父页面传递的信息，然后调用 `history.back()` 后退一页以保持原本的历史记录。

可参考相关知识库：https://fdoc.epoint.com.cn/onlinedoc/kfzknowledge/kfzknowledge/handlequestionworkflow?ProcessVersionInstanceGuid=dd0e7832-f38c-4c66-ae1b-4e9ca106a364&WorkItemGuid=b294ad6a-cb8a-403a-8389-b1ad62be49d5&MessageItemGuid=a796009d-3f7b-44e9-9909-97f1e538d6b3&messageGuid=0c511674-b100-412d-a99c-3bf361dab663

