# Tooltip 提示信息

移动端通过 alert 展示提示信息

## 基础用法

使用属性 content 设置提示内容

```html
<e-tooltip-m content="prompts info">
    <e-button-m>展示提示信息</e-button-m>
</e-tooltip-m>
```

## 设置 HTML 字符串

content 属性可以设置为 HTML 字符串，若想要正确渲染字符串内容，需要设置 rawContent 属性为 `true`

```html
<e-tooltip-m rawContent content="<span>The content can be <strong>HTML</strong></span>">
    <e-button-m>展示HTML信息</e-button-m>
</e-tooltip-m>
```

## 禁用

通过 `disabled` 属性禁用 tooltip 组件，禁用后不会触发事件，也不会展示 tooltip 内容。

```html
<e-tooltip-m disabled content="prompts info">
    <e-button-m>禁用</e-button-m>
</e-tooltip-m>
```

## 自定义内容

通过 `content` 插槽自定义提示内容。

```html
<e-tooltip-m>
    <template #content>
        <span>Content</span>
    </template>
    <e-button-m>展示提示信息</e-button-m>
</e-tooltip-m>
```

## API

### Attributes

| 属性名                    | 描述                                     | 类型    | 默认值  |
| ------------------------- | ---------------------------------------- | ------- | ------- |
| content                   | 显示内容，可以通过 slot#content 覆盖     | string  | -       |
| raw-content               | 是否将 content 视为 HTML 字符串          | boolean | `false` |
| visible / v-model:visible | 工具提示的可见性                         | boolean | `false` |
| disabled                  | 工具提示是否被禁用                       | boolean | `false` |
| show-after                | 出现延迟，以毫秒为单位                   | number  | `0`     |
| hide-after                | 消失延迟，以毫秒为单位                   | number  | `0`     |
| auto-close                | 自动隐藏工具提示的超时时间，以毫秒为单位 | number  | `0`     |
| popper-class              | 工具提示弹出框的自定义类名               | string  | -       |
| trigger                   | 工具提示被触发（显示）的方式             | `click` | `click` |

### Slots

| 属性名  | 描述           |
| ------- | -------------- |
| default | 提示框触发元素 |
| content | 自定义弹框内容 |

### Exposes

| Name    | Description                                | Type                                              |
| ------- | ------------------------------------------ | ------------------------------------------------- |
| hide    | 隐藏弹框方法                               | `Function - (event?: Event \| undefined) => void` |
| onOpen  | 暴露 onOpen 函数以管理 tooltip 的打开状态  | `Function - (event?: Event \| undefined) => void` |
| onClose | 暴露 onClose 函数以管理 tooltip 的打开状态 | `Function - (event?: Event \| undefined) => void` |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-tooltip-m"
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