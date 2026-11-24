# 组件使用

## icon 图标

### 介绍

-   基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过 icon 属性引用。

::: ifdef M83

-   `v8.3.11`开始支持 weex 端使用

::: endif

### 代码演示

#### 基础用法

`Icon`的`name`属性支持传入图标名称或图片链接，所有可用的图标名称见右侧示例。

```html
<em-icon name="chat-o" />
<em-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
```

#### 徽标提示

设置`dot`属性后，会在图标右上角展示一个小红点。设置`badge`属性后，会在图标右上角展示相应的徽标

```html
<em-icon name="chat-o" dot />
<em-icon name="chat-o" badge="9" />
<em-icon name="chat-o" badge="99+" />
```

#### 图标颜色

`Icon`的`color`属性用来设置图标的颜色

```html
<em-icon name="chat-o" color="#1989fa" />
<em-icon name="chat-o" color="#07c160" />
```

#### 图标大小

`Icon`的`size`属性用来设置图标的尺寸大小，默认单位为`px`

```html
<em-icon name="chat-o" size="40" />
<em-icon name="chat-o" size="3rem" />
```

<!-- #### 使用本地字体文件
`Icon` 组件默认引用有赞 `CDN` 提供的字体文件，并通过网络下载。如果需要在项目中使用本地字体文件，请引入下面的 `CSS` 文件，并在项目中配置`url-loader`
```js
import 'vant/lib/icon/local.css';
``` -->

#### 自定义图标

如果需要在现有 `Icon` 的基础上使用更多图标，可以引入第三方 `iconfont` 对应的字体文件和 `CSS` 文件，之后就可以在 `Icon` 组件中直接使用

```html
<style>
    /* 引入第三方或自定义的字体图标样式 */
    @font-face {
        font-family: 'my-icon';
        src: url('./my-icon.ttf') format('truetype');
    }

    .my-icon {
        font-family: 'my-icon';
    }

    .my-icon-extra::before {
        content: '\e626';
    }
</style>

<!-- 通过 class-prefix 指定类名为 my-icon -->
<em-icon class-prefix="my-icon" name="extra" />
```

### API

#### Props

| 参数         |                   说明                    | 类型            | 默认值     | ::: ifdef M83 weex 端支持 ::: endif |
| :----------- | :---------------------------------------: | :-------------- | :--------- | :---------------------------------- |
| name         |            图标名称或图片链接             | string          | -          | 是                                  |
| dot          |         是否显示图标右上角小红点          | boolean         | `false`    | 是                                  |
| badge        |           图标右上角徽标的内容            | number / string | -          | 是                                  |
| color        |                 图标颜色                  | string          | `inherit`  | 是                                  |
| size         | 图标大小，如 `20px` `2em`，默认单位为`px` | number /string  | `inherit`  | 是                                  |
| class-prefix |       类名前缀，用于使用自定义图标        | string          | `van-icon` | 否                                  |

#### Events

| 事件名 |      说明      | 回调参数     |
| :----- | :------------: | :----------- |
| click  | 点击图标时触发 | event: Event |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-icon"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-icon"
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
