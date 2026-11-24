# Icon 图标

移动端的图标组件同时支持原跨端的 vant 图标库及 PC 端 EUI-VUE 图标库。

-   跨端的 vant 图标库所有图标请查阅跨端 icon 文档：[icon 图标](/m8mpdoc/?file=009-UI组件/019-icon图标)

-   PC 端 EUI-VUE 图标库请查阅 [EUI Icons](http://192.168.219.170/docs/vue/component/component/icon.html#icon-collection)

### 引入图标样式

需要使用 PC 端图标库时，必须在`App.vue`中引入 eui 组件库的全局 css 文件：

```html
<style>
    @import '@epoint-mfe/eui-components/src/styles/common.root.scss';
</style>
```

## 基础用法

`Icon`的`name`属性支持传入图标名称或图片链接，注意跨端的 vant 图标名称为短横线命名，PC 端的图标名称为驼峰命名。

```html
<!-- vant图标 -->
<e-icon-m name="chat-o" />
<!-- PC 端 EUI-VUE 图标 -->
<e-icon-m name="Edit" />
<!-- 图片链接 -->
<e-icon-m name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
```

#### 徽标提示

设置`dot`属性后，会在图标右上角展示一个小红点。设置`badge`属性后，会在图标右上角展示相应的徽标

```html
<!-- vant图标 -->
<e-icon-m name="chat-o" dot />
<!-- PC 端 EUI-VUE 图标 -->
<e-icon-m name="Edit" badge="9" />
<!-- 图片链接 -->
<e-icon-m name="https://b.yzcdn.cn/vant/icon-demo-1126.png" badge="99+" />
```

#### 图标颜色

`Icon`的`color`属性用来设置图标的颜色

```html
<!-- vant图标 -->
<e-icon-m name="chat-o" color="#1989fa" />
<!-- PC 端 EUI-VUE 图标 -->
<e-icon-m name="Edit" color="#07c160" />
```

#### 图标大小

`Icon`的`size`属性用来设置图标的尺寸大小，默认单位为`px`

```html
<!-- vant图标 -->
<e-icon-m name="chat-o" size="40" />
<!-- PC 端 EUI-VUE 图标 -->
<e-icon-m name="Edit" size="3rem" />
```

## @epoint-mfe/eui-icons

> 在框架8.4.6-beta.2 版本该包已废弃，PC移动统一使用 `@epoint-fe/eui-icons` 图标库，使用方式一致。

~~移动端对标 PC 端也提供了一个与 EUI-VUE 图标库一致的图标库，并保持使用方法一致。可以与 `ep-icon` 结合使用，通过`ep-icon`给图标提供属性，也可以单独使用。~~

## @epoint-fe/eui-icons

注意：平台小程序端不支持独立使用 `@epoint-fe/eui-icons` 图标组件，也不支持通过`name`属性传入图标组件。

```html
<template>
    <!-- 使用 ep-icon 为 SVG 图标提供属性 -->
    <e-icon-m size="40" color="red">
        <Edit />
    </e-icon-m>
    <!-- 或者独立使用它，不从父级获取属性 -->
    <Plus style="width: 1em; height: 1em; margin-right: 8px" />
</template>

<script lang="ts" setup>
    import { Edit, Plus } from '@epoint-fe/eui-icons';
</script>
```


## API

### Attributes

| 属性名       | 描述                                      | 类型            | 默认值     |
| ------------ | ----------------------------------------- | --------------- | ---------- |
| name         | 图标名称或图片链接                        | string          | -          |
| dot          | 是否显示图标右上角小红点                  | boolean         | `false`    |
| badge        | 图标右上角徽标的内容                      | number / string | -          |
| color        | 图标颜色                                  | string          | `inherit`  |
| size         | 图标大小，如 `20px` `2em`，默认单位为`px` | number /string  | `inherit`  |
| class-prefix | 类名前缀，用于使用自定义图标              | string          | `van-icon` |

#### Events

| 事件名 |      说明      | 回调参数     |
| :----- | :------------: | :----------- |
| click  | 点击图标时触发 | event: Event |

### Slots

| 属性名  | 描述           |
| ------- | -------------- |
| default | 自定义默认内容 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-icon-m"
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