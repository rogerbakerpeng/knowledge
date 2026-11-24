# 组件使用

## empty 空状态

### 介绍

-   空状态时的占位提示。

::: ifdef M83

-   `v8.3.11`开始支持 weex 端使用

::: endif

### 代码演示

#### 基础用法

```html
<em-empty description="描述文字" />
```

#### 图片类型

`Empty` 组件内置了多种占位图片类型，可以在不同业务场景下使用

```html
<!-- 通用错误 -->
<em-empty image="error" description="描述文字" />
<!-- 网络错误 -->
<em-empty image="network" description="描述文字" />
<!-- 搜索提示 -->
<em-empty image="search" description="描述文字" />
```

#### 基座风格图片

组件内置了基座风格的多种占位图片类型，包括下面这些类型：

-   'todo'
-   'basic-search'
-   'schedule'
-   'notice'
-   'basic-network'
-   'minimessage'
-   'message'
-   'mail'
-   'logagent'
-   'leave'
-   'instructions'
-   'group'
-   'basic-error'
-   'document'
-   'basic-default'
-   'contact'
-   'announcement'

```html
<!-- 通用错误 -->
<em-empty image="basic-error" description="发生错误" />
<!-- 网络错误 -->
<em-empty image="basic-network" description="网络异常" />
<!-- 搜索提示 -->
<em-empty image="basic-search" description="搜索内容为空" />
```

#### 自定义图片

需要自定义图片时，可以在 `image` 属性中传入任意图片 `URL`

```html
<em-empty class="custom-image" image="https://img.yzcdn.cn/vant/custom-empty-image.png" description="描述文字" />

<style>
    .custom-image .em-empty__image {
        width: 90px;
        height: 90px;
    }
</style>
```

#### 底部内容

通过默认插槽可以在 `Empty` 组件的下方插入内容

```html
<em-empty description="描述文字">
    <em-button round type="danger" class="bottom-button">按钮</em-button>
</em-empty>

<style>
    .bottom-button {
        width: 160px;
        height: 40px;
    }
</style>
```

### API

#### Props

| 参数        |                                                说明                                                 | 类型            | 默认值    | ::: ifdef M83 weex 端支持 ::: endif |
| :---------- | :-------------------------------------------------------------------------------------------------: | :-------------- | :-------- | :---------------------------------- |
| image       | 图片类型，可选值为 `error` `network` `search`，以及基座风格的图片值（参考示例），支持传入图片 `URL` | string          | `default` | 是                                  |
| image-size  |                                      图片大小，默认单位为 `px`                                      | number / string | -         | 是                                  |
| description |                                         图片下方的描述文字                                          | string          | -         | 是                                  |

#### Slots

| 名称        |      说明      |
| :---------- | :------------: |
| default     | 自定义底部内容 |
| image       |   自定义图标   |
| description | 自定义描述文字 |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-empty"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-empty"
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
