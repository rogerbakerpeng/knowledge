# Button

#### 按钮类型

使用 `type` 属性控制按钮样式，可选值： `plain`, `round`, `circle` ，默认为 `round`。

按钮支持 `default`、`success`、`primary`、`info`、`warning`、`danger` 六种类型，默认为 `default`。

```html
<template>
  <e-row-m class="column-gap-4">
    <e-button-m>Default</e-button-m>
    <e-button-m type="primary">Primary</e-button-m>
    <e-button-m type="success">Success</e-button-m>
    <e-button-m type="info">Info</e-button-m>
    <e-button-m type="warning">Warning</e-button-m>
    <e-button-m type="danger">Danger</e-button-m>
  </e-row-m>

  <e-row-m class="column-gap-4">
    <e-button-m :round="false">Default</e-button-m>
    <e-button-m type="primary" :round="false">Primary</e-button-m>
    <e-button-m type="success" :round="false">Success</e-button-m>
    <e-button-m type="info" :round="false">Info</e-button-m>
    <e-button-m type="warning" :round="false">Warning</e-button-m>
    <e-button-m type="danger" :round="false">Danger</e-button-m>
  </e-row-m>

  <e-row-m class="column-gap-4">
    <e-button-m plain>Plain</e-button-m>
    <e-button-m type="primary" plain>Primary</e-button-m>
    <e-button-m type="success" plain>Success</e-button-m>
    <e-button-m type="info" plain>Info</e-button-m>
    <e-button-m type="warning" plain>Warning</e-button-m>
    <e-button-m type="danger" plain>Danger</e-button-m>
  </e-row-m>

  <e-row-m class="column-gap-4">
    <e-button-m icon="Search" circle />
    <e-button-m type="primary" icon="Edit" circle />
    <e-button-m type="success" icon="Check" circle />
    <e-button-m type="info" icon="Message" circle />
    <e-button-m type="warning" icon="Star" circle />
    <e-button-m type="danger" icon="Delete" circle />
  </e-row-m>
</template>

<style lang="scss" scoped>
  .column-gap-4{
    display:flex;
    flex-wrap: wrap;
    column-gap: 10px;
  }
</style>
```

### 禁用状态

你可以使用 `disabled` 属性来定义按钮是否被禁用。

使用 `disabled` 属性来控制按钮是否为禁用状态。 该属性接受一个 `Boolean` 类型的值。

```html
<template>
  <e-row-m class="column-gap-4">
    <e-button-m disabled>Default</e-button-m>
    <e-button-m type="primary" disabled>Primary</e-button-m>
    <e-button-m type="success" disabled>Success</e-button-m>
    <e-button-m type="info" disabled>Info</e-button-m>
    <e-button-m type="warning" disabled>Warning</e-button-m>
    <e-button-m type="danger" disabled>Danger</e-button-m>
  </e-row-m>

  <e-row-m class="column-gap-4">
    <e-button-m plain disabled>Plain</e-button-m>
    <e-button-m type="primary" plain disabled>Primary</e-button-m>
    <e-button-m type="success" plain disabled>Success</e-button-m>
    <e-button-m type="info" plain disabled>Info</e-button-m>
    <e-button-m type="warning" plain disabled>Warning</e-button-m>
    <e-button-m type="danger" plain disabled>Danger</e-button-m>
  </e-row-m>
</template>
<style lang="scss" scoped>
  .column-gap-4{
    display:flex;
    flex-wrap: wrap;
    column-gap: 10px;
  }
</style>
```

## 链接按钮

```html
<template>
  <p>Basic link button</p>
  <div class="column-gap-4">
    <e-button-m
      v-for="button in buttons"
      :key="button.text"
      :type="button.type"
      link
    >{{ button.text }}</e-button-m>
  </div>

  <p>Disabled link button</p>
  <div class="column-gap-4">
    <e-button-m
      v-for="button in buttons"
      :key="button.text"
      :type="button.type"
      link
      disabled
    >{{ button.text }}</e-button-m>
  </div>
</template>

<script setup lang="ts">
  const buttons = [
    { type: "", text: "plain" },
    { type: "primary", text: "primary" },
    { type: "success", text: "success" },
    { type: "info", text: "info" },
    { type: "warning", text: "warning" },
    { type: "danger", text: "danger" },
  ] as const;
</script>
<style lang="scss" scoped>
  .column-gap-4{
    display:flex;
    flex-wrap: wrap;
    column-gap: 10px;
  }
</style>
```

## 文字按钮

没有边框和背景色的按钮。

```html
<template>
<p>Basic text button</p>
  <div class="column-gap-4">
    <e-button-m
      v-for="button in buttons"
      :key="button.text"
      :type="button.type"
      text
    >{{ button.text }}</e-button-m>
  </div>

  <p>Background color always on</p>
  <div class="column-gap-4">
    <e-button-m
      v-for="button in buttons"
      :key="button.text"
      :type="button.type"
      text
      bg
    >{{ button.text }}</e-button-m>
  </div>

  <p>Disabled text button</p>
  <div class="column-gap-4">
    <e-button-m
      v-for="button in buttons"
      :key="button.text"
      :type="button.type"
      text
      disabled
    >{{ button.text }}</e-button-m>
  </div>
</template>

<script setup lang="ts">
  const buttons = [
    { type: "", text: "plain" },
    { type: "primary", text: "primary" },
    { type: "success", text: "success" },
    { type: "info", text: "info" },
    { type: "warning", text: "warning" },
    { type: "danger", text: "danger" },
  ] as const;
</script>
<style lang="scss" scoped>
  .column-gap-4{
    display:flex;
    flex-wrap: wrap;
    column-gap: 10px;
  }
</style>
```

### 图标按钮

使用图标为按钮添加更多的含义。 你也可以单独使用图标不添加文字来节省显示区域占用。

使用 `icon` 属性来为按钮添加图标。 您可以在我们的 `Icon` 组件中找到所需图标。 通过向右方添加`<i>`标签来添加图标， 你也可以使用自定义图标。

```html
<template>
  <div class="column-gap-4">
    <e-button-m type="primary" icon="Edit" />
    <e-button-m type="primary" icon="Share" />
    <e-button-m type="primary" icon="Delete" />
    <e-button-m type="primary" icon="Search">Search</e-button-m>
    <e-button-m type="primary">
      Upload
      <e-icon-m class="ep-icon--right" name="Upload"></e-icon-m>
    </e-button-m>
  </div>
</template>
<style lang="scss" scoped>
  .column-gap-4{
    display:flex;
    flex-wrap: wrap;
    column-gap: 10px;
  }
  .ep-icon--right {
    display: flex;
    align-items: center;
    font-size: 1.2em;
    margin-left: var(--e-space-s);
}
</style>
```

### 按钮组

以按钮组的方式出现，常用于多项类似操作。

使用 `<e-button-group-m>` 对多个按钮分组。

```html
<template>
<e-button-group-m>
  <e-button-m type="primary" icon="ArrowLeft">Previous Page</e-button-m>
  <e-button-m type="primary">
  Next Page
  <e-icon-m class="ep-icon--right" name="ArrowRight"></e-icon-m>
  </e-button-m>
</e-button-group-m>

<e-button-group-m class="ml-4">
  <e-button-m type="primary" icon="Edit" />
  <e-button-m type="primary" icon="Share" />
  <e-button-m type="primary" icon="Delete" />
</e-button-group-m>
</template>
<style lang="scss" scoped>
  .ep-icon--right {
    display: flex;
    align-items: center;
    font-size: 1.2em;
    margin-left: var(--e-space-s);
}
</style>
```

### 加载状态按钮

点击按钮来加载数据，并向用户反馈加载状态。

通过设置 `loading` 属性为 `true` 来显示加载中状态。

您可以使用 `loading` 插槽或 `loadingIcon` 属性自定义您的 `loading` 图标

PS: `loading` 插槽优先级高于 `loadingIcon` 属性

```html
<template>
  <e-button-m type="primary" loading>Loading</e-button-m>
  <e-button-m type="primary" loading-icon="Football" loading>Loading</e-button-m>
  <e-button-m type="primary" loading>
      <template #loading>
          <e-icon-m name="Football"></e-icon-m>
      </template>
      Loading
  </e-button-m>
</template>

<style scoped>
  .ep-button .custom-loading .circular {
    margin-right: 6px;
    width: 18px;
    height: 18px;
    animation: loading-rotate 2s linear infinite;
  }
  .ep-button .custom-loading .circular .path {
    animation: loading-dash 1.5s easep-in-out infinite;
    strokep-dasharray: 90, 150;
    strokep-dashoffset: 0;
    strokep-width: 2;
    stroke: var(--ep-button-text-color);
    strokep-linecap: round;
  }
</style>
```

### 块级按钮

使用 `block` 属性可以让按钮占据父容器的全部宽度。

```html
<template>
  <div class="demo-block">
    <e-button-m block>块级按钮</e-button-m>
    <e-button-m type="primary" block>主要按钮</e-button-m>
    <e-button-m type="success" block>成功按钮</e-button-m>
    <e-button-m type="warning" block>警告按钮</e-button-m>
    <e-button-m type="danger" block>危险按钮</e-button-m>
    <e-button-m type="info" block>信息按钮</e-button-m>
  </div>
</template>
```

### 调整尺寸

除了默认的大小，按钮组件还提供了几种额外的尺寸可供选择，以便适配不同的场景。

使用 `size` 属性额外配置尺寸，可使用 `large` 和 `small` 两种值。

```html
<template>
  <e-row-m class="column-gap-4">
    <e-button-m size="large" round>Large</e-button-m>
    <e-button-m round>Default</e-button-m>
    <e-button-m size="small" round>Small</e-button-m>
    <e-button-m size="large" icon="Search" round>Search</e-button-m>
    <e-button-m icon="Search" round>Search</e-button-m>
    <e-button-m size="small" icon="Search" round>Search</e-button-m>
  </e-row-m>
  <e-row-m class="column-gap-4">
    <e-button-m icon="Search" size="large" circle />
    <e-button-m icon="Search" circle />
    <e-button-m icon="Search" size="small" circle />
  </e-row-m>
</template>

<style lang="scss" scoped>
  .column-gap-4{
    display:flex;
    flex-wrap: wrap;
    column-gap: 10px;
  }
</style>
```

### 自定义颜色

您可以自定义按钮的颜色。

```html
<template>
  <div class="column-gap-4">
    <e-button-m color="#626aef" :dark="isDark">Default</e-button-m>
    <e-button-m color="#626aef" :dark="isDark" plain>Plain</e-button-m>

    <e-button-m color="#626aef" :dark="isDark" disabled>Disabled</e-button-m>
    <e-button-m color="#626aef" :dark="isDark" disabled plain>Disabled Plain</e-button-m>
  </div>
</template>
```

```js
<script lang="ts" setup>
  const isDark = ref(false);
</script>
<style lang="scss" scoped>
  .column-gap-4{
    display:flex;
    flex-wrap: wrap;
    column-gap: 10px;
  }
</style>
```

### 幽灵按钮 `^8.4.6-beta.2`

使用 `ghost` 属性创建幽灵按钮。该按钮在非点击状态下显示默认样式，仅在点击（active）时展示语义颜色。

```html
<template>
  <div class="column-gap-4">
    <e-button-m type="primary" ghost>Primary</e-button-m>
    <e-button-m type="success" ghost>Success</e-button-m>
    <e-button-m type="info" ghost>Info</e-button-m>
    <e-button-m type="warning" ghost>Warning</e-button-m>
    <e-button-m type="danger" ghost>Danger</e-button-m>
  </div>
</template>
```

## Button API

### Button Attributes

tips 移动端不支持PC端的自定义标签 tag。

| 属性名            | 说明                                                   | 类型                 | 默认值                                                 |
| ----------------- | ------------------------------------------------------ | -------------------- | ------------------------------------------------------ |
| size              | 尺寸                                                   | `string` (`'large'\| 'default'\| 'small'`)               | default                        |
| type              | 类型                                                   | `string` (`'default'\|'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'`)            | default |
| plain             | 是否为朴素按钮                                         | `boolean`            | false                                                  |
| text              | 是否为文字按钮                                         | `boolean`            | false                                                  |
| bg                | 是否显示文字按钮背景颜色                               | `boolean`            | false                                                  |
| link              | 是否为链接按钮                                         | `boolean`            | false                                                  |
| round             | 是否为圆角按钮                                         | `boolean`            | true                                                   |
| circle            | 是否为圆形按钮                                         | `boolean`            | false                                                  |
| block             | 是否为块级按钮                                         | `boolean`            | false                                                  |
| loading           | 是否为加载中状态                                       | `boolean`            | false                                                  |
| loading-icon      | 自定义加载中状态图标组件                               | `string / Component` | Loading                                                |
| disabled          | 按钮是否为禁用状态                                     | `boolean`            | false                                                  |
| icon              | 图标组件                                               | `string / Component` | —                                                      |
| iconColor         | 图标组件颜色                                           | `string`             | `#fff`                                                 |
| autofocus         | 原生 autofocus 属性                                    | `boolean`            | false                                                  |
| native-type      | 原生 type 属性                                         | `string` (`'button'\| 'submit'\| 'reset'`)             | button                  |
| auto-insert-space | 自动在两个中文字符之间插入空格                         | `boolean`            | —                                                      |
| color             | 自定义按钮颜色                                         | `string`             | —                                                      |
| dark              | dark 模式, 意味着自动设置 `color` 为 `dark` 模式的颜色 | `boolean`            | false                                                  |
| ghost `^8.4.6-beta.2` | 是否为幽灵按钮，仅在点击时展示语义颜色                 | `boolean`            | false                                                  |

### Button Slots

| 插槽名  | 说明             |
| ------- | ---------------- |
| default | 自定义默认内容   |
| loading | 自定义加载中组件 |
| icon    | 自定义图标组件   |

### Button Exposes

| 属性名         | 说明                       | 类型                                                                                        |
| -------------- | -------------------------- | ------------------------------------------------------------------------------------------- |
| ref            | 按钮 html 元素             | `Ref<HTMLButtonElement>`                                                                    |
| size           | 按钮尺寸                   | `ComputedRef<'' \| 'small' \| 'default' \| 'large'>`                                        |
| type           | 按钮类型                   | `ComputedRef<'' \| 'default' \| 'primary' \| 'success' \| 'warning' \| 'info' \| 'danger'>` |
| disabled       | 是否禁用                   | `ComputedRef<boolean>`                                                                      |
| shouldAddSpace | 是否在两个字符之间插入空格 | `ComputedRef<boolean>`                                                                      |

## ButtonGroup API

### ButtonGroup Attributes

| 属性名 | 说明                         | 类型     | 默认值                                                 |
| ------ | ---------------------------- | -------- | ------------------------------------------------------ |
| size   | 用于控制该按钮组内按钮的大小 | `string` (`'large'\| 'default'\| 'small'`)|           -           |
| type   | 用于控制该按钮组内按钮的类型 | `string` (`'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'`)| - |

### ButtonGroup Slots

| 插槽名  | 说明             | 子标签 |
| ------- | ---------------- | ------ |
| default | 自定义按钮组内容 | Button |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-button-m"
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