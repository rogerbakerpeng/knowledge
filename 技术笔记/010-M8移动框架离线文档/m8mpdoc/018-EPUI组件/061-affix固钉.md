# Affix 固钉

将元素固定到特定的可见区域。

## 基本用法

默认情况下，Affix 固定在页面顶部。
您可以设置 `偏移属性` 以更改偏移顶部，默认值为 `0`。

```html
<template>
  <div class="container">
    <div class="cell-title">默认情况</div>
    <div>
      <e-affix-m :offset="40">
        <e-button-m type="primary">Offset top 40px</e-button-m>
      </e-affix-m>
    </div>
  </div>
</template>
```

## 目标容器

您可以设置 `target` 属性，使词缀始终保持在容器中。如果超出范围，它将被隐藏。

**请注意，容器避免使用滚动条。**

```html
<template>
  <div class="container">
    <div class="cell-title">目标容器</div>
    <div>
      <div class="affix-container">
        <e-affix-m target=".affix-container" :offset="80">
          <template #default>
            <e-button-m type="primary">Target container</e-button-m>
          </template>
        </e-affix-m>
      </div>
    </div>
  </div>
</template>
```

## 固定位置

粘贴组件提供两个固定位置： `顶部` 和 `底部` 。

您可以设置 `position` 属性来更改固定位置，默认值为 `top`。

```html
<template>
  <div class="container">
    <div class="cell-title">固定位置</div>
    <div>
      <div class="affix-container">
        <e-affix-m position="bottom" :offset="20">
          <e-button-m type="primary">Offset bottom 20px</e-button-m>
        </e-affix-m>
      </div>
    </div>
  </div>
</template>
```

## API

### Attributes

| Name     | Description | Type                       | Default |
| :------- | :---------- | :------------------------- | :------ |
| offset   | 偏移距离    | `number`                   | 0       |
| position | 固钉位置    | `enum`-`'top' \| 'bottom'` | 'top'   |
| target   | 目标容器    | `String`                   | —       |
| z-index  | 固钉层级    | `number`                   | 100     |

### Events

| Name   | Description          | Type                                                      |
| :----- | :------------------- | :-------------------------------------------------------- |
| change | 当固定状态改变时触发 | `(fixed: boolean) => void`                                |
| scroll | 滚动时触发           | `(value: { scrollTop: number, fixed: boolean }) => void ` |

### Exposes

| Name       | Description    | Type         |
| :--------- | :------------- | :----------- |
| update     | 手动更新 affix | `() => void` |
| updateRoot | 手动更新根元素 | `() => void` |

### Slots

| Name    | Description      |
| :------ | :--------------- |
| default | 自定义默认内容。 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-affix-m"
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