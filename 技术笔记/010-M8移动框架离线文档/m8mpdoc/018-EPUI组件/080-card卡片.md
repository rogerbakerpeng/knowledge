# Card 卡片

将信息整合到卡片容器中。

## 基本用法

卡片包括标题、内容和操作。

卡片由 `header`、`footer` 和 `body` 组成。`header`、`footer` 是可选的，其内容分布取决于命名插槽。

```html
<template>
  <e-card-m class="box-card">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
        <e-button-m class="button" text>Operation button</e-button-m>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
    <template #footer>
      <e-button-m class="button" text>Footer Content</e-button-m>
    </template>
  </e-card-m>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
</script>

<style scoped lang="scss">
  .box-card {
    max-width: 480px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .button {
    padding: 0;
    min-height: auto;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
</style>
```

## 简单卡片

标题部分可以省略。

```html
<template>
  <e-card-m class="box-card">
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </e-card-m>
</template>

<style scoped lang="scss">
  .box-card {
    max-width: 480px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
</style>
```

## 带图片

通过添加一些配置来显示更丰富的内容。

`body-style` 属性定义了自定义 `body` 的 CSS 样式。本示例还使用 `ep-col` 进行布局。

```html
<template>
  <e-row-m>
    <e-col-m
      v-for="(o, index) in 2"
      :key="o"
      :span="11"
      :offset="index > 0 ? 2 : 0"
    >
      <e-card-m :body-style="{ padding: '0px' }">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"
        />
        <div>
          <span>Yummy hamburger</span>
          <div class="bottom">
            <time class="time">{{ currentDate }}</time>
            <e-button-m text class="button">Operating</e-button-m>
          </div>
        </div>
      </e-card-m>
    </e-col-m>
  </e-row-m>
</template>

<style scoped lang="scss">
  .time {
    font-size: 12px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    min-height: auto;
  }

  .image {
    width: 100%;
    display: block;
  }
</style>
```

## 阴影

您可以定义何时显示卡片阴影。

`shadow` 属性确定卡片阴影何时显示。它可以是 `always` 或 `never`。

```html
<template>
  <e-row-m :gutter="12">
    <e-col-m :span="8">
      <e-card-m shadow="always">Always</e-card-m>
    </e-col-m>
    <e-col-m :span="8">
      <e-card-m shadow="never">Never</e-card-m>
    </e-col-m>
  </e-row-m>
</template>
```

## API

### Attributes

| 属性名            | 描述                                               |  类型     |默认值                      |
| --------------- | --------------------------------------------------------- | ------------------------------- | ----------- |
| header          | 卡片的标题。还可以通过 `slot#header` 传递 DOM 元素             | string                          | —           |
| footer          | 卡片的底部。还可以通过 `slot#footer` 传递 DOM 元素             | string                          | —           |
| body-style      | 卡片主体的 CSS 样式                                         | object                          | —           |
| shadow          | 何时显示卡片阴影                                             | `'always' \| 'hover'`| always           |

### Slots

| 名称      | 说明                     |
| -------- | ------------------------ |
| default  | 自定义默认内容             |
| header   | 卡片标题的内容             |
| footer   | 卡片底部的内容             |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-card-m"
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