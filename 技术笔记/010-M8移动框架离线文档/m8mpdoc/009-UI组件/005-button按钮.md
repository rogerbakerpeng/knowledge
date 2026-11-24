# 组件使用

## button 按钮

### 介绍

-   按钮组件。

::: ifdef M83

-   `v8.3.11`开始支持 weex 端使用，注意 weex 端组件不能根据内容宽度自适应，最好手动给 button 组件添加 width 样式

::: endif

### 代码演示

#### 按钮类型

按钮支持 `default`、`primary`、`info`、`warning`、`danger` 五种类型，默认为 `info`。

```html
<em-button type="primary">主要按钮</em-button>
<em-button type="info">信息按钮</em-button>
<em-button type="default">默认按钮</em-button>
<em-button type="warning">警告按钮</em-button>
<em-button type="danger">危险按钮</em-button>
```

#### 朴素按钮

通过 `plain` 属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。

```html
<em-button plain type="primary">朴素按钮</em-button>
<em-button plain type="info">朴素按钮</em-button>
```

#### 细边框

设置 `hairline` 属性可以展示 0.5px 的细边框。

```html
<em-button plain hairline type="primary">细边框按钮</em-button>
<em-button plain hairline type="info">细边框按钮</em-button>
```

#### 禁用状态

通过 `disabled` 属性来禁用按钮，禁用状态下按钮不可点击。

```html
<em-button disabled type="primary">禁用状态</em-button>
<em-button disabled type="info">禁用状态</em-button>
```

#### 加载状态

通过 `loading` 属性设置按钮为加载状态，加载状态下默认会隐藏按钮文字，可以通过 `loading-text` 设置加载状态下的文字。

```html
<em-button loading type="primary" />
<em-button loading type="primary" loading-type="spinner" />
<em-button loading type="info" loading-text="加载中..." />
```

#### 按钮形状

通过 `square` 设置方形按钮，通过 `round` 设置圆形按钮。

```html
<em-button square type="primary">方形按钮</em-button>
<em-button round type="info">圆形按钮</em-button>
```

#### 图标按钮

通过 `icon` 属性设置按钮图标，支持 `Icon` 组件里的所有图标，也可以传入图标 `URL`。

```html
<em-button icon="plus" type="primary" />
<em-button icon="plus" type="primary">按钮</em-button>
<em-button icon="https://img.yzcdn.cn/vant/user-active.png" type="info">按钮</em-button>
```

#### 按钮尺寸

支持 `large`、`normal`、`small`、`mini` 四种尺寸，默认为 `normal`。

```html
<em-button type="primary" size="large">大号按钮</em-button>
<em-button type="primary" size="normal">普通按钮</em-button>
<em-button type="primary" size="small">小型按钮</em-button>
<em-button type="primary" size="mini">迷你按钮</em-button>
```

#### 块级元素

按钮在默认情况下为行内块级元素，通过 `block` 属性可以将按钮的元素类型设置为块级元素。

```html
<em-button type="primary" block>块级元素</em-button>
```

#### 页面导航

可以通过 `url` 属性进行 `URL` 跳转，或通过 `to` 属性进行路由跳转。

```html
<em-button type="primary" url="./default">URL 跳转</em-button>
<em-button type="primary" to="index">路由跳转</em-button>
```

#### 自定义颜色

通过 `color` 属性可以自定义按钮的颜色。

```html
<em-button color="#7232dd">单色按钮</em-button>
<em-button color="#7232dd" plain>单色按钮</em-button>
<em-button color="linear-gradient(to right, #ff6034, #ee0a24)">渐变色按钮</em-button>
```

### API

#### Props

| 参数                |                                             说明                                              | 类型           | 默认值     | ::: ifdef M83 weex 端支持 ::: endif                 |
| :------------------ | :-------------------------------------------------------------------------------------------: | :------------- | :--------- | :-------------------------- |
| type                |                     类型，可选值为 `primary` `default` `warning` `danger`                     | string         | `info`     | 是                          |
| size                |                             尺寸，可选值为 `large` `small` `mini`                             | string         | `normal`   | 是                          |
| text                |                                           按钮文字                                            | string         | -          | 是                          |
| color               |             按钮颜色，支持传入`linear-gradient`渐变色，weex 端只支持两种颜色渐变              | string         | -          | 是                          |
| icon                |                                    左侧图标名称或图片链接                                     | string         | -          | 是                          |
| icon-size `v8.3.11` |                                   图标大小，默认单位是`px`                                    | string/number  | -          | 是                          |
| icon-prefix         |                      图标类名前缀，同 `Icon` 组件的 `class-prefix` 属性                       | string         | `van-icon` | 否                          |
| icon-position       |                                图标展示位置，可选值为 `right`                                 | string         | `left`     | 是                          |
| native-type         |                  原生 `button` 标签的 `type` 属性, 可选值有`submit` `reset`                   | string         | -          | 否                          |
| block               |                                        是否为块级元素                                         | boolean        | `false`    | 否（weex 端只有 flex 布局） |
| plain               |                                        是否为朴素按钮                                         | boolean        | `false`    | 是                          |
| square              |                                        是否为方形按钮                                         | boolean        | `false`    | 是                          |
| round               |                                        是否为圆形按钮                                         | boolean        | `true`     | 是                          |
| disabled            |                                         是否禁用按钮                                          | boolean        | `false`    | 是                          |
| hairline            |                                      是否使用 0.5px 边框                                      | boolean        | `false`    | 是                          |
| loading             |                                      是否显示为加载状态                                       | boolean        | `false`    | 是                          |
| loading-text        |                                       加载状态提示文字                                        | string         | -          | 是                          |
| loading-type        |                      加载图标类型，可选值为`spinner` `ball` `operation`                       | string         | `circular` | 是                          |
| loading-size        |                                         加载图标大小                                          | string         | `20px`     | 是                          |
| url                 |                                     点击后跳转的链接地址                                      | string         | -          | 是                          |
| to                  | 点击后跳转的目标路由对象，同 `vue-router` 的 `to` 属性，仅支持`path` `query` `replace` `hash` | string /object | -          | 是                          |
| replace             |                                 是否在跳转时替换当前页面历史                                  | boolean        | `false`    | 是                          |
| open-type           |                                   不同小程序平台的开放能力                                    | string         | -          | 否                          |
| app-parameter       |          打开 APP 时，向 APP 传递的参数，open-type=launchApp 时有效， 微信小程序支持          | string         | -          | 否                          |

#### open-type 开放能力说明

| 值               |                                                                                              说明                                                                                               | 平台差异说明                                                                            |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------- |
| feedback         |                                                                        打开“意见反馈”页面，用户可提交反馈内容并上传日志                                                                         | 微信小程序、QQ 小程序                                                                   |
| share            |                                                                                          触发用户转发                                                                                           | 微信小程序、百度小程序、支付宝小程序、字节跳动小程序、飞书小程序、QQ 小程序、快手小程序 |
| getUserInfo      |                                                                    获取用户信息，可以从@getuserinfo 事件回调中获取到用户信息                                                                    | 微信小程序、百度小程序、QQ 小程序、快手小程序                                           |
| contact          |                                                  打开客服会话，如果用户在会话中点击消息卡片后返回应用，可以从 @contact 事件回调中获得具体信息                                                   | 微信小程序、百度小程序                                                                  |
| getPhoneNumber   |                                                                 获取用户手机号，可以从@getphonenumber 事件回调中获取到用户信息                                                                  | 微信小程序、百度小程序、字节跳动小程序、支付宝小程序、快手小程序。                      |
| launchApp        | 小程序中打开 APP，可以通过 app-parameter 属性设定向 APP 传的参数，需要调起的 APP 接入微信 OpenSDK[详见](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/launchApp.html) | 微信小程序 (opens new window)、QQ 小程序(opens new window)                              |
| openSetting      |                                                                                         打开授权设置页                                                                                          | 微信小程序、百度小程序                                                                  |
| getAuthorize     |                                                                                         支持小程序授权                                                                                          | 支付宝小程序                                                                            |
| contactShare     |                                                                                        分享到通讯录好友                                                                                         | 支付宝小程序                                                                            |
| lifestyle        |                                                                                           关注生活号                                                                                            | 支付宝小程序                                                                            |
| openGroupProfile |                                         呼起 QQ 群资料卡页面，可以通过 group-id 属性设定需要打开的群资料卡的群号，同时 manifest 中必须配置 groupIdList                                          | QQ 小程序基础库 1.4.7 版本+                                                             |

#### Events

| 事件名         |                                                          说明                                                           | 回调参数          | 平台差异说明 |
| :------------- | :---------------------------------------------------------------------------------------------------------------------: | :---------------- | :----------- |
| click          |                                        点击按钮，且按钮状态不为加载或禁用时触发                                         | event: Event      |              |
| touchstart     |                                                   开始触摸按钮时触发                                                    | event: TouchEvent |              |
| getphonenumber |         open-type="getPhoneNumber"时，获取加密的用户手机号回调，[详见](https://ask.dcloud.net.cn/article/37452)         | info: object      | 微信小程序   |
| getuserinfo    | open-type="getUserInfo"时，用户点击该按钮时，会返回获取到的用户信息，从返回参数的 detail 中获取到的值同 uni.getUserInfo | info: object      | 微信小程序   |
| error          |                                     当使用 open-type="launchApp"时，发生错误的回调                                      | info: object      | 微信小程序   |
| opensetting    |                                 open-type="openSetting"时，在打开授权设置页并关闭后回调                                 | info: object      | 微信小程序   |
| launchapp      |                                  open-type="launchApp"时，从小程序打开 App 成功的回调                                   | info: object      | 微信小程序   |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-button"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-button"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif

 <style>
 .ui-showcase-iframe {
    position: fixed;
    right: 3.5vw;
    top: 17%;
    width: 375px;
    height: 75vh;
    box-shadow: 0 0 12px 6px #eee;
    border-radius: 15px;
 }
 .main .markdown-body {
    padding: 45px;
    width: calc(97vw - 661px);
}
 </style>
